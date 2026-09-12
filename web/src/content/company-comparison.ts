import gap from "@/data/generated/comparative-gap.json";
import flagship from "@/data/generated/flagship-chapter.json";
import { executiveCompanies } from "./executive-evidence";
import { ycShortlist } from "./yc-shortlist";

export interface CompanySummary {
  id: string; name: string; country: string; category: string; track: string;
  offer: string; lesson: string; website: string | null; outcome: string;
  payer: string; workflow: string; burden: string; risk: string; test: string;
  capital: string; valuation: string; sources: { title: string; url: string }[];
  caseUrl?: string; yc?: string; history?: string;
}

// Explicit case identities: no domain-based joins, no parent/subsidiary merging.
const selected = [
  ["case-beike-acn", "Beike", "Sales & agents", "Coordinates agents, listings and closing work.", "Agree who does the work and how each agent gets paid.", "https://investors.ke.com/"],
  ["case-compass", "Compass", "Sales & agents", "Equips affiliated agents to sell homes under a brokerage.", "Budget for people and commissions, not only software.", "https://www.compass.com/"],
  ["case-quinto-distribution", "QuintoAndar", "Rentals & services", "Combines rental management, contracts, payments and sales.", "Recurring service brings recurring support and collection costs.", "https://www.quintoandar.com.br/"],
  ["case-nobroker-assist", "NoBroker", "Sales & agents", "Offers property discovery with paid human assistance.", "Test whether customers will pay for help with a specific step.", "https://www.nobroker.in/"],
  ["case-square-yards", "Square Yards", "Sales & agents", "Connects developers, sales partners, buyers and mortgages.", "Track a lead through booking to the commission actually collected.", "https://www.squareyards.com/"],
  ["case-proptiger-reset", "PropTiger", "Sales & agents", "Supports new-home purchases; studied through its ownership change.", "Keep each service's costs and results separate.", "https://www.proptiger.com/"],
  ["case-houm", "Houm", "Rentals & services", "Helps owners find tenants and administer rentals.", "Measure the cost of serving each rented home every month.", "https://houm.com/"],
  ["case-appfolio", "AppFolio", "Rentals & services", "Sells software for property managers and their operations.", "A business can sell useful tools without becoming the landlord.", "https://www.appfolio.com/"],
  ["case-urban-company", "Urban Company", "Rentals & services", "Organises home services delivered by service professionals.", "Training, quality control and repeat bookings matter beyond matching.", "https://www.urbancompany.com/"],
  ["case-sheba", "Sheba Platform", "Rentals & services", "Connects local service demand with providers in Bangladesh.", "Study local fulfilment and cash-flow problems before adding services.", "https://www.sheba.xyz/"],
  ["case-costar", "CoStar", "Data & trust", "Sells researched property information to professional users.", "Reliable data needs a repeatable collection process and a paying user.", "https://www.costar.com/"],
  ["case-aldar", "Aldar", "Developer operations", "Digitises customer service and sales agreements.", "For JCX, measure whether customers actually use the digital journey.", "https://www.aldar.com/"],
  ["case-godrej", "Godrej Properties", "Developer operations", "Uses digital processes to manage customer service and complaints.", "Track resolution time and responsibility, not just app downloads.", "https://www.godrejproperties.com/"],
  ["case-ayala", "Ayala Land", "Developer operations", "Applies technology to construction and inspection workflows.", "Pilot a measurable operational problem before expanding the system.", "https://www.ayalaland.com.ph/"],
  ["case-dlf", "DLF", "Developer operations", "Uses integrated business systems and process controls.", "Start with accurate records and clear ownership of each task.", "https://www.dlf.in/"],
  ["case-permitflow", "PermitFlow", "Focused software", "Helps manage permits and preconstruction administration.", "One difficult approval workflow can be a product, if local access allows it.", "https://www.permitflow.com/"],
  ["case-snapdocs", "Snapdocs", "Focused software", "Coordinates mortgage-closing documents and participants.", "Shared transaction status can reduce missed handoffs.", "https://www.snapdocs.com/"],
  ["case-rabbet", "Rabbet", "Focused software", "Organises construction-finance documents and workflows.", "Study repeated document and payment work before building automation.", "https://rabbet.com/"],
  ["case-trellis", "Trellis", "Focused software", "Uses AI to coordinate short-term rental operations.", "Automate one low-risk task with human escalation first.", "https://www.trellistech.com/"],
  ["case-lhoopa", "Lhoopa", "Sales & agents", "Uses technology within an affordable-housing delivery business.", "Building and selling homes requires capital, not just a platform.", "https://www.lhoopa.com/"],
] as const;

