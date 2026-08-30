# Website analysis handoff audit

> **Historical packaging audit:** the missing artifacts identified here have now been created, and the corpus has since expanded. Use `WEBSITE_ANALYSIS_HANDOFF.md`, `research/website_launch_editorial_selection.md`, `data/website_story_manifest.json`, `data/website_visibility_policy.json`, `research/final_release_validation.md` and `data/atlas_manifest.json` as the current handoff package.

**Purpose:** prepare the JCX PropTech research corpus for a different AI model that will invent and build an exceptional immersive analysis website.

**Audit date:** 30 August 2026  
**Research cutoff:** 30 August 2026  
**Scope:** atlas, meeting dossier, second-pass strategy, methodology/IA, normalized data exports, discovery layers, outcomes, standards, source lineage and QA artifacts.

## Executive verdict

The corpus is a strong research foundation, but it is not yet a ready-to-render editorial content package. It has the necessary breadth, taxonomy, evidence conventions, caveats and normalization bridge; it does not yet provide a page-ready content manifest, reviewed claim set, status-event timeline, product-level profiles, normalized outcome metrics, or a single explicit publication boundary.

The receiving model can safely invent the information architecture, interaction model and visual language if it receives the corpus with these non-negotiable distinctions intact:

1. `discovery_universe` is a broad search frontier, not a list of proven companies.
2. `atlas_entities` is the evidence-qualified typed layer, but many profiles remain editorially unreviewed.
3. A company, product, program/ecosystem, project, case study, claim, source and relationship are different records.
4. Source quality (`S1–S5`) and claim attribution (`C1–C5`) are separate labels. Legacy `A–D`, `A1/B2/B3` and similar labels must not be translated mechanically.
5. Relevance tier, product maturity/readiness, operating status and evidence quality measure different things.
6. Public global analysis, client-private JCX strategy, and internal diligence notes must be permissioned separately.
7. A company-reported or vendor case-study outcome is a bounded report, not a JCX forecast or universal product result.

The build model should be instructed to make uncertainty legible and to preserve the research’s analytical force without turning provisional material into endorsement, ranking, legal advice or investment advice.

## Current corpus release facts

Use `data/atlas_manifest.json` as the authoritative count source; do not hard-code these counts in a build prompt or UI without a generated manifest.

| Layer | Current count | Correct interpretation |
|---|---:|---|
| Qualified-core entities | 228 | Typed layer: 213 organizations, 12 programs/ecosystems, 2 product offerings, 1 project. |
| Raw organization rows | 252 | Four source files before identity merging; not a company count. |
| Discovery identities | 690 | Search-layer union of qualified core, YC and official ecosystem discovery. |
| Discovery-only identities | 462 | Candidate identities not promoted to qualified core. |
| YC profiles | 128 | Complete dated official directory snapshot; 100 Active, 27 Acquired, 1 Public as displayed by YC. |
| Ecosystem memberships | 429 | Official company–ecosystem source pairs; discovery evidence, not deployment proof. |
| Ecosystem-linked identities | 410 | Deduplicated identity count across those memberships. |
| Claims / interpretations | 700 | Atomic rows with provisional claim attribution; all require claim-level editorial review before public use. |
| Field assertions | 2,989 | Source observations preserving competing values and lineage. |
| Qualified-core relationships | 175 | Primarily cohort/ecosystem relationships; discovery memberships remain in their own layer. |
| Quantified outcome/failure cases | 44 | Separate case packets; 40 B3, 2 B2, 2 A1 in the case-library convention. |
| Standards/frameworks | 39 | Interoperability, BIM, enterprise data, controls, ESG, security, privacy and AI governance. |
| Exact observed URL variants | 1,085 | Full scoped corpus URL observations. |
| Normalized source identities | 1,077 | URL identities after conservative normalization; source quality is still provisional/domain-level. |
| Lifecycle terms | 12 | Controlled L1–L12 vocabulary; L12 is cross-lifecycle data and trust. |

The 690 identities and 228 qualified entities are not interchangeable. The 690 also contains discovery-only candidates and typed non-company records. The 429 ecosystem rows are memberships, not 429 additional companies.

## Recommended self-contained bundle manifest

The handoff should include the following files, in this order. Paths are relative to the repository root. The receiving model should read the narrative controls first, then the schema/QA, then the machine data, and only then invent the website structure.

### A. Orientation and editorial controls — required

