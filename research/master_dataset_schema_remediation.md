# Master dataset schema and remediation specification

> **Historical schema diagnosis:** the counts below describe the original 228-record master. The normalization architecture was implemented and later expanded; use `research/final_release_validation.md`, `data/README.md` and `data/atlas_manifest.json` for the current 295/978 release.

**Status:** implementation specification (does not modify the current exports)  
**Baseline:** files in this workspace as read on 30 August 2026  
**Scope:** `data/proptech_master_companies.csv/.json`, `data/source_register.csv`, `data/atlas_manifest.json`, the four agent input CSVs, auxiliary case/standards CSVs, and the current build script.

## 1. Decision summary

The current master export is a useful denormalized discovery index, not a normalized evidence database. Keep it as a frozen legacy snapshot (`master_legacy_v1`) and introduce a versioned relational model with:

`entity -> product/offering -> taxonomy`, `entity -> relationship`, `entity -> status history`, `claim -> source` and `case study -> claim`.

Do not put evidence, lifecycle membership, aliases, relationships, or competing values into one entity row. Do not carry `evidence_grade` forward as a single entity-level score. A source has a **source-quality grade**; an individual assertion has a **claim-attribution grade**. These are separate dimensions.

The normalized model should preserve every observed value and its source, while deriving a reviewed current value for website use. Existing `record_id` values remain immutable legacy identifiers during migration. New names or better canonical URLs must not regenerate IDs.

## 2. Exact baseline defects

Counts below are recomputed from the current CSV/JSON and manifest unless explicitly marked as the corpus-QA extraction result. “Record” means one row in `data/proptech_master_companies.csv`; “raw row” means one row in the four agent input CSVs.

| Defect | Exact count | Consequence |
|---|---:|---|
| Raw input rows | **252** (77 + 93 + 37 + 45) | Discovery rows are not entity counts. |
| Master rows | **228** | Mixed organizations, products, programs, portfolios and a project are presented in one “companies” export. |
| Duplicate input rows merged | **24 raw rows across 24 master rows** (each has `merged_record_count=2`) | Competing observations have been flattened into one row. |
| Missing `record_type` | **228/228** | No safe way to count organizations, products, programs or projects. |
| Distinct legacy `entity_type` strings | **99**; **24** contain a ` || ` merge | Entity subtype and record type are conflated. |
| Records containing ` || ` in at least one scalar | **24/228** | Sorting, filtering, and numeric parsing depend on undocumented string parsing. |
| Scalar columns containing ` || ` | **15**: `hq_country`, `operating_regions`, `founding_year`, `entity_type`, `business_model`, `cohort_or_ecosystem`, `primary_lifecycle`, `secondary_lifecycle`, `category`, `maturity`, `jcx_relevance`, `relevance_tier`, `headline_claim`, `claim_type`, `caveats` | Multi-valued facts and conflicts have no child rows or provenance. |
| Mixed relevance tiers | **22/228** (20 use ` || `; 2 use slash syntax such as `A/B`) | A/B/C/D/H is not a single reviewed value. |
| Mixed legacy evidence grades | **13/228** (`B/D` 6, `B/C` 5, `B/A` 2) | One row-level grade cannot describe different claims or incompatible layer rubrics. |
| Evidence fields required by methodology but absent | **228/228** have no `source_quality_grade`, `claim_grade`, claim ID, confidence, reviewer, or review event | Source authority, assertion strength, and review state cannot be audited. |
| Explicit lifecycle codes represented | **L1–L11**; **L12 = 0 records** | Cross-lifecycle data/trust is not explicitly represented. |
| Primary-lifecycle values | **108 distinct non-empty strings** in the current CSV; **183/228** rows have no explicit `L1`–`L12` token | The corpus-QA prose says 107; this one-value discrepancy should itself be resolved in CI. Shorthand/free text still needs mapping. |
| Missing core fields | **62 each** for `category`, `maturity`, `status_as_of`, `founding_year`; all 62 originate from the 77-row global pioneer file | The global file has no corresponding columns; 18 of these rows are Tier A. |
| Empty canonical URLs | **16/228** | Directory-only discovery and unresolved BPC cannot be treated as canonical websites. |
| Shared directory source URLs | **21 master records** reference three shared YC/NAR directory pages in `source_urls`; none are currently used as `canonical_url` | Discovery sources must remain source evidence, not entity identity. |
| Status conflicts | **4**: PropERP, E-Hishabi, NirmanBazaar, Bproperty | Current `unclear` is a cautious result, but status history and evidence dates are absent. |
| Status-date problem | **166 populated `status_as_of` values** are exactly `2026-08-30`; **62 are blank** | Build/retrieval date is being used as status evidence date. |
| Non-scalar founding years | **4**: Sell-Do (`2012 || 2016`), PropERP (`2018 || Unknown`), Bproperty (`2016 || 2015`), ProQ (`2025 || Unknown`) | Numeric/date filters cannot safely parse the field. |
| Literal `Unknown` in master founding year | **52** exact values, in addition to the four merged values and 62 blanks | Missingness is encoded as a value rather than a typed state. |
| Source-register rows | **436**; exact duplicate URLs **0** | This is a structured-dataset URL index, not yet a claim-level evidence register. |
| Source-register normalized URL duplicates | **1 extra row**: `proq.com.bd` with and without `www` | Source identity is not fully URL-normalized. |
| External Markdown URLs absent from source register | **193 of 478 unique URLs** (corpus-QA extraction) | A website source drawer built only from the current register omits narrative provenance. |

