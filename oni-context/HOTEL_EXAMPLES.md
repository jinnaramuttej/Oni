# Premium Hotel Layout Patterns

Design templates, grid codes, and details tailored specifically for luxury hotels, suites, and wellness resorts.

---

## 1. Room / Suite Grid Display (Editorial Masonry)
A showcase of premium suites with overlay description cards, hover scales, and clean specifications.

```html
<section id="suites" class="reveal">
  <div class="suites-header">
    <span class="sub-label">ACCOMMODATIONS</span>
    <h2>Bespoke Living Spaces</h2>
  </div>

  <div class="suites-grid">
    <!-- Suite 1 -->
    <div class="suite-card">
      <div class="suite-img-container" style="background-image: url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&fit=crop');">
        <div class="suite-price-badge">$850 / night</div>
      </div>
      <div class="suite-info">
        <h3>The Deluxe Ocean Vista</h3>
        <p>Wake up to panoramic ocean views from your private infinity-pool balcony. Features marble bathroom and master king suite.</p>
        <div class="suite-specs">
          <span>📏 120 m²</span>
          <span>👥 2 Guests</span>
          <span>🛁 Steam Shower</span>
        </div>
        <a href="#contact" class="btn btn-secondary">Reserve Suite</a>
      </div>
    </div>

    <!-- Suite 2 -->
    <div class="suite-card">
      <div class="suite-img-container" style="background-image: url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=80&fit=crop');">
        <div class="suite-price-badge">$1,400 / night</div>
      </div>
      <div class="suite-info">
        <h3>The Presidential Penthouse</h3>
        <p>Occupying the entire top floor, this penthouse includes high-end private bar lounge, full terrace, and 24/7 personal butler access.</p>
        <div class="suite-specs">
          <span>📏 240 m²</span>
          <span>👥 4 Guests</span>
          <span>🍷 Private Cellar</span>
        </div>
        <a href="#contact" class="btn btn-secondary">Reserve Suite</a>
      </div>
    </div>
  </div>
</section>
```

```css
.suites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem;
  margin-top: 3.5rem;
}
.suite-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--r);
  overflow: hidden;
  transition: var(--t);
}
.suite-card:hover {
  transform: translateY(-10px);
  border-color: var(--p);
  box-shadow: var(--shadow-lg);
}
.suite-img-container {
  height: 280px;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: var(--t);
}
.suite-card:hover .suite-img-container {
  filter: brightness(1.1);
}
.suite-price-badge {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  background: var(--bg);
  border: 1px solid rgba(255,255,255,0.15);
  color: var(--p);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-size: 0.85rem;
}
.suite-info {
  padding: 2.5rem;
}
.suite-info h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
}
.suite-info p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.suite-specs {
  display: flex;
  gap: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--p);
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.2rem;
}
```

## 2. Integrated Check-in & Date Selector Bar
A clean Horizontal date booking bar that fits at the bottom of the Hero section.

```html
<div class="booking-bar glass">
  <div class="input-group">
    <label>CHECK-IN</label>
    <input type="date">
  </div>
  <div class="input-group">
    <label>CHECK-OUT</label>
    <input type="date">
  </div>
  <div class="input-group">
    <label>GUESTS</label>
    <select>
      <option>1 Adult</option>
      <option selected>2 Adults</option>
      <option>3 Adults</option>
      <option>4 Adults</option>
    </select>
  </div>
  <button class="btn btn-primary">Check Availability</button>
</div>
```

```css
.booking-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  padding: 1.8rem 2.5rem;
  border-radius: 100px;
  max-width: 1000px;
  margin: -4rem auto 0;
  position: relative;
  z-index: 10;
  box-shadow: var(--shadow-lg);
}
.booking-bar .input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.booking-bar label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--p);
  margin-bottom: 0.4rem;
}
.booking-bar input, .booking-bar select {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
}
@media (max-width: 768px) {
  .booking-bar {
    border-radius: var(--r);
    flex-direction: column;
    align-items: stretch;
    margin: 2rem 1.5rem;
  }
}
```
