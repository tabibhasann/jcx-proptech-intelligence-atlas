"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { FlagshipChapter } from "@/components/presentation/FlagshipChapter";
import { ComparativeChapter } from "@/components/presentation/ComparativeChapter";
import {
  capabilitySteps,
  modelModes,
  presentationSources,
  sourceById,
  transferModes,
  ventureMoves,
  type EvidenceLevel,
  type PresentationSource,
} from "@/content/presentation";

type PresentationProps = {
  variant?: "home" | "story" | "brief";
};

function moveTabOnKey<T extends string>(
  event: ReactKeyboardEvent<HTMLButtonElement>,
  index: number,
  ids: readonly T[],
  activate: (id: T) => void,
) {
  const key = event.key;
  if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(key)) return;
  event.preventDefault();
  const nextIndex = key === "Home" ? 0 : key === "End" ? ids.length - 1 : (index + (key === "ArrowLeft" || key === "ArrowUp" ? -1 : 1) + ids.length) % ids.length;
  activate(ids[nextIndex]);
  const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button[role="tab"]');
  buttons?.[nextIndex]?.focus();
}

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`jcx-kicker ${dark ? "jcx-kicker-dark" : ""}`}>{children}</p>;
}

function EvidenceTag({ level }: { level: EvidenceLevel }) {
  const tone = level === "Official" ? "official" : level === "Company-reported" ? "company" : level === "Open question" ? "open" : level === "Interpretation" ? "interpretation" : "reported";
  return <span className={`jcx-evidence-tag jcx-evidence-${tone}`}>{level}</span>;
}

