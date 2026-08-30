import { Chapter, Prose, P, CaveatRail, SceneTitle, LaunchCard, DataPoint } from "../bits";
import { chapter, beat } from "../storyRefs";
import { launchProfiles, getEntity } from "@/data";
import { ExtSource } from "../ExtSource";
import { Reveal } from "@/components/motion/Reveal";

const PRINCIPLES: [string, string][] = [
  ["Workflow precedes marketplace", "Daily operational use creates reliable data; a portal without verified supply is easy to copy."],
  ["Data rights create the moat", "Records, transactions, rules, costs, progress and outcomes must be consented, normalized and exportable."],
  ["Finance follows evidence", "Procurement credit, mortgage and fractional models should come after identity, title, cash-flow and default controls."],
  ["Regulator-connected models scale trust", "Land registry, planning, signatures, investor protection and identity cannot be replaced by a blockchain label."],
  ["AI should draft and coordinate before it autonomously decides", "Title, price, credit, allocation, safety and payment require human review, provenance and appeal."],
  ["Physical operations decide software value", "Supplier quality, delivery, sensor maintenance, field adoption and customer service are part of the product."],
];

const BD_IDS = ["org-proq-cf33256", "org-barikoi-0f8853c", "org-vextrus-988c4a5", "org-truzo-5012b1e"];
const SA_IDS = ["org-landeed-505b2d4", "org-sell-do-33b7307", "org-brick-and-bolt-4809c48"];
const MENA_IDS = ["org-brkz-3da166c", "org-wakecap-a08c5b1", "org-31ventures-1867c79", "org-ke-holdings-beike-860ac7b"];

function Cards({ ids }: { ids: string[] }) {
  return (
    <div role="list" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {ids.map((id) => {
        const e = getEntity(id);
        const lp = launchProfiles.find((l) => l.entityId === id);
        if (!e || !lp) return null;
        return <LaunchCard key={id} entity={e} context={lp.context} why={lp.why} boundary={lp.boundary} />;
      })}
    </div>
  );
}

export function Chapter06() {
  const ch = chapter("chapter-06-regional-transfer");
  const b1 = beat(ch.id, "beat-06-01-bangladesh-and-south-asia");
  const b2 = beat(ch.id, "beat-06-02-mena-asia-and-global-contexts");

  return (
    <Chapter id={ch.id} order={ch.order} kicker="The transfer" title={ch.title}>
      <Prose size="lede">
        <P>
          Technology is mediated by place: language, infrastructure, payments, land and title
          regimes, regulation, labor and climate all change what a product can be. A global
          benchmark is never automatically a Bangladesh implementation recommendation: and
          headquarters, operating coverage, target market and verified deployment are separate facts.
        </P>
      </Prose>

      {/* Bangladesh first */}
      <div className="mt-14">
        <SceneTitle>{b1.title}</SceneTitle>
        <Prose className="mt-5">
          <P>
            Bangladesh’s market gap is <strong>operational trust</strong>: a fragmented development
            market and a document-heavy land environment. Ecosystem signals illustrate scale without
            measuring it: the REHAB member directory displayed 924 members when checked, and the 2024
            fair recorded Tk403.13 crore of sales/bookings with more than 17,000 visitors. These are
            ecosystem signals, not total-market estimates.
            <ExtSource href="https://www.rehab-bd.org/rehab-member/" label="REHAB directory" />
            <ExtSource href="https://www.tbsnews.net/bangladesh/sales-bookings-flats-plots-spaces-exceed-tk403cr-rehab-fair-1028536" label="TBS report" />
          </P>
          <P>
            Government digitization is an enabling layer, not a guarantee of clean or API-accessible
            data: the Ministry of Land publishes online mutation guidance, and national plans describe
            connecting registration, digital records and mutation. Any serious land system here stores
            source document, date, parcel identity, reviewer and confidence for each title assertion;
            it does not issue a simplistic “clean title” promise.
            <ExtSource href="https://mutation.land.gov.bd/nirdeshika" label="Mutation guidance" />
          </P>
        </Prose>
        <div className="mt-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            Bangladesh-native signals: early, strategically useful, not endorsements
          </p>
          <Cards ids={BD_IDS} />
        </div>
        <div className="mt-8">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            South Asian comparators: the most transferable operating patterns
          </p>
          <Cards ids={SA_IDS} />
        </div>
        <Reveal>
          <p className="mt-6 max-w-3xl border border-line bg-paper-deep/50 p-4 text-xs leading-relaxed text-ink-soft">
            Kept deliberately unresolved: Bproperty, PropERP, NirmanBazaar and E-Hishabi carry
            status conflicts or thin public evidence in the corpus. They remain visible as
            uncertainty/watchlist records in the atlas: neither presented as active product
            readiness nor written off as failures.
          </p>
        </Reveal>
      </div>

      {/* MENA + global contexts */}
      <div className="mt-16">
        <SceneTitle>{b2.title}</SceneTitle>
        <Prose className="mt-5">
          <P>
            MENA contributes regulated rails, full-stack transaction models and construction scale;
            Japan contributes developer-led venture engines; China contributes an integrated
            online/offline housing platform at filing scale. Each pattern carries its own constraint
            set: lender APIs and licensing, registry and custody architecture, worker consent and
            device durability, or the sheer difference of the market.
          </P>
        </Prose>
        <div className="mt-8">
          <Cards ids={MENA_IDS} />
        </div>
      </div>

      {/* Cross-regional principles */}
      <div className="mt-16">
        <SceneTitle>Six transfer principles</SceneTitle>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          Atlas synthesis: editorial interpretation of the regional evidence
        </p>
        <ol className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map(([t, d], i) => (
            <li key={t} className="bg-paper-raised p-5">
              <p className="data text-sm text-mark-deep">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-base font-semibold leading-tight">{t}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
        <Prose className="mt-8">
          <P>
            Coverage honesty: English-accessible US and specialist venture ecosystems remain
            disproportionately observable in this corpus. Mainland China is represented by a material
            public comparator, not by a Mandarin-language census; several ASEAN and Sub-Saharan
            African markets remain thin. The map tells you where it is thin.
          </P>
        </Prose>
      </div>

      <CaveatRail items={[...b1.caveats, ...b2.caveats, ...ch.caveats]} />
    </Chapter>
  );
}
