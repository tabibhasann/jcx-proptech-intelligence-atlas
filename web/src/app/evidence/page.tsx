import type { Metadata } from "next";
import { EvidenceExplorer } from "@/components/evidence/EvidenceExplorer";
import { CurrentReviewedCases } from "@/components/evidence/CurrentReviewedCases";
import { manifest } from "@/data";

export const metadata: Metadata = {
  title: "Measured cases: what the record supports",
  description:
    "Current reviewed cases plus a dated archive: what was tried, what changed, over what period, reported by whom, and what it still does not prove.",
};

export default function EvidencePage() {
  return (
    <div className="grid-paper min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Measured cases · vendor stories and filings, separated
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            What was tried, what changed, and what it still does not prove
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Search a company or country to see a reported result, where it came from and what it cannot tell us. Keep the period and evidence label beside every number. Nothing here is a forecast for Propty.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft">
            The selected cases below are the starting point. The earlier archive is available afterwards if you need more detail. To understand how the businesses work, open <a className="u-link text-data" href="/comparison#jcx-comparative">company and country comparisons</a>.
          </p>
        </header>
        <div className="mt-12">
          <CurrentReviewedCases />
        </div>
        <div className="mt-10">
          <div className="mb-6 max-w-2xl border-l-2 border-mark/60 pl-4 text-sm leading-relaxed text-ink-2">
            <strong>Dated archive:</strong> the {manifest.counts.cases} records below were checked for the earlier research edition. They remain available as supporting context and are labelled by evidence grade.
          </div>
          <EvidenceExplorer />
        </div>
      </div>
    </div>
  );
}
