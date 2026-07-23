import type { ComponentType, SVGProps } from "react";
import {
  IconCalculator,
  IconReceipt,
  IconBriefcase,
  IconWallet,
  IconTrendingUp,
  IconFileText,
  IconBuilding,
  IconTarget,
  IconActivity,
  IconHandshake,
  IconLeaf,
  IconPiggyBank,
  IconAward,
  IconGlobe as IconGlobeIcon,
  IconShield,
} from "./components/icons";

type IconType = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Industries", href: "#industries" },
  { label: "Insights", href: "#insights" },
  { label: "Team", href: "#team" },
];

export const services: {
  title: string;
  description: string;
  icon: IconType;
  href: string;
  features: string[];
}[] = [
  {
    title: "Accounting & Bookkeeping",
    description:
      "Modern cloud-based bookkeeping with monthly close, reconciliations and real-time dashboards that bring your numbers to life.",
    icon: IconCalculator,
    href: "#book-call",
    features: ["Monthly close in 5 days", "Xero & QuickBooks", "Real-time dashboards"],
  },
  {
    title: "Tax Planning & Compliance",
    description:
      "Proactive year-round tax strategy that lowers your effective rate and keeps you fully compliant across personal and corporate filings.",
    icon: IconReceipt,
    href: "#book-call",
    features: ["Personal & corporate tax", "International structures", "R&D credits"],
  },
  {
    title: "GST & Indirect Tax",
    description:
      "End-to-end GST registration, return filing, audit support and advisory — handled by specialists who speak the language of regulators.",
    icon: IconFileText,
    href: "#book-call",
    features: ["GSTR-1 to 9 filing", "Annual return", "Department replies"],
  },
  {
    title: "Business Registration",
    description:
      "From Pvt Ltd to LLP, OPC and Section 8 — incorporation, FEMA, licences and the legal scaffolding your new venture needs to launch.",
    icon: IconBuilding,
    href: "#book-call",
    features: ["Pvt Ltd / LLP / OPC", "FEMA & RBI filings", "Licences & registrations"],
  },
  {
    title: "Payroll Management",
    description:
      "Compliant, automated payroll with payslips, TDS, PF/ESI filings and a delightful employee experience across geographies.",
    icon: IconWallet,
    href: "#book-call",
    features: ["Multi-state payroll", "TDS on salary", "PF / ESI / PT"],
  },
  {
    title: "Audit & Assurance",
    description:
      "Statutory, tax and internal audits delivered by senior partners with a forensic eye and zero tolerance for surprises.",
    icon: IconShield,
    href: "#book-call",
    features: ["Statutory audit", "Tax audit", "Internal audit"],
  },
  {
    title: "Financial Advisory",
    description:
      "Fractional CFO support for growing businesses — fundraising, unit economics, board reporting and capital strategy.",
    icon: IconTrendingUp,
    href: "#book-call",
    features: ["Fractional CFO", "Fundraising support", "Board reporting"],
  },
  {
    title: "Global Expansion",
    description:
      "US LLC, UK Ltd, Singapore Pte. Ltd and more — we handle cross-border structuring, banking and tax residency.",
    icon: IconGlobeIcon,
    href: "#book-call",
    features: ["US / UK / SG entities", "Bank account opening", "Cross-border tax"],
  },
];

export const stats = [
  { value: 15, suffix: "+", label: "Years of practice" },
  { value: 1200, suffix: "+", label: "Businesses advised" },
  { value: 42, suffix: " Cr+", label: "Tax saved for clients" },
  { value: 98, suffix: "%", label: "Client retention" },
];

export const industries = [
  { name: "SaaS & Technology", count: "180+ clients", icon: IconActivity },
  { name: "D2C & E-commerce", count: "240+ clients", icon: IconTarget },
  { name: "Manufacturing", count: "90+ clients", icon: IconBuilding },
  { name: "Professional Services", count: "150+ clients", icon: IconBriefcase },
  { name: "Healthcare & Life Sciences", count: "70+ clients", icon: IconLeaf },
  { name: "Real Estate & Infra", count: "55+ clients", icon: IconHandshake },
  { name: "Fintech & Financial Services", count: "110+ clients", icon: IconPiggyBank },
  { name: "Hospitality & Travel", count: "60+ clients", icon: IconAward },
];

