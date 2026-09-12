#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const PUBLIC_ALLOWLIST = JSON.parse(readFileSync(join(here, "public-allowlist.json"), "utf8"));

export const COMPARATIVE_EVIDENCE_LABELS = new Set([
  "Official",
  "Reported",
  "Company-reported",
  "Interpretation",
  "Open question",
]);

/* These are the fields rendered as factual case prose. A case is not
 * publishable merely because it has a name and a bibliography. Every field
 * must carry a non-empty value and is bound to an explicit claim record in
 * the generated export below. */
export const COMPARATIVE_CASE_FIELDS = [
  "name",
  "geography",
  "mechanism",
  "customer",
  "payer",
  "workflow",
  "human_burden",
  "journey",
  "monetization",
  "result",
  "capital",
  "failure_or_limit",
  "unknown",
  "transfer_test",
];

export const COMPARATIVE_SOURCE_FIELDS = [
  "source_id",
  "title",
  "url",
  "publisher",
  "source_date",
  "accessed",
  "source_class",
  "evidence_grade",
  "locator",
  "notes",
];

const UNKNOWN_VALUES = new Set([
  "unknown",
  "not stated",
  "not recorded",
  "not disclosed",
  "not available",
  "n/a",
]);

/* Client-private markers are concrete and scoped. Generic words such as
 * "developer" or a number are not blacklisted because they are legitimate
 * public research content. */
const PRIVATE_MARKERS = /(?:research_v2[\\/]|JCX_Meeting_Dossier|JCX_Meeting_Cheat_Sheet|JCX_Second_Pass_Strategy|JCX_Meeting_Notes_Template|Propman|Sentinel|Jalshiri|jcxbd\.com|odoo\.com|talk track|meeting script|phone number \(Landowner\)|Size of the land)/i;

