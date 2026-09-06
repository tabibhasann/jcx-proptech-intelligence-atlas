/**
 * The trust grammar of the atlas: every state, grade and unknown is rendered
 * through these marks so that evidence states can never be confused.
 * Color is always paired with a text label, never the sole carrier.
 */

const base =
  "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] leading-none whitespace-nowrap";

/* Operating status: plain words, corpus value in the tooltip */
const STATUS: Record<string, { label: string; cls: string; title: string }> = {
  active: { label: "Operating", cls: "border-pass/50 text-pass", title: "Operating, as observed (corpus status: active)" },
  "active-public": { label: "Operating · listed", cls: "border-pass/50 text-pass", title: "Operating; publicly listed (corpus status: active-public)" },
  "cohort-selected": { label: "Cohort selected", cls: "border-caution/60 text-caution", title: "Selected for a cohort; not deployment evidence (corpus status: cohort-selected)" },
  pilot: { label: "Pilot stage", cls: "border-caution/60 text-caution border-dashed", title: "Pilot stage, as reported (corpus status: pilot)" },
  acquired: { label: "Acquired", cls: "border-data/50 text-data", title: "Acquired; see lineage (corpus status: acquired)" },
  "acquired-active": { label: "Acquired · continues", cls: "border-data/50 text-data", title: "Acquired; product continues (corpus status: acquired-active)" },
  pivoted: { label: "Changed model", cls: "border-data/50 text-data", title: "Changed model; historical identity preserved (corpus status: pivoted)" },
  restructured: { label: "Restructured", cls: "border-data/50 text-data", title: "Restructuring documented (corpus status: restructured)" },
  inactive: { label: "No longer operating", cls: "border-ink-soft/50 text-ink-soft", title: "No longer operating in prior form (corpus status: inactive)" },
  unclear: { label: "Unclear", cls: "border-ink-soft/50 text-ink-soft hatch", title: "Status unclear from current sources (corpus status: unclear)" },
  unknown: { label: "Not yet verified", cls: "border-ink-soft/50 text-ink-soft hatch", title: "Status not yet verified (corpus status: unknown)" },
};

export function StatusMark({ status, conflict }: { status: string; conflict?: boolean }) {
  const key = status === "stealth_unclear" ? "unclear" : status;
  const s = STATUS[key] ?? STATUS.unknown;
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`${base} ${s.cls}`} title={s.title}>
        {s.label}
      </span>
      {conflict ? (
        <span className={`${base} border-mark/60 text-mark-deep`} title="Sources disagree on status; see review note">
          conflict
        </span>
      ) : null}
    </span>
  );
}

/* Record type: plain words */
const RECORD_TYPE: Record<string, { label: string; cls: string }> = {
  organization: { label: "Company", cls: "border-ink-2/40 text-ink-2" },
  product_offering: { label: "Product", cls: "border-data/50 text-data" },
  program_ecosystem: { label: "Program", cls: "border-caution/60 text-caution" },
  project: { label: "Project", cls: "border-ink-soft/50 text-ink-soft" },
};

export function RecordTypeMark({ type }: { type: string }) {
  const t = RECORD_TYPE[type] ?? { label: type, cls: "border-ink-soft/50 text-ink-soft" };
  return <span className={`${base} ${t.cls}`}>{t.label}</span>;
}

/* Relevance tier (relevance to a decision, not a quality rank) */
const TIER: Record<string, { label: string; title: string }> = {
  A: { label: "A", title: "Core: directly relevant to a current decision. Relevance tier, not a quality rank." },
  B: { label: "B", title: "Strategic: important benchmark or near-term watch. Relevance tier, not a quality rank." },
  C: { label: "C", title: "Emerging: strong signal, limited maturity/evidence. Relevance tier, not a quality rank." },
  D: { label: "D", title: "Context: useful for completeness. Relevance tier, not a quality rank." },
  H: { label: "H", title: "Historical: acquisition, restructuring, failure or retired product with a material lesson." },
};

export function TierMark({ tier, conflict }: { tier: string | null; conflict?: boolean }) {
  if (conflict) {
    return (
      <span className={`${base} border-mark/60 text-mark-deep`} title="Sources disagree on the legacy tier; no reviewed tier assigned">
        tier · unresolved
      </span>
    );
  }
  if (!tier || !TIER[tier]) {
    return (
      <span className={`${base} border-ink-soft/40 text-ink-soft hatch`} title="Relevance tier not yet reviewed">
        tier · unreviewed
      </span>
    );
  }
  const t = TIER[tier];
  return (
    <span className={`${base} border-ink-2/40 text-ink-2`} title={t.title}>
      tier {t.label}
    </span>
  );
}

