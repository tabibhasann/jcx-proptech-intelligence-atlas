# Propty director-demo prototype

Route: `/prototype`. The existing research atlas remains at `/`.

## A five-minute demonstration

1. Open the prototype. Introduce it as a proposed buyer experience, not a live marketplace. The supplied Propty artwork, “Here and now” tagline and “Powered by JCX” attribution are retained.
2. Type **3 bedrooms in Bashundhara under 1.8 crore** into the central search bar and click **Search homes**. Two fictional homes match. Add **with parking** to get Banyan only. Gemini interprets the words, but the inventory and matching code determine the results. Alternatively, use the filters without an API call. Bangla search is also supported, but all results remain English.
3. Save Banyan and Lightwell using their hearts. Add both to Compare. Explain the actual sample trade-off: Lightwell costs BDT 25 lakh less; Banyan provides 300 more square feet, an extra bathroom and a sample parking inclusion. These are invented demonstration figures, not market evidence.
4. Open Banyan. Show the clear price, features, trade-off and disclosure of what has not been checked. The intended product differentiator is understandable information and a coherent next step, not an unsubstantiated “verified” badge.
5. Request a viewing for a future date. The request appears in **My visits**. Change its time to show the journey really works within the demo.
6. Open **Team demo** in the footer. The same request appears there, with a **Mark reviewed** action. This illustrates an operational handoff, not an actual staffed service or appointment confirmation.
7. Try **Help me choose**: Bashundhara → BDT 1.8 crore → 3+ bedrooms. The guided preview returns the same two sample homes. **Explore these matches** applies the brief to the browsing view and shares it with the in-session team demo.

If asked whether it is real AI: “The text search now uses Gemini to interpret what you need. It cannot invent homes or prices: those come from our 49 sample listings. The separate Help me choose questionnaire is still rule-based. We are seeking approval for the experience and development scope, not claiming a live marketplace.”

## Working controls

- Text search for known areas, home names, budget, bedrooms, readiness and matching feature keywords. Unsupported requests can return no matches, rather than invented results.
- Original Propty/Powered by JCX and separate JCX artwork extracted from the final presentation. No private slide content is published.
- Location, maximum asking price, minimum bedrooms, ready-only filter and sorting.
- 49 property-detail views with shareable `?home=` URLs. The collection shows nine at a time; Show more homes reveals another nine without changing the search.
- Restored photo-and-shortlist section opens the guided questionnaire. It has no decorative icon.
- Gently inset hero and background parallax on scroll; reduced-motion settings disable these effects.
- Full-size illustrative photo viewing and sample price per square foot.
- Saved homes retained on the current device.
- Up to three homes in an in-session comparison, with calculated price/space ranges and a Differences only switch.
- A three-step guided assistant, including an honest no-match state.
- Local viewing requests, rescheduling, cancellation and team review.
- Refreshable Saved, My visits and Team demo views.
- Larger text (`Aa`), visible keyboard focus, native modal focus management, reduced-motion support.
- Reset demo clears this prototype's saved homes and requests, not the research atlas.

## Deliberate boundaries

- All 49 homes, prices, specifications and statuses are fictional. The original six licensed interior photos are reused across this collection, not actual JCX or Dhaka listings. Provenance is in `public/propty/ASSET_SOURCES.md`. Repeated photo disclaimers were removed from hero and cards; the footer and viewing action retain the demo explanation.
- No external agents, emails, calls, accounts, payments, maps, legal verification or backend database. The text search alone calls Gemini through a server-side endpoint. Search text is sent to Google; no saved homes, visits or private client documents are sent.
- Viewing times are preferences, not available appointment slots. No third party receives requests.
- Saved homes, visits and the text preference are stored locally. Comparisons, filters and the latest buyer brief are session state. This is not cross-device synchronization or an authenticated team console.
- `noindex` metadata discourages search indexing; it is not access protection. No private decks or client research files are included in the prototype.
- This demo does not approve a business model, establish demand or prove unit economics. Those decisions still need validation and an agreed development budget.

## Gemini configuration and limits

The project now uses the standard Next.js runtime. The research and prototype pages remain prerendered; `/api/propty/search` is a server function. Static serving does not support AI search.

`GEMINI_API_KEY` is a server-only Vercel production secret. The model defaults to `gemini-3.1-flash-lite`; override with server-only `GEMINI_MODEL`. Local development can load the ignored `.env.gemini.local` with `set -a; source .env.gemini.local; set +a` before running the server. Never commit that file or put the key in a `NEXT_PUBLIC_` variable.

Gemini returns structured search constraints, not listings. Output is validated against allowed areas and feature keywords. Unsupported requirements produce an explicit explanation rather than claimed matches. This is not a guarantee of perfect natural-language interpretation. Check the displayed filters. The API has a 12-second provider timeout; the client falls back to labelled standard search on failure.

Demo safeguards: same-origin requests, 180-character search limit, 2 KB body limit, up to 8 calls per IP/minute, 3 simultaneous calls and 150 calls/hour **per running server instance**. These are best-effort abuse limits, not durable cross-instance quotas or authentication. Before a broad public launch, add shared rate limiting, monitoring and provider-side usage limits. Rotate the credential shared in chat. No real customer data should be entered into the demo.

Provider reference: [Gemini structured outputs](https://ai.google.dev/gemini-api/docs/structured-output).

## Verification checks

Production build and TypeScript pass. Research content, privacy, navigation, executive and company-summary checks remain in place. Fixture tests cover 49 unique identities, preservation of the six original IDs, every area's exact local-search results and AI-validator acceptance, local-currency formatting, strict filter matches and empty results. Bangla interpretation depends on Gemini; the deterministic fallback is primarily English and does not guarantee full Bangla matching.

Browser checks performed at desktop and mobile widths: browsing, filtering, saving, two-home comparison, property details, viewing requests, rescheduling, team review, cancellation, refresh persistence, assistant matches and assistant no-match state. No console errors were observed in the tested flow.

Run `npm run build`, `npm run verify:prototype`, `npm run verify:navigation`, `npm run verify:output`, `npm run verify:executive` and `npm run verify:companies` before future releases. Use `npm run dev` for development or `npm start` after building. The legacy `serve:static` command only serves an older export and does not represent the current application.

Next visual additions worth prioritizing: a coherent 4–6-photo set for each property; an accurate, labelled floor plan; and a real neighbourhood location when actual inventory is approved. Do not mix unrelated interiors as if they show the same home.
