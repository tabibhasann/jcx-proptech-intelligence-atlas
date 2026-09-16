/** Fictional director-demo inventory. None of these records is an offer for sale. */
export interface Property {
  id: string;
  title: string;
  area: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: "Ready" | "Under construction";
  tagline: string;
  description: string;
  features: string[];
  tradeoff: string;
  images: string[];
  checks: { label: string; detail: string }[];
  isDemo: true;
}

export const DEMO_NOTICE =
  "Fictional homes for an interactive preview. Images are illustrative; prices, availability and checks are sample data, not market guidance or offers for sale.";

const checks = (): Property["checks"] => [
  {
    label: "Sample availability",
    detail:
      "Simulated status for this demo. No owner or developer has confirmed availability.",
  },
  {
    label: "Sample property details",
    detail:
      "Size, layout, features and price are fictional inputs, not independently checked facts.",
  },
  {
    label: "Documents not checked",
    detail:
      "No ownership, approval or legal document review has taken place. This is not a legal clearance.",
  },
];

export const properties: Property[] = [
  {
    id: "banyan",
    title: "The Banyan Residence",
    area: "Bashundhara",
    address: "Bashundhara, Dhaka · fictional address",
    price: 17_500_000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1850,
    status: "Ready",
    tagline: "Room for the everyday, and a little more.",
    description:
      "A sample three-bedroom home with a separate dining area, a balcony and a flexible family space. A useful starting point if you want three bedrooms below BDT 1.8 crore.",
    features: [
      "Balcony",
      "Separate dining",
      "Family space",
      "Lift",
      "1 parking space",
    ],
    tradeoff:
      "More space than Lightwell, but a higher sample price. Parking and other additional charges are not established.",
    images: ["/propty/home-1.jpg"],
    checks: checks(),
    isDemo: true,
  },
  {
    id: "lightwell",
    title: "Lightwell Apartment",
    area: "Bashundhara",
    address: "Bashundhara, Dhaka · fictional address",
    price: 15_000_000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1550,
    status: "Ready",
    tagline: "A considered home. A smaller footprint.",
    description:
      "A compact sample home with three bedrooms, an open living and dining area and a small balcony. It keeps the same bedroom count as Banyan at a lower illustrative price.",
    features: ["Balcony", "Open living and dining", "Lift", "Utility area"],
    tradeoff:
      "Less floor space and one fewer bathroom than Banyan. No dedicated parking space is included in the sample specification.",
    images: ["/propty/home-2.jpg"],
    checks: checks(),
    isDemo: true,
  },
  {
    id: "terrace",
    title: "The Terrace House",
    area: "Gulshan",
    address: "Gulshan, Dhaka · fictional address",
    price: 39_000_000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 2850,
    status: "Ready",
    tagline: "A generous setting for life together.",
    description:
      "A larger sample apartment with four bedrooms, a study and two balconies. The fictional layout separates shared living space from the bedrooms.",
    features: [
      "2 balconies",
      "Study",
      "Separate dining",
      "Lift",
      "2 parking spaces",
    ],
    tradeoff:
      "The highest sample price in this collection. Larger floor space does not establish lower maintenance costs or better investment returns.",
    images: ["/propty/home-3.jpg"],
    checks: checks(),
    isDemo: true,
  },
  {
    id: "courtyard",
    title: "Courtyard Living",
    area: "Dhanmondi",
    address: "Dhanmondi, Dhaka · fictional address",
    price: 24_000_000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2050,
    status: "Under construction",
    tagline: "Space to make your own.",
    description:
      "A sample planned three-bedroom apartment with a study nook and separate living and dining spaces. This record demonstrates how an unfinished property differs from a ready home.",
    features: [
      "Study nook",
      "Balcony",
      "Separate dining",
      "Planned lift",
      "Planned parking space",
    ],
    tradeoff:
      "Not ready to occupy. The demo does not establish a handover date, completion assurance or payment schedule.",
    images: ["/propty/home-4.jpg"],
    checks: checks(),
    isDemo: true,
  },
  {
    id: "horizon",
    title: "Horizon Apartment",
    area: "Banani",
    address: "Banani, Dhaka · fictional address",
    price: 28_000_000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2150,
    status: "Ready",
    tagline: "A home with a little breathing room.",
    description:
      "A sample home with a separate family lounge, three bedrooms and a balcony. Its additional floor space makes it a useful comparison with the smaller three-bedroom options.",
    features: [
      "Family lounge",
      "Balcony",
      "Utility area",
      "Lift",
      "1 parking space",
    ],
    tradeoff:
      "More expensive than the Bashundhara examples. The area label alone does not establish travel time, street conditions or services.",
    images: ["/propty/home-5.jpg"],
    checks: checks(),
    isDemo: true,
  },
  {
    id: "garden",
    title: "Garden Court",
    area: "Uttara",
    address: "Uttara, Dhaka · fictional address",
    price: 13_000_000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    status: "Ready",
    tagline: "A simpler start, with space to settle.",
    description:
      "A sample two-bedroom apartment with an open living area, balcony and utility space. The smallest bedroom count and lowest illustrative price in this collection.",
    features: ["Balcony", "Open living and dining", "Utility area", "Lift"],
    tradeoff:
      "Two bedrooms rather than three. Dedicated parking is not included in this sample, and building charges remain unknown.",
    images: ["/propty/home-6.jpg"],
    checks: checks(),
    isDemo: true,
  },
];

