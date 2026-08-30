# JCX quantified PropTech outcome case library

**Verification date:** 30 August 2026  
**Structured companion:** [`quantified_outcome_case_library.csv`](./quantified_outcome_case_library.csv)  
**Scope:** 44 source-backed cases across land and feasibility, design/BIM, construction, procurement, sales and CRM, property operations, smart buildings, ESG, real-estate data, mortgage/closing, and failure/restructuring.

## How to read this library

This is an evidence layer, not a list of vendor promises. Every row in the CSV carries the organization/customer, vendor or intervention, geography, lifecycle, baseline, intervention, measured result, time/sample context, source type, evidence grade, causal caveat, Bangladesh/JCX transferability note, direct URL, and verification date.

The majority of public PropTech outcome evidence is a customer story published or selected by a vendor. That can be useful for generating hypotheses and designing a pilot, but it is not the same as an independently audited experiment. The source type and caveat are therefore deliberately prominent.

Evidence grades used here:

- **A1:** filing, court/official record, or other high-confidence accounting/status fact. It may establish that an event or loss occurred, but not that a particular product caused it.
- **B2:** customer/partner result with a reasonably specific metric and denominator or process comparison, but not an independent causal study.
- **B3:** customer/vendor result with a quantified metric but missing baseline, denominator, control, or independent validation. Treat as a pilot hypothesis.

The strongest comparisons in this corpus are before/after process measures with an explicit baseline (for example, a purchase order falling from 32 to 7 minutes). The weakest are “productivity uplift” or “savings potential” claims without raw counts. A future JCX website should show the grade, source type, date, and a “what is not known” drawer on every case card.

## Executive findings

1. **The most transferable wins are workflow wins.** Common data environments, digital approvals, automated purchase orders, searchable site records, resident portals, and CRM lead routing repeatedly produce measurable time reductions before advanced AI is required.
2. **The best quantified outcomes connect a workflow to a unit.** Examples include minutes per purchase order, hours per week, days to approve a submittal, kWh per building, dollars per file, or conversions from a stated denominator.
3. **Construction reality capture is unusually measurable.** OpenSpace and Autodesk cases report hours saved, imagery throughput, rework avoided, approval speed, and schedule effects. It is a practical reference for JCX because a digital record can support progress, quality, payment, handover, and disputes simultaneously.
4. **Energy is attractive but measurement discipline matters.** BrainBox, Measurabl, and Facilio cases show material savings, but weather normalization, occupancy, comfort, tariff changes, and baseline selection must be retained in the data model.
5. **Sales automation can move a funnel, not just a dashboard.** Raymond Realty reports conversion moving from 5% to 12%; UEM Sunrise reports sales, NPS, unsold inventory, and PII outcomes; RE/MAX reports lead and customer growth. These are useful designs for a JCX website-to-CRM-to-site-visit funnel, but not proof that the platform alone caused the lift.
6. **Negative cases are essential.** Zillow’s FY2021 filing records a $407.9m inventory write-down during the Offers wind-down. WeWork’s restructuring documents quantify debt and lease changes. These cases prevent a “technology always wins” narrative and make risk controls part of the analysis.
7. **Do not compare unlike units.** “4x jobs,” “4x orders per day,” “10x productivity,” “2x click-through,” and “50% energy reduction” are not interchangeable. The website should preserve metric type, denominator, time window, and whether the result is observed, estimated, modeled, or potential.

## Case index by decision area

