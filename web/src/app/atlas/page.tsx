import type { Metadata } from "next";
import { AtlasExplorer } from "@/components/atlas/AtlasExplorer";
import { manifest } from "@/data";

export const metadata: Metadata = {
  title: "The Atlas: qualified core",
  description:
    "The evidence-qualified core of the corpus: 295 typed entities: organizations, product offerings, programs and a historical project: filterable by lifecycle, status, tier and geography. Qualified does not mean endorsed.",
};

export default function AtlasPage() {
  return (
    <div className="grid-paper min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            The Atlas · qualified core
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {manifest.counts.qualifiedEntities} evidence-qualified records
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            {manifest.counts.organizations} organizations, {manifest.counts.products} product
            offerings, {manifest.counts.programs} programs/ecosystems and {manifest.counts.projects}{" "}
            historical project. Inclusion means “worth analyzing”: never “recommended to buy.”
            Records with unresolved tiers, missing maturity evidence or pending claim review are
            labeled exactly that way. The wider search frontier lives in{" "}
            <a href="/frontier" className="u-link">the discovery layer</a>.
          </p>
        </header>
        <div className="mt-10">
          <AtlasExplorer />
        </div>
      </div>
    </div>
  );
}
