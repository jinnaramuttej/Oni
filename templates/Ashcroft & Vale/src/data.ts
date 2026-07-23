import { Icons } from "./components/ui";

export const img = {
  hero: "/images/hero.jpg",
  consult: "https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  meeting: "https://images.pexels.com/photos/7876299/pexels-photo-7876299.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  boardroom: "https://images.pexels.com/photos/5668799/pexels-photo-5668799.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  documents: "https://images.pexels.com/photos/5668807/pexels-photo-5668807.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  courthouse: "https://images.pexels.com/photos/20185389/pexels-photo-20185389.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  skyline: "https://images.pexels.com/photos/36756966/pexels-photo-36756966.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  tower: "https://images.pexels.com/photos/10410086/pexels-photo-10410086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  skylineNight: "https://images.pexels.com/photos/32976775/pexels-photo-32976775.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

export const attorneyPhotos = {
  a: "https://images.pexels.com/photos/38319082/pexels-photo-38319082.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
  b: "https://images.pexels.com/photos/5673472/pexels-photo-5673472.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
  c: "https://images.pexels.com/photos/7841828/pexels-photo-7841828.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
  d: "https://images.pexels.com/photos/38349381/pexels-photo-38349381.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=700",
};

export const practiceAreas = [
  {
    icon: Icons.briefcase,
    title: "Corporate & M&A",
    desc: "Sophisticated counsel on mergers, acquisitions, governance, and cross-border transactions for enterprises of every scale.",
  },
  {
    icon: Icons.scale,
    title: "Commercial Litigation",
    desc: "Formidable representation in high-stakes disputes, arbitration, and complex commercial proceedings before every court.",
  },
  {
    icon: Icons.home,
    title: "Real Estate & Property",
    desc: "End-to-end guidance across acquisitions, development, leasing, and zoning for landmark commercial and private assets.",
  },
  {
    icon: Icons.users,
    title: "Private Client & Trusts",
    desc: "Discreet estate planning, succession, and wealth-preservation strategies tailored to families of significant means.",
  },
  {
    icon: Icons.shield,
    title: "White-Collar Defense",
    desc: "Rigorous defense in regulatory investigations, compliance matters, and sensitive white-collar allegations.",
  },
  {
    icon: Icons.globe,
    title: "International Arbitration",
    desc: "Cross-jurisdictional advocacy resolving disputes with precision, cultural fluency, and commercial pragmatism.",
  },
];

export const attorneys = [
  {
    name: "Julian Ashcroft",
    role: "Founding Partner · Corporate",
    photo: attorneyPhotos.a,
    bio: "Four decades advising boards and institutional clients on landmark transactions across three continents.",
  },
  {
    name: "Marcus Vale",
    role: "Managing Partner · Litigation",
    photo: attorneyPhotos.b,
    bio: "A commanding trial advocate recognised for resolving the most consequential commercial disputes.",
  },
  {
    name: "Eleanor Reyes",
    role: "Partner · Private Client",
    photo: attorneyPhotos.c,
    bio: "Trusted counsel to families and principals seeking discreet, generational wealth strategies.",
  },
  {
    name: "David Sterling",
    role: "Partner · International",
    photo: attorneyPhotos.d,
    bio: "Leads cross-border arbitration with a reputation for clarity under exceptional pressure.",
  },
];

export const caseResults = [
  { value: "$2.4B", label: "Recovered for clients in litigation & settlements" },
  { value: "98%", label: "Favorable outcome rate across representative matters" },
  { value: "1,500+", label: "Transactions and disputes successfully resolved" },
  { value: "40+", label: "Jurisdictions served across the globe" },
];

export const industries = [
  "Financial Services",
  "Real Estate & Development",
  "Technology & IP",
  "Energy & Infrastructure",
  "Healthcare & Life Sciences",
  "Private Equity",
  "Media & Entertainment",
  "Manufacturing",
];

export const testimonials = [
  {
    quote:
      "Ashcroft & Vale navigated our acquisition with a composure and precision I have never encountered elsewhere. They are, simply, the standard.",
    name: "Catherine Holloway",
    role: "CEO, Meridian Capital Group",
  },
  {
    quote:
      "When our reputation was at stake, their discretion and strategic clarity were extraordinary. The outcome exceeded every expectation.",
    name: "Jonathan Pierce",
    role: "Founder, Pierce Holdings",
  },
  {
    quote:
      "A firm that treats your matter as its own. Rigorous, responsive, and profoundly reassuring during a difficult chapter.",
    name: "Amara Okafor",
    role: "Managing Director, Aldridge Estates",
  },
];

export const awards = [
  { name: "Chambers Global", detail: "Band 1 — Corporate/M&A" },
  { name: "The Legal 500", detail: "Elite Firm of the Year" },
  { name: "Financial Times", detail: "Most Innovative Practice" },
  { name: "Benchmark Litigation", detail: "Litigation Firm of the Year" },
];

export const insights = [
  {
    tag: "Corporate",
    date: "March 2026",
    title: "The New Landscape of Cross-Border M&A Due Diligence",
    excerpt:
      "How evolving regulatory frameworks are reshaping deal structures for multinational acquirers.",
    image: img.boardroom,
  },
  {
    tag: "Litigation",
    date: "February 2026",
    title: "Arbitration vs. Litigation: Choosing Your Forum Wisely",
    excerpt:
      "A strategic framework for selecting the dispute-resolution path that protects your interests.",
    image: img.documents,
  },
  {
    tag: "Private Client",
    date: "January 2026",
    title: "Generational Wealth: Structuring Trusts for Longevity",
    excerpt:
      "Preserving legacy and privacy across borders through thoughtfully designed succession planning.",
    image: img.meeting,
  },
];

export const faqs = [
  {
    q: "How is the initial consultation conducted?",
    a: "Your first consultation is a confidential, in-depth conversation — held in person or virtually — where a senior attorney assesses your matter, outlines potential strategies, and answers your questions with candor. There is no obligation to proceed.",
  },
  {
    q: "How does the firm protect client confidentiality?",
    a: "Discretion is foundational to our practice. Every engagement is governed by strict privilege protocols, secure communications, and internal information barriers designed to protect the most sensitive matters absolutely.",
  },
  {
    q: "What are your fee arrangements?",
    a: "We offer transparent, tailored arrangements — including fixed fees, retainers, and success-based structures — agreed in writing before work begins, so you always understand the value and cost of our counsel.",
  },
  {
    q: "Do you handle international matters?",
    a: "Yes. With counsel qualified across multiple jurisdictions and a global network of trusted partners, we routinely manage cross-border transactions and disputes spanning more than forty jurisdictions.",
  },
  {
    q: "How quickly can you take on an urgent matter?",
    a: "For time-sensitive matters, our partners mobilise immediately. Contact us directly and a senior attorney will respond within hours to assess urgency and outline next steps.",
  },
];

export const offices = [
  {
    city: "New York",
    address: "400 Park Avenue, 28th Floor, NY 10022",
    phone: "+1 (212) 555-0140",
    image: img.skylineNight,
  },
  {
    city: "London",
    address: "12 King's Bench Walk, Temple, EC4Y 7EL",
    phone: "+44 20 7946 0958",
    image: img.tower,
  },
  {
    city: "Singapore",
    address: "8 Marina Boulevard, #40-01, 018981",
    phone: "+65 6812 4400",
    image: img.skyline,
  },
];
