export const BASE_CSS = `
/* BASE RESET & UTILITIES */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-body), sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
}

/* Common Layout Containers */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.grid {
  display: grid;
  gap: 2rem;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Scroll Reveal Classes */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Utility Styles */
.gradient-text {
  background: linear-gradient(135deg, var(--p), var(--s));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--r);
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 2rem;
  font-family: var(--font-body), sans-serif;
  font-weight: 500;
  border-radius: 50px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}
`;

export const PALETTES = {
  restaurant: {
    bg: "#120B0B",
    p: "#D4AF37",
    s: "#8B1E1E",
    light: "#FDF8F2",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  },
  salon: {
    bg: "#190F14",
    p: "#E29578",
    s: "#FFDDD2",
    light: "#FFF8F6",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  },
  medical: {
    bg: "#0B1528",
    p: "#0E86D4",
    s: "#055C9D",
    light: "#F0F8FF",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  },
  fitness: {
    bg: "#0A0A0A",
    p: "#39FF14",
    s: "#1F8A0D",
    light: "#F0FFF0",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  },
  saas: {
    bg: "#080710",
    p: "#6366F1",
    s: "#06B6D4",
    light: "#F3F4F6",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  },
  legal: {
    bg: "#0F1115",
    p: "#C5A880",
    s: "#535E71",
    light: "#F4F5F6",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  },
  education: {
    bg: "#0B1220",
    p: "#3B82F6",
    s: "#10B981",
    light: "#F9FAFB",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  },
  portfolio: {
    bg: "#050505",
    p: "#A855F7",
    s: "#EC4899",
    light: "#FAFAFA",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  },
  general: {
    bg: "#0A0B10",
    p: "#3B82F6",
    s: "#6366F1",
    light: "#F9FAFB",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)"
  }
};

export const FONTS = {
  restaurant: "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500&display=swap');",
  salon: "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');",
  medical: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');",
  fitness: "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Montserrat:wght@300;400;500&display=swap');",
  saas: "@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;700;800&family=Satoshi:wght@300;400;500&display=swap');",
  legal: "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500&display=swap');",
  education: "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');",
  portfolio: "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=Space+Grotesk:wght@300;400;500&display=swap');",
  general: "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');"
};

export const BASE_JS = `
// Scroll Reveal Action
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Number Counter Animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target') || '0', 10);
      let count = 0;
      const speed = 2000 / target;
      const updateCount = () => {
        count += Math.ceil(target / 100);
        if (count < target) {
          entry.target.innerText = count;
          setTimeout(updateCount, speed);
        } else {
          entry.target.innerText = target;
        }
      };
      updateCount();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

// Navbar shrink & background change on scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Toast feedback on form submit
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Success!';
      btn.style.opacity = '0.7';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });
}
`;

export function buildBrandInjection(brandAnswers: any): string {
  if (!brandAnswers) return "";
  const parts = [];
  if (brandAnswers.businessName) parts.push(`Business Name: ${brandAnswers.businessName}`);
  if (brandAnswers.primaryColor) parts.push(`Primary Brand Color: ${brandAnswers.primaryColor}`);
  if (brandAnswers.secondaryColor) parts.push(`Secondary Brand Color: ${brandAnswers.secondaryColor}`);
  if (brandAnswers.tone) parts.push(`Brand Tone: ${brandAnswers.tone}`);
  
  if (brandAnswers.logoBase64 && brandAnswers.logoBase64.trim().length > 0) {
    parts.push(`Logo Selection: The user uploaded a custom logo. You MUST use the following exact base64 image string as the src attribute for the brand logo/image in the header/navbar: <img src="${brandAnswers.logoBase64}" alt="${brandAnswers.businessName || 'Logo'}" style="max-height: 40px; width: auto;" />. Do NOT invent a text/SVG placeholder for the logo if this base64 string is provided.`);
  } else {
    parts.push(`Logo Selection: Generate an inline, gorgeous, modern, vector SVG logo using the business name (${brandAnswers.businessName || 'Brand'}) and brand colors. The SVG logo must look high-end, geometric, and professional, containing the brand name or initials styled beautifully with the brand colors.`);
  }

  if (parts.length === 0) return "";
  return `=== USER BRAND PROFILE ===\n${parts.join("\n")}\n==========================\n`;
}

export function buildTemplateInjection(industry: keyof typeof PALETTES, brandAnswers: any): string {
  const selectedIndustry = PALETTES[industry] ? industry : "general";
  const palette = PALETTES[selectedIndustry];
  const fontImport = FONTS[selectedIndustry];

  const paletteCssVariables = `
:root {
  --bg: ${palette.bg};
  --p: ${palette.p};
  --s: ${palette.s};
  --light: ${palette.light};
  --text: ${palette.text};
  --text-muted: ${palette.textMuted};
  --r: 16px;
}
  `.trim();

  const brandContext = buildBrandInjection(brandAnswers);

  return `
${brandContext}
=== SYSTEM PRE-DEFINED TEMPLATE INJECTION ===
Include the following font import at the absolute top of your CSS <style> block:
${fontImport}

You MUST declare these CSS variables in your :root selector:
${paletteCssVariables}

You MUST utilize these base CSS resets, animations, and utility styles to ensure premium design consistency:
${BASE_CSS}

You MUST inject this exact client-side JavaScript behavior within your <body>'s <script> element at the bottom to ensure fully functional interaction:
${BASE_JS}
=============================================
  `.trim();
}
