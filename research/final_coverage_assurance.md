# Final coverage assurance

> **Disposition after this audit:** all eight material residuals identified below were promoted into `research/final_residual_additions.csv`: KE Holdings/Beike, ALICE Technologies, SmartPM Technologies, Togal.AI, Building Transparency/EC3, Sublime Systems, Biomason and Brick & Bolt. The post-integration release is 295 qualified entities and 978 discovery identities. This document is retained as the independent pre-promotion audit trail; use `research/final_release_validation.md` and `data/atlas_manifest.json` for current release facts.

**Audit date:** 2026-08-30  
**Purpose:** independent omission-risk check after the integrated build. This is a coverage assurance note, not a request to inflate the dataset.

## Bottom line

The integrated corpus is now a credible, source-anchored **curated** universe for JCX: 287 qualified entities, 975 discovery records and 683 ecosystem-company pairs. It has strong coverage of the major built-environment technology layers, current specialist venture ecosystems, and JCX-relevant regional markets.

It should not be described as a complete global startup census. The remaining risk is concentrated rather than random: mainland China and parts of ASEAN/Sub-Saharan Africa are thin; several current construction-schedule and low-carbon-material leaders remain discovery-only; and the qualified count intentionally does not promote every constituent of large portfolios or directories. Those limitations are material for a global market map, but they do not invalidate the corpus as a decision-oriented JCX benchmark if stated clearly.

The 287 qualified records also include products, programs/ecosystem rows, acquired lineages and corporate/platform comparators—not only independent startups. Current status counts are 253 `active`, 11 `cohort-selected`, 6 `unclear`, 5 `unknown`, 5 `acquired`, 4 `inactive`, and one each `acquired-active`, `pilot` and `restructured`. Therefore “287 qualified entities” is the honest denominator; “287 startups” is not.

Taxonomy completeness is not uniform: 62 records still have blank category/maturity/status-date/founding-year fields, and lifecycle values mix controlled `L1`–`L12` labels with legacy free-text labels. That is a normalization limitation for counts and filters, not evidence that the corresponding ecosystems were ignored.

## Benchmark universe checked

The audit compared the current files against the current official pages and source layers below. A specialist portfolio was used to expose omissions, not as a mandate to import every logo.

