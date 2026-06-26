# Component Patterns — Oni Knowledge Base

## How to Use This File
Every component below is production-ready HTML + CSS + JS.
Copy the pattern, replace colors with CSS variables from COLOR_PALETTES.md,
and add class="reveal" to any element that should animate on scroll.
All components assume the master :root block from DESIGN_PRINCIPLES.md is present.

---

## 1. STICKY NAVBAR

```html
<nav id="navbar">
  <div class="nav-inner">
    <a href="#" class="nav-logo">Oni</a>
    <ul class="nav-links">
      <li><a href="#features">Features</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#testimonials">Testimonials</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="#contact" class="nav-cta">Get Started</a>
    <button class="nav-hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <!-- Mobile menu -->
  <div class="nav-mobile" id="mobileMenu">
    <ul>
      <li><a href="#features">Features</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#testimonials">Testimonials</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="#contact" class="nav-cta">Get Started</a>
  </div>
</nav>
```

```css
/* NAVBAR BASE */
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: padding 0.3s cubic-bezier(0.4,0,0.2,1),
              box-shadow 0.3s ease,
              background 0.3s ease;
  padding: 1.2rem 0;
}

#navbar.scrolled {
  padding: 0.6rem 0;
  background: rgba(10, 10, 10, 0.97);
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* LOGO */
.nav-logo {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.6rem;
  font-weight: 700;
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

/* LINKS */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
}

.nav-links a {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--grad);
  transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
}

.nav-links a:hover {
  color: rgba(255,255,255,1);
}

.nav-links a:hover::after {
  width: 100%;
}

/* CTA BUTTON */
.nav-cta {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #000;
  background: var(--grad);
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
  transition: transform 0.2s ease,
              box-shadow 0.2s ease,
              opacity 0.2s ease;
}

.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.45);
  opacity: 0.92;
}

/* HAMBURGER */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav-hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: rgba(255,255,255,0.8);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.nav-hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-hamburger.open span:nth-child(2) {
  opacity: 0;
}
.nav-hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* MOBILE MENU */
.nav-mobile {
  display: none;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 8% 2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.nav-mobile.open {
  display: flex;
}

.nav-mobile ul {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  list-style: none;
}

.nav-mobile a {
  color: rgba(255,255,255,0.75);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  transition: color 0.2s ease;
}

.nav-mobile a:hover {
  color: white;
}

.nav-mobile .nav-cta {
  align-self: flex-start;
  display: inline-block;
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-cta { display: none; }
  .nav-hamburger { display: flex; }
}
```

```js
// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});
```

---

## 2. HERO SECTION

```html
<section class="hero" id="home">
  <!-- Floating orbs -->
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>

  <div class="hero-content">
    <!-- Badge -->
    <div class="hero-badge">
      <span>✦</span>
      <span>Trusted by 10,000+ businesses worldwide</span>
    </div>

    <!-- Heading -->
    <h1 class="hero-title gradient-text">
      The Future of<br>Web Design
    </h1>

    <!-- Subtitle -->
    <p class="hero-subtitle">
      Describe your vision and watch it come to life instantly.
      Professional websites built by AI in seconds, not weeks.
    </p>

    <!-- Buttons -->
    <div class="hero-buttons">
      <a href="#contact" class="btn-primary">Start Building Free</a>
      <a href="#features" class="btn-secondary">See How It Works</a>
    </div>

    <!-- Stats -->
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-number">500+</span>
        <span class="stat-label">Websites Built</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-number">15s</span>
        <span class="stat-label">Avg Build Time</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-number">4.9★</span>
        <span class="stat-label">User Rating</span>
      </div>
    </div>
  </div>
</section>
```

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg) 0%, var(--bg-2) 50%, var(--bg-3) 100%);
  padding: 8rem 8% 6rem;
}

/* FLOATING ORBS */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(60px);
}

.orb-1 {
  width: 600px;
  height: 600px;
  top: -150px;
  right: -150px;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.20), transparent 70%);
  animation: orbFloat 9s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
  background: radial-gradient(circle, rgba(var(--secondary-rgb), 0.15), transparent 70%);
  animation: orbFloat 7s ease-in-out infinite reverse;
}

