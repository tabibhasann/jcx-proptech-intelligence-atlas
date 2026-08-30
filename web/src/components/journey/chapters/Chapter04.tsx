import Link from "next/link";
import { Chapter, Prose, P, CaveatRail, SceneTitle, LaunchCard, CaseRefCard } from "../bits";
import { chapter, beat, entitiesOf, casesOf, claimsOf } from "../storyRefs";
import { launchProfiles, getEntity, manifest } from "@/data";
import { EvidenceNote } from "@/components/evidence/EvidenceNote";
import { Reveal } from "@/components/motion/Reveal";

const LADDER: [string, string][] = [
  ["Announced", "A dated strategy, product or partnership statement"],
  ["Prototype", "Demonstrable function in a bounded test environment"],
  ["Pilot", "Named problem, project/site, users, period and success criteria"],
  ["Production", "Live operational workflow with an accountable owner and support"],
  ["Portfolio scale", "Repeated deployment across projects/assets with adoption data"],
  ["Realized value", "Baseline, measured outcome, period and implementation cost"],
  ["Verified value", "Credible customer, filing, assurance or independent evidence, limitations disclosed"],
];

function VendorGroup({ groupId }: { groupId: string }) {
  const profiles = launchProfiles.filter((l) => l.group === groupId);
  return (
    <div role="list" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {profiles.map((l) => {
        const e = getEntity(l.entityId);
        if (!e) return null;
        return <LaunchCard key={l.entityId} entity={e} context={l.context} why={l.why} boundary={l.boundary} />;
      })}
    </div>
  );
}

export function Chapter04() {
  const ch = chapter("chapter-04-workflow-frontier");
  const b1 = beat(ch.id, "beat-04-01-land-and-design");
  const b2 = beat(ch.id, "beat-04-02-construction-evidence");
  const b3 = beat(ch.id, "beat-04-03-customer-finance-operations");

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The frontier" title={ch.title}>
      <Prose size="lede">
        <P>
          Beyond the operators, a frontier of products attacks bounded workflows: feasibility in
          hours instead of weeks, site imagery compared against BIM, one record spanning marketing to
          booking, HVAC that tunes itself against a metered baseline. The pattern that matters is
          never the mechanism: it is the workflow, the buyer and the evidence.
        </P>
      </Prose>

      {/* Maturity ladder */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <ol className="border border-line bg-paper-raised" aria-label="The maturity ladder">
            {LADDER.map(([name, desc], i) => (
              <li key={name} className="flex items-start gap-4 border-b border-line px-5 py-3 last:border-0">
                <span className="data mt-0.5 text-sm text-mark-deep">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <div>
          <Prose>
            <P>
              Every technology claim belongs somewhere on this ladder. Funding, headcount, media
              attention and accelerator membership do not move a company up a single rung by
              themselves: and in this corpus, product-level maturity is deliberately{" "}
              <strong>not inferred</strong> from company scale: where deployment evidence is missing,
              the field stays blank rather than pretending precision.
            </P>
            <P>
              The newest startup wave moves from copilots that draft toward bounded agents that
              coordinate maintenance, leasing, permits, transaction documents and construction
              finance. The strongest near-term cases share high-volume repetitive work, structured
              ground truth, a measurable cycle-time outcome, clear permissions, human escalation and
              reversible action.
            </P>
          </Prose>
        </div>
      </div>

      {/* YC snapshot */}
      <Reveal>
        <div className="mt-12 border border-line bg-paper-raised p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <SceneTitle>The YC snapshot: a dated discovery layer, not a diligence pass</SceneTitle>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              snapshot 2026-08-30
            </span>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="data text-3xl font-medium">{manifest.counts.ycProfiles}</p>
              <p className="mt-1 text-xs leading-snug text-ink-soft">
                unique Real Estate &amp; Construction profiles captured from the official directory
              </p>
            </div>
            <div>
              <p className="data text-3xl font-medium">100 / 27 / 1</p>
              <p className="mt-1 text-xs leading-snug text-ink-soft">
                displayed as Active / Acquired / Public by YC at capture: a source-native signal,
                not a status audit
              </p>
            </div>
            <div>
              <p className="data text-3xl font-medium">69 / 68 / 128</p>
              <p className="mt-1 text-xs leading-snug text-ink-soft">
                overlapping PropTech, Real Estate and Real-Estate-and-Construction directory counts;
                adding them double-counts companies
              </p>
            </div>
            <div className="flex items-end">
              <Link
                href="/frontier?layer=yc"
                className="u-link font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2"
              >
                Search the snapshot in the frontier →
              </Link>
            </div>
          </div>
          <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-ink-soft">
            YC selection and a live directory profile are useful discovery signals. They are not proof
            of production reliability, regulatory suitability, financial strength or transferable
            results. Lifecycle and category tags on snapshot records are analyst inferences and are
            labeled as such.
          </p>
        </div>
      </Reveal>

      {/* Three frontier beats */}
      <div className="mt-20 space-y-20">
        <div>
          <SceneTitle>{b1.title}</SceneTitle>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <VendorCards ids={entitiesOf(b1).map((e) => e.id)} claims={claimsOf(b1)} />
            <ul className="grid content-start gap-4">
              {casesOf(b1).map((c) => (
                <CaseRefCard key={c.id} c={c} />
              ))}
            </ul>
          </div>
        </div>
        <div>
          <SceneTitle>{b2.title}</SceneTitle>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <VendorCards ids={entitiesOf(b2).map((e) => e.id)} claims={claimsOf(b2)} />
            <ul className="grid content-start gap-4">
              {casesOf(b2).map((c) => (
                <CaseRefCard key={c.id} c={c} />
              ))}
            </ul>
          </div>
        </div>
        <div>
          <SceneTitle>{b3.title}</SceneTitle>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <VendorCards ids={entitiesOf(b3).map((e) => e.id)} claims={claimsOf(b3)} />
            <ul className="grid content-start gap-4">
              {casesOf(b3).map((c) => (
                <CaseRefCard key={c.id} c={c} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...b3.caveats, ...ch.caveats]} />
    </Chapter>
  );
}

function VendorCards({ ids, claims }: { ids: string[]; claims: ReturnType<typeof claimsOf> }) {
  const claimByEntity = new Map(
    claims.filter((c) => !c.withheld && c.claim).map((c) => [c.claim!.entityId, c.claim!]),
  );
  return (
    <ul className="grid content-start gap-4 sm:grid-cols-2">
      {ids.map((id) => {
        const e = getEntity(id);
        if (!e) return null;
        const claim = claimByEntity.get(id);
        return (
          <li key={id} className="flex flex-col border border-line bg-paper-raised p-5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center rounded-sm border border-ink-2/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-2">
                {e.recordType === "product_offering" ? "Product" : e.recordType === "program_ecosystem" ? "Program" : e.recordType === "project" ? "Project" : "Organization"}
              </span>
              <span className="inline-flex items-center rounded-sm border border-pass/50 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-pass">
                {e.status}
              </span>
            </div>
            <Link href={`/atlas/${e.id}`} className="mt-3 font-display text-lg font-semibold leading-tight hover:text-mark-deep">
              {e.name}
            </Link>
            {claim ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                {claim.text} <EvidenceNote claim={claim} compact />
              </p>
            ) : null}
            <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
              {e.lifecycleCodes.join(" ") || "lifecycle unmapped"} · {e.hqCountry ?? "HQ not yet verified"}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
