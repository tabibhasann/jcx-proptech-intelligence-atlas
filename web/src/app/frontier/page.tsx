import { FrontierExplorer } from "@/components/frontier/FrontierExplorer";

export default function FrontierRedirect() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-28 sm:px-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">Moved</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
        The frontier is now called Wider search.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-2">
        Same research leads, plainer name.{" "}
        <a href="/discovery" className="u-link">Continue to Wider search</a>.
      </p>
      <div className="mt-10">
        <FrontierExplorer />
      </div>
    </div>
  );
}
