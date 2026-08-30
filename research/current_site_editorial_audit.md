# JCX PropTech Atlas: editorial and information architecture audit

**Audit scope:** current `web/src` experience and generated release data

**Release examined:** 30 August 2026

**Auditor:** read-only editorial review

## Executive verdict

The current site has a strong research foundation. Its thesis is coherent, its evidence boundaries are unusually responsible, and its chapter order follows a credible analytical argument. It already feels more like a serious research instrument than a normal marketing site.

It is not yet the meeting-quality, unforgettable analysis experience the brief asks for. The main problem is not missing research. It is translation. The site currently presents the research archive, taxonomy and caveats before it presents the answer a busy real-estate executive needs:

1. What is changing in property technology?
2. Which operating patterns are actually useful?
3. What has been measured, and how reliable is it?
4. What could transfer to Bangladesh?
5. What should JCX investigate next?

The experience therefore reads as a long, technically literate essay with an excellent data appendix. It does not yet read as an executive briefing that happens to open into a deep atlas.

The strongest upgrade is progressive disclosure. Keep the research discipline, but put the finding first, the evidence second, and the methodology third. Move most qualification language into compact provenance labels, evidence drawers and a clear glossary. A reader should understand the point of a section before encountering its caveat.

## Severity scale

- **P0:** credibility or comprehension failure; fix before showing the site to a client.
- **P1:** materially weakens the story, decision usefulness or trust.
- **P2:** polish, accessibility or consistency issue.

## What was audited

The app contains eight route families and 295 statically generated entity pages:

| Route | Current role | Editorial assessment |
| --- | --- | --- |
| `/` | Eleven-chapter linear journey | Strong thesis, but too much methodological density before the reader sees the answer. |
| `/atlas` | 295-record qualified-core explorer | Useful index, but cards do not explain what a record does or why it matters. |
| `/atlas/[id]` | 295 entity profiles | Trustworthy metadata view, but not a good analytical profile for a non-specialist. |
| `/frontier` | 978-identity discovery layer | Important breadth layer, but discovery records and identity warnings need stronger separation. |
| `/evidence` | 44 outcome and failure cases | Strong evidence structure, but the reader needs a synthesis before the case list. |
| `/standards` | 39 standards and frameworks | Valuable reference registry, but not yet translated into project decisions. |
| `/methodology` | Method, review queue and sources | Honest and thorough, but too long and too prominent for a first visit. |
| 404 | Missing-record state | Clear and consistent; add a search path and recent context. |

The route count is not the same as a complete content audit. The entity route is one template repeated 295 times, so the template and representative data states were audited rather than pretending each record is editorially unique.

## P0 findings

### P0.1 The Atlas does not answer "what does this company do?"

`Entity` has `jcxRelevanceNotes`, `categoryLabels`, `businessModels`, `lifecycleCodes` and claims, but `/atlas/[id]` does not show the relevance note or a plain-language one-line description. The main Atlas cards show name, type, status, lifecycle codes, country and source count. A reader has to infer the company from codes or open a source URL.

This is the biggest content gap. The site claims to help a developer understand the field, but the primary browse surface does not explain the field's participants.

**Fix:** every profile should open with a compact profile synopsis:

- **What it is:** operator, product, program, project or other record type.
- **What it changes:** one plain-language workflow statement.
- **Where it sits:** lifecycle and technology layer.
- **Why it matters:** the JCX relevance note, explicitly labelled as analyst interpretation.
- **What is known:** one or two attributed claims or case links.
- **What remains unknown:** one precise caveat.

Do not invent a synopsis from a category label. Add a controlled editorial field to the generated data, or use the existing research note only after reviewing its wording.

### P0.2 The site says "qualified core" while every claim remains under review

The release correctly says that 834 claims carry provisional grades and that all require claim-level review. At the same time, the Atlas calls 295 records "evidence-qualified" and profile pages display a `claim review pending` readiness mark. This is accurate in the data model but confusing in the experience. A visitor can reasonably ask whether the profiles are published, provisional or both.

**Fix:** put a single release-status explanation near the first use of "qualified":

> Qualified means the record passed the inclusion gate for analysis. It does not mean every claim is independently verified or ready to use as a procurement recommendation.

Then show a small provenance strip on each profile: `identity qualified`, `claims attributed`, `review status pending`. Do not repeat the same long warning in every section.

