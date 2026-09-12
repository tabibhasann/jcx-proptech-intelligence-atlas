#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateFlagshipData } from "./flagship-contract.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const workspace = join(root, "..");
const read = (path) => JSON.parse(readFileSync(path, "utf8"));
const metrics = readFileSync(join(workspace, "research_v2", "02_evidence_library", "metrics_reviewed.jsonl"), "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line));
const metricMap = new Map(metrics.map((metric) => [metric.metric_id, metric]));
const input = read(join(workspace, "research_v2", "02_evidence_library", "flagship_chapter_public.json"));

const expectReject = (label, mutate) => {
  const copy = structuredClone(input);
  mutate(copy);
  try {
    validateFlagshipData(copy, metricMap);
  } catch {
    console.log(`negative test passed: ${label}`);
    return;
  }
  throw new Error(`negative test failed to reject: ${label}`);
};

expectReject("missing source reference", (copy) => {
  copy.cases[0].source_ids = ["F-NOT-REAL"];
});
expectReject("blank rendered case field", (copy) => {
  copy.cases[0].payer = "";
});
expectReject("blank source metadata", (copy) => {
  copy.sources[0].locator = "";
});
expectReject("unapproved claim insertion", (copy) => {
  copy.claims.push({
    claim_id: "FC-UNAPPROVED",
    case_id: copy.cases[0].case_id,
    kind: "fact",
    evidence_label: "Reported",
    period: "2026",
    statement: "Unreviewed text",
    source_ids: [copy.cases[0].source_ids[0]],
    metric_ids: [],
    locator: "source row",
    note: "not approved",
  });
});
expectReject("private marker export", (copy) => {
  copy.cases[0].undisclosed = "Propman status is private";
});

const expectMetricReject = (label, mutate) => {
  const copy = structuredClone(input);
  const metricRows = structuredClone(metrics);
  mutate(metricRows);
  try {
    validateFlagshipData(copy, new Map(metricRows.map((metric) => [metric.metric_id, metric])));
  } catch {
    console.log(`negative test passed: ${label}`);
    return;
  }
  throw new Error(`negative test failed to reject: ${label}`);
};

expectMetricReject("wrong metric-source URL", (rows) => {
  rows.find((metric) => metric.metric_id === "rightmove_revenue_fy2024").source_url = "https://example.com/unrelated";
});
console.log("flagship negative tests passed");
