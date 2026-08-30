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
      document.documentElement.classList.toggle("js-motion", !mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return null;
}
