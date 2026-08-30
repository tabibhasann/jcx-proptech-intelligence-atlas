# Final corpus QA audit

> **Historical baseline audit:** this file records the 228-record build that triggered normalization. The current expanded release is 295 qualified entities and 978 discovery identities, validated in `research/final_release_validation.md`; use `data/atlas_manifest.json` for live counts. Older “current” wording below refers to the baseline remediation checkpoint.

> **Post-audit status:** This report is the independent baseline audit that triggered the normalization work. The current build now adds typed `atlas_entities`, claim, assertion and relationship tables; separates provisional source quality from claim attribution; ingests the delimiter-safe full source inventory into a 1,077-URL normalized register covering 1,085 exact variants; removes discovery profiles from public canonical-domain fields; and preserves mixed tiers/years as reviewable candidates. See `research/post_remediation_validation.md` and `data/atlas_manifest.json` for the current release state. The legacy master intentionally remains unchanged in shape for lineage compatibility, so findings that name that file remain historically accurate.

**Audit date:** 30 August 2026  
**Scope:** current contents of the JCX PropTech research corpus, including the atlas, research Markdown, organization and auxiliary CSV/JSON exports, manifest, source register, and `scripts/build_proptech_master_dataset.py`.  
**Method:** read-only structural checks, CSV/JSON round-trip checks, controlled-vocabulary checks, identity/canonical-URL review, cross-file referential checks, Markdown/link checks, and a small live HTTP sample. This report does not edit or silently correct the corpus.

## Executive result

The corpus is structurally usable as a research draft and the latest build is internally count-consistent. It is not yet safe to present the master CSV as a fully normalized, claim-level evidence database. The highest-priority work is schema normalization and evidence separation before the website treats values as filters, rankings, or endorsements.

### Severity summary

| Severity | Finding | Impact |
|---|---|---|
| **P1** | Evidence grades use incompatible vocabularies and there is no claim-grade/source-quality field in the master data. | Evidence badges and comparisons can be misleading or impossible to interpret. |
| **P1** | Scalar fields contain merged values such as `A || B`, `2012 || 2016`, and shorthand/free-text lifecycle labels. | Filters, counts, sorting and visualizations will misclassify records. |
| **P1** | 62 records—mostly the global pioneer layer—have empty category, maturity, status date and founding-year fields; 18 are Tier A. | The highest-priority corporate benchmarks are incomplete in the website-ready index. |
| **P1** | One master table mixes companies, products, subsidiaries, investors, programs and a cancelled project, without `record_type` or parent/product/relationship fields. | Organization counts and company comparisons are not semantically clean. |
| **P1** | 193 of 478 unique external URLs used in Markdown are not present in `data/source_register.csv`. | Narrative claims cannot all be traced through the source drawer/register. |
| **P2** | Directory/program URLs are reused as `canonical_url` for multiple different startups. | Pages can incorrectly imply that a directory page is the startup’s canonical website. |
| **P2** | The source register is an URL index, not yet the claim-level evidence register specified in the methodology. | Publication, freshness, reviewer and claim-support workflows remain under-modeled. |
| **P2** | Four status conflicts are correctly flagged, but `status_as_of` is the build date rather than the underlying status evidence date. | “Unclear” is visible, but status provenance is not yet auditable enough. |
| **P2** | Four merged founding-year values remain non-scalar. | Numeric/date filters will fail or require ad hoc parsing. |
| **P3** | One normalized duplicate URL remains in the source register (`proq.com.bd` with and without `www`). | Small source-register duplication; no organization-count effect. |
| **P3** | Some sampled official sites return 403 or reset connections to automated HEAD requests. | Not evidence of a broken source; use a browser/manual fallback and record access condition. |

## What passed

### Parsing, exports and manifest

