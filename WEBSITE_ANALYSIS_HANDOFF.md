# JCX PropTech intelligence website — analysis handoff

**Release date:** 30 August 2026  
**Research cut-off:** 30 August 2026  
**Purpose:** give a separate design/frontend AI model everything it needs to turn the research into an exceptional analysis experience without inventing, flattening or misrepresenting the evidence.  
**Authority:** counts come from [`data/atlas_manifest.json`](./data/atlas_manifest.json). If any number in a narrative document differs from the generated manifest, use the manifest and flag the narrative for refresh.

## 1. What this handoff is—and is not

This is the content, evidence and analytical contract for the website. It explains what the research means, which files are authoritative, which stories matter, how entities and claims relate, what may be public, and which uncertainties must remain visible.

It is **not** a visual design specification. The receiving model should invent the exact visual language, composition, pacing, motion, transitions and interaction system after understanding the research. Earlier diagrams or interface suggestions in the atlas are analytical possibilities, not mandatory layouts.

The desired experience is original, exceptionally crafted and journey-like—capable of Awwwards-level impact—while remaining an intelligence product rather than a design demo. It must not imitate a particular site. Analysis is the protagonist; design makes the analysis unforgettable.

## 2. Mandatory reading order

The receiving model should read these files before it starts implementation:

1. [`WEBSITE_ANALYSIS_HANDOFF.md`](./WEBSITE_ANALYSIS_HANDOFF.md) — this contract.
2. [`JCX_Global_PropTech_Intelligence_Atlas_2026-08-30.md`](./JCX_Global_PropTech_Intelligence_Atlas_2026-08-30.md) — the principal global synthesis and JCX thesis.
3. [`research/website_launch_editorial_selection.md`](./research/website_launch_editorial_selection.md) — the reviewed launch set and why each record is present.
4. [`data/website_story_manifest.json`](./data/website_story_manifest.json) — machine-readable story chapters, evidence references, visibility and open questions.
5. [`data/website_visibility_policy.json`](./data/website_visibility_policy.json) — public/private/internal boundaries.
6. [`data/atlas_manifest.json`](./data/atlas_manifest.json) — authoritative release counts.
7. [`research/atlas_methodology_and_website_ia.md`](./research/atlas_methodology_and_website_ia.md) — taxonomy, scoring, evidence and data model.
8. [`research/final_release_validation.md`](./research/final_release_validation.md) — final post-residual release QA and coverage disposition.
9. [`research/final_coverage_assurance.md`](./research/final_coverage_assurance.md) — the independent pre-residual completeness audit and honest scope language.
10. [`research/final_integration_qa.md`](./research/final_integration_qa.md) — pre-residual identity and integration QA, retained for audit history.
11. [`data/README.md`](./data/README.md) — generated data semantics and file descriptions.

Then load the normalized data files as needed. Do not infer editorial priority from CSV order.

## 3. Final release snapshot

The generated release currently contains:

| Layer | Count | What the count means |
|---|---:|---|
| Qualified-core entities | 295 | 274 organizations, 12 programs/ecosystems, eight product offerings and one historical project. These are typed analytical records, not “295 recommended vendors.” |
| Discovery identities | 978 | Conservatively resolved search frontier joining the qualified core, full YC snapshot and official ecosystems. |
| Discovery-only identities | 683 | Candidates not promoted to the qualified core. |
| YC directory profiles | 128 | Complete dated capture of the official YC Real Estate & Construction directory: 100 Active, 27 Acquired, one Public as YC displayed them. |
| Official ecosystem pairs | 683 | Company–ecosystem memberships from 11 specialist families and 20 named program/region labels. Membership is discovery evidence only. |
| Ecosystem-linked identities | 653 | Identity-resolved candidates carrying one or more of the 683 memberships. |
| Claims / interpretations | 834 | Atomic source-row claims and atlas interpretations with provisional C1–C5 attribution; all require claim-level review for public use. |
| Source-field assertions | 3,896 | Competing source observations kept separate rather than forced into one scalar. |
| Qualified-core relationships | 174 | Reviewed program/cohort discovery relationships; generic “Independent” provenance is not rendered as a membership. |
| Outcome/failure cases | 44 | Bounded positive, negative and restructured cases with metric context and causal caveat. |
| Standards/frameworks | 39 | Interoperability, information management, controls, GIS, carbon, security, privacy and AI governance. |
| Normalized sources | 1,600 | Conservative URL identities in the current generated release. |
| Exact observed source variants | 1,625 | Exact URL forms observed across the scoped corpus. |

