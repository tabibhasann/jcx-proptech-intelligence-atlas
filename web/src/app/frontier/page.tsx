import type { Metadata } from "next";
import { FrontierExplorer } from "@/components/frontier/FrontierExplorer";
import { manifest } from "@/data";

export const metadata: Metadata = {
  title: "The Frontier: discovery universe",
  description:
    "The 978-identity search frontier: the qualified core, the complete dated YC Real Estate & Construction snapshot and 683 official ecosystem membership pairs. Discovery presence is not proof of operation, traction or outcomes.",
};

export default function FrontierPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            The Frontier · discovery universe
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {manifest.counts.discoveryIdentities} identities, honestly staged
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            This is the search frontier: {manifest.counts.qualifiedEntities} qualified-core
            identities, {manifest.counts.ycProfiles} profiles from the dated YC Real Estate &amp;
            Construction snapshot, and {manifest.counts.ecosystemPairs} company–ecosystem memberships
            resolving to {manifest.counts.ecosystemLinkedIdentities} identities.{" "}
            <strong>{manifest.counts.discoveryOnly} are discovery-only</strong>: candidates, not
            proven companies. Identity resolution is name-first; a shared domain never merges two
            names by itself, and {manifest.reviewQueue.discovery_identities_requiring_resolution}{" "}
            identities carry open identity-review flags.
          </p>
        </header>
        <div className="mt-10">
          <FrontierExplorer />
        </div>
      </div>
    </div>
  );
}
