"use client";

import { useEffect, useRef } from "react";

type Tag = "div" | "section" | "article" | "li" | "span" | "figure" | "aside" | "ol" | "ul";

/**
 * Scroll reveal. The resting state is fully visible; motion is layered on only
 * when html.js-motion is present (JS enabled and reduced motion not requested),
 * so a broken observer or a motion-sensitive visitor can never lose content.
 *
 * Adding `is-seen` also arms descendant `.draw-path` and `.grow-x` elements,
 * which lets a whole diagram animate from one observer.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
  once = true,
  threshold = 0.05,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms. */
  delay?: number;
  variant?: "rise" | "fade" | "scale";
  once?: boolean;
  threshold?: number;
  as?: Tag;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-seen");
            if (once) io.unobserve(e.target);
          } else if (!once) {
            e.target.classList.remove("is-seen");
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Headline reveal that slides each line up from behind its own baseline.
 * Pass discrete lines so the clip boxes match the intended line breaks.
 */
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  step = 90,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.querySelectorAll(".line-clip").forEach((n) => n.classList.add("is-seen"));
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`line-clip ${lineClassName}`}
          style={{ "--reveal-delay": `${i * step}ms` } as React.CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </span>
  );
}
