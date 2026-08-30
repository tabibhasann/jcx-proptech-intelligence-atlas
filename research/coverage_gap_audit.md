# Coverage-gap audit — JCX Global PropTech Intelligence Atlas

**Audit date:** 30 August 2026 (Asia/Dhaka)  
**Purpose:** identify material omissions in the current research corpus and recommend a small, evidence-backed addition set for the future atlas. This is a coverage audit, not a ranking and not a vendor-endorsement list.

## Executive verdict

The corpus is already unusually strong on three fronts: (1) global developers, owners, operators, construction firms and corporate venture models; (2) India/MENA/Bangladesh workflows; and (3) the core US/European construction-software and AI landscape. It also has good status discipline around failure cases, acquisitions and the unresolved current identity of Bproperty.

The main weakness is not a lack of famous US companies. It is **geographic and category skew**:

1. Latin America is materially underrepresented. QuintoAndar, Loft, La Haus, Habi, Houm, Clau and GoJom cover different models—rental, mortgage, developer distribution, instant-buying, brokerage and data—and should be present.
2. Africa is represented mainly by Bangladesh-adjacent signals and MENA. The atlas needs at least one pan-African search network, one South African portal, a Nigerian portal/data company and a land-verification case. Property24, Nigeria Property Centre, Private Property Nigeria, Estate Intel and HouseAfrica fill distinct gaps.
3. The UK/Europe operations and climate layer is thin relative to the quality of the rest of the corpus. Plentific, Qualis Flow, Elyos AI, Kestrix, Orbital Witness, Searchland and Deepki add property operations, embodied carbon, field-service agents, energy surveyance, legal/title diligence, land sourcing and portfolio decarbonization.
4. The industrial/software backbone is undercounted. Bentley Systems, Trimble, Hexagon and Nemetschek are not “startups,” but omitting them makes the digital-twin, survey, BIM and lifecycle story misleading. Dusty Robotics, Built Robotics, ICON and FBR supply concrete construction-robotics comparators.
5. Southeast Asia needs a stronger end-to-end residential and managed-rental layer. Pinhome, Travelio and Livspace add Indonesia and the design-to-install/handover workflow.
6. The YC list is broad but selective. The existing file captures many current YC names, but misses several relevant 2024–2026 workflow companies—Propaya, Assembly HOA, RentFlow, inBuild, FlexDesk, PermitFlow, WeReno, Paces, Material Depot, Agave, Apply Design and Stairs Financial. These belong in the emerging layer, never in the same evidence tier as deployed enterprise platforms.

The companion [coverage-gap additions CSV](./coverage_gap_additions.csv) contains 45 additions. The most important additions are marked Tier 1 or Tier 2; the remaining entries are deliberate category or geography context. It is better to add these 45 with clear caveats than to add hundreds of poorly verified logos.

## Method and evidence boundary

I compared the three existing organization datasets—[global pioneers](./global_real_estate_pioneers_agent.csv), [startups](./proptech_startups_agent.csv) and [regional companies](./regional_companies_agent.csv)—against:

- the official [YC PropTech directory](https://www.ycombinator.com/companies/industry/proptech), [YC Real Estate directory](https://www.ycombinator.com/companies/industry/real-estate), and [YC Real Estate & Construction directory](https://www.ycombinator.com/companies/industry/real-estate-and-construction), checked at the stated 2026 cut-off;
- official ecosystem portfolios from [Pi Labs](https://pilabs.vc/portfolio?sort=date_desc), [MetaProp](https://www.metaprop.com/portfolio), [Fifth Wall](https://www.fifthwall.com/portfolio), [Brick & Mortar Ventures](https://brickmortar.vc/portfolio), [Taronga RealTechX](https://tarongagroup.com/realtechx/), [NAR REACH](https://www.nar-reach.com/), and [JLL Spark](https://spark.jllt.com/);
- official company pages, public-company/marketplace pages and government or regulator pages for the proposed additions.

An addition was considered material if it met at least one of these tests: (a) a regional category leader or network-effect platform; (b) a missing lifecycle or technology layer; (c) a plausible JCX design-pattern benchmark; (d) a credible current YC/accelerator signal with a clear workflow; or (e) a major infrastructure software layer that the atlas would otherwise misrepresent. Accelerator membership is discovery evidence, not customer validation. Company-reported scale, savings and funding remain explicitly labeled as such.

## Coverage matrix

| Region / layer | Current corpus | Audit judgment | Priority |
|---|---|---|---|
| Bangladesh | Strong: ERP, JV/shareholder governance, procurement, maps, portals and land-system context | The local workflow thesis is the strongest part. Continue verifying legal entities, customers, uptime, APIs and outcomes. | Maintain, do not add volume |
| India | Strong: Sell.Do/Aurum, Landeed, Infra.Market, Powerplay, Facilio, Zenatix, NoBroker | Good coverage; Livspace is the main missing handover/fit-out model. | P2 |
| MENA | Strong: UAE/Saudi/Egypt marketplaces, procurement, mortgage, tokenization and regulators | Add Property Finder and Dubizzle/Bayut as the two major omitted platform/data models; Mubawab adds Maghreb. | P1 |
| Europe / UK | Partial: PlanRadar, LandTech, construction majors and some climate tools | Add property operations, title diligence, land data, embodied carbon and energy surveyance. | P1 |
| Latin America | Thin: Bproperty context and scattered YC names | Major gap; add QuintoAndar, Loft, La Haus, Habi, Houm, Clau and GoJom. | P0 |
| Africa | Thin | Add portals plus data and land-verification models; distinguish Africa from MENA. | P0 |
| Southeast Asia | Moderate: PropertyGuru, 99 Group, Homebase, Express Building, Singapore/Japan signals | Add Pinhome, Travelio and Livspace; preserve country-level distinctions. | P1 |
| Japan / Australia | Moderate: GA/RENOSY, Housmart, Archistar, Nearmap and major firms | FBR is the most material missing Australia robotics case. Japan has no urgent addition after current coverage. | P2 |
| BIM / digital twins / geospatial | Partial: Autodesk, Matterport, Nearmap, Barikoi, reality capture vendors | Bentley, Trimble, Hexagon and Nemetschek are too important to omit from the technology backbone. | P0 |
| Construction robotics | Partial: reality capture, AI progress, equipment and materials | Add Dusty, Built Robotics, ICON and FBR; show maturity and deployment limits. | P1 |
| Property operations | Moderate: Yardi/MRI/AppFolio/Entrata, Facilio, SmartRent, ButterflyMX | Add Plentific and selected YC AI operations companies; do not mistake agent demos for proven autonomy. | P1 |
| Climate / energy | Moderate but North America-heavy | Deepki, Kestrix and Qualis Flow strengthen EU/UK data, energy and embodied-carbon coverage. | P1 |
| Transactions / finance | Strong US/India/MENA; thin Latin America | Loft, QuintoAndar, Habi and La Haus give better full-funnel comparators. | P1 |
| Affordability / inclusion | Partial: Homebase, housing programs, fractional cautions | Stairs Financial is an emerging discovery case; keep affordability outcomes separate from lead-generation claims. | P2 |

## Highest-priority additions

### P0 — add to the atlas anchor layer

**QuintoAndar** is the missing Latin American platform benchmark: online rental and sale, direct owner/tenant workflow, embedded services, data products and a developing B2B ecosystem. Its official newsroom reports 15,000+ new rental contracts and 3,000+ monthly sales; these remain company-reported. See [About](https://www.quintoandar.com.br/newsroom/en/about/) and [QuintoAndar for Business](https://www.quintoandar.com.br/forbusiness).

**Loft** is a different model: a technology, financial and commercial operating layer for Brazilian real-estate agencies, with CRM, digital signatures, rent guarantees, financing and rental administration. Its official institutional page reports 9,000+ partner agencies and R$10bn of 2024 credit origination; store these as dated company claims. See [Loft institutional](https://loft.com.br/para-imobiliarias/institucional-loft/) and [solutions](https://loft.com.br/para-imobiliarias/).

**Property Finder** and **Dubizzle Group/Bayut** are essential MENA omissions. Property Finder combines listing distribution with historical transactions, data products and AI ranking; its history page records Data Guru, SuperAgent and a 2025 investment round. Bayut/Dubizzle combines portal, data, valuation, DLD-linked transactions and agent tooling; the group officially describes Property Monitor as a market-intelligence/API/valuation platform. See [Property Finder history](https://www.propertyfinder.ae/en/about-us.html), [Dubizzle brands](https://www.dubizzlegroup.com/our-brands/) and [Property Monitor acquisition](https://www.dubizzlegroup.com/dubizzle-group-acquires-property-monitor/).

**Nigeria Property Centre, Property24, Private Property Nigeria and Estate Intel** correct the Africa gap without pretending that Africa has one homogeneous market. Nigeria Property Centre’s official page reports 181,000+ active listings, 18,700 agents/developers and 1.25m monthly seekers across Nigeria, Ghana, Kenya, Uganda and Ethiopia. Property24 describes itself as South Africa’s number-one portal with 300,000+ listings and Naspers ownership. Estate Intel is the data/market-intelligence layer, reporting historic prices, vacancy, project teams and 120+ subscribing companies. Sources: [Nigeria Property Centre](https://nigeriapropertycentre.com/about-us), [Property24](https://www.property24.com/about-us), [Private Property Nigeria](https://privateproperty.ng/about), [Estate Intel](https://estateintel.com/).

**Bentley Systems, Trimble, Hexagon and Nemetschek** should be represented as technology-platform parents, not startups. Bentley’s iTwin connects engineering, reality, GIS, IoT, schedule and enterprise data; Trimble Construction One connects field, financial, scheduling and equipment workflows; Hexagon combines reality capture, cadastral/geospatial and construction QA; Nemetschek spans design, construction and building management through multiple brands. Sources: [Bentley iTwin](https://www.bentley.com/en/products/itwin-platform/), [Trimble Construction One](https://www.trimble.com/en/solutions/trimble-construction-one), [Hexagon Geosystems](https://hexagon.com/company/divisions/geosystems), [Nemetschek solutions](https://www.nemetschek.com/en/solutions).

### P1 — add to deep regional/category comparisons

**La Haus, Habi, Houm, Clau and GoJom** provide complementary Latin American patterns: verified new-home distribution and diligence ([La Haus](https://www.lahaus.com/quienes-somos)); AI/data-supported principal buying and resale ([Habi](https://habi.co/inicio)); managed rental across Chile, Mexico and Colombia ([Houm](https://houm.com/co/quienes-somos)); Mexico marketplace/CRM/mortgage/renovation super-app ([Clau YC](https://www.ycombinator.com/companies/clau)); and a Latin American one-stop marketplace ([GoJom YC](https://www.ycombinator.com/companies/gojom)).

**Mubawab** is the cleanest Maghreb omission: a Morocco/Tunisia portal with multilingual distribution, developer/agency services and data. Its official page reports more than 2m monthly visits and the Jumia House acquisition; mark both as company claims/history. Source: [Mubawab](https://www.mubawab.ma/en/about).

**Plentific, Qualis Flow, Elyos AI, Kestrix, Orbital Witness, Searchland and Deepki** fill different UK/EU gaps. Pi Labs’ current portfolio explicitly lists Plentific as property-operations software, Qualis Flow as photo-based construction decarbonization, Elyos as field-service agents and Kestrix as machine-learning energy surveying. Orbital connects title/lease/search documents; Searchland combines ownership, planning, constraints, infrastructure and APIs; Deepki connects utility data, climate risk, audit-ready reporting and CapEx. Sources: [Pi Labs portfolio](https://pilabs.vc/portfolio?sort=date_desc), [Orbital](https://www.orbital.tech/uk), [Searchland](https://searchland.co.uk/), [Deepki](https://www.deepki.com/platform/).

**Dusty Robotics, Built Robotics, ICON and FBR** complete the robotics story. Dusty is the strongest immediate comparator because it is BIM-driven layout automation and reports customer deployments on hundreds of projects; Built Robotics is autonomous equipment; ICON is robotic concrete printing plus BuildOS; FBR’s Hadrian X is autonomous bricklaying. Sources: [Dusty](https://www.dustyrobotics.com/), [Built Robotics](https://www.builtrobotics.com/), [ICON](https://www.iconbuild.com/technology), [FBR](https://www.fbr.com.au/).

**Pinhome, Travelio and Livspace** add Indonesia and the design/fit-out handover layer. Pinhome describes a property, finance and home-maintenance ecosystem; Travelio combines rental/sale with professional apartment management; Livspace integrates design, materials, manufacturing, installation and warranty. Sources: [Pinhome](https://www.pinhome.id/pages/tentang-kami), [Travelio](https://www.travelio.com/en/faq), [Livspace](https://www.livspace.com/in).

### P2 — emerging/website discovery layer

The YC additions—Propaya, Assembly HOA, RentFlow, inBuild, FlexDesk, PermitFlow, WeReno, Paces, Material Depot, Agave, Apply Design and Stairs Financial—are worthwhile because each represents a concrete workflow: document extraction, HOA operations, rent-risk underwriting, construction payables, corporate real-estate back office, permits, owner’s representation, infrastructure siting, materials, construction financial APIs, virtual staging and affordability benefits. The official YC pages are the evidence source, for example [Propaya](https://www.ycombinator.com/companies/propaya), [inBuild](https://www.ycombinator.com/companies/inbuild), [Agave](https://www.ycombinator.com/companies/agave) and [Paces](https://www.ycombinator.com/companies/paces). They should be displayed with a “YC directory / early-stage” badge and no implied product readiness or Bangladesh fit.

## Category gaps that should shape the website

### 1. The atlas needs a “digital spine” view

The current universe has many point solutions but can understate the platform layer. Add a view that traces: **parcel/title → feasibility → BIM/CDE → procurement → site evidence → sales/inventory → collections/finance → handover → operations/energy**. Bentley, Trimble, Hexagon and Nemetschek are infrastructure examples; JCX’s opportunity is a smaller, local, exportable event/data layer rather than buying a monolithic global suite.

### 2. Separate “portal scale” from “developer operating system”

QuintoAndar, Property Finder, Bayut, Property24, Nigeria Property Centre and PropertyGuru are powerful distribution/data networks. They should not be treated as replacements for JCX’s internal project, unit, customer, collections, procurement and handover records. The website should show a `distribution` relationship and an `internal_system_of_record` relationship separately.

### 3. Make title/land evidence a first-class category

Landeed and LandTech are already strong references; Orbital Witness and Searchland make the UK legal/data layer more complete. HouseAfrica provides an African land-verification experiment. The lesson is not “blockchain proves title.” The durable pattern is source-linked documents, map geometry, authority checks, versioning, human/legal review and a clear confidence state.

### 4. Construction robotics needs a maturity scale

Use a matrix distinguishing (a) software-only, (b) capture/inspection hardware, (c) supervised automation, (d) autonomous equipment and (e) industrialized/offsite production. Dusty and FBR are not interchangeable with Buildots or OpenSpace. For each, capture operating envelope, region, safety supervision, integration requirement, consumables, service network and completed-project evidence.

### 5. Keep “AI” claims subordinate to workflow and outcomes

YC and Pi Labs now expose many AI companies. The website should not sort by AI novelty. Sort by workflow frequency, source-of-truth access, human approval, evidence quality, measurable outcome, local fit and exit/data portability. Store every metric with `claim_type`, `source_date`, `denominator`, `baseline`, `independent_or_vendor`, and `caveat`.

## Duplicates, name collisions and status risks

1. **Homebase collision:** the SEA YC rent-to-own company and unrelated US products/companies can share the name. Use canonical domain plus country and YC batch as identity keys.
2. **Bproperty continuity:** the current domain disclaims affiliation with the historical Bproperty.com Limited. Keep historical investment/EMPG/Dataclassifieds facts separate from the current site and mark current continuity unresolved until contracts and entity records are verified.
3. **Parent/brand collisions:** `Aurum PropTech → Sell.Do`, `GA technologies → RENOSY`, `Mitsui Fudosan → 31VENTURES`, `Mubadala → Masdar City`, `Dubizzle Group → Bayut / Property Monitor`, and `Nemetschek → Bluebeam / Graphisoft / Spacewell / Solibri / dTwin` are relationships, not duplicate companies.
4. **Acquired products:** PlanGrid, BuildingConnected and Matterport are not independent current vendors in the same sense after Autodesk/CoStar ownership; Fieldwire is Hilti-owned; HoloBuilder’s status needs periodic recheck; YC Cobblestone is marked acquired. Keep product lineage and owner fields.
5. **Historical failures:** Zillow Offers, Katerra, WeWork and Veev should remain in a negative/outcome library, not active vendor filters. An old domain or customer logo is not current availability.
6. **YC status drift:** YC’s directory is a discovery index and can change status, description, employee count and URL. Save a dated snapshot and re-open pages before publication.
7. **Outcome inflation:** most vendor customer stories are useful hypotheses, not controlled trials. Keep the existing outcome CSV’s baseline/denominator/counterfactual structure and do not aggregate self-reported percentages into a market-wide “ROI.”

## Deliberately not added

- Generic large developers whose public websites show projects but no documented technology practice. They belong in a buyer/design-partner directory, not a PropTech benchmark.
- “BPC” Bangladesh, because the current research found no defensible property-technology entity under that name.
- A long tail of property portals where the only evidence is a stale directory, social account or copied listing. The Africa additions are included because they have official, dated scale/product pages.
- Every logo in every accelerator portfolio. Pi Labs, MetaProp, Fifth Wall, Taronga and NAR REACH are discovery sources; their portfolio membership alone does not establish current operation, customer value or local fit.
- More US consumer iBuying, co-living and tokenization companies. The corpus already has enough examples to discuss the model risks; adding more would worsen geographic and workflow skew.

## QA and normalization notes

The additions file uses the same 22-column structure as the startup universe, parses as standard CSV, contains 45 unique organization names and has a source URL plus verification date on every row. It should be merged only after entity resolution against canonical domains, not by fuzzy display name alone. Recommended merge keys:

```text
canonical_domain + legal_entity (when known)
brand_parent relationship
country / operating region
status_checked_at
```

Before publication, run a link-status check, re-open all YC pages, and mark any source that has moved or become inaccessible. Preserve a raw-source snapshot or archived copy for claims that drive a score. Do not erase old records: append a review event and change `status` with a reason.

## Recommended next audit

After merging this addition set, run one more audit against the final normalized master file for: (1) duplicate domains and parent/brand edges; (2) all lifecycle×region cells with fewer than two evidence-backed organizations; (3) stale status older than 180 days; (4) claims without denominators; (5) source links returning errors; and (6) missing Bangladesh transferability notes. The resulting gaps—not another logo scrape—should determine the next research sprint.
