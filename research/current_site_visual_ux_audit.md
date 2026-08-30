# JCX PropTech Atlas: visual and UX audit

Audit date: 30 August 2026  
Audited surface: `web/` static export at `http://localhost:4173`  
Scope: source structure, route coverage, responsive rendering, interaction model, motion, narrative pacing, accessibility signals, content presentation, and performance risks. This is a read-only audit. No site source was changed.

## Executive read

The current build is a careful research reader with a coherent architectural-print visual language. It is not yet a one-of-a-kind, Awwwards-caliber presentation. Its strongest qualities are the disciplined evidence language, the restrained palette, the chapter taxonomy, and the fact that the content is genuinely data-backed. Its largest weakness is that the experience is mostly a long sequence of text, bordered boxes, tables and repeated cards. It feels like an unusually polished report interface, not a living journey through a global intelligence system.

The redesign should preserve the trust grammar and research boundaries, then add a stronger art direction, a more intentional narrative arc, visual proof of the system being described, and a better separation between “show me the insight” and “let me inspect the corpus.” The most urgent functional defect is mobile horizontal overflow on `/evidence` caused by long source URLs and a grid item that is allowed to grow to min-content width.

## What was verified

All primary routes returned successfully from the local static server:

| Route | HTTP | Approx. document height at 1440 px | Main concern |
| --- | ---: | ---: | --- |
| `/` | 200 | 33,844 px | Very long, repetitive scroll; weak scene transitions |
| `/atlas` | 200 | 18,575 px | 295 cards rendered at once; filter-heavy catalogue |
| `/frontier` | 200 | 6,454 px | Strongest index page, but still text-card led |
| `/evidence` | 200 | 22,331 px | 44 large case packets; mobile overflow |
| `/standards` | 200 | 8,467 px | 39 cards with little visual explanation of relationships |
| `/methodology` | 200 | 6,438 px | Trustworthy but document-like and dense |
| `/atlas/[id]` | 200 | 2,378 px | Useful profile template, but no visual identity or graph |
| `/atlas/nope` | 404 | 975 px | Intentional copy; static server correctly returns 404 |

At 390 px mobile width, `/evidence` had `scrollWidth = 694` against a viewport width of 390. The overflowing case was a long URL in the source link and the corresponding grid content inherited the child’s min-content width. The home page’s table is intentionally inside an overflow wrapper, so it did not create page-level overflow. The other primary routes stayed within the viewport in the probe.

The local build passed TypeScript checking, and the page-level probe found no console errors on successful routes. The existing Lighthouse artifact for the live `jcxbd.com` WordPress site is a separate baseline: it recorded a missing Montserrat font request, LCP around 1.9 s and Speed Index around 2.1 s. That live-site issue should not be confused with the local Atlas bundle, but it is still relevant if this work will eventually replace the public corporate site.

## P0: fix before showing the site

### 1. Remove mobile horizontal overflow from the evidence library

`EvidenceExplorer.tsx` prints complete URLs as an inline link. The case grid also has a child whose automatic minimum width expands around a long URL. Add a deliberate URL treatment: show a short label such as “Open source record,” expose the full URL on hover or in a disclosure, and apply `min-w-0` to grid children plus `overflow-wrap:anywhere` or `word-break:break-word` where the full URL must remain visible. Verify at 320, 360 and 390 px widths.

This is more than cosmetic. Horizontal overflow makes the page feel broken, can hide the evidence source, and undermines the credibility of the research product on the exact device where a meeting participant may open it.

### 2. Replace the generic “everything is a page” reading model

The home route is approximately 33.8k px tall on desktop and 60.9k px on mobile. Eleven chapters are valuable, but the current pacing asks a visitor to scroll through dozens of similar text blocks, tables and cards. This produces fatigue before the core conclusion is reached. Keep the full corpus available, but make the landing journey a curated sequence of key scenes. Move exhaustive tables and long registers behind “inspect” states, dedicated routes, or intentional chapter subviews.

The first screen should establish three things immediately: what JCX researched, the single most important finding, and how to enter either the narrative or the evidence. The current mobile hero pushes the call to action below the first viewport.

### 3. Replace fake/placeholder metadata before deployment

