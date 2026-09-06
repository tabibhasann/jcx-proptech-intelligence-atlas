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
            {manifest.counts.discoveryIdentities} leads, staged honestly
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Everything found while building the research, including what was not promoted.{" "}
            {manifest.counts.qualifiedEntities} records reached the qualified core.{" "}
            <strong>{manifest.counts.discoveryOnly} stayed as leads</strong>: names worth tracking,
            not companies proven. {manifest.counts.ycProfiles} come from the dated YC snapshot of 30
            August 2026, and {manifest.counts.ecosystemPairs} are company to program memberships.
            A shared web domain never merges two names by itself, and{" "}
            {manifest.reviewQueue.discovery_identities_requiring_resolution} leads carry open
            identity review flags.
          </p>
        </header>
        <div className="mt-10">
          <FrontierExplorer />
        </div>
      </div>
    </div>
  );
}