.orb-3 {
  width: 250px;
  height: 250px;
  top: 45%;
  left: 45%;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.10), transparent 70%);
  animation: orbFloat 11s ease-in-out infinite 2s;
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0) translateX(0) scale(1); }
  33% { transform: translateY(-30px) translateX(15px) scale(1.05); }
  66% { transform: translateY(15px) translateX(-20px) scale(0.97); }
}

/* HERO CONTENT */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 820px;
  width: 100%;
}

/* BADGE */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 9999px;
  padding: 0.4rem 1rem;
  margin-bottom: 2rem;
  background: rgba(255,255,255,0.04);
  animation: fadeInUp 0.6s ease both;
}

.hero-badge span:first-child {
  color: var(--primary);
}

/* TITLE */
.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3.5rem, 9vw, 7rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-bottom: 1.8rem;
  animation: fadeInUp 0.8s 0.1s ease both;
}

/* GRADIENT TEXT */
.gradient-text {
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* SUBTITLE */
.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.8;
  color: rgba(255,255,255,0.60);
  max-width: 560px;
  margin: 0 auto 2.5rem;
  animation: fadeInUp 0.8s 0.2s ease both;
}

/* BUTTONS */
.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
  animation: fadeInUp 0.8s 0.3s ease both;
}

.btn-primary {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #000;
  background: var(--grad);
  padding: 0.9rem 2.2rem;
  border-radius: 9999px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 30px rgba(var(--primary-rgb), 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(var(--primary-rgb), 0.50);
  opacity: 0.93;
}

.btn-primary:active {
  transform: translateY(-1px);
}

.btn-secondary {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.80);
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.15);
  padding: 0.9rem 2.2rem;
  border-radius: 9999px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.10);
  border-color: rgba(255,255,255,0.28);
  color: white;
  transform: translateY(-2px);
}

