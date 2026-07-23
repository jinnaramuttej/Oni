/* ------------------------------------------------------------------ */
/* Central content model — imagery, treatments, team, stories          */
/* ------------------------------------------------------------------ */

const px = (id: number, params: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&${params}`;

export const IMAGES = {
  hero: px(3884101, "w=1920&h=1080&fit=crop"),
  consult: px(5355723, "w=1100&h=820&fit=crop"),
  interior: px(4269268, "w=1100&h=1320&fit=crop"),
  tech: px(6629415, "w=1100&h=820&fit=crop"),
  procedure: px(6627353, "w=1100&h=820&fit=crop"),
  treatment: px(5355920, "w=1600&h=900&fit=crop"),
  office: px(38055774, "w=1600&h=900&fit=crop"),
  smileA: px(1586335, "w=900&h=640&fit=crop"),
  smileB: px(18505360, "w=900&h=640&fit=crop"),
  smileC: px(3974017, "w=900&h=640&fit=crop"),
};

export const NAV_LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "Smile Gallery", href: "#gallery" },
  { label: "Doctors", href: "#doctors" },
  { label: "Stories", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const TRUST_BADGES = [
  { icon: "BadgeCheck", label: "Certified Dentists", detail: "Board-certified, 15+ yrs" },
  { icon: "ScanLine", label: "Modern Equipment", detail: "Digital 3D imaging" },
  { icon: "HeartHandshake", label: "Pain-Free Care", detail: "Gentle-first promise" },
];

export const STATS = [
  { value: "15+", label: "Years of practice" },
  { value: "12k+", label: "Smiles transformed" },
  { value: "4.9", label: "Average patient rating" },
  { value: "98%", label: "Would recommend us" },
];

export type Treatment = {
  name: string;
  description: string;
  duration: string;
  icon: string;
  tag?: string;
};

export const TREATMENTS: Treatment[] = [
  {
    name: "General & Preventive Care",
    description:
      "Comprehensive exams, gentle cleanings, and digital X-rays that keep small concerns from ever becoming big ones.",
    duration: "45–60 min",
    icon: "ShieldCheck",
  },
  {
    name: "Cosmetic Dentistry",
    description:
      "Hand-layered veneers, bonding, and contouring designed around your facial features — never a template.",
    duration: "60–90 min",
    icon: "Sparkles",
    tag: "Most popular",
  },
  {
    name: "Invisalign & Orthodontics",
    description:
      "Discreet clear aligners with 3D smile preview, remote monitoring, and refinements included in every plan.",
    duration: "30 min consult",
    icon: "Smile",
    tag: "Free preview",
  },
  {
    name: "Professional Whitening",
    description:
      "Enamel-safe in-office whitening that lifts up to eight shades in a single relaxed visit — zero sensitivity drama.",
    duration: "60 min",
    icon: "Sun",
  },
  {
    name: "Dental Implants",
    description:
      "Guided, computer-planned implants that look, feel, and function like your own teeth — for decades.",
    duration: "Plan in 1 visit",
    icon: "Anchor",
  },
  {
    name: "Family & Pediatric Care",
    description:
      "Calm first visits, playful checkups, and preventive care that grows with every member of your family.",
    duration: "45 min",
    icon: "Users",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Listen & understand",
    text: "Your first visit starts with a conversation — your goals, your history, your comfort level.",
  },
  {
    step: "02",
    title: "Design your plan",
    text: "3D imaging and honest options. Every cost and timeline is clear before we begin.",
  },
  {
    step: "03",
    title: "Treat gently",
    text: "Noise-cancelling comfort, numbing that actually works, and breaks whenever you need.",
  },
  {
    step: "04",
    title: "Care that lasts",
    text: "Personalized aftercare, reminders that respect your time, and a team that remembers your name.",
  },
];

export const DOCTORS = [
  {
    name: "Dr. Amara Chen",
    role: "Cosmetic & Aesthetic Dentistry",
    bio: "Fellow of the AACD. Believes a great smile should look like it was always yours.",
    image: px(5355864, "w=720&h=880&fit=crop"),
  },
  {
    name: "Dr. Daniel Reyes",
    role: "Implantology & Surgery",
    bio: "Board-certified surgeon with 4,000+ implants placed using fully guided protocols.",
    image: px(17792882, "w=720&h=880&fit=crop"),
  },
  {
    name: "Dr. James Whitfield",
    role: "Orthodontics & Invisalign",
    bio: "Diamond Invisalign provider. Engineers smiles with aligners, not wires, wherever possible.",
    image: px(37458054, "w=720&h=880&fit=crop"),
  },
];

export const SMILE_CASES = [
  {
    image: IMAGES.smileA,
    initials: "S.M.",
    treatment: "Veneers + Whitening",
    timeline: "3 visits",
  },
  {
    image: IMAGES.smileB,
    initials: "J.K.",
    treatment: "Invisalign",
    timeline: "9 months",
  },
  {
    image: IMAGES.smileC,
    initials: "L.R.",
    treatment: "Professional Whitening",
    timeline: "1 visit",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I lived with dental anxiety for twenty years. The team at Lumina rebuilt that trust in a single visit — I actually laughed during my cleaning.",
    name: "Sofia Marchetti",
    detail: "Patient since 2022",
    rating: 5,
  },
  {
    quote:
      "My Invisalign plan was mapped on a screen in minutes. No pressure, no jargon — just a clear path to the smile I'd wanted since high school.",
    name: "Jordan Park",
    detail: "Invisalign, 9 months",
    rating: 5,
  },
  {
    quote:
      "Two implants, zero pain, and a follow-up call that same evening. This is what healthcare is supposed to feel like.",
    name: "Marcus Bell",
    detail: "Implant patient",
    rating: 5,
  },
  {
    quote:
      "They see our whole family — my kids ask when they get to go back. That sentence alone says everything about this practice.",
    name: "Aisha Rahman",
    detail: "Family care",
    rating: 5,
  },
];

export const INSURANCE_PARTNERS = [
  "Delta Dental",
  "Cigna",
  "MetLife",
  "Aetna",
  "Guardian",
  "UnitedHealthcare",
  "Humana",
  "Principal",
];

export const FAQS = [
  {
    q: "Do you accept my dental insurance?",
    a: "We work with most major PPO plans including Delta Dental, Cigna, MetLife, Aetna, and UnitedHealthcare. Our care coordinators verify your benefits before your visit and file all claims for you — you'll always know your exact cost upfront, with no surprise bills.",
  },
  {
    q: "I haven't seen a dentist in years. Is that a problem?",
    a: "Not at all — about a third of our new patients are returning after a long break. Your first visit is judgment-free: a gentle exam, a clear picture of where things stand, and a plan that fits your pace and budget. Nothing happens without your comfort and consent.",
  },
  {
    q: "What does 'pain-free care' actually mean?",
    a: "It means buffered anesthetic that's warmed and slow-delivered, numbing gel before every injection, noise-cancelling headphones, weighted blankets, and a raise-your-hand stop signal that's always respected. We also offer nitrous and oral sedation for anxious patients.",
  },
  {
    q: "How much does Invisalign cost, and how long does it take?",
    a: "Most cases run between $3,200–$5,800 depending on complexity, and most smiles finish in 6–12 months. Your free consultation includes a 3D scan and an on-screen preview of your projected result — so you can decide with complete clarity.",
  },
  {
    q: "Do you offer same-day or emergency appointments?",
    a: "Yes. We reserve same-day slots every weekday for urgent concerns like toothaches, chips, or lost crowns. Call before 2 PM and we'll almost always see you the same day — current patients have 24/7 phone triage.",
  },
  {
    q: "Is teeth whitening safe for my enamel?",
    a: "Professional whitening under dental supervision is clinically proven safe. We calibrate gel strength to your enamel and sensitivity level, protect your gums with isolation barriers, and send you home with remineralizing care. Most patients see 6–8 shades of lift in one visit.",
  },
];

export const HOURS = [
  { days: "Monday – Thursday", time: "8:00 — 19:00" },
  { days: "Friday", time: "8:00 — 17:00" },
  { days: "Saturday", time: "9:00 — 14:00" },
  { days: "Sunday", time: "Closed" },
];

export const CONTACT = {
  phone: "(310) 555-0184",
  phoneHref: "tel:+13105550184",
  email: "hello@luminadental.studio",
  address: "9248 Rosewood Avenue, Suite 210",
  city: "Beverly Hills, CA 90210",
};
