import type { Metadata } from "next";
import { standards, manifest } from "@/data";

export const metadata: Metadata = {
  title: "Rules that outlast products",
  description:
    "39 standards and frameworks in plain language: what breaks without them, which project question each answers, and what they never prove on their own.",
};

const DOMAIN_ORDER: [string, string][] = [
  ["Design and handover records", "BIM exchange|BIM requirements|BIM coordination|BIM process|BIM/product data|Security/BIM|Semantics/dictionaries|CDE/API"],
  ["Buildings, assets, and tenants", "Enterprise real estate|Asset management|Facility management|Building semantics|Building IoT semantics|Property/building ontology|Digital twin runtime"],
  ["Controls, maps, and sensors", "Building controls|Building/industrial controls|Residential IoT|Geospatial API|IoT/geospatial API|3D city/GIS"],
  ["Carbon, climate, and certification", "Carbon accounting|Carbon/LCA|Climate transition risk|Investor ESG benchmark|Digital connectivity/smart building certification|Environmental management"],
  ["Security, privacy, and AI rules", "Security/privacy|Cyber risk|OT security|AI governance|AI regulation|Privacy/legal|Data governance/legal|Public-sector data/API"],
  ["Provenance: who said what, when", "Provenance"],
];
const sectionId = (title: string) => `std-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;

export default function StandardsPage() {
  const grouped = DOMAIN_ORDER.map(([title, pattern]) => ({
    title,
    items: standards.filter((s) => pattern.split("|").includes(s.domain)),
  }));
  const assigned = new Set(grouped.flatMap((g) => g.items.map((s) => s.id)));
  const rest = standards.filter((s) => !assigned.has(s.id));

  return (
    <div className="grid-paper min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Rules that outlast products · reference
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A technology checklist for the next stage.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Products come and go. Shared definitions, exchange formats, and governance decide
            whether records survive a vendor change, a handover, or an audit. Each entry answers
            one project question. A standard existing never proves any vendor follows it.
          </p>
        </header>
        <nav className="learn-jump" aria-label="Technology checklist topics">{grouped.filter(g => g.items.length).map(g => <a key={g.title} href={`#${sectionId(g.title)}`}>{g.title}</a>)}</nav>

        <div className="mt-12 space-y-14">
          {grouped.map((g) =>
            g.items.length ? (
              <section key={g.title} aria-labelledby={sectionId(g.title)} className="scroll-mt-24">
                <h2 id={sectionId(g.title)} className="font-display text-2xl font-semibold tracking-tight">
                  {g.title}
                </h2>
                <ul className="mt-5 grid gap-4 lg:grid-cols-2">
                  {g.items.map((s) => (
                    <StandardCard key={s.id} s={s} />
                  ))}
                </ul>
              </section>
            ) : null,
          )}
          {rest.length ? (
            <section aria-labelledby="std-other">
              <h2 id="std-other" className="font-display text-2xl font-semibold tracking-tight">
                Further records
              </h2>
              <ul className="mt-5 grid gap-4 lg:grid-cols-2">
                {rest.map((s) => (
                  <StandardCard key={s.id} s={s} />
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StandardCard({ s }: { s: (typeof standards)[number] }) {
  return (
    <li className="flex h-full flex-col border border-line bg-paper-raised p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-semibold leading-tight">{s.name}</h3>
      </div>
      {s.jcxImplication ? (
        <p className="mt-2 text-sm font-medium leading-relaxed text-ink-2">{s.jcxImplication}</p>
      ) : null}
      {s.solves ? <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.solves}</p> : null}
      {s.caveat ? (
        <p className="mt-3 border-l-2 border-mark/50 pl-3 text-xs leading-relaxed text-ink-soft">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mark-deep">Limit · </span>
          {s.caveat}
        </p>
      ) : null}
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        {s.url ? (
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="u-link font-mono text-[11px] text-data">
            Official record ↗
          </a>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">No link recorded</span>
        )}
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
          {s.statusOrVersion ?? "version not recorded"}
        </span>
      </div>
    </li>
  );
}
