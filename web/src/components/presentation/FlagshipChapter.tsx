"use client";

import { useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  flagshipChapter,
  flagshipClaimById,
  flagshipMetricById,
  flagshipSourceById,
  formatFlagshipMetric,
  metricLabel,
  type FlagshipCase,
  type FlagshipClaim,
  type FlagshipEvidenceLevel,
} from "@/content/flagship";

const lenses = ["journey", "economics", "limits"] as const;
type Lens = (typeof lenses)[number];

function evidenceTone(level: FlagshipEvidenceLevel) {
  if (level === "Official") return "official";
  if (level === "Company-reported") return "company";
  if (level === "Reported") return "reported";
  if (level === "Open question") return "open";
  return "interpretation";
}

function EvidencePill({ level }: { level: FlagshipEvidenceLevel }) {
  return <span className={`flagship-pill flagship-pill-${evidenceTone(level)}`}>{level}</span>;
}

function moveCaseTab(
  event: ReactKeyboardEvent<HTMLButtonElement>,
  index: number,
  activate: (id: string) => void,
) {
  const key = event.key;
  if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(key)) return;
  event.preventDefault();
  const nextIndex = key === "Home" ? 0 : key === "End" ? flagshipChapter.cases.length - 1 : (index + (key === "ArrowLeft" || key === "ArrowUp" ? -1 : 1) + flagshipChapter.cases.length) % flagshipChapter.cases.length;
  const next = flagshipChapter.cases[nextIndex];
  activate(next.case_id);
  const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button[role="tab"]');
  buttons?.[nextIndex]?.focus();
}