The current exports do pass CSV/JSON round-trips, manifest arithmetic, ID uniqueness, and structured-source referential checks. Those passes do not cure the semantic defects above.

### 2.1 Raw schema drift

The four agent files contain 77, 93, 37 and 45 rows. The global pioneer file has **19 columns**, while the other three organization files have **22**. It omits `status_as_of`, `founding_year`, `secondary_lifecycle`, `business_model`, `cohort_or_ecosystem`, `category`, and `maturity` for all **77/77** rows. Do not fill these from a default or from `last_verified`; stage them as null with `missingness_reason=source_schema_omitted`.

The case library (44 rows, 16 columns), standards registry (39 rows, 11 columns), and YC directory snapshot (128 rows, 24 columns) are separate datasets and must not be silently coerced into organization rows.

## 3. Target model (v1)

Use a relational store or equivalent document model with the same normalized boundaries. Arrays may be exposed in an API, but they should be stored as child rows so each value can carry provenance.

### 3.1 Core tables

#### `entity`

One identity-bearing thing. Required fields:

```text
entity_id                 immutable ID; retain current record_id for migrated organizations
record_type               organization | product_offering | program_ecosystem | project
display_name              public display label
canonical_name            reviewed name; never used as the identity key
description_public        short factual public description
status_current            active | pilot | stealth_unclear | acquired | merged |
                           pivoted | paused | inactive | dissolved | unknown
status_as_of              date of the latest supported current-status assertion
status_confidence         high | medium | low | unknown
founded_year              nullable integer; organization only when verified
founded_year_precision    year | range | circa | unknown
headquarters_country      ISO-3166-1 alpha-2, nullable
last_reviewed_at          date the atlas reviewed the entity, not a status-event date
publication_state         draft | reviewed | public | retired
```

`entity` contains no `||` values, no pipe-delimited arrays, and no raw source wording. An organization may have zero or many products. A program or project is not counted as an organization unless it has its own organization entity and an explicit relationship.

#### Typed extensions

`organization(entity_id, organization_subtype, legal_name, ownership_status, incorporation_country, public_domain)`

`product_offering(entity_id, owner_organization_id, product_type, proposition_public, deployment_model, commercial_model, ai_mode, integration_posture, data_sensitivity, mrl, mrl_rationale_public)`

