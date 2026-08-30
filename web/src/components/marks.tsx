/**
 * The trust grammar of the atlas: every state, grade and unknown is rendered
 * through these marks so that evidence states can never be confused.
 * Color is always paired with a text label: never the sole carrier.
 */

const base =
  "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] leading-none whitespace-nowrap";

/* ::: Operating status ::: */
const STATUS: Record<string, { label: string; cls: string; title: string }> = {
  active: { label: "Active", cls: "border-pass/50 text-pass", title: "Operating, as observed" },
  "active-public": { label: "Active · listed", cls: "border-pass/50 text-pass", title: "Operating; publicly listed" },
  "cohort-selected": { label: "Cohort-selected", cls: "border-caution/60 text-caution", title: "Selected for a cohort; not deployment evidence" },
  pilot: { label: "Pilot", cls: "border-caution/60 text-caution border-dashed", title: "Pilot stage, as reported" },
  acquired: { label: "Acquired", cls: "border-data/50 text-data", title: "Acquired; see lineage" },
  "acquired-active": { label: "Acquired · active", cls: "border-data/50 text-data", title: "Acquired; product continues" },
  pivoted: { label: "Pivoted", cls: "border-data/50 text-data", title: "Changed model; historical identity preserved" },
  restructured: { label: "Restructured", cls: "border-data/50 text-data", title: "Restructuring documented" },
  inactive: { label: "Inactive", cls: "border-ink-soft/50 text-ink-soft", title: "No longer operating in prior form" },
  stealth_unclear: { label: "Unclear", cls: "border-ink-soft/50 text-ink-soft hatch", title: "Status unclear from current sources" },
  unknown: { label: "Not yet verified", cls: "border-ink-soft/50 text-ink-soft hatch", title: "Status not yet verified" },
};

export function StatusMark({ status, conflict }: { status: string; conflict?: boolean }) {
  const s = STATUS[status] ?? STATUS.unknown;
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

/* ::: Record type ::: */
const RECORD_TYPE: Record<string, { label: string; cls: string }> = {
  organization: { label: "Organization", cls: "border-ink-2/40 text-ink-2" },
  product_offering: { label: "Product", cls: "border-data/50 text-data" },
  program_ecosystem: { label: "Program / ecosystem", cls: "border-caution/60 text-caution" },
  project: { label: "Project", cls: "border-ink-soft/50 text-ink-soft" },
};

export function RecordTypeMark({ type }: { type: string }) {
  const t = RECORD_TYPE[type] ?? { label: type, cls: "border-ink-soft/50 text-ink-soft" };
  return <span className={`${base} ${t.cls}`}>{t.label}</span>;
}

/* ::: Relevance tier (relevance to a decision: not a quality rank) ::: */
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

/* ::: Claim attribution grade (C1–C5) ::: */
const CLAIM_GRADE: Record<string, { label: string; cls: string; title: string }> = {
  C1: { label: "C1 · verified", cls: "border-pass/60 text-pass", title: "Verified fact: supported by an S1 source or two independent sources" },
  C2: { label: "C2 · corroborated", cls: "border-pass/60 text-pass", title: "Corroborated fact with a material limitation" },
  C3: { label: "C3 · reported", cls: "border-caution/60 text-caution", title: "Clearly attributed company/customer/partner claim: not independently verified" },
  C4: { label: "C4 · atlas interpretation", cls: "border-data/50 text-data", title: "Atlas analyst interpretation of cited facts" },
  C5: { label: "C5 · unverified signal", cls: "border-ink-soft/50 text-ink-soft hatch", title: "Unverified signal: discovery context only" },
};

export function ClaimGradeMark({ grade, className = "" }: { grade: string; className?: string }) {
  const g = CLAIM_GRADE[grade] ?? { label: grade, cls: "border-ink-soft/50 text-ink-soft", title: "Provisional grade" };
  return (
    <span className={`${base} ${g.cls} ${className}`} title={g.title}>
      {g.label}
    </span>
  );
}

/* ::: Source quality grade (S1–S5) ::: */
const SOURCE_GRADE: Record<string, string> = {
  S1: "S1 · authoritative",
  S2: "S2 · first-party",
  S3: "S3 · independent research",
  S4: "S4 · directory",
  S5: "S5 · discovery signal",
};
export const sourceGradeLabel = (g: string) => SOURCE_GRADE[g] ?? g;

/* ::: Case evidence grade (legacy case-library convention, not mapped to S/C) ::: */
const CASE_GRADE: Record<string, { label: string; cls: string; title: string }> = {
  A1: { label: "A1 · filing/accounting", cls: "border-pass/60 text-pass", title: "Filing or accounting record: establishes the event/figure; not proof that technology caused it" },
  B2: { label: "B2 · stronger customer evidence", cls: "border-pass/50 text-pass", title: "Customer/vendor evidence with comparatively stronger framing; review scope and baseline" },
  B3: { label: "B3 · vendor/customer evidence", cls: "border-caution/60 text-caution", title: "Customer/vendor-reported evidence with a missing control, denominator, baseline or independent audit" },
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

/* ::: Typed unknowns: unknown is a meaningful state ::: */
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

/* ::: Publication / review state ::: */
const READINESS: Record<string, { label: string; title: string }> = {
  qualified_profile_requires_claim_review: {
    label: "claim review pending",
    title: "Identity integrated; claim-level editorial review outstanding before full publication",
  },
  profile_requires_editorial_review: {
    label: "editorial review pending",
    title: "Profile-level editorial review outstanding",
  },
  watchlist_profile: {
    label: "watchlist",
    title: "Early or weakly evidenced signal; uncertainty is explicit",
  },
  discovery_program: {
    label: "program record",
    title: "Program/ecosystem discovery record: not a vendor profile",
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

/* ::: Evidence stage (discovery frontier) ::: */
export function StageMark({ stage, needsReview }: { stage: string; needsReview?: boolean }) {
  if (stage === "qualified_core") {
    return (
      <span className={`${base} border-pass/50 text-pass`} title="Promoted to the evidence-qualified core; individual claims still require review">
        qualified core
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`${base} border-caution/60 text-caution`} title="Discovery-layer identity: not a proven company, deployment or outcome">
        discovery only
      </span>
      {needsReview ? (
        <span className={`${base} border-mark/60 text-mark-deep`} title="Identity or relationship under review: kept deliberately separate">
          identity review
        </span>
      ) : null}
    </span>
  );
}
