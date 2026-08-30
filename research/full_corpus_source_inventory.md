# Full corpus source inventory

**Generated:** 30 August 2026  
**Purpose:** delimiter-safe source-lineage inventory for every unique HTTP(S) URL in the research-source and narrative corpus.

## Scope and method

The inventory scans root research/strategy Markdown, `research/` Markdown/CSV/JSON/Python and the two corpus build/validation scripts. Generated `data/` copies are excluded so citations are not counted twice. The inventory files exclude themselves.

The parser splits pipe- and semicolon-delimited URL cells before URL normalization, preventing a multi-URL cell from being mistaken for one URL. Exact observed strings are retained; normalized identity lowercases scheme/host, removes leading `www`, default ports, fragments, tracking query parameters and non-root trailing slashes. Classification and authority hints are conservative inferences, not evidence grades.

## Validation summary

| Measure | Count |
|---|---:|
| Scoped source files scanned | 49 |
| Files with URL occurrences | 34 |
| URL citation occurrences | 3495 |
| Unique exact URL variants | 1625 |
| Unique normalized URL identities | 1600 |
| Exact variants represented in current register | 1625 |
| Normalized identities represented in current register | 1600 |
| Normalized collision groups | 22 |
| Malformed URL rows | 0 |

## Inferred source classes

| Inferred class | Unique URLs |
|---|---:|
| `company_or_product` | 1323 |
| `ecosystem_or_investor` | 179 |
| `research_or_industry` | 75 |
| `government_or_regulator` | 36 |
| `independent_media` | 12 |

## URL-normalization collision audit

| Normalized URL | Exact observed variants |
|---|---|
| `https://aurorasolar.com/` | `https://aurorasolar.com`<br>`https://www.aurorasolar.com/` |
| `https://blend.com/` | `https://blend.com/`<br>`https://www.blend.com/` |
| `https://buildingtransparency.org/` | `https://buildingtransparency.org/`<br>`https://www.buildingtransparency.org/` |
| `https://claritisoftware.com/products/civcheck-ai-plan-review-software` | `https://www.claritisoftware.com/products/civcheck-ai-plan-review-software`<br>`https://www.claritisoftware.com/products/civcheck-ai-plan-review-software/` |
| `https://construction.autodesk.com/products/buildingconnected` | `https://construction.autodesk.com/products/buildingconnected`<br>`https://construction.autodesk.com/products/buildingconnected/` |
| `https://eliseai.com/` | `https://eliseai.com/`<br>`https://www.eliseai.com/` |
| `https://funnelleasing.com/` | `https://funnelleasing.com`<br>`https://funnelleasing.com/`<br>`https://www.funnelleasing.com/` |
| `https://getjones.com/` | `https://getjones.com`<br>`https://getjones.com/` |
| `https://helloalfred.com/` | `https://helloalfred.com/`<br>`https://www.helloalfred.com/` |
| `https://higharc.com/` | `https://higharc.com/`<br>`https://www.higharc.com/` |
| `https://hqo.com/` | `https://www.hqo.com`<br>`https://www.hqo.com/` |
| `https://juno.co/` | `https://juno.co/`<br>`https://www.juno.co` |
| `https://lula.life/` | `https://lula.life`<br>`https://lula.life/` |
| `https://measurabl.com/` | `https://www.measurabl.com`<br>`https://www.measurabl.com/` |
| `https://northspyre.com/` | `https://northspyre.com/`<br>`https://northspyre.com/?hsLang=en`<br>`https://www.northspyre.com/`<br>`https://www.northspyre.com/?hsLang=en` |
| `https://passivelogic.com/` | `https://passivelogic.com`<br>`https://www.passivelogic.com/` |
| `https://predictap.com/` | `https://www.predictap.com`<br>`https://www.predictap.com/` |
| `https://propertyshield.co/` | `https://propertyshield.co`<br>`https://propertyshield.co/` |
| `https://proq.com.bd/` | `https://proq.com.bd/`<br>`https://www.proq.com.bd/` |
| `https://ret.vc/portfolio` | `https://www.ret.vc/portfolio`<br>`https://www.ret.vc/portfolio/` |
| `https://smartrent.com/` | `https://smartrent.com`<br>`https://smartrent.com/` |
| `https://vergesense.com/` | `https://vergesense.com`<br>`https://vergesense.com/` |

## Files contributing citations

| Source file | URL occurrences |
|---|---:|
| `research/built_environment_ecosystem_discovery_index.csv` | 1217 |
| `research/yc_real_estate_construction_directory_2026-08-30.csv` | 257 |
| `research/proptech_startups_agent.csv` | 221 |
| `research/global_real_estate_pioneers_agent.csv` | 179 |
| `JCX_Global_PropTech_Intelligence_Atlas_2026-08-30.md` | 152 |
| `research/proptech_startup_universe.md` | 126 |
| `research/startup_coverage_additions.csv` | 120 |
| `research/coverage_gap_additions.csv` | 117 |
| `research/regional_companies_agent.csv` | 102 |
| `research/regional_proptech_landscape.md` | 96 |
| `research/standards_interoperability_governance.md` | 91 |
| `research/startup_core_additions.csv` | 84 |
| `research/global_real_estate_pioneers.md` | 75 |
| `JCX_Second_Pass_Strategy_PropTech_Startups_2026-08-29.md` | 68 |
| `research/operator_coverage_additions.csv` | 68 |
| `research/enterprise_platform_additions.csv` | 61 |
| `research/build_ecosystem_discovery_index.py` | 47 |
| `research/coverage_gap_audit.md` | 46 |
| `JCX_Meeting_Dossier_2026-08-29.md` | 44 |
| `research/quantified_outcome_case_library.csv` | 44 |
| `research/standards_registry.csv` | 39 |
| `research/enterprise_platform_coverage_audit.md` | 37 |
| `research/operator_coverage_final_audit.md` | 37 |
| `research/final_residual_additions.csv` | 33 |
| `research/final_coverage_assurance.md` | 32 |
| `research/built_environment_ecosystem_discovery_index.md` | 30 |
| `research/startup_coverage_final_audit.md` | 21 |
| `research/yc_real_estate_construction_directory_2026-08-30.md` | 20 |
| `research/market_trends_and_failure_lessons.md` | 12 |
| `research/atlas_methodology_and_website_ia.md` | 9 |
| `research/final_corpus_qa.md` | 6 |
| `research/final_integration_qa.md` | 2 |
| `research/discovery_universe_qa.md` | 1 |
| `scripts/build_proptech_master_dataset.py` | 1 |

## Interpretation

- Register coverage describes URL lineage, not whether a source proves a particular claim.
- Company domains, portfolio pages and YC profiles remain discovery/first-party evidence until a claim receives a reviewer, source-quality grade and attribution grade.
- Repeated URLs are retained once in the inventory with occurrence and source-file counts.
- The CSV is the row-level source of truth for the inventory; `data/source_register.csv/json` joins exact variants to normalized URL identities and usage.
