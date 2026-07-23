/* ------------------------------------------------------------------ *
 * Aurelia — content model
 * All copy, pricing, and imagery references live here so the
 * presentation components stay declarative and handcrafted.
 * ------------------------------------------------------------------ */

export type TreatmentCategory =
  | "Massage"
  | "Facial"
  | "Body"
  | "Aromatherapy"
  | "Rituals";

export interface Treatment {
  name: string;
  duration: string;
  price: string;
  description: string;
  category: TreatmentCategory;
}

export interface Category {
  id: TreatmentCategory;
  label: string;
  blurb: string;
}

export const categories: Category[] = [
  { id: "Massage", label: "Massage", blurb: "Pressure and pace, tuned to release." },
  { id: "Facial", label: "Facial", blurb: "Visible radiance, restored gently." },
  { id: "Body", label: "Body", blurb: "Exfoliation, wrapping, and renewal." },
  { id: "Aromatherapy", label: "Aromatherapy", blurb: "Botanical oils, composed for calm." },
  { id: "Rituals", label: "Wellness Rituals", blurb: "Multi-hour journeys of stillness." },
];

export const treatments: Treatment[] = [
  // Massage
  {
    name: "Swedish Serenity",
    duration: "60 min",
    price: "$180",
    description:
      "A flowing, full-body massage calibrated to quiet the nervous system and ease surface tension.",
    category: "Massage",
  },
  {
    name: "Deep Tissue Restoration",
    duration: "75 min",
    price: "$220",
    description:
      "Slow, intentional pressure reaches deep fascia to unravel chronic holding patterns.",
    category: "Massage",
  },
  {
    name: "Warm Stone Harmony",
    duration: "90 min",
    price: "$260",
    description:
      "Heated basalt stones glide along muscle lines, dissolving tension with radiant warmth.",
    category: "Massage",
  },
  {
    name: "Lomi Lomi Nui",
    duration: "90 min",
    price: "$280",
    description:
      "A traditional Hawaiian flow of long, continuous strokes that rhythmically reset body and breath.",
    category: "Massage",
  },
  // Facial
  {
    name: "Radiance Renewal",
    duration: "60 min",
    price: "$210",
    description:
      "A bespoke facial layered with botanical actives to brighten, hydrate, and revive.",
    category: "Facial",
  },
  {
    name: "Gold Caviar Lift",
    duration: "75 min",
    price: "$290",
    description:
      "Champagne gold and caviar extracts firm and illuminate for a lifted, luminous finish.",
    category: "Facial",
  },
  {
    name: "Botanical Hydra-Glow",
    duration: "60 min",
    price: "$190",
    description:
      "A deeply hydrating treatment infusing plant essences for plump, dewy skin.",
    category: "Facial",
  },
  {
    name: "Gentlemen's Revive",
    duration: "45 min",
    price: "$150",
    description:
      "A brisk, targeted facial designed to refresh and rebalance men's skin.",
    category: "Facial",
  },
  // Body
  {
    name: "Silk Body Wrap",
    duration: "75 min",
    price: "$240",
    description:
      "A nourishing cocoon of warm silk proteins leaves skin supple and deeply conditioned.",
    category: "Body",
  },
  {
    name: "Desert Salt Glow",
    duration: "45 min",
    price: "$140",
    description:
      "Mineral-rich salt sweeps away dullness, polishing skin to a soft, even glow.",
    category: "Body",
  },
  {
    name: "Volcanic Detox Cocoon",
    duration: "90 min",
    price: "$280",
    description:
      "Volcanic clay draws out impurities before a grounding massage restores equilibrium.",
    category: "Body",
  },
  // Aromatherapy
  {
    name: "Signature Essential Blend",
    duration: "60 min",
    price: "$170",
    description:
      "A custom-composed oil blend, massaged to harmonise body and mood.",
    category: "Aromatherapy",
  },
  {
    name: "Forest & Smoke Ritual",
    duration: "75 min",
    price: "$210",
    description:
      "Cedar, vetiver, and smoke notes anchor the senses in a grounding full-body journey.",
    category: "Aromatherapy",
  },
  {
    name: "Lavender Dream Journey",
    duration: "60 min",
    price: "$180",
    description:
      "High-altitude lavender eases the mind toward deep, restorative rest.",
    category: "Aromatherapy",
  },
  // Rituals
  {
    name: "Half-Day Sanctuary",
    duration: "180 min",
    price: "$560",
    description:
      "A composed sequence of scrub, wrap, massage, and facial across three unhurried hours.",
    category: "Rituals",
  },
  {
    name: "Sunrise Awakening",
    duration: "120 min",
    price: "$380",
    description:
      "Begin the day with dry brushing, an energising massage, and a brightening facial.",
    category: "Rituals",
  },
  {
    name: "Moonlight Restoration",
    duration: "150 min",
    price: "$440",
    description:
      "An evening ritual of warm stones, aromatherapy, and a calming facial to invite sleep.",
    category: "Rituals",
  },
];

