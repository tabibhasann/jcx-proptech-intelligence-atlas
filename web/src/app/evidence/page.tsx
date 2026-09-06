import type { Metadata } from "next";
import { EvidenceExplorer } from "@/components/evidence/EvidenceExplorer";
import { manifest } from "@/data";

export const metadata: Metadata = {
  title: "Measured cases: what the record supports",
  description:
    "44 bounded outcome and failure records: what was tried, what changed, over what period, reported by whom, and what it still does not prove. Filing records are separate from vendor stories.",
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
            {manifest.counts.cases} bounded records. {manifest.caseGradeDist["B3"] ?? 0} are
            vendor or customer stories (useful, not independently checked).{" "}
            {manifest.caseGradeDist["B2"] ?? 0} carry stronger customer framing, and{" "}
            {manifest.caseGradeDist["A1"] ?? 0} are filing grade failures. Every packet keeps its
            before picture, its period, who reported it, and its limit. Nothing here is a forecast.
          </p>
        </header>
        <div className="mt-10">
          <EvidenceExplorer />
        </div>
      </div>
    </div>
  );
}