`program_ecosystem(entity_id, program_type, operator_organization_id, cohort_or_vintage, participation_status)`

`project(entity_id, project_type, sponsor_organization_id, project_location, start_date, end_date, outcome_status)`

Use `organization_subtype` values such as `startup`, `public_company`, `developer_operator`, `contractor`, `service_provider`, `investor`, `accelerator`, `government`, `association`, and `standards_body`. Keep subtype separate from `record_type`; “Company” is not a sufficient type.

#### `entity_alias`

```text
alias_id, entity_id, alias_text, alias_type, source_id, valid_from, valid_to,
is_public, review_state, note
```

`alias_type` is `trading_name`, `legal_name`, `former_name`, `brand`, `product_alias`, `source_spelling`, or `collision_candidate`. “Autodesk Construction Cloud / Forma” and “Homebase-SEA” must be represented as reviewed aliases/related products, not merged text.

#### `entity_identifier`

```text
identifier_id, entity_id, identifier_type, identifier_value, normalized_value,
source_id, valid_from, valid_to, verification_state
```

Store domains, company-registration IDs, exchange tickers, YC company IDs, and stable profile IDs here. A directory URL is an identifier/source reference, never automatically a canonical domain.

#### `entity_market`

```text
entity_id, market_type, country_code, region_code, market_label_legacy,
source_id, valid_from, valid_to, confidence
```

Replace `operating_regions` with one row per country/region. Preserve the original wording in a lineage note; do not invent country precision from “Global”.

#### `entity_taxonomy`

```text
entity_id, vocabulary, term_code, role, source_id, reviewed_by, reviewed_at
```

`vocabulary` is one of `lifecycle`, `technology_layer`, `category`, `asset_type`, `buyer_role`, or `business_model`. For products, lifecycle `role` is exactly one `primary` and zero or more `secondary`; all other vocabularies are many-to-many.

#### `relationship`

```text
relationship_id, from_entity_id, to_entity_id, relationship_type, status,
announced_at, effective_at, ended_at, source_id, claim_id, review_state, note
```

Controlled `relationship_type` values: `owns`, `parent_of`, `subsidiary_of`, `brand_of`, `product_of`, `operated_by`, `acquired_by`, `successor_of`, `merged_into`, `invested_in`, `member_of_program`, `selected_for_cohort`, `partnered_with`, `implemented_for`, `pilot_for`, and `associated_with`. A portfolio page creates `selected_for_cohort`/`member_of_program`, not ownership of every listed company.

#### `status_event`

```text
status_event_id, entity_id, previous_status, new_status, event_type,
event_date, evidence_date, source_id, claim_id, observed_at, reviewer_id, note
```

`event_date` is when the status change happened; `evidence_date` is the date stated by the source; `observed_at` is retrieval/review time. Never copy `last_verified` into `event_date`.

#### `source`

```text
source_id, url_observed, url_canonical, domain, title, publisher, source_type,
publication_date, effective_date, retrieved_at, language, geography, version,
quality_grade, license_note, archive_reference, content_hash, access_condition,
inferred_source_class_legacy, reviewer_id, notes
```

`source_type` values: `regulatory_filing`, `government`, `standards_body`, `official_product_docs`, `official_company_page`, `company_press_release`, `vendor_case_study`, `customer_announcement`, `independent_research`, `trade_media`, `major_media`, `accelerator_directory`, `investor_portfolio`, `social_profile`, `search_snippet`, or `other`. Keep `inferred_source_class_legacy` for comparison only; it is not a quality grade.

#### `claim`

One independently reviewable assertion, not a row summary:

```text
claim_id, subject_entity_id, claim_kind, field_name, statement_public,
value_type, value_text, value_number, value_unit, scope_geography,
scope_asset_type, scope_customer_role, period_start, period_end,
reported_by, claim_grade, confidence, observed_at, valid_from, valid_to,
review_state, reviewer_id, reviewed_at, limitation_public, supersedes_claim_id
```

