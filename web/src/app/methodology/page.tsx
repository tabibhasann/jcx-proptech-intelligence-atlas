import type { Metadata } from "next";
import { manifest } from "@/data";
import { SourceRegister } from "@/components/methodology/SourceRegister";

export const metadata: Metadata = {
  title: "Methodology, evidence & corrections",
  description:
    "How the atlas grades sources and claims, keeps unknowns visible, handles identity and status, refreshes records, separates public from private: and how to file a correction.",
};

const STATUS_DEFS: [string, string][] = [
  ["active", "Operating, as observed at the recorded date"],
  ["cohort-selected", "Selected for a cohort: not deployment evidence"],
  ["pilot", "Pilot stage, as reported"],
  ["acquired", "Acquired; lineage preserved"],
  ["acquired-active", "Acquired; the product continues"],
  ["pivoted", "Changed model; historical identity preserved"],
  ["restructured", "Restructuring documented"],
  ["inactive", "No longer operating in its prior form"],
  ["stealth/unclear", "Unclear from current sources"],
  ["unknown", "Not yet verified: which does not mean failed"],
];

export default function MethodologyPage() {
  const m = manifest;
  return (
    <div className="grid-paper min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Method · evidence · corrections
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            How to trust, question and update this atlas
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Generated {m.generatedAt} · research cut-off {m.researchCutoff}. The atlas answers four
            questions without mixing their evidence: what exists, what each entity actually does, how
            credible and ready it is, and what a developer should do next. It is an intelligence
            product: not a vendor directory, investment recommendation or certification.
          </p>
        </header>

        {/* Editorial principles */}
        <section aria-labelledby="principles" className="mt-14">
          <h2 id="principles" className="font-display text-2xl font-semibold tracking-tight">
            Editorial principles
          </h2>
          <ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Evidence before narrative", "Every material statement carries a source, a date and a claim type."],
              ["Facts, claims, interpretation, recommendation stay separate", "You can always tell which sentence came from a company and which is the atlas team’s judgment."],
              ["Lifecycle first; technology second", "A technology label alone does not explain where value is created or who must change behavior."],
              ["Context is part of the product", "A US office case study, a Bangladesh residential developer and a global standard are not directly comparable."],
              ["Uncertainty is visible", "Unknown is a valid value: never a low score disguised as precision."],
              ["No pay-to-rank", "Sponsorship, advertising, introductions or access never alter inclusion, tier, score or wording."],
            ].map(([t, d]) => (
              <div key={t} className="bg-paper-raised p-5">
                <p className="font-display text-base font-semibold leading-tight">{t}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{d}</p>
              </div>
            ))}
          </ul>
        </section>

        {/* Evidence model */}
        <section aria-labelledby="evidence-model" className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="evidence-model" className="font-display text-2xl font-semibold tracking-tight">
              Source quality (S1–S5)
            </h2>
            <table className="mt-5 w-full border-collapse border border-line text-left text-sm">
              <tbody>
                {[
                  ["S1", "Filing, regulator, standard, signed procurement/customer evidence or authoritative documentation"],
                  ["S2", "Company site, press release, vendor/customer case study or accelerator profile"],
                  ["S3", "Reputable independent research or reporting with a clear method"],
                  ["S4", "Structured directory or ecosystem source requiring verification"],
                  ["S5", "Weak discovery signal such as social, listicle or review"],
                ].map(([g, d]) => (
                  <tr key={g} className="border-b border-line last:border-0">
                    <th scope="row" className="data w-14 px-4 py-3 font-semibold">{g}</th>
                    <td className="px-4 py-3 text-xs leading-relaxed text-ink-2">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Claim attribution (C1–C5)</h2>
            <table className="mt-5 w-full border-collapse border border-line text-left text-sm">
              <tbody>
                {[
                  ["C1", "Verified fact"],
                  ["C2", "Corroborated fact with a material limitation"],
                  ["C3", "Clearly attributed company/customer/partner claim"],
                  ["C4", "Atlas analyst interpretation"],
                  ["C5", "Unverified signal"],
                ].map(([g, d]) => (
                  <tr key={g} className="border-b border-line last:border-0">
                    <th scope="row" className="data w-14 px-4 py-3 font-semibold">{g}</th>
                    <td className="px-4 py-3 text-xs leading-relaxed text-ink-2">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs leading-relaxed text-ink-soft">
              In this release all {m.counts.claims} claims carry provisional grades and pending
              claim-level review: {m.claimGradeCounts["C4"] ?? 0} C4 interpretations,{" "}
              {m.claimGradeCounts["C3"] ?? 0} C3 reported claims, {m.claimGradeCounts["C5"] ?? 0} C5
              signals, {m.claimGradeCounts["C2"] ?? 0} C2 and {m.claimGradeCounts["C1"] ?? 0} C1.
              This site displays only attributed (C3-class) claims with their caveats; everything
              else is visibly withheld.
            </p>
          </div>
        </section>

        {/* Status + identity */}
        <section aria-labelledby="status-defs" className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="status-defs" className="font-display text-2xl font-semibold tracking-tight">
              Status vocabulary
            </h2>
            <ul className="mt-5 divide-y divide-line border border-line bg-paper-raised">
              {STATUS_DEFS.map(([s, d]) => (
                <li key={s} className="flex items-baseline gap-4 px-4 py-2.5">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink-2">{s}</span>
                  <span className="text-xs leading-relaxed text-ink-soft">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Identity discipline</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-2">
              <li>· Legal entity, brand, product and program are stored separately.</li>
              <li>· Aliases, former names and acquisition lineage are preserved: PlanGrid should reveal Autodesk lineage; Veev shows Lennar continuation.</li>
              <li>· A shared domain never proves identity: 26 discovery identities sit in a relationship-review queue rather than being force-merged.</li>
              <li>· “Acquired,” “inactive,” “failed,” “product survives” and “parent absorbed it” are different states.</li>
              <li>· Conflicting source values stay visible as conflicts until a reviewer resolves them.</li>
            </ul>
          </div>
        </section>

        {/* Missingness */}
        <section aria-labelledby="missing" className="mt-14 border border-line bg-paper-raised p-6 sm:p-8">
          <h2 id="missing" className="font-display text-2xl font-semibold tracking-tight">
            Unknown is not zero
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
            A blank value can mean not provided, unknown, unreviewed, not applicable, withheld or
            absent from the source schema. This site renders those as explicit states: “not yet
            verified,” “not provided,” “under editorial review”: and never as zero, “none” or a
            middle score. Product-level maturity stays unassigned where deployment evidence is
            missing; {m.reviewQueue.entities_with_tier_conflicts} entities carry unresolved legacy
            tier conflicts and are shown exactly that way.
          </p>
        </section>

        {/* Refresh cadence */}
        <section aria-labelledby="freshness" className="mt-14">
          <h2 id="freshness" className="font-display text-2xl font-semibold tracking-tight">
            Freshness &amp; review cadence
          </h2>
          <div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-3">
            {[
              ["Monthly", "broken/high-priority sources, funding/acquisition/shutdown events, the correction queue"],
              ["Quarterly", "Tier A/B status, product and case refresh; new YC and fund cohorts; Bangladesh market changes"],
              ["Annually", "full taxonomy, scoring weights, standards versions, security/privacy/legal review, archived-record audit"],
            ].map(([t, d]) => (
              <div key={t} className="bg-paper-raised p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mark-deep">{t}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-2">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-soft">
            High-volatility fields: funding, valuation, customer count, employee count, status,
            product ownership: expire faster than a stable standard definition. Retrieval dates are
            shown beside sources; a retrieval date is not a publication date.
          </p>
        </section>

        {/* Visibility policy */}
        <section aria-labelledby="visibility" className="mt-14">
          <h2 id="visibility" className="font-display text-2xl font-semibold tracking-tight">
            Three visibility layers
          </h2>
          <div className="mt-5 grid gap-px border border-line bg-line lg:grid-cols-3">
            {[
              ["Public global atlas", "This experience: reviewed or explicitly attributed global analysis, qualified records with gates visible, labeled discovery cards, dated cases, standards, regional analysis, methodology and corrections.", "What you are reading"],
              ["Client-private chapter", "Operator-specific opportunity hypotheses, current-site observations, pilot canvases, scoring, vendor comparisons and meeting decisions: permissioned, and absent here by design.", "Not in this experience"],
              ["Internal diligence", "Raw notes, unresolved identity/status conflicts, security concerns, contacts, unpublished sources and the correction queue.", "Never exposed"],
            ].map(([t, d, tag]) => (
              <div key={t} className="bg-paper-raised p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mark-deep">{tag}</p>
                <p className="mt-2 font-display text-base font-semibold leading-tight">{t}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-soft">
            Promotion between layers requires a named reviewer and an auditable reason; on any
            conflict, the more restrictive state wins.
          </p>
        </section>

        {/* Corrections */}
        <section aria-labelledby="corrections" className="mt-14">
          <h2 id="corrections" className="font-display text-2xl font-semibold tracking-tight">
            Report a factual issue
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
            Every profile and case carries its sources and dates. A correction request should name
            the record’s stable ID (shown in monospace on every page), the statement in question and
            the supporting evidence. Material corrections are logged as new review events with the
            original statement preserved and marked superseded: never silently overwritten. Negative
            information is not removed because an organization objects; it is corrected when evidence
            supports correction.
          </p>
        </section>

        {/* Source register */}
        <section aria-labelledby="sources" id="sources" className="mt-14 scroll-mt-20">
          <h2 id="sources" className="font-display text-2xl font-semibold tracking-tight">
            The source register
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
            {m.counts.sources.toLocaleString("en-US")} normalized source identities (
            {m.counts.observedSourceVariants.toLocaleString("en-US")} exact observed URL variants)
            back this release. Grades are provisional and domain-level: they describe the source,
            not the truth of any specific claim.
          </p>
          <div className="mt-6">
            <SourceRegister />
          </div>
        </section>
      </div>
    </div>
  );
}
