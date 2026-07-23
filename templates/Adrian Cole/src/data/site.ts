export const site = {
  name: "Adrian Cole",
  firstName: "Adrian",
  role: "Product Designer & Front-End Engineer",
  email: "hello@adriancole.dev",
  location: "Berlin, Germany",
  coords: "52.52° N, 13.40° E",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "GitHub", handle: "@adriancole", href: "https://github.com" },
  { label: "LinkedIn", handle: "in/adriancole", href: "https://linkedin.com" },
  { label: "Dribbble", handle: "@adrian.cole", href: "https://dribbble.com" },
  { label: "X / Twitter", handle: "@adriancole_dev", href: "https://x.com" },
] as const;

export const avatars = {
  marcus:
    "https://images.pexels.com/photos/33799456/pexels-photo-33799456.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=160&h=160",
  aisha:
    "https://images.pexels.com/photos/6497112/pexels-photo-6497112.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=160&h=160",
  elena:
    "https://images.pexels.com/photos/5649997/pexels-photo-5649997.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=160&h=160",
  daniel:
    "https://images.pexels.com/photos/7752822/pexels-photo-7752822.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=160&h=160",
} as const;
