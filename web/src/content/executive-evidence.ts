/**
 * Small, source-linked evidence set for the Propty executive landing page.
 *
 * This is an editorial selection, not an exhaustive company ranking. A cell
 * marked "not-assessed" means the selected primary source does not establish
 * the capability. It must never be rendered as a negative claim.
 */

export interface EvidenceSource {
  label: string;
  url: string;
  asOf?: string;
}

export type CapabilityKey =
  | "listing-currency"
  | "guided-search"
  | "agent-coordination"
  | "transaction-support"
  | "post-transaction-services";

export interface CapabilityEvidence {
  capability: CapabilityKey;
  summary: string;
  status: "observed" | "not-assessed";
  source: EvidenceSource;
}

export interface ExecutiveCompany {
  id: string;
  name: string;
  country: string;
  model: string;
  practice: string;
  lesson: string;
  caveat: string;
  source: EvidenceSource;
  capabilities: CapabilityEvidence[];
}

export interface ExecutiveFinding {
  id: string;
  title: string;
  statement: string;
  implication: string;
  source: EvidenceSource;
}

export interface ExecutiveMetric {
  id: string;
  value: string;
  label: string;
  period: string;
  meaning: string;
  caveat: string;
  source: EvidenceSource;
}

export const capabilityLabels: Record<CapabilityKey, string> = {
  "listing-currency": "Current, checkable listings",
  "guided-search": "Guided property search",
  "agent-coordination": "Agent coordination",
  "transaction-support": "Transaction support",
  "post-transaction-services": "Services after the transaction",
};

const beike2024: EvidenceSource = {
  label: "KE Holdings 2024 Form 20-F",
  url: "https://www.sec.gov/Archives/edgar/data/1809587/000141057825000783/beke-20241231x20f.htm",
  asOf: "Year ended 31 December 2024",
};

const bayutTruCheck: EvidenceSource = {
  label: "Bayut TruCheck product explanation",
  url: "https://www.bayut.com/mybayut/trucheck-bayut-uae/",
  asOf: "Accessed 12 September 2026",
};

const noBrokerPlans: EvidenceSource = {
  label: "NoBroker tenant plans",
  url: "https://www.nobroker.in/tenant/plans",
  asOf: "Accessed 12 September 2026",
};

const infoEdge2026: EvidenceSource = {
  label: "Info Edge Annual Report 2025-26",
  url: "https://www.infoedge.in/pdfs/Report_filings/InfoEdge_Annual_Report_2026.pdf",
  asOf: "Year ended 31 March 2026",
};