### P0.3 The discovery layer contains known identity hazards that are easy to misread

The generated data correctly keeps `howie ai` and `trubrics` separate even though both rows use `trubrics.com`, and flags the relationship for review. It also keeps `Betterview` separate from `Nearmap`, and `Honest Buildings` separate from `Procore`, while flagging suspicious shared-domain or acquisition relationships.

The current frontier UI only makes this distinction obvious after a visitor notices the `identity review` badge. Both cards still expose the same candidate domain, which can look like a data error rather than a deliberate unresolved state.

**Fix:** identity-review cards need a visible, human sentence directly under the name:

> Same domain appears in another ecosystem record. These identities are intentionally not merged until reviewed.

For acquisition cases, use a distinct `historical identity` or `successor relationship` label rather than the generic identity warning. Never allow a shared domain to look like a proof of identity.

### P0.4 One historical timeline record renders as a generic "View"

`Chapter08.tsx` references `org-view-inc`, but that ID is not present in `entities.json`. The code falls back to the literal label `View`, with no entity link or status mark. This is a visible quality defect in a featured failure timeline.

**Fix:** resolve the correct immutable entity ID, or render the event from a dedicated historical-event object. Add a build-time referential-integrity check that fails when a featured entity ID is missing.

### P0.5 The persistent journey rail is labelled as navigation but is not navigable

`SectionRail` renders a `<nav>` with `pointer-events-none` and contains no chapter links. It displays a chapter marker and lifecycle codes, but the user cannot use the rail to jump between chapters. This is especially damaging because the visual language implies an interactive architectural map.

**Fix:** add actual anchors with visible focus states and accessible labels. Keep the drawing decorative, but place a semantic list of chapter links above or beside it. On mobile, provide a compact chapter selector rather than only a progress line.

## P1 findings by route

### 1. Homepage and journey: a credible essay, not yet a decisive briefing

Relevant files: `web/src/components/journey/Hero.tsx`, `web/src/app/page.tsx`, `Chapter01.tsx` through `Chapter11.tsx`.

#### What works

- The central proposition is memorable: property technology is becoming an operating system for the built environment.
- The sequence from thesis to lifecycle, operators, workflows, evidence, region, venture-client logic, failure, standards and opportunity is intellectually sound.
- Counts are generated from the manifest instead of hard-coded in prose.
- The site keeps uncertainty visible and does not turn the research into a vendor ranking.

#### What weakens the first visit

- The hero asks the reader to "Begin the descent" before explaining what they will know after three minutes.
- Six counters emphasize internal research machinery, including source and claim counts, before the reader has learned the practical conclusion.
- The first chapter introduces the corpus contract and many definitions before it gives a short list of findings.
- Eleven chapters are all rendered on one very long page. There is no "executive brief", "resume", "skip to finding" or persistent reading mode.
- The visual metaphor changes between atlas, descent, operating system, frontier, durable layer and reckoning. One metaphor can carry the experience; six competing names feel authored rather than inevitable.
- The caveat rails are responsible but frequent. The repeated structure makes the page feel defensive and mechanically generated.

#### Recommended opening structure

1. **The answer in one screen:** three findings, one Bangladesh implication, one sentence on scope.
2. **The evidence behind the answer:** three or four featured evidence packets with source and attribution badges.
3. **The map:** lifecycle crossed with technology layer.
4. **The journey:** operators, workflows, outcomes, regional transfer, failure and durable trust.
5. **The decision lens:** a clearly marked public-safe hypothesis, with the private meeting guide kept separate.
6. **The method:** source and claim grammar at the end, with the full registry available on demand.

Keep the full chapter journey for deep readers, but make the first screen useful to someone who only has five minutes.

### 2. Chapter 01: thesis, corpus and adoption gap

The thesis is strong. The corpus contract is too prominent and too abstract for a first-time executive reader. The rows `qualified entities`, `discovery identities`, `ecosystem pairs`, `source-field assertions` and `claims & interpretations` are necessary for auditability, but not all belong in the opening emotional rhythm.

The `92% -> 5%` comparison is potentially powerful, yet it places two figures beside each other without giving the reader a quick visual explanation of the populations, survey wording and denominator. The EIB `29% / 6%` comparison has the same problem.

