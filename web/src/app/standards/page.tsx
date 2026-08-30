import type { Metadata } from "next";
import { standards, manifest } from "@/data";

export const metadata: Metadata = {
  title: "Standards & governance: the durable layer",
  description:
    "39 standards and frameworks across interoperability, information management, building controls, GIS, carbon, security, privacy and AI governance. A standard's existence is not proof of implementation.",
};

const DOMAIN_ORDER: [string, string][] = [
  ["BIM & information exchange", "BIM exchange|BIM requirements|BIM coordination|BIM process|BIM/product data|Security/BIM|Semantics/dictionaries|CDE/API"],
  ["Enterprise, asset & facility semantics", "Enterprise real estate|Asset management|Facility management|Building semantics|Building IoT semantics|Property/building ontology|Digital twin runtime"],
  ["Controls, GIS & sensors", "Building controls|Building/industrial controls|Residential IoT|Geospatial API|IoT/geospatial API|3D city/GIS"],
  ["Carbon, climate & ESG", "Carbon accounting|Carbon/LCA|Climate transition risk|Investor ESG benchmark|Digital connectivity/smart building certification|Environmental management"],
  ["Security, privacy & AI governance", "Security/privacy|Cyber risk|OT security|AI governance|AI regulation|Privacy/legal|Data governance/legal|Public-sector data/API"],
  ["Provenance", "Provenance"],
];

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
            The durable layer · reference registry
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {manifest.counts.standards} standards &amp; frameworks
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Interoperability, information management, controls, GIS, carbon, security, privacy and
            AI governance. These are reference records: a standard’s existence does not prove any
            vendor implements it, and a framework does not establish compliance. Bangladesh legal
            material is issue-spotting: not legal advice.
          </p>
        </header>

        <div className="mt-12 space-y-14">
          {grouped.map((g) =>
            g.items.length ? (
              <section key={g.title} aria-labelledby={`std-${g.title}`}>
                <h2 id={`std-${g.title}`} className="font-display text-2xl font-semibold tracking-tight">
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
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">{s.id}</span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-ink-soft">
        {s.statusOrVersion ?? "version not recorded"}
        {s.license ? ` · ${s.license}` : ""}
      </p>
      {s.solves ? <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.solves}</p> : null}
      <dl className="mt-4 space-y-3 border-t border-line pt-4 text-xs leading-relaxed">
        {s.adoption ? (
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">Adoption / maturity</dt>
            <dd className="mt-0.5 text-ink-2">{s.adoption}</dd>
          </div>
        ) : null}
        {s.jcxImplication ? (
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
              Implication for a developer/operator
            </dt>
            <dd className="mt-0.5 text-ink-2">{s.jcxImplication}</dd>
          </div>
        ) : null}
        {s.caveat ? (
          <div>
            <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-mark-deep">Caveat</dt>
            <dd className="mt-0.5 border-l-2 border-mark/50 pl-3 text-ink-soft">{s.caveat}</dd>
          </div>
        ) : null}
      </dl>
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        {s.url ? (
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="u-link font-mono text-[11px] text-data">
            official record ↗
          </a>
        ) : (
          <span />
        )}
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
          as of {s.asOf ?? "undated"}
        </span>
      </div>
    </li>
  );
}
