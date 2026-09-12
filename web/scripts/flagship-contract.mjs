#!/usr/bin/env node

import { metricMatchesStatement, PUBLIC_ALLOWLIST } from "./comparative-contract.mjs";

const ALLOWED_LEVELS = new Set(["Official", "Reported", "Company-reported", "Interpretation", "Open question"]);
const ALLOWED_REVIEW_STATES = new Set(["supported", "partly_supported", "company_claim", "access_qualified"]);
const PRIVATE_MARKERS = [
  "Propty",
  "Propman",
  "Sentinel",
  "Jalshiri",
  "Odoo",
  "JCX_Meeting_Dossier",
  "JCX_Meeting_Cheat_Sheet",
  "JCX_Second_Pass_Strategy",
  "5.53",
  "6.5",
  "27 transactions",
  "internal budget",
  "meeting script",
];

const FLAGSHIP_CASE_FIELDS = [
  "name", "model", "geography", "status", "payer", "problem", "workflow", "distribution",
  "funding", "undisclosed", "transfer_note",
];

const exactAllowlist = (actual, approved, label) => {
  const unexpected = [...actual].filter((id) => !approved.has(id));
  if (unexpected.length) throw new Error(`${label} contains unapproved public record(s): ${unexpected.join(", ")}`);
  const missing = [...approved].filter((id) => !actual.has(id));
  if (missing.length) throw new Error(`${label} omits approved public record(s): ${missing.join(", ")}`);
};

const ids = (rows, label) => {
  const seen = new Set();
  for (const row of rows ?? []) {
    if (!row?.id) throw new Error(`${label} row is missing id`);
    if (seen.has(row.id)) throw new Error(`duplicate ${label} id: ${row.id}`);
    seen.add(row.id);
  }
  return seen;
};

const requireString = (value, label) => {
  if (typeof value !== "string" || value.trim() === "") throw new Error(`${label} must be a non-empty string`);
};

const checkRefs = (refs, available, label, { required = false } = {}) => {
  if (!Array.isArray(refs)) throw new Error(`${label} must be an array`);
  if (required && refs.length === 0) throw new Error(`${label} must contain at least one reference`);
  const seen = new Set();
  for (const ref of refs ?? []) {
    if (typeof ref !== "string" || ref.trim() === "") throw new Error(`${label} contains a blank reference`);
    if (seen.has(ref)) throw new Error(`${label} contains duplicate reference: ${ref}`);
    if (!available.has(ref)) throw new Error(`${label} references missing id: ${ref}`);
    seen.add(ref);
  }
};

const scanPrivateMarkers = (data) => {
  const blob = JSON.stringify(data);
  for (const marker of PRIVATE_MARKERS) {
    if (blob.includes(marker)) throw new Error(`public flagship data contains private marker: ${marker}`);
  }
};