**Fix:** turn each statistic into a finding sentence with the population and source immediately visible. Example:

> JLL's survey found broad AI experimentation among its respondents, but far fewer respondents said they had achieved most programme goals. The implication is a delivery gap, not a universal industry ratio.

Use a compact `scope / population / date / source` line below the number. Move the complete layer table to a `How the corpus is built` drawer or Method page.

### 3. Chapter 02: map

The L1 to L12 taxonomy is a good backbone. The current problem strings are dense semicolon-separated lists. A non-specialist sees codes and keywords, not decisions.

**Fix:** every lifecycle row should add three short fields:

- plain-language question;
- one example workflow;
- one linked record or case.

For example, L5 could say: `Can the team know what is actually built, what is late and who must act?` Then link to field capture, schedule quality, procurement or handover examples. Label the horizontal bars as `number of records touching this domain`, because the current visual can be mistaken for a ranking.

The T1 to T7 layer cards also need one example. `Systems of record` is much easier to understand as `approved project, unit, customer and asset records` than as a taxonomy label alone.

### 4. Chapter 03: operators

The title "What the strongest operators disclose" implies a league table, even though the caveat says it is not one. Use `Selected operator patterns` or `How operators turn technology into capability`.

The eight archetypes are useful, but the cards mix types of organization, competitive advantage and risk. They need a consistent comparison grammar:

`Operator pattern -> recurring workflow -> data advantage -> evidence signal -> transfer risk`.

The claim cards currently quote company-reported signals but do not give a one-line interpretation. Add `What this demonstrates` and `What it does not demonstrate`. Keep quotes short. A long quote plus a caveat is less memorable than a clear analyst sentence followed by a source label.

The selected 44 profiles are a good narrative sample, but the cards do not expose their primary workflow or why the profile belongs in the story unless the reader reads dense copy. Use structured tags such as `buyer journey`, `portfolio operations`, `construction evidence`, `climate data` and `venture client`, then keep the prose to two sentences.

### 5. Chapter 04: workflow frontier and YC

The maturity ladder is one of the best pieces in the current experience. However, `Verified value` reads like a seventh maturity stage even though it is really an evidence condition. Draw a line between:

- **delivery maturity:** announced, prototype, pilot, production, portfolio scale;
- **evidence quality:** reported, measured, independently supported.

This distinction is central to the research and deserves a two-axis visual or a short sentence in the heading.

The three workflow beats are analytically right, but the product cards lack a quick comparison surface. Add filters for lifecycle, workflow, evidence stage, geography and record type. The reader should be able to compare site capture, schedule optimization, CRM, transaction rails, operations and climate tools without opening many profiles.

The YC snapshot is correctly labelled as a dated discovery layer. Add a short answer to the natural question: `What does this snapshot tell us?` It shows where startup activity is being surfaced, not which companies are best or ready for deployment.

### 6. Chapter 05 and `/evidence`: outcomes

The evidence packet anatomy is excellent and should become the site's central reading pattern. The case library currently opens with grades and then a long list. It needs a synthesis panel before the list:

- how many cases are positive, negative or restructured;
- how many have a baseline;
- how many state a period and denominator;
- how many are vendor/customer reported;
- how many have independent or filing-level support;
- which workflows recur most often.

Only calculate and display these values if the structured data supports them. Never infer missing values.

`A1`, `B2` and `B3` are legacy case-library grades, while `S1` to `S5` and `C1` to `C5` are current source and claim grades. The site explains this, but the relationship is still hard to understand. Put the distinction above the first chart, not at the end of the paragraph.

Change the heading `What has actually been measured` to `What public sources report as measured`. This avoids implying that every case is independently verified.

Featured cases should use a consistent five-line structure:

`Problem | Intervention | Result | Evidence status | Transfer question`.

The exact metric wording can remain available in an expanded evidence view.

### 7. Chapter 06: regional transfer

This chapter is strategically important because it turns global research into a Bangladesh conversation. Its opening distinction between headquarters, operating coverage, target market and verified deployment is excellent.

The Bangladesh figures from REHAB and the fair are useful signals, but their dates and populations are buried in prose. Place the date, source type and meaning next to the number. A reader should not mistake member count or event sales for total market size.

The MENA, Japan, China and global comparison paragraph compresses several different operating models into one sentence. Give each geography a small card with:

- observed pattern;
- transferable lesson;
- non-transferable condition;
- evidence state.

The regional cards should also show status at a glance. `Truzo` is pilot-stage and `Bproperty`, `PropERP`, `NirmanBazaar` and `E-Hishabi` are explicitly unresolved or thinly evidenced. This is good research discipline; make it a visible state instead of a late paragraph.

### 8. Chapter 07: venture-client and ecosystems

The venture-client idea is one of the most useful bridges from research to action, but the term is not self-explanatory. Define it in one sentence:

> A venture client is a real customer that pays for a bounded deployment to solve an actual operating problem, before deciding whether to invest.

The ecosystem rollup is honest but mostly passive. A bar showing program pair counts does not let the reader learn which companies are in each program. Add a program detail interaction with membership list, capture date and a clear `discovery only` state.

The 8 to 12 week pilot logic is highly useful for the meeting guide. On the public site, keep it as a generic framework. In the private guide, turn it into a JCX pilot canvas with owner, baseline, data access, stop gate and scale gate.

### 9. Chapter 08: failure and risk

The failure cases provide essential counterweight. The tone is occasionally theatrical: `The reckoning` and `six transitions, six controls` sound like a campaign rather than an intelligence product. Use a quieter title such as `Failure, restructuring and technology continuity`.

The timeline mixes project cancellation, bankruptcy, accounting write-down, restructuring, acquisition and successor-product continuity. Add an event type to each row so readers do not treat all outcomes as the same kind of failure.

The six controls are strong. Link each control to the relevant case packet and separate `documented event` from `atlas interpretation`. Keep PlanGrid's lineage visible even though it is not one of the six timeline rows.

### 10. Chapter 09 and `/standards`

The standards registry is valuable, but the public reader needs a reason to care. For every standard or framework, lead with the practical question:

- Can another system parse the data?
- Do two teams mean the same thing by floor area or handover date?
- Can a workflow survive an outage and a vendor change?
- Can a model be audited and corrected?

The acronyms in `Four tests for every integration claim` are useful to a technical reader, but `IFC/BCF/IDS/JSON/OpenAPI/OGC` in one line is too dense for a board or commercial audience. Keep the acronym in a detail view and lead with the plain-language test.

The `/standards` page should add search or domain filters and a `how this affects a developer/operator` column near the top. The current content has this field, but it appears below the descriptive copy. Do not let the registry become a catalogue of standards without a project decision link.

### 11. Chapter 10: JCX translation

The current Chapter 10 is intentionally public-safe and generic. That is the correct privacy boundary, but it creates a mismatch with the meeting goal. A visitor receives a framework for a developer in Bangladesh, not a clear understanding of JCX's public-site observations, ERP questions or suggested first pilot.

Keep the public chapter generic. Create a separate meeting-only document or protected route containing:

- current-site observations;
- confirmed facts versus hypotheses;
- ERP/CRM and source-of-truth questions;
- stakeholder and ownership map;
- the proposed first pilot hypothesis;
- baseline measures;
- next-step decision and follow-up owner.

Do not put public claims about JCX's internal systems, partners, forms or performance into the public Atlas until JCX confirms them.

### 12. Chapter 11 and `/methodology`

The methodology page is honest and needed, but it is too much first-visit material. `Source quality`, `claim attribution`, `status vocabulary`, `identity discipline`, `unknown is not zero`, `freshness`, `visibility layers`, `corrections` and a 1,600-source register form a long wall of policy.

**Fix:** split it into three reading levels:

1. `How to read this page`, five short rules.
2. `Evidence and identity details`, expandable sections.
3. `Full source register`, searchable table with title, publisher, date, grade and usage where available.

The correction section describes a process but gives no actual contact or form action. Add a clear correction CTA or state explicitly that corrections are accepted through a named JCX research channel.

## Cross-site writing audit

### P1. Repeated caveat formula

The most common sentence pattern is:

> X is not Y. A listing is not Z. Do not infer A from B.

This is logically correct, but repeated across hero, chapter intros, cards, footers, filters and profiles. It makes the prose feel like generated compliance text rather than authored intelligence.

Use the caveat once at the section level, then encode provenance in a compact badge. Prefer one precise positive statement followed by one limitation. For example:

> This case reports a 20 percent reduction in the named workflow during the stated period. The source is customer/vendor evidence, and the baseline is not independently audited.

### P1. Remove em dashes and reduce punctuation density

The current source contains many em dashes, interpuncts, arrows, semicolon chains and smart-quoted phrases. Examples occur in the hero, chapter titles, all metadata tables, methodology, evidence labels and footer. This matches the user's concern about AI-sounding prose.

House style for the finished site:

- no em dashes in visible prose;
- use a full stop or colon for a change of thought;
- use one separator style in metadata, preferably a bullet or a simple vertical bar;
- avoid stacking more than three items in a label;
- use straight quotes only where a source phrase is being quoted;
- reserve arrows for actual movement or an explicit process diagram.

Do not mechanically replace every dash with a comma. Rewrite the sentence so it sounds like a human analyst.

### P1. Too much abstract noun language

Phrases such as `operating system`, `durable layer`, `access layer`, `workflow frontier`, `evidence packet`, `operating archetype`, `transferability`, `governed record` and `accountable workflow` are useful concepts, but the site sometimes stacks several in the same sentence. The result is elegant but opaque.

Use a concrete noun or example after each abstraction. For example:

> A governed record means one approved project, unit, customer or asset record that a named owner can correct.

### P1. Labels that sound like rankings

`The strongest operators`, `launch profiles`, `Tier A`, `qualified core`, `frontier` and relative bars can imply a leaderboard. The research explicitly says it is not a ranking.

Use:

- `selected operators`;
- `narrative sample`;
- `decision relevance` instead of quality tier;
- `discovery layer` instead of frontier when a reader needs clarity;
- `records touching this lifecycle` for counts.

### P2. Code labels are overexposed

L1, L2, T1, T7, MRL, S1, C3, A1, B2 and B3 are necessary inside the research instrument, but not all need to appear before the plain-language meaning. Use the plain-language label first, with the code as a secondary chip.

### P2. English-only specialist language

The site assumes familiarity with `CDE`, `BMS`, `CPM`, `MRL`, `venture client`, `digital twin`, `semantic`, `interoperability`, `portfolio scale` and `realized value`. Add a visible glossary or inline definitions. The meeting version should include a one-page `say it simply` section.

## Information architecture recommendation

Keep the full research corpus, but organize the public experience around reader intent rather than file structure:

### A. Brief

The five-minute answer. Show the thesis, four findings, Bangladesh transfer, evidence gap and a link into the journey. This should be the default homepage view.

### B. Map

Lifecycle and technology layers. Let readers start from a business question such as land, sales, construction, operations, energy, customer service or trust. Codes remain available but secondary.

### C. Operators

Selected developer, owner/operator, service platform and venture-client patterns. Each profile should explain operating model, recurring workflow, evidence and transfer risk.

### D. Workflow frontier

Products and startups by workflow, not a generic technology category. Separate `discovery`, `qualified`, `pilot`, `production` and `measured outcome` clearly.

### E. Evidence

Cases first. Show the number, baseline, result, evidence state and transfer question. Include failure and restructuring alongside positive cases.

### F. Regions

Bangladesh first, then South Asia, MENA, Japan, Southeast Asia, Europe, Australia, North America, Latin America and Africa. Show where evidence is thin.

### G. Venture client

Programs, ecosystems and the paid-pilot logic. Keep membership separate from deployment.

### H. Durable trust

Standards, semantics, security, privacy, identity and AI governance. Translate each into a project question.

### I. Atlas

Complete qualified core and discovery search. This is the reference instrument, not the primary narrative.

### J. Method

Source, claim, identity, missingness, freshness and corrections. Full detail belongs here.

The existing chapter journey can remain as a cinematic route, but the navigation should expose these reader intents so a busy executive does not have to read eleven chapters in order.

## Content allocation: website versus meeting guide

### Public website content

- Global PropTech thesis and its limits.
- Lifecycle map and technology layers.
- Selected global operators, products, programs and historical cases.
- The 44 evidence packets with exact wording and caveats.
- Bangladesh, South Asia and MENA transfer principles.
- Standards and governance questions.
- The 978-identity discovery layer, visibly staged as discovery only.
- Public-safe generic opportunity sequence for a developer in Bangladesh.
- Methodology, source trail, review queue, limitations and correction policy.

