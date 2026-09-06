import Link from "next/link";
import { longDate, manifest, story } from "@/data";
import { Reveal } from "@/components/motion/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The full story",
  description:
    "The research argument in order: the pattern, the map, the operators, the workflows, the measured evidence, the warnings, and what lasts. Thirteen worked examples throughout.",
};

const SCENES: { n: string; title: string; body: string; href: string }[] = [
  {
    n: "01",
    title: "One problem, one owner, one record, one result",
    body: "The pattern behind every success in this research: a real problem, an accountable owner, a record someone can correct, a workflow that runs, and a measured result. A buyer inquiry that reaches the right salesperson with the right unit facts is the running example.",
    href: "#scene-pattern",
  },
  {
    n: "02",
    title: "The map: twelve stages of a building life",
    body: "Land to handover to operations, with data and trust crossing every stage. Every company in this research sits on this map, and many span several stages at once.",
    href: "#scene-map",
  },
  {
    n: "03",
    title: "What strong operators actually run",
    body: "Developers and owners who connect sales, projects, customers, and buildings into repeatable routines. Company figures included, with what they do and do not prove beside each one.",
    href: "#scene-operators",
  },
  {
    n: "04",
    title: "The workflows doing the work",
    body: "Feasibility in hours, site imagery against the plan, one record from inquiry to booking, buildings that tune their own cooling. The mechanism matters less than the workflow, the buyer, and the evidence.",
    href: "#scene-workflows",
  },
  {
    n: "05",
    title: "What was measured, honestly graded",
    body: "44 bounded records, most of them vendor or customer stories. The grade distribution is itself the finding: pilots are easy to announce, measured value is rare.",
    href: "/evidence",
  },
  {
    n: "06",
    title: "Place changes what transfers",
    body: "Bangladesh first: early local signals, South Asian comparators, then Gulf, Japan, and global context. Headquarters is not coverage, and a benchmark is not a recommendation.",
    href: "#scene-place",
  },
  {
    n: "07",
    title: "Why owners of real projects hold the cards",
    body: "Startups need buildings, users, and data more than they need pitch events. The venture client pattern: pay for a bounded pilot on a real project, then decide.",
    href: "#scene-pilot",
  },
  {
    n: "08",
    title: "When capital overwhelms software",
    body: "Filings, not hindsight: inventory write downs, lease restructurings, factory economics, and legitimacy failures. The counterweight that makes the positive evidence worth trusting.",
    href: "#scene-warnings",
  },
  {
    n: "09",
    title: "What outlasts any product",
    body: "Identifiers, shared definitions, exchange formats, security, and governance. The durable layer a developer should demand before any vendor selection.",
    href: "/standards",
  },
  {
    n: "10",
    title: "What this could mean first",
    body: "A gated sequence, conditional on discovery: governed project facts, connected sales, land evidence, delivery trust, operations, and only then bounded AI.",
    href: "#scene-first",
  },
];

