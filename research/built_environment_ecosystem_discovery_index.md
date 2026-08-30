# Built-environment ecosystem discovery index

Captured 2026-08-30 from official portfolio, cohort, showcase, or alumni pages. This is a **discovery layer**: every row has `discovery_only=true`; portfolio or cohort membership is not validation, recommendation, customer proof, or a current operating-status conclusion.

## Scope and coverage

The CSV contains **683 deduplicated company–ecosystem pairs** across **20 ecosystem pages**. The same company intentionally appears once per ecosystem so overlap and sourcing relationships remain visible.

| Ecosystem | Rows | Official source | Extraction note |
|---|---:|---|---|
| Pi Labs | 30 | [portfolio](https://pilabs.vc/portfolio) | Current visible portfolio cards; page claims a larger historical portfolio than the cards currently rendered. |
| MetaProp | 145 | [portfolio](https://www.metaprop.com/portfolio) | Logo-only tiles; names are conservatively inferred from linked domains. |
| Fifth Wall | 49 | [portfolio](https://www.fifthwall.com/portfolio) | Four official pagination pages; displayed exit/acquisition labels retained. |
| Brick & Mortar Ventures | 51 | [portfolio](https://brickmortar.vc/portfolio) | ACTIVE INVESTMENTS and EXITS sections retained; Boom & Bucket conflict preserved. |
| JLL Spark | 41 | [portfolio](https://spark.jllt.com/portfolio/) | Current official cards, including cards marked Exited to an acquirer. |
| Taronga RealTechX / Asset Impact | 53 | [2025 booklet](https://tarongagroup.com/wp-content/uploads/2025/07/RealTechX-Asset-Impact-Booklet-2025-1.pdf) | Alumni logo grid; names transcribed, no URLs/status invented. |
| NAR REACH regional programs | 60 | [regional programs](https://www.nar-reach.com/) | Current cohort galleries plus official Middle East launch announcement. |
| CEMEX Ventures Top 50 ConTech 2026 | 50 | [2026 Top 50](https://www.cemexventures.com/top-50/) | Complete current annual expert-screen list; category retained, no company-domain guess. |
| RET Ventures | 49 | [portfolio and AI accelerator](https://www.ret.vc/portfolio/) | Every current rendered company card; portfolio and accelerator memberships separated. |
| Moderne Ventures / Passport | 126 | [portfolio](https://www.moderneventures.com/portfolio) | Complete current pagination; only visible exit markers are retained. |
| 2150 | 29 | [investments](https://www.2150.vc/investments) | Complete current physical-world/built-environment investment listing. |

## Interpretation rules

- `Active/portfolio`, `Portfolio example`, and similar labels describe how the source presents the record; they do not guarantee that a company is operating, funded, solvent, or a good fit for JCX.
- Exit/acquisition labels are included only when the official page explicitly displays them.
- Logo-only sources are not silently treated as text-perfect: `name_source` tells the reader whether the name was inferred from a linked domain or transcribed from a logo tile.
- Category, region, product, customer, revenue, funding, and outcome fields are left blank unless the official source itself presents them. The evidence-qualified atlas must separately validate those claims.

## Overlap signals

| Company | Ecosystems in this index |
|---|---|
| Aire | NAR REACH Latin America, NAR REACH US Residential |
| Alice Technologies | Brick & Mortar Ventures, JLL Spark |
| Associationonline | NAR REACH Latin America, NAR REACH US Residential |
| Brokerbot | NAR REACH Latin America, NAR REACH US Residential |
| Carboncure | 2150, Taronga RealTechX / Asset Impact |
| Curbio | Brick & Mortar Ventures, NAR REACH / Second Century Ventures |
| Dealpath | JLL Spark, MetaProp |
| Docusign | Moderne Ventures / Passport, NAR REACH / Second Century Ventures |
| Freeda | Brick & Mortar Ventures, CEMEX Ventures Top 50 ConTech 2026 |
| Higharc | Fifth Wall, MetaProp |
| Hqo | JLL Spark, MetaProp |
| Hubble | JLL Spark, Taronga RealTechX / Asset Impact |
| Juno | MetaProp, RET Ventures Portfolio |
| Lotroll | NAR REACH Latin America, NAR REACH US Residential |
| Maxhome | NAR REACH Latin America, NAR REACH US Residential |
| Measurabl | Moderne Ventures / Passport, RET Ventures Portfolio, Taronga RealTechX / Asset Impact |
| Occupier | MetaProp, NAR REACH / Second Century Ventures |
| Onsiteiq | MetaProp, RET Ventures Portfolio |
| Openspace | JLL Spark, Taronga RealTechX / Asset Impact |
| Orbital | JLL Spark, Moderne Ventures / Passport |
| Stackwrap | NAR REACH Latin America, NAR REACH US Residential |
| Stake | NAR REACH / Second Century Ventures, RET Ventures Portfolio |
| Travtus | MetaProp, RET Ventures Portfolio |
| Wiredscore | Fifth Wall, Taronga RealTechX / Asset Impact |
| Ynomia | Brick & Mortar Ventures, Taronga RealTechX / Asset Impact |

## Recommended follow-up

1. Resolve logo-only MetaProp names against a human-reviewed company-name map and preserve the original linked domain.
2. Run conservative name-first identity resolution against the current evidence-qualified master; use domains only as corroboration and do not promote discovery rows automatically.
3. For JCX-relevant candidates, add independent operating-status, local-market availability, integration, security, pricing, and quantified-outcome claims from primary sources.
4. Re-capture this index periodically: portfolios change, cohort pages are edited, and some official sites show only a partial or featured list.

## Source pages

- [Pi Labs portfolio](https://pilabs.vc/portfolio)
- [MetaProp portfolio](https://www.metaprop.com/portfolio)
- [Fifth Wall portfolio](https://www.fifthwall.com/portfolio)
- [Brick & Mortar Ventures portfolio](https://brickmortar.vc/portfolio)
- [JLL Spark portfolio](https://spark.jllt.com/portfolio/)
- [Taronga RealTechX Asset Impact booklet](https://tarongagroup.com/wp-content/uploads/2025/07/RealTechX-Asset-Impact-Booklet-2025-1.pdf)
- [NAR REACH](https://www.nar-reach.com/), [US Commercial](https://www.nar-reach.com/us-commercial), [US Residential](https://www.nar-reach.com/us-residential), [UK](https://www.nar-reach.com/uk), [Latin America](https://www.nar-reach.com/latam), [Canada](https://www.nar-reach.com/canada), [Australia & New Zealand](https://www.nar-reach.com/australia-and-newzealand), [Israel](https://www.nar-reach.com/israel), and [Middle East announcement](https://www.nar-reach.com/dubai-land-department-second-century-ventures-celebrate-start-of-reach-middle-east)
- [CEMEX Ventures Top 50 ConTech 2026](https://www.cemexventures.com/top-50/)
- [RET Ventures portfolio and AI accelerator](https://www.ret.vc/portfolio/)
- [Moderne Ventures portfolio and Passport](https://www.moderneventures.com/portfolio)
- [2150 investments](https://www.2150.vc/investments)

Generated by `research/build_ecosystem_discovery_index.py`. The CSV is the source of truth for row-level extraction; this markdown is the human-readable coverage and limitations note.
