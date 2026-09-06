"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDataset, DatasetLoading, DatasetError, DatasetEmpty } from "@/components/useDataset";
import type { DiscoveryRecord } from "@/data/types";
import { StageMark } from "@/components/marks";

const PAGE = 60;

export function FrontierExplorer() {
  const state = useDataset<DiscoveryRecord[]>("discovery.slim.json");
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<string | null>(null);
  const [layer, setLayer] = useState<string | null>(null);

  // Deep links (e.g. /discovery?layer=yc) resolve client-side for static export.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const l = p.get("layer");
    if (l && ["yc", "ecosystem", "qualified_core"].includes(l)) setLayer(l);
    const s = p.get("stage");
    if (s === "qualified_core" || s === "discovery_only") setStage(s);
    const q = p.get("q");
    if (q) setQuery(q);
  }, []);
  const [ecosystem, setEcosystem] = useState<string | null>(null);
  const [reviewOnly, setReviewOnly] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const ecosystems = useMemo(() => {
    if (state.status !== "ready") return [];
    const set = new Map<string, number>();
    for (const d of state.data) for (const e of d.ecosystems) set.set(e, (set.get(e) ?? 0) + 1);
    return [...set.entries()].sort((a, b) => b[1] - a[1]);
  }, [state]);

  const result = useMemo(() => {
    if (state.status !== "ready") return null;
    let rows = state.data;
    if (stage === "qualified_core") rows = rows.filter((d) => d.stage === "qualified_core");
    if (stage === "discovery_only") rows = rows.filter((d) => d.stage === "discovery_only");
    if (layer === "yc") rows = rows.filter((d) => d.ycBatches.length > 0);
    if (layer === "ecosystem") rows = rows.filter((d) => d.ecosystems.length > 0);
    if (layer === "qualified_core") rows = rows.filter((d) => d.stage === "qualified_core");
    if (ecosystem) rows = rows.filter((d) => d.ecosystems.includes(ecosystem));
    if (reviewOnly) rows = rows.filter((d) => d.needsIdentityReview);
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.nameVariants.some((v) => v.toLowerCase().includes(q)) ||
          d.domains.some((v) => v.toLowerCase().includes(q)) ||
          d.ecosystems.some((v) => v.toLowerCase().includes(q)) ||
          d.categorySignals.some((v) => v.toLowerCase().includes(q)) ||
          d.countrySignals.some((v) => v.toLowerCase().includes(q)),
      );
    }
    // Qualified core first, then ecosystem coverage, then name.
    return [...rows].sort(
      (a, b) =>
        (a.stage === "qualified_core" ? 0 : 1) - (b.stage === "qualified_core" ? 0 : 1) ||
        b.ecosystems.length - a.ecosystems.length ||
        a.name.localeCompare(b.name),
    );
  }, [state, stage, layer, ecosystem, reviewOnly, query]);

  if (state.status === "loading") return <DatasetLoading label="the research leads" />;
  if (state.status === "error") return <DatasetError label="The research leads" />;

  const visible = result?.slice(0, shown) ?? [];

  return (
    <div>
      <div className="border border-line bg-paper-raised p-4" role="search">
        <div className="flex flex-wrap items-center gap-3">
          <label className="grow sm:max-w-sm">
            <span className="sr-only">Search leads by name, domain, program, or place</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShown(PAGE);
              }}
              placeholder="Try a name, a domain, a program, a country…"
              className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2 text-sm outline-none placeholder:text-ink-soft/70 focus:border-mark"
            />
          </label>
          <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Standing
            <select
              value={stage ?? ""}
              onChange={(e) => setStage(e.target.value === "" ? null : e.target.value)}
              className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2"
            >
              <option value="">Qualified and leads</option>
              <option value="qualified_core">Qualified records</option>
              <option value="discovery_only">Leads only</option>
            </select>
          </label>
          <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Found in
            <select
              value={layer ?? ""}
              onChange={(e) => setLayer(e.target.value === "" ? null : e.target.value)}
              className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2"
            >
              <option value="">Everywhere</option>
              <option value="qualified_core">Qualified core</option>
              <option value="yc">YC snapshot (30 Aug 2026)</option>
              <option value="ecosystem">Program memberships</option>
            </select>
          </label>
          <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Program
            <select
              value={ecosystem ?? ""}
              onChange={(e) => setEcosystem(e.target.value === "" ? null : e.target.value)}
              className="max-w-56 rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2"
            >
              <option value="">All programs</option>
              {ecosystems.map(([name, n]) => (
                <option key={name} value={name}>
                  {name} ({n})
                </option>
              ))}
            </select>
          </label>
          <label className="flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            <input
              type="checkbox"
              checked={reviewOnly}
              onChange={(e) => setReviewOnly(e.target.checked)}
              className="h-3.5 w-3.5 accent-[#c2410c]"
            />
            Needs identity check only
          </label>
        </div>
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft" role="status">
        {result?.length ?? 0} of {state.data.length} leads
      </p>

      {result && result.length === 0 ? (
        <DatasetEmpty
          label="No leads match"
          hint="Nothing found under that combination. Try a broader term or clear a filter: an empty result here is a true state."
        />
      ) : (
        <>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((d) => (
              <DiscoveryCard key={d.id} d={d} />
            ))}
          </ul>
          {result && result.length > shown ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + PAGE)}
                className="border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors hover:bg-mark-deep hover:border-mark-deep"
              >
                Show {Math.min(PAGE, result.length - shown)} more of {result.length - shown} remaining
              </button>
            </div>
          ) : null}
        </>
      )}

      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-soft">
        Being listed here proves nothing about operation, traction, outcomes, security, or local
        fit. Program membership, a live domain, and a polished directory profile are leads. Leads
        flagged for an identity check stay deliberately separate rather than merged.
      </p>
    </div>
  );
}

