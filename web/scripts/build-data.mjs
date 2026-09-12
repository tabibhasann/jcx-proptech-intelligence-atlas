#!/usr/bin/env node
/**
 * build-data.mjs — corpus → website data bridge.
 *
 * Reads the normalized JCX research corpus (../data/*.json), the editorial
 * launch selection (../research/website_launch_editorial_selection.md) and the
 * story manifest (../data/website_story_manifest.json), then emits a
 * public-safe, typed, build-time data bundle into src/data/generated/.
 *
 * Hard gates (build fails on violation):
 *  - every layer count must equal data/atlas_manifest.json exactly;
 *  - all 44 launch-selection IDs must exist in atlas_entities;
 *  - every story-manifest entity/case/standard reference must resolve;
 *  - only claims with public_use === "attributed_only" may carry public text;
 *  - jcx_private story chapters are never emitted;
 *  - raw field-assertion values are never emitted (conflict notes only).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildFlagshipExport } from "./flagship-contract.mjs";
import { buildComparativeBindings, validateComparativeData } from "./comparative-contract.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const corpus = join(root, "..", "data");
const research = join(root, "..", "research");
const researchV2 = join(root, "..", "research_v2");
const outDir = join(root, "src", "data", "generated");
const publicDir = join(root, "public", "data");
mkdirSync(outDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

const read = (dir, name) => JSON.parse(readFileSync(join(dir, name), "utf8"));
const readJsonl = (path) => readFileSync(path, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
const J = (v) => {
  if (v === null || v === undefined || v === "") return [];
  try {
    const p = JSON.parse(v);
    return Array.isArray(p) ? p : [p];
  } catch {
    return [];
  }
};
const str = (v) => (v === "" || v === undefined || v === null ? null : String(v));
const bool = (v) => v === "true" || v === true;
const num = (v) => (v === "" || v === undefined || v === null ? null : Number(v));

/* One-line plain description derived verbatim from corpus fields (no new
   wording invented): first category label, else lifecycle placement.
   Analyst jcx_relevance notes are NOT used: most carry review_required
   claim status and must stay out of the public bundle until reviewed.
   Records in the 44-profile launch set without a category fall back to
   their launch-selection reason (already public in launch.json). */
const humanize = (s) =>
  String(s).replace(/[_]+/g, " ").replace(/[-–—]+/g, " ").replace(/\s+/g, " ").trim();

/* Directory snapshots carry scraped page chrome and a repeated display name in
   the description column. Removing that chrome is normalization only: no
   wording is added, reordered or paraphrased, so the surviving sentence stays
   exactly as the source published it. */
const SCRAPE_CHROME =
  /\s*(?:·|\||-|–)?\s*\b(?:view\s*website|visit\s*website|view\s*profile|view\s*company|learn\s*more|read\s*more|see\s*more|website)\b\s*\.?\s*$/gi;
/* Portfolio tables flatten filter widgets into the same cell, e.g.
   "... Year of investment 2022 Stage at Investment All Seed Real Estate Focus All Other". */
const SCRAPE_TABLE =
  /\s*\b(?:Year of investment|Stage at Investment|Real Estate Focus|Sector Focus|Region Focus)\b.*$/i;

function cleanDescription(raw, name) {
  if (!raw) return null;
  let s = String(raw).replace(/\s+/g, " ").trim();
  s = s.replace(SCRAPE_TABLE, "").trim();
  let prev;
  do {
    prev = s;
    s = s.replace(SCRAPE_CHROME, "").trim();
  } while (s !== prev);
  // Collapse a leading name echo: "Acme Acme builds X" -> "Acme builds X".
  if (name) {
    const n = name.trim();
    if (n) {
      const esc = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      s = s.replace(new RegExp(`^(?:${esc})[\\s,:–-]+(?=(?:${esc})\\b)`, "i"), "").trim();
    }
  }
  s = s.replace(/\s+([.,;:!?])/g, "$1").replace(/\s*\.\s*\.\s*$/, ".").trim();
  return s === "" ? null : s;
}

