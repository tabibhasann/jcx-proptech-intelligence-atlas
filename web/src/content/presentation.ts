export type EvidenceLevel = "Official" | "Reported" | "Company-reported" | "Interpretation" | "Open question";

export type PresentationSource = {
  id: string;
  label: string;
  url: string;
  note: string;
  level: EvidenceLevel;
};

export const presentationSources: PresentationSource[] = [
  {
    id: "S01",
    label: "Rightmove FY2024 results",
    url: "https://www.rns-pdf.londonstockexchange.com/rns/7946Y_1-2025-2-27.pdf",
    note: "Company results and annual-report material. The figures are reported by the company and describe the listed portal model, not the whole property market.",
    level: "Official",
  },
  {
    id: "S02",
    label: "REA Group annual report",
    url: "https://cdn.rea-group.com/wp-content/uploads/2024/08/09085646/Annual-Report-to-shareholders.pdf",
    note: "Listed portal and property-services reporting. Country and product mix matter when comparing it with a new market.",
    level: "Official",
  },
  {
    id: "S03",
    label: "Info Edge FY2024-25 annual report",
    url: "https://www.infoedge.in/pdfs/Report_filings/InfoEdge_Annual_Report_2025.pdf",
    note: "Listed-company reporting for 99acres. Billings and operating loss belong to the reported period and business scope, not to every property portal.",
    level: "Official",
  },
  {
    id: "S04",
    label: "Redfin 2024 Form 10-K",
    url: "https://www.sec.gov/Archives/edgar/data/1382821/000138282125000046/rdfn-20241231.htm",
    note: "Regulatory filing. Revenue, loss, cash and operating detail are accounting measures; they do not isolate the effect of one product decision.",
    level: "Official",
  },
  {
    id: "S05",
    label: "Compass 2024 Form 10-K",
    url: "https://www.sec.gov/Archives/edgar/data/1563190/000156319025000050/comp-20241231.htm",
    note: "Regulatory filing for a brokerage model. Revenue is not the same as gross property value or collected commission for one market.",
    level: "Official",
  },
  {
    id: "S06",
    label: "Zillow 2024 Form 10-K",
    url: "https://www.sec.gov/Archives/edgar/data/1617640/000161764025000016/z-20241231.htm",
    note: "Filing record for Zillow Offers. The shutdown is verified; the evidence does not prove a single-cause explanation.",
    level: "Official",
  },
  {
    id: "S07",
    label: "Zillow FY2024 shareholder letter",
    url: "https://investors.zillowgroup.com/files/doc_earnings/2024/q4/presentation/Zillow-4Q24-Shareholders-Letter.pdf",
    note: "Company letter for rental activity and financial context. It is official company reporting, not independent proof of a local transfer.",
    level: "Company-reported",
  },
  {
    id: "S08",
    label: "Opendoor 2024 Form 10-K",
    url: "https://www.sec.gov/Archives/edgar/data/1801169/000180116925000017/open-20241231.htm",
    note: "Filing record for an inventory-led model. Inventory, cash use and contribution metrics need to be read together.",
    level: "Official",
  },
  {
    id: "S09",
    label: "KE Holdings 2024 results exhibit (unaudited)",
    url: "https://www.sec.gov/Archives/edgar/data/1809587/000110465925025377/tm259643d1_ex99-3.htm",
    note: "SEC results exhibit with unaudited condensed financial information. Use the separate 20-F for audited annual-report and ACN context.",
    level: "Official",
  },
  {
    id: "S10",
    label: "QuintoAndar newsroom",
    url: "https://www.quintoandar.com.br/newsroom/quintoandar-ultrapassa-r-20-bi-em-valores-transacionados-em-um-ano/",
    note: "Company-reported operating and financing updates. Use as evidence of model choices and disclosed progress, not as independent validation.",
    level: "Company-reported",
  },
  {
    id: "S11",
    label: "Propzy closure reporting",
    url: "https://e.vnexpress.net/news/companies/proptech-startup-propzy-to-close-up-shop-4511207.html",
    note: "Reported closure and suspension. This is a useful counterexample, but press reporting cannot establish every internal cause.",
    level: "Reported",
  },
  {
    id: "S12",
    label: "IMF experimental Dhaka residential property price index",
    url: "https://www.imf.org/en/publications/technical-assistance-reports/issues/2024/09/20/bangladesh-technical-assistance-report-report-on-residential-property-price-index-rppi-555067",
    note: "Experimental index work highlights the data and methodology burden. It is not a bank-grade live valuation index.",
    level: "Official",
  },
  {
    id: "S13",
    label: "Bangladesh Bank annual report extract",
    url: "https://www.bb.org.bd/pub/annual/anreport/ar2024-2025.pdf",
    note: "Official housing-credit context. The stock figure is kept provisional in the research package and is not independently recomputed here.",
    level: "Official",
  },
  {
    id: "S14",
    label: "Bangladesh Ministry of Land, e-mutation",
    url: "https://mutation.land.gov.bd/",
    note: "Official land-service context. A digital service does not by itself make a full title or closing record dependable.",
    level: "Official",
  },
  {
    id: "S15",
    label: "Property Finder and Bayut, Dubai Land Department context",
    url: "https://www.propertyfinder.ae/en/data",
    note: "A mature public-data comparison. Queryable transaction data and local institutions are prerequisites, not decoration; Dubai's data rail is not a Bangladesh default.",
    level: "Company-reported",
  },
  {
    id: "S16",
    label: "Bikroy property listings",
    url: "https://bikroy.com/",
    note: "A live discovery marketplace. Listings demonstrate supply and demand, not verified closing prices or collection.",
    level: "Company-reported",
  },
  {
    id: "S17",
    label: "bdHousing",
    url: "https://www.bdhousing.com/",
    note: "A local listing and discovery example. Public listings are not independently audited closings.",
    level: "Company-reported",
  },
  {
    id: "S18",
    label: "pbazaar",
    url: "https://pbazaar.com/en/",
    note: "A local buy, rent, developer and assisted-agent flow. Public presence demonstrates a live market layer, not completed transaction evidence.",
    level: "Company-reported",
  },
  {
    id: "S19",
    label: "FlatDhaka",
    url: "https://www.flatdhaka.com/",
    note: "A Dhaka marketplace and agency example with self-reported counts. Treat listing and agency claims as company-reported.",
    level: "Company-reported",
  },
  {
    id: "S20",
    label: "Manshir and TBS launch report",
    url: "https://www.tbsnews.net/economy/corporates/new-real-estate-portal-promises-verified-listings-no-brokers-1239281",
    note: "Reported launch and company promises around direct-sale and agent paths. The claims are not independent closing evidence.",
    level: "Reported",
  },
  {
    id: "S21",
    label: "Bproperty terms",
    url: "https://www.bproperty.com/terms-of-use",
    note: "Public marketplace terms show the boundary between listing, lead generation and a completed transaction.",
    level: "Company-reported",
  },
  {
    id: "S22",
    label: "Emaar annual report",
    url: "https://properties.emaar.com/investor-relations/2022/integrated-annual-reports/emaar-properties/pdf/Integrated-Report-2022.pdf",
    note: "Company-reported customer-centre service volume. A request count is not app-only usage, conversion, collections or profit.",
    level: "Company-reported",
  },
  {
    id: "S23",
    label: "CapitaLand innovation presentation",
    url: "https://www.capitaland.com/content/dam/capitaland-newsroom/International/2024/february/cli-fy2023/20240228%20CLI%20FY%202023%20Financial%20Results%20Presentation%20%28Final%29.pdf",
    note: "Company-reported program detail. Innovation Fund and Sustainability X Challenge counts are separate; neither is a scaled-outcome or ROI measure.",
    level: "Company-reported",
  },
  {
    id: "S24",
    label: "JLL global real estate technology survey",
    url: "https://www.jll.com/en-us/newsroom/real-estates-ai-reality-check-companies-piloting-only-achieved-all-ai-goals",
    note: "JLL reports that 5% of CRE occupier teams said they achieved all AI program goals. The overall 1,500+ figure combines investor and occupier decision-makers; the exact occupier subgroup denominator is not disclosed, so do not calculate 5% of 1,500.",
    level: "Reported",
  },
  {
    id: "S25",
    label: "NoBroker India tenant and owner plans",
    url: "https://www.nobroker.in/tenant/new-plans",
    note: "Company pricing pages show fixed-term paid assistance, contacts, relationship-manager support and money-back language. They do not disclose audited conversion or margin.",
    level: "Company-reported",
  },
  {
    id: "S26",
    label: "REA Group India context",
    url: "https://cdn.rea-group.com/wp-content/uploads/2024/08/09085646/Annual-Report-to-shareholders.pdf",
    note: "Group annual-report context for Housing.com, PropTiger and Makaan. Do not treat group figures as a standalone India P&L.",
    level: "Official",
  },
  {
    id: "S27",
    label: "Zameen Pakistan platform",
    url: "https://www.zameen.com/",
    note: "Live platform and tool surface: sale/rent, projects, agents, plot finder and area guides. Discovery evidence is not audited portal economics.",
    level: "Company-reported",
  },
  {
    id: "S28",
    label: "Pinhome Indonesia company history and 2025 H1 report",
    url: "https://assets.pinhome.id/static/research-insights-v2/en/pinhome-market-report-2025-h1.pdf",
    note: "Company-reported sequence of property, agent, finance and home-service products and scale claims. Not independent market share or profit evidence.",
    level: "Company-reported",
  },
  {
    id: "S29",
    label: "Property Finder regional history",
    url: "https://www.propertyfinder.ae/en/about-us.html",
    note: "Company history records expansion into Egypt and other MENA markets. It does not establish identical data access or economics in Egypt.",
    level: "Company-reported",
  },
  {
    id: "S30",
    label: "Property24 South Africa about page",
    url: "https://www.property24.com/about-us",
    note: "Company-reported portal reach, agent supply and listing scale in South Africa; use as an upper-bound distribution example.",
    level: "Company-reported",
  },
  {
    id: "S31",
    label: "BuyRentKenya about page",
    url: "https://www.buyrentkenya.com/about",
    note: "Company-reported Kenya marketplace history and operator change. Awards and listing positioning are not audited profit or closing evidence.",
    level: "Company-reported",
  },
  {
    id: "S32",
    label: "Property Centre Nigeria and Africa about page",
    url: "https://nigeriapropertycentre.com/about-us",
    note: "Company-reported mobile-first portal, verification language and counts across Nigeria and selected African markets.",
    level: "Company-reported",
  },
  {
    id: "S33",
    label: "KE Holdings 2024 Form 20-F",
    url: "https://www.sec.gov/Archives/edgar/data/1809587/000141057825000783/beke-20241231x20f.htm",
    note: "Audited annual-report context for ACN, revenue streams and cross-store collaboration. Keep separate from the unaudited S09 results exhibit.",
    level: "Official",
  },
];