`claim_kind` values include `identity`, `status`, `product_description`, `scale_signal`, `outcome`, `ownership`, `funding`, `market_presence`, `technology_support`, `negative_event`, and `atlas_inference`.

#### `claim_source`

```text
claim_id, source_id, support_role, locator, excerpt_hash, source_scope_note,
contradiction_note, reviewer_id, reviewed_at
```

`support_role` is `supports`, `contradicts`, `contextualizes`, or `discovery_only`. A claim can have multiple sources with different roles.

#### `case_study`

Keep the 44 case rows separate and link them to entities/claims:

```text
case_id, customer_entity_id, solution_entity_id, geography, asset_type,
period_start, period_end, baseline, intervention, metric, denominator,
reported_outcome, measured_by, verification_state, transferability,
limitation_public, source_id, claim_id
```

The existence of a case study does not promote a vendor’s general product claims. One case can support one bounded outcome claim.

#### `review_event` and `score_snapshot`

`review_event(entity_id, field_name, previous_value, new_value, action, reason, reviewer_id, reviewed_at, source_id)` records every merge, split, correction and status transition. `score_snapshot(entity_id, as_of, rubric_version, dimensions_json, total_score, tier, confidence, rationale_public, reviewer_id)` makes scores immutable snapshots rather than mutable row fields.

## 4. Deterministic remediation mappings

### 4.1 Missingness and sentinel values

Apply this normalization before field mapping:

| Observed value | Stored value | `missingness_reason` |
|---|---|---|
| empty string, whitespace | `NULL` | `not_provided` unless the source schema omitted the field |
| `Unknown`, `unknown`, `N/A`, `NA`, `none`, `not disclosed` | `NULL` | `explicitly_unknown` or `not_disclosed` (retain exact raw value in staging) |
| source file has no column | `NULL` | `source_schema_omitted` |
| value does not apply to this record type | `NULL` | `not_applicable` |
| value withheld for contractual/privacy reasons | `NULL` | `withheld` |
| value has not passed editorial review | `NULL` in public current field | `unreviewed`; retain candidate in observation/conflict table |

Do not use the string `Unknown` in numeric, date, URL, enum, or public filter fields. API responses may expose `missingness_reason` as a typed badge (`unknown`, `not reviewed`, `not applicable`) rather than an empty card.

### 4.2 Legacy field to target field

