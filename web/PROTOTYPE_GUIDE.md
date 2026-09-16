# Propty director-demo prototype

Route: `/prototype`. The existing research atlas remains at `/`.

## A five-minute demonstration

1. Open the prototype. Introduce it as a proposed buyer experience, not a live marketplace. The supplied Propty artwork, “Here and now” tagline and “Backed by JCX” attribution are retained.
2. Type **3 bedrooms in Bashundhara under 1.8 crore** into the central search bar and click **Search homes**. Two fictional homes match exactly. Alternatively, use the area, maximum price and bedroom controls. Search is a small deterministic parser, not a live language model.
3. Save Banyan and Lightwell using their hearts. Add both to Compare. Explain the actual sample trade-off: Lightwell costs BDT 25 lakh less; Banyan provides 300 more square feet, an extra bathroom and a sample parking inclusion. These are invented demonstration figures, not market evidence.
4. Open Banyan. Show the clear price, features, trade-off and disclosure of what has not been checked. The intended product differentiator is understandable information and a coherent next step, not an unsubstantiated “verified” badge.
5. Request a viewing for a future date. The request appears in **My visits**. Change its time to show the journey really works within the demo.
6. Open **Team demo** in the footer. The same request appears there, with a **Mark reviewed** action. This illustrates an operational handoff, not an actual staffed service or appointment confirmation.
7. Try **Help me choose**: Bashundhara → BDT 1.8 crore → 3+ bedrooms. The guided preview returns the same two sample homes. **Explore these matches** applies the brief to the browsing view and shares it with the in-session team demo.

If asked whether it is real AI: “This is an interactive, rule-based preview of the intended AI journey. We intentionally have not connected an AI API. We are seeking approval for the experience and the development scope.”

## Working controls

- Text search for known areas, home names, budget, bedrooms, readiness and matching feature keywords. Unsupported requests can return no matches, rather than invented results.
- Original Propty/Powered by JCX and separate JCX artwork extracted from the final presentation. No private slide content is published.
- Location, maximum asking price, minimum bedrooms, ready-only filter and sorting.
- Six property-detail views with shareable `?home=` URLs.
- Full-size illustrative photo viewing and sample price per square foot.
- Saved homes retained on the current device.
- Up to three homes in an in-session comparison.
- A three-step guided assistant, including an honest no-match state.
- Local viewing requests, rescheduling, cancellation and team review.
- Refreshable Saved, My visits and Team demo views.
- Larger text (`Aa`), visible keyboard focus, native modal focus management, reduced-motion support.
- Reset demo clears this prototype's saved homes and requests, not the research atlas.

## Deliberate boundaries

- All six homes, prices, specifications and statuses are fictional. Licensed interior photos are illustrative, not actual JCX or Dhaka listings. Provenance is in `public/propty/ASSET_SOURCES.md`.
- No live AI, external agents, emails, calls, accounts, payments, maps, legal verification or backend database.
- Viewing times are preferences, not available appointment slots. No third party receives requests.
- Saved homes, visits and the text preference are stored locally. Comparisons, filters and the latest buyer brief are session state. This is not cross-device synchronization or an authenticated team console.
- `noindex` metadata discourages search indexing; it is not access protection. No private decks or client research files are included in the prototype.
- This demo does not approve a business model, establish demand or prove unit economics. Those decisions still need validation and an agreed development budget.

## Connecting Gemini later

The current application is a static export. A Gemini key must not be placed in browser code or a public environment variable. Add a server-side endpoint or a separate backend first, with request limits, validation and failure handling. Restrict recommendations to known inventory IDs and validate price and availability against the inventory, not generated text. Keep the current deterministic search as a fallback. No API integration is included in this version.

## Verification checks

Production build and TypeScript pass. Research content, privacy, navigation, executive and company-summary checks remain in place. Fixture tests cover all six identities, local-currency formatting, strict filter matches and empty results.

Browser checks performed at desktop and mobile widths: browsing, filtering, saving, two-home comparison, property details, viewing requests, rescheduling, team review, cancellation, refresh persistence, assistant matches and assistant no-match state. No console errors were observed in the tested flow.

Run `npm run build`, `npm run verify:prototype`, `npm run verify:navigation`, `npm run verify:output`, `npm run verify:executive` and `npm run verify:companies` before future releases. Serve the static export with `npm run serve:static`.
