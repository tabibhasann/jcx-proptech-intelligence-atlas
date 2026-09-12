"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages: Record<string, { label: string; purpose: string; next: string; nextLabel: string }> = {
  "/guide": { label: "Start here", purpose: "The basics, without needing a property background.", next: "/", nextLabel: "See the opportunity" },
  "/capabilities": { label: "Compare", purpose: "See what four companies offer. A feature is not proof of commercial success.", next: "/plan", nextLabel: "Explore the proposed roadmap" },
  "/plan": { label: "Roadmap", purpose: "A proposal to discuss and test, not a committed business plan.", next: "/research", nextLabel: "Explore the supporting research" },
  "/research": { label: "Research", purpose: "Choose a question. Open only the detail you need.", next: "/comparison", nextLabel: "Compare business models and countries" },
  "/comparison": { label: "Models & countries", purpose: "Compare how businesses work, what changed and what might transfer to Bangladesh.", next: "/startups", nextLabel: "Explore six relevant YC startups" },
  "/startups": { label: "YC startups", purpose: "Six specific approaches to study, not a ranking or investment recommendation.", next: "/evidence", nextLabel: "Check measured results and failures" },
  "/evidence": { label: "Results & failures", purpose: "Check the result, its source and its limits before drawing a conclusion.", next: "/plan", nextLabel: "Return to the proposed roadmap" },
  "/atlas": { label: "Company library", purpose: "Look up individual research records. Use Compare for the short, curated view.", next: "/capabilities", nextLabel: "See the concise company comparison" },
  "/discovery": { label: "Research leads", purpose: "An early-stage search archive, not a list of proven businesses.", next: "/startups", nextLabel: "Read the curated startup shortlist" },
  "/standards": { label: "Technology checklist", purpose: "Reference material for implementation. Not every standard applies to every product.", next: "/plan", nextLabel: "Return to product priorities" },
  "/methodology": { label: "Sources & method", purpose: "Understand the evidence labels, research limits and correction process.", next: "/research", nextLabel: "Return to the research index" },
  "/brief": { label: "Research summary", purpose: "A written summary of the research. The Overview is the visual introduction.", next: "/", nextLabel: "Open the visual overview" },
  "/story": { label: "Full research narrative", purpose: "The long-form argument. For a quick introduction, use the Overview.", next: "/plan", nextLabel: "See the proposed roadmap" },
};

export function ReadingPath({ position = "top" }: { position?: "top" | "bottom" }) {
  const pathname = usePathname();
  const detail = pathname.startsWith("/atlas/");
  const page = detail ? { label: "Company record", purpose: "One research record, with evidence and unanswered questions.", next: "/atlas", nextLabel: "Back to the company library" } : pages[pathname];
  if (!page) return null;
  if (detail && position === "top") return null;
  if (position === "bottom") return <nav className="reading-next" aria-label="Continue reading"><div><span className="reading-kicker">Where next?</span><Link href={page.next}>{page.nextLabel} <span aria-hidden="true">↗</span></Link></div><Link href="/research" className="reading-index">All research sections</Link><a href="#main" className="reading-index">Back to top ↑</a></nav>;
  return <div className="reading-context"><nav aria-label="Breadcrumb"><Link href="/">Overview</Link><span aria-hidden="true">/</span>{detail && <><Link href="/atlas">Company library</Link><span aria-hidden="true">/</span></>}<span aria-current="page">{page.label}</span></nav><p>{page.purpose}</p></div>;
}
