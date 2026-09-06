"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDataset, DatasetLoading, DatasetError, DatasetEmpty } from "@/components/useDataset";
import type { EntitySlim, TaxonomyTerm } from "@/data/types";
import { StatusMark, RecordTypeMark } from "@/components/marks";
import { getSynopsis } from "@/content/featured";

type Sort = "curated" | "name";

const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, H: 4 };
const tierRank = (t: string | null) => (t && t in TIER_ORDER ? TIER_ORDER[t] : 5);

/** Plain language status options mapped to corpus status values. */
const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "active", label: "Operating" },
  { value: "active-public", label: "Operating, publicly listed" },
  { value: "cohort-selected", label: "Cohort selected" },
  { value: "pilot", label: "Pilot stage" },
  { value: "acquired", label: "Acquired" },
  { value: "acquired-active", label: "Acquired, product continues" },
  { value: "pivoted", label: "Changed model" },
  { value: "restructured", label: "Restructured" },
  { value: "inactive", label: "No longer operating" },
  { value: "unclear", label: "Unclear" },
  { value: "unknown", label: "Not yet verified" },
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
    const q = p.get("q");
    if (q) setQuery(q);
    const st = p.get("status");
    if (st) setStatus(st);
  }, []);
  const [recordType, setRecordType] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("curated");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Keep the URL deep-linkable: every filter persists.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (lifecycle) p.set("lifecycle", lifecycle);
    else p.delete("lifecycle");
    if (recordType) p.set("type", recordType);
    else p.delete("type");
    if (status) p.set("status", status);
    else p.delete("status");
    if (query.trim()) p.set("q", query.trim());
    else p.delete("q");
    const url = `${window.location.pathname}${p.size ? `?${p}` : ""}`;
    window.history.replaceState(null, "", url);
  }, [lifecycle, recordType, status, query]);

  const result = useMemo(() => {
    if (entitiesState.status !== "ready") return null;
    let rows = entitiesState.data;
    if (featuredOnly) rows = rows.filter((e) => getSynopsis(e.id));
    if (lifecycle) rows = rows.filter((e) => e.lifecycleCodes.includes(lifecycle));
    if (recordType) rows = rows.filter((e) => e.recordType === recordType);
    if (status) rows = rows.filter((e) => e.status === status);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          (getSynopsis(e.id)?.what ?? "").toLowerCase().includes(q) ||
          (e.description ?? "").toLowerCase().includes(q) ||
          (e.hqCountry ?? "").toLowerCase().includes(q),
      );
    }
    const sorted = [...rows];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else
      sorted.sort(
        (a, b) =>
          (a.launch === null ? 1 : 0) - (b.launch === null ? 1 : 0) ||
          (a.launchOrder ?? 999) - (b.launchOrder ?? 999) ||
          tierRank(a.tier) - tierRank(b.tier) ||
          a.name.localeCompare(b.name),
      );
    return sorted;
  }, [entitiesState, lifecycle, recordType, status, featuredOnly, query, sort]);

  const activeFilters: { label: string; clear: () => void }[] = [
    ...(lifecycle ? [{ label: `Stage ${lifecycle}`, clear: () => setLifecycle(null) }] : []),
    ...(recordType ? [{ label: recordType.replace(/_/g, " "), clear: () => setRecordType(null) }] : []),
    ...(status ? [{ label: STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status, clear: () => setStatus(null) }] : []),
    ...(query.trim() ? [{ label: `“${query.trim()}”`, clear: () => setQuery("") }] : []),
    ...(featuredOnly ? [{ label: "Explained in plain language", clear: () => setFeaturedOnly(false) }] : []),
  ];

  if (entitiesState.status === "loading" || taxonomyState.status === "loading") {
    return <DatasetLoading label="the qualified core" />;
  }
  if (entitiesState.status === "error") return <DatasetError label="The qualified core" />;
  const tax = taxonomyState.status === "ready" ? taxonomyState.data : [];

  return (
    <div>
      {/* Filter bar: one task, one place, one status. Plain words first. */}
      <div className="border border-line bg-paper-raised p-4" role="search">
        <div className="flex flex-wrap items-center gap-3">
          <label className="grow sm:max-w-xs">
            <span className="sr-only">Search by what it does, name, or place</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “booking”, “handover”, “Dhaka”…"
              className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2 text-sm outline-none placeholder:text-ink-soft/70 focus:border-mark"
            />
          </label>
          <FilterSelect
            label="Task"
            value={lifecycle}
            onChange={setLifecycle}
            options={tax.map((t) => ({ value: t.code, label: `${t.label}` }))}
          />
          <FilterSelect
            label="Kind"
            value={recordType}
            onChange={setRecordType}
            options={[
              { value: "organization", label: "Companies" },
              { value: "product_offering", label: "Products" },
              { value: "program_ecosystem", label: "Programs" },
              { value: "project", label: "Projects" },
            ]}
          />
          <FilterSelect
            label="State"
            value={status}
            onChange={setStatus}
            options={STATUS_OPTIONS}
          />
          <label className="flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
              className="h-3.5 w-3.5 accent-[#c2410c]"
            />
            Explained first
          </label>
          <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2"
            >
              <option value="curated">Featured first</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </div>

      {/* Active filters as chips, with counts and clear-all */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft" role="status">
          {result?.length ?? 0} of {entitiesState.data.length} records
        </p>
        {activeFilters.map((f) => (
          <button
            key={f.label}
            type="button"
            onClick={f.clear}
            className="inline-flex items-center gap-1.5 rounded-full border border-mark/50 bg-paper-raised px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-mark-deep transition-colors hover:border-mark"
            title={`Remove filter ${f.label}`}
          >
            {f.label}
            <span aria-hidden="true">✕</span>
          </button>
        ))}
        {activeFilters.length > 1 ? (
          <button
            type="button"
            onClick={() => {
              setLifecycle(null);
              setRecordType(null);
              setStatus(null);
              setQuery("");
              setFeaturedOnly(false);
            }}
            className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft underline underline-offset-2 hover:text-mark-deep"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {/* Cards: the one line answer first, always */}
      {result && result.length === 0 ? (
        <DatasetEmpty
          label="No records match"
          hint="Nothing in the research matches that combination. Widen a filter or clear the search: an empty result here is a true state, not an error."
        />
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {result?.map((e) => {
            const syn = getSynopsis(e.id);
            const oneLiner = syn ? syn.what : e.description;
            return (
            <li key={e.id} className="flex h-full flex-col border border-line bg-paper-raised p-5 transition-colors hover:border-mark/50">
              <div className="flex flex-wrap items-center gap-1.5">
                <RecordTypeMark type={e.recordType} />
                <StatusMark status={e.status} conflict={e.statusConflict} />
              </div>
              <Link
                href={`/atlas/${e.id}`}
                className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight hover:text-mark-deep"
              >
                {e.name}
              </Link>
              <p className="mt-1.5 text-sm leading-snug text-ink-2">
                {oneLiner ?? "What this record does is not yet summarized. Open the profile for the full record."}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                <span>{e.lifecycleCodes.length > 0 ? e.lifecycleCodes.join(" ") : "placement unmapped"}</span>
                <span aria-hidden="true">·</span>
                <span>{e.hqCountry ?? "HQ not yet verified"}</span>
                {syn ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-mark-deep">Explained</span>
                  </>
                ) : null}
              </div>
            </li>
            );
          })}
        </ul>
      )}
      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-ink-soft">
        Unknowns stay visible: a blank field means not yet verified, not a zero. Featured records
        carry a reviewed plain language summary; every profile keeps its sources and review state.
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