These layers overlap. Never add 295 + 128 + 683 and call it a company count. Never call the 978 identities “978 proven companies.”

## 4. The honest comprehensiveness claim

No changing global market can be guaranteed exhaustive. This release is designed to be **defensibly comprehensive for a developer/operator strategy and a world-class market analysis** because it combines:

- major global developers, owners, operators, contractors, homebuilders, data-centre/logistics platforms, hospitality platforms and corporate-innovation models;
- enterprise control planes across development, investment, construction, property operations, building controls and climate risk;
- a complete dated YC Real Estate & Construction directory capture;
- complete current source-native snapshots of selected specialist ecosystems, including MetaProp, Pi Labs, Fifth Wall, Brick & Mortar Ventures, JLL Spark, Taronga RealTechX, NAR REACH, CEMEX Ventures Top 50 ConTech 2026, RET Ventures, Moderne Ventures/Passport and 2150;
- selective enrichment from other material specialist sources such as Shadow Ventures, Zacua, Foundamental, BuiltWorlds and corporate programs;
- regional research across Bangladesh, India/South Asia, MENA, Southeast Asia, Japan, Australia, Europe/UK, Latin America, Africa and North America;
- outcome, failure, standards and implementation layers—not only company profiles.

Use this wording:

> A dated, curated global intelligence corpus built from complete snapshots of named directories and specialist ecosystems, plus an evidence-qualified set of decision-relevant operators, platforms and startups. It is comprehensive for the stated analytical scope, not a claim to enumerate every PropTech company in existence.

Do not use “the complete global PropTech market,” “every PropTech company,” or “the definitive ranking.”

## 5. Central thesis

The most important conclusion is not that real estate needs more apps or more AI. Property technology is becoming a **digital operating system for the built environment**:

1. authoritative land, project, unit, customer, contract, cost, asset and service records;
2. workflow systems that move accountable work across the lifecycle;
3. physical/spatial evidence from BIM, field capture, sensors and controls;
4. customer, landowner, contractor, investor and operator interfaces that complete real tasks;
5. analytics and bounded AI acting over governed data;
6. human approval, audit, privacy, security and correction for consequential decisions;
7. measured feedback that distinguishes a launch, pilot or claim from realized value.

The research repeatedly shows that the highest-value pattern is:

> one real problem → one accountable owner → one governed source of truth → one working workflow → one measurable result.

## 6. The analytical map

### 6.1 Lifecycle

Use the controlled L1–L12 taxonomy from [`data/lifecycle_taxonomy.json`](./data/lifecycle_taxonomy.json):

- L1 Land, site and origination
- L2 Feasibility and development strategy
- L3 Capital, finance and transactions
- L4 Design, BIM and preconstruction
- L5 Construction delivery
- L6 Marketing, sales, leasing and distribution
- L7 Occupancy and customer experience
- L8 Property and facility operations
- L9 Asset, portfolio and investment management
- L10 ESG, climate, resilience and health
- L11 Handover, warranty and end-of-life
- L12 Cross-lifecycle data and trust

An organization or product can occupy several lifecycle domains. Never force it into one box merely to simplify a visual.

### 6.2 Technology layers

Keep technology layer separate from lifecycle/workflow:

1. systems of record;
2. applications and bounded workflow;
3. data and intelligence;
4. physical and connected assets;
5. immersive/spatial visualization;
6. market and financial rails;
7. enabling infrastructure and governance.

“AI,” “digital twin,” “IoT” and “blockchain” are mechanisms, not complete use cases. Always connect them to user, workflow, input, output and economic/operational consequence.

### 6.3 Decision-relevant coverage

The qualified layer now represents all major decision surfaces a developer/operator needs to understand:

