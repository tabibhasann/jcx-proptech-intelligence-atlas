/**
 * Plain-language synopses for featured records.
 *
 * Each entry is analyst synthesis grounded in the corpus: the attributed
 * claim or case cited is the evidence, and the "unknown" line states the
 * limit. Nothing here invents customers, numbers, or local availability.
 * IDs must match atlas_entities; case IDs must match the case library.
 */

export interface FeaturedSynopsis {
  entityId: string;
  what: string;
  how: string;
  evidence: string;
  evidenceHref: string;
  evidenceLabel: string;
  whyHere: string;
  unknown: string;
  caseIds: string[];
}

export const FEATURED_ORDER = [
  "org-sell-do-33b7307",
  "org-openspace-15aa2fd",
  "org-buildots-abeb197",
  "org-procore-9fbe212",
  "org-planradar-0ba22d1",
  "org-facilio-ee1952a",
  "org-brainbox-ai-f5deb8d",
  "org-testfit-cd578b3",
  "org-aldar-properties-4218e8b",
  "org-proq-cf33256",
  "org-barikoi-0f8853c",
  "org-landeed-505b2d4",
  "org-brick-and-bolt-4809c48",
] as const;

export const LESSON_ORDER = ["org-katerra-0503c58", "org-wework-8768417", "org-zillow-d3dd627"] as const;

