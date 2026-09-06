import Link from "next/link";
import { longDate, manifest } from "@/data";
import { Reveal } from "@/components/motion/Reveal";
import { FINDINGS, NEXT_STEP } from "@/content/findings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The five findings",
  description:
    "Five findings from the property technology research: what held up, what did not, and what to check next. Each finding carries its evidence and its limit.",
};

const GLOSSARY: [string, string][] = [
  ["Company reported", "The company or its customer said it. Useful, but not independently checked. Most numbers on this site are this kind."],
  ["Customer estimate", "A named customer gave the figure to a vendor case study. Check the baseline and the period."],
  ["Filing grade", "A regulator filing or audited account establishes the event. Strong on what happened, silent on why."],
  ["Baseline", "The before picture. Without it, an improvement percentage means little."],
  ["Denominator", "Who or what was counted. A rate without it cannot be compared."],
  ["Caveat", "What the figure still does not prove. Kept next to the number, not in a footnote."],
  ["Unknown", "Not yet verified, not provided, or under review. A real answer here, never a zero."],
  ["Launch set", "44 records chosen to explain the system. An editorial sample, not a ranking or a shortlist."],
];

export default function BriefPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 lg:py-16">
        <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          <Link href="/" className="u-link">Brief</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-ink-2">The five findings</span>
        </nav>
        <Reveal>
          <p className="eyebrow mt-8">The five minute version</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Five findings, each with its evidence and its limit
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2">
            Built from {manifest.counts.qualifiedEntities} company and product records,{" "}
            {manifest.counts.cases} measured cases, and {manifest.counts.standards} standards.
            Research cut-off {longDate(manifest.researchCutoff)}. Read top to bottom, or jump to any finding.
          </p>
        </Reveal>

        <ol className="mt-10 space-y-10">
          {FINDINGS.map((f, i) => (
            <Reveal key={f.n} as="li" delay={Math.min(i * 60, 200)}>
              <article id={`finding-${i + 1}`} aria-labelledby={`finding-${i + 1}-t`} className="scroll-mt-24 border border-line bg-paper-raised p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mark-deep">Finding {f.n} of 05</p>
                  <Link href={f.evidenceHref} className="u-link font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
                    Inspect the evidence
                  </Link>
                </div>
                <h2 id={`finding-${i + 1}-t`} className="mt-3 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                  {f.title}
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-2 sm:text-base">{f.body}</p>
                <dl className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">Evidence</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{f.evidence}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-mark-deep">Limit</dt>
                    <dd className="mt-1.5 border-l-2 border-mark/50 pl-3 text-sm leading-relaxed text-ink-soft">{f.limit}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-10 border border-mark/50 bg-paper-raised p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mark-deep">Suggested next step</p>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2">{NEXT_STEP}</p>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-ink-soft">
              Private meeting material, including discovery questions and pilot design, lives outside
              this public site by design.
            </p>
          </div>
        </Reveal>

        <section aria-labelledby="glossary-t" className="mt-14">
          <Reveal>
            <h2 id="glossary-t" className="font-display text-2xl font-semibold tracking-tight">
              Words used the same way everywhere here
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              The full grading method lives on the <Link href="/methodology" className="u-link">method page</Link>.
              These eight phrases are enough to read the whole site.
            </p>
          </Reveal>
          <dl className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
            {GLOSSARY.map(([t, d]) => (
              <div key={t} className="bg-paper-raised p-5">
                <dt className="font-display text-base font-semibold">{t}</dt>
                <dd className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{d}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="Continue" className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/story" className="border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-raised transition-colors hover:border-mark-deep hover:bg-mark-deep">
            Continue to the full story
          </Link>
          <Link href="/evidence" className="u-link px-1 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2">
            Or open the measured cases
          </Link>
        </nav>
      </div>
    </div>
  );
}
