import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Research: choose your question", description: "A clear index of the Propty analysis: business models, countries, startups, results, company records and sources." };
const groups = [
  { id: "understand", title: "Understand the opportunity", description: "The short route from no background to a useful conversation.", links: [
    ["/guide", "New to proptech?", "Learn the business models and the few terms you need."],
    ["/", "What is the opportunity?", "The visual overview, designed for a quick first read."],
    ["/plan", "What should we test first?", "Alternatives, product priorities and an illustrative 12-week pilot."],
  ]},
  { id: "compare", title: "Compare the evidence", description: "Learn from a company’s approach without assuming its market behaves like Bangladesh.", links: [
    ["/capabilities", "Who offers which features?", "Four selected companies, compared capability by capability."],
    ["/comparison", "What transfers across countries?", "Business models, outcomes, failures and local constraints across five research themes."],
    ["/startups", "Which YC startups matter here?", "Six relevant approaches, the lesson in each, and what still needs testing."],
    ["/evidence", "What actually worked or failed?", "Reported results with definitions, dates, sources and limitations."],
  ]},
  { id: "verify", title: "Look something up", description: "Reference material when a specific question comes up. You do not need to read all of this before a meeting.", links: [
    ["/atlas", "Find a company", "Search the researched company, product and programme records."],
    ["/discovery", "Explore the wider search", "Early research leads, including the dated YC and accelerator snapshots."],
    ["/standards", "Check technology requirements", "A reference checklist for data, integration, security and implementation."],
    ["/methodology", "Check the sources and method", "Evidence labels, source register, open questions and corrections."],
  ]},
];
export default function ResearchPage(){return <article className="learn-page"><header className="learn-hero"><p className="reading-kicker">Your research index</p><h1>Start with a question.<br />Go only as deep as you need.</h1><p>You do not need to read hundreds of records. Begin with the overview, compare the useful examples, then discuss what to test.</p></header><ol className="learn-path"><li><span className="learn-number">01 / Understand</span><strong><Link href="/">Overview</Link></strong><p>The central idea, in a quick visual read.</p></li><li><span className="learn-number">02 / Compare</span><strong><Link href="/capabilities">Company approaches</Link></strong><p>What exists and why it matters.</p></li><li><span className="learn-number">03 / Decide</span><strong><Link href="/plan">Proposed roadmap</Link></strong><p>What to test before investing further.</p></li><li><span className="learn-number">04 / Verify</span><strong><Link href="/evidence">Results & sources</Link></strong><p>The evidence behind the discussion.</p></li></ol><nav className="learn-jump" aria-label="Research groups">{groups.map(g=><a key={g.id} href={`#${g.id}`}>{g.title}</a>)}</nav>{groups.map(g=><section key={g.id} id={g.id} className="learn-section"><h2>{g.title}</h2><p>{g.description}</p><div className="learn-grid">{g.links.map(([href,title,copy])=><div key={href} className="learn-card"><h3>{title}</h3><p>{copy}</p><Link href={href}>Explore this question <span className="sr-only">: {title}</span><span aria-hidden="true"> ↗</span></Link></div>)}</div></section>)}<details className="learn-note"><summary>Prefer a longer written explanation?</summary><p>The narrative pages remain available as an alternative format, not extra steps you must complete.</p><div className="learn-links"><Link href="/brief">Written summary</Link><Link href="/story">Full research narrative</Link></div></details></article>}
