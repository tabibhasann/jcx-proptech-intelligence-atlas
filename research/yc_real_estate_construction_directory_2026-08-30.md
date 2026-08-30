# YC Real Estate & Construction Directory — dated snapshot

**Snapshot date:** 2026-08-30  
**Official source:** [https://www.ycombinator.com/companies/industry/real-estate-and-construction](https://www.ycombinator.com/companies/industry/real-estate-and-construction)  
**Scope:** every company entry returned by YC's official Real Estate and Construction industry directory at retrieval time.

## Executive summary

The official page advertised **128 companies** and returned **128 unique profiles** across three pages (50 + 50 + 28). The companion CSV is therefore a complete dated directory snapshot rather than a shortlist. It preserves YC's identity/status fields and adds clearly labeled analytical inferences for lifecycle, category, and JCX screening.

The directory is a useful founder/market-discovery corpus, not a diligence database. YC's directory copy is self-reported or editorially supplied, can change without notice, and is not independently verified in this snapshot.

## Counts and validation

- Entries: **128**; unique names: **128**; unique profile URLs/slugs: **128**.
- Status shown: Acquired 27, Active 100, Public 1.
- Batch distribution (all batches): F2024 4, F2025 5, P2025 1, P2026 4, S2009 1, S2010 1, S2011 1, S2013 1, S2014 1, S2015 2, S2016 3, S2017 5, S2018 3, S2019 8, S2020 3, S2021 5, S2022 9, S2023 6, S2024 4, S2025 4, S2026 6, W2010 1, W2011 1, W2012 3, W2014 2, W2015 5, W2017 2, W2018 1, W2019 3, W2020 5, W2021 6, W2022 11, W2023 3, W2024 3, W2025 2, W2026 3.
- JCX screening (analytical, not YC-provided): A 92, B 19, C 13, D 4.
- The CSV has 128 data rows plus one header; all profile URLs use the canonical `https://www.ycombinator.com/companies/<slug>` form.

## Methodology

1. Retrieved the official directory on 2026-08-30. The server-rendered page reported `totalPages = 3`, `hasMore = true` on pages 1–2, and `hasMore = false` on page 3.
2. Parsed the page's official server data for each page, capturing the profile's name, slug, YC company ID, batch, status, employee count when shown, location/city/country when shown, official one-liner, concise official description, and visible tags.
3. De-duplicated by canonical YC profile slug and rejected the snapshot if the official 128 count or uniqueness check failed.
4. Retrieved the official [PropTech directory](https://www.ycombinator.com/companies/industry/proptech) and [Real Estate directory](https://www.ycombinator.com/companies/industry/real-estate) as separate comparison sets. The overlap flags in the CSV are exact slug-set comparisons at the same retrieval date; they are not additional companies and must not be double-counted.
5. Inferred lifecycle/category and JCX tier from the official one-liner, description, and tags using a transparent keyword rubric. These fields are hypotheses for research prioritization and require human review before client-facing claims.

## Directory overlap

- PropTech directory page advertised 69 entries; **44** of those profiles overlap this 128-entry directory.
- Real Estate directory page advertised 68 entries; **49** overlap this directory.
- Profiles present in both comparison directories and this directory: **21**. The CSV flags both dimensions so downstream website code can filter without double-counting.
- These overlap counts are a dated observation. YC can recategorize, rename, acquire, or remove profiles; do not treat the categories as a stable taxonomy.

## 2025–2026 cohorts to inspect first

The current directory contains a conspicuous wave of 2025–2026 startups. The following rows are not endorsements; they are high-signal discovery leads because their official copy touches AI, construction, title/permit infrastructure, property operations, energy, or real-estate finance.

| Batch | Company | Official status | What the official listing says | Initial JCX use |
|---|---|---|---|---|
| F2025 | [Automax.ai](https://www.ycombinator.com/companies/automax-ai) | Active | Automax.ai does property appraisals faster and more transparent. Our mobile app uses LiDAR and computer vision to capture property details automatically, and our custom-trained AI agents combine that data with all the analysis and aggregation required to to generate a complete appraisal report in minutes. The result is a clear, grounded valuation, fully Fannie Mae & Freddie Mac compliant — done in under 20... | screen for direct workflow pilot |
| F2025 | [Brickwise](https://www.ycombinator.com/companies/brickwise) | Active | We've built an AI property manager that automates maintenance requests, handling tenant calls and messages 24/7, following up by chasing contractors and resolving issues. We're based in London, but have over 10 customers throughout the world, from San Francisco to Dubai. We have a reliable sales pipeline, including a >$1m cARR enterprise contract. Since our formation 6 months ago, we have raised over $3M in... | screen for direct workflow pilot |
| F2025 | [Goldbridge](https://www.ycombinator.com/companies/goldbridge) | Active | Goldbridge is building the financial operating system for the largest asset class in the world – real estate. More than $1T in rent flows through landlord bank accounts annually, with roughly a quarter locked in idle reserves and security deposits – and billions more leaking from unnecessary property expenses. And with $2.5T in real estate loans about to mature in 2027/28, property owners are desperate to boost... | screen for direct workflow pilot |
| F2025 | [Helonic](https://www.ycombinator.com/companies/helonic) | Active | We help construction teams eliminate rework, delays, and drawing confusion before construction starts. We analyze PDF plans, detect clashes and inconsistencies across disciplines, and create draft RFIs so teams can resolve issues early. This saves construction companies hundreds of hours and millions of dollars. What we do: - Automatically detect clashes, missing information, and drawing mismatches - Align... | screen for direct workflow pilot |
| F2025 | [Structured AI](https://www.ycombinator.com/companies/structured-ai) | Active | Structured AI is the most advanced AI-powered QA/QC platform for drawing packages, working across both PDF drawings and native Revit models. Architects and engineers use our platform to make every drawing set leave the office with certainty. Our AI agents learn your firm's standards, apply the relevant codes, and read every page of a set, then return a clear list of what's wrong, where it sits, and how to fix it.... | screen for direct workflow pilot |
| S2025 | [IronLedger.ai](https://www.ycombinator.com/companies/ironledger-ai) | Active | IronLedger automates property accounting for property managers, developers and contractors, starting with accounts payable. We eliminate more than $70K of accounting costs annually for over 50K multifamily units. https://www.ironledger.ai/ | screen for direct workflow pilot |
| S2025 | [PARES AI](https://www.ycombinator.com/companies/pares-ai) | Active | PARES is an AI-native real estate services firm, providing investment sales brokerage and property management to institutional and middle-market property owners and investors across the country. Real estate is an extremely labor-intensive business, often requiring scaling headcount to grow, being extremely local to submarkets, and operating on low margins. With AI, these services can be centralized and delivered... | screen for direct workflow pilot |
| S2025 | [Spotlight Realty](https://www.ycombinator.com/companies/spotlight-realty) | Active | We are a full-service sell-side residential brokerage that lists and markets your properties. We also screen and schedule tenants showings with our AI agent for a third of the normal commission. | screen for adjacent use case |
| S2025 | [Wayline](https://www.ycombinator.com/companies/wayline) | Active | Wayline is an AI front desk assistant purpose-built for real estate to answer calls and messages 24/7. It’s like an always-on property manager that can convert leads and resolve issues better than any human, day or night. Our AI can be setup in as little as 24 hours and works seamlessly with existing phone/management software. Uniquely, our AI knowledge base is domain-specific to learn and handle the most complex... | screen for direct workflow pilot |
| S2026 | [Alloovium](https://www.ycombinator.com/companies/alloovium) | Active | Alloovium is the document intelligence layer for construction 🏗️ It reads every document and piece of data on a project (contracts, specs, drawings, compliance records, conversations), turning them into answers you can trust and actions with real value: every answer cites its exact source sentence, paperwork is checked clause by clause against the builder's own Integrated Management System, and nothing AI-drafted... | screen for direct workflow pilot |
| S2026 | [Atlia](https://www.ycombinator.com/companies/atlia) | Active | We manage short-term rental properties by running operations completely autonomously. By replacing costly human coordination with AI agents, we cut traditional management fees in half so Airbnb hosts take home 10% to 20% more revenue with zero effort. This lets us offer the best owner and guest experiences with the lowest management rates in the country. | screen for direct workflow pilot |
| S2026 | [FlowManual](https://www.ycombinator.com/companies/flowmanual) | Active | FlowManual is the all-in-one AI estimating, bidding, and purchasing platform for both general and MEP construction contractors. Built by two engineers and Harvard dropouts, FlowManual automates the buying process during pre-construction. With FlowManual, specialty contractors win more work while general contractors deliver at higher standards. | screen for direct workflow pilot |
| S2026 | [RealPact](https://www.ycombinator.com/companies/realpact) | Active | RealPact builds AI agents that handle the paperwork behind real estate transactions. They find property records like deeds, tax records, permits, parcel data, and MLS information, then use that data to fill out contracts, organize documents, track deadlines, and help brokerages close deals faster. We are starting by automating transactions and will expand into other parts of brokerage operations. Much of the... | screen for direct workflow pilot |
| S2026 | [SubVysion](https://www.ycombinator.com/companies/subvysion) | Active | We build centimeter-accurate 3D maps of underground utilities to help construction contractors dig safer and faster. With underground intelligence, contractors can avoid dangerous utility strikes and costly project delays. | screen for direct workflow pilot |
| S2026 | [Vestris](https://www.ycombinator.com/companies/vestris) | Active | Vestris automates title processing end-to-end, from contract to close, so title shops can close more deals with fewer processors. Title insurance has famously high margins, but slow, manual processing is a constant pain — especially in today's bleeding housing market. | screen for direct workflow pilot |

For the complete cohort list—including companies screened C/D—use the CSV, which is designed for filtering by batch, category, lifecycle, status, and overlap flags.

## How to use this corpus for JCX

- Treat Tier A as a conversation/pilot shortlist, not a procurement recommendation. Verify Bangladesh availability, data residency, integrations, pricing, implementation capacity, and reference customers.
- Use the lifecycle labels to map the startup universe onto a developer's operating model: land and approvals → design → construction → sales → handover → property operations → portfolio and ESG.
- Use `status` and `batch` as maturity signals only. A YC company marked Active may still be pre-product or pre-revenue; Acquired/Public does not automatically mean relevant or accessible.
- Preserve the source URL and snapshot date in any future website card. If the website republishes a company claim, visually distinguish “YC/company says” from independently verified evidence.

## Publication caveats

- This file is a dated snapshot, not a live API. Re-run the extraction before publishing a future edition.
- The official directory's count, category membership, statuses, employee counts, locations, tags, and descriptions can change. “Employee count when shown” is blank when YC displayed no count or a zero-like value.
- “Official description concise” is shortened from YC's official long description for row readability; the full official profile remains the authority for exact copy.
- Lifecycle, category, and JCX screening are analyst inferences. They are deliberately labeled and should receive human review plus claim-level sources before client-facing publication.
- YC/accelerator inclusion is not a quality, safety, compliance, traction, or customer-outcome guarantee. Do not infer ROI from directory presence.

## Files

- `yc_real_estate_construction_directory_2026-08-30.csv`: 128 normalized rows with source fields, analytical tags, and overlap flags.
- This Markdown file: methodology, count validation, overlap interpretation, cohort triage, and publication caveats.
