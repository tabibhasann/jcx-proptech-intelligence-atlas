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
