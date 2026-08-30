#!/usr/bin/env python3
"""Fail-fast release checks for the generated JCX PropTech corpus."""

from __future__ import annotations

import csv
import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import unquote

import build_proptech_master_dataset as build


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
RESEARCH = ROOT / "research"
ERRORS: list[str] = []


def require(condition: bool, message: str) -> None:
    if not condition:
        ERRORS.append(message)


def read_csv(name: str) -> list[dict[str, str]]:
    with (DATA / name).open(newline="", encoding="utf-8-sig") as handle:
        return list(csv.DictReader(handle))


def read_json(name: str) -> list[dict[str, str]] | dict[str, object]:
    with (DATA / name).open(encoding="utf-8") as handle:
        return json.load(handle)


def check_pair(stem: str) -> list[dict[str, str]]:
    csv_rows = read_csv(f"{stem}.csv")
    json_rows = read_json(f"{stem}.json")
    require(isinstance(json_rows, list), f"{stem}.json is not a list")
    require(len(csv_rows) == len(json_rows), f"{stem} CSV/JSON count mismatch")
    if isinstance(json_rows, list):
        normalized_json = [{key: str(value) for key, value in row.items()} for row in json_rows]
        require(csv_rows == normalized_json, f"{stem} CSV/JSON content mismatch")
    return csv_rows


def unique(rows: list[dict[str, str]], field: str, label: str) -> None:
    values = [row[field] for row in rows]
    require(all(values), f"{label} contains an empty {field}")
    require(len(values) == len(set(values)), f"{label} contains duplicate {field} values")


def check_local_markdown_links() -> int:
    checked = 0
    pattern = re.compile(r"\[[^\]]*\]\((?!https?://|mailto:|#)([^)]+)\)")
    for path in ROOT.rglob("*.md"):
        if ".git" in path.parts:
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for raw in pattern.findall(text):
            target = raw.strip().strip("<>").split("#", 1)[0]
            if not target:
                continue
            target_path = Path(unquote(target))
            resolved = target_path if target_path.is_absolute() else path.parent / target_path
            checked += 1
            require(resolved.exists(), f"Broken local Markdown link in {path.relative_to(ROOT)}: {target}")
    return checked