const S: Record<string, FeaturedSynopsis> = {
  "org-sell-do-33b7307": {
    entityId: "org-sell-do-33b7307",
    what: "Sell.Do makes sales software for property developers in India. It tracks a buyer from first inquiry through site visits, booking, and after sales service.",
    how: "Leads from each channel enter one system. The system assigns owners, checks live inventory, schedules visits, and follows the booking steps. Managers see the same pipeline the sales team works.",
    evidence:
      "A vendor published case says a Mumbai developer managed more than 10,000 leads and took over 300 bookings in three weeks during a digital only launch. That result is vendor reported, from a pandemic period, without published conversion denominators.",
    evidenceHref: "/evidence#QOC-040",
    evidenceLabel: "Case QOC-040, vendor reported",
    whyHere:
      "The closest mature example of a developer sales system in South Asia, and the most direct reference for connecting inquiry to booking.",
    unknown:
      "Current named customers, local ERP and payment fit, pricing, and support in Bangladesh are not established here. Company scale figures need verification before any procurement step.",
    caseIds: ["QOC-040"],
  },
  "org-openspace-15aa2fd": {
    entityId: "org-openspace-15aa2fd",
    what: "OpenSpace turns 360 degree site photos into a dated visual record of construction. A worker walks the site with a camera, and images pin to the plan by location and date.",
    how: "Teams compare what was built against what was planned, search the record when a dispute arises, and share progress without writing long reports.",
    evidence:
      "A vendor case with a Lendlease project team reports documentation 30 times faster than phone photos, nearly half a workday saved weekly, and one stopped 50,000 dollar disputed change order. The time and avoided cost figures are customer estimates, not independently verified.",
    evidenceHref: "/evidence#QOC-015",
    evidenceLabel: "Case QOC-015, customer estimate",
    whyHere: "Shows how site evidence changes decisions on payment, disputes, and handover.",
    unknown:
      "Coverage depends on capture discipline. Camera connectivity, storage, privacy, and plan readiness need checking on each site.",
    caseIds: ["QOC-015"],
  },
  "org-buildots-abeb197": {
    entityId: "org-buildots-abeb197",
    what: "Buildots compares site imagery with the construction plan and schedule, then flags what is late or off plan.",
    how: "Its models read progress from images and match it to tasks, so managers see trade performance and delay risk instead of subjective reports.",
    evidence:
      "A vendor case with contractor NCC reports 2.3 times more tasks completed on time and 70 percent less manual reporting across four projects. Baselines and raw counts are not fully disclosed. A separate Intel case reports 4.3 percent rework cost saved per fab and four weeks of delay avoided per fab.",
    evidenceHref: "/evidence#QOC-013",
    evidenceLabel: "Cases QOC-013 and QOC-012, vendor reported",
    whyHere: "The clearest bounded AI example in construction: narrow task, named customer, checkable output.",
    unknown:
      "Results need reliable plans and schedules. Two customer stories do not make a general schedule improvement rate.",
    caseIds: ["QOC-013", "QOC-012"],
  },
  "org-procore-9fbe212": {
    entityId: "org-procore-9fbe212",
    what: "Procore is a construction management platform. It holds drawings, procurement, quality checks, costs, and closeout documents where the whole project team works.",
    how: "Purchase orders, approvals, issues, and payments follow set workflows with an audit trail, and connect to finance systems.",
    evidence:
      "A vendor case with Green Mechanical reports purchase order time falling from 32 to 7 minutes and first year savings of 115,000 dollars across more than 2,000 orders. A Modigent case reports about 40 hours saved per project at closeout. Both are customer estimates.",
    evidenceHref: "/evidence#QOC-019",
    evidenceLabel: "Cases QOC-019 and QOC-021, customer estimates",
    whyHere: "Procurement and handover are two of the most transferable workflows for a developer, and these cases show the mechanism and the math to check.",
    unknown:
      "Subscription and implementation cost, adoption effort, and ERP handoff need local diligence. Savings assume staff time converts to cash, which needs its own assumptions.",
    caseIds: ["QOC-019", "QOC-021"],
  },
  "org-planradar-0ba22d1": {
    entityId: "org-planradar-0ba22d1",
    what: "PlanRadar is a mobile tool for site issues, forms, plans, and handover. Site staff log defects with photos, even offline, and managers track closure.",
    how: "Issues get owners and deadlines on the current plan version, so snagging and handover stop living in chat threads.",
    evidence:
      "The corpus records it as a compact example of issue tracking and handover, company reported. No quantified case in this library measures its outcomes, so treat scale and result claims as unverified here.",
    evidenceHref: "/evidence",
    evidenceLabel: "No library case, company reported",
    whyHere: "Handover quality is visible to buyers and easy to pilot on one project.",
    unknown: "Local forms, subcontractor access, language, and export need checking. Independent deployment scale is not established.",
    caseIds: [],
  },
  "org-facilio-ee1952a": {
    entityId: "org-facilio-ee1952a",
    what: "Facilio connects building operations: work orders, assets, equipment data, tenant requests, and energy use in one system.",
    how: "Sensor and equipment readings flow into maintenance schedules and tenant service, so faults and comfort issues get owners instead of bouncing between vendors.",
    evidence:
      "The corpus holds company material on funding and customer work, including a published customer story. No quantified case in this library measures its outcomes with baseline and period, so results stay company reported until reviewed.",
    evidenceHref: "/evidence",
    evidenceLabel: "No library case, company reported",
    whyHere: "Links the post handover world, maintenance plus energy plus tenant experience, that developers often leave to others.",
    unknown:
      "Controls compatibility, meter and sensor readiness, cybersecurity, and service ownership decide whether it works on any specific building.",
    caseIds: [],
  },
  "org-brainbox-ai-f5deb8d": {
    entityId: "org-brainbox-ai-f5deb8d",
    what: "BrainBox AI adjusts heating and cooling by reading building controls plus weather, occupancy, and history.",
    how: "It writes optimized setpoints back to the HVAC system within limits the operator sets, then tracks energy against a baseline.",
    evidence:
      "A vendor case at an Asia Pacific shopping centre reports 25 percent less HVAC electricity over a twelve month assessment, worth 55,513 kWh and 9,159.65 Australian dollars in a year, with rollout to 38 buildings afterward. The result is vendor calculated, and weather and occupancy normalization should be audited.",
    evidenceHref: "/evidence#QOC-030",
    evidenceLabel: "Case QOC-030, vendor calculated",
    whyHere: "Cooling dominates operating cost in hot humid buildings, so the mechanism matters even where the exact percentage will differ.",
    unknown:
      "Controls compatibility, sensor calibration, comfort guardrails, and who is liable when the system acts are the checks before any pilot.",
    caseIds: ["QOC-030"],
  },
  "org-testfit-cd578b3": {
    entityId: "org-testfit-cd578b3",
    what: "TestFit draws fast development options for a site: massing, unit mix, parking, and cost signals in hours instead of weeks.",
    how: "Planners test many layouts against constraints, then carry the promising ones into design with their assumptions visible.",
    evidence:
      "Vendor cases report an architect saving 160 hours per feasibility study, a plan cut from three days to half a day with 200,000 dollars of non billable time saved in a year, and faster turnarounds with more studies completed. All are customer estimates.",
    evidenceHref: "/evidence#QOC-001",
    evidenceLabel: "Cases QOC-001 to QOC-004, customer estimates",
    whyHere: "Feasibility speed changes which sites get tested and how honestly options are compared.",
    unknown:
      "Local zoning, floor area rules, flood and cost data decide whether the output is useful. The tool cannot replace local approvals or demand judgment.",
    caseIds: ["QOC-001", "QOC-002", "QOC-003", "QOC-004"],
  },
  "org-aldar-properties-4218e8b": {
    entityId: "org-aldar-properties-4218e8b",
    what: "Aldar is a large Abu Dhabi developer used here as a Gulf benchmark for running sales and customer service on owned digital platforms.",
    how: "Its apps and portals carry listings, transactions, agreements, and community services, with startup pilots feeding the same operating model.",
    evidence:
      "Company material for 2024 reports 4.2 million platform visits, 45 percent international traffic, over 70 percent customer usage of its Live Aldar app, and 92 percent of sales agreements completed digitally. These are company reported figures, and definitions and denominators should travel with any chart.",
    evidenceHref: "/methodology",
    evidenceLabel: "Company reported 2024, definitions apply",
    whyHere: "Shows what a developer controlled buyer journey looks like at scale: one record from browsing to agreement to service.",
    unknown: "The figures do not prove what caused them, and Gulf conditions do not transfer directly to Bangladesh.",
    caseIds: [],
  },
  "org-proq-cf33256": {
    entityId: "org-proq-cf33256",
    what: "ProQ is an early Bangladesh startup for construction procurement. It lists suppliers, compares quotes, and moves requests toward orders.",
    how: "Buyers post requirements, discover suppliers, negotiate, and order through one workflow instead of phone calls and chat.",
    evidence:
      "Public signals include a national press report on phone and chat based procurement and the company's own site and LinkedIn page. No long term outcome data exists. Treat as a bounded pilot candidate, not a recommendation.",
    evidenceHref: "/atlas/org-proq-cf33256",
    evidenceLabel: "Early signal, pilot stage",
    whyHere: "Makes the local procurement problem concrete and testable on one project.",
    unknown:
      "Supplier checks, delivery and quality control, ERP handoff, disputes, security, pricing, and team capacity all need diligence.",
    caseIds: [],
  },
  "org-barikoi-0f8853c": {
    entityId: "org-barikoi-0f8853c",
    what: "Barikoi builds mapping and address data for Bangladesh: places, addresses, and location tools other software can use.",
    how: "Apps query its maps for search, catchment, delivery, and site context where global maps are thin.",
    evidence:
      "Company material plus a reported investment signal exist, company reported. Coverage claims need field testing.",
    evidenceHref: "/atlas/org-barikoi-0f8853c",
    evidenceLabel: "Early signal, company reported",
    whyHere: "Reliable addresses and catchments sit under site choice, delivery, sales visits, and service.",
    unknown:
      "Map coverage is not title or parcel accuracy, planning approval, or proof of customer deployment. Accuracy and data rights need validation.",
    caseIds: [],
  },
  "org-landeed-505b2d4": {
    entityId: "org-landeed-505b2d4",
    what: "Landeed works on land title evidence in India: title search records assembled into a checkable ownership picture.",
    how: "It pulls registry and document signals into one workflow with parties, documents, and review steps.",
    evidence:
      "Recorded as a trust critical benchmark in the launch selection, analyst view. State level integrations and legal conditions are India specific.",
    evidenceHref: "/atlas/org-landeed-505b2d4",
    evidenceLabel: "Benchmark, analyst view",
    whyHere: "Shows what a serious land evidence workflow looks like, which is the right ambition for document heavy land environments.",
    unknown: "Nothing about Indian registry integration transfers to Bangladesh. Never describe it as title verification here.",
    caseIds: [],
  },
  "org-brick-and-bolt-4809c48": {
    entityId: "org-brick-and-bolt-4809c48",
    what: "Brick and Bolt productizes house building in Indian cities: design packages, managed contractors, milestone payments, quality checks, and digital tracking.",
    how: "Customers pick a managed path, and the company coordinates contractors and payments against checked stages.",
    evidence:
      "Company scale and quality claims exist but are not independently proven here. City economics, complaints, contractor controls, and service intensity all matter.",
    evidenceHref: "/atlas/org-brick-and-bolt-4809c48",
    evidenceLabel: "Company reported, not proven here",
    whyHere: "The most relevant South Asian model for making fragmented design to build work legible to a buyer.",
    unknown: "Quality systems, contractor oversight, and unit economics need diligence city by city.",
    caseIds: [],
  },
  "org-katerra-0503c58": {
    entityId: "org-katerra-0503c58",
    what: "Katerra combined design, factories, procurement, software, and project delivery, then filed for Chapter 11 in 2021.",
    how: "Vertical integration multiplied execution risk instead of cancelling it: utilization, working capital, and project margins all had to hold at once.",
    evidence:
      "Court and press records establish the filing and shutdown of the prior form. The lesson is about capital and execution, not a verdict that its tools had no value.",
    evidenceHref: "/evidence",
    evidenceLabel: "Filing record, historical lesson",
    whyHere: "A warning against applying software growth assumptions to factories and projects.",
    unknown: "Which parts of its methods survived elsewhere is not tracked here.",
    caseIds: [],
  },
  "org-wework-8768417": {
    entityId: "org-wework-8768417",
    what: "WeWork paired flexible customer commitments with long fixed leases and rapid expansion, then restructured through Chapter 11 in 2023 to 2024.",
    how: "Lease duration and downside exposure, not the app layer, decided the outcome.",
    evidence:
      "SEC filings and company announcements record about 1.5 billion dollars of debt cancelled or equitized plus extended maturities in the 2023 agreement, with deeper cuts at emergence. Office demand and lease terms drove the outcome more than any software.",
    evidenceHref: "/evidence#QOC-044",
    evidenceLabel: "Case QOC-044, filing grade",
    whyHere: "Digital experience cannot repair lease economics. Utilization and downside exposure are first order product metrics.",
    unknown: "Current operating form is outside this lesson; read the profile for status.",
    caseIds: ["QOC-044"],
  },
  "org-zillow-d3dd627": {
    entityId: "org-zillow-d3dd627",
    what: "Zillow wound down its Offers home buying arm after pricing and operational risk concentrated on its own balance sheet.",
    how: "Forecasting uncertainty met home acquisition, renovation, capacity, market, and capital risk at the same time.",
    evidence:
      "The FY2021 SEC filing records a 407.9 million dollar inventory write down. The figure is a high confidence accounting fact; it does not prove software alone caused the loss.",
    evidenceHref: "/evidence#QOC-043",
    evidenceLabel: "Case QOC-043, filing grade",
    whyHere: "A guardrail for any automated buying or pricing: human underwriting, inventory limits, and exit triggers first.",
    unknown: "Zillow the company continued; only the Offers model ended.",
    caseIds: ["QOC-043"],
  },
};

export const getSynopsis = (entityId: string): FeaturedSynopsis | undefined => S[entityId];