export default function StoryPage() {
  const chapters = story.chapters;
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
        <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          <Link href="/" className="u-link">Brief</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-ink-2">The full story</span>
        </nav>
        <Reveal>
          <p className="eyebrow mt-8">The full story, in order</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            How buildings get financed, built, sold, and run, and where technology actually helps
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2">
            Ten scenes, about ten minutes. Thirteen worked examples carry the reasoning; the deep
            chapters, company records, cases, and standards stay linked throughout. Research cut-off{" "}
            {longDate(manifest.researchCutoff)}.
          </p>
        </Reveal>

        <ol className="mt-8 divide-y divide-line border-y border-line">
          {SCENES.map((s, i) => (
            <Reveal key={s.n} as="li" delay={Math.min(i * 40, 200)} variant="fade">
              <Link href={s.href.startsWith("#") ? `/story${s.href}` : s.href} className="group flex items-baseline gap-4 py-5 sm:gap-6">
                <span className="data w-8 shrink-0 text-xs text-mark-deep">{s.n}</span>
                <span className="min-w-0 grow">
                  <span className="block font-display text-xl font-semibold leading-snug transition-colors duration-300 group-hover:text-mark-deep">
                    {s.title}
                  </span>
                  <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-ink-soft">{s.body}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 font-mono text-mark transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>

      <ScenePattern />
      <SceneMap />
      <SceneOperators />
      <SceneWorkflows />
      <ScenePlace />
      <ScenePilot />
      <SceneWarnings />
      <SceneFirst />
      <DeepChapters chapters={chapters} />
    </div>
  );
}

function SceneShell({
  id,
  n,
  kicker,
  title,
  children,
  dark = false,
}: {
  id: string;
  n: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className={`scroll-mt-14 border-t border-line ${dark ? "on-dark bg-dark text-dark-ink" : "bg-paper"}`}
    >
      <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${dark ? "text-dark-ink-soft" : "text-ink-soft"}`}>
            Scene {n} · {kicker}
          </p>
          <h2 id={`${id}-t`} className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function ScenePattern() {
  const steps = [
    ["A buyer asks about an apartment", "The inquiry arrives with the right project and unit attached, not as a bare phone number."],
    ["A salesperson owns the follow up", "One named owner, a response clock, and visits tracked against availability."],
    ["The record stays approved", "Price, availability, and status come from one governed source, not five spreadsheets."],
    ["Finance and handover follow", "Booking, payments, construction updates, and handover draw on the same facts."],
  ];
  return (
    <SceneShell id="scene-pattern" n="01" kicker="The pattern" title="Follow one inquiry through a working system">
      <ol className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 70}>
            <div className="h-full bg-paper-raised p-6">
              <p className="data text-sm font-semibold text-mark-deep">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug">{t}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={120}>
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-2">
          That chain is the whole thesis in miniature. Earlier drafts called it a digital operating
          system for the built environment. The plainer version: governed facts, owned workflows,
          measured results.
        </p>
      </Reveal>
    </SceneShell>
  );
}

function SceneMap() {
  const stages: [string, string][] = [
    ["Land and origination", "Who owns it, what can be built, what it costs to start."],
    ["Feasibility and design", "Options tested fast, then drawn, costed, and approved."],
    ["Construction", "Procurement, progress evidence, issues, payments."],
    ["Sales and customers", "Inquiry to booking to living there."],
    ["Operations and energy", "Maintenance, tenants, meters, cooling."],
    ["Handover and trust", "Defects closed, records handed over, data governed."],
  ];
  return (
    <SceneShell id="scene-map" n="02" kicker="The map" title="Twelve stages, grouped by the questions a developer asks">
      <ol className="divide-y divide-line border-y border-line">
        {stages.map(([t, d]) => (
          <li key={t} className="grid gap-1 py-4">
            <span className="block font-display text-lg font-semibold">{t}</span>
            <span className="block max-w-2xl text-sm text-ink-soft">{d}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
        The full twelve stage list, from land to data and trust, labels every company card.{" "}
        <Link href="/atlas" className="u-link">Open the company records</Link> and filter by any
        stage, or read the <Link href="/brief" className="u-link">glossary</Link> for the exact
        stage names.
      </p>
    </SceneShell>
  );
}

function SceneOperators() {
  const rows: [string, string, string][] = [
    ["Aldar Properties", "Gulf developer benchmark for owned digital sales and customer service.", "/atlas/org-aldar-properties-4218e8b"],
    ["Sell.Do", "South Asian developer sales system, inquiry to booking.", "/atlas/org-sell-do-33b7307"],
    ["Facilio", "Building operations: work orders, assets, tenants, energy.", "/atlas/org-facilio-ee1952a"],
    ["BrainBox AI", "HVAC tuning against a metered baseline.", "/atlas/org-brainbox-ai-f5deb8d"],
  ];
  return (
    <SceneShell id="scene-operators" n="03" kicker="The operators" title="Firms that turned tools into routines">
      <ul className="grid gap-4 sm:grid-cols-2">
        {rows.map(([name, body, href], i) => (
          <Reveal key={name} delay={i * 60} variant="scale">
            <li className="h-full">
              <Link href={href} className="lift group flex h-full flex-col border border-line bg-paper-raised p-6">
                <span className="font-display text-xl font-semibold transition-colors group-hover:text-mark-deep">{name}</span>
                <span className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</span>
                <span className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-mark-deep">
                  Open the profile <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Company figures travel with their limits: adoption counts are not ROI, and Gulf or Indian
        conditions do not transfer directly. Each profile states what its numbers do and do not prove.
      </p>
    </SceneShell>
  );
}

function SceneWorkflows() {
  const rows: [string, string, string][] = [
    ["TestFit draws options in hours", "Feasibility speed changes which sites get tested. Customer estimates report days cut to hours.", "/atlas/org-testfit-cd578b3"],
    ["OpenSpace keeps the visual truth", "Dated 360 photos pinned to the plan. One team reports a stopped $50,000 dispute.", "/atlas/org-openspace-15aa2fd"],
    ["Buildots flags drift from plan", "Imagery matched to schedule. One contractor reports 2.3× more tasks on time.", "/atlas/org-buildots-abeb197"],
    ["Procore runs procurement and closeout", "Orders from 32 to 7 minutes in one customer estimate; 40 hours saved per closeout in another.", "/atlas/org-procore-9fbe212"],
    ["PlanRadar closes the snags", "Offline first issue tracking to handover. Compact, legible, unverified at outcome level here.", "/atlas/org-planradar-0ba22d1"],
  ];
  return (
    <SceneShell id="scene-workflows" n="04" kicker="The workflows" title="Five workflows, each with a working example">
      <ul className="divide-y divide-line border-y border-line">
        {rows.map(([t, d, href]) => (
          <li key={t}>
            <Link href={href} className="group grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
              <span>
                <span className="block font-display text-lg font-semibold transition-colors group-hover:text-mark-deep">{t}</span>
                <span className="mt-0.5 block max-w-2xl text-sm text-ink-soft">{d}</span>
              </span>
              <span aria-hidden="true" className="font-mono text-mark transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5">
        <Link href="/evidence" className="u-link font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
          Open all 44 measured records
        </Link>
      </p>
    </SceneShell>
  );
}

function ScenePlace() {
  return (
    <SceneShell id="scene-place" n="06" kicker="The place" title="Start in Bangladesh, compare honestly">
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal variant="scale">
          <Link href="/atlas/org-proq-cf33256" className="lift group flex h-full flex-col border border-line bg-paper-raised p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mark-deep">Local signal · pilot stage</span>
            <span className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-mark-deep">ProQ: procurement without the phone tag</span>
            <span className="mt-2 text-sm leading-relaxed text-ink-soft">Early Bangladesh startup moving quotes and orders into one workflow. Test on one project, not a recommendation.</span>
          </Link>
        </Reveal>
        <Reveal delay={70} variant="scale">
          <Link href="/atlas/org-barikoi-0f8853c" className="lift group flex h-full flex-col border border-line bg-paper-raised p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mark-deep">Local building block</span>
            <span className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-mark-deep">Barikoi: addresses other software can use</span>
            <span className="mt-2 text-sm leading-relaxed text-ink-soft">Mapping and address data for site choice, delivery, and visits. Coverage is not title accuracy.</span>
          </Link>
        </Reveal>
        <Reveal delay={120} variant="scale">
          <Link href="/atlas/org-landeed-505b2d4" className="lift group flex h-full flex-col border border-line bg-paper-raised p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mark-deep">Comparator · India</span>
            <span className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-mark-deep">Landeed: what land evidence can look like</span>
            <span className="mt-2 text-sm leading-relaxed text-ink-soft">Title search records assembled with parties, documents, and review. Indian registry conditions do not transfer.</span>
          </Link>
        </Reveal>
        <Reveal delay={170} variant="scale">
          <Link href="/atlas/org-brick-and-bolt-4809c48" className="lift group flex h-full flex-col border border-line bg-paper-raised p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mark-deep">Comparator · India</span>
            <span className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-mark-deep">Brick and Bolt: managed building, legible to buyers</span>
            <span className="mt-2 text-sm leading-relaxed text-ink-soft">Design packages, managed contractors, milestone payments, quality checks. Company reported.</span>
          </Link>
        </Reveal>
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Market signals for context: the REHAB member directory displayed 924 members when checked in
        August 2026, and the 2024 fair reported Tk403.13 crore of sales and bookings with 17,000+
        visitors. Ecosystem signals, not market size.
      </p>
    </SceneShell>
  );
}

function ScenePilot() {
  const steps = [
    ["Name one problem and its baseline", "Response time, closeout hours, defect reopens: measured before anything starts."],
    ["Pay for a bounded pilot", "One project, 8 to 12 weeks, named users, pre agreed stop and scale gates."],
    ["Keep investment separate", "A pilot that works does not automatically make equity attractive. Decide twice."],
  ];
  return (
    <SceneShell id="scene-pilot" n="07" kicker="The pilot" title="Why a real project beats another pitch deck">
      <ol className="grid gap-px border border-line bg-line sm:grid-cols-3">
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 70}>
            <li className="h-full bg-paper-raised p-6">
              <p className="data text-sm font-semibold text-mark-deep">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug">{t}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Startups need buildings, users, and data. An owner who can offer all three is the strongest
        customer a startup can find.
      </p>
    </SceneShell>
  );
}

function SceneWarnings() {
  const rows: [string, string, string][] = [
    ["Zillow Offers: $407.9M inventory write down", "Pricing risk concentrated on the balance sheet. Filing grade, FY2021.", "/evidence#QOC-043"],
    ["WeWork: leases restructured in Chapter 11", "Flexible promises against fixed obligations. Filing grade, 2023 to 2024.", "/evidence#QOC-044"],
    ["Katerra: factories plus projects, Chapter 11", "Execution risk multiplied, not cancelled. Historical lesson, 2021.", "/atlas/org-katerra-0503c58"],
  ];
  return (
    <SceneShell id="scene-warnings" n="08" kicker="The warnings" title="Capital punishes what software cannot fix" dark>
      <ul className="divide-y divide-dark-line border-y border-dark-line">
        {rows.map(([t, d, href]) => (
          <li key={t}>
            <Link href={href} className="group grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
              <span>
                <span className="block font-display text-xl font-semibold transition-colors group-hover:text-dark-mark">{t}</span>
                <span className="mt-1 block text-sm text-dark-ink-soft">{d}</span>
              </span>
              <span aria-hidden="true" className="font-mono text-dark-mark transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-dark-ink-soft">
        Filings establish events and losses. They do not prove software caused them. That honesty is
        what makes the positive evidence elsewhere worth trusting.
      </p>
    </SceneShell>
  );
}

function SceneFirst() {
  const steps: [string, string][] = [
    ["Governed project facts", "One approved project and unit record feeding every channel."],
    ["Connected sales", "Inquiry to visit to booking as one traceable chain."],
    ["Land evidence", "Source linked documents, parties, diligence, approvals."],
    ["Delivery trust", "Procurement, progress evidence, issues, payment, handover."],
    ["Operations", "Assets, meters, and service levels before any optimization claim."],
    ["Bounded AI last", "Assistants only where facts, permissions, fallback, and measurement exist."],
  ];
  return (
    <SceneShell id="scene-first" n="10" kicker="The first move" title="A gated sequence, conditional on discovery">
      <ol className="border-l-2 border-line" aria-label="Gated capability sequence">
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={Math.min(i * 50, 250)}>
            <li className="relative pb-7 pl-8 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[9px] top-0 block h-4 w-4 rounded-full border-2 border-mark bg-paper" />
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Step {String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-xl font-semibold leading-tight">{t}</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Each step is gated by the one before: no cooling AI before meters and operators exist, no
        portal before the data behind it is reliable. Valid only after discovery confirms systems,
        owners, priorities, and baselines.
      </p>
      <p className="mt-6">
        <Link href="/methodology" className="u-link font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2">
          How the research was graded and how to correct it
        </Link>
      </p>
    </SceneShell>
  );
}

function DeepChapters({ chapters }: { chapters: typeof story.chapters }) {
  return (
    <section aria-labelledby="deep-t" className="border-t border-line bg-paper-deep/50">
      <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
        <Reveal>
          <p className="eyebrow">For deep readers</p>
          <h2 id="deep-t" className="mt-3 font-display text-2xl font-semibold">
            The research chapters behind these scenes
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Methodology, taxonomy, archetypes, maturity, ecosystems, and the review queue, preserved
            in full. Company names, codes, and grades appear as recorded.
          </p>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          {chapters.map((c) => (
            <span key={c.id} className="rounded-sm border border-line-strong bg-paper-raised px-3 py-1.5 font-mono text-[11px] text-ink-2">
              Ch {String(c.order).padStart(2, "0")} · {c.title}
            </span>
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
          The previous eleven chapter journey has been condensed into the ten scenes above. Full
          chapter detail now lives in the company records, measured cases, standards, and method
          pages, where each statement keeps its source.
        </p>
      </div>
    </section>
  );
}
