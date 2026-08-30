import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  entities,
  getEntity,
  getClaims,
  getRelationships,
  getLaunchProfile,
  getCasesForEntity,
  taxonomyLabel,
} from "@/data";
import {
  StatusMark,
  TierMark,
  RecordTypeMark,
  ReadinessNote,
  CaseGradeMark,
  Unknown,
  sourceGradeLabel,
} from "@/components/marks";
import { EvidenceNote } from "@/components/evidence/EvidenceNote";

export const dynamicParams = false;

export function generateStaticParams() {
  return entities.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const e = getEntity(id);
  if (!e) return { title: "Record not found" };
  return {
    title: `${e.name}: atlas profile`,
    description: `Qualified-core record for ${e.name}: identity, status, lifecycle placement, attributed claims, sources, review state and caveats. Evidence-qualified does not mean endorsed.`,
  };
}

const FLAG_LABELS: Record<string, string> = {
  claim_level_evidence_review_required: "Claim-level evidence review pending",
  category_not_assessed: "Category not yet assessed",
  maturity_not_assessed: "Maturity not yet assessed",
  status_evidence_date_missing: "Status event date not sourced",
  canonical_url_unresolved: "Canonical domain not yet verified",
  relevance_tier_conflict: "Legacy tier assertions conflict: no reviewed tier",
  lifecycle_unmapped: "Lifecycle not mapped to controlled codes",
  status_conflict: "Status conflict under review",
  founding_year_conflict: "Founding-year sources conflict",
  headquarters_country_conflict: "Headquarters sources conflict",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{children}</dd>
    </div>
  );
}

