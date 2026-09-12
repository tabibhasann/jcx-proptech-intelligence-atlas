"use client";

import { useEffect, useMemo, useState } from "react";
import { useDataset, DatasetLoading, DatasetError, DatasetEmpty } from "@/components/useDataset";
import type { CaseRecord } from "@/data/types";
import { CaseGradeMark, Unknown } from "@/components/marks";

type Filter = "all" | "A1" | "B2" | "B3";

const FILTERS: [Filter, string, string][] = [
  ["all", "All 44", "Every record"],
  ["B3", "Vendor stories", "Customer or vendor reported"],
  ["B2", "Stronger customer evidence", "Better framing, still reported"],
  ["A1", "Filing grade failures", "Filings and accounts"],
];

export function EvidenceExplorer() {
  const state = useDataset<CaseRecord[]>("cases.json");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  // Deep-link: /evidence#QOC-001 scrolls and highlights.
  const [anchor, setAnchor] = useState<string | null>(null);
  useEffect(() => {
    setAnchor(window.location.hash.replace("#", "") || null);
  }, []);
  useEffect(() => {
    if (state.status === "ready" && anchor) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ block: "start" });
    }
  }, [state, anchor]);

  const result = useMemo(() => {
    if (state.status !== "ready") return null;
    let rows = state.data;
    if (filter !== "all") rows = rows.filter((c) => c.grade === filter);
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter((c) =>
        [c.organization, c.vendor, c.category, c.geography, c.lifecycle, c.measuredOutcome]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(q)),
      );
    }
    return rows;
  }, [state, filter, query]);

  if (state.status === "loading") return <DatasetLoading label="the case library" />;
  if (state.status === "error") return <DatasetError label="The case library" />;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border border-line bg-paper-raised p-4" role="search">
        <label className="grow sm:max-w-sm">
          <span className="sr-only">Search cases by customer, vendor, or workflow</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “procurement”, “handover”, “Singapore”…"
            className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2 text-sm outline-none placeholder:text-ink-soft/70 focus:border-mark"
          />
        </label>
        <fieldset className="flex flex-wrap items-center gap-1">
          <legend className="sr-only">Filter by who reported it</legend>
          {FILTERS.map(([v, label, hint]) => (
            <button
              key={v}
              type="button"
              onClick={() => setFilter(v)}
              aria-pressed={filter === v}
              title={hint}
              className={`rounded-sm border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                filter === v
                  ? "border-ink bg-ink text-paper-raised"
                  : "border-line-strong bg-paper text-ink-2 hover:border-mark"
              }`}
            >
              {label}
            </button>
          ))}
        </fieldset>
        {(query || filter !== "all") && <button type="button" className="border border-line-strong px-3 py-2 text-sm" onClick={() => {setQuery("");setFilter("all");}}>Clear archive filters</button>}
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft" role="status">
          {result?.length ?? 0} of {state.data.length} records
        </p>
      </div>

      {result && result.length === 0 ? (
        <div className="mt-6">
          <DatasetEmpty label="No records match" hint="Nothing in the library matches that combination. Widen the search: an empty result here is a true state." />
        </div>
      ) : (
        <ol className="mt-8 space-y-8">
          {result?.map((c) => (
            <li
              key={c.id}
              id={c.id}
              className={`scroll-mt-24 border bg-paper-raised ${
                anchor === c.id ? "border-mark" : "border-line"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="data font-mono text-sm font-semibold">{c.id}</span>
                  <CaseGradeMark grade={c.grade} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  record checked {c.verificationDate ?? "date not recorded"}
                </span>
              </div>
              <details open={anchor === c.id}>
              <summary className="cursor-pointer px-6 py-5 text-base font-medium leading-relaxed">{c.organization} · {c.vendor}<span className="mt-2 block text-sm font-normal text-ink-soft">{c.geography ?? "Location not recorded"} · Open the result and source</span></summary>
              <div className="grid min-w-0 gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight">
                    {c.organization} <span aria-hidden="true" className="text-mark">×</span> {c.vendor}
                  </h2>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                    {c.geography ?? "geography not provided"} · {c.lifecycle ?? "lifecycle not provided"}
                  </p>
                  {c.category ? (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">{c.category}</p>
                  ) : null}
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">The before picture</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink-2">
                        {c.baselineProblem ?? <Unknown kind="not_provided" />}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">What was tried</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink-2">
                        {c.intervention ?? <Unknown kind="not_provided" />}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="min-w-0 border-l border-line pl-6 max-lg:border-l-0 max-lg:pl-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                    What changed, in the source exact words
                  </p>
                  <p className="mt-2 font-display text-xl font-medium leading-snug">
                    {c.measuredOutcome ?? <Unknown kind="not_provided" />}
                  </p>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                        Period and who was counted
                      </dt>
                      <dd className="mt-0.5 text-ink-2">{c.periodSampleDenominator ?? <Unknown kind="not_provided" />}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Who reported it</dt>
                      <dd className="mt-0.5 text-ink-2">{c.sourceType ?? <Unknown kind="not_provided" />}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-mark-deep">What it still does not prove</dt>
                      <dd className="mt-0.5 border-l-2 border-mark/50 pl-3 text-ink-soft">{c.causalCaveat ?? "Not provided"}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                        What it means for a developer here
                      </dt>
                      <dd className="mt-0.5 text-ink-2">{c.transferability ?? <Unknown kind="not_provided" />}</dd>
                    </div>
                  </dl>
                  {c.sourceUrl ? (
                    <a
                      href={c.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="u-link mt-4 inline-block max-w-full font-mono text-[11px] text-data [overflow-wrap:anywhere]"
                      title={c.sourceUrl}
                    >
                      Open source record ↗
                    </a>
                  ) : null}
                </div>
              </div>
              </details>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-soft">
        Reported, estimated, avoided, identified, potential, and realized are different states.
        Words like up to, estimated, and reported travel with the number. Nothing here forecasts
        any other deployment.
      </p>
    </div>
  );
}
