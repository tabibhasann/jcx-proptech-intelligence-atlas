# JCX PropTech discovery universe

**Snapshot date:** 30 August 2026  
**Machine-readable source:** `data/discovery_universe.csv/json`  
**Purpose:** one broad, searchable frontier for “which companies and built-environment technology actors are worth investigating?” without confusing discovery with proof.

## Executive result

The joined universe contains **978 conservatively resolved identities**:

- **295 evidence-qualified core entities** with typed records, claims, assertions and source lineage;
- **128 complete YC Real Estate & Construction profiles**, of which 35 overlap the qualified core;
- **683 official ecosystem source rows**, resolving to 653 ecosystem-linked identities and 683 identity–ecosystem memberships;
- **683 discovery-only identities** that have not been promoted to the qualified core.

The 978 count is a search-layer identity count, not “978 proven PropTech companies.” It includes 274 qualified organizations, eight product offerings, 12 programs/ecosystems, one historical project and discovery-only candidates. Every result retains its evidence stage and source-layer membership.

## Source-layer overlap

| Source-layer combination | Identities |
|---|---:|
| Ecosystem index only | 590 |
| Qualified core only | 202 |
| YC snapshot only | 89 |
| Qualified core + ecosystem | 58 |
| Qualified core + YC | 34 |
| YC + ecosystem | 4 |
| Qualified core + YC + ecosystem | 1 |
| **Total** | **978** |

Cross-layer intersections, including the all-three record, are: qualified core ∩ YC **35**; qualified core ∩ ecosystem **59**; YC ∩ ecosystem **5**. **Snapdocs** is the only identity represented in all three source layers in this snapshot.

This overlap is analytically useful. A startup appearing in two accelerators is a stronger discovery signal than one logo, but it is still not an outcome. A qualified-core record adds evidence structure, not an endorsement.

## Ecosystem overlap signals

Twenty-eight identities appear in multiple indexed ecosystems. BrokerBot and Measurabl each appear in three; the remaining 26 appear in two:

| Identity | Ecosystems |
|---|---|
| BrokerBot | Moderne Ventures / Passport; NAR REACH Latin America; NAR REACH US Residential |
| Measurabl | Moderne Ventures / Passport; RET Ventures Portfolio; Taronga RealTechX / Asset Impact |
| AIRE | NAR REACH Latin America; NAR REACH US Residential |
| ALICE Technologies | Brick & Mortar Ventures; JLL Spark |
| AssociationOnline | NAR REACH Latin America; NAR REACH US Residential |
| CarbonCure | 2150; Taronga RealTechX / Asset Impact |
| Cocoon | 2150; Brick & Mortar Ventures |
| Curbio | Brick & Mortar Ventures; NAR REACH / Second Century Ventures |
| Dealpath | JLL Spark; MetaProp |
| DocuSign | Moderne Ventures / Passport; NAR REACH / Second Century Ventures |
| Freeda | Brick & Mortar Ventures; CEMEX Ventures Top 50 ConTech 2026 |
| Higharc | Fifth Wall; MetaProp |
| Hippo | Fifth Wall; Moderne Ventures / Passport |
| HqO | JLL Spark; MetaProp |
| Hubble | JLL Spark; Taronga RealTechX / Asset Impact |
| Jones | JLL Spark; MetaProp |
| Juno | MetaProp; RET Ventures Portfolio |
| LotRoll | NAR REACH Latin America; NAR REACH US Residential |
| MaxHome | NAR REACH Latin America; NAR REACH US Residential |
| Obie Insurance | Brick & Mortar Ventures; MetaProp |
| Occupier | MetaProp; NAR REACH / Second Century Ventures |
| OpenSpace | JLL Spark; Taronga RealTechX / Asset Impact |
| SmartRent | Fifth Wall; RET Ventures Portfolio |
| StackWrap | NAR REACH Latin America; NAR REACH US Residential |
| Travtus | MetaProp; RET Ventures Portfolio |
| VergeSense | JLL Spark; MetaProp |
| WiredScore | Fifth Wall; Taronga RealTechX / Asset Impact |
| Ynomia | Brick & Mortar Ventures; Taronga RealTechX / Asset Impact |