export function validateFlagshipData(data, metricsById = new Map()) {
  if (!data || typeof data !== "object") throw new Error("flagship data must be an object");
  requireString(data.chapter_id, "chapter_id");
  requireString(data.title, "title");
  requireString(data.updated, "updated");
  if (data.updated !== "2026-09-09") throw new Error(`flagship chapter date must be 2026-09-09, got ${data.updated}`);

  scanPrivateMarkers(data);

  const sourceIds = ids((data.sources ?? []).map((source) => ({ id: source.id })), "source");
  const caseIds = ids((data.cases ?? []).map((item) => ({ id: item.case_id })), "case");
  const claimIds = ids((data.claims ?? []).map((claim) => ({ id: claim.claim_id })), "claim");
  const conditionIds = ids((data.transfer_conditions ?? []).map((condition) => ({ id: condition.condition_id })), "transfer condition");
  const selectedMetricIds = new Set([
    ...(data.cases ?? []).flatMap((item) => item.metric_ids ?? []),
    ...(data.claims ?? []).flatMap((claim) => claim.metric_ids ?? []),
  ]);
  const metricIds = new Set(metricsById instanceof Map ? metricsById.keys() : Object.keys(metricsById ?? {}));
  const approvedSourceIds = new Set(PUBLIC_ALLOWLIST.flagship_source_ids);
  const approvedCaseIds = new Set(PUBLIC_ALLOWLIST.flagship_case_ids);
  const approvedClaimIds = new Set(PUBLIC_ALLOWLIST.flagship_claim_ids);
  const approvedConditionIds = new Set(PUBLIC_ALLOWLIST.flagship_condition_ids);
  const approvedMetricIds = new Set(PUBLIC_ALLOWLIST.flagship_metric_ids);
  exactAllowlist(sourceIds, approvedSourceIds, "flagship sources");
  exactAllowlist(caseIds, approvedCaseIds, "flagship cases");
  exactAllowlist(claimIds, approvedClaimIds, "flagship claims");
  exactAllowlist(conditionIds, approvedConditionIds, "flagship transfer conditions");
  exactAllowlist(selectedMetricIds, approvedMetricIds, "flagship metric references");

  if (caseIds.size !== 4) throw new Error(`flagship chapter requires four anchor cases, got ${caseIds.size}`);
  if (sourceIds.size < 8) throw new Error(`flagship chapter requires source depth, got ${sourceIds.size} sources`);
  if (conditionIds.size < 5) throw new Error(`flagship chapter requires transfer conditions, got ${conditionIds.size}`);

  for (const source of data.sources ?? []) {
    requireString(source.id, "source id");
    requireString(source.title, `${source.id} title`);
    requireString(source.url, `${source.id} url`);
    if (!/^https:\/\//.test(source.url)) throw new Error(`${source.id} url must be HTTPS`);
    if (!ALLOWED_LEVELS.has(source.level)) throw new Error(`${source.id} has non-canonical evidence level: ${source.level}`);
    requireString(source.period, `${source.id} period`);
    requireString(source.geography, `${source.id} geography`);
    requireString(source.locator, `${source.id} locator`);
    requireString(source.limitation, `${source.id} limitation`);
  }

  for (const item of data.cases ?? []) {
    if (!caseIds.has(item.case_id)) throw new Error(`case missing stable id: ${item.name ?? "unknown"}`);
    for (const field of FLAGSHIP_CASE_FIELDS) {
      requireString(item[field], `${item.case_id}.${field}`);
    }
    checkRefs(item.source_ids, sourceIds, `${item.case_id}.source_ids`, { required: true });
    checkRefs(item.claim_ids, claimIds, `${item.case_id}.claim_ids`, { required: true });
    checkRefs(item.metric_ids, metricIds, `${item.case_id}.metric_ids`, { required: true });
    if (!Array.isArray(item.journey) || item.journey.length === 0) throw new Error(`${item.case_id}.journey must contain at least one event`);
    for (const event of item.journey ?? []) {
      requireString(event.period, `${item.case_id} journey period`);
      requireString(event.event, `${item.case_id} journey event`);
      checkRefs(event.source_ids, sourceIds, `${item.case_id}.journey.source_ids`, { required: true });
      if (!ALLOWED_LEVELS.has(event.evidence_label)) throw new Error(`${item.case_id} journey has non-canonical evidence label`);
    }
  }

  for (const claim of data.claims ?? []) {
    for (const field of ["claim_id", "case_id", "kind", "evidence_label", "period", "statement", "locator", "note"]) {
      requireString(claim[field], `${claim.claim_id ?? "claim"}.${field}`);
    }
    if (!caseIds.has(claim.case_id)) throw new Error(`${claim.claim_id} references missing case: ${claim.case_id}`);
    if (!ALLOWED_LEVELS.has(claim.evidence_label)) throw new Error(`${claim.claim_id} has non-canonical evidence label`);
    checkRefs(claim.source_ids, sourceIds, `${claim.claim_id}.source_ids`, { required: true });
    if (!Array.isArray(claim.metric_ids)) throw new Error(`${claim.claim_id}.metric_ids must be an array`);
    checkRefs(claim.metric_ids, metricIds, `${claim.claim_id}.metric_ids`);
    if (claim.public_status !== undefined && claim.public_status !== "approved_public") {
      throw new Error(`${claim.claim_id} is not approved for publication`);
    }
  }

  for (const condition of data.transfer_conditions ?? []) {
    for (const field of ["condition_id", "dimension", "anchor_observation", "bangladesh_question", "what_evidence_is_missing"]) {
      requireString(condition[field], `${condition.condition_id ?? "condition"}.${field}`);
    }
    checkRefs(condition.source_ids, sourceIds, `${condition.condition_id}.source_ids`, { required: true });
    if (!Array.isArray(condition.claim_ids)) throw new Error(`${condition.condition_id}.claim_ids must be an array`);
    checkRefs(condition.claim_ids, claimIds, `${condition.condition_id}.claim_ids`);
  }

  const sourceById = new Map((data.sources ?? []).map((source) => [source.id, source]));
  const caseById = new Map((data.cases ?? []).map((item) => [item.case_id, item]));
  for (const metricId of selectedMetricIds) {
    const metric = metricsById instanceof Map ? metricsById.get(metricId) : metricsById?.[metricId];
    if (!metric) throw new Error(`selected metric ${metricId} is missing from reviewed metrics`);
    for (const field of ["metric_id", "entity_id", "model", "geography", "period", "unit", "scope", "source_id", "source_url", "locator", "review_state", "evidence_label", "note"]) {
      if (!(field in metric)) throw new Error(`reviewed metric ${metricId} is missing ${field}`);
    }
    if (metric.value === "" || metric.value === null || metric.value === undefined) throw new Error(`reviewed metric ${metricId} has a blank value`);
    if (!ALLOWED_REVIEW_STATES.has(metric.review_state)) throw new Error(`metric ${metricId} is not reviewed: ${metric.review_state}`);
    if (!ALLOWED_LEVELS.has(metric.evidence_label)) throw new Error(`metric ${metricId} has non-canonical evidence label`);
    if (!/^https:\/\//.test(metric.source_url)) throw new Error(`metric ${metricId} source_url must be HTTPS`);
    if (!/^S\d+$/.test(metric.source_id)) throw new Error(`metric ${metricId} must bind to the reviewed S source register`);
    const owners = [...caseById.values()].filter((item) => item.metric_ids?.includes(metricId));
    const ownerSourceUrls = owners.flatMap((item) => item.source_ids.map((sourceId) => sourceById.get(sourceId)?.url)).filter(Boolean);
    if (!ownerSourceUrls.includes(metric.source_url)) throw new Error(`metric ${metricId} source_url does not match its case source record`);
  }

  if (data.field_bindings !== undefined) {
    if (!Array.isArray(data.field_bindings)) throw new Error("flagship field_bindings must be an array");
    const seenBindings = new Set();
    for (const binding of data.field_bindings) {
      for (const field of ["claim_id", "case_id", "field", "statement", "evidence_label", "locator"]) requireString(binding[field], `flagship binding ${binding.claim_id ?? "(missing)"}.${field}`);
      if (!caseById.has(binding.case_id)) throw new Error(`flagship binding references missing case: ${binding.case_id}`);
      if (!FLAGSHIP_CASE_FIELDS.includes(binding.field)) throw new Error(`flagship binding has unknown field: ${binding.field}`);
      const key = `${binding.case_id}:${binding.field}`;
      if (seenBindings.has(key)) throw new Error(`duplicate flagship field binding: ${key}`);
      seenBindings.add(key);
      if (binding.public_status !== "approved_public") throw new Error(`flagship binding is not approved: ${binding.claim_id}`);
      if (!ALLOWED_LEVELS.has(binding.evidence_label)) throw new Error(`flagship binding has invalid evidence label: ${binding.claim_id}`);
      checkRefs(binding.source_ids, sourceIds, `${binding.claim_id}.source_ids`, { required: true });
      if (!Array.isArray(binding.metric_ids)) throw new Error(`${binding.claim_id}.metric_ids must be an array`);
      checkRefs(binding.metric_ids, metricIds, `${binding.claim_id}.metric_ids`);
      if (binding.numeric_binding !== undefined && !["reviewed_metric_available", "source_text_only", "not_applicable"].includes(binding.numeric_binding)) {
        throw new Error(`flagship binding has invalid numeric_binding: ${binding.claim_id}`);
      }
    }
    for (const item of caseById.values()) for (const field of FLAGSHIP_CASE_FIELDS) {
      if (!seenBindings.has(`${item.case_id}:${field}`)) throw new Error(`${item.case_id} is missing field binding: ${field}`);
    }
  }

  return { sourceIds, caseIds, claimIds, conditionIds };
}

export function buildFlagshipExport(input, metrics) {
  const metricsById = new Map(metrics.map((metric) => [metric.metric_id, metric]));
  validateFlagshipData(input, metricsById);
  const selected = new Set();
  for (const item of input.cases ?? []) for (const metricId of item.metric_ids ?? []) selected.add(metricId);
  for (const claim of input.claims ?? []) for (const metricId of claim.metric_ids ?? []) selected.add(metricId);
  const resolved = [...selected].map((metricId) => metricsById.get(metricId)).filter(Boolean);
  if (resolved.length !== selected.size) {
    const missing = [...selected].filter((metricId) => !metricsById.has(metricId));
    throw new Error(`flagship metric selection missing reviewed rows: ${missing.join(", ")}`);
  }
  const sourceById = new Map((input.sources ?? []).map((source) => [source.id, source]));
  const fieldBindings = [];
  for (const item of input.cases ?? []) {
    const sourceLocators = item.source_ids.map((sourceId) => ({ source_id: sourceId, locator: sourceById.get(sourceId).locator }));
    for (const field of FLAGSHIP_CASE_FIELDS) {
      const statement = String(item[field]);
      const hasNumber = /(?:\d|[$£€₹]|RMB|INR|BDT|USD|EUR|GBP|million|billion|percent|%)/i.test(statement);
      const fieldMetrics = hasNumber
        ? item.metric_ids.filter((metricId) => {
          const metric = resolved.find((candidate) => candidate.metric_id === metricId);
          return metric ? metricMatchesStatement(metric, statement) : false;
        })
        : [];
      fieldBindings.push({
        claim_id: `FB-${item.case_id}-${field}`,
        case_id: item.case_id,
        field,
        statement,
        evidence_label: "Interpretation",
        public_status: "approved_public",
        locator: sourceLocators.map((entry) => `${entry.source_id}: ${entry.locator}`).join("; "),
        source_ids: [...item.source_ids],
        source_locators: sourceLocators,
        metric_ids: fieldMetrics,
        numeric_binding: hasNumber ? (fieldMetrics.length ? "reviewed_metric_available" : "source_text_only") : "not_applicable",
      });
    }
  }
  const claims = (input.claims ?? []).map((claim) => ({ ...claim, public_status: "approved_public" }));
  const output = { ...input, claims, metrics: resolved, field_bindings: fieldBindings };
  validateFlagshipData(output, new Map(resolved.map((metric) => [metric.metric_id, metric])));
  return output;
}

export { PRIVATE_MARKERS };
