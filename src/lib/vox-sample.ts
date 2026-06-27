export const VOX_SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vox — Fine Dining</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0A0A0A;
    --white: #F8F5F0;
    --gold: #C9A96E;
    --gold-light: #E2C99A;
    --gray: #1A1A1A;
    --text-muted: #9A9080;
    --font-display: 'Cormorant Garamond', serif;
    --font-body: 'Jost', sans-serif;
    --t: 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--black);
    color: var(--white);
    overflow-x: hidden;
  }

  /* ---- SCROLLBAR ---- */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  /* ---- NAV ---- */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 60px;
    transition: background var(--t), padding var(--t);
  }

  nav.scrolled {
    background: rgba(10, 10, 10, 0.96);
    backdrop-filter: blur(12px);
    padding: 18px 60px;
    border-bottom: 1px solid rgba(201, 169, 110, 0.12);
  }

  .logo {
    font-family: var(--font-display);
    font-size: 1.9rem; font-weight: 300; letter-spacing: 0.35em;
    color: var(--white); text-transform: uppercase; text-decoration: none;
  }

  .logo span { color: var(--gold); }

  .nav-links { display: flex; gap: 36px; list-style: none; }

  .nav-links a {
    font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(248, 245, 240, 0.65); text-decoration: none;
    transition: color 0.3s;
  }

  .nav-links a:hover { color: var(--gold); }

  .nav-cta {
    font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    border: 1px solid rgba(201, 169, 110, 0.5); color: var(--gold);
    padding: 10px 22px; text-decoration: none;
    transition: var(--t);
  }

  .nav-cta:hover { background: var(--gold); color: var(--black); }

  @media (max-width: 768px) {
    nav { padding: 20px 24px; }
    .nav-links { display: none; }
  }

  /* ---- HERO ---- */
  .hero {
    position: relative; height: 100vh; min-height: 700px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: -8%;
    background:
      linear-gradient(to bottom, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0.78) 100%),
      url('https://images.unsplash.com/photo-1558030006-450675393462?w=1800&q=80&fit=crop') center/cover;
    animation: heroZoom 20s ease-in-out infinite alternate;
  }

  @keyframes heroZoom {
    from { transform: scale(1); }
    to { transform: scale(1.06); }
  }

  .hero-content {
    position: relative; text-align: center; padding: 0 24px;
    animation: fadeUp 1.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .hero-eyebrow {
    font-size: 0.65rem; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 24px; display: block;
    animation: fadeUp 1.2s 0.2s both;
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: 300; line-height: 0.95;
    letter-spacing: -0.01em; color: var(--white);
    margin-bottom: 28px;
    animation: fadeUp 1.2s 0.35s both;
  }

  .hero h1 em { font-style: italic; color: var(--gold-light); }

  .hero p {
    font-size: 0.9rem; letter-spacing: 0.15em; color: rgba(248,245,240,0.6);
    max-width: 400px; margin: 0 auto 40px; line-height: 1.8;
    text-transform: uppercase;
    animation: fadeUp 1.2s 0.5s both;
  }

  .hero-actions {
    display: flex; gap: 16px; justify-content: center;
    animation: fadeUp 1.2s 0.65s both;
  }

  .btn {
    display: inline-block; padding: 14px 36px;
    font-family: var(--font-body); font-size: 0.7rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    text-decoration: none; transition: var(--t); cursor: pointer; border: none;
  }

  .btn-primary { background: var(--gold); color: var(--black); }
  .btn-primary:hover { background: var(--gold-light); }

  .btn-outline {
    border: 1px solid rgba(248,245,240,0.35); color: var(--white);
    background: transparent;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  .hero-scroll {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); opacity: 0.7; animation: fadeUp 1.2s 1s both;
  }

  .scroll-line {
    width: 1px; height: 50px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  /* ---- SECTION COMMONS ---- */
  section { padding: 120px 0; }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }

  .section-eyebrow {
    font-size: 0.6rem; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--gold); display: block; margin-bottom: 20px;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5vw, 5rem);
    font-weight: 300; line-height: 1.05;
    color: var(--white); margin-bottom: 24px;
  }

  .section-title em { font-style: italic; color: var(--gold-light); }

  .divider {
    width: 60px; height: 1px; background: var(--gold);
    margin: 32px 0;
  }

  /* ---- REVEAL ANIMATION ---- */
  .reveal {
    opacity: 0; transform: translateY(50px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1),
                transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }

  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ---- ABOUT SECTION ---- */
  .about { background: var(--white); }

  .about .container {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }

  .about-text .section-title { color: var(--black); }
  .about-text .section-eyebrow { color: var(--gold); }
  .about-text .divider { background: var(--black); }

  .about-text p {
    color: #4A4035; line-height: 1.9; font-size: 0.95rem;
    font-weight: 300; margin-bottom: 20px;
  }

  .about-img-container {
    position: relative; height: 560px;
  }

  .about-img-main {
    width: 75%; height: 85%;
    background: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80&fit=crop') center/cover;
    position: absolute; right: 0; top: 0;
  }

  .about-img-accent {
    width: 50%; height: 45%;
    background: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop') center/cover;
    position: absolute; left: 0; bottom: 0;
    border: 5px solid var(--white);
  }

  .about-stat {
    position: absolute; bottom: 50px; right: -20px;
    background: var(--black); color: var(--white);
    padding: 24px 28px; text-align: center;
  }

  .about-stat .num {
    font-family: var(--font-display); font-size: 3rem;
    font-weight: 300; color: var(--gold); line-height: 1;
  }

  .about-stat .label {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-muted); margin-top: 4px;
  }

  @media (max-width: 900px) {
    .about .container { grid-template-columns: 1fr; }
    .about-img-container { height: 380px; }
  }

  /* ---- MENU SECTION ---- */
  .menu { background: var(--black); }

  .menu-header {
    text-align: center; margin-bottom: 60px;
  }

  .menu-tabs {
    display: flex; gap: 0; justify-content: center;
    border-bottom: 1px solid rgba(201,169,110,0.2);
    margin-bottom: 60px;
  }

  .menu-tab {
    font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--text-muted); padding: 14px 30px;
    cursor: pointer; border: none; background: none;
    border-bottom: 2px solid transparent;
    transition: var(--t);
    font-family: var(--font-body);
  }

  .menu-tab.active, .menu-tab:hover {
    color: var(--gold); border-bottom-color: var(--gold);
  }

  .menu-panel { display: none; }
  .menu-panel.active { display: block; }

  .menu-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
  }

  @media (max-width: 768px) {
    .menu-grid { grid-template-columns: 1fr; }
  }

  .menu-item {
    padding: 32px; border: 1px solid rgba(201,169,110,0.08);
    transition: var(--t); display: flex; justify-content: space-between;
    gap: 24px;
  }

  .menu-item:hover { border-color: rgba(201,169,110,0.3); background: rgba(201,169,110,0.03); }

  .item-info h3 {
    font-family: var(--font-display); font-size: 1.3rem; font-weight: 400;
    color: var(--white); margin-bottom: 6px;
  }

  .item-info p {
    font-size: 0.8rem; color: var(--text-muted);
    line-height: 1.6; font-weight: 300; max-width: 280px;
  }

  .item-price {
    font-family: var(--font-display); font-size: 1.2rem;
    color: var(--gold); flex-shrink: 0;
  }

  /* ---- GALLERY ---- */
  .gallery { background: var(--gray); padding: 80px 0; }

  .gallery-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 300px 300px;
    gap: 4px;
  }

  .gallery-item {
    background-size: cover; background-position: center;
    overflow: hidden; position: relative;
  }

  .gallery-item::after {
    content: ''; position: absolute; inset: 0;
    background: rgba(10,10,10,0); transition: var(--t);
  }

  .gallery-item:hover::after { background: rgba(10,10,10,0.3); }

  .gallery-item:nth-child(1) { grid-row: 1 / 3; }

  @media (max-width: 768px) {
    .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
    .gallery-item:nth-child(1) { grid-row: auto; }
    .gallery-item { height: 220px; }
  }

  /* ---- TESTIMONIALS ---- */
  .testimonials { background: var(--black); text-align: center; }

  .testimonial-wrapper { position: relative; overflow: hidden; max-width: 780px; margin: 0 auto; }

  .testimonial-slide {
    display: none; animation: fadeUp 0.6s ease both;
  }

  .testimonial-slide.active { display: block; }

  .testimonial-quote {
    font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.2rem);
    font-style: italic; font-weight: 300; line-height: 1.5;
    color: var(--white); margin-bottom: 32px;
  }

  .testimonial-stars { color: var(--gold); font-size: 0.9rem; letter-spacing: 4px; margin-bottom: 20px; }

  .testimonial-author {
    font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--text-muted);
  }

  .testimonial-dots {
    display: flex; gap: 10px; justify-content: center; margin-top: 40px;
  }

  .dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(201,169,110,0.2); cursor: pointer; transition: var(--t);
    border: none;
  }

  .dot.active { background: var(--gold); }

  /* ---- RESERVATION SECTION ---- */
  .reservation {
    background: var(--white); position: relative; overflow: hidden;
  }

  .reservation::before {
    content: ''; position: absolute; right: -10%; top: -20%;
    width: 55%; height: 140%;
    background: url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=900&q=80&fit=crop') center/cover;
    opacity: 0.12;
  }

  .reservation .container {
    display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start;
    position: relative;
  }

  @media (max-width: 900px) {
    .reservation .container { grid-template-columns: 1fr; }
  }

  .res-text .section-title { color: var(--black); }
  .res-text .section-eyebrow { color: var(--gold); }

  .res-text p {
    color: #4A4035; line-height: 1.9; font-weight: 300; font-size: 0.9rem;
    margin-bottom: 32px;
  }

  .res-contact a {
    display: flex; align-items: center; gap: 12px;
    font-size: 0.75rem; letter-spacing: 0.1em; color: var(--black);
    text-decoration: none; margin-bottom: 14px;
    transition: color 0.3s;
  }

  .res-contact a:hover { color: var(--gold); }

  .res-contact .icon {
    width: 32px; height: 32px; border: 1px solid currentColor;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; flex-shrink: 0;
  }

  .res-form { background: var(--black); padding: 48px; }

  .form-group { margin-bottom: 24px; }

  .form-group label {
    display: block; font-size: 0.6rem; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;
  }

  .form-group input, .form-group select, .form-group textarea {
    width: 100%; background: transparent;
    border: none; border-bottom: 1px solid rgba(201,169,110,0.25);
    color: var(--white); padding: 12px 0; font-family: var(--font-body);
    font-size: 0.9rem; outline: none; transition: border-color 0.3s;
    appearance: none;
  }

  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-bottom-color: var(--gold);
  }

  .form-group select option { background: var(--black); }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

  .form-submit {
    width: 100%; padding: 16px; background: var(--gold); color: var(--black);
    border: none; font-family: var(--font-body); font-size: 0.7rem;
    letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
    transition: var(--t); margin-top: 8px;
  }

  .form-submit:hover { background: var(--gold-light); }

  /* ---- CHEF SECTION ---- */
  .chef-section { background: var(--gray); }

  .chef-section .container {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }

  @media (max-width: 900px) {
    .chef-section .container { grid-template-columns: 1fr; }
  }

  .chef-img {
    height: 520px;
    background: url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80&fit=crop') center/cover;
  }

  .chef-text p {
    color: rgba(248,245,240,0.65); line-height: 1.9; font-weight: 300;
    font-size: 0.95rem; margin-bottom: 20px;
  }

  .chef-sig {
    font-family: var(--font-display); font-size: 2rem; font-style: italic;
    color: var(--gold); margin-top: 32px;
  }

  /* ---- FOOTER ---- */
  footer { background: var(--black); padding: 80px 0 40px; }

  .footer-grid {
    display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 40px; margin-bottom: 60px;
  }

  @media (max-width: 768px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }

  .footer-brand .logo { display: block; margin-bottom: 20px; }

  .footer-brand p {
    font-size: 0.82rem; color: var(--text-muted);
    line-height: 1.8; font-weight: 300; max-width: 280px;
  }

  .footer-col h4 {
    font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 20px;
  }

  .footer-links { list-style: none; }

  .footer-links li { margin-bottom: 10px; }

  .footer-links a {
    font-size: 0.83rem; color: var(--text-muted);
    text-decoration: none; transition: color 0.3s; font-weight: 300;
  }

  .footer-links a:hover { color: var(--white); }

  .footer-bottom {
    border-top: 1px solid rgba(201,169,110,0.12); padding-top: 32px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.72rem; color: var(--text-muted);
  }

  @media (max-width: 600px) {
    .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
  }

  /* ---- BOOKING MODAL ---- */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(10,10,10,0.92);
    backdrop-filter: blur(10px);
    z-index: 200; display: flex; align-items: center; justify-content: center;
    padding: 24px; opacity: 0; pointer-events: none; transition: opacity 0.4s;
  }

  .modal-overlay.open { opacity: 1; pointer-events: all; }

  .modal {
    background: var(--gray); max-width: 520px; width: 100%;
    padding: 52px; position: relative; border: 1px solid rgba(201,169,110,0.15);
    transform: translateY(40px); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }

  .modal-overlay.open .modal { transform: translateY(0); }

  .modal-close {
    position: absolute; top: 20px; right: 20px;
    background: none; border: none; color: var(--text-muted);
    font-size: 1.4rem; cursor: pointer; transition: color 0.3s; line-height: 1;
  }

  .modal-close:hover { color: var(--gold); }

  .modal h2 {
    font-family: var(--font-display); font-size: 2.2rem; font-weight: 300;
    color: var(--white); margin-bottom: 8px;
  }

  .modal p {
    font-size: 0.8rem; color: var(--text-muted); margin-bottom: 32px;
  }

  .modal .form-group input, .modal .form-group select {
    color: var(--white); border-bottom-color: rgba(201,169,110,0.2);
  }

  .modal .form-group label { color: var(--text-muted); }