Pi Labs lists **Howie AI** and **Trubrics** as distinct portfolio cards but gives both the Trubrics domain. Their descriptions, locations, founding years, founders and funding stages conflict, so the universe deliberately keeps them as separate identities and flags both for relationship review. The same safeguard separates historical Betterview from Nearmap and Honest Buildings from Procore even though the portfolio links now use the acquirer’s domain. Consequently, all 683 source-row identities and all 683 identity–ecosystem memberships are preserved.

## Identity-resolution method

Resolution is deterministic and deliberately conservative:

1. Keep every qualified-core `entity_id` immutable.
2. Join YC profiles by exact normalized name only when unique.
3. Join ecosystem rows by an unambiguous exact normalized name; use the company domain only to corroborate that name.
4. If a name agrees but known domains conflict, or a domain is shared by materially different names, keep separate identities and queue both sides for review.
5. Permit only explicit, reviewed name/domain aliases and status-annotation cleanup; never use an exact domain alone as identity proof.
6. Preserve source names, profile URLs, candidate company URLs, source-row IDs, programs and status signals as arrays.
7. Do not use fuzzy similarity, logo appearance, shared investors or product-category similarity as identity proof.

Reviewed exceptions prevent known false splits without weakening the rule: current `brimstone.com` is connected to the qualified Brimstone identity that used `brimstoneenergy.com`; `myhippo.com` is a verified redirect to `hippo.com`; source-inferred variants such as Estateintel/Estate Intel, Getjones/Jones, Obieinsurance/Obie Insurance and Verge Sense/VergeSense require both an approved alias and the expected domain. Cocoon/Cocoon Carbon merges only because an approved alias and `cocooncarbon.com` agree. MetaProp's Autodesk BuildingConnected product URL is labeled **BuildingConnected**, not the generic subdomain-derived name “Construction.” The active identity-review queue contains 26 records spanning conflicting names/domains, acquisition/successor URLs and shared-parent/product relationships.

## Fields that make the website useful

Each candidate carries:

- display and alternative names;
- qualified entity ID and record-type signal when available;
- `qualified_core` or `discovery_only` evidence stage;
- exact source-layer memberships;
- candidate company domains and directory/profile URLs kept separately;
- YC company ID, batch and displayed status;
- ecosystem memberships and source-row IDs;
- category, lifecycle, JCX tier, region, country/location and employee-count signals;
- official/source description signals;
- source URLs, identity-resolution method and publication caveat.

Recommended site behavior:

- search all 978 identities;
- default leader comparisons to qualified-core records only;
- show discovery-only cards with a visible “needs diligence” state;
- let users filter by YC batch, ecosystem, lifecycle/category signal, geography and source overlap;
- display official descriptions as attributed source copy, never as an atlas-verified outcome;
- link a qualified card to its claims/outcomes/sources, while discovery-only cards open a diligence checklist.

## What the universe does not prove

- A candidate can be inactive even when an official portfolio card remains live.
- A YC `Active` label does not establish revenue, deployment, security, funding runway or Bangladesh availability.
- An accelerator/investor relationship does not establish a customer deployment.
- Multiple ecosystem appearances do not establish product quality or ROI.
- A company domain does not prove the legal entity, ownership, product status or current integration capability.
- The source layers are strongest in the US and English-language ecosystems; this is not global market share.

Promotion from `discovery_only` to `qualified_core` requires an identity/status check, exact workflow and buyer, current product evidence, Bangladesh/localization assessment, integration/security review, and claim-level sources. Only then should a candidate become a public comparison or JCX pilot shortlist.