| File | Handoff role | Visibility rule |
|---|---|---|
| `JCX_PropTech_Research_Corpus_README.md` | Corpus map, file roles, build order and publication warning. | Internal handoff; governs all layers. |
| `JCX_Global_PropTech_Intelligence_Atlas_2026-08-30.md` | Main synthesis: thesis, market landscape, operating archetypes, regions, outcomes, failures, standards, JCX implications and website blueprint. | Public/global material plus private JCX sections; do not expose all sections by default. |
| `research/atlas_methodology_and_website_ia.md` | Definitions, inclusion/exclusion, taxonomy, evidence, scores, page templates, visualization safeguards and maintenance. | Public methodology candidate; visual directions are constraints, not an instruction to copy a layout. |
| `research/post_remediation_validation.md` | Current PASS result, release gates and remaining editorial queue. | Internal governance; summarize relevant status publicly. |
| `research/final_corpus_qa.md` | Baseline defects and their treatment; useful for understanding why normalized files exist. | Internal audit; do not present historical defects as current unless clearly labeled. |
| `research/master_dataset_schema_remediation.md` | Target data model, missingness rules, relationships, status events, claim-source joins and public/private policy. | Internal technical/editorial contract. |
| `data/README.md` | Data-file meanings and legacy-vs-normalized warnings. | Internal handoff; can inform methodology copy. |

### B. Strategic and narrative source material — required, but permissioned

| File | Handoff role | Required treatment |
|---|---|---|
| `JCX_Meeting_Dossier_2026-08-29.md` | JCX company intelligence, website observations, digital-spine hypothesis, transformation roadmap, pilot canvases and meeting questions. | Treat as client-private strategy. Public facts may be cited only with their evidence labels; do not expose internal observations, meeting scripts or recommendations without approval. |
| `JCX_Second_Pass_Strategy_PropTech_Startups_2026-08-29.md` | ERP/vendor signals, Bangladesh competitor benchmark, venture-client model, Jolshiri pilot, startup radar and account-entry strategy. | Treat as client-private strategy and hypothesis material. Separate “public signal” from “internal recommendation.” |
| `research/market_trends_and_failure_lessons.md` | Adoption/value gap, AI, construction digitization, capital, energy, venture-client and failure lessons. | Strong candidate for public signals/themes; preserve dates and source caveats. |
| `research/regional_proptech_landscape.md` | Bangladesh, India/South Asia, MENA, Southeast Asia, Japan, Australia and wider coverage. | Public regional analysis after source/caveat labeling. |
| `research/global_real_estate_pioneers.md` | Corporate operators, technology models, CVC/programs and anchor companies. | Public benchmark source; not a ranked “best companies” list. |
| `research/proptech_startup_universe.md` | Tiered startup/ConTech universe and ecosystem logic. | Public discovery context; distinguish candidate signal from qualified profile. |
| `research/discovery_universe_overview.md` | 690-identity semantics, overlap, identity method and publication behavior. | Required to implement search and candidate-state behavior. |
| `research/coverage_gap_audit.md` | Coverage limitations and additions across regions and categories. | Required to disclose selection bias and avoid “global completeness” claims. |

### C. Machine-readable publication and discovery layers — required

| File | Handoff role | Key contract |
|---|---|---|
| `data/atlas_manifest.json` | Counts, generation date, review queues and status distribution. | Runtime metadata; current as of 2026-08-30. |
| `data/atlas_entities.csv` / `.json` | Typed qualified-card layer. | Use for qualified profiles, filters and joins; parse every `*_json` field as an array. Respect nulls, `publication_readiness` and `review_flags_json`. |
| `data/discovery_universe.csv` / `.json` | Broad searchable frontier. | Use for search/discovery; display `evidence_stage`, `discovery_only`, source layers, snapshot date and publication note. Never imply qualification. |
| `data/claims_registry.csv` / `.json` | Atomic claims and atlas interpretations. | Claim-level source/caveat display; `public_use` and `review_status` are gates, not decoration. |
| `data/entity_field_assertions.csv` / `.json` | Raw source assertions and conflicts. | Audit drawer and editorial review; do not flatten competing values into public scalar fields. |
| `data/entity_relationships.csv` / `.json` | Qualified-core relationship observations. | Label relationship type and status; a cohort/portfolio relationship is not ownership, deployment or outcome evidence. |
| `data/quantified_outcome_cases.csv` / `.json` | Positive and negative case records. | Keep baseline, intervention, result, period/denominator, source type, grade, caveat and transferability together. |
| `data/standards_registry.csv` / `.json` | Standards/framework records. | Keep version/status, domain, JCX implication and caveat; standard existence is not implementation evidence. |
| `data/source_register.csv` / `.json` | Normalized source identities and URL lineage. | Source-grade is provisional and domain-level; do not represent it as claim verification. |
| `data/lifecycle_taxonomy.csv` / `.json` | Controlled L1–L12 terms. | Use codes plus labels and definitions; do not silently replace unmapped legacy labels. |
| `data/yc_real_estate_construction_directory_2026-08-30.csv` / `.json` | Dated YC snapshot. | Snapshot-only discovery metadata; YC status/selection does not establish readiness, revenue, deployment or ROI. |
| `data/built_environment_ecosystem_discovery_index.csv` / `.json` | 429 official ecosystem source rows. | Preserve ecosystem, company name, source page, capture date, status note and `discovery_only=true`; keep source-row membership separate from identity. |
| `data/full_corpus_source_inventory.csv` / `.json` | Exact URL-variant inventory. | Audit source coverage; not a substitute for claim-source locators or editorial review. |