| Legacy field | Target | Rule |
|---|---|---|
| `record_id` | `entity.entity_id` | Preserve exactly for migrated rows; never regenerate after rename. Prefix new child IDs (`prod-`, `prog-`, `proj-`, `claim-`, `src-`, `rel-`). |
| `name`, `canonical_name` | `display_name`, `canonical_name` | Keep observed names in `entity_alias`; choose canonical name only through an identity decision. |
| `canonical_url` | `entity_identifier` + source | Accept only a verified entity/product URL. Blank stays null; directory/profile URLs go to `source` and identifier with `identifier_type=discovery_profile`. |
| `source_urls` | `source` + `entity_source` / `claim_source` | Split on `|`, normalize URL identity, preserve observed URL, then attach to the assertion it supports. |
| `source_datasets` | lineage table | One row per input dataset; not a business attribute. |
| `status` | `entity.status_current` + `status_event` | Use status mapping below; preserve raw status observation. |
| `status_as_of` | `status_event.evidence_date` | Only if the source explicitly states the date; otherwise null. |
| `last_verified` | `source.retrieved_at`, `entity.last_reviewed_at` | Retrieval/review date only; never status date. |
| `operating_regions` | `entity_market` | Split only on documented separators and map known region labels; retain raw label and confidence. |
| `founding_year` | `entity.founded_year` | Parse only one 4-digit year in range 1800–current year. All four current conflicts become null plus conflict observations. |
| `entity_type` | `record_type` + typed extension | Apply the precedence/override table below; retain the legacy string. |
| `business_model` | `product_offering.commercial_model` + taxonomy | Map controlled tags; preserve free text as a claim/legacy note. |
| `primary_lifecycle`, `secondary_lifecycle` | `entity_taxonomy(vocabulary=lifecycle)` | Parse codes/aliases below; one reviewed primary, many secondaries; unresolved generic labels queue for review. |
| `category` | `entity_taxonomy(vocabulary=category)` | Split only where a controlled tag list supports it; never merge two category labels into scalar text. |
| `maturity` | `product_offering.mrl` candidate | Never equate organization scale/public status with product MRL; retain legacy maturity and request product evidence. |
| `evidence_grade` | `legacy_grade` observations | Do not map A/B/C/D or B/D/B/C/B/A directly to S1–S5 or C1–C5. Generate source and claim grades at claim level. |
| `headline_claim`, `scale_signal`, `tech_strategy`, `named_initiatives` | one or more `claim` rows | Split atomic assertions; a sentence with multiple metrics becomes multiple claims with separate scopes where needed. |
| `claim_type` | `claim.claim_kind` + `reported_by` | Map wording below; preserve raw wording and unresolved labels. |
| `caveats` | `claim.limitation_public` or entity/product note | Keep caveats attached to the assertion they qualify, not one row-wide string. |
| `relevance_tier` | `score_snapshot.tier` | Exact reviewed A/B/C/D/H can migrate; mixed values remain candidate values with `current tier=NULL`. |
| `merged_record_count`, `identity_note` | `review_event` + identity registry | Record merge reason, source rows, reviewer and date; never use count as identity evidence. |

### 4.3 Record-type precedence and explicit exceptions

Use explicit reviewed overrides first, then deterministic patterns. A pattern that yields an ambiguous result creates a review queue item; it must not silently choose a type.

| Precedence | Legacy signal / explicit name | `record_type` and action |
|---:|---|---|
| 1 | `Sidewalk Labs / Quayside`, or `entity_type` contains `cancelled` and `development` | `project`; create sponsor/partner edges. |
| 2 | `government-program`, `Accelerator`, `Investor/accelerator`, explicit `portfolio`, `program`, `fund`, `challenge`, or cohort index | `program_ecosystem`; create operator/member edges. |
| 3 | Explicit product-only names: `Salesforce Real Estate Cloud`; split `Autodesk Construction Cloud / Forma` into organization/product family/products after identity review | `product_offering`; create/link owning organization. |
| 4 | `Company`, `public company`, `private company`, `startup`, developer/operator, contractor, REIT, investor firm or CVC legal/trading entity | `organization`; map the descriptive text to `organization_subtype`. A CVC remains an organization and can operate a program. |
| 5 | Any unresolved mixed value such as `Company || property management software` | `organization` provisionally; create a product candidate and require reviewer confirmation. Do not use the mixed string as an enum. |

Required explicit identity decisions include Autodesk Construction Cloud/Forma, Homebase/Homebase-SEA, Matterport/CoStar, Veev/Lennar, BuildingConnected, Fieldwire, PlanGrid, DLF/DCCDL, Lodha/Macrotech, FBR/Hadrian X, and all portfolio/program rows. Existing name-based aliases are migration hints only, not proof of legal identity.

### 4.4 Status mapping

| Current legacy status | Canonical status | Additional action |
|---|---|---|
| `active` | `active` | Add status observation. |
| `pilot` | `pilot` | Link pilot relationship/case where available. |
| `unclear` | `stealth_unclear` | Keep conflict observations; do not infer active from HTTP response. |
| `unknown` | `unknown` | Add `missingness_reason=not_verified`. |
| `acquired`, `acquired-active` | `acquired` | Add `acquired_by` edge; if product still operates, its product status may separately be `active`. |
| `inactive` | `inactive` | Preserve dated negative/status evidence. |
| `restructured` | `pivoted` provisionally | Require a status event source; if only restructuring is known, retain raw event type. |
| `cohort-selected` | `unknown` for the entity | Create `selected_for_cohort` relationship; cohort selection is not operating status. |
| `active-public` (future/legacy) | `active` | Store public/listed in organization ownership subtype. |