- All current CSV files parsed with Python’s standard `csv` reader; no duplicate headers, overflow columns or control characters were found.
- `data/proptech_master_companies.csv` and `.json` match row-for-row and field-for-field after JSON values are string-normalized: **228 / 228** rows.
- `data/quantified_outcome_cases.csv` and `.json` match: **44 / 44** rows.
- `data/standards_registry.csv` and `.json` match: **39 / 39** rows.
- Manifest arithmetic passes against the current inputs: **252 raw rows = 77 + 93 + 37 + 45; 228 unique master records; 24 merged duplicate rows; 436 source-register URLs; 44 cases; 39 standards.**
- The manifest’s status-conflict count (**4**) matches the four master rows with `status_conflict=true`.
- Master source URLs, case source URLs and standards `primary_url` values all have a corresponding source-register row in the current build.
- Every `used_by_record_ids` value in the source register resolves to a master `record_id`, `case_id` or `standard_id`.
- `record_id`, `source_id`, `case_id` and `standard_id` are unique within their respective datasets.

### Structure, dates and links

- Markdown headings have no level jumps in the audited files; table blocks checked had consistent column counts.
- No internal tool-citation artifacts, task placeholders, dummy domains, loopback hosts or unresolved sentinel tokens were found.
- All populated date fields in the CSV exports match `YYYY-MM-DD`.
- All populated URL fields are syntactically HTTP(S) URLs except the intentionally unresolved BPC canonical URL, which is now blank rather than the literal string `unknown`.
- The root README’s previously missing relative link to `research/final_corpus_qa.md` is satisfied by this report.

### Outcomes and standards

- The 44 outcome rows have no empty fields, duplicate case IDs or duplicate source URLs.
- Outcome-grade distribution is internally consistent with the narrative: **40 B3, 2 B2, 2 A1**.
- The two A1 rows are negative/restructuring cases, not product-ROI claims; the 40 B3 rows are explicitly caveated vendor/customer evidence.
- Standards IDs are unique and the 39 standards JSON/CSV records match.

### URL sample

A limited live sample was tested, prioritizing Tier A company/government pages and representative case studies. Most returned 200 and redirected normally, including Aldar, Autodesk Construction Cloud, Buildots, CapitaLand, Emaar, JLL, Kajima, Lendlease, Mitsui Fudosan, OpenSpace, PlanRadar, REGA, Sell.Do, Skanska, PropERP, Homebase, Landeed, NirmanBazaar and Bproperty. Some sites returned 403 to automated HEAD requests (for example Prologis, Godrej, ISO pages and SEC pages); Bangladesh laws reset one automated connection. These are access-method limitations, not confirmed broken links. The NAR REACH announcement/news pages and YC directory pages returned 200.

## Findings requiring fixes or editorial decisions

### P1 — Evidence-grade semantics are not one controlled system

The methodology defines **source-quality grades S1–S5** and **claim-attribution grades C1–C5** in `research/atlas_methodology_and_website_ia.md` (sections 7.1–7.2). The research layers instead use different grades:

- `research/global_real_estate_pioneers.md` defines A/B/C/D;
- `research/regional_proptech_landscape.md` defines a different A/B/C/D meaning;
- `research/proptech_startup_universe.md` uses directory/source labels such as `(A)`;
- `research/quantified_outcome_case_library.md` uses A1/B2/B3;
- `data/proptech_master_companies.csv` contains A, B, C, D plus `B/D` (6), `B/C` (5) and `B/A` (2).

The master table has `evidence_grade` and `claim_type`, but no separate `source_quality_grade`, `claim_grade`, `confidence`, `reviewer` or claim IDs. Thus `A` can mean different things depending on which source layer supplied the row, and `B/D` is neither a controlled source grade nor a claim grade.

**Recommended fix:** create separate controlled fields such as `source_quality_grade` (`S1`–`S5`), `claim_grade` (`C1`–`C5`), `evidence_summary`, `reported_by`, `reviewer` and `reviewed_at`. Keep legacy layer grades only as `legacy_grade` during migration. Do not map A→S1 automatically: the regional and global A definitions are not identical.

### P1 — Scalar fields are carrying multi-valued or incompatible values

The build script intentionally preserves disagreements with ` || `, but the output schema presents those fields as scalars. Current deviations include:

- `relevance_tier`: 10 `A || B`, 3 `A || C`, 2 `A/B`, 2 `B || C`, 2 `C || B`, 1 `B || A`, 1 `C || A`, 1 `C/D || B`;
- `evidence_grade`: 6 `B/D`, 5 `B/C`, 2 `B/A`;
- `founding_year`: `Sell-Do` row 59 (`2012 || 2016`), `PropERP` row 73 (`2018 || Unknown`), `Bproperty` row 226 (`2016 || 2015`), `ProQ` row 229 (`2025 || Unknown`);
- many fields such as `primary_lifecycle`, `secondary_lifecycle`, `entity_type`, `business_model`, `maturity` and `jcx_relevance` also contain ` || ` concatenations.

