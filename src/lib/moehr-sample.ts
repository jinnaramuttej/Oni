export const MOEHR_SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Moehr Atelier - Architecture & Interiors</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@200;300;400;500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink: #0D0C0A;
  --paper: #F2EFE9;
  --warm-white: #FAF8F5;
  --rust: #B85C38;
  --rust-dark: #8C3E22;
  --stone: #8A8478;
  --stone-light: #C4BFB6;
  --f-display: 'Playfair Display', Georgia, serif;
  --f-body: 'DM Sans', system-ui, sans-serif;
  --f-mono: 'DM Mono', monospace;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--f-body);
  background: var(--ink);
  color: var(--paper);
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--ink); }
::-webkit-scrollbar-thumb { background: var(--rust); }

nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 200;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 32px 52px;
  transition: padding 0.4s var(--ease), background 0.4s var(--ease), border-color 0.4s var(--ease);
}

nav.scrolled {
  background: rgba(13,12,10,0.96);
  backdrop-filter: blur(16px);
  padding: 20px 52px;
  border-bottom: 1px solid rgba(184,92,56,0.15);
}

.nav-left {
  display: flex;
  gap: 32px;
  list-style: none;
}

.nav-left a {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--stone-light);
  text-decoration: none;
  transition: color 0.25s;
  font-weight: 300;
}

.nav-left a:hover { color: var(--rust); }

.nav-logo {
  text-align: center;
  font-family: var(--f-display);
  font-weight: 900;
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  color: var(--paper);
  text-decoration: none;
  text-transform: uppercase;
}

.nav-logo .dot { color: var(--rust); }

.nav-right {
  display: flex;
  justify-content: flex-end;
}

.nav-cta {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 400;
  color: var(--rust);
  text-decoration: none;
  border-bottom: 1px solid var(--rust);
  padding-bottom: 2px;
  transition: color 0.25s, border-color 0.25s;
}

.nav-cta:hover { color: var(--paper); border-color: var(--paper); }

@media (max-width: 768px) {
  nav { grid-template-columns: 1fr 1fr; padding: 22px 24px; }
  .nav-left, .nav-right { display: none; }
  .nav-logo { text-align: left; }
}

.hero {
  position: relative;
  height: 100vh;
  min-height: 720px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-reel {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.hero-reel-left {
  background:
    linear-gradient(to right, rgba(13,12,10,0.6) 0%, rgba(13,12,10,0.1) 100%),
    url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&fit=crop') center/cover;
  animation: subtleZoom 18s ease-in-out infinite alternate;
}

.hero-reel-right {
  background:
    linear-gradient(to left, rgba(13,12,10,0.3) 0%, transparent 100%),
    url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&fit=crop') center/cover;
  animation: subtleZoom 18s 2s ease-in-out infinite alternate;
}

@keyframes subtleZoom {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13,12,10,0.9) 0%, rgba(13,12,10,0.1) 60%);
}

.hero-content {
  position: relative;
  padding: 0 52px 72px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}

.hero-text { max-width: 700px; }

.hero-index {
  font-family: var(--f-mono);
  font-size: 0.68rem;
  color: var(--rust);
  letter-spacing: 0.1em;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.hero-index::before {
  content: '';
  display: block;
  width: 32px;
  height: 1px;
  background: var(--rust);
}

h1 {
  font-family: var(--f-display);
  font-weight: 900;
  font-size: clamp(3.8rem, 8vw, 8rem);
  line-height: 0.92;
  letter-spacing: -0.03em;
  margin-bottom: 32px;
}

h1 em { font-style: italic; font-weight: 400; color: var(--stone-light); }

.hero-sub {
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.85;
  color: var(--stone-light);
  max-width: 380px;
  letter-spacing: 0.02em;
}

.hero-aside {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
}

.hero-counter {
  font-family: var(--f-display);
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  color: rgba(242,239,233,0.08);
  letter-spacing: -0.04em;
}

.hero-scroll {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: var(--f-mono);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  color: var(--stone);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-scroll::after {
  content: '';
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--stone), transparent);
}

.ticker {
  background: var(--rust);
  color: var(--paper);
  padding: 14px 0;
  overflow: hidden;
  white-space: nowrap;
}

.ticker-inner {
  display: inline-flex;
  gap: 0;
  animation: ticker 30s linear infinite;
}

