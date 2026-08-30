# JCX startup coverage — final ecosystem audit

> **Historical pre-promotion audit:** the 25 core startup additions and later eight residual additions have now been integrated. Use `research/final_release_validation.md` and `data/atlas_manifest.json` for current counts and release state; this document preserves why the additions were selected.

**As-of date:** 2026-08-30  
**Scope:** global PropTech, ConTech and ClimateTech startups relevant to JCX (real-estate operations, construction delivery, construction materials/industrial decarbonization, infrastructure, and enabling data/software).

## Executive verdict

The 690-record discovery universe and 228-record qualified core are a strong base, but they are not yet a world-class specialist-universe view. The current corpus is strongest in broad US/Europe PropTech, platform companies, major AEC software, and the regional additions already captured in `research/coverage_gap_additions.csv`. It is materially thin in five decision-relevant areas:

1. **Construction execution intelligence:** reality capture, schedule reliability, field documentation, BIM coordination, and owner/lender draw evidence.
2. **Construction robotics and equipment:** retrofit autonomy, robotic installation, modular microfactories, and zero-emission heavy civil equipment.
3. **Property-operations infrastructure:** multifamily leasing, maintenance, AP automation, fraud/security, and agentic operator workflows.
4. **Embodied-carbon and industrial climate:** LCA/EPD, cement-plant optimization, slag/cement substitution, concrete QA, and solar deployment workflow.
5. **Current APAC and venture-ecosystem signal:** Singapore/SEA finalists and Zacua/2150/RET/Shadow portfolio companies are under-represented at the company level.

The attached register is deliberately selective: **25 must-add anchors and 14 context-only records**, not a logo dump. The anchors are companies with a current official portfolio/cohort page plus a clear JCX use case. Context-only records are useful for category completeness but have a status, identity, or maturity caveat that makes them inappropriate for the qualified active core without another enrichment pass.

Nine anchors (Funnel Leasing, Lula, PredictAP, Property Shield, Stan.AI, Gigaton, Cocoon, Nabr and OpenSolar) are already present as **discovery-only** records in the 690-row universe. They are still “must-add” for the 228-row qualified core because their current official pages now support active status, product scope and JCX relevance. The remaining 16 anchors are absent from both existing files on exact-name matching. The schema-compatible promotion file is [startup_core_additions.csv](/Users/tabibhasan/Downloads/JCX%20Development/research/startup_core_additions.csv).

## What was compared

The audit checked names and URL variants against:

- `data/discovery_universe.json` (690 records)
- `data/proptech_master_companies.json` (228 records; 194 marked active, with cohort-selected, acquired, unclear, inactive and unknown statuses also represented)
- `data/built_environment_ecosystem_discovery_index.json` (429 ecosystem rows)
- existing regional/operator/coverage-gap research files
- current official ecosystem pages and company pages listed in the additions CSV.

The existing ecosystem index is useful for discovery, but it is not a substitute for constituent-company coverage: it contains aggregate/source rows for MetaProp, Brick & Mortar Ventures, Fifth Wall, JLL Spark, Pi Labs, NAR REACH and similar ecosystems, while many current specialist portfolios are not granularly represented in the qualified core.

## Must-add anchors

The 25 `must_add` rows in [startup_coverage_additions.csv](/Users/tabibhasan/Downloads/JCX%20Development/research/startup_coverage_additions.csv) should be promoted into the next enrichment/core pass. The highest-priority clusters are:

| Cluster | Anchors | Why it changes the JCX analysis |
|---|---|---|
| Robotics/equipment | AUAR, Lumina, Teleo, Gravis Robotics, Raise Robotics (context) | Captures automation economics, retrofit adoption, labor scarcity, and zero-emission heavy civil—not just software. |
| Construction execution/data | Outbuild, Field Materials, Track3D, DroneDeploy, Revizto, Cupix, Speckle, Trunk Tools | Fills the schedule/procurement/reality/BIM/open-data chain from jobsite evidence to owner decision-making. |
| Multifamily operations | Funnel Leasing, Lula, PredictAP, Property Shield, Stan.AI, MagicDoor | Adds the operating layer beneath real-estate assets: leasing, maintenance, AP, fraud, and agentic workflows. |
| Materials/ClimateTech | One Click LCA, Gigaton, Cocoon, Nabr, OpenSolar, ConcreteAI | Adds embodied-carbon measurement, cement efficiency, materials substitution, industrialized housing, solar deployment, and concrete QA. |
| APAC civil AI | Civils.ai, ConcreteAI | Prevents a US/Europe-only interpretation of current AI adoption in civil engineering and concrete. |