export const team = [
  {
    name: "Arjun Mehta",
    role: "Founding Partner",
    credentials: "FCA, B.Com (Hons) — ex-Big 4",
    bio: "18 years advising founder-led businesses across tax, audit and capital strategy.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Priya Nair",
    role: "Partner, Tax & Advisory",
    credentials: "ACA, LL.B — International tax",
    bio: "Specialises in cross-border structuring for SaaS founders and family offices.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rahul Kapoor",
    role: "Partner, Audit & Assurance",
    credentials: "FCA, MBA — II Bangalore",
    bio: "Leads statutory and forensic audit engagements for listed and large private companies.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sneha Iyer",
    role: "Director, Global Expansion",
    credentials: "ACA, CPA (US), CFP",
    bio: "Helps Indian founders set up and operate in the US, UK, Singapore and UAE.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
];

export const testimonials = [
  {
    quote:
      "Meridian didn't just file our taxes — they rebuilt our entire finance function. We finally have the numbers to make confident decisions.",
    name: "Ananya Sharma",
    role: "Founder, Brightline D2C",
    initials: "AS",
  },
  {
    quote:
      "Their tax planning saved us ₹1.2 Cr in year one. They think like operators, not just accountants.",
    name: "Vikram Khanna",
    role: "CFO, Northwind Logistics",
    initials: "VK",
  },
  {
    quote:
      "We scaled from ₹2 Cr to ₹40 Cr ARR with Meridian as our fractional finance team. Best decision we made.",
    name: "Rohan Verma",
    role: "Co-founder, Lyra HealthTech",
    initials: "RV",
  },
  {
    quote:
      "Audit, GST, payroll, advisory — one team that knows our business inside out. Truly a partner, not a vendor.",
    name: "Meera Joshi",
    role: "Director, Joshi Hospitality",
    initials: "MJ",
  },
];

export const insights = [
  {
    category: "Tax",
    title: "The new capital gains regime: what founders should do before 31 March",
    excerpt: "A practical playbook for rebalancing your portfolio and entity structure under the latest amendments.",
    date: "12 Jan 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Compliance",
    title: "GST annual return made simple — a founder's checklist for FY25-26",
    excerpt: "Avoid the late-filing penalty trap and reconcile ITC the right way with this walkthrough.",
    date: "08 Jan 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    category: "Advisory",
    title: "When does a startup actually need a fractional CFO?",
    excerpt: "Five signals that you've outgrown a bookkeeper and are ready for strategic finance leadership.",
    date: "02 Jan 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1664575602807-e002fc8c0947?auto=format&fit=crop&w=1200&q=80",
  },
];

export const trustLogos = [
  "ICAI",
  "NASSCOM",
  "CII",
  "DPIIT",
  "Startup India",
  "Make in India",
];

export const faqs = [
  {
    q: "How quickly can you take over our books?",
    a: "Most engagements are live in 7–10 working days. We begin with a discovery call, then onboard your data, prior returns and systems before the first close.",
  },
  {
    q: "Do you work with founders outside India?",
    a: "Yes — about a third of our clients are Indian founders operating in the US, UK, Singapore and UAE. We coordinate with your overseas accountants and banks.",
  },
  {
    q: "What does engagement pricing look like?",
    a: "We bill on transparent monthly retainers, scoped to your stage and complexity. No surprise hourly bills, no junior-staff hand-me-downs.",
  },
  {
    q: "Will I work with a partner or a junior associate?",
    a: "Every client is owned by a partner. You will have a partner-led pod with a dedicated qualified CA and a client success manager — always reachable on WhatsApp.",
  },
  {
    q: "Can you handle audit, tax and advisory together?",
    a: "That's exactly what we do best. Our integrated pod model means your audit team has full context on your tax strategy and growth plans — no silos.",
  },
];
