import type { Metadata } from "next";
import Link from "next/link";
import {
  capabilityLabels,
  executiveCompanies,
  executiveFindings,
  executiveMetrics,
  type CapabilityKey,
} from "@/content/executive-evidence";
import "./capabilities.css";

export const metadata: Metadata = {
  title: "The capability comparison",
  description:
    "A source-linked comparison of five property-service capabilities across Beike, Bayut, NoBroker and 99acres, with evidence limits.",
};

export default function CapabilitiesPage() {
  const capabilities = Object.entries(capabilityLabels) as [
    CapabilityKey,
    string,
  ][];
  return (
    <article className="cm-page">
      <header className="cm-wrap cm-hero">
        <Link href="/">← Back to the overview</Link>
        <p className="cm-eyebrow">The evidence / A focused comparison</p>
        <h1>
          What is actually
          <br />
          <em>inside the service?</em>
        </h1>
        <p className="cm-intro">
          Five capabilities. Four different business models. Every assessment
          points to its source. This selection explains useful practices; it
          does not rank the companies.
        </p>
        <div className="cm-legend">
          <span>
            <i /> Described in the selected source
          </span>
          <span>
            <i className="cm-unknown" /> Not established in this review
          </span>
        </div>
      </header>
      <section className="cm-wrap" aria-labelledby="cm-table-title">
        <div className="cm-table-top">
          <h2 id="cm-table-title">The capability matrix</h2>
          <p>
            Swipe the table on a small screen. Missing evidence does not mean a
            missing feature.
          </p>
        </div>
        <div
          className="cm-scroll"
          role="region"
          aria-label="Scrollable company capability comparison"
          tabIndex={0}
        >
          <table>
            <caption className="sr-only">
              Capabilities described by selected primary sources.
              Company-reported product descriptions do not establish independent
              effectiveness.
            </caption>
            <thead>
              <tr>
                <th scope="col">Capability</th>
                {executiveCompanies.map((company) => (
                  <th key={company.id} scope="col">
                    <strong>{company.name}</strong>
                    <span>{company.country}</span>
                    <small>{company.model}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {capabilities.map(([key, label]) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  {executiveCompanies.map((company) => {
                    const cell = company.capabilities.find(
                      (item) => item.capability === key,
                    )!;
                    return (
                      <td
                        key={company.id}
                        className={
                          cell.status === "observed"
                            ? "cm-observed"
                            : "cm-unassessed"
                        }
                      >
                        <span className="cm-cell-status">
                          {cell.status === "observed"
                            ? "Described"
                            : "Not established"}
                        </span>
                        <p>{cell.summary}</p>
                        <a
                          href={cell.source.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${company.name}: source for ${label.toLowerCase()}`}
                        >
                          Source ↗
                        </a>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section
        className="cm-wrap cm-lessons"
        aria-labelledby="cm-lessons-title"
      >
        <p className="cm-eyebrow">What changes our thinking</p>
        <h2 id="cm-lessons-title">Three findings worth keeping.</h2>
        {executiveFindings.map((finding, index) => (
          <article className="cm-finding" key={finding.id}>
            <span className="cm-number">0{index + 1}</span>
            <div>
              <h3>{finding.title}</h3>
              <p>{finding.statement}</p>
              <a href={finding.source.url} target="_blank" rel="noreferrer">
                {finding.source.label} ↗
              </a>
            </div>
            <aside>
              <span className="cm-eyebrow">Our interpretation for Propty</span>
              <p>{finding.implication}</p>
            </aside>
          </article>
        ))}
      </section>
      <section className="cm-metric-section">
        <div className="cm-wrap">
          <p className="cm-eyebrow">Numbers with their context</p>
          <h2>What the figures do and do not prove.</h2>
          <div className="cm-metrics">
            {executiveMetrics.map((metric) => (
              <article key={metric.id}>
                <span className="cm-eyebrow">{metric.period}</span>
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.meaning}</p>
                <p className="cm-limit">Limit: {metric.caveat}</p>
                <a href={metric.source.url} target="_blank" rel="noreferrer">
                  {metric.source.label} ↗
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="cm-wrap cm-next">
        <div>
          <p className="cm-eyebrow">Keep the distinction clear</p>
          <h2>
            An observed feature is not
            <br />a proven business case.
          </h2>
          <p>
            Product pages establish an offer. Filings establish reported
            results. Neither alone proves that one feature caused the result or
            that it will work in Bangladesh.
          </p>
        </div>
        <nav aria-label="Continue the analysis">
          <Link href="/plan">Our proposed product and pilot →</Link>
          <Link href="/comparison">
            More companies, countries and failures →
          </Link>
          <Link href="/evidence">The wider evidence library →</Link>
        </nav>
      </section>
    </article>
  );
}
