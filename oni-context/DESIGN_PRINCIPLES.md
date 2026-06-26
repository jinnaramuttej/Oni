# Design Principles — Oni Knowledge Base

## Core Philosophy
Every website must feel premium, intentional, and polished.
Think Stripe, Linear, Apple, Vercel — that level of quality.
Not a template. A real website a business would actually use.
Whitespace is not wasted space — it creates elegance and breathing room.
Maximum 3 fonts, 3 colors. Restraint is premium.

---

## Spacing System (8pt Grid)
All spacing is a multiple of 8px. Never deviate from this.

```css
:root {
  --s-1: 0.5rem;   /* 8px */
  --s-2: 1rem;     /* 16px */
  --s-3: 1.5rem;   /* 24px */
  --s-4: 2rem;     /* 32px */
  --s-5: 2.5rem;   /* 40px */
  --s-6: 3rem;     /* 48px */
  --s-8: 4rem;     /* 64px */
  --s-10: 5rem;    /* 80px */
  --s-12: 6rem;    /* 96px */
  --s-16: 8rem;    /* 128px */
}
```

Section padding minimum: 6rem top and bottom
Card padding: 2.5rem
Gap between grid items: 2rem
Container max-width: 1280px centered with margin:auto
Side padding on container: 0 8%

---

## Shadow System (4 levels)

```css
:root {
  --shadow-xs: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-sm: 0 4px 12px rgba(0,0,0,0.10);
  --shadow-md: 0 10px 40px rgba(0,0,0,0.12);
  --shadow-lg: 0 25px 60px rgba(0,0,0,0.20);
  --shadow-xl: 0 40px 80px rgba(0,0,0,0.28);
  /* Colored glow shadow — replace PRIMARY with actual color */
  --shadow-glow: 0 0 30px rgba(PRIMARY, 0.35);
  --shadow-glow-lg: 0 0 60px rgba(PRIMARY, 0.25);
}
```

Use layered shadows for depth:
```css
.deep-card {
  box-shadow:
    0 2px 4px rgba(0,0,0,0.06),
    0 8px 20px rgba(0,0,0,0.10),
    0 20px 40px rgba(0,0,0,0.08);
}
```

---

## Border Radius System

```css
:root {
  --r-sm: 8px;    /* small elements, tags */
  --r-md: 12px;   /* inputs, small cards */
  --r-lg: 16px;   /* cards, modals */
  --r-xl: 24px;   /* large cards, sections */
  --r-2xl: 32px;  /* hero cards */
  --r-full: 9999px; /* pills, badges, buttons */
}
```

Never use border-radius above 32px on cards.
Buttons always use --r-full (pill shape).
Inputs use --r-md (12px).
Badges and tags use --r-full.

---

## Transition System

```css
:root {
  /* Standard UI interactions */
  --t-fast: all 0.15s ease;
  --t-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --t-slow: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  --t-spring: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Property-specific */
  --t-transform: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --t-opacity: opacity 0.3s ease;
  --t-shadow: box-shadow 0.3s ease;
  --t-color: color 0.15s ease, background-color 0.15s ease;
  --t-border: border-color 0.2s ease;
}
```

Duration guidelines:
- Hover effects: 150-200ms
- Card lifts: 250-300ms
- Scroll reveals: 600-800ms
- Page transitions: 400-500ms
- Stagger between children: 80-120ms delay each

Best easing values:
- Standard: cubic-bezier(0.4, 0, 0.2, 1)
- Entrance: cubic-bezier(0, 0, 0.2, 1)
- Exit: cubic-bezier(0.4, 0, 1, 1)
- Spring/bounce: cubic-bezier(0.34, 1.56, 0.64, 1)

---

## Z-Index System

```css
:root {
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip: 600;
}
```

---

## Container System

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 8%;
}

.container-narrow {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 8%;
}

