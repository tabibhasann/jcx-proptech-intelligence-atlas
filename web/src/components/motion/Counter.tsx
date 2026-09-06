"use client";

import { useEffect, useRef, useState } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts up to a value once it scrolls into view. The final value renders
 * immediately for reduced-motion visitors and during server render, so the
 * number is never missing or wrong, only animated.
 */
export function Counter({
  value,
  duration = 1500,
  className = "",
  format = (n: number) => n.toLocaleString("en-US"),
}: {
  value: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    if (prefersReduced()) return;

    // Only animate when motion is enabled; start from 0 at mount.
    setShown(0);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || started.current) continue;
          started.current = true;
          io.disconnect();
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            // easeOutExpo keeps the last digits from crawling
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setShown(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(tick);
            else setShown(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {format(shown)}
    </span>
  );
}
