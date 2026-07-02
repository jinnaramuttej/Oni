import fs from 'fs';
import path from 'path';

export type OniComponent = {
  id: string;
  type: 'navbar' | 'hero' | 'features' | 'services' | 'testimonials' | 'contact' | 'footer' | 'cta';
  industries: string[];
  styles: string[];
  theme: 'dark' | 'light';
  colors: string[];
  rating: number;
  htmlPath: string;
};

export const ONI_COMPONENTS_REGISTRY: OniComponent[] = [
  // Navbars
  {
    id: 'navbar-dark-centered',
    type: 'navbar',
    industries: ['general', 'saas', 'portfolio'],
    styles: ['modern', 'dark'],
    theme: 'dark',
    colors: ['#0a0a0a', '#ffffff'],
    rating: 4.8,
    htmlPath: 'oni-components/navbar/dark-centered.html'
  },
  {
    id: 'navbar-light-clean',
    type: 'navbar',
    industries: ['salon', 'medical', 'fitness', 'general'],
    styles: ['clean', 'minimal'],
    theme: 'light',
    colors: ['#ffffff', '#111111'],
    rating: 4.7,
    htmlPath: 'oni-components/navbar/light-clean.html'
  },
  {
    id: 'navbar-restaurant-transparent',
    type: 'navbar',
    industries: ['restaurant', 'general'],
    styles: ['elegant', 'transparent'],
    theme: 'dark',
    colors: ['transparent', '#ffffff'],
    rating: 4.9,
    htmlPath: 'oni-components/navbar/restaurant-transparent.html'
  },

  // Heroes
  {
    id: 'hero-dark-fullscreen',
    type: 'hero',
    industries: ['general', 'portfolio'],
    styles: ['dramatic', 'fullscreen'],
    theme: 'dark',
    colors: ['#0a0a0a', '#ffffff'],
    rating: 4.8,
    htmlPath: 'oni-components/hero/dark-fullscreen.html'
  },
  {
    id: 'hero-light-split',
    type: 'hero',
    industries: ['salon', 'medical', 'fitness', 'general'],
    styles: ['clean', 'split'],
    theme: 'light',
    colors: ['#ffffff', '#0a0a0a'],
    rating: 4.7,
    htmlPath: 'oni-components/hero/light-split.html'
  },
  {
    id: 'hero-restaurant-cinematic',
    type: 'hero',
    industries: ['restaurant', 'general'],
    styles: ['warm', 'cinematic'],
    theme: 'dark',
    colors: ['#0a0600', '#ffffff'],
    rating: 4.9,
    htmlPath: 'oni-components/hero/restaurant-cinematic.html'
  },
  {
    id: 'hero-saas-light',
    type: 'hero',
    industries: ['saas', 'general'],
    styles: ['modern', 'grid'],
    theme: 'light',
    colors: ['#f8f9ff', '#0a0a1a'],
    rating: 4.8,
    htmlPath: 'oni-components/hero/saas-light.html'
  },

  // Features
  {
    id: 'features-dark-cards',
    type: 'features',
    industries: ['general', 'restaurant', 'portfolio'],
    styles: ['modern', 'cards'],
    theme: 'dark',
    colors: ['#0a0a0a', '#ffffff'],
    rating: 4.6,
    htmlPath: 'oni-components/features/dark-cards.html'
  },
  {
    id: 'features-light-numbered',
    type: 'features',
    industries: ['saas', 'salon', 'medical', 'fitness', 'general'],
    styles: ['clean', 'numbered'],
    theme: 'light',
    colors: ['#ffffff', '#0a0a0a'],
    rating: 4.8,
    htmlPath: 'oni-components/features/light-numbered.html'
  },

  // Services
  {
    id: 'services-dark-list',
    type: 'services',
    industries: ['general', 'portfolio', 'saas'],
    styles: ['modern', 'list'],
    theme: 'dark',
    colors: ['#0d0d0d', '#ffffff'],
    rating: 4.7,
    htmlPath: 'oni-components/services/dark-list.html'
  },
  {
    id: 'services-light-pricing',
    type: 'services',
    industries: ['restaurant', 'salon', 'medical', 'fitness', 'general'],
    styles: ['clean', 'pricing'],
    theme: 'light',
    colors: ['#f8f8f8', '#111111'],
    rating: 4.8,
    htmlPath: 'oni-components/services/light-pricing.html'
  },

  // Testimonials
  {
    id: 'testimonials-dark-cards',
    type: 'testimonials',
    industries: ['general', 'restaurant', 'portfolio', 'saas'],
    styles: ['modern', 'cards'],
    theme: 'dark',
    colors: ['#070707', '#ffffff'],
    rating: 4.6,
    htmlPath: 'oni-components/testimonials/dark-cards.html'
  },
  {
    id: 'testimonials-light-centered',
    type: 'testimonials',
    industries: ['salon', 'medical', 'fitness', 'general'],
    styles: ['clean', 'centered'],
    theme: 'light',
    colors: ['#ffffff', '#111111'],
    rating: 4.8,
    htmlPath: 'oni-components/testimonials/light-centered.html'
  },

  // Contact
  {
    id: 'contact-dark-split-form',
    type: 'contact',
    industries: ['general', 'restaurant', 'portfolio', 'saas'],
    styles: ['modern', 'split'],
    theme: 'dark',
    colors: ['#0a0a0a', '#ffffff'],
    rating: 4.7,
    htmlPath: 'oni-components/contact/dark-split-form.html'
  },
  {
    id: 'contact-light-booking',
    type: 'contact',
    industries: ['salon', 'medical', 'fitness', 'general'],
    styles: ['clean', 'booking'],
    theme: 'light',
    colors: ['#fafafa', '#111111'],
    rating: 4.9,
    htmlPath: 'oni-components/contact/light-booking.html'
  },

  // CTA
  {
    id: 'cta-dark',
    type: 'cta',
    industries: ['general', 'restaurant', 'portfolio', 'saas'],
    styles: ['modern', 'centered'],
    theme: 'dark',
    colors: ['#111111', '#ffffff'],
    rating: 4.6,
    htmlPath: 'oni-components/cta/dark-cta.html'
  },
  {
    id: 'cta-light',
    type: 'cta',
    industries: ['salon', 'medical', 'fitness', 'general'],
    styles: ['clean', 'centered'],
    theme: 'light',
    colors: ['#f9fafb', '#111111'],
    rating: 4.7,
    htmlPath: 'oni-components/cta/light-cta.html'
  },

  // Footer
  {
    id: 'footer-dark-simple',
    type: 'footer',
    industries: ['general', 'restaurant', 'portfolio', 'saas'],
    styles: ['modern', 'simple'],
    theme: 'dark',
    colors: ['#080808', '#666666'],
    rating: 4.7,
    htmlPath: 'oni-components/footer/dark-simple.html'
  },
  {
    id: 'footer-light-simple',
    type: 'footer',
    industries: ['salon', 'medical', 'fitness', 'general'],
    styles: ['clean', 'simple'],
    theme: 'light',
    colors: ['#ffffff', '#777777'],
    rating: 4.8,
    htmlPath: 'oni-components/footer/light-simple.html'
  }
];

