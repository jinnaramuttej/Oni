export const MAISON_DORE_SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Maison Dore - Hair Atelier</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --cream: #FAF7F2;
  --warm-white: #F5F0E8;
  --obsidian: #0E0D0B;
  --bronze: #B5844A;
  --bronze-light: #D4A96A;
  --muted: #8A7F72;
  --text-dark: #1C1A17;
  --serif: 'Playfair Display', serif;
  --sans: 'DM Sans', sans-serif;
  --mono: 'DM Mono', monospace;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

html { scroll-behavior: smooth; }
body { font-family: var(--sans); background: var(--cream); color: var(--text-dark); overflow-x: hidden; }
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-thumb { background: var(--bronze); }

nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 32px 56px;
  transition: all 0.5s var(--ease);
}

nav.dark {
  background: var(--obsidian);
  padding: 20px 56px;
  border-bottom: 1px solid rgba(181,132,74,0.15);
}

nav.dark .logo {
  color: var(--cream);
}

.logo {
  font-family: var(--serif);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--text-dark);
  text-decoration: none;
  font-style: normal;
}

.logo em { font-style: normal; color: inherit; }
.nav-links { display: flex; gap: 44px; list-style: none; }
.nav-links a {
  font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(250,247,242,0.6); text-decoration: none; transition: color 0.3s;
  font-weight: 400;
}
.nav-links a:hover { color: var(--bronze-light); }
.nav-book {
  font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
  background: var(--bronze); color: var(--obsidian); padding: 11px 24px;
  text-decoration: none; font-weight: 500; transition: background 0.3s;
}
.nav-book:hover { background: var(--bronze-light); }

@media (max-width: 768px) {
  nav { padding: 22px 24px; }
  .nav-links { display: none; }
}

.hero {
  position: relative; height: 100vh; min-height: 720px;
  display: grid; grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

.hero-left {
  position: relative;
  background:
    linear-gradient(120deg, rgba(14,13,11,0.55) 0%, rgba(14,13,11,0.2) 100%),
    url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&fit=crop') center/cover no-repeat;
}

.hero-right {
  background: var(--obsidian);
  display: flex; flex-direction: column; justify-content: center;
  padding: 100px 70px 60px;
  position: relative; overflow: hidden;
}

.hero-right::before {
  content: 'MD';
  position: absolute; bottom: -60px; right: -30px;
  font-family: var(--serif); font-size: 280px; font-weight: 400;
  color: rgba(181,132,74,0.05); line-height: 1;
  pointer-events: none; letter-spacing: -0.05em;
}

.hero-tag {
  display: flex; align-items: center; gap: 14px;
  font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.25em;
  text-transform: uppercase; color: var(--bronze); margin-bottom: 36px;
}
.hero-tag::after { content: ''; flex: 1; max-width: 50px; height: 1px; background: var(--bronze); opacity: 0.5; }
.hero h1 {
  font-family: var(--serif); font-size: clamp(3rem, 5vw, 5.5rem);
  font-weight: 400; line-height: 1.05; color: var(--cream);
  margin-bottom: 28px;
}
.hero h1 em { font-style: italic; color: var(--bronze-light); display: block; }
.hero p {
  font-size: 0.9rem; line-height: 1.85; color: rgba(250,247,242,0.55);
  font-weight: 300; max-width: 340px; margin-bottom: 48px;
}
.hero-actions { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; }
.btn-bronze {
  font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
  background: var(--bronze); color: var(--obsidian); padding: 15px 36px;
  text-decoration: none; font-weight: 500; transition: 0.3s var(--ease); display: inline-block;
}
.btn-bronze:hover { background: var(--bronze-light); }
.btn-ghost-light {
  font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
  border-bottom: 1px solid rgba(250,247,242,0.3); color: rgba(250,247,242,0.6);
  padding-bottom: 4px; text-decoration: none; transition: color 0.3s, border-color 0.3s;
}
.btn-ghost-light:hover { color: var(--bronze-light); border-color: var(--bronze-light); }
.hero-scroll-hint {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.3em;
  text-transform: uppercase; color: rgba(250,247,242,0.3);
}
.scroll-bar { width: 1px; height: 44px; background: var(--bronze); opacity: 0.4; animation: drip 2.2s ease-in-out infinite; }
@keyframes drip { 0%,100%{transform:scaleY(1);opacity:.4} 50%{transform:scaleY(0.3);opacity:.1} }
.hero-number {
  position: absolute; bottom: 40px; right: 70px;
  font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.2em;
  color: var(--muted);
}

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .hero-left { height: 50vh; }
  .hero-right { padding: 60px 32px 80px; }
  .hero h1 { font-size: 2.8rem; }
}