`layout.tsx` uses `metadataBase: https://atlas.jcx.example`. This is a reserved-looking example domain and will create incorrect canonical/OG URL behavior if deployed. It should be replaced with the real public domain or omitted until a real domain is available. Add a real social preview image, canonical policy, robots policy and a shareable title/description for each major route.

### 4. Eliminate visible AI-style punctuation and wording where the brief requires it

The authored interface visibly uses em dashes throughout headings, labels, body copy, caveats, metadata and list bullets. The user explicitly asked for writing that does not signal AI generation. Replace em-dash-heavy constructions with shorter sentences, commas, colons or paragraph breaks. Also review repeated phrases such as “not a…” and “unknown is…” so the trust boundary stays clear without becoming a refrain. The content is thoughtful, but the repeated disclaimer cadence currently makes it feel generated and defensive.

## P1: make the experience feel exceptional

### 1. Give every chapter a distinct visual thesis

The current design system is almost entirely one paper color, one dark section color, an orange accent, thin rules, grid texture and rectangular cards. It is consistent, but consistency has become monotony. A stronger art direction would assign each chapter one memorable visual device connected to its argument:

- a living lifecycle ribbon for the L1–L12 map;
- a portfolio-to-workflow network for operators;
- an animated metric comparison with explicit denominator and evidence grade for outcomes;
- a geographic transfer field that shows why Bangladesh is not a copy-paste destination;
- a standards “stack” that shows how identifiers, semantics, protocols and governance depend on one another;
- a gated roadmap where each capability unlocks only when its prerequisite data exists.

These should be real, low-dependency visualizations driven by the existing JSON, not decorative animation. A visitor should understand the argument even if they skim the prose.

### 2. Make motion carry meaning

Current motion is primarily `opacity + translateY` reveal and a scroll-progress rail. This is a sensible enhancement layer, but it is not a signature interaction. Use motion to explain relationships: entities should enter from their lifecycle position, lines should draw between evidence and outcomes, a metric should reveal its unit and caveat before the large number, and transitions should show how one chapter leads to the next. Keep all motion interruptible and honor reduced motion. Avoid scroll hijacking and do not make the reader wait for text.

### 3. Turn the section rail into navigation, not decoration

`SectionRail` has `pointer-events-none`, and its lifecycle marks are not interactive. It is a visual instrument only. For desktop, make the rail a keyboard-accessible chapter control with a visible active chapter name and a compact progress state. On mobile, the top rule should be paired with a menu or chapter drawer. Add `aria-current` to the active primary nav item and make the current location obvious.

### 4. Make evidence scan-first, inspect-second

The `/evidence` page places all 44 full packets in a continuous list. A better first view is a visual matrix or compact list showing workflow, geography, metric type, grade and transferability. Clicking a case opens the complete packet in a drawer, anchored detail view or dedicated case route. Preserve exact wording, source, denominator and caveat, but do not force every visitor to read every field in every card.

The same principle applies to `/methodology`: show the evidence model as a simple visual ladder, then let visitors open definitions and the source register. `/standards` needs a relationship view showing standards by job, layer and handoff rather than only 39 independent cards.

### 5. Add a visual identity to entity profiles

`/atlas/[id]` is structurally sound but looks like a form. Every profile should have a compact “why this matters” header, lifecycle position, evidence grade, relevant case count, relationship signal and a small visual fingerprint. A simple SVG mark or data constellation is enough if it is generated consistently. Profiles should answer, above the fold: what it is, where it acts, what evidence exists, why JCX should care, and what remains unknown.

### 6. Reduce catalogue load and improve filtering

`/atlas` exposes 295 cards and 324 focusable elements on first load. It is usable, but not a pleasant browsing experience. Add a result summary with active filter chips, a clear-all control, a lightweight pagination or virtualized window, and URL persistence for all filters, not only lifecycle. On `/frontier`, persist stage, source layer, ecosystem and review state as well. This makes findings shareable during the meeting.

### 7. Replace native select density with an intentional filter surface

The native controls are accessible and dependable, but the filter bars become a row of tiny labels and dropdowns. Keep native semantics where possible, but group filters into primary and advanced levels. Show the most decision-relevant filters first, collapse the rest, and make the result count and current state visually dominant.

## P2: polish, access and resilience

### Accessibility and interaction