export default async function EntityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = getEntity(id);
  if (!e) notFound();

  const claims = getClaims(e.id);
  const rels = getRelationships(e.id);
  const launch = getLaunchProfile(e.id);
  const entityCases = getCasesForEntity(e.id);
  const withheldTotal = claims.pendingReview + claims.contextOnly;

  return (
    <div className="grid-paper">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          <Link href="/atlas" className="u-link">Atlas</Link>
          <span aria-hidden="true"> / </span>
          <span>{e.recordType.replace("_", " ")}</span>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-ink-2">{e.name}</span>
        </nav>

        {/* Header */}
        <header className="mt-8 border-b border-line pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <RecordTypeMark type={e.recordType} />
            <StatusMark status={e.status} conflict={e.statusConflict} />
            <TierMark tier={e.tier} conflict={e.tierConflict} />
            <ReadinessNote value={e.publicationReadiness} />
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {e.name}
          </h1>
          {e.aliases.length > 0 ? (
            <p className="mt-3 font-mono text-xs text-ink-soft">
              Also recorded as: {e.aliases.join(" · ")}
            </p>
          ) : null}
          <p className="mt-4 max-w-2xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ink-soft">
            {e.id} · last verified {e.lastVerified ?? "not recorded"}
          </p>
          {launch ? (
            <div className="mt-8 grid gap-6 border border-line bg-paper-raised p-6 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mark-deep">
                  Why it is in the launch set
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{launch.why}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  Launch profile {String(launch.order).padStart(2, "0")} · {launch.groupTitle} · {launch.context}
                </p>
              </div>
              <div className="border-l-2 border-mark/50 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                  Editorial boundary
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{launch.boundary}</p>
              </div>
            </div>
          ) : (
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
              This record is part of the qualified core but outside the 44-profile editorial launch
              set: a prioritization choice, not a quality judgment.
            </p>
          )}
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Left column */}
          <div>
            {/* Identity */}
            <section aria-labelledby="identity-h">
              <h2 id="identity-h" className="font-display text-2xl font-semibold tracking-tight">
                Identity &amp; status
              </h2>
              <dl className="mt-4">
                <Field label="Current status">
                  <StatusMark status={e.status} conflict={e.statusConflict} />
                  <span className="ml-2 text-xs text-ink-soft">
                    observed {e.statusObservedAt ?? "date not recorded"}
                  </span>
                  {e.operatingStatusLegacy && e.operatingStatusLegacy !== e.status ? (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                      legacy operating label: {e.operatingStatusLegacy}
                    </span>
                  ) : null}
                </Field>
                <Field label="Headquarters">
                  {e.hqCountry ?? <Unknown kind="not_verified" />}
                  {e.hqCountryConflict ? (
                    <span className="ml-2 font-mono text-[10px] uppercase text-mark-deep">sources conflict</span>
                  ) : null}
                </Field>
                <Field label="Operating regions (as recorded)">
                  {e.operatingRegions.length > 0 ? e.operatingRegions.join(" · ") : <Unknown kind="not_provided" />}
                  <p className="mt-1 text-xs text-ink-soft">
                    Headquarters, operating coverage, target market and verified deployment are
                    separate facts; this field is the recorded region signal only.
                  </p>
                </Field>
                <Field label="Founding year">
                  {e.foundingYear ?? <Unknown kind="not_verified" />}
                  {e.foundingYearNote && !e.foundingYear ? (
                    <p className="mt-1 text-xs text-ink-soft">{e.foundingYearNote}</p>
                  ) : null}
                </Field>
                <Field label="Canonical URL">
                  {e.canonicalUrl ? (
                    <a href={e.canonicalUrl} target="_blank" rel="noopener noreferrer" className="u-link font-mono text-xs text-data">
                      {e.canonicalUrl}
                    </a>
                  ) : (
                    <Unknown kind="not_verified" />
                  )}
                  <p className="mt-1 text-xs text-ink-soft">
                    URL state: {e.canonicalUrlStatus ?? "unresolved"}. A live domain is not proof of
                    identity or operation.
                  </p>
                </Field>
                <Field label="Record type basis">
                  {e.recordTypeBasis ?? <Unknown kind="not_provided" />}
                </Field>
              </dl>
            </section>

            {/* Classification */}
            <section aria-labelledby="class-h" className="mt-12">
              <h2 id="class-h" className="font-display text-2xl font-semibold tracking-tight">
                Lifecycle &amp; classification
              </h2>
              <dl className="mt-4">
                <Field label="Lifecycle domains">
                  {e.lifecycleCodes.length > 0 ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {e.lifecycleCodes.map((c) => (
                        <li key={c}>
                          <Link
                            href={`/atlas?lifecycle=${c}`}
                            className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-2 py-1 font-mono text-[11px] text-ink-2 hover:border-mark hover:text-mark-deep"
                            title={taxonomyLabel(c)}
                          >
                            {c}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Unknown kind="not_assessed" />
                  )}
                  <p className="mt-1 text-xs text-ink-soft">
                    An organization may touch several domains; mapping method:{" "}
                    {e.lifecycleMappingMethods.length > 0 ? e.lifecycleMappingMethods.join(", ") : "not recorded"}.
                    {e.lifecycleUnmappedLabels.length > 0
                      ? " Some legacy labels remain unmapped and reviewable."
                      : ""}
                  </p>
                </Field>
                <Field label="Category labels">
                  {e.categoryLabels.length > 0 ? e.categoryLabels.join(" · ") : <Unknown kind="not_assessed" />}
                </Field>
                <Field label="Business model signals">
                  {e.businessModels.length > 0 ? e.businessModels.join(" · ") : <Unknown kind="not_assessed" />}
                </Field>
                <Field label="Ecosystem / cohort memberships">
                  {e.ecosystemMemberships.length > 0 ? (
                    <>
                      {e.ecosystemMemberships.join(" · ")}
                      <p className="mt-1 text-xs text-ink-soft">
                        Membership is a discovery signal: not deployment, traction, security or
                        outcome evidence.
                      </p>
                    </>
                  ) : (
                    <Unknown kind="not_provided" />
                  )}
                </Field>
              </dl>
            </section>

            {/* Claims */}
            <section aria-labelledby="claims-h" className="mt-12">
              <h2 id="claims-h" className="font-display text-2xl font-semibold tracking-tight">
                Claims on record
              </h2>
              {claims.claims.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {claims.claims.map((c) => (
                    <li key={c.id} className="border border-line bg-paper-raised p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                        {c.field.replace(/_/g, " ")}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-2">“{c.text}”</p>
                      {c.caveat ? (
                        <p className="mt-2 border-l-2 border-mark/50 pl-3 text-xs leading-relaxed text-ink-soft">
                          {c.caveat}
                        </p>
                      ) : null}
                      <div className="mt-3">
                        <EvidenceNote claim={c} compact />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 border border-dashed border-line-strong bg-paper-raised p-5 text-sm text-ink-soft">
                  No claims are currently cleared for attributed public display on this record.
                </p>
              )}
              {withheldTotal > 0 ? (
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                  + {withheldTotal} further claim{withheldTotal === 1 ? "" : "s"} withheld pending
                  claim-level review or graded as unverified context
                </p>
              ) : null}
              <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                Attributed claims are company/customer/partner-reported unless graded otherwise. They
                are not independently verified and are never JCX forecasts.
              </p>
            </section>
          </div>

          {/* Right column */}
          <div>
            {/* Maturity */}
            <section aria-labelledby="maturity-h" className="border border-line bg-paper-raised p-6">
              <h2 id="maturity-h" className="font-display text-xl font-semibold tracking-tight">
                Maturity &amp; readiness
              </h2>
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  Market readiness level
                </p>
                {e.mrl ? (
                  <p className="data mt-1 text-2xl">MRL {e.mrl}</p>
                ) : (
                  <p className="mt-1">
                    <Unknown kind="not_assessed" />
                  </p>
                )}
                {e.mrlNote ? <p className="mt-2 text-xs leading-relaxed text-ink-soft">{e.mrlNote}</p> : null}
              </div>
              <div className="mt-4 border-t border-line pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  Maturity band (provisional)
                </p>
                <p className="mt-1 font-mono text-sm text-ink-2">
                  {e.maturityBand && e.maturityBand !== "not_assessed" ? e.maturityBand : "not assessed"}
                </p>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                Maturity is never inferred from funding, company scale, directory status or interface
                quality.
              </p>
            </section>

            {/* Cases */}
            <section aria-labelledby="cases-h" className="mt-8 border border-line bg-paper-raised p-6">
              <h2 id="cases-h" className="font-display text-xl font-semibold tracking-tight">
                Case-library entries naming this record
              </h2>
              {entityCases.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {entityCases.map((c) => (
                    <li key={c.id} className="border-t border-line pt-4 first:border-0 first:pt-0">
                      <div className="flex items-center justify-between gap-2">
                        <Link href={`/evidence#${c.id}`} className="u-link font-mono text-[11px] tracking-wide text-ink-2">
                          {c.id}
                        </Link>
                        <CaseGradeMark grade={c.grade} />
                      </div>
                      <p className="mt-2 text-sm text-ink-2">
                        {c.organization} × {c.vendor}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                        Reported: {c.measuredOutcome ?? "not provided"}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-ink-soft">
                  No quantified case in the current library names this record. Absence of a case is
                  not evidence of absence of outcomes.
                </p>
              )}
            </section>

            {/* Relationships */}
            <section aria-labelledby="rels-h" className="mt-8 border border-line bg-paper-raised p-6">
              <h2 id="rels-h" className="font-display text-xl font-semibold tracking-tight">
                Relationships
              </h2>
              {rels.length > 0 ? (
                <ul className="mt-4 space-y-4">
                  {rels.map((r) => (
                    <li key={r.id} className="border-t border-line pt-4 first:border-0 first:pt-0">
                      <p className="text-sm text-ink-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                          {r.type.replace(/_/g, " ")} →
                        </span>{" "}
                        {r.objectEntityId ? (
                          <Link href={`/atlas/${r.objectEntityId}`} className="u-link font-medium">
                            {r.objectName}
                          </Link>
                        ) : (
                          <span className="font-medium">{r.objectName ?? "unresolved object"}</span>
                        )}
                      </p>
                      {r.note ? <p className="mt-1 text-xs leading-relaxed text-ink-soft">{r.note}</p> : null}
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">
                        {r.status.replace(/_/g, " ")} · retrieved {r.retrievedAt ?? "undated"}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-ink-soft">
                  No reviewed relationships are recorded for this entity in the qualified core.
                </p>
              )}
              <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                A reported or directory-observed relationship is not deployment or outcome proof.
              </p>
            </section>

            {/* Sources */}
            <section aria-labelledby="src-h" className="mt-8 border border-line bg-paper-raised p-6">
              <h2 id="src-h" className="font-display text-xl font-semibold tracking-tight">
                Sources ({e.sourceCount})
              </h2>
              {e.sourceUrls.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {e.sourceUrls.map((u) => (
                    <li key={u}>
                      <a
                        href={u}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="u-link block break-all font-mono text-[11px] leading-relaxed text-data"
                      >
                        {u}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-ink-soft">No source URLs recorded.</p>
              )}
              {e.sourceGradesProvisional.length > 0 ? (
                <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                  Provisional source quality:{" "}
                  {e.sourceGradesProvisional.map(sourceGradeLabel).join(" · ")}: domain-level,
                  claim-level review required.
                </p>
              ) : null}
            </section>

            {/* Review state */}
            <section aria-labelledby="review-h" className="mt-8 border border-dashed border-line-strong bg-paper-deep/40 p-6">
              <h2 id="review-h" className="font-display text-xl font-semibold tracking-tight">
                Editorial state
              </h2>
              <ul className="mt-4 space-y-2">
                {e.reviewFlags.map((f) => (
                  <li key={f} className="flex gap-2 text-xs leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="text-mark">◌</span>
                    {FLAG_LABELS[f] ?? f.replace(/_/g, " ")}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                Spotted a factual issue? Corrections are handled through the review workflow described
                in the <Link href="/methodology" className="u-link">methodology</Link>: a correction
                creates a new review event; it never silently overwrites the record.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
