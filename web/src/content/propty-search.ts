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
  const rentSignal = /\b(?:rent|rental|lease|leasing|to let|monthly)\b|ভাড়া|ভাড়া|ভাড়ার|ভাড়ার/.test(text);
  const buySignal = /\b(?:buy|sale|sell|purchase|for sale)\b|কিনতে|বিক্রি/.test(text);
  if (rentSignal && !buySignal) query.transaction = "rent";
  else if (buySignal && !rentSignal) query.transaction = "buy";
  text = text.replace(/\b(?:rent|rental|lease|leasing|to let|monthly|buy|sale|sell|purchase|for sale)\b|ভাড়া|ভাড়া|ভাড়ার|ভাড়ার|কিনতে|বিক্রি/g, " ");
  for (const area of propertyAreas) {
    if (text.includes(area.toLowerCase())) {
      query.area = area;
      text = text.replaceAll(area.toLowerCase(), " ");
      break;
    }
  }
  const sizeQualifier = /(?:under|below|within|up to|max(?:imum)?|budget(?: of)?)\s*\d[\d,]*\s*(?:sq\.?\s*ft|sqft|square feet)\b/.test(text);
  const price = sizeQualifier ? null : text.match(
    /(?:under|below|within|up to|max(?:imum)?|budget(?: of)?)\s*(?:bdt|tk|৳)?\s*(\d+(?:\.\d+)?)\s*(crores?|cr|lakhs?|lacs?|k|thousand)?\b(?!\s*(?:sq\.?\s*ft|sqft|square feet)\b)/,
  );
  if (price) {
    const unit = (price[2] || "").toLowerCase();
    const multiplier = /^(?:crores?|cr)$/.test(unit)
      ? 10000000
      : /^(?:lakhs?|lacs?)$/.test(unit)
        ? 100000
        : /^(?:k|thousand)$/.test(unit)
          ? 1000
          : 1;
    query.budget = Number(price[1]) * multiplier;
    text = text.replace(price[0], " ");
  }
  const beds = text.match(/\b(\d+)\s*(?:\+\s*)?(?:bedrooms?|beds?|bhk)\b/);
  if (beds) {
    query.bedrooms = Number(beds[1]);
    text = text.replace(beds[0], " ");
  }
  const sqftRange = text.match(/(?:between\s*)?(\d[\d,]*)\s*(?:-|to|and)\s*(\d[\d,]*)\s*(?:sq\.?\s*ft|sqft|square feet)\b/);
  if (sqftRange) {
    query.minSqft = Number(sqftRange[1].replaceAll(",", ""));
    query.maxSqft = Number(sqftRange[2].replaceAll(",", ""));
    text = text.replace(sqftRange[0], " ");
  } else {
    const minSqft = text.match(/(?:at least|minimum|min)\s*(\d[\d,]*)\s*(?:sq\.?\s*ft|sqft|square feet)\b/);
    const maxSqft = text.match(/(?:under|below|up to|max(?:imum)?)\s*(\d[\d,]*)\s*(?:sq\.?\s*ft|sqft|square feet)\b/);
    if (minSqft) {
      query.minSqft = Number(minSqft[1].replaceAll(",", ""));
      text = text.replace(minSqft[0], " ");
    }
    if (maxSqft) {
      query.maxSqft = Number(maxSqft[1].replaceAll(",", ""));
      text = text.replace(maxSqft[0], " ");
    }
  }
  const bathrooms = text.match(/\b(\d+)\s*(?:bathrooms?|baths?)\b/);
  if (bathrooms) {
    query.bathrooms = Number(bathrooms[1]);
    text = text.replace(bathrooms[0], " ");
  }
  const furnishing = text.match(/\b(semi[- ]?furnished|unfurnished|furnished)\b/);
  if (furnishing) {
    query.furnishing = furnishing[1].replace("semi furnished", "Semi-furnished").replace("semi-furnished", "Semi-furnished").replace("unfurnished", "Unfurnished").replace("furnished", "Furnished");
    text = text.replace(furnishing[0], " ");
  }
  if (/\b(?:available now|move[- ]?in now|ready now)\b/.test(text)) {
    query.availableNow = true;
    text = text.replace(/\b(?:available now|move[- ]?in now|ready now)\b/g, " ");
  }
  if (/\b(?:new project|new projects|brand[- ]?new)\b/.test(text)) {
    query.newProjectsOnly = true;
    text = text.replace(/\b(?:new project|new projects|brand[- ]?new)\b/g, " ");
  }
  const amenities: string[] = [];
  for (const [pattern, canonical] of [["\\bparking\\b", "parking"], ["\\bpark\\b", "parking"], ["\\bbalcon(?:y|ies)\\b", "balcony"], ["\\blift\\b|\\belevator\\b", "lift"], ["\\bstud(?:y|ies)\\b", "study"], ["\\butility\\b", "utility"], ["\\bfamily\\b", "family"]] as const) {
    if (new RegExp(pattern).test(text)) {
      amenities.push(canonical);
      text = text.replace(new RegExp(pattern, "g"), " ");
    }
  }
  if (amenities.length) query.amenities = [...new Set(amenities)];
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
    "rent",
    "rental",
    "lease",
    "leasing",
    "monthly",
    "parking",
    "park",
    "balcony",
    "balconies",
    "lift",
    "elevator",
    "study",
    "studies",
    "utility",
    "family",
    "furnished",
    "unfurnished",
    "semi-furnished",
    "semi",
    "available",
    "now",
    "new",
    "project",
    "projects",
    "sqft",
    "sq",
    "ft",
    "bathroom",
    "bathrooms",
    "bath",
    "baths",
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
    if (term === "parking" || term === "park" || term === "lift" || term === "elevator") {
      const feature = term === "parking" || term === "park" ? /parking|car space|car park/ : /lift|elevator/;
      return property.features.some((value) => feature.test(value.toLowerCase()) && !/planned/i.test(value));
    }
    return searchable.includes(term);
  });
}
