export const IMAGES = {
  hero: 'https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000',
  mansion1: 'https://images.pexels.com/photos/8082322/pexels-photo-8082322.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  mansion2: 'https://images.pexels.com/photos/7031594/pexels-photo-7031594.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  interior1: 'https://images.pexels.com/photos/7031712/pexels-photo-7031712.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  interior2: 'https://images.pexels.com/photos/8082324/pexels-photo-8082324.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  interior3: 'https://images.pexels.com/photos/8146154/pexels-photo-8146154.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  waterfront1: 'https://images.pexels.com/photos/29702273/pexels-photo-29702273.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  waterfront2: 'https://images.pexels.com/photos/35069530/pexels-photo-35069530.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  waterfront3: 'https://images.pexels.com/photos/12715491/pexels-photo-12715491.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  kitchen1: 'https://images.pexels.com/photos/7031879/pexels-photo-7031879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  kitchen2: 'https://images.pexels.com/photos/8146212/pexels-photo-8146212.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  bathroom: 'https://images.pexels.com/photos/34119216/pexels-photo-34119216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  bedroom: 'https://images.pexels.com/photos/7722164/pexels-photo-7722164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  skyline1: 'https://images.pexels.com/photos/5855864/pexels-photo-5855864.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  skyline2: 'https://images.pexels.com/photos/5075776/pexels-photo-5075776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  neighborhood1: 'https://images.pexels.com/photos/943089/pexels-photo-943089.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  neighborhood2: 'https://images.pexels.com/photos/34354722/pexels-photo-34354722.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  neighborhood3: 'https://images.pexels.com/photos/35877118/pexels-photo-35877118.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
  pool: 'https://images.pexels.com/photos/6875530/pexels-photo-6875530.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
};

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  tag?: string;
  status?: 'available' | 'sold' | 'pending';
}

export const featuredProperties: Property[] = [
  {
    id: 1,
    title: 'Villa Serenita',
    location: 'Amalfi Coast, Italy',
    price: '$12,500,000',
    bedrooms: 6,
    bathrooms: 7,
    area: '8,200 sq ft',
    image: IMAGES.waterfront2,
    tag: 'Exclusive',
  },
  {
    id: 2,
    title: 'The Canopy Residence',
    location: 'Beverly Hills, California',
    price: '$28,900,000',
    bedrooms: 8,
    bathrooms: 10,
    area: '14,500 sq ft',
    image: IMAGES.mansion1,
    tag: 'New Listing',
  },
  {
    id: 3,
    title: 'Maison Lumiere',
    location: 'Paris 16eme, France',
    price: '$9,800,000',
    bedrooms: 5,
    bathrooms: 4,
    area: '5,400 sq ft',
    image: IMAGES.interior1,
  },
  {
    id: 4,
    title: 'Penthouse Azure',
    location: 'Dubai Marina, UAE',
    price: '$18,200,000',
    bedrooms: 4,
    bathrooms: 5,
    area: '7,800 sq ft',
    image: IMAGES.skyline1,
    tag: 'Penthouse',
  },
  {
    id: 5,
    title: 'Coastal Haven Estate',
    location: 'Malibu, California',
    price: '$34,500,000',
    bedrooms: 7,
    bathrooms: 9,
    area: '12,000 sq ft',
    image: IMAGES.waterfront3,
    tag: 'Waterfront',
  },
  {
    id: 6,
    title: 'The Glass Pavilion',
    location: 'Montecito, California',
    price: '$22,000,000',
    bedrooms: 5,
    bathrooms: 6,
    area: '9,600 sq ft',
    image: IMAGES.mansion2,
  },
];

export const soldProperties: Property[] = [
  {
    id: 101,
    title: 'Horizon Penthouse',
    location: 'Manhattan, New York',
    price: '$42,000,000',
    bedrooms: 5,
    bathrooms: 6,
    area: '8,900 sq ft',
    image: IMAGES.bedroom,
    status: 'sold',
  },
  {
    id: 102,
    title: 'Villa Botanica',
    location: 'Saint-Tropez, France',
    price: '$16,800,000',
    bedrooms: 6,
    bathrooms: 5,
    area: '7,200 sq ft',
    image: IMAGES.pool,
    status: 'sold',
  },
  {
    id: 103,
    title: 'The Marble House',
    location: 'London, Knightsbridge',
    price: '$38,500,000',
    bedrooms: 7,
    bathrooms: 8,
    area: '11,400 sq ft',
    image: IMAGES.kitchen2,
    status: 'sold',
  },
];