/* STATS */
.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  animation: fadeInUp 0.8s 0.45s ease both;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255,255,255,0.40);
  letter-spacing: 0.05em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.10);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(36px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 3. FEATURE CARDS

```html
<section class="features" id="features">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">WHY CHOOSE US</span>
      <h2 class="gradient-text">Built for Excellence</h2>
      <p>We combine cutting-edge technology with intuitive design
         to deliver results that exceed every expectation.</p>
    </div>
    <div class="features-grid">
      <div class="feature-card reveal" style="--delay:0ms">
        <div class="feature-icon">✨</div>
        <h3>Lightning Fast</h3>
        <p>Generate complete, production-ready websites in under
           15 seconds. Our AI works at the speed of thought,
           turning your ideas into reality instantly.</p>
      </div>
      <div class="feature-card reveal" style="--delay:100ms">
        <div class="feature-icon">🎨</div>
        <h3>Premium Design</h3>
        <p>Every website is crafted with professional design
           principles. Beautiful typography, cohesive color palettes,
           and stunning animations included by default.</p>
      </div>
      <div class="feature-card reveal" style="--delay:200ms">
        <div class="feature-icon">📱</div>
        <h3>Fully Responsive</h3>
        <p>Your website looks perfect on every device from the
           first generation. Mobile-first design ensures flawless
           experiences across all screen sizes automatically.</p>
      </div>
    </div>
  </div>
</section>
```

```css
.features {
  padding: 7rem 0;
  background: var(--light);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 2.8rem 2.4rem;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    rgba(var(--primary-rgb), 0.04),
    transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 20px;
}

.feature-card:hover {
  transform: translateY(-14px);
  box-shadow: 0 30px 70px rgba(0,0,0,0.14);
  border-color: rgba(var(--primary-rgb), 0.20);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--grad);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1.8rem;
  box-shadow: 0 8px 20px rgba(var(--primary-rgb), 0.30);
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.08) rotate(-3deg);
}

.feature-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.feature-card p {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.8;
}

/* Section header styles */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.2rem;
  padding: 0.35rem 1rem;
  border: 1px solid rgba(var(--primary-rgb), 0.25);
  border-radius: 9999px;
  background: rgba(var(--primary-rgb), 0.06);
}

.section-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1.2rem;
  line-height: 1.15;
}

.section-header p {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 1.05rem;
  color: #666;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.8;
}
```

---

## 4. SERVICES / MENU ITEMS (Dark Section)

```html
<section class="services" id="services">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">WHAT WE OFFER</span>
      <h2 class="gradient-text">Our Services</h2>
      <p>Comprehensive solutions tailored to your specific
         needs and business goals.</p>
    </div>
    <div class="services-grid">
      <div class="service-card glass reveal" style="--delay:0ms">
        <div class="service-top">
          <span class="service-icon">🌐</span>
          <span class="service-price">$299</span>
        </div>
        <h3>Landing Page</h3>
        <p>High-converting single page designed to capture
           leads and drive sales for your product or service.</p>
        <div class="service-tags">
          <span>Responsive</span>
          <span>SEO Ready</span>
          <span>Fast</span>
        </div>
      </div>
      <div class="service-card glass reveal" style="--delay:100ms">
        <div class="service-top">
          <span class="service-icon">🛍️</span>
          <span class="service-price">$599</span>
        </div>
        <h3>E-commerce Store</h3>
        <p>Full online store with product pages, cart, checkout,
           and payment integration ready to sell from day one.</p>
        <div class="service-tags">
          <span>Payment Ready</span>
          <span>Inventory</span>
          <span>Analytics</span>
        </div>
      </div>
      <div class="service-card glass reveal" style="--delay:200ms">
        <div class="service-top">
          <span class="service-icon">💼</span>
          <span class="service-price">$449</span>
        </div>
        <h3>Business Website</h3>
        <p>Multi-page professional website with about, services,
           blog, and contact sections for established businesses.</p>
        <div class="service-tags">
          <span>Multi-page</span>
          <span>Blog</span>
          <span>CMS</span>
        </div>
      </div>
      <div class="service-card glass reveal" style="--delay:300ms">
        <div class="service-top">
          <span class="service-icon">🎨</span>
          <span class="service-price">$349</span>
        </div>
        <h3>Portfolio Site</h3>
        <p>Stunning showcase for your work with gallery grids,
           case studies, and client testimonials built in.</p>
        <div class="service-tags">
          <span>Gallery</span>
          <span>Case Studies</span>
          <span>Contact</span>
        </div>
      </div>
      <div class="service-card glass reveal" style="--delay:400ms">
        <div class="service-top">
          <span class="service-icon">📱</span>
          <span class="service-price">$499</span>
        </div>
        <h3>SaaS Landing</h3>
        <p>Conversion-optimized landing page for software products
           with pricing tables, feature grids, and social proof.</p>
        <div class="service-tags">
          <span>Pricing Table</span>
          <span>Features</span>
          <span>Testimonials</span>
        </div>
      </div>
      <div class="service-card glass reveal" style="--delay:500ms">
        <div class="service-top">
          <span class="service-icon">📰</span>
          <span class="service-price">$249</span>
        </div>
        <h3>Blog / Magazine</h3>
        <p>Editorial-style content platform with categories,
           search, featured posts, and newsletter signup included.</p>
        <div class="service-tags">
          <span>Editorial</span>
          <span>Newsletter</span>
          <span>Search</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.services {
  padding: 7rem 0;
  background: var(--bg);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2.2rem;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
              border-color 0.3s ease,
              background 0.3s ease,
              box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-8px);
  border-color: rgba(var(--primary-rgb), 0.35);
  background: rgba(var(--primary-rgb), 0.06);
  box-shadow: 0 20px 50px rgba(0,0,0,0.30),
              0 0 0 1px rgba(var(--primary-rgb), 0.15);
}

.service-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.service-icon {
  font-size: 2rem;
  display: block;
}

.service-price {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.service-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: rgba(255,255,255,0.92);
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.service-card p {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-tags span {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  color: rgba(255,255,255,0.50);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  letter-spacing: 0.03em;
}
```

---

## 5. TESTIMONIALS

```html
<section class="testimonials" id="testimonials">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">WHAT CLIENTS SAY</span>
      <h2>Loved by Businesses</h2>
      <p>Don't take our word for it. Here's what real customers
         say about their experience with us.</p>
    </div>
    <div class="testimonials-grid">
      <div class="testimonial-card reveal" style="--delay:0ms">
        <div class="testimonial-quote">"</div>
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">
          "Absolutely blown away by the quality. We described our
          restaurant in a few sentences and got back a website that
          looked like it cost $15,000. Our bookings increased 40%
          in the first month alone."
        </p>
        <div class="testimonial-author">
          <div class="author-avatar">RM</div>
          <div class="author-info">
            <span class="author-name">Rajesh Mehta</span>
            <span class="author-role">Owner, Spice Garden Restaurant</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card reveal" style="--delay:120ms">
        <div class="testimonial-quote">"</div>
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">
          "We've tried every website builder on the market and nothing
          comes close. The AI actually understands design — the
          animations, the colors, the typography. It's not just
          a template, it's a real website."
        </p>
        <div class="testimonial-author">
          <div class="author-avatar">SP</div>
          <div class="author-info">
            <span class="author-name">Sarah Patterson</span>
            <span class="author-role">Founder, Bloom Beauty Studio</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card reveal" style="--delay:240ms">
        <div class="testimonial-quote">"</div>
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-text">
          "Built our entire agency portfolio in one afternoon. The
          client was shocked when I told them it took less than an
          hour. This tool has completely transformed how we deliver
          projects and our margins are incredible now."
        </p>
        <div class="testimonial-author">
          <div class="author-avatar">AK</div>
          <div class="author-info">
            <span class="author-name">Arjun Kapoor</span>
            <span class="author-role">Creative Director, Pixel & Co</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.testimonials {
  padding: 7rem 0;
  background: var(--light);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
              box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 70px rgba(0,0,0,0.12);
}

.testimonial-quote {
  font-family: 'Playfair Display', serif;
  font-size: 8rem;
  line-height: 1;
  color: var(--primary);
  opacity: 0.10;
  position: absolute;
  top: -10px;
  left: 20px;
  pointer-events: none;
  user-select: none;
}

.testimonial-stars {
  font-size: 1rem;
  color: #F59E0B;
  letter-spacing: 2px;
  margin-bottom: 1.2rem;
  position: relative;
  z-index: 1;
}

.testimonial-text {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.85;
  margin-bottom: 1.8rem;
  font-style: italic;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--grad);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.author-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #111;
}

.author-role {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: #888;
}
```

---

## 6. CONTACT FORM WITH FLOATING LABELS

```html
<section class="contact" id="contact">
  <div class="container">
    <div class="contact-grid">
      <!-- Left info -->
      <div class="contact-info reveal">
        <span class="section-label">GET IN TOUCH</span>
        <h2 class="gradient-text">Let's Build Something Amazing</h2>
        <p>Ready to transform your online presence? Tell us about
           your project and we'll get back to you within 24 hours.</p>
        <div class="contact-details">
          <div class="contact-item">
            <span class="contact-icon">📍</span>
            <div>
              <span class="contact-item-label">Location</span>
              <span class="contact-item-value">Hyderabad, Telangana, India</span>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📞</span>
            <div>
              <span class="contact-item-label">Phone</span>
              <span class="contact-item-value">+91 98765 43210</span>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-icon">✉️</span>
            <div>
              <span class="contact-item-label">Email</span>
              <span class="contact-item-value">hello@oni.app</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Right form -->
      <div class="contact-form-wrap reveal" style="--delay:150ms">
        <form class="contact-form" id="contactForm">
          <div class="form-row">
            <div class="form-group">
              <input type="text" id="fname" placeholder=" " required>
              <label for="fname">Your Name</label>
            </div>
            <div class="form-group">
              <input type="email" id="femail" placeholder=" " required>
              <label for="femail">Email Address</label>
            </div>
          </div>
          <div class="form-group">
            <input type="text" id="fsubject" placeholder=" " required>
            <label for="fsubject">Subject</label>
          </div>
          <div class="form-group">
            <textarea id="fmessage" rows="5" placeholder=" " required></textarea>
            <label for="fmessage">Your Message</label>
          </div>
          <button type="submit" class="form-submit" id="submitBtn">
            Send Message ✦
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
```

```css
.contact {
  padding: 7rem 0;
  background: linear-gradient(135deg, var(--bg) 0%, var(--bg-3) 100%);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 6rem;
  align-items: start;
}

/* INFO SIDE */
.contact-info h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin: 1.2rem 0;
  line-height: 1.2;
}

.contact-info > p {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.contact-icon {
  font-size: 1.4rem;
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-item-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  margin-bottom: 0.2rem;
}

.contact-item-value {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(255,255,255,0.80);
}

/* FORM SIDE */
.contact-form-wrap {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 2.8rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
}

/* FLOATING LABEL GROUPS */
.form-group {
  position: relative;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1.1rem 1.2rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  outline: none;
  transition: border-color 0.25s ease,
              background 0.25s ease,
              box-shadow 0.25s ease;
  resize: none;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: transparent;
}

.form-group label {
  position: absolute;
  left: 1.2rem;
  top: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  pointer-events: none;
  transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
  transform-origin: left top;
}

/* Float label on focus or filled */
.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group textarea:focus + label,
.form-group textarea:not(:placeholder-shown) + label {
  transform: translateY(-2.1rem) scale(0.78);
  color: var(--primary);
  font-weight: 500;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  background: rgba(255,255,255,0.08);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.12);
}

/* SUBMIT */
.form-submit {
  width: 100%;
  padding: 1.1rem 2rem;
  background: var(--grad);
  border: none;
  border-radius: 12px;
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(var(--primary-rgb), 0.30);
  transition: transform 0.2s ease,
              box-shadow 0.2s ease,
              opacity 0.2s ease;
  margin-top: 0.5rem;
}

.form-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 35px rgba(var(--primary-rgb), 0.45);
  opacity: 0.92;
}

.form-submit:active {
  transform: translateY(-1px);
}

.form-submit.success {
  background: linear-gradient(135deg, #10b981, #059669);
  box-shadow: 0 8px 25px rgba(16,185,129,0.30);
}

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  .form-row { grid-template-columns: 1fr; }
  .contact-form-wrap { padding: 2rem 1.5rem; }
}
```

```js
// Contact form submit
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.classList.add('success');
      contactForm.reset();
      setTimeout(() => {
        submitBtn.textContent = 'Send Message ✦';
        submitBtn.classList.remove('success');
        submitBtn.disabled = false;
      }, 3500);
    }, 1200);
  });
}
```

---

## 7. CTA SECTION

```html
<section class="cta-section">
  <div class="cta-orb cta-orb-1"></div>
  <div class="cta-orb cta-orb-2"></div>
  <div class="container">
    <div class="cta-content reveal">
      <span class="section-label">START TODAY</span>
      <h2>Ready to Build Your Dream Website?</h2>
      <p>Join thousands of businesses who have already transformed
         their online presence with Oni. It takes less than a minute
         to get started and your first website is completely free.</p>
      <div class="cta-buttons">
        <a href="#" class="btn-primary">Build My Website Free</a>
        <a href="#" class="btn-secondary">See Examples</a>
      </div>
      <p class="cta-note">No credit card required · Cancel anytime</p>
    </div>
  </div>
</section>
```

```css
.cta-section {
  padding: 8rem 0;
  background: linear-gradient(135deg, var(--bg-3), var(--bg));
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.cta-orb-1 {
  width: 500px;
  height: 500px;
  top: -200px;
  left: -100px;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.15), transparent 70%);
  animation: orbFloat 10s ease-in-out infinite;
}

.cta-orb-2 {
  width: 350px;
  height: 350px;
  bottom: -150px;
  right: -50px;
  background: radial-gradient(circle, rgba(var(--secondary-rgb), 0.12), transparent 70%);
  animation: orbFloat 8s ease-in-out infinite reverse;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 700;
  color: white;
  line-height: 1.15;
  margin: 1rem 0 1.5rem;
}

.cta-content > p {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 1.05rem;
  color: rgba(255,255,255,0.58);
  line-height: 1.8;
  max-width: 560px;
  margin: 0 auto 2.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.cta-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.30);
  letter-spacing: 0.03em;
}
```

---

## 8. FOOTER

```html
<footer class="footer" id="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Col 1: Brand -->
      <div class="footer-col footer-brand">
        <a href="#" class="footer-logo">Oni</a>
        <p>The world's most intelligent AI website builder.
           Describe it, and we build it — beautifully.</p>
        <div class="footer-contact">
          <span>📍 Hyderabad, India</span>
          <span>📞 +91 98765 43210</span>
          <span>✉️ hello@oni.app</span>
        </div>
      </div>
      <!-- Col 2: Product -->
      <div class="footer-col">
        <h4>Product</h4>
        <ul>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Templates</a></li>
          <li><a href="#">Changelog</a></li>
          <li><a href="#">Roadmap</a></li>
        </ul>
      </div>
      <!-- Col 3: Company -->
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <!-- Col 4: Social -->
      <div class="footer-col">
        <h4>Follow Us</h4>
        <div class="footer-socials">
          <a href="#" class="social-link" title="Instagram">📷</a>
          <a href="#" class="social-link" title="Twitter">🐦</a>
          <a href="#" class="social-link" title="LinkedIn">💼</a>
          <a href="#" class="social-link" title="GitHub">⌨️</a>
        </div>
        <div class="footer-newsletter">
          <p>Get design tips weekly</p>
          <div class="newsletter-form">
            <input type="email" placeholder="your@email.com">
            <button>→</button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Oni. All rights reserved.</span>
      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
```

```css
.footer {
  background: var(--bg);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 5rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

/* BRAND COL */
.footer-logo {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.6rem;
  font-weight: 700;
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  margin-bottom: 1rem;
}

.footer-brand > p {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.75;
  margin-bottom: 1.5rem;
  max-width: 260px;
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-contact span {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.40);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* OTHER COLS */
.footer-col h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin-bottom: 1.5rem;
  letter-spacing: 0.01em;
}

.footer-col ul {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
}

.footer-col ul a {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 300;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-block;
}

.footer-col ul a:hover {
  color: rgba(255,255,255,0.90);
  transform: translateX(4px);
}

/* SOCIALS */
.footer-socials {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: rgba(255,255,255,0.10);
  border-color: rgba(255,255,255,0.20);
  transform: translateY(-3px);
}

/* NEWSLETTER */
.footer-newsletter p {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.35);
  margin-bottom: 0.8rem;
  letter-spacing: 0.03em;
}

.newsletter-form {
  display: flex;
  gap: 0;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  overflow: hidden;
}

.newsletter-form input {
  flex: 1;
  padding: 0.7rem 1rem;
  background: rgba(255,255,255,0.05);
  border: none;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  outline: none;
}

.newsletter-form input::placeholder {
  color: rgba(255,255,255,0.25);
}

.newsletter-form button {
  padding: 0.7rem 1rem;
  background: var(--grad);
  border: none;
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.newsletter-form button:hover {
  opacity: 0.85;
}

/* BOTTOM BAR */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom span {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.28);
}

.footer-legal {
  display: flex;
  gap: 2rem;
}

.footer-legal a {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.28);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover {
  color: rgba(255,255,255,0.65);
}

@media (max-width: 1024px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
}

@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
  .footer-legal { gap: 1.2rem; }
}
```

---

## 9. SCROLL REVEAL SYSTEM
Add this JS to every website — it handles all reveal animations:

```js
// Universal scroll reveal with stagger
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.style.getPropertyValue('--delay') || '0ms';
      entry.target.style.transitionDelay = delay;
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});
```

```css
/* Initial state */
.reveal {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1),
              transform 0.7s cubic-bezier(0.4,0,0.2,1);
}

/* Revealed state */
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 10. STATS COUNTER SECTION

```html
<section class="stats-section">
  <div class="container">
    <div class="stats-grid reveal">
      <div class="stat-item">
        <span class="stat-count" data-target="10000">0</span>
        <span class="stat-suffix">+</span>
        <p>Websites Built</p>
      </div>
      <div class="stat-item">
        <span class="stat-count" data-target="98">0</span>
        <span class="stat-suffix">%</span>
        <p>Customer Satisfaction</p>
      </div>
      <div class="stat-item">
        <span class="stat-count" data-target="15">0</span>
        <span class="stat-suffix">s</span>
        <p>Average Build Time</p>
      </div>
      <div class="stat-item">
        <span class="stat-count" data-target="50">0</span>
        <span class="stat-suffix">+</span>
        <p>Industry Templates</p>
      </div>
    </div>
  </div>
</section>
```

```css
.stats-section {
  padding: 6rem 0;
  background: var(--bg-2);
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
}

.stat-count {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.stat-suffix {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-item p {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(255,255,255,0.40);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 0.8rem;
}

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr; }
}
```

```js
// Counter animation triggered by IntersectionObserver
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-count').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) counterObserver.observe(statsGrid);
```

---

## 11. FAQ ACCORDION

```html
<section class="faq-section">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">FAQ</span>
      <h2 class="gradient-text">Common Questions</h2>
      <p>Everything you need to know about Oni.</p>
    </div>
    <div class="faq-list reveal">
      <div class="faq-item">
        <button class="faq-question">
          <span>How long does it take to build a website?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Most websites are generated in under 15 seconds. Complex
             multi-section websites may take up to 30 seconds. You'll
             see your website appear live in the preview panel as it's
             being generated in real time.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Can I edit the generated website?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Yes — you can ask Oni to make changes in natural language,
             view and edit the source code directly in the Code tab, or
             download the complete ZIP file and edit it in any code
             editor you prefer.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Do I need coding knowledge?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Zero coding required. Just describe what you want in plain
             English and Oni handles everything. If you are a developer,
             you'll love the code editor and the ability to download
             clean, well-structured HTML/CSS/JS.</p>
        </div>
      </div>
      <div class="faq-item">
        <button class="faq-question">
          <span>Can I use my own images?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Absolutely. You can paste images directly into the chat
             with Ctrl+V, drag and drop them onto the input, or click the paperclip icon. Oni will automatically scale and compress them to optimize build performance.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.faq-section {
  padding: 7rem 0;
  background: var(--bg-2);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: var(--t-base);
}

.faq-item:hover {
  border-color: rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
}

.faq-question {
  width: 100%;
  padding: 1.8rem 2rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
}

.faq-icon {
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 300;
  color: var(--accent);
  transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-answer p {
  padding: 0 2rem 2.2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  color: rgba(255,255,255,0.60);
  line-height: 1.8;
}
```

```js
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = btn.nextElementSibling;
    
    // Toggle active class
    item.classList.toggle('active');
    
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.querySelector('.faq-icon').textContent = '−';
    } else {
      answer.style.maxHeight = null;
      btn.querySelector('.faq-icon').textContent = '+';
    }
  });
});
```

---

## 12. TEAM SECTION (Hover Effect)

```html
<section class="team-section" id="team">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">OUR TEAM</span>
      <h2 class="gradient-text">Creative Minds</h2>
      <p>Meet the engineers and designers building the future of web generation.</p>
    </div>
    <div class="team-grid">
      <div class="team-member reveal" style="--delay:0ms">
        <div class="member-image-wrap">
          <img src="https://images.unsplash.com/photo-1522071820-1522071820?w=600&q=80&fit=crop" alt="Jane Doe">
          <div class="member-overlay">
            <div class="member-socials">
              <a href="#">💼</a>
              <a href="#">🐦</a>
            </div>
          </div>
        </div>
        <h4>Jane Doe</h4>
        <p>Lead AI Engineer</p>
      </div>
      <div class="team-member reveal" style="--delay:100ms">
        <div class="member-image-wrap">
          <img src="https://images.unsplash.com/photo-1497366216-1497366216?w=600&q=80&fit=crop" alt="Arjun Kapoor">
          <div class="member-overlay">
            <div class="member-socials">
              <a href="#">💼</a>
              <a href="#">🐦</a>
            </div>
          </div>
        </div>
        <h4>Arjun Kapoor</h4>
        <p>Creative Director</p>
      </div>
      <div class="team-member reveal" style="--delay:200ms">
        <div class="member-image-wrap">
          <img src="https://images.unsplash.com/photo-1542314831?w=600&q=80&fit=crop" alt="Sarah Patterson">
          <div class="member-overlay">
            <div class="member-socials">
              <a href="#">💼</a>
              <a href="#">🐦</a>
            </div>
          </div>
        </div>
        <h4>Sarah Patterson</h4>
        <p>Product Designer</p>
      </div>
    </div>
  </div>
