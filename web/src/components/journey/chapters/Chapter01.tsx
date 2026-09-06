import { Chapter, Prose, P, DataPoint, CaveatRail, SceneTitle } from "../bits";
import { chapter, beat } from "../storyRefs";
import { ExtSource } from "../ExtSource";
import { Reveal } from "@/components/motion/Reveal";

const OS_PARTS: [string, string, string][] = [
  ["01", "Authoritative records", "land, project, unit, customer, contract, cost, asset and service records with named owners"],
  ["02", "Workflow systems", "accountable work moving across the lifecycle, not disconnected apps"],
  ["03", "Physical evidence", "BIM, field capture, sensors and controls tied to decisions"],
  ["04", "Working interfaces", "customer, landowner, contractor, investor and operator interfaces that complete real tasks"],
  ["05", "Bounded intelligence", "analytics and AI acting over governed data: with permissions"],
  ["06", "Human control", "approval, audit, privacy, security and correction for consequential decisions"],
  ["07", "Measured feedback", "feedback that distinguishes a launch, a pilot or a claim from realized value"],
];

const LAYERS: [string, string, string][] = [
  ["295", "qualified entities", "274 organizations, 12 programs/ecosystems, 8 product offerings and 1 historical project: typed analytical records, not “recommended vendors”"],
  ["978", "discovery identities", "the conservatively resolved search frontier joining the qualified core, the full YC snapshot and official ecosystems"],
  ["683", "discovery-only identities", "candidates not promoted to the qualified core, not proven companies"],
  ["128", "YC directory profiles", "a complete dated capture of the official YC Real Estate & Construction directory: 100 Active, 27 Acquired, 1 Public as displayed"],
  ["683", "ecosystem pairs", "company–ecosystem memberships across 11 specialist families and 20 named program labels: memberships, not companies"],
  ["834", "claims & interpretations", "atomic claims with provisional C1–C5 attribution; all pending claim-level editorial review"],
  ["3,896", "source-field assertions", "competing source observations kept separate rather than forced into one scalar"],
  ["44", "outcome & failure cases", "bounded positive, negative and restructured cases with metric context and causal caveat"],
  ["39", "standards & frameworks", "interoperability, information management, controls, GIS, carbon, security, privacy and AI governance"],
  ["1,600", "normalized sources", "conservative URL identities in this release; 1,625 exact observed variants retained"],
];

export function Chapter01() {
  const ch = chapter("chapter-01-orientation");
  const b1 = beat(ch.id, "beat-01-01-thesis");
  const b2 = beat(ch.id, "beat-01-02-corpus-contract");

  return (
    <Chapter id={ch.id} order={ch.order} kicker="Orientation" title={ch.title}>
      {/* Beat 1: the proposition */}
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Prose size="lede">
          <P>
            The frontier of property technology is not a collection of impressive apps. It is the
            gradual construction of a <strong>digital operating system for the built environment</strong>:             one in which every important promise connects to a governed record and an accountable
            workflow.
          </P>
          <P>
            That is this atlas’s interpretation of the evidence, not a settled industry definition.
            What the research shows repeatedly is narrower and more demanding: the highest-value
            pattern is{" "}
            <strong>
              one real problem → one accountable owner → one governed source of truth → one working
              workflow → one measurable result.
            </strong>
          </P>
          <P>
            Everything in this experience follows from that pattern. Companies appear with their
            evidence, not their marketing. Numbers keep their units, periods and caveats. And unknown
            stays unknown.
          </P>
        </Prose>
        <Reveal>
          <ol className="divide-y divide-line border border-line bg-paper-raised" aria-label="Components of the built-environment operating system">
            {OS_PARTS.map(([n, t, d]) => (
              <li key={n} className="flex gap-4 px-5 py-4">
                <span className="data mt-0.5 text-sm text-mark-deep">{n}</span>
                <div>
                  <p className="font-display text-base font-semibold leading-tight">{t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {/* Beat 2: the corpus contract */}
      <div className="mt-20">
        <SceneTitle id="corpus-contract">{b2.title}</SceneTitle>
        <Prose className="mt-5">
          <P>
            Before any company appears, the contract. This is a dated, curated intelligence corpus
            built from complete snapshots of named directories and specialist ecosystems, plus an
            evidence-qualified set of decision-relevant operators, platforms and startups. It is
            comprehensive for its stated analytical scope: it does not claim to enumerate every
            PropTech company in existence, and its layers deliberately overlap. Never add them into a
            single “company count.”
          </P>
        </Prose>
        <Reveal>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse border border-line text-left text-sm">
              <caption className="sr-only">
                Corpus layers, counts and what each count means. Layers overlap; they must not be summed.
              </caption>
              <thead>
                <tr className="border-b border-line bg-paper-deep/60">
                  <th scope="col" className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Layer</th>
                  <th scope="col" className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Count</th>
                  <th scope="col" className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">What the count means</th>
                </tr>
              </thead>
              <tbody>
                {LAYERS.map(([count, layer, meaning]) => (
                  <tr key={layer} className="border-b border-line last:border-0 hover:bg-paper-raised">
                    <th scope="row" className="px-4 py-3 font-medium">{layer}</th>
                    <td className="data px-4 py-3 text-base">{count}</td>
                    <td className="px-4 py-3 text-ink-soft">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 max-w-2xl font-mono text-[11px] leading-relaxed tracking-wide text-ink-soft">
          Counts are generated at build time from data/atlas_manifest.json: the count authority for
          this release. 295 + 128 + 683 is not a company total.
        </p>
      </div>

      {/* The gap that frames everything */}
      <div className="mt-20">
        <SceneTitle>The gap that frames the whole field</SceneTitle>
        <Prose className="mt-5">
          <P>
            Adoption is broad; scaled, measured value is rare. Three dated, independent snapshots
            frame the gap: each is survey or report evidence about its own population, not a
            universal result:
          </P>
        </Prose>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <DataPoint
              value="92% → 5%"
              label="of corporate real-estate teams were running or planning AI pilots: while 5% said they had achieved most program goals"
              note="JLL 2025 CRE technology survey · 1,000+ decision-makers, 16 markets · self-reported"
            />
            <ExtSource href="https://www.jll.com/en-ca/insights/global-real-estate-cre-technology-survey" label="JLL survey" />
          </Reveal>
          <Reveal delay={80}>
            <DataPoint
              value="60 / 70 / 50%"
              label="of investors lacked a unified real-estate technology strategy; occupiers lacked an AI change framework; and sufficient digital/AI talent"
              note="JLL Global Real Estate Outlook 2026 · reported survey shares"
            />
            <ExtSource href="https://www.jll.com/content/dam/jllcom/en/global/documents/reports/research-reports/25-insights-global-real-estate-2026.pdf" label="JLL outlook" />
          </Reveal>
          <Reveal delay={160}>
            <DataPoint
              value="29% / 6%"
              label="3D BIM versus 4D BIM use among European construction firms: demos run far ahead of site practice"
              note="EIB Investment Report 2025/26 · reported adoption shares"
            />
            <ExtSource href="https://www.eib.org/files/publications/20250379-030326-investment-report-2025-en.pdf" label="EIB report" />
          </Reveal>
        </div>
        <Prose className="mt-8">
          <P>
            The strategic meaning: a map that counts pilots or “AI adoption” without showing
            production maturity systematically overstates progress. This atlas therefore keeps
            announced, pilot, production, portfolio-scale and realized-value states separate:             everywhere.
          </P>
        </Prose>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...ch.caveats]} />
    </Chapter>
  );
}