const rows: CompanySummary[] = selected.map(([caseId, name, category, offer, lesson, website]) => {
  const lens = gap.lenses.find(l => l.cases.some(c => c.id === caseId))!;
  const c = lens.cases.find(c => c.id === caseId)!;
  const yc = ycShortlist.find(y => y.name === name);
  return { id: name.toLowerCase().replace(/\s+/g, "-"), name, country: c.geography,
    category, track: category === "Developer operations" ? "JCX operations" : "Propty",
    offer, lesson, website, outcome: c.journey, payer: c.payer, workflow: c.workflow,
    burden: c.human_burden, risk: c.failure_or_limit + " " + c.unknown,
    test: c.transfer_test, capital: c.capital + " " + c.monetization,
    valuation: "No comparable valuation established in the reviewed evidence.",
    sources: c.source_ids.map(id => { const s = gap.sources.find(s => s.id === id); if (!s) throw new Error(`Missing source ${id}`); return { title: s.title, url: s.url }; }),
    caseUrl: `/comparison?lens=${lens.id}&case=${c.id}#jcx-comparative`, yc: yc?.batch,
  };
});

const flagshipCopy: Record<string, [string, string, string | null]> = {
  Rightmove: ["Sells listing visibility and lead products to agents and developers.", "A portal needs professionals who keep paying, not just visitors.", "https://www.rightmove.co.uk/"],
  "99acres": ["Offers property discovery and paid products for property advertisers.", "A large listing audience does not automatically make a profitable business.", "https://www.99acres.com/"],
  Pinhome: ["Connects property discovery with agents, financing and home services.", "Study the connected journey, but prove each service's economics separately.", "https://www.pinhome.id/"],
  Propzy: ["Combined online discovery with offline transaction assistance in Vietnam.", "A broad, people-heavy service can run out of money before it scales.", null],
};
for (const c of flagship.cases) {
  const [offer, lesson, website] = flagshipCopy[c.name];
  rows.push({ id: c.name.toLowerCase(), name: c.name, country: c.geography,
    category: "Discovery & portals", track: "Propty", offer, lesson, website,
    outcome: c.journey.map(j => `${j.period}: ${j.event}`).join(" "),
    payer: c.payer, workflow: c.workflow, burden: c.distribution,
    risk: c.undisclosed, test: c.transfer_note, capital: c.funding,
    valuation: "No comparable valuation established in the reviewed evidence.",
    sources: c.source_ids.map(id => { const s = flagship.sources.find(s => s.id === id)!; return { title: s.title, url: s.url }; }),
  });
}
const bayut = executiveCompanies.find(c => c.id === "bayut")!;
rows.push({ id: "bayut", name: "Bayut", country: bayut.country, category: "Data & trust", track: "Propty",
  offer: "Adds document checks and recent on-site availability checks to listings.",
  lesson: "Explain what a verification badge proves and when the check happened.",
  website: "https://www.bayut.com/", outcome: bayut.practice, payer: "The selected source explains the product, not its payer economics.",
  workflow: bayut.capabilities.filter(c => c.status === "observed").map(c => c.summary).join(" "),
  burden: "Document checking and on-site checks remain part of the service.", risk: bayut.caveat,
  test: "Test one listing-check process with a timestamp, a responsible person and a clear limit.",
  capital: "Standalone funding and unit economics are not established here.", valuation: "No standalone valuation established.",
  sources: [{ title: bayut.source.label, url: bayut.source.url }],
});
for (const name of ["Landeed", "Propexo"]) {
  const c = ycShortlist.find(c => c.name === name)!;
  rows.push({ id: name.toLowerCase(), name, country: c.place,
    category: name === "Landeed" ? "Data & trust" : "Focused software",
    track: name === "Propexo" ? "JCX operations" : "Propty", offer: c.offering,
    lesson: c.lesson, website: name === "Landeed" ? "https://www.landeed.com/" : "https://www.propexo.com/",
    outcome: "Offering and YC batch documented. Profitable unit economics are not established in this review.",
    payer: "Commercial payer terms were not established in the selected profile.", workflow: c.offering,
    burden: "Local access, data quality and responsibility require separate checking.", risk: c.limit,
    test: c.test, capital: "Funding and operating economics were not established in this review.",
    valuation: "No comparable valuation established.", sources: [{ title: `${name}: official YC profile`, url: c.url }], yc: c.batch,
  });
}