.marquee-strip { background: var(--bronze); padding: 14px 0; overflow: hidden; }
.marquee-inner {
  display: flex; gap: 0; white-space: nowrap;
  animation: marquee 22s linear infinite;
}
.marquee-text {
  font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--obsidian); padding: 0 48px;
  display: inline-flex; align-items: center; gap: 48px;
}
.marquee-dot { width: 4px; height: 4px; background: var(--obsidian); border-radius: 50%; flex-shrink: 0; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

section { padding: 120px 0; }
.wrap { max-width: 1200px; margin: 0 auto; padding: 0 56px; }
.eyebrow {
  font-family: var(--mono); font-size: 0.62rem; letter-spacing: 0.3em;
  text-transform: uppercase; color: var(--bronze); display: flex;
  align-items: center; gap: 14px; margin-bottom: 24px;
}
.eyebrow::before { content: ''; width: 24px; height: 1px; background: var(--bronze); }
.section-title {
  font-family: var(--serif); font-size: clamp(2.4rem, 4vw, 4rem);
  font-weight: 400; line-height: 1.1; color: var(--text-dark);
}
.section-title em { font-style: italic; color: var(--bronze); }
.fu { opacity: 0; transform: translateY(36px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.fu.in { opacity: 1; transform: none; }

.about { background: var(--cream); }
.about .wrap {
  display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: center;
}
.about-img-stack { position: relative; height: 560px; }
.about-img-a {
  width: 72%; height: 78%; position: absolute; top: 0; right: 0;
  background:
    linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(0,0,0,0.12)),
    url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&fit=crop') center/cover;
}
.about-img-b {
  width: 52%; height: 50%; position: absolute; bottom: 0; left: 0;
  background:
    linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(0,0,0,0.14)),
    url('https://images.unsplash.com/photo-1631730359585-38a4935cbec4?w=600&q=80&fit=crop') center/cover;
  border: 6px solid var(--cream);
}
.about-badge {
  position: absolute; top: 60%; right: -24px;
  width: 110px; height: 110px;
  background: var(--obsidian);
  border-radius: 50%; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-family: var(--serif); text-align: center;
}
.about-badge .yr { font-size: 1.6rem; color: var(--bronze-light); line-height: 1; }
.about-badge .lbl { font-family: var(--mono); font-size: 0.48rem; letter-spacing: 0.2em; color: var(--muted); text-transform: uppercase; margin-top: 4px; }
.about-text p {
  font-size: 0.95rem; line-height: 1.9; color: #5A5347; font-weight: 300; margin-bottom: 20px;
}
.about-stats { display: flex; gap: 40px; margin-top: 44px; padding-top: 36px; border-top: 1px solid rgba(0,0,0,0.08); }
.stat .n { font-family: var(--serif); font-size: 2.4rem; color: var(--text-dark); line-height: 1; }
.stat .l { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-top: 6px; }

@media (max-width: 900px) {
  .about .wrap { grid-template-columns: 1fr; }
  .about-img-stack { height: 380px; margin-bottom: 40px; }
}

.services { background: var(--obsidian); }
.services .section-title { color: var(--cream); }
.services .section-title em { color: var(--bronze-light); }
.services-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 72px; }
.services-header-right { max-width: 320px; }
.services-header-right p {
  font-size: 0.88rem; color: rgba(250,247,242,0.45); line-height: 1.8; font-weight: 300;
}
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
.service-card {
  position: relative; overflow: hidden; aspect-ratio: 3/4; cursor: pointer;
}
.service-card:nth-child(1) { aspect-ratio: auto; grid-row: span 2; }
.service-bg {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.8s var(--ease);
  display: block;
}
.service-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(14,13,11,0.92) 0%, rgba(14,13,11,0.1) 55%);
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 32px 28px; transition: background 0.4s;
}
.service-card:hover .service-bg { transform: scale(1.06); }
.service-card:hover .service-overlay { background: linear-gradient(to top, rgba(14,13,11,0.98) 0%, rgba(14,13,11,0.25) 55%); }
.s-tag { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--bronze); margin-bottom: 8px; }
.s-name { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; color: var(--cream); margin-bottom: 10px; }
.service-card:nth-child(1) .s-name { font-size: 2.2rem; }
.s-desc { font-size: 0.78rem; color: rgba(250,247,242,0.5); line-height: 1.65; font-weight: 300; max-width: 260px; }
.s-price {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 0.7rem; color: var(--bronze-light);
  margin-top: 16px; opacity: 0;
  transform: translateY(8px); transition: opacity 0.3s, transform 0.3s;
}
.service-card:hover .s-price { opacity: 1; transform: none; }