This is good preservation of disagreement, but not a valid normalized field. A website filtering for Tier A, “scaleup,” L6 or a founding-year range will either miss records or need undocumented string parsing.

**Recommended fix:** represent multi-valued fields as JSON arrays in JSON and a documented delimiter/child table in CSV; keep one `current_tier` only after editorial resolution; store disagreement in `conflict_values[]` with source and reason. Store founding years as nullable integers plus `founding_year_note`.

### P1 — Lifecycle taxonomy is not applied consistently

The methodology defines L1–L12. The master contains **107 distinct primary-lifecycle strings**, including formal codes (`L1 Land/site`), shorthand (`D/C`, `L/S/H/O/E`), generic labels (`Sales`, `Operations`, `Finance`) and product-specific phrases (`site-selection-feasibility`, `construction-procurement`). A direct token check finds L1–L11 represented but **L12 Cross-lifecycle data and trust has zero explicit records**. Examples of unnormalized values occur throughout `data/proptech_master_companies.csv`, especially rows 2–61 from the global pioneer input and rows 59, 73, 100, 144, 188, 226–229 where duplicate merging preserves multiple vocabularies.

**Recommended fix:** add a controlled `lifecycle_codes[]` field using only L1–L12 and retain `lifecycle_label_legacy` for source wording. Map D/C/F/S/H/O/E only through a documented mapping table; do not infer L12 merely from a product being a data platform.

### P1 — 62 high-priority rows are incomplete in core fields

The master has **62 empty values** in each of `category`, `maturity`, `status_as_of` and `founding_year`. They are concentrated in the global real-estate-pioneer input, whose source CSV has no category, maturity, status date or founding-year columns. This includes **18 Tier A** rows:

`31VENTURES; Aldar Properties; Bouygues Construction; CapitaLand Investment; Emaar Development; Godrej Properties; JLL; JLL Spark; Kajima; Keppel; Lendlease; Lodha Developers / Macrotech; Mitsui Fudosan; Prestige Group; Prologis; Related Companies; Related Digital; Skanska`.

It also includes 38 Tier B and 6 Tier C rows. These are not necessarily research errors—the source layer was designed differently—but the result is not ready for uniform website cards or a maturity/evidence scatter plot.

**Recommended fix:** extend the corporate input schema or add an explicit `record_type`-specific completeness rule. At minimum, assign category/taxonomy, a documented corporate maturity label, and a dated status check to anchor companies; leave founding year null when unverified rather than using the string `Unknown`.

### P1 — Organization, product, program and project records are mixed

`data/proptech_master_companies.csv` is described as a company index, but it contains organizations and non-organization records. Examples include:

- products/platforms: row 7 `Autodesk Construction Cloud / Forma`, row 56 `Salesforce Real Estate Cloud`;
- CVC/programs: rows 2 `31VENTURES`, 33 `JLL Spark`, 90 `BRICKS FUND TOKYO`;
- government/ecosystem program: row 57 `Saudi-PropTech-Hub-REGA`;
- investor/accelerator portfolio indexes: rows 191 `Alchemist built-world adjacent portfolio`, 196 `Brick & Mortar Ventures portfolio`, 202 `Fifth Wall portfolio`, 208 `MetaProp portfolio`, 209 `NAR REACH portfolio`, 211 `Pi Labs portfolio`, 214 `Plug and Play Real Estate & Construction` and 221 `Taronga RealTechX`;
- a cancelled development project/partnership: row 165 `Sidewalk Labs / Quayside`;
- acquired/subsidiary or brand combinations: `BuildingConnected`, `Fieldwire`, `PlanGrid`, `Veev by Lennar`, `DLF / DCCDL`, `Lodha Developers / Macrotech`.

The methodology correctly calls for separate `organization`, `product`, `program_ecosystem`, `case_study` and `relationship` records, but the CSV has no `record_type`, `parent_id`, `product_id`, `successor_id` or relationship table.