- Add `aria-current="page"` to the active header link.
- Ensure the mobile `<details>` menu has a robust focus path, visible open state and predictable close behavior after navigation.
- Make the desktop chapter rail keyboard reachable if it becomes interactive.
- Add an explicit focus return path for evidence disclosures if they become drawers or dialogs.
- Test long names, long URLs and zoom at 200 percent. The current `line-clamp-3` on discovery cards hides source-native descriptions without an obvious “read more” affordance.
- Ensure every chart or visual diagram has a concise text alternative and a longer accessible explanation where the relationship is important.
- Test `prefers-reduced-motion`, forced colors, keyboard-only navigation and screen-reader heading order.

### Content and editorial

- The frontier cards contain source-native descriptions that sometimes repeat the company name, for example “CarbonCure CarbonCure…”. Normalize or editorially trim this presentation while preserving the original signal in the detail view.
- Replace bare full URLs in visible copy with source labels. Full URLs are useful in the register, not as the primary reading surface.
- Avoid using “AI”, “digital twin” or “operating system” as a headline without the workflow and buyer immediately nearby. The research itself makes this point, and the interface should model it.
- Add a one-minute executive route: “What we found,” “Why it matters for a developer,” “What to ask next.” The current app assumes a reader will complete the entire research journey.
- Add a printable meeting brief or a stable share/export view for selected cases and entities.

### Performance and technical resilience

- The home route puts a large amount of authored content and many interactive evidence markers into one document. Split non-critical chapters or defer low-priority sections after the first narrative scenes.
- Avoid rendering every atlas card as an eagerly focusable DOM element if the visitor only sees the first 6–12 cards.
- Keep the grid texture subtle and test low-power/mobile devices. The texture is cheap, but the cumulative cost of a very long page plus observers, scroll tracking and many nodes is not zero.
- Add route-level error and loading states that preserve the visual language.
- Add a build-time check for horizontal overflow at common mobile widths and for fake metadata domains.

## Route-by-route judgement

### `/` The Journey

Best conceptual work, weakest pacing. The opening tower illustration is elegant but abstract, and the remainder of the journey becomes a report stream. The visitor needs more contrast between thesis, proof, counterexample and decision. Chapters 08 and 11 are dark/trust-oriented in concept, but the broader route does not give each transition enough visual consequence.

### `/atlas`

Good search utility and clear evidence labels. It currently communicates “database” much more strongly than “intelligence.” Add a featured comparison or visual map above the catalogue and make filters shareable. The card design should reveal one useful insight per record, not only metadata chips.

### `/frontier`

The strongest browse surface. Its staged identity language is honest and its discovery-only distinction is easy to understand. It still needs better card hierarchy, normalized descriptions, a clear way to inspect why a candidate was not promoted, and a visual map of the ecosystem layers.

### `/evidence`

High-value research with the least comfortable reading experience. The exact metric and caveat treatment is excellent for diligence, but the page needs a summary layer, better grouping, and the mobile overflow fix. Full URLs should not dominate the visual rhythm.

### `/standards`

Trustworthy registry, but a visitor unfamiliar with built-environment data standards will see a wall of names. Add “why this matters” relationships and a plain-language pathway from project record to handover, energy, security and AI governance.

### `/methodology`

Credible and unusually transparent. It is also the most obviously document-like route. Keep it as the audit trail, but provide a visual explainer before the tables and a clear link back to the central findings.

### `/atlas/[id]`

Good information architecture and useful caveats. It needs a stronger identity header, relationship visualization, and an explicit “what to say in the meeting” summary that is separated from source-native claims.

## Acceptance bar for the next build

The next version should pass these qualitative tests:

1. A first-time visitor can explain the central finding after 60 seconds without reading every chapter.
2. A meeting participant can open one company, one outcome case and one standard in under 30 seconds.
3. Every visible outcome keeps its source type, units, period, denominator and caveat close to the number.
4. A visitor can tell fact, reported claim, interpretation and unknown without reading the methodology first.
5. The site has at least three memorable data-driven visual moments that could not be replaced by a static table.
6. The home journey remains compelling at 390 px, 768 px and 1440 px without horizontal overflow.
7. No visible copy relies on repetitive em-dash constructions or generic filler.
8. Reduced-motion, keyboard and 200 percent zoom states remain complete and calm.
9. The page feels like a point of view about the future of development, not merely a database export.