/* ------------------------------------------------------------------ */
/* Load corpus                                                         */
/* ------------------------------------------------------------------ */
const manifest = read(corpus, "atlas_manifest.json");
const entitiesRaw = read(corpus, "atlas_entities.json");
const discoveryRaw = read(corpus, "discovery_universe.json");
const claimsRaw = read(corpus, "claims_registry.json");
const assertionsRaw = read(corpus, "entity_field_assertions.json");
const relsRaw = read(corpus, "entity_relationships.json");
const casesRaw = read(corpus, "quantified_outcome_cases.json");
const standardsRaw = read(corpus, "standards_registry.json");
const taxonomyRaw = read(corpus, "lifecycle_taxonomy.json");
const ycRaw = read(corpus, "yc_real_estate_construction_directory_2026-08-30.json");
const ecoRaw = read(corpus, "built_environment_ecosystem_discovery_index.json");
const sourcesRaw = read(corpus, "source_register.json");
const storyRaw = read(corpus, "website_story_manifest.json");
const flagshipInput = read(join(researchV2, "02_evidence_library"), "flagship_chapter_public.json");
const reviewedMetrics = readJsonl(join(researchV2, "02_evidence_library", "metrics_reviewed.jsonl"));
const comparativeInput = read(join(root, "..", "website_content"), "public_comparative_chapter.json");
const gapSourceRows = readJsonl(join(researchV2, "13_gap_completion", "sources_gap.jsonl"));
const flagship = buildFlagshipExport(flagshipInput, reviewedMetrics);
const selectionMd = readFileSync(
  join(research, "website_launch_editorial_selection.md"),
  "utf8",
);

/* ------------------------------------------------------------------ */
/* Gate 1 — counts must equal the manifest                             */
/* ------------------------------------------------------------------ */
const expect = [
  ["atlas_entities", entitiesRaw.length, manifest.normalized_schema_outputs.atlas_entities],
  ["discovery_universe", discoveryRaw.length, manifest.normalized_schema_outputs.discovery_universe],
  ["claims_registry", claimsRaw.length, manifest.normalized_schema_outputs.claims_registry],
  ["entity_field_assertions", assertionsRaw.length, manifest.normalized_schema_outputs.entity_field_assertions],
  ["entity_relationships", relsRaw.length, manifest.normalized_schema_outputs.entity_relationships],
  ["quantified_outcome_cases", casesRaw.length, manifest.auxiliary_datasets.quantified_outcome_cases],
  ["standards_registry", standardsRaw.length, manifest.auxiliary_datasets.standards_registry],
  ["yc_directory", ycRaw.length, manifest.auxiliary_datasets["yc_real_estate_construction_directory_2026-08-30"]],
  ["ecosystem_index", ecoRaw.length, manifest.auxiliary_datasets.built_environment_ecosystem_discovery_index],
  ["source_register", sourcesRaw.length, manifest.unique_source_urls],
];
const mismatches = expect.filter(([, a, b]) => a !== b);
if (mismatches.length) {
  console.error("COUNT MISMATCH vs atlas_manifest.json:");
  for (const [k, a, b] of mismatches) console.error(`  ${k}: file=${a} manifest=${b}`);
  process.exit(1);
}
console.log(`counts verified against atlas_manifest.json (${expect.length} layers)`);

/* ------------------------------------------------------------------ */
/* Plain descriptions: corpus wording only, no invented claims         */
/* ------------------------------------------------------------------ */
const LIFECYCLE_SHORT = {
  L1: "land and origination",
  L2: "feasibility and development strategy",
  L3: "capital, finance, and transactions",
  L4: "design, BIM, and preconstruction",
  L5: "construction delivery",
  L6: "marketing, sales, leasing, and distribution",
  L7: "occupancy and customer experience",
  L8: "property and facility operations",
  L9: "asset, portfolio, and investment management",
  L10: "ESG, climate, resilience, and health",
  L11: "handover, warranty, and end of life",
  L12: "cross lifecycle data and trust",
};
const describeEntity = (e, launchWhy) => {
  const cats = J(e.category_labels_json).map(humanize).filter(Boolean);
  if (cats[0]) {
    // Sentence-case the label without altering its words.
    const c = cats[0];
    return { text: c.charAt(0).toUpperCase() + c.slice(1), basis: "category" };
  }
  if (launchWhy) return { text: launchWhy, basis: "launch" };
  const codes = J(e.lifecycle_codes_json);
  if (codes.length) {
    const areas = [...new Set(codes.map((c) => LIFECYCLE_SHORT[c]).filter(Boolean))];
    if (areas.length) return { text: `Active in ${areas.slice(0, 2).join(" and ")}`, basis: "lifecycle" };
  }
  return { text: null, basis: "none" };
};

/* ------------------------------------------------------------------ */
/* Normalize entities                                                  */
/* ------------------------------------------------------------------ */
/* gateNotes (claims-gate section below) filters analyst notes to gated
   wording only; entities are normalized after it via normalizeEntities.
   launchWhyById is built from the editorial selection (public by design)
   before normalization so category-less launch records get real wording. */