**Recommended fix:** either rename the export to a general `atlas_entities` table and add `record_type`, or split into organization/product/program/project tables with relationship edges. Do not count 228 as “companies” without qualification; the manifest’s “organizations/programs” wording is safer.

### P1 — Narrative source coverage is incomplete in the source register

The current register has **436 URLs** and covers the structured master, case and standards datasets. Extracting unique external Markdown links finds **478** URLs; **193** are not present in `data/source_register.csv`. They include legitimate narrative sources such as JCX pages, Bangladesh government/industry pages, ISO/buildingSMART pages, JLL/EIB/PwC/MetaProp/Nymbl research, and extra primary sources cited in the global/regional narratives.

This is not a URL validity finding. It is a provenance completeness finding: a future website source drawer built only from `source_register.csv` will omit many sources used by the written atlas.

**Recommended fix:** either (a) ingest all external Markdown sources into the source register with `used_by_document`/`used_by_claim` references, or (b) explicitly define the register as “structured-dataset sources only” and maintain a second narrative bibliography. The methodology requires claim-level source support, so option (a) is preferable.

### P2 — Shared directory pages are being used as canonical URLs

The following are real multi-record URL collisions, not automatic duplicate identities:

| Master rows | Shared `canonical_url` | Records |
|---|---|---|
| 83, 86, 91, 130, 134, 168 | `https://www.nar-reach.com/second-century-ventures-announces-6-technology-companies-for-2026-reach-scale-up-program` | Ai.realestate, Association Online, BrokerBot, LotRoll, MaxHome.ai, StackWrap |
| 84, 115, 160, 173, 184 | `https://www.nar-reach.com/news` | Asano, HoloX, Rewa, Takeem, Watad |
| 203, 206, 212, 216 | `https://www.ycombinator.com/companies/industry/real-estate-and-construction` | Fresco, Karmen, PLAN0 AI, PropRise |

The directory URLs are valid discovery sources, but they are not canonical company URLs. Keep them under `source_urls`; make `canonical_url` nullable until the company’s own domain or a stable profile is verified.

