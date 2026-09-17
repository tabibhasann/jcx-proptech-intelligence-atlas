import {
  filterProperties,
  formatPrice,
  getTransaction,
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
  balcony: "balcony", balconies: "balcony", parking: "parking", park: "parking",
  lift: "lift", elevator: "lift", study: "study", "separate dining": "separate dining", "open living and dining": "open living and dining",
  family: "family", utility: "utility",
};

function featurePresent(p: Property, feature: string) {
  return p.features.some((raw) => {
    const s = raw.toLowerCase().replaceAll("balconies", "balcony");
    if (feature === "parking") return /parking/.test(s) && !/planned/.test(s);
    if (feature === "lift") return /lift|elevator/.test(s) && !/planned/.test(s);
    if (feature === "study") return /study/.test(s);
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
  const hasQueryConstraint = Object.values(query).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== undefined,
  );
  if (unsupported.length || (!hasQueryConstraint && !terms.length)) return [];
  const exactIds = new Set(filterProperties(query, source).filter((p) => matchesHomeText(p, terms)).map((p) => p.id));
  const transaction = query.transaction ?? "buy";
  const requestedFeatures = [...new Set([
    ...(query.amenities || []).map((feature) => FEATURE_ALIASES[feature.toLowerCase()] || feature.toLowerCase()),
    ...terms.map((t) => FEATURE_ALIASES[t.toLowerCase()]),
  ].filter(Boolean))] as string[];
  const unknownTerms = terms.filter((t) => !FEATURE_ALIASES[t.toLowerCase()]);
  if (unknownTerms.length) return [];
  const candidates: Array<CloseMatch & { cost: number; tie: number }> = [];
  const seen = new Set<string>();
  for (const p of source) {
    if (seen.has(p.id) || exactIds.has(p.id)) continue;
    seen.add(p.id);
    if (getTransaction(p) !== transaction) continue;
    if (query.area && !/^(all|any|all areas)$/i.test(query.area.trim()) && p.area.toLowerCase() !== query.area.trim().toLowerCase()) continue;
    if (query.readyOnly && p.status !== "Ready") continue;
    if (query.minSqft !== undefined && p.sqft < query.minSqft) continue;
    if (query.maxSqft !== undefined && p.sqft > query.maxSqft) continue;
    if (query.bathrooms !== undefined && p.bathrooms < query.bathrooms) continue;
    if (query.furnishing && p.rental?.furnishing?.toLowerCase() !== query.furnishing.trim().toLowerCase()) continue;
    if (query.availableNow) {
      const today = new Date().toISOString().slice(0, 10);
      if (getTransaction(p) !== "rent" || !p.rental || p.rental.availableFrom > today) continue;
    }
    if (query.newProjectsOnly && p.newProject !== true) continue;
    const missing = requestedFeatures.filter((f) => !featurePresent(p, f));
    const overBudget = query.budget !== undefined && p.price > query.budget;
    const fewerBeds = query.bedrooms !== undefined && p.bedrooms < query.bedrooms;
    const dimensions = missing.length + Number(overBudget) + Number(fewerBeds);
    if (dimensions !== 1 || (overBudget && p.price > query.budget! * 1.1) || (fewerBeds && p.bedrooms < query.bedrooms! - 1)) continue;
    const differences: string[] = [];
    if (overBudget) differences.push(`${formatPrice(p.price - query.budget!)} above your budget`);
    if (fewerBeds) differences.push("One fewer bedroom");
    for (const f of missing) differences.push(f === "parking" ? "Parking not listed" : `${f[0].toUpperCase()}${f.slice(1)} not listed`);
    const matched = [
      ...(query.area && !/^(all|any|all areas)$/i.test(query.area.trim()) ? [p.area] : []),
      ...(query.budget !== undefined && !overBudget ? ["Within budget"] : []),
      ...(query.bedrooms !== undefined && !fewerBeds ? [`${p.bedrooms} bedrooms`] : []),
      ...(query.readyOnly ? ["Ready"] : []),
      ...requestedFeatures.filter((f) => featurePresent(p, f)).map((f) => f[0].toUpperCase() + f.slice(1)),
    ];
    const cost = overBudget ? (p.price - query.budget!) / query.budget! : fewerBeds ? 0.25 : 0.2;
    candidates.push({ property: p, matched, differences, cost, tie: p.price });
  }
  return candidates.sort((a, b) => a.cost - b.cost || a.tie - b.tie || a.property.id.localeCompare(b.property.id)).slice(0, 3).map(({ property, matched, differences }) => ({ property, matched, differences }));
}
