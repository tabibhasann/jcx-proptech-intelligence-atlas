import type { Metadata } from "next";
import { EvidenceExplorer } from "@/components/evidence/EvidenceExplorer";
import { manifest } from "@/data";

export const metadata: Metadata = {
  title: "The Evidence | outcome and failure cases",
  description:
    "44 bounded outcome and failure cases with baseline problem, intervention, exact metric wording, period/sample/denominator, source type, evidence grade, causal caveat and transferability. Never aggregated into a universal ROI score.",
};

export default function EvidencePage() {
  return (
    <div className="grid-paper min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            The Evidence · case library
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            What has actually been measured
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            {manifest.counts.cases} bounded cases: {manifest.caseGradeDist["B3"] ?? 0} graded B3
            (customer/vendor evidence with a missing control, denominator, baseline or independent
            audit), {manifest.caseGradeDist["B2"] ?? 0} graded B2 and {manifest.caseGradeDist["A1"] ?? 0}{" "}
            graded A1 (filing/accounting evidence; both are failure cases). Each packet keeps its
            baseline, exact metric wording, period, denominator, source type, grade and causal
            caveat. Minutes, dollars, percentages, kWh, adoption and avoided cost are never combined
            into one score.
          </p>
        </header>
        <div className="mt-10">
          <EvidenceExplorer />
        </div>
      </div>
    </div>
  );
}