export const executiveCompanies: ExecutiveCompany[] = [
  {
    id: "beike",
    name: "Beike",
    country: "China",
    model: "Brokerage network and transaction infrastructure",
    practice: "Shares transaction work and commissions across agents.",
    lesson: "Make agent cooperation explicit.",
    caveat:
      "China-scale network adoption does not establish feasibility, cost or regulatory fit in Bangladesh.",
    source: beike2024,
    capabilities: [
      {
        capability: "listing-currency",
        summary:
          "Uses callbacks, physical visits and automated checks; the filing says complete accuracy cannot be assured.",
        status: "observed",
        source: beike2024,
      },
      {
        capability: "guided-search",
        summary: "Buyer-search assistance was not isolated in this review.",
        status: "not-assessed",
        source: beike2024,
      },
      {
        capability: "agent-coordination",
        summary:
          "ACN assigns transaction roles, rights, obligations and commission shares across agents.",
        status: "observed",
        source: beike2024,
      },
      {
        capability: "transaction-support",
        summary:
          "Offers closing services and field assistance, including on-site verification.",
        status: "observed",
        source: beike2024,
      },
      {
        capability: "post-transaction-services",
        summary:
          "Operates rental management plus home renovation and furnishing services.",
        status: "observed",
        source: beike2024,
      },
    ],
  },
  {
    id: "bayut",
    name: "Bayut",
    country: "United Arab Emirates",
    model: "Property portal with broker quality controls",
    practice: "Checks documents, property visits and recent availability.",
    lesson: "Show exactly what was checked.",
    caveat:
      "Bayut describes its own product. The selected source does not disclose conversion, cost or standalone profit.",
    source: bayutTruCheck,
    capabilities: [
      {
        capability: "listing-currency",
        summary:
          "Documents are checked first; an on-site photo then timestamps recent availability.",
        status: "observed",
        source: bayutTruCheck,
      },
      {
        capability: "guided-search",
        summary:
          "The source describes map and 3D discovery tools, not human-assisted search.",
        status: "observed",
        source: bayutTruCheck,
      },
      {
        capability: "agent-coordination",
        summary: "Multi-agent roles or commission sharing were not assessed.",
        status: "not-assessed",
        source: bayutTruCheck,
      },
      {
        capability: "transaction-support",
        summary: "Closing support was not assessed in the selected source.",
        status: "not-assessed",
        source: bayutTruCheck,
      },
      {
        capability: "post-transaction-services",
        summary:
          "Post-transaction services were not assessed in the selected source.",
        status: "not-assessed",
        source: bayutTruCheck,
      },
    ],
  },
  {
    id: "nobroker",
    name: "NoBroker",
    country: "India",
    model: "Direct marketplace with paid assistance",
    practice: "Pairs online search with paid human help.",
    lesson: "Test demand for assisted service.",
    caveat:
      "The live plan page establishes the offer, not conversion, customer outcomes or unit economics.",
    source: noBrokerPlans,
    capabilities: [
      {
        capability: "listing-currency",
        summary:
          "Listing freshness and verification rate were not established.",
        status: "not-assessed",
        source: noBrokerPlans,
      },
      {
        capability: "guided-search",
        summary:
          "A relationship manager gathers requirements, contacts owners and schedules visits.",
        status: "observed",
        source: noBrokerPlans,
      },
      {
        capability: "agent-coordination",
        summary:
          "The plan coordinates seekers with owners; multi-agent commission sharing was not assessed.",
        status: "not-assessed",
        source: noBrokerPlans,
      },
      {
        capability: "transaction-support",
        summary:
          "Selected plans include negotiation help and rental-agreement support.",
        status: "observed",
        source: noBrokerPlans,
      },
      {
        capability: "post-transaction-services",
        summary:
          "The plan page offers move-in support through packers and movers.",
        status: "observed",
        source: noBrokerPlans,
      },
    ],
  },
  {
    id: "99acres",
    name: "99acres",
    country: "India",
    model: "Professional-payer property portal",
    practice: "Sells property listings and advertising.",
    lesson: "Test profitability before pursuing scale.",
    caveat:
      "Reported listings and traffic are not completed transactions, and FY2026 operating PBT remained negative.",
    source: infoEdge2026,
    capabilities: [
      {
        capability: "listing-currency",
        summary:
          "The report gives listing volume, but not a current-listing or verification rate.",
        status: "not-assessed",
        source: infoEdge2026,
      },
      {
        capability: "guided-search",
        summary:
          "The report mentions AI in lead conversion and customer service, but does not define assisted search.",
        status: "not-assessed",
        source: infoEdge2026,
      },
      {
        capability: "agent-coordination",
        summary:
          "Brokers are a payer group; a cooperative transaction protocol was not assessed.",
        status: "not-assessed",
        source: infoEdge2026,
      },
      {
        capability: "transaction-support",
        summary:
          "The report does not define responsibility for closing a transaction.",
        status: "not-assessed",
        source: infoEdge2026,
      },
      {
        capability: "post-transaction-services",
        summary:
          "Post-transaction services were not assessed in the selected report.",
        status: "not-assessed",
        source: infoEdge2026,
      },
    ],
  },
];

export const executiveFindings: ExecutiveFinding[] = [
  {
    id: "define-trust",
    title: "Trust must describe a check",
    statement:
      "Bayut separates document review from a recent, location-gated property visit and shows when the availability check occurred.",
    implication:
      "Propty should name every check, its owner and its expiry instead of promising universal verification.",
    source: bayutTruCheck,
  },
  {
    id: "human-digital",
    title: "Digital journeys still use people",
    statement:
      "NoBroker sells a relationship manager who gathers needs, contacts owners and arranges visits inside a digital marketplace.",
    implication:
      "Propty can productise human help first, then automate repeated work after measuring it.",
    source: noBrokerPlans,
  },
  {
    id: "scale-economics",
    title: "Portal scale does not guarantee profit",
    statement:
      "99acres reported more than 1.3 million listings and INR 4,971 million of FY2026 billings, alongside an INR 592 million operating PBT loss.",
    implication:
      "A Bangladesh marketplace needs a tested payer and contribution model before scale becomes the objective.",
    source: infoEdge2026,
  },
];

export const executiveMetrics: ExecutiveMetric[] = [
  {
    id: "beike-cross-store",
    value: "≈75%",
    label: "of existing-home sales involved cross-store collaboration",
    period: "Beike, 2024",
    meaning:
      "A defined cooperation and commission system can become normal operating behaviour at scale.",
    caveat:
      "Participation does not prove that ACN caused more sales or that the model transfers to Bangladesh.",
    source: beike2024,
  },
  {
    id: "99acres-economics",
    value: "INR 4,971m / −592m",
    label: "billings / operating PBT",
    period: "99acres, FY2026",
    meaning:
      "A large South Asian portal can grow billings while its reported operating result remains negative.",
    caveat:
      "Billings and operating PBT are different measures; this is one year, not a universal portal margin.",
    source: infoEdge2026,
  },
];