export interface Agent {
  id: number;
  name: string;
  title: string;
  specialization: string;
  image: string;
  sales: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Alexander Whitmore',
    title: 'Principal Agent',
    specialization: 'Waterfront & Estate Properties',
    image: 'https://images.pexels.com/photos/14564843/pexels-photo-14564843.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    sales: '$890M+',
  },
  {
    id: 2,
    name: 'Isabella Chen',
    title: 'Senior Associate',
    specialization: 'Penthouses & Urban Luxury',
    image: 'https://images.pexels.com/photos/14208763/pexels-photo-14208763.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    sales: '$620M+',
  },
  {
    id: 3,
    name: 'Marcus Sterling',
    title: 'Managing Director',
    specialization: 'International & Investment Properties',
    image: 'https://images.pexels.com/photos/804009/pexels-photo-804009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    sales: '$1.2B+',
  },
  {
    id: 4,
    name: 'Camille Laurent',
    title: 'Director of Sales',
    specialization: 'Architectural Residences',
    image: 'https://images.pexels.com/photos/7642003/pexels-photo-7642003.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
    sales: '$540M+',
  },
];

export interface Neighborhood {
  name: string;
  location: string;
  properties: number;
  image: string;
  priceFrom: string;
}

export const neighborhoods: Neighborhood[] = [
  {
    name: 'Beverly Hills',
    location: 'Los Angeles, CA',
    properties: 24,
    image: IMAGES.neighborhood3,
    priceFrom: '$4.2M',
  },
  {
    name: 'Newport Coast',
    location: 'Orange County, CA',
    properties: 18,
    image: IMAGES.neighborhood2,
    priceFrom: '$6.8M',
  },
  {
    name: 'River Oaks',
    location: 'Houston, TX',
    properties: 12,
    image: IMAGES.neighborhood1,
    priceFrom: '$3.5M',
  },
  {
    name: 'Palm Beach',
    location: 'Florida',
    properties: 31,
    image: IMAGES.waterfront1,
    priceFrom: '$5.1M',
  },
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  property: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Victoria & James Harrington',
    role: 'Homeowners, Malibu',
    text: "Elevation understood our vision from day one. They didn't just find us a home \u2014 they found us a masterpiece that perfectly embodies our lifestyle. The attention to detail and discretion throughout the process was unparalleled.",
    property: 'Acquired for $28.5M',
  },
  {
    id: 2,
    name: 'Dr. Sophia Nakamura',
    role: 'Collector & Philanthropist',
    text: "Having worked with luxury agencies across four continents, I can confidently say that Elevation operates on an entirely different level. Their market intelligence and network are genuinely extraordinary.",
    property: 'Portfolio Value: $85M+',
  },
  {
    id: 3,
    name: 'Robert & Elena Castellano',
    role: 'Investors, Monaco',
    text: "The team's expertise in global luxury markets helped us secure two exceptional properties simultaneously. Their negotiation skills saved us millions while ensuring we got exactly what we envisioned.",
    property: 'Combined Value: $52M',
  },
];

export interface MarketInsight {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
}

export const marketInsights: MarketInsight[] = [
  {
    id: 1,
    category: 'Market Analysis',
    title: 'The Ultra-Luxury Market: Why $20M+ Properties Are Outperforming',
    excerpt: 'A comprehensive look at how the top tier of residential real estate continues to defy broader market trends and attract global capital.',
    date: 'December 2025',
    image: IMAGES.skyline2,
    readTime: '8 min read',
  },
  {
    id: 2,
    category: 'Architecture',
    title: 'Biophilic Design: The New Standard in Luxury Living',
    excerpt: 'How the integration of nature into architectural design is reshaping what discerning buyers expect from premier residences.',
    date: 'November 2025',
    image: IMAGES.interior2,
    readTime: '6 min read',
  },
  {
    id: 3,
    category: 'Investment',
    title: 'Waterfront Properties: A Resilient Asset Class',
    excerpt: 'Analyzing two decades of data reveals why coastal luxury properties remain among the most stable and rewarding investments.',
    date: 'October 2025',
    image: IMAGES.waterfront1,
    readTime: '10 min read',
  },
];

export const propertyCategories = [
  { name: 'Waterfront Estates', count: 42 },
  { name: 'Penthouses', count: 28 },
  { name: 'Historic Estates', count: 15 },
  { name: 'Modern Villas', count: 56 },
  { name: 'Country Estates', count: 23 },
  { name: 'Ski Chalets', count: 12 },
];