</section>
```

```css
.team-section {
  padding: 7rem 0;
  background: var(--light);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
}

.team-member {
  text-align: center;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 1.5rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

.team-member:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 45px rgba(0,0,0,0.12);
}

.member-image-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  aspect-ratio: 1;
}

.member-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-member:hover .member-image-wrap img {
  transform: scale(1.08);
}

.member-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.team-member:hover .member-overlay {
  opacity: 1;
}

.member-socials {
  display: flex;
  gap: 1rem;
}

.member-socials a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.member-socials a:hover {
  transform: scale(1.1);
}

.team-member h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.3rem;
}

.team-member p {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}
```

---

## 13. PORTFOLIO/GALLERY HOVER

```html
<section class="gallery-section" id="portfolio">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-label">PORTFOLIO</span>
      <h2 class="gradient-text">Recent Creations</h2>
      <p>A selection of premium websites and brand platforms designed by our team.</p>
    </div>
    <div class="gallery-grid">
      <div class="gallery-item reveal" style="--delay:0ms">
        <img src="https://images.unsplash.com/photo-1497366216-1497366216?w=800&q=80&fit=crop" alt="Project 1">
        <div class="gallery-overlay">
          <div class="gallery-overlay-content">
            <span class="gallery-cat">Brand Design</span>
            <h4>Modern Workspace</h4>
          </div>
        </div>
      </div>
      <div class="gallery-item reveal" style="--delay:100ms">
        <img src="https://images.unsplash.com/photo-1542314831?w=800&q=80&fit=crop" alt="Project 2">
        <div class="gallery-overlay">
          <div class="gallery-overlay-content">
            <span class="gallery-cat">Hospitality</span>
            <h4>Luxury Retreat</h4>
          </div>
        </div>
      </div>
      <div class="gallery-item reveal" style="--delay:200ms">
        <img src="https://images.unsplash.com/photo-1495474472?w=800&q=80&fit=crop" alt="Project 3">
        <div class="gallery-overlay">
          <div class="gallery-overlay-content">
            <span class="gallery-cat">Retail</span>
            <h4>Specialty Brews</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