| Decision area | Cases | What to learn |
|---|---:|---|
| L1 land/site feasibility | QOC-001–004 | Rapid scenario generation can reduce non-billable analysis time, but models must use local parcel, zoning, flood, cost, and approval data. |
| L4 design and BIM | QOC-005–010 | A shared data environment and model-based quantities reduce drawing duplication, coordination lag, takeoff effort, and avoidable rework. |
| L5 construction visibility | QOC-011–018 | Reality capture, progress tracking, and BIM comparison create auditable site truth for quality, schedule, billing, and remote management. |
| L5 procurement and closeout | QOC-019–024 | Digitized purchase orders, submittals, quality, and subcontract workflows convert admin time into traceable project execution. |
| L7–L9 property operations | QOC-025–029 | Resident/owner portals, PMS consolidation, digital twins, and remote inspections improve service and scale without assuming headcount growth. |
| L8–L10 smart buildings and ESG | QOC-030–034 | HVAC optimization and energy data can produce kWh, carbon, cost, compliance, and comfort outcomes, provided baselines are governed. |
| L3/L9 data and portfolio | QOC-035–036 | Structured market data can compress research and increase assessment or broker capacity; provenance is the core product. |
| L6 sales/CRM | QOC-037–040 | Customer 360, journey automation, partner apps, and digital launches make lead-to-booking stages measurable. |
| L3 finance/closing | QOC-041–042 | Digital closing can reduce appointment time, errors, printing, funding cycle time, and cost per file; legal and KYC constraints are local. |
| Negative/restructured | QOC-043–044 | Inventory, lease, capital, and market risk can overwhelm a digital narrative; hard guardrails matter. |

## Detailed outcome cards

### L1 — Land, site selection, and feasibility

**QOC-001 — Motif Architects × TestFit (United States).** A two-person firm completed a winning site/programming study in three weeks and reported 160 hours saved per feasibility study while staying within its target fee. This is a B3 vendor-published customer estimate with no independent time study. JCX use: a rapid site-screening layer that separates scenario generation from legal/engineering approval.

**QOC-002 — Ware Malcomb × TestFit (United States).** Site planning fell from at least three days to half a day, with more than $200,000 in non-billable hours saved in the first year. The number of studies and labor logs are not disclosed. JCX use: prioritize a quantified “hours per site” metric before claiming financial ROI.

**QOC-003 — TruSteel Buildings × TestFit (United States).** Preliminary self-storage evaluation moved from up to one week to two hours, described as 20x faster; annual output rose from 100 to 400 jobs and 280+ studies were completed. The customer story does not isolate tool impact from demand or staffing. JCX use: fast response to land opportunities, with local zoning and cost data validated separately.

**QOC-004 — Cascadia Partners × TestFit (United States).** In a City of Lebanon, Oregon analysis, feasibility modeling reduced the modeled minimum feasible housing price by 28% while fitting twice as many units per acre. The prior workflow for ten prototypes was described as 20 hours/$6,000. This is a modeled feasibility result, not a delivered project. JCX use: show “scenario output,” not guaranteed project economics.

### L4 — Design, BIM, and common data environments

**QOC-005 — Norconsult × Autodesk Platform Services/Construction Cloud (Norway).** The Sotra Bridge design connected 60 million data points across experts in 45 countries and three continents, reduced traditional drawings by 99.5%, completed design-to-preconstruction in under two years, and reduced total hours by 3%. The project is an exceptional digital-engineering case; it is not a controlled comparison. JCX use: model APIs and a common data environment as the digital spine.

**QOC-006 — Consti/Granlund project × Autodesk Construction Cloud (Finland).** A hospital team estimated normal annual site rework at about 200 hours, versus 10–20 hours on the project using the shared model and digital redlines; redline time was cut in half. It is a customer estimate with no independent audit. JCX use: make drawings, RFIs, revisions, and approval history searchable.

**QOC-007 — Boustead Projects × Autodesk Forma (Singapore).** On a semiconductor facility, 4D BIM, LiDAR, photogrammetry, and cloud workflow were reported to reduce clashes by 60%, rework by 20%, and improve efficiency by 30%; some approvals fell from five days to one day or hours, and handover phases saved months. These are vendor/customer estimates with overlapping metrics and undisclosed denominators. JCX use: model-to-site verification plus approval SLAs.

**QOC-008 — Obayashi Singapore × Autodesk Construction Cloud (Singapore).** Obayashi reports 432 work hours saved per week, equivalent to a 32.5% productivity gain on a 40-hour-week basis; model-transfer time fell 32.5% and floor-review time by half. The calculation is management-reported. JCX use: role-based time baselines for document controllers, BIM managers, and site teams.

