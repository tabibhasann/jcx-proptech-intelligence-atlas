# JCX PropTech Atlas data

These files are generated from the curated research CSVs by `scripts/build_proptech_master_dataset.py`.

## Files

| File | Contents |
|---|---|
| `atlas_entities.csv/json` | Website-oriented typed entity layer: 295 records—274 organizations, eight product offerings, 12 programs/ecosystems and one project. |
| `discovery_universe.csv/json` | 978 conservatively resolved candidate identities joining the 295 qualified entities, 128 YC profiles and 683 ecosystem membership pairs; domains corroborate reviewed names but never merge materially different names by themselves. |
| `claims_registry.csv/json` | 834 atomic source-row claims and atlas interpretations with separate provisional C1–C5 attribution and source-quality context. |
| `entity_field_assertions.csv/json` | 3,896 source assertions; conflicts remain separate rather than merged into scalar public fields. |
| `entity_relationships.csv/json` | 174 reviewed qualified-core ecosystem/cohort relationships; generic “Independent” provenance is not emitted as a membership. |
| `lifecycle_taxonomy.csv/json` | Controlled L1–L12 lifecycle vocabulary. |
| `proptech_master_companies.csv/json` | Legacy-compatible merged research index. It deliberately preserves disagreements with ` || ` and is not the public filter table. |
| `quantified_outcome_cases.csv/json` | Case-study metrics, source type, evidence grade, caveat and JCX transferability. |
| `standards_registry.csv/json` | Standards/framework records. |
| `yc_real_estate_construction_directory_2026-08-30.csv/json` | Complete dated official YC directory snapshot: 128 profiles. |
| `built_environment_ecosystem_discovery_index.csv/json` | 683 official company–ecosystem pairs across 11 specialist families and 20 program/region labels; every row is discovery-only. |
| `full_corpus_source_inventory.csv/json` | 1,625 exact observed URL variants and their corpus occurrence audit. |
| `source_register.csv/json` | 1,600 normalized URL identities, observed variants, document/record usage, inferred class and provisional S1–S4 source-quality grade. |
| `website_story_manifest.json` | Eleven-chapter implementation-neutral narrative plan with stable evidence references and caveats. |
| `website_visibility_policy.json` | Public, JCX-private and internal-only content boundaries and promotion gates. |
| `atlas_manifest.json` | Counts, inputs, status distribution and generation note. |

## Which entity file to use

Use `discovery_universe` for the broad searchable frontier and `atlas_entities` for evidence-qualified cards and filters. The latter has one controlled `record_type`, typed/JSON array fields, null public values for unresolved conflicts, canonical-domain controls and explicit review flags. Use `proptech_master_companies` only to audit how raw rows were merged.

`atlas_entities` does not pretend unfinished diligence is finished. MRL remains blank without product-and-geography evidence; 22 mixed relevance tiers remain unreviewed; directory profiles are separated from canonical company domains; `last_verified` is not promoted to a status-event date.

## Legacy master fields

- `record_id`: stable generated atlas ID.
- `name`, `canonical_name`, `canonical_url`: display and primary identity.
- `status`, `status_as_of`: normalized current state and source date.
- `hq_country`, `operating_regions`, `founding_year`: geography and origin.
- `entity_type`, `business_model`, `cohort_or_ecosystem`: organization context.
- `primary_lifecycle`, `secondary_lifecycle`, `category`: taxonomy values from source research.
- `maturity`, `evidence_grade`, `jcx_relevance`, `relevance_tier`: independent decision fields.
- `scale_signal`, `tech_strategy`, `innovation_model`, `named_initiatives`: corporate-strategy fields where available.
- `headline_claim`, `claim_type`, `caveats`: claim and limitation; never read without attribution.
- `source_urls`, `last_verified`: direct evidence and freshness.
- `source_datasets`, `merged_record_count`: provenance of normalized rows.
- `status_conflict`, `identity_note`: required editorial review indicators.

Multiple preserved values are separated by ` || `; URL and provenance arrays are pipe-separated. This is intentional lineage behavior. “Unknown” is not zero and must not be parsed as a public enum, year or score.

## Important modeling rule

The generated normalized files are an implementation bridge, not a substitute for editorial review or a durable database. A production site should implement the full model in `research/master_dataset_schema_remediation.md`: organization/product/program/project extensions, aliases and identifiers, status history, claim–source joins, reviewed taxonomy, score snapshots and review events. Parent companies, acquired products and similarly named entities must not be flattened into one page.

## Counts

Use `atlas_manifest.json` for current counts rather than hard-coding this README. Counts describe the curated corpus, not the total global PropTech market.
