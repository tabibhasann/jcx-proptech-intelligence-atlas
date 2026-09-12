"use client";

import { useEffect } from "react";

/**
 * Enables motion enhancement only when the user has not requested reduced
 * motion. Without JS or with reduced motion, all content is fully visible.
 * Animation is strictly an enhancement layer.
 */
export function MotionBootstrap() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const comfortable = document.documentElement.dataset.reading === "comfortable";
      document.documentElement.classList.toggle("js-motion", !mq.matches && !comfortable);
    };
    apply();
    mq.addEventListener("change", apply);
    window.addEventListener("propty-reading-change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("propty-reading-change", apply);
    };
  }, []);
  return null;
}
