# Post-remediation corpus validation

> **Historical checkpoint:** this report validated the earlier 228/690 release before the operator, enterprise, startup, ecosystem and residual expansions. Its remediation logic remains useful, but its counts are superseded. Use `research/final_release_validation.md` and `data/atlas_manifest.json` for the current 295/978 release.

**Validation date:** 30 August 2026  
**Result:** **PASS**  
**Scope:** generated entity, claim, assertion, relationship, discovery, outcome, standards, source and manifest files after the independent baseline QA.

## Release result

The corpus is now a defensible **website foundation**, with an evidence-qualified core, dated discovery layers and an explicit editorial queue. It is not a claim that every record is publication-ready. The central improvement is semantic: uncertainty and disagreement are represented as data rather than flattened into apparently certain scalar fields.

| Layer | Validated count |
|---|---:|
| Qualified-core entities | 228 |
| Organizations | 213 |
| Programs/ecosystems in qualified core | 12 |
| Product offerings in qualified core | 2 |
| Projects in qualified core | 1 |
| Claim/interpretation rows | 700 |
| Source-field assertion rows | 2,989 |
| Qualified-core relationship rows | 175 |
| Complete dated YC profiles | 128 |
| Official discovery-only ecosystem pairs | 429 |
| Deduplicated discovery identities | 690 |
| Quantified outcome/failure cases | 44 |
| Standards/frameworks | 39 |
| Exact observed URL variants | 1,085 |
| Normalized URL identities | 1,077 |
| Lifecycle taxonomy terms | 12 |

## Baseline QA findings and current treatment

| Baseline finding | Current treatment |
|---|---|
| Incompatible A–D, S1–S5 and A1/B3 evidence conventions | Legacy labels remain lineage only. `claims_registry` holds provisional C1–C5 attribution; `source_register` separately holds provisional S1–S5 quality. No A→S1 conversion occurs. |
| Scalar values such as `A || B` and `2012 || 2016` | The legacy export preserves them for audit. `atlas_entities` uses JSON arrays/candidate values; reviewed public tier/year remains null while conflicts exist. Assertions retain source-row provenance. |
| Mixed companies, products, programs and a project | `atlas_entities.record_type` is controlled: 213 organizations, 12 programs/ecosystems, two product offerings and one project. |
| Directory/profile URLs used as identity | The public normalized layer accepts no YC/NAR/LinkedIn/Crunchbase URL as a canonical domain. It has 176 resolved canonical domains, 51 discovery-profile-only records and one unresolved record. |
| 193 narrative links absent from the original 436-row register | A delimiter-safe inventory scans source/narrative files and the register now represents all 1,085 exact variants as 1,077 normalized identities. Eight harmless `www`/slash collision groups retain their observed forms. |
| Status build date confused with status-event date | `status_observed_at` stores the research check. `status_evidence_date` remains null until a source supports the event date. Legacy `status_as_of` stays in the assertion register only. |
| Four founding-year conflicts | The public normalized integer is null for conflicting years; candidates and notes remain source-linked. |
| Homebase/Homebase-SEA identity | Canonical display is `Homebase`; `Homebase-SEA` is an alias. Conflicting headquarters/tier observations remain flagged. |
| Autodesk suite duplicate | One product-offering identity with the alternative name retained as an alias; product-owner decomposition remains an editorial relationship task. |
| ProQ URL normalization duplicate | Joined under one normalized source identity while both observed URL variants are retained. |
| Domain-first discovery joins overcollapsed Howie AI/Trubrics, Betterview/Nearmap and Honest Buildings/Procore | Ecosystem matching is now exact-name-first; domain is corroboration only. All three pairs are separate, all 429 source-row identities are retained, and the six records carry explicit relationship-review notes. Reviewed label variants require both an approved alias and the expected domain. |

## Automated release gates passed

- Every generated CSV/JSON pair parses and matches row-for-row.
- All entity, claim, assertion, relationship, case, standard and source IDs are non-empty and unique.
- Every claim/assertion/qualified relationship resolves to an existing qualified-core entity.
- Normalized record type, status, relevance-tier, source-grade and claim-grade enums are valid.
- Every `*_json` field in `atlas_entities` parses as a JSON list.
- No normalized scalar contains the legacy ` || ` merge delimiter.
- Conflicted tiers are not promoted into `reviewed_relevance_tier`.
- Founding years are blank or valid four-digit values; headquarters country is scalar or blank.
- No discovery profile is used as a normalized canonical company domain.
- YC has 128 unique names/profile URLs and the expected displayed status distribution: 100 Active, 27 Acquired, one Public.
- All 429 ecosystem company–membership pairs are unique and marked `discovery_only=true`.
- All 228 qualified identities and 128 YC company IDs appear exactly once in the 690-record discovery universe. All 429 ecosystem source-row IDs resolve exactly once to 410 ecosystem-linked identities and 429 identity–ecosystem memberships.
- No discovery identity uses a domain-only merge method. Regression fixtures keep Howie AI/Trubrics, Betterview/Nearmap and Honest Buildings/Procore separate and flagged; every unexplained shared domain must be reviewed.
- All 1,085 exact source variants are represented by the 1,077 normalized source identities.
- Manifest counts match generated rows.
- Forty-nine local Markdown links resolve.
- Sixty-two Markdown/CSV/JSON files are clear of duplicated URL schemes, zero-width characters and internal citation artifacts.

## Remaining editorial queue

Passing structural validation does not convert provisional research into endorsements:

- **700 claims** require claim-level editorial review; their grades are deliberately provisional.
- **22 entities** have conflicting relevance tiers and therefore no reviewed public tier.
- **52 entities** lack a verified canonical company/product domain; 51 have discovery profiles only.
- **130 entity profiles** have at least one blocking editorial flag beyond the universal claim-review requirement.
- **Six discovery identities** remain in the relationship-resolution queue: Betterview/Nearmap, Honest Buildings/Procore and Howie AI/Trubrics. They are deliberately separate rather than silently merged.
- Global anchor rows still have source-schema gaps in category, product maturity, founding year or event-backed status date. The normalized layer labels these as not assessed instead of inventing values.
- MRL is intentionally blank. Company scale, funding, accelerator membership and “Public” status are not product deployment maturity.
- Source quality is currently a conservative domain-level default. Material claims still need a reviewer, title/publisher/date metadata and claim–source support roles.
- Parent/product/acquisition/successor relationships need a reviewed identity pass before relationship-graph publication.
- All YC and accelerator/investor records require operating-status, availability, security, integration, customer and outcome diligence before a JCX pilot or public “leader” label.

## Reproducing the build

```bash
python3 scripts/build_full_source_inventory.py
python3 scripts/build_proptech_master_dataset.py
python3 scripts/validate_proptech_corpus.py
```

The definitive schema and public/private/internal field policy are in `research/master_dataset_schema_remediation.md`; the current generated counts are in `data/atlas_manifest.json`.