.process { background: var(--warm-white); }
.process .wrap { display: grid; grid-template-columns: 1fr 1.4fr; gap: 100px; align-items: start; }
.process-steps { margin-top: 48px; }
.step {
  display: flex; gap: 28px; padding: 32px 0;
  border-bottom: 1px solid rgba(0,0,0,0.07);
}
.step:first-child { border-top: 1px solid rgba(0,0,0,0.07); }
.step-num {
  font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.1em;
  color: var(--bronze); opacity: 0.6; flex-shrink: 0; padding-top: 4px;
  min-width: 28px;
}
.step h3 { font-family: var(--serif); font-size: 1.2rem; font-weight: 400; margin-bottom: 8px; }
.step p { font-size: 0.85rem; color: #6A6158; line-height: 1.8; font-weight: 300; }
.process-img {
  position: sticky; top: 140px;
  height: 560px;
  background:
    linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(0,0,0,0.1)),
    url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80&fit=crop') center/cover;
}

@media (max-width: 900px) {
  .process .wrap { grid-template-columns: 1fr; }
  .process-img { position: static; height: 300px; margin-bottom: 40px; }
}

.team { background: var(--cream); }
.team-header { text-align: center; margin-bottom: 64px; }
.team-header p { font-size: 0.88rem; color: var(--muted); line-height: 1.8; max-width: 440px; margin: 16px auto 0; }
.team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
.team-card { position: relative; overflow: hidden; }
.team-img {
  width: 100%; aspect-ratio: 3/4; object-fit: cover;
  transition: transform 0.7s var(--ease); display: block;
  background-size: cover; background-position: center top;
}
.team-card:hover .team-img { transform: scale(1.04); }
.team-info {
  padding: 20px 20px 24px;
  background: var(--cream);
  border-top: 2px solid transparent;
  transition: border-color 0.3s;
}
.team-card:hover .team-info { border-color: var(--bronze); }
.team-info h3 { font-family: var(--serif); font-size: 1.1rem; font-weight: 400; margin-bottom: 4px; }
.team-info p { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
@media (max-width: 768px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }

.gallery-strip {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 4px; height: 380px;
}
.g-img {
  background-size: cover; background-position: center;
  transition: opacity 0.4s;
}
.gallery-strip:hover .g-img { opacity: 0.7; }
.gallery-strip:hover .g-img:hover { opacity: 1; }

.booking-section {
  background: var(--obsidian); padding: 120px 56px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 100px; align-items: start;
}
.book-left .section-title { color: var(--cream); }
.book-left .section-title em { color: var(--bronze-light); }
.book-left p { font-size: 0.9rem; color: rgba(250,247,242,0.45); line-height: 1.85; font-weight: 300; margin-top: 24px; max-width: 380px; }
.book-contact { margin-top: 48px; }
.book-contact a {
  display: flex; align-items: center; gap: 16px;
  font-size: 0.8rem; color: rgba(250,247,242,0.55); text-decoration: none;
  margin-bottom: 18px; transition: color 0.3s;
}
.book-contact a:hover { color: var(--bronze-light); }
.bc-icon {
  width: 36px; height: 36px; border: 1px solid rgba(181,132,74,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; flex-shrink: 0;
  transition: border-color 0.3s;
}
.book-contact a:hover .bc-icon { border-color: var(--bronze-light); }
.book-form { background: rgba(255,255,255,0.04); padding: 48px; border: 1px solid rgba(181,132,74,0.12); }
.fg { margin-bottom: 28px; }
.fg label { display: block; font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
.fg input, .fg select, .fg textarea {
  width: 100%; background: transparent; border: none;
  border-bottom: 1px solid rgba(181,132,74,0.2); color: var(--cream);
  padding: 10px 0; font-family: var(--sans); font-size: 0.9rem;
  outline: none; transition: border-color 0.3s; appearance: none;
}
.fg input:focus, .fg select:focus, .fg textarea:focus { border-bottom-color: var(--bronze-light); }
.fg select option { background: var(--obsidian); }
.fg-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.form-btn {
  width: 100%; padding: 17px; background: var(--bronze); color: var(--obsidian);
  border: none; font-family: var(--sans); font-size: 0.7rem; letter-spacing: 0.2em;
  text-transform: uppercase; font-weight: 500; cursor: pointer;
  transition: background 0.3s; margin-top: 8px;
}
.form-btn:hover { background: var(--bronze-light); }

@media (max-width: 900px) {
  .booking-section { grid-template-columns: 1fr; padding: 80px 24px; }
  .services-grid { grid-template-columns: 1fr; }
  .service-card:nth-child(1) { grid-row: auto; }
}

footer { background: #080807; padding: 80px 56px 40px; }
.footer-inner {
  display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 48px;
  padding-bottom: 64px; border-bottom: 1px solid rgba(181,132,74,0.1);
}
.footer-logo { font-family: var(--serif); font-size: 1.8rem; color: var(--cream); margin-bottom: 18px; display: block; text-decoration: none; }
.footer-logo em { font-style: italic; color: var(--bronze-light); }
.footer-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.8; font-weight: 300; max-width: 280px; }
.footer-col h4 { font-family: var(--mono); font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--bronze); margin-bottom: 20px; }
.footer-col ul { list-style: none; }
.footer-col li { margin-bottom: 10px; }
.footer-col a { font-size: 0.82rem; color: var(--muted); text-decoration: none; transition: color 0.3s; font-weight: 300; }
.footer-col a:hover { color: var(--cream); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 32px; font-family: var(--mono); font-size: 0.62rem; color: rgba(138,127,114,0.5); letter-spacing: 0.1em; }
@media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr 1fr; } }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(10,10,10,0.92);
  backdrop-filter: blur(10px);
  z-index: 200; display: flex; align-items: center; justify-content: center;
  padding: 24px; opacity: 0; pointer-events: none; transition: opacity 0.4s;
}
.modal-overlay.open { opacity: 1; pointer-events: all; }
.modal {
  background: #1A1814; max-width: 520px; width: 100%;
  padding: 52px; position: relative; border: 1px solid rgba(201,169,110,0.15);
  transform: translateY(40px); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
}
.modal-overlay.open .modal { transform: translateY(0); }
.modal-close {
    position: absolute; top: 20px; right: 20px;
    background: none; border: none; color: var(--muted);
    font-size: 1.4rem; cursor: pointer; transition: color 0.3s; line-height: 1;
  }