// Additional fictional fixtures keep the director demo useful across a wider
// range of budgets, neighbourhoods and household needs. Photos are reused
// illustrative assets from the original six-card set; they are not tied to
// these fictional addresses or presented as JCX listings.
const extendedFixtureData: Array<[
  string,
  string,
  number,
  number,
  number,
  number,
  Property["status"],
  string[],
]> = [
  ["riverstone", "Mohammadpur", 11800000, 2, 2, 1200, "Ready", ["Balcony", "Lift", "Utility area"]],
  ["lakeview", "Uttara", 16500000, 3, 2, 1500, "Ready", ["Balcony", "Lift", "1 parking space"]],
  ["meadow", "Mirpur", 9200000, 2, 2, 1050, "Under construction", ["Balcony", "Planned lift"]],
  ["civic", "Motijheel", 14200000, 2, 2, 1150, "Ready", ["Lift", "1 parking space"]],
  ["orchid", "Badda", 18800000, 3, 3, 1680, "Under construction", ["Balcony", "Study nook", "Planned parking space"]],
  ["canopy", "Khilgaon", 12700000, 3, 2, 1320, "Ready", ["Balcony", "Family space", "Lift"]],
  ["maple", "Tejgaon", 21500000, 3, 3, 1780, "Ready", ["Separate dining", "Lift", "1 parking space"]],
  ["harbor", "Lalmatia", 25500000, 4, 3, 2200, "Ready", ["2 balconies", "Family lounge", "Lift"]],
  ["sunbeam", "Savar", 7800000, 2, 2, 980, "Under construction", ["Balcony", "Planned lift"]],
  ["hearth", "Aftab Nagar", 15400000, 3, 2, 1450, "Ready", ["Open living and dining", "Balcony", "Lift"]],
  ["elm", "Rampura", 10900000, 2, 2, 1100, "Ready", ["Utility area", "Lift"]],
  ["palm", "Wari", 19800000, 3, 3, 1600, "Ready", ["Balcony", "Separate dining", "1 parking space"]],
  ["skylark", "Baridhara", 33500000, 4, 4, 2700, "Ready", ["2 balconies", "Study", "2 parking spaces"]],
  ["willow", "Kakrail", 13600000, 2, 2, 1180, "Under construction", ["Balcony", "Planned lift"]],
  ["nook", "Shyamoli", 10100000, 2, 1, 900, "Ready", ["Open living and dining", "Lift"]],
  ["cedar", "Banasree", 17200000, 3, 3, 1520, "Ready", ["Balcony", "Family space", "1 parking space"]],
  ["vista", "Khilgaon", 23200000, 4, 3, 2050, "Under construction", ["Study nook", "2 balconies", "Planned parking space"]],
  ["hummingbird", "Gulshan", 31000000, 3, 3, 2100, "Ready", ["Balcony", "Study", "1 parking space"]],
  ["bricklane", "Dhanmondi", 27800000, 3, 3, 1950, "Ready", ["Separate dining", "Family lounge", "Lift"]],
  ["juniper", "Banani", 36500000, 4, 4, 2950, "Under construction", ["2 balconies", "Study", "Planned parking space"]],
  ["lumen", "Bashundhara", 22100000, 4, 3, 2300, "Ready", ["Balcony", "Family lounge", "1 parking space"]],
  ["fern", "Uttara", 12400000, 2, 2, 1080, "Ready", ["Balcony", "Utility area"]],
  ["pebble", "Mirpur", 8500000, 2, 1, 860, "Ready", ["Open living and dining", "Lift"]],
  ["terracotta", "Mohammadpur", 14900000, 3, 2, 1380, "Under construction", ["Balcony", "Planned lift"]],
  ["breeze", "Badda", 11300000, 2, 2, 1020, "Ready", ["Balcony", "Lift"]],
  ["loft", "Tejgaon", 24200000, 3, 2, 1750, "Ready", ["Study nook", "Balcony", "1 parking space"]],
  ["parkline", "Baridhara", 39500000, 4, 4, 3100, "Ready", ["2 balconies", "Study", "2 parking spaces"]],
  ["spruce", "Lalmatia", 18400000, 3, 3, 1580, "Ready", ["Family space", "Balcony", "Lift"]],
  ["cypress", "Kakrail", 9600000, 2, 2, 940, "Under construction", ["Balcony", "Planned lift"]],
  ["marigold", "Savar", 6900000, 2, 1, 820, "Ready", ["Open living and dining"]],
  ["atlas", "Motijheel", 20500000, 3, 3, 1700, "Ready", ["Separate dining", "Lift", "1 parking space"]],
  ["raina", "Wari", 15900000, 3, 2, 1300, "Ready", ["Balcony", "Utility area"]],
  ["quartz", "Banasree", 26800000, 4, 3, 2150, "Under construction", ["Study", "2 balconies", "Planned parking space"]],
  ["olive", "Rampura", 13200000, 2, 2, 1120, "Ready", ["Balcony", "Lift"]],
  ["solace", "Shyamoli", 17700000, 3, 3, 1500, "Ready", ["Family lounge", "Balcony", "1 parking space"]],
  ["cobalt", "Aftab Nagar", 8900000, 2, 1, 880, "Under construction", ["Balcony", "Planned lift"]],
  ["acacia", "Khilgaon", 19300000, 3, 2, 1620, "Ready", ["Separate dining", "Balcony", "Lift"]],
  ["aurora", "Gulshan", 40000000, 4, 4, 3200, "Ready", ["2 balconies", "Study", "2 parking spaces"]],
  ["daybreak", "Bashundhara", 14500000, 2, 2, 1250, "Ready", ["Balcony", "Lift"]],
  ["mulberry", "Dhanmondi", 31800000, 4, 4, 2600, "Under construction", ["Study", "2 balconies", "Planned parking space"]],
  ["willowcrest", "Banani", 28900000, 3, 3, 2050, "Ready", ["Family lounge", "Balcony", "1 parking space"]],
  ["eucalyptus", "Mirpur", 7600000, 2, 1, 800, "Ready", ["Open living and dining"]],
  ["rainier", "Uttara", 24800000, 4, 3, 2180, "Ready", ["Study nook", "Balcony", "1 parking space"]],
];

