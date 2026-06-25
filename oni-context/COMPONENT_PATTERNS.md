# Premium UI Component Patterns

This document provides complete code examples (HTML, CSS, and lightweight JS) for standard high-end UI components that can be used on generated landing pages.

---

## 1. Glassmorphism Navbar
A modern header overlay with glassmorphism blending, logo branding, and navigation actions.
```html
<nav class="glass-nav">
  <a href="#" class="logo">Logo</a>
  <div class="nav-links">
    <a href="#">Features</a>
    <a href="#">Pricing</a>
    <a href="#">Contact</a>
  </div>
</nav>
```
```css
.glass-nav {
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.1);
  position: fixed; top:0; left:0; right:0;
  padding: 1rem 2rem;
  display: flex; justify-content: space-between;
  align-items: center;
  z-index: 1000;
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.glass-nav a { color: #fff; text-decoration: none; margin: 0 1rem; }
.glass-nav a:hover { opacity: 0.8; }
```

## 2. Hero with Floating Gradient Orbs
Features high typography hierarchy, overlay blur orbs, and dual CTA buttons.
```html
<section class="hero hero-gradient">
  <h1>Welcome to Oni</h1>
  <p>AI-built websites in one shot</p>
  <button class="btn">Get Started</button>
  <div class="orb" style="--x:10%;--y:20%;--size:150px;"></div>
  <div class="orb" style="--x:80%;--y:30%;--size:200px;"></div>
</section>
```
```css
.hero-gradient {
  position: relative; padding: 8rem 2rem; text-align: center;
  background: linear-gradient(135deg, #1E3A8A, #2563EB);
  color: #fff;
  overflow: hidden;
}
.hero-gradient h1 { font-size: 3rem; margin-bottom: 1rem; }
.hero-gradient .btn { margin-top: 1rem; }
.orb {
  position:absolute; 
  left: var(--x); top: var(--y);
  width: var(--size); height: var(--size);
  background: radial-gradient(circle, rgba(255,255,255,0.2), transparent);
  border-radius:50%; filter: blur(20px);
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-30px);} }
```

## 3. Feature Cards with Icon, Hover Glow, and Scroll-Reveal
```html
<div class="features">
  <div class="card" style="--i:1">
    <div class="icon">⭐️</div>
    <h3>Fast</h3>
    <p>Blazing fast performance</p>
  </div>
</div>
```
```css
.features { display: flex; gap: var(--space-4); }
.card {
  background: #fff; padding: 2rem; border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0; transform: translateY(20px);
}
.card .icon { font-size: 2rem; margin-bottom: 1rem; }
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.card.visible { opacity:1; transform:translateY(0); transition-delay: calc(var(--i) * 0.1s); }
```

## 4. Pricing Section with Billing Toggle
```html
<div class="pricing">
  <div class="toggle">
    <label><input type="checkbox" id="priceToggle"> Annual Billing</label>
  </div>
  <div class="plan popular">
    <h3>Pro</h3>
    <p class="price"><span>$</span><span class="amount">29</span><span>/mo</span></p>
    <ul><li>Feature 1</li><li>Feature 2</li></ul>
    <button class="btn btn-accent">Buy Now</button>
  </div>
</div>
```
```css
.pricing { display: grid; gap: var(--space-4); text-align: center; }
.plan { background: #fff; padding: 2rem; border-radius: 12px;
         box-shadow: 0 4px 12px rgba(0,0,0,0.1);
         position: relative;
}
.plan.popular::before {
  content: "Popular";
  position: absolute; top: -12px; right: -12px;
  background: var(--color-accent); color: #fff; padding: 0.5rem 1rem;
  border-radius: 8px; font-size: 0.9rem;
}
.plan h3 { margin-bottom: 0.5rem; }
.price { font-size: 2.5rem; margin: 1rem 0; }
.price .amount { transition: 0.3s; }
```

## 5. Testimonial Cards
```html
<div class="testimonials">
  <div class="test-card">
    <div class="quote">“</div>
    <p>Amazing service, highly recommend!</p>
    <div class="rating">★★★★★</div>
    <h4>Jane Doe</h4>
    <small>CEO, Company</small>
  </div>
</div>
```
```css
.test-card {
  background: #fff; padding: 2rem; border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  position: relative; 
  transition: transform 0.3s ease;
}
.test-card:hover { transform: translateY(-5px); }
.test-card .quote {
  font-size: 4rem; color: var(--color-accent); position: absolute;
  top: -10px; left: 10px; opacity: 0.1;
}
.rating { color: #ffc107; margin-bottom: 0.5rem; }
```

## 6. Contact Form (Floating Labels)
```html
<form class="contact-form">
  <div class="field">
    <input type="text" required placeholder=" ">
    <label>Name</label>
  </div>
  <div class="field">
    <input type="email" required placeholder=" ">
    <label>Email</label>
  </div>
  <div class="field">
    <textarea required placeholder=" "></textarea>
    <label>Message</label>
  </div>
  <button class="btn">Send</button>
</form>
```
```css
.field { position: relative; margin-bottom: var(--space-3); }
.field input, .field textarea {
  width: 100%; padding: 1rem 0.5rem; font: inherit; border: none; border-bottom: 2px solid #ccc;
  background: transparent; transition: border-color 0.3s;
}
.field label {
  position: absolute; left: 0.5rem; top: 1rem; color: #999;
  transition: all 0.3s ease;
  pointer-events: none;
}
.field input:focus + label,
.field input:not(:placeholder-shown) + label,
.field textarea:focus + label,
.field textarea:not(:placeholder-shown) + label {
  top: -0.5rem; font-size: 0.8rem; color: var(--color-accent);
}
```

