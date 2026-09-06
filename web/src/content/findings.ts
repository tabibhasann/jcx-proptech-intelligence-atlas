/**
 * The five findings of the brief.
 * Each finding pairs one plain claim with its supporting evidence and its
 * stated limit. Finding 1 is the verdict the whole site supports.
 */

export interface Finding {
  n: string;
  title: string;
  body: string;
  evidence: string;
  evidenceHref: string;
  limit: string;
}

export const FINDINGS: Finding[] = [
  {
    n: "01",
    title: "Start with one governed sales record",
    body: "The most useful first move is mundane: one approved project and unit record feeding the website, the sales team, and customer updates. Everything above it depends on buyers and staff trusting the same facts.",
    evidence: "Analyst synthesis across 295 records and 44 cases, research cut-off 30 August 2026.",
    evidenceHref: "/story#scene-pattern",
    limit: "A hypothesis until discovery confirms systems, owners, and baselines.",
  },
  {
    n: "02",
    title: "Pilots are everywhere, measured value is rare",
    body: "Company surveys report 92 percent of corporate real estate teams running or planning AI pilots, with only 5 percent saying they reached most program goals. The gap is a delivery gap, not a verdict on any tool.",
    evidence: "JLL 2025 survey of 1,000+ decision makers in 16 markets, self reported.",
    evidenceHref: "/story#scene-pattern",
    limit: "Survey of JLL respondents, not a universal industry ratio.",
  },
  {
    n: "03",
    title: "Site evidence beats site opinion",
    body: "Dated 360 photos and plan linked imagery changed payment, dispute, and handover decisions in named projects. One team reports a stopped 50,000 dollar disputed change order; another reports 2.3 times more tasks on time.",
    evidence: "Vendor customer stories QOC-015 and QOC-013, customer estimates.",
    evidenceHref: "/evidence",
    limit: "Vendor hosted, baselines incomplete, not independently verified.",
  },
  {
    n: "04",
    title: "The buyer journey is the clearest South Asian precedent",
    body: "An Indian developer platform and its published launch case show inquiry to booking run as one traceable chain: 10,000+ leads, 250+ virtual meetings a day, 300+ bookings in three weeks. The mechanism transfers; the numbers do not.",
    evidence: "Vendor case QOC-040, marketing reported, pandemic context.",
    evidenceHref: "/evidence#QOC-040",
    limit: "No published conversion denominators or independent funnel check.",
  },
  {
    n: "05",
    title: "Capital punishes what software cannot fix",
    body: "Filings record a 407.9 million dollar inventory write down at Zillow Offers and a multi billion dollar lease restructuring at WeWork. Models, leases, factories, and balance sheets decide outcomes alongside any software.",
    evidence: "SEC filings, cases QOC-043 and QOC-044, filing grade.",
    evidenceHref: "/evidence",
    limit: "Filings establish events and losses, not that software caused them.",
  },
];

export const NEXT_STEP =
  "Run a short discovery: confirm what already works, which process hurts most, who owns it, and what can be measured. Then test one workflow on one project with a baseline, an owner, and a stop gate.";