function SourceLink({ sourceId }: { sourceId: string }) {
  const source = flagshipSourceById[sourceId];
  if (!source) return null;
  return (
    <a className="flagship-source" href={source.url} target="_blank" rel="noreferrer">
      <span className="flagship-source-id">{source.id}</span>
      <span>{source.title}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function MetricLine({ metricId }: { metricId: string }) {
  const metric = flagshipMetricById[metricId];
  if (!metric) return null;
  return (
    <div className="flagship-metric-line">
      <strong>{formatFlagshipMetric(metricId)}</strong>
      <span>{metricLabel(metricId)}</span>
      <small>{metric.note}</small>
    </div>
  );
}

function ClaimEvidence({ claims }: { claims: FlagshipClaim[] }) {
  return (
    <details className="flagship-evidence">
      <summary>
        <span>Open claim record</span>
        <span aria-hidden="true" className="flagship-summary-mark">+</span>
      </summary>
      <div className="flagship-evidence-body">
        {claims.map((claim) => (
          <article key={claim.claim_id} className="flagship-claim">
            <div className="flagship-claim-head">
              <span className="flagship-claim-id">{claim.claim_id}</span>
              <EvidencePill level={claim.evidence_label} />
              <span className="flagship-claim-period">{claim.period}</span>
            </div>
            <p>{claim.statement}</p>
            <small>{claim.note}</small>
            <div className="flagship-claim-links">
              {claim.source_ids.map((sourceId) => <SourceLink key={sourceId} sourceId={sourceId} />)}
            </div>
            <span className="flagship-locator">Locator: {claim.locator}</span>
          </article>
        ))}
      </div>
    </details>
  );
}

function CaseFacts({ item }: { item: FlagshipCase }) {
  return (
    <dl className="flagship-facts">
      <div><dt>Payer</dt><dd>{item.payer}</dd></div>
      <div><dt>Problem</dt><dd>{item.problem}</dd></div>
      <div><dt>Human work</dt><dd>{item.workflow}</dd></div>
      <div><dt>Distribution</dt><dd>{item.distribution}</dd></div>
    </dl>
  );
}

function Journey({ item }: { item: FlagshipCase }) {
  return (
    <ol className="flagship-timeline">
      {item.journey.map((event) => (
        <li key={`${item.case_id}-${event.period}`}>
          <div className="flagship-timeline-marker" aria-hidden="true" />
          <div>
            <div className="flagship-timeline-meta"><strong>{event.period}</strong><EvidencePill level={event.evidence_label} /></div>
            <p>{event.event}</p>
            <div className="flagship-claim-links">{event.source_ids.map((sourceId) => <SourceLink key={sourceId} sourceId={sourceId} />)}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Economics({ item }: { item: FlagshipCase }) {
  return (
    <div className="flagship-economics">
      <div className="flagship-metric-list">
        {item.metric_ids.map((metricId) => <MetricLine key={metricId} metricId={metricId} />)}
      </div>
      <div className="flagship-capital-note">
        <span>Capital and funding</span>
        <p>{item.funding}</p>
      </div>
    </div>
  );
}

function Limits({ item }: { item: FlagshipCase }) {
  return (
    <div className="flagship-limits">
      <div>
        <span>What the record does not disclose</span>
        <p>{item.undisclosed}</p>
      </div>
      <div>
        <span>Transfer reading</span>
        <p>{item.transfer_note}</p>
      </div>
    </div>
  );
}

export function FlagshipChapter() {
  const [activeId, setActiveId] = useState(flagshipChapter.cases[0]?.case_id ?? "FCASE-RIGHTMOVE");
  const [activeLens, setActiveLens] = useState<Lens>("journey");
  const activeCase = flagshipChapter.cases.find((item) => item.case_id === activeId) ?? flagshipChapter.cases[0];
  if (!activeCase) return null;
  const activeClaims = activeCase.claim_ids.map((claimId) => flagshipClaimById[claimId]).filter(Boolean);

  return (
    <section id="jcx-flagship" className="flagship-chapter jcx-scroll-target" aria-labelledby="flagship-title">
      <div className="flagship-inner">
        <div className="flagship-intro">
          <div className="flagship-section-number" aria-hidden="true">07</div>
          <div>
            <p className="jcx-kicker">Flagship comparison · current reviewed chapter</p>
            <h2 id="flagship-title">Four property businesses. Four ways to make money.</h2>
            <p className="flagship-intro-copy">The same interface can hide a subscription portal, a billing-heavy classified business, a multi-service operating system or a field-intensive brokerage. Choose a case, then follow its payer, work, result and limit.</p>
            <p className="flagship-boundary">Updated {flagshipChapter.updated}. This is a bounded chapter, not an exhaustive company directory. The evidence route below keeps a dated archive separate.</p>
          </div>
        </div>

        <div className="flagship-case-nav" role="tablist" aria-label="Four anchor cases">
          {flagshipChapter.cases.map((item, index) => (
            <button
              key={item.case_id}
              type="button"
              role="tab"
              aria-selected={item.case_id === activeCase.case_id}
              aria-controls="flagship-active-case-panel"
              id={`flagship-tab-${item.case_id}`}
              tabIndex={item.case_id === activeCase.case_id ? 0 : -1}
              className={item.case_id === activeCase.case_id ? "is-active" : ""}
              onClick={() => setActiveId(item.case_id)}
              onKeyDown={(event) => moveCaseTab(event, index, setActiveId)}
            >
              <span>0{index + 1}</span>
              <strong>{item.name}</strong>
              <small>{item.model}</small>
            </button>
          ))}
        </div>

        <article id="flagship-active-case-panel" className="flagship-case-panel" role="tabpanel" aria-labelledby={`flagship-tab-${activeCase.case_id}`}>
          <header className="flagship-case-head">
            <div>
              <p className="flagship-case-meta">{activeCase.geography} · {activeCase.status}</p>
              <h3>{activeCase.name}</h3>
            </div>
            <span className="flagship-model-mark">{activeCase.model}</span>
          </header>

          <div className="flagship-lens-tabs" role="tablist" aria-label={`${activeCase.name} reading lenses`}>
            {lenses.map((lens, index) => (
              <button
                key={lens}
                type="button"
                role="tab"
                aria-selected={activeLens === lens}
                aria-controls="flagship-active-lens-panel"
                id={`flagship-lens-tab-${lens}`}
                tabIndex={activeLens === lens ? 0 : -1}
                className={activeLens === lens ? "is-active" : ""}
                onClick={() => setActiveLens(lens)}
                onKeyDown={(event) => {
                  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
                  event.preventDefault();
                  const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? lenses.length - 1 : (index + (event.key === "ArrowLeft" ? -1 : 1) + lenses.length) % lenses.length;
                  setActiveLens(lenses[nextIndex]);
                  const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button[role="tab"]');
                  buttons?.[nextIndex]?.focus();
                }}
              >
                <span>0{index + 1}</span>{lens === "journey" ? "Journey" : lens === "economics" ? "Economics" : "Limits"}
              </button>
            ))}
          </div>

          <div className="flagship-lens-panel" id="flagship-active-lens-panel" role="tabpanel" aria-labelledby={`flagship-lens-tab-${activeLens}`}>
            {activeLens === "journey" ? <><CaseFacts item={activeCase} /><Journey item={activeCase} /></> : null}
            {activeLens === "economics" ? <Economics item={activeCase} /> : null}
            {activeLens === "limits" ? <Limits item={activeCase} /> : null}
          </div>
          <ClaimEvidence claims={activeClaims} />
        </article>

        <div className="flagship-synthesis">
          <div className="flagship-synthesis-lead">
            <p className="jcx-kicker">What the comparison supports</p>
            <h3>The payer is the plot.</h3>
            <p>The transferable lesson is a mechanism, not a company shape. A professional payer, a field workflow, a financing partner and a parent-backed channel create different obligations.</p>
          </div>
          <div className="flagship-synthesis-columns">
            <div><span>Supports</span><ul>{flagshipChapter.synthesis.supports.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><span>Does not prove</span><ul>{flagshipChapter.synthesis.contradicts.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><span>Still open</span><ul>{flagshipChapter.synthesis.cannot_infer.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </div>

        <div className="flagship-transfer">
          <div className="flagship-transfer-lead">
            <p className="jcx-kicker">Bangladesh transfer test</p>
            <h3>Every foreign lesson arrives with a local question.</h3>
            <p>These conditions keep the venture and the internal JCX track honest. Open one row for the next evidence that would change the decision.</p>
          </div>
          <div className="flagship-transfer-list">
            {flagshipChapter.transfer_conditions.map((condition) => (
              <details key={condition.condition_id}>
                <summary><span>{condition.dimension}</span><span aria-hidden="true">+</span></summary>
                <div>
                  <p><strong>Anchor observation</strong>{condition.anchor_observation}</p>
                  <p><strong>Bangladesh question</strong>{condition.bangladesh_question}</p>
                  <p><strong>Evidence needed</strong>{condition.what_evidence_is_missing}</p>
                  <div className="flagship-claim-links">{condition.source_ids.map((sourceId) => <SourceLink key={sourceId} sourceId={sourceId} />)}</div>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="flagship-footer-note">
          <span>Current chapter / dated archive</span>
          <p>The four cases above are the current reviewed comparison for this presentation edition. <a href="/evidence">Open the measured-case index</a> for the broader dated archive, then <a href="/methodology">read how claims are graded</a>.</p>
        </div>
      </div>
    </section>
  );
}
