# Discovery universe QA audit

> **Disposition update (30 August 2026):** This document records the independent pre-remediation audit of the 689-row build. Its release-blocking findings were fixed, and later expansion produced the current 978-identity universe with all 683 ecosystem source rows/memberships preserved and 26 deliberately reviewable relationship identities. Use `research/final_release_validation.md` and `data/atlas_manifest.json` for current facts; the older verification sections below remain an audit trail.

**Audit date:** 30 August 2026  
**Scope:** `data/discovery_universe.csv` and `.json`, `data/atlas_entities.csv`, `research/yc_real_estate_construction_directory_2026-08-30.csv`, `research/built_environment_ecosystem_discovery_index.csv`, and the identity/join logic in `scripts/build_proptech_master_dataset.py`.  
**Method:** read-only CSV/JSON parsing, row/ID/set arithmetic, exact source-pair reconciliation, normalized name/domain collision analysis, and source-row inspection. This report is the only file created by this audit; source data and the build script were not edited.

## Executive result

The generated exports are structurally consistent and preserve all qualified IDs and YC profiles. They contain **689 discovery rows**, as expected from the current layer arithmetic. However, the identity join is **not release-safe**: an exact-domain-first rule silently collapses two distinct Pi Labs companies, `howie ai` and `trubrics`, into one discovery identity (`dsc-0bef91fb1942`) with `needs_identity_review=false`. This is a high-severity identity error because it combines two different company descriptions, founding years, cities, founders and funding stages and reduces the identity-level ecosystem count by one.

The same rule also collapses acquisition/successor names (`Betterview`→`Nearmap`, `Honest Buildings`→`Procore`). These may be valid relationship edges, but they should not be silently treated as aliases in an entity discovery index.

## Count and export checks

| Check | Result | Status |
|---|---:|---|
| `data/discovery_universe.csv` data rows | 689 | PASS |
| `data/discovery_universe.json` objects | 689 | PASS |
| CSV/JSON row and field equality | 689/689 exact | PASS |
| Unique `discovery_id` values | 689/689 | PASS |
| Qualified-core input rows | 228 | PASS |
| YC input profiles | 128 | PASS |
| Ecosystem input rows | 429 | PASS, with one identity collapse noted below |
| Output `qualified_core` rows | 228 | PASS |
| Output YC company IDs | 128 unique, all retained | PASS |
| Output ecosystem-bearing identities | 408 | PASS as current build output; 409 expected if Howie AI and Trubrics are separate |
| Output identity×ecosystem memberships | 428 | **FAIL for identity preservation**; source has 429 distinct `(ecosystem, company_name)` pairs |
| `needs_identity_review=true` rows | 0 | **FAIL**; false merge is not flagged |

The raw input total is `228 + 128 + 429 = 785` rows. The 689-row union is explained by 21 within-ecosystem identity reductions (20 legitimate multi-ecosystem duplicates plus the Howie AI/Trubrics false merge) and 75 cross-layer overlap reductions.

## Exact layer overlap arithmetic

The generated rows have these exact source-layer combinations:

| Layer combination | Rows |
|---|---:|
| Qualified core only | 156 |
| YC only | 91 |
| Ecosystem only | 368 |
| Qualified core + YC | 34 |
| Qualified core + ecosystem | 37 |
| YC + ecosystem | 2 |
| All three layers | 1 |
| **Total** | **689** |

Inclusive intersections are: qualified core∩YC **35**, qualified core∩ecosystem **38**, YC∩ecosystem **3**, and all-three **1**. The three-layer union is therefore `228 + 128 + 408 - 35 - 38 - 3 + 1 = 689`.

The input ecosystem rows reconcile as follows:

- All **429/429** exact `(ecosystem, company_name)` source pairs are represented somewhere in output `name_variants_json` + `ecosystems_json`; no source row is absent at the textual pair level.
- All **360/360** non-empty ecosystem company URLs and all **429/429** official source URLs are represented in output `source_urls_json` (after the build's conservative URL normalization; 69 source rows have no company URL).
- Output has only **428** candidate×ecosystem memberships because the two Pi Labs rows for `howie ai` and `trubrics` become one candidate×ecosystem edge.
- The 20 other two-row output identities are same-company multi-ecosystem memberships (for example AIRE, ALICE Technologies, Dealpath, Higharc, OpenSpace and WiredScore); those reductions are expected and preserve both ecosystem values.

## Qualified core and YC coverage

- Every `entity_id` in `data/atlas_entities.csv` appears exactly once in `qualified_entity_ids_json`; there are **0 missing and 0 extra IDs**.
- Every YC `yc_company_id` appears exactly once in `yc_company_ids_json`; there are **0 missing and 0 extra IDs**. The input has 128 unique IDs, names and profile URLs, with no duplicate profile identity.
- No output row contains more than one qualified entity ID or more than one YC company ID. The one all-three record is Snapdocs, and the 35 core–YC overlaps are all exact normalized-name joins (with source/location agreement in the inspected rows).
- The YC snapshot arithmetic is internally sound: every row says `Real Estate and Construction`, `directory_count_at_snapshot=128`, and statuses total 100 Active, 27 Acquired and 1 Public.
- Every `*_json` field parses as a JSON list; all 689 rows have a display name and snapshot date `2026-08-30`.

## High-severity identity error

### `howie ai` and `trubrics` are incorrectly merged

Source rows 361 and 373 in the [ecosystem discovery index](./built_environment_ecosystem_discovery_index.csv) are both Pi Labs entries and both point to `https://www.trubrics.com/`, but their official card descriptions are materially different:

- **howie ai:** AEC knowledge platform; Est. 2024; Vienna; founded by Ewa Lenart; Pre-Seed.
- **trubrics:** AI agents for real-estate finance; Est. 2022; London; founded by Jeff Kayne and Joel Hodgson; Seed.

The pre-remediation output row 284 in the [discovery-universe export](../data/discovery_universe.csv) was named `howie ai`, carried `name_variants_json=["howie ai","trubrics"]`, combined both descriptions, but reported only one ecosystem membership and one discovery identity. Its methods were `exact_domain` and `source_native_ecosystem_identity`, with `needs_identity_review=false` and an empty identity note.

The cause was in the earlier [dataset builder](../scripts/build_proptech_master_dataset.py): an exact company-domain match was accepted before name corroboration. The code did not require the source name to agree with the existing identity and did not flag a domain/name mismatch. The source itself is likely a stale/mislinked Pi Labs outbound URL for one card, so the URL cannot prove that the two companies are one entity.

**Required fix:** split the two rows into separate source-native ecosystem identities unless an explicit reviewed alias/relationship confirms a rebrand. Preserve the shared URL as a source observation, add a `domain_name_mismatch` review flag, and keep both ecosystem memberships. Do not use a shared outbound URL as sufficient identity proof.

## Other suspicious domain joins

These are not necessarily wrong as corporate histories, but they are distinct observed names and should be represented as explicit acquisition/successor or historical-entity relationships rather than silent aliases:

| Output row | Source names | Evidence in source | Risk |
|---|---|---|---|
| Pre-remediation output row 403 | `Betterview` + `Nearmap` | MetaProp row 162 in the [ecosystem index](./built_environment_ecosystem_discovery_index.csv) points to Nearmap’s `/products/betterview` page and marks Betterview exited. | Distinct acquired product/company name was folded into current Nearmap identity. |
| Pre-remediation output row 474 | `Honest Buildings` + `Procore` + `Procore — Exited` | JLL Spark row 115 says “Exited to Procore”; Fifth Wall row 89 is Procore. | Distinct historical entity was folded into Procore; status and claims were combined. |
| Pre-remediation output row 284 | `howie ai` + `trubrics` | Same Pi Labs page and same URL, but distinct descriptions, people, dates and locations. | **Confirmed false merge; high severity.** |

The following same-domain name pairs are likely spelling/case variants rather than separate entities, but still merit a reviewed alias table: `Obie Insurance`/`Obieinsurance`, `Jones`/`Getjones`, and `Verge Sense`/`Vergesense`. The output correctly keeps both observed names, but currently labels all of them only with `exact_domain` and no review decision.

Two qualified-core records intentionally retain shared parent/product domains without being merged: `BuildingConnected` and `Autodesk Construction Cloud / Forma` both use `construction.autodesk.com`; `Masdar City` and `Mubadala Real Assets` both use `mubadala.com`. This is evidence that domain identity is not unique and should be treated as a corroborating identifier, not a universal key.

## Name and identity uniqueness

- No duplicate normalized `display_name` exists across the 689 output rows.
- No duplicate qualified ID or YC ID exists in output.
- Sixteen rows have multiple observed names; most are case, punctuation, exit-marker or known acquisition/name variants. The material semantic mismatches are the three rows above, especially Howie AI/Trubrics.
- All 36 output rows carrying `exact_domain` include no domain collision review flag. This is too permissive: the 36 includes the confirmed false merge and acquisition/name mismatches.
- `needs_identity_review` is false for every row, so the field currently gives a false sense of clean identity resolution.

## Actionable script/data fixes

1. Change ecosystem matching so an exact domain can merge only when the normalized source name is an approved alias of the matched identity, or when an independent corroborator (canonical name, legal name, reviewed redirect, or source-specific alias table) agrees.
2. When domain matches but names differ materially, create a separate source-native candidate and set `needs_identity_review=true` with a reason such as `domain_name_mismatch`; never silently merge.
3. Add a durable reviewed identity registry for aliases, acquisitions, products and successors. Record `merge`, `split`, `acquired_by` and `rebrand_of` decisions separately from discovery membership.
4. Preserve input row provenance (`source_dataset` plus source row number) in the discovery layer so a stale/mislinked URL can be corrected without conflating entities.
5. Add CI assertions that compare source `(ecosystem, company_name)` pairs with output identity×ecosystem edges, failing if a pair count drops without an explicit reviewed merge decision.
6. Keep the 689 count only after deciding whether acquired products/historical companies are intended to be separate discovery identities. If Howie AI and Trubrics are split, the corrected union should be **690** while preserving all 429 ecosystem rows and 429 identity×ecosystem memberships.

## Final disposition

**Structural QA:** pass. CSV/JSON parity, uniqueness, qualified-core coverage and YC coverage all pass.  
**Source-row coverage:** textual ecosystem pair and URL coverage pass, but identity-level membership coverage fails by one due to the Howie AI/Trubrics collapse.  
**Identity QA:** fail pending a reviewed split of Howie AI/Trubrics and explicit treatment of Betterview/Nearmap and Honest Buildings/Procore.  
**Release recommendation:** do not publish the 689-row discovery universe as an identity-clean index until the domain/name mismatch rule and the three collision decisions are fixed and regenerated.

## Post-remediation verification

The builder now resolves an ecosystem row by exact normalized name first and uses its company domain only as corroboration. A shared domain never proves identity. Explicit exit/stock annotations can be stripped for matching, and a small reviewed alias registry handles source-inferred label variants only when the expected domain agrees. The live Hippo redirect is also a reviewed domain alias.

The regenerated results are:

| Check | Corrected result |
|---|---:|
| Discovery identities | 690 |
| Qualified IDs retained exactly once | 228/228 |
| YC IDs retained exactly once | 128/128 |
| Ecosystem source-row IDs retained exactly once | 429/429 |
| Ecosystem-linked identities | 410 |
| Identity–ecosystem memberships | 429 |
| Identity records requiring relationship review | 6 |

The six review records are the three deliberately separated pairs: Betterview/Nearmap, Honest Buildings/Procore and Howie AI/Trubrics. Reviewed benign label variants—Estateintel/Estate Intel, Getjones/Jones, Obieinsurance/Obie Insurance, Verge Sense/VergeSense, and the Hippo/myhippo.com redirect—resolve without creating duplicate identities. Regression checks in the [corpus validator](../scripts/validate_proptech_corpus.py) now fail if any of the three material pairs is re-merged, any ecosystem source-row identity is lost or duplicated, a domain-only merge method returns, or an unexplained shared domain is left unflagged.