export interface BrandContextForSelection {
  industry: string;
  colors?: string;
  tone?: string;
}

/**
 * Select the best matching component for each section type
 */
export function selectComponents(brandContext: BrandContextForSelection): Record<string, OniComponent> {
  const sectionTypes: ('navbar' | 'hero' | 'features' | 'services' | 'testimonials' | 'contact' | 'footer' | 'cta')[] = [
    'navbar',
    'hero',
    'features',
    'services',
    'testimonials',
    'cta',
    'contact',
    'footer'
  ];

  const selection: Record<string, OniComponent> = {};

  // Detect theme preference from colors / tone
  let preferredTheme: 'dark' | 'light' = 'dark'; // default
  const colorStr = (brandContext.colors || '').toLowerCase();
  const toneStr = (brandContext.tone || '').toLowerCase();

  const lightKeywords = ['light', 'white', 'clean', 'minimal', 'rose gold', 'pastel', 'beige', 'ivory', 'silver', 'luxury', 'friendly'];
  const darkKeywords = ['dark', 'black', 'gold', 'neon', 'futuristic', 'intense', 'bold', 'deep', 'night', 'charcoal'];

  const hasLightKeyword = lightKeywords.some(kw => colorStr.includes(kw) || toneStr.includes(kw));
  const hasDarkKeyword = darkKeywords.some(kw => colorStr.includes(kw) || toneStr.includes(kw));

  if (hasLightKeyword && !hasDarkKeyword) {
    preferredTheme = 'light';
  } else if (hasDarkKeyword && !hasLightKeyword) {
    preferredTheme = 'dark';
  } else if (['salon', 'medical', 'saas'].includes(brandContext.industry)) {
    // Industries that skew light
    preferredTheme = 'light';
  }

  for (const type of sectionTypes) {
    const candidates = ONI_COMPONENTS_REGISTRY.filter(c => c.type === type);

    // Score each candidate
    const scored = candidates.map(c => {
      let score = 0;

      // 1. Industry match
      if (c.industries.includes(brandContext.industry)) {
        score += 10;
      } else if (c.industries.includes('general')) {
        score += 2;
      }

      // 2. Theme match
      if (c.theme === preferredTheme) {
        score += 5;
      }

      // 3. Add rating as tie-breaker
      score += c.rating;

      return { component: c, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    if (scored.length > 0) {
      selection[type] = scored[0].component;
    }
  }

  return selection;
}

export interface BrandContextForAssembly {
  businessName?: string;
  tagline?: string;
  location?: string;
  primaryColor?: string;
  secondaryColor?: string;
  phone?: string;
  email?: string;
  ctaText?: string;
  displayFont?: string;
  bodyFont?: string;
}

/**
 * Loads each component HTML, replaces placeholders with brand context values,
 * and combines them into one complete HTML document.
 */
export function assembleWebsite(
  components: Record<string, OniComponent>,
  brandContext: BrandContextForAssembly
): string {
  const orderedSections = ['navbar', 'hero', 'features', 'services', 'testimonials', 'cta', 'contact', 'footer'];

  // Default fallbacks
  const businessName = brandContext.businessName || 'My Business';
  const tagline = brandContext.tagline || 'Excellence Redefined';
  const location = brandContext.location || 'Bandra, Mumbai';
  const primaryColor = brandContext.primaryColor || '#c9a96e';
  const secondaryColor = brandContext.secondaryColor || '#4a5568';
  const phone = brandContext.phone || '+91 98765 43210';
  const email = brandContext.email || 'hello@brand.com';
  const ctaText = brandContext.ctaText || 'Get Started';
  const displayFont = brandContext.displayFont || 'Playfair Display';
  const bodyFont = brandContext.bodyFont || 'Inter';

  let sectionsHtml = '';

  for (const sectionType of orderedSections) {
    const comp = components[sectionType];
    if (!comp) continue;

    try {
      // Find full path from project root
      const fullPath = path.join(process.cwd(), comp.htmlPath);
      let content = fs.readFileSync(fullPath, 'utf-8');

      // Replace placeholders
      content = content
        .replace(/{{BUSINESS_NAME}}/g, businessName)
        .replace(/{{TAGLINE}}/g, tagline)
        .replace(/{{LOCATION}}/g, location)
        .replace(/{{PRIMARY_COLOR}}/g, primaryColor)
        .replace(/{{SECONDARY_COLOR}}/g, secondaryColor)
        .replace(/{{PHONE}}/g, phone)
        .replace(/{{EMAIL}}/g, email)
        .replace(/{{CTA_TEXT}}/g, ctaText)
        .replace(/{{DISPLAY_FONT}}/g, displayFont)
        .replace(/{{BODY_FONT}}/g, bodyFont);

      sectionsHtml += `\n<!-- Section: ${sectionType} (${comp.id}) -->\n${content}\n`;
    } catch (err) {
      console.error(`Failed to load/assemble section ${sectionType}:`, err);
    }
  }

  // Wrap in a clean, modern HTML shell
  const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} - ${tagline}</title>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${displayFont.replace(/ /g, '+')}:wght@400;500;700;800&family=${bodyFont.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${primaryColor};
      --secondary: ${secondaryColor};
      --display-font: '${displayFont}', serif;
      --body-font: '${bodyFont}', sans-serif;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html {
      scroll-behavior: smooth;
    }
    body {
      font-family: var(--body-font);
      background: #000;
      color: #fff;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body>
  ${sectionsHtml}
</body>
</html>`;

  return htmlDocument;
}
