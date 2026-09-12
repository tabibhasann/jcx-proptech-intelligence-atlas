"use client";

import { useMemo, useState } from "react";
import { useDataset, DatasetLoading, DatasetError, DatasetEmpty } from "@/components/useDataset";
import type { SourceSlim } from "@/data/types";
import { sourceGradeLabel } from "@/components/marks";

const PAGE = 50;
const CLASS_LABELS: Record<string, string> = {
  company_or_product: "Company / product",
  ecosystem_or_investor: "Ecosystem / investor",
  research_or_industry: "Research / industry",
  government_or_regulator: "Government / regulator",
  independent_media: "Independent media",
};

export function SourceRegister() {
  const state = useDataset<SourceSlim[]>("sources.slim.json");
  const [query, setQuery] = useState("");
  const [klass, setKlass] = useState<string | null>(null);
  const [grade, setGrade] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);

  const result = useMemo(() => {
    if (state.status !== "ready") return null;
    let rows = state.data;
    if (klass) rows = rows.filter((s) => s.sourceClass === klass);
    if (grade) rows = rows.filter((s) => s.grade === grade);
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (s) =>
          s.url.toLowerCase().includes(q) ||
          s.domain.toLowerCase().includes(q) ||
          (s.usedByNames ?? "").toLowerCase().includes(q),
      );
    }
    return rows;
  }, [state, query, klass, grade]);

  if (state.status === "loading") return <DatasetLoading label="the source register" />;
  if (state.status === "error") return <DatasetError label="The source register" />;

  const visible = result?.slice(0, shown) ?? [];

  return (
    <div className="border border-line bg-paper-raised">
      <div className="flex flex-wrap items-center gap-3 border-b border-line p-4" role="search">
        <label className="grow sm:max-w-sm">
          <span className="sr-only">Search sources</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(PAGE);
            }}
            placeholder="Search URL, domain or record name…"
            className="w-full rounded-sm border border-line-strong bg-paper px-3 py-2 text-sm outline-none placeholder:text-ink-soft/70 focus:border-mark"
          />
        </label>
        <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
          Class
          <select
            value={klass ?? ""}
            onChange={(e) => setKlass(e.target.value === "" ? null : e.target.value)}
            className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2"
          >
            <option value="">All classes</option>
            {Object.entries(CLASS_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
          Grade
          <select
            value={grade ?? ""}
            onChange={(e) => setGrade(e.target.value === "" ? null : e.target.value)}
            className="rounded-sm border border-line-strong bg-paper px-2 py-2 text-xs normal-case tracking-normal text-ink-2"
          >
            <option value="">All grades</option>
            {["S1", "S2", "S3", "S4"].map((g) => (
              <option key={g} value={g}>
                {sourceGradeLabel(g)}
              </option>
            ))}
          </select>
        </label>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft" role="status">
          {result?.length ?? 0} of {state.data.length} sources
        </p>
        {(query || klass || grade) && <button type="button" className="border border-line-strong px-3 py-2 text-sm" onClick={() => {setQuery("");setKlass(null);setGrade(null);setShown(PAGE);}}>Clear source filters</button>}
      </div>

      {result && result.length === 0 ? (
        <DatasetEmpty label="No sources match" />
      ) : (
        <>
          <ul className="divide-y divide-line">
            {visible.map((s) => (
              <li key={s.id} className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="min-w-0">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link block truncate font-mono text-[12px] text-data"
                    title={s.url}
                  >
                    {s.url}
                  </a>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                    {s.id}
                    {s.usedByNames ? ` · used by: ${s.usedByNames.slice(0, 120)}${s.usedByNames.length > 120 ? "…" : ""}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  <span className="rounded-sm border border-line-strong px-1.5 py-0.5">
                    {s.sourceClass ? (CLASS_LABELS[s.sourceClass] ?? s.sourceClass) : "unclassified"}
                  </span>
                  <span className="rounded-sm border border-line-strong px-1.5 py-0.5" title={s.gradeStatus ?? "provisional"}>
                    {s.grade ?? "ungraded"}
                  </span>
                  <span>{s.lastVerified ?? ""}</span>
                </div>
              </li>
            ))}
          </ul>
          {result && result.length > shown ? (
            <div className="border-t border-line p-4 text-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + PAGE)}
                className="border border-ink bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors hover:bg-mark-deep hover:border-mark-deep"
              >
                Show {Math.min(PAGE, result.length - shown)} more of {result.length - shown} remaining
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
