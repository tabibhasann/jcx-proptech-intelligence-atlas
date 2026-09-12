"use client";

import { useEffect, useMemo, useState } from "react";
import { flagshipChapter, flagshipSourceById, formatFlagshipMetric } from "@/content/flagship";
import { comparativeChapter } from "@/data";

type CurrentCase = {
  id: string;
  name: string;
  model: string;
  mechanism: string;
  geography: string;
  period: string;
  finding: string;
  limit: string;
  sourceLabel: string;
  sourceUrl: string;
  href: string;
  evidence: string;
  depth: "Anchor chapter" | "Comparative chapter";
};

const FLAGSHIP_CASES: CurrentCase[] = flagshipChapter.cases.map((item) => {
  const source = flagshipSourceById[item.source_ids[0]];
  const finding = item.case_id === "FCASE-RIGHTMOVE"
    ? `${formatFlagshipMetric("rightmove_revenue_fy2024")} revenue and ${formatFlagshipMetric("rightmove_operating_profit_fy2024")} statutory operating profit; ${formatFlagshipMetric("rightmove_arpa_all_fy2024")} average revenue per advertiser per month.`
    : item.case_id === "FCASE-99ACRES"
      ? `${formatFlagshipMetric("infoedge_99acres_billings_fy2025")} billings with an operating PBT of ${formatFlagshipMetric("infoedge_99acres_operating_pbt_fy2025")} in the Info Edge annual-report record.`
      : item.case_id === "FCASE-PINHOME"
        ? `${formatFlagshipMetric("pinhome_downloads_claim_2025")} downloads, ${formatFlagshipMetric("pinhome_agents_claim_2025")} agents and ${formatFlagshipMetric("pinhome_listings_claim_2025")} listings are company-reported; the chapter keeps their limits visible.`
        : `Operations ceased on ${formatFlagshipMetric("propzy_closure_date")} in the cited report; the chapter does not isolate a single cause.`;
  return {
    id: item.case_id,
    name: item.name,
    model: item.model,
    mechanism: item.model,
    geography: item.geography,
    period: item.journey[item.journey.length - 1]?.period ?? item.status,
    finding,
    limit: item.undisclosed,
    sourceLabel: source?.title ?? item.name,
    sourceUrl: source?.url ?? "#",
    href: `/companies?company=${item.name.toLowerCase()}`,
    evidence: source?.level ?? "Open question",
    depth: "Anchor chapter",
  };
});

const SUPPORTING_CASES: CurrentCase[] = [
  {
    id: "S25",
    name: "NoBroker",
    model: "Paid assistance",
    geography: "India",
    period: "Current plan terms",
    finding: "Fixed-term plans sell contacts, assistance and relationship-manager support around broker-free discovery.",
    limit: "The public plan pages do not establish conversion, margin or payback.",
    sourceLabel: "NoBroker tenant and owner plans",
    sourceUrl: "https://www.nobroker.in/tenant/plans",
    href: "/comparison?lens=managed-distribution&case=case-nobroker-assist#jcx-comparative",
    evidence: "Company-reported",
    mechanism: "Broker-free discovery with paid assisted execution",
    depth: "Comparative chapter",
  },
  {
    id: "S08",
    name: "Opendoor",
    model: "Principal inventory",
    geography: "United States",
    period: "2024 filing",
    finding: "$2.159bn inventory, 13,593 homes sold and $595m net cash used in operating activities.",
    limit: "Inventory-led speed carries balance-sheet and pricing risk; it is not a light marketplace fee.",
    sourceLabel: "Opendoor 2024 Form 10-K",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1801169/000180116925000017/open-20241231.htm",
    href: "https://www.sec.gov/Archives/edgar/data/1801169/000180116925000017/open-20241231.htm",
    evidence: "Official",
    mechanism: "Principal inventory",
    depth: "Anchor chapter",
  },
  {
    id: "S22",
    name: "Emaar One",
    model: "Developer service channel",
    geography: "United Arab Emirates",
    period: "2022 report",
    finding: "Emaar reports 38% more customer-centre service requests than in 2021, alongside fewer walk-ins.",
    limit: "This is a company-reported service-volume result, not app-only usage, conversion or ROI.",
    sourceLabel: "Emaar Integrated Report 2022",
    sourceUrl: "https://properties.emaar.com/investor-relations/2022/integrated-annual-reports/emaar-properties/pdf/Integrated-Report-2022.pdf",
    href: "https://properties.emaar.com/investor-relations/2022/integrated-annual-reports/emaar-properties/pdf/Integrated-Report-2022.pdf",
    evidence: "Company-reported",
    mechanism: "Developer service channel",
    depth: "Comparative chapter",
  },
  {
    id: "S23",
    name: "CapitaLand",
    model: "Innovation portfolio",
    geography: "Singapore and regional portfolio",
    period: "FY2023",
    finding: "The Innovation Fund supported 63 pilots; separately, Sustainability X Challenge had 20 projects piloted or pre-piloted and 3 completed successfully.",
    limit: "These are separate program counts. No 63-to-20-to-3 conversion or ROI is established.",
    sourceLabel: "CapitaLand FY2023 results presentation",
    sourceUrl: "https://www.capitaland.com/content/dam/capitaland-newsroom/International/2024/february/cli-fy2023/20240228%20CLI%20FY%202023%20Financial%20Results%20Presentation%20%28Final%29.pdf",
    href: "/comparison?lens=developer-adoption&case=case-capitaland-jll#jcx-comparative",
    evidence: "Company-reported",
    mechanism: "Innovation portfolio",
    depth: "Comparative chapter",
  },
];

