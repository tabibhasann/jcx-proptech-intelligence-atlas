"use client";

import Link from "next/link";
import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { comparativeChapter, type ComparativeCase, type ComparativeEvidenceLabel, type ComparativeLens } from "@/data";

const sourceById = new Map(comparativeChapter.sources.map((source) => [source.id, source]));

function evidenceTone(level: ComparativeEvidenceLabel) {
  if (level === "Official") return "official";
  if (level === "Company-reported") return "company";
  if (level === "Reported") return "reported";
  if (level === "Open question") return "open";
  return "interpretation";
}

function EvidenceTag({ level }: { level: ComparativeEvidenceLabel }) {
  return <span className={`comparative-tag comparative-tag-${evidenceTone(level)}`}>{level}</span>;
}

function moveTab(
  event: ReactKeyboardEvent<HTMLButtonElement>,
  index: number,
  items: readonly { id: string }[],
  activate: (id: string) => void,
) {
  const key = event.key;
  if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(key)) return;
  event.preventDefault();
  const nextIndex = key === "Home"
    ? 0
    : key === "End"
      ? items.length - 1
      : (index + (key === "ArrowLeft" || key === "ArrowUp" ? -1 : 1) + items.length) % items.length;
  activate(items[nextIndex].id);
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button[role="tab"]')[nextIndex]?.focus();
}

