import { manifest } from "@/data";
import { Reveal } from "@/components/motion/Reveal";

const COUNTERS: { value: number; label: string; meaning: string }[] = [
  { value: manifest.counts.qualifiedEntities, label: "qualified entities", meaning: "typed analytical records: not “recommended vendors”" },
  { value: manifest.counts.discoveryIdentities, label: "discovery identities", meaning: "the conservatively resolved search frontier" },
  { value: manifest.counts.cases, label: "outcome & failure cases", meaning: "bounded evidence packets with caveats" },
  { value: manifest.counts.standards, label: "standards & frameworks", meaning: "the durable interoperability layer" },
  { value: manifest.counts.sources, label: "normalized sources", meaning: "URL identities behind the record" },
  { value: manifest.counts.claims, label: "claims & interpretations", meaning: "each graded, dated and pending review" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grid-paper relative overflow-hidden border-b border-line bg-paper"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-16 pt-20 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:px-10 lg:pl-[calc(var(--spacing-rail)+2.5rem)] lg:pb-24 lg:pt-28">
        <div>
          <Reveal>
            <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              <span className="border border-line-strong bg-paper-raised px-2 py-1">Issued {manifest.generatedAt}</span>
              <span className="border border-line-strong bg-paper-raised px-2 py-1">
                Research cut-off {manifest.researchCutoff}
              </span>
              <span className="border border-mark/60 bg-paper-raised px-2 py-1 text-mark-deep">
                Curated corpus: not a total market
              </span>
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-8 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]"
            >
              Property technology is becoming the{" "}
              <em className="not-italic text-mark-deep">operating system</em> of the built environment.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
              Land, capital, construction, customers, buildings and climate are being rewired into
              governed records and accountable workflows. This atlas maps who is building that system,
              who is deploying it, what has actually been measured: and what a developer in Bangladesh
              could do next. Every material statement here can be traced to a source, a date and a caveat.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#chapter-01-orientation"
                className="border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors hover:bg-mark-deep hover:border-mark-deep"
              >
                Begin the descent ↓
              </a>
              <a
                href="#chapter-01-orientation"
                className="u-link font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2"
              >
                or read the corpus contract first
              </a>
            </div>
          </Reveal>
        </div>

        {/* The section drawing: drawn on load when motion is allowed */}
        <Reveal delay={200} className="hidden lg:block">
          <figure aria-hidden="true" className="relative h-full min-h-[420px]">
            <svg viewBox="0 0 360 520" className="h-full w-full text-ink" fill="none">
              <g stroke="currentColor" strokeWidth="1">
                {/* land strata */}
                <path d="M20 470 H340" strokeWidth="1.5" />
                <path d="M40 486 H320" opacity="0.6" />
                <path d="M70 502 H290" opacity="0.4" />
                <path d="M20 470 L60 430 M340 470 L300 430" opacity="0.5" />
                {/* tower */}
                <rect x="120" y="120" width="120" height="350" strokeWidth="1.5" />
                {[150, 182, 214, 246, 278, 310, 342, 374, 406, 438].map((y) => (
                  <line key={y} x1="120" y1={y} x2="240" y2={y} opacity="0.5" />
                ))}
                {/* annex */}
                <rect x="240" y="300" width="60" height="170" opacity="0.7" />
                {/* crane */}
                <line x1="300" y1="470" x2="300" y2="90" strokeWidth="1.5" />
                <line x1="270" y1="90" x2="330" y2="90" />
                <line x1="300" y1="90" x2="282" y2="120" opacity="0.6" />
                <line x1="330" y1="90" x2="330" y2="130" opacity="0.8" />
                <rect x="324" y="130" width="12" height="10" opacity="0.8" />
                {/* data halo */}
                <ellipse cx="180" cy="92" rx="95" ry="26" strokeDasharray="4 6" className="text-data" />
                <text x="180" y="60" textAnchor="middle" className="fill-current font-mono" fontSize="9" letterSpacing="2">
                  L12 · DATA &amp; TRUST
                </text>
                {/* dimension marks */}
                <line x1="100" y1="120" x2="100" y2="470" opacity="0.6" />
                <line x1="94" y1="120" x2="106" y2="120" opacity="0.6" />
                <line x1="94" y1="470" x2="106" y2="470" opacity="0.6" />
                <text x="86" y="300" textAnchor="middle" className="fill-current font-mono" fontSize="9" letterSpacing="2" transform="rotate(-90 86 300)">
                  L1 → L11
                </text>
              </g>
            </svg>
            <figcaption className="sr-only">
              A section drawing of a tower rising from land strata, wrapped by a dashed data layer.
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Live corpus counters: every number is generated from atlas_manifest.json */}
      <div className="border-t border-line bg-paper-raised/70">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6 lg:pl-[var(--spacing-rail)]">
          {COUNTERS.map((c, i) => (
            <Reveal key={c.label} delay={i * 60} as="div">
              <div className="h-full border-line px-5 py-5 sm:border-l sm:first:border-l-0">
                <dt className="order-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  {c.label}
                </dt>
                <dd className="data order-1 text-3xl font-medium tracking-tight text-ink">
                  {c.value.toLocaleString("en-US")}
                </dd>
                <dd className="mt-1 text-[11px] leading-snug text-ink-soft">{c.meaning}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