const comparativeSourceById = new Map(comparativeChapter.sources.map((source) => [source.id, source]));
const COMPARATIVE_CASES: CurrentCase[] = comparativeChapter.lenses.flatMap((lens) =>
  lens.cases.map((item) => {
    const source = item.source_ids.map((id) => comparativeSourceById.get(id)).find(Boolean);
    return {
      id: item.id,
      name: item.name,
      model: lens.title,
      mechanism: item.mechanism,
      geography: item.geography,
      period: comparativeChapter.updated,
      finding: item.result,
      limit: item.failure_or_limit,
      sourceLabel: source?.title ?? `${item.name} source trail`,
      sourceUrl: source?.url ?? "#",
      href: `/comparison?lens=${encodeURIComponent(lens.id)}&case=${encodeURIComponent(item.id)}#jcx-comparative`,
      evidence: item.evidence_label,
      depth: "Comparative chapter",
    };
  }),
);

// Preserve the anchor records while exposing every approved comparison mechanism.
// Duplicate company names stay distinct because the mechanism and chapter label are shown.
const CURRENT_CASES: CurrentCase[] = [...FLAGSHIP_CASES, ...SUPPORTING_CASES, ...COMPARATIVE_CASES];

const EVIDENCE_FILTERS = ["all", "Official", "Company-reported", "Reported", "Interpretation", "Open question"] as const;
const DEPTH_FILTERS = ["all", "Anchor chapter", "Comparative chapter"] as const;