.ticker-inner span {
  font-family: var(--f-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.ticker-inner span::after {
  content: '◆';
  font-size: 0.5rem;
  opacity: 0.6;
}

@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.manifesto {
  background: var(--paper);
  color: var(--ink);
  padding: 120px 52px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 80px;
  align-items: start;
}

.manifesto-label {
  font-family: var(--f-mono);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--stone);
  padding-top: 14px;
}

.manifesto-label span {
  display: block;
  font-size: 2rem;
  font-weight: 200;
  font-family: var(--f-display);
  color: var(--ink);
  margin-top: 12px;
}

.manifesto-text {
  font-family: var(--f-display);
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.manifesto-text em { font-style: italic; color: var(--rust); }

.projects { background: var(--ink); padding: 80px 52px 120px; }

.projects-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 52px;
}

.section-label {
  font-family: var(--f-mono);
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--rust);
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-label::before {
  content: '';
  display: block;
  width: 24px;
  height: 1px;
  background: var(--rust);
}

.projects-count {
  font-family: var(--f-mono);
  font-size: 0.65rem;
  color: var(--stone);
  letter-spacing: 0.1em;
}

.projects-grid {
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-template-rows: 460px 300px;
  gap: 4px;
}

.proj-card {
  position: relative;
  overflow: hidden;
}

.proj-card:nth-child(1) { grid-row: 1 / 3; }
.proj-card:nth-child(2) { grid-row: 1; }
.proj-card:nth-child(3) { grid-row: 2; }

.proj-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.9s var(--ease);
}

.proj-card:hover .proj-img { transform: scale(1.06); }

.proj-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13,12,10,0.88) 0%, rgba(13,12,10,0) 55%);
  transition: background 0.5s;
}

.proj-card:hover .proj-scrim {
  background: linear-gradient(to top, rgba(13,12,10,0.92) 0%, rgba(13,12,10,0.25) 55%);
}

.proj-meta {
  position: absolute;
  inset: 0;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.proj-type {
  font-family: var(--f-mono);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--rust);
  margin-bottom: 10px;
  transform: translateY(8px);
  opacity: 0;
  transition: transform 0.5s var(--ease), opacity 0.5s;
}

.proj-card:hover .proj-type { transform: translateY(0); opacity: 1; }

.proj-name {
  font-family: var(--f-display);
  font-size: clamp(1.4rem, 2.5vw, 2.2rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 8px;
}

.proj-location {
  font-size: 0.75rem;
  color: var(--stone-light);
  font-weight: 300;
  letter-spacing: 0.05em;
}

.proj-arrow {
  position: absolute;
  top: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(242,239,233,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--paper);
  transform: translateY(-8px) rotate(-45deg);
  opacity: 0;
  transition: transform 0.5s var(--ease), opacity 0.5s, background 0.3s;
}

.proj-card:hover .proj-arrow {
  transform: translateY(0) rotate(0deg);
  opacity: 1;
  background: var(--rust);
  border-color: var(--rust);
}

.services {
  background: var(--warm-white);
  color: var(--ink);
  padding: 120px 52px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--stone-light);
  margin-top: 64px;
}

.service-cell {
  background: var(--warm-white);
  padding: 52px 44px;
  transition: background 0.4s;
}

.service-cell:hover { background: var(--ink); }
.service-cell:hover .service-num,
.service-cell:hover .service-name,
.service-cell:hover .service-desc { color: var(--paper); }
.service-cell:hover .service-icon { border-color: var(--rust); color: var(--rust); }

.service-icon {
  width: 48px;
  height: 48px;
  border: 1px solid var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 40px;
  transition: border-color 0.4s, color 0.4s;
}

.service-num {
  font-family: var(--f-mono);
  font-size: 0.65rem;
  color: var(--rust);
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  transition: color 0.4s;
}

.service-name {
  font-family: var(--f-display);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  transition: color 0.4s;
}

.service-desc {
  font-size: 0.85rem;
  line-height: 1.8;
  color: var(--stone);
  font-weight: 300;
  transition: color 0.4s;
}

.stats-strip {
  background: var(--rust);
  color: var(--paper);
  padding: 80px 52px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.stat-item { padding: 0 32px; border-right: 1px solid rgba(242,239,233,0.2); }
.stat-item:last-child { border-right: none; }

.stat-val {
  font-family: var(--f-display);
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  opacity: 0.75;
  text-transform: uppercase;
}

.studio {
  background: var(--ink);
  color: var(--paper);
  padding: 120px 52px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.studio-img-wrap { position: relative; }

.studio-img-main {
  width: 100%;
  aspect-ratio: 4 / 5;
  background: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&fit=crop') center/cover;
}

.studio-img-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--rust);
  color: var(--paper);
  padding: 28px;
  text-align: center;
}