</style>
</head>
<body>

<!-- BOOKING MODAL -->
<div id="modal" class="modal-overlay" role="dialog" aria-modal="true">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
    <h2>Reserve a Table</h2>
    <p>We'll confirm your reservation within 2 hours.</p>
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
          <option>6:00 PM</option>
          <option>7:00 PM</option>
          <option selected>8:00 PM</option>
          <option>9:00 PM</option>
          <option>9:30 PM</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label>Number of Guests</label>
      <select>
        <option>1 Guest</option>
        <option selected>2 Guests</option>
        <option>3 Guests</option>
        <option>4 Guests</option>
        <option>5+ Guests</option>
      </select>
    </div>
    <button class="form-submit" onclick="submitModal()">Confirm Reservation</button>
  </div>
</div>

<!-- NAV -->
<nav id="main-nav">
  <a href="#" class="logo">VOX<span>.</span></a>
  <ul class="nav-links">
    <li><a href="#about">Story</a></li>
    <li><a href="#menu">Menu</a></li>
    <li><a href="#chef">Chef</a></li>
    <li><a href="#reservation">Reserve</a></li>
  </ul>
  <a href="#" class="nav-cta" onclick="openModal(); return false;">Book a Table</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-content">
    <span class="hero-eyebrow">Est. 2018 · New York City</span>
    <h1>A Symphony<br>of <em>Fine Taste</em></h1>
    <p>Where cuisine becomes art and every dinner becomes a memory</p>
    <div class="hero-actions">
      <a href="#menu" class="btn btn-primary">Explore Menu</a>
      <a href="#" class="btn btn-outline" onclick="openModal(); return false;">Reserve</a>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- ABOUT -->