const requireNonEmpty = (value, label, { allowUnknown = false } = {}) => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a non-empty string`);
  }
  if (!allowUnknown && UNKNOWN_VALUES.has(value.trim().toLowerCase())) {
    throw new Error(`${label} cannot be an intentional unknown here`);
  }
};

const asSet = (values, label) => {
  if (!Array.isArray(values)) throw new Error(`${label} allowlist must be an array`);
  return new Set(values);
};

const exactAllowlist = (actual, approved, label) => {
  const unexpected = [...actual].filter((id) => !approved.has(id));
  if (unexpected.length) throw new Error(`${label} contains unapproved public record(s): ${unexpected.join(", ")}`);
  const missing = [...approved].filter((id) => !actual.has(id));
  if (missing.length) throw new Error(`${label} omits approved public record(s): ${missing.join(", ")}`);
};

const canonicalHttps = (url, label) => {
  requireNonEmpty(url, label);
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`${label} must be a valid URL`);
  }
  if (parsed.protocol !== "https:") throw new Error(`${label} must use HTTPS`);
  if (parsed.username || parsed.password) throw new Error(`${label} must not contain credentials`);
  return parsed.href;
};

export const metricMatchesStatement = (metric, statement) => {
  const text = String(statement).toLowerCase();
  const raw = String(metric?.value ?? "").trim().toLowerCase();
  if (!raw) return false;
  if (typeof metric.value !== "number") return text.includes(raw);
  const normalized = raw.replace(/,/g, "");
  if (!/^[-+]?\d+(?:\.\d+)?$/.test(normalized)) return false;
  const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Avoid treating the year 2025 as evidence for a metric whose value is 5.
  return new RegExp(`(?<!\\d)${escaped}(?!\\d)`).test(text.replace(/,/g, ""));
};

const checkRefs = (refs, available, label, { required = false } = {}) => {
  if (!Array.isArray(refs)) throw new Error(`${label} must be an array`);
  if (required && refs.length === 0) throw new Error(`${label} must contain at least one reference`);
  const seen = new Set();
  for (const ref of refs) {
    requireNonEmpty(ref, `${label} item`);
    if (seen.has(ref)) throw new Error(`${label} contains duplicate reference: ${ref}`);
    if (!available.has(ref)) throw new Error(`${label} references missing id: ${ref}`);
    seen.add(ref);
  }
};

const scanPrivateMarkers = (data) => {
  const blob = JSON.stringify(data);
  const match = blob.match(PRIVATE_MARKERS);
  if (match) throw new Error(`comparative public handoff contains private/local marker: ${match[0]}`);
};

function validateSourceRows(sourceRows, approvedSourceIds) {
  if (!Array.isArray(sourceRows)) throw new Error("comparative source rows must be an array");
  const sourceById = new Map();
  for (const source of sourceRows) {
    for (const field of COMPARATIVE_SOURCE_FIELDS) {
      // Date and access timestamps may be unavailable, but the state must be
      // explicit ("not stated" / "not recorded"), never a blank cell.
      requireNonEmpty(source?.[field], `comparative source ${source?.source_id ?? "(missing)"}.${field}`, {
        allowUnknown: field === "source_date" || field === "accessed",
      });
    }
    if (sourceById.has(source.source_id)) throw new Error(`duplicate comparative source id: ${source.source_id}`);
    canonicalHttps(source.url, `comparative source ${source.source_id}.url`);
    if (PRIVATE_MARKERS.test(JSON.stringify(source))) {
      throw new Error(`comparative source ${source.source_id} contains a private/local marker`);
    }
    sourceById.set(source.source_id, source);
  }
  return sourceById;
}

function validateFieldBindings(bindings, caseById, sourceById, metricsById = new Map()) {
  if (!Array.isArray(bindings)) throw new Error("comparative field_bindings must be an array");
  const seen = new Set();
  for (const binding of bindings) {
    for (const field of ["claim_id", "case_id", "field", "statement", "evidence_label", "review_state", "locator"]) {
      requireNonEmpty(binding?.[field], `comparative binding ${binding?.claim_id ?? "(missing)"}.${field}`, { allowUnknown: field === "review_state" || field === "field" });
    }
    if (!caseById.has(binding.case_id)) throw new Error(`comparative binding references missing case: ${binding.case_id}`);
    if (!COMPARATIVE_CASE_FIELDS.includes(binding.field)) throw new Error(`comparative binding has unknown field: ${binding.field}`);
    const key = `${binding.case_id}:${binding.field}`;
    if (seen.has(key)) throw new Error(`duplicate comparative field binding: ${key}`);
    seen.add(key);
    if (!COMPARATIVE_EVIDENCE_LABELS.has(binding.evidence_label)) throw new Error(`comparative binding has invalid evidence label: ${binding.claim_id}`);
    checkRefs(binding.source_ids, new Set(sourceById.keys()), `${binding.claim_id}.source_ids`, { required: true });
    if (!Array.isArray(binding.source_locators) || binding.source_locators.length !== binding.source_ids.length) {
      throw new Error(`${binding.claim_id}.source_locators must mirror source_ids`);
    }
    binding.source_locators.forEach((entry, index) => {
      if (!entry || entry.source_id !== binding.source_ids[index]) throw new Error(`${binding.claim_id}.source_locators order does not match source_ids`);
      requireNonEmpty(entry.locator, `${binding.claim_id}.${entry.source_id}.locator`);
      if (entry.locator !== sourceById.get(entry.source_id).locator) throw new Error(`${binding.claim_id} locator does not match canonical source row ${entry.source_id}`);
    });
    if (!Array.isArray(binding.metric_ids)) throw new Error(`${binding.claim_id}.metric_ids must be an array`);
    for (const metricId of binding.metric_ids) {
      if (!metricsById.has(metricId)) throw new Error(`${binding.claim_id} references missing reviewed metric: ${metricId}`);
    }
  }

  for (const item of caseById.values()) {
    for (const field of COMPARATIVE_CASE_FIELDS) {
      if (!seen.has(`${item.id}:${field}`)) throw new Error(`comparative case ${item.id} is missing field binding: ${field}`);
    }
  }
}

/**
 * Fail-closed validation for the public comparative handoff. The optional
 * third argument is used by the builder after reviewed metrics are loaded.
 * Keeping it optional preserves a small, useful contract for negative tests.
 */
export function validateComparativeData(input, sourceRows, options = {}) {
  if (!input || typeof input !== "object" || !Array.isArray(input.lenses)) {
    throw new Error("comparative handoff must contain lenses");
  }
  scanPrivateMarkers(input);

  const allowlist = options.allowlist ?? PUBLIC_ALLOWLIST;
  const approvedLensIds = asSet(allowlist.comparative_lens_ids, "comparative lens");
  const approvedCaseIds = asSet(allowlist.comparative_case_ids, "comparative case");
  const approvedSourceIds = asSet(allowlist.comparative_source_ids, "comparative source");
  const sourceById = validateSourceRows(sourceRows, approvedSourceIds);
  const metricRows = options.metrics ?? [];
  const metricsById = metricRows instanceof Map ? metricRows : new Map(metricRows.map((metric) => [metric.metric_id, metric]));

  const lensIds = new Set();
  const caseIds = new Set();
  for (const lens of input.lenses) {
    requireNonEmpty(lens?.id, "comparative lens id");
    if (lensIds.has(lens.id)) throw new Error(`duplicate comparative lens id: ${lens.id}`);
    lensIds.add(lens.id);
    if (!approvedLensIds.has(lens.id)) throw new Error(`comparative lens is not approved for publication: ${lens.id}`);
    for (const field of ["eyebrow", "title", "question", "summary", "transfer"]) requireNonEmpty(lens[field], `comparative lens ${lens.id}.${field}`);
    if (!Array.isArray(lens.flow) || lens.flow.length < 2 || lens.flow.some((step) => typeof step !== "string" || step.trim() === "")) {
      throw new Error(`comparative lens ${lens.id}.flow must contain at least two non-empty steps`);
    }
    if (!Array.isArray(lens.cases) || lens.cases.length === 0) throw new Error(`comparative lens ${lens.id} is missing cases`);
    for (const item of lens.cases) {
      requireNonEmpty(item?.id, "comparative case id");
      if (caseIds.has(item.id)) throw new Error(`duplicate comparative case id: ${item.id}`);
      caseIds.add(item.id);
      if (!approvedCaseIds.has(item.id)) throw new Error(`comparative case is not approved for publication: ${item.id}`);
      for (const field of COMPARATIVE_CASE_FIELDS) {
        requireNonEmpty(item[field], `${item.id}.${field}`, { allowUnknown: field === "unknown" });
      }
      if (!COMPARATIVE_EVIDENCE_LABELS.has(item.evidence_label)) throw new Error(`invalid comparative evidence label: ${item.id}`);
      checkRefs(item.source_ids, sourceById, `${item.id}.source_ids`, { required: true });
      if (item.source_ids.some((sourceId) => !approvedSourceIds.has(sourceId))) {
        throw new Error(`comparative case ${item.id} references a source not approved for publication`);
      }
    }
  }

  exactAllowlist(lensIds, approvedLensIds, "comparative lenses");
  exactAllowlist(caseIds, approvedCaseIds, "comparative cases");

  if (input.definitions !== undefined) {
    if (!Array.isArray(input.definitions)) throw new Error("comparative definitions must be an array");
    for (const definition of input.definitions) {
      requireNonEmpty(definition?.term, "comparative definition term");
      requireNonEmpty(definition?.meaning, `${definition.term}.meaning`);
    }
  }
  if (input.public_boundary !== undefined) {
    if (!Array.isArray(input.public_boundary) || input.public_boundary.some((item) => typeof item !== "string" || item.trim() === "")) {
      throw new Error("comparative public_boundary must contain non-empty strings");
    }
  }

  // If an editor supplies explicit claims, they must opt in to the public
  // promotion state. An unknown or unapproved claim cannot ride along in the
  // handoff simply because it has a source URL.
  if (input.claims !== undefined) {
    if (!Array.isArray(input.claims)) throw new Error("comparative claims must be an array");
    const claimIds = new Set();
    for (const claim of input.claims) {
      requireNonEmpty(claim?.claim_id, "comparative claim id");
      if (claimIds.has(claim.claim_id)) throw new Error(`duplicate comparative claim id: ${claim.claim_id}`);
      claimIds.add(claim.claim_id);
      if (claim.public_status !== "approved_public") throw new Error(`comparative claim is not approved for publication: ${claim.claim_id}`);
      if (!caseIds.has(claim.case_id)) throw new Error(`comparative claim references missing case: ${claim.claim_id}`);
      requireNonEmpty(claim.statement, `${claim.claim_id}.statement`);
      requireNonEmpty(claim.locator, `${claim.claim_id}.locator`);
      if (!COMPARATIVE_EVIDENCE_LABELS.has(claim.evidence_label)) throw new Error(`comparative claim has invalid evidence label: ${claim.claim_id}`);
      checkRefs(claim.source_ids, sourceById, `${claim.claim_id}.source_ids`, { required: true });
      if (!Array.isArray(claim.metric_ids)) throw new Error(`${claim.claim_id}.metric_ids must be an array`);
      for (const metricId of claim.metric_ids) if (!metricsById.has(metricId)) throw new Error(`${claim.claim_id} references missing metric: ${metricId}`);
    }
  }

  const caseById = new Map([...caseIds].map((id) => [id, [...input.lenses.flatMap((lens) => lens.cases)].find((item) => item.id === id)]));
  if (input.field_bindings !== undefined) validateFieldBindings(input.field_bindings, caseById, sourceById, metricsById);

  return { lensIds, caseIds, sourceById, metricsById };
}

/**
 * Materialize one stable public claim record for every rendered comparative
 * field. This leaves the authored prose readable while giving a reader and
 * the UI a direct sentence -> source locator path. Reviewed metrics are joined
 * by canonical URL; unmatched numeric prose is retained but marked as
 * source-text-only so it cannot be mistaken for a reviewed metric.
 */
export function buildComparativeBindings(input, sourceRows, reviewedMetrics = []) {
  const validated = validateComparativeData(input, sourceRows, { metrics: reviewedMetrics });
  const metricsByUrl = new Map();
  for (const metric of reviewedMetrics) {
    if (typeof metric?.metric_id !== "string" || typeof metric?.source_url !== "string") continue;
    const url = canonicalHttps(metric.source_url, `${metric.metric_id}.source_url`);
    if (!metricsByUrl.has(url)) metricsByUrl.set(url, []);
    metricsByUrl.get(url).push(metric);
  }
  const fieldBindings = [];
  for (const lens of input.lenses) {
    for (const item of lens.cases) {
      for (const field of COMPARATIVE_CASE_FIELDS) {
        const value = String(item[field]);
        const sourceLocators = item.source_ids.map((sourceId) => ({ source_id: sourceId, locator: validated.sourceById.get(sourceId).locator }));
        const hasNumber = /(?:\d|[$£€₹]|RMB|INR|BDT|USD|EUR|GBP|million|billion|percent|%)/i.test(value);
        const matchedMetrics = item.source_ids
          .flatMap((sourceId) => metricsByUrl.get(validated.sourceById.get(sourceId).url) ?? [])
          .filter((metric, index, all) => all.findIndex((candidate) => candidate.metric_id === metric.metric_id) === index)
          .filter((metric) => metricMatchesStatement(metric, value))
          .map((metric) => metric.metric_id)
          .filter(() => hasNumber);
        fieldBindings.push({
          claim_id: `CC-${item.id}-${field}`,
          case_id: item.id,
          field,
          statement: value,
          evidence_label: item.evidence_label,
          review_state: "approved_public",
          locator: sourceLocators.map((entry) => `${entry.source_id}: ${entry.locator}`).join("; "),
          source_ids: [...item.source_ids],
          source_locators: sourceLocators,
          metric_ids: matchedMetrics,
          numeric_binding: hasNumber ? (matchedMetrics.length ? "reviewed_metric_available" : "source_text_only") : "not_applicable",
        });
      }
    }
  }
  // Validate the materialized result as well, so a future builder edit cannot
  // emit an unbound field while the input contract remains green.
  validateFieldBindings(fieldBindings, new Map(input.lenses.flatMap((lens) => lens.cases).map((item) => [item.id, item])), validated.sourceById, validated.metricsById);
  return fieldBindings;
}

export { PRIVATE_MARKERS };
