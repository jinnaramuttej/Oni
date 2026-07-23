/* ————————————————————————————————————————
   Meridian Fine Estates — content layer
———————————————————————————————————————— */

export const img = (id: number, w = 1400, h = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

/* ——— Hero ——— */
export const HERO_IMG = img(36676879, 2200, 1320);

/* ——— Featured collection ——— */
export type Property = {
  id: string;
  name: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  cat: "villas" | "penthouses" | "estates" | "coastal";
  tag: string;
  photo: number;
  alt: string;
};

export const CATEGORIES = [
  { key: "all", label: "All Residences" },
  { key: "villas", label: "Villas" },
  { key: "penthouses", label: "Penthouses" },
  { key: "estates", label: "Estates" },
  { key: "coastal", label: "Coastal" },
] as const;

export const PROPERTIES: Property[] = [
  {
    id: "solstice",
    name: "Villa Solstice",
    location: "Beverly Hills, California",
    price: "$28,500,000",
    beds: 7,
    baths: 9,
    area: "14,200",
    cat: "villas",
    tag: "New Listing",
    photo: 13752348,
    alt: "Contemporary villa facade illuminated at dusk with warm architectural lighting",
  },
  {
    id: "riviera",
    name: "The Riviera House",
    location: "Cap Ferrat, French Riviera",
    price: "$24,900,000",
    beds: 6,
    baths: 8,
    area: "11,800",
    cat: "coastal",
    tag: "Exclusive",
    photo: 28054849,
    alt: "Elegant stone villa with infinity pool overlooking the sea at twilight",
  },
  {
    id: "atrium",
    name: "Penthouse One, The Atrium",
    location: "Tribeca, New York",
    price: "$18,750,000",
    beds: 4,
    baths: 5,
    area: "6,400",
    cat: "penthouses",
    tag: "New Listing",
    photo: 7045918,
    alt: "Spacious private terrace of a modern penthouse in the evening",
  },
  {
    id: "bahia",
    name: "Casa Bahía",
    location: "Malibu, California",
    price: "$21,400,000",
    beds: 5,
    baths: 7,
    area: "9,850",
    cat: "coastal",
    tag: "Off-Market",
    photo: 36394726,
    alt: "Modern coastal villa with serene poolside view during twilight",
  },
  {
    id: "alpine",
    name: "The Alpine Lodge",
    location: "Aspen, Colorado",
    price: "$16,900,000",
    beds: 6,
    baths: 7,
    area: "10,200",
    cat: "estates",
    tag: "Exclusive",
    photo: 27626185,
    alt: "Luxury lodge with infinity pool and panoramic mountain views",
  },
  {
    id: "serena",
    name: "Villa Serena",
    location: "Amalfi Coast, Italy",
    price: "$12,800,000",
    beds: 5,
    baths: 6,
    area: "8,400",
    cat: "villas",
    tag: "Price Improved",
    photo: 19075387,
    alt: "Mediterranean holiday villa with illuminated pool at sunset",
  },
];

/* ——— Collections ——— */
export const COLLECTIONS = [
  {
    n: "01",
    name: "Waterfront Villas",
    count: 42,
    photo: 12307498,
    alt: "Elegant waterfront villas reflecting on tranquil water at dusk",
  },
  {
    n: "02",
    name: "City Penthouses",
    count: 36,
    photo: 13210831,
    alt: "City skyscrapers photographed from below at night",
  },
  {
    n: "03",
    name: "Country Estates",
    count: 28,
    photo: 7031600,
    alt: "Contemporary country house with manicured green courtyard",
  },
  {
    n: "04",
    name: "Mountain Retreats",
    count: 19,
    photo: 31817157,
    alt: "Modern villa with infinity pool and scenic hill views at sunset",
  },
];

/* ——— Neighborhoods ——— */
export const NEIGHBORHOODS = [
  { name: "Monaco & Monte-Carlo", metric: "$8.4M median", trend: "+12.4% YoY" },
  { name: "Mayfair, London", metric: "$11.2M median", trend: "+8.1% YoY" },
  { name: "Beverly Hills, Los Angeles", metric: "$9.6M median", trend: "+10.7% YoY" },
  { name: "Aspen, Colorado", metric: "$13.8M median", trend: "+15.2% YoY" },
  { name: "Lake Como, Lombardy", metric: "$6.9M median", trend: "+9.3% YoY" },
];

export const HOOD_IMAGES = {
  main: { photo: 4399870, alt: "Couple on a private rooftop terrace overlooking the city skyline" },
  second: { photo: 7031407, alt: "Illuminated two storey alpine villa with panoramic windows" },
  third: { photo: 8092191, alt: "Elegant Mayfair drawing room with chandelier and classic armchair" },
};

/* ——— Advisors ——— */
export type Agent = {
  name: string;
  role: string;
  specialty: string;
  phone: string;
  email: string;
  photo: number;
};

export const AGENTS: Agent[] = [
  {
    name: "Alexander Whitmore",
    role: "Principal Broker",
    specialty: "Estates & Private Islands",
    phone: "+1 212 555 0184",
    email: "a.whitmore@meridian.estate",
    photo: 9623645,
  },
  {
    name: "Isabella Laurent",
    role: "Director, European Estates",
    specialty: "Riviera & Alpine Properties",
    phone: "+33 1 55 55 0142",
    email: "i.laurent@meridian.estate",
    photo: 38581713,
  },
  {
    name: "James Rothwell",
    role: "Head of Private Office",
    specialty: "Off-Market Acquisitions",
    phone: "+44 20 7946 0958",
    email: "j.rothwell@meridian.estate",
    photo: 37828829,
  },
  {
    name: "Sophia Marchetti",
    role: "Senior Advisor",
    specialty: "Waterfront Residences",
    phone: "+1 310 555 0177",
    email: "s.marchetti@meridian.estate",
    photo: 29086752,
  },
];

/* ——— Recently sold ——— */
export const SOLD = [
  {
    name: "The Lindenwood Estate",
    location: "Greenwich, Connecticut",
    price: "$14,200,000",
    note: "Sold 12% above asking · 9 days",
    photo: 8134821,
    alt: "Contemporary two-story luxury home with paved driveway and garden",
  },
  {
    name: "Maison Verdant",
    location: "Bel-Air, Los Angeles",
    price: "$9,800,000",
    note: "Off-market · Represented buyer",
    photo: 31737859,
    alt: "Elegant residential architecture illuminated at night with lush garden",
  },
  {
    name: "The Glass Pavilion",
    location: "Holmby Hills, California",
    price: "$11,500,000",
    note: "Sold 8% above asking · 14 days",
    photo: 7031604,
    alt: "Modern villa with panoramic glass walls and manicured lawn",
  },
  {
    name: "Cedar Court Residence",
    location: "Atherton, California",
    price: "$7,900,000",
    note: "Record price per sq ft · Street",
    photo: 8134817,
    alt: "Contemporary house exterior with warm wooden facade and vibrant garden",
  },
];

export const SOLD_STATS = [
  { value: "$412M", label: "Closed in 2025" },
  { value: "96", label: "Residences sold" },
  { value: "11", label: "Median days on market" },
  { value: "$68M", label: "Record single sale" },
];

/* ——— Testimonials ——— */
export const TESTIMONIALS = [
  {
    quote:
      "Meridian found us a residence we didn't know existed — entirely off-market, quietly negotiated, flawlessly closed. It felt less like a transaction and more like being handed a key to another life.",
    name: "Daniel & Claire Ashford",
    context: "Purchased in Monaco, 2025",
    photo: 37148308,
  },
  {
    quote:
      "They sold our estate nineteen percent above asking in eleven days, to a buyer who had already fallen in love before the first showing. Their understanding of the market borders on intuition.",
    name: "Victoria Lindqvist",
    context: "Sold in Stockholm, 2025",
    photo: 16158173,
  },
  {
    quote:
      "Relocating three children across continents should have been chaos. Instead, every viewing, school visit and signature was orchestrated with surgical calm. We simply arrived home.",
    name: "Marcus Okafor",
    context: "Relocated to London, 2024",
    photo: 17362827,
  },
];

/* ——— Market insights ——— */
export const INSIGHT_STATS = [
  { value: "$4.8B", label: "Career sales volume" },
  { value: "24", label: "Years of quiet excellence" },
  { value: "98.2%", label: "Average list-to-sale ratio" },
  { value: "40+", label: "Countries served" },
];

export const ARTICLES = [
  {
    tag: "Market Outlook",
    title: "The 2026 Luxury Report: scarcity is the new currency",
    excerpt:
      "Prime inventory has contracted 22% across gateway cities — yet demand among UHNW buyers has never been stronger. Here is what the data tells us.",
    date: "Feb 12, 2026",
    read: "8 min read",
    photo: 7174386,
    alt: "Spacious open-plan luxury residence with stairway and kitchen",
  },
  {
    tag: "Design & Value",
    title: "Inside the kitchens buyers quietly pay a premium for",
    excerpt:
      "Calacatta marble, concealed appliances and the return of the second prep kitchen — the details moving prices by eight figures.",
    date: "Jan 28, 2026",
    read: "6 min read",
    photo: 7031879,
    alt: "Contemporary kitchen in beige and white with marble island",
  },
  {
    tag: "Lifestyle",
    title: "The terrace is the new backyard — and priced accordingly",
    excerpt:
      "Private outdoor space above the skyline now commands up to 30% premiums in Manhattan and London. A closer look at the vertical garden market.",
    date: "Jan 09, 2026",
    read: "5 min read",
    photo: 9584741,
    alt: "Private city terrace with outdoor fireplace and skyline view",
  },
];

/* ——— Guides ——— */
export const GUIDES = [
  {
    overline: "For Buyers",
    title: "The Buyer's Guide",
    copy: "From defining your brief to off-market access, financing strategy and the final walkthrough — thirty years of acquisition wisdom, distilled.",
    meta: "PDF · 24 pages",
    photo: 8082312,
    alt: "Grand living space with floor-to-ceiling windows and chandelier",
  },
  {
    overline: "For Sellers",
    title: "The Seller's Guide",
    copy: "Positioning, discreet pricing, staging that photographs like architecture, and the quiet auction — how we achieve record outcomes.",
    meta: "PDF · 18 pages",
    photo: 6538943,
    alt: "Sleek modern kitchen with black marble surfaces and elegant lighting",
  },
];

/* ——— Consultation ——— */
export const CONSULT_IMG = {
  photo: 7045703,
  alt: "Luxurious lounge with large windows, armchairs and beige curtains",
};

/* ——— Footer / global ——— */
export const CITIES = [
  "New York",
  "London",
  "Monaco",
  "Dubai",
  "Paris",
  "Aspen",
  "Milan",
  "Geneva",
  "Malibu",
  "Tokyo",
  "St. Barths",
  "Singapore",
];

export const PRESS = [
  "Architectural Digest",
  "Forbes",
  "Mansion Global",
  "The Wall Street Journal",
  "Financial Times",
];