function DiscoveryCard({ d }: { d: DiscoveryRecord }) {
  const qualifiedId = d.qualifiedEntityIds[0];
  const description = d.descriptionSignals[0];
  return (
    <li
      className={`flex h-full flex-col border p-5 ${
        d.stage === "qualified_core"
          ? "border-line bg-paper-raised"
          : "border-dashed border-line-strong bg-paper-raised/60"
      }`}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <StageMark stage={d.stage} needsReview={d.needsIdentityReview} />
        {d.ycStatuses.length > 0 ? (
          <span
            className="inline-flex items-center rounded-sm border border-line-strong px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-2"
            title="YC directory status as displayed at snapshot: a source-native signal"
          >
            YC {d.ycBatches[0] ?? ""} · {d.ycStatuses[0]}
          </span>
        ) : null}
      </div>
      {d.stage === "qualified_core" && qualifiedId ? (
        <Link href={`/atlas/${qualifiedId}`} className="mt-3 font-display text-lg font-semibold leading-tight hover:text-mark-deep">
          {d.name}
        </Link>
      ) : (
        <p className="mt-3 font-display text-lg font-semibold leading-tight">{d.name}</p>
      )}
      {description ? (
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-soft" title="Source-native description signal">
          {description}
        </p>
      ) : null}
      {d.ecosystems.length > 0 ? (
        <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.08em] text-ink-soft">
          {d.ecosystems.join(" · ")}
        </p>
      ) : null}
      {d.needsIdentityReview && d.identityNotes.length > 0 ? (
        <p className="mt-2 border-l-2 border-mark/60 pl-3 text-[11px] leading-relaxed text-ink-soft">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-mark-deep">Identity check · </span>
          {d.identityNotes[0]}
        </p>
      ) : null}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
        {d.countrySignals.length > 0 ? <span>{d.countrySignals[0]}</span> : null}
        {d.categorySignals.length > 0 ? <span>{d.categorySignals[0]}</span> : null}
        <span>
          {d.sourceUrlCount} source{d.sourceUrlCount === 1 ? "" : "s"}
        </span>
        {d.profileUrl ? (
          <a href={d.profileUrl} target="_blank" rel="noopener noreferrer" className="u-link text-data">
            Open source ↗
          </a>
        ) : d.candidateUrl ? (
          <a href={d.candidateUrl} target="_blank" rel="noopener noreferrer" className="u-link text-data">
            Open website ↗
          </a>
        ) : null}
      </div>
    </li>
  );
}
