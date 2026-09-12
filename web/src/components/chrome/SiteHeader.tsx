"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ReadingComfort } from "./ReadingComfort";

const NAV: { href: string; label: string; blurb: string }[] = [
  { href: "/", label: "Overview", blurb: "The opportunity in two minutes" },
  { href: "/capabilities", label: "Compare", blurb: "Company capabilities, sources and lessons" },
  { href: "/plan", label: "Roadmap", blurb: "What to test, in what order" },
  { href: "/research", label: "Research", blurb: "Find cases, countries, startups and sources" },
  { href: "/guide", label: "Start here", blurb: "New to property technology? Learn the basics" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setLifted(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Close the mobile sheet on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => {
    if (href === "/research") return ["/research", "/comparison", "/evidence", "/atlas", "/discovery", "/frontier", "/startups", "/standards", "/methodology", "/story", "/brief"].some(p => pathname === p || pathname.startsWith(p + "/"));
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b bg-paper/95 backdrop-blur-md transition-shadow duration-300 ${
        lifted ? "border-line shadow-paper" : "border-transparent"
      }`}
    >
      <div className="site-header-row mx-auto flex min-h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5"
          aria-label="Propty research, home"
        >
          <span className="inline-grid h-7 w-7 place-items-center bg-mark-deep font-display text-lg text-paper-raised" aria-hidden="true">p.</span>
          <span className="font-display text-lg font-semibold tracking-tight">Propty</span>
          <span className="site-brand-caption hidden font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft transition-colors duration-300 group-hover:text-mark-deep lg:inline">
            Research & strategy
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              title={n.blurb}
              onClick={() => setOpen(false)}
              aria-current={pathname === n.href ? "page" : isCurrent(n.href) ? "true" : undefined}
              className={`slide-link relative px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                isCurrent(n.href) ? "text-mark-deep" : "text-ink-2 hover:text-mark-deep"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <ReadingComfort />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
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
                onClick={() => setOpen(false)}
                aria-current={pathname === n.href ? "page" : isCurrent(n.href) ? "true" : undefined}
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
