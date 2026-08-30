# Final integration QA — qualified additions

> **Resolved in the post-residual release:** Lennar now uses the corrected annual-report path; Cocoon/Cocoon Carbon is a reviewed alias merge corroborated by `cocooncarbon.com`; `hsLang` is normalized as a presentation query; generic `Independent` provenance no longer emits membership edges; and private/listed ownership is kept distinct from operating status. This report is retained as the pre-fix audit trail. Use `research/final_release_validation.md` for the current verdict.

**Audit date:** 30 August 2026 (Asia/Dhaka)  
**Mode:** read-only. No generators, atlas files, discovery files or source registers were edited.  
**Scope:** the final 18 operator additions, 16 enterprise-platform additions and 25 startup-core additions; `data/atlas_entities.csv`, `data/discovery_universe.csv`, `data/built_environment_ecosystem_discovery_index.csv`, `data/source_register.csv`, claims/assertions and relationship lineage.

## Verdict

**Conditional PASS.** All 59 additions are present exactly once by exact display name in both the atlas and discovery universe, with resolved canonical URLs, qualified-core discovery status and one qualified entity ID each. Source lineage is present and internally count-consistent. There are no duplicate canonical URLs in the atlas and no exact duplicate ecosystem rows on the composite `(ecosystem, company_name, company_url, official_source_url)` key.

Publication should remain conditional until the actionable issues below are resolved or explicitly accepted:

1. **P1 — malformed Lennar annual-report URL:** the Lennar addition/source-register lineage uses an encoded backslash (`%5C~`) before `~/media/...`, while a correct URL exists separately but is not linked to Lennar. This is a real source-lineage defect, not an identity merge.
2. **P1 — Cocoon/Cocoon Carbon shared-domain identity review:** the qualified `Cocoon` and discovery-only `Cocoon Carbon` identities both use `cocooncarbon.com`; both are intentionally kept separate and the qualified discovery identity is correctly flagged `needs_identity_review=true`. Editorially adjudicate the legal/product identity before publication.
3. **P2 — Northspyre normalized source duplication:** `northspyre.com/` and `northspyre.com/?hsLang=en` are separate source-register rows after query-stripping normalization, both assigned to Northspyre. Consolidate or document the language-query distinction.
4. **P2 — generic relationship objects:** 25 of the 59 new relationship rows use `Independent` or an `Independent; ...` composite as `object_name`. This does not merge entities, but it is weak lineage semantics and should not be rendered as an ecosystem membership without editorial interpretation.
5. **P2 — ESR status semantics:** the addition/assertion status is `private` (privatized 2025-07-04), while the final atlas `status_current` and `operating_status_legacy` are `active`. This is defensible if `active` means operating and `private` means ownership/listing state, but the distinction needs a dedicated status field/note before publication.

## Control results

| Control | Result | Evidence |
|---|---|---|
| Cohort completeness in atlas | **PASS** | 18/18 operator, 16/16 enterprise and 25/25 startup names match exactly once in `atlas_entities.csv`; 59 unique entity IDs. |
| Cohort completeness in discovery | **PASS** | 59/59 exact display names match exactly once in `discovery_universe.csv`; each is `evidence_stage=qualified_core`, `discovery_only=false`, and has exactly one `qualified_entity_ids_json` value. |
| Canonical URL integrity | **PASS** | All 59 atlas rows have `canonical_url_status=resolved`; addition canonical URLs match atlas canonical URLs after trailing-slash normalization. |
| Record-type assignment | **PASS** | 53 additions are `organization`; six enterprise product suites are `product_offering` with `record_type_basis=reviewed product-suite exception`; discovery record-type signals agree. |
| Operating status | **PASS with ESR note** | All 59 atlas rows are `status_current=active`; 58 addition rows say `active` and ESR says `private`. See P2 status semantics above. |
| Reviewed relevance tier | **PASS** | Addition tiers map cleanly to atlas tiers: 47 Tier 1 → `A`, 12 Tier 2 → `B`; no mismatches. |
| Identity-review flags | **PASS with Cocoon exception** | 58/59 new discovery identities have `needs_identity_review=false`; only qualified Cocoon is `true`, with a note explicitly naming Cocoon Carbon’s shared domain. |
| Atlas source lineage | **PASS with Lennar URL defect** | Every new atlas row has `merged_record_count=1`, `source_datasets_json` naming its additions file, and 1+ source URLs. All source URLs have a source-register row; the Lennar row is present but malformed (`%5C~`). |
| Claims/assertions lineage | **PASS** | New entities have 118 claims and 803 field assertions; all referenced assertion/claim URLs normalize to a source-register URL. |
| Ecosystem source-table integrity | **PASS** | 683 rows across 20 ecosystems; no exact duplicate composite rows. New additions correspond to 15 exact-name ecosystem rows across 14 names; Dealpath’s two rows are expected corroboration from JLL Spark and MetaProp. |
| Discovery identity uniqueness | **PASS with known shared-domain cases** | 975 unique discovery IDs, no duplicate IDs. New-related duplicate risk is limited to Cocoon/Cocoon Carbon; Lennar/Veev is a deliberate parent/brand relationship, not a same-canonical-domain collision. |

