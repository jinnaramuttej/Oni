# Premium Restaurant Layout Patterns

Practical guidelines, structures, and HTML/CSS snippets specifically optimized for Restaurant and Bistro website categories.

---

## 1. Elegant Menu Layout with Translucent Cards
A clean two-column grid listing with elegant descriptions and price points.

```html
<section id="menu" class="reveal">
  <div class="menu-header">
    <span class="sub-label">CULINARY CREATIONS</span>
    <h2>Seasonal Tasting Menu</h2>
  </div>
  
  <div class="menu-grid">
    <!-- Starters -->
    <div class="menu-category-box glass">
      <h3>Starters</h3>
      <div class="menu-item">
        <div class="item-title-row">
          <h4>Heirloom Tomato Tart</h4>
          <span class="price">$24</span>
        </div>
        <p>Whipped goat cheese, fresh basil oil, aged balsamic, crispy pastry shell.</p>
      </div>
      <div class="menu-item">
        <div class="item-title-row">
          <h4>Pan-Seared Scallops</h4>
          <span class="price">$32</span>
        </div>
        <p>Saffron foam, parsnip puree, micro herbs, toasted hazelnuts.</p>
      </div>
    </div>

    <!-- Mains -->
    <div class="menu-category-box glass">
      <h3>Mains</h3>
      <div class="menu-item">
        <div class="item-title-row">
          <h4>Wagyu Beef Tenderloin</h4>
          <span class="price">$75</span>
        </div>
        <p>Truffle potato gratin, charred asparagus, rich red wine reduction.</p>
      </div>
      <div class="menu-item">
        <div class="item-title-row">
          <h4>Wild Mushroom Risotto</h4>
          <span class="price">$42</span>
        </div>
        <p>Carnaroli rice, forest mushrooms, fresh shavings of black summer truffle.</p>
      </div>
    </div>
  </div>
</section>
```

```css
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
.menu-category-box {
  padding: 3rem 2.5rem;
  border-radius: var(--r);
}
.menu-category-box h3 {
  font-family: 'Playfair Display', serif;
  color: var(--p);
  font-size: 1.8rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.5rem;
}
.menu-item {
  margin-bottom: 2rem;
}
.menu-item:last-child {
  margin-bottom: 0;
}
.item-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}
.item-title-row h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}
.item-title-row .price {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: var(--p);
}
.menu-item p {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-top: 0.4rem;
  line-height: 1.5;
}
```

## 2. Interactive Reservation Form (Pure JS Calendar/Booking)
A simple booking calendar popup modal or integrated section card.

```html
<div class="booking-card glass">
  <h3>Book A Table</h3>
  <form id="reservation-form">
    <div class="form-row">
      <input type="text" placeholder="Full Name" required>
      <input type="email" placeholder="Email Address" required>
    </div>
    <div class="form-row">
      <input type="date" required>
      <select required>
        <option value="" disabled selected>Select Time</option>
        <option value="17:00">5:00 PM</option>
        <option value="18:30">6:30 PM</option>
        <option value="20:00">8:00 PM</option>
        <option value="21:30">9:30 PM</option>
      </select>
    </div>
    <select required class="full-width">
      <option value="" disabled selected>Number of Guests</option>
      <option value="2">2 Guests</option>
      <option value="4">4 Guests</option>
      <option value="6">6 Guests</option>
      <option value="8+">8+ Guests</option>
    </select>
    <button type="submit" class="btn btn-primary full-width">Request Reservation</button>
  </form>
</div>
```

```css
.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.form-row input, .form-row select, .booking-card select {
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.9rem 1.2rem;
  border-radius: var(--r);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  outline: none;
}
.booking-card select option {
  background: var(--bg);
  color: white;
}
.form-row input:focus, .form-row select:focus {
  border-color: var(--p);
  background: rgba(255, 255, 255, 0.08);
}
.full-width {
  width: 100%;
  margin-bottom: 1.2rem;
}
```