**QOC-009 — Arcadis × Autodesk BIM Collaborate Pro (United States).** The Collins Park project saved more than 1,000 design hours and cut file-transfer lag by 80%, helping meet a tight bid deadline. Project and period denominators are not disclosed. JCX use: connect consultant, contractor, and owner changes in one traceable model.

**QOC-010 — IMC Construction × Autodesk Assemble/Construction Cloud (United States).** Model-based takeoff reduced takeoff time 40%, variance-report creation 70%, and trending-report creation 40%. The case does not publish absolute hours or an independent audit. JCX use: BOQ extraction, tender comparison, and variation control are good early automation targets.

### L5 — Construction progress, quality, and handover

**QOC-011 — Saunders Construction × Trimble Connected Progressive Scanning Workflow (United States).** At One River North Residences, the partner sustainability report measured 1,164% ROI and 31.2%/144 tCO2e GHG savings otherwise associated with rework materials. The ROI combines labor and estimated avoided correction cost; the counterfactual is modeled. JCX use: test progressive scanning on high-value structural work.

**QOC-012 — Intel × Buildots (United States/EMEA).** Across complex fab projects with 50,000+ activities, Buildots reports 4.3% rework-cost savings per fab, four construction weeks avoided per fab, and 1,176 model updates per fab. The page headline elsewhere says six weeks, while its detailed result says four; the dataset flags this discrepancy. JCX use: require metric reconciliation before publication.

**QOC-013 — NCC × Buildots (Finland).** NCC reports 2.3x more tasks completed on time, 70% less manual reporting, and 68,500 sqm tracked across an initial pilot plus three projects. Raw task counts and the comparison baseline are not provided. JCX use: define percent-plan-complete from raw tasks, not a headline multiplier.

**QOC-014 — Vinci Construction UK × OpenSpace (United Kingdom).** Documentation that previously took at least four hours weekly per user is estimated to save more than 6,000 hours annually after portfolio adoption. The annual estimate aggregates projects and user counts are not disclosed. JCX use: site evidence can serve progress, billing, dispute, and handover workflows.

**QOC-015 — Lendlease project team × OpenSpace (United States).** Documentation was reported as 30x faster than smartphone capture, saving nearly half a workday weekly; the team reported stopping a potential $50,000 change order and capturing 10x more images per week. Avoided cost is a counterfactual. JCX use: build a searchable, timestamped record before closing walls.

**QOC-016 — Novo Construction × OpenSpace (United States).** Automated mapping generated 100x more images, cut capture/upload/mapping labor 95%, and saved five travel hours per week. Project scope and period are not disclosed. JCX use: benchmark image coverage, upload success, and time-to-find-evidence rather than image count alone.

**QOC-017 — Balfour Beatty Texas Buildings × OpenSpace (United States).** Over five months, a prior platform produced 2,135 images in 71.96 hours, while a subsequent project produced 160,474 images in 22.29 hours; the source describes roughly 75x higher capture rate. The projects and crews differ, so the comparison is not controlled. JCX use: treat as capture-throughput evidence, not guaranteed productivity.

**QOC-018 — U.S. Engineering × OpenSpace (United States).** Remote review saved up to 10 hours per week and avoided thousands of dollars in rework; a school-project flight by designers was avoided. “Thousands” has no exact value or denominator. JCX use: measure travel avoided, response time, and issues caught before concealment.

### L5 — Procurement, approvals, quality, and closeout

**QOC-019 — Green Mechanical Construction × Procore (United States).** Purchase-order processing fell from 32 to 7 minutes and per-order cost from $18.23 to $4.73; with 2,000+ POs per year, the customer reported over $30,000 annual PO savings, over $115,000 first-year savings, and 4,000+ hours saved. It is a vendor/customer estimate; savings categories may overlap. JCX use: the cleanest template for measuring a local PO baseline and payback.

**QOC-020 — Alpine Works × Procore (United Kingdom).** The team estimates 30% less admin time and reduced submittal approval time from five days to two days, a 60% reduction. “Up to” and project scope are not disclosed. JCX use: configure approval queues, SLA timers, reminders, and escalation logs.

**QOC-021 — Modigent × Procore (United States).** Closeout time was reduced 50%, or approximately 40 hours per project, while cost, billing, and progress data improved forecasting. The outcome is a customer estimate from an undisclosed project sample. JCX use: link punch lists, O&M manuals, warranties, and asset IDs at handover.