.studio-img-badge .big {
  font-family: var(--f-display);
  font-size: 2.8rem;
  font-weight: 900;
  line-height: 1;
}

.studio-img-badge .small {
  font-family: var(--f-mono);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.8;
  margin-top: 4px;
}

.studio-text .section-label { margin-bottom: 28px; }

.studio-text h2 {
  font-family: var(--f-display);
  font-size: clamp(2.4rem, 4vw, 4rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 28px;
}

.studio-text h2 em { font-style: italic; font-weight: 400; color: var(--stone-light); }

.studio-text p {
  font-size: 0.9rem;
  line-height: 1.9;
  color: var(--stone-light);
  font-weight: 300;
  margin-bottom: 18px;
}

.studio-cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-top: 16px;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--rust);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid var(--rust);
  padding-bottom: 4px;
  transition: color 0.25s, border-color 0.25s;
}

.studio-cta::after { content: '->'; font-size: 1rem; }
.studio-cta:hover { color: var(--paper); border-color: var(--paper); }

.contact {
  background: var(--paper);
  color: var(--ink);
  padding: 120px 52px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.contact-text h2 {
  font-family: var(--f-display);
  font-size: clamp(2.4rem, 4vw, 4rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.contact-text h2 em { font-style: italic; font-weight: 400; color: var(--rust); }

.contact-text p {
  font-size: 0.88rem;
  line-height: 1.9;
  color: var(--stone);
  font-weight: 300;
  margin: 28px 0 40px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--stone-light);
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--stone);
}

.contact-row-label {
  font-family: var(--f-mono);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--rust);
  min-width: 80px;
  padding-top: 3px;
}

.cf-group { margin-bottom: 28px; }

.cf-group label {
  display: block;
  font-family: var(--f-mono);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: 10px;
}

.cf-group input, .cf-group textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1.5px solid var(--stone-light);
  padding: 12px 0;
  font-family: var(--f-body);
  font-size: 0.9rem;
  color: var(--ink);
  outline: none;
  transition: border-color 0.3s;
}

.cf-group input:focus, .cf-group textarea:focus { border-bottom-color: var(--rust); }
.cf-group textarea { resize: none; }

.cf-submit {
  background: var(--ink);
  color: var(--paper);
  padding: 16px 40px;
  border: none;
  cursor: pointer;
  font-family: var(--f-body);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  transition: background 0.3s;
}

.cf-submit:hover { background: var(--rust); }

footer {
  background: var(--ink);
  border-top: 1px solid rgba(184,92,56,0.15);
  padding: 60px 52px 40px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 40px;
}

.footer-logo {
  font-family: var(--f-display);
  font-weight: 900;
  font-size: 1.4rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--paper);
  margin-bottom: 12px;
}

.footer-logo span { color: var(--rust); }

.footer-copy {
  font-size: 0.72rem;
  color: var(--stone);
  font-weight: 300;
  letter-spacing: 0.05em;
}

.footer-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.footer-links a {
  font-family: var(--f-mono);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--stone);
  text-decoration: none;
  transition: color 0.25s;
}

.footer-links a:hover { color: var(--rust); }

.footer-social {
  display: flex;
  justify-content: flex-end;
  gap: 24px;
}

.footer-social a {
  font-family: var(--f-mono);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--stone);
  text-decoration: none;
  transition: color 0.25s;
}

.footer-social a:hover { color: var(--paper); }

.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
}

.reveal.in { opacity: 1; transform: none; }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.35s; }

@media (max-width: 900px) {
  .projects-grid { grid-template-columns: 1fr; grid-template-rows: 380px 260px 260px; }
  .proj-card:nth-child(1) { grid-row: auto; }
  .services-grid { grid-template-columns: 1fr; }
  .stats-strip { grid-template-columns: 1fr 1fr; }
  .studio, .contact, .manifesto { grid-template-columns: 1fr; }
  footer { grid-template-columns: 1fr; }
  .footer-links { align-items: flex-start; }
  .footer-social { justify-content: flex-start; }
}

@media (max-width: 768px) {
  .hero { min-height: 100svh; }
  .hero-reel { grid-template-columns: 1fr; }
  .hero-reel-right { display: none; }
  .hero-content {
    padding: 0 24px 48px;
    flex-direction: column;
    align-items: flex-start;
  }
  .hero-aside { align-items: flex-start; }
  .manifesto, .projects, .services, .studio, .contact, footer { padding-left: 24px; padding-right: 24px; }
  .manifesto-text, .contact-text h2, .studio-text h2, h1 { font-size: clamp(2.5rem, 14vw, 4rem); }
  .projects-header { flex-direction: column; gap: 12px; }
  .stats-strip { grid-template-columns: 1fr; }
  .stat-item { border-right: none; border-bottom: 1px solid rgba(242,239,233,0.2); padding: 20px 0; }
  .stat-item:last-child { border-bottom: none; }
  .contact, .studio { gap: 48px; }
}
</style>
</head>
<body>

