#!/usr/bin/env node
/**
 * verify-content.mjs — content-safety audit for the public bundle.
 *
 * Runs after build-data.mjs. Fails the build if:
 *  1. Any withheld (review_required / context_only) claim text leaks into
 *     public story.json or claims.public.json.
 *  2. Any jcx_private / internal-only document content markers appear in the
 *     generated public data or the authored journey content.
 *  3. Any story reference is unresolved (should be impossible post-gates).
 *  4. Entity/profile data contains private-only field markers.
 */
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PRIVATE_MARKERS as FLAGSHIP_PRIVATE_MARKERS, validateFlagshipData } from "./flagship-contract.mjs";
import { validateComparativeData } from "./comparative-contract.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const corpus = join(root, "..", "data");
const gen = join(root, "src", "data", "generated");
const workspace = join(root, "..");
const read = (dir, f) => JSON.parse(readFileSync(join(dir, f), "utf8"));
const readJsonl = (path) => readFileSync(path, "utf8").split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));

let failures = 0;
const fail = (msg) => {
  console.error(`FAIL: ${msg}`);
  failures++;
};

/* 0 — editoral fail-closed rule: authored synopses must never restate an
   UNGATED corpus note ----------------------------------------------- */
const featuredBlob = (() => {
  try {
    return readFileSync(join(root, "src", "content", "featured.ts"), "utf8");
  } catch {
    return "";
  }
})();
const entitiesForGate = read(gen, "entities.json");

/* The public bundle emits jcxRelevanceNotes verbatim (gated at the note
   level by the claim bridge below), so an authored synopsis that restates a
   withheld jcx_relevance claim would launder ungated wording into public
   copy. Fail closed on any 6+ word overlap between featured.ts and a
   withheld jcx_relevance claim from the same entity. */
const synNormWords = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !new Set(["for", "and", "the", "with", "from", "into", "that", "this"]).has(w));
const synNgrams = (words, n) => {
  const out = new Set();
  for (let i = 0; i + n <= words.length; i++) out.add(words.slice(i, i + n).join(" "));
  return out;
};

/* 1 — claim gate audit: replay against the raw registry --------------- */
const PUBLIC_CLAIM_USE = "attributed_only";
const registry = read(corpus, "claims_registry.json");
const withheldText = new Map(
  registry.filter((c) => c.public_use !== "attributed_only").map((c) => [c.claim_id, c.claim_text]),
);
const story = read(gen, "story.json");
const claimsPublic = read(gen, "claims.public.json");
const storyBlob = JSON.stringify(story);
const claimsBlob = JSON.stringify(claimsPublic);
let leakCount = 0;
for (const [id, text] of withheldText) {
  // Only substantive text can "leak": skip short tag-like values that may
  // innocently appear as substrings (e.g. "energy-management").
  if (text && text.length >= 30 && (storyBlob.includes(text) || claimsBlob.includes(text))) {
    leakCount++;
    if (leakCount <= 5) fail(`withheld claim ${id} text appears in public bundle`);
  }
}
if (leakCount > 5) fail(`${leakCount} total withheld-claim leaks`);
console.log(`claim gate: ${withheldText.size} withheld claims scanned against public bundle`);

/* 2 — private-content markers ----------------------------------------- */
/* Client-private markers are about JCX the company (site, systems, meeting
   strategy), not the generic developer context used throughout the public
   transferability analysis ("for a developer here", "for JCX early site
   screening" style case guidance is public case-library content). */