| Decision surface | Representative anchors in the corpus | Core analytical question |
|---|---|---|
| Land/title/site | LandTech, Landeed, Orbital Witness, Barikoi, Acres, HouseCanary | Can parcel/title/constraint claims remain source-linked, reviewable and local? |
| Feasibility/development | TestFit, Autodesk Forma, ALICE Technologies, Northspyre, Dealpath, ARGUS, Paces | Can alternatives become faster without hiding local assumptions and approvals? |
| Fund/capital/transactions | Juniper Square, Dealpath, ARGUS, Built, Rabbet, Snapdocs | Who controls underwriting, investor truth, payments, custody and audit? |
| Design/CDE/project record | Autodesk, Oracle Construction & Engineering, Procore, Bentley, Trimble, Nemetschek | Which model/document/cost/schedule record is authoritative, versioned and exportable? |
| Construction execution | ALICE Technologies, SmartPM Technologies, Togal.AI, PlanRadar, OpenSpace, Buildots, DroneDeploy, Cupix, Revizto, Outbuild, Field Materials, Track3D, Brick & Bolt | Does planning, estimating and field evidence drive ownership, schedule, payment, quality and handover decisions? |
| Robotics/industrialization | AUAR, Teleo, Gravis Robotics, Lumina, Dusty Robotics, Built Robotics, ICON, Nabr | Do utilization, logistics, maintenance, code acceptance and total economics work beyond a demo? |
| Revenue/buyer journey | KE Holdings/Beike, Sell.Do, Salesforce, LeadSquared, RealPage, EliseAI, Funnel Leasing | Can one approved unit/price/customer/booking record span marketing, sales and service? |
| Property/resident operations | Yardi, MRI, RealPage, AppFolio, Entrata, Facilio, Lula, PredictAP, Stan.AI, MagicDoor | Are work, invoices, residents, assets, service levels and costs connected? |
| Controls/energy | Siemens Building X, EcoStruxure Building, OpenBlue, Honeywell Forge, BrainBox AI, Runwise, PassiveLogic | Are meters, points, protocols, control rights, cyber and operators ready for optimization? |
| Climate/carbon/risk | Building Transparency/EC3, Measurabl, Deepki, One Click LCA, Climate X, First Street, ZestyAI, CarbonCure, Sublime Systems, Biomason, Gigaton, Cocoon | Can every result trace to boundary, source, factor/model, period, scenario and assurance? |
| Data/trust/governance | Standards registry, source register, claims, identity/status review | Can automation remain interoperable, permissioned, auditable, correctable and portable? |

## 7. Narrative spine

The website should feel like a coherent intellectual journey. Preserve this reasoning order while allowing the design model to invent its expression:

1. **The proposition:** PropTech is becoming an operating system for physical assets and property decisions.
2. **The terrain:** land-to-handover-to-operations lifecycle crossed with technology layers.
3. **The operators:** how developers, owners, infrastructure, hospitality and service platforms create repeatable capability.
4. **The control planes:** systems that govern projects, capital, customers, buildings and risk.
5. **The frontier:** AI-native workflow, physical evidence, robotics, materials, energy and climate.
6. **The evidence gap:** pilots, company claims and funding are not realized value.
7. **What measured value looks like:** bounded cases with baseline, denominator, period and caveat.
8. **What failure teaches:** balance-sheet exposure, hardware commercialization, adoption, legitimacy, timing and technology survival.
9. **The durable layer:** standards, identity, information management, interoperability, security, privacy and AI governance.
10. **The regional transfer:** why South Asia/MENA/SEA and Bangladesh constraints change product fit.
11. **The JCX opportunity:** governed project truth → lead-to-booking → land/JV → delivery/handover → operations/energy → bounded AI.
12. **The trust close:** methodology, dates, sources, limitations, corrections and no-endorsement boundary.

[`data/website_story_manifest.json`](./data/website_story_manifest.json) converts this spine into machine-readable chapters and references.

## 8. Records that must never be flattened

Keep these as distinct objects:

- **Organization:** a legal or operating entity.
- **Product/offering:** a named platform, module or service owned by an organization.
- **Program/ecosystem:** a fund, accelerator, challenge or sourcing network.
- **Project:** a built-environment project or historical development.
- **Case study:** one bounded customer/vendor intervention.
- **Claim:** one independently reviewable assertion.
- **Source:** one URL/source identity and its lineage.
- **Relationship:** ownership, product-of, acquired-by, customer, pilot, integration or program membership.
- **Standard/framework:** an external specification or governance framework.

A shared domain does not prove two names are one identity. Portfolio membership does not prove deployment. A customer logo does not prove causality. An acquired product may remain available while the standalone company no longer exists.

## 9. Evidence contract

### 9.1 Source grade and claim grade are different

Source quality:

- S1 — authoritative and auditable: filing, regulator, standard, signed procurement/customer evidence or official technical documentation.
- S2 — first-party/company/customer/partner material.
- S3 — reputable independent research/reporting with a method.
- S4 — structured directory or ecosystem source requiring verification.
- S5 — weak discovery signal such as social/listicle/review.

Claim attribution:

- C1 — verified fact.
- C2 — corroborated fact with a material limitation.
- C3 — clearly attributed company/customer/partner claim.
- C4 — atlas analyst interpretation.
- C5 — unverified signal.

Legacy A–D and A1/B2/B3 labels belong to older source layers. Do not map them automatically to S1–S5 or C1–C5.

