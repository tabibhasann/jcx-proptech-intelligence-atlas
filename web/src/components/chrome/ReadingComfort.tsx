"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "propty-reading-v1";

/** A visitor preference only. No health information is collected or inferred. */
export function ReadingComfort() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  const apply = (value: boolean) => {
    document.documentElement.dataset.reading = value ? "comfortable" : "standard";
    window.dispatchEvent(new Event("propty-reading-change"));
    setEnabled(value);
  };

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("reading");
    let value = requested === "comfortable";
    try {
      if (requested !== "comfortable" && requested !== "standard") {
        value = localStorage.getItem(STORAGE_KEY) === "comfortable";
      } else {
        localStorage.setItem(STORAGE_KEY, value ? "comfortable" : "standard");
      }
    } catch { /* The mode also works when browser storage is unavailable. */ }
    apply(value);
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) apply(event.newValue === "comfortable");
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const toggle = () => {
    const next = !enabled;
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, next ? "comfortable" : "standard"); } catch { /* Optional persistence. */ }
    // A visitor can turn off a shared easy-reading link without a reload undoing it.
    const url = new URL(window.location.href);
    if (url.searchParams.has("reading")) {
      url.searchParams.delete("reading");
      window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    }
  };

  return (
    <button
      type="button"
      className="reading-toggle"
      aria-pressed={enabled}
      disabled={!ready}
      onClick={toggle}
      title="Larger text, clearer contrast and reduced motion. Your preference is saved on this browser."
    >
      <span aria-hidden="true" className="reading-toggle-icon">Aa</span>
      <span>Easy reading<span className="reading-toggle-state">{enabled ? " · On" : ""}</span></span>
    </button>
  );
}
