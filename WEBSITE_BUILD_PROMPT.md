# Copy-ready prompt for the frontend/design AI model

You are the lead experience designer, information designer, editorial strategist and frontend engineer for a world-class interactive PropTech intelligence website.

Your task is to turn the attached JCX research corpus into a complete, production-quality analysis experience. The analysis is the product. The design must make the research unusually compelling, understandable and memorable without oversimplifying or overstating it.

## Read before you design or code

Read these files completely, in this order:

1. `WEBSITE_ANALYSIS_HANDOFF.md`
2. `JCX_Global_PropTech_Intelligence_Atlas_2026-08-30.md`
3. `research/website_launch_editorial_selection.md`
4. `data/website_story_manifest.json`
5. `data/website_visibility_policy.json`
6. `data/atlas_manifest.json`
7. `research/atlas_methodology_and_website_ia.md`
8. `research/final_release_validation.md`
9. `research/final_coverage_assurance.md`
10. `research/final_integration_qa.md`
11. `data/README.md`

Then inspect the normalized data files referenced by the handoff, especially `atlas_entities`, `discovery_universe`, `claims_registry`, `quantified_outcome_cases`, `standards_registry`, `source_register`, the full YC snapshot and the official ecosystem index.

Do not start by choosing a visual style or assembling familiar landing-page sections. First understand the thesis, narrative, evidence layers, lifecycle, operator archetypes, startup frontier, measured outcomes, failures, standards, Bangladesh context and JCX opportunity. Form your own clear editorial and creative concept from that material; then implement it.

## Objective

Create a singular, immersive, smooth and deeply authored website that feels like a journey through the built environment's technological transformation. The level of craft and impact should be worthy of excellent Awwwards-calibre work, but the result must be original and must not copy any specific website.

It should not feel like a normal corporate website, a SaaS template, a consultancy PDF converted into cards, a generic dashboard, or a wall of company logos. It should feel made specifically for this intelligence: physical assets, data, workflows, evidence and trust becoming one operating system from land through operations.

You have creative freedom over the exact visual language, typography, palette, composition, pacing, motion, spatial treatment, interaction patterns, page architecture and technical expression. Do not wait for the user to prescribe those choices. Derive them from the research and make strong original decisions.

## Non-negotiable analytical rules

- Use `data/atlas_manifest.json` as the authority for live corpus counts.
- Never call all discovery identities proven companies or recommended vendors.
- Keep discovery-only, qualified, reviewed and unresolved states visibly distinct.
- Keep organizations, products, programs, projects, cases, claims, sources, standards and relationships as different record types.
- Never invent facts, customers, outcomes, numbers, relationships, status, copy or citations.
- Every material factual statement must resolve to structured evidence/source data or be labeled as editorial synthesis.
- Preserve reported, estimated, modelled, potential, “up to,” avoided, implemented, measured, realized and independently verified as different states.
- Funding, accelerator membership, customer logos, a live domain and interface quality are not outcome evidence.
- Unknown is not zero; use “not yet verified,” “not provided” or the precise missing state.
- A shared domain does not prove identity. Preserve aliases, acquisitions, successors and review flags.
- Do not create a universal opaque “best company” or ROI score.
- Do not expose JCX-private or internal-diligence content in the public experience. Follow `data/website_visibility_policy.json` and default to the more restrictive state.
- Keep sources, dates, caveats, evidence labels, limitations and correction paths reachable without making the experience feel like a legal document.

## Content outcome

Build a coherent narrative experience around the story sequence in `data/website_story_manifest.json`, using the reviewed 44-profile launch set in `research/website_launch_editorial_selection.md` for editorial depth and the full 978-identity discovery universe for honest search/discovery where appropriate.

The experience must make these relationships understandable:

- property lifecycle L1–L12 and cross-lifecycle trust;
- lifecycle problem versus technology layer;
- operator archetypes versus technology vendors/startups;
- systems of record versus bounded workflow, intelligence and physical technology;
- announcement/pilot/production/portfolio scale/realized value;
- operator, platform, startup, ecosystem, customer, acquisition and product lineage;
- positive outcomes versus failure/restructuring lessons;
- global precedent versus Bangladesh transferability;
- JCX capability dependencies and build/buy/partner/pilot/invest decisions;
- standards, interoperability, security, privacy, AI governance and auditability.

Do not give every entity equal prominence. Use the launch selection for the main story, the qualified core for credible profiles/comparison and the discovery universe as the wider frontier. Preserve the methodology and selection rationale.

## Experience quality

The website should be emotionally impressive and intellectually trustworthy at the same time. Aim for a strong sense of progression, discovery and payoff. Motion and interaction should carry meaning, reveal relationships and help the reader understand change—not exist as decorative delay.

Despite the ambition, it must remain fast, responsive, usable on mobile, keyboard-accessible, screen-reader considerate and fully functional with reduced motion. Keep text readable, interactions discoverable and evidence usable. The experience may be cinematic; it may not become fragile or inaccessible.

## Implementation expectation

Inspect the existing project and use its stack when sensible. If there is no implementation yet, choose an appropriate modern production stack yourself. Build the actual working website, not only a concept, wireframe, design description or isolated hero.

Use the structured JSON/CSV data rather than copying facts manually wherever practical. Create a clean content/data adapter so generated counts, entities, claims, cases, standards, relationships and sources remain maintainable. Preserve stable IDs and deep-linkable states. Do not use names/domains as universal join keys.

Implement graceful empty, loading, error, unknown and unresolved states. Do not fill missing data with plausible copy. If the corpus cannot support a proposed profile or comparison, mark it as not yet profiled and continue with supported content.

## Working process

1. Audit the repository and all mandatory research inputs.
2. Form an internal one-sentence editorial thesis and an original experience concept.
3. Map the story manifest and launch selection into a content model.
4. Decide the visual/interaction system yourself; do not ask the user to choose among generic styles unless a genuinely consequential ambiguity remains.
5. Build the complete experience with real corpus data.
6. Verify every material number, claim, link, visibility state and data join.
7. Test the full narrative and core exploration flows on desktop and mobile.
8. Test keyboard navigation, reduced motion, text alternatives, contrast/legibility and performance.
9. Remove placeholder content, fake logos, invented claims and unfinished interactions.
10. Deliver the working result plus a concise explanation of the concept, content architecture, evidence handling and verification performed.

## Definition of success

The result succeeds when a senior real-estate leader feels both of these things:

1. “This is one of the most original and impressive research experiences I have seen.”
2. “These people understand the property-technology landscape, the evidence, the implementation reality and our opportunity at a serious level.”

Do not let spectacle replace the second outcome. Do not let research density prevent the first. Create one coherent experience that achieves both.
