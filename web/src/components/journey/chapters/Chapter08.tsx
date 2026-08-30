import Link from "next/link";
import { Chapter, Prose, P, CaveatRail, SceneTitle, CaseRefCard } from "../bits";
import { chapter, beat, casesOf } from "../storyRefs";
import { getEntity } from "@/data";
import { StatusMark, RecordTypeMark } from "@/components/marks";
import { Reveal } from "@/components/motion/Reveal";
import { ExtSource } from "../ExtSource";

const TIMELINE: {
  year: string;
  entityId: string;
  event: string;
  lesson: string;
  control: string;
  source: { href: string; label: string };
}[] = [
  {
    year: "2020",
    entityId: "org-sidewalk-labs-quayside-b7600cf",
    event:
      "Waterfront Toronto cancelled the proposed Quayside smart-district agreement in May 2020. Economic conditions were the stated immediate reason; the wider case also raised questions of scope, public legitimacy and data governance.",
    lesson: "Legitimacy and phasing are product requirements.",
    control:
      "Establish public purpose, consent, governance, data rights, viable scope and staged economics before installing a city-scale technology narrative.",
    source: {
      href: "https://www.waterfrontoronto.ca/sites/default/files/documents/plan-development-agreement-amendments-and-sidewalk-labs--termination-notice---termination-effective-date---may-17-2020.pdf",
      label: "Termination notice",
    },
  },
  {
    year: "2021",
    entityId: "org-katerra-0503c58",
    event:
      "Katerra combined design, procurement, factories, technology and project delivery: then filed Chapter 11 in 2021. Vertical integration multiplied execution risk instead of cancelling it.",
    lesson: "Factories and projects do not have software margins.",
    control:
      "Do not apply SaaS growth assumptions to factories and projects. Track utilization, working capital, bonding, supply chain, quality, project margin and governance at each layer.",
    source: {
      href: "https://cases.stretto.com/public/X174/11705/PLEADINGS/1170505222480000000154.pdf",
      label: "Court record",
    },
  },
  {
    year: "2021",
    entityId: "org-zillow-d3dd627",
    event:
      "Zillow’s FY2021 filing records the Offers wind-down and a $407.9m inventory write-down. Forecasting uncertainty interacted with home acquisition, renovation, capacity, market and capital risk.",
    lesson: "Model error became inventory exposure.",
    control:
      "Limit balance-sheet exposure; stress-test price and hold-period assumptions; use human underwriting and exception thresholds; define a kill switch before scaling.",
    source: {
      href: "https://www.sec.gov/Archives/edgar/data/1617640/000161764022000013/z-20211231.htm",
      label: "SEC filing",
    },
  },
  {
    year: "2023",
    entityId: "org-wework-8768417",
    event:
      "WeWork entered Chapter 11 in 2023 and emerged in 2024 after major debt and future-lease-obligation reduction. Flexible customer commitments sat against much longer fixed lease obligations.",
    lesson: "A digital experience cannot repair lease economics.",
    control:
      "Treat utilization, lease duration, downside exposure, asset commitments and capital structure as first-order product metrics.",
    source: {
      href: "https://www.sec.gov/Archives/edgar/data/1813756/000119312524159419/d803133dex993.htm",
      label: "SEC filing",
    },
  },
  {
    year: "2023",
    entityId: "org-veev-by-lennar-844d2b1",
    event:
      "Veev’s independent structure did not continue: but Lennar retained the capability and markets the product as “Veev by Lennar.” Company survival and technology survival are different events.",
    lesson: "Strategic absorption can preserve useful technology.",
    control:
      "Store “acquired,” “assets absorbed,” “product continuing,” “brand retired” and “inactive” as different states. A startup outcome does not settle whether its technology is useful.",
    source: { href: "https://www.lennar.com/new-homes/california/san-francisco-bay-area/santa-rosa/veev-by-lennar", label: "Veev by Lennar" },
  },
  {
    year: "2024",
    entityId: "org-view-inc",
    event:
      "Smart-glass company View entered a prepackaged Chapter 11 process and emerged privately in 2024; the SEC filing records cancellation of existing equity interests.",
    lesson: "Building hardware has commercialization physics.",
    control:
      "Evaluate specification cycles, manufacturing yield, installation, warranty, service, sales cost and financing alongside technical performance.",
    source: {
      href: "https://www.sec.gov/Archives/edgar/data/1811856/000119312524146158/d826528d8k.htm",
      label: "SEC filing",
    },
  },
];