.modal-close:hover { color: var(--bronze-light); }
.modal h2 {
    font-family: var(--serif); font-size: 2.2rem; font-weight: 300;
    color: var(--cream); margin-bottom: 8px;
  }
.modal p {
    font-size: 0.8rem; color: var(--muted); margin-bottom: 32px;
  }
.modal .form-group input, .modal .form-group select {
    color: var(--cream); border-bottom-color: rgba(201,169,110,0.2);
  }
.modal .form-group label { color: var(--muted); }
</style>
</head>
<body>

<div id="modal" class="modal-overlay" role="dialog" aria-modal="true">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
    <h2>Reserve a Session</h2>
    <p>We'll confirm your appointment within 24 hours.</p>
    <div class="form-group">
      <label>Full Name</label>
      <input type="text" placeholder="Your name" id="modal-name">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Date</label>
        <input type="date" id="modal-date">
      </div>
      <div class="form-group">
        <label>Time</label>
        <select id="modal-time">
          <option>9:00 AM</option>
          <option>11:00 AM</option>
          <option selected>1:00 PM</option>
          <option>3:00 PM</option>
          <option>5:00 PM</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label>Service</label>
      <select>
        <option>Maison Cut</option>
        <option>Balayage</option>
        <option>Color Correction</option>
        <option>Scalp Ritual</option>
        <option>Bridal Package</option>
        <option>Consultation Only</option>
      </select>
    </div>
    <button class="form-submit" onclick="submitModal()">Confirm Reservation</button>
  </div>