**QOC-022 — The Beck Group × Procore (United States).** The customer reports $100,000 annual savings from automated drawing uploads, 40 hours saved per submittal register, and 25% time savings in quality/safety tools. Metrics are not independently audited or additive. JCX use: consolidate site quality and safety evidence rather than adding isolated apps.

**QOC-023 — Quinn London × C-Link (United Kingdom).** Automated subcontract orders reduced order-prep time 85%, centralized visibility 100%, and increased orders per day 4x. Order counts and time window are not disclosed. JCX use: subcontractor onboarding, signature state, insurance/compliance expiry, and purchase authority.

**QOC-024 — Skanska × Capgemini IBX Purchase-to-Pay (Europe).** Frame-agreement purchasing increased from 15% to 25%, and half of coordinated purchases were ordered through the platform. This is an older (2015) partner case with no monetary saving figure. JCX use: preferred suppliers, price history, and spend compliance are strategic—not just admin—controls.

### L7–L9 — Property operations, resident experience, and digital twins

**QOC-025 — JW Property Services × AppFolio (United States).** On a 330+ unit portfolio, the customer reports 75% less manual work, 50% less AP time, and 60% less communication time. Hours, period, and independent validation are absent. JCX use: resident requests, owner reports, payments, and accounting as one workflow.

**QOC-026 — Rainier Properties × AppFolio (United States).** Across 2,000+ units, resident portal adoption reached 98%, online payment adoption 92%, and bill-entry time fell by four hours per week. The adoption result is measurable but customer-reported. JCX use: design adoption and self-service KPIs into the rollout.

**QOC-027 — Structure Properties × AppFolio (United States).** The customer reports 50–70% less time spent in the software, owner inquiries answered 200% faster, and 40% growth in 18 months across 2,000+ units. Growth cannot be attributed to the platform alone. JCX use: separate service-response metrics from market-driven portfolio growth.

**QOC-028 — Atkinson McLeod × Matterport (United Kingdom).** For a 650-home management business, digital tours were associated with a 50% reduction in physical visits, 2x marketing-email click-through, and 56% of tenants finding tours useful. Survey denominator and leasing conversion are not disclosed. JCX use: virtual tours for diaspora buyers, remote inspections, and searchable visual records.

**QOC-029 — Cushman & Wakefield × Matterport (global).** The firm digitized more than 1,000 properties in under 12 months, expanded to 21 countries, and reported 53% capture-cost savings through a technician network. Leasing conversion and cost denominator are not published. JCX use: establish a reusable digital-twin standard for a multi-project portfolio.

### L8–L10 — Smart buildings, energy, and ESG

**QOC-030 — Asia-Pacific investment manager shopping centre × BrainBox AI (Australia).** A 12-month assessment ending September 2021 reported 25% lower HVAC electricity, 55,513 kWh saved, AUD 9,159.65 removed from the utility bill, and 54 tCO2e reduced; the result supported a rollout to 38 additional buildings. Vendor-calculated and not independently audited. JCX use: a strong pilot design for weather-normalized HVAC measurement.

**QOC-031 — Trane donation/collection facilities × BrainBox AI (United States).** Across more than 120 facilities, Trane reports 1,132 mtCO2e reduced and $329,000 energy savings in the first 18 months. Facility mix and counterfactual baseline are not published. JCX use: portfolio scale matters, but only after controls, meters, comfort, and exception handling are stable.

**QOC-032 — Montreal office building × BrainBox AI (Canada).** In October 2021–February 2022, the case reports 81,066 kWh saved in five months, equal to 11% of building energy and more than CAD 7,600; AHU heating-modulation runtime fell 35%. This is a short winter period and vendor case. JCX use: start with a one-building control group or weather-normalized baseline.

**QOC-033 — Rubenstein Partners × Measurabl Optimize (United States).** From March 2020 to May 2025, the customer reports $629,000 energy cost savings, 6.2M kWh avoided, a 25% portfolio-average ENERGY STAR score increase, certified buildings rising from 10 to 24, and 100% local-regulation compliance. Two individual anomalies saved nearly $5,000 and $6,400. Attribution and normalization are not independently verified. JCX use: centralize meter, compliance, action, and audit data.