export interface SignatureTreatment {
  name: string;
  tagline: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

export const signatureTreatments: SignatureTreatment[] = [
  {
    name: "The Golden Ritual",
    tagline: "Our hallmark",
    description:
      "A champagne-gold body ritual, warm stone massage, and radiance facial — performed in our private suite and closed with a tea ceremony.",
    duration: "120 min",
    price: "$480",
    image: "/images/massage-therapy.jpg",
  },
  {
    name: "Hinoki Forest Bathing",
    tagline: "Inspired by shinrin-yoku",
    description:
      "A cypress-scented steam, wood-oil massage, and forest-tea ceremony that translate the Japanese art of forest bathing indoors.",
    duration: "90 min",
    price: "$360",
    image: "/images/treatment-room.jpg",
  },
  {
    name: "Champagne & Silk Renewal",
    tagline: "A celebratory renewal",
    description:
      "A silk body wrap, caviar facial, and chilled champagne, composed for the moments worth marking slowly.",
    duration: "150 min",
    price: "$520",
    image: "/images/aromatherapy.jpg",
  },
];

export interface SpaPackage {
  name: string;
  span: string;
  price: string;
  description: string;
  includes: string[];
  featured?: boolean;
}

export const spaPackages: SpaPackage[] = [
  {
    name: "The Escape",
    span: "Half day · 3 hours",
    price: "$420",
    description:
      "A curated half-day of three signature treatments with light spa cuisine and herbal tea.",
    includes: [
      "Three signature treatments",
      "Thermal circuit access",
      "Light spa cuisine",
      "Herbal tea service",
    ],
  },
  {
    name: "The Retreat",
    span: "Full day · 6 hours",
    price: "$780",
    description:
      "A full day of restoration across five treatments, the thermal circuit, lunch, and a private relaxation lounge.",
    includes: [
      "Five composed treatments",
      "Full thermal circuit",
      "Spa lunch & refreshments",
      "Private relaxation lounge",
      "Complimentary robe & sandals",
    ],
    featured: true,
  },
  {
    name: "The Transformation",
    span: "Two days",
    price: "$1,450",
    description:
      "A two-day immersion across our complete wellness journey, with bespoke consultation and suite access.",
    includes: [
      "Complete wellness journey",
      "Bespoke wellness consultation",
      "Private suite access",
      "All meals & refreshments",
      "Take-home ritual kit",
    ],
  },
];

export interface Product {
  name: string;
  price: string;
  description: string;
  tag: string;
}

export const products: Product[] = [
  {
    name: "Rose Quartz Cleansing Oil",
    price: "$68",
    description: "A lightweight oil that melts away impurities while leaving skin soft and balanced.",
    tag: "Cleanse",
  },
  {
    name: "Champagne Gold Serum",
    price: "$142",
    description: "A luminous serum with colloidal gold to firm, brighten, and refine texture.",
    tag: "Treat",
  },
  {
    name: "Hinoki Body Balm",
    price: "$84",
    description: "A rich balm scented with Japanese cypress to deeply nourish and ground the senses.",
    tag: "Nourish",
  },
  {
    name: "Lavender Pillow Mist",
    price: "$48",
    description: "A pure high-altitude lavender mist to quiet the mind and invite restful sleep.",
    tag: "Unwind",
  },
  {
    name: "Volcanic Mineral Mask",
    price: "$96",
    description: "A detoxifying clay mask that draws out impurities and revives dull skin.",
    tag: "Renew",
  },
  {
    name: "Botanical Hydra Essence",
    price: "$112",
    description: "A hydrating essence layered with botanical actives for plump, dewy skin.",
    tag: "Hydrate",
  },
];

export interface Therapist {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const therapists: Therapist[] = [
  {
    name: "Elena Marchetti",
    role: "Director of Wellness",
    bio: "Two decades shaping wellness programmes across Lake Como and Kyoto, devoted to the art of slow restoration.",
    image: "/images/therapist-1.jpg",
  },
  {
    name: "Hiroshi Tanaka",
    role: "Senior Therapist",
    bio: "Master of shiatsu and Lomi Lomi Nui, trained in Honolulu and Osaka, with a quiet, intuitive touch.",
    image: "/images/therapist-2.jpg",
  },
  {
    name: "Amara Okafor",
    role: "Lead Aesthetician",
    bio: "Specialist in results-driven facials and botanical skincare formulation, blending science with ritual.",
    image: "/images/therapist-3.jpg",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "From the moment you step through the doors, time slows. I left feeling lighter than I have in years.",
    name: "Vivian Laurent",
    title: "Editor-in-Chief, Maison Magazine",
  },
  {
    quote:
      "The most considered spa experience I have encountered. Nothing is rushed, nothing is loud. Pure restoration.",
    name: "Marcus Bellini",
    title: "Architect, Studio Bellini",
  },
  {
    quote:
      "A masterclass in quiet luxury. The Golden Ritual alone is worth the journey — I have already booked my return.",
    name: "Sophia Reyes",
    title: "Travel Writer, Condé Nast",
  },
];

export interface Membership {
  name: string;
  price: string;
  cadence: string;
  description: string;
  benefits: string[];
  featured?: boolean;
}

export const memberships: Membership[] = [
  {
    name: "Essential",
    price: "$180",
    cadence: "per month",
    description: "A gentle entry into the Aurelia rhythm, with one signature treatment each month.",
    benefits: [
      "One signature treatment monthly",
      "10% off additional services",
      "Thermal circuit access",
      "Complimentary herbal tea service",
    ],
  },
  {
    name: "Signature",
    price: "$420",
    cadence: "per month",
    description: "Our most chosen membership — deeper access, priority booking, and a private lounge.",
    benefits: [
      "Two signature treatments monthly",
      "15% off services & products",
      "Priority booking",
      "Quarterly guest pass",
      "Private relaxation lounge",
    ],
    featured: true,
  },
  {
    name: "Atelier",
    price: "$880",
    cadence: "per month",
    description: "Unlimited restoration with a dedicated concierge and bespoke quarterly consultations.",
    benefits: [
      "Unlimited signature treatments",
      "20% off services & products",
      "Dedicated wellness concierge",
      "Quarterly bespoke consultation",
      "Private suite access",
    ],
  },
];

export interface TrustBadge {
  label: string;
  detail: string;
}

export const trustBadges: TrustBadge[] = [
  { label: "Certified Therapists", detail: "Internationally accredited" },
  { label: "Organic Products", detail: "Clean, traceable formulations" },
  { label: "Luxury Experience", detail: "Twenty-two years of craft" },
];

export const philosophyStats: { value: string; label: string }[] = [
  { value: "18", label: "Treatment suites" },
  { value: "22", label: "Years of craft" },
  { value: "100%", label: "Organic formulations" },
  { value: "4.9", label: "Guest rating" },
];

export const navLinks: { label: string; href: string }[] = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Signature", href: "#signature" },
  { label: "Treatments", href: "#treatments" },
  { label: "Packages", href: "#packages" },
  { label: "Therapists", href: "#therapists" },
  { label: "Memberships", href: "#memberships" },
  { label: "Contact", href: "#contact" },
];