### 9.2 Required language distinctions

Preserve words such as:

- reported;
- estimated;
- modelled;
- potential;
- up to;
- identified;
- avoided;
- implemented;
- measured;
- realized;
- independently verified.

Never rewrite a vendor-reported result as a universal product outcome or JCX forecast.

### 9.3 Unknown is not zero

Blank/null can mean not provided, unknown, unreviewed, not applicable, withheld or absent from the source schema. Do not display zero, “none” or a mid-score unless the data says so. Use “not yet verified” or the more precise missingness state.

## 10. Data map

| File | Use | Critical rule |
|---|---|---|
| [`data/atlas_entities.json`](./data/atlas_entities.json) | Qualified typed profiles and filters. | Qualified does not automatically mean publish-ready; respect `publication_readiness` and review flags. |
| [`data/discovery_universe.json`](./data/discovery_universe.json) | Broad search frontier. | Show `discovery_only`, source layers and identity-review state. |
| [`data/claims_registry.json`](./data/claims_registry.json) | Atomic claims/interpretations. | Show attribution, caveat, review status and sources; never concatenate as marketing copy. |
| [`data/entity_field_assertions.json`](./data/entity_field_assertions.json) | Source-level conflicting observations. | Do not force disagreement into one fact. |
| [`data/entity_relationships.json`](./data/entity_relationships.json) | Qualified relationship edges. | Every edge needs a relationship label and date/source. |
| [`data/quantified_outcome_cases.json`](./data/quantified_outcome_cases.json) | Measured positive/negative/restructured cases. | Preserve baseline, metric wording, denominator/sample, period and causal caveat. |
| [`data/standards_registry.json`](./data/standards_registry.json) | Standards and governance layer. | A standard's existence does not prove implementation. |
| [`data/source_register.json`](./data/source_register.json) | URL identities, use lineage and provisional source grades. | Domain-level grade is provisional; do not invent title/publisher/date metadata. |
| [`data/yc_real_estate_construction_directory_2026-08-30.json`](./data/yc_real_estate_construction_directory_2026-08-30.json) | Complete dated YC snapshot. | YC status/membership is a source-native signal, not diligence. |
| [`data/built_environment_ecosystem_discovery_index.json`](./data/built_environment_ecosystem_discovery_index.json) | 683 official membership rows. | Never turn ecosystem presence into a leader score. |
| [`data/website_story_manifest.json`](./data/website_story_manifest.json) | Editorial story sequencing and evidence references. | It controls narrative priority, not visual form. |
| [`data/website_visibility_policy.json`](./data/website_visibility_policy.json) | Public/private/internal policy. | Default to the more restrictive state on conflict. |

Use immutable IDs—`entity_id`, `discovery_id`, `claim_id`, `assertion_id`, `relationship_id`, `case_id`, `standard_id`, `source_id`—for joins. Do not use names or domains as universal keys.

## 11. Editorial selection

Do not attempt to give all 978 identities equal narrative weight.

- The **search frontier** may expose all discovery identities with honest evidence-stage labels.
- The **comparison/default atlas** should begin with qualified records.
- The **launch story** should use the reviewed 44-profile set in [`research/website_launch_editorial_selection.md`](./research/website_launch_editorial_selection.md).
- The **case layer** should balance positive outcomes with failures/restructurings.
- The **regional layer** must not be dominated by US records simply because public data is abundant.
- The **JCX action layer** should select on workflow fit, local constraints, evidence and implementation readiness—not fame, funding or design quality.

Every selection needs a reason. Every deferral needs an exclusion or “not yet reviewed” reason.

## 12. Public, private and internal boundaries

### Public global analysis

May include the global thesis, taxonomy, reviewed operator/platform/startup profiles, attributed outcomes, failures, regions, standards, methodology, source trail and high-level Bangladesh implications.

### JCX-private chapter

Keep current-site issue observations, internal process hypotheses, vendor/account strategy, project-specific opportunity maps, detailed pilot canvases, system assumptions, baselines, owners and meeting intelligence private unless JCX explicitly approves publication.

### Internal diligence

Keep unresolved identity/status research, sensitive contacts, security concerns, raw notes, unpublished sources, correction queue and procurement/legal diligence internal.

Use [`data/website_visibility_policy.json`](./data/website_visibility_policy.json) as the implementation authority.

## 13. JCX strategic synthesis

The credible ambition is not “use the most AI.” It is:

> JCX becomes Bangladesh's evidence-led developer: easier to evaluate, easier to buy from, easier to partner land with, easier to finance, easier to monitor and easier to live or work with—because every important promise connects to a governed record and accountable workflow.

