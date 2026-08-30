"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDataset, DatasetLoading, DatasetError, DatasetEmpty } from "@/components/useDataset";
import type { EntitySlim, TaxonomyTerm } from "@/data/types";
import { StatusMark, TierMark, RecordTypeMark } from "@/components/marks";

type Sort = "curated" | "name" | "sources" | "status";

const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, H: 4 };
const tierRank = (t: string | null) => (t && t in TIER_ORDER ? TIER_ORDER[t] : 5);

const STATUS_OPTIONS = [
  "active",
  "acquired",
  "acquired-active",
  "pilot",
  "pivoted",
  "inactive",
  "stealth_unclear",
  "unknown",
];

export function AtlasExplorer() {
  const entitiesState = useDataset<EntitySlim[]>("entities.slim.json");
  const taxonomyState = useDataset<TaxonomyTerm[]>("taxonomy.json");

  const [query, setQuery] = useState("");
  const [lifecycle, setLifecycle] = useState<string | null>(null);

  // Deep links (e.g. /atlas?lifecycle=L5) resolve client-side for static export.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const lc = p.get("lifecycle");
    if (lc && /^L(1[0-2]|[1-9])$/.test(lc)) setLifecycle(lc);
  }, []);
  const [recordType, setRecordType] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("curated");

  // Keep the URL deep-linkable.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (lifecycle) p.set("lifecycle", lifecycle);
    else p.delete("lifecycle");
    const url = `${window.location.pathname}${p.size ? `?${p}` : ""}`;
    window.history.replaceState(null, "", url);
  }, [lifecycle]);

  const result = useMemo(() => {
    if (entitiesState.status !== "ready") return null;
    let rows = entitiesState.data;
    if (lifecycle) rows = rows.filter((e) => e.lifecycleCodes.includes(lifecycle));
    if (recordType) rows = rows.filter((e) => e.recordType === recordType);
    if (status) rows = rows.filter((e) => e.status === status);
    if (tier === "unresolved") rows = rows.filter((e) => !e.tier || e.tierConflict);
    else if (tier) rows = rows.filter((e) => e.tier === tier && !e.tierConflict);
    if (country) rows = rows.filter((e) => e.hqCountry === country);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          (e.hqCountry ?? "").toLowerCase().includes(q),
      );
    }
    const sorted = [...rows];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "sources") sorted.sort((a, b) => b.sourceCount - a.sourceCount);
    else if (sort === "status") sorted.sort((a, b) => a.status.localeCompare(b.status) || a.name.localeCompare(b.name));
    else
      sorted.sort(
        (a, b) =>
          (a.launch === null ? 1 : 0) - (b.launch === null ? 1 : 0) ||
          (a.launchOrder ?? 999) - (b.launchOrder ?? 999) ||
          tierRank(a.tier) - tierRank(b.tier) ||
          a.name.localeCompare(b.name),
      );
    return sorted;
  }, [entitiesState, lifecycle, recordType, status, tier, country, query, sort]);

  const countries = useMemo(() => {
    if (entitiesState.status !== "ready") return [];
    const set = new Map<string, number>();
    for (const e of entitiesState.data) {
      if (e.hqCountry) set.set(e.hqCountry, (set.get(e.hqCountry) ?? 0) + 1);
    }
    return [...set.entries()].sort((a, b) => b[1] - a[1]);
  }, [entitiesState]);

  if (entitiesState.status === "loading" || taxonomyState.status === "loading") {
    return <DatasetLoading label="the qualified core" />;
  }
  if (entitiesState.status === "error") return <DatasetError label="The qualified core" />;
  const tax = taxonomyState.status === "ready" ? taxonomyState.data : [];

  return (
    <div>
      {/* Filter bar */}
      <div className="border border-line bg-paper-raised p-4" role="search">
        <div className="flex flex-wrap items-center gap-3">
          <label className="grow sm:max-w-xs">
            <span className="sr-only">Search the qualified core</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or country…"
              className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2 text-sm outline-none placeholder:text-ink-soft/70 focus:border-mark"
            />
          </label>
          <FilterSelect
            label="Lifecycle"
            value={lifecycle}
            onChange={setLifecycle}
            options={tax.map((t) => ({ value: t.code, label: `${t.code} · ${t.label}` }))}
          />
          <FilterSelect
            label="Record type"
            value={recordType}
            onChange={setRecordType}
            options={[
              { value: "organization", label: "Organizations" },
              { value: "product_offering", label: "Product offerings" },
              { value: "program_ecosystem", label: "Programs / ecosystems" },
              { value: "project", label: "Projects" },
            ]}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={STATUS_OPTIONS.map((s) => ({ value: s, label: s.replace("_", " ") }))}
          />
          <FilterSelect
            label="Relevance tier"
            value={tier}
            onChange={setTier}
            options={[
              { value: "A", label: "Tier A: core" },
              { value: "B", label: "Tier B: strategic" },
              { value: "C", label: "Tier C: emerging" },
              { value: "D", label: "Tier D: context" },
              { value: "H", label: "Tier H: historical" },
              { value: "unresolved", label: "Unresolved / unreviewed" },
            ]}
          />
          <FilterSelect
            label="HQ country"
            value={country}
            onChange={setCountry}
            options={countries.map(([c, n]) => ({ value: c, label: `${c} (${n})` }))}
          />
          <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2"
            >
              <option value="curated">Launch set first</option>
              <option value="name">Name A–Z</option>
              <option value="sources">Source count</option>
              <option value="status">Status</option>
            </select>
          </label>
        </div>
      </div>

      {/* Result meta */}
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft" role="status">
        {result?.length ?? 0} of {entitiesState.data.length} records
        {lifecycle ? ` · touching ${lifecycle}` : ""}
        {result && result.length === 0 ? ": no records match these filters" : ""}
      </p>

      {/* Cards */}
      {result && result.length === 0 ? (
        <DatasetEmpty
          label="No records match"
          hint="Try widening the filters. An empty result is a true state of the corpus: not an error."
        />
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {result?.map((e) => (
            <li key={e.id} className="flex h-full flex-col border border-line bg-paper-raised p-5 transition-colors hover:border-mark/50">
              <div className="flex flex-wrap items-center gap-1.5">
                <RecordTypeMark type={e.recordType} />
                <StatusMark status={e.status} conflict={e.statusConflict} />
                {e.launch ? (
                  <span className="inline-flex items-center rounded-sm border border-mark/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-mark-deep">
                    launch set
                  </span>
                ) : null}
              </div>
              <Link
                href={`/atlas/${e.id}`}
                className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight hover:text-mark-deep"
              >
                {e.name}
              </Link>
              <div className="mt-3 flex flex-wrap gap-1">
                {e.lifecycleCodes.length > 0 ? (
                  e.lifecycleCodes.map((c) => (
                    <span
                      key={c}
                      className="rounded-sm border border-line-strong px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-ink-2"
                    >
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-[10px] tracking-[0.08em] text-ink-soft hatch rounded-sm border border-line px-1.5 py-0.5">
                    lifecycle unmapped
                  </span>
                )}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                <TierMark tier={e.tier} conflict={e.tierConflict} />
                <span>{e.hqCountry ?? "HQ not yet verified"}</span>
                <span aria-hidden="true">·</span>
                <span>{e.sourceCount} source{e.sourceCount === 1 ? "" : "s"}</span>
                {e.mrl ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>MRL {e.mrl}</span>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-soft">
        Qualified records keep their unknowns: blank maturity means deployment evidence is missing,
        not a zero. Tiers express relevance to a developer/operator decision: they are not quality
        ranks. Every profile carries its sources, review state and caveats.
      </p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
      {label}
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
        className="max-w-44 rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
