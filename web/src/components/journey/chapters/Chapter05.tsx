import Link from "next/link";
import { Chapter, Prose, P, CaveatRail, SceneTitle, CaseRefCard, LaunchCard } from "../bits";
import { chapter, beat, casesOf, entitiesOf } from "../storyRefs";
import { manifest, getEntity, getLaunchProfile } from "@/data";
import { Reveal } from "@/components/motion/Reveal";

const ANATOMY = [
  "baseline problem",
  "intervention",
  "observed result: exact metric wording",
  "period, sample, denominator",
  "source type & evidence grade",
  "causal caveat",
  "transferability to a different context",
];

export function Chapter05() {
  const ch = chapter("chapter-05-outcomes");
  const b1 = beat(ch.id, "beat-05-01-workflow-wins");
  const b2 = beat(ch.id, "beat-05-02-energy-and-physical-world");
  const dist = manifest.caseGradeDist;
  const total = manifest.counts.cases;

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The evidence" title={ch.title}>
      <Prose size="lede">
        <P>
          What separates a pilot announcement from value is a bounded measurement: a named customer,
          a baseline, a period, a denominator and an honest caveat. This corpus holds{" "}
          {total} such cases, positive and negative alike. How they grade out is itself a finding.
        </P>
      </Prose>

      {/* Grade distribution: the honest finding */}
      <Reveal>
        <div className="mt-10 border border-line bg-paper-raised p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            The {total}-case library, by evidence grade
          </p>
          <div className="mt-5 space-y-4">
            {[
              { g: "B3", n: dist["B3"] ?? 0, d: "customer/vendor-reported evidence with a missing control, denominator, baseline or independent audit" },
              { g: "B2", n: dist["B2"] ?? 0, d: "comparatively stronger customer evidence: scope and baseline still reviewed" },
              { g: "A1", n: dist["A1"] ?? 0, d: "filing/accounting evidence: two failure cases establish events and losses, not that software caused them" },
            ].map((row) => (
              <div key={row.g} className="grid grid-cols-[4rem_1fr_auto] items-center gap-4">
                <span className="data text-lg font-semibold">{row.g}</span>
                <span>
                  <span aria-hidden="true" className="block h-2 w-full bg-paper-deep">
                    <span
                      className={`block h-full ${row.g === "A1" ? "bg-data" : row.g === "B2" ? "bg-pass" : "bg-caution"}`}
                      style={{ width: `${(row.n / total) * 100}%` }}
                    />
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-ink-soft">{row.d}</span>
                </span>
                <span className="data text-lg">{row.n}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-soft">
            Public PropTech evidence is much better for creating pilot hypotheses than for promising a
            guaranteed return. Legacy A1/B2/B3 case-library grades are never mechanically translated
            into the S1–S5/C1–C5 scales used elsewhere on this site.
          </p>
        </div>
      </Reveal>

      {/* Anatomy */}
      <div className="mt-16">
        <SceneTitle>The anatomy of an evidence packet</SceneTitle>
        <Reveal>
          <ol className="mt-6 flex flex-wrap items-center gap-2" aria-label="Evidence packet structure">
            {ANATOMY.map((a, i) => (
              <li key={a} className="flex items-center gap-2">
                <span className="border border-line-strong bg-paper-raised px-3 py-2 font-mono text-[11px] tracking-wide text-ink-2">
                  {a}
                </span>
                {i < ANATOMY.length - 1 ? (
                  <span aria-hidden="true" className="font-mono text-mark">→</span>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
        <Prose className="mt-6">
          <P>
            Minutes per purchase order, percentage-point conversion, kWh, avoided cost, portal
            adoption and modelled scenarios answer different questions. They are never combined into
            a universal ROI score, and “potential,” “estimated,” “up to,” “avoided,” “identified”
            and “realized” remain different states.
          </P>
        </Prose>
      </div>

      {/* Featured cases */}
      <div className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <SceneTitle>{b1.title}</SceneTitle>
          <Link href="/evidence" className="u-link font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
            Open the full case library →
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {casesOf(b1).map((c) => (
            <CaseRefCard key={c.id} c={c} />
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <SceneTitle>{b2.title}</SceneTitle>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {casesOf(b2).map((c) => (
            <CaseRefCard key={c.id} c={c} />
          ))}
        </ul>
        <Prose className="mt-8">
          <P>
            The physical layer also produces <em>pathway</em> companies: electrified cement,
            biology-derived cement, open embodied-carbon infrastructure: whose claims remain
            forward-looking or company-reported until scope-specific review. They belong in the
            story precisely because their outcomes are not yet settled.
          </P>
        </Prose>
        <div role="list" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {entitiesOf(b2).map((e) => {
            const full = getEntity(e.id);
            const lp = getLaunchProfile(e.id);
            if (!full || !lp) return null;
            return <LaunchCard key={e.id} entity={full} context={lp.context} why={lp.why} boundary={lp.boundary} />;
          })}
        </div>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...ch.caveats]} />
    </Chapter>
  );
}