```css
.gallery-section {
  padding: 7rem 0;
  background: var(--bg);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.gallery-item {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 1.4;
  border: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 10, 0.9) 10%, rgba(10, 10, 10, 0.2) 80%);
  display: flex;
  align-items: flex-end;
  padding: 2.2rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.08);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-overlay-content {
  transform: translateY(15px);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.gallery-item:hover .gallery-overlay-content {
  transform: translateY(0);
}

.gallery-cat {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.gallery-overlay-content h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-top: 0.5rem;
}
```

---

## 14. MODAL / POPUP

```html
<div class="modal" id="bookingModal">
  <div class="modal-backdrop" id="modalBackdrop"></div>
  <div class="modal-wrapper">
    <div class="modal-content glass">
      <button class="modal-close" id="closeModalBtn" aria-label="Close">&times;</button>
      <span class="section-label">RESERVATION</span>
      <h3>Book Your Stay</h3>
      <p>Select your dates and guests to lock in your clifftop experience.</p>
      <form class="modal-form">
        <div class="form-group">
          <input type="date" required id="checkin-date" placeholder=" ">
          <label for="checkin-date">Check-in Date</label>
        </div>
        <div class="form-group">
          <input type="date" required id="checkout-date" placeholder=" ">
          <label for="checkout-date">Check-out Date</label>
        </div>
        <button type="submit" class="form-submit">Confirm Reservation</button>
      </form>
    </div>
  </div>
</div>
```

