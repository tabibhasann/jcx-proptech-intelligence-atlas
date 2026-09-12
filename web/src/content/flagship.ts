import flagshipJson from "@/data/generated/flagship-chapter.json";

export type FlagshipEvidenceLevel = "Official" | "Reported" | "Company-reported" | "Interpretation" | "Open question";

export type FlagshipMetric = {
  metric_id: string;
  entity_id: string;
  initiative_id: string;
  model: string;
  geography: string;
  period: string;
  value: string | number;
  unit: string;
  currency: string | null;
  denominator: string | null;
  scope: string;
  source_id: string;
  source_url: string;
  locator: string;
  review_state: string;
  evidence_label: FlagshipEvidenceLevel;
  note: string;
};

export type FlagshipSource = {
  id: string;
  title: string;
  url: string;
  level: FlagshipEvidenceLevel;
  period: string;
  geography: string;
  locator: string;
  limitation: string;
};

export type FlagshipClaim = {
  claim_id: string;
  case_id: string;
  kind: string;
  evidence_label: FlagshipEvidenceLevel;
  period: string;
  statement: string;
  source_ids: string[];
  metric_ids: string[];
  locator: string;
  note: string;
};

export type FlagshipCase = {
  case_id: string;
  name: string;
  model: string;
  geography: string;
  status: string;
  payer: string;
  problem: string;
  workflow: string;
  distribution: string;
  journey: { period: string; event: string; source_ids: string[]; evidence_label: FlagshipEvidenceLevel }[];
  metric_ids: string[];
  claim_ids: string[];
  funding: string;
  undisclosed: string;
  transfer_note: string;
  source_ids: string[];
};

export type FlagshipTransferCondition = {
  condition_id: string;
  dimension: string;
  anchor_observation: string;
  bangladesh_question: string;
  what_evidence_is_missing: string;
  source_ids: string[];
  claim_ids: string[];
};

export type FlagshipChapter = {
  chapter_id: string;
  title: string;
  updated: string;
  scope: string;
  archive_boundary: string;
  sources: FlagshipSource[];
  cases: FlagshipCase[];
  claims: FlagshipClaim[];
  transfer_conditions: FlagshipTransferCondition[];
  synthesis: { supports: string[]; contradicts: string[]; cannot_infer: string[] };
  metrics: FlagshipMetric[];
};

export const flagshipChapter = flagshipJson as unknown as FlagshipChapter;
export const flagshipSourceById = Object.fromEntries(flagshipChapter.sources.map((source) => [source.id, source]));
export const flagshipCaseById = Object.fromEntries(flagshipChapter.cases.map((item) => [item.case_id, item]));
export const flagshipClaimById = Object.fromEntries(flagshipChapter.claims.map((claim) => [claim.claim_id, claim]));
export const flagshipMetricById = Object.fromEntries(flagshipChapter.metrics.map((metric) => [metric.metric_id, metric]));

const numberFormat = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });

export function formatFlagshipMetric(metricId: string) {
  const metric = flagshipMetricById[metricId];
  if (!metric) return "Not disclosed";
  if (metric.unit === "status") return String(metric.value);
  if (metric.unit === "million GBP") return `£${numberFormat.format(Number(metric.value))}m`;
  if (metric.unit === "million INR") return `INR ${numberFormat.format(Number(metric.value))}m`;
  if (metric.unit === "percent" || metric.unit === "percent change") return `${numberFormat.format(Number(metric.value))}%`;
  if (metric.unit === "downloads claimed") return `${(Number(metric.value) / 1_000_000).toFixed(1)}m+`;
  if (metric.unit === "property agents claimed") return `${Math.round(Number(metric.value) / 1_000)}k+`;
  if (metric.unit === "quality property listings claimed") return `${(Number(metric.value) / 1_000_000).toFixed(1)}m+`;
  if (metric.unit.includes("per advertiser") || metric.unit.includes("per development")) return `£${numberFormat.format(Number(metric.value))} / month`;
  if (typeof metric.value === "number") return numberFormat.format(metric.value);
  return String(metric.value);
}

export function metricLabel(metricId: string) {
  const metric = flagshipMetricById[metricId];
  if (!metric) return "Metric not disclosed";
  return `${metric.scope} · ${metric.period}`;
}