<div class="cursor" id="cursor"></div>

<nav id="nav">
  <ul class="nav-left">
    <li><a href="#projects">Work</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#studio">Studio</a></li>
  </ul>
  <a href="#" class="nav-logo">Moehr<span class="dot">.</span></a>
  <div class="nav-right">
    <a href="#contact" class="nav-cta">Start a Project</a>
  </div>
</nav>

<section class="hero">
  <div class="hero-reel">
    <div class="hero-reel-left"></div>
    <div class="hero-reel-right"></div>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-text">
      <div class="hero-index">Architecture & Interiors - Est. 2004</div>
      <h1>Space<br>is the <em>material</em></h1>
      <p class="hero-sub">We build environments that resist the obvious - places that earn their silence through the exactness of every decision made within them.</p>
    </div>
    <div class="hero-aside">
      <div class="hero-counter">140</div>
      <div class="hero-scroll">Scroll to explore</div>
    </div>
  </div>
</section>

<div class="ticker">
  <div class="ticker-inner" id="ticker-inner">
    <span>Residential</span>
    <span>Commercial</span>
    <span>Hospitality</span>
    <span>Cultural</span>
    <span>Urban Planning</span>
    <span>Interior Design</span>
    <span>Brand Environments</span>
    <span>Restoration</span>
    <span>Residential</span>
    <span>Commercial</span>
    <span>Hospitality</span>
    <span>Cultural</span>
    <span>Urban Planning</span>
    <span>Interior Design</span>
    <span>Brand Environments</span>
    <span>Restoration</span>
  </div>
</div>

<section class="manifesto">
  <div class="manifesto-label">
    Philosophy
    <span>01</span>
  </div>
  <p class="manifesto-text reveal">
    We believe architecture is not the art of building - it is the art of <em>deciding what not to build.</em> Every room is a question about what it means to be human in a particular place at a particular time.
  </p>
</section>

<section class="projects" id="projects">
  <div class="projects-header">
    <div class="section-label">Selected Work</div>
    <div class="projects-count">140 projects across 28 countries</div>
  </div>
  <div class="projects-grid">
    <div class="proj-card reveal">
      <div class="proj-img" style="background-image: url('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80&fit=crop');"></div>
      <div class="proj-scrim"></div>
      <div class="proj-arrow">↗</div>
      <div class="proj-meta">
        <div class="proj-type">Residential - 2024</div>
        <div class="proj-name">Villa Kato</div>
        <div class="proj-location">Kyoto, Japan</div>
      </div>
    </div>
    <div class="proj-card reveal reveal-delay-1">
      <div class="proj-img" style="background-image: url('https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80&fit=crop');"></div>
      <div class="proj-scrim"></div>
      <div class="proj-arrow">↗</div>
      <div class="proj-meta">
        <div class="proj-type">Hospitality - 2023</div>
        <div class="proj-name">The Aldine</div>
        <div class="proj-location">Lisbon, Portugal</div>
      </div>
    </div>
    <div class="proj-card reveal reveal-delay-2">
      <div class="proj-img" style="background-image: url('https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80&fit=crop');"></div>
      <div class="proj-scrim"></div>
      <div class="proj-arrow">↗</div>
      <div class="proj-meta">
        <div class="proj-type">Cultural - 2022</div>
        <div class="proj-name">Havn Gallery</div>
        <div class="proj-location">Copenhagen, Denmark</div>
      </div>
    </div>
  </div>
</section>

<section class="services" id="services">
  <div class="section-label" style="color: var(--rust);">What We Do</div>
  <div class="services-grid">
    <div class="service-cell reveal">
      <div class="service-icon">◻</div>
      <div class="service-num">01</div>
      <div class="service-name">Architecture</div>
      <div class="service-desc">From concept drawings to construction oversight, we deliver complete architectural services for residential, commercial, and cultural buildings.</div>
    </div>
    <div class="service-cell reveal reveal-delay-1">
      <div class="service-icon">◈</div>
      <div class="service-num">02</div>
      <div class="service-name">Interior Design</div>
      <div class="service-desc">We treat interiors as architecture's conversation with daily life - every surface, material, and proportion is a considered argument for how space should feel.</div>
    </div>
    <div class="service-cell reveal reveal-delay-2">
      <div class="service-icon">⊕</div>
      <div class="service-num">03</div>
      <div class="service-name">Restoration</div>
      <div class="service-desc">We have a practiced fluency in historical structures - respecting what a building knows about itself while making it fit for the next hundred years.</div>
    </div>
  </div>