The legacy `data/proptech_master_companies.csv` / `.json` should be included only as lineage context. It intentionally retains `A || B`-style disagreements and mixed record types; it must not drive public filters, rankings or counts.

### D. Research support artifacts — recommended

Include the CSV/Markdown companions for the regional, pioneer, startup, YC and ecosystem layers when the receiving model needs narrative examples or source-row provenance:

- `research/global_real_estate_pioneers_agent.csv`
- `research/proptech_startups_agent.csv`
- `research/regional_companies_agent.csv`
- `research/yc_real_estate_construction_directory_2026-08-30.md` and `.csv`
- `research/built_environment_ecosystem_discovery_index.md` and `.csv`
- `research/quantified_outcome_case_library.md` and `.csv`
- `research/standards_interoperability_governance.md` and `.csv`
- `research/master_dataset_field_dictionary.csv`
- `research/full_corpus_source_inventory.md` and `.csv`
- `research/discovery_universe_qa.md`
- `research/post_remediation_validation.md`

## Definitions the receiving model must load before writing copy

### Record and evidence boundaries

- **Organization:** legal or operating entity: startup, public company, developer, owner/operator, contractor, investor, accelerator, standards body or association.
- **Product/offering:** named product, module, marketplace, service or operating model owned/offered by an organization.
- **Program/ecosystem:** accelerator, fund, challenge, association or research center. Membership is not ownership or deployment.
- **Project:** a named historical/current built-environment project; it is not automatically an organization.
- **Case study:** one bounded customer/vendor intervention with geography, asset/context, period and outcome. It cannot be generalized to every customer.
- **Claim:** one independently reviewable assertion; separate identity, status, product, scale, outcome, ownership, funding, market-presence, technology and interpretation claims.
- **Source:** a URL/source identity with quality and lineage; source quality is not the same as claim truth.
- **Relationship:** ownership, product-of, acquired-by, successor, pilot, implemented-for, member-of-program and similar edges. Label the edge; never infer it from a shared URL alone.

### Evidence labels

Source quality:

- **S1:** primary, authoritative and auditable: regulator/filing, standard, signed customer/procurement evidence, official product documentation or named customer announcement.
- **S2:** primary but self-reported/promotional: company site, release, vendor case study, founder interview or accelerator profile.
- **S3:** reputable independent research/reporting with a clear method.
- **S4:** structured directory/database with provenance but limited verification.
- **S5:** social, review, anonymous discussion, listicle or search-snippet discovery signal.

Claim attribution:

- **C1:** verified fact, supported by S1 or two independent matching sources.
- **C2:** corroborated fact with a material limitation.
- **C3:** clearly reported company/customer/partner claim, not independently verified.
- **C4:** atlas analyst inference; label as “atlas interpretation.”
- **C5:** unverified signal, usually supported only by S4/S5 or incomplete primary evidence.

Legacy grades (`A–D`, `A1`, `B2`, `B3`) are historical/source-layer conventions. Do not map them directly to `S1–S5` or `C1–C5`. Outcome grades in the 44-case library are a separate convention: A1 high-confidence accounting/status fact; B2 specific customer result with limitations; B3 quantified vendor/customer result missing a baseline, denominator, control or independent validation.

### Status, tier, maturity and score

- **Current status** describes operating state: active, pilot, unclear/stealth, acquired, merged, pivoted, paused, inactive, dissolved or unknown. “Unknown” is not “failed.”
- **Relevance tier** describes JCX editorial relevance: A Core, B Strategic, C Emerging, D Context, H Historical. It is not quality or popularity.
- **MRL/product readiness 0–5** describes product deployment maturity, not company scale. Do not infer it from funding, headcount, accelerator membership, a polished demo or a public-company status. Current product MRL is intentionally sparse/blank where evidence is insufficient.
- **JCX relevance score** is a weighted investigative priority (problem fit 20%, lifecycle leverage 10%, Bangladesh fit 15%, integration/data fit 15%, outcomes 15%, implementation readiness 10%, economics/repeatability 10%, strategic option value 5%). It is not a “best company” ranking. Calculate only with sufficient evidence; otherwise show “insufficient evidence.”
- **Freshness:** `observed/retrieved` date is not a status-event date. Funding, ownership, pricing, regulation, security and status need shorter refresh intervals than stable standards. Preserve historical snapshots.

