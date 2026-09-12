# Website implementation handoff

Status: implementation-ready public package integrated into the local site. Edition review 12 September 2026; corpus cut-off 30 August 2026.

This file is the contract between the research package and the website. It is deliberately narrower than the private research register. The site may use the public-safe files in this folder and the source URLs listed in `06_sources_and_definitions.md`; it must not ship private client forecasts, internal budgets, private risk notes, or unapproved strategy.

## Route contract

| Route | Job | Content source | Required depth |
|---|---|---|---|
| `/` | Orient the visitor and make the first distinction | `01_journey.md`, scenes 1, 2, 5, 7, 8, 9 | Short copy, one mechanism visual, evidence drawers |
| `/story` | Walk the argument from business model to Bangladesh and JCX | `01_journey.md` plus `02_company_cases.md`, `03_country_transfer.md` and the flagship chapter | Full narrative, one end-to-end four-case chapter, no directory wall |
| `/brief` | Give a five-minute decision briefing | This file's brief contract plus `04_bangladesh.md` and `05_jcx_internal.md` | Four findings, clear boundary, links to deeper evidence |
| `/evidence` | Let a visitor inspect measured cases and current reviewed sources | `02_company_cases.md`, `06_sources_and_definitions.md`, reviewed metrics export | Searchable records, source links, dated archive boundary |
| `/methodology` | Explain how claims were checked and labelled | `06_sources_and_definitions.md`, research `00_method/` | Definitions, labels, limitations |
| `/comparison` | Compare the six priority lenses one mechanism at a time | `07_comparative_mechanisms.md`, `public_comparative_chapter.json`, resolved gap sources | Lens tabs, operating sequence, case workbench, source trails and transfer tests |

The overview, story and brief must not be clones of one another. The overview answers "what is this?" The story answers "how did we get here?" The brief answers "what changes for the decision?"

## Content-to-source bindings

Use source IDs as stable bindings. The current public register runs from `S01` through `S33`.

| Content area | Primary sources | Metric or definition bindings |
|---|---|---|
| Portal versus brokerage versus iBuyer | `S01`, `S04`, `S08`, `S09` | `M01`, `M02`, `M03`, `M05`, `M06`, `M07`, `M08` |
| Durable operating examples | `S01`, `S02`, `S03`, `S09`, `S10`, `S25`, `S28`, `S33` | ARPA, revenue, profit, GTV, contracts, payer and workflow |
| Failures and capital burden | `S04`, `S06`, `S07`, `S08`, `S11` | inventory, cash use, net loss, cessation date |
| Country transfer | `S12`, `S13`, `S14`, `S15`, `S25`, `S26`, `S27`, `S28`, `S29`, `S30`, `S31`, `S32` | `M09`, `M10`, `M11`, `M12`, `M13`, `M14` |
| Bangladesh discovery and competition | `S16`, `S17`, `S18`, `S19`, `S20`, `S21` | listing versus closing, company-reported counts |
| Developer technology and adoption | `S22`, `S23`, `S24` | `M12`, `M13`, `M14` |
| JCX venture and internal decision | interpretation of the above, no private forecast | label as `Interpretation` or `Open question` |

## Flagship chapter data contract

The current reviewed story chapter is `research_v2/02_evidence_library/flagship_chapter_public.json`. It has stable IDs for four cases (`FCASE-RIGHTMOVE`, `FCASE-99ACRES`, `FCASE-PINHOME`, `FCASE-PROPZY`), claims (`FC-*`), chapter sources (`F01`-`F11`) and transfer conditions (`TRANSFER-*`). The build script resolves each selected `metric_id` from `research_v2/02_evidence_library/metrics_reviewed.jsonl` and emits `flagship-chapter.json` to the build bundle and `public/data/`.

The flagship chapter is current reviewed work as of 9 September 2026, while this integrated public edition was reviewed on 12 September 2026. The evidence explorer's older records remain a dated archive. Do not merge the two review states or present the chapter's four anchors as a complete company directory.

Every visible number must have a source ID in the drawer or adjacent text. If a metric is not in the reviewed export, add it to the research first. Do not invent a chart value for visual balance.

## Reviewed metrics export

The structured evidence file is `research_v2/02_evidence_library/metrics_reviewed.jsonl` with a companion CSV. Each row carries:

`metric_id`, `entity_id`, `initiative_id`, `model`, `geography`, `period`, `value`, `unit`, `currency`, `denominator`, `scope`, `source_id`, `source_url`, `locator`, `review_state`, `evidence_label`, `note`.

The denominator and scope are mandatory for rates, counts and survey results. Keep GTV, revenue, gross commission, operating profit, net income and cash use as separate fields. The CapitaLand rows intentionally use separate initiative IDs: `innovation_fund` for 63 pilots and `sustainability_x_challenge` for 20 projects and 3 completed pilots. Do not calculate a 63-to-20-to-3 conversion.

## Factual guardrails

