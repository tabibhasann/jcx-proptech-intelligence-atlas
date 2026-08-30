#!/usr/bin/env python3
"""Build a delimiter-safe inventory of research URLs from source documents."""

from __future__ import annotations

import csv
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse

import build_proptech_master_dataset as build


ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / "research"
OUTPUT_CSV = RESEARCH / "full_corpus_source_inventory.csv"
OUTPUT_MD = RESEARCH / "full_corpus_source_inventory.md"
URL_RE = re.compile(r"https?://[^\s<>\"'`|;,]+", flags=re.I)


def clean_url(value: str) -> str:
    value = value.strip()
    while value and value[-1] in ".,;:":
        value = value[:-1]
    while value.endswith(")") and value.count(")") > value.count("("):
        value = value[:-1]
    return value.rstrip("]}")


def scoped_files() -> list[Path]:
    paths: list[Path] = []
    for path in ROOT.glob("*.md"):
        paths.append(path)
    for pattern in ("*.md", "*.csv", "*.json", "*.py"):
        paths.extend(RESEARCH.glob(pattern))
    paths.extend((ROOT / "scripts").glob("*.py"))
    excluded = {
        OUTPUT_CSV.resolve(),
        OUTPUT_MD.resolve(),
    }
    return sorted({path for path in paths if path.resolve() not in excluded})


def urls_in_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    return [clean_url(match) for match in URL_RE.findall(text) if clean_url(match)]


def current_register() -> tuple[set[str], set[str]]:
    path = ROOT / "data" / "source_register.csv"
    if not path.exists():
        return set(), set()
    with path.open(newline="", encoding="utf-8-sig") as handle:
        rows = list(csv.DictReader(handle))
    normalized = {row.get("url", "") for row in rows if row.get("url", "")}
    exact = set(normalized)
    for row in rows:
        exact.update(value for value in row.get("observed_urls", "").split("|") if value)
    return exact, normalized


def authority_hint(source_class: str) -> str:
    return {
        "government_or_regulator": "likely authoritative/official (heuristic)",
        "company_or_product": "likely first-party/company domain (heuristic)",
        "ecosystem_or_investor": "official membership source or investor domain (heuristic)",
        "research_or_industry": "research/industry context; authority varies",
        "independent_media": "independent reporting; verify article scope",
    }.get(source_class, "unclear (not verified)")


def main() -> None:
    files = scoped_files()
    occurrences: Counter[str] = Counter()
    files_by_url: dict[str, set[str]] = defaultdict(set)
    file_counts: dict[str, int] = {}
    for path in files:
        urls = urls_in_file(path)
        relative = str(path.relative_to(ROOT))
        file_counts[relative] = len(urls)
        occurrences.update(urls)
        for url in urls:
            files_by_url[url].add(relative)

    register_exact, register_normalized = current_register()
    rows: list[dict[str, str]] = []
    for url in sorted(occurrences):
        parsed = urlparse(url)
        normalized = build.normalized_source_key(url)
        malformed = not parsed.scheme.startswith("http") or not parsed.netloc
        inferred = build.source_class(url) if not malformed else "unknown_or_unclassified"
        rows.append(
            {
                "url": url,
                "normalized_url": normalized,
                "domain": parsed.netloc.lower().removeprefix("www."),
                "source_files": "|".join(sorted(files_by_url[url])),
                "source_file_count": str(len(files_by_url[url])),
                "citation_occurrence_count": str(occurrences[url]),
                "in_current_source_register_exact": "yes" if url in register_exact else "no",
                "in_current_source_register_normalized": "yes" if normalized in register_normalized else "no",
                "source_register_source_ids": "",
                "inferred_source_class": inferred,
                "source_class_basis": "conservative domain/path heuristic; not a claim-quality decision",
                "official_or_primary_inference": authority_hint(inferred),
                "malformed_url": "yes" if malformed else "no",
                "malformed_reason": "missing HTTP(S) scheme or hostname" if malformed else "",
            }
        )

    with OUTPUT_CSV.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)

    normalized_groups: dict[str, list[str]] = defaultdict(list)
    for row in rows:
        normalized_groups[row["normalized_url"]].append(row["url"])
    collisions = {key: values for key, values in normalized_groups.items() if len(values) > 1}
    normalized_covered = len(
        {
            row["normalized_url"]
            for row in rows
            if row["in_current_source_register_normalized"] == "yes"
        }
    )
    exact_covered = sum(row["in_current_source_register_exact"] == "yes" for row in rows)
    class_counts = Counter(row["inferred_source_class"] for row in rows)

    class_table = "\n".join(
        f"| `{name}` | {count} |"
        for name, count in sorted(class_counts.items(), key=lambda item: (-item[1], item[0]))
    )
    file_table = "\n".join(
        f"| `{name}` | {count} |"
        for name, count in sorted(file_counts.items(), key=lambda item: (-item[1], item[0]))
        if count
    )
    collision_table = "\n".join(
        f"| `{key}` | {'<br>'.join(f'`{value}`' for value in values)} |"
        for key, values in sorted(collisions.items())
    ) or "| — | No normalized collisions |"

    report = f"""# Full corpus source inventory

**Generated:** 30 August 2026  
**Purpose:** delimiter-safe source-lineage inventory for every unique HTTP(S) URL in the research-source and narrative corpus.

## Scope and method

The inventory scans root research/strategy Markdown, `research/` Markdown/CSV/JSON/Python and the two corpus build/validation scripts. Generated `data/` copies are excluded so citations are not counted twice. The inventory files exclude themselves.

The parser splits pipe- and semicolon-delimited URL cells before URL normalization, preventing a multi-URL cell from being mistaken for one URL. Exact observed strings are retained; normalized identity lowercases scheme/host, removes leading `www`, default ports, fragments, tracking query parameters and non-root trailing slashes. Classification and authority hints are conservative inferences, not evidence grades.

## Validation summary

| Measure | Count |
|---|---:|
| Scoped source files scanned | {len(files)} |
| Files with URL occurrences | {sum(count > 0 for count in file_counts.values())} |
| URL citation occurrences | {sum(occurrences.values())} |
| Unique exact URL variants | {len(rows)} |
| Unique normalized URL identities | {len(normalized_groups)} |
| Exact variants represented in current register | {exact_covered} |
| Normalized identities represented in current register | {normalized_covered} |
| Normalized collision groups | {len(collisions)} |
| Malformed URL rows | {sum(row['malformed_url'] == 'yes' for row in rows)} |

## Inferred source classes

| Inferred class | Unique URLs |
|---|---:|
{class_table}

## URL-normalization collision audit

| Normalized URL | Exact observed variants |
|---|---|
{collision_table}

## Files contributing citations

| Source file | URL occurrences |
|---|---:|
{file_table}

## Interpretation

- Register coverage describes URL lineage, not whether a source proves a particular claim.
- Company domains, portfolio pages and YC profiles remain discovery/first-party evidence until a claim receives a reviewer, source-quality grade and attribution grade.
- Repeated URLs are retained once in the inventory with occurrence and source-file counts.
- The CSV is the row-level source of truth for the inventory; `data/source_register.csv/json` joins exact variants to normalized URL identities and usage.
"""
    OUTPUT_MD.write_text(report, encoding="utf-8")
    print(
        f"wrote {len(rows)} exact variants / {len(normalized_groups)} normalized identities "
        f"from {sum(occurrences.values())} occurrences in {len(files)} files"
    )


if __name__ == "__main__":
    main()
