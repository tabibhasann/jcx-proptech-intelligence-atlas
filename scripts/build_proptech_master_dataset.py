#!/usr/bin/env python3
"""Normalize the agent research CSVs into website-ready atlas datasets.

The script is intentionally standard-library only. It preserves conflicting values,
never treats a source URL as proof of a claim, and flags identity/status conflicts
for editorial review instead of silently resolving them.
"""

from __future__ import annotations

import csv
import hashlib
import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse


ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / "research"
DATA = ROOT / "data"

INPUTS = [
    RESEARCH / "global_real_estate_pioneers_agent.csv",
    RESEARCH / "proptech_startups_agent.csv",
    RESEARCH / "regional_companies_agent.csv",
    RESEARCH / "coverage_gap_additions.csv",
    RESEARCH / "operator_coverage_additions.csv",
    RESEARCH / "startup_core_additions.csv",
    RESEARCH / "enterprise_platform_additions.csv",
    RESEARCH / "final_residual_additions.csv",
]

AUXILIARY_INPUTS = {
    "quantified_outcome_cases": RESEARCH / "quantified_outcome_case_library.csv",
    "standards_registry": RESEARCH / "standards_registry.csv",
    "yc_real_estate_construction_directory_2026-08-30": RESEARCH / "yc_real_estate_construction_directory_2026-08-30.csv",
    "built_environment_ecosystem_discovery_index": RESEARCH / "built_environment_ecosystem_discovery_index.csv",
    "full_corpus_source_inventory": RESEARCH / "full_corpus_source_inventory.csv",
}

SOURCE_INVENTORY_INPUT = RESEARCH / "full_corpus_source_inventory.csv"

TRACKING_QUERY_KEYS = {
    "fbclid",
    "gclid",
    "mc_cid",
    "mc_eid",
    "ref",
    "source",
    "hslang",
}

LIFECYCLE_TAXONOMY = [
    ("L1", "Land, site and origination"),
    ("L2", "Feasibility and development strategy"),
    ("L3", "Capital, finance and transactions"),
    ("L4", "Design, BIM and preconstruction"),
    ("L5", "Construction delivery"),
    ("L6", "Marketing, sales, leasing and distribution"),
    ("L7", "Occupancy and customer experience"),
    ("L8", "Property and facility operations"),
    ("L9", "Asset, portfolio and investment management"),
    ("L10", "ESG, climate, resilience and health"),
    ("L11", "Handover, warranty and end-of-life"),
    ("L12", "Cross-lifecycle data and trust"),
]

LEGACY_LIFECYCLE_CODES = {
    "L": "L1",
    "F": "L3",
    "D": "L4",
    "C": "L5",
    "S": "L6",
    "H": "L7",
    "O": "L8",
    "E": "L10",
}

LIFECYCLE_KEYWORDS = {
    "L1": ("land", "site selection", "site-selection", "title", "parcel", "zoning", "permit", "origination"),
    "L2": ("feasibility", "highest-and-best", "development strategy", "massing", "scenario planning"),
    "L3": ("finance", "capital", "mortgage", "underwriting", "valuation", "transaction", "insurance", "payment", "escrow"),
    "L4": ("design", "bim", "preconstruction", "pre-construction", "takeoff", "estimating", "drawing"),
    "L5": ("construction", "procurement", "field", "safety", "progress", "robot", "materials", "contractor"),
    "L6": ("sales", "marketing", "leasing", "listing", "marketplace", "broker", "crm", "booking"),
    "L7": ("occupancy", "resident", "tenant", "homebuyer", "customer experience", "community", "access control"),
    "L8": ("operations", "facilities", "facility", "maintenance", "property management", "cmms", "bms", "work order"),
    "L9": ("portfolio", "asset management", "investment management", "investor reporting"),
    "L10": ("climate", "esg", "energy", "carbon", "sustainability", "resilience", "water", "waste"),
    "L11": ("handover", "warranty", "defect", "snag", "end-of-life", "end of life", "material passport"),
    "L12": ("data", "interoperability", "integration", "document control", "cyber", "privacy", "governance", "provenance", "identity"),
}

PROGRAM_ENTITY_NAMES = {
    "31ventures",
    "bricks fund tokyo",
    "jll spark",
    "saudi proptech hub rega",
    "alchemist built world adjacent portfolio",
    "brick and mortar ventures portfolio",
    "fifth wall portfolio",
    "metaprop portfolio",
    "nar reach portfolio",
    "pi labs portfolio",
    "plug and play real estate and construction",
    "taronga realtechx",
}

PRODUCT_ENTITY_NAMES = {
    "altus group argus intelligence argus enterprise",
    "autodesk construction cloud forma",
    "honeywell forge for buildings",
    "johnson controls openblue",
    "oracle construction and engineering",
    "salesforce real estate cloud",
    "schneider electric ecostruxure building",
    "siemens building x",
}

REVIEWED_CANONICAL_URL_OVERRIDES = {
    "homebase-sea-finance": "https://homebase.ai/",
}

MASTER_FIELDS = [
    "record_id",
    "name",
    "canonical_name",
    "canonical_url",
    "status",
    "status_as_of",
    "hq_country",
    "operating_regions",
    "founding_year",
    "entity_type",
    "business_model",
    "cohort_or_ecosystem",
    "primary_lifecycle",
    "secondary_lifecycle",
    "category",
    "maturity",
    "evidence_grade",
    "jcx_relevance",
    "relevance_tier",
    "scale_signal",
    "tech_strategy",
    "innovation_model",
    "named_initiatives",
    "headline_claim",
    "claim_type",
    "caveats",
    "source_urls",
    "last_verified",
    "source_datasets",
    "merged_record_count",
    "status_conflict",
    "identity_note",
]

FIELD_ALIASES = {
    "cohort_or_ecosystem": ["cohort_or_ecosystem", "cohort_ecosystem", "ecosystem"],
    "headline_claim": ["headline_claim", "quantified_outcome", "key_claim"],
    "last_verified": ["last_verified", "verification_date", "status_as_of"],
    "source_urls": ["source_urls", "source_url", "sources"],
}

# Same-name companies that must not be silently collapsed.
IDENTITY_SPLITS = {
    "haven": lambda row: "haven-mortgage" if "w2020" in joined(row) or "mortgage" in joined(row) else "haven-property-operations",
    "homebase": lambda row: "homebase-sea-finance" if any(x in joined(row) for x in ("singapore", "w2021", "w21", "rent-to-own")) else "homebase-building-tech",
}

IDENTITY_ALIASES = {
    "autodesk construction cloud forma": "autodesk construction cloud",
    "homebase sea": "homebase-sea-finance",
}

EVIDENCE_ORDER = {
    "a": 50,
    "s1": 50,
    "b": 40,
    "s2": 40,
    "c": 30,
    "s3": 30,
    "d": 20,
    "s4": 20,
    "s5": 10,
    "unknown": 0,
    "": 0,
}


def clean(value: object) -> str:
    return re.sub(r"\s+", " ", str(value or "").strip())


def joined(row: dict[str, str]) -> str:
    return " ".join(clean(v).lower() for v in row.values())


def normalized_name(value: str) -> str:
    value = unicodedata.normalize("NFKD", clean(value)).encode("ascii", "ignore").decode()
    value = value.lower().replace("&", " and ")
    value = re.sub(r"\b(inc|incorporated|llc|ltd|limited|plc|corp|corporation|company)\b", " ", value)
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return clean(value)


def slug(value: str) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", normalized_name(value)).strip("-")[:54] or "record"
    digest = hashlib.sha1(value.encode("utf-8")).hexdigest()[:7]
    return f"org-{base}-{digest}"


