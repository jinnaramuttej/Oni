export const VELARA_SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Velara — A Private Retreat</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0A0F1E;
    --ivory: #F5F0E8;
    --gold: #C9A96E;
    --gold-light: #E2C99A;
    --slate: #4A5568;
    --sage: #8A9B8E;
    --dark-card: #111827;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--navy);
    color: var(--ivory);
    overflow-x: hidden;
  }

  /* ---- NAV ---- */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 60px;
    background: linear-gradient(to bottom, rgba(10,15,30,0.95) 0%, transparent 100%);
    transition: background 0.4s;
  }
  nav.scrolled { background: rgba(10,15,30,0.97); padding: 18px 60px; }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 300; letter-spacing: 0.18em;
    color: var(--ivory); text-decoration: none;
  }
  .nav-logo span { color: var(--gold); }

  .nav-links { display: flex; gap: 40px; list-style: none; }
  .nav-links a {
    font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ivory); text-decoration: none; opacity: 0.8;
    transition: opacity 0.2s, color 0.2s;
  }
  .nav-links a:hover { opacity: 1; color: var(--gold); }

  .nav-cta {
    font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
    border: 1px solid var(--gold); color: var(--gold);
    padding: 10px 24px; text-decoration: none;
    transition: background 0.3s, color 0.3s;
  }
  .nav-cta:hover { background: var(--gold); color: var(--navy); }

  /* ---- HERO ---- */
  .hero {
    position: relative; height: 100vh; min-height: 700px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: -10%;
    background: 
      linear-gradient(to bottom, rgba(10,15,30,0.3) 0%, rgba(10,15,30,0.65) 100%),
      url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&q=80') center/cover no-repeat;
    animation: kenBurns 18s ease-in-out infinite alternate;
    transform-origin: center;
  }
  @keyframes kenBurns {
    0%   { transform: scale(1) translateX(0); }
    100% { transform: scale(1.06) translateX(-1%); }
  }

  .hero-watermark {
    position: absolute; bottom: -30px; right: -10px;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(160px, 25vw, 320px); font-weight: 300;
    color: rgba(201, 169, 110, 0.06); line-height: 1;
    pointer-events: none; user-select: none; letter-spacing: -0.02em;
  }

  .hero-content {
    position: relative; text-align: center; padding: 0 20px;
    animation: fadeUp 1.2s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-eyebrow {
    font-size: 0.68rem; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 24px;
    display: flex; align-items: center; justify-content: center; gap: 16px;
  }
  .hero-eyebrow::before, .hero-eyebrow::after {
    content: ''; display: block; width: 40px; height: 1px; background: var(--gold); opacity: 0.6;
  }

  .hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 8vw, 8rem); font-weight: 300;
    line-height: 0.9; letter-spacing: -0.01em;
    margin-bottom: 32px;
  }
  .hero h1 em { font-style: italic; color: var(--gold-light); }

  .hero-sub {
    font-size: 0.85rem; letter-spacing: 0.12em; font-weight: 300;
    opacity: 0.7; max-width: 360px; margin: 0 auto 48px; line-height: 1.8;
  }

  .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  .btn-primary {
    background: var(--gold); color: var(--navy);
    padding: 16px 40px; text-decoration: none;
    font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 500; transition: background 0.3s, transform 0.2s;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }

  .btn-ghost {
    border: 1px solid rgba(245,240,232,0.35); color: var(--ivory);
    padding: 16px 40px; text-decoration: none;
    font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 300; transition: border-color 0.3s, background 0.3s;
  }
  .btn-ghost:hover { border-color: var(--ivory); background: rgba(245,240,232,0.08); }

  .hero-scroll {
    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    opacity: 0.5; animation: fadeUp 1.6s 0.6s ease both;
  }
  .hero-scroll span { font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase; }
  .scroll-line { width: 1px; height: 40px; background: var(--ivory); animation: scrollPulse 2s infinite; }
  @keyframes scrollPulse {
    0%,100% { transform: scaleY(1); opacity: 0.5; }
    50%      { transform: scaleY(0.4); opacity: 0.2; }
  }

  /* ---- GOLD DIVIDER ---- */
  .gold-divider {
    display: flex; align-items: center; justify-content: center; gap: 20px;
    padding: 0 60px; margin: 16px 0;
  }
  .gold-divider::before, .gold-divider::after {
    content: ''; flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--gold) 50%, transparent);
  }
  .gold-divider-diamond {
    width: 6px; height: 6px; background: var(--gold);
    transform: rotate(45deg);
  }

  /* ---- SECTION BASE ---- */
  section { padding: 120px 60px; }
  .section-eyebrow {
    font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 20px; display: block;
  }
  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 5vw, 4.2rem); font-weight: 300;
    line-height: 1.1; letter-spacing: -0.01em;
  }
  h2 em { font-style: italic; color: var(--gold-light); }

  /* ---- INTRO STRIP ---- */
  .intro {
    background: var(--ivory); color: var(--navy);
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
    padding: 100px 80px;
  }
  .intro-text p {
    font-size: 1rem; line-height: 1.9; font-weight: 300; color: var(--slate);
    margin-top: 28px; max-width: 480px;
  }
  .intro-stat-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
    background: rgba(10,15,30,0.1);
  }
  .stat-cell {
    background: var(--ivory); padding: 40px 36px;
  }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.2rem; font-weight: 300; color: var(--navy); line-height: 1;
  }
  .stat-num sup { font-size: 1.2rem; }
  .stat-label {
    font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--slate); margin-top: 8px; opacity: 0.7;
  }

  /* ---- ROOMS ---- */
  .rooms { background: var(--navy); padding: 120px 60px; }
  .rooms-header { text-align: center; margin-bottom: 72px; }
  .rooms-header p {
    font-size: 0.9rem; line-height: 1.8; font-weight: 300;
    opacity: 0.6; max-width: 500px; margin: 20px auto 0;
  }

  .rooms-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }

  .room-card {
    position: relative; overflow: hidden; cursor: pointer;
    aspect-ratio: 3/4;
  }
  .room-card:first-child { grid-row: span 2; aspect-ratio: auto; }

  .room-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.7s ease;
    display: block;
  }
  .room-card:hover .room-img { transform: scale(1.06); }

  .room-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,15,30,0.92) 0%, rgba(10,15,30,0.1) 60%);
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 36px 32px;
  }
  .room-tag {
    font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 8px;
  }
  .room-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 300; line-height: 1.1;
    margin-bottom: 12px;
  }
  .room-price {
    font-size: 0.75rem; opacity: 0.6; letter-spacing: 0.1em;
  }
  .room-price strong { color: var(--gold-light); font-weight: 400; font-size: 0.95rem; }

  /* Use placeholder gradients as fallback if images don't load */
  .room-placeholder-1 { background: linear-gradient(135deg, #1a2340 0%, #2d3a5e 100%); }
  .room-placeholder-2 { background: linear-gradient(135deg, #1e2835 0%, #2e3d4f 100%); }
  .room-placeholder-3 { background: linear-gradient(135deg, #1f1e2e 0%, #2d2c45 100%); }
  .room-placeholder-4 { background: linear-gradient(135deg, #1a2f2a 0%, #243d37 100%); }

  /* ---- EXPERIENCE ---- */
  .experience { background: var(--ivory); color: var(--navy); padding: 120px 80px; }
  .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 72px; }
  .exp-item { display: flex; gap: 28px; align-items: flex-start; }
  .exp-icon {
    width: 48px; height: 48px; flex-shrink: 0;
    border: 1px solid var(--gold); display: flex; align-items: center; justify-content: center;
    color: var(--gold); font-size: 1.1rem; margin-top: 4px;
  }
  .exp-item h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 400; margin-bottom: 10px;
  }
  .exp-item p { font-size: 0.87rem; line-height: 1.85; color: var(--slate); font-weight: 300; }

  /* ---- TESTIMONIAL ---- */
  .testimonial {
    background: var(--dark-card); padding: 120px 80px;
    text-align: center; position: relative; overflow: hidden;
  }
  .testimonial-bg-text {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(100px, 18vw, 200px); font-weight: 300;
    color: rgba(201, 169, 110, 0.05);
    pointer-events: none; user-select: none; white-space: nowrap;
  }
  .quote-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem; color: var(--gold); line-height: 0.5;
    opacity: 0.6; margin-bottom: 32px; display: block;
  }
  .testimonial blockquote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.4rem, 3vw, 2.4rem); font-weight: 300; font-style: italic;
    max-width: 800px; margin: 0 auto 40px; line-height: 1.5; position: relative;
  }
  .testimonial cite {
    font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
    opacity: 0.5; font-style: normal;
  }

  /* ---- DINING ---- */
  .dining {
    display: grid; grid-template-columns: 1fr 1fr;
    min-height: 600px;
  }
  .dining-img {
    background: 
      linear-gradient(to right, rgba(10,15,30,0) 60%, var(--navy) 100%),
      url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80') center/cover;
  }
  .dining-text {
    background: var(--navy); padding: 100px 80px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .dining-text p {
    font-size: 0.9rem; line-height: 1.9; font-weight: 300;
    opacity: 0.65; margin: 24px 0 40px; max-width: 440px;
  }

  /* ---- LOCATION ---- */
  .location { background: var(--ivory); color: var(--navy); padding: 120px 80px; }
  .location-inner { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: center; }
  .location-text p {
    font-size: 0.9rem; line-height: 1.9; color: var(--slate);
    font-weight: 300; margin: 24px 0 40px; max-width: 400px;
  }
  .location-coords {
    display: flex; gap: 40px; margin-top: 8px;
  }
  .coord-item { }
  .coord-label { font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; opacity: 0.5; }
  .coord-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 300; margin-top: 4px;
  }
  .location-map {
    height: 420px;
    background: 
      url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80') center/cover;
    position: relative;
  }
  .map-pin {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 14px; height: 14px; background: var(--gold); border-radius: 50%;
    box-shadow: 0 0 0 8px rgba(201,169,110,0.25), 0 0 0 20px rgba(201,169,110,0.1);
  }

  /* ---- BOOKING ---- */
  .booking {
    background: var(--navy); padding: 120px 60px; text-align: center;
  }
  .booking h2 { margin: 12px 0 16px; }
  .booking > p {
    font-size: 0.9rem; opacity: 0.55; font-weight: 300;
    max-width: 400px; margin: 0 auto 60px; line-height: 1.7;
  }
  .booking-form {
    display: flex; gap: 0; max-width: 760px; margin: 0 auto;
    border: 1px solid rgba(201,169,110,0.3);
  }
  .booking-field {
    flex: 1; padding: 24px 28px; background: transparent;
    border: none; border-right: 1px solid rgba(201,169,110,0.2);
    color: var(--ivory); font-family: 'Jost', sans-serif; font-size: 0.8rem;
    letter-spacing: 0.05em; outline: none;
  }
  .booking-field::placeholder { opacity: 0.4; font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; }
  .booking-field:last-of-type { border-right: none; }
  .booking-form .btn-primary { white-space: nowrap; border: none; cursor: pointer; }

  /* ---- FOOTER ---- */
  footer {
    background: #050810; padding: 80px 60px 40px;
  }
  .footer-top {
    display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 60px;
    padding-bottom: 60px; border-bottom: 1px solid rgba(201,169,110,0.15);
  }
  .footer-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 300; letter-spacing: 0.15em;
    margin-bottom: 20px;
  }
  .footer-brand span { color: var(--gold); }
  .footer-desc {
    font-size: 0.82rem; line-height: 1.8; opacity: 0.45; font-weight: 300; max-width: 280px;
  }
  .footer-col h4 {
    font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 24px;
  }
  .footer-col ul { list-style: none; }
  .footer-col li { margin-bottom: 12px; }
  .footer-col a {
    font-size: 0.82rem; opacity: 0.5; color: var(--ivory);
    text-decoration: none; transition: opacity 0.2s;
    font-weight: 300; letter-spacing: 0.04em;
  }
  .footer-col a:hover { opacity: 0.9; }
  .footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 32px;
    font-size: 0.68rem; opacity: 0.3; letter-spacing: 0.1em;
  }
</style>
</head>
<body>

<!-- NAV -->
<nav id="nav">
  <a href="#" class="nav-logo">VEL<span>A</span>RA</a>
  <ul class="nav-links">
    <li><a href="#rooms">Rooms</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#dining">Dining</a></li>
    <li><a href="#location">Location</a></li>
  </ul>
  <a href="#booking" class="nav-cta">Reserve</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-watermark">V</div>
  <div class="hero-content">
    <div class="hero-eyebrow">Est. 1924 · Amalfi Coast, Italy</div>
    <h1>Where <em>stillness</em><br>meets the sea</h1>
    <p class="hero-sub">A private clifftop retreat for those who have everything — and want only one thing more.</p>
    <div class="hero-btns">
      <a href="#booking" class="btn-primary">Reserve a Suite</a>
      <a href="#rooms" class="btn-ghost">Explore Rooms</a>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Discover</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- INTRO -->
<section class="intro">
  <div class="intro-text">
    <span class="section-eyebrow">About Velara</span>
    <h2>A century of <em>quiet excellence</em></h2>
    <p>Since 1924, Velara has sheltered royalty, artists, and those who prefer their privacy absolute. Perched 280 meters above the Tyrrhenian Sea, our 24 suites occupy a restored Bourbon-era palace where marble corridors lead to terraces of breathtaking silence.</p>
  </div>
  <div class="intro-stat-grid">
    <div class="stat-cell">
      <div class="stat-num">24</div>
      <div class="stat-label">Private Suites</div>
    </div>
    <div class="stat-cell">
      <div class="stat-num">100<sup>+</sup></div>
      <div class="stat-label">Years of Legacy</div>
    </div>
    <div class="stat-cell">
      <div class="stat-num">280m</div>
      <div class="stat-label">Above Sea Level</div>
    </div>
    <div class="stat-cell">
      <div class="stat-num">1<sup>:1</sup></div>
      <div class="stat-label">Staff to Guest</div>
    </div>
  </div>
</section>

<!-- ROOMS -->
<section class="rooms" id="rooms">
  <div class="rooms-header">
    <span class="section-eyebrow">Accommodations</span>
    <h2>Suites for the <em>unhurried</em></h2>
    <p>Each suite is a world unto itself — original frescoes, hand-woven linens, and a terrace framing the sea.</p>
  </div>
  <div class="rooms-grid">
    <!-- Cards use CSS gradient backgrounds as elegant fallbacks -->
    <div class="room-card">
      <div class="room-placeholder-1" style="width:100%;height:100%;position:absolute;inset:0;"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 40%, rgba(30,45,80,0.4) 0%, rgba(10,15,30,0.85) 100%);"></div>
      <div class="room-overlay">
        <div class="room-tag">Signature Suite</div>
        <div class="room-name">Palazzo Grande</div>
        <div class="room-price">From <strong>€2,400</strong> / night · 120 m²</div>
      </div>
    </div>
    <div class="room-card">
      <div class="room-placeholder-2" style="width:100%;height:100%;position:absolute;inset:0;"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(40,55,75,0.3) 0%, rgba(10,15,30,0.85) 100%);"></div>
      <div class="room-overlay">
        <div class="room-tag">Sea Suite</div>
        <div class="room-name">Vista Azzurra</div>
        <div class="room-price">From <strong>€1,600</strong> / night · 78 m²</div>
      </div>
    </div>
    <div class="room-card">
      <div class="room-placeholder-3" style="width:100%;height:100%;position:absolute;inset:0;"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%, rgba(35,30,55,0.35) 0%, rgba(10,15,30,0.9) 100%);"></div>
      <div class="room-overlay">
        <div class="room-tag">Garden Suite</div>
        <div class="room-name">Villa Rosa</div>
        <div class="room-price">From <strong>€1,200</strong> / night · 65 m²</div>
      </div>
    </div>
    <div class="room-card">
      <div class="room-placeholder-4" style="width:100%;height:100%;position:absolute;inset:0;"></div>
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 40% 40%, rgba(25,45,40,0.35) 0%, rgba(10,15,30,0.88) 100%);"></div>
      <div class="room-overlay">
        <div class="room-tag">Terrace Suite</div>
        <div class="room-name">Belvedere</div>
        <div class="room-price">From <strong>€980</strong> / night · 55 m²</div>
      </div>
    </div>
  </div>