### 4.5 Relevance tier mapping

Normalize case and separators, then extract only `A`, `B`, `C`, `D`, `H`. Map `Tier 1/2/3/4` to `A/B/C/D` only in the legacy-source adapter. Exact one-candidate values become `tier_candidate`; values with more than one candidate become `tier_conflict` and `score_snapshot.tier=NULL` until editorial review. The current **22 mixed records** must not be reduced by “strongest tier” logic.

`H` is historical and should be derived only when the editorial decision is explicit; it is not a synonym for low relevance.

### 4.6 Lifecycle mapping

First parse formal tokens `L1`–`L12`. Then map the global shorthand exactly as follows:

| Legacy token | Target code | Meaning |
|---|---|---|
| `L` | `L1` | Land, site, origination |
| `D` | `L4` | Design, BIM, preconstruction |
| `C` | `L5` | Construction delivery |
| `F` | `L3` | Capital, finance, transactions |
| `S` | `L6` | Marketing, sales, leasing, distribution |
| `H` | `L7` | Occupancy, homebuyer/resident experience |
| `O` | `L8` | Property operations, facilities |
| `E` | `L10` | ESG, climate, resilience, health |

Map unambiguous text labels using this table, preserving the original label:

| Text family | Target code |
|---|---|
| land, site, origination, title, parcel, geospatial, location, zoning, permit | `L1` |
| feasibility, highest-and-best-use, scenario, development strategy | `L2` |
| finance, investment, capital, mortgage, valuation, payments, underwriting | `L3` |
| design, planning, BIM, preconstruction, takeoff, estimating | `L4` |
| construction, delivery, procurement, materials, field, safety, project controls | `L5` |
| sales, marketing, leasing, discovery, portal, brokerage, booking, CRM | `L6` |
| tenant, resident, homebuyer, community, amenity, occupancy | `L7` |
| operations, facilities, maintenance, CMMS, IWMS, BMS, utilities | `L8` |
| portfolio, asset management, investor reporting, acquisition/disposition | `L9` |
| climate, energy, carbon, ESG, resilience, health, water, waste | `L10` |
| handover, warranty, defects, snagging, end-of-life, circularity | `L11` |
| data, identity, interoperability, API, cybersecurity, privacy, compliance, provenance, governance | `L12` |

Generic values such as `Data`, `Operations`, `Finance`, `Transaction`, `Security`, and `AI` must be mapped only with the product proposition/source context. If context leaves two plausible codes, write an unresolved mapping observation rather than guessing. This is especially important because **183 current primary values have no explicit lifecycle code**.

### 4.7 Evidence grades: never collapse the two axes

Apply the methodology’s definitions exactly:

**Source quality (`source.quality_grade`):**

| Grade | Deterministic initial assignment | Limitation |
|---|---|---|
| S1 | Regulator/filing, standards body, signed customer/procurement record, official product documentation, named customer announcement | S1 describes source authority, not automatic truth of every claim. |
| S2 | Company site, company release, vendor case study, founder interview, accelerator profile | Primary but potentially promotional/self-reported. |
| S3 | Reputable independent media, research institution, professional body, methodologically described survey | Good corroboration; scope may differ. |
| S4 | YC/accelerator directory, investor portfolio, structured database with provenance | Discovery/basic metadata; verify material claims. |
| S5 | Social post, anonymous review, unattributed listicle, search snippet | Lead generation only. |

**Claim attribution (`claim.claim_grade`):**