</div>

<nav id="nav">
  <a href="#" class="logo">Maison Dore</a>
  <ul class="nav-links">
    <li><a href="#about">Atelier</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#team">Stylists</a></li>
    <li><a href="#booking">Book</a></li>
  </ul>
  <a href="#booking" class="nav-book">Reserve</a>
</nav>

<section class="hero">
  <div class="hero-left"></div>
  <div class="hero-right">
    <div class="hero-tag">Paris - New York - London</div>
    <h1>Hair is<br>your first<br><em>couture</em></h1>
    <p>A private atelier where every appointment is an act of transformation. We do not do haircuts. We do signatures.</p>
    <div class="hero-actions">
      <a href="#booking" class="btn-bronze">Book a Session</a>
      <a href="#services" class="btn-ghost-light">View Services</a>
    </div>
    <div class="hero-number">Est. 2011</div>
  </div>
  <div class="hero-scroll-hint">
    <span>Scroll</span>
    <div class="scroll-bar"></div>
  </div>
</section>

<div class="marquee-strip">
  <div class="marquee-inner">
    <div class="marquee-text">
      Precision Cut <span class="marquee-dot"></span>
      Balayage Specialist <span class="marquee-dot"></span>
      Color Correction <span class="marquee-dot"></span>
      Bridal Services <span class="marquee-dot"></span>
      Keratin Treatment <span class="marquee-dot"></span>
      Scalp Therapy <span class="marquee-dot"></span>
      Extensions <span class="marquee-dot"></span>
      Precision Cut <span class="marquee-dot"></span>
      Balayage Specialist <span class="marquee-dot"></span>
      Color Correction <span class="marquee-dot"></span>
    </div>
    <div class="marquee-text" aria-hidden="true">
      Precision Cut <span class="marquee-dot"></span>
      Balayage Specialist <span class="marquee-dot"></span>
      Color Correction <span class="marquee-dot"></span>
      Bridal Services <span class="marquee-dot"></span>
      Keratin Treatment <span class="marquee-dot"></span>
      Scalp Therapy <span class="marquee-dot"></span>
      Extensions <span class="marquee-dot"></span>
      Precision Cut <span class="marquee-dot"></span>
      Balayage Specialist <span class="marquee-dot"></span>
      Color Correction <span class="marquee-dot"></span>
    </div>
  </div>
</div>

<section class="about" id="about">
  <div class="wrap">
    <div class="about-img-stack fu">
      <div class="about-img-a"></div>
      <div class="about-img-b"></div>
      <div class="about-badge">
        <div class="yr">12+</div>
        <div class="lbl">Years of craft</div>
      </div>
    </div>
    <div class="fu">
      <div class="eyebrow">Our Philosophy</div>
      <h2 class="section-title">A slow approach<br>to <em>great hair</em></h2>
      <div style="height:36px;"></div>
      <p>Maison Dore was founded on one belief: that good hair is never rushed. We operate by appointment only, take no more than six clients a day, and guarantee our stylists' full attention for as long as it takes.</p>
      <p>Our team trained under the masters of Paris and the colorists of Milan. Every client receives a bespoke consultation, a personalized hair prescription, and an experience that leaves no detail to chance.</p>
      <a href="#booking" class="btn-bronze" style="margin-top: 32px; display:inline-block;">Book a Consultation</a>
      <div class="about-stats">
        <div class="stat"><div class="n">1,800<span style="font-size:1.2rem;">+</span></div><div class="l">Happy clients</div></div>
        <div class="stat"><div class="n">6</div><div class="l">Expert stylists</div></div>
        <div class="stat"><div class="n">4.98</div><div class="l">Avg rating</div></div>
      </div>
    </div>
  </div>
</section>