**QOC-034 — Dubai World Trade Centre × Facilio (UAE).** The case reports 8% energy wastage reduced within three weeks and up to 15% savings potential identified, alongside better equipment and tenant-service visibility. “Potential” is not realized savings, and building scope/baseline are undisclosed. JCX use: show realized, verified, and potential values as separate states.

### L3/L9 — Real-estate data, valuation, and portfolio decisions

**QOC-035 — MNP × CoStar (Canada).** Centralized property data reduced research time for tax assessments by at least 90% and enabled 50% more assessments per year. The exact count and period are not published. JCX use: comparable data and source provenance can be a high-value product even before predictive AI.

**QOC-036 — JLL × CoStar (Canada).** JLL reports a 50% broker-productivity boost from verified market/off-market data and analytics. The broker/team denominator, time period, and productivity definition are not disclosed. JCX use: keep data freshness, lineage, and confidence visible next to every comparable.

### L6 — Sales, marketing, customer 360, and booking

**QOC-037 — Raymond Realty × Salesforce (India).** Customer 360, a broker app, dashboards, and automated alerts are associated with a 100% increase in presales productivity, conversion moving from 5% to 12% (a 140% relative increase), and escalation falling from 100% to 20% (80% reduction). Sample and period are absent. JCX use: define lead, response, visit, booking, and escalation events before launch.

**QOC-038 — UEM Sunrise Berhad × Salesforce (Malaysia).** The customer reports up to 20% marketing conversion, NPS +60%, 10x productivity, sales +27.8% in 2023, unsold/overhang below 10%, and PII exposure down 90% in six months. These are multiple self-reported outcomes with different denominators. JCX use: governance and PII reduction belong in the product scorecard alongside sales.

**QOC-039 — RE/MAX Romania × HubSpot (Romania).** Across a network described as 75 offices and 1,000 agents, inbound marketing automation is associated with 114% more leads, 24% more customers, and 100% more automated emails. Period and independent funnel data are not disclosed. JCX use: measure qualified leads and cost per booking, not email volume alone.

**QOC-040 — Mahindra Happinest Palghar × Sell.Do/IRIS (India).** A digital-only launch managed 10,000+ leads, 250+ virtual meetings per day, and 300+ bookings in three weeks. Conversion denominator and independent verification are absent, and COVID-19 made the context unusual. JCX use: virtual launch, inventory authority, booking workflow, and payment reconciliation.

### L3 — Mortgage, title, and digital closing

**QOC-041 — Better Mortgage × Snapdocs (United States).** In 2021–2022, the customer reports $6.64m saved, $519 saved per hybrid file, clear-to-close-to-fund 1.5 days faster, fund-to-purchase eight days faster, 2m+ printed pages avoided, and a 10-point NPS lift. The total file denominator is not supplied, and legal/title context is U.S.-specific. JCX use: model per-file cost, cycle time, error, and customer-experience metrics separately.

**QOC-042 — CrossCountry Mortgage × Blend (United States).** Traditional closings of 1.5–2 hours fell to approximately 45 minutes; closers handle 85–120 loans per month and the company reports 0% post-closing signature errors. Period, raw error count, and controlled comparison are not disclosed. JCX use: partner-facing document orchestration may be feasible before JCX enters regulated lending.

### Negative and restructured cases

**QOC-043 — Zillow Offers × Zillow Group (United States).** Zillow’s FY2021 SEC filing records a $407.9m inventory write-down during the wind-down of Zillow Offers. This is an A1 accounting fact, not evidence that software alone caused the loss; market, pricing, renovation, inventory, and operating-model risks were intertwined. JCX control: acquisition automation needs human underwriting, inventory limits, hold periods, and exit triggers.

**QOC-044 — WeWork (United States/global).** WeWork’s restructuring agreement cancelled or equitized approximately $1.5bn of debt and extended about $1.6bn of maturities; later company reporting around emergence described more than $4bn of debt shed and future lease obligations cut in half. This is not a PropTech ROI. JCX control: technology must improve asset economics and flexibility; a digital experience cannot repair structurally mismatched leases and capital.