</section>

<div class="stats-strip">
  <div class="stat-item reveal">
    <div class="stat-val">140</div>
    <div class="stat-label">Projects Completed</div>
  </div>
  <div class="stat-item reveal reveal-delay-1">
    <div class="stat-val">28</div>
    <div class="stat-label">Countries</div>
  </div>
  <div class="stat-item reveal reveal-delay-2">
    <div class="stat-val">20</div>
    <div class="stat-label">Years in Practice</div>
  </div>
  <div class="stat-item reveal reveal-delay-3">
    <div class="stat-val">7</div>
    <div class="stat-label">International Awards</div>
  </div>
</div>

<section class="studio" id="studio">
  <div class="studio-img-wrap reveal">
    <div class="studio-img-main"></div>
    <div class="studio-img-badge">
      <div class="big">EST</div>
      <div class="small">2004 - Berlin</div>
    </div>
  </div>
  <div class="studio-text">
    <div class="section-label">The Studio</div>
    <h2>Built on <em>conviction</em>, not convention</h2>
    <p>Moehr Atelier was founded in 2004 by Stefan Moehr following a decade at Herzog & de Meuron in Basel. The studio now employs 34 architects, designers, and researchers working across five continents.</p>
    <p>We take on between twelve and sixteen projects per year. We believe the quality of a practice is determined by what it refuses as much as by what it accepts.</p>
    <a href="#contact" class="studio-cta">Work with us</a>
  </div>
</section>

<section class="contact" id="contact">
  <div class="contact-text reveal">
    <div class="section-label" style="color:var(--rust);margin-bottom:28px;">Contact</div>
    <h2>Let's make<br>something <em>exact</em></h2>
    <p>Describe your project briefly below. We respond to every serious enquiry within 48 hours.</p>
    <div class="contact-info">
      <div class="contact-row">
        <span class="contact-row-label">Studio</span>
        <span>Brunnenstrasse 190, 10119 Berlin, Germany</span>
      </div>
      <div class="contact-row">
        <span class="contact-row-label">Phone</span>
        <span>+49 30 2404 8810</span>
      </div>
      <div class="contact-row">
        <span class="contact-row-label">Email</span>
        <span>projects@moehratelier.de</span>
      </div>
    </div>
  </div>
  <div class="contact-form reveal reveal-delay-1">
    <div class="cf-group">
      <label>Name</label>
      <input type="text" placeholder="Your full name">
    </div>
    <div class="cf-group">
      <label>Email</label>
      <input type="email" placeholder="you@email.com">
    </div>
    <div class="cf-group">
      <label>Project Type</label>
      <input type="text" placeholder="Residential / Commercial / Other">
    </div>
    <div class="cf-group">
      <label>Tell us about your project</label>
      <textarea rows="4" placeholder="Location, scale, timeline, and what matters most to you..."></textarea>
    </div>
    <button class="cf-submit">Send Enquiry</button>
  </div>
</section>

<footer>
  <div>
    <div class="footer-logo">Moehr<span>.</span></div>
    <div class="footer-copy">© 2026 Moehr Atelier GmbH - All rights reserved</div>
  </div>
  <div class="footer-links">
    <a href="#projects">Work</a>
    <a href="#services">Services</a>
    <a href="#studio">Studio</a>
    <a href="#contact">Contact</a>
  </div>
  <div class="footer-social">
    <a href="#">Instagram</a>
    <a href="#">Dezeen</a>
    <a href="#">LinkedIn</a>
  </div>
</footer>

<script>
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .proj-card, .service-cell').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.querySelector('h1').style.animation = 'fadeUp 1.2s 0.3s cubic-bezier(0.22,1,0.36,1) both';
document.querySelector('.hero-sub').style.animation = 'fadeUp 1.2s 0.55s cubic-bezier(0.22,1,0.36,1) both';
document.querySelector('.hero-index').style.animation = 'fadeUp 1.2s 0.1s cubic-bezier(0.22,1,0.36,1) both';

const style = document.createElement('style');
style.textContent = '@keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:none; } }';
document.head.appendChild(style);
</script>
</body>
</html>`;
