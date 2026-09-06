import { Chapter, Prose, P, CaveatRail, SceneTitle } from "../bits";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Chapter 10: the public-safe opportunity translation.
 *
 * The story manifest's chapter 10 is jcx_private and is deliberately NOT
 * emitted into the public bundle. This scene is authored as public, generic,
 * conditional synthesis: the decision frameworks and the capability sequence
 * as atlas interpretation: with no client-specific observations, pilot
 * canvases, owners, baselines or vendor/account strategy.
 */

const SEQUENCE: [string, string][] = [
  ["Governed project truth", "One approved project/unit record feeding every channel: website, sales, customer updates: before any intelligence above it."],
  ["Connected lead-to-booking", "Lead source, consent, response, qualification, visit, offer, booking and collection as one traceable chain."],
  ["Land & JV evidence", "Source-linked landowner/JV workflow: parcel, parties, documents, diligence, allocations, approvals, statements."],
  ["Delivery & handover trust", "Documents, procurement, progress evidence, issues, payment and handover connected to accountable owners."],
  ["Operations & energy", "Asset registers, meters, BMS points and service levels ready before any optimization claim."],
  ["Bounded AI", "Agents only where ground truth, permissions, human fallback and measurement already exist."],
];

const DECISIONS: [string, string, string][] = [
  ["Buy / configure", "The workflow is mature and not differentiating", "CRM core, CDE/defects, CMMS, identity, analytics, meter/BMS platform"],
  ["Build", "A local workflow or data asset creates strategic advantage, or no product fits", "Landowner/JV records, approved project/unit service, bilingual portals, local rules and payments"],
  ["Partner / co-develop", "Specialized data, hardware, implementation or legal integration is required", "BIM deployment, geospatial/title evidence, BMS/IoT, construction vision, bank connectors"],
  ["Paid venture-client pilot", "A startup can solve one measured problem in 8–12 weeks", "Procurement, site capture, energy, document workflow or customer-service agent"],
  ["Invest", "Repeated operational value plus strategic distribution benefit plus separate investment merit", "Only after at least two successful deployments and full diligence, never a condition for a pilot"],
];

export function Chapter10() {
  return (
    <Chapter
      id="chapter-10-opportunity"
      order={10}
      kicker="The opportunity"
      title="What this could mean for a developer in Bangladesh"
    >
      <Reveal>
        <div className="mb-10 max-w-3xl border border-mark/50 bg-paper-raised p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mark-deep">
            Visibility boundary
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            This chapter is the public, conceptual layer. JCX-specific site observations, pilot
            canvases, baselines, owners and vendor/account strategy live in a permissioned private
            chapter that is not part of this experience. What follows is a conditional atlas
            hypothesis: valid only after discovery confirms the operator’s actual systems, process
            ownership, portfolio, priorities and baselines.
          </p>
        </div>
      </Reveal>

      <Prose size="lede">
        <P>
          The credible ambition is not “use the most AI.” It is to become the market’s{" "}
          <strong>evidence-led developer</strong>: easier to evaluate, easier to buy from, easier to
          partner land with, easier to finance, easier to monitor and easier to live or work with:           because every important promise connects to a governed record and an accountable workflow.
        </P>
      </Prose>

      {/* The sequence */}
      <div className="mt-14">
        <SceneTitle>The sequence matters more than the tools</SceneTitle>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          Atlas synthesis · conditional on discovery · not a committed roadmap
        </p>
        <ol className="mt-8 space-y-0 border-l-2 border-line" aria-label="Capability sequence">
          {SEQUENCE.map(([t, d], i) => (
            <li key={t} className="relative pb-8 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-mark bg-paper"
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-display text-xl font-semibold leading-tight">{t}</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
        <Prose className="mt-8">
          <P>
            Each step is gated by the previous one: no energy AI before meters, BMS points and
            operators exist; no customer portal before the data behind it is reliable; no venture
            fund before ordinary pilots can scale. The sequence is less theatrical than “automate
            everything.” It is also the difference between becoming a technology pioneer and merely
            looking like one.
          </P>
        </Prose>
      </div>

      {/* Decision frame */}
      <div className="mt-16">
        <SceneTitle>Build, buy, partner, pilot or invest</SceneTitle>
        <Reveal>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse border border-line text-left text-sm">
              <caption className="sr-only">Decision frame: when to buy, build, partner, pilot or invest</caption>
              <thead>
                <tr className="border-b border-line bg-paper-deep/60">
                  <th scope="col" className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Decision</th>
                  <th scope="col" className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Use when</th>
                  <th scope="col" className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Generic examples</th>
                </tr>
              </thead>
              <tbody>
                {DECISIONS.map(([d, when, ex]) => (
                  <tr key={d} className="border-b border-line last:border-0 hover:bg-paper-raised">
                    <th scope="row" className="px-4 py-3 font-display text-base font-semibold">{d}</th>
                    <td className="px-4 py-3 text-ink-2">{when}</td>
                    <td className="px-4 py-3 text-ink-soft">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>

      <CaveatRail
        items={[
          "This sequence is a hypothesis until discovery validates systems, process ownership, portfolio, priorities and baselines.",
          "Vendor-reported outcomes elsewhere in this atlas are never a forecast for any specific operator.",
          "Legal, title, finance, privacy and security questions require qualified local professionals; this atlas spots issues: it does not advise.",
        ]}
      />
    </Chapter>
  );
}
