export const AME_COFFEE_SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ÂME — Coffee Atelier</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Fragment+Mono:wght@300;400&family=Instrument+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F9F5EF;
    --oat: #F1E8DA;
    --paper: #FCFAF7;
    --espresso: #14100D;
    --espresso-soft: #1C1713;
    --copper: #C4834A;
    --copper-light: #D8A36A;
    --muted: #9B8674;
    --line: rgba(32,26,22,0.09);
    --line-light: rgba(249,245,239,0.13);
    --serif: 'Fraunces', Georgia, serif;
    --mono: 'Fragment Mono', ui-monospace, monospace;
    --sans: 'Instrument Sans', system-ui, -apple-system, sans-serif;
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--sans); background: var(--cream); color: #201A16; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-thumb { background: var(--copper); }
  ::-webkit-scrollbar-track { background: var(--espresso); }
  ::selection { background: #e9c998; color: #1b120c; }
  input, select, textarea { font-family: inherit; }
  input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); }

  .is-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.82s var(--ease), transform 0.82s var(--ease); }
  .is-reveal.is-in { opacity: 1; transform: translateY(0); }
  .hr-copper { width: 46px; height: 1px; background: var(--copper); }
  .kenburns { animation: ken 22s ease-in-out infinite alternate; }
  @keyframes ken { from { transform: scale(1) translateX(0); } to { transform: scale(1.06) translateX(-1.2%); } }
  .marquee-track { animation: marquee 38s linear infinite; }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .grain::before {
    content: "";
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.035; pointer-events: none; mix-blend-mode: multiply;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    transition: all 0.5s var(--ease);
  }
  .nav-inner {
    max-width: 1280px; margin: 0 auto; padding: 0 24px 0 24px;
    display: flex; align-items: center; justify-content: space-between;
    height: 72px;
  }
  @media (min-width: 768px) { .nav-inner { padding: 0 48px 0 48px; height: 80px; } }
  @media (min-width: 1024px) { .nav-inner { padding: 0 64px 0 64px; } }

  .logo {
    font-family: var(--serif); font-size: 28px; font-weight: 300;
    letter-spacing: -0.014em; color: #f7f1e7; text-decoration: none;
  }
  .logo span { color: var(--copper); }

  .nav-links { display: none; gap: 40px; list-style: none; }
  @media (min-width: 1024px) { .nav-links { display: flex; } }
  .nav-links a {
    font-size: 11.5px; letter-spacing: 0.21em; text-transform: uppercase;
    color: rgba(232,221,208,0.8); text-decoration: none; transition: color 0.3s; font-weight: 400;
  }
  .nav-links a:hover { color: var(--copper-light); }

  .nav-cta {
    display: none; font-size: 11px; letter-spacing: 0.19em; text-transform: uppercase;
    background: var(--copper); color: #1a120c; padding: 11px 20px; font-weight: 500;
    text-decoration: none; transition: background 0.3s;
  }
  @media (min-width: 640px) { .nav-cta { display: inline-block; } }
  .nav-cta:hover { background: var(--copper-light); }

  .mobile-toggle { display: flex; color: #e7dccb; font-size: 11px; font-family: var(--mono); letter-spacing: 0.1em; text-transform: uppercase; }
  @media (min-width: 1024px) { .mobile-toggle { display: none; } }

  /* mobile drawer */
  .mobile-drawer {
    display: none; border-top: 1px solid rgba(196,131,74,0.14); background: rgba(18,14,11,0.985);
    padding: 24px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
  }
  .mobile-drawer.open { display: block; }
  @media (max-width: 1023px) { .mobile-drawer.open { display: block; } }
  .mobile-drawer a { display: block; color: #d6c5b0; margin-bottom: 16px; text-decoration: none; }
  .mobile-drawer .drawer-cta {
    width: 100%; margin-top: 8px; background: var(--copper); color: #1a120c;
    padding: 12px; letter-spacing: 0.2em; text-align: center; text-decoration: none; font-weight: 500;
  }

  /* HERO SPLIT */
  .hero {
    min-height: 100vh; display: grid; grid-template-columns: 1fr; background: var(--espresso);
  }
  @media (min-width: 1024px) { .hero { grid-template-columns: 1.06fr 1fr; } }

  .hero-left {
    position: relative; min-height: 54vh;
  }
  @media (min-width: 1024px) { .hero-left { min-height: 100vh; } }

  .hero-bg {
    position: absolute; inset: 0; background-size: cover; background-position: center 62%;
    background-image:
      linear-gradient(110deg, rgba(16,12,9,0.48) 5%, rgba(16,12,9,0.14) 55%, rgba(16,12,9,0.55) 100%),
      url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1400&q=80&auto=format&fit=crop');
  }

  .hero-location {
    position: absolute; left: 28px; bottom: 28px; font-family: var(--mono);
    font-size: 10.5px; letter-spacing: 0.24em; text-transform: uppercase;
    color: rgba(230,217,198,0.8);
  }
  @media (min-width: 768px) { .hero-location { left: 48px; bottom: 40px; } }

  .hero-right {
    position: relative; background: var(--espresso); color: #F5EFE5;
    display: flex; align-items: center; padding: 64px 28px 48px;
  }
  @media (min-width: 640px) { .hero-right { padding: 96px 48px 64px; } }
  @media (min-width: 1024px) { .hero-right { padding: 96px 124px 64px 124px; } }

  .hero-right.grain::before { content: ""; position: absolute; inset: 0; opacity: 0.035; pointer-events: none; mix-blend-mode: multiply; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  .hero-eyebrow {
    font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--copper); display: flex; align-items: center; gap: 16px; margin-bottom: 32px;
  }
  .hero-eyebrow span:last-child { display: none; width: 40px; height: 1px; background: rgba(196,131,74,0.5); }
  @media (min-width: 768px) { .hero-eyebrow span:last-child { display: block; } }

  .hero h1 {
    font-family: var(--serif); font-size: 52px; line-height: 0.9; letter-spacing: -0.016em; font-weight: 300;
  }
  @media (min-width: 640px) { .hero h1 { font-size: 70px; } }
  @media (min-width: 1024px) { .hero h1 { font-size: 84px; } }
  .hero h1 em { color: var(--copper-light); font-weight: 350; display: block; }

  .hero p {
    margin-top: 28px; max-width: 380px; font-size: 15.5px; line-height: 1.82;
    color: rgba(215,200,180,0.74); font-weight: 300;
  }

  .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
  .btn-primary {
    padding: 15px 28px; background: var(--copper); color: #1c130a;
    font-size: 11.5px; letter-spacing: 0.20em; text-transform: uppercase; font-weight: 500;
    text-decoration: none; transition: background 0.3s; display: inline-block;
  }
  .btn-primary:hover { background: var(--copper-light); }
  .btn-ghost {
    padding: 15px 28px; border: 1px solid rgba(232,221,203,0.25); color: #e8ddcb;
    font-size: 11.5px; letter-spacing: 0.20em; text-transform: uppercase;
    text-decoration: none; transition: all 0.3s;
  }
  .btn-ghost:hover { border-color: var(--copper); color: var(--copper-light); }

  .hero-meta {
    margin-top: 48px; display: flex; flex-wrap: wrap; gap: 24px 40px;
    font-size: 11.5px; font-family: var(--mono); color: rgba(205,167,154,0.76);
  }
  .hero-meta .mono { letter-spacing: 0.14em; }

  .hero-roast {
    margin-top: 64px; padding-top: 24px; border-top: 1px solid rgba(236,217,192,0.1);
    display: flex; align-items: center; gap: 32px; font-size: 11px; font-family: var(--mono);
    color: rgba(189,165,137,0.7);
  }
  .hero-roast .now { color: var(--copper); }

  .hero-watermark {
    position: absolute; right: -16px; bottom: -80px;
    font-family: var(--serif); font-size: 220px; line-height: 1;
    color: rgba(217,176,120,0.038); letter-spacing: -0.05em;
    pointer-events: none; user-select: none;
  }
  @media (min-width: 1024px) { .hero-watermark { font-size: 310px; bottom: -120px; right: -16px; } }

  /* MARQUEE */
  .marquee {
    background: var(--copper); color: #1b120c; padding: 13px 0;
    border-top: 1px solid #a86c36; border-bottom: 1px solid #a86c36; overflow: hidden;
  }
  .marquee-inner { display: flex; width: max-content; }
  .marquee-track {
    display: flex; align-items: center; white-space: nowrap; font-family: var(--mono);
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
  }
  .marquee-item { display: flex; align-items: center; padding: 0 36px; }
  .marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: #1b120c; opacity: 0.8; margin-left: 36px; }

  /* SECTION BASE */
  section { padding: 80px 24px; }
  @media (min-width: 768px) { section { padding: 112px 48px; } }
  @media (min-width: 1024px) { section { padding: 132px 64px; } }

  .wrap { max-width: 1180px; margin: 0 auto; }

  .section-eyebrow {
    font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--copper); display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .section-eyebrow::before { content: ""; width: 24px; height: 1px; background: var(--copper); }

  .section-title {
    font-family: var(--serif); font-size: 42px; line-height: 0.98; letter-spacing: -0.017em; font-weight: 350;
  }
  @media (min-width: 768px) { .section-title { font-size: 58px; } }
  .section-title em { color: var(--copper); font-weight: 370; font-style: normal; }

  /* ABOUT / ATELIER */
  .about { background: var(--cream); }
  .about .wrap { display: grid; gap: 56px; align-items: center; }
  @media (min-width: 1024px) { .about .wrap { grid-template-columns: 1.04fr 1fr; } }

  .about-img-stack { position: relative; height: 430px; }
  @media (min-width: 768px) { .about-img-stack { height: 560px; } }
  .about-img-a {
    position: absolute; right: 0; top: 0; width: 72%; height: 82%;
    background: linear-gradient(180deg, rgba(255,255,255,0.025), rgba(0,0,0,0.08)),
      url('https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=80&auto=format&fit=crop') center/cover;
    box-shadow: 0 22px 60px rgba(43,28,16,0.12);
  }
  .about-img-b {
    position: absolute; left: 0; bottom: 0; width: 54%; height: 48%;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.10)),
      url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80&auto=format&fit=crop') center/cover;
    border: 7px solid var(--cream);
    box-shadow: 0 18px 44px rgba(39,26,14,0.13);
  }
  .roaster-badge {
    position: absolute; right: -14px; bottom: 54px; background: #191310; color: #f7f0e4;
    padding: 18px 22px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
  @media (min-width: 768px) { .roaster-badge { right: -16px; bottom: 54px; padding: 22px 24px; } }
  .roaster-badge .yr { font-family: var(--serif); font-size: 34px; color: var(--copper-light); line-height: 1; }
  .roaster-badge .lbl { font-family: var(--mono); font-size: 8.5px; letter-spacing: 0.22em; text-transform: uppercase; color: #bfa487; margin-top: 4px; white-space: pre-line; }

  .about-text .hr-copper { margin: 28px 0; }
  .about-text p { font-size: 16px; line-height: 1.95; color: #463a2d; font-weight: 300; max-width: 500px; margin-bottom: 16px; }

  .about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--line); max-width: 520px; }
  .stat .n { font-family: var(--serif); font-size: 30px; line-height: 1; }
  .stat .l { font-family: var(--mono); font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase; color: #8b7460; margin-top: 8px; white-space: pre-line; }

  /* COFFEE MENU */
  .menu { background: #16110d; color: #f4e9d7; position: relative; }
  .menu.grain::before { content: ""; position: absolute; inset: 0; opacity: 0.035; pointer-events: none; mix-blend-mode: multiply; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  .menu-header { display: flex; flex-direction: column; gap: 32px; margin-bottom: 48px; }
  @media (min-width: 1024px) { .menu-header { flex-direction: row; align-items: flex-end; justify-content: space-between; } }
  .menu-desc { max-width: 360px; font-size: 14.5px; line-height: 1.85; color: rgba(208,191,166,0.73); font-weight: 300; }

  .menu-tabs { display: flex; flex-wrap: wrap; gap: 32px 8px; border-bottom: 1px solid rgba(211,168,115,0.19); margin-bottom: 40px; padding-bottom: 14px; }
  .menu-tab {
    font-family: var(--mono); font-size: 10.7px; letter-spacing: 0.22em; text-transform: uppercase;
    padding: 14px 0; border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer; transition: all 0.3s; background: none; border-left: none; border-right: none; border-top: none; color: rgba(197,178,150,0.64);
  }
  .menu-tab.active { color: var(--copper-light); border-bottom-color: var(--copper); }
  .menu-tab:hover:not(.active) { color: #e8d7bd; }

  .menu-grid { display: grid; grid-template-columns: 1fr; gap: 1px; background: rgba(208,163,106,0.09); }
  @media (min-width: 768px) { .menu-grid { grid-template-columns: repeat(2, 1fr); } }
  .menu-item {
    background: #17120f; padding: 28px 24px; display: flex; justify-content: space-between; gap: 24px;
    border: 1px solid transparent; transition: all 0.3s;
  }
  .menu-item:hover { background: #1a1410; border-color: rgba(196,131,74,0.19); }
  .menu-item-left { display: flex; flex-direction: column; gap: 8px; }
  .menu-item-name { font-family: var(--serif); font-size: 21px; color: #f4e8d5; }
  @media (min-width: 768px) { .menu-item-name { font-size: 22px; } }
  .menu-item-origin { font-family: var(--mono); font-size: 9.7px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(196,131,74,0.9); }
  .menu-item-notes { font-size: 13.7px; color: rgba(205,184,155,0.78); font-weight: 300; margin-top: 4px; }
  .menu-item-price { font-family: var(--serif); font-size: 18px; color: var(--copper-light); white-space: nowrap; margin-top: 2px; }

  .menu-footer { margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 24px; font-size: 11.5px; font-family: var(--mono); color: rgba(198,175,144,0.7); }
  .menu-footer .dot { opacity: 0.4; }
  .menu-footer .copper { color: var(--copper); }

  /* ORIGIN / FARMS */
  .origin { background: var(--oat); }
  .origin-header { text-align: center; max-width: 640px; margin: 0 auto 56px; }
  .origin-header .section-eyebrow { justify-content: center; }
  .origin-header p { margin-top: 24px; font-size: 15.7px; line-height: 1.88; color: #57493a; font-weight: 300; }

  .farms-grid { display: grid; grid-template-columns: 1fr; gap: 22px; }
  @media (min-width: 768px) { .farms-grid { grid-template-columns: repeat(3, 1fr); } }
  .farm-card { background: var(--paper); border: 1px solid #e3d6c4; overflow: hidden; transition: box-shadow 0.3s; }
  .farm-card:hover { box-shadow: 0 24px 56px rgba(45,28,14,0.06); }
  .farm-img { height: 236px; position: relative; overflow: hidden; }
  .farm-img img { width: 100%; height: 100%; object-fit: cover; }
  .farm-img::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,15,7,0.46), rgba(26,15,7,0.08), transparent); }
  .farm-location { position: absolute; left: 16px; bottom: 16px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #f6e8cf; background: rgba(20,14,9,0.52); padding: 6px 16px; backdrop-filter: blur(3px); }
  .farm-info { padding: 24px; }
  .farm-name { font-family: var(--serif); font-size: 24px; letter-spacing: -0.009em; }
  .farm-details { margin-top: 16px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 0; font-size: 12.6px; color: #5a4632; font-weight: 300; }
  .farm-details .label { font-family: var(--mono); font-size: 9.5px; color: #9c7d5b; display: block; margin-bottom: 2px; }
  .farm-notes { margin-top: 16px; padding-top: 16px; border-top: 1px solid #e9dcc9; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.08em; color: #7b6247; }

  .farm-transparency { text-align: center; margin-top: 40px; font-family: var(--mono); font-size: 10.6px; letter-spacing: 0.16em; color: #957659; }

  /* ROAST PROCESS */
  .roast { background: var(--cream); }
  .roast .wrap { display: grid; gap: 56px; align-items: start; }
  @media (min-width: 1024px) { .roast .wrap { grid-template-columns: 1.08fr 0.92fr; } }
  .roast-steps { order: 2; }
  @media (min-width: 1024px) { .roast-steps { order: 1; } }
  .roast-img-wrap { order: 1; }
  @media (min-width: 1024px) { .roast-img-wrap { order: 2; } }
  .roast-img {
    position: sticky; top: 120px; height: 370px;
  }
  @media (min-width: 768px) { .roast-img { height: 520px; } }
  .roast-img-inner {
    width: 100%; height: 100%; position: relative; overflow: hidden;
    background: linear-gradient(to bottom, rgba(255,244,230,0.02), rgba(39,21,8,0.14)), url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80&auto=format&fit=crop') center/cover;
  }
  .roast-img-caption { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.12em; color: #8a7260; }

  .roast-step { display: flex; gap: 40px; padding: 26px 0; border-bottom: 1px solid var(--line); }
  .roast-step:first-child { border-top: 1px solid var(--line); }
  .roast-step-num { font-family: var(--mono); font-size: 11px; color: var(--copper); margin-top: 4px; min-width: 28px; }
  .roast-step-title { font-family: var(--serif); font-size: 22px; margin-bottom: 6px; }
  .roast-step-desc { font-size: 14.6px; color: #5a4b3b; line-height: 1.78; font-weight: 300; max-width: 430px; }

  /* BARISTAS */
  .baristas { background: #1a1410; color: #f1e4cf; }
  .baristas-header { text-align: center; margin-bottom: 56px; }
  .baristas-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
  @media (min-width: 640px) { .baristas-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .baristas-grid { grid-template-columns: repeat(4, 1fr); } }
  .barista-card { position: relative; }
  .barista-img { aspect-ratio: 3 / 3.65; background: #231b15; overflow: hidden; }
  .barista-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s var(--ease); }
  .barista-card:hover .barista-img img { transform: scale(1.035); }
  .barista-info { padding-top: 16px; padding-bottom: 4px; border-top: 2px solid transparent; transition: border-color 0.3s; }
  .barista-card:hover .barista-info { border-color: var(--copper); }
  .barista-name { font-family: var(--serif); font-size: 19.5px; color: #f7e9d1; }
  .barista-role { font-family: var(--mono); font-size: 9.6px; letter-spacing: 0.16em; text-transform: uppercase; color: #c8ab84; margin-top: 4px; }
  .barista-city { font-size: 12.5px; color: rgba(208,185,151,0.66); margin-top: 4px; }

  /* TESTIMONIAL */
  .testimonial { background: var(--oat); padding: 80px 24px; }
  @media (min-width: 768px) { .testimonial { padding: 96px 24px; } }
  .testimonial-inner { max-width: 900px; margin: 0 auto; text-align: center; }
  .testimonial-label { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--copper); margin-bottom: 28px; }
  .testimonial-quote { font-family: var(--serif); font-size: 26px; line-height: 1.38; color: #2f241a; font-weight: 300; font-style: italic; }
  @media (min-width: 768px) { .testimonial-quote { font-size: 33px; } }
  .testimonial-author { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: #9a7350; margin-top: 28px; }
  .testimonial-dots { display: flex; justify-content: center; gap: 8px; margin-top: 36px; }
  .testimonial-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(198,168,127,0.4); transition: all 0.3s; }
  .testimonial-dot.active { width: 32px; background: var(--copper); }

  /* GALLERY STRIP */
  .gallery-strip { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; height: 220px; background: #e7d8c2; }
  @media (min-width: 768px) { .gallery-strip { grid-template-columns: repeat(4, 1fr); height: 340px; } }
  .gallery-img { position: relative; overflow: hidden; background-size: cover; background-position: center; }
  .gallery-img::before { content: ""; position: absolute; inset: 0; background: #1a120c; opacity: 0; transition: opacity 0.3s; }
  .gallery-img:hover::before { opacity: 0.14; }

  /* JOURNAL */
  .journal { background: var(--paper); }
  .journal-header { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 24px; margin-bottom: 48px; }
  .journal-title { font-family: var(--serif); font-size: 38px; letter-spacing: -0.015em; }
  @media (min-width: 768px) { .journal-title { font-size: 50px; } }
  .journal-all { font-family: var(--mono); font-size: 10.7px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--copper); text-decoration: none; transition: color 0.3s; }
  .journal-all:hover { color: #9b5f2a; }
  .journal-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
  @media (min-width: 768px) { .journal-grid { grid-template-columns: repeat(3, 1fr); } }
  .journal-card { cursor: pointer; }
  .journal-img { aspect-ratio: 4 / 2.7; overflow: hidden; background: #e9ddd0; }
  .journal-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.65s var(--ease); }
  .journal-card:hover .journal-img img { transform: scale(1.032); }
  .journal-meta { margin-top: 20px; }
  .journal-kicker { font-family: var(--mono); font-size: 9.8px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--copper); }
  .journal-title { font-family: var(--serif); font-size: 22px; line-height: 1.25; margin-top: 8px; }
  .journal-excerpt { font-size: 14.4px; color: #5a4635; line-height: 1.76; font-weight: 300; margin-top: 16px; }

  /* VISIT / BOOKING */
  .visit { background: #18120f; color: #f2e4cf; }
  .visit .wrap { display: grid; gap: 56px; }
  @media (min-width: 1024px) { .visit .wrap { grid-template-columns: 0.98fr 1.08fr; } }
  .visit-eyebrow { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--copper); margin-bottom: 20px; }
  .visit h2 { font-family: var(--serif); font-size: 44px; line-height: 0.98; letter-spacing: -0.016em; }
  @media (min-width: 768px) { .visit h2 { font-size: 54px; } }
  .visit h2 em { color: var(--copper-light); }
  .visit .hr-copper { margin: 28px 0; }
  .visit p { font-size: 15.6px; line-height: 1.9; color: rgba(219,199,172,0.82); max-width: 410px; font-weight: 300; }

  .visit-contact { margin-top: 44px; display: flex; flex-direction: column; gap: 18px; font-size: 14px; color: #e2cfb3; }
  .visit-contact-row { display: flex; gap: 16px; }
  .visit-contact-label { font-family: var(--mono); font-size: 10px; color: #c69a6e; width: 76px; flex-shrink: 0; }

  .visit-badges { margin-top: 40px; display: flex; flex-wrap: wrap; gap: 20px; font-size: 11.7px; font-family: var(--mono); color: rgba(200,172,137,0.7); }
  .visit-badges .dot { opacity: 0.4; }

  /* BOOKING FORM */
  .booking-form { background: #1f1813; border: 1px solid rgba(200,140,80,0.17); padding: 28px 32px; }
  @media (min-width: 768px) { .booking-form { padding: 40px 40px; } }
  .booking-form h3 { font-family: var(--serif); font-size: 26px; color: #f6ead7; margin-bottom: 4px; }
  .booking-form .form-desc { font-size: 13.6px; color: rgba(197,172,141,0.8); font-weight: 300; margin-bottom: 28px; }

  .form-row { display: grid; gap: 20px; }
  @media (min-width: 640px) { .form-row.cols-2 { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 640px) { .form-row.cols-3 { grid-template-columns: repeat(3, 1fr); } }

  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-group label { font-family: var(--mono); font-size: 9.7px; letter-spacing: 0.22em; text-transform: uppercase; color: #b49371; }
  .form-group input, .form-group select {
    width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(205,148,86,0.30);
    color: #f3e4cd; padding: 11px 0; font-size: 15px; outline: none; transition: border-color 0.3s;
    font-family: var(--sans);
  }
  .form-group input::placeholder, .form-group select option:first-child { color: rgba(183,155,120,0.45); }
  .form-group input:focus, .form-group select:focus { border-bottom-color: var(--copper-light); }
  .form-group select option { background: #231811; }
  .form-group select { appearance: none; }

  .form-submit {
    width: 100%; margin-top: 8px; padding: 15px; background: var(--copper); color: #1b1108;
    font-size: 11.5px; letter-spacing: 0.21em; text-transform: uppercase; font-weight: 550;
    border: none; cursor: pointer; transition: background 0.3s;
  }
  .form-submit:hover { background: var(--copper-light); }
  .form-disclaimer { text-align: center; font-family: var(--mono); font-size: 11.7px; color: rgba(185,154,119,0.8); margin-top: 16px; }

  /* SHOP STRIP */
  .shop-strip { border-top: 1px solid rgba(232,215,192,0.1); padding: 48px 24px; }
  @media (min-width: 768px) { .shop-strip { padding: 48px 48px; display: flex; align-items: center; justify-content: space-between; } }
  .shop-strip-inner { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; align-items: flex-start; }
  @media (min-width: 768px) { .shop-strip-inner { flex-direction: row; } }
  .shop-strip-text .label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--copper); margin-bottom: 4px; }
  .shop-strip-text .beans { font-family: var(--serif); font-size: 24px; color: #f1e1c9; }
  .shop-strip-actions { display: flex; gap: 12px; }
  .shop-btn-ghost { padding: 12px 20px; border: 1px solid rgba(231,211,181,0.34); color: #e7d3b5; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none; transition: all 0.3s; }
  .shop-btn-ghost:hover { border-color: var(--copper); color: var(--copper-light); }
  .shop-btn-primary { padding: 12px 20px; background: #f3e7d2; color: #1b120c; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 500; text-decoration: none; transition: all 0.3s; }
  .shop-btn-primary:hover { background: var(--copper); color: #1b110c; }

  /* FOOTER */
  footer { background: #120d0a; color: #d6c2a6; border-top: 1px solid #2a1f18; }
  .footer-inner { max-width: 1180px; margin: 0 auto; padding: 64px 24px 16px; display: grid; grid-template-columns: 1fr; gap: 40px; }
  @media (min-width: 768px) { .footer-inner { grid-template-columns: repeat(12, 1fr); } }

  .footer-brand { grid-column: span 12; }
  @media (min-width: 768px) { .footer-brand { grid-column: span 5; } }
  .footer-logo { font-family: var(--serif); font-size: 30px; color: #f4e5cc; margin-bottom: 16px; }
  .footer-logo span { color: var(--copper); }
  .footer-desc { max-width: 340px; font-size: 14.4px; line-height: 1.8; color: rgba(195,168,133,0.82); font-weight: 300; margin-top: 16px; }
  .footer-email { margin-top: 24px; font-family: var(--mono); font-size: 10.6px; letter-spacing: 0.14em; color: #b9936a; }

  .footer-nav { grid-column: span 12; }
  @media (min-width: 768px) { .footer-nav { grid-column: span 2; } }
  .footer-nav h4 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--copper); margin-bottom: 16px; }
  .footer-nav ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-nav a { font-family: var(--serif); font-size: 14px; color: #d3bb97; text-decoration: none; transition: color 0.3s; }
  .footer-nav a:hover { color: #f2e1c6; }

  .footer-hours { grid-column: span 12; }
  @media (min-width: 768px) { .footer-hours { grid-column: span 2; } }
  .footer-hours h4 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--copper); margin-bottom: 16px; }
  .footer-hours ul { list-style: none; display: flex; flex-direction: column; gap: 7px; font-size: 13.6px; color: #c8aa86; font-weight: 300; }

  .footer-newsletter { grid-column: span 12; }
  @media (min-width: 768px) { .footer-newsletter { grid-column: span 3; } }
  .footer-newsletter h4 { font-family: var(--mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--copper); margin-bottom: 16px; }
  .footer-newsletter form { display: flex; gap: 16px; }
  .footer-newsletter input {
    flex: 1; background: transparent; border: none; border-bottom: 1px solid rgba(181,132,79,0.46);
    color: #edd7b8; padding: 9px 0; font-size: 14px; outline: none; font-family: var(--sans);
    placeholder: rgba(194,157,117,0.58);
  }
  .footer-newsletter input:focus { border-bottom-color: var(--copper-light); }
  .footer-newsletter button { font-family: var(--mono); font-size: 10.6px; letter-spacing: 0.18em; color: var(--copper-light); text-transform: uppercase; background: none; border: none; cursor: pointer; white-space: nowrap; }
  .footer-newsletter .disclaimer { font-size: 11.8px; color: rgba(182,149,113,0.78); margin-top: 12px; font-weight: 300; }

  .footer-bottom {
    grid-column: span 12; padding-top: 24px; border-top: 1px solid #251a13;
    display: flex; flex-direction: column; gap: 16px; font-size: 11.4px; color: #a38463;
    max-width: 1180px; margin: 0 auto; padding-left: 24px; padding-right: 24px;
  }
  @media (min-width: 768px) { .footer-bottom { flex-direction: row; justify-content: space-between; align-items: center; } }
  .footer-copy { font-family: var(--mono); letter-spacing: 0.08em; }
  .footer-social { display: flex; gap: 24px; font-family: var(--mono); letter-spacing: 0.08em; }
  .footer-social a { color: #a38463; text-decoration: none; transition: color 0.3s; }
  .footer-social a:hover { color: #d8b687; }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(13,9,6,0.85); backdrop-filter: blur(7px);
    z-index: 90; display: flex; align-items: center; justify-content: center; padding: 20px;
  }
  .modal {
    background: #201712; border: 1px solid rgba(199,131,74,0.22); padding: 36px 32px;
    max-width: 520px; width: 100%; position: relative; box-shadow: 0 40px 90px rgba(0,0,0,0.55);
  }
  @media (min-width: 768px) { .modal { padding: 40px 48px; } }
  .modal-close {
    position: absolute; top: 16px; right: 16px; background: none; border: none;
    color: #be9b73; font-size: 23px; cursor: pointer; transition: color 0.3s; line-height: 1;
  }
  .modal-close:hover { color: #e3c298; }
  .modal h2 { font-family: var(--serif); font-size: 30px; color: #f6e6ce; margin-bottom: 4px; }
  .modal p { font-size: 13.6px; color: rgba(201,167,122,0.9); font-weight: 300; margin-bottom: 28px; }
  .modal-form { display: flex; flex-direction: column; gap: 16px; }
  .modal-form .form-group { margin-bottom: 0; }
  .modal-form label { font-family: var(--mono); font-size: 9.6px; letter-spacing: 0.22em; text-transform: uppercase; color: #be9570; margin-bottom: 12px; display: block; }
  .modal-form input, .modal-form select {
    width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(204,147,84,0.32);
    color: #f3e4cd; padding: 10px 0; font-family: var(--sans); font-size: 15px; outline: none;
    transition: border-color 0.3s; appearance: none;
  }
  .modal-form input:focus, .modal-form select:focus { border-bottom-color: var(--copper-light); }
  .modal-form select option { background: #231811; }
  .modal-form .form-row { display: grid; grid-template-columns: 1fr; gap: 20px; }
  @media (min-width: 640px) { .modal-form .form-row { grid-template-columns: repeat(2, 1fr); } }
  .modal-form .submit-btn {
    width: 100%; margin-top: 8px; padding: 14px; background: var(--copper); color: #1b1108;
    font-size: 11.5px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600;
    border: none; cursor: pointer; transition: background 0.3s;
  }
  .modal-form .submit-btn:hover { background: var(--copper-light); }
  .modal-form .disclaimer { text-align: center; font-family: var(--mono); font-size: 10.3px; color: #b99169; letter-spacing: 0.03em; margin-top: 16px; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    z-index: 95; transition: all 0.3s; opacity: 0; pointer-events: none; transform: translateX(-50%) translateY(12px);
  }
  .toast.show { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
  .toast-inner { background: #f6e9d5; color: #22150d; padding: 12px 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border: 1px solid #e4c79f; font-family: var(--mono); font-size: 13.5px; }

  /* UTILITIES */
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
</head>
<body>

<nav id="nav" style="background: linear-gradient(180deg, rgba(20,16,13,0.56) 0%, rgba(20,16,13,0) 100%); border-bottom: 1px solid transparent;">
  <div class="nav-inner">
    <a href="#" class="logo">ÂME<span>.</span></a>
    <ul class="nav-links">
      <li><a href="#atelier">Atelier</a></li>
      <li><a href="#coffee">Coffee</a></li>
      <li><a href="#origin">Origin</a></li>
      <li><a href="#journal">Journal</a></li>
      <li><a href="#visit">Visit</a></li>
    </ul>
    <div style="display: flex; align-items: center; gap: 16px;">
      <a href="#visit" class="nav-cta">Reserve seat</a>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">MENU</button>
    </div>
  </div>
  <div class="mobile-drawer" id="mobileDrawer">
    <a href="#atelier" onclick="document.getElementById('mobileDrawer').classList.remove('open'); document.getElementById('mobileToggle').textContent='MENU'">Atelier</a>
    <a href="#coffee" onclick="document.getElementById('mobileDrawer').classList.remove('open'); document.getElementById('mobileToggle').textContent='MENU'">Coffee</a>
    <a href="#origin" onclick="document.getElementById('mobileDrawer').classList.remove('open'); document.getElementById('mobileToggle').textContent='MENU'">Origin</a>
    <a href="#journal" onclick="document.getElementById('mobileDrawer').classList.remove('open'); document.getElementById('mobileToggle').textContent='MENU'">Journal</a>
    <a href="#visit" onclick="document.getElementById('mobileDrawer').classList.remove('open'); document.getElementById('mobileToggle').textContent='MENU'">Visit</a>
    <a href="#visit" class="drawer-cta" onclick="document.getElementById('mobileDrawer').classList.remove('open'); document.getElementById('mobileToggle').textContent='MENU'; openModal()">Reserve seat</a>
  </div>
</nav>

<section class="hero">
  <div class="hero-left">
    <div class="hero-bg kenburns"></div>
    <div class="hero-location">SoHo — New York</div>
  </div>
  <div class="hero-right grain">
    <div style="width: 100%;">
      <div class="hero-eyebrow">
        <span>SoHo • Copenhagen • Est. 2016</span>
        <span class="hero-eyebrow-bar"></span>
      </div>
      <h1>Coffee is<br>a quiet<br><em>ritual</em></h1>
      <p>Âme is a 24-seat coffee atelier in SoHo. We roast on Tuesdays, serve fifteen coffees at a time, and remember how you take yours by the third visit.</p>
      <div class="hero-actions">
        <a href="#visit" class="btn-primary" onclick="openModal()">Reserve a seat</a>
        <a href="#coffee" class="btn-ghost">Today's roast</a>
      </div>
      <div class="hero-meta">
        <div class="mono">06:30 — 18:00 DAILY</div>
        <div class="dot">•</div>
        <div class="mono">34 Prince Street</div>
        <div class="dot">• 24 SEATS</div>
      </div>
      <div class="hero-roast">
        <div><span class="now">NOW POURING</span><br>Pink Bourbon — Nubes</div>
        <div style="opacity:.44">|</div>
        <div>ROAST #1,247<br>TUE 06:18</div>
      </div>
    </div>
    <div class="hero-watermark">Â</div>
  </div>
</section>

<div class="marquee">
  <div class="marquee-inner">
    <div class="marquee-track" id="marqueeTrack"></div>
  </div>
</div>

<section class="about" id="atelier">
  <div class="wrap">
    <div>
      <div class="about-img-stack is-reveal">
        <div class="about-img-a"></div>
        <div class="about-img-b"></div>
        <div class="roaster-badge">
          <div class="yr">9</div>
          <div class="lbl">Years<br>roasting</div>
        </div>
      </div>
    </div>
    <div class="is-reveal">
      <div class="section-eyebrow"><span>Our Atelier</span></div>
      <h2 class="section-title">Slow roasted,<br>thoughtfully<br><em>served</em></h2>
      <div class="hr-copper"></div>
      <p>We roast twelve kilos at a time on a 1962 Probat in the back room. You can hear it from table six. The profile sheets are taped to the wall — not for show, for memory.</p>
      <p>Our coffees come from nine relationships, not brokers. We cup at origin, pay above Fair Trade, and publish every price. Less mystery. More trust.</p>
      <div class="about-stats">
        <div class="stat"><div class="n">14</div><div class="l">Origins,\nactive</div></div>
        <div class="stat"><div class="n">1,247</div><div class="l">Roasts\nlogged</div></div>
        <div class="stat"><div class="n">4.97</div><div class="l">Avg\nrating</div></div>
      </div>
    </div>
  </div>
</section>

<section class="menu" id="coffee">
  <div class="wrap">
    <div class="menu-header">
      <div class="is-reveal">
        <div class="section-eyebrow"><span>Seasonal Menu</span></div>
        <h2 class="section-title">What we're<br><em>pouring today</em></h2>
      </div>
      <div class="menu-desc is-reveal">Fifteen coffees. Four brew methods. Roast date on every ticket. We change the menu when the beans tell us to — usually Thursdays.</div>
    </div>
    <div class="menu-tabs" id="menuTabs"></div>
    <div class="menu-grid" id="menuGrid"></div>
    <div class="menu-footer">
      <span class="mono">ALL ESPRESSO · 38s · 19.5g in · 42g out</span>
      <span class="dot">•</span>
      <span class="mono">WATER: 92°C · 140 TDS</span>
      <span class="dot">•</span>
      <span class="mono copper">OAT / WHOLE / SKIM</span>
    </div>
  </div>
</section>

<section class="origin" id="origin">
  <div class="wrap">
    <div class="origin-header is-reveal">
      <div class="section-eyebrow">Provenance</div>
      <h2 class="section-title">Where our beans<br><em>begin</em></h2>
      <p>Three farms we visit every harvest. Prices published. Conversations ongoing.</p>
    </div>
    <div class="farms-grid" id="farmsGrid"></div>
    <div class="farm-transparency">2024 FARMGATE: $4.80–$28.40 / LB · FULL TRANSPARENCY SHEETS IN-STORE</div>
  </div>
</section>

<section class="roast">
  <div class="wrap">
    <div class="roast-steps is-reveal">
      <div class="section-eyebrow"><span>The Roast</span></div>
      <h2 class="section-title">The <em>ritual</em></h2>
      <div class="roast-step"><div class="roast-step-num">01</div><div><div class="roast-step-title">Green & cup</div><div class="roast-step-desc">We buy sealed 69kg bags, cup three times before commit. 84–89 point range.</div></div></div>
      <div class="roast-step"><div class="roast-step-num">02</div><div><div class="roast-step-title">Profile design</div><div class="roast-step-desc">9 to 13 minute roast. Development ratio 18–24%. Every bean, a different curve.</div></div></div>
      <div class="roast-step"><div class="roast-step-num">03</div><div><div class="roast-step-title">Rest</div><div class="roast-step-desc">72 hours minimum. CO₂ matters. We degas in steel, not plastic. Taste changes daily.</div></div></div>
      <div class="roast-step"><div class="roast-step-num">04</div><div><div class="roast-step-title">Dial & serve</div><div class="roast-step-desc">Bar opens at 6:30. First shots are staff-only. If it's not right, we pull again.</div></div></div>
    </div>
    <div class="roast-img-wrap is-reveal">
      <div class="roast-img-inner"></div>
      <div class="roast-img-caption">
        <span>PROBAT UG-22 · 1962 · HAMBURG</span>
        <span>12 KG / BATCH</span>
      </div>
    </div>
  </div>
</section>

<section class="baristas">
  <div class="wrap">
    <div class="baristas-header is-reveal">
      <div class="section-eyebrow">The Team</div>
      <h2 class="section-title">Hands behind<br><em>the bar</em></h2>
    </div>
    <div class="baristas-grid" id="baristasGrid"></div>
  </div>
</section>

<section class="testimonial" id="testimonial">
  <div class="testimonial-inner">
    <div class="testimonial-label">Guest Notes</div>
    <div style="min-height: 150px; display: flex; align-items: center; justify-content: center;">
      <div id="testimonialContent"></div>
    </div>
    <div class="testimonial-dots" id="testimonialDots"></div>
  </div>
</section>

<div class="gallery-strip" id="galleryStrip"></div>

<section class="journal" id="journal">
  <div class="wrap">
    <div class="journal-header">
      <h2 class="journal-title">Journal</h2>
      <a href="#" class="journal-all">All entries →</a>
    </div>
    <div class="journal-grid" id="journalGrid"></div>
  </div>
</section>

<section class="visit" id="visit">
  <div class="wrap">
    <div class="is-reveal">
      <div class="visit-eyebrow">Visit</div>
      <h2>Come for<br>a <em>quiet cup</em></h2>
      <div class="hr-copper"></div>
      <p>24 seats. No laptops after 11am. No music before 9. We open at first light because that's when the espresso is sweetest.</p>
      <div class="visit-contact">
        <div class="visit-contact-row"><span class="visit-contact-label">ADDRESS</span><span>34 Prince Street, SoHo<br>New York, NY 10012</span></div>
        <div class="visit-contact-row"><span class="visit-contact-label">HOURS</span><span>Daily 06:30 — 18:00<br>Roastery tours: Thu 16:00</span></div>
        <div class="visit-contact-row"><span class="visit-contact-label">CONTACT</span><span>+1 (212) 858-0441<br>hello@ame-atelier.com</span></div>
      </div>
      <div class="visit-badges">
        <span>WALK-INS WELCOME</span><span class="dot">•</span><span>TABLES HELD 10 MIN</span>
      </div>
    </div>
    <div class="booking-form is-reveal">
      <h3>Reserve a table</h3>
      <p class="form-desc">Tasting bar seats 1–4. We confirm by SMS within an hour.</p>
      <form id="bookingForm" onsubmit="handleBooking(event)">
        <div class="form-row cols-2">
          <div class="form-group"><label>Name</label><input name="name" required placeholder="Full name"></div>
          <div class="form-group"><label>Phone</label><input name="phone" placeholder="+1 …"></div>
        </div>
        <div class="form-row cols-3">
          <div class="form-group"><label>Date</label><input type="date" name="date" required></div>
          <div class="form-group"><label>Time</label><select name="time"><option value="07:00">07:00</option><option value="08:00">08:00</option><option value="09:00" selected>09:00</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="14:00">14:00</option><option value="15:30">15:30</option></select></div>
          <div class="form-group"><label>Guests</label><select name="guests"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4">4</option></select></div>
        </div>
        <div class="form-group"><label>Notes</label><input name="notes" placeholder="Pour-over preference, allergies…"></div>
        <button type="submit" class="form-submit">Request table</button>
        <p class="form-disclaimer">No deposit • Cancel anytime</p>
      </form>
    </div>
  </div>
  <div class="shop-strip">
    <div class="shop-strip-inner">
      <div class="shop-strip-text">
        <div class="label">Beans to take home</div>
        <div class="beans">This week: Pink Bourbon · Yirga Lot 12 · Gesha Honey</div>
      </div>
      <div class="shop-strip-actions">
        <a href="#coffee" class="shop-btn-ghost">Shop beans</a>
        <button class="shop-btn-primary" onclick="showToast('Wholesale form sent to hello@ame-atelier.com')">Wholesale</button>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">ÂME<span>.</span></div>
      <p class="footer-desc">24-seat coffee atelier. Roasting Tuesdays since 2016. SoHo, New York — Copenhagen.</p>
      <div class="footer-email">HELLO@AME-ATELIER.COM · +1 (212) 858-0441</div>
    </div>
    <div class="footer-nav">
      <h4>Navigate</h4>
      <ul>
        <li><a href="#atelier">Atelier</a></li>
        <li><a href="#coffee">Coffee</a></li>
        <li><a href="#origin">Origin</a></li>
        <li><a href="#journal">Journal</a></li>
      </ul>
    </div>
    <div class="footer-hours">
      <h4>Hours</h4>
      <ul>
        <li>Daily 06:30 – 18:00</li>
        <li>Roastery tours Thu 16:00</li>
        <li>Closed: Christmas Day</li>
      </ul>
    </div>
    <div class="footer-newsletter">
      <h4>Roast letter</h4>
      <form onsubmit="event.preventDefault(); showToast('Welcome to the roast letter.'); this.reset();">
        <input required type="email" placeholder="email">
        <button type="submit">Join</button>
      </form>
      <div class="disclaimer">Tuesday roast notes. Farm prices. New drops first.</div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2026 ÂME Atelier LLC — 34 Prince Street, New York</div>
      <div class="footer-social">
        <a href="#">Instagram</a>
        <a href="#">Wholesale</a>
        <a href="#">Press Kit</a>
        <span>Privacy</span>
      </div>
    </div>
  </div>
</footer>

<div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true">
  <div class="modal-overlay-bg" onclick="closeModal()"></div>
  <div class="modal">
    <button class="modal-close" onclick="closeModal()" aria-label="Close">×</button>
    <h2>Reserve a seat</h2>
    <p>Tasting bar · 24 seats · we confirm by SMS.</p>
    <form id="modalForm" onsubmit="handleModalSubmit(event)">
      <div class="form-group"><label>Name</label><input name="m_name" required></div>
      <div class="form-row">
        <div class="form-group"><label>Date</label><input type="date" name="m_date" required></div>
        <div class="form-group"><label>Time</label><select name="m_time"><option value="07:30">07:30</option><option value="08:30">08:30</option><option value="09:30" selected>09:30</option><option value="10:30">10:30</option><option value="15:00">15:00</option></select></div>
      </div>
      <div class="form-group"><label>Guests</label><select name="m_guests"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4">4</option></select></div>
      <button type="submit" class="submit-btn">Confirm hold</button>
      <p class="disclaimer">We'll text you within 45 minutes · 06:30–18:00</p>
    </form>
  </div>
</div>

<div class="toast" id="toast"><div class="toast-inner" id="toastInner"></div></div>

<script>
  // Data
  const menuData = {
    espresso: [
      { name: "Espresso", origin: "Finca Las Nubes, Colombia", notes: "red currant · dark chocolate · panela", price: "6" },
      { name: "Gesha Shot", origin: "Santa Teresa, Costa Rica", notes: "jasmine · bergamot · honey", price: "11" },
      { name: "Cortado", origin: "Blend – Nubes / Yirga", notes: "caramel · hazelnut · silky", price: "7" },
      { name: "Flat White", origin: "House espresso + oat", notes: "toffee · macadamia · clean", price: "7.5" },
      { name: "Cappuccino", origin: "Seasonal espresso", notes: "vanilla pod · almond · velvet", price: "7" },
      { name: "Americano", origin: "Slow pulled, 38s", notes: "prune · cocoa nib · amber", price: "5.5" }
    ],
    filter: [
      { name: "V60", origin: "Yirgacheffe Lot 12, Ethiopia", notes: "apricot · earl grey · bright", price: "9" },
      { name: "Kalita Wave", origin: "Kayanza, Burundi", notes: "black cherry · brown sugar · round", price: "9" },
      { name: "Cold Drip", origin: "12-hour, Nubes washed", notes: "blackcurrant · cacao · silk", price: "10" },
      { name: "Batch Brew", origin: "Rotating single origin", notes: "changes daily – ask bar", price: "5" }
    ],
    signature: [
      { name: "Âme Tonic", origin: "Espresso · yuzu · sparkling", notes: "citrus bloom · clean finish", price: "9" },
      { name: "Shakerato Amaro", origin: "Cold shaken · chinotto", notes: "bitter orange · brown spice", price: "11" },
      { name: "Cascara Fizz", origin: "Coffee cherry tea · kombucha", notes: "hibiscus · tamarind · fizz", price: "8" },
      { name: "Noisette Latte", origin: "House hazelnut · oat", notes: "praline · sea salt · warm", price: "8.5" },
      { name: "Kyoto Slow", origin: "Iced tower · 8 hours", notes: "plum · molasses · velvet ice", price: "13" }
    ],
    pantry: [
      { name: "Almond Croissant", origin: "Maison Mel, baked am", notes: "frangipane · toasted", price: "6" },
      { name: "Cardamom Bun", origin: "Swedish – small batch", notes: "brown butter · pearl sugar", price: "5.5" },
      { name: "Olive Oil Cake", origin: "Lemon · thyme", notes: "moist crumb · olive finish", price: "7" },
      { name: "Sourdough Tartine", origin: "Comté · cultured butter", notes: "simple · perfect", price: "9" }
    ]
  };

  const farms = [
    { name: "Finca Las Nubes", region: "Huila, Colombia", alt: "1,820 m", varietal: "Pink Bourbon", process: "Washed · 48h", notes: "red currant / dark chocolate", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&auto=format&fit=crop" },
    { name: "Yirgacheffe Lot 12", region: "Gedeb, Ethiopia", alt: "2,100 m", varietal: "74112 Heirloom", process: "Natural · 23d", notes: "apricot / earl grey / jasmine", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700&q=80&auto=format&fit=crop" },
    { name: "Santa Teresa", region: "Tarrazú, Costa Rica", alt: "1,650 m", varietal: "Gesha", process: "Honey · anaerobic", notes: "bergamot / honey / tropical", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=700&q=80&auto=format&fit=crop" }
  ];

  const baristas = [
    { name: "Elise Marot", role: "Head Roaster — Q Grader", city: "Paris → New York", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop&crop=faces" },
    { name: "Jonah Park", role: "Brew Director", city: "Copenhagen", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&auto=format&fit=crop&crop=faces" },
    { name: "Sana Okoro", role: "Sensory / Green Buyer", city: "Addis / NYC", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80&auto=format&fit=crop&crop=faces" },
    { name: "Luca Vitti", role: "Service Lead", city: "Milan → SoHo", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80&auto=format&fit=crop&crop=faces" }
  ];

  const journalPosts = [
    { kicker: "Roast Notes · Vol. 34", title: "Why we roast lighter than you expect", excerpt: "The science of development time, and why 9:12 is our magic number for Pink Bourbon.", img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=700&q=80&auto=format&fit=crop" },
    { kicker: "Origin Trip", title: "Three weeks in Gedeb", excerpt: "Visiting Lot 12, cupping 84 microlots, and learning to listen before we buy.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80&auto=format&fit=crop" },
    { kicker: "Brew Guide", title: "The Âme V60: 16g / 250g / 2:35", excerpt: "Our house recipe. 4 pours. No fuss. Everything we've learned in one page.", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=700&q=80&auto=format&fit=crop" }
  ];

  const testimonials = [
    { quote: "The most considered cup in New York. Elise's Gesha is a quiet masterpiece — nothing showy, everything precise.", author: "Oliver Kent — Sprudge" },
    { quote: "Âme feels less like a café and more like a listening room. You come for the coffee, you stay for the calm.", author: "Marina Solís — The New York Times" },
    { quote: "They roast on Tuesdays. I plan my week around Wednesday morning.", author: "T. Harada — Regular, table 4" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=700&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&auto=format&fit=crop"
  ];

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 36;
    nav.style.background = scrolled ? 'rgba(20,16,13,0.93)' : 'linear-gradient(180deg, rgba(20,16,13,0.56) 0%, rgba(20,16,13,0) 100%)';
    nav.style.borderBottom = scrolled ? '1px solid rgba(196,131,74,0.13)' : '1px solid transparent';
  });

  // Mobile nav
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  mobileToggle.addEventListener('click', () => {
    const open = mobileDrawer.classList.toggle('open');
    mobileToggle.textContent = open ? 'CLOSE' : 'MENU';
  });

  // Marquee
  const marqueeItems = [
    "Direct Trade", "Single Origin", "72-Hour Rest", "Q-Graded",
    "Small Batch Roast", "Water: 92°C / 140ppm", "No Syrups", "No Rush"
  ];
  const marqueeTrack = document.getElementById('marqueeTrack');
  marqueeItems.forEach(item => {
    const span = document.createElement('span');
    span.className = 'marquee-item';
    span.innerHTML = \`\${item}<span class="marquee-dot"></span>\`;
    marqueeTrack.appendChild(span);
  });
  // Duplicate for seamless loop
  marqueeItems.forEach(item => {
    const span = document.createElement('span');
    span.className = 'marquee-item';
    span.innerHTML = \`\${item}<span class="marquee-dot"></span>\`;
    marqueeTrack.appendChild(span);
  });

  // Menu tabs
  let activeTab = 'espresso';
  const tabsContainer = document.getElementById('menuTabs');
  const gridContainer = document.getElementById('menuGrid');

  function renderTabs() {
    tabsContainer.innerHTML = '';
    Object.keys(menuData).forEach(key => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      const btn = document.createElement('button');
      btn.className = 'menu-tab' + (key === activeTab ? ' active' : '');
      btn.textContent = label;
      btn.onclick = () => { activeTab = key; renderTabs(); renderGrid(); };
      tabsContainer.appendChild(btn);
    });
  }

  function renderGrid() {
    gridContainer.innerHTML = '';
    menuData[activeTab].forEach(item => {
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = \`
        <div class="menu-item-left">
          <div class="menu-item-name">\${item.name}</div>
          <div class="menu-item-origin">\${item.origin}</div>
          <div class="menu-item-notes">\${item.notes}</div>
        </div>
        <div class="menu-item-price">$\${item.price}</div>
      \`;
      gridContainer.appendChild(div);
    });
  }

  renderTabs();
  renderGrid();

  // Farms
  const farmsGrid = document.getElementById('farmsGrid');
  farms.forEach((farm, i) => {
    const card = document.createElement('div');
    card.className = 'farm-card is-reveal';
    card.style.animationDelay = \`\${i * 50}ms\`;
    card.innerHTML = \`
      <div class="farm-img">
        <img src="\${farm.img}" alt="\${farm.name}" loading="lazy">
      </div>
      <div class="farm-info">
        <div class="farm-details">
          <div><span class="label">ALT</span>\${farm.alt}</div>
          <div><span class="label">VARIETAL</span>\${farm.varietal}</div>
          <div style="grid-column: span 2"><span class="label">PROCESS</span>\${farm.process}</div>
        </div>
        <div class="farm-name">\${farm.name}</div>
        <div class="farm-notes">\${farm.notes}</div>
      </div>
    \`;
    farmsGrid.appendChild(card);
  });

  // Baristas
  const baristasGrid = document.getElementById('baristasGrid');
  baristas.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'barista-card is-reveal';
    card.style.animationDelay = \`\${i * 50}ms\`;
    card.innerHTML = \`
      <div class="barista-img">
        <img src="\${b.img}" alt="\${b.name}" loading="lazy">
      </div>
      <div class="barista-info">
        <div class="barista-name">\${b.name}</div>
        <div class="barista-role">\${b.role}</div>
        <div class="barista-city">\${b.city}</div>
      </div>
    \`;
    baristasGrid.appendChild(card);
  });

  // Testimonial
  let testimonialIdx = 0;
  const testimonialContent = document.getElementById('testimonialContent');
  const testimonialDots = document.getElementById('testimonialDots');

  function renderTestimonial() {
    const t = testimonials[testimonialIdx];
    testimonialContent.innerHTML = \`
      <blockquote class="testimonial-quote">"\${t.quote}"</blockquote>
      <div class="testimonial-author">— \${t.author}</div>
    \`;
    testimonialDots.innerHTML = '';
    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === testimonialIdx ? ' active' : '');
      dot.onclick = () => { testimonialIdx = i; renderTestimonial(); };
      testimonialDots.appendChild(dot);
    });
  }

  renderTestimonial();
  setInterval(() => { testimonialIdx = (testimonialIdx + 1) % testimonials.length; renderTestimonial(); }, 5200);

  // Gallery
  const galleryStrip = document.getElementById('galleryStrip');
  galleryImages.forEach(src => {
    const div = document.createElement('div');
    div.className = 'gallery-img';
    div.style.backgroundImage = \`url(\${src})\`;
    galleryStrip.appendChild(div);
  });

  // Journal
  const journalGrid = document.getElementById('journalGrid');
  journalPosts.forEach(p => {
    const article = document.createElement('article');
    article.className = 'journal-card';
    article.innerHTML = \`
      <div class="journal-img">
        <img src="\${p.img}" alt="" loading="lazy">
      </div>
      <div class="journal-meta">
        <div class="journal-kicker">\${p.kicker}</div>
        <div class="journal-title">\${p.title}</div>
        <div class="journal-excerpt">\${p.excerpt}</div>
      </div>
    \`;
    journalGrid.appendChild(article);
  });

  // Reveal on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0.16 });
  document.querySelectorAll('.is-reveal').forEach(el => revealObserver.observe(el));

  // Modal
  const modalOverlay = document.getElementById('modalOverlay');
  function openModal() { modalOverlay.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  function closeModal() { modalOverlay.style.display = 'none'; document.body.style.overflow = ''; }

  // Booking form
  function handleBooking(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name')?.trim() || 'friend';
    showToast(\`Thank you, \${name.split(' ')[0]}. We'll text you shortly.\`);
    e.target.reset();
  }

  function handleModalSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    closeModal();
    showToast(\`Table held, \${fd.get('m_name')?.split(' ')[0] || 'friend'}. See you soon.\`);
    e.target.reset();
  }

  // Toast
  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastInner = document.getElementById('toastInner');
    toastInner.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
</script>
</body>
</html>`;