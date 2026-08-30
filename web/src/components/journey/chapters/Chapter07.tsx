import { Chapter, Prose, P, CaveatRail, SceneTitle, LaunchCard } from "../bits";
import { chapter, beat, claimsOf } from "../storyRefs";
import { launchProfiles, getEntity, ecosystems, manifest } from "@/data";
import { EvidenceNote } from "@/components/evidence/EvidenceNote";
import { Reveal } from "@/components/motion/Reveal";

const FUNNEL: [string, string][] = [
  ["Discovered", "An official cohort or credible portfolio confirms identity"],
  ["Verified", "Current status, product, legal entity, ownership and geography are checked"],
  ["Evidence-qualified", "Named customers, use context, limitations and at least one decision-relevant outcome are documented"],
  ["Deployment-qualified", "Localization, integration, security, implementation capacity and a measurable pilot design pass review"],
];

const PROGRAM_IDS = ["org-jll-spark-b674956", "org-31ventures-1867c79", "org-saudi-proptech-hub-rega-e45df16", "org-metaprop-portfolio-bda9b60"];

export function Chapter07() {
  const ch = chapter("chapter-07-venture-client");
  const b1 = beat(ch.id, "beat-07-01-ecosystem-engines");
  const b2 = beat(ch.id, "beat-07-02-pilot-logic");
  const claims = claimsOf(b1).filter((c) => !c.withheld && c.claim);
  const maxPairs = Math.max(...ecosystems.map((e) => e.pairs));

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The access layer" title={ch.title}>
      <Prose size="lede">
        <P>
          Built-environment startups face a constraint software startups do not: they need real
          projects, buildings, users, operational data, hardware access and credible references.
          That makes property owners and contractors unusually powerful <strong>venture
          clients</strong>: and makes program design matter more than pitch events.
        </P>
        <P>
          The best programs connect startups with actual deployment owners and production decisions.
          The weakest end with a demo day and no procurement path. Membership, investment and cohort
          badges are market-access signals: not deployment, outcome or investment recommendations.
        </P>
      </Prose>

      {/* Program profiles with evidence threads */}
      <div className="mt-14">
        <SceneTitle>{b1.title}</SceneTitle>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PROGRAM_IDS.map((id) => {
            const e = getEntity(id);
            const lp = launchProfiles.find((l) => l.entityId === id);
            if (!e || !lp) return null;
            const claim = claims.find((c) => c.claim?.entityId === id);
            return (
              <li key={id} className="flex h-full flex-col">
                <LaunchCard entity={e} context={lp.context} why={lp.why} boundary={lp.boundary} />
                {claim?.claim ? (
                  <div className="border border-t-0 border-line bg-paper-deep/40 p-4">
                    <p className="text-xs leading-relaxed text-ink-2">
                      Reported scale: <span className="font-medium">{claim.claim.text}</span>
                    </p>
                    <div className="mt-2">
                      <EvidenceNote claim={claim.claim} compact />
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      {/* The discovery index */}
      <div className="mt-16">
        <SceneTitle>The ecosystem discovery index: memberships, not company counts</SceneTitle>
        <Prose className="mt-5">
          <P>
            Beyond a logo shortlist, the corpus preserves{" "}
            <strong>{manifest.counts.ecosystemPairs} deduplicated company–ecosystem pairs across 11
            specialist families and 20 named portfolio, cohort and regional labels</strong>, resolving
            to {manifest.counts.ecosystemLinkedIdentities} identities. The same company intentionally
            appears once per ecosystem: overlap is evidence, not a deduplicated “company total.”
            Every row is discovery-only.
          </P>
        </Prose>
        <Reveal>
          <ul className="mt-8 space-y-2" aria-label="Ecosystem membership pairs by program label">
            {ecosystems.map((e) => (
              <li key={e.name} className="grid grid-cols-[minmax(0,18rem)_1fr_3rem] items-center gap-3">
                <span className="truncate text-sm font-medium" title={e.name}>{e.name}</span>
                <span aria-hidden="true" className="h-1.5 bg-paper-deep">
                  <span className="block h-full bg-data/70" style={{ width: `${(e.pairs / maxPairs) * 100}%` }} />
                </span>
                <span className="data text-right text-sm text-ink-2">
                  {e.pairs}
                  <span className="sr-only"> membership pairs</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
          Source-native snapshots · captured {ecosystems[0]?.captureDate ?? manifest.researchCutoff} · portfolio presence is not traction
        </p>
      </div>

      {/* The funnel + pilot logic */}
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <SceneTitle>{b2.title}</SceneTitle>
          <ol className="mt-6 border border-line bg-paper-raised">
            {FUNNEL.map(([t, d], i) => (
              <li key={t} className="flex gap-4 border-b border-line px-5 py-4 last:border-0">
                <span className="data mt-0.5 text-sm text-mark-deep">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-semibold">{t}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Prose>
          <P>
            The venture-client pattern inverts the usual sequence. Instead of “invest, then hope for
            adoption,” the operator defines one precise problem and baseline, invites a small provider
            set, selects on evidence and local fit rather than pitch quality, pays for a bounded
            8–12-week pilot on one real project, and pre-agrees the stop, extend and scale gates
            before the pilot starts.
          </P>
          <P>
            Investment becomes a separate decision: taken only after repeated, measured operational
            value, and never as a condition for running a pilot. Publishing the result, with caveats
            and with both parties’ approval, turns a pilot into institutional memory rather than
            marketing.
          </P>
          <P>
            This framing is the public, conceptual version of the model. Operator-specific pilot
            canvases, owners, baselines and account strategy are permissioned private material and do
            not appear in this experience.
          </P>
        </Prose>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...ch.caveats]} />
    </Chapter>
  );
}
