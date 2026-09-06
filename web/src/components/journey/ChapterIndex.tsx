import { Reveal } from "@/components/motion/Reveal";

/**
 * The route through the argument. Each chapter gets a plain-language line so a
 * reader can choose an entry point instead of scrolling blind, and the three
 * acts make the shape of the argument visible before it starts.
 */
const ACTS: {
  act: string;
  premise: string;
  chapters: [string, string, string][];
}[] = [
  {
    act: "One",
    premise: "The ground rules",
    chapters: [
      [
        "01",
        "The operating system beneath the apps",
        "Why adoption looks enormous and measured results stay rare, in three dated surveys.",
      ],
      [
        "02",
        "Mapping the built environment",
        "The two axes the whole atlas hangs on: twelve life-cycle stages against seven technology types.",
      ],
      [
        "03",
        "How operators turn technology into an operating model",
        "Eight archetypes, and what each one's own disclosures do and do not establish.",
      ],
    ],
  },
  {
    act: "Two",
    premise: "What the record supports",
    chapters: [
      [
        "04",
        "Where the workflow frontier is moving",
        "The software actually doing the work, and how far its maturity claims reach.",
      ],
      [
        "05",
        "What has actually been measured",
        "Forty-four outcome cases, and why their grade distribution is itself the finding.",
      ],
      [
        "06",
        "Transferability changes by place",
        "Why a Gulf or US benchmark is not automatically a recommendation anywhere else.",
      ],
      [
        "07",
        "Access beats another pitch deck",
        "Why owners of real projects are unusually powerful customers for startups.",
      ],
    ],
  },
  {
    act: "Three",
    premise: "Where it breaks, and what lasts",
    chapters: [
      [
        "08",
        "When technology meets economics",
        "Katerra, Veev and the rest: failures documented through filings, not hindsight.",
      ],
      [
        "09",
        "The durable layer",
        "Standards, semantics, security and governance, which outlive individual products.",
      ],
      [
        "10",
        "What this could mean for one developer",
        "The sequenced, gated path implied by everything above.",
      ],
      [
        "11",
        "How to question this atlas",
        "The grading method, the review queue, and how to file a correction.",
      ],
    ],
  },
];

const ID: Record<string, string> = {
  "01": "chapter-01-orientation",
  "02": "chapter-02-lifecycle-map",
  "03": "chapter-03-operating-archetypes",
  "04": "chapter-04-workflow-frontier",
  "05": "chapter-05-outcomes",
  "06": "chapter-06-regional-transfer",
  "07": "chapter-07-venture-client",
  "08": "chapter-08-failure-and-risk",
  "09": "chapter-09-standards-and-trust",
  "10": "chapter-10-opportunity",
  "11": "chapter-11-methodology-and-corrections",
};

export function ChapterIndex() {
  return (
    <nav
      aria-label="Chapter index"
      className="border-b border-line bg-paper"
      id="chapter-index"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20 lg:pl-[calc(var(--spacing-rail)+2.5rem)]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">The argument</p>
              <h2 className="mt-3 font-display text-scene font-semibold">
                Eleven chapters, in three acts
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Read straight through, or jump
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {ACTS.map((a, ai) => (
            <Reveal key={a.act} delay={ai * 110}>
              <div className="flex h-full flex-col">
                <div className="flex items-baseline gap-3 border-b border-line-strong pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mark-deep">
                    Act {a.act}
                  </span>
                  <span className="font-display text-base font-semibold">{a.premise}</span>
                </div>
                <ol className="mt-1">
                  {a.chapters.map(([n, title, blurb]) => (
                    <li key={n}>
                      <a
                        href={`#${ID[n]}`}
                        className="group flex gap-4 border-b border-line py-4 transition-colors duration-300 hover:bg-paper-raised"
                      >
                        <span className="data mt-0.5 text-xs text-mark-deep">{n}</span>
                        <span className="min-w-0">
                          <span className="block font-display text-[17px] font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-mark-deep">
                            {title}
                          </span>
                          <span className="mt-1 block text-[13px] leading-relaxed text-ink-soft">
                            {blurb}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </nav>
  );
}