</section>

<!-- EXPERIENCE -->
<section class="experience" id="experience">
  <div style="text-align:center; margin-bottom:0;">
    <span class="section-eyebrow">The Velara Way</span>
    <h2>Every detail, <em>considered</em></h2>
  </div>
  <div class="exp-grid">
    <div class="exp-item">
      <div class="exp-icon">✦</div>
      <div>
        <h3>Private Cliff Pool</h3>
        <p>An infinity pool suspended above the sea, warmed to 30°C year-round, reserved exclusively for guests — never shared with more than two other parties.</p>
      </div>
    </div>
    <div class="exp-item">
      <div class="exp-icon">◈</div>
      <div>
        <h3>Grotta Spa</h3>
        <p>Carved from a natural sea cave, our spa uses geothermal seawater and treatments devised with Officina Profumo Santa Maria Novella, Florence.</p>
      </div>
    </div>
    <div class="exp-item">
      <div class="exp-icon">⊛</div>
      <div>
        <h3>Private Boat Charter</h3>
        <p>A 1962 mahogany Riva Aquarama is at your disposal for coastal excursions, Capri day trips, or evening aperitivi under Positano's lights.</p>
      </div>
    </div>
    <div class="exp-item">
      <div class="exp-icon">◇</div>
      <div>
        <h3>Sommelier Concierge</h3>
        <p>A dedicated sommelier curates nightly pairings from our 4,000-bottle cellar, including vertical collections unavailable to the public market.</p>
      </div>
    </div>
    <div class="exp-item">
      <div class="exp-icon">⊕</div>
      <div>
        <h3>Cooking Atelier</h3>
        <p>Morning sessions with our chef in the original palazzo kitchen: pasta sfoglia, limoncello pressing, and the art of the Neapolitan ragù.</p>
      </div>
    </div>
    <div class="exp-item">
      <div class="exp-icon">✧</div>
      <div>
        <h3>Night Sky Terrace</h3>
        <p>A rooftop observatory with a Zeiss refractor. Our resident astronomer guides private sessions on clear evenings above the light-free horizon.</p>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIAL -->