const ANTI_PATTERNS = [
  "treating a property, construction or hardware business as if it had software margins",
  "scaling principal inventory, leases, factories or credit before model and unit economics are stable",
  "confusing funding with product evidence",
  "using AI over uncontrolled source data",
  "announcing a pilot with no production decision",
  "requiring every partner to replace its systems before value appears",
  "ignoring export, migration and vendor-continuity risk",
  "presenting identified or potential savings as realized cash",
  "neglecting regulatory legitimacy, worker and resident consent, and human appeal",
];

export function Chapter08() {
  const ch = chapter("chapter-08-failure-and-risk");
  const b1 = beat(ch.id, "beat-08-01-business-model-failure");
  const b2 = beat(ch.id, "beat-08-02-legitimacy-and-continuity");
  const failureCases = casesOf(b1);

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The reckoning" title={ch.title} dark>
      <Prose size="lede">
        <P>
          Funding is not product evidence. Capital, technology and market attention can coexist with
          failed unit economics, balance-sheet exposure or broken commercialization. This chapter is
          the counterweight: calm, dated, sourced accounts of what failed, what survived and what the
          controls should have been.
        </P>
      </Prose>

      {/* The two A1 filing cases */}
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {failureCases.map((c) => (
          <CaseRefCard key={c.id} c={c} />
        ))}
      </ul>

      {/* Timeline */}
      <div className="mt-16">
        <SceneTitle>Six transitions, six controls</SceneTitle>
        <ol className="mt-8 space-y-0 border-l border-dark-line" aria-label="Failure and restructuring timeline">
          {TIMELINE.map((t, i) => {
            const e = getEntity(t.entityId);
            return (
              <li key={`${t.year}-${i}`} className="relative pb-10 pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 block h-2.5 w-2.5 rounded-full border border-mark bg-dark"
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8d8779]">{t.year}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {e ? (
                    <Link href={`/atlas/${e.id}`} className="font-display text-xl font-semibold hover:text-[#f59e7c]">
                      {e.name}
                    </Link>
                  ) : (
                    <span className="font-display text-xl font-semibold">View</span>
                  )}
                  {e ? <StatusMark status={e.status} /> : null}
                  {e ? <RecordTypeMark type={e.recordType} /> : null}
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#d9d4c7]">{t.event}</p>
                <p className="mt-2 max-w-2xl text-sm font-medium text-[#f0ead9]">{t.lesson}</p>
                <p className="mt-2 max-w-2xl border-l-2 border-mark/70 pl-3 text-xs leading-relaxed text-[#a8a294]">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em]">Control · </span>
                  {t.control}
                </p>
                <p className="mt-2">
                  <ExtSource href={t.source.href} label={t.source.label} />
                </p>
              </li>
            );
          })}
        </ol>
        <p className="max-w-2xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-[#8d8779]">
          Accounting and restructuring evidence establishes events and losses: not that software
          alone caused them. Acquired, inactive, pivoted and absorbed are different states.
        </p>
      </div>

      {/* Anti-patterns */}
      <div className="mt-16">
        <SceneTitle>The recurring anti-patterns</SceneTitle>
        <Reveal>
          <ul className="mt-6 grid gap-px border border-dark-line bg-dark-line sm:grid-cols-2 lg:grid-cols-3">
            {ANTI_PATTERNS.map((a) => (
              <li key={a} className="bg-dark-2 p-5 text-sm leading-relaxed text-[#d9d4c7]">
                <span aria-hidden="true" className="mr-2 font-mono text-mark">✕</span>
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
        <Prose className="mt-8">
          <P>
            The counterweight is not cynicism. PlanGrid’s acquisition lineage and Veev’s continuation
            under Lennar show products outliving their first corporate form; the record keeps them as
            historical identities with successors, not erased names. Failure data is what makes the
            positive evidence in chapter 05 worth trusting.
          </P>
        </Prose>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...ch.caveats]} dark />
    </Chapter>
  );
}
