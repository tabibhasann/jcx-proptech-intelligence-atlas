import Link from "next/link";
import { manifest, taxonomy, TECH_LAYERS } from "@/data";
import { Chapter, Prose, P, CaveatRail, SceneTitle } from "../bits";
import { chapter, beat, standardsOf } from "../storyRefs";
import { StandardRefRow } from "../bits";
import { Reveal } from "@/components/motion/Reveal";

/** Short problem families per lifecycle: from the atlas taxonomy (§3.1). */
const PROBLEMS: Record<string, string> = {
  L1: "landowner/JV pipelines · title & parcels · site search · zoning · permits · geospatial constraints",
  L2: "highest-and-best-use · demand & pricing · scenario planning · generative feasibility · approvals",
  L3: "underwriting · debt & equity · valuation · mortgage · escrow · investor reporting · fractional models",
  L4: "authoring · coordination · CDE · takeoff & estimating · schedule · embodied carbon",
  L5: "procurement · project controls · field reporting · quality & safety · progress · robotics · payments",
  L6: "search & portals · CRM · channel partners · virtual tours · pricing · booking · signatures",
  L7: "resident & tenant apps · access · amenities · payments · community · communication",
  L8: "asset registers · CMMS/IWMS · maintenance · BMS · utilities · space · vendor service",
  L9: "portfolio accounting · performance · risk · acquisition/disposition · benchmarking",
  L10: "energy · carbon · water · climate risk · resilience · indoor environment",
  L11: "snagging · digital handover · warranty · material passports · reuse",
  L12: "master data · identity · interoperability · privacy · security · provenance · AI governance",
};

export function Chapter02() {
  const ch = chapter("chapter-02-lifecycle-map");
  const b1 = beat(ch.id, "beat-02-01-lifecycle");
  const b2 = beat(ch.id, "beat-02-02-technology-layers");
  const maxCount = Math.max(...Object.values(manifest.matrixCounts));

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The map" title={ch.title}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Prose size="lede">
          <P>
            Two axes organize everything in this atlas: <strong>where in the lifecycle</strong> a
            technology acts: from land origination (L1) to handover and end-of-life (L11), with
            data and trust (L12) crossing every phase: and <strong>which technology layer</strong>{" "}
            it belongs to.
          </P>
          <P>
            The separation matters. “AI,” “digital twin,” “IoT” and “blockchain” describe how a
            product works; they say nothing about which workflow, buyer or economic result it
            changes. An organization can also occupy several lifecycle domains: it is never forced
            into one box to simplify a picture.
          </P>
        </Prose>

        {/* Lifecycle strip: counts generated from the manifest */}
        <Reveal>
          <ol className="border border-line bg-paper-raised" aria-label="Qualified entities per lifecycle domain">
            {taxonomy.map((t) => {
              const count = manifest.matrixCounts[t.code] ?? 0;
              return (
                <li key={t.code} className="border-b border-line last:border-0">
                  <Link
                    href={`/atlas?lifecycle=${t.code}`}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-3 px-4 py-2.5 transition-colors hover:bg-paper-deep/60 sm:grid-cols-[3rem_1fr_10rem_auto]"
                  >
                    <span className="data text-sm font-semibold text-mark-deep">{t.code}</span>
                    <span>
                      <span className="block text-sm font-medium leading-tight">{t.label}</span>
                      <span className="mt-0.5 hidden text-[11px] leading-snug text-ink-soft sm:block">
                        {PROBLEMS[t.code]}
                      </span>
                    </span>
                    <span aria-hidden="true" className="hidden h-1.5 w-24 bg-paper-deep sm:block">
                      <span
                        className="block h-full bg-data/70 transition-[width] duration-700 group-hover:bg-mark"
                        style={{ width: `${Math.max(2, (count / maxCount) * 100)}%` }}
                      />
                    </span>
                    <span className="data text-sm text-ink-2">
                      {count}
                      <span className="sr-only"> qualified entities touch {t.label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            Qualified entities touching each domain · entities may span several codes · click to explore
          </p>
        </Reveal>
      </div>

      {/* Technology layers */}
      <div className="mt-20">
        <SceneTitle>{b2.title}</SceneTitle>
        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TECH_LAYERS.map((l) => (
            <div key={l.code} className="bg-paper-raised p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mark-deep">{l.code}</p>
              <p className="mt-2 font-display text-lg font-semibold leading-tight">{l.label}</p>
            </div>
          ))}
          <div className="bg-paper-deep/70 p-5 sm:col-span-2 lg:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Guardrail</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Mechanisms are not use cases. Always connect “AI,” “twin” or “IoT” to user, workflow,
              input, output and economic consequence.
            </p>
          </div>
        </div>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {standardsOf(b2).map((s) => (
            <StandardRefRow key={s.id} s={s} />
          ))}
        </ul>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...ch.caveats]} />
    </Chapter>
  );
}