## 7. CTA Section with Gradient and Pattern
```html
<section class="cta-section">
  <h2>Ready to get started?</h2>
  <button class="btn btn-gradient">Join Now</button>
</section>
```
```css
.cta-section {
  text-align: center; padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative; overflow: hidden; color: #fff;
}
.cta-section::before {
  content: ""; position: absolute; inset: 0;
  background-image: url('data:image/svg+xml,<svg>...</svg>');
  opacity: 0.1;
}
.cta-section h2 { margin-bottom: 1.5rem; }
.btn-gradient {
  background: linear-gradient(90deg, #ffafbd, #ffc3a0);
  color: #fff; border: none; padding: 1rem 2rem;
  border-radius: 50px; transition: transform 0.3s;
}
.btn-gradient:hover { transform: scale(1.05); }
```

## 8. Footer (4 Columns)
```html
<footer class="site-footer">
  <div class="col"><h4>Company</h4><ul>...</ul></div>
  <div class="col"><h4>Products</h4><ul>...</ul></div>
  <div class="col"><h4>Support</h4><ul>...</ul></div>
  <div class="col"><h4>Newsletter</h4>
    <form><input type="email" placeholder="Your email"><button>Subscribe</button></form>
    <div class="social">[icons]</div>
  </div>
</footer>
```
```css
.site-footer {
  display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap: var(--space-4); padding: 4rem 2rem; background: #111;
  color: #ccc;
}
.site-footer h4 { color: #fff; margin-bottom: 1rem; }
.site-footer ul { list-style: none; padding: 0; }
.site-footer a { color: inherit; text-decoration: none; }
.site-footer form { display: flex; }
.site-footer input { flex:1; padding: 0.5rem; }
.site-footer button { padding: 0.5rem 1rem; }
.social a { margin-right: 1rem; }
```

## 9. Stats Counter Section
```html
<div class="stats">
  <div class="stat"><span class="count" data-target="1500">0</span><p>Users</p></div>
</div>
```
```css
.stats { display: flex; gap: var(--space-4); }
.stat { flex:1; text-align: center; }
.stat .count { font-size: 3rem; color: var(--color-accent); }
```

## 10. Timeline/Process Section
```html
<ul class="timeline">
  <li><div class="step">1</div><div class="details"><h4>Step One</h4><p>...</p></div></li>
</ul>
```
```css
.timeline { list-style: none; position: relative; margin: 2rem 0; padding: 0; }
.timeline::before {
  content: ""; position: absolute; top: 0; left: 20px; width: 2px; height: 100%; background: #ccc;
}
.timeline li { position: relative; margin-bottom: var(--space-4); padding-left: 50px; }
.timeline .step {
  position: absolute; left: 0; width: 40px; height: 40px;
  background: var(--color-accent); color: #fff; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-weight: bold;
}
```

## 11. FAQ Accordion
```html
<div class="faq">
  <button class="accordion">Question 1</button>
  <div class="panel">Answer 1</div>
</div>
```
```css
.accordion {
  background: #f7f7f7; padding: 1rem; border: none; outline: none;
  cursor: pointer; width: 100%; text-align: left; transition: background 0.3s;
}
.accordion.active { background: #e2e2e2; }
.panel { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
```
```js
document.querySelectorAll('.accordion').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    const panel = btn.nextElementSibling;
    if (btn.classList.contains('active')) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      panel.style.maxHeight = null;
    }
  });
});
```

## 12. Team Section with Hover Effects
```html
<div class="team">
  <div class="member">
    <img src="avatar.jpg" alt="">
    <h4>Jane Doe</h4><p>Developer</p>
  </div>
</div>
```
```css
.member {
  background: #fff; text-align: center; border-radius: 12px; overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.member img { width: 100%; display: block; }
.member:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}
```

## 13. Portfolio/Gallery Hover Grid
```html
<div class="gallery">
  <div class="gallery-item">
    <img src="..." alt="">
    <div class="overlay"><h4>Project Title</h4></div>
  </div>
</div>
```
```css
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: var(--space-4); }
.gallery-item { position: relative; overflow: hidden; }
.gallery-item img { width: 100%; transition: transform 0.5s ease; }
.gallery-item .overlay {
  position: absolute; inset:0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.3s;
  color: #fff; text-align: center;
}
.gallery-item:hover img { transform: scale(1.1); }
.gallery-item:hover .overlay { opacity: 1; }
```

## 14. Interactive Popup Modal
```html
<div class="modal" id="myModal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text...</p>
  </div>
</div>
```
```css
.modal {
  display: none; position: fixed; inset:0;
  background: rgba(0,0,0,0.5); align-items: center; justify-content: center;
}
.modal-content {
  background: #fff; padding: 2rem; border-radius: 12px; width: 90%; max-width: 400px;
  transform: scale(0.9); opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.modal.show .modal-content {
  transform: scale(1); opacity: 1;
}
.close { position: absolute; top: 1rem; right: 1rem; cursor: pointer; }
```
```js
const modal = document.getElementById('myModal');
const btn = document.getElementById('openModal');
const span = document.querySelector('.close');
btn.onclick = () => { modal.style.display = "flex"; modal.classList.add('show'); }
span.onclick = () => { modal.classList.remove('show'); setTimeout(()=>modal.style.display="none",300); }
```

## 15. Toast Notification System
```html
<div class="toast" id="toast">Action completed!</div>
```
```css
.toast {
  position: fixed; bottom: var(--space-4); right: var(--space-4);
  background: #323232; color: #fff; padding: 1rem 2rem; border-radius: 4px;
  transform: translateY(100px); opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
  z-index: 1000;
}
.toast.show {
  transform: translateY(0); opacity: 1;
}
```
```js
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
```