const launchWhyById = new Map();
for (const line of selectionMd.split("\n")) {
  if (!line.startsWith("|")) continue;
  const cells = line
    .split("|")
    .map((s) => s.trim().replace(/^`|`$/g, ""))
    .filter((s) => s !== "");
  if (cells.length !== 6) continue;
  const [numCell, , stableId, , why] = cells;
  if (numCell === "#" || numCell.startsWith("---") || !stableId.startsWith("org-")) continue;
  if (!launchWhyById.has(stableId)) launchWhyById.set(stableId, why);
}
const normalizeEntities = (gate) => entitiesRaw.map((e) => {
  const lifecycleCodes = J(e.lifecycle_codes_json).sort();
  const categoryLabels = J(e.category_labels_json);
  const { text: description, basis: descriptionBasis } = describeEntity(e, launchWhyById.get(e.entity_id));
  const { kept: gatedNotes, withheld: withheldNotes } = gate(e.entity_id, J(e.jcx_relevance_notes_json));
  return {
  id: e.entity_id,
  name: e.display_name,
  aliases: J(e.aliases_json),
  recordType: e.record_type,
  recordTypeBasis: str(e.record_type_basis),
  canonicalUrl: str(e.canonical_url),
  canonicalUrlStatus: str(e.canonical_url_status),
  discoveryProfileUrls: J(e.discovery_profile_urls_json),
  status: str(e.status_current) ?? "unknown",
  operatingStatusLegacy: str(e.operating_status_legacy),
  statusConflict: bool(e.status_conflict),
  statusEvidenceDate: str(e.status_evidence_date),
  statusObservedAt: str(e.status_observed_at),
  statusDateNote: str(e.status_date_note),
  lastVerified: str(e.last_verified),
  hqCountry: str(e.headquarters_country),
  hqCountryConflict: bool(e.headquarters_country_conflict),
  operatingRegions: J(e.operating_regions_json),
  foundingYear: str(e.founding_year),
  foundingYearNote: str(e.founding_year_note),
  businessModels: J(e.business_models_json),
  ecosystemMemberships: J(e.ecosystem_memberships_json),
  lifecycleCodes,
  lifecycleMappingMethods: J(e.lifecycle_mapping_methods_json),
  lifecycleUnmappedLabels: J(e.lifecycle_unmapped_labels_json),
  categoryLabels,
  description,
  descriptionBasis,
  maturityBand: str(e.maturity_band_provisional),
  mrl: str(e.mrl),
  mrlNote: str(e.mrl_note),
  tier: str(e.reviewed_relevance_tier),
  tierConflict: bool(e.relevance_tier_conflict),
  jcxRelevanceNotes: gatedNotes,
  jcxNotesWithheld: withheldNotes,
  sourceGradesProvisional: J(e.source_quality_grades_provisional_json),
  sourceCount: num(e.source_count) ?? 0,
  sourceUrls: J(e.source_urls_json),
  sourceDatasets: J(e.source_datasets_json),
  mergedRecordCount: num(e.merged_record_count) ?? 1,
  publicationReadiness: str(e.publication_readiness),
  reviewFlags: J(e.review_flags_json),
  };
});

/* ------------------------------------------------------------------ */
/* Claims — public gate                                                */
/* ------------------------------------------------------------------ */
const PUBLIC_CLAIM_USE = "attributed_only";
/* Analyst jcx_relevance notes are pre-publication wording: emit a note
   only when its exact text matches an attributed_only claim for the same
   entity. Everything else stays out of the public bundle; the interface
   reports the gap as an explicit unknown. */
const attributedTextByEntity = new Map();
for (const c of claimsRaw) {
  if (c.public_use === PUBLIC_CLAIM_USE && c.claim_text) {
    if (!attributedTextByEntity.has(c.entity_id)) attributedTextByEntity.set(c.entity_id, new Set());
    attributedTextByEntity.get(c.entity_id).add(c.claim_text);
  }
}
const gateNotes = (entityId, notes) => {
  const allowed = attributedTextByEntity.get(entityId);
  const kept = (notes ?? []).filter((n) => allowed?.has(n));
  return { kept, withheld: (notes ?? []).length - kept.length };
};
let emittedClaims = 0;
let withheldClaims = 0;
const claimsByEntity = {};
for (const c of claimsRaw) {
  const entry = (claimsByEntity[c.entity_id] ||= { claims: [], pendingReview: 0, contextOnly: 0 });
  if (c.public_use === PUBLIC_CLAIM_USE) {
    entry.claims.push({
      id: c.claim_id,
      field: c.claim_field,
      text: c.claim_text,
      grade: c.claim_attribution_grade_provisional,
      gradeBasis: str(c.claim_grade_basis),
      caveat: str(c.caveat),
      sourceUrls: J(c.source_urls_json),
      sourceGrades: J(c.source_quality_grades_provisional_json),
      retrievedAt: str(c.verified_or_retrieved_at),
    });
    emittedClaims++;
  } else if (c.public_use === "context_only") {
    entry.contextOnly++;
    withheldClaims++;
  } else {
    entry.pendingReview++;
    withheldClaims++;
  }
}
if (emittedClaims + withheldClaims !== claimsRaw.length) {
  console.error("claim gate accounting failed");
  process.exit(1);
}
console.log(`claims: ${emittedClaims} attributed-only emitted, ${withheldClaims} withheld (review/context gates)`);

