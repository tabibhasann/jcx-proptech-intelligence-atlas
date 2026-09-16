import {
  propertyAreas,
  type Property,
  type PropertyQuery,
} from "./propty-demo";

/** Deterministic demo search, intentionally not advertised as a live language model. */
export function parseHomeSearch(input: string): {
  query: PropertyQuery;
  terms: string[];
} {
  let text = input.toLowerCase().replace(/[?,!]/g, " ");
  const query: PropertyQuery = {};
  for (const area of propertyAreas) {
    if (text.includes(area.toLowerCase())) {
      query.area = area;
      text = text.replaceAll(area.toLowerCase(), " ");
      break;
    }
  }
  const price = text.match(
    /(?:under|below|within|up to|max(?:imum)?|budget(?: of)?)\s*(?:bdt|tk|৳)?\s*(\d+(?:\.\d+)?)\s*(crores?|cr|lakhs?|lacs?)/,
  );
  if (price) {
    query.budget =
      Number(price[1]) * (/^(cr)/.test(price[2]) ? 10000000 : 100000);
    text = text.replace(price[0], " ");
  }
  const beds = text.match(/\b(\d+)\s*(?:\+\s*)?(?:bedrooms?|beds?|bhk)\b/);
  if (beds) {
    query.bedrooms = Number(beds[1]);
    text = text.replace(beds[0], " ");
  }
  if (/\bready(?: to move(?: in)?)?\b/.test(text)) {
    query.readyOnly = true;
    text = text.replace(/\bready(?: to move(?: in)?)?\b/g, " ");
  }
  const stopWords = new Set([
    "a",
    "an",
    "the",
    "in",
    "at",
    "with",
    "and",
    "or",
    "for",
    "of",
    "to",
    "me",
    "my",
    "i",
    "want",
    "need",
    "find",
    "show",
    "please",
    "home",
    "homes",
    "apartment",
    "apartments",
    "flat",
    "flats",
    "dhaka",
    "buy",
    "sale",
  ]);
  const terms = text
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t && !stopWords.has(t));
  return { query, terms };
}

export function matchesHomeText(property: Property, terms: string[]): boolean {
  const searchable = [property.title, property.area, ...property.features]
    .join(" ")
    .toLowerCase()
    .replaceAll("balconies", "balcony");
  return terms.every((raw) => {
    const term = raw.toLowerCase().replaceAll("balconies", "balcony");
    if (term === "parking" || term === "lift" || term === "elevator") {
      const feature = term === "parking" ? /parking/ : /lift|elevator/;
      return property.features.some((value) => feature.test(value.toLowerCase()) && !/planned/i.test(value));
    }
    return searchable.includes(term);
  });
}