const historicalFinance = [
  { id: "snapdocs", value: "Over US$1.5 billion, May 2021 funding-round valuation. Not a current valuation.", funding: "US$150 million Series D announced in May 2021; US$260 million total funding reported at that time.", title: "Snapdocs: Series D funding announcement (2021)", url: "https://www.snapdocs.com/resource-center/press-release/snapdocs-series-d-funding-announcement" },
  { id: "quintoandar", value: "US$5.1 billion, August 2021 funding-round valuation. Not a current valuation.", funding: "US$120 million Series E extension announced in August 2021. This was additional financing, not revenue.", title: "QuintoAndar: Series E extension announcement (2021)", url: "https://www.quintoandar.com.br/newsroom/quintoandar-levanta-mais-us-120-milhoes-em-extensao-de-captacao-serie-e-valuation-supera-us-5-bilhoes/" },
];
for (const finance of historicalFinance) {
  const c = rows.find(c => c.id === finance.id)!;
  c.valuation = finance.value;
  c.capital = finance.funding + " " + c.capital;
  c.sources.push({ title: finance.title, url: finance.url });
}
const conciseResults: Record<string, string> = {
  beike: "2024 filing: about 75% of existing-home sales involved cross-store collaboration. This shows network use, not its isolated effect on profit.",
  compass: "2024: US$5.63bn revenue; commissions and related expenses consumed 82.3%. Sales scale still carries substantial people costs.",
  quintoandar: "June 2025 company report: 300,000 managed rental contracts. Scale is reported; local service profitability is not established.",
  nobroker: "Paid assistance is visible in its plans. Conversion rates and profit from those plans are not established here.",
  "square-yards": "FY25 company report: INR1,410 crore revenue. This combines business lines, so it is not a standalone brokerage result.",
  proptiger: "Sold to Aurum in September 2025. Historical combined reporting with Housing Edge must not be treated as PropTiger-only results.",
  houm: "A 2023 interview describes a shift towards recurring rental administration. Near-profitability was a reported statement, not audited proof.",
  appfolio: "2024 filing: US$794.2m revenue and 8.7m units served. A documented software business, not a housing-ownership model.",
  "urban-company": "FY2024: INR827 crore revenue alongside an INR93 crore pre-tax loss. Revenue growth and profit are different questions.",
  "sheba-platform": "Reporting describes funding stress and layoffs in 2022, followed by arrears repayment. This is history, not a current failure claim.",
  costar: "Its 2024 filing describes subscription products and renewal. Country-level product margins are not isolated.",
  aldar: "FY2024 company report: over 70% customer app use and 92% digital sales agreements. Adoption is not a measured technology ROI.",
  "godrej-properties": "FY2024–25 company report: 99% of grievances closed. The report does not isolate the effect of its app.",
  "ayala-land": "2024 company report: 99% first-inspection acceptance for its H3Zoom workflow. No independent ROI established here.",
  dlf: "FY2024–25 reporting describes business-system changes and controls. Quantified technology ROI is not disclosed in the selected evidence.",
  permitflow: "YC documents the product. Reported funding supports its history, but public unit economics are not established here.",
  snapdocs: "A customer release reports 75% hybrid digital closing adoption after one month at Zions. This is one customer, not a universal result.",
  rabbet: "The selected YC profile establishes the intended workflow, not revenue, retention or profitability.",
  trellis: "Its 2026 YC profile claims US$500k annual recurring revenue soon after launch. This is an early company claim, not audited profit.",
  lhoopa: "July 2024 release: over 2,500 homes across 58 cities. Debt commitments and ADB targets are not completed housing outcomes.",
  rightmove: "FY2024 reporting documents recurring professional revenue and operating profit. The UK market's maturity cannot be assumed in Bangladesh.",
  "99acres": "Reviewed reporting separates advertiser billings from operating results. Listings and traffic alone do not establish profitability.",
  pinhome: "Company sources describe an integrated property-and-services journey. Downloads and network counts do not establish service-level profit.",
  propzy: "Vietnam operations closed in September 2022 after fundraising difficulties. Funding did not establish a sustainable operating model.",
};
for (const row of rows) { row.history = row.outcome; row.outcome = conciseResults[row.id] ?? row.outcome; }
export const companySummaries = rows;
