"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { manifest } from "@/data";

const NAV: { href: string; label: string; blurb: string }[] = [
  { href: "/", label: "Brief", blurb: "Five findings in about a minute" },
  { href: "/story", label: "Story", blurb: "The full argument, thirteen examples" },
  { href: "/atlas", label: "Companies", blurb: `${manifest.counts.qualifiedEntities} records, plain language` },
  { href: "/evidence", label: "Cases", blurb: `${manifest.counts.cases} measured outcomes` },
  { href: "/discovery", label: "Search", blurb: `${manifest.counts.discoveryIdentities} leads, honestly staged` },
  { href: "/standards", label: "Rules", blurb: `${manifest.counts.standards} standards that outlast products` },
  { href: "/methodology", label: "Method", blurb: "How every claim is graded" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-paper/95 backdrop-blur-md transition-shadow duration-300 ${
        lifted ? "border-line shadow-paper" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5"
          aria-label="Built Environment Intelligence, home"
        >
          <span className="font-display text-lg font-semibold tracking-tight">
            Built Environment Intelligence
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft transition-colors duration-300 group-hover:text-mark-deep sm:inline">
            Research briefing · Aug 2026
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              title={n.blurb}
              aria-current={isCurrent(n.href) ? "page" : undefined}
              className={`slide-link relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                isCurrent(n.href) ? "text-mark-deep" : "text-ink-2 hover:text-mark-deep"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile sheet: labels alone are not enough, so each carries its purpose */}
      <nav
        id="mobile-nav"
        aria-label="Sections"
        hidden={!open}
        className="border-t border-line bg-paper-raised md:hidden"
      >
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                aria-current={isCurrent(n.href) ? "page" : undefined}
                className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3.5 last:border-0"
              >
                <span
                  className={`font-mono text-[12px] uppercase tracking-[0.14em] ${
                    isCurrent(n.href) ? "text-mark-deep" : "text-ink"
                  }`}
                >
                  {n.label}
                </span>
                <span className="text-right text-[11px] leading-snug text-ink-soft">{n.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