```css
.modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal.show {
  display: flex;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal.show .modal-backdrop {
  opacity: 1;
}

.modal-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 500px;
  transform: translateY(30px) scale(0.95);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
}

.modal.show .modal-wrapper {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.modal-content {
  background: rgba(25, 25, 25, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  padding: 3rem 2.8rem;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.8rem;
  background: none;
  border: none;
  color: rgba(255,255,255,0.40);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: white;
}

.modal-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0.8rem 0 0.5rem;
}

.modal-content p {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.50);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
```

```js
const modal = document.getElementById('bookingModal');
const backdrop = document.getElementById('modalBackdrop');
const closeBtn = document.getElementById('closeModalBtn');

function openModal() {
  modal.style.display = 'flex';
  // Force reflow
  modal.offsetHeight;
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 400);
}

if (backdrop) backdrop.addEventListener('click', closeModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);
```

---

## 15. TOAST NOTIFICATION

```html
<div class="toast" id="toastNotification">
  <span class="toast-icon">✦</span>
  <span class="toast-message">Your selection has been saved!</span>
</div>
```

```css
.toast {
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  z-index: 3000;
  background: rgba(20, 20, 20, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 1rem 1.8rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: var(--shadow-lg);
  transform: translateY(100px) scale(0.9);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  pointer-events: none;
}

.toast.show {
  transform: translateY(0) scale(1);
  opacity: 1;
  pointer-events: auto;
}

.toast-icon {
  color: var(--accent);
  font-size: 1.1rem;
}

.toast-message {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: white;
}
```

```js
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
```
