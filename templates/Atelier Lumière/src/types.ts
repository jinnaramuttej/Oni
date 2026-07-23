export interface Collection {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  span?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect?: string; // 'tall', 'wide', 'square'
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image?: string;
}

export interface Award {
  id: string;
  title: string;
  source: string;
  year: string;
}