export const sourceById = Object.fromEntries(presentationSources.map((source) => [source.id, source]));

export const modelModes = [
  {
    id: "portal",
    label: "Portal",
    payer: "Advertiser or listing customer",
    promise: "Attention and qualified enquiries",
    work: "Aggregate supply, rank it, sell visibility",
    examples: "Rightmove, REA, local listing portals",
    evidence: "Public revenue and operating reports exist for mature listed portals.",
    transfer: "Can transfer when listings are fresh, demand is measurable and a seller will pay repeatedly.",
    sourceIds: ["S01", "S02", "S16"],
  },
  {
    id: "brokerage",
    label: "Brokerage",
    payer: "Buyer, seller or developer at a transaction",
    promise: "A completed, trusted match",
    work: "Verify, coordinate, negotiate, close and collect",
    examples: "KE Holdings, QuintoAndar, managed resale",
    evidence: "The durable examples connect software to agents, documents and a transaction workflow.",
    transfer: "Can transfer when a local team owns the closing steps and the collection rule is written down.",
    sourceIds: ["S09", "S10", "S21", "S33"],
  },
  {
    id: "ibuyer",
    label: "iBuyer",
    payer: "The spread between buying and selling",
    promise: "Speed and certainty of sale",
    work: "Price, acquire, carry, improve and resell inventory",
    examples: "Zillow Offers, Opendoor, RedfinNow",
    evidence: "Filings make the capital, inventory and cash-use burden visible. Several models shut or retrenched.",
    transfer: "Does not transfer responsibly without reliable pricing, title, liquidity and loss-bearing capital.",
    sourceIds: ["S04", "S06", "S08"],
  },
] as const;