### Missingness and uncertainty

Null/blank values mean a typed state, not zero. Preserve and expose whether a value is `not_provided`, `explicitly_unknown`, `source_schema_omitted`, `not_applicable`, `withheld` or `unreviewed`. Never parse `Unknown` as a year, URL, enum or score. Never display `A || B` as a single fact.

## Required narrative hierarchy (content logic, not a visual prescription)

The receiving model should be free to invent the immersive expression, but the analysis should progress in a legible order:

1. **Orient:** property technology is becoming a digital operating system for the built environment, not merely a collection of apps. State corpus date, scope and “curated corpus, not total market.”
2. **Map the terrain:** show the lifecycle from land/origination (L1) through feasibility, capital, design, construction, sales, occupancy, operations, climate and handover, with cross-lifecycle data/trust (L12) as a connective layer. Pair lifecycle with technology layer; “AI,” “IoT” or “digital twin” alone is not a workflow.
3. **Explain where value is created:** systems of record, bounded workflows, physical/spatial evidence, market/financial rails, energy/climate and governance. Make the adoption-to-realized-value gap explicit.
4. **Show operating archetypes:** integrated developer, owner/operator, service/data platform, design–build–operate integrator, industrialized builder and venture-client/CVC engine. These are analytical archetypes, not rankings.
5. **Show evidence:** selected products/organizations and case studies, with buyer, workflow, context, maturity and evidence labels visible. The most transferable lesson is measurable workflow improvement, not logo prestige.
6. **Show limits and failure:** vendor claims, weak denominators, construction/hardware commercialization physics, balance-sheet exposure, adoption/change constraints and failures/restructurings. A failure is not automatically technology failure; acquired technology may survive.
7. **Show the durable layer:** standards, identifiers, interoperability, data dictionaries, APIs, permissions, security, privacy, AI governance and auditability. A standard’s existence does not prove implementation.
8. **Localize to Bangladesh and JCX:** regional transferability, local language/payment/registry/regulatory/infrastructure constraints, and the JCX hypothesis of governed project truth → lead-to-booking → land/JV → delivery/handover → operations/energy → bounded AI. Keep this chapter private unless approved.
9. **Make action explicit but conditional:** build/buy/partner/pilot/monitor/historical lesson/avoid-pending-verification. Every recommendation needs assumptions, owner, baseline, risk gate and next verification step.
10. **Close with trust mechanics:** methodology, source trail, review date, corrections, limitations and a reminder that listing is not endorsement, procurement advice, investment advice or performance guarantee.

This sequence is a content hierarchy. It does not prescribe page layout, animation, chart type, palette, typography or interaction technique.

## Page-level content input contracts

The corpus does not yet contain all of these as ready-made page objects. The receiving model should derive them only from source-linked fields and clearly label derived editorial synthesis.

### Homepage / entry narrative

Required inputs: research cutoff; corpus counters from manifest; one-sentence thesis; five-to-seven dated findings; lifecycle/taxonomy introduction; selected operator stories; startup/discovery frontier; a small outcome set; failure/restructuring set; regional lens; standards/trust invitation; public/private scope notice.

Guardrails: counters need denominator and layer labels; do not use 690 as “690 proven companies”; do not make the JCX private chapter the public hero without authorization.

### Atlas/search/index

Required inputs per result: stable ID; display name; aliases; record type; evidence stage; current status; HQ versus operating markets; primary lifecycle and technology layer; buyer/asset/business-model signals; relevance tier (or unresolved); MRL (or unknown); source/claim evidence indicators; last reviewed/observed date; publication readiness; caveat; recommended action.

Guardrails: default comparisons to qualified-core records; keep discovery-only cards visibly discovery-only; separate programs/products/projects from organizations; never sort by score alone or use funding/popularity as evidence.

### Organization profile

Required sections/data: identity and aliases; ownership/parent/product relationships; status and status source/date; one-line proposition with attribution; products; lifecycle/layer/buyer/asset tags; operating geography; business/deployment/integration model; claims and evidence drawer; MRL and score snapshots if reviewed; cases/customers with relationship labels; risks; local-fit questions; timeline; sources; correction/supersession path.

