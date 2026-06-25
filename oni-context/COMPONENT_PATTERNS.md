# Premium Component Patterns

Standardized, responsive HTML/CSS structures for building premium components on Oni.

---

## 1. Fixed Navigation Bar (`#navbar`)
A modern header overlay with glassmorphism blending, logo branding, and CTA button.

```html
<nav id="navbar">
  <div class="nav-container">
    <a href="#" class="logo">Bistro<span>.</span></a>
    <div class="nav-links">
      <a href="#hero">Home</a>
      <a href="#features">About</a>
      <a href="#services">Menu</a>
      <a href="#testimonials">Reviews</a>
      <a href="#contact">Contact</a>
    </div>
    <a href="#contact" class="nav-cta btn">Book a Table</a>
  </div>
</nav>
```

```css
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.2rem 2rem;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text);
}
.logo span {
  color: var(--p);
}
.nav-links {
  display: flex;
  gap: 2rem;
}
.nav-links a {
  font-size: 0.95rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--t);
}
.nav-links a:hover {
  color: var(--text);
}
.nav-cta {
  background: var(--grad);
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  text-decoration: none;
}
```

## 2. Luxury Hero Section (`#hero`)
Features high typography hierarchy, overlay blur orbs, and dual CTA buttons.

```html
<section id="hero">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="hero-content">
    <div class="badge">Exclusive Culinary Journey</div>
    <h1>Modern Dining <br><span class="gradient-text">Redefined</span></h1>
    <p>Experience award-winning chef creations crafted from organic, locally-sourced ingredients in a luxurious candlelight atmosphere.</p>
    <div class="hero-actions">
      <a href="#contact" class="btn btn-primary">Reserve Table</a>
      <a href="#services" class="btn btn-secondary">Explore Menu</a>
    </div>
  </div>
</section>
```

```css
#hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
  overflow: hidden;
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
}
.hero-content h1 {
  margin: 1.5rem 0;
}
.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: var(--t);
  cursor: pointer;
}
.btn-primary {
  background: var(--grad);
  color: white;
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(124, 58, 237, 0.4);
}
.btn-secondary {
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: white;
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}
```

## 3. Glassmorphic Grid Cards (`.glass`)
Perfect for listing services, menu items, or features inside a 3-column container.

```html
<div class="features-grid">
  <div class="glass-card">
    <div class="card-icon">✨</div>
    <h3>Custom Design</h3>
    <p>Tailored interface and grid structures built from pure CSS layouts for pixel perfection.</p>
  </div>
</div>
```

```css
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: var(--r);
  padding: 2.5rem;
  transition: var(--t);
}
.glass-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
}
```