export const transferModes = [
  {
    id: "bangladesh",
    label: "Bangladesh",
    question: "What can be verified at the point of closing?",
    answer: "Discovery exists. Dependable execution is still the open work.",
    mechanism: "A narrow managed resale or new-home workflow can own documents, inspection, coordination and written collection.",
    prerequisite: "A clean unit record, a named closer and a collection path that survives an offline handoff.",
    caution: "Listing volume is not proof of closing volume, title quality or collected commission.",
    sourceIds: ["S13", "S14", "S16", "S17", "S18", "S19", "S20", "S21"],
  },
  {
    id: "dubai",
    label: "Dubai",
    question: "What makes the market more queryable?",
    answer: "Public transaction infrastructure changes what a platform can measure.",
    mechanism: "Registry-linked records, mature portals and a visible transaction-data layer support better search, pricing and verification.",
    prerequisite: "Institutional data, consistent definitions and a market with enough disclosed transactions.",
    caution: "The mechanism may transfer. Dubai's data rail and institutions do not arrive with the interface.",
    sourceIds: ["S15"],
  },
  {
    id: "india",
    label: "India",
    question: "Where does assisted execution show up?",
    answer: "The stronger pattern is a local operating network, not a frictionless national app.",
    mechanism: "99acres shows a listed portal payer model; NoBroker shows paid assistance alongside broker-free discovery; local broker and developer relationships carry the operating work.",
    prerequisite: "Local density, compliance work and an accountable field process.",
    caution: "Scale in one city or segment does not make the same unit economics true in Dhaka.",
    sourceIds: ["S03", "S25", "S26"],
  },
] as const;