const PRIVATE_MARKERS = [
  "JCX_Meeting_Dossier",
  "JCX_Meeting_Cheat_Sheet",
  "JCX_Second_Pass_Strategy",
  "JCX_Meeting_Notes_Template",
  "phone number (Landowner)",
  "Size of the land",
  "Jalshiri",
  "jcxbd.com",
  "Odoo",
  "talk track",
  "meeting script",
];
const journeyContentPaths = ["src/content/journey.ts", "src/content/featured.ts", "src/content/findings.ts"];
const blobsToScan = [
  ["story.json", storyBlob],
  ["entities.json", JSON.stringify(read(gen, "entities.json"))],
  ["entities.slim.json", JSON.stringify(read(gen, "entities.slim.json"))],
  ["discovery.slim.json", JSON.stringify(read(gen, "discovery.slim.json"))],
  ["cases.json", JSON.stringify(read(gen, "cases.json"))],
  ["launch.json", JSON.stringify(read(gen, "launch.json"))],
  ["sources.slim.json", JSON.stringify(read(gen, "sources.slim.json"))],
  ["comparative-gap.json", JSON.stringify(read(gen, "comparative-gap.json"))],
];
for (const p of journeyContentPaths) {
  try {
    blobsToScan.push([p, readFileSync(join(root, p), "utf8")]);
  } catch {
    console.log(`  (editorial content not found: ${p} — skipped)`);
  }
}
/* Claim gate covers generated bundles AND authored editorial copy. */
const editorialBlob = blobsToScan
  .filter(([name]) => name.startsWith("src/content/"))
  .map(([, blob]) => blob)
  .join("\n");
let editorialLeaks = 0;
for (const [id, text] of withheldText) {
  if (text && text.length >= 30 && editorialBlob.includes(text)) {
    editorialLeaks++;
    if (editorialLeaks <= 5) fail(`withheld claim ${id} text appears in authored editorial copy`);
  }
}
if (leakCount > 5) fail(`${leakCount} total withheld-claim leaks`);
if (editorialLeaks > 5) fail(`${editorialLeaks} total editorial-copy leaks`);

/* 1b — synopsis laundering check: featured.ts must not restate a withheld
   jcx_relevance note in different words (6+ content-word overlap, same
   entity block). The bundle emits jcxRelevanceNotes verbatim under their
   own gate; authored copy must not launder ungated wording into public. */
const withheldJcxByEntity = new Map();
for (const c of registry) {
  if (c.public_use !== PUBLIC_CLAIM_USE && c.claim_field === "jcx_relevance" && c.claim_text) {
    if (!withheldJcxByEntity.has(c.entity_id)) withheldJcxByEntity.set(c.entity_id, []);
    withheldJcxByEntity.get(c.entity_id).push(c);
  }
}
const featLower = editorialBlob.toLowerCase();
let laundered = 0;
for (const [entityId, claims] of withheldJcxByEntity) {
  const block = featLower.split(entityId)[1]?.slice(0, 6000) ?? "";
  if (!block) continue;
  const blockGrams = synNgrams(synNormWords(block), 6);
  for (const c of claims) {
    for (const g of synNgrams(synNormWords(c.claim_text ?? ""), 6)) {
      if (blockGrams.has(g)) {
        laundered++;
        if (laundered <= 5) fail(`featured synopsis for ${entityId} restates withheld note (${c.claim_id}): "${g}"`);
        break;
      }
    }
  }
}
if (laundered > 5) fail(`${laundered} total synopsis-laundering overlaps`);
console.log(`synopsis gate: ${withheldJcxByEntity.size} entities with withheld analyst notes scanned against featured.ts`);
for (const [name, blob] of blobsToScan) {
  for (const marker of PRIVATE_MARKERS) {
    if (blob.includes(marker)) fail(`private marker "${marker}" found in ${name}`);
  }
}
console.log(`private markers: ${PRIVATE_MARKERS.length} patterns scanned across ${blobsToScan.length} bundles`);

/* 3 — story reference integrity ---------------------------------------- */
const entities = read(gen, "entities.json");
const entityIds = new Set(entities.map((e) => e.id));
for (const ch of story.chapters) {
  for (const beat of ch.beats) {
    for (const ref of beat.references) {
      if (ref.type === "entity" && !entityIds.has(ref.entity.id)) fail(`unresolved entity in ${beat.id}`);
      if (ref.type === "claim" && ref.withheld !== true && !ref.claim?.id) fail(`malformed claim ref in ${beat.id}`);
    }
  }
}

/* 4 — jcx_private chapter exclusion ------------------------------------ */
if (story.chapters.some((c) => c.id === "chapter-10-jcx-translation")) {
  fail("jcx_private chapter 10 leaked into public story bundle");
}
if (story.chapters.length !== 10) fail(`expected 10 public chapters, got ${story.chapters.length}`);