Guardrails: no profile is “publish-ready” solely because it exists in `atlas_entities`; check `publication_readiness`, review flags, claim review and source dates.

### Product profile

Required inputs: owning organization; exact workflow and user; inputs/outputs; lifecycle and layers; deployment/commercial model; AI mode if evidenced; integration/export posture; data sensitivity; permissions/retention; implementation prerequisites; reliability/security evidence; pricing visibility; outcome claims; alternatives; pilot hypothesis and stop/scale criteria.

Gap: the current normalized corpus has only two product-offering record types and does not fully decompose products for the 213 organizations. Product pages therefore require careful source-supported extraction or should remain “not yet profiled.”

### Case-study / outcome page

Required inputs: case ID; customer and solution/vendor; relationship; geography; asset/context; lifecycle; baseline problem; intervention; metric and unit; denominator/sample; period; measured result; measured-by/source type; verification/outcome grade; causal caveat; transferability to Bangladesh/JCX; implementation constraints; open questions; source URL and verification date.

Guardrails: preserve “reported,” “estimated,” “potential,” “up to,” “avoided,” “identified,” “implemented” and “realized” as different states. Do not combine minutes, percentages, kWh, dollars, adoption and modelled scenarios into a universal ROI score.

### Signal/theme/editorial page

Required inputs: dated signal; what changed; primary and conflicting evidence; affected lifecycle/stakeholders; implication; local transferability; linked entities/products/standards; decision or pilot hypothesis; confidence/freshness; source trail.

Guardrail: separate observed facts from atlas interpretation and recommendation.

### Regional / Bangladesh page

Required inputs: region and country; local market signals; local companies and public benchmarks; infrastructure/language/payment/registry/regulatory context; verified versus target market; transferability caveats; unanswered internal questions.

Guardrail: headquarters, target market, supported market, local partner and verified deployment are different fields. Public legal/regulatory material is issue-spotting, not legal advice.

### Standards / playbooks / methodology / trust

Required inputs: standard/framework ID, domain, version/status, problem solved, adoption/maturity, license/open status, JCX implication, implementation caveat, source; methodology definitions; evidence legend; correction workflow; privacy/security/AI disclosures.

Guardrail: IFC is not ERP; BACnet is not a data dictionary; a digital-twin runtime is not a neutral system of record; GRESB is not technical performance proof; an API is not an information-management process.

### Private JCX chapter

Required inputs: public observations, hypotheses, internal unknowns, project truth/lead-to-booking/land-JV/handover/operations opportunity maps, pilot canvases, KPI baselines-to-collect, owner/RACI, dependencies, vendor boundaries, security/privacy controls and decision gates.

Guardrail: keep client-site defects, internal system hypotheses, meeting scripts, vendor/account strategy and unpublished diligence out of the public layer unless JCX approves.

## Recommended derived handoff artifacts

The current files are the source corpus. Before asking another model to build, create (or explicitly ask it to derive) these small, stable artifacts so it does not infer editorial priorities from document order:

| Artifact | Minimum fields | Why it is needed |
|---|---|---|
| `page_content_manifest` | `page_id`, page type, stable entity/case/standard IDs, audience, visibility, priority, publication state, reviewer, last reviewed, required claim IDs, source IDs, open questions | Defines what is actually launchable and prevents private or under-reviewed rows from becoming pages. |
| `finding_cards` | finding ID, short title, thesis, evidence claim IDs, source IDs, date/scope, implication, caveat, confidence, linked lifecycle/region/entities | Converts long atlas prose into reusable editorial units without losing attribution. |
| `story_sequences` | sequence ID, title, ordered finding/entity/case/standard IDs, intended audience, narrative purpose, transition logic, visibility | Gives the build model story logic while leaving the visual expression open. |
| `entity_profile_packets` | entity ID, record type, approved name/aliases, proposition, buyer/workflow, taxonomy, status, geography, evidence summary, claims, relationships, risks, action, open questions | Prevents profile pages from being assembled from arbitrary CSV columns. |
| `product_profile_packets` | product ID/owner, exact workflow, users, inputs/outputs, deployment, integration/export, data sensitivity, MRL rationale, evidence, implementation prerequisites, pilot hypothesis | Product decomposition is currently incomplete; this artifact must be sparse where evidence is sparse. |
| `case_metric_facts` | case ID, metric type, raw wording, normalized value only if explicit, unit, numerator, denominator, period, baseline/comparison, result state, measured by, grade, caveat | Makes outcome charts safe and preserves free-text source meaning. |
| `status_event_facts` | entity ID, prior/current status, event type/date, evidence date, observed date, source/claim, reviewer, confidence | Supplies a real timeline instead of misusing `last_verified`. |
| `standards_crosswalk` | standard IDs, layer/domain, version, relationship type, problem solved, implementation evidence, JCX rule, caveat | Makes interoperability analysis actionable without implying that standards are products or deployments. |
| `selection_log` | selected ID, selection reason, lifecycle/region/record-type coverage, evidence gate, exclusion/deferral reason, reviewer | Makes “why these companies?” auditable and avoids a popularity-driven showcase. |
| `visibility_policy` | artifact/field, public/private/internal state, approval owner, redaction rule, correction behavior | Essential because the dossier and second-pass strategy contain client-private intelligence. |
| `research_query_vocabulary` | aliases, former names, spelling variants, lifecycle/buyer/asset terms, excluded ambiguities | Supports search without using fuzzy name matching as identity proof. |