export const capabilitySteps = [
  {
    step: "01",
    title: "Project and unit record",
    detail: "A dependable source of truth for inventory, documents, status and ownership.",
    measure: "Completeness, freshness and exception rate",
  },
  {
    step: "02",
    title: "CRM and workflow",
    detail: "Every enquiry, handoff, inspection, promise and next action has an owner.",
    measure: "Response time, stage conversion and ageing",
  },
  {
    step: "03",
    title: "Collections",
    detail: "A signed fee rule and a reconciliation path connect activity to cash.",
    measure: "Collected commission, leakage and days to collect",
  },
  {
    step: "04",
    title: "Customer channel",
    detail: "Only after the operating record works does a portal or self-serve layer compound it.",
    measure: "Qualified demand, repeat use and cost to serve",
  },
  {
    step: "05",
    title: "Bounded AI",
    detail: "Summarise, route and flag exceptions inside a governed record. Do not invent title, price or demand.",
    measure: "Time saved, accuracy and human override rate",
  },
] as const;

export const ventureMoves = [
  {
    label: "Start",
    title: "A defined first test",
    body: "Keep portal, managed brokerage, new-home distribution and service shapes live until a payer and collection event are proven. Select one narrow lane with human owners and explicit document checks.",
    tone: "start",
  },
  {
    label: "Learn",
    title: "Make the record measurable",
    body: "Track lead source, stage, inspection, promise, close, commission and collection separately. A small clean dataset is more useful than a large directory.",
    tone: "learn",
  },
  {
    label: "Defer",
    title: "Defer capital-heavy promises",
    body: "Do not begin with iBuying, a national index, a neutral marketplace or a super-app. Each needs evidence and infrastructure not yet established here.",
    tone: "defer",
  },
] as const;