const entities = normalizeEntities(gateNotes);
const entityById = new Map(entities.map((e) => [e.id, e]));
if (entityById.size !== entities.length) {
  console.error("duplicate entity_id detected");
  process.exit(1);
}
let gatedKept = 0;
let gatedWithheld = 0;
for (const e of entities) {
  gatedKept += (e.jcxRelevanceNotes ?? []).length;
  gatedWithheld += e.jcxNotesWithheld ?? 0;
}
console.log(`analyst notes: ${gatedKept} gated wording emitted, ${gatedWithheld} withheld pending review`);

/* ------------------------------------------------------------------ */
/* Launch editorial selection — parse the markdown tables              */
/* ------------------------------------------------------------------ */
const GROUPS = [
  { n: 1, id: "operators", title: "Technology-leading operators and developers" },
  { n: 2, id: "vendors", title: "Workflow, data, physical and climate vendors" },
  { n: 3, id: "south-asia-mena", title: "Bangladesh, South Asia and MENA signals" },
  { n: 4, id: "programs", title: "Programs and ecosystem engines" },
  { n: 5, id: "historical", title: "Historical and transition lessons" },
  { n: 6, id: "coverage", title: "Final coverage-assurance additions" },
];
const launch = [];
let currentGroup = null;
for (const line of selectionMd.split("\n")) {
  const h = line.match(/^### (\d)\. /);
  if (h) currentGroup = Number(h[1]);
  if (!line.startsWith("|") || !currentGroup) continue;
  const cells = line
    .split("|")
    .map((s) => s.trim().replace(/^`|`$/g, ""))
    .filter((s) => s !== "");
  if (cells.length !== 6) continue;
  const [numCell, profile, stableId, context, why, boundary] = cells;
  if (numCell === "#" || numCell.startsWith("---") || !stableId.startsWith("org-")) continue;
  if (!entityById.has(stableId)) {
    console.error(`launch selection ID missing from atlas_entities: ${stableId} (${profile})`);
    process.exit(1);
  }
  const group = GROUPS.find((g) => g.n === currentGroup);
  launch.push({
    order: Number(numCell),
    entityId: stableId,
    name: profile,
    group: group.id,
    groupTitle: group.title,
    context,
    why,
    boundary,
  });
}
if (launch.length !== 44) {
  console.error(`launch selection parsed ${launch.length} records, expected 44`);
  process.exit(1);
}
const launchById = new Map(launch.map((l) => [l.entityId, l]));
console.log(`launch selection: ${launch.length} editorial profiles parsed and resolved`);

/* ------------------------------------------------------------------ */
/* Slim entities for explorers and story resolution                    */
/* ------------------------------------------------------------------ */
const slim = (e) => ({
  id: e.id,
  name: e.name,
  recordType: e.recordType,
  status: e.status,
  statusConflict: e.statusConflict,
  tier: e.tier,
  tierConflict: e.tierConflict,
  lifecycleCodes: e.lifecycleCodes,
  hqCountry: e.hqCountry,
  operatingRegions: e.operatingRegions,
  sourceCount: e.sourceCount,
  publicationReadiness: e.publicationReadiness,
  reviewFlags: e.reviewFlags,
  lastVerified: e.lastVerified,
  canonicalUrl: e.canonicalUrl,
  maturityBand: e.maturityBand,
  mrl: e.mrl,
  /* One-line plain description, corpus wording only: category label, else
     launch-selection reason for the 44 editorial records, else lifecycle
     placement. descriptionBasis says which. Three records without lifecycle
     codes report an explicit unknown. */
  description: e.description,
  descriptionBasis: e.descriptionBasis,
  category: e.categoryLabels?.[0] ?? null,
  launch: launchById.get(e.id)?.group ?? null,
  launchOrder: launchById.get(e.id)?.order ?? null,
});

/* ------------------------------------------------------------------ */
/* Cases, standards, taxonomy                                          */
/* ------------------------------------------------------------------ */
const cases = casesRaw.map((c) => ({
  id: c.case_id,
  organization: c.organization,
  vendor: c.solution_vendor,
  geography: str(c.geography),
  lifecycle: str(c.lifecycle),
  category: str(c.category),
  baselineProblem: str(c.baseline_problem),
  intervention: str(c.intervention),
  measuredOutcome: str(c.measured_outcome),
  periodSampleDenominator: str(c.period_sample_denominator),
  sourceType: str(c.source_type),
  grade: str(c.evidence_grade),
  causalCaveat: str(c.causal_caveat),
  transferability: str(c.transferability_bangladesh_jcx),
  sourceUrl: str(c.source_url),
  verificationDate: str(c.verification_date),
}));
const caseById = new Map(cases.map((c) => [c.id, c]));

/* Case ↔ entity links: exact display-name matches between a case's
   customer (organization) or solution_vendor and a qualified entity.
   Conservative by design — unmatched cases remain reachable in /evidence. */
const entityIdByName = new Map(entities.map((e) => [e.name, e.id]));
const caseIdsByEntity = {};
for (const c of cases) {
  const ids = new Set();
  for (const side of [c.organization, c.vendor]) {
    if (side && entityIdByName.has(side)) ids.add(entityIdByName.get(side));
  }
  c.entityIds = [...ids];
  for (const id of ids) (caseIdsByEntity[id] ||= []).push(c.id);
}
console.log(`case-entity links: ${Object.keys(caseIdsByEntity).length} entities linked to ${cases.filter((c) => c.entityIds.length).length} cases`);

const standards = standardsRaw.map((s) => ({
  id: s.standard_id,
  name: s.name,
  domain: s.domain,
  statusOrVersion: str(s.status_or_version),
  solves: str(s.solves),
  adoption: str(s.adoption_or_maturity),
  license: str(s.open_or_license),
  url: str(s.primary_url),
  jcxImplication: str(s.jcx_implication),
  caveat: str(s.lockin_or_caveat),
  asOf: str(s.source_as_of),
}));
const standardById = new Map(standards.map((s) => [s.id, s]));

const taxonomy = taxonomyRaw.map((t) => ({
  code: t.code,
  label: t.label,
  version: t.taxonomy_version,
  note: t.editorial_note,
}));

/* ------------------------------------------------------------------ */
/* Relationships (qualified core)                                      */
/* ------------------------------------------------------------------ */
const relsBySubject = {};
for (const r of relsRaw) {
  if (!entityById.has(r.subject_entity_id)) {
    console.error(`relationship subject missing entity: ${r.subject_entity_id}`);
    process.exit(1);
  }
  (relsBySubject[r.subject_entity_id] ||= []).push({
    id: r.relationship_id,
    type: r.relationship_type,
    objectName: str(r.object_name),
    objectEntityId: str(r.object_entity_id),
    status: r.relationship_status,
    sourceUrls: J(r.source_urls_json),
    retrievedAt: str(r.verified_or_retrieved_at),
    note: str(r.editorial_note),
  });
}

/* ------------------------------------------------------------------ */
/* Discovery universe (frontier)                                       */
/* ------------------------------------------------------------------ */
const discovery = discoveryRaw.map((d) => ({
  id: d.discovery_id,
  name: d.display_name,
  nameVariants: J(d.name_variants_json),
  recordTypeSignals: J(d.record_type_signals_json),
  qualifiedEntityIds: J(d.qualified_entity_ids_json),
  stage: d.evidence_stage,
  discoveryOnly: bool(d.discovery_only),
  sourceLayers: J(d.source_layers_json),
  domains: J(d.domains_json),
  candidateUrl: J(d.candidate_urls_json)[0] ?? null,
  profileUrl: J(d.profile_urls_json)[0] ?? null,
  ycBatches: J(d.yc_batches_json),
  ycStatuses: J(d.yc_status_signals_json),
  ecosystems: J(d.ecosystems_json),
  ecosystemStatusSignals: J(d.ecosystem_status_signals_json),
  categorySignals: J(d.category_signals_json),
  lifecycleSignals: J(d.lifecycle_signals_json),
  tierSignals: J(d.jcx_tier_signals_json),
  regionSignals: J(d.region_signals_json),
  countrySignals: J(d.country_signals_json),
  locationSignals: J(d.location_signals_json),
  descriptionSignals: J(d.description_signals_json)
    .map((s) => cleanDescription(s, d.display_name))
    .filter(Boolean),
  sourceUrlCount: num(d.source_url_count) ?? 0,
  needsIdentityReview: bool(d.needs_identity_review),
  identityNotes: J(d.identity_notes_json),
  snapshotDate: str(d.snapshot_date),
  publicationNote: str(d.publication_note),
}));

/* ------------------------------------------------------------------ */
/* YC snapshot                                                         */
/* ------------------------------------------------------------------ */
const yc = ycRaw.map((y) => ({
  slug: y.yc_profile_slug,
  name: y.name,
  url: y.yc_profile_url,
  batch: str(y.batch),
  status: str(y.status),
  employeesShown: str(y.employee_count_shown),
  location: str(y.location_shown),
  countryCode: str(y.country_code_shown),
  oneLiner: cleanDescription(y.official_one_liner, y.name),
  description: cleanDescription(y.official_description_concise, y.name),
  tags: str(y.visible_tags),
  inferredLifecycle: str(y.inferred_lifecycle),
  inferredCategory: str(y.inferred_category),
  screeningTier: str(y.jcx_screening_tier),
  screeningBasis: str(y.jcx_screening_basis),
  inPropTechDirectory: y.in_proptech_directory === "yes",
  inRealEstateDirectory: y.in_real_estate_directory === "yes",
  snapshotDate: str(y.snapshot_date),
  caveat: str(y.research_caveat),
}));

/* ------------------------------------------------------------------ */
/* Ecosystem rollups                                                   */
/* ------------------------------------------------------------------ */
const ecoRollups = {};
for (const r of ecoRaw) {
  const e = (ecoRollups[r.ecosystem] ||= {
    name: r.ecosystem,
    type: r.ecosystem_type,
    pairs: 0,
    regions: new Set(),
    captureDate: r.source_capture_date,
  });
  e.pairs++;
  if (r.region) e.regions.add(r.region);
}
const ecosystems = Object.values(ecoRollups)
  .map((e) => ({ name: e.name, type: e.type, pairs: e.pairs, regions: [...e.regions].sort(), captureDate: e.captureDate }))
  .sort((a, b) => b.pairs - a.pairs);

/* ------------------------------------------------------------------ */
/* Source register (public-appropriate slim)                           */
/* ------------------------------------------------------------------ */
/* Keep the research corpus intact, but do not expose client-owned or
   client-system references through the public source browser. */
const publicSourceRows = sourcesRaw.filter((s) => !/(?:jcxbd\.com|odoo\.com|odoo)/i.test(JSON.stringify(s)));
const sources = publicSourceRows.map((s) => ({
  id: s.source_id,
  url: s.url,
  domain: s.domain,
  sourceClass: str(s.inferred_source_class),
  grade: str(s.source_quality_grade_provisional),
  gradeStatus: str(s.quality_grade_status),
  usedByNames: str(s.used_by_names),
  lastVerified: str(s.last_verified),
}));
console.log(`source register: ${sources.length} public rows emitted (${sourcesRaw.length - sources.length} internal-only rows withheld)`);

/* ------------------------------------------------------------------ */
/* Story manifest — resolve references, drop jcx_private chapters      */
/* ------------------------------------------------------------------ */
const resolveRef = (ref) => {
  if (ref.type === "entity") {
    const e = entityById.get(ref.id);
    if (!e) throw new Error(`story entity ref missing: ${ref.id}`);
    return { type: "entity", entity: slim(e), note: ref.note ?? null };
  }
  if (ref.type === "case") {
    const c = caseById.get(ref.id);
    if (!c) throw new Error(`story case ref missing: ${ref.id}`);
    return { type: "case", case: c, note: ref.note ?? null };
  }
  if (ref.type === "standard") {
    const s = standardById.get(ref.id);
    if (!s) throw new Error(`story standard ref missing: ${ref.id}`);
    return { type: "standard", standard: s, note: ref.note ?? null };
  }
  if (ref.type === "claim") {
    const c = claimsRaw.find((x) => x.claim_id === ref.id);
    if (!c) throw new Error(`story claim ref missing: ${ref.id}`);
    if (c.public_use !== PUBLIC_CLAIM_USE) {
      // Gate: do not emit claim text for review_required / context_only claims.
      return { type: "claim", withheld: true, grade: c.claim_attribution_grade_provisional, entityName: c.entity_name, note: ref.note ?? null };
    }
    return {
      type: "claim",
      withheld: false,
      claim: {
        id: c.claim_id,
        entityId: c.entity_id,
        entityName: c.entity_name,
        text: c.claim_text,
        grade: c.claim_attribution_grade_provisional,
        caveat: str(c.caveat),
        sourceUrls: J(c.source_urls_json),
        sourceGrades: J(c.source_quality_grades_provisional_json),
        retrievedAt: str(c.verified_or_retrieved_at),
      },
      note: ref.note ?? null,
    };
  }
  if (ref.type === "document") {
    // Only documents with an explicit public_global rule may be named in the
    // public bundle; everything else defaults to the more restrictive state.
    const PUBLIC_DOCUMENTS = new Set([
      "JCX_Global_PropTech_Intelligence_Atlas_2026-08-30.md",
      "research/atlas_methodology_and_website_ia.md",
    ]);
    if (!PUBLIC_DOCUMENTS.has(ref.id)) return { type: "document", withheld: true };
    return { type: "document", id: ref.id, locator: ref.locator ?? null };
  }
  return { type: ref.type, id: ref.id, locator: ref.locator ?? null };
};

const story = {
  id: storyRaw.manifest_id,
  version: storyRaw.manifest_version,
  researchCutoff: storyRaw.research_cutoff,
  thesis: storyRaw.thesis.statement,
  supportingArguments: storyRaw.thesis.supporting_arguments,
  thesisCaveats: storyRaw.thesis.caveats,
  chapters: storyRaw.chapters
    .filter((ch) => ch.visibility === "public_global")
    .map((ch) => ({
      order: ch.order,
      id: ch.chapter_id,
      title: ch.title,
      purpose: ch.narrative_purpose,
      caveats: ch.chapter_caveats ?? [],
      openQuestions: ch.chapter_open_questions ?? [],
      beats: ch.beats.map((b) => ({
        order: b.order,
        id: b.beat_id,
        title: b.title,
        references: (b.references ?? []).map(resolveRef),
        claimReferences: (b.claim_references ?? []).map((id) => resolveRef({ type: "claim", id })),
        caseReferences: (b.case_references ?? []).map((id) => resolveRef({ type: "case", id })),
        caveats: b.caveats ?? [],
        openQuestions: b.open_questions ?? [],
      })),
    })),
};
if (storyRaw.chapters.length !== 11 || story.chapters.length !== 10) {
  console.error(`expected 11 chapters with 1 private dropped; got ${storyRaw.chapters.length}/${story.chapters.length}`);
  process.exit(1);
}
console.log(`story manifest: ${story.chapters.length} public chapters resolved (1 jcx-private chapter withheld by design)`);

/* ------------------------------------------------------------------ */
/* Comparative gap chapter — curated public handoff                   */
/* ------------------------------------------------------------------ */
const gapSourceById = new Map(gapSourceRows.map((source) => [source.source_id, source]));
const { caseIds: comparativeCaseIds, lensIds: comparativeLensIds, sourceById: comparativeSourceById } =
  validateComparativeData(comparativeInput, gapSourceRows, { metrics: reviewedMetrics });
const comparativeFieldBindings = buildComparativeBindings(comparativeInput, gapSourceRows, reviewedMetrics);
const comparativeSourceIds = new Set(comparativeInput.lenses.flatMap((lens) => lens.cases.flatMap((item) => item.source_ids)));
const comparativeSources = [...comparativeSourceIds].sort().map((sourceId) => {
  const source = comparativeSourceById.get(sourceId);
  if (!/^https:\/\//.test(source.url)) throw new Error(`comparative source is not an external HTTPS URL: ${sourceId}`);
  return {
    id: source.source_id,
    title: source.title,
    url: source.url,
    publisher: source.publisher,
    sourceDate: str(source.source_date),
    accessed: str(source.accessed),
    sourceClass: source.source_class,
    evidenceGrade: source.evidence_grade,
    locator: source.locator,
    notes: source.notes,
  };
});
const comparative = {
  chapterId: comparativeInput.chapter_id,
  updated: comparativeInput.updated,
  scope: comparativeInput.scope,
  opening: comparativeInput.opening,
  lenses: comparativeInput.lenses,
  definitions: comparativeInput.definitions,
  publicBoundary: comparativeInput.public_boundary,
  /* Field-level claim bindings keep the prose readable while preserving a
     direct sentence -> source locator -> reviewed metric path. */
  fieldBindings: comparativeFieldBindings,
  metrics: reviewedMetrics.filter((metric) => comparativeFieldBindings.some((binding) => binding.metric_ids.includes(metric.metric_id))),
  sources: comparativeSources,
  sourceCount: comparativeSources.length,
  lensCount: comparativeInput.lenses.length,
  caseCount: comparativeCaseIds.size,
};
console.log(`comparative gap chapter: ${comparative.lensCount} lenses, ${comparative.caseCount} mechanisms, ${comparative.sourceCount} external sources resolved`);

/* ------------------------------------------------------------------ */
/* Matrix + manifest passthrough                                       */
/* ------------------------------------------------------------------ */
const matrixCounts = {};
for (const t of taxonomy) matrixCounts[t.code] = 0;
for (const e of entities) for (const code of e.lifecycleCodes) {
  if (code in matrixCounts) matrixCounts[code]++;
}

const caseGradeDist = cases.reduce((a, c) => ((a[c.grade] = (a[c.grade] ?? 0) + 1), a), {});
const statusDist = entities.reduce((a, e) => ((a[e.status] = (a[e.status] ?? 0) + 1), a), {});
const tierDist = entities.reduce((a, e) => ((a[e.tier ?? "unresolved"] = (a[e.tier ?? "unresolved"] ?? 0) + 1), a), {});
const recordTypeDist = entities.reduce((a, e) => ((a[e.recordType] = (a[e.recordType] ?? 0) + 1), a), {});

const siteManifest = {
  generatedAt: manifest.generated_at,
  researchCutoff: manifest.research_cutoff,
  counts: {
    qualifiedEntities: manifest.normalized_schema_outputs.atlas_entities,
    organizations: manifest.normalized_record_type_counts.organization,
    programs: manifest.normalized_record_type_counts.program_ecosystem,
    products: manifest.normalized_record_type_counts.product_offering,
    projects: manifest.normalized_record_type_counts.project,
    discoveryIdentities: manifest.discovery_universe_counts.deduplicated_identities,
    discoveryOnly: manifest.discovery_universe_counts.discovery_only_identities,
    ycProfiles: manifest.auxiliary_datasets["yc_real_estate_construction_directory_2026-08-30"],
    ecosystemPairs: manifest.auxiliary_datasets.built_environment_ecosystem_discovery_index,
    ecosystemLinkedIdentities: manifest.discovery_universe_counts.identities_with_ecosystem_membership,
    claims: manifest.normalized_schema_outputs.claims_registry,
    fieldAssertions: manifest.normalized_schema_outputs.entity_field_assertions,
    relationships: manifest.normalized_schema_outputs.entity_relationships,
    cases: manifest.auxiliary_datasets.quantified_outcome_cases,
    standards: manifest.auxiliary_datasets.standards_registry,
    sources: sources.length,
    observedSourceVariants: manifest.auxiliary_datasets.full_corpus_source_inventory,
    lifecycleDomains: manifest.normalized_schema_outputs.lifecycle_taxonomy_terms,
    launchProfiles: launch.length,
  },
  claimGradeCounts: manifest.provisional_claim_grade_counts,
  reviewQueue: manifest.normalized_review_queue,
  statusCounts: manifest.status_counts,
  topHqCountries: manifest.top_hq_country_values,
  caseGradeDist,
  statusDist,
  tierDist,
  recordTypeDist,
  matrixCounts,
  importantNote: manifest.important_note,
};

/* ------------------------------------------------------------------ */
/* Emit                                                                */
/* ------------------------------------------------------------------ */
const emit = (name, data) => {
  writeFileSync(join(outDir, name), JSON.stringify(data));
  console.log(`  wrote src/data/generated/${name}`);
};
emit("manifest.json", siteManifest);
emit("entities.json", entities);
emit("entities.slim.json", entities.map(slim));
emit("launch.json", { groups: GROUPS, profiles: launch });
emit("claims.public.json", claimsByEntity);
emit("cases.json", cases);
emit("case-links.json", caseIdsByEntity);
emit("standards.json", standards);
emit("taxonomy.json", taxonomy);
emit("relationships.public.json", relsBySubject);
emit("discovery.slim.json", discovery);
emit("yc.json", yc);
emit("ecosystems.json", ecosystems);
emit("sources.slim.json", sources);
emit("story.json", story);
emit("flagship-chapter.json", flagship);
emit("comparative-gap.json", comparative);

/* Explorer datasets are also published as static files so client surfaces
   can lazy-fetch them with explicit loading/error states instead of bundling
   them into initial page JavaScript. */
const emitPublic = (name, data) => {
  writeFileSync(join(publicDir, name), JSON.stringify(data));
  console.log(`  wrote public/data/${name}`);
};
emitPublic("entities.slim.json", entities.map(slim));
emitPublic("discovery.slim.json", discovery);
emitPublic("sources.slim.json", sources);
emitPublic("yc.json", yc);
emitPublic("ecosystems.json", ecosystems);
emitPublic("cases.json", cases);
emitPublic("case-links.json", caseIdsByEntity);
emitPublic("standards.json", standards);
emitPublic("taxonomy.json", taxonomy);
emitPublic("manifest.json", siteManifest);
emitPublic("flagship-chapter.json", flagship);
emitPublic("comparative-gap.json", comparative);
console.log("data build complete.");