function SourceDrawer({ sourceIds }: { sourceIds: string[] }) {
  const sources = sourceIds.map((id) => sourceById.get(id)).filter(Boolean);
  return (
    <details className="comparative-source-drawer">
      <summary>
        <span>Open source trail <small>{sources.length} records</small></span>
        <span aria-hidden="true" className="comparative-plus">+</span>
      </summary>
      <div className="comparative-source-list">
        {sources.map((source) => (
          <div key={source!.id} className="comparative-source-row">
            <span className="comparative-source-id">{source!.id}</span>
            <div>
              <a href={source!.url} target="_blank" rel="noreferrer">
                {source!.title}<span aria-hidden="true">↗</span>
              </a>
              <p>{source!.publisher}{source!.sourceDate ? ` · ${source!.sourceDate}` : ""} · {source!.evidenceGrade}</p>
              <small>{source!.locator}. {source!.notes}</small>
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}

function selectionFromLocation() {
  const fallbackLens = comparativeChapter.lenses[0];
  if (!fallbackLens) return { lensId: "", caseId: "" };
  if (typeof window === "undefined") return { lensId: fallbackLens.id, caseId: fallbackLens.cases[0]?.id ?? "" };
  const requestedLens = new URLSearchParams(window.location.search).get("lens");
  const requestedCase = new URLSearchParams(window.location.search).get("case");
  const lens = comparativeChapter.lenses.find((item) => item.id === requestedLens) ?? fallbackLens;
  const item = lens.cases.find((candidate) => candidate.id === requestedCase) ?? lens.cases[0];
  return { lensId: lens.id, caseId: item?.id ?? "" };
}

function Flow({ items }: { items: string[] }) {
  return (
    <ol className="comparative-flow" aria-label="Operating sequence">
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
          {index < items.length - 1 ? <i aria-hidden="true">→</i> : null}
        </li>
      ))}
    </ol>
  );
}

function CaseField({ label, children, emphasis = false }: { label: string; children: string; emphasis?: boolean }) {
  return (
    <div className={emphasis ? "comparative-field comparative-field-emphasis" : "comparative-field"}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function CasePanel({ item }: { item: ComparativeCase }) {
  return (
    <article id={`comparative-case-${item.id}`} className="comparative-case-panel" tabIndex={-1}>
      <header className="comparative-case-header">
        <div>
          <p>{item.geography} · {item.mechanism}</p>
          <h3>{item.name}</h3>
        </div>
        <EvidenceTag level={item.evidence_label} />
      </header>

      <div className="comparative-result-lead">
        <div>
          <p className="comparative-result-label">Result first</p>
          <h4>{item.result}</h4>
        </div>
        <dl>
          <div><dt>Paid by</dt><dd>{item.payer}</dd></div>
          <div><dt>Work carried</dt><dd>{item.human_burden}</dd></div>
          <div><dt>Limit</dt><dd>{item.failure_or_limit}</dd></div>
        </dl>
      </div>

      <details className="comparative-operating-detail" key={item.id}>
      <summary>How the business works: customer, revenue, costs and company journey</summary>
      <dl className="comparative-fields">
        <CaseField label="Customer">{item.customer}</CaseField>
        <CaseField label="Payer">{item.payer}</CaseField>
        <CaseField label="Workflow">{item.workflow}</CaseField>
        <CaseField label="Human burden">{item.human_burden}</CaseField>
        <CaseField label="Company journey">{item.journey}</CaseField>
        <CaseField label="Monetization">{item.monetization}</CaseField>
        <CaseField label="Measured or reported result" emphasis>{item.result}</CaseField>
        <CaseField label="Capital requirements">{item.capital}</CaseField>
        <CaseField label="Failure or limit">{item.failure_or_limit}</CaseField>
        <CaseField label="Still unknown">{item.unknown}</CaseField>
      </dl>
      </details>

      <div className="comparative-transfer-note">
        <span>Bangladesh transfer test</span>
        <p>{item.transfer_test}</p>
      </div>
      <SourceDrawer sourceIds={item.source_ids} />
    </article>
  );
}

function LensPanel({ lens, activeCaseId, setActiveCaseId }: { lens: ComparativeLens; activeCaseId: string; setActiveCaseId: (id: string, event?: ReactMouseEvent<HTMLButtonElement>) => void }) {
  const activeCase = lens.cases.find((item) => item.id === activeCaseId) ?? lens.cases[0];
  return (
    <div className="comparative-lens-panel" role="tabpanel" aria-labelledby={`comparative-tab-${lens.id}`} id="comparative-active-panel">
      <Reveal variant="fade">
        <div className="comparative-lens-intro">
          <div>
            <p className="comparative-kicker">{lens.eyebrow}</p>
            <h2>{lens.title}</h2>
          </div>
          <div>
            <p className="comparative-question">{lens.question}</p>
            <p className="comparative-summary">{lens.summary}</p>
          </div>
        </div>
      </Reveal>

      <Flow items={lens.flow} />

      <div className="comparative-case-workbench">
        <aside className="comparative-case-index" aria-label={`${lens.title} mechanisms`}>
          <p className="comparative-index-label">Choose an example</p>
          <ol>
            {lens.cases.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={item.id === activeCase.id}
                  className={item.id === activeCase.id ? "is-active" : ""}
                  onClick={(event) => setActiveCaseId(item.id, event)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.name}</strong>
                  <div className="comparative-case-context">
                    <small>{item.mechanism}</small>
                  </div>
                </button>
              </li>
            ))}
          </ol>
        </aside>
        <div className="comparative-case-stage" id="comparative-case-stage">
          <p className="comparative-selection-status" aria-live="polite">Showing {activeCase.name}. Result and limits appear first, followed by the operating detail.</p>
          <CasePanel item={activeCase} />
        </div>
      </div>

      <div className="comparative-lens-transfer">
        <span>What has to be rebuilt locally</span>
        <p>{lens.transfer}</p>
      </div>
    </div>
  );
}

export function ComparativeChapter({ standalone = false }: { standalone?: boolean }) {
  // Render the same default markup on the server and client, then apply a
  // shareable query selection after hydration to avoid a mismatch warning.
  const fallbackLens = comparativeChapter.lenses[0];
  const [activeLensId, setActiveLensId] = useState(fallbackLens?.id || "managed-distribution");
  const [activeCaseId, setActiveCaseId] = useState(fallbackLens?.cases[0]?.id || "case-beike-acn");

  useEffect(() => {
    const applyLocation = () => {
      const next = selectionFromLocation();
      if (!next.lensId) return;
      setActiveLensId(next.lensId);
      setActiveCaseId(next.caseId);
      // A shared case URL should open on the selected result, not only the
      // chapter heading. The extra frame waits for the selected panel to
      // render after state hydration.
      const location = new URL(window.location.href);
      if (location.hash === "#jcx-comparative" && location.searchParams.has("case")) {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            document.getElementById(`comparative-case-${next.caseId}`)?.scrollIntoView({ block: "start", behavior: "auto" });
          });
        });
      }
    };
    const frame = window.requestAnimationFrame(applyLocation);
    window.addEventListener("popstate", applyLocation);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", applyLocation);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#jcx-comparative") return;
    const target = document.getElementById("jcx-comparative");
    if (!target) return;
    requestAnimationFrame(() => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start", behavior: "auto" });
      root.style.scrollBehavior = previousScrollBehavior;
    });
  }, []);

  const activeLens = comparativeChapter.lenses.find((lens) => lens.id === activeLensId) ?? comparativeChapter.lenses[0];

  if (!activeLens) return null;

  const pushSelection = (lensId: string, caseId: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lens", lensId);
      url.searchParams.set("case", caseId);
      window.history.pushState({ jcxComparative: true, lensId, caseId }, "", `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
    }
  };

  const selectLens = (id: string) => {
    const nextLens = comparativeChapter.lenses.find((lens) => lens.id === id) ?? comparativeChapter.lenses[0];
    if (!nextLens) return;
    const nextCaseId = nextLens.cases[0]?.id ?? "";
    pushSelection(nextLens.id, nextCaseId);
    setActiveLensId(id);
    setActiveCaseId(nextCaseId);
  };
  const selectCase = (id: string, event?: ReactMouseEvent<HTMLButtonElement>) => {
    setActiveCaseId(id);
    pushSelection(activeLens.id, id);
    // Pointer/touch users on a narrow screen should see the updated result. A
    // keyboard selection keeps focus on its native button and is announced by
    // the live status line instead of being yanked down the page.
    if (event?.detail && typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches) {
      requestAnimationFrame(() => document.getElementById(`comparative-case-${id}`)?.scrollIntoView({ block: "start", behavior: "smooth" }));
    }
  };
  const OpeningHeading = standalone ? "h1" : "h2";

  return (
    <section id="jcx-comparative" className={`comparative-chapter ${standalone ? "comparative-chapter-standalone" : ""}`} aria-labelledby="comparative-title">
      <div className="comparative-inner">
        <div className="comparative-opening">
          <div className="comparative-opening-index" aria-hidden="true">{standalone ? "↗" : "08"}</div>
          <div>
            <p className="comparative-kicker">{comparativeChapter.opening.eyebrow} · updated {comparativeChapter.updated}</p>
            <OpeningHeading id="comparative-title">{standalone ? "What works elsewhere. What could work here." : comparativeChapter.opening.title}</OpeningHeading>
            <p className="comparative-opening-dek">Choose a topic, then a company or country. Read the result, the limits and the Bangladesh test. Open the business details only when you want to go deeper.</p>
            <p className="comparative-opening-boundary">{comparativeChapter.opening.boundary}</p>
          </div>
        </div>

        <div className="comparative-lens-tabs" role="tablist" aria-label="Comparative research lenses">
          {comparativeChapter.lenses.map((lens, index) => (
            <button
              key={lens.id}
              type="button"
              role="tab"
              id={`comparative-tab-${lens.id}`}
              aria-selected={lens.id === activeLens.id}
              aria-controls="comparative-active-panel"
              tabIndex={lens.id === activeLens.id ? 0 : -1}
              className={lens.id === activeLens.id ? "is-active" : ""}
              onClick={() => selectLens(lens.id)}
              onKeyDown={(event) => moveTab(event, index, comparativeChapter.lenses, selectLens)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{["Sales & brokerage", "Rentals & services", "Records & verification", "Developer technology", "Startups & regions", "Country differences"][index] ?? lens.title}</strong>
              <small>{lens.cases.length} examples</small>
            </button>
          ))}
        </div>

        <LensPanel lens={activeLens} activeCaseId={activeCaseId} setActiveCaseId={selectCase} />

        <div className="comparative-definitions">
          <div>
            <p className="comparative-kicker">The vocabulary guardrail</p>
            <h2>Words that keep the comparison honest.</h2>
            <p>These definitions travel with the source trail. They stop a market signal becoming a closing price, a pilot becoming adoption, or a funding round becoming a return.</p>
          </div>
          <dl>
            {comparativeChapter.definitions.map((definition) => (
              <div key={definition.term}>
                <dt>{definition.term}</dt>
                <dd>{definition.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="comparative-boundary">
          <div>
            <p className="comparative-kicker">Presentation boundary</p>
            <h2>The evidence is broad enough to frame a test, not to declare a winner.</h2>
          </div>
          <div>
            <ul>
              {comparativeChapter.publicBoundary.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="comparative-next-links">
              <Link href="/brief">Open the short briefing <span aria-hidden="true">↗</span></Link>
              <Link href="/evidence">Browse the measured archive <span aria-hidden="true">↗</span></Link>
              <Link href="/methodology">Read the method <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
