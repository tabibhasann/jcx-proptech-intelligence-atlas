import Link from "next/link";
import { longDate, manifest, taxonomy } from "@/data";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";

/** The four things this site holds, and where each one lives. */
const LAYERS: {
  href: string;
  n: number;
  unit: string;
  title: string;
  body: string;
}[] = [
  {
    href: "/atlas",
    n: manifest.counts.qualifiedEntities,
    unit: "records",
    title: "The atlas",
    body: "Companies, programmes and products worth analysing, each with its status, its place in the building life cycle and the sources behind it.",
  },
  {
    href: "/evidence",
    n: manifest.counts.cases,
    unit: "cases",
    title: "The evidence",
    body: "Outcomes somebody actually measured, kept whole: the baseline, the period, the number, and what it still does not prove.",
  },
  {
    href: "/frontier",
    n: manifest.counts.discoveryIdentities,
    unit: "identities",
    title: "The frontier",
    body: "The wider search behind the atlas, including everything that was found but not promoted. Leads, not conclusions.",
  },
  {
    href: "/standards",
    n: manifest.counts.standards,
    unit: "frameworks",
    title: "The standards",
    body: "The interoperability, information-management and governance layer that outlives any individual product.",
  },
];

/** The three marks that appear beside almost every statement on the site. */
const GRAMMAR: [string, string, string][] = [
  [
    "Who said it",
    "C1 to C5",
    "A verified fact and a company press release do not get the same badge. C3 means the company said it. C4 means we drew the conclusion.",
  ],
  [
    "How solid the source is",
    "S1 to S5",
    "A regulator filing outranks a directory listing. The grade travels with the number wherever it appears.",
  ],
  [
    "What is still unknown",
    "◌",
    "Blank fields are labelled rather than filled in. “Not yet verified” is a real answer here, and it is used often.",
  ],
];

export function StartHere() {
  return (
    <>
      {/* Orientation. Dark on purpose: it marks a full stop before the story. */}
      <section
        id="start-here"
        aria-labelledby="start-here-title"
        className="on-dark grain relative scroll-mt-14 overflow-hidden bg-dark text-dark-ink"
      >
        <div
          className="grid-paper-dark pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_20%_0%,rgba(194,65,12,0.16),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28 lg:pl-[calc(var(--spacing-rail)+2.5rem)]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="eyebrow">Start here</p>
              <h2
                id="start-here-title"
                className="mt-4 font-display text-chapter font-semibold text-balance"
              >
                What this is, before anything else
              </h2>
              <div aria-hidden="true" className="mt-6 h-px w-24 bg-mark" />
            </Reveal>

            <Reveal delay={100}>
              <div className="max-w-2xl space-y-5 text-[15px] leading-relaxed text-dark-ink-2 sm:text-base">
                <p className="text-lede text-dark-ink">
                  A research atlas of the technology reshaping how buildings get financed, built,
                  sold and run, assembled from public evidence and published with its limits
                  attached.
                </p>
                <p>
                  It was built to answer a working question rather than to rank vendors: if a
                  developer wanted to modernise how it operates, what does the record actually
                  support? So the interesting parts are often the failures, the missing baselines
                  and the gap between a pilot announcement and a measured result.
                </p>
                <p className="text-dark-ink-soft">
                  It is research, not advice, and a listing here is never a recommendation to buy.
                  Coverage is deliberate rather than exhaustive: complete for the directories and
                  ecosystems it snapshots, selective everywhere else. The cut-off is{" "}
                  {longDate(manifest.researchCutoff)}, and nothing has been refreshed since.
                </p>
              </div>
            </Reveal>
          </div>

          {/* What is inside */}
          <div className="mt-20 lg:mt-24">
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark-ink-soft">
                What is inside
              </h3>
            </Reveal>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {LAYERS.map((l, i) => (
                <Reveal key={l.href} as="li" delay={i * 80} variant="scale">
                  <Link
                    href={l.href}
                    className="lift group flex h-full flex-col border border-dark-line bg-dark-2/80 p-6"
                  >
                    <span className="data text-4xl font-medium tracking-tight text-dark-ink">
                      <Counter value={l.n} />
                    </span>
                    <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dark-ink-faint">
                      {l.unit}
                    </span>
                    <span className="mt-5 font-display text-xl font-semibold text-dark-ink transition-colors duration-300 group-hover:text-dark-mark">
                      {l.title}
                    </span>
                    <span className="mt-2 text-[13px] leading-relaxed text-dark-ink-soft">
                      {l.body}
                    </span>
                    <span className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-dark-mark">
                      Open
                      <span
                        aria-hidden="true"
                        className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl font-mono text-[11px] leading-relaxed text-dark-ink-faint">
                These four layers overlap on purpose. A company can sit in the atlas and the
                frontier at once, so the totals should never be added together.
              </p>
            </Reveal>
          </div>

          {/* How to read the marks */}
          <div className="mt-20 lg:mt-24">
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-dark-ink-soft">
                How to read a claim
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-dark-ink-2">
                Small badges sit next to figures throughout the site. They exist so you never have
                to guess how much weight a number can carry.
              </p>
            </Reveal>
            <dl className="mt-8 grid gap-px border border-dark-line bg-dark-line sm:grid-cols-3">
              {GRAMMAR.map(([term, mark, body], i) => (
                <Reveal key={term} as="div" delay={i * 80} variant="fade">
                  <div className="h-full bg-dark-2 p-6">
                    <span className="inline-flex items-center gap-2 rounded-sm border border-dark-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-dark-mark">
                      {mark}
                    </span>
                    <dt className="mt-4 font-display text-lg font-semibold text-dark-ink">
                      {term}
                    </dt>
                    <dd className="mt-2 text-[13px] leading-relaxed text-dark-ink-soft">{body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={100}>
              <p className="mt-6 font-mono text-[11px] text-dark-ink-faint">
                <Link href="/methodology" className="u-link text-dark-data">
                  The full grading method, refresh policy and correction log
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The life cycle key. Its codes appear on every card, so it is explained
          once, prominently, instead of hidden in a tooltip. */}
      <section
        aria-labelledby="lifecycle-key-title"
        className="border-b border-line bg-paper-deep/50"
      >
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20 lg:pl-[calc(var(--spacing-rail)+2.5rem)]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">The spine of the whole atlas</p>
                <h2
                  id="lifecycle-key-title"
                  className="mt-3 font-display text-scene font-semibold"
                >
                  Twelve stages, from raw land to the data layer
                </h2>
              </div>
              <p className="max-w-md text-[13px] leading-relaxed text-ink-soft">
                Every record is placed on this spine. When you see{" "}
                <span className="data rounded-sm border border-line-strong px-1.5 py-0.5 text-[11px]">
                  L7
                </span>{" "}
                on a card, this is the list it refers to.
              </p>
            </div>
          </Reveal>

          <ol className="mt-9 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {taxonomy.map((t, i) => (
              <Reveal key={t.code} as="li" delay={Math.min(i * 35, 350)} variant="fade">
                <Link
                  href={`/atlas?lifecycle=${t.code}`}
                  className="group flex h-full items-baseline gap-3 bg-paper-raised px-5 py-4 transition-colors duration-300 hover:bg-paper"
                >
                  <span className="data text-xs text-mark-deep">{t.code}</span>
                  <span className="text-sm leading-snug text-ink-2 transition-colors duration-300 group-hover:text-mark-deep">
                    {t.label}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={80}>
            <p className="mt-5 max-w-2xl text-[11px] leading-relaxed text-ink-soft">
              Stage and technology type are tracked as separate axes, so a single company can span
              several stages without the map pretending it does everything.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