## Transferability to JCX and Bangladesh

### Highest-priority patterns to test

1. **Digital project spine:** project, parcel, drawing, BOQ, contract, supplier, issue, payment, handover, and asset IDs should be connected. This is the common thread in Autodesk, Procore, OpenSpace, AppFolio, and Salesforce cases.
2. **Lead-to-booking funnel:** website inquiry → source/consent → response SLA → qualification → site/virtual visit → unit/price authority → booking → payment/KYC → service. Raymond Realty, RE/MAX, Mahindra, and UEM Sunrise show why this is more valuable than a brochure site alone.
3. **Procurement control:** requisition → approval → RFQ → bid comparison → PO → delivery confirmation → invoice three-way match → budget/forecast. Green Mechanical, Quinn London, and Skanska provide measurable templates.
4. **Reality-capture handover:** capture progress and concealed work, map to the model and room/asset ID, preserve timestamps, and expose approved records to owner/FM teams. Lendlease, Vinci, Novo, and Matterport are the strongest references.
5. **Energy baseline:** begin with one or two representative buildings, interval meters, weather/occupancy data, comfort constraints, and a pre-declared baseline. BrainBox, Measurabl, and Facilio are hypotheses for value, not a substitute for measurement.

### Bangladesh-specific constraints to model explicitly

- Parcel, title, zoning, approval, and utility data may be fragmented or unavailable through APIs; the atlas must record source quality and human verification.
- Mobile-first, low-bandwidth workflows and offline capture are likely more important than a desktop-only dashboard.
- Bengali/English document, notification, and search support can affect adoption more than feature count.
- Local payment, tax, KYC, title, consumer-protection, and construction-safety requirements need a legal/compliance workstream before automation.
- Contractor and supplier adoption is a network problem. A developer portal that excludes smaller subcontractors will recreate phone/WhatsApp fragmentation.
- Realized savings should be reported in BDT, kWh, tCO2e, hours, days, defects, or conversion rates with the baseline and denominator visible.

## Measurement protocol for future JCX pilots

For each proposed use case, capture a baseline for 2–4 weeks where practical, define the unit of analysis, and pre-register the success metric. Record implementation date, project/site, roles included, volume, exceptions, manual overrides, and any concurrent process change. Report:

`baseline → intervention → observed result → period/sample → confidence/grade → caveat → next decision`

Recommended pilot metrics:

| Use case | Primary metric | Guardrail |
|---|---|---|
| Website/CRM | median lead-response time; qualified-lead-to-visit; visit-to-booking | consent, duplicate leads, source mix, complaint rate |
| Feasibility | hours/site; scenarios/site; % assumptions verified | zoning/title/engineering sign-off |
| Procurement | requisition-to-PO days; PO minutes; price variance; invoice-match rate | approval authority, supplier participation, exceptions |
| Construction | RFI/submittal days; percent-plan-complete; rework hours; defects before concealment | model version, capture coverage, human QA |
| Handover | document completeness; asset-ID coverage; closeout hours/project | owner acceptance, warranty validity |
| Property operations | first-response/resolution time; self-service rate; cost/work order | resident satisfaction, emergency overrides |
| Energy | weather-normalized kWh and cost; peak demand; comfort complaints | occupancy, tariffs, equipment runtime |

## Source and publication rules

The CSV contains the direct source for every case. Prefer the customer’s annual report, filing, government record, or original case PDF where available. Vendor pages are valid evidence of what the vendor/customer publicly claims, not independent validation. Preserve the page’s wording when it says “up to,” “potential,” “estimated,” “avoided,” or “reported.” Do not silently convert a relative increase into a percentage-point increase: Raymond Realty’s 5% to 12% is 7 percentage points or 140% relative growth.

Before publishing a website card, re-check the URL, status, metric, date, denominator, and whether the company has updated or withdrawn the claim. Link the evidence grade to a methodology page and allow corrections. Do not use a single vendor’s case-study portfolio as a market-wide benchmark.