function EvidenceDrawer({ sourceIds, label = "Open evidence" }: { sourceIds: string[]; label?: string }) {
  const sources = sourceIds.map((id) => sourceById[id]).filter(Boolean) as PresentationSource[];
  return (
    <details className="jcx-evidence-drawer">
      <summary>
        <span>{label}</span>
        <span aria-hidden="true" className="jcx-summary-mark">+</span>
      </summary>
      <div className="jcx-evidence-body">
        {sources.map((source) => (
          <div key={source.id} className="jcx-evidence-row">
            <div className="jcx-evidence-meta">
              <span className="jcx-source-id">{source.id}</span>
              <EvidenceTag level={source.level} />
            </div>
            <div>
              <a href={source.url} target="_blank" rel="noreferrer" className="jcx-source-link">
                {source.label}<span aria-hidden="true">↗</span>
              </a>
              <p>{source.note}</p>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

function SectionLead({ index, eyebrow, title, children, dark = false }: { index: string; eyebrow: string; title: string; children?: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`jcx-section-lead ${dark ? "jcx-section-lead-dark" : ""}`}>
      <div className="jcx-section-index" aria-hidden="true">{index}</div>
      <div>
        <Kicker dark={dark}>{eyebrow}</Kicker>
        <h2>{title}</h2>
        {children ? <p>{children}</p> : null}
      </div>
    </div>
  );
}

function SignalDiagram() {
  return (
    <div className="jcx-signal" aria-label="Three property technology business models: portal, brokerage and iBuyer">
      <div className="jcx-signal-header">
        <span>Three labels</span>
        <span>Three risk profiles</span>
      </div>
      <div className="jcx-signal-grid">
        <div className="jcx-signal-column">
          <span className="jcx-signal-code">01</span>
          <strong>Portal</strong>
          <span>attention</span>
          <div className="jcx-signal-marker" aria-hidden="true" />
          <small>asset-light</small>
        </div>
        <div className="jcx-signal-column jcx-signal-column-featured">
          <span className="jcx-signal-code">02</span>
          <strong>Brokerage</strong>
          <span>execution</span>
          <div className="jcx-signal-marker" aria-hidden="true" />
          <small>workflow-heavy</small>
        </div>
        <div className="jcx-signal-column">
          <span className="jcx-signal-code">03</span>
          <strong>iBuyer</strong>
          <span>inventory</span>
          <div className="jcx-signal-marker" aria-hidden="true" />
          <small>capital-heavy</small>
        </div>
      </div>
      <div className="jcx-signal-foot">
        <span className="jcx-signal-dot" />
        The payer decides the economics.
      </div>
    </div>
  );
}

function ReadingRail({ compact = false }: { compact?: boolean }) {
  const items = [
    ["01", "Business models", "Who pays, and when"],
    ["02", "Operating proof", "What held up"],
    ["03", "Transfer test", "Why country matters"],
    ["04", "The decision", "Start, learn, defer"],
    ["05", "Inside JCX", "Build the record first"],
    ["06", "Evidence boundary", "What remains open"],
  ].filter(([number]) => !compact || number !== "02");
  return (
    <aside className="jcx-reading-rail" aria-label="Reading route">
      <span className="jcx-rail-label">Reading route</span>
      <ol>
        {items.map(([number, label, note]) => (
          <li key={number}>
            <a href={`#jcx-step-${number}`}>
              <span>{number}</span>
              <strong>{label}</strong>
              <small>{note}</small>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function HomeHero({ variant }: { variant: PresentationProps["variant"] }) {
  return (
    <section className="jcx-hero" aria-labelledby="jcx-home-title">
      <div className="jcx-hero-grid">
        <div className="jcx-hero-copy">
          <Reveal variant="fade">
            <div className="jcx-hero-meta">
              <span>JCX / research note</span>
              <span>Edition review · 12 September 2026</span>
              <span>Public-safe edition</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 id="jcx-home-title">
              Property technology is not one business.
              <em>That is the first decision.</em>
            </h1>
          </Reveal>
          <Reveal delay={160} variant="fade">
            <p className="jcx-hero-dek">
              We followed the money, the operating handoffs and the country conditions behind property platforms. The useful question for Bangladesh is not which foreign app to copy. It is which mechanism can be made dependable here.
            </p>
          </Reveal>
          <Reveal delay={240} variant="fade">
            <div className="jcx-hero-actions">
              <a className="jcx-button jcx-button-dark" href="#jcx-step-01">Begin the argument <span aria-hidden="true">↓</span></a>
              <Link className="jcx-text-link" href="/comparison#jcx-comparative">Read the comparison chapter <span aria-hidden="true">↗</span></Link>
              <Link className="jcx-text-link" href="/evidence">Open the evidence index <span aria-hidden="true">↗</span></Link>
            </div>
          </Reveal>
          <Reveal delay={300} variant="fade">
            <div className="jcx-hero-stats" aria-label="Research scope">
              <div><strong>06</strong><span>comparison lenses</span></div>
              <div><strong>33</strong><span>selected mechanisms</span></div>
              <div><strong>02</strong><span>tracks kept separate</span></div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={180} variant="scale" className="jcx-hero-visual-wrap">
          <SignalDiagram />
          <p className="jcx-visual-caption"><span>Reading the field</span> Each model has a different payer, operating burden and failure mode.</p>
        </Reveal>
      </div>
      <div className="jcx-hero-baseline" aria-hidden="true"><span>Field note / 01</span><span>Scroll or use the route</span></div>
    </section>
  );
}

function StoryIntro() {
  return (
    <section className="jcx-story-intro" aria-labelledby="jcx-story-title">
      <div className="jcx-story-intro-inner">
        <Kicker>JCX / full research journey · edition review 12 September 2026</Kicker>
        <h1 id="jcx-story-title">The argument, in order.</h1>
        <p>Begin with the payer, follow the operating proof, test the country transfer, then keep the venture question separate from technology adoption inside JCX.</p>
        <div className="jcx-story-intro-links">
          <a className="jcx-button jcx-button-dark" href="#jcx-step-01">Start with the models <span aria-hidden="true">↓</span></a>
          <Link className="jcx-text-link" href="/story#jcx-flagship">Jump to the four anchor cases <span aria-hidden="true">↗</span></Link>
          <Link className="jcx-text-link" href="/comparison?lens=managed-distribution&case=case-beike-acn#jcx-comparative">Open the full comparison <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}

function ModelLens() {
  const [active, setActive] = useState<(typeof modelModes)[number]["id"]>("brokerage");
  const model = useMemo(() => modelModes.find((item) => item.id === active) ?? modelModes[1], [active]);
  return (
    <div className="jcx-model-lens">
      <div className="jcx-mode-tabs" role="tablist" aria-label="Property technology business models">
        {modelModes.map((item, index) => (
          <button
            type="button"
            role="tab"
            key={item.id}
            aria-selected={active === item.id}
            aria-controls="model-active-panel"
            id={`model-tab-${item.id}`}
            className={active === item.id ? "is-active" : ""}
            tabIndex={active === item.id ? 0 : -1}
            onClick={() => setActive(item.id)}
            onKeyDown={(event) => moveTabOnKey(event, index, modelModes.map((mode) => mode.id), setActive)}
          >
            <span>0{modelModes.indexOf(item) + 1}</span>{item.label}
          </button>
        ))}
      </div>
      <div id="model-active-panel" role="tabpanel" aria-labelledby={`model-tab-${model.id}`} className="jcx-model-panel">
        <div className="jcx-model-main">
          <span className="jcx-model-label">The payer</span>
          <h3>{model.payer}</h3>
          <p className="jcx-model-promise">{model.promise}</p>
          <EvidenceDrawer sourceIds={[...model.sourceIds]} label="What the evidence can support" />
        </div>
        <dl className="jcx-model-facts">
          <div><dt>Work</dt><dd>{model.work}</dd></div>
          <div><dt>Examples</dt><dd>{model.examples}</dd></div>
          <div><dt>Transfer condition</dt><dd>{model.transfer}</dd></div>
        </dl>
      </div>
    </div>
  );
}

function OperatingProof() {
  const rows = [
    { name: "Rightmove", tag: "portal", result: "A mature paid-listing engine can be profitable when advertiser demand is repeatable.", meta: "£389.9m revenue / £256.3m operating profit, FY2024", sourceIds: ["S01"] },
    { name: "KE Holdings / Beike", tag: "network", result: "Software becomes more durable when it coordinates local agents, listings and transaction steps.", meta: "Listed platform disclosures; scale is not a Dhaka transfer proof", sourceIds: ["S09"] },
    { name: "Opendoor", tag: "counterexample", result: "Speed does not remove inventory, pricing or cash risk. Capital turns the product into a balance-sheet business.", meta: "$2.159bn inventory / $595m cash use, 2024 filing", sourceIds: ["S08"] },
    { name: "Propzy", tag: "counterexample", result: "A 2022 cessation is a reminder that financial hardship, funding conditions and local execution can overwhelm a good interface.", meta: "Vietnam operations ceased 12 September 2022; cited report does not isolate a single cause", sourceIds: ["S11"] },
  ];
  return (
    <div className="jcx-proof-list">
      {rows.map((row, index) => (
        <Reveal key={row.name} as="article" delay={index * 70} variant="fade" className="jcx-proof-row">
          <div className="jcx-proof-index">0{index + 1}</div>
          <div className="jcx-proof-name"><strong>{row.name}</strong><span>{row.tag}</span></div>
          <p>{row.result}</p>
          <div className="jcx-proof-meta"><span>{row.meta}</span><EvidenceDrawer sourceIds={row.sourceIds} label="Source" /></div>
        </Reveal>
      ))}
    </div>
  );
}

function TransferTest() {
  const [active, setActive] = useState<(typeof transferModes)[number]["id"]>("bangladesh");
  const country = transferModes.find((item) => item.id === active) ?? transferModes[0];
  return (
    <div className="jcx-transfer-test">
      <div className="jcx-transfer-tabs" role="tablist" aria-label="Country transfer comparison">
        {transferModes.map((item, index) => (
          <button key={item.id} type="button" role="tab" aria-selected={active === item.id} aria-controls="transfer-active-panel" id={`transfer-tab-${item.id}`} className={active === item.id ? "is-active" : ""} tabIndex={active === item.id ? 0 : -1} onClick={() => setActive(item.id)} onKeyDown={(event) => moveTabOnKey(event, index, transferModes.map((mode) => mode.id), setActive)}>
            <span>0{index + 1}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="jcx-transfer-panel" id="transfer-active-panel" role="tabpanel" aria-labelledby={`transfer-tab-${country.id}`}>
        <div className="jcx-transfer-answer"><span className="jcx-model-label">The question</span><h3>{country.question}</h3><p>{country.answer}</p></div>
        <div className="jcx-transfer-detail">
          <div><span>Mechanism</span><p>{country.mechanism}</p></div>
          <div><span>Prerequisite</span><p>{country.prerequisite}</p></div>
          <div className="jcx-transfer-caution"><span>Transfer caution</span><p>{country.caution}</p></div>
          <EvidenceDrawer sourceIds={[...country.sourceIds]} label="Open country sources" />
        </div>
      </div>
    </div>
  );
}

function VentureDecision() {
  return (
    <div className="jcx-venture-grid">
      {ventureMoves.map((move, index) => (
        <Reveal key={move.label} as="article" delay={index * 80} variant="scale" className={`jcx-venture-card jcx-venture-${move.tone}`}>
          <div className="jcx-venture-top"><span>0{index + 1}</span><strong>{move.label}</strong></div>
          <h3>{move.title}</h3>
          <p>{move.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

function CapabilityLadder() {
  return (
    <div className="jcx-capability">
      <div className="jcx-capability-line" aria-hidden="true" />
      {capabilitySteps.map((item, index) => (
        <Reveal key={item.step} as="article" delay={index * 70} variant="fade" className="jcx-capability-item">
          <div className="jcx-capability-marker"><span>{item.step}</span></div>
          <div><h3>{item.title}</h3><p>{item.detail}</p><span className="jcx-capability-measure">Measure / {item.measure}</span></div>
        </Reveal>
      ))}
    </div>
  );
}

function InternalSignals() {
  const signals = [
    { value: "38%", label: "more customer-centre requests", note: "Emaar One report, 2022 vs 2021; not app-only or ROI", source: "S22" },
    { value: "63", label: "Innovation Fund pilots supported", note: "CapitaLand FY2023; 27 sustainability-related", source: "S23" },
    { value: "20", label: "Sustainability X projects piloted", note: "CapitaLand FY2023; piloted/pre-piloted", source: "S23" },
    { value: "3", label: "Sustainability X pilots completed", note: "CapitaLand FY2023; separate from Innovation Fund", source: "S23" },
    { value: "5%", label: "CRE occupier teams hit all AI goals", note: "JLL 2025 self-reported survey; subgroup denominator not disclosed", source: "S24" },
  ];
  return (
    <div className="jcx-internal-signals" aria-label="Signals from internal technology research">
      {signals.map((signal) => (
        <div key={signal.value} className="jcx-internal-signal">
          <strong>{signal.value}</strong>
          <span>{signal.label}</span>
          <small>{signal.note}</small>
          <EvidenceDrawer sourceIds={[signal.source]} label="Source and limit" />
        </div>
      ))}
    </div>
  );
}

function EvidenceBoundary() {
  return (
    <div className="jcx-boundary-grid">
      <div className="jcx-boundary-statement">
        <span className="jcx-model-label">What is established</span>
        <h3>The comparative story is ready to present.</h3>
        <p>Foreign examples show mechanisms, operating burdens and failure modes. Bangladesh evidence supports a narrow test, not a proven national platform.</p>
      </div>
      <div className="jcx-boundary-list">
        <div><span className="jcx-boundary-symbol jcx-boundary-yes">✓</span><p><strong>Ready</strong> to say that payer, workflow and country infrastructure change the economics.</p></div>
        <div><span className="jcx-boundary-symbol jcx-boundary-no">×</span><p><strong>Not established</strong> that the proposed venture is live, repeatable or collecting commission.</p></div>
        <div><span className="jcx-boundary-symbol jcx-boundary-next">→</span><p><strong>Next evidence</strong> is a deal file, system walkthrough, legal review and a paid buyer test.</p></div>
      </div>
      <EvidenceDrawer sourceIds={presentationSources.map((source) => source.id)} label="Open the source register" />
    </div>
  );
}

function MetricDiscipline() {
  const metrics = [
    ["Asking price", "is not a closing price"],
    ["GTV", "is not company revenue"],
    ["A pilot", "is not adoption"],
    ["A request", "is not collected commission"],
  ];
  return (
    <div className="jcx-metric-strip">
      <span className="jcx-metric-title">Metric discipline</span>
      {metrics.map(([term, meaning]) => <div key={term}><strong>{term}</strong><span>{meaning}</span></div>)}
    </div>
  );
}

function BriefView() {
  const findings = [
    ["01", "Payer first", "Portals sell professional attention. Brokerages sell work around a close. iBuyers carry homes and financing risk.", ["S01", "S04", "S08"]],
    ["02", "Evidence, not logos", "Rightmove and REA show recurring portal economics. 99acres shows scale without the same profit. Propzy is a regional counterexample.", ["S01", "S02", "S03", "S11"]],
    ["03", "Bangladesh is a transfer test", "Digital land services exist, but a public closing-price series and repeatable collection proof remain open.", ["S12", "S13", "S14"]],
    ["04", "Two tracks at JCX", "A venture can test several shapes. Internally, the highest-value work is a shared record, used workflow, visible collections and then bounded AI.", ["S22", "S23", "S24"]],
  ] as const;
  return (
    <div className="jcx-brief-view">
      <section className="jcx-brief-hero">
        <Kicker>JCX / five-minute briefing</Kicker>
        <h1>What the research changes.</h1>
        <p>Property technology is several businesses. The responsible question for Bangladesh is which mechanism can be made dependable, and what evidence would prove it.</p>
        <div className="jcx-brief-actions"><Link className="jcx-button jcx-button-dark" href="/comparison#jcx-comparative">Open the comparison chapter <span aria-hidden="true">↗</span></Link><Link className="jcx-text-link" href="/story">Read the full journey <span aria-hidden="true">↗</span></Link><Link className="jcx-text-link" href="/evidence">Open evidence <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className="jcx-brief-findings" aria-label="Four briefing findings">
        {findings.map(([number, title, body, sourceIds]) => (
          <article key={number} className="jcx-brief-row"><span>{number}</span><div><Kicker>{title}</Kicker><p>{body}</p><EvidenceDrawer sourceIds={[...sourceIds]} label="Sources and limits" /></div></article>
        ))}
      </section>
      <section className="jcx-brief-close"><Kicker>Decision boundary</Kicker><h2>Test the workflow before you scale the story.</h2><p>The venture remains a conditional experiment until collected commissions, a mandate test and a named buyer exist. JCX's internal adoption evidence is also open.</p><div><Link href="/#jcx-step-04">Venture test <span aria-hidden="true">↗</span></Link><Link href="/#jcx-step-05">Inside JCX <span aria-hidden="true">↗</span></Link></div></section>
    </div>
  );
}

function ResearchSections({ variant }: { variant: PresentationProps["variant"] }) {
  const compact = variant === "brief";
  return (
    <>
      <section id="jcx-step-01" className="jcx-section jcx-section-paper jcx-scroll-target">
        <div className="jcx-section-inner jcx-with-rail">
          <ReadingRail compact={compact} />
          <div className="jcx-section-content">
            <SectionLead index="01" eyebrow="One label, several businesses" title="Who pays, and when?">
              A portal sells attention. A brokerage owns a human closing workflow. An iBuyer buys the home and carries the risk. The interface can look similar while the business underneath is not.
            </SectionLead>
            <ModelLens />
          </div>
        </div>
      </section>

      {!compact ? (
        <section id="jcx-step-02" className="jcx-section jcx-section-ink jcx-scroll-target">
          <div className="jcx-section-inner">
            <SectionLead dark index="02" eyebrow="What held up, and what broke" title="Durable operations have a specific payer and a specific workflow.">
              The useful precedent is not a logo. It is the chain from demand to action to collection, with the capital burden kept visible.
            </SectionLead>
            <OperatingProof />
          </div>
        </section>
      ) : null}

      <section id="jcx-step-03" className="jcx-section jcx-section-sage jcx-scroll-target">
        <div className="jcx-section-inner">
          <SectionLead index="03" eyebrow="Country transfer test" title="Foreign success transfers one mechanism, not the whole model.">
            A country changes what can be verified, who can close, how property is financed and whether a platform can price risk. Those are operating conditions, not footnotes.
          </SectionLead>
          <TransferTest />
        </div>
      </section>

      <section id="jcx-step-04" className="jcx-section jcx-section-paper jcx-scroll-target">
        <div className="jcx-section-inner">
          <SectionLead index="04" eyebrow="The proposed venture" title="Keep the venture shape conditional until the payer is proven.">
            Dhaka has discovery. The missing proof is dependable execution: a clean record, a named owner, a document path and a collection rule that works beyond a listing. A managed workflow is one testable option, not a conclusion settled by foreign examples.
          </SectionLead>
          <VentureDecision />
          <div className="jcx-local-note"><span>Local decision rule</span><p>Test what can be closed and collected before adding the scale story.</p><EvidenceDrawer sourceIds={["S13", "S14", "S16", "S17", "S18", "S19", "S20", "S21"]} label="Bangladesh evidence" /></div>
        </div>
      </section>

      <section id="jcx-step-05" className="jcx-section jcx-section-ink jcx-scroll-target">
        <div className="jcx-section-inner">
          <SectionLead dark index="05" eyebrow="Inside JCX" title="The same rule applies to the developer: build the record before the interface.">
            The internal capability ladder is a sequence. A customer channel or bounded AI layer can compound a governed record. It cannot substitute for one.
          </SectionLead>
          <CapabilityLadder />
          <InternalSignals />
          <div className="jcx-inside-note"><span>External signals</span><p>Emaar reports service-channel requests; CapitaLand reports pilots; JLL reports adoption intent. These are useful signals, not proof that JCX has achieved the same outcomes.</p><EvidenceDrawer sourceIds={["S22", "S23", "S24"]} label="Open internal technology sources" /></div>
        </div>
      </section>

      <section id="jcx-step-06" className="jcx-section jcx-section-paper jcx-scroll-target">
        <div className="jcx-section-inner">
          <SectionLead index="06" eyebrow="Evidence boundary" title="A responsible presentation makes the unknowns visible.">
            The research is ready to guide a decision. It is not permission to turn a hypothesis into a claim of traction.
          </SectionLead>
          <EvidenceBoundary />
          <MetricDiscipline />
          <div className="jcx-next-step"><span>Continue the record</span><div><Link href="/story">Read the full journey <span aria-hidden="true">→</span></Link><Link href="/methodology">Read the method <span aria-hidden="true">→</span></Link><Link href="/evidence">Browse measured cases <span aria-hidden="true">→</span></Link></div></div>
        </div>
      </section>
    </>
  );
}

export function ResearchPresentation({ variant = "home" }: PresentationProps) {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const target = document.getElementById(decodeURIComponent(hash));
    if (!target) return;
    // Story sections are client-rendered after the browser's native hash pass.
    // Re-apply the deep link once hydration has placed the target in the DOM.
    requestAnimationFrame(() => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      // Deep links should arrive at the requested evidence immediately. The
      // site's smooth-scroll preference is for in-page navigation, not reloads.
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start", behavior: "auto" });
      root.style.scrollBehavior = previousScrollBehavior;
    });
  }, []);

  if (variant === "brief") return <div className="jcx-site jcx-variant-brief"><BriefView /></div>;
  return (
    <div className={`jcx-site jcx-variant-${variant}`}>
      {variant === "story" ? <StoryIntro /> : <HomeHero variant={variant} />}
      <ResearchSections variant={variant} />
      {variant === "story" ? <><FlagshipChapter /><ComparativeChapter /></> : null}
    </div>
  );
}