If these artifacts are not created in advance, the receiving model should mark them as derived working objects and output an explicit editorial backlog rather than silently filling them with invented content.

## Company, case and standard selection logic

The next model needs a defensible selection rule, not a fixed logo list. Use this hierarchy:

1. **Index breadth:** make all 690 discovery identities searchable, with discovery-only treatment and snapshot/source-layer labels.
2. **Public comparison set:** prefer reviewed qualified-core organizations/products, not discovery-only rows; exclude unresolved identity/status/tier records from “leaders” or default comparison unless shown as a deliberate uncertainty example.
3. **Launch editorial set:** select approximately 25–40 profiles across at least six lifecycle domains, multiple technology layers, record types, geography/context clusters and operating archetypes. Include Bangladesh/South Asia and non-US comparators; do not let the 97 US HQ records dominate merely because they are numerous.
4. **Evidence mix:** select anchor profiles with at least three source classes where possible (primary organization/product, customer/regulator/filing/standard, independent context). For early-stage/YC profiles, allow a weaker-evidence exception only when clearly marked as discovery/watchlist.
5. **Analytical coverage:** include complementary workflow examples rather than only “top” companies: systems of record, bounded AI, construction/physical evidence, energy/climate, financial rails, standards/data infrastructure, venture-client programs and technology-enabled operators.
6. **Outcome set:** select cases with explicit baseline/metric/period/denominator first; include negative/restructured cases as risk counterweights. Do not select only the largest percentages or most famous vendors.
7. **Historical/relationship set:** include acquired, absorbed, pivoted and failed examples where they explain market structure or a control lesson. Preserve successor/product lineage.
8. **JCX action set:** where the private layer is authorized, use the weighted relevance rubric and verified workflow fit to choose analyze/demo/pilot/partner/monitor; never turn this into a public investment ranking.

Selection must be logged. Funding, employee count, accelerator membership, media attention, customer logos, web traffic and a polished interface are discovery or context signals, not standalone selection evidence.

## Data contracts and joining rules

1. Use immutable `entity_id`, `discovery_id`, `claim_id`, `assertion_id`, `relationship_id`, `case_id`, `standard_id` and `source_id`. Names and URLs are not universal keys.
2. Join qualified claims/assertions/relationships by qualified `entity_id`; join discovery rows through `qualified_entity_ids_json`, YC IDs, ecosystem source-row IDs and explicit source-layer fields.
3. Use name-first, conservative discovery resolution. A shared domain never proves identity. Preserve Howie AI/Trubrics, Betterview/Nearmap and Honest Buildings/Procore as separate identities with review flags/relationship notes.
4. Keep canonical domain, candidate company URL and directory/profile URL separate. A YC, portfolio or LinkedIn page is not a canonical company domain.
5. Parse JSON-array columns; do not split strings on `|` or assume a scalar is complete. The legacy master’s `||` values are lineage only.
6. Treat `status_observed_at`/`last_verified` as observation time. Only use `status_evidence_date` or an event record for historical status dates.
7. For geography, distinguish HQ, incorporation/founding, operating coverage, supported market, verified customer/deployment market, data-hosting location and local partner.
8. For each material claim, show claim grade, source grade, source type, observed/published date, scope and limitation. The current source register does not yet supply complete title/publisher/locator/claim-support metadata; do not fabricate it.
9. Keep outcomes and standards as independent tables. Do not fold cases into generic company claims or standards into product features.
10. Preserve `unknown`, `not disclosed`, `not yet reviewed` and `not applicable` as distinct user-facing states where possible.

## Visualization-ready datasets: what exists and what is still missing

The corpus supports several derived views, but the receiving model should generate them from normalized joins and include a textual/table fallback.