Two important duplicate candidates were handled correctly in the latest build: Autodesk Construction Cloud/Autodesk Construction Cloud is merged into one record (merged count 2), and Homebase/Homebase-SEA is merged into one record (merged count 2). The latter should use official **Homebase** as the canonical display name and keep `Homebase-SEA` as an alias; the official [YC Homebase page](https://www.ycombinator.com/companies/homebase) says it was founded in Singapore in 2019 and is located in Ho Chi Minh City, confirming that the two source rows describe the same SEA financing company.

### P2 — Source register metadata is below the methodology target

`data/source_register.csv` currently has only nine columns: `source_id`, `url`, `domain`, inferred class, record references, datasets, `last_verified` and an editorial note. The methodology’s target source model additionally calls for title, publisher, source type, canonical URL, publication/effective dates, retrieval date, language, geography, version, license/usage note, quality grade, archived copy/hash, reviewer, notes and claim support/contradiction IDs.

The current register is a useful URL index and passes referential checks, but its inferred source class is not the same as a quality grade and all records sharing a source URL do not necessarily share the same claim. Add the richer fields before publication or label the current file clearly as a build index.

### P2 — Status and date provenance needs a second layer

The four flagged status conflicts are:

| Master row | Record | Current status | Why flagged |
|---:|---|---|---|
| 73 | PropERP | `unclear` | Live product evidence and unverified/unclear operating evidence are merged. |
| 100 | E-Hishabi | `unclear` | Same pattern. |
| 144 | NirmanBazaar | `unclear` | Same pattern. |
| 226 | Bproperty | `unclear` | Historic/legacy affiliation and current-domain evidence need resolution. |

This is an acceptable cautious editorial outcome, not an error. The problem is that the rows’ `status_as_of=2026-08-30` is the research/build date, not necessarily the date on which the underlying status event was established. Separately, **62 global-pioneer rows have no `status_as_of` at all**.

**Recommended fix:** keep `last_verified` as retrieval date, add `status_evidence_date`, `status_source_id`, `status_event_type` and a status-history table. Do not overwrite “unclear” with “active” merely because a domain responds.

### P2 — Founding-year values need numeric normalization

The four exact non-scalar founding-year values are:

| Master row | Record | Value |
|---:|---|---|
| 59 | Sell-Do | `2012 || 2016` |
| 73 | PropERP | `2018 || Unknown` |
| 226 | Bproperty | `2016 || 2015` |
| 229 | ProQ | `2025 || Unknown` |

These are reasonable preserved source disagreements, but a numeric field must be either one verified year or null plus a note. Use `founding_year_min`, `founding_year_max` or a conflict table if the distinction matters.

### P3 — One URL normalization duplicate remains

`data/source_register.csv` rows 303–304 contain both `https://proq.com.bd/` and `https://www.proq.com.bd/`. They normalize to the same scheme/host/path. This is harmless but inconsistent with the file’s “deduplicated source URLs” description.

**Recommended fix:** normalize host casing, leading `www.`, trailing slash and known tracking parameters before source-ID generation; preserve the observed URL as an alias if needed.

## Coverage and representation audit

The corpus is broad but should not be described as a complete global market census. Current master counts are 228 records: 64 exactly Tier A, 107 exactly Tier B and 35 exactly Tier C, with 22 records carrying mixed tier values. Headquarters are strongest in the United States (97), India (15), United Arab Emirates (14), Bangladesh (14), Australia (11), United Kingdom (11), Japan (10), Singapore (8) and Canada (7). This is a curated research distribution, not market share.

The lifecycle representation is not currently count-safe because of free-text/shorthand values. After token normalization, L1–L11 appear, while L12 has no explicit record. The website should not publish a lifecycle heatmap until all rows map to controlled codes and multi-lifecycle membership is stored as arrays/edges.

The regional files do provide meaningful Bangladesh, South Asia, MENA, SEA, Japan, Australia, Europe, Latin America and Africa coverage. The main gap is not simply missing countries; it is uneven evidence and uneven schema completeness. The corpus correctly includes weakly evidenced companies and accelerator signals, but those should remain visibly separate from production-proven benchmarks.

## Script and pipeline observations

`scripts/build_proptech_master_dataset.py` is readable, standard-library-only and deliberately preserves conflicts. The latest version correctly imports auxiliary `primary_url` values from the standards registry and records their sources; the current data/manifest reflect that fix (436 URLs). The following design choices still need hardening before production:

1. `merge_text()` concatenates values into scalar fields. Use typed arrays or child tables for fields that are naturally multi-valued.
2. Identity is primarily normalized display-name based, with a small alias/split map. Keep a reviewed alias table keyed by domain/legal entity and record every merge/split decision.
3. `canonical_url()` chooses a URL from input values but does not enforce that it is an organization URL; directory pages can therefore become canonical URLs.
4. `slug()` derives IDs from the identity key. This is deterministic for the current mapping, but a future name/alias change can change IDs unless a persisted identity registry is used.
5. `source_class()` is an inferred domain class, not source quality or claim verification. Keep the editorial note, but expose the distinction in the schema.
6. The script builds a source register from structured inputs, not all Markdown narrative links. Add a bibliography ingestion step or document that boundary.

## Recommended release gates

Before importing this corpus into a public website:

1. Freeze v1 controlled vocabularies for record type, lifecycle, technology layer, status, tier, maturity/MRL, source quality and claim grade.
2. Separate organization/product/program/project/case entities and add parent, successor, acquisition, program and product relationships.
3. Normalize the 22 mixed-tier records, 13 mixed-evidence records and four mixed-year records; preserve conflicts with source-linked child records.
4. Complete category, maturity and status-date fields for the 18 Tier A corporate anchors, or mark them explicitly `not yet reviewed` rather than leaving silent blanks.
5. Ingest or clearly scope the 193 narrative URLs missing from the source register.
6. Add source title/publisher/publication date/effective date/quality/reviewer and claim-support fields.
7. Add automated QA to fail a build on invalid enum values, literal `unknown` in URL fields, non-scalar numeric fields, unreferenced sources, unresolved canonical-URL directory records and manifest/narrative-count drift.
8. Keep all Tier C, directory-only and company-reported claims visibly attributed; never convert accelerator selection, funding or a live website into outcome evidence.
