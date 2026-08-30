import Link from "next/link";
import { Chapter, Prose, P, CaveatRail, SceneTitle } from "../bits";
import { chapter } from "../storyRefs";
import { manifest } from "@/data";
import { Reveal } from "@/components/motion/Reveal";

const SOURCE_GRADES: [string, string, string][] = [
  ["S1", "Authoritative & auditable", "filing, regulator, standard, signed procurement/customer evidence, official technical documentation"],
  ["S2", "First-party", "company site, press release, vendor/customer case study, accelerator profile"],
  ["S3", "Independent research", "reputable independent research or reporting with a method"],
  ["S4", "Structured directory", "directory or database requiring verification"],
  ["S5", "Weak discovery signal", "social, listicle or review: discovery only"],
];

const CLAIM_GRADES: [string, string][] = [
  ["C1", "Verified fact: S1 source or two independent sources with matching scope and dates"],
  ["C2", "Corroborated fact: primary source plus credible corroboration, with a material limitation"],
  ["C3", "Reported claim: clearly attributed to a company, customer or partner; not independently verified"],
  ["C4", "Atlas interpretation: analyst inference derived from cited facts"],
  ["C5", "Unverified signal: plausible, supported only by S4/S5 or an incomplete primary source"],
];

export function Chapter11() {
  const ch = chapter("chapter-11-methodology-and-corrections");
  const q = manifest.reviewQueue;

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The trust close" title={ch.title}>
      <Prose size="lede">
        <P>
          An intelligence product earns trust by showing its machinery. Every claim grade, review
          queue and limitation below is part of the product: including the unfinished parts.
        </P>
      </Prose>

      {/* Evidence legend */}
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <SceneTitle>Source quality: grade the source</SceneTitle>
          <Reveal>
            <table className="mt-6 w-full border-collapse border border-line text-left text-sm">
              <caption className="sr-only">Source quality grades S1 to S5</caption>
              <tbody>
                {SOURCE_GRADES.map(([g, label, ex]) => (
                  <tr key={g} className="border-b border-line last:border-0">
                    <th scope="row" className="data w-14 px-4 py-3 text-base font-semibold">{g}</th>
                    <td className="px-4 py-3 font-medium">{label}</td>
                    <td className="px-4 py-3 text-xs leading-relaxed text-ink-soft">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
        <div>
          <SceneTitle>Claim attribution: grade the claim</SceneTitle>
          <Reveal>
            <table className="mt-6 w-full border-collapse border border-line text-left text-sm">
              <caption className="sr-only">Claim attribution grades C1 to C5</caption>
              <tbody>
                {CLAIM_GRADES.map(([g, d]) => (
                  <tr key={g} className="border-b border-line last:border-0">
                    <th scope="row" className="data w-14 px-4 py-3 text-base font-semibold">{g}</th>
                    <td className="px-4 py-3 text-xs leading-relaxed text-ink-2">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-4 text-xs leading-relaxed text-ink-soft">
            A source can be authoritative about a company’s own announcement without independently
            proving the claimed outcome. Legacy A–D and A1/B2/B3 labels belong to older source layers
            and are never automatically mapped onto these scales.
          </p>
        </div>
      </div>

      {/* The open review queue: honest state of the corpus */}
      <div className="mt-16">
        <SceneTitle>The open review queue, published</SceneTitle>
        <Prose className="mt-5">
          <P>
            These are open review states, not failed controls. They stay visible because hiding them
            would imply a finish line the research has not crossed.
          </P>
        </Prose>
        <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {[
            [q.claims_requiring_claim_level_review, "claims pending claim-level editorial review"],
            [q.entities_requiring_editorial_review, "entities with profile-level editorial flags"],
            [q.entities_without_verified_canonical_domain, "entities without a verified canonical domain"],
            [q.entities_with_tier_conflicts, "entities with conflicting legacy tier assertions"],
            [q.discovery_identities_requiring_resolution, "discovery identities in relationship review"],
          ].map(([n, label]) => (
            <div key={label as string} className="bg-paper-raised p-5">
              <dt className="order-2 mt-2 block text-[11px] leading-snug text-ink-soft">{label}</dt>
              <dd className="data order-1 block text-3xl font-medium">{Number(n).toLocaleString("en-US")}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Limitations + corrections */}
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <SceneTitle>Limitations, stated</SceneTitle>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-ink-2">
            {[
              "Public evidence is uneven and selection-biased toward successful vendor/customer stories.",
              "Private deployment, pricing, retention, security and failure data are usually unavailable.",
              "Global companies may have no Bangladesh implementation or local data coverage.",
              "Startup status can change between research and publication.",
              "Directory and ecosystem counts overlap and use different category definitions.",
              "Company-reported scale, traffic, savings and funding are not independently audited unless explicitly stated.",
              "This atlas supports decisions; it is not a procurement endorsement, investment recommendation or guaranteed forecast.",
            ].map((l) => (
              <li key={l} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 font-mono text-mark">:</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SceneTitle>Corrections are part of the record</SceneTitle>
          <Prose className="mt-6">
            <P>
              A correction should create a new review event: never erase what the atlas previously
              stated. Every profile carries its sources, dates, review state and a correction path;
              the full register of {manifest.counts.sources.toLocaleString("en-US")} normalized
              sources is browsable, with provisional domain-level grades labeled as such.
            </P>
            <P>
              High-volatility fields: funding, valuation, customer count, employee count, status and
              product ownership: expire faster than a stable standard definition, and review
              cadences differ accordingly.
            </P>
          </Prose>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/methodology"
              className="border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors hover:bg-mark-deep hover:border-mark-deep"
            >
              Read the full methodology
            </Link>
            <Link
              href="/methodology#sources"
              className="u-link px-1 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2"
            >
              Browse the source register
            </Link>
          </div>
        </div>
      </div>

      <CaveatRail items={ch.caveats} />
    </Chapter>
  );
}