<section class="services" id="services">
  <div class="wrap">
    <div class="services-header fu">
      <div>
        <div class="eyebrow" style="color:var(--bronze)">What We Offer</div>
        <h2 class="section-title" style="color:var(--cream)">The full<br><em>treatment</em></h2>
      </div>
      <div class="services-header-right">
        <p>From precision cuts to full color transformations, each service is designed to elevate your natural character, not erase it.</p>
      </div>
    </div>
    <div class="services-grid fu">
      <div class="service-card">
        <div class="service-bg" style="background:url('https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900&q=80&fit=crop') center/cover;"></div>
        <div class="service-overlay">
          <div class="s-tag">Signature</div>
          <div class="s-name">The Maison Cut</div>
          <div class="s-desc">An unhurried precision cut with dry analysis, wet sculpting, and a final dry refinement. Takes two hours. Worth every minute.</div>
          <div class="s-price">From €180 →</div>
        </div>
      </div>
      <div class="service-card">
        <div class="service-bg" style="background:url('https://images.unsplash.com/photo-1519699961083-a47e7b1ccaef?w=600&q=80&fit=crop') center/cover;"></div>
        <div class="service-overlay">
          <div class="s-tag">Color</div>
          <div class="s-name">Balayage</div>
          <div class="s-desc">Hand-painted freehand color for a natural sun-touched result.</div>
          <div class="s-price">From €240 →</div>
        </div>
      </div>
      <div class="service-card">
        <div class="service-bg" style="background:url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80&fit=crop') center/cover;"></div>
        <div class="service-overlay">
          <div class="s-tag">Treatment</div>
          <div class="s-name">Scalp Ritual</div>
          <div class="s-desc">Detox, nourish, and reset your scalp with our 90-minute spa protocol.</div>
          <div class="s-price">From €120 →</div>
        </div>
      </div>
      <div class="service-card">
        <div class="service-bg" style="background:url('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&q=80&fit=crop') center/cover;"></div>
        <div class="service-overlay">
          <div class="s-tag">Occasion</div>
          <div class="s-name">Bridal Package</div>
          <div class="s-desc">Full pre-wedding prep: trial, color, styling. You arrive calm, you leave radiant.</div>
          <div class="s-price">From €380 →</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="process">
  <div class="wrap">
    <div class="process-img fu"></div>
    <div class="fu">
      <div class="eyebrow">How It Works</div>
      <h2 class="section-title">The <em>ritual</em></h2>
      <div class="process-steps">
        <div class="step"><div class="step-num">01</div><div><h3>Hair Consultation</h3><p>We start by understanding your lifestyle, texture history, and what you've always wanted but never quite achieved.</p></div></div>
        <div class="step"><div class="step-num">02</div><div><h3>The Prescription</h3><p>Your stylist designs a personal hair plan tailored to your texture and face structure.</p></div></div>
        <div class="step"><div class="step-num">03</div><div><h3>The Session</h3><p>Two to three uninterrupted hours of work. No phone calls, no rushing, no shortcuts. Just the craft.</p></div></div>
        <div class="step"><div class="step-num">04</div><div><h3>Aftercare Guide</h3><p>You leave with a written care prescription and your stylist's personal WhatsApp for any questions in the weeks ahead.</p></div></div>
      </div>
    </div>
  </div>
</section>

<section class="team" id="team">
  <div class="wrap">
    <div class="team-header fu">
      <div class="eyebrow" style="justify-content:center;">The Stylists</div>
      <h2 class="section-title">Meet the <em>hands</em></h2>
      <p>Six artists. Thousands of combined hours. One shared obsession with the details.</p>
    </div>
    <div class="team-grid">
      <div class="team-card fu"><div class="team-img" style="background:url('https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80&fit=crop&crop=faces') center top/cover; height:380px;"></div><div class="team-info"><h3>Sophie Laurent</h3><p>Founding Director - Color</p></div></div>
      <div class="team-card fu"><div class="team-img" style="background:url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&fit=crop&crop=faces') center top/cover; height:380px;"></div><div class="team-info"><h3>Marcus Reid</h3><p>Senior Stylist - Precision Cut</p></div></div>
      <div class="team-card fu"><div class="team-img" style="background:url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80&fit=crop&crop=faces') center top/cover; height:380px;"></div><div class="team-info"><h3>Chiara Russo</h3><p>Color Specialist - Balayage</p></div></div>
      <div class="team-card fu"><div class="team-img" style="background:url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80&fit=crop&crop=faces') center top/cover; height:380px;"></div><div class="team-info"><h3>James Owusu</h3><p>Texture Expert - Extensions</p></div></div>
    </div>
  </div>