def first_present(row: dict[str, str], field: str) -> str:
    candidates = FIELD_ALIASES.get(field, [field])
    for candidate in candidates:
        value = clean(row.get(candidate, ""))
        if value:
            if field == "hq_country":
                country_key = value.lower().replace("-", " ").strip()
                value = {
                    "uae": "United Arab Emirates",
                    "u.s.": "United States",
                    "usa": "United States",
                    "uk": "United Kingdom",
                    "saudi arabia": "Saudi Arabia",
                    "unknown": "unknown",
                }.get(country_key, value)
            if field == "relevance_tier":
                tier_key = re.sub(r"[^a-z0-9]+", "", value.lower())
                value = {
                    "1": "A",
                    "tier1": "A",
                    "a": "A",
                    "2": "B",
                    "tier2": "B",
                    "b": "B",
                    "3": "C",
                    "tier3": "C",
                    "c": "C",
                    "4": "D",
                    "tier4": "D",
                    "d": "D",
                    "historical": "H",
                    "h": "H",
                }.get(tier_key, value)
            return value
    return ""


def split_urls(value: str) -> list[str]:
    urls = []
    for part in re.split(r"[|;\n]+", clean(value)):
        part = part.strip().rstrip(".,")
        if part.startswith(("http://", "https://")) and part not in urls:
            urls.append(part)
    return urls


