import {
  filterProperties,
  properties,
  type Property,
  type PropertyQuery,
} from "./propty-demo";
import { matchesHomeText } from "./propty-search";

export type CloseMatch = {
  property: Property;
  matched: string[];
  differences: string[];
};

const FEATURE_ALIASES: Record<string, string> = {
  balcony: "balcony", balconies: "balcony", parking: "parking", car: "parking",
  lift: "lift", elevator: "lift", study: "study", dining: "dining",
  family: "family", utility: "utility",
};

function featurePresent(p: Property, feature: string) {
  return p.features.some((raw) => {
    const s = raw.toLowerCase();
    if (feature === "parking") return /parking/.test(s) && !/planned/.test(s);
    if (feature === "lift") return /lift|elevator/.test(s) && !/planned/.test(s);
    if (feature === "study") return /study/.test(s);
    if (feature === "dining") return /dining/.test(s);
    if (feature === "family") return /family/.test(s);
    return s.includes(feature);
  });
}

/** Return at most three clearly labelled, single-compromise alternatives. */
export function getCloseMatches(
  query: PropertyQuery,
  terms: string[],
  unsupported: string[] = [],
  source: Property[] = properties,
): CloseMatch[] {
  if (unsupported.length || (!query.area && query.budget === undefined && query.bedrooms === undefined && !terms.length)) return [];
  if (unsupported.some((x) => /pool|garden|not|without|exclude|rent|commercial|exact|maximum|minimum/i.test(x))) return [];
  const exactIds = new Set(filterProperties(query, source).filter((p) => matchesHomeText(p, terms)).map((p) => p.id));
  const requestedFeatures = [...new Set(terms.map((t) => FEATURE_ALIASES[t.toLowerCase()]).filter(Boolean))];
  const unknownTerms = terms.filter((t) => !FEATURE_ALIASES[t.toLowerCase()] && !/^(home|house|apartment|flat)$/i.test(t));
  if (unknownTerms.length) return [];
  const candidates: Array<CloseMatch & { cost: number; tie: number }> = [];
  for (const p of source) {
    if (exactIds.has(p.id)) continue;
    if (query.area && !/^(all|any|all areas)$/i.test(query.area) && p.area.toLowerCase() !== query.area.toLowerCase()) continue;
    if (query.readyOnly && p.status !== "Ready") continue;
    const missing = requestedFeatures.filter((f) => !featurePresent(p, f));
    const overBudget = query.budget !== undefined && p.price > query.budget;
    const fewerBeds = query.bedrooms !== undefined && p.bedrooms < query.bedrooms;
    const dimensions = Number(missing.length > 0) + Number(overBudget) + Number(fewerBeds);
    if (dimensions > 1 || (overBudget && p.price > query.budget! * 1.1) || (fewerBeds && p.bedrooms < query.bedrooms! - 1)) continue;
    const differences: string[] = [];
    if (overBudget) differences.push(`BDT ${p.price - query.budget!} above your budget`);
    if (fewerBeds) differences.push("One fewer bedroom");
    for (const f of missing) differences.push(f === "parking" ? "Parking not listed" : `${f[0].toUpperCase()}${f.slice(1)} not listed`);
    const matched = requestedFeatures.filter((f) => featurePresent(p, f));
    const cost = differences.length;
    candidates.push({ property: p, matched, differences, cost, tie: p.price });
  }
  return candidates.sort((a, b) => a.cost - b.cost || a.tie - b.tie || a.property.id.localeCompare(b.property.id)).slice(0, 3).map(({ property, matched, differences }) => ({ property, matched, differences }));
}