- Propzy: say Vietnam operations ceased on 12 September 2022. The cited report supports financial hardship, pandemic lockdown losses and funding difficulty as context; it does not isolate collections as the cause.
- KE Holdings: `S09` is an SEC results exhibit with unaudited condensed information. Use `S33` for audited 20-F ACN and annual-report context.
- Emaar: 38% refers to customer-centre service requests in 2022 versus 2021. It is not app-only usage, conversion or ROI.
- JLL: 5% refers to CRE occupier teams in a 1,500+ combined investor and occupier decision-maker survey across 16 markets. The exact occupier-team subgroup denominator is not disclosed. It is not a Bangladesh residential-developer statistic, and 5% must not be multiplied by 1,500.
- Rightmove: show FY2024 period beside revenue and operating profit. ARPA is monthly average revenue per advertiser, with the payer denominator preserved.
- Bangladesh: the IMF source describes an experimental RPPI development process. Bangladesh Bank housing-loan stock is provisional and access-qualified. Do not call either a bank-grade price feed or evidence that a bank will buy a product.
- Local portal counts are listing, user or company claims unless explicitly labelled otherwise. Never call them audited closings.
- Parent inventory is a possible starting advantage and a neutrality risk. Do not present a national marketplace as proven.

## Brief content contract

The `/brief` route should contain these four findings in order:

1. **Payer first:** a portal sells professional attention, a brokerage sells completion work, and an iBuyer carries homes and financing risk.
2. **Evidence, not logos:** Rightmove and REA show recurring portal economics; 99acres shows scale without the same profit; Propzy is a regional counterexample.
3. **Bangladesh is a transfer test:** digital land services exist, but a public closing-price series and repeatable fee collection remain open.
4. **Two tracks at JCX:** a venture can test several shapes, while internal adoption starts with a shared record, used workflow, visible collections and bounded AI.

The closing boundary must say that the venture remains a conditional experiment until collected commissions, a mandate/collection test and a named buyer or paid pilot exist. It must not imply that a brokerage-first option is the only recommendation.

## Evidence route requirements

The evidence route must expose the current reviewed case set before or alongside the dated archive. A visitor searching for `Rightmove`, `99acres`, `NoBroker`, `Pinhome`, `Propzy`, `Opendoor`, `Emaar` or `CapitaLand` must find a current reviewed record or an explicit link to its source. The older case library may remain, but its date and archive status must be visible.

## Accessibility and interaction requirements

- Tabs use `role="tablist"`, `role="tab"` and `role="tabpanel"`, with Arrow Left/Right, Arrow Up/Down, Home and End navigation.
- Same-page navigation closes the mobile menu after activation.
- Evidence drawers use native `details` where possible and keep keyboard focus visible.
- Reduced-motion users receive complete content with transitions disabled or minimized.
- Charts and diagrams include text equivalents. Bars or widths must not imply an unreviewed quantitative comparison.
- No source link opens private files or exposes the research archive to client-side assets.
- The flagship data contract rejects duplicate IDs, unresolved source or metric references, non-canonical evidence labels and private-marker export. The comparative contract also rejects duplicate lenses/cases/sources, missing source references, malformed HTTPS URLs, non-canonical evidence labels and private/local markers. Negative tests cover both contracts.

## Verification before presentation

Run from `web/`:

```bash
npm run build:data
npm run verify
npm run typecheck
npm run build
```

Then test `/`, `/story`, `/brief`, `/comparison`, `/evidence` and `/methodology` in a real browser at desktop and mobile widths. Check source drawers, search, filters, keyboard tabs, same-page links, reduced motion and the current reviewed case set. The completed production-browser record is [research_v2/14_presenter_package/BROWSER_VERIFICATION.md](../research_v2/14_presenter_package/BROWSER_VERIFICATION.md). Do not deploy from this handoff.

For this bounded chapter, also test `/story#jcx-flagship`, direct anchor loading, the four-case keyboard tabs, metric labels and the “current reviewed chapter” versus “dated archive” boundary. Record the browser run in `research_v2/12_comparative_completion/flagship_test_log.md`.

## Known blockers that must remain visible

The public package is ready for a qualified presentation, but these claims remain unresolved: a live repeatable JCX venture with collected commission; Propman/Sentinel production status; mandate or escrow enforceability; a named bank buyer; JCX ERP/CRM adoption; and rival-developer willingness to list under a parent-backed brand. Resolve them with operating records, legal review or paid tests before converting the conditional language into a claim.

## Integrated comparative chapter handoff

The four-case flagship remains the current anchor chapter. The integrated comparison is a separate public-safe layer at `/comparison#jcx-comparative` and is appended after the flagship on `/story`. It is driven by `public_comparative_chapter.json` and emitted as `comparative-gap.json`.

The chapter has six lenses and a stable case schema: `customer`, `payer`, `workflow`, `human_burden`, `journey`, `monetization`, `result`, `capital`, `failure_or_limit`, `unknown`, `transfer_test`, and `source_ids`. The source bridge resolves every selected ID to an original HTTPS publisher URL from `research_v2/13_gap_completion/sources_gap.jsonl`; local pointer paths are never emitted.

The public route is deliberately selective. It renders one mechanism at a time and does not make the selected mechanisms or external source trails a completeness claim. The coverage register and the private presenter package remain the audit and meeting layers respectively.