| Derived dataset/view | Source inputs | Ready state | Caveat/required derivation |
|---|---|---|---|
| Lifecycle × technology matrix | `atlas_entities`, lifecycle taxonomy, product/entity tags | Partly ready | Many entities have shorthand/unmapped legacy lifecycle labels; avoid forcing organizations into product-level cells. |
| Search/filter index | `discovery_universe` joined to `atlas_entities` | Ready for discovery | Label qualified versus discovery-only; retain source layer and snapshot date. |
| Evidence coverage/waterfall | claims, source register, publication/review fields | Partly ready | Claim grades and source grades are provisional; source register is not yet claim-locator complete. |
| Maturity × evidence view | MRL, claim/source grades, status | Not fully ready | MRL is intentionally blank for many records; unknown must remain unknown, not plotted as zero. |
| Regional map/lens | HQ, operating regions, country/location signals, cases | Partly ready | HQ is not deployment; discovery locations are not customer coverage. Toggle contexts. |
| Relationship graph | qualified relationships plus discovery ecosystem memberships | Partly ready | Relationship types are not all equally verified; label source date and distinguish membership, ownership, product, acquisition and implementation. |
| Outcome explorer | 44 case rows | Partly ready | Metrics are mostly free-text; derive metric type/unit/denominator only when explicit and preserve original wording. No universal ROI aggregation. |
| Failure/status timeline | atlas narrative, assertions, status fields, cases | Not ready as a complete event table | Status event history, effective dates and source locators need packaging; do not infer dates from retrieval dates. |
| Standards dependency map | standards registry + standards narrative | Partly ready | Crosswalks among IFC/IDS/BCF/OSCRE/Brick/Haystack/REC/BACnet/GIS/carbon/security need explicit versioned relations. |
| JCX workflow overlay | atlas, dossier, second pass, pilot canvases | Private and hypothesis-level | Requires authorization, internal baseline and process-owner validation; do not expose as public fact. |

## Missing analysis packaging and ambiguities to resolve

These are the main handoff gaps. They do not require inventing research; they require labeling, derivation or an editorial decision.

### High priority before public launch

- **No page-ready content manifest.** There is no canonical list of which 25–40 entities, 12 cases, standards, regional stories and signals are launch-ready, nor a per-page publication state. Create a `page_content_manifest` or editorial selection table with stable IDs, audience, visibility, priority, required claims, status, reviewer and last review.
- **Claims are not yet reviewed for public use.** All 700 normalized claim rows remain in the editorial queue. A website may expose them only as provisional/under-review evidence or use a reviewed subset after a human pass.
- **Sources are not yet claim-locator complete.** The 1,077-source register has URL lineage and provisional domain quality, but not consistently title, publisher, publication/effective date, locator, excerpt hash, support/contradict role or reviewer. Add these for material claims.
- **Product decomposition is incomplete.** Organization records carry product/category signals, but most products do not have independent IDs, owners, workflows, MRL, integration, security, pricing or customer evidence. Do not generate rich product pages by extrapolating organization rows.
- **Outcome metrics are not normalized enough for chart axes.** The case library has excellent narrative fields and caveats, but many metrics are free text. Add metric type, unit, numerator, denominator, period, comparison method, result state (reported/estimated/modeled/realized), measured-by and verification fields when explicit.
- **Status history is under-packaged.** Current status and observation dates exist, but event tables with effective date, prior/new status, source and reviewer are not populated as a complete public timeline. Never turn “last checked” into “acquired/shutdown date.”
- **Public/private boundary needs an explicit switch.** The atlas contains both public global research and private JCX opportunity/website observations. Add audience and publication-state metadata to each selected claim, page and story.

### Important unresolved content decisions

- 22 entities have conflicting relevance tiers; show “tier under review” rather than choose one.
- 52 entities lack a verified canonical domain; 51 are discovery-profile-only and one remains unresolved.
- 130 entities carry editorial flags; a qualified record is not necessarily publishable.
- Six discovery identities remain in relationship review: Betterview/Nearmap, Honest Buildings/Procore and Howie AI/Trubrics. Keep each pair separate unless a reviewed relationship says otherwise.
- Four qualified records have status conflicts (PropERP, E-Hishabi, NirmanBazaar, Bproperty); the cautious current state is not evidence of failure.
- Global pioneer rows retain source-schema omissions for category, maturity, founding year, status date and other fields; do not fill from defaults.
- Lifecycle labels include many legacy/free-text variants; mapping methods and unmapped labels must remain visible where no reviewed code exists. L12 cross-lifecycle data/trust is conceptually important but has no direct record count in the legacy mapping.
- The methodology’s detailed MRL scale and the atlas’s shorter “market-readiness” summary should be reconciled into one public definition before the model writes badges.
- The score is intended for products/use cases and investigative priority, while many current scores/notes are entity-level or incomplete. Do not produce a mathematically precise scorecard where dimension evidence is absent.
- Relationship rows are qualified-core-focused and often state “reported or directory observed”; discovery ecosystem memberships are a separate source layer. Do not merge these into a single graph without relationship provenance.
- Source/document access conditions (403s, resets, paywalls/licensing) need an access-condition badge; a failed automated request is not proof that a source is false or unavailable.