export function CurrentReviewedCases() {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(12);
  const [filtersReady, setFiltersReady] = useState(false);
  const [model, setModel] = useState("all");
  const [country, setCountry] = useState("all");
  const [evidence, setEvidence] = useState<(typeof EVIDENCE_FILTERS)[number]>("all");
  const [depth, setDepth] = useState<(typeof DEPTH_FILTERS)[number]>("all");
  const countries = useMemo(() => Array.from(new Set(CURRENT_CASES.map((item) => item.geography))).sort(), []);
  const models = useMemo(() => Array.from(new Set(CURRENT_CASES.map((item) => item.model))).sort(), []);

  // Search links in presenter notes can open the exact current state. Once
  // hydrated, keep edits in the address bar so a useful result is shareable.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("query") ?? params.get("q") ?? "");
    const requestedModel = params.get("model");
    if (requestedModel && models.includes(requestedModel)) setModel(requestedModel);
    const requestedCountry = params.get("country");
    if (requestedCountry && countries.includes(requestedCountry)) setCountry(requestedCountry);
    const requestedEvidence = params.get("evidence");
    if (requestedEvidence && EVIDENCE_FILTERS.includes(requestedEvidence as (typeof EVIDENCE_FILTERS)[number])) setEvidence(requestedEvidence as (typeof EVIDENCE_FILTERS)[number]);
    const requestedDepth = params.get("depth");
    if (requestedDepth && DEPTH_FILTERS.includes(requestedDepth as (typeof DEPTH_FILTERS)[number])) setDepth(requestedDepth as (typeof DEPTH_FILTERS)[number]);
    setFiltersReady(true);
  }, []);

  useEffect(() => {
    if (!filtersReady) return;
    const url = new URL(window.location.href);
    const params = url.searchParams;
    for (const key of ["query", "q", "model", "country", "evidence", "depth"]) params.delete(key);
    if (query.trim()) params.set("query", query.trim());
    if (model !== "all") params.set("model", model);
    if (country !== "all") params.set("country", country);
    if (evidence !== "all") params.set("evidence", evidence);
    if (depth !== "all") params.set("depth", depth);
    window.history.replaceState(null, "", `${url.pathname}${params.toString() ? `?${params.toString()}` : ""}${url.hash}`);
  }, [country, depth, evidence, model, query, filtersReady]);
  useEffect(() => setShown(12), [country, depth, evidence, model, query]);
  const result = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CURRENT_CASES.filter((item) => {
      if (model !== "all" && item.model !== model) return false;
      if (country !== "all" && item.geography !== country) return false;
      if (evidence !== "all" && item.evidence !== evidence) return false;
      if (depth !== "all" && item.depth !== depth) return false;
      if (!q) return true;
      return [item.id, item.name, item.model, item.mechanism, item.geography, item.period, item.finding, item.limit]
        .some((value) => value.toLowerCase().includes(q));
    });
  }, [country, depth, evidence, model, query]);

  const reset = () => {
    setQuery("");
    setModel("all");
    setCountry("all");
    setEvidence("all");
    setDepth("all");
  };

  return (
    <section aria-labelledby="current-reviewed-title" className="mb-14">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">Current reviewed set · edition review 12 September 2026</p>
        <h2 id="current-reviewed-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected results and lessons
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-2">
          The current set combines the four anchor cases with every approved comparative mechanism. A company can appear more than once when the mechanism differs. The dated archive below remains useful, but it is not the complete current source register.
        </p>
      </div>
      <div className="current-reviewed-filters mt-6 flex flex-wrap items-center gap-3 border border-line bg-paper-raised p-4" role="search">
        <label className="grow sm:max-w-sm">
          <span className="sr-only">Search current reviewed cases</span>
          <input
            type="search"
            disabled={!filtersReady}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Rightmove, India, Propzy…"
            className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2 text-sm outline-none placeholder:text-ink-soft/70 focus:border-mark"
          />
        </label>
        <div className="current-filter-grid flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
            <span>Model</span>
            <select value={model} onChange={(event) => setModel(event.target.value)} className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2">
              <option value="all">All models</option>
              {models.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
            <span>Country</span>
            <select value={country} onChange={(event) => setCountry(event.target.value)} className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2">
              <option value="all">All countries</option>
              {countries.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
            <span>Evidence</span>
            <select value={evidence} onChange={(event) => setEvidence(event.target.value as typeof evidence)} className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2">
              {EVIDENCE_FILTERS.map((item) => <option key={item} value={item}>{item === "all" ? "All levels" : item}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
            <span>Depth</span>
            <select value={depth} onChange={(event) => setDepth(event.target.value as typeof depth)} className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2">
              {DEPTH_FILTERS.map((item) => <option key={item} value={item}>{item === "all" ? "All chapters" : item}</option>)}
            </select>
          </label>
          {(query || model !== "all" || country !== "all" || evidence !== "all" || depth !== "all") ? (
            <button type="button" onClick={reset} className="rounded-sm border border-line-strong px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink-2 hover:border-mark">Reset</button>
          ) : null}
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft" role="status">
          {result.length} of {CURRENT_CASES.length} current records
        </p>
      </div>
      {result.length ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {result.slice(0, shown).map((item) => (
            <article key={item.id} className="border border-line bg-paper-raised p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">{item.id} · {item.period} · {item.depth}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{item.name}</h3>
                </div>
                <span className="rounded-sm border border-line-strong px-2 py-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-2">{item.evidence}</span>
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">{item.geography} · {item.model}</p>
              <p className="mt-2 text-xs font-medium leading-relaxed text-ink-2">{item.mechanism}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">{item.finding}</p>
              <p className="mt-3 border-l-2 border-mark/50 pl-3 text-xs leading-relaxed text-ink-soft">Limit: {item.limit}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a href={item.href} className="u-link inline-flex font-mono text-xs text-data">
                  Open this case <span aria-hidden="true" className="ml-1">↗</span>
                </a>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="u-link inline-flex font-mono text-xs text-data">
                  {item.sourceLabel}<span aria-hidden="true" className="ml-1">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-line bg-paper-raised p-5 text-sm text-ink-2">
          <p>No current record matches those filters.</p>
          <button type="button" onClick={reset} className="u-link mt-2 font-mono text-xs uppercase tracking-[0.1em] text-data">Reset current filters</button>
        </div>
      )}
      {result.length > shown && <div className="mt-7 text-center"><p className="mb-3 text-sm text-ink-soft">Showing {Math.min(shown,result.length)} of {result.length} matching cases</p><button type="button" className="border border-line-strong px-5 py-3 text-sm hover:bg-paper-deep" onClick={() => setShown(n => n + 12)}>Show {Math.min(12,result.length-shown)} more cases</button></div>}
    </section>
  );
}
