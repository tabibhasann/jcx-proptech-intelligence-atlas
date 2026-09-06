import Link from "next/link";
import { longDate, manifest } from "@/data";
import { Reveal } from "@/components/motion/Reveal";
import { FINDINGS, NEXT_STEP } from "@/content/findings";
import { FEATURED_ORDER, LESSON_ORDER, getSynopsis } from "@/content/featured";
import { getEntity } from "@/data";
import { StatusMark } from "@/components/marks";

/**
 * The one minute brief: the new home page. Five findings first, the worked
 * examples second, the route onward third. Depth stays one click away.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Verdict />
      <Examples />
      <Lessons />
      <Onward />
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="home-title" className="grain relative overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_78%_-10%,rgba(255,255,255,0.85),transparent_60%)]"
      />
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1100px] px-4 pb-14 pt-14 sm:px-6 lg:pt-20">
        <Reveal variant="fade">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="eyebrow">A research briefing for a developer in Bangladesh</span>
            <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
            <span className="eyebrow">Cut-off 30 August 2026</span>
          </p>
        </Reveal>
        <h1 id="home-title" className="mt-6 font-display text-hero font-semibold text-balance">
          What property technology actually delivers, and what to do first.
        </h1>
        <Reveal variant="fade" delay={220} className="mt-6 max-w-2xl">
          <p className="text-lede text-ink-2">
            We studied {manifest.counts.qualifiedEntities} companies and products,{" "}
            {manifest.counts.cases} measured outcomes, and {manifest.counts.standards} standards. The
            short version: connected records beat clever apps, measured results are rare, and the
            first step is one trustworthy sales record.
          </p>
        </Reveal>
        <Reveal variant="fade" delay={320}>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href="#verdict"
              className="group inline-flex items-center gap-2.5 border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors duration-300 hover:border-mark-deep hover:bg-mark-deep"
            >
              Read the five findings
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
            <Link href="/brief" className="slide-link font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
              The five minute version
            </Link>
            <Link href="/story" className="slide-link font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
              The full story
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Verdict() {
  return (
    <section id="verdict" aria-labelledby="verdict-title" className="scroll-mt-14 border-b border-line bg-paper-raised">
      <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="eyebrow">The verdict, in one minute</p>
          <h2 id="verdict-title" className="mt-3 font-display text-chapter font-semibold text-balance">
            Five things worth knowing before anything else
          </h2>
        </Reveal>
        <ol className="mt-10 space-y-0 border-t border-line">
          {FINDINGS.map((f, i) => (
            <Reveal key={f.n} as="li" delay={Math.min(i * 60, 240)} variant="fade">
              <div className="grid gap-2 border-b border-line py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="data text-sm font-semibold text-mark-deep">{f.n}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl">{f.title}</h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2">{f.body}</p>
                  <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-soft">
                    <span className="font-medium text-ink-2">Evidence: </span>
                    {f.evidence}{" "}
                    <span className="font-medium text-ink-2">Limit: </span>
                    {f.limit}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={100}>
          <div className="mt-8 max-w-2xl border-l-2 border-mark pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mark-deep">Suggested next step</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{NEXT_STEP}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Examples() {
  const cards = FEATURED_ORDER.flatMap((id) => {
    const e = getEntity(id);
    const s = getSynopsis(id);
    return e && s ? [{ e, s }] : [];
  });
  return (
    <section aria-labelledby="examples-title" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="eyebrow">Thirteen examples that carry the argument</p>
            <h2 id="examples-title" className="font-display text-chapter font-semibold text-balance">
              Each one says what it does, how it works, and what is still unknown
            </h2>
            <p className="text-[15px] leading-relaxed text-ink-soft">
              Company reported figures stay labeled as reported. Filing records stay separate from
              vendor stories. Open any card for the full profile, sources, and review state.
            </p>
          </div>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ e, s }, i) => (
            <Reveal key={e.id} as="li" delay={Math.min(i * 50, 300)} variant="scale">
              <Link
                href={`/atlas/${e.id}`}
                className="lift group flex h-full flex-col border border-line bg-paper-raised p-6"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <StatusMark status={e.status} conflict={e.statusConflict} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                    {e.hqCountry ?? "HQ not yet verified"}
                  </span>
                </div>
                <span className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-mark-deep">
                  {e.name}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-ink-2">{s.what}</span>
                <span className="mt-3 border-l-2 border-mark/40 pl-3 text-xs leading-relaxed text-ink-soft">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mark-deep">Unknown · </span>
                  {s.unknown}
                </span>
                <span className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-mark-deep">
                  Open the profile
                  <span aria-hidden="true" className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Lessons() {
  const cards = LESSON_ORDER.flatMap((id) => {
    const e = getEntity(id);
    const s = getSynopsis(id);
    return e && s ? [{ e, s }] : [];
  });
  return (
    <section aria-labelledby="lessons-title" className="on-dark grain relative overflow-hidden bg-dark text-dark-ink">
      <div className="grid-paper-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="eyebrow">Three warnings from the filings</p>
          <h2 id="lessons-title" className="mt-3 font-display text-chapter font-semibold text-balance">
            Software does not fix capital structure
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-dark-ink-soft">
            These are dated, sourced accounts of what failed and what survived. Accounting records
            establish events and losses. They do not prove software caused them.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map(({ e, s }, i) => (
            <Reveal key={e.id} as="li" delay={i * 80} variant="scale">
              <Link
                href={s.evidenceHref.startsWith("/evidence") ? s.evidenceHref : `/atlas/${e.id}`}
                className="lift group flex h-full flex-col border border-dark-line bg-dark-2/80 p-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark-mark">{s.evidenceLabel}</span>
                <span className="mt-3 font-display text-xl font-semibold leading-tight transition-colors duration-300 group-hover:text-dark-mark">
                  {e.name}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-dark-ink-soft">{s.evidence}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Onward() {
  const routes: [string, string, string][] = [
    ["/brief", "The five minute findings", "Each finding with its evidence and limit, plus the glossary."],
    ["/story", "The full story", "The reasoning in order, with the deep chapters behind it."],
    ["/atlas", "Company records", "295 profiles in plain language, filterable by task, place, and status."],
    ["/evidence", "Measured cases", "44 outcomes with baselines, periods, and caveats kept whole."],
    ["/discovery", "Wider search", "978 leads, staged honestly: candidates, not conclusions."],
    ["/standards", "Rules that outlast products", "39 standards translated into project questions."],
    ["/methodology", "Method", "How claims are graded and how to file a correction."],
  ];
  return (
    <section aria-labelledby="onward-title" className="bg-paper">
      <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className="eyebrow">Where to go next</p>
          <h2 id="onward-title" className="mt-3 font-display text-chapter font-semibold">
            One minute, five minutes, or the whole record
          </h2>
        </Reveal>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {routes.map(([href, title, body], i) => (
            <Reveal key={href} as="li" delay={Math.min(i * 40, 200)} variant="fade">
              <Link href={href} className="group flex items-baseline gap-4 py-4 sm:gap-6">
                <span className="data w-8 shrink-0 text-xs text-mark-deep">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 grow">
                  <span className="block font-display text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-mark-deep">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-soft">{body}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 font-mono text-mark transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-soft">
          Research cut-off {longDate(manifest.researchCutoff)}. Nothing here is a recommendation to buy, build,
          or invest. Every figure links to its source and its limit.
        </p>
      </div>
    </section>
  );
}
