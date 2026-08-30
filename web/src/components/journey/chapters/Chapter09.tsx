import Link from "next/link";
import { Chapter, Prose, P, CaveatRail, SceneTitle, StandardRefRow } from "../bits";
import { chapter, beat, standardsOf } from "../storyRefs";
import { manifest } from "@/data";
import { Reveal } from "@/components/motion/Reveal";

const TESTS: [string, string][] = [
  ["Syntactic", "Can a second system parse and validate the IFC/BCF/IDS/JSON/OpenAPI/OGC output?"],
  ["Semantic", "Do “floor area,” “unit available,” “handover date,” “chiller” and “Scope 2” share definition, unit and version?"],
  ["Process", "Can users complete a round trip: requirement → exchange → issue → approval → handover: without manual re-entry?"],
  ["Operational", "Does the connection have identity, authorization, audit, retries, monitoring, offline behavior and an incident owner?"],
];

export function Chapter09() {
  const ch = chapter("chapter-09-standards-and-trust");
  const b1 = beat(ch.id, "beat-09-01-interoperability");
  const b2 = beat(ch.id, "beat-09-02-operational-and-ai-governance");

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The durable layer" title={ch.title}>
      <Prose size="lede">
        <P>
          Applications will change; identifiers, definitions, history and evidence must survive
          them. The strategic mistake is to postpone interoperability until after vendor selection.
          The {manifest.counts.standards} standards and frameworks in this registry are the layer
          that outlives products: and a standard’s existence is never proof of implementation.
        </P>
      </Prose>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <SceneTitle>{b1.title}</SceneTitle>
          <ul className="mt-6 grid content-start gap-4">
            {standardsOf(b1).map((s) => (
              <StandardRefRow key={s.id} s={s} />
            ))}
          </ul>
        </div>
        <div>
          <SceneTitle>{b2.title}</SceneTitle>
          <ul className="mt-6 grid content-start gap-4">
            {standardsOf(b2).map((s) => (
              <StandardRefRow key={s.id} s={s} />
            ))}
          </ul>
        </div>
      </div>

      <Prose className="mt-10">
        <P>
          No single standard spans the lifecycle. IFC is not an ERP; BACnet is not a data
          dictionary; a cloud-twin runtime is not a neutral model; GRESB is not a building database;
          and an API is not an information-management process. The durable advantage is the governed
          mapping among them.
        </P>
      </Prose>

      {/* Four integration tests */}
      <div className="mt-14">
        <SceneTitle>Four tests for every “integration” claim</SceneTitle>
        <Reveal>
          <ol className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
            {TESTS.map(([t, q]) => (
              <li key={t} className="bg-paper-raised p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mark-deep">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{q}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="mt-8">
          <Link
            href="/standards"
            className="u-link font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2"
          >
            Open the full standards registry →
          </Link>
        </div>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...ch.caveats]} />
    </Chapter>
  );
}
