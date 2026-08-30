"use client";

import { useEffect, useRef, useState } from "react";
import { taxonomy } from "@/data";

/**
 * The Section rail: a persistent architectural section drawing that runs
 * down the journey. The tower is drawn as you scroll: land strata at the
 * base, floors rising, and the L12 data/trust layer wrapping the whole.
 * Also serves as chapter navigation. Honors reduced motion (static full
 * drawing, no scroll tracking visuals change: nav still works).
 */
export function SectionRail({
  chapters,
}: {
  chapters: { id: string; order: number; railCodes: string[] }[];
}) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const observed = useRef<(Element | null)[]>([]);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    observed.current = sections;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = sections.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [chapters]);

  const activeCodes = new Set(chapters[active]?.railCodes ?? []);

  return (
    <nav
      aria-label="Journey chapters"
      className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-[var(--spacing-rail)] lg:block"
    >
      <div className="relative h-full">
        {/* The drawn section line */}
        <svg
          aria-hidden="true"
          className="absolute left-6 top-0 h-full w-8 text-ink-soft"
          viewBox="0 0 32 1000"
          preserveAspectRatio="none"
        >
          {/* ground mark */}
          <line x1="4" y1="880" x2="28" y2="880" stroke="currentColor" strokeWidth="1.5" />
          <line x1="9" y1="887" x2="23" y2="887" stroke="currentColor" strokeWidth="1" />
          <line x1="13" y1="894" x2="19" y2="894" stroke="currentColor" strokeWidth="1" />
          {/* tower section */}
          <line
            x1="16"
            y1="880"
            x2="16"
            y2="120"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="760"
            strokeDashoffset={760 * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.15s linear" }}
          />
          {/* floors */}
          {[820, 755, 690, 625, 560, 495, 430, 365, 300, 235, 175].map((y) => (
            <line key={y} x1="10" y1={y} x2="22" y2={y} stroke="currentColor" strokeWidth="1" opacity="0.55" />
          ))}
          {/* roof + data halo */}
          <line x1="8" y1="120" x2="24" y2="120" stroke="currentColor" strokeWidth="1.5" />
          <circle
            cx="16"
            cy="86"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity={activeCodes.has("L12") ? 1 : 0.35}
          />
        </svg>

        {/* Lifecycle stops */}
        <ol className="absolute inset-y-0 left-11 flex flex-col justify-between py-16">
          {taxonomy.map((t) => {
            const lit = activeCodes.has(t.code);
            return (
              <li key={t.code} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`block h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                    lit ? "bg-mark" : "bg-line-strong"
                  }`}
                />
                <span
                  className={`font-mono text-[9px] tracking-[0.12em] transition-colors duration-500 ${
                    lit ? "text-mark-deep" : "text-ink-soft/50"
                  }`}
                >
                  {t.code}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Chapter position marker */}
        <p
          aria-hidden="true"
          className="absolute bottom-3 left-11 font-mono text-[10px] tracking-[0.14em] text-mark-deep"
        >
          {String(chapters[active]?.order ?? 1).padStart(2, "0")}
        </p>
      </div>
    </nav>
  );
}

/** Mobile: slim top progress rule. */
export function SectionProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-14 z-40 h-0.5 bg-line lg:hidden">
      <div className="h-full bg-mark transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
