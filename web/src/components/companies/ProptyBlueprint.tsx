import Link from "next/link";
import { proptyFeatures, proptyRoadmap } from "@/content/company-decisions";
import { companySummaries } from "@/content/company-comparison";

export function ProptyBlueprint() {
  return <section className="co-blueprint" aria-labelledby="propty-features">
    <p className="co-kicker">Our proposal / requires local testing</p>
    <h2 id="propty-features">What could Propty actually offer?</h2>
    <p className="co-intro">Help one customer group find a suitable property, arrange a visit and keep the transaction moving. Start with four connected features, then earn the right to add more.</p>
    <div className="co-blueprint-table"><table><caption className="sr-only">Proposed Propty features, company references and measures. Company examples inform the proposals; they do not prove Bangladesh demand.</caption><thead><tr><th scope="col">Proposed feature</th><th scope="col">What we would build</th><th scope="col">Examples to study</th><th scope="col">Proof to look for</th></tr></thead><tbody>{proptyFeatures.map(f => <tr key={f.name}><th scope="row"><strong>{f.name}</strong><span className="co-stage" data-stage={f.stage}>{f.stage}</span></th><td data-label="Build">{f.build}</td><td data-label="Company references">{f.companies.map(id => <a key={id} href={`/companies?company=${id}`}>{companySummaries.find(c => c.id === id)!.name} ↗</a>)}</td><td data-label="Measure">{f.measure}</td></tr>)}</tbody></table></div>
    <div className="co-local-rules"><h3>Keep the Bangladesh version practical</h3><ul><li>Test a mobile-friendly service with Bangla and English support. Let customers get human help without installing an app.</li><li>Choose one area and one property segment. Check access to real customers and authorised supply before committing to sales or rentals.</li><li>Disclose JCX backing and how properties are selected. Do not describe a parent-backed sales channel as neutral without earning that trust.</li><li>Separate availability checks from ownership or legal verification. Define access, consent and professional responsibility before handling sensitive documents.</li></ul></div>
  </section>;
}

export function ProptyRoadmapSummary() {
  return <section className="co-roadmap" aria-labelledby="propty-roadmap">
    <p className="co-kicker">Indicative 12-week learning plan / not a delivery promise</p><h2 id="propty-roadmap">A plan we can discuss with management</h2>
    <p>The first decision is the customer and problem, not the app's feature count. Dates depend on access, team capacity and actual transaction cycles.</p>
    <ol>{proptyRoadmap.map(p => <li key={p.time}><span className="co-kicker">{p.time}</span><h3>{p.title}</h3><p>{p.action}</p><div className="co-note"><strong>Decision gate</strong><p>{p.gate}</p></div></li>)}</ol>
    <div className="co-local-rules"><h3>Keep the money question clear</h3><p>Test one payer hypothesis first: a developer-funded sales service OR a customer-paid assistance plan. Do not assume either will sell. For any chosen model, track cash collected minus customer acquisition, staff delivery time, partner payments, refunds and other delivery costs. This is a pilot contribution measure, not total company profit.</p><h3>JCX can improve in parallel</h3><p>A shared lead record, follow-up reminders, customer status updates and complaint ownership can be a separate internal project, informed by Aldar, Godrej and Propexo. An internal efficiency gain is not proof that outside customers will pay Propty.</p><h3>Do not put these in the first launch</h3><p>A nationwide super-app, owned-home inventory, rent guarantees, automated legal conclusions or an AI price estimate presented as an authoritative valuation. Each brings additional evidence, capital or accountability requirements.</p></div>
    <Link href="/plan">Explore the full roadmap and alternatives →</Link>
  </section>;
}
