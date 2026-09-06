"use client";

import { useEffect, useId, useState } from "react";
import type { PublicClaim } from "@/data/types";
import { ClaimGradeMark, sourceGradeLabel } from "@/components/marks";

/**
 * The signature "pull the thread" interaction: an inline evidence marker
 * that expands a sourced, dated, caveated evidence card in place.
 * Works with keyboard, screen readers and reduced motion; content is
 * present in the DOM regardless of expansion state (aria-hidden toggled).
 */
export function EvidenceNote({
  claim,
  label,
  compact = false,
}: {
  claim: {
    id?: string;
    text?: string;
    grade: string;
    caveat?: string | null;
    sourceUrls?: string[];
    sourceGrades?: string[];
    retrievedAt?: string | null;
    entityName?: string;
  };
  /** Short chip label, e.g. "reported": defaults from grade. */
  label?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const chipLabel = label ?? (claim.grade === "C3" ? "company reported" : claim.grade === "C4" ? "our analysis" : claim.grade);

  return (
    <span className={compact ? "inline-block" : "block"}>
      <button
        type="button"
        className="thread-mark"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        title="Open the evidence for this statement"
      >
        <span aria-hidden="true">⌁ </span>
        {chipLabel}
      </button>
      <span
        id={panelId}
        role="region"
        aria-label="Evidence for this statement"
        className={`${open ? "block" : "hidden"} mt-2 max-w-xl rounded-sm border border-line bg-paper-raised p-4 text-left shadow-sm on-dark:border-dark-line on-dark:bg-dark-2`}
      >
        <span className="block">
          <ClaimGradeMark grade={claim.grade} />
          {claim.entityName ? (
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft on-dark:text-[#a8a294]">
              {claim.entityName}
            </span>
          ) : null}
        </span>
        {claim.text ? (
          <span className="mt-2 block text-sm leading-relaxed text-ink-2 on-dark:text-[#d9d4c7]">
            “{claim.text}”
          </span>
        ) : null}
        {claim.caveat ? (
          <span className="mt-2 block border-l-2 border-mark/60 pl-3 text-xs leading-relaxed text-ink-soft on-dark:text-[#a8a294]">
            Caveat: {claim.caveat}
          </span>
        ) : null}
        <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft on-dark:text-[#a8a294]">
          {claim.sourceGrades && claim.sourceGrades.length > 0 ? (
            <span>source: {claim.sourceGrades.map(sourceGradeLabel).join(" · ")}</span>
          ) : null}
          {claim.retrievedAt ? <span>retrieved {claim.retrievedAt}</span> : null}
          {claim.id ? <span>{claim.id}</span> : null}
        </span>
        {claim.sourceUrls && claim.sourceUrls.length > 0 ? (
          <span className="mt-2 block space-y-1">
            {claim.sourceUrls.slice(0, 4).map((u) => (
              <a
                key={u}
                href={u}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link block truncate font-mono text-[11px] text-data on-dark:text-[#8fb8dd]"
              >
                {u}
              </a>
            ))}
          </span>
        ) : null}
        <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft on-dark:text-[#a8a294]">
          Company or customer reported unless graded otherwise · not a forecast · claim review open
        </span>
      </span>
    </span>
  );
}

/** Attach an evidence thread to a full claim record. */
export function ClaimThread({ claim, compact }: { claim: PublicClaim; compact?: boolean }) {
  return <EvidenceNote claim={claim} compact={compact} />;
}