<section class="about" id="about">
  <div class="container">
    <div class="about-text reveal">
      <span class="section-eyebrow">Our Philosophy</span>
      <h2 class="section-title">Crafted with<br><em>Intention</em></h2>
      <div class="divider"></div>
      <p>Vox was born from a singular conviction: that food at its finest is not sustenance but language — a dialect of earth, season, and craft that speaks directly to something primal in us.</p>
      <p>Every dish on our menu begins not in the kitchen, but in the relationships we build with farmers, fishermen, and foragers across the Northeast. We believe ingredients should arrive at our table still carrying the memory of where they came from.</p>
      <a href="#reservation" class="btn btn-outline" style="border-color: var(--black); color: var(--black); margin-top: 12px;">Our Story</a>
    </div>
    <div class="about-img-container reveal">
      <div class="about-img-main"></div>
      <div class="about-img-accent"></div>
      <div class="about-stat">
        <div class="num">12</div>
        <div class="label">Michelin Stars</div>
      </div>
    </div>
  </div>
</section>

<!-- MENU -->
<section class="menu" id="menu">
  <div class="container">
    <div class="menu-header reveal">
      <span class="section-eyebrow">Seasonal Offerings</span>
      <h2 class="section-title">The Menu</h2>
    </div>
    <div class="menu-tabs">
      <button class="menu-tab active" onclick="switchTab('tasting')">Tasting Menu</button>
      <button class="menu-tab" onclick="switchTab('alacarte')">À La Carte</button>
      <button class="menu-tab" onclick="switchTab('wine')">Wine Pairing</button>
    </div>

    <div id="tab-tasting" class="menu-panel active reveal">
      <div class="menu-grid">
        <div class="menu-item">
          <div class="item-info">
            <h3>Oyster & Caviar</h3>
            <p>Kumamoto oyster, Osetra caviar, cucumber mignonette, dashi</p>
          </div>
          <div class="item-price">$68</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Foie Gras Torchon</h3>
            <p>Sauternes gelée, brioche, pickled cherry, hazelnut dust</p>
          </div>
          <div class="item-price">$84</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Butter Poached Lobster</h3>
            <p>Cauliflower mousseline, brown butter, micro herbs, lobster coral oil</p>
          </div>
          <div class="item-price">$96</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>A5 Wagyu Tenderloin</h3>
            <p>Truffle jus, pomme purée, chanterelles, shallot confit</p>
          </div>
          <div class="item-price">$195</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Valrhona Chocolate</h3>
            <p>70% dark ganache, hazelnut praline, smoked sea salt, vanilla ice cream</p>
          </div>
          <div class="item-price">$34</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>10-Course Experience</h3>
            <p>Chef's curated progression with seasonal highlights, full experience 3.5 hrs</p>
          </div>
          <div class="item-price">$385</div>
        </div>
      </div>
    </div>

    <div id="tab-alacarte" class="menu-panel">
      <div class="menu-grid">
        <div class="menu-item">
          <div class="item-info">
            <h3>Burrata & Heirloom</h3>
            <p>Hand-pulled burrata, heirloom tomatoes, basil oil, aged balsamic</p>
          </div>
          <div class="item-price">$38</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Truffle Risotto</h3>
            <p>Carnaroli rice, black truffle, Parmesan fondue, chive oil</p>
          </div>
          <div class="item-price">$62</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Duck Confit</h3>
            <p>Lentils du Puy, cherry gastrique, winter herbs, duck jus</p>
          </div>
          <div class="item-price">$78</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Seasonal Fish</h3>
            <p>Market catch, saffron beurre blanc, fennel, potato gaufrette</p>
          </div>
          <div class="item-price">$72</div>
        </div>
      </div>
    </div>

    <div id="tab-wine" class="menu-panel">
      <div class="menu-grid">
        <div class="menu-item">
          <div class="item-info">
            <h3>3-Course Pairing</h3>
            <p>Burgundy Blanc, Barolo, Sauternes — guided by our sommelier</p>
          </div>
          <div class="item-price">$145</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Premium Pairing</h3>
            <p>Grand Cru selections across 10 courses, featuring DRC and Pétrus</p>
          </div>
          <div class="item-price">$385</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Sommelier's Table</h3>
            <p>Blind tasting of 6 extraordinary bottles, narrated by our head sommelier</p>
          </div>
          <div class="item-price">$265</div>
        </div>
        <div class="menu-item">
          <div class="item-info">
            <h3>Non-Alcoholic Journey</h3>
            <p>House-made verjus, botanical tonics, cold-pressed juices, fermented</p>
          </div>
          <div class="item-price">$85</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section class="gallery">
  <div class="gallery-grid">
    <div class="gallery-item" style="background-image: url('https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80&fit=crop');"></div>
    <div class="gallery-item" style="background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80&fit=crop');"></div>
    <div class="gallery-item" style="background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop');"></div>
    <div class="gallery-item" style="background-image: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop');"></div>
    <div class="gallery-item" style="background-image: url('https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80&fit=crop');"></div>
  </div>
