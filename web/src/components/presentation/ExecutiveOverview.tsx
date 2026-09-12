"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import {
  capabilityLabels,
  executiveCompanies,
  executiveMetrics,
} from "@/content/executive-evidence";
import "./executive-overview.css";

const priorities = [
  {
    id: "start",
    label: "Start here",
    title: "Make the sale easier.",
    text: "Pilot accurate listings, reliable follow-up and coordinated visits.",
    items: [
      "Current property information",
      "Enquiry assignment + follow-up",
      "Visits + transaction tracking",
    ],
    measure:
      "Track collected commission, costs and customer experience.",
    status: "Proposed first test",
  },
  {
    id: "test",
    label: "Test next",
    title: "Find the service worth scaling.",
    text: "Compare assisted buying, agent tools and verification support. Identify who will pay before expanding.",
    items: [
      "Buyer and seller interviews",
      "Agent collaboration pilot",
      "Paid service experiments",
    ],
    measure:
      "Look for repeat use, willingness to pay and a workable delivery cost.",
    status: "Options, not commitments",
  },
  {
    id: "wait",
    label: "Wait for proof",
    title: "Earn the right to expand.",
    text: "A large marketplace, bank data products and financial services need stronger evidence and different capabilities.",
    items: [
      "Marketplace subscriptions",
      "Property-price estimates",
      "Bank and finance partnerships",
    ],
    measure:
      "Require reliable records, partner demand and appropriate professional review.",
    status: "Revisit when conditions change",
  },
] as const;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function ServiceDrawing() {
  return (
    <div className="ex-drawing">
      <div className="ex-drawing-label">
        <span className="ex-dot" /> A possible service, in three layers
      </div>
      <svg
        viewBox="0 0 620 470"
        role="img"
        aria-labelledby="service-title service-desc"
      >
        <title id="service-title">Find, trust and complete</title>
        <desc id="service-desc">
          An architectural illustration of three proposed service layers:
          discovery, dependable information and human-supported completion. This
          is a concept, not measured data.
        </desc>
        <defs>
          <pattern
            id="ex-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="620"
          height="470"
          fill="url(#ex-grid)"
          opacity=".16"
        />
        <g
          className="ex-blueprint-grid"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M65 330 315 185 555 324 305 469Z" opacity=".18" />
          <path
            d="m115 359 249-145m-199 173 249-144m-199 173 249-145m-299-28 240 139M165 271l240 139M215 242l240 139M265 213l240 139"
            opacity=".12"
          />
        </g>
        <g className="ex-layer ex-layer-bottom">
          <path
            d="m125 290 188-108 193 111-188 109Z"
            fill="#e2e1d7"
            stroke="#74807d"
          />
          <path
            d="m125 290 193 111v13L125 303Z"
            fill="#c5cac0"
            stroke="#74807d"
          />
          <path
            d="m318 401 188-108v13L318 414Z"
            fill="#eaece2"
            stroke="#74807d"
          />
          <path
            d="m160 290 154-87 154 88-152 88Z"
            fill="none"
            stroke="#a7afa5"
            strokeDasharray="4 5"
          />
        </g>
        <g className="ex-layer ex-layer-middle">
          <path
            d="m125 219 188-108 193 111-188 109Z"
            fill="#dce4db"
            fillOpacity=".93"
            stroke="#738979"
          />
          <path
            d="m125 219 193 112v10L125 230Z"
            fill="#b5c7b7"
            stroke="#738979"
          />
          <path
            d="m318 331 188-109v10L318 341Z"
            fill="#d5dfd1"
            stroke="#738979"
          />
          <path
            d="m192 219 120-70 128 73-120 70Z"
            fill="none"
            stroke="#66816a"
          />
          <path
            d="m260 217 36 21 62-36"
            fill="none"
            stroke="#3a684b"
            strokeWidth="4"
          />
        </g>
        <g className="ex-layer ex-layer-top">
          <path
            d="m125 146 188-108 193 111-188 109Z"
            fill="#f5f1e7"
            stroke="#8b8980"
          />
          <path
            d="m125 146 193 112v10L125 157Z"
            fill="#d3cec1"
            stroke="#8b8980"
          />
          <path
            d="m318 258 188-109v10L318 268Z"
            fill="#e6e2d7"
            stroke="#8b8980"
          />
          <path
            d="m230 149 73-43 61 35-72 43Z"
            fill="#eb6e45"
            stroke="#a24424"
          />
          <path d="m230 149v-67l73-42v66Z" fill="#e46b45" stroke="#a24424" />
          <path d="m303 40 61 35v66l-61-35Z" fill="#c9522f" stroke="#a24424" />
          <path
            d="m230 82 73-42 61 35-72 42Z"
            fill="#fb9c74"
            stroke="#a24424"
          />
          <path
            d="m242 94 47-27m-47 43 47-27m-47 43 47-27m27-36 35 20m-35-4 35 20m-35-4 35 20"
            fill="none"
            stroke="#87371e"
            opacity=".7"
          />
          <path
            d="m345 169 52-30 33 19-52 30Z"
            fill="#dadfd3"
            stroke="#6c7e67"
          />
          <path d="m345 169v-31l52-30v31Z" fill="#b9c8b0" stroke="#6c7e67" />
          <path d="m397 108 33 19v31l-33-19Z" fill="#839d7d" stroke="#6c7e67" />
          <path
            d="m345 138 52-30 33 19-52 30Z"
            fill="#e3e9dd"
            stroke="#6c7e67"
          />
        </g>
        <g
          className="ex-drawing-connectors"
          fill="none"
          stroke="#68746a"
          strokeWidth="1"
        >
          <path d="M470 126h63V84h65M480 224h75M459 330h63v46h74" />
          <circle cx="470" cy="126" r="3" fill="#e46b45" />
          <circle cx="480" cy="224" r="3" fill="#547359" />
          <circle cx="459" cy="330" r="3" fill="#547359" />
        </g>
        <g
          fontFamily="var(--font-mono), monospace"
          fontSize="11"
          fill="#39463e"
        >
          <text x="545" y="76">
            01 FIND
          </text>
          <text x="515" y="215">
            02 TRUST
          </text>
          <text x="522" y="394">
            03 COMPLETE
          </text>
        </g>
      </svg>
      <div className="ex-drawing-foot">
        <span>Technology + people + clear responsibility</span>
        <span>Concept / not a forecast</span>
      </div>
    </div>
  );
}

