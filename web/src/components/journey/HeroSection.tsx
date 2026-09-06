"use client";

import { useEffect, useRef, useState } from "react";

/** Floor plate heights, drawn bottom-up. */
const FLOORS = [438, 406, 374, 342, 310, 278, 246, 214, 182, 150];

/**
 * The section drawing: land strata, a tower in section, a crane, and the data
 * layer wrapping the top. It draws itself once on arrival, the way a section
 * gets laid down on paper: ground first, then structure, then the data layer.
 *
 * Decorative, so it is hidden from assistive technology. Under reduced motion
 * the finished drawing appears immediately with no stroke animation.
 */
export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    // Next frame, so the transition has an initial state to move away from.
    const id = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const draw = (len: number, delay: number) =>
    ({
      "--len": len,
      "--reveal-delay": `${delay}ms`,
    }) as React.CSSProperties;

  return (
    <div ref={ref} className={`relative hidden lg:block ${armed ? "is-seen" : ""}`}>
      <figure aria-hidden="true" className="relative mx-auto w-full max-w-[400px]">
        <svg
          viewBox="0 42 360 494"
          className="block h-auto w-full"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="1" className="text-ink">
            {/* Ground line and land strata */}
            <path className="draw-path" style={draw(336, 0)} d="M12 470 H348" strokeWidth="1.5" />
            <path className="draw-path" style={draw(292, 66)} d="M34 488 H326" opacity="0.55" />
            <path className="draw-path" style={draw(236, 110)} d="M62 504 H298" opacity="0.36" />
            <path className="draw-path" style={draw(180, 148)} d="M90 519 H270" opacity="0.2" />
            <path className="draw-path" style={draw(52, 181)} d="M12 470 L48 432" opacity="0.4" />
            <path className="draw-path" style={draw(52, 181)} d="M348 470 L312 432" opacity="0.4" />

            {/* Tower shell */}
            <rect
              className="draw-path"
              style={draw(940, 209)}
              x="120"
              y="120"
              width="120"
              height="350"
              strokeWidth="1.5"
            />

            {/* Floor plates, rising */}
            {FLOORS.map((y, i) => (
              <line
                key={y}
                className="draw-path"
                style={draw(120, 430 + i * 34)}
                x1="120"
                y1={y}
                x2="240"
                y2={y}
                opacity="0.45"
              />
            ))}

            {/* Annex */}
            <rect
              className="draw-path"
              style={draw(456, 495)}
              x="240"
              y="300"
              width="58"
              height="170"
              opacity="0.6"
            />

            {/* Crane */}
            <line
              className="draw-path"
              style={draw(380, 632)}
              x1="306"
              y1="470"
              x2="306"
              y2="90"
              strokeWidth="1.5"
            />
            <line className="draw-path" style={draw(68, 781)} x1="272" y1="90" x2="340" y2="90" />
            <line
              className="draw-path"
              style={draw(38, 836)}
              x1="306"
              y1="90"
              x2="286"
              y2="122"
              opacity="0.55"
            />
            <line
              className="draw-path"
              style={draw(44, 836)}
              x1="340"
              y1="90"
              x2="340"
              y2="134"
              opacity="0.75"
            />
            <rect
              className="draw-path"
              style={draw(50, 880)}
              x="333"
              y="134"
              width="14"
              height="11"
              opacity="0.75"
            />

            {/* Dimension line: the life cycle runs the height of the building */}
            <g
              className="text-ink-soft transition-opacity duration-700"
              style={{ opacity: armed ? 0.55 : 0, transitionDelay: "880ms" }}
            >
              <line x1="100" y1="120" x2="100" y2="470" />
              <line x1="94" y1="120" x2="106" y2="120" />
              <line x1="94" y1="470" x2="106" y2="470" />
              <text
                x="86"
                y="300"
                textAnchor="middle"
                className="fill-current font-mono"
                fontSize="9"
                letterSpacing="2"
                stroke="none"
                transform="rotate(-90 86 300)"
              >
                LIFE CYCLE
              </text>
            </g>

            {/* Data and trust layer, the last thing to arrive */}
            <g
              className="text-data transition-opacity duration-1000"
              style={{ opacity: armed ? 1 : 0, transitionDelay: "1020ms" }}
            >
              <ellipse cx="180" cy="96" rx="98" ry="27" strokeDasharray="4 6" />
              <text
                x="180"
                y="62"
                textAnchor="middle"
                className="fill-current font-mono"
                fontSize="9"
                letterSpacing="2"
                stroke="none"
              >
                DATA &amp; TRUST
              </text>
            </g>
          </g>
        </svg>
      </figure>
    </div>
  );
}
