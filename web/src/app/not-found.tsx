import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid-paper mx-auto max-w-[1440px] px-4 py-28 sm:px-6 lg:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">404</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Nothing in the research matches that address.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2">
        Either the link is wrong, or the record was never part of this release. This site does not
        invent pages for missing records.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors hover:bg-mark-deep hover:border-mark-deep"
        >
          Back to the one minute brief
        </Link>
        <Link href="/atlas" className="u-link px-1 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
          Search company records
        </Link>
        <Link href="/discovery" className="u-link px-1 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
          Search wider leads
        </Link>
      </div>
    </div>
  );
}