Recommended capability order:

1. discover processes, systems, owners, baselines and data definitions;
2. establish one approved project/unit truth feeding the website and commercial workflows;
3. connect lead source, consent, response, qualification, visit, offer, booking and collection;
4. build a source-linked landowner/JV workflow;
5. connect documents, procurement, progress evidence, issues, payment and handover;
6. add customer/landowner self-service on governed APIs;
7. establish asset, maintenance, meter/BMS and energy foundations;
8. deploy bounded AI only where ground truth, permissions, fallback and measurement exist;
9. operate paid venture-client pilots before considering CVC or equity.

This is a hypothesis until the discovery meeting validates JCX's systems, process ownership, portfolio, priorities and baselines.

## 14. Website content contracts

### Entry narrative

Must contain: research cut-off, thesis, live manifest-derived counters, dated findings, lifecycle explanation, operator/platform/startup evidence, outcomes, failures, regions, standards/trust and a visible “curated corpus, not total market” statement.

### Search/atlas result

Must contain: stable ID, name, record type, evidence stage, current status, geography, lifecycle, category, source/date signal, review state and caveat. Discovery-only results must look semantically different from qualified profiles.

### Organization/product profile

Must contain: identity/aliases, exact scope, parent/product/acquisition relationships, status and observation date, workflow and buyer, lifecycle/layer, geography, business/deployment model, claims and evidence, cases, risks, localization questions, recommended action, sources and correction path.

Do not create a product page when product-level evidence is absent. Sparse truth is better than invented completeness.

### Outcome/failure case

Must contain: parties, relationship, geography/context, baseline problem, intervention, exact metric wording, period/sample/denominator, measured-by/source type, grade, causal limitation, transferability and source date.

Never aggregate percentages, minutes, dollars, kWh, adoption and modelled scenarios into a universal ROI score.

### Regional/Bangladesh analysis

Must distinguish headquarters, intended market, supported geography, verified deployment, data coverage and local implementation partner. Public legal/regulatory material is issue-spotting, not legal advice.

### Standards/methodology/trust

Must explain evidence labels, identity/status treatment, corrections, freshness, interoperability, data portability, privacy/security and AI governance in usable language.

## 15. Fixed analytical safeguards

The implementation must not:

- invent a company, outcome, customer, number, source, relationship or status;
- turn discovery membership into endorsement, traction or maturity;
- rank companies by funding, fame, logo count or a single opaque score;
- show a live website/domain as proof that a company is operational;
- merge identities because they share a domain;
- treat headquarters as operating coverage;
- treat “acquired,” “inactive,” “failed,” “product survives” and “parent absorbed it” as one status;
- expose client-private observations by default;
- use an AI summary without a path back to the supporting claim/source;
- hide caveats behind a generic legal footer;
- sacrifice accessibility, performance or reduced-motion support for spectacle.

## 16. Creative freedom boundary

The receiving model has complete freedom to invent the experience within the evidence contract. It should not be told to use a particular palette, font, grid, hero, 3D object, animation library, page transition, chart type or site structure. It should derive its creative idea from the research itself: a physical industry becoming an interconnected, governed operating system; evidence moving through land, capital, construction, customer and operational layers; and JCX's opportunity to connect trust to execution.

The result should feel one-of-a-kind because its form grows from this specific analysis—not because it adds generic luxury effects.

## 17. Acceptance criteria for the handoff consumer

Before calling the website complete, the receiving model should be able to demonstrate:

1. every displayed count is generated from `atlas_manifest.json` or a clearly defined query;
2. every material factual statement resolves to a claim/case/source or is labeled editorial synthesis;
3. discovery, qualified, reviewed and private states cannot be confused;
4. the selected narrative covers operators, enterprise control planes, startup frontier, outcomes/failures, standards and Bangladesh/JCX implications;
5. profiles and comparisons preserve unknowns and conflicts;
6. mobile, keyboard, screen-reader, reduced-motion and performance behavior are production-grade;
7. no placeholder copy, fabricated customer logo or invented metric remains;
8. the experience feels authored and cohesive rather than assembled from standard sections;
9. sources, dates, limitations and corrections are reachable without breaking the narrative flow;
10. the exact visual direction is original and was derived after reading the research.

## 18. Final instruction

Read the research first. Form an internal editorial and creative thesis before coding. Use the structured data for truth, the atlas for meaning, the launch selection for focus, the story manifest for sequence and the visibility policy for safety. Then create the most compelling original expression of the analysis you can—without allowing the interface to overstate what the evidence knows.