Tier guidance in the CSV is intentionally conservative. `Tier 1 / anchor` means a company should influence the qualified comparative set; it does **not** mean investment quality or commercial success is proven. Company scale, customer and funding metrics are labeled as self-reported where applicable.

## Context-only additions

The 14 `context_only` rows should remain visible in a watchlist or evidence layer: GScan, Concrete4Change, Circotrade, Construex, Sitewire, Raise Robotics, Wentilabs, SuiteSpot, CivCheck, Acres, AuditMate, Algoma, Dig Robotics and Fixtender. They matter because they expose missing categories (non-destructive scanning, circular procurement, LatAm contractor access, lender inspections, SEA field AI, permitting, land intelligence and autonomous excavation), but at least one of canonical URL, current operating status, maturity, or distinctiveness still needs verification.

Particularly useful context signals:

- **CEMEX 2026 APAC finalists:** [official competition page](https://www.cemexventures.com/construction-startup-competition-2026/) / [APAC finalists](https://www.cemexventures.com/startup-competition-2026-apac-finalists/) show a current five-vertical taxonomy (preconstruction; jobsite productivity/building systems; ClimateTech for the built world; smart manufacturing/logistics; smart buildings/infrastructure) and finalists including Arbel.ai, Civils.ai, ConcreteAI, Bton.io, Dig Robotics and LIGHTYX. Civils.ai and ConcreteAI are promoted to anchors because their official pages provide clearer active-product evidence.
- **CEMEX Top 50 2025:** the [official list](https://www.cemexventures.com/top-50-2025/) is a high-quality category source, but many early companies have only competition-level evidence. Teleo, Gravis Robotics and Trunk Tools have stronger company evidence and are anchors; GScan, Concrete4Change, Circotrade and Dig Robotics remain context.
- **Zacua:** the [current portfolio](https://zacuaventures.com/portfolio/) is unusually relevant to construction operations and lists Field Materials, Outbuild, Track3D, Gravis Robotics, Construex, Sitewire, Raise Robotics, Wentilabs and others. It is a key source for global/SEA/LatAm coverage, but the portfolio alone should not make every company core-qualified.

## Ecosystem disposition

| Ecosystem/source | Decision | Rationale |
|---|---|---|
| RET Ventures | **Must-add constituents** | The [current portfolio](https://www.ret.vc/portfolio) has specific active entries for Funnel Leasing, Lula, PredictAP, Property Shield, Stan.AI and SuiteSpot. The multifamily operations layer was not granular enough in the core. |
| Shadow Ventures | **Must-add selected constituents** | Current [investment pages](https://shadow.vc/) support AUAR, Lumina and MagicDoor with category, stage and investment year. Shadow explicitly says the page is not a complete portfolio, so do not infer exhaustive coverage. |
| Zacua Ventures | **Must-add selected constituents; context for the rest** | The [current portfolio](https://zacuaventures.com/portfolio/) has strong construction-operations and APAC/LatAm signals. Promote Field Materials, Outbuild, Track3D and Gravis; watchlist the narrower or less evidenced names. |
| 2150 | **Must-add selected constituents** | The [current investment portfolio](https://www.2150.vc/investments) supports Gigaton, Cocoon, Nabr and OpenSolar. Hometree is explicitly exited and is context-only lineage, not a current startup addition. |
| Foundamental | **Must-add selected constituents** | The [current portfolio](https://www.foundamental.com/portfolio) supports Speckle and confirms a large AEC/project-economy thesis. Do not import all 145 investments; many are duplicates or outside JCX scope. |
| BuiltWorlds | **Must-add selected constituents** | The [2025 Building Tech Top 50](https://builtworlds.com/insights/2025-building-tech-top-50-list/) validates DroneDeploy, One Click LCA, Revizto and Cupix as high-signal category leaders. Current 2026 list archives show the source remains active. |
| CEMEX Ventures | **Must-add selected constituents; context for long tail** | 2025 Top 50 and 2026 APAC competition are authoritative current discovery sources. Use company pages and status checks before promoting early finalists. |
| Moderne Ventures | **Context/selected additions** | Current portfolio supports Acres and AuditMate as useful adjacency. It also exposes identity lineage such as Avvir acquired by Hexagon; do not count acquired products as independent startups. |
| Alchemist | **Context-only / monitor** | The [official portfolio](https://www.alchemistaccelerator.com/portfolio) is broad enterprise/deep-tech and contains older construction entries such as Fixtender. EDEN is joining Contractor Commerce; it should not be added as an independent active startup. |
| Plug and Play Real Estate & Construction | **Context-only / monitor** | [Official investment-portfolio](https://welcome.plugandplaytechcenter.com/investment-portfolio) and [2025 performance](https://welcome.plugandplaytechcenter.com/company-performance-report-2025) pages confirm a large ecosystem, but the public investment portfolio is dynamic and does not provide stable company-level primary evidence for a defensible selective add. Use its [Real Estate & Construction Expo](https://welcome.plugandplaytechcenter.com/hubfs/Mobility%20SV%20Folder/June%20Summit%202025%20Decks/Real%20Estate%20%26%20Construction%20Expo.pdf) materials for discovery, then verify companies elsewhere. |
| Techstars / Colliers PropTech Accelerator | **No-add as an ecosystem aggregate** | The [Techstars portfolio](https://www.techstars.com/portfolio) and [Colliers PropTech page](https://www.colliers.com/en-gb/services/proptech-solutions) are useful historical/context sources, but they do not provide a current, complete specialist cohort that warrants duplicating rows. |
| Holcim, Trimble, Autodesk, Leonard/VINCI, Suffolk BOOST | **No-add as company ecosystems** | These are strategic/corporate partner or platform ecosystems, not homogeneous startup portfolios. See [Holcim MAQER](https://www.holcim.com/innovation/holcim-maqer-ventures), [Trimble Ventures](https://www.trimble.com/en/trimble-ventures), [Autodesk Technology Centers](https://www.autodesk.com/technology-centers), [Leonard by VINCI](https://leonard.vinci.com/agir/) and [Suffolk BOOST](https://suffolktech.com/boost/) as current official ecosystem evidence. Keep partner relationships and challenge/cohort evidence as source metadata; add a constituent only where an independent current startup identity and JCX use case are evidenced. |
| ULI / CREtech lists and directories | **No-add as bulk imports** | Useful market maps and event discovery, but generally not a stable official portfolio/cohort with comparable maturity/status evidence. Use for gap checking, not automatic core promotion. |

## Identity, acquisition and currentness risks

- **Gigaton collision:** `gigaton.co` (2150-backed cement-plant AI) is distinct from `gigatonco2.com` (carbon-capture company). Do not merge.
- **ConcreteAI collision:** Singapore’s `concreteai.io` (monitoring/QA) is distinct from US `concrete.ai` products.
- **CivCheck:** Clariti announced acquisition in October 2025. Keep the product lineage under Clariti; do not score it as an independent active startup.
- **EDEN:** official site says it is joining Contractor Commerce. Treat as acquired/joining lineage, not a new current core row.
- **DroneDeploy / StructionSite:** StructionSite was acquired by DroneDeploy in 2022. Preserve the product lineage, but avoid double-counting two active companies.
- **Avvir:** Moderne identifies Avvir as acquired by Hexagon; no independent active-company add.
- **Markerr, SightPlan, CheckpointID:** RET’s current pages indicate exited/M&A or acquired lineages. Do not treat old portfolio presence as current independent status.
- **Construex spelling:** Zacua’s company is **Construex**, not “ConstructEx.”
- **Speckle:** canonical software domain is `speckle.systems`; generic “speckle” names are unrelated.
- **Cocoon, Algoma, Stan.AI and Dig Robotics:** names are collision-prone. Preserve the ecosystem source and canonical URL together until legal-entity enrichment is complete.

## Recommended implementation order

1. Add the 25 must-add anchors to the next qualified-core enrichment run, preserving current status and source capture date.
2. Add all 39 rows to the discovery/evidence layer, but keep `context_only` out of active comparable metrics.
3. Add a parent/product/acquisition field (or equivalent lineage metadata) before importing CivCheck, StructionSite, Avvir, EDEN, Markerr, SightPlan or CheckpointID.
4. Re-run duplicate detection on punctuation and canonical domains, especially Stan.AI, Cocoon, Algoma, Dig Robotics, ConcreteAI, Gigaton and Construex.
5. Recheck all company-reported scale/funding metrics during the next refresh; they are maturity signals, not independently verified facts.