<section class="testimonial">
  <div class="testimonial-bg-text">Velara</div>
  <span class="quote-mark">"</span>
  <blockquote>
    There are hotels that offer luxury, and then there is Velara — which offers something rarer: the sensation that time itself has been set aside for you.
  </blockquote>
  <div class="gold-divider" style="max-width:200px;margin:24px auto 20px;">
    <div class="gold-divider-diamond"></div>
  </div>
  <cite>— Condé Nast Traveller, Best Hotel in Europe 2024</cite>
</section>

<!-- DINING -->
<section class="dining" id="dining">
  <div class="dining-img"></div>
  <div class="dining-text">
    <span class="section-eyebrow">Dining</span>
    <h2>La Terrazza<br><em>Ristorante</em></h2>
    <p>Our open-air terrace restaurant holds two Michelin stars under Executive Chef Giulia Ferrante. The menu is a love letter to the Campanian coast — written fresh each morning with what the fishing boats bring in.</p>
    <p style="margin-top:-12px;">Reservations for non-residents are accepted for dinner only, twelve weeks in advance.</p>
    <a href="#booking" class="btn-primary" style="display:inline-block;margin-top:0;">Reserve a Table</a>
  </div>
</section>

<!-- LOCATION -->
<section class="location" id="location">
  <div class="location-inner">
    <div class="location-text">
      <span class="section-eyebrow">How to Arrive</span>
      <h2>The Amalfi<br><em>Coast</em></h2>
      <p>Velara sits at the summit of Ravello, the quietest village on the coast. We recommend arrival by helicopter from Naples (18 min) or by our private launch from Positano harbour.</p>
      <div class="location-coords">
        <div class="coord-item">
          <div class="coord-label">Latitude</div>
          <div class="coord-value">40°39'N</div>
        </div>
        <div class="coord-item">
          <div class="coord-label">Longitude</div>
          <div class="coord-value">14°36'E</div>
        </div>
      </div>
      <a href="#" class="btn-primary" style="display:inline-block;margin-top:40px;">Request Transfer</a>
    </div>
    <div class="location-map">
      <div class="map-pin"></div>
    </div>
  </div>
