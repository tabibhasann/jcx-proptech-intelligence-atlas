import type { Metadata } from "next";
import Link from "next/link";
import { companySummaries } from "@/content/company-comparison";
import { CompanyComparison } from "@/components/companies/CompanyComparison";
import "./companies.css";

export const metadata: Metadata = { title: "Companies, evidence and lessons for Propty", description: "A concise, source-linked comparison of relevant property businesses, their services, results, risks and lessons for Bangladesh." };
export default function CompaniesPage() {
  return <article className="co-page">
    <header className="co-hero"><p className="co-kicker">The company comparison</p><h1>What others do.<br /><em>What we can learn.</em></h1><p className="co-intro">{companySummaries.length} selected companies. Their services, evidence and lessons for Propty and JCX, together in one place.</p><p>Start with the table. Open only the companies you want to discuss. This is a selection of reviewed cases, not the entire research database or a ranking.</p><nav className="co-links" aria-label="Company research shortcuts"><a href="#company-table-title">Go to the comparison ↓</a><Link href="/capabilities">Four-company feature matrix ↗</Link><Link href="/discovery">See the broader discovery archive ↗</Link></nav></header>
    <section className="co-takeaways" aria-label="Three research lessons">
      <div><span>01 / A service, not just a website</span><h2>Make the next step easier.</h2><p>Beike, NoBroker and Snapdocs show different ways to coordinate people and transaction work. For Propty, test one complete customer journey.</p></div>
      <div><span>02 / Revenue is not profit</span><h2>Find who pays. Count the cost.</h2><p>Portal subscriptions, closing commissions and monthly rental fees are different businesses. Compare the payment model before comparing scale.</p></div>
      <div><span>03 / A separate JCX opportunity</span><h2>Improve operations too.</h2><p>Aldar and Godrej provide examples of digital customer workflows. For JCX, establish today's response times and errors before promising savings.</p></div>
    </section>
    <CompanyComparison companies={companySummaries} />
    <aside className="co-boundary"><h2>Use the evidence to choose a test, not declare a winner.</h2><p>Company disclosures can show a product or a reported result without proving what caused it. Historical figures are not current valuations. Missing evidence does not mean a company lacks a feature. Bangladesh demand, delivery costs, legal responsibilities and willingness to pay still need local validation.</p><Link href="/plan">Discuss the proposed roadmap →</Link><Link href="/methodology">How the research was assessed ↗</Link></aside>
  </article>;
}
