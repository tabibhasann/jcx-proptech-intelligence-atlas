import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid-paper mx-auto max-w-[1440px] px-4 py-28 sm:px-6 lg:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">404</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        This record does not exist in the corpus.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-2">
        An absent page is a true state here: either the link is wrong, or the record was never part
        of this release. The atlas does not fabricate pages for missing records.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors hover:bg-mark-deep hover:border-mark-deep"
        >
          Return to the journey
        </Link>
        <Link href="/atlas" className="u-link px-1 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
          Search the atlas instead
        </Link>
      </div>
    </div>
  );
}