export function ExecutiveOverview() {
  const root = useRef<HTMLDivElement>(null);
  const [priority, setPriority] = useState(0);
  const [company, setCompany] = useState<string | null>(null);
  const selected = priorities[priority];
  const selectedCompany = executiveCompanies.find(
    (item) => item.id === company,
  );

  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (!root.current) return;
      const total = root.current.offsetHeight - window.innerHeight;
      root.current.style.setProperty(
        "--ex-progress",
        String(Math.min(1, Math.max(0, window.scrollY / Math.max(total, 1)))),
      );
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, []);

  return (
    <div ref={root} className="ex-overview">
      <div className="ex-progress" aria-hidden="true" />
      <section className="ex-hero ex-wrap" aria-labelledby="ex-title">
        <div className="ex-hero-meta">
          <span>Propty / The opportunity ahead</span>
          <span>Research edition · September 2026</span>
        </div>
        <div className="ex-hero-grid">
          <div className="ex-hero-copy">
            <p className="ex-eyebrow">Property technology. Bangladesh.</p>
            <h1 id="ex-title">
              A clearer way
              <br />
              to build <em>Propty.</em>
            </h1>
            <p className="ex-lede">
              What other companies teach us.
              <br />
              What could work here. Where to begin.
            </p>
            <a href="#findings" className="ex-primary">
              The two-minute overview <span aria-hidden="true">↓</span>
            </a>
            <p style={{ marginTop: 20, fontSize: 13 }}><Link href="/guide" className="u-link">New to proptech? Start with the basics →</Link></p>
          </div>
          <ServiceDrawing />
        </div>
        <div className="ex-thesis">
          <span className="ex-eyebrow">Our working recommendation</span>
          <p>
            Make property sales more dependable.
            <br />
            <strong>Test the service. Then scale the platform.</strong>
          </p>
          <Link href="/plan">
            Why this starting point <Arrow />
          </Link>
        </div>
      </section>

      <section id="findings" className="ex-section ex-ink">
        <span id="jcx-step-01" className="ex-anchor" />
        <span id="jcx-step-02" className="ex-anchor" />
        <div className="ex-wrap">
          <Reveal className="ex-section-head">
            <div>
              <p className="ex-eyebrow">01 / Lessons from the market</p>
              <h2>
                Four companies.
                <br />
                <em>Four useful lessons.</em>
              </h2>
            </div>
            <p>
              Documented practices, not a ranking.
              <br />
              Select a row for evidence.
            </p>
          </Reveal>
          <div
            className="ex-comparison"
            role="group"
            aria-label="Company practices and possible lessons for Propty"
          >
            <div className="ex-comparison-head" aria-hidden="true">
              <span>Company / market</span>
              <span>What it does</span>
              <span>The lesson to explore</span>
              <span />
            </div>
            {executiveCompanies.map((item, i) => (
              <button
                className={`ex-company-row ${company === item.id ? "is-selected" : ""}`}
                key={item.id}
                onClick={() => setCompany(company === item.id ? null : item.id)}
                aria-expanded={company === item.id}
                aria-controls="ex-company-evidence"
                type="button"
              >
                <span className="ex-company-name">
                  <span className="ex-company-number">0{i + 1}</span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.country}</small>
                  </span>
                </span>
                <span className="ex-practice">{item.practice}</span>
                <span className="ex-lesson">{item.lesson}</span>
                <span className="ex-row-arrow" aria-hidden="true">
                  {company === item.id ? "−" : "+"}
                </span>
              </button>
            ))}
          </div>
          <div
            id="ex-company-evidence"
            className="ex-evidence-expansion"
            hidden={!selectedCompany}
          >
            {selectedCompany && (
              <>
                <span className="ex-eyebrow">
                  {selectedCompany.name} / Evidence boundary
                </span>
                <p>{selectedCompany.caveat}</p>
                <a
                  href={selectedCompany.source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {selectedCompany.source.label} <Arrow diagonal />
                </a>
                <div className="ex-capabilities">
                  {selectedCompany.capabilities.map((capability) => (
                    <div key={capability.capability}>
                      <strong>{capabilityLabels[capability.capability]}</strong>
                      <span className="ex-capability-status">
                        {capability.status === "observed"
                          ? "Described in source"
                          : "Not established in this review"}
                      </span>
                      <p>{capability.summary}</p>
                      <a
                        href={capability.source.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Supporting source <Arrow diagonal />
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="ex-section-foot">
            <p>
              A feature can exist without proving profit or a fit for
              Bangladesh.
            </p>
            <Link href="/capabilities">
              Open the capability matrix <Arrow />
            </Link>
          </div>
          <div
            className="ex-numbers"
            aria-label="Two different lessons from company disclosures, not a performance ranking"
          >
            <div>
              <span className="ex-eyebrow">
                Cooperation can become the norm
              </span>
              <div className="ex-number-value">{executiveMetrics[0].value}</div>
              <div
                className="ex-segment-chart"
                role="img"
                aria-label="Approximately 75 percent, or three out of four"
              >
                <span />
                <span />
                <span />
                <span className="is-empty" />
              </div>
              <p>
                of Beike existing-home sales involved cross-store collaboration.
              </p>
              <a
                href={executiveMetrics[0].source.url}
                target="_blank"
                rel="noreferrer"
              >
                2024 · Company-reported participation <Arrow diagonal />
              </a>
            </div>
            <div>
              <span className="ex-eyebrow">Scale can coexist with losses</span>
              <div className="ex-number-pair">
                <div>
                  <strong>
                    4,971<span>m</span>
                  </strong>
                  <small>Billings / INR</small>
                </div>
                <div>
                  <strong>
                    −592<span>m</span>
                  </strong>
                  <small>Operating profit before tax / INR</small>
                </div>
              </div>
              <p>
                99acres reported an operating loss alongside substantial
                billings.
              </p>
              <a
                href={executiveMetrics[1].source.url}
                target="_blank"
                rel="noreferrer"
              >
                FY2026 · Different accounting measures <Arrow diagonal />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="bangladesh" className="ex-section ex-wrap">
        <span id="jcx-step-03" className="ex-anchor" />
        <Reveal className="ex-section-head">
          <div>
            <p className="ex-eyebrow">02 / The Bangladesh opportunity</p>
            <h2>
              Bring the useful parts.
              <br />
              <em>Test the local assumptions.</em>
            </h2>
          </div>
          <Link
            href="/comparison?lens=country-transfer&case=country-bangladesh#jcx-comparative"
            className="ex-text-link"
          >
            Country evidence <Arrow />
          </Link>
        </Reveal>
        <div className="ex-transfer-grid">
          <Reveal className="ex-transfer-main">
            <span className="ex-transfer-label">A proposed first service</span>
            <div className="ex-service-path">
              <span>Find</span>
              <i aria-hidden="true">→</i>
              <span>Check</span>
              <i aria-hidden="true">→</i>
              <span>Visit</span>
              <i aria-hidden="true">→</i>
              <span>Close</span>
            </div>
            <p>
              Accurate information. Responsive help. Clear next steps.
              <br />Possible payer: buyer, seller or developer at completion.
            </p>
            <span className="ex-small-note">
              Customer journey, not conversion data.
            </span>
          </Reveal>
          <Reveal className="ex-transfer-note" delay={70}>
            <span className="ex-eyebrow">What we still need to learn</span>
            <ul>
              <li>Which problem customers will pay to solve.</li>
              <li>Which records can be checked reliably.</li>
              <li>Whether the service earns more than it costs.</li>
            </ul>
            <Link href="/plan#routes">
              Compare the business options <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="priorities" className="ex-section ex-priority-section">
        <span id="jcx-step-04" className="ex-anchor" />
        <div className="ex-wrap ex-priority-grid">
          <Reveal>
            <p className="ex-eyebrow">03 / What we would prioritise</p>
            <h2>
              A focused start.
              <br />
              <em>An open future.</em>
            </h2>
            <p className="ex-priority-intro">
              Proposed priorities. Local validation required.
            </p>
            <div
              className="ex-priority-tabs"
              role="tablist"
              aria-label="Proposed priorities"
            >
              {priorities.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  id={`ex-tab-${item.id}`}
                  role="tab"
                  aria-selected={priority === i}
                  aria-controls="ex-priority-panel"
                  tabIndex={priority === i ? 0 : -1}
                  onClick={() => setPriority(i)}
                  onKeyDown={(event) => {
                    let next = i;
                    if (event.key === "ArrowRight" || event.key === "ArrowDown")
                      next = (i + 1) % priorities.length;
                    else if (
                      event.key === "ArrowLeft" ||
                      event.key === "ArrowUp"
                    )
                      next = (i + priorities.length - 1) % priorities.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = priorities.length - 1;
                    else return;
                    event.preventDefault();
                    setPriority(next);
                    document
                      .getElementById(`ex-tab-${priorities[next].id}`)
                      ?.focus();
                  }}
                >
                  <span>0{i + 1}</span>
                  {item.label}
                  <Arrow />
                </button>
              ))}
            </div>
          </Reveal>
          <div
            className={`ex-priority-panel ex-priority-${selected.id}`}
            id="ex-priority-panel"
            role="tabpanel"
            aria-labelledby={`ex-tab-${selected.id}`}
            tabIndex={0}
          >
            <span className="ex-panel-status">
              <span className="ex-dot" />
              {selected.status}
            </span>
            <h3>{selected.title}</h3>
            <p>{selected.text}</p>
            <ul>
              {selected.items.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">↗</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="ex-panel-measure">
              <span className="ex-eyebrow">The evidence to collect</span>
              <p>{selected.measure}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="ex-section ex-wrap">
        <Reveal className="ex-section-head">
          <div>
            <p className="ex-eyebrow">04 / A practical path forward</p>
            <h2>
              Twelve weeks to learn.
              <br />
              <em>Not a promise to scale.</em>
            </h2>
          </div>
          <p>
            Illustrative pilot schedule.
            <br />
            Timing depends on access, people and evidence.
          </p>
        </Reveal>
        <div className="ex-roadmap">
          {[
            {
              weeks: "WEEKS 01–02",
              title: "Understand",
              text: "Map the current sales journey. Establish a baseline.",
              gate: "Agree the problem + owner",
            },
            {
              weeks: "WEEKS 03–06",
              title: "Test",
              text: "Run one service pilot with a responsible team.",
              gate: "Track outcomes + full costs",
            },
            {
              weeks: "WEEKS 07–12",
              title: "Decide",
              text: "Compare results. Improve, expand or stop.",
              gate: "Commit only where evidence holds",
            },
          ].map((step, i) => (
            <Reveal key={step.title} className="ex-roadmap-step" delay={i * 70}>
              <div className="ex-roadmap-top">
                <span className="ex-roadmap-dot">0{i + 1}</span>
                <span>{step.weeks}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="ex-roadmap-gate">{step.gate}</span>
            </Reveal>
          ))}
        </div>
        <div className="ex-section-foot">
          <p>
            Judge additional collected revenue, not property value or lead
            counts alone.
          </p>
          <Link href="/plan#xp-roadmap-title">
            Open the detailed plan <Arrow />
          </Link>
        </div>
      </section>

      <section className="ex-library ex-ink">
        <span id="jcx-step-05" className="ex-anchor" />
        <span id="jcx-step-06" className="ex-anchor" />
        <div className="ex-wrap">
          <Reveal className="ex-library-head">
            <p className="ex-eyebrow">The research behind the view</p>
            <h2>
              Simple on the surface.
              <br />
              <em>Evidence underneath.</em>
            </h2>
          </Reveal>
          <div className="ex-library-links">
            <Link href="/comparison">
              <span>01 / Compare</span>
              <strong>Companies & countries</strong>
              <Arrow diagonal />
            </Link>
            <Link href="/plan">
              <span>02 / Discuss</span>
              <strong>Product & roadmap</strong>
              <Arrow diagonal />
            </Link>
            <Link href="/evidence">
              <span>03 / Verify</span>
              <strong>Results & sources</strong>
              <Arrow diagonal />
            </Link>
          </div>
          <div className="ex-archive-links">
            <Link href="/atlas">
              Company archive <Arrow />
            </Link>
            <Link href="/startups">
              YC startup shortlist <Arrow />
            </Link>
            <Link href="/plan#xp-jcx-title">
              Inside JCX <Arrow />
            </Link>
            <Link href="/research">
              All research sections <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