/* 5 — counts echo ------------------------------------------------------- */
const manifest = read(gen, "manifest.json");
const checks = [
  [manifest.counts.qualifiedEntities, entities.length, "qualified entities"],
  [manifest.counts.discoveryIdentities, read(gen, "discovery.slim.json").length, "discovery identities"],
  [manifest.counts.cases, read(gen, "cases.json").length, "cases"],
  [manifest.counts.standards, read(gen, "standards.json").length, "standards"],
  [manifest.counts.ycProfiles, read(gen, "yc.json").length, "yc profiles"],
  [manifest.counts.sources, read(gen, "sources.slim.json").length, "sources"],
  [manifest.counts.launchProfiles, read(gen, "launch.json").profiles.length, "launch profiles"],
];
for (const [m, a, label] of checks) {
  if (m !== a) fail(`manifest ${label}=${m} but bundle=${a}`);
}

/* 6 — research-to-site handoff checks ---------------------------------- */
const presentationPath = join(root, "src", "content", "presentation.ts");
const presentationText = existsSync(presentationPath) ? readFileSync(presentationPath, "utf8") : "";
const sourceIds = [...presentationText.matchAll(/id:\s*"(S\d+)"/g)].map((match) => match[1]);
const expectedSourceIds = Array.from({ length: 33 }, (_, index) => `S${String(index + 1).padStart(2, "0")}`);
if (sourceIds.length !== expectedSourceIds.length || sourceIds.some((id, index) => id !== expectedSourceIds[index])) {
  fail(`presentation source register must contain ordered S01-S33 (found ${sourceIds.length})`);
}
const allowedEvidenceLevels = new Set(["Official", "Reported", "Company-reported", "Interpretation", "Open question"]);
const presentationLevels = [...presentationText.matchAll(/level:\s*"([^"]+)"/g)].map((match) => match[1]);
if (presentationLevels.length !== expectedSourceIds.length || presentationLevels.some((level) => !allowedEvidenceLevels.has(level))) {
  fail("presentation source register contains a non-canonical evidence label");
}
if (!presentationText.includes('id: "S09"') || !presentationText.includes("unaudited") || !presentationText.includes('id: "S33"')) {
  fail("KE Holdings source distinction is missing from the public presentation register");
}
const publicSourceRegisterPath = join(workspace, "website_content", "06_sources_and_definitions.md");
if (existsSync(publicSourceRegisterPath)) {
  const publicSourceRows = readFileSync(publicSourceRegisterPath, "utf8")
    .split(/\r?\n/)
    .filter((line) => /^\| S\d+ \|/.test(line));
  for (const row of publicSourceRows) {
    const cells = row.split("|").map((cell) => cell.trim());
    const label = cells[cells.length - 2];
    if (!allowedEvidenceLevels.has(label)) fail(`public source register contains non-canonical label: ${label}`);
  }
}
const publicPresentationBlob = [
  presentationText,
  existsSync(join(root, "src", "components", "presentation", "ResearchPresentation.tsx"))
    ? readFileSync(join(root, "src", "components", "presentation", "ResearchPresentation.tsx"), "utf8")
    : "",
  existsSync(join(root, "src", "components", "evidence", "CurrentReviewedCases.tsx"))
    ? readFileSync(join(root, "src", "components", "evidence", "CurrentReviewedCases.tsx"), "utf8")
    : "",
].join("\n");
for (const stale of ["08 September 2026", "innovation funnel", "Suspension reported in 2023", "institutional substrate"]) {
  if (publicPresentationBlob.toLowerCase().includes(stale.toLowerCase())) fail(`stale public presentation phrase found: ${stale}`);
}
if (!existsSync(join(workspace, "website_content", "IMPLEMENTATION_HANDOFF.md"))) {
  fail("website_content/IMPLEMENTATION_HANDOFF.md is missing");
}
const metricsPath = join(workspace, "research_v2", "02_evidence_library", "metrics_reviewed.jsonl");
if (!existsSync(metricsPath)) {
  fail("reviewed metrics export is missing");
} else {
  const requiredMetricFields = [
    "metric_id", "entity_id", "initiative_id", "model", "geography", "period", "value", "unit",
    "currency", "denominator", "scope", "source_id", "source_url", "locator", "review_state",
    "evidence_label", "note",
  ];
  const metricLines = readFileSync(metricsPath, "utf8").split(/\r?\n/).filter(Boolean);
  metricLines.forEach((line, index) => {
    try {
      const metric = JSON.parse(line);
      for (const field of requiredMetricFields) {
        if (!(field in metric)) fail(`reviewed metric line ${index + 1} missing ${field}`);
      }
      if (!expectedSourceIds.includes(metric.source_id)) fail(`reviewed metric ${metric.metric_id ?? index + 1} has unknown source ${metric.source_id}`);
    } catch {
      fail(`reviewed metric line ${index + 1} is not valid JSON`);
    }
  });
  console.log(`reviewed metrics: ${metricLines.length} structured rows checked`);
}
const flagshipPath = join(gen, "flagship-chapter.json");
if (!existsSync(flagshipPath)) {
  fail("generated flagship chapter is missing");
} else {
  try {
    const flagship = read(gen, "flagship-chapter.json");
    const flagshipMetrics = new Map((flagship.metrics ?? []).map((metric) => [metric.metric_id, metric]));
    validateFlagshipData(flagship, flagshipMetrics);
    if ((flagship.cases ?? []).length !== 4) fail(`flagship chapter expected four cases, got ${(flagship.cases ?? []).length}`);
    if ((flagship.sources ?? []).length < 8) fail("flagship chapter source depth is below the presentation contract");
    if ((flagship.metrics ?? []).some((metric) => metric.source_id === "S24" && String(metric.denominator).includes("1,500"))) {
      fail("flagship export repeats the JLL combined-sample denominator for the 5% occupier result");
    }
    const flagshipBlob = JSON.stringify(flagship);
    for (const marker of FLAGSHIP_PRIVATE_MARKERS) {
      if (flagshipBlob.includes(marker)) fail(`private marker "${marker}" found in flagship-chapter.json`);
    }
    console.log(`flagship chapter: ${(flagship.cases ?? []).length} cases, ${(flagship.claims ?? []).length} claims, ${(flagship.metrics ?? []).length} resolved metrics`);
  } catch (error) {
    fail(`flagship chapter contract failed: ${error.message}`);
  }
}
const comparativePath = join(gen, "comparative-gap.json");
if (!existsSync(comparativePath)) {
  fail("generated comparative gap chapter is missing");
} else {
  try {
    const comparative = read(gen, "comparative-gap.json");
    const comparativeInput = read(workspace + "/website_content", "public_comparative_chapter.json");
    const comparativeSourceRows = readJsonl(join(workspace, "research_v2", "13_gap_completion", "sources_gap.jsonl"));
    const reviewedMetricRows = readJsonl(metricsPath);
    validateComparativeData(comparativeInput, comparativeSourceRows, { metrics: reviewedMetricRows });
    const sourceIds = new Set((comparative.sources ?? []).map((source) => source.id));
    const sourceById = new Map((comparative.sources ?? []).map((source) => [source.id, source]));
    const metricById = new Map((comparative.metrics ?? []).map((metric) => [metric.metric_id, metric]));
    const lensIds = new Set();
    const caseIds = new Set();
    for (const lens of comparative.lenses ?? []) {
      if (lensIds.has(lens.id)) fail(`duplicate comparative lens ${lens.id}`);
      lensIds.add(lens.id);
      for (const item of lens.cases ?? []) {
        if (caseIds.has(item.id)) fail(`duplicate comparative case ${item.id}`);
        caseIds.add(item.id);
        if (!allowedEvidenceLevels.has(item.evidence_label)) fail(`comparative case ${item.id} has invalid evidence label`);
        for (const sourceId of item.source_ids ?? []) {
          if (!sourceIds.has(sourceId)) fail(`comparative case ${item.id} has unresolved source ${sourceId}`);
        }
      }
    }
    if (lensIds.size !== 6) fail(`comparative chapter expected six lenses, got ${lensIds.size}`);
    if (comparative.lensCount !== lensIds.size || comparative.caseCount !== caseIds.size || comparative.sourceCount !== sourceIds.size) {
      fail("comparative chapter counts do not match generated records");
    }
    for (const source of comparative.sources ?? []) {
      if (!/^https:\/\//.test(source.url)) fail(`comparative source ${source.id} is not an external HTTPS URL`);
      for (const field of ["title", "publisher", "sourceDate", "accessed", "sourceClass", "evidenceGrade", "locator", "notes"]) {
        if (typeof source[field] !== "string" || source[field].trim() === "") fail(`comparative source ${source.id} is missing ${field}`);
      }
      if (/(?:research_v2[\\/]|\.md(?:#|$)|Propman|Sentinel)/i.test(JSON.stringify(source))) fail(`private/local marker found in comparative source ${source.id}`);
    }
    const bindings = comparative.fieldBindings ?? [];
    const expectedBindings = caseIds.size * 14;
    if (bindings.length !== expectedBindings) fail(`comparative field binding count=${bindings.length}, expected=${expectedBindings}`);
    const bindingKeys = new Set();
    for (const binding of bindings) {
      const key = `${binding.case_id}:${binding.field}`;
      if (bindingKeys.has(key)) fail(`duplicate comparative field binding ${key}`);
      bindingKeys.add(key);
      if (!binding.claim_id || !binding.statement || !binding.locator) fail(`comparative binding ${binding.claim_id ?? "(missing)"} lacks claim text/locator`);
      if (!allowedEvidenceLevels.has(binding.evidence_label)) fail(`comparative binding ${binding.claim_id} has invalid evidence state`);
      if (binding.review_state !== "approved_public") fail(`comparative binding ${binding.claim_id} is not approved_public`);
      if (!Array.isArray(binding.source_ids) || binding.source_ids.length === 0) fail(`comparative binding ${binding.claim_id} has no source IDs`);
      binding.source_ids.forEach((sourceId, index) => {
        const source = sourceById.get(sourceId);
        if (!source) fail(`comparative binding ${binding.claim_id} has unresolved source ${sourceId}`);
        if (binding.source_locators?.[index]?.locator !== source?.locator) fail(`comparative binding ${binding.claim_id} locator mismatch for ${sourceId}`);
      });
      for (const metricId of binding.metric_ids ?? []) if (!metricById.has(metricId)) fail(`comparative binding ${binding.claim_id} has unresolved metric ${metricId}`);
    }
    for (const metric of comparative.metrics ?? []) {
      if (!/^https:\/\//.test(metric.source_url)) fail(`comparative metric ${metric.metric_id} source_url is not HTTPS`);
      if (!metric.source_url || !metric.source_id || !metric.locator || metric.review_state === "") fail(`comparative metric ${metric.metric_id} is missing canonical metadata`);
      const boundSource = [...sourceById.values()].find((source) => source.url === metric.source_url);
      if (!boundSource) fail(`comparative metric ${metric.metric_id} source_url has no comparative source record`);
    }
    const comparativeBlob = JSON.stringify(comparative);
    for (const marker of FLAGSHIP_PRIVATE_MARKERS) {
      if (comparativeBlob.includes(marker)) fail(`private marker "${marker}" found in comparative-gap.json`);
    }
    console.log(`comparative chapter: ${lensIds.size} lenses, ${caseIds.size} mechanisms, ${sourceIds.size} sources`);
  } catch (error) {
    fail(`comparative chapter contract failed: ${error.message}`);
  }
}
const relationshipsPath = join(workspace, "website_content", "content_relationships.json");
if (existsSync(relationshipsPath)) {
  try {
    const relationships = JSON.parse(readFileSync(relationshipsPath, "utf8"));
    if (relationships.updated !== "2026-09-11") fail("content relationship map is not dated 2026-09-11");
    const relationshipSources = new Set(relationships.nodes.flatMap((node) => node.sources ?? []));
    if (!relationshipSources.has("S33")) fail("content relationship map does not bind audited KE source S33");
    if (!relationships.nodes.some((node) => node.id === "comparative-chapter" && node.route === "/comparison#jcx-comparative")) {
      fail("content relationship map does not bind the integrated comparative chapter route");
    }
  } catch {
    fail("content relationship map is not valid JSON");
  }
}

if (failures) {
  console.error(`\ncontent verification FAILED with ${failures} issue(s)`);
  process.exit(1);
}
console.log("content verification PASSED — no leaks, all references resolve, counts agree.");
