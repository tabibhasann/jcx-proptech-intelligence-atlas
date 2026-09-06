import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { RecordTypeMark, StatusMark, TierMark, CaseGradeMark, Unknown } from "@/components/marks";
import type { CaseRecord, Entity, EntitySlim, Standard } from "@/data/types";
import { taxonomyLabel } from "@/data";

/* Chapter shell */
export function Chapter({
  id,
  order,
  kicker,
  title,
  dark = false,
  children,
}: {
  id: string;
  order: number;
  kicker: string;
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-14 ${dark ? "on-dark bg-dark text-[#e8e2d3]" : "bg-paper"}`}
    >
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:pl-[calc(var(--spacing-rail)+2.5rem)] lg:py-28">
        <Reveal>
          <header className="mb-12 max-w-3xl lg:mb-16">
            <p
              className={`font-mono text-[11px] uppercase tracking-[0.22em] ${
                dark ? "text-[#a8a294]" : "text-ink-soft"
              }`}
            >
              Chapter {String(order).padStart(2, "0")} · {kicker}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
            >
              {title}
            </h2>
            <div aria-hidden="true" className={`mt-6 h-px w-24 ${dark ? "bg-mark" : "bg-mark"}`} />
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* Editorial prose */
export function Prose({
  children,
  className = "",
  size = "base",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "base" | "lede";
}) {
  return (
    <div
      className={`max-w-2xl ${
        size === "lede"
          ? "font-display text-xl leading-[1.5] sm:text-2xl sm:leading-[1.45]"
          : "text-[15px] leading-[1.75] sm:text-base"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 first:mt-0">{children}</p>;
}

/* A data point with mandatory unit/context */
export function DataPoint({
  value,
  label,
  note,
  dark = false,
}: {
  value: string;
  label: string;
  note?: string;
  dark?: boolean;
}) {
  return (
    <div className={`border-l-2 pl-4 ${dark ? "border-mark" : "border-mark"}`}>
      <p className="data text-3xl font-medium tracking-tight sm:text-4xl">{value}</p>
      <p className={`mt-1 text-sm leading-snug ${dark ? "text-[#c9c3b4]" : "text-ink-2"}`}>{label}</p>
      {note ? (
        <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.1em] ${dark ? "text-[#8d8779]" : "text-ink-soft"}`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

/* Entity reference card (story layer) */
export function EntityRefCard({ entity, note }: { entity: EntitySlim; note?: string | null }) {
  return (
    <li className="group flex h-full flex-col border border-line bg-paper-raised p-4 transition-colors hover:border-mark/60 on-dark:border-dark-line on-dark:bg-dark-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <RecordTypeMark type={entity.recordType} />
        <StatusMark status={entity.status} conflict={entity.statusConflict} />
      </div>
      <Link
        href={`/atlas/${entity.id}`}
        className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight group-hover:text-mark-deep on-dark:group-hover:text-[#f59e7c]"
      >
        {entity.name}
      </Link>
      {note ? <p className="mt-2 text-xs leading-relaxed text-ink-soft on-dark:text-[#a8a294]">{note}</p> : null}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft on-dark:text-[#8d8779]">
        <span>{entity.lifecycleCodes.length > 0 ? entity.lifecycleCodes.join(" ") : "lifecycle unmapped"}</span>
        <span aria-hidden="true">·</span>
        <span>{entity.hqCountry ?? "HQ not yet verified"}</span>
      </div>
    </li>
  );
}

/* Case reference card */
export function CaseRefCard({ c, note }: { c: CaseRecord; note?: string | null }) {
  return (
    <li className="flex h-full flex-col border border-line bg-paper-raised p-4 on-dark:border-dark-line on-dark:bg-dark-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft on-dark:text-[#8d8779]">
          {c.id}
        </span>
        <CaseGradeMark grade={c.grade} />
      </div>
      <p className="mt-3 font-display text-lg font-semibold leading-tight">
        {c.organization} <span aria-hidden="true" className="text-mark">×</span> {c.vendor}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-2 on-dark:text-[#d9d4c7]">
        <span className="font-medium">Reported:</span> {c.measuredOutcome ?? <Unknown kind="not_provided" />}
      </p>
      {note ? <p className="mt-2 text-xs leading-relaxed text-ink-soft on-dark:text-[#a8a294]">{note}</p> : null}
      <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft on-dark:text-[#8d8779]">
        {c.geography ?? "geography not provided"} · {c.lifecycle ?? "lifecycle not provided"}
      </p>
    </li>
  );
}

/* Standard reference row */
export function StandardRefRow({ s }: { s: Standard }) {
  return (
    <li className="border border-line bg-paper-raised p-4 on-dark:border-dark-line on-dark:bg-dark-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-base font-semibold">{s.name}</p>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft on-dark:text-[#8d8779]">
          {s.id}
        </span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-ink-soft on-dark:text-[#a8a294]">{s.statusOrVersion ?? "version not recorded"}</p>
      {s.solves ? <p className="mt-2 text-sm leading-relaxed text-ink-2 on-dark:text-[#d9d4c7]">{s.solves}</p> : null}
    </li>
  );
}

/* Chapter caveats: the honest boundary, always visible */
export function CaveatRail({ items, dark = false }: { items: string[]; dark?: boolean }) {
  if (!items.length) return null;
  return (
    <aside
      aria-label="Chapter caveats"
      className={`mt-12 max-w-3xl border p-5 ${
        dark ? "border-dark-line bg-dark-2 text-[#a8a294]" : "border-line bg-paper-deep/50 text-ink-soft"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.18em]">Reading limits of this chapter</p>
      <ul className="mt-3 space-y-2 text-xs leading-relaxed">
        {items.map((c, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden="true" className="text-mark">§</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* Launch-profile card with editorial frame */
export function LaunchCard({
  entity,
  context,
  why,
  boundary,
  dark = false,
}: {
  entity: Entity | EntitySlim;
  context?: string;
  why: string;
  boundary: string;
  dark?: boolean;
}) {
  const category =
    "category" in entity ? entity.category : entity.categoryLabels?.[0] ?? null;
  return (
    <div
      className={`flex h-full flex-col border p-5 ${
        dark ? "border-dark-line bg-dark-2" : "border-line bg-paper-raised"
      }`}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <RecordTypeMark type={entity.recordType} />
        <StatusMark status={entity.status} conflict={entity.statusConflict} />
        <TierMark tier={entity.tier} conflict={entity.tierConflict} />
      </div>
      <Link
        href={`/atlas/${entity.id}`}
        className={`mt-3 font-display text-xl font-semibold leading-tight tracking-tight transition-colors ${
          dark ? "hover:text-[#f59e7c]" : "hover:text-mark-deep"
        }`}
      >
        {entity.name}
      </Link>
      {category ? (
        <p className={`mt-1.5 text-sm leading-snug ${dark ? "text-[#d9d4c7]" : "text-ink-2"}`}>{category}</p>
      ) : null}
      {context ? (
        <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.12em] ${dark ? "text-[#8d8779]" : "text-ink-soft"}`}>
          {context}
        </p>
      ) : null}
      <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-[#d9d4c7]" : "text-ink-2"}`}>{why}</p>
      <p
        className={`mt-3 border-l-2 pl-3 text-xs leading-relaxed ${
          dark ? "border-mark/70 text-[#a8a294]" : "border-mark/50 text-ink-soft"
        }`}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.14em]">Boundary · </span>
        {boundary}
      </p>
      <div className={`mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] ${dark ? "text-[#8d8779]" : "text-ink-soft"}`}>
        <span>{entity.lifecycleCodes.length > 0 ? entity.lifecycleCodes.join(" ") : "lifecycle unmapped"}</span>
        <span aria-hidden="true">·</span>
        <span>{entity.hqCountry ?? "HQ not yet verified"}</span>
        <span aria-hidden="true">·</span>
        <span>{entity.sourceCount} source{entity.sourceCount === 1 ? "" : "s"}</span>
      </div>
    </div>
  );
}

/* Section heading inside chapters */
export function SceneTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
      {children}
    </h3>
  );
}

/* Lifecycle chip */
export function LChip({ code }: { code: string }) {
  return (
    <Link
      href={`/atlas?lifecycle=${code}`}
      className="inline-flex items-center gap-1 rounded-sm border border-line-strong px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-ink-2 transition-colors hover:border-mark hover:text-mark-deep on-dark:border-dark-line on-dark:text-[#d9d4c7]"
      title={taxonomyLabel(code)}
    >
      {code}
    </Link>
  );
}