def compact_json(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def split_preserved_values(value: str) -> list[str]:
    values: list[str] = []
    for part in re.split(r"\s*\|\|\s*", clean(value)):
        part = clean(part)
        if part and part.casefold() not in {item.casefold() for item in values}:
            values.append(part)
    return values


def urls_from_row(row: dict[str, str]) -> list[str]:
    urls: list[str] = []
    for field, value in row.items():
        if "url" not in field.casefold() and "source" not in field.casefold():
            continue
        for url in split_urls(value):
            if url not in urls:
                urls.append(url)
    return urls


def normalized_source_key(url: str) -> str:
    """Return a conservative URL identity key while preserving path/query meaning."""
    parsed = urlparse(clean(url))
    scheme = (parsed.scheme or "https").lower()
    host = parsed.netloc.lower()
    if host.startswith("www."):
        host = host[4:]
    if host.endswith(":443") and scheme == "https":
        host = host[:-4]
    path = re.sub(r"/{2,}", "/", parsed.path or "/")
    if path != "/":
        path = path.rstrip("/")
    query = []
    for key, value in parse_qsl(parsed.query, keep_blank_values=True):
        lower_key = key.casefold()
        if lower_key.startswith("utm_") or lower_key in TRACKING_QUERY_KEYS:
            continue
        query.append((key, value))
    return urlunparse((scheme, host, path, "", urlencode(sorted(query)), ""))


def is_discovery_profile_url(url: str) -> bool:
    domain = urlparse(url).netloc.lower().removeprefix("www.")
    return any(
        marker in domain
        for marker in (
            "ycombinator.com",
            "nar-reach.com",
            "crunchbase.com",
            "linkedin.com",
        )
    )


def extract_markdown_urls(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    candidates: list[str] = []
    patterns = (
        r"\]\((https?://[^)\s]+)\)",
        r"<(https?://[^>\s]+)>",
        r"(?<!\()(?<!<)(https?://[^\s<>\]\)\"'`]+)",
    )
    for pattern in patterns:
        for match in re.findall(pattern, text):
            url = match.rstrip(".,;:")
            if url not in candidates:
                candidates.append(url)
    return candidates


def identity_key(row: dict[str, str]) -> str:
    base = normalized_name(row.get("name", ""))
    if base in IDENTITY_ALIASES:
        return IDENTITY_ALIASES[base]
    if base in IDENTITY_SPLITS:
        return IDENTITY_SPLITS[base](row)
    return base


def unique_values(rows: list[dict[str, str]], field: str) -> list[str]:
    values: list[str] = []
    seen: set[str] = set()
    for row in rows:
        value = first_present(row, field)
        if not value:
            continue
        marker = value.casefold()
        if marker not in seen:
            values.append(value)
            seen.add(marker)
    return values


def merge_text(rows: list[dict[str, str]], field: str, separator: str = " || ") -> str:
    return separator.join(unique_values(rows, field))


def strongest_evidence(rows: list[dict[str, str]]) -> str:
    values = unique_values(rows, "evidence_grade")
    if not values:
        return "unknown"
    return max(values, key=lambda v: EVIDENCE_ORDER.get(v.strip().lower(), 1))


def normalize_status(value: str) -> str:
    v = clean(value).lower()
    if not v:
        return "unknown"
    if "watchlist" in v:
        return "unknown"
    if "unresolved" in v or v == "unclear":
        return "unclear"
    if "shut" in v or "closed" in v or v == "inactive":
        return "inactive"
    if "restructur" in v:
        return "restructured"
    if "acquir" in v and ("active" in v or "subsidiary" in v):
        return "acquired-active"
    if "acquir" in v:
        return "acquired"
    if "active" in v or "live" in v or "operating" in v or "integrated" in v:
        return "active"
    if "pilot" in v:
        return "pilot"
    if "selected" in v and "cohort" in v:
        return "cohort-selected"
    mapping = {
        "operating": "active",
        # Legal/listing ownership is recorded separately; a private company can
        # still be operational.  Do not turn 'private' into unknown status.
        "private": "active",
        "public": "active-public",
        "listed": "active-public",
        "unknown": "unknown",
    }
    return mapping.get(v, v)


def merge_status(rows: list[dict[str, str]]) -> tuple[str, str]:
    raw = unique_values(rows, "status")
    statuses = []
    for value in raw:
        normalized = normalize_status(value)
        if normalized not in statuses:
            statuses.append(normalized)
    if not statuses:
        return "unknown", "false"
    if len(statuses) > 1 and "unknown" in statuses:
        statuses.remove("unknown")
    if len(statuses) == 1:
        return statuses[0], "false"
    values = set(statuses)
    if values <= {"active", "active-public"}:
        return ("active-public" if "active-public" in values else "active"), "false"
    if values <= {"active", "acquired", "acquired-active"}:
        return "acquired-active", "false"
    if values <= {"inactive", "restructured"}:
        return "inactive-restructured", "false"
    if "unclear" in values and values <= {"active", "unclear"}:
        return "unclear", "true"
    return "conflicting-status", "true"


def canonical_url(rows: list[dict[str, str]]) -> str:
    urls = [u for u in unique_values(rows, "canonical_url") if u.lower() not in {"unknown", "n/a", "na", "none", "not disclosed"}]
    filtered = []
    for url in urls:
        parsed = urlparse(url)
        domain = parsed.netloc.lower().removeprefix("www.")
        path = parsed.path.lower().rstrip("/")
        if domain == "ycombinator.com" and "/companies/industry/" in path:
            continue
        if domain == "nar-reach.com" and (path == "/news" or "announces-" in path or "selects-" in path):
            continue
        filtered.append(url)
    urls = filtered
    if not urls:
        return ""
    # Prefer an organization's own domain over directory/social URLs.
    deprioritized = ("ycombinator.com", "linkedin.com", "crunchbase.com")
    ranked = sorted(urls, key=lambda u: (any(d in urlparse(u).netloc.lower() for d in deprioritized), len(u)))
    return ranked[0]


def merge_group(key: str, rows: list[dict[str, str]]) -> dict[str, str]:
    rows = sorted(rows, key=lambda r: (first_present(r, "last_verified"), r.get("_dataset", "")), reverse=True)
    status, conflict = merge_status(rows)
    display_names = unique_values(rows, "name")
    all_urls: list[str] = []
    for row in rows:
        for url in split_urls(first_present(row, "canonical_url")):
            if url not in all_urls:
                all_urls.append(url)
        for url in split_urls(first_present(row, "source_urls")):
            if url not in all_urls:
                all_urls.append(url)

    display_name = display_names[0] if display_names else key
    identity_note = ""
    if key == "homebase-sea-finance":
        display_name = "Homebase"
        identity_note = "Official name normalized to Homebase; Homebase-SEA retained as an alias."
    elif normalized_name(display_name) in IDENTITY_SPLITS:
        identity_note = "Potential same-name collision split by cohort/category."

    result = {field: "" for field in MASTER_FIELDS}
    result.update(
        {
            "record_id": slug(key),
            "name": display_name,
            "canonical_name": display_name,
            "canonical_url": canonical_url(rows),
            "status": status,
            "status_as_of": merge_text(rows, "status_as_of"),
            "evidence_grade": strongest_evidence(rows),
            "source_urls": "|".join(all_urls),
            "last_verified": max(unique_values(rows, "last_verified"), default=""),
            "source_datasets": "|".join(sorted({row["_dataset"] for row in rows})),
            "merged_record_count": str(len(rows)),
            "status_conflict": conflict,
            "identity_note": identity_note,
        }
    )
    for field in MASTER_FIELDS:
        if field in result and result[field]:
            continue
        if field in {"record_id", "canonical_url", "source_urls", "source_datasets", "merged_record_count", "status_conflict", "identity_note", "evidence_grade"}:
            continue
        result[field] = merge_text(rows, field)
    return result


def source_class(url: str) -> str:
    domain = urlparse(url).netloc.lower().removeprefix("www.")
    if domain in {"sec.gov", "gov.uk"} or domain.endswith(".gov") or ".gov." in domain or domain.endswith(".gob.bd"):
        return "government_or_regulator"
    if any(x in domain for x in ("ycombinator.com", "pilabs", "metaprop", "fifthwall", "tarongagroup", "brickmortar", "nar-reach")):
        return "ecosystem_or_investor"
    if any(x in domain for x in ("techcrunch", "reuters", "bloomberg", "thedailystar", "tbsnews", "wamda", "constructiondive")):
        return "independent_media"
    if domain.endswith(".org") or any(x in domain for x in ("eib.org", "pwc.com", "jll.com")):
        return "research_or_industry"
    return "company_or_product"


def provisional_source_quality(url: str) -> str:
    """A domain-level default, never a substitute for claim-level review."""
    domain = urlparse(url).netloc.lower().removeprefix("www.")
    inferred = source_class(url)
    if inferred == "government_or_regulator" or any(
        marker in domain
        for marker in (
            "iso.org",
            "buildingsmart.org",
            "ogc.org",
            "w3.org",
            "ashrae.org",
            "nist.gov",
        )
    ):
        return "S1"
    if inferred == "company_or_product":
        return "S2"
    if inferred in {"independent_media", "research_or_industry"}:
        return "S3"
    if inferred == "ecosystem_or_investor":
        return "S4"
    return "needs_review"


def controlled_record_type(record: dict[str, str]) -> tuple[str, str]:
    name_key = normalized_name(record.get("name", ""))
    entity_text = " ".join(split_preserved_values(record.get("entity_type", ""))).lower()
    if "cancelled smart city development" in entity_text or "sidewalk labs quayside" in name_key:
        return "project", "explicit project/development descriptor"
    if name_key in PRODUCT_ENTITY_NAMES:
        return "product_offering", "reviewed product-suite exception"
    if (
        name_key in PROGRAM_ENTITY_NAMES
        or "accelerator" in entity_text
        or "government program" in entity_text
        or "portfolio index" in entity_text
        or "program" in entity_text
        or "venture client" in entity_text
        or "corporate venture capital" in entity_text
        or name_key.endswith(" portfolio")
    ):
        return "program_ecosystem", "reviewed name or entity-type rule"
    return "organization", "default operating/legal identity"


def lifecycle_codes(*legacy_values: str) -> tuple[list[str], list[str], list[str]]:
    text = " || ".join(clean(value) for value in legacy_values if clean(value))
    codes: list[str] = []
    methods: list[str] = []

    def add(code: str, method: str) -> None:
        if code not in codes:
            codes.append(code)
        if method not in methods:
            methods.append(method)

    for match in re.findall(r"(?<![A-Za-z0-9])L(1[0-2]|[1-9])(?=\b|[^A-Za-z0-9])", text, flags=re.I):
        add(f"L{int(match)}", "explicit_code")

    for token_group in re.findall(r"(?<![A-Za-z])(?:[LDSCFHOE](?:/[LDSCFHOE])+)(?![A-Za-z])", text.upper()):
        for token in token_group.split("/"):
            if token in LEGACY_LIFECYCLE_CODES:
                add(LEGACY_LIFECYCLE_CODES[token], "documented_legacy_shorthand")

    lowered = text.casefold()
    for code, keywords in LIFECYCLE_KEYWORDS.items():
        if any(keyword in lowered for keyword in keywords):
            add(code, "keyword_inference")

    codes.sort(key=lambda value: int(value[1:]))
    unmapped = [] if codes or not text else split_preserved_values(text)
    return codes, methods, unmapped


def parsed_tiers(value: str) -> list[str]:
    numeric_priority_mapping = {"1": "A", "2": "B", "3": "C", "4": "D"}
    exact = clean(value)
    if exact in numeric_priority_mapping:
        return [numeric_priority_mapping[exact]]
    tiers: list[str] = []
    for item in re.findall(r"(?<![A-Za-z])[ABCDH](?![A-Za-z])", clean(value).upper()):
        if item not in tiers:
            tiers.append(item)
    return tiers


def provisional_maturity_band(value: str, status: str) -> str:
    text = clean(value).casefold()
    if status in {"inactive", "restructured", "acquired", "acquired-active"}:
        return "historical_or_transitioned"
    if "portfolio" in text or "ecosystem" in text:
        return "program_or_index"
    if any(marker in text for marker in ("enterprise", "public", "scale", "scaleup")):
        return "scaled_or_enterprise_signal"
    if any(marker in text for marker in ("growth", "early", "pilot", "concept")):
        return "early_or_growth_signal"
    return "not_assessed"


def canonical_status(value: str) -> str:
    return {
        "active": "active",
        "active-public": "active",
        "pilot": "pilot",
        "unclear": "stealth_unclear",
        "conflicting-status": "stealth_unclear",
        "unknown": "unknown",
        "cohort-selected": "unknown",
        "acquired": "acquired",
        "acquired-active": "acquired",
        "inactive": "inactive",
        "inactive-restructured": "inactive",
        "restructured": "pivoted",
    }.get(clean(value).casefold(), "unknown")


def provisional_claim_grade(claim_type: str) -> tuple[str, str]:
    text = clean(claim_type).casefold()
    if not text or text == "unknown":
        return "C5", "No usable claim-attribution label in the source row."
    if text in {"annual-filing", "government-sources", "negative-verification"}:
        return "C1", "Source-row label indicates an authoritative filing/government/verified event."
    if any(marker in text for marker in ("reputable press", "government-plus", "company-plus-filing", "company-plus-press")):
        return "C2", "Source-row label indicates some independent or authoritative corroboration."
    if "inference" in text or text == "observed":
        return "C4", "The statement is an analyst inference."
    return "C3", "The statement is reported by a company, customer, vendor, directory, investor or programme."


def write_json(path: Path, rows: list[dict[str, str]]) -> None:
    with path.open("w", encoding="utf-8") as handle:
        json.dump(rows, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


def build_normalized_entities(
    master: list[dict[str, str]], grouped: dict[str, list[dict[str, str]]]
) -> list[dict[str, str]]:
    rows_by_id = {slug(key): rows for key, rows in grouped.items()}
    identity_by_id = {slug(key): key for key in grouped}
    normalized: list[dict[str, str]] = []
    tier_order = {"A": 0, "B": 1, "C": 2, "D": 3, "H": 4}

    for record in master:
        raw = rows_by_id.get(record["record_id"], [])
        identity_value = identity_by_id.get(record["record_id"], "")
        aliases = []
        for row in raw:
            name = first_present(row, "name")
            if name and name.casefold() != record["name"].casefold() and name not in aliases:
                aliases.append(name)
        if record["record_id"] == slug("homebase-sea-finance") and "Homebase-SEA" not in aliases:
            aliases.append("Homebase-SEA")

        record_type, record_type_basis = controlled_record_type(record)
        codes, mapping_methods, unmapped = lifecycle_codes(
            record.get("primary_lifecycle", ""), record.get("secondary_lifecycle", "")
        )

        founding_values: list[str] = []
        founding_years: list[str] = []
        for row in raw:
            for value in split_preserved_values(first_present(row, "founding_year")):
                if value and value not in founding_values:
                    founding_values.append(value)
                for year in re.findall(r"(?<!\d)(?:18|19|20)\d{2}(?!\d)", value):
                    if year not in founding_years:
                        founding_years.append(year)
        founding_years.sort()
        founding_year = founding_years[0] if len(founding_years) == 1 else ""
        founding_note = ""
        if len(founding_years) > 1:
            founding_note = "Conflicting source values; editorial resolution required."
        elif not founding_years:
            founding_note = "Not verified in the current source layer."

        tier_values: list[str] = []
        for row in raw:
            for tier in parsed_tiers(first_present(row, "relevance_tier")):
                if tier not in tier_values:
                    tier_values.append(tier)
        tier_values.sort(key=lambda value: tier_order.get(value, 99))
        tier_conflict = len(tier_values) > 1
        primary_tier = "" if tier_conflict else (tier_values[0] if tier_values else "")

        legacy_grades: list[str] = []
        for row in raw:
            value = first_present(row, "evidence_grade")
            if value and value not in legacy_grades:
                legacy_grades.append(value)

        raw_urls: list[str] = []
        for row in raw:
            for url in urls_from_row(row):
                if url not in raw_urls:
                    raw_urls.append(url)
        source_keys = sorted({normalized_source_key(url) for url in raw_urls})
        source_grades = sorted(
            {provisional_source_quality(url) for url in raw_urls},
            key=lambda grade: (grade == "needs_review", grade),
        )

        maturity_values = split_preserved_values(record.get("maturity", ""))
        category_values = split_preserved_values(record.get("category", ""))
        business_models = split_preserved_values(record.get("business_model", ""))
        ecosystems = split_preserved_values(record.get("cohort_or_ecosystem", ""))
        regions = split_preserved_values(record.get("operating_regions", ""))
        jcx_notes = split_preserved_values(record.get("jcx_relevance", ""))

        canonical_candidate = REVIEWED_CANONICAL_URL_OVERRIDES.get(
            identity_value, record.get("canonical_url", "")
        )
        discovery_profiles = [url for url in source_keys if is_discovery_profile_url(url)]
        if is_discovery_profile_url(canonical_candidate):
            canonical_candidate = ""

        hq_values: list[str] = []
        for row in raw:
            for value in split_preserved_values(first_present(row, "hq_country")):
                if value and value.casefold() != "unknown" and value not in hq_values:
                    hq_values.append(value)
        hq_conflict = len(hq_values) > 1 or any(" / " in value for value in hq_values)
        headquarters_country = hq_values[0] if len(hq_values) == 1 and not hq_conflict else ""

        review_flags: list[str] = []
        if record.get("status_conflict") == "true" or record.get("status") in {"unclear", "conflicting-status"}:
            review_flags.append("status_conflict")
        if tier_conflict:
            review_flags.append("relevance_tier_conflict")
        if len(founding_years) > 1:
            review_flags.append("founding_year_conflict")
        if hq_conflict:
            review_flags.append("headquarters_country_conflict")
        if not canonical_candidate:
            review_flags.append("canonical_url_unresolved")
        if not codes:
            review_flags.append("lifecycle_unmapped")
        if not category_values:
            review_flags.append("category_not_assessed")
        if not maturity_values:
            review_flags.append("maturity_not_assessed")
        if not record.get("status_as_of"):
            review_flags.append("status_evidence_date_missing")
        review_flags.append("claim_level_evidence_review_required")

        if record_type == "program_ecosystem":
            readiness = "discovery_program"
        elif review_flags[:-1]:
            readiness = "profile_requires_editorial_review"
        elif primary_tier in {"A", "B"}:
            readiness = "qualified_profile_requires_claim_review"
        else:
            readiness = "watchlist_profile"

        normalized.append(
            {
                "entity_id": record["record_id"],
                "display_name": record["name"],
                "aliases_json": compact_json(sorted(aliases, key=str.casefold)),
                "record_type": record_type,
                "record_type_basis": record_type_basis,
                "canonical_url": canonical_candidate,
                "canonical_url_status": "resolved" if canonical_candidate else ("discovery_profile_only" if discovery_profiles else "unresolved"),
                "discovery_profile_urls_json": compact_json(discovery_profiles),
                "status_current": canonical_status(record.get("status", "")),
                "operating_status_legacy": record.get("status", ""),
                "status_conflict": record.get("status_conflict", "false"),
                "status_evidence_date": "",
                "status_observed_at": record.get("last_verified", ""),
                "status_date_note": "Legacy status_as_of is preserved in assertions; it is not promoted because it usually represents the research date rather than a supported event date.",
                "last_verified": record.get("last_verified", ""),
                "headquarters_country": headquarters_country,
                "headquarters_country_values_legacy_json": compact_json(hq_values),
                "headquarters_country_conflict": str(hq_conflict).lower(),
                "operating_regions_json": compact_json(regions),
                "founding_year": founding_year,
                "founding_year_values_json": compact_json(founding_values),
                "founding_year_note": founding_note,
                "business_models_json": compact_json(business_models),
                "ecosystem_memberships_json": compact_json(ecosystems),
                "lifecycle_codes_json": compact_json(codes),
                "lifecycle_mapping_methods_json": compact_json(mapping_methods),
                "lifecycle_labels_legacy_json": compact_json(
                    split_preserved_values(record.get("primary_lifecycle", ""))
                    + split_preserved_values(record.get("secondary_lifecycle", ""))
                ),
                "lifecycle_unmapped_labels_json": compact_json(unmapped),
                "category_labels_json": compact_json(category_values),
                "maturity_band_provisional": provisional_maturity_band(
                    record.get("maturity", ""), record.get("status", "")
                ),
                "maturity_labels_legacy_json": compact_json(maturity_values),
                "mrl": "",
                "mrl_note": "Not assigned from company scale/funding; requires product-and-geography evidence.",
                "reviewed_relevance_tier": primary_tier,
                "relevance_tier_values_json": compact_json(tier_values),
                "relevance_tier_conflict": str(tier_conflict).lower(),
                "jcx_relevance_notes_json": compact_json(jcx_notes),
                "legacy_evidence_grades_json": compact_json(legacy_grades),
                "source_quality_grades_provisional_json": compact_json(source_grades),
                "source_count": str(len(source_keys)),
                "source_urls_json": compact_json(source_keys),
                "source_datasets_json": compact_json(record.get("source_datasets", "").split("|")),
                "merged_record_count": record.get("merged_record_count", "1"),
                "publication_readiness": readiness,
                "review_flags_json": compact_json(review_flags),
            }
        )
    normalized.sort(
        key=lambda row: (
            row["reviewed_relevance_tier"] or "Z",
            row["display_name"].casefold(),
        )
    )
    return normalized


def build_claim_registry(raw_rows: list[dict[str, str]]) -> list[dict[str, str]]:
    claims: list[dict[str, str]] = []
    seen: set[str] = set()
    claim_fields = ("headline_claim", "scale_signal", "tech_strategy", "named_initiatives", "jcx_relevance")
    for row in raw_rows:
        entity_id = slug(identity_key(row))
        urls = urls_from_row(row)
        source_keys = sorted({normalized_source_key(url) for url in urls})
        source_grades = sorted({provisional_source_quality(url) for url in urls})
        for field in claim_fields:
            text = first_present(row, field)
            if not text or text.casefold() in {"unknown", "not disclosed", "none"}:
                continue
            if field == "jcx_relevance":
                claim_grade, grade_basis = "C4", "JCX relevance is an atlas analyst interpretation."
                claim_type = "atlas_inference"
            else:
                claim_type = first_present(row, "claim_type") or "unknown"
                claim_grade, grade_basis = provisional_claim_grade(claim_type)
            identity = "|".join((entity_id, row.get("_dataset", ""), field, text, "|".join(source_keys)))
            claim_id = "clm-" + hashlib.sha1(identity.encode("utf-8")).hexdigest()[:12]
            if claim_id in seen:
                continue
            seen.add(claim_id)
            claims.append(
                {
                    "claim_id": claim_id,
                    "entity_id": entity_id,
                    "entity_name": first_present(row, "name"),
                    "claim_field": field,
                    "claim_text": text,
                    "claim_type_legacy": claim_type,
                    "claim_attribution_grade_provisional": claim_grade,
                    "claim_grade_basis": grade_basis,
                    "legacy_evidence_grade": first_present(row, "evidence_grade"),
                    "source_quality_grades_provisional_json": compact_json(source_grades),
                    "source_urls_json": compact_json(source_keys),
                    "caveat": first_present(row, "caveats"),
                    "verified_or_retrieved_at": first_present(row, "last_verified"),
                    "source_dataset": row.get("_dataset", ""),
                    "review_status": "requires_claim_level_editorial_review",
                    "public_use": "attributed_only" if claim_grade == "C3" else ("context_only" if claim_grade == "C5" else "review_required"),
                }
            )
    claims.sort(key=lambda row: (row["entity_name"].casefold(), row["claim_field"], row["claim_id"]))
    return claims


def build_assertion_register(raw_rows: list[dict[str, str]]) -> list[dict[str, str]]:
    assertions: list[dict[str, str]] = []
    fields = (
        "canonical_url",
        "status",
        "status_as_of",
        "hq_country",
        "founding_year",
        "entity_type",
        "business_model",
        "cohort_or_ecosystem",
        "primary_lifecycle",
        "secondary_lifecycle",
        "category",
        "maturity",
        "evidence_grade",
        "relevance_tier",
    )
    for row in raw_rows:
        entity_id = slug(identity_key(row))
        source_keys = sorted({normalized_source_key(url) for url in urls_from_row(row)})
        for field in fields:
            value = first_present(row, field)
            if not value:
                continue
            identity = "|".join((entity_id, row.get("_dataset", ""), field, value))
            assertions.append(
                {
                    "assertion_id": "ast-" + hashlib.sha1(identity.encode("utf-8")).hexdigest()[:12],
                    "entity_id": entity_id,
                    "entity_name": first_present(row, "name"),
                    "field_name": field,
                    "asserted_value": value,
                    "source_dataset": row.get("_dataset", ""),
                    "source_urls_json": compact_json(source_keys),
                    "observed_or_retrieved_at": first_present(row, "last_verified"),
                    "legacy_evidence_grade": first_present(row, "evidence_grade"),
                    "review_status": "preserved_source_assertion",
                }
            )
    assertions.sort(key=lambda row: (row["entity_name"].casefold(), row["field_name"], row["assertion_id"]))
    return assertions


def build_relationship_register(raw_rows: list[dict[str, str]]) -> list[dict[str, str]]:
    relationships: dict[str, dict[str, str]] = {}
    for row in raw_rows:
        membership = first_present(row, "cohort_or_ecosystem")
        if not membership:
            continue
        # "Independent" is provenance/status shorthand, not an organization or
        # program that an entity can belong to.  Preserve it in source assertions,
        # but never emit a misleading ecosystem-membership edge.
        if membership.casefold() == "independent" or membership.casefold().startswith("independent;"):
            continue
        entity_id = slug(identity_key(row))
        for object_name in split_preserved_values(membership):
            identity = "|".join((entity_id, "member_of_or_discovered_via", normalized_name(object_name)))
            relationship_id = "rel-" + hashlib.sha1(identity.encode("utf-8")).hexdigest()[:12]
            urls = sorted({normalized_source_key(url) for url in urls_from_row(row)})
            relationships[relationship_id] = {
                "relationship_id": relationship_id,
                "subject_entity_id": entity_id,
                "subject_name": first_present(row, "name"),
                "relationship_type": "member_of_or_discovered_via",
                "object_name": object_name,
                "object_entity_id": "",
                "relationship_status": "reported_or_directory_observed",
                "source_urls_json": compact_json(urls),
                "verified_or_retrieved_at": first_present(row, "last_verified"),
                "source_dataset": row.get("_dataset", ""),
                "editorial_note": "Membership is a discovery relationship, not evidence of deployment or outcome.",
            }
    result = list(relationships.values())
    result.sort(key=lambda row: (row["object_name"].casefold(), row["subject_name"].casefold()))
    return result


def build_discovery_universe(
    entities: list[dict[str, str]],
    yc_rows: list[dict[str, str]],
    ecosystem_rows: list[dict[str, str]],
) -> list[dict[str, str]]:
    """Join discovery layers conservatively; a shared domain never proves identity."""
    candidates: dict[str, dict[str, object]] = {}
    name_index: dict[str, set[str]] = defaultdict(set)
    domain_index: dict[str, set[str]] = defaultdict(set)
    domain_aliases = {
        "brimstone.com": "brimstoneenergy.com",
        # myhippo.com redirects to hippo.com; verified against the live company site.
        "myhippo.com": "hippo.com",
    }
    # Source-native labels inferred from bare outbound domains or logo alt text.
    # Apply only when the expected company domain corroborates the reviewed alias.
    ecosystem_name_aliases = {
        "broker bot": ("brokerbot", "brokerbot.ai"),
        # 2150 uses the shortened brand Cocoon while Brick & Mortar uses Cocoon
        # Carbon. Both official cards point to cocooncarbon.com.
        "cocoon carbon": ("cocoon", "cocooncarbon.com"),
        "estateintel": ("estate intel", "estateintel.com"),
        "getjones": ("jones", "getjones.com"),
        "obieinsurance": ("obie insurance", "obieinsurance.com"),
        "verge sense": ("vergesense", "vergesense.com"),
    }

    def domain_of(url: str) -> str:
        return urlparse(url).netloc.lower().removeprefix("www.")

    def resolution_domain(url: str) -> str:
        domain = domain_of(url)
        return domain_aliases.get(domain, domain)

    def blank_candidate(key: str, display_name: str) -> dict[str, object]:
        item: dict[str, object] = {
            "key": key,
            "display_names": set([display_name]) if display_name else set(),
            "preferred_name": display_name,
            "normalized_names": set([normalized_name(display_name)]) if display_name else set(),
            "domains": set(),
            "candidate_urls": set(),
            "profile_urls": set(),
            "source_urls": set(),
            "source_layers": set(),
            "qualified_entity_ids": set(),
            "qualified_record_types": set(),
            "yc_company_ids": set(),
            "yc_batches": set(),
            "yc_statuses": set(),
            "ecosystems": set(),
            "ecosystem_source_row_ids": set(),
            "ecosystem_statuses": set(),
            "category_signals": set(),
            "lifecycle_signals": set(),
            "jcx_tier_signals": set(),
            "regions": set(),
            "country_signals": set(),
            "location_signals": set(),
            "employee_count_signals": set(),
            "description_signals": set(),
            "identity_methods": set(),
            "identity_notes": set(),
            "needs_identity_review": False,
        }
        candidates[key] = item
        return item

    def add_name(item: dict[str, object], name: str) -> None:
        name = clean(name)
        if not name:
            return
        item["display_names"].add(name)
        normalized = normalized_name(name)
        if normalized:
            item["normalized_names"].add(normalized)
            name_index[normalized].add(str(item["key"]))

    def add_url(item: dict[str, object], url: str, *, profile: bool = False) -> None:
        if not url.startswith(("http://", "https://")):
            return
        normalized = normalized_source_key(url)
        item["source_urls"].add(normalized)
        if profile:
            item["profile_urls"].add(normalized)
            return
        item["candidate_urls"].add(normalized)
        domain = domain_of(normalized)
        if domain:
            item["domains"].add(domain)
            domain_index[domain_aliases.get(domain, domain)].add(str(item["key"]))

    def unique_match(index: dict[str, set[str]], value: str) -> tuple[str | None, bool]:
        keys = index.get(value, set())
        return (next(iter(keys)), False) if len(keys) == 1 else (None, len(keys) > 1)

    def ecosystem_matching_name(value: str) -> tuple[str, bool]:
        """Remove explicit portfolio status/stock annotations for matching only."""
        cleaned = clean(value)
        stripped = re.sub(
            r"\s+[\u2014\u2013-]\s+(?:exited|acquired)\b.*$",
            "",
            cleaned,
            flags=re.IGNORECASE,
        )
        stripped = re.sub(
            r"\s*\((?:nyse|nasdaq|lse|asx|tsx)(?:\s*:\s*[^)]*)?\)\s*$",
            "",
            stripped,
            flags=re.IGNORECASE,
        )
        return normalized_name(stripped), stripped != cleaned

    for entity in entities:
        key = "core:" + entity["entity_id"]
        item = blank_candidate(key, entity["display_name"])
        item["source_layers"].add("qualified_core")
        item["qualified_entity_ids"].add(entity["entity_id"])
        item["qualified_record_types"].add(entity["record_type"])
        item["identity_methods"].add("qualified_core_identity")
        add_name(item, entity["display_name"])
        for alias in json.loads(entity["aliases_json"]):
            add_name(item, alias)
        add_url(item, entity["canonical_url"])
        for url in json.loads(entity["discovery_profile_urls_json"]):
            add_url(item, url, profile=True)
        for url in json.loads(entity["source_urls_json"]):
            item["source_urls"].add(url)
        item["category_signals"].update(json.loads(entity["category_labels_json"]))
        item["lifecycle_signals"].update(json.loads(entity["lifecycle_codes_json"]))
        if entity["reviewed_relevance_tier"]:
            item["jcx_tier_signals"].add(entity["reviewed_relevance_tier"])
        item["country_signals"].add(clean(entity.get("headquarters_country", "")))

    for row in yc_rows:
        name = clean(row.get("name", ""))
        normalized = normalized_name(name)
        match, ambiguous = unique_match(name_index, normalized)
        if match is None:
            key = "yc:" + (clean(row.get("yc_company_id", "")) or hashlib.sha1(normalized.encode("utf-8")).hexdigest()[:10])
            item = blank_candidate(key, name)
            item["identity_methods"].add("source_native_yc_identity")
            if ambiguous:
                item["needs_identity_review"] = True
                item["identity_notes"].add("Exact normalized name matches multiple qualified/discovery identities; no automatic merge.")
        else:
            item = candidates[match]
            item["identity_methods"].add("exact_normalized_name")
        add_name(item, name)
        item["source_layers"].add("yc_real_estate_construction_2026-08-30")
        item["yc_company_ids"].add(clean(row.get("yc_company_id", "")))
        item["yc_batches"].add(clean(row.get("batch", "")))
        item["yc_statuses"].add(clean(row.get("status", "")))
        add_url(item, clean(row.get("yc_profile_url", "")), profile=True)
        add_url(item, clean(row.get("identity_status_source", "")), profile=True)
        item["category_signals"].add(clean(row.get("inferred_category", "")))
        item["lifecycle_signals"].add(clean(row.get("inferred_lifecycle", "")))
        item["jcx_tier_signals"].add(clean(row.get("jcx_screening_tier", "")))
        item["country_signals"].add(clean(row.get("country_code_shown", "")))
        item["location_signals"].add(clean(row.get("location_shown", "")))
        item["employee_count_signals"].add(clean(row.get("employee_count_shown", "")))
        item["description_signals"].add(clean(row.get("official_one_liner", "")))
        item["description_signals"].add(clean(row.get("official_description_concise", "")))

    for index, row in enumerate(ecosystem_rows, start=1):
        name = clean(row.get("company_name", ""))
        normalized, annotation_stripped = ecosystem_matching_name(name)
        company_url = clean(row.get("company_url", ""))
        company_domain = resolution_domain(normalized_source_key(company_url)) if company_url else ""
        alias_applied = False
        alias_rule = ecosystem_name_aliases.get(normalized)
        if alias_rule and company_domain == alias_rule[1]:
            normalized = alias_rule[0]
            alias_applied = True
        match = None
        ambiguous = False
        collision_notes: set[str] = set()
        name_match, name_ambiguous = unique_match(name_index, normalized)
        domain_keys = set(domain_index.get(company_domain, set())) if company_domain else set()

        if name_match is not None:
            existing_domains = {
                domain_aliases.get(domain, domain)
                for domain in candidates[name_match]["domains"]
            }
            if company_domain and existing_domains and company_domain not in existing_domains:
                ambiguous = True
                collision_notes.add(
                    "Exact normalized name matched an existing identity, but the candidate domains conflict; no automatic merge."
                )
                candidates[name_match]["needs_identity_review"] = True
                candidates[name_match]["identity_notes"].add(
                    f"Another {name!r} source row uses conflicting domain {company_domain}; relationship requires review."
                )
            else:
                match = name_match
        elif name_ambiguous:
            ambiguous = True
            collision_notes.add(
                "Exact normalized name matches multiple identities; no automatic merge."
            )

        # A redirect, acquisition page, portfolio mistake or shared parent domain is
        # relationship evidence, not identity evidence. Keep differently named
        # candidates separate and flag every record sharing the domain.
        if match is None and domain_keys:
            ambiguous = True
            other_names = sorted(
                {
                    clean(str(candidates[key]["preferred_name"]))
                    for key in domain_keys
                    if clean(str(candidates[key]["preferred_name"]))
                },
                key=str.casefold,
            )
            collision_notes.add(
                f"Domain {company_domain} is also used by {', '.join(other_names) or 'another identity'}; shared-domain relationship requires review."
            )
            for domain_key in domain_keys:
                candidates[domain_key]["needs_identity_review"] = True
                candidates[domain_key]["identity_notes"].add(
                    f"Domain {company_domain} is also used by ecosystem candidate {name!r}; identities were deliberately kept separate."
                )

        if match is None:
            identity_seed = "|".join(
                (
                    clean(row.get("ecosystem", "")),
                    normalized or normalized_name(name),
                    normalized_source_key(company_url) if company_url else "",
                    normalized_source_key(clean(row.get("official_source_url", ""))),
                )
            )
            key = "ecosystem:" + hashlib.sha1(identity_seed.encode("utf-8")).hexdigest()[:12]
            if key in candidates:
                suffix_seed = identity_seed + f"|row-{index}"
                key = "ecosystem:" + hashlib.sha1(suffix_seed.encode("utf-8")).hexdigest()[:12]
            item = blank_candidate(key, name)
            item["identity_methods"].add("source_native_ecosystem_identity")
            if ambiguous:
                item["needs_identity_review"] = True
                item["identity_notes"].update(collision_notes)
        else:
            item = candidates[match]
            existing_domains = {
                domain_aliases.get(domain, domain)
                for domain in item["domains"]
            }
            if annotation_stripped:
                item["identity_methods"].add("status_annotation_stripped_exact_name")
            elif alias_applied:
                item["identity_methods"].add("reviewed_name_alias_with_domain_corroboration")
            elif company_domain and company_domain in existing_domains:
                item["identity_methods"].add("exact_normalized_name_with_domain_corroboration")
            else:
                item["identity_methods"].add("exact_normalized_name")
        add_name(item, name)
        add_url(item, company_url)
        add_url(item, clean(row.get("official_source_url", "")), profile=True)
        item["source_layers"].add("built_environment_ecosystem_discovery_index")
        item["ecosystems"].add(clean(row.get("ecosystem", "")))
        source_row_identity = "|".join(
            (
                clean(row.get("ecosystem", "")),
                clean(row.get("company_name", "")),
                clean(row.get("company_url", "")),
                clean(row.get("official_source_url", "")),
            )
        )
        item["ecosystem_source_row_ids"].add(
            "eco-src-" + hashlib.sha1(source_row_identity.encode("utf-8")).hexdigest()[:12]
        )
        item["ecosystem_statuses"].add(clean(row.get("status", "")))
        item["category_signals"].add(clean(row.get("category", "")))
        item["regions"].add(clean(row.get("region", "")))
        item["description_signals"].add(clean(row.get("official_description", "")))

    output: list[dict[str, str]] = []
    for key, item in candidates.items():
        for field in (
            "display_names",
            "normalized_names",
            "domains",
            "candidate_urls",
            "profile_urls",
            "source_urls",
            "source_layers",
            "qualified_entity_ids",
            "qualified_record_types",
            "yc_company_ids",
            "yc_batches",
            "yc_statuses",
            "ecosystems",
            "ecosystem_source_row_ids",
            "ecosystem_statuses",
            "category_signals",
            "lifecycle_signals",
            "jcx_tier_signals",
            "regions",
            "country_signals",
            "location_signals",
            "employee_count_signals",
            "description_signals",
            "identity_methods",
            "identity_notes",
        ):
            item[field].discard("")
        core_ids = sorted(item["qualified_entity_ids"])
        discovery_id = "dsc-" + hashlib.sha1(key.encode("utf-8")).hexdigest()[:12]
        output.append(
            {
                "discovery_id": discovery_id,
                "display_name": clean(item["preferred_name"]) or sorted(item["display_names"], key=str.casefold)[0],
                "name_variants_json": compact_json(sorted(item["display_names"], key=str.casefold)),
                "record_type_signals_json": compact_json(sorted(item["qualified_record_types"])),
                "qualified_entity_ids_json": compact_json(core_ids),
                "evidence_stage": "qualified_core" if core_ids else "discovery_only",
                "discovery_only": str(not bool(core_ids)).lower(),
                "source_layers_json": compact_json(sorted(item["source_layers"])),
                "source_layer_count": str(len(item["source_layers"])),
                "domains_json": compact_json(sorted(item["domains"])),
                "candidate_urls_json": compact_json(sorted(item["candidate_urls"])),
                "profile_urls_json": compact_json(sorted(item["profile_urls"])),
                "yc_company_ids_json": compact_json(sorted(item["yc_company_ids"])),
                "yc_batches_json": compact_json(sorted(item["yc_batches"])),
                "yc_status_signals_json": compact_json(sorted(item["yc_statuses"])),
                "ecosystems_json": compact_json(sorted(item["ecosystems"])),
                "ecosystem_count": str(len(item["ecosystems"])),
                "ecosystem_source_row_ids_json": compact_json(sorted(item["ecosystem_source_row_ids"])),
                "ecosystem_source_row_count": str(len(item["ecosystem_source_row_ids"])),
                "ecosystem_status_signals_json": compact_json(sorted(item["ecosystem_statuses"])),
                "category_signals_json": compact_json(sorted(item["category_signals"])),
                "lifecycle_signals_json": compact_json(sorted(item["lifecycle_signals"])),
                "jcx_tier_signals_json": compact_json(sorted(item["jcx_tier_signals"])),
                "region_signals_json": compact_json(sorted(item["regions"])),
                "country_signals_json": compact_json(sorted(item["country_signals"])),
                "location_signals_json": compact_json(sorted(item["location_signals"])),
                "employee_count_signals_json": compact_json(sorted(item["employee_count_signals"])),
                "description_signals_json": compact_json(sorted(item["description_signals"])),
                "source_urls_json": compact_json(sorted(item["source_urls"])),
                "source_url_count": str(len(item["source_urls"])),
                "identity_resolution_methods_json": compact_json(sorted(item["identity_methods"])),
                "needs_identity_review": str(bool(item["needs_identity_review"])).lower(),
                "identity_notes_json": compact_json(sorted(item["identity_notes"])),
                "snapshot_date": "2026-08-30",
                "publication_note": "Discovery presence is not operating, traction, outcome, security or JCX-fit evidence." if not core_ids else "Qualified-core identity; individual claims still require editorial review.",
            }
        )
    output.sort(key=lambda row: row["display_name"].casefold())
    return output


def write_csv(path: Path, rows: list[dict[str, str]], fields: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore", quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    raw_rows: list[dict[str, str]] = []
    input_counts: dict[str, int] = {}
    missing_inputs: list[str] = []

    for path in INPUTS:
        if not path.exists():
            missing_inputs.append(path.name)
            continue
        with path.open(newline="", encoding="utf-8-sig") as handle:
            rows = list(csv.DictReader(handle))
        input_counts[path.name] = len(rows)
        for row in rows:
            cleaned = {clean(k): clean(v) for k, v in row.items() if k is not None}
            cleaned["_dataset"] = path.name
            if cleaned.get("name"):
                raw_rows.append(cleaned)

    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in raw_rows:
        grouped[identity_key(row)].append(row)

    master = [merge_group(key, rows) for key, rows in grouped.items() if key]
    master.sort(key=lambda r: (r["relevance_tier"], r["name"].casefold()))

    sources: dict[str, dict[str, object]] = {}

    def register_source(
        url: str,
        *,
        record_id: str = "",
        name: str = "",
        dataset: str = "",
        verified: str = "",
        documents: list[str] | None = None,
    ) -> None:
        if not url.startswith(("http://", "https://")):
            return
        key = normalized_source_key(url)
        item = sources.setdefault(
            key,
            {
                "source_id": "src-" + hashlib.sha1(key.encode("utf-8")).hexdigest()[:10],
                "url": key,
                "observed_urls": set(),
                "domain": urlparse(key).netloc.lower().removeprefix("www."),
                "inferred_source_class": source_class(key),
                "source_quality_grade_provisional": provisional_source_quality(key),
                "quality_grade_status": "domain-level provisional; claim-level review required",
                "used_by_record_ids": set(),
                "used_by_names": set(),
                "used_by_documents": set(),
                "source_datasets": set(),
                "last_verified": verified,
                "editorial_note": "The URL is normalized for identity. Source class/quality are provisional; authority, scope and claim support require editorial review.",
            },
        )
        item["observed_urls"].add(url)
        if record_id:
            item["used_by_record_ids"].add(record_id)
        if name:
            item["used_by_names"].add(name)
        if dataset:
            item["source_datasets"].add(dataset)
        for document in documents or []:
            if document:
                item["used_by_documents"].add(document)
        item["last_verified"] = max(str(item["last_verified"]), verified)

    for record in master:
        for url in split_urls(record["source_urls"]):
            for dataset in record["source_datasets"].split("|"):
                register_source(
                    url,
                    record_id=record["record_id"],
                    name=record["name"],
                    dataset=dataset,
                    verified=record["last_verified"],
                )

    auxiliary_counts: dict[str, int] = {}
    auxiliary_rows: dict[str, list[dict[str, str]]] = {}
    for output_name, path in AUXILIARY_INPUTS.items():
        if not path.exists():
            continue
        with path.open(newline="", encoding="utf-8-sig") as handle:
            rows = [{clean(k): clean(v) for k, v in row.items() if k is not None} for row in csv.DictReader(handle)]
        auxiliary_rows[output_name] = rows
        auxiliary_counts[output_name] = len(rows)
        if rows:
            fields = list(rows[0])
            write_csv(DATA / f"{output_name}.csv", rows, fields)
            write_json(DATA / f"{output_name}.json", rows)

        if output_name == "full_corpus_source_inventory":
            continue

        for index, row in enumerate(rows, start=1):
            item_name = (
                row.get("organization", "")
                or row.get("name", "")
                or row.get("company_name", "")
                or row.get("standard", "")
                or f"{output_name}-{index}"
            )
            if row.get("case_id", ""):
                item_id = row["case_id"]
            elif row.get("standard_id", ""):
                item_id = row["standard_id"]
            elif row.get("yc_company_id", ""):
                item_id = "yc-" + row["yc_company_id"]
            elif row.get("company_name", "") and row.get("ecosystem", ""):
                identity = row["company_name"] + "|" + row["ecosystem"]
                item_id = "eco-" + hashlib.sha1(identity.encode("utf-8")).hexdigest()[:10]
            else:
                item_id = f"{output_name}-{index:04d}"
            verified = (
                row.get("verification_date", "")
                or row.get("last_verified", "")
                or row.get("source_as_of", "")
                or "2026-08-30"
            )
            for url in urls_from_row(row):
                register_source(
                    url,
                    record_id=item_id,
                    name=item_name,
                    dataset=path.name,
                    verified=verified,
                )

    # The inventory supplies complete narrative + structured lineage. It is a
    # bibliography layer, not an assertion that every URL is high-quality evidence.
    if SOURCE_INVENTORY_INPUT.exists():
        with SOURCE_INVENTORY_INPUT.open(newline="", encoding="utf-8-sig") as handle:
            inventory = list(csv.DictReader(handle))
        for row in inventory:
            register_source(
                clean(row.get("url", "")),
                dataset=SOURCE_INVENTORY_INPUT.name,
                verified="2026-08-30",
                documents=[part for part in clean(row.get("source_files", "")).split("|") if part],
            )
    else:
        for path in ROOT.rglob("*.md"):
            if ".git" in path.parts:
                continue
            for url in extract_markdown_urls(path):
                register_source(
                    url,
                    dataset=path.name,
                    verified="2026-08-30",
                    documents=[str(path.relative_to(ROOT))],
                )

    source_rows = []
    for item in sources.values():
        row = dict(item)
        row["observed_urls"] = "|".join(sorted(row["observed_urls"]))
        row["used_by_record_ids"] = "|".join(sorted(row["used_by_record_ids"]))
        row["used_by_names"] = "|".join(sorted(row["used_by_names"], key=str.casefold))
        row["used_by_documents"] = "|".join(sorted(row["used_by_documents"]))
        row["source_datasets"] = "|".join(sorted(x for x in row["source_datasets"] if x))
        source_rows.append(row)
    source_rows.sort(key=lambda r: (r["domain"], r["url"]))

    write_csv(DATA / "proptech_master_companies.csv", master, MASTER_FIELDS)
    write_json(DATA / "proptech_master_companies.json", master)

    normalized_entities = build_normalized_entities(master, grouped)
    claims = build_claim_registry(raw_rows)
    assertions = build_assertion_register(raw_rows)
    relationships = build_relationship_register(raw_rows)
    discovery_universe = build_discovery_universe(
        normalized_entities,
        auxiliary_rows.get("yc_real_estate_construction_directory_2026-08-30", []),
        auxiliary_rows.get("built_environment_ecosystem_discovery_index", []),
    )
    normalized_outputs = {
        "atlas_entities": normalized_entities,
        "claims_registry": claims,
        "entity_field_assertions": assertions,
        "entity_relationships": relationships,
        "discovery_universe": discovery_universe,
    }
    for output_name, rows in normalized_outputs.items():
        if rows:
            write_csv(DATA / f"{output_name}.csv", rows, list(rows[0]))
            write_json(DATA / f"{output_name}.json", rows)

    lifecycle_rows = [
        {
            "code": code,
            "label": label,
            "taxonomy_version": "2026-08-30-v1",
            "editorial_note": "Lifecycle and technology layer are separate axes.",
        }
        for code, label in LIFECYCLE_TAXONOMY
    ]
    write_csv(DATA / "lifecycle_taxonomy.csv", lifecycle_rows, list(lifecycle_rows[0]))
    write_json(DATA / "lifecycle_taxonomy.json", lifecycle_rows)

    source_fields = [
        "source_id",
        "url",
        "observed_urls",
        "domain",
        "inferred_source_class",
        "source_quality_grade_provisional",
        "quality_grade_status",
        "used_by_record_ids",
        "used_by_names",
        "used_by_documents",
        "source_datasets",
        "last_verified",
        "editorial_note",
    ]
    write_csv(DATA / "source_register.csv", source_rows, source_fields)
    write_json(DATA / "source_register.json", source_rows)

    statuses = Counter(row["status"] for row in master)
    countries = Counter(row["hq_country"] or "unknown" for row in master)
    record_types = Counter(row["record_type"] for row in normalized_entities)
    claim_grades = Counter(row["claim_attribution_grade_provisional"] for row in claims)
    manifest = {
        "generated_at": "2026-08-30",
        "research_cutoff": "2026-08-30",
        "input_files": input_counts,
        "auxiliary_datasets": auxiliary_counts,
        "missing_optional_inputs": missing_inputs,
        "raw_records": len(raw_rows),
        "unique_master_records": len(master),
        "records_merged_as_duplicates": len(raw_rows) - len(master),
        "records_with_status_conflicts": sum(row["status_conflict"] == "true" for row in master),
        "unique_source_urls": len(source_rows),
        "normalized_schema_outputs": {
            "atlas_entities": len(normalized_entities),
            "claims_registry": len(claims),
            "entity_field_assertions": len(assertions),
            "entity_relationships": len(relationships),
            "discovery_universe": len(discovery_universe),
            "lifecycle_taxonomy_terms": len(lifecycle_rows),
        },
        "normalized_record_type_counts": dict(record_types.most_common()),
        "discovery_universe_counts": {
            "deduplicated_identities": len(discovery_universe),
            "qualified_core_identities": sum(row["discovery_only"] == "false" for row in discovery_universe),
            "discovery_only_identities": sum(row["discovery_only"] == "true" for row in discovery_universe),
            "identities_with_yc_profiles": sum(bool(json.loads(row["yc_company_ids_json"])) for row in discovery_universe),
            "identities_with_ecosystem_membership": sum(bool(json.loads(row["ecosystems_json"])) for row in discovery_universe),
            "identity_ecosystem_memberships": sum(int(row["ecosystem_count"]) for row in discovery_universe),
            "ecosystem_source_rows_represented": sum(int(row["ecosystem_source_row_count"]) for row in discovery_universe),
        },
        "provisional_claim_grade_counts": dict(claim_grades.most_common()),
        "normalized_review_queue": {
            "entities_with_tier_conflicts": sum(row["relevance_tier_conflict"] == "true" for row in normalized_entities),
            "entities_without_verified_canonical_domain": sum(row["canonical_url_status"] != "resolved" for row in normalized_entities),
            "entities_requiring_editorial_review": sum("requires_editorial_review" in row["publication_readiness"] for row in normalized_entities),
            "claims_requiring_claim_level_review": len(claims),
            "discovery_identities_requiring_resolution": sum(row["needs_identity_review"] == "true" for row in discovery_universe),
        },
        "status_counts": dict(statuses.most_common()),
        "top_hq_country_values": dict(countries.most_common(20)),
        "important_note": "Counts describe a curated evidence-qualified core plus separate dated discovery layers, not the total global market. The legacy master preserves disagreements; use atlas_entities and child assertion/claim tables for website work. Provisional grades require editorial review before publication.",
    }
    with (DATA / "atlas_manifest.json").open("w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2, ensure_ascii=False)
        handle.write("\n")

    print(json.dumps(manifest, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