.container-wide {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 5%;
}
```

---

## The Master :root Block
Every premium website should start with this:

```css
:root {
  /* Colors — fill based on business type */
  --bg: #0A0A0A;
  --bg-2: #111111;
  --bg-3: #1A1A1A;
  --primary: #FFFFFF;
  --secondary: #AAAAAA;
  --accent: #7C3AED;
  --light: #F8F8F8;
  --text: #FFFFFF;
  --text-muted: rgba(255,255,255,0.55);
  --text-subtle: rgba(255,255,255,0.25);
  --border: rgba(255,255,255,0.08);
  --border-hover: rgba(255,255,255,0.15);
  --border-active: rgba(255,255,255,0.25);
  --grad: linear-gradient(135deg, var(--accent), var(--secondary));

  /* Spacing */
  --s-1: 0.5rem; --s-2: 1rem; --s-3: 1.5rem;
  --s-4: 2rem; --s-6: 3rem; --s-8: 4rem;
  --s-10: 5rem; --s-12: 6rem; --s-16: 8rem;

  /* Typography */
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Radii */
  --r-sm: 8px; --r-md: 12px; --r-lg: 16px;
  --r-xl: 24px; --r-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 4px 12px rgba(0,0,0,0.10);
  --shadow-md: 0 10px 40px rgba(0,0,0,0.12);
  --shadow-lg: 0 25px 60px rgba(0,0,0,0.20);

  /* Transitions */
  --t-base: all 0.3s cubic-bezier(0.4,0,0.2,1);
  --t-fast: all 0.15s ease;
  --t-slow: all 0.6s cubic-bezier(0.4,0,0.2,1);
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html { scroll-behavior: smooth; font-size: 16px; }

body {
  font-family: var(--font-body);
  font-weight: 300;
  line-height: 1.7;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

img, video { max-width: 100%; height: auto; display: block; }
ul { list-style: none; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; font-family: inherit; border: none; }
```

---

## Section Structure Rules

Every section must have:
1. Minimum padding: 6rem 0
2. A section label above the h2 (small uppercase muted text)
3. H2 in Playfair Display with gradient text
4. Subtitle paragraph below h2, max-width 560px, centered
5. Content (cards, grid, etc.)
6. class="reveal" on all animatable elements

```html
<section class="features">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">WHY CHOOSE US</span>
      <h2 class="gradient-text">Built for Excellence</h2>
      <p>We combine passion, expertise, and innovation to deliver 
         results that exceed expectations every single time.</p>
    </div>
    <!-- content -->
  </div>
</section>
```

```css
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
  padding: 0.4rem 1rem;
  border: 1px solid rgba(ACCENT, 0.3);
  border-radius: var(--r-full);
}

.section-header h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1.2rem;
}

.section-header p {
  font-size: 1.1rem;
  color: var(--text-muted);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.8;
}
```

---

## Gradient Text — Always Use This

```css
.gradient-text {
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Glassmorphism — Exact Values

Light glassmorphism (on dark backgrounds):
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

Dark glassmorphism (on light backgrounds):
```css
.glass-dark {
  background: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(12px);
}
```

Frosted navbar (most common):
```css
nav {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
```

---

## Visual Hierarchy Rules

1. H1 must be at least 3.5rem, ideally 5-7rem on desktop
2. Only ONE primary CTA per viewport — make it obvious
3. Accent color used on max 10% of the page
4. Dark sections alternate with light sections for rhythm
5. Never place two similar sections next to each other
6. Every interactive element must have a visible hover state
7. Line length for body text: max 65-70 characters (max-width ~680px)
8. Paragraph spacing: margin-bottom 1.5rem minimum

---

## Mobile Rules

```css
@media (max-width: 768px) {
  nav ul { display: none; }
  .hamburger { display: flex; }
  h1 { font-size: clamp(2.5rem, 8vw, 4rem); }
  h2 { font-size: clamp(1.8rem, 6vw, 2.5rem); }
  section { padding: 4rem 0; }
  .container { padding: 0 1.5rem; }
  .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .grid-2 { grid-template-columns: 1fr; }
  .hero-buttons { flex-direction: column; align-items: stretch; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
  .stats-row { flex-direction: column; gap: 2rem; }
}
```