</section>

<!-- CHEF -->
<section class="chef-section" id="chef">
  <div class="container">
    <div class="chef-img reveal"></div>
    <div class="chef-text reveal">
      <span class="section-eyebrow">The Culinary Mind</span>
      <h2 class="section-title">Chef<br><em>Elias Voss</em></h2>
      <div class="divider"></div>
      <p>Born in Vienna, trained in Lyon, and sharpened across the finest kitchens of Paris and Tokyo, Chef Elias Voss returned to New York with a singular vision: to create a restaurant that breathes with the seasons.</p>
      <p>His philosophy is deceptively simple — the finest ingredients need the lightest touch. Every technique exists only to amplify, never to obscure. His 12 Michelin stars across three establishments are the industry's recognition of that restraint.</p>
      <p>At Vox, he cooks as if for friends — with warmth, precision, and genuine delight in the moment of discovery.</p>
      <div class="chef-sig">Elias Voss</div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials">
  <div class="container">
    <span class="section-eyebrow" style="text-align:center; display:block;">Guest Voices</span>
    <h2 class="section-title" style="text-align:center; margin-bottom:60px;">What They <em>Say</em></h2>
    <div class="testimonial-wrapper">
      <div class="testimonial-slide active">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-quote">"The most transcendent meal I have ever experienced. Chef Voss does not cook food — he composes moments. The A5 Wagyu alone is worth the flight."</p>
        <p class="testimonial-author">— Isabelle Fontaine, Le Monde</p>
      </div>
      <div class="testimonial-slide">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-quote">"Vox has quietly become the most important table in New York. The 10-course progression is a masterwork of restraint and revelation."</p>
        <p class="testimonial-author">— Marcus Thorne, The New Yorker</p>
      </div>
      <div class="testimonial-slide">
        <div class="testimonial-stars">★★★★★</div>
        <p class="testimonial-quote">"We celebrated our anniversary and left feeling like we had witnessed something rare — a kitchen at the absolute peak of its powers."</p>
        <p class="testimonial-author">— Elena & James Crawford, Guests</p>
      </div>
      <div class="testimonial-dots">
        <button class="dot active" onclick="goToSlide(0)"></button>
        <button class="dot" onclick="goToSlide(1)"></button>
        <button class="dot" onclick="goToSlide(2)"></button>
      </div>
    </div>
  </div>