### Meeting guide only

- Any statement about JCX's internal ERP, CRM, Odoo, partners, current vendors or implementation status until confirmed in the meeting.
- Current JCX website observations, including form-field mismatch, construction-status behavior, duplicated project data, mobile performance, analytics coverage and security-runtime questions.
- The Jolshiri lead-to-booking pilot hypothesis.
- Stakeholder names, decision rights, baseline requests, budget and procurement questions.
- Vendor shortlist or buy/build/partner recommendation for JCX.
- Any private site audit evidence or performance measurement.
- The exact meeting talk track and objection handling.

### Shared content, but different depth

The following can appear on both surfaces:

- one problem, one owner, one source of truth, one workflow, one measured result;
- the maturity ladder;
- the distinction between reported, estimated, potential, identified, avoided and realized value;
- venture client before venture capital;
- failure lessons from Zillow, WeWork, Katerra, View, Sidewalk Labs and Veev;
- the six-stage capability sequence.

The public site should state these as general principles. The meeting guide should translate them into JCX questions, owners, baselines and next actions.

## Recommended profile template

Every entity profile should follow this order:

1. **Name and type:** organization, product, program, project.
2. **One-line answer:** what it does in ordinary language.
3. **Why this record is here:** editorial rationale.
4. **Primary workflow:** the problem, user and output.
5. **Evidence:** one attributed claim or linked case, with source type and date.
6. **Transfer risk:** geography, integration, regulation, data or adoption condition.
7. **Status and identity:** current status, ownership, acquisition or successor state.
8. **Related records:** products, parents, programs, customers, cases and standards.
9. **Sources:** human-readable titles and dates first, raw URLs second.
10. **Review state:** unresolved facts, claim review and correction path.

The current template begins with identity and status fields, then classification, claims, maturity, cases, relationships, sources and review state. That order is appropriate for an internal data audit, not for a client trying to understand the strategic lesson.

## Motion and editorial pacing implications

This audit is not a visual design specification, but editorial pacing should guide the animation system. Reveal one conclusion at a time, then expose the evidence behind it. Use motion to show relationships, such as a problem becoming a workflow and a workflow becoming a measured result. Avoid animating every card or every caveat. If everything moves, nothing feels important.

The current `Reveal` component provides a safe baseline fade and rise, and reduced-motion support is correctly considered. The final experience needs a stronger hierarchy of motion:

- one arrival moment for the thesis;
- one transformation moment for the lifecycle map;
- one evidence expansion interaction;
- one regional transfer transition;
- one quiet trust close.

Motion should never hide content, alter evidence meaning or imply that a company has advanced further up the maturity ladder.

## Build acceptance checklist

Before showing the revised site to JCX, confirm:

- [ ] The homepage gives a five-minute summary before the full journey.
- [ ] Every profile explains what the record does in plain language.
- [ ] The primary navigation is usable by keyboard and mobile users.
- [ ] The journey rail contains real links, not only decoration.
- [ ] The missing `org-view-inc` reference is fixed or removed.
- [ ] Shared-domain and acquisition identity cases are visibly separated.
- [ ] `qualified`, `discovery`, `reported`, `measured`, `review pending` and `recommended` cannot be confused.
- [ ] The site has no visible em dashes in prose.
- [ ] Long caveat text is consolidated into provenance components.
- [ ] Statistics show population, date, source and scope next to the number.
- [ ] A non-specialist can understand L1 to L12, T1 to T7, S1 to S5 and C1 to C5 without leaving the page.
- [ ] Positive cases and failures are shown together without implying a universal ROI score.
- [ ] The public experience does not expose private JCX observations or unconfirmed internal facts.
- [ ] A separate meeting guide contains the JCX-specific observations, questions, pilot hypothesis and talk track.
- [ ] Build-time checks validate all featured IDs, source links and data joins.
- [ ] Reduced-motion, empty, loading, error, zero-result and 404 states remain fully understandable.

## Bottom line

The site does not need more companies added to become impressive. It needs a more decisive editorial layer on top of the already substantial corpus. Make the answer easy to grasp, make each record easy to understand, make evidence easy to inspect, and let methodology appear exactly when the reader wants to challenge a claim. That combination will feel sophisticated because the thinking is sophisticated, not because the page is crowded with caveats.