| Grade | Assignment rule |
|---|---|
| C1 | Directly supported by an S1 source, or two independent sources with matching scope and dates. |
| C2 | Primary source plus credible independent corroboration, with a material limitation. |
| C3 | Clearly reported by company/customer/partner but not independently verified. |
| C4 | Atlas interpretation derived from cited facts; label as an inference. |
| C5 | Plausible but supported only by S4/S5 or incomplete primary evidence; watchlist only. |

`evidence_grade=A/B/C/D` is retained as `legacy_grade` per observation. **A must not be mapped to S1**, and `B/D`, `B/C`, `B/A` must not become a numeric average. The current **13 mixed-grade records** should yield multiple claims with potentially different source and claim grades.

Initial claim-kind rules:

| Legacy `claim_type` family | `claim_kind` | Default claim grade before review |
|---|---|---|
| annual filing, government source, official product fact | `identity`, `status`, or `product_description` | C1 only if scope/date is direct; otherwise C2 |
| customer/vendor case, company-reported, company claim, product description | `outcome`, `scale_signal`, or `product_description` | C3; downgrade/upgrade only with corroboration |
| YC description, investor/portfolio, cohort/program selection | `market_presence` or `membership` | C3 for the stated description; C5 for unverified operating/outcome inference |
| observed | `atlas_inference` or factual observation | C4 unless directly tied to a source assertion |
| unknown, directory-only, social/search | relevant claim kind | C5 or `discovery_only`; never sole support for material claims |

The reviewer may change the grade only with a `review_event` and source-linked rationale.

## 5. Website-safe field policy

The public website must expose reviewed, non-sensitive facts and the evidence context needed to interpret them. It must not expose raw research internals by default.

| Surface | Safe fields | Keep restricted or internal |
|---|---|---|
| Public card/index | `entity_id`, display/canonical name, public aliases, record type/subtype, public domain, current status + status date, country/region at coarse level, primary/secondary lifecycle codes, technology/category tags, product proposition, MRL with rationale, reviewed tier, last reviewed date, evidence coverage summary, public caveat | Legal-registration details, raw rows, unresolved identity candidates, internal reviewer names, private contacts, unreviewed scores. |
| Public evidence drawer | Claim statement, value/unit, scope, period, `C1–C5`, source title/publisher/type, publication/effective/retrieval dates, source URL, “reported by” label, public limitation, contradiction/superseded marker | Full copyrighted excerpts, archive credentials, source hashes if access-restricted, personal data, private customer documents. |
| Authenticated/partner view | Detailed product deployment, integration posture, data sensitivity, public pricing bands, named references only where permission exists, implementation notes, diligence questions, richer geography | Confidential contracts, security questionnaires, customer PII, non-public financials, access tokens. |
| Internal editorial view | Raw observations, all candidate values, merge/split decisions, source-quality rationale, reviewer identity, score dimensions, claim extraction notes, archives/hashes, licensing notes, correction queue, conflict and missingness records | Never publish by default. |

No public field may imply that JCX endorses a company, that a directory selection validates a product, or that a vendor-reported outcome transfers to Bangladesh. Public cards should show `insufficient evidence` rather than inventing a score or replacing unknown with zero.

## 6. Implementable migration sequence

