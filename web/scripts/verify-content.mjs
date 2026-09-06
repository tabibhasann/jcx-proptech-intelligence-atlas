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
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const corpus = join(root, "..", "data");
const gen = join(root, "src", "data", "generated");
const read = (dir, f) => JSON.parse(readFileSync(join(dir, f), "utf8"));

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

if (failures) {
  console.error(`\ncontent verification FAILED with ${failures} issue(s)`);
  process.exit(1);
}
console.log("content verification PASSED — no leaks, all references resolve, counts agree.");
