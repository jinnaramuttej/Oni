# Advanced CSS Layout & Variable Systems

Guidelines for writing clean, structured, and modular Vanilla CSS layouts for generated sites.

---

## 1. Custom CSS Variables (Design System Core)
Every generated page should load design system tokens through CSS variables in the `:root` scope.

```css
:root {
  /* Color Palette */
  --bg: #0F0F1A;
  --p: #7C3AED;
  --s: #06B6D4;
  --light: #F8F8FF;
  --text: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.6);
  
  /* Gradients & Shadows */
  --grad: linear-gradient(135deg, var(--p), var(--s));
  --shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 25px 60px rgba(0, 0, 0, 0.22);
  
  /* Radii & Transitions */
  --r: 16px;
  --t: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 2. Dynamic Scroll-Reveals & Animations
Add fluid entry animations using transition timings:

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
```

## 3. High-Quality Glassmorphism
To create depth in dark mode layout blocks, utilize `backdrop-filter`:

```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--r);
}
```

## 4. Modern Flexible Grid Layouts
Avoid fixed-width columns in layouts. Use `repeat(auto-fit, minmax(N, 1fr))` for natural responsiveness:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
```

## 5. Custom Scrollbars
Match the site scrollbar design style with the dark/light mood of the business page:

```css
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--bg);
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--p);
}
```
