import { Chapter, Prose, P, CaveatRail, SceneTitle, LaunchCard } from "../bits";
import { chapter, beat, claimsOf } from "../storyRefs";
import { launchProfiles, getEntity } from "@/data";
import { EvidenceNote } from "@/components/evidence/EvidenceNote";
import { Reveal } from "@/components/motion/Reveal";

/* The eight operating archetypes: atlas §5.1, an analytical grouping,
   not an industry league table. */
const ARCHETYPES: [string, string, string][] = [
  ["Integrated digital developer", "Connects land, product, sales, customer and operating data across repeated developments.", "An attractive front-end can hide fragmented delivery and finance systems."],
  ["Owner/operator & capital platform", "Large occupied portfolios and capital programs supply recurring workflow, utility, service, risk and tenant data.", "Strategy/AUM language can be mistaken for asset-level deployment or measurable ROI."],
  ["Digital-infrastructure & logistics platform", "Power, land, planning, interconnection, colocation, logistics and portfolio operations become one infrastructure system.", "Pipeline is not delivered capacity; uptime, energy and customer claims need exact scope."],
  ["Hospitality & destination platform", "Reservation, loyalty, property systems, owner services and destination operations connect physical assets to a global customer platform.", "Asset-light brand scale is not property ownership; destination promises may precede live operations."],
  ["Service/data distribution platform", "Distribution, proprietary data and embedded workflow create compounding network effects.", "Customers can become locked into expensive or overlapping systems."],
  ["Design–build–operate integrator", "Connects BIM, field evidence, safety, cost, delivery and sometimes operations.", "Standardization is hard across projects, subcontractors and countries."],
  ["Industrialized homebuilder", "Repeated product, procurement and buyer processes make automation easier to scale.", "Land cycles, local codes and factory utilization can overwhelm technology gains."],
  ["Venture client / corporate venture engine", "Gives startups capital, distribution, real assets and reference customers.", "Investment or accelerator activity can be mistaken for operational adoption."],
];

const CLAIM_CAPTIONS: Record<string, string> = {
  "clm-a58576aaa003": "Aldar, company-reported for 2024:",
  "clm-da1028f3e569": "JLL, company-reported for 2025:",
  "clm-d1d1dafb61a5": "Prologis, company-reported for 2025:",
  "clm-02ea1a01047d": "CapitaLand, company-reported for 2024:",
  "clm-0543eb71d6f7": "Lendlease technology stack, as reported:",
};

function LaunchGroup({ groupId }: { groupId: string }) {
  const profiles = launchProfiles.filter((l) => l.group === groupId);
  return (
    <div role="list" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {profiles.map((l, i) => {
        const e = getEntity(l.entityId);
        if (!e) return null;
        return (
          <Reveal key={l.entityId} delay={i * 50} as="div" className="contents">
            <LaunchCard entity={e} context={l.context} why={l.why} boundary={l.boundary} />
          </Reveal>
        );
      })}
    </div>
  );
}

export function Chapter03() {
  const ch = chapter("chapter-03-operating-archetypes");
  const b1 = beat(ch.id, "beat-03-01-integrated-developers");
  const b2 = beat(ch.id, "beat-03-02-owner-and-service-platforms");
  const claims = [...claimsOf(b1), ...claimsOf(b2)].filter((c) => !c.withheld && c.claim);

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The operators" title={ch.title}>
      <Prose size="lede">
        <P>
          The most instructive corporate comparators are not the companies with the most futuristic
          demonstrations. They are the firms that connect technology to a repeatable portfolio, an
          operating process, a customer relationship or an investment engine. The research groups
          them into eight operating archetypes: an analytical grouping, not a league table.
        </P>
      </Prose>

      {/* Archetype index */}
      <Reveal>
        <ol className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4" aria-label="Eight operating archetypes">
          {ARCHETYPES.map(([name, advantage, risk]) => (
            <li key={name} className="bg-paper-raised p-5">
              <p className="font-display text-base font-semibold leading-tight">{name}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">{advantage}</p>
              <p className="mt-3 border-t border-line pt-2 text-[11px] leading-relaxed text-ink-soft">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mark-deep">Risk · </span>
                {risk}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Reported signals with evidence threads */}
      <div className="mt-16">
        <SceneTitle>What the strongest operators disclose: and what it does not prove</SceneTitle>
        <Prose className="mt-5">
          <P>
            These figures are company-reported signals with scope and attribution limits. They show
            operating intent and adoption reach; they do not establish causal product ROI. Pull any
            thread to see the claim, its grade, its source and its caveat.
          </P>
        </Prose>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {claims.map((c) =>
            c.claim ? (
              <li key={c.claim.id} className="border border-line bg-paper-raised p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {CLAIM_CAPTIONS[c.claim.id] ?? `${c.claim.entityName}, as reported:`}
                </p>
                <p className="mt-2 font-display text-lg font-medium leading-snug">“{c.claim.text}”</p>
                <div className="mt-3">
                  <EvidenceNote claim={c.claim} compact />
                </div>
              </li>
            ) : null,
          )}
        </ul>
      </div>

      {/* Launch profiles */}
      <div className="mt-16 space-y-14">
        <div>
          <SceneTitle>{b1.title}</SceneTitle>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            Launch profiles 01–08 · editorial selection, not a ranking
          </p>
          <div className="mt-6">
            <LaunchGroup groupId="operators" />
          </div>
        </div>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...ch.caveats]} />
    </Chapter>
  );
}