def main() -> int:
    paired = (
        "atlas_entities",
        "proptech_master_companies",
        "claims_registry",
        "entity_field_assertions",
        "entity_relationships",
        "discovery_universe",
        "lifecycle_taxonomy",
        "quantified_outcome_cases",
        "standards_registry",
        "yc_real_estate_construction_directory_2026-08-30",
        "built_environment_ecosystem_discovery_index",
        "full_corpus_source_inventory",
        "source_register",
    )
    datasets = {stem: check_pair(stem) for stem in paired}
    entities = datasets["atlas_entities"]
    legacy = datasets["proptech_master_companies"]
    claims = datasets["claims_registry"]
    assertions = datasets["entity_field_assertions"]
    relationships = datasets["entity_relationships"]
    discovery = datasets["discovery_universe"]
    lifecycle = datasets["lifecycle_taxonomy"]
    cases = datasets["quantified_outcome_cases"]
    standards = datasets["standards_registry"]
    yc = datasets["yc_real_estate_construction_directory_2026-08-30"]
    ecosystems = datasets["built_environment_ecosystem_discovery_index"]
    inventory = datasets["full_corpus_source_inventory"]
    sources = datasets["source_register"]
    manifest = read_json("atlas_manifest.json")
    require(isinstance(manifest, dict), "Manifest is not an object")

    unique(entities, "entity_id", "atlas_entities")
    unique(legacy, "record_id", "legacy master")
    unique(claims, "claim_id", "claims_registry")
    unique(assertions, "assertion_id", "entity_field_assertions")
    unique(relationships, "relationship_id", "entity_relationships")
    unique(discovery, "discovery_id", "discovery_universe")
    unique(cases, "case_id", "quantified_outcome_cases")
    unique(standards, "standard_id", "standards_registry")
    unique(sources, "source_id", "source_register")
    unique(sources, "url", "source_register")

    entity_ids = {row["entity_id"] for row in entities}
    require(all(row["entity_id"] in entity_ids for row in claims), "Claim references an unknown entity")
    require(all(row["entity_id"] in entity_ids for row in assertions), "Assertion references an unknown entity")
    require(all(row["subject_entity_id"] in entity_ids for row in relationships), "Relationship references an unknown subject entity")

    represented_core_ids = [
        entity_id
        for row in discovery
        for entity_id in json.loads(row["qualified_entity_ids_json"])
    ]
    represented_yc_ids = [
        company_id
        for row in discovery
        for company_id in json.loads(row["yc_company_ids_json"])
    ]
    require(set(represented_core_ids) == entity_ids and len(represented_core_ids) == len(entity_ids), "Discovery universe lost or duplicated qualified-core entities")
    require(set(represented_yc_ids) == {row["yc_company_id"] for row in yc} and len(represented_yc_ids) == len(yc), "Discovery universe lost or duplicated YC profiles")
    require(sum(int(row["ecosystem_source_row_count"]) for row in discovery) == len(ecosystems), "Discovery universe does not preserve all ecosystem source rows")
    require(sum(int(row["ecosystem_count"]) for row in discovery) == len(ecosystems), "Discovery-universe identity–ecosystem membership count drift")
    require(all("exact_domain" not in json.loads(row["identity_resolution_methods_json"]) for row in discovery), "Domain-only identity merge remains in discovery universe")
    for row in discovery:
        for field, value in row.items():
            if field.endswith("_json"):
                try:
                    parsed = json.loads(value)
                    require(isinstance(parsed, list), f"{row['discovery_id']} {field} is not a JSON list")
                except json.JSONDecodeError:
                    require(False, f"{row['discovery_id']} {field} is invalid JSON")
        has_core = bool(json.loads(row["qualified_entity_ids_json"]))
        require((row["discovery_only"] == "false") == has_core, f"Discovery-only flag mismatch: {row['discovery_id']}")
        if row["needs_identity_review"] == "true":
            require(bool(json.loads(row["identity_notes_json"])), f"Identity-review record lacks an audit note: {row['discovery_id']}")

    expected_ecosystem_source_ids = {
        "eco-src-" + hashlib.sha1(
            "|".join(
                (
                    row["ecosystem"],
                    row["company_name"],
                    row["company_url"],
                    row["official_source_url"],
                )
            ).encode("utf-8")
        ).hexdigest()[:12]
        for row in ecosystems
    }
    represented_ecosystem_source_ids = [
        source_row_id
        for row in discovery
        for source_row_id in json.loads(row["ecosystem_source_row_ids_json"])
    ]
    require(
        set(represented_ecosystem_source_ids) == expected_ecosystem_source_ids
        and len(represented_ecosystem_source_ids) == len(expected_ecosystem_source_ids),
        "Discovery universe lost or duplicated an ecosystem source-row identity",
    )

    def records_containing_name(value: str) -> list[dict[str, str]]:
        target = build.normalized_name(value)
        return [
            row
            for row in discovery
            if target in {build.normalized_name(name) for name in json.loads(row["name_variants_json"])}
        ]

    for left, right in (
        ("howie ai", "trubrics"),
        ("Betterview", "Nearmap"),
        ("Honest Buildings", "Procore"),
    ):
        left_rows = records_containing_name(left)
        right_rows = records_containing_name(right)
        require(len(left_rows) == 1 and len(right_rows) == 1, f"Identity regression fixture missing: {left}/{right}")
        if len(left_rows) == 1 and len(right_rows) == 1:
            require(left_rows[0]["discovery_id"] != right_rows[0]["discovery_id"], f"False identity merge reintroduced: {left}/{right}")
            require(left_rows[0]["needs_identity_review"] == "true" and right_rows[0]["needs_identity_review"] == "true", f"Shared-domain review flags missing: {left}/{right}")

    domain_to_records: dict[str, list[dict[str, str]]] = {}
    for row in discovery:
        for domain in json.loads(row["domains_json"]):
            domain_to_records.setdefault(domain, []).append(row)
    reviewed_shared_corporate_domains = {
        "construction.autodesk.com": {"Autodesk Construction Cloud / Forma", "BuildingConnected"},
        "mubadala.com": {"Masdar City", "Mubadala Real Assets"},
    }
    for domain, rows in domain_to_records.items():
        if len(rows) < 2:
            continue
        names = {row["display_name"] for row in rows}
        if reviewed_shared_corporate_domains.get(domain) == names:
            continue
        require(all(row["needs_identity_review"] == "true" for row in rows), f"Unreviewed shared domain across identities: {domain}")

    def ecosystem_pair_is_represented(source_row: dict[str, str]) -> bool:
        source_name = build.normalized_name(source_row["company_name"])
        source_url = build.normalized_source_key(source_row["company_url"]) if source_row["company_url"] else ""
        source_ecosystem = source_row["ecosystem"]
        for candidate in discovery:
            if source_ecosystem not in json.loads(candidate["ecosystems_json"]):
                continue
            candidate_names = {build.normalized_name(name) for name in json.loads(candidate["name_variants_json"])}
            candidate_urls = set(json.loads(candidate["candidate_urls_json"]))
            if source_name in candidate_names or (source_url and source_url in candidate_urls):
                return True
        return False

    require(all(ecosystem_pair_is_represented(row) for row in ecosystems), "Discovery universe lost an ecosystem membership pair")

    allowed_types = {"organization", "product_offering", "program_ecosystem", "project"}
    allowed_statuses = {"active", "pilot", "stealth_unclear", "acquired", "merged", "pivoted", "paused", "inactive", "dissolved", "unknown"}
    allowed_tiers = {"", "A", "B", "C", "D", "H"}
    allowed_claim_grades = {"C1", "C2", "C3", "C4", "C5"}
    allowed_source_grades = {"S1", "S2", "S3", "S4", "S5", "needs_review"}
    require({row["record_type"] for row in entities} <= allowed_types, "Invalid normalized record_type")
    require({row["status_current"] for row in entities} <= allowed_statuses, "Invalid normalized status_current")
    require({row["reviewed_relevance_tier"] for row in entities} <= allowed_tiers, "Invalid reviewed relevance tier")
    require({row["claim_attribution_grade_provisional"] for row in claims} <= allowed_claim_grades, "Invalid claim grade")
    require({row["source_quality_grade_provisional"] for row in sources} <= allowed_source_grades, "Invalid source grade")

    for row in entities:
        for field, value in row.items():
            if field.endswith("_json"):
                try:
                    parsed = json.loads(value)
                    require(isinstance(parsed, list), f"{row['entity_id']} {field} is not a JSON list")
                except json.JSONDecodeError:
                    require(False, f"{row['entity_id']} {field} is invalid JSON")
            else:
                require(" || " not in value, f"{row['entity_id']} has a merged scalar in {field}")
        require(not row["founding_year"] or re.fullmatch(r"(?:18|19|20)\d{2}", row["founding_year"]) is not None, f"Invalid founding year: {row['entity_id']}")
        require(" / " not in row["headquarters_country"], f"Non-scalar headquarters country: {row['entity_id']}")
        if row["relevance_tier_conflict"] == "true":
            require(not row["reviewed_relevance_tier"], f"Conflicted tier promoted: {row['entity_id']}")
        if row["canonical_url"]:
            require(not build.is_discovery_profile_url(row["canonical_url"]), f"Discovery profile used as canonical domain: {row['entity_id']}")

    require(len(lifecycle) == 12, "Lifecycle taxonomy does not contain 12 terms")
    require({row["code"] for row in lifecycle} == {f"L{i}" for i in range(1, 13)}, "Lifecycle taxonomy codes incomplete")
    require(len(yc) == 128, "YC snapshot count is not 128")
    require(len({row["yc_profile_url"] for row in yc}) == 128, "YC profile URLs are not unique")
    require(len({row["name"] for row in yc}) == 128, "YC names are not unique")
    require(Counter(row["status"] for row in yc) == Counter({"Active": 100, "Acquired": 27, "Public": 1}), "YC status distribution drift")
    ecosystem_pairs = {(row["company_name"].casefold(), row["ecosystem"].casefold()) for row in ecosystems}
    require(len(ecosystem_pairs) == len(ecosystems), "Ecosystem company-membership pairs are not unique")
    require(all(row["discovery_only"] == "true" for row in ecosystems), "Ecosystem row missing discovery_only=true")

    source_keys = {row["url"] for row in sources}
    inventory_keys = {build.normalized_source_key(row["url"]) for row in inventory}
    inventory_exact = {row["url"] for row in inventory}
    observed_exact = {
        value
        for row in sources
        for value in row["observed_urls"].split("|")
        if value
    }
    require(inventory_keys <= source_keys, "Full source inventory is not represented in the source register")
    require(inventory_exact <= observed_exact, "Observed source variants are missing from the source register")
    require(len(inventory_exact) == len(inventory), "Exact source-inventory row count drift")

    if isinstance(manifest, dict):
        require(manifest.get("unique_master_records") == len(legacy), "Manifest master count mismatch")
        require(manifest.get("unique_source_urls") == len(sources), "Manifest source count mismatch")
        normalized_counts = manifest.get("normalized_schema_outputs", {})
        require(normalized_counts.get("atlas_entities") == len(entities), "Manifest entity count mismatch")
        require(normalized_counts.get("claims_registry") == len(claims), "Manifest claim count mismatch")
        require(normalized_counts.get("entity_field_assertions") == len(assertions), "Manifest assertion count mismatch")
        require(normalized_counts.get("entity_relationships") == len(relationships), "Manifest relationship count mismatch")
        require(normalized_counts.get("discovery_universe") == len(discovery), "Manifest discovery-universe count mismatch")
        discovery_counts = manifest.get("discovery_universe_counts", {})
        require(discovery_counts.get("identity_ecosystem_memberships") == sum(int(row["ecosystem_count"]) for row in discovery), "Manifest identity–ecosystem membership count mismatch")
        review_queue = manifest.get("normalized_review_queue", {})
        require(review_queue.get("discovery_identities_requiring_resolution") == sum(row["needs_identity_review"] == "true" for row in discovery), "Manifest discovery identity-review count mismatch")

    local_links_checked = check_local_markdown_links()
    forbidden = {
        "httpshttps://": "duplicated URL scheme",
        "\u200b": "zero-width space",
        "cite": "internal citation artifact",
    }
    scanned_files = 0
    for suffix in ("*.md", "*.csv", "*.json"):
        for path in ROOT.rglob(suffix):
            if ".git" in path.parts:
                continue
            scanned_files += 1
            text = path.read_text(encoding="utf-8", errors="replace")
            for token, label in forbidden.items():
                require(token not in text, f"{label} in {path.relative_to(ROOT)}")

    summary = {
        "result": "PASS" if not ERRORS else "FAIL",
        "entities": len(entities),
        "record_types": dict(Counter(row["record_type"] for row in entities)),
        "claims": len(claims),
        "assertions": len(assertions),
        "qualified_relationships": len(relationships),
        "deduplicated_discovery_universe": len(discovery),
        "yc_profiles": len(yc),
        "ecosystem_pairs": len(ecosystems),
        "outcome_cases": len(cases),
        "standards": len(standards),
        "normalized_sources": len(sources),
        "exact_source_variants": len(inventory_exact),
        "local_markdown_links_checked": local_links_checked,
        "files_scanned_for_artifacts": scanned_files,
        "errors": ERRORS,
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    return 1 if ERRORS else 0


if __name__ == "__main__":
    sys.exit(main())
