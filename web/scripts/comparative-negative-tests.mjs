#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateComparativeData } from "./comparative-contract.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const workspace = join(root, "..");
const read = (path) => JSON.parse(readFileSync(path, "utf8"));
const input = read(join(workspace, "website_content", "public_comparative_chapter.json"));
const sourceRows = readFileSync(join(workspace, "research_v2", "13_gap_completion", "sources_gap.jsonl"), "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));

const expectReject = (label, mutateInput = (value) => value, mutateSources = (value) => value) => {
  const copy = structuredClone(input);
  const sources = structuredClone(sourceRows);
  mutateInput(copy);
  mutateSources(sources);
  try {
    validateComparativeData(copy, sources);
  } catch {
    console.log(`negative test passed: ${label}`);
    return;
  }
  throw new Error(`negative test failed to reject: ${label}`);
};

expectReject("duplicate lens id", (copy) => {
  copy.lenses.push(structuredClone(copy.lenses[0]));
});
expectReject("duplicate case id", (copy) => {
  copy.lenses[1].cases[0].id = copy.lenses[0].cases[0].id;
});
expectReject("unresolved source reference", (copy) => {
  copy.lenses[0].cases[0].source_ids = ["GAP-NOT-REAL"];
});
expectReject("unapproved source reference", (copy) => {
  copy.lenses[0].cases[0].source_ids = ["D07"];
});
expectReject("invalid evidence label", (copy) => {
  copy.lenses[0].cases[0].evidence_label = "Forecast";
});
expectReject("blank rendered case field", (copy) => {
  copy.lenses[0].cases[0].payer = "";
});
expectReject("blank source metadata", undefined, (sources) => {
  sources[0].title = "";
});
expectReject("malformed source locator", undefined, (sources) => {
  sources[0].locator = "";
});
expectReject("unapproved claim insertion", (copy) => {
  copy.claims = [{
    claim_id: "CC-unapproved",
    case_id: copy.lenses[0].cases[0].id,
    statement: "Unreviewed text",
    evidence_label: "Reported",
    locator: "source row",
    source_ids: [copy.lenses[0].cases[0].source_ids[0]],
    metric_ids: [],
  }];
});
expectReject("private/local export marker", (copy) => {
  copy.lenses[0].cases[0].unknown = "See research_v2/private.md";
});
expectReject("duplicate source row", undefined, (sources) => {
  sources.push(structuredClone(sources[0]));
});
expectReject("malformed source URL", undefined, (sources) => {
  sources[0].url = "file:///private/source";
});
console.log("comparative negative tests passed");
