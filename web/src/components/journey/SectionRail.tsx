"use client";

import { useEffect, useState } from "react";
import { taxonomy } from "@/data";
import { usePageProgress } from "@/components/motion/useScrollProgress";

export type RailChapter = {
  id: string;
  order: number;
  railCodes: string[];
  dark?: boolean;
};

/**
 * The persistent spine. It runs the height of the journey and marks which
 * life-cycle stages the chapter in view actually covers, so the L codes on
 * cards become learnable rather than cryptic. Also carries scroll position.
 *
 * It stays hidden until a chapter is genuinely in view, which keeps it out of
 * the way during the opening sections, and it inverts over dark chapters.
 */
export function SectionRail({ chapters }: { chapters: RailChapter[] }) {
  const [active, setActive] = useState<number | null>(null);
  const progress = usePageProgress();

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const idx = sections.indexOf(e.target as HTMLElement);
          if (idx < 0) continue;
          if (e.isIntersecting) visible.add(idx);
          else visible.delete(idx);
        }
        setActive(visible.size ? Math.min(...visible) : null);
      },
      { rootMargin: "-32% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [chapters]);

  const current = active === null ? null : chapters[active];
  const activeCodes = new Set(current?.railCodes ?? []);
  const onDark = Boolean(current?.dark);
  const shown = current !== null;

  return (
    <nav
      aria-label="Life-cycle stages covered by the chapter in view"
      className={`pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-[var(--spacing-rail)] transition-opacity duration-500 lg:block ${
        shown ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={shown ? undefined : "true"}
    >
      <div className="relative h-full pb-16 pt-20">
        {/* The spine, filled by scroll position */}
        <div
          aria-hidden="true"
          className={`absolute bottom-16 left-[26px] top-20 w-px ${
            onDark ? "bg-dark-line" : "bg-line"
          }`}
        >
          <div
            className="w-full bg-mark/70"
            style={{ height: `${progress * 100}%`, transition: "height 0.12s linear" }}
          />
        </div>

        {/* Chapter position */}
        <p
          aria-hidden="true"
          className="absolute left-0 top-6 w-[52px] text-center font-mono text-[10px] tracking-[0.12em] text-mark-deep"
        >
          {String(current?.order ?? 1).padStart(2, "0")}
          <span
            className={`mt-0.5 block text-[8px] ${
              onDark ? "text-dark-ink-faint" : "text-ink-soft/60"
            }`}
          >
            / 11
          </span>
        </p>

        {/* Life-cycle stops */}
        <ol className="flex h-full flex-col justify-between">
          {taxonomy.map((t) => {
            const lit = activeCodes.has(t.code);
            return (
              <li key={t.code} className="pointer-events-auto flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`ml-[22px] block h-[7px] w-[7px] shrink-0 rounded-full transition-all duration-500 ${
                    onDark ? "ring-dark" : "ring-paper"
                  } ring-2 ${lit ? "scale-125 bg-mark" : onDark ? "bg-dark-line" : "bg-line-strong"}`}
                />
                <span
                  title={`${t.code} · ${t.label}`}
                  className={`font-mono text-[9px] tracking-[0.1em] transition-colors duration-500 ${
                    lit
                      ? onDark
                        ? "text-dark-mark"
                        : "text-mark-deep"
                      : onDark
                        ? "text-dark-ink-faint/60"
                        : "text-ink-soft/45"
                  }`}
                >
                  {t.code}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/** Mobile: a slim progress rule under the header. */
export function SectionProgress() {
  const progress = usePageProgress();
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-14 z-40 h-0.5 bg-line/70 lg:hidden">
      <div className="h-full bg-mark" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