for (const [id, area, price, bedrooms, bathrooms, sqft, status, features] of extendedFixtureData) {
  properties.push({
    id,
    title: `${id.replace(/(^|-)/g, (m) => m.toUpperCase())} Residence`,
    area,
    address: `${area}, Dhaka · fictional address`,
    price,
    bedrooms,
    bathrooms,
    sqft,
    status,
    tagline: "A fictional home to compare at a glance.",
    description: `A concise fictional ${bedrooms}-bedroom sample in ${area} for exploring Propty's search and comparison flows.`,
    features,
    tradeoff: "Illustrative details only; availability, charges and documents are not established.",
    images: [`/propty/home-${(properties.length % 6) + 1}.jpg`],
    checks: checks(),
    isDemo: true,
  });
}

export interface PropertyQuery {
  area?: string;
  /** Maximum asking price in BDT. Omit for no price limit. */
  budget?: number;
  /** Minimum bedroom count. */
  bedrooms?: number;
  readyOnly?: boolean;
}

/** Strict matching: never silently replaces a buyer's requirements with alternatives. */
export function filterProperties(
  query: PropertyQuery = {},
  inventory: readonly Property[] = properties,
): Property[] {
  const area = query.area?.trim().toLocaleLowerCase();
  return inventory.filter(
    (property) =>
      (!area ||
        area === "all" ||
        area === "any" ||
        area === "all areas" ||
        property.area.toLocaleLowerCase() === area) &&
      (query.budget === undefined || property.price <= query.budget) &&
      (query.bedrooms === undefined || property.bedrooms >= query.bedrooms) &&
      (!query.readyOnly || property.status === "Ready"),
  );
}

/** Compact local currency format. 1 crore = BDT 10,000,000. */
export function formatPrice(price: number): string {
  if (!Number.isFinite(price) || price < 0) return "Price unavailable";
  if (price >= 10_000_000)
    return `BDT ${Number((price / 10_000_000).toFixed(2))} crore`;
  if (price >= 100_000)
    return `BDT ${Number((price / 100_000).toFixed(2))} lakh`;
  return `BDT ${price.toLocaleString("en-BD")}`;
}

export const propertyAreas = [
  ...new Set(properties.map((property) => property.area)),
];
