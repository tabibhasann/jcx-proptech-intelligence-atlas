import type { Metadata } from "next";
import { AtlasExplorer } from "@/components/atlas/AtlasExplorer";
import { manifest } from "@/data";

export const metadata: Metadata = {
  title: "Company records: what each one does",
  description:
    "295 company, product, program, and project records in plain language: what each does, where it works, what evidence exists, and what remains unknown. Qualified means worth analyzing, never recommended.",
};

export default function AtlasPage() {
  return (
    <div className="grid-paper min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
            Company records · plain language
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            The company research library.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            Find a company by name, country or the problem it solves. Open a record to see its description, sources and unanswered questions. For a curated comparison, <a href="/capabilities" className="u-link">start with the capability matrix</a>.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">Includes {manifest.counts.organizations} companies, {manifest.counts.products} products,{" "}
            {manifest.counts.programs} programs, and {manifest.counts.projects} historical project.
            Every card says what the record does in one line. Being listed means worth analyzing,
            never recommended to buy. Leads that did not qualify live in{" "}
            <a href="/discovery" className="u-link">the wider search</a>.
          </p>
        </header>
        <div className="mt-10">
          <AtlasExplorer />
        </div>
      </div>
    </div>
  );
}