### Editorial contradictions/ambiguities the receiving model should not silently resolve

- The public-site observations in the dossier are dated live tests, not authenticated backend or security findings. Phrase them as observed, directional and requiring internal validation.
- Odoo, current vendors, ERP stage, portfolio counts and internal ownership are public signals/hypotheses, not confirmed facts.
- Company-reported scale, financing, traffic, adoption and savings are not independent outcome evidence.
- “Active” in a YC or ecosystem directory is a dated displayed label, not a diligence conclusion.
- A standard’s status/version and a vendor’s claimed support are separate facts; implementation must be tested.
- Bangladesh law, privacy, title, finance, signatures, approvals and security sections are issue-spotting and require qualified local counsel/specialists.
- “Comprehensive” means decision-useful and methodologically broad, not every global company or market share.

## High-level prompt outline for the receiving model

This is an outline for the parent agent to synthesize into a final build prompt; it is intentionally not the final prompt.

1. **Role and ambition:** act as an elite editorial/data-product team; create an Awwwards-level immersive analysis experience with exceptional craft, pacing, accessibility and performance. Invite original design invention; do not prescribe a particular visual metaphor, layout, palette or animation recipe.
2. **Source of truth:** name the corpus cutoff and attach the bundle manifest. Require the model to load methodology, QA and schema before using narrative or data.
3. **Analytical thesis:** communicate the digital operating system for the built environment, the lifecycle × technology map, the adoption/value gap, workflow/data/governance prerequisites and Bangladesh transferability.
4. **Audience/visibility:** define public global atlas, client-private JCX chapter and internal diligence states. Prohibit accidental leakage of private observations, meeting scripts or unpublished claims.
5. **Data contract:** require typed entities, stable IDs, separate claims/sources/assertions/relationships/cases/standards, conservative discovery joins, explicit null/missingness, status dates, aliases and versioned taxonomy.
6. **Editorial hierarchy:** require an orient → map → explain value → evidence → limits/failure → standards → regional/JCX implication → conditional action → trust/methodology progression, while leaving its expression to the model.
7. **Page contracts:** require content inputs for homepage, atlas/index, organization, product, case, signal/theme, region, standards/methodology/trust and private JCX pages; allow “not yet profiled” rather than fabricate missing product content.
8. **Evidence behavior:** show S1–S5 and C1–C5 separately; preserve attribution verbs, periods, denominators, caveats and uncertainty; never convert legacy grades or vendor outcomes into certainty.
9. **Selection logic:** prioritize a reviewed launch subset across lifecycle, geography, record type and evidence context; use relevance tiers as editorial relevance, MRL as product readiness and score as investigative priority; never rank by funding/popularity or call a company “best” without a defined, reviewed basis.
10. **Visualization contracts:** use lifecycle, region, relationship, outcome, evidence and status data only where fields support them; distinguish HQ/coverage/deployment, unknown/zero, membership/ownership and reported/realized metrics; provide accessible table/text alternatives.
11. **Trust and safety:** include methodology, source drawers, review dates, correction/supersession path, licensing/access notes, privacy/security/AI disclaimers and “not endorsement/investment/procurement/legal advice” language.
12. **Performance/accessibility:** preserve mobile-first behavior, fast first content, readable evidence drawers, keyboard navigation, reduced motion, color independence and downloadable/shareable states where appropriate.
13. **Validation before launch:** run schema/link/ID checks, ensure no unsupported claims in visible copy, test private/public routing, verify chart units and denominators, and produce an editorial gap report for unresolved claims, product pages, status events and source metadata.

## Final handoff instruction

The model should be empowered to invent the website’s exact form, but not the research’s facts. Its creative freedom applies to structure, pacing, interaction, composition and visual expression; its analytical obligations are fixed by the corpus contracts above. When the corpus cannot support a statement, the correct output is an explicit unknown, reported claim, analyst interpretation, unresolved review state or a question for JCX—not a polished guess.
