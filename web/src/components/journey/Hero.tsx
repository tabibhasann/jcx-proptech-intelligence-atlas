import { manifest } from "@/data";
import { Reveal, LineReveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { HeroSection } from "./HeroSection";

const COUNTERS: { value: number; label: string; meaning: string }[] = [
  {
    value: manifest.counts.qualifiedEntities,
    label: "companies & programmes",
    meaning: "each one analysed, graded and sourced",
  },
  {
    value: manifest.counts.cases,
    label: "measured outcomes",
    meaning: "with baselines, periods and caveats kept intact",
  },
  {
    value: manifest.counts.discoveryIdentities,
    label: "identities tracked",
    meaning: "the wider search frontier behind the analysis",
  },
  {
    value: manifest.counts.sources,
    label: "sources",
    meaning: "every figure traces back to one of them",
  },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden border-b border-line bg-paper"
    >
      {/* Light falling from the upper right, so the flat field gains a direction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_78%_-10%,rgba(255,255,255,0.85),transparent_60%)]"
      />
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-8 px-4 pb-12 pt-12 sm:px-6 lg:grid-cols-[1.15fr_0.95fr] lg:gap-14 lg:px-10 lg:pb-14 lg:pl-[calc(var(--spacing-rail)+2.5rem)] lg:pt-16">
        <div>
          <Reveal variant="fade">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="eyebrow">The JCX Atlas</span>
              <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
              <span className="eyebrow">Corpus cut-off · 30 August 2026</span>
            </p>
          </Reveal>

          <h1
            id="hero-title"
            className="mt-6 font-display text-hero font-semibold text-balance"
          >
            <LineReveal
              lines={[
                "Property technology is",
                "becoming the",
                <em key="os" className="not-italic text-mark-deep">
                  operating system
                </em>,
                "of the built environment.",
              ]}
            />
          </h1>

          <Reveal variant="fade" delay={520} className="mt-6 max-w-xl">
            <p className="text-lede text-ink-2">
              Land, money, construction, customers and buildings are being rewired into records
              that can be checked and workflows that someone owns.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              This atlas maps who is actually building that shift, what it has measurably
              achieved, and where the claims run ahead of the evidence. Every number on this site
              carries its source, its date and its limits.
            </p>
          </Reveal>

          <Reveal variant="fade" delay={640}>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#start-here"
                className="group inline-flex items-center gap-2.5 border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors duration-300 hover:border-mark-deep hover:bg-mark-deep"
              >
                Start here
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
              <a
                href="#chapter-01-orientation"
                className="slide-link font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2"
              >
                Or go straight to chapter one
              </a>
            </div>
          </Reveal>
        </div>

        {/* Section drawing, drawn by scroll position */}
        <HeroSection />
      </div>

      {/* Scale of the corpus, counted up on entry */}
      <div className="relative border-t border-line bg-paper-raised/70">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px lg:grid-cols-4 lg:pl-[var(--spacing-rail)]">
          {COUNTERS.map((c, i) => (
            <Reveal key={c.label} delay={i * 90} as="div" variant="fade">
              <div className="h-full border-line px-5 py-6 sm:px-6 lg:border-l lg:first:border-l-0">
                <dd className="data text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                  <Counter value={c.value} />
                </dd>
                <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2">
                  {c.label}
                </dt>
                <dd className="mt-1.5 text-[11px] leading-snug text-ink-soft">{c.meaning}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
