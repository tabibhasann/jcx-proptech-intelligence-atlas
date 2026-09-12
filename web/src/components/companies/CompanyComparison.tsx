"use client";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import type { CompanySummary } from "@/content/company-comparison";
import { companyDecisions } from "@/content/company-decisions";

export function CompanyComparison({ companies }: { companies: CompanySummary[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [track, setTrack] = useState("Both workstreams");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [view, setView] = useState<"decision" | "evidence">("decision");
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("company");
    if (id && companies.some(c => c.id === id)) {
      setSearch("");
      setCategory("All categories");
      setTrack("Both workstreams");
      setExpanded([id]);
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(`company-${id}`)?.scrollIntoView({ block: "start" });
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, [companies]);
  const visible = companies.filter(c => (category === "All categories" || c.category === category) && (track === "Both workstreams" || c.track === track) && `${c.name} ${c.country} ${c.offer} ${c.category} ${companyDecisions[c.id].features.join(" ")} ${c.yc ? "YC Y Combinator" : ""}`.toLowerCase().includes(search.toLowerCase()));
  const reset = () => { setSearch(""); setCategory("All categories"); setTrack("Both workstreams"); };
  return <section aria-labelledby="company-table-title">
    <div className="co-heading"><h2 id="company-table-title">The companies, side by side</h2><Link href="/atlas">Browse the wider company library ↗</Link></div>
    <div className="co-view-switch" role="group" aria-label="Company comparison view"><button aria-pressed={view === "decision"} onClick={() => setView("decision")}>Features & Bangladesh fit</button><button aria-pressed={view === "evidence"} onClick={() => setView("evidence")}>Results & evidence</button></div>
    <p className="co-view-note">{view === "decision" ? "Features and payer models summarise the linked research. Bangladesh adaptations and timing are our proposals to test, not proven local outcomes. ‘Pilot first’ means borrow the small feature, not copy the whole company." : "Check the reported result before adopting the idea. Open a company for its sources, financial context and limits."}</p>
    <div className="co-filters">
      <label>Find a company, country or service<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Try India, rentals or YC" /></label>
      <label>Business category<select value={category} onChange={e => setCategory(e.target.value)}>{["All categories", ...new Set(companies.map(c => c.category))].map(c => <option key={c}>{c}</option>)}</select></label>
      <label>Relevant to<select value={track} onChange={e => setTrack(e.target.value)}>{["Both workstreams", "Propty", "JCX operations"].map(c => <option key={c}>{c}</option>)}</select></label>
      <button onClick={reset}>Reset filters</button>
    </div>
    <p className="co-count" role="status">Showing {visible.length} of {companies.length} selected companies. Open a row for the payer, workflow, financial context, risks and sources.</p>
    <div className="co-table-wrap"><table className={`co-table ${view === "decision" ? "co-decision-table" : ""}`}>
      <caption className="sr-only">Selected company offerings, evidence and research lessons. These are not rankings or comparable investment returns.</caption>
      <thead><tr><th scope="col">Company / market</th>{view === "decision" ? <><th scope="col">Features to study</th><th scope="col">Who pays them?</th><th scope="col">Adaptation for Bangladesh</th><th scope="col">When to test</th></> : <><th scope="col">What it does</th><th scope="col">What the evidence shows</th><th scope="col">What we can learn</th></>}</tr></thead>
      <tbody>{visible.map(c => <Fragment key={c.id}>
        <tr id={`company-${c.id}`} className={expanded.includes(c.id) ? "co-active" : ""}>
          <th scope="row"><button className="co-name" aria-expanded={expanded.includes(c.id)} aria-controls={`detail-${c.id}`} onClick={() => setExpanded(prev => prev.includes(c.id) ? prev.filter(id => id !== c.id) : [...prev, c.id])}>{c.name}<span>{expanded.includes(c.id) ? "− Close details" : "+ Open details"}</span></button><span className="co-market">{c.country}</span>{c.yc && <span className="co-tag">YC · {c.yc}</span>}{c.website ? <a className="co-site" href={c.website} target="_blank" rel="noopener noreferrer">Company website ↗</a> : <span className="co-market">Historical case · no active website linked</span>}</th>
          {view === "decision" ? <>
            <td data-label="Features to study"><ul className="co-feature-list">{companyDecisions[c.id].features.map(f => <li key={f}>{f}</li>)}</ul></td>
            <td data-label="Who pays them?"><p>{companyDecisions[c.id].payer}</p></td>
            <td data-label="Our Bangladesh proposal"><p>{companyDecisions[c.id].local}</p></td>
            <td data-label="Proposed timing"><span className="co-stage" data-stage={companyDecisions[c.id].stage}>{companyDecisions[c.id].stage}</span><span className="co-market">{c.track}</span></td>
          </> : <><td data-label="What it does"><span className="co-tag">{c.category}</span><p>{c.offer}</p></td>
          <td data-label="Evidence"><p>{c.outcome}</p></td>
          <td data-label="Our interpretation"><span className="co-tag">Our interpretation · {c.track}</span><p>{c.lesson}</p></td></>}
        </tr>
        <tr id={`detail-${c.id}`} hidden={!expanded.includes(c.id)} className="co-detail"><td colSpan={view === "decision" ? 5 : 4}><div className="co-detail-grid">
          <div><h3>What it does</h3><p>{c.offer}</p><h3>Who pays?</h3><p>{c.payer}</p><h3>How the service works</h3><p>{c.workflow}</p><h3>The work behind the technology</h3><p>{c.burden}</p></div>
          <div><h3>Reported journey</h3><p>{c.history}</p><h3>Money, funding and valuation</h3><p>{c.capital}</p><p className="co-note">{c.valuation} Funding is not revenue, valuation is not cash, and transaction value is not profit.</p><h3>What we still cannot conclude</h3><p>{c.risk}</p></div>
          <div><h3>A Bangladesh question to test</h3><p>{c.test}</p><h3>Check the evidence</h3><ul>{c.sources.map((s, i) => <li key={`${s.url}-${i}`}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a></li>)}</ul>{c.caseUrl && <Link href={c.caseUrl}>Read the full comparison ↗</Link>}<p><Link href={`/companies?company=${c.id}`}>Link to this company</Link></p></div>
        </div></td></tr>
      </Fragment>)}</tbody>
    </table></div>
    {visible.length === 0 && <div className="co-empty"><h3>No companies match these filters.</h3><button onClick={reset}>Show all {companies.length} companies</button></div>}
  </section>;
}
