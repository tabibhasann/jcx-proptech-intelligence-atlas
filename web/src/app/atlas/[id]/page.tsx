import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  entities,
  getEntity,
  getClaims,
  getRelationships,
  getCasesForEntity,
  taxonomy,
  taxonomyLabel,
} from "@/data";
import { getSynopsis } from "@/content/featured";
import {
  StatusMark,
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
    title: `${e.name}: what it does, how it works, what is known`,
    description: `Plain language profile of ${e.name}: what it does, how it works, the evidence, why it matters, and what remains unknown. Research cut-off 30 August 2026.`,
  };
}

/**
 * Profile page, rewritten around the reader question "what does this company
 * do". The synopsis (curated, reviewed) opens. The audit trail (identity,
 * claims, sources, review state) follows, unchanged in rigor.
 */
export default async function EntityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = getEntity(id);
  if (!e) notFound();

  const syn = getSynopsis(e.id);
  const claims = getClaims(e.id);
  const rels = getRelationships(e.id);
  const entityCases = getCasesForEntity(e.id);
  const withheldTotal = claims.pendingReview + claims.contextOnly;
  const taxByCode = new Map(taxonomy.map((t) => [t.code, t.label]));

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          <Link href="/atlas" className="u-link">Companies</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-ink-2">{e.name}</span>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <RecordTypeMark type={e.recordType} />
            <StatusMark status={e.status} conflict={e.statusConflict} />
            <ReadinessNote value={e.publicationReadiness} />
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {e.name}
          </h1>
          {e.aliases.length > 0 ? (
            <p className="mt-3 font-mono text-xs text-ink-soft">Also recorded as: {e.aliases.join(" · ")}</p>
          ) : null}
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {e.hqCountry ? `Based in ${e.hqCountry}. ` : "Headquarters not yet verified. "}
            {e.lifecycleCodes.length > 0
              ? `Works across: ${e.lifecycleCodes.map((c) => taxByCode.get(c) ?? c).join("; ")}.`
              : "Lifecycle placement not yet assessed."}
          </p>
        </header>

        {syn ? (
          <section aria-labelledby="answer-h" className="mt-8 border border-line bg-paper-raised p-6 sm:p-8">
            <h2 id="answer-h" className="font-mono text-[11px] uppercase tracking-[0.18em] text-mark-deep">
              What this record means, in plain language
            </h2>
            <dl className="mt-5 space-y-5">
              <div>
                <dt className="font-display text-lg font-semibold">What it does</dt>
                <dd className="mt-1 max-w-2xl text-[15px] leading-relaxed text-ink-2">{syn.what}</dd>
              </div>
              <div>
                <dt className="font-display text-lg font-semibold">How it works</dt>
                <dd className="mt-1 max-w-2xl text-[15px] leading-relaxed text-ink-2">{syn.how}</dd>
              </div>
              <div>
                <dt className="font-display text-lg font-semibold">What evidence exists</dt>
                <dd className="mt-1 max-w-2xl text-[15px] leading-relaxed text-ink-2">{syn.evidence}</dd>
                <dd className="mt-2">
                  <Link href={syn.evidenceHref} className="u-link font-mono text-[11px] uppercase tracking-[0.12em] text-data">
                    {syn.evidenceLabel}: open it
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-display text-lg font-semibold">Why it matters here</dt>
                <dd className="mt-1 max-w-2xl text-[15px] leading-relaxed text-ink-2">{syn.whyHere}</dd>
              </div>
              <div className="border-l-2 border-mark/50 pl-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mark-deep">What remains unknown</dt>
                <dd className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">{syn.unknown}</dd>
              </div>
            </dl>
          </section>
        ) : (
          <section aria-labelledby="answer-h" className="mt-8 border border-dashed border-line-strong bg-paper-raised p-6 sm:p-8">
            <h2 id="answer-h" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Research note, not a finished company review
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-2">
              {e.description ?? "No reviewed description is available yet."}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">The description above is a short research label. A reviewed plain-language summary is still missing. Use the sources below to investigate, or <Link href="/capabilities" className="u-link">open the curated company comparison</Link> for a complete introduction.</p>
          </section>
        )}

        <section aria-labelledby="cases-h" className="mt-10">
          <h2 id="cases-h" className="font-display text-2xl font-semibold tracking-tight">
            Measured outcomes naming this record
          </h2>
          {entityCases.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {entityCases.map((c) => (
                <li key={c.id} className="border border-line bg-paper-raised p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link href={`/evidence#${c.id}`} className="u-link font-mono text-[11px] tracking-wide text-ink-2">
                      {c.id}: open the full packet
                    </Link>
                    <CaseGradeMark grade={c.grade} />
                  </div>
                  <p className="mt-2 text-sm text-ink-2">{c.organization} × {c.vendor}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">
                    <span className="font-medium">Reported: </span>
                    {c.measuredOutcome ?? "not provided"}
                  </p>
                  {c.causalCaveat ? (
                    <p className="mt-2 border-l-2 border-mark/50 pl-3 text-xs leading-relaxed text-ink-soft">{c.causalCaveat}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 border border-dashed border-line-strong bg-paper-raised p-5 text-sm text-ink-soft">
              We have not linked a measured outcome to this record. That means the evidence here is incomplete, not that the company has no results.
            </p>
          )}
        </section>

        <section aria-labelledby="claims-h" className="mt-10">
          <h2 id="claims-h" className="font-display text-2xl font-semibold tracking-tight">
            Attributed claims on record
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Company, customer, or partner reported unless graded otherwise. Never independently
            verified here, never a forecast.
          </p>
          {claims.claims.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {claims.claims.map((c) => (
                <li key={c.id} className="border border-line bg-paper-raised p-5">
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">“{c.text}”</p>
                  {c.caveat ? (
                    <p className="mt-2 border-l-2 border-mark/50 pl-3 text-xs leading-relaxed text-ink-soft">{c.caveat}</p>
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
              + {withheldTotal} further claim{withheldTotal === 1 ? "" : "s"} withheld pending claim-level review
            </p>
          ) : null}
        </section>

        <section aria-labelledby="record-h" className="mt-12 border-t border-line pt-8">
          <h2 id="record-h" className="font-display text-2xl font-semibold tracking-tight">The full record</h2>
          <dl className="mt-4 grid gap-x-10 sm:grid-cols-2">
            <Field label="Status">
              <StatusMark status={e.status} conflict={e.statusConflict} />
              <span className="ml-2 text-xs text-ink-soft">observed {e.statusObservedAt ?? "date not recorded"}</span>
            </Field>
            <Field label="Headquarters">{e.hqCountry ?? <Unknown kind="not_verified" />}</Field>
            <Field label="Operating regions (as recorded)">
              {e.operatingRegions.length > 0 ? e.operatingRegions.join(" · ") : <Unknown kind="not_provided" />}
            </Field>
            <Field label="Lifecycle">
              {e.lifecycleCodes.length > 0 ? (
                <span className="flex flex-wrap gap-1.5">
                  {e.lifecycleCodes.map((c) => (
                    <Link
                      key={c}
                      href={`/atlas?lifecycle=${c}`}
                      className="rounded-sm border border-line-strong px-2 py-1 font-mono text-[11px] text-ink-2 hover:border-mark hover:text-mark-deep"
                      title={taxonomyLabel(c)}
                    >
                      {c}
                    </Link>
                  ))}
                </span>
              ) : (
                <Unknown kind="not_assessed" />
              )}
            </Field>
            <Field label="Category">{e.categoryLabels.length > 0 ? e.categoryLabels.join(" · ") : <Unknown kind="not_assessed" />}</Field>
            <Field label="Business model">{e.businessModels.length > 0 ? e.businessModels.join(" · ") : <Unknown kind="not_assessed" />}</Field>
            <Field label="Maturity">
              {e.mrl ? `MRL ${e.mrl}` : "not assessed"}
              {e.maturityBand && e.maturityBand !== "not_assessed" ? ` · band ${e.maturityBand}` : ""}
            </Field>
            <Field label="Stable ID">{e.id} · last verified {e.lastVerified ?? "not recorded"}</Field>
          </dl>

          <h3 className="mt-8 font-display text-xl font-semibold">Relationships</h3>
          {rels.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {rels.map((r) => (
                <li key={r.id} className="text-sm text-ink-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">{r.type.replace(/_/g, " ")} → </span>
                  {r.objectEntityId ? (
                    <Link href={`/atlas/${r.objectEntityId}`} className="u-link font-medium">{r.objectName}</Link>
                  ) : (
                    <span className="font-medium">{r.objectName ?? "unresolved object"}</span>
                  )}
                  {r.note ? <span className="block text-xs text-ink-soft">{r.note}</span> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">No reviewed relationships recorded.</p>
          )}

          <h3 className="mt-8 font-display text-xl font-semibold">Sources ({e.sourceCount})</h3>
          {e.sourceUrls.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {e.sourceUrls.map((u) => (
                <li key={u}>
                  <a href={u} target="_blank" rel="noopener noreferrer" className="u-link block break-all font-mono text-[11px] leading-relaxed text-data">
                    Open source record ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">No source URLs recorded.</p>
          )}
          {e.sourceGradesProvisional.length > 0 ? (
            <p className="mt-3 text-xs text-ink-soft">
              Provisional source quality: {e.sourceGradesProvisional.map(sourceGradeLabel).join(" · ")} (domain level, claim review pending).
            </p>
          ) : null}
          <p className="mt-6 border border-dashed border-line-strong bg-paper-deep/40 p-4 text-xs leading-relaxed text-ink-soft">
            Spotted an issue? Note the stable ID above and follow the correction path on the{" "}
            <Link href="/methodology" className="u-link">method page</Link>. Corrections create a new
            review event; the record is never silently overwritten.
          </p>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{children}</dd>
    </div>
  );
}