1. **Freeze and fingerprint.** Copy the current exports as read-only `master_legacy_v1`; record file hashes, row counts, manifest, and the QA baseline. Do not edit the current files or generator in this migration.
2. **Create schema/vocabulary version 1.** Create the tables above plus `taxonomy_term` and `legacy_observation`. Load the lifecycle, technology, status, MRL, tier, source-quality, and claim-grade definitions with `vocabulary_version=1.0`.
3. **Stage every raw row losslessly.** Load all four agent CSVs, case CSV, standards CSV, and YC snapshot into staging with dataset name, source row number, header version, raw field JSON, and ingestion timestamp. Preserve blank vs literal sentinel vs omitted column.
4. **Build the identity registry.** Seed organization IDs from existing `record_id` values. Import the 24 merged pairs as `merge_candidate` observations. Apply reviewed alias/split overrides; record each merge/split in `review_event`. No delete operation is allowed.
5. **Classify record types.** Apply the precedence/exception table. Create product/program/project child entities and parent/owner/operator edges. Leave ambiguous items in `record_type_review_queue`; do not count them as organizations in public totals.
6. **Migrate identity and attributes.** Normalize names, domains, countries, dates and years. Populate `entity_market`, `entity_taxonomy`, commercial model, aliases, and identifiers. Convert every `||` field into candidate observations or child rows; keep a null current value until reviewed.
7. **Normalize sources.** Canonicalize URL host case, leading `www.`, trailing slash and safe tracking parameters while retaining `url_observed`. Ingest the 193 narrative URLs missing from the current register, classify source type, and have a reviewer assign S1–S5. Shared YC/NAR pages remain source records, never canonical entity URLs.
8. **Extract atomic claims.** Turn `headline_claim`, `scale_signal`, `tech_strategy`, `named_initiatives`, status assertions, and case outcomes into claim rows. Attach each claim to one or more sources through `claim_source`; record support/contradiction and scope. Store legacy grade/type as lineage, not as current evidence semantics.
9. **Apply taxonomy and status review.** Run the deterministic lifecycle map, then review unresolved generic labels. Create status events and status evidence dates; make `status_current` a derived value from the latest accepted event. Handle the four known conflicts first.
10. **Rebuild website views.** Publish only `publication_state=public` records with one reviewed type, canonical status, safe canonical URL (or explicit “no verified website”), normalized taxonomy, and claim/source coverage. Produce organization, product, program, project, evidence, and relationship views separately.
11. **Run release gates and compare counts.** Require all checks in §7, publish a migration report showing every dropped/superseded field, and retain a reversible mapping from every normalized value to its staging row and source. Only then deprecate the legacy master export in application code.

The migration is idempotent when keyed by `(dataset, source_row_number, field_name)` for observations, normalized URL for sources, and immutable `entity_id` for identities. Use transactions per stage; a failed taxonomy or evidence pass must not partially publish a new view.

## 7. Release gates and QA assertions

Fail the build (rather than warning) when any of these conditions occurs:

1. A public entity has no `record_type`, invalid status, invalid country code, or a scalar containing `||`/pipe-delimited list syntax.
2. A founding year is non-integer, outside 1800–current year, or represented by `Unknown`/`N/A`.
3. A public product has more than one primary lifecycle or a lifecycle code outside L1–L12.
4. A public claim has no `claim_source`, no claim grade, no observed/retrieved date, or a material outcome without scope/limitation.
5. A source has no normalized URL, source type, retrieval date, or quality grade; normalized duplicate URLs create more than one source ID.
6. A directory/profile URL is used as a canonical website without an approved exception.
7. A current status is derived from `last_verified` alone, or an acquired/inactive entity is counted as active.
8. A score or tier is published without rubric version, as-of date, reviewer, and evidence-coverage state.
9. Any public claim grade C1/C2 lacks the source support required by §4.7, or a C3/C4/C5 claim is displayed without attribution/limitation.
10. Every public value cannot be traced to a staging observation, source, or documented editorial decision.

Report these monitoring metrics on every build: organizations/products/programs/projects by status; claims by C grade; sources by S grade and age; percentage with a verified primary URL; unresolved identity/type/lifecycle conflicts; records with no current status evidence; and narrative-source coverage.

## 8. Definition of done

The master dataset is ready for public website use when all 24 merge groups have a reviewed identity decision; all 22 mixed tiers and 13 mixed evidence records have claim-level alternatives or a reviewed current value; the four founding-year conflicts are numeric-or-null with notes; 62 global-anchor gaps are explicitly completed or marked `source_schema_omitted/unreviewed`; 193 narrative URLs are either registered or intentionally excluded with a documented boundary; and the public views pass every release gate above.