</section>

<!-- BOOKING -->
<section class="booking" id="booking">
  <span class="section-eyebrow">Reservations</span>
  <h2>Begin your <em>stay</em></h2>
  <p>Our reservation team is available seven days a week. Rates include breakfast, transfers from Positano, and daily private excursion planning.</p>
  <div class="booking-form">
    <input type="text" class="booking-field" placeholder="Arrival">
    <input type="text" class="booking-field" placeholder="Departure">
    <input type="text" class="booking-field" placeholder="Guests">
    <button class="btn-primary">Check Availability</button>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-top">
    <div>
      <div class="footer-brand">VEL<span>A</span>RA</div>
      <p class="footer-desc">A private clifftop palace on the Amalfi Coast. Twenty-four suites. One century of silence.</p>
    </div>
    <div class="footer-col">
      <h4>The Hotel</h4>
      <ul>
        <li><a href="#">Our Story</a></li>
        <li><a href="#">Suites & Villas</a></li>
        <li><a href="#">Dining</a></li>
        <li><a href="#">Wellness</a></li>
        <li><a href="#">Events</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Guest Services</h4>
      <ul>
        <li><a href="#">Reservations</a></li>
        <li><a href="#">Transfers</a></li>
        <li><a href="#">Private Events</a></li>
        <li><a href="#">Gifts & Vouchers</a></li>
        <li><a href="#">Loyalty</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="#">+39 089 857 241</a></li>
        <li><a href="#">stay@velara.com</a></li>
        <li><a href="#">Via della Pace 14,<br>Ravello, SA 84010</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2024 Velara S.r.l. All rights reserved.</span>
    <span>Privacy · Terms · Accessibility</span>
  </div>
</footer>

<script>
  // Scroll-aware nav
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.exp-item, .stat-cell, .room-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
</script>
</body>
</html>
`;
