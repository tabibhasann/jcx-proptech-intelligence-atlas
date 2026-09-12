import type { Metadata } from "next";
import { longDate, manifest } from "@/data";
import { SourceRegister } from "@/components/methodology/SourceRegister";

export const metadata: Metadata = {
  title: "Method: how claims are graded",
  description:
    "How this research grades sources and claims, keeps unknowns visible, handles identity and status, and how to file a correction.",
};

const STATUS_DEFS: [string, string][] = [
  ["active", "Operating, as observed at the recorded date"],
  ["cohort-selected", "Selected for a cohort, not deployment evidence"],
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
            Method · how to read every number
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            How to trust, question, and correct this research
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Published {longDate(m.generatedAt)} · research cut-off {longDate(m.researchCutoff)}. Four
            questions stay separate throughout: what exists, what each record does, how solid the
            evidence is, and what to do next. Research, not a vendor directory or investment advice.
          </p>
        </header>
        <nav className="learn-jump" aria-label="Methodology sections"><a href="#principles">Research rules</a><a href="#evidence-model">Evidence labels</a><a href="#status-defs">Company status</a><a href="#freshness">Research dates</a><a href="#corrections">Corrections</a><a href="#sources">Source register</a></nav>

        {/* Editorial principles */}
        <section aria-labelledby="principles" className="mt-14">
          <h2 id="principles" className="font-display text-2xl font-semibold tracking-tight">
            Six rules the whole site follows
          </h2>
          <ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Evidence before narrative", "Every figure carries its source, its date, and who reported it."],
              ["Reporters and analysts stay separate", "Company words and our conclusions never share a badge."],
              ["Place first, technology second", "A tool label alone never explains who changes behavior or what it costs."],
              ["Context travels with the number", "A US office case, a Dhaka developer, and a global standard are not directly comparable."],
              ["Unknown is a real answer", "Not yet verified is never a zero, a low score, or a quiet guess."],
              ["No pay to rank", "Money, access, or introductions never change inclusion or wording."],
            ].map(([t, d]) => (
              <li key={t} className="bg-paper-raised p-5">
                <p className="font-display text-base font-semibold leading-tight">{t}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Evidence model */}
        <section aria-labelledby="evidence-model" className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="evidence-model" className="font-display text-2xl font-semibold tracking-tight">
              How solid is the source (S1 to S5)
            </h2>
            <table className="mt-5 w-full border-collapse border border-line text-left text-sm">
              <tbody>
                {[
                  ["S1", "Filing, regulator, standard, signed evidence, or official technical document"],
                  ["S2", "Company site, press release, vendor case study, or program profile"],
                  ["S3", "Independent research or reporting with a clear method"],
                  ["S4", "Directory or database that still needs verification"],
                  ["S5", "Weak signal such as social posts or listicles: leads only"],
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
            <h2 className="font-display text-2xl font-semibold tracking-tight">Who said it (C1 to C5)</h2>
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
              claim-level review: {m.claimGradeCounts["C4"] ?? 0} analyst interpretations,{" "}
              {m.claimGradeCounts["C3"] ?? 0} company reported claims, {m.claimGradeCounts["C5"] ?? 0}{" "}
              weak signals, {m.claimGradeCounts["C2"] ?? 0} corroborated, and{" "}
              {m.claimGradeCounts["C1"] ?? 0} verified. Public pages show attributed company reported
              claims with their limits; everything else stays visibly withheld.
            </p>
          </div>
        </section>

        {/* Status + identity */}
        <section aria-labelledby="status-defs" className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 id="status-defs" className="font-display text-2xl font-semibold tracking-tight">
              What each status word means
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
            <h2 className="font-display text-2xl font-semibold tracking-tight">Why similar names stay separate</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-2">
              <li>· Company, brand, product, and program are stored as different records.</li>
              <li>· Old names and buyouts stay linked: PlanGrid shows its Autodesk line, Veev shows Lennar continuation.</li>
              <li>· A shared web domain never proves sameness: 26 leads sit in review rather than being force merged.</li>
              <li>· Bought, closed, failed, product survives, and absorbed are five different states.</li>
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
            A blank can mean not provided, unknown, unreviewed, not applicable, or withheld. This
            site writes those states out: not yet verified, not provided, under review. Never a
            zero, never a middle score. {m.reviewQueue.entities_with_tier_conflicts} records carry
            unresolved tier conflicts and show exactly that.
          </p>
        </section>

        {/* Refresh cadence */}
        <section aria-labelledby="freshness" className="mt-14">
          <h2 id="freshness" className="font-display text-2xl font-semibold tracking-tight">
            How records stay fresh
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
            What lives here and what stays private
          </h2>
          <div className="mt-5 grid gap-px border border-line bg-line lg:grid-cols-3">
            {[
              ["This site", "Reviewed global analysis, labeled company records, dated cases, standards, and method. What you are reading.", "What you are reading"],
              ["Private meeting material", "Company specific observations, pilot designs, owners, and vendor strategy. Permissioned, and absent here by design.", "Not on this site"],
              ["Working notes", "Raw notes, unresolved conflicts, contacts, and unpublished sources.", "Never published"],
            ].map(([t, d, tag]) => (
              <div key={t} className="bg-paper-raised p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mark-deep">{tag}</p>
                <p className="mt-2 font-display text-base font-semibold leading-tight">{t}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-soft">
            Moving anything from private to public needs a named reviewer and a written reason. On
            any conflict, the more restrictive state wins.
          </p>
        </section>

        {/* Corrections */}
        <section aria-labelledby="corrections" className="mt-14">
          <h2 id="corrections" className="font-display text-2xl font-semibold tracking-tight">
            Report a factual issue
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
            Every profile and case shows its stable ID in monospace. A correction should name that
            ID, the sentence in question, and the supporting evidence. Material corrections become
            new review events with the earlier statement preserved and marked replaced, never
            quietly overwritten.
          </p>
        </section>

        {/* Source register */}
        <section aria-labelledby="sources" className="mt-14 scroll-mt-20">
          <h2 id="sources" className="font-display text-2xl font-semibold tracking-tight">
            The source register
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
            {m.counts.sources.toLocaleString("en-US")} public source identities (
            {m.counts.observedSourceVariants.toLocaleString("en-US")} exact web addresses observed)
            stand behind this release; internal-only client and system references are withheld.
            Grades are provisional and describe the source kind, not whether any single claim is
            true.
          </p>
          <div className="mt-6">
            <SourceRegister />
          </div>
        </section>
      </div>
    </div>
  );
}