</section>

<!-- RESERVATION -->
<section class="reservation" id="reservation">
  <div class="container">
    <div class="res-text reveal">
      <span class="section-eyebrow">Reservations</span>
      <h2 class="section-title">Join Us<br>for <em>Dinner</em></h2>
      <div class="divider" style="background: var(--black);"></div>
      <p>Vox is open Tuesday through Sunday for dinner service, with seatings at 6:00 and 9:00 PM. The tasting menu is approximately three and a half hours. We recommend booking 4–6 weeks in advance.</p>
      <div class="res-contact">
        <a href="tel:+12125550123">
          <span class="icon">✆</span>
          +1 (212) 555 0123
        </a>
        <a href="mailto:dining@vox-nyc.com">
          <span class="icon">✉</span>
          dining@vox-nyc.com
        </a>
        <a href="#">
          <span class="icon">⊙</span>
          11 Madison Avenue, New York, NY
        </a>
      </div>
    </div>
    <div class="res-form reveal">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" placeholder="Your full name" id="name">
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" placeholder="your@email.com" id="email">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Date</label>
          <input type="date" id="date">
        </div>
        <div class="form-group">
          <label>Time</label>
          <select id="time">
            <option>6:00 PM</option>
            <option selected>9:00 PM</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Guests</label>
        <select>
          <option>1</option>
          <option selected>2</option>
          <option>3</option>
          <option>4</option>
          <option>5+</option>
        </select>
      </div>
      <div class="form-group">
        <label>Special Requests</label>
        <textarea rows="3" placeholder="Dietary requirements, special occasions..." style="resize:none;"></textarea>
      </div>
      <button class="form-submit" onclick="submitReservation()">Request Reservation</button>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#" class="logo">VOX<span>.</span></a>
        <p>A destination for those who believe that a great meal is one of the most meaningful things one human being can offer another.</p>
      </div>
      <div class="footer-col">
        <h4>Navigate</h4>
        <ul class="footer-links">
          <li><a href="#about">Our Story</a></li>
          <li><a href="#menu">The Menu</a></li>
          <li><a href="#chef">The Chef</a></li>
          <li><a href="#reservation">Reserve</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Hours</h4>
        <ul class="footer-links">
          <li><a href="#">Tue – Thu: 6 – 10 PM</a></li>
          <li><a href="#">Fri – Sat: 6 – 11 PM</a></li>
          <li><a href="#">Sunday: 5:30 – 9:30 PM</a></li>
          <li><a href="#">Monday: Closed</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Follow</h4>
        <ul class="footer-links">
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Private Events</a></li>
          <li><a href="#">Gift Cards</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Vox Restaurant LLC. All rights reserved.</span>
      <span>11 Madison Avenue, New York, NY 10010</span>
    </div>
  </div>
</footer>

<script>
  // Nav scroll effect
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // Menu tabs
  function switchTab(id) {
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    event.target.classList.add('active');
  }

  // Testimonial slider
  let current = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  setInterval(() => goToSlide((current + 1) % slides.length), 5000);

  // Modal
  function openModal() {
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) closeModal();
  });

  function submitModal() {
    const name = document.getElementById('modal-name').value;
    if (!name) { alert('Please enter your name.'); return; }
    closeModal();
    alert('Thank you, ' + name + '! Your reservation request has been received. We will confirm within 2 hours.');
  }

  function submitReservation() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (!name || !email) { alert('Please fill in your name and email.'); return; }
    alert('Thank you, ' + name + '! Your reservation request has been received. A confirmation will be sent to ' + email + '.');
  }
</script>
</body>
</html>`;
