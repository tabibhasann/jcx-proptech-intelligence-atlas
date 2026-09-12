import type { Metadata } from "next";
import { FrontierExplorer } from "@/components/frontier/FrontierExplorer";
import { manifest } from "@/data";

export const metadata: Metadata = {
  title: "Wider search: leads, not conclusions",
  description:
    "Search 978 research leads: the qualified core, the dated YC snapshot, and 683 ecosystem memberships. Discovery presence is not proof of operation, traction, or outcomes.",
};

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Wider search · research leads
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore the research leads.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Search names, countries and accelerator programmes. These are starting points for research, not evidence of success. For a short introduction, begin with the <a href="/startups" className="u-link">YC startup shortlist</a>.
          </p>
          <details className="mt-5 text-sm leading-relaxed text-ink-soft"><summary className="cursor-pointer">What is included in this archive?</summary><p className="mt-3">{manifest.counts.discoveryIdentities} identities: {manifest.counts.qualifiedEntities} qualified records and {manifest.counts.discoveryOnly} research leads. The 30 August 2026 snapshot includes {manifest.counts.ycProfiles} YC profiles and {manifest.counts.ecosystemPairs} company-to-programme memberships. These categories overlap. {manifest.reviewQueue.discovery_identities_requiring_resolution} identities still need review. A shared domain alone is not treated as the same company.</p></details>
        </header>
        <div className="mt-10">
          <FrontierExplorer />
        </div>
      </div>
    </div>
  );
}