</section>

<div class="gallery-strip">
  <div class="g-img" style="background-image:url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80&fit=crop')"></div>
  <div class="g-img" style="background-image:url('https://images.unsplash.com/photo-1523263685509-57c1d050d19b?w=600&q=80&fit=crop')"></div>
  <div class="g-img" style="background-image:url('https://images.unsplash.com/photo-1519699961083-a47e7b1ccaef?w=600&q=80&fit=crop')"></div>
  <div class="g-img" style="background-image:url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80&fit=crop')"></div>
</div>

<section class="booking-section" id="booking">
  <div class="book-left fu">
    <div class="eyebrow" style="color:var(--bronze)">Reservations</div>
    <h2 class="section-title" style="color:var(--cream)">Reserve your<br><em>appointment</em></h2>
    <p>We accept reservations up to 8 weeks ahead. Same-week slots are released every Monday morning at 9am. Cancellations require 48 hours notice.</p>
    <div class="book-contact">
      <a href="tel:+12125551234"><span class="bc-icon">†</span> +1 (212) 555 1234</a>
      <a href="mailto:book@maisondore.com"><span class="bc-icon">✉</span> book@maisondore.com</a>
      <a href="#"><span class="bc-icon">⊙</span> 34 Prince Street, SoHo, New York</a>
    </div>
  </div>
  <div class="book-form fu">
    <div class="fg"><label>Full Name</label><input type="text" placeholder="Your name"></div>
    <div class="fg"><label>Email</label><input type="email" placeholder="you@email.com"></div>
    <div class="fg-row">
      <div class="fg"><label>Preferred Date</label><input type="date"></div>
      <div class="fg"><label>Time</label><select><option>9:00 AM</option><option>11:00 AM</option><option selected>1:00 PM</option><option>3:00 PM</option><option>5:00 PM</option></select></div>
    </div>
    <div class="fg"><label>Service</label><select><option>Maison Cut</option><option>Balayage</option><option>Full Color</option><option>Scalp Ritual</option><option>Bridal Package</option><option>Consultation Only</option></select></div>
    <div class="fg"><label>Notes</label><textarea rows="2" placeholder="Hair history, concerns, references..." style="resize:none;"></textarea></div>
    <button class="form-btn" onclick="handleBook(event)">Request Appointment</button>
  </div>
</section>

<footer>
  <div class="footer-inner">
    <div>
      <a href="#" class="footer-logo">Maison Dore</a>
      <p class="footer-desc">A private hair atelier in SoHo, New York. Appointments only. No walk-ins, no rush.</p>
    </div>
    <div class="footer-col">
      <h4>Navigate</h4>
      <ul>
        <li><a href="#about">The Atelier</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#team">Stylists</a></li>
        <li><a href="#booking">Book</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Hours</h4>
      <ul>
        <li><a href="#">Tue - Fri: 9am - 7pm</a></li>
        <li><a href="#">Saturday: 9am - 6pm</a></li>
        <li><a href="#">Sunday: 10am - 4pm</a></li>
        <li><a href="#">Monday: Closed</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Follow</h4>
      <ul>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">Pinterest</a></li>
        <li><a href="#">Gift Cards</a></li>
        <li><a href="#">Press</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 Maison Dore LLC. All rights reserved.</span>
    <span>34 Prince Street, SoHo, New York, NY 10012</span>
  </div>
</footer>

<script>
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('dark', window.scrollY > 80);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fu').forEach(el => observer.observe(el));

document.querySelectorAll('.service-card').forEach(card => {
  const img = card.querySelector('.service-bg');
  card.addEventListener('mouseenter', () => img && (img.style.transform = 'scale(1.06)'));
  card.addEventListener('mouseleave', () => img && (img.style.transform = ''));
});

function handleBook(e) {
  e.preventDefault();
  alert('Thank you. We will confirm your appointment within 24 hours.');
}
</script>
</body>
</html>`;
