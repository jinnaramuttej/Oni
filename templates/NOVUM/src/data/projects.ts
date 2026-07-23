export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  year: string;
  image: string;
  alt: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "meridian",
    index: "01",
    title: "Meridian",
    category: "Brand Identity",
    description:
      "A monolithic identity system for a fintech redefining trust — sculpted in stark contrast and quiet confidence.",
    year: "2024",
    image:
      "https://images.pexels.com/photos/21710165/pexels-photo-21710165.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000",
    alt: "Black and white architectural tunnel with dramatic shadow, representing the Meridian brand identity",
    tags: ["Branding", "Art Direction", "Strategy"],
  },
  {
    id: "solace",
    index: "02",
    title: "Solace",
    category: "Product & UI Design",
    description:
      "An adaptive interface language for a wellness platform — engineered for calm, built for scale.",
    year: "2024",
    image: "/images/project-ui.jpg",
    alt: "Floating smartphone and laptop displaying a minimal dark dashboard interface for the Solace product",
    tags: ["Product Design", "UI/UX", "Design System"],
  },
  {
    id: "nightfall",
    index: "03",
    title: "Nightfall",
    category: "Motion & Film",
    description:
      "A cinematic launch film blending live action and generative visuals for a global audio brand.",
    year: "2023",
    image:
      "https://images.pexels.com/photos/37911520/pexels-photo-37911520.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000",
    alt: "Cinematic neon-lit night scene with a figure, representing the Nightfall motion campaign",
    tags: ["Motion Graphics", "Film", "Sound Design"],
  },
  {
    id: "atelier",
    index: "04",
    title: "Atelier",
    category: "Architecture & Space",
    description:
      "Spatial storytelling for a flagship gallery — where light, material and form compose the brand.",
    year: "2023",
    image:
      "https://images.pexels.com/photos/35757343/pexels-photo-35757343.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000",
    alt: "Modern architectural staircase with dramatic light and shadow for the Atelier project",
    tags: ["Architecture", "Installation", "Direction"],
  },
  {
    id: "form",
    index: "05",
    title: "Form",
    category: "Packaging & Product",
    description:
      "Sculptural packaging and product photography for a skincare line built on radical minimalism.",
    year: "2022",
    image:
      "https://images.pexels.com/photos/7827839/pexels-photo-7827839.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000",
    alt: "Minimalist geometric shapes with strong contrast representing the Form product design project",
    tags: ["Product Design", "Photography", "Packaging"],
  },
  {
    id: "echo",
    index: "06",
    title: "Echo",
    category: "Digital Experience",
    description:
      "An immersive, award-winning web experience translating a city's nightlife into interactive art.",
    year: "2022",
    image:
      "https://images.pexels.com/photos/35171253/pexels-photo-35171253.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2000",
    alt: "Moody neon-lit night train station representing the Echo digital experience",
    tags: ["Web Design", "Interactive", "WebGL"],
  },
];