## Addition-by-addition integration summary

All rows below passed exact-name lookup, canonical URL resolution, qualified-core discovery checks and source-register presence. The atlas publication flag is uniformly `qualified_profile_requires_claim_review`; this is expected and means claim-level editorial review remains outstanding, not that identity integration failed.

| Cohort | Count | Atlas record types | Atlas tiers | Atlas source-count range | Discovery identity-review exceptions |
|---|---:|---|---|---:|---|
| Operator | 18 | 18 organization | 10 A / 8 B | 3–4 | None |
| Enterprise platform | 16 | 10 organization / 6 product_offering | 12 A / 4 B | 1–5 | None |
| Startup core | 25 | 25 organization | 25 A | 2–4 | Cocoon only |
| **Total** | **59** | **53 organization / 6 product_offering** | **47 A / 12 B** | **1–5** | **1** |

## Ecosystem-source and discovery collision review

The ecosystem table is a source index, not an entity table, so repeated company names across investors/accelerators are normally corroborating rows. The new-source review found:

- **Dealpath:** two ecosystem rows (JLL Spark and MetaProp), same company URL; this is expected multi-ecosystem evidence and is correctly represented as one qualified atlas entity and one discovery identity.
- **Cocoon:** one 2150 ecosystem row named `Cocoon`; a second Brick & Mortar Ventures row is named `Cocoon Carbon` but uses the same `cocooncarbon.com` domain. The discovery layer deliberately keeps two identities and flags both for review; do not merge automatically.
- **Juniper Square, EliseAI, Runwise, PassiveLogic:** one ecosystem row each; the qualified-core row upgrades discovery evidence without duplicating the entity.
- **Startup cohort corroboration:** common investor/list source pages (RET Ventures, Zacua Ventures, CEMEX Ventures, BuiltWorlds and 2150) are reused across multiple distinct companies. Reuse is expected; no exact composite duplicate rows were found.

Across the full discovery universe, 28 identities carry `needs_identity_review=true`. The other flagged cases (for example OnsiteIQ, Orbital, Stake, AppFolio/LiveEasy and Procore/Honest Buildings) are pre-existing name/domain collisions outside these three new cohorts; they were not merged by this integration.

## Source-register and relationship lineage findings

The 59 new atlas entities have 59 discovery relationships and all relationship source URLs point to their additions source set. Five normalized duplicate URL groups exist in the full 1,583-row source register; only one touches a new addition:

- Northspyre has `src-2e5b176a28` for `https://northspyre.com/` and `src-f6a0a38993` for `https://northspyre.com/?hsLang=en`. Both are assigned to `org-northspyre-fb51dcc`; they are a benign source duplication but should be consolidated or explicitly retained as language variants.

At audit time, `org-lennar-fec1a05` was linked to an annual-report URL containing an encoded `%5C~` path variant, while the corrected `~/media/...` form existed separately without record usage. The post-audit build now links the corrected form.

Twenty-five new relationships use `Independent` or an `Independent; ...` composite object label. These labels are not overmerges, but they conflate “no ecosystem membership was supplied” with an actual relationship object. Keep the source relationship as provenance, but render it as independent-source lineage rather than membership.

## Required follow-up

1. Correct and re-register the Lennar annual-report URL; verify that the corrected source is used by the Lennar entity, claims and assertions.
2. Resolve Cocoon versus Cocoon Carbon as one legal/product identity or document why they are separate; then clear or retain `needs_identity_review` deliberately.
3. Deduplicate or annotate Northspyre’s query-variant source rows.
4. Preserve the product/parent relationship for Oracle Construction & Engineering, Siemens Building X, EcoStruxure Building, OpenBlue and Honeywell Forge; do not flatten product offerings into duplicate parent companies.
5. Add an explicit ownership/listing-status distinction for ESR if `status_current=active` is intentionally operating status.
6. Before publication, perform the already-required claim-level review on all 59 rows; identity integration QA does not independently validate vendor-reported footprint, funding, AUM, pipeline or outcome claims.

**Confidence:** high for exact row-count, canonical-URL, stage, tier, source-register and duplicate-key checks; medium for legal-entity interpretation of Cocoon and status semantics because those require editorial/legal review rather than deterministic file validation.