| Benchmark | Official evidence checked | Coverage conclusion |
|---|---|---|
| CEMEX Ventures | [2026 Construction Startup Competition](https://www.cemexventures.com/construction-startup-competition-2026/), [2026 APAC finalists](https://www.cemexventures.com/startup-competition-2026-apac-finalists/), [2025 Top 50](https://www.cemexventures.com/top-50-2025/) | Current five-vertical taxonomy is represented; APAC finalists and selected 2025 anchors are in the core. The 50-company 2026 list remains primarily discovery context, by design. |
| RET Ventures | [Current portfolio](https://www.ret.vc/portfolio) and RET perspectives | Current multifamily leasing, maintenance, AP, fraud/security and AI-operations anchors are represented. The wider 47-row portfolio is not fully promoted, which is appropriate for overlapping or non-core services. |
| Moderne Ventures / Passport | [Current portfolio](https://www.moderneventures.com/portfolio) | Land intelligence, maintenance/compliance and related adjacencies are represented selectively. The 126-row list includes broad Passport and acquired products, so bulk promotion would overstate startup coverage. |
| 2150 | [Current investments](https://www.2150.vc/investments) | Gigaton, Cocoon, Nabr and OpenSolar are represented; exited Hometree is treated as lineage. Several climate/materials names remain watchlist context. |
| Zacua Ventures | [Current portfolio](https://zacuaventures.com/portfolio/) | Field Materials, Outbuild, Track3D and Gravis Robotics are represented as anchors; narrower or less evidenced companies remain context. |
| Foundamental | [Current portfolio](https://www.foundamental.com/portfolio) | Speckle is represented. The AEC/project-economy thesis is covered, but the 145-investment portfolio is not exhaustively imported. |
| BuiltWorlds | [2025 Building Tech Top 50](https://builtworlds.com/insights/2025-building-tech-top-50-list/) and current Top Lists archive | DroneDeploy, One Click LCA, Revizto and Cupix are represented. The list remains a discovery benchmark for additional specialist leaders. |
| Shadow Ventures | [Current investment pages](https://shadow.vc/) | AUAR, Lumina and MagicDoor are represented with current stage/year/category evidence. Shadow explicitly warns that its public list is not exhaustive. |
| Plug and Play Real Estate & Construction | [Investment portfolio](https://welcome.plugandplaytechcenter.com/investment-portfolio), [2025 performance](https://welcome.plugandplaytechcenter.com/company-performance-report-2025), [Real Estate & Construction Expo](https://welcome.plugandplaytechcenter.com/hubfs/Mobility%20SV%20Folder/June%20Summit%202025%20Decks/Real%20Estate%20%26%20Construction%20Expo.pdf) | Ecosystem and vertical evidence are present; dynamic public portfolio is not used as an exhaustive, comparable company list. |
| Alchemist and Techstars/Colliers | [Alchemist portfolio](https://www.alchemistaccelerator.com/portfolio), [programs](https://www.alchemistaccelerator.com/programs), [Techstars portfolio](https://www.techstars.com/portfolio), [Colliers PropTech](https://www.colliers.com/en-gb/services/proptech-solutions) | Used for historical/adjacent discovery. Older cohorts and broad portfolios do not provide a stable current specialist denominator. |
| Corporate venture/client ecosystems | [Holcim MAQER](https://www.holcim.com/innovation/holcim-maqer-ventures), [Trimble Ventures](https://www.trimble.com/en/trimble-ventures), [Autodesk Technology Centers](https://www.autodesk.com/technology-centers), [Leonard by VINCI](https://leonard.vinci.com/agir/), [Suffolk BOOST](https://suffolktech.com/boost/) | Treated as strategic partner/client ecosystems and discovery sources. Constituent companies are added only when independent current identity and JCX relevance are evidenced. |
| YC 2026 real-estate/construction directory | [Official YC directory snapshot](https://www.ycombinator.com/companies/industry/real-estate-and-construction) | 128-company point-in-time directory is ingested for discovery; only decision-relevant, source-supported companies are promoted. |
| ULI and CREtech lists | Official market-map/event sources used for gap checking where available | Useful discovery/context sources, not stable portfolio or status benchmarks; no bulk import. |

## Coverage matrix

| Decision layer | Current representation | Assurance | Residual omission risk |
|---|---|---|---|
| Land, parcel, feasibility, planning and permits | Landeed, LandTech, Barikoi, TestFit, PermitFlow, UpCodes, Algoma/related discovery | Strong | China and local cadastral/planning ecosystems are not globally complete. |
| Design, BIM, CDE and interoperability | Autodesk Construction Cloud / Forma, Trimble, Bentley Systems, Hexagon, Nemetschek, Revizto, Speckle, Cupix | Strong at platform and workflow level | EC3/tallyLCA relationship and additional open-BIM leaders should remain a watchlist, not a hidden gap. |
| Construction execution and project controls | Procore, Oracle Construction & Engineering, Buildots, Outbuild, Trunk Tools, Track3D, DroneDeploy, OpenSpace, SmartPM/ALICE discovery signals | Strong enough for JCX use cases; heterogeneous tool types are visible | ALICE Technologies, SmartPM and Nodes & Links are current leaders not yet qualified; Togal.AI is a distinct estimating/takeoff gap. |
| Procurement, payments, lending and supply chain | Built Technologies, Rabbet, Snapdocs, Agave, Field Materials, Infra-Market, ProQ, BuildMart, Watad | Strong | CEMEX 2026 supply-chain long tail is intentionally discovery-only. |
| Property operations and multifamily workflows | Yardi, MRI Software, AppFolio, Entrata, SmartRent, Measurabl, Funnel Leasing, Lula, PredictAP, Property Shield, Stan.AI, MagicDoor | Strong for current operator decisions | RET’s wider portfolio is not exhaustive; this is a depth choice, not a category blind spot. |
| Marketing, transaction and housing delivery | Zillow, CoStar, VTS, Property Finder, QuintoAndar/Loft/Habi and regional platforms, Nabr, Livspace | Strong for benchmark use | China’s Beike/KE Holdings and local transaction ecosystems are absent from structured core. |
| Climate, energy, materials and embodied carbon | Deepki, Kestrix, BrainBox AI, Facilio, Qflow, One Click LCA, CarbonCure, Brimstone, Cocoon, Gigaton, OpenSolar, ConcreteAI | Broad and decision-relevant | EC3, Sublime Systems and Biomason remain material watchlist candidates; envelope/thermal leaders are less complete. |
| Infrastructure, geospatial and reality intelligence | iTwin/Bentley, Hexagon, Nearmap, Barikoi, OpenSpace, DroneDeploy, Track3D, Cupix, Civils.ai | Strong for digital-record and verification thesis | Country-specific surveying and infrastructure inspection ecosystems remain uneven. |
| Geography | US 130; UK 17; India 16; UAE 15; Bangladesh 14; Australia 11; Singapore 11; Japan 10; Canada 8; Saudi Arabia 7; broad smaller-country tail | Strong in JCX priority markets and English-accessible specialist sources | Mainland China has 0 HQ-coded records; Vietnam, Thailand, Philippines, Kenya, Ghana, Rwanda and Tanzania have 0 structured HQ-coded records. |

## Material residual omissions

These are the only residuals that could change a decision, category conclusion or global-comprehensiveness claim. They are not an instruction to add all of them immediately.

| Residual | Why it matters | Current evidence | Recommended treatment |
|---|---|---|---|
| **Mainland China** | The current HQ distribution has no mainland-China structured record. China is too large a built-environment and construction-technology market to imply global geographic completeness. | The omission is visible in the core’s country counts; a dedicated Mandarin-language primary-source pass was not part of this build. | Mark as a **material geographic limitation**. Run a dedicated China audit before using “global” to mean country-complete; do not fill the gap with translated aggregators. |
| **ALICE Technologies** | Construction optioneering/schedule simulation is a distinct decision layer from generic PM and BIM. | [Official product page](https://www.alicetechnologies.com/construction-optioneering) is current; the company is also visible in the Brick & Mortar specialist ecosystem. | Keep discovery/watchlist or promote in the next project-controls pass if schedule optimization is a scored JCX category. |
| **SmartPM Technologies** | Schedule-quality, delay analytics and project-controls assurance are distinct from Procore/Oracle systems of record. | [Official site](https://smartpm.com/) is current; also listed in the current CEMEX Top 50 ecosystem. | Watchlist is sufficient for a broad corpus; promote if project-controls analytics is a primary investment thesis. |
| **Togal.AI** | AI takeoff/estimating is distinct from Civils.ai’s civil-document focus and PermitFlow’s permitting workflow. | [Official CEMEX profile](https://www.cemexventures.com/top-50-startups/togal-ai/) and [company site](https://www.togal.ai/) are current. | Treat as a **medium residual current-leader omission**; add in the next preconstruction benchmark if estimator workflow is central. |
| **EC3 / Building Transparency** | EC3 is a widely used open embodied-carbon material-search/procurement tool and EPD database; One Click LCA does not fully substitute for its open procurement role. | [Building Transparency](https://buildingtransparency.org/) and [EC3 tool](https://www.buildingtransparency.org/tools/ec3/) are current official pages. | Represent as an organization/tool relationship, not necessarily as a startup. This is a material omission if JCX makes embodied-carbon procurement a core category. |
| **Sublime Systems and Biomason** | Both are current low-carbon cement process leaders; existing Brimstone, CarbonCure, Cocoon and Gigaton provide strong category coverage but not these distinct pathways. | [Sublime](https://sublime-systems.com/), [Biomason](https://biomason.com/), and Holcim’s current startup ecosystem references. | Maintain as a targeted climate-materials watchlist; promote at least one if the analysis compares technical pathways rather than only software/adoption layers. |
| **Brick & Bolt (India)** | End-to-end tech-enabled residential construction is not the same as Livspace interiors or Infra.Market materials. It is a relevant India delivery-model comparator. | [Official company site](https://www.bricknbolt.com/) and current Foundamental portfolio evidence. | Medium regional omission; promote if JCX’s India/homebuilding repeatability thesis is scored. |

The following are **not** material omissions for the current scope because equivalent decision layers are already represented: Blue Frontier/Aeroseal/LuxWall (building-energy/envelope watchlist), Nodes & Links (project controls alongside Oracle/Procore/Buildots/Outbuild), additional CEMEX Top 50 long-tail names, and most RET/Moderne/2150 portfolio companies.

## Intentional exclusions and lineage rules

- **No bulk portfolio imports.** A portfolio or accelerator selection is discovery evidence, not independent traction, outcome or current-status proof. This applies especially to the 50-company CEMEX 2026 list, RET’s 47-row portfolio, Moderne’s broad Passport list, 2150’s adjacent climate list, and YC’s 128-row directory.
- **No double counting acquired products.** PlanGrid, BuildingConnected and Autodesk Construction Cloud/Forma; Fieldwire/Hilti; StructionSite/DroneDeploy; Avvir/Hexagon; CivCheck/Clariti; EDEN/Contractor Commerce; Markerr, SightPlan and CheckpointID under their documented RET lineage are kept as product/acquisition context rather than independent current startups.
- **No generic corporate/operator inflation.** Large developers, REITs, contractors, CVCs and programs are useful comparators but are not counted as startups. Their presence supports platform/client context, not startup-market share.
- **No outcome inflation.** Funding, portfolio selection, cohort participation, customer logos and company-reported scale are maturity or corroboration signals, not independently verified ROI.
- **No silent country filling.** China and thin ASEAN/Africa markets are not populated from secondary lists simply to improve the map’s visual balance. A dedicated local-language primary-source pass is required.

## Language that is safe to use

> “JCX’s 2026 atlas is a curated, source-anchored and ecosystem-benchmarked universe of decision-relevant built-environment technology entities. As of 30 August 2026 it contains 287 qualified entities, 975 discovery records and 683 ecosystem-company pairs, with active, cohort, acquired and uncertain statuses separated. It covers the major real-estate, construction, infrastructure, data, property-operations, materials and climate-technology layers relevant to JCX, and uses named specialist ecosystems as structured discovery benchmarks.”

The following claims would be overstated:

- “The complete global PropTech/ConTech/ClimateTech startup universe.”
- “Every current company in CEMEX, RET, Moderne, 2150, Zacua, Foundamental, Plug and Play, Alchemist, Techstars or YC.”
- “All 287 qualified records are independent startups.”
- “Every company’s current status, funding, traction, customer count or outcome has been independently verified.”
- “Country-complete global coverage,” especially for mainland China and under-covered ASEAN/Sub-Saharan African markets.

## Assurance conclusion

No broad category is absent from the current JCX decision framework: each major lifecycle layer has at least one credible platform or specialist comparator. The corpus is therefore safe to use as a **curated decision universe with explicit residual limitations**. Before making a country-complete global claim or scoring construction schedule optimization and embodied-carbon procurement as standalone categories, the targeted residuals above—especially mainland China, EC3, ALICE/SmartPM/Togal and at least one of Sublime/Biomason—should be resolved.