/* Claim grades: who said it, in plain words first */
const CLAIM_GRADE: Record<string, { label: string; cls: string; title: string }> = {
  C1: { label: "Verified", cls: "border-pass/60 text-pass", title: "C1 verified fact: S1 source or two independent sources" },
  C2: { label: "Corroborated", cls: "border-pass/60 text-pass", title: "C2 corroborated fact with a material limitation" },
  C3: { label: "Company reported", cls: "border-caution/60 text-caution", title: "C3 company, customer, or partner claim, not independently verified" },
  C4: { label: "Our analysis", cls: "border-data/50 text-data", title: "C4 analyst interpretation of cited facts" },
  C5: { label: "Unverified lead", cls: "border-ink-soft/50 text-ink-soft hatch", title: "C5 unverified signal: discovery context only" },
};

export function ClaimGradeMark({ grade, className = "" }: { grade: string; className?: string }) {
  const g = CLAIM_GRADE[grade] ?? { label: grade, cls: "border-ink-soft/50 text-ink-soft", title: "Provisional grade" };
  return (
    <span className={`${base} ${g.cls} ${className}`} title={g.title}>
      {g.label}
    </span>
  );
}

/* Source grades: plain words first */
const SOURCE_GRADE: Record<string, string> = {
  S1: "Filing or official record",
  S2: "Company material",
  S3: "Independent research",
  S4: "Directory",
  S5: "Weak signal",
};
export const sourceGradeLabel = (g: string) => SOURCE_GRADE[g] ?? g;

/* Case grades: who reported it, in plain words (legacy A1/B2/B3 kept in tooltip) */
const CASE_GRADE: Record<string, { label: string; cls: string; title: string }> = {
  A1: { label: "Filing grade", cls: "border-pass/60 text-pass", title: "A1 filing or accounting record: establishes the event; not proof technology caused it" },
  B2: { label: "Stronger customer evidence", cls: "border-pass/50 text-pass", title: "B2 customer or vendor evidence with comparatively stronger framing; check scope and baseline" },
  B3: { label: "Vendor story", cls: "border-caution/60 text-caution", title: "B3 customer or vendor reported story with a missing control, denominator, baseline, or independent audit" },
};
export function CaseGradeMark({ grade }: { grade: string | null }) {
  const found = grade ? CASE_GRADE[grade] : undefined;
  const g = found ?? { label: grade ?? "ungraded", cls: "border-ink-soft/50 text-ink-soft", title: "Evidence grade under the case-library convention" };
  return (
    <span className={`${base} ${g.cls}`} title={g.title}>
      {g.label}
    </span>
  );
}

/* Typed unknowns: unknown is a meaningful state */
const UNKNOWN_LABELS: Record<string, string> = {
  not_verified: "not yet verified",
  not_provided: "not provided",
  not_assessed: "not yet assessed",
  under_review: "under editorial review",
  not_applicable: "not applicable",
  withheld: "withheld pending review",
};
export function Unknown({ kind = "not_verified", className = "" }: { kind?: keyof typeof UNKNOWN_LABELS; className?: string }) {
  return (
    <span className={`font-mono text-[11px] tracking-wide text-ink-soft ${className}`}>
      <span aria-hidden="true">◌ </span>
      {UNKNOWN_LABELS[kind]}
    </span>
  );
}

/* Publication and review state: plain words */
const READINESS: Record<string, { label: string; title: string }> = {
  qualified_profile_requires_claim_review: {
    label: "Claims under review",
    title: "Identity integrated; claim-level review still open before full publication",
  },
  profile_requires_editorial_review: {
    label: "Profile under review",
    title: "Profile-level editorial review still open",
  },
  watchlist_profile: {
    label: "Early signal",
    title: "Early or weakly evidenced signal; uncertainty is explicit",
  },
  discovery_program: {
    label: "Program record",
    title: "Program discovery record, not a vendor profile",
  },
};
export function ReadinessNote({ value }: { value: string | null }) {
  const found = value ? READINESS[value] : undefined;
  const r = found ?? { label: value ?? "unreviewed", title: "Review state" };
  return (
    <span className={`${base} border-ink-soft/40 text-ink-soft`} title={r.title}>
      {r.label}
    </span>
  );
}

/* Standing of a wide search lead: plain words */
export function StageMark({ stage, needsReview }: { stage: string; needsReview?: boolean }) {
  if (stage === "qualified_core") {
    return (
      <span className={`${base} border-pass/50 text-pass`} title="Qualified for analysis; individual claims still under review">
        Qualified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`${base} border-caution/60 text-caution`} title="Research lead only, not a proven company, deployment, or outcome">
        Lead only
      </span>
      {needsReview ? (
        <span className={`${base} border-mark/60 text-mark-deep`} title="Identity check open: kept deliberately separate">
          Identity check
        </span>
      ) : null}
    </span>
  );
}
