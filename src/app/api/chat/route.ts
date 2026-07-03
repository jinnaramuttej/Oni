import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { sanitizeText } from "@/lib/auth";
import { rateLimiter, getClientIp } from "@/lib/rate-limit";
import { TEMPLATE_PROMPTS, TEMPLATE_KEYWORDS } from "@/lib/template-prompts";
import { VELARA_SAMPLE_HTML } from "@/lib/velara-sample";
import { MOEHR_SAMPLE_HTML } from "@/lib/moehr-sample";
import { MAISON_DORE_SAMPLE_HTML } from "@/lib/maison-dore-sample";
import { VOX_SAMPLE_HTML } from "@/lib/vox-sample";
import { AME_COFFEE_SAMPLE_HTML } from "@/lib/ame-coffee-sample";
import { createSupabaseAdminClientOrNull } from "@/lib/supabase";
import { classifyIntent, Intent } from "@/lib/classifier";
import { routeIntent } from "@/lib/router";
import fs from "fs";
import path from "path";

// ── Credit helpers ────────────────────────────────────────────────────────────

async function getOrCreateCredits(visitorId: string) {
  const supabase = createSupabaseAdminClientOrNull();
  if (!supabase) return null;
  const planKey = `free::${visitorId}`;
  const { data, error } = await supabase
    .from("user_credits")
    .select("*")
    .eq("plan", planKey)
    .maybeSingle();
  if (error) {
    console.error("[Credits] fetch error:", error.message);
    return null;
  }
  if (!data) {
    const { data: created, error: insertError } = await supabase
      .from("user_credits")
      .insert({
        user_id: null,
        credits_remaining: 50,
        credits_used: 0,
        plan: planKey,
        reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (insertError) {
      console.error("[Credits] insert error:", insertError.message);
      return null;
    }
    if (process.env.NODE_ENV === "development" && created) {
      created.credits_remaining = 1000;
    }
    return created;
  }
  if (process.env.NODE_ENV === "development" && data && (data.credits_remaining as number) < 20) {
    try {
      await supabase
        .from("user_credits")
        .update({
          credits_remaining: 1000,
          updated_at: new Date().toISOString(),
        })
        .eq("plan", planKey);
      data.credits_remaining = 1000;
    } catch (e) {
      console.error("[Credits] failed to auto-recharge credits:", e);
    }
  }
  return data;
}

async function deductCredits(visitorId: string, amount: number) {
  if (amount <= 0) return;
  const supabase = createSupabaseAdminClientOrNull();
  if (!supabase) return;
  const planKey = `free::${visitorId}`;
  const { data: row } = await supabase
    .from("user_credits")
    .select("credits_remaining, credits_used")
    .eq("plan", planKey)
    .maybeSingle();
  if (!row) return;
  await supabase
    .from("user_credits")
    .update({
      credits_remaining: Math.max(0, (row.credits_remaining as number) - amount),
      credits_used: (row.credits_used as number) + amount,
      updated_at: new Date().toISOString(),
    })
    .eq("plan", planKey);
}


// 10 AI generation requests per minute per IP
const CHAT_RATE_LIMIT = { windowMs: 60 * 1000, max: 10 };

const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_MAX_TOKENS = 16000;
const GROQ_MAX_MESSAGE_CHARS = 4000;
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5-coder:latest";
const OLLAMA_CHAT_URL = process.env.OLLAMA_CHAT_URL || "http://127.0.0.1:11434/v1/chat/completions";

// ── Two-stage pipeline prompts ─────────────────────────────────────────────────
// Stage 1: Groq writes ONLY the design intent (fast, ~400 tokens, no code)
const ONI_PLANNING_PROMPT = `You are Oni's creative director. When given a website build request, output ONLY a planning block in this EXACT format — no HTML, no CSS, no code:

<ONI_THOUGHT>
PALETTE: [descriptive palette name] | #hex1, #hex2, #hex3, #hex4, #hex5
FONTS: [display font name] | [body font name] | [one sentence on why they suit this business]
SIGNATURE: [one sentence describing the most unique interactive element or layout feature]
LAYOUT: [one sentence describing the overall layout strategy]
SECTIONS: navbar, hero, features, services, testimonials, contact, footer
</ONI_THOUGHT>

[ONE sentence intro like "Here's your coffee shop website."]

RULES:
- Output ONLY the <ONI_THOUGHT> block and the one-sentence intro.
- Do NOT write any HTML, CSS, JavaScript, or code of any kind.
- Do NOT include markdown fences, explanations, or extra text.`;

// Stage 2: CSS-only generation (pure stylesheet, no HTML)
const ONI_CSS_PROMPT = `You are an elite CSS architect. Given a website design plan, write ONLY the complete CSS stylesheet.

OUTPUT RULES:
- Start with @import url(...) for Google Fonts (the ones specified in the plan's FONTS field)
- Define ALL :root CSS variables: --bg, --p, --s, --light, --text, --text-muted, --font-display, --font-body, --grad, --shadow, --shadow-lg, --r, --t, plus the exact 5 palette colors from the plan
- Write complete CSS for EVERY section and element:
  * Global reset: * { margin:0; padding:0; box-sizing:border-box; }
  * Base typography, body, selection
  * .navbar (fixed, glassmorphism), .nav-links, .nav-link, .nav-cta, .navbar.scrolled
  * .hero (min-height:100vh), .hero-content (z-index:2 position:relative), .orb, .orb-1, .orb-2, .orb-3 (each with radial-gradient + float animation)
  * #features, #services (grid layouts, cards, hover effects)
  * #testimonials (quote cards, star ratings)
  * #contact (form layout, input styles, button)
  * footer (dark bg, 4-column grid)
  * .reveal, .reveal.in (scroll-reveal animation classes)
  * Modal/drawer styles if relevant
  * @keyframes (float, fadeIn, slideUp, marquee etc.)
  * @media queries for mobile (<768px)
- Target: 700-900 lines of CSS
- Output ONLY raw CSS — no <style> tags, no HTML, no JavaScript, no explanations, no markdown fences`;

// Stage 3: HTML body + JS generation (uses class names from Stage 2 CSS)
const ONI_HTML_BODY_PROMPT = `You are an elite HTML and JavaScript developer. Given a website design plan and the CSS already written, write the complete HTML body markup and JavaScript.

OUTPUT RULES:
- Start output with <body> and end with </body>
- Include ALL 7 required sections with fully real, specific content:
  * #navbar: logo text (styled with CSS .logo class), .nav-links ul with .nav-link anchors, .nav-cta button
  * .hero: div.hero-content containing H1, subtitle, two buttons; plus div.orb.orb-1, div.orb.orb-2, div.orb.orb-3 as direct children
  * #features: grid of 3-4 feature cards with icons (unicode symbols), h3, p — real copy
  * #services: grid of services with real prices
  * #testimonials: 3 testimonial cards with real names, stars (★★★★★), real quotes
  * #contact: info panel on left + contact form on right
  * footer: 4-column grid with links, copyright bar
- Use the EXACT CSS class names already defined in the stylesheet (.navbar, .nav-links, .nav-link, .hero, .hero-content, .orb, .orb-1, .orb-2, .orb-3, .reveal, etc.)
- REAL content only: specific business name, real street address, real phone, real prices, real staff names. Zero placeholders, zero lorem ipsum.
- At the end of <body>, include ONE <script> block with: navbar shrink on scroll, IntersectionObserver for .reveal elements, smooth anchor scroll, form submit toast feedback
- NEVER use <link rel="stylesheet"> or <script src="..."> — no external file references
- Output ONLY: <body>...</body> with the inline <script> inside. No <html>, no <head>, no <style> tags.`;

const ONI_LEGACY_SYSTEM_PROMPT = `You are Oni, an elite AI website designer and builder. Every website you generate must be beautiful, production-ready, and worthy of a $50,000 agency.

RESPONSE FORMAT & SYSTEM MODES:
- For EVERY response, you MUST output your planning/thought process inside <ONI_THOUGHT>...</ONI_THOUGHT> first.
- **Conversational Mode** (For casual messages, greetings, general questions, explanations, coding help, or queries NOT asking to build/edit/design a website):
  - Reply naturally, informatively, and in full detail.
  - Do NOT generate any website HTML or output any <ONI_CODE>...</ONI_CODE> tags.
  - Do NOT steer the conversation back to websites or prompt the user for website details if they are asking about other topics.
- **Build Mode** (Only when the user explicitly requests to build, design, create, make, or modify a website):
  - Step 1: Output your planning/thought process inside <ONI_THOUGHT>...</ONI_THOUGHT> first, using this exact structure:
    PALETTE: [A beautiful design palette name] | [color 1 hex code], [color 2 hex code], [color 3 hex code], [color 4 hex code], [color 5 hex code]
    FONTS: [display font family name] | [body font family name] | [explanation of how these fonts fit the business tone]
    SIGNATURE: [one-sentence description of unique signature layout or interactive element]
    LAYOUT: [one-sentence description of layout design strategy]
    SECTIONS: [comma-separated list of section names/IDs to be built, e.g. navbar, hero, features, services, testimonials, contact, footer]
  - Step 2: Output exactly one short sentence of maximum 15 words (e.g. "Here's your luxury restaurant website.").
  - Step 3: Output the complete website inside <ONI_CODE>...</ONI_CODE> tags.

  CRITICAL CHAT RESPONSE RULES:
  - The chat response (text outside <ONI_THOUGHT> and <ONI_CODE> tags) must be EXACTLY one sentence and a MAXIMUM of 15 words.
  - You are strictly BANNED from writing "PALETTE:", "FONTS:", "SIGNATURE:", "LAYOUT:", or "SECTIONS:" outside of the <ONI_THOUGHT>...</ONI_THOUGHT> tags.
  - Never write "To create..." opening paragraphs.
  - Never explain what you are about to do.
  - Never describe the design before outputting it.
  - Never write more than one sentence before <ONI_CODE>.

FONTS - Import Google Fonts at the top of <style> matching the theme of the business (e.g. Playfair Display & Inter, Cormorant Garamond & Jost, Syne & Space Grotesk, Outfit & Plus Jakarta Sans, etc.). E.g.:
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

COLORS BY BUSINESS TYPE:
- Restaurant/Food: bg:#1A0A0A, primary:#D4AF37, secondary:#7B1E1E, light:#FDF8F0
- Hotel/Luxury: bg:#0A192F, primary:#D4AF37, secondary:#1E3A5F, light:#F5F5F0
- Tech/SaaS: bg:#0F0F1A, primary:#7C3AED, secondary:#06B6D4, light:#F8F8FF
- Fitness: bg:#0D0D0D, primary:#00FF87, secondary:#00CC6A, light:#F0FFF4
- Beauty/Salon: bg:#1A0A0F, primary:#FF6B9D, secondary:#C9956B, light:#FFF5F5
- Real Estate: bg:#0A1A0F, primary:#C9A84C, secondary:#1B4332, light:#F0FFF4
- Medical: bg:#0A1A2F, primary:#0EA5E9, secondary:#0369A1, light:#F0F9FF
- Agency/Portfolio: bg:#0A0A0A, primary:#8B5CF6, secondary:#14B8A6, light:#FAFAFA
- Default: pick rich colors matching the business context.

CSS STRUCTURE - always use:
:root {
  --bg: [dark bg hex];
  --p: [primary hex];
  --s: [secondary hex];
  --light: [light bg hex];
  --text: #ffffff;
  --text-muted: rgba(255,255,255,0.6);
  --font-display: [display font family name, e.g. 'Cormorant Garamond' or 'Playfair Display'];
  --font-body: [body font family name, e.g. 'Jost' or 'Inter'];
  --grad: linear-gradient(135deg, var(--p), var(--s));
  --shadow: 0 10px 40px rgba(0,0,0,0.12);
  --shadow-lg: 0 25px 60px rgba(0,0,0,0.22);
  --r: 16px;
  --t: all 0.3s cubic-bezier(0.4,0,0.2,1);
}

* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; font-size:16px; }
body {
  font-family: var(--font-body), sans-serif;
  font-weight:300;
  line-height:1.7;
  background:var(--bg);
  color:var(--text);
  overflow-x:hidden;
}

TYPE SCALE - always use:
h1 { font-family: var(--font-display), serif; font-size:clamp(3.5rem,9vw,7rem); font-weight:300; line-height:1.05; letter-spacing:-0.03em; }
h2 { font-family: var(--font-display), serif; font-size:clamp(2rem,5vw,3.5rem); font-weight:300; line-height:1.15; }
h3 { font-family: var(--font-display), serif; font-size:1.5rem; font-weight:400; }
p  { font-size:1.05rem; line-height:1.8; color:var(--text-muted); }

GRADIENT TEXT - use on all major headings:
.gradient-text {
  background: var(--grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

GLASSMORPHISM - use for cards on dark sections:
.glass {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(12px);
  border-radius: var(--r);
}

KEYFRAMES - include all 4:
@keyframes fadeInUp {
  from { opacity:0; transform:translateY(40px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes float {
  0%,100% { transform:translateY(0) rotate(0deg); }
  50%     { transform:translateY(-22px) rotate(4deg); }
}
@keyframes pulse {
  0%,100% { opacity:0.6; }
  50%     { opacity:1; }
}
@keyframes shimmer {
  from { background-position:-200% center; }
  to   { background-position:200% center; }
}

BUILD ALL 7 SECTIONS:

1. NAVBAR id="navbar"
- position:fixed; top:0; width:100%; z-index:1000;
- background:rgba(10,10,10,0.88); backdrop-filter:blur(20px);
- border-bottom:1px solid rgba(255,255,255,0.06);
- Layout: logo left, links center, CTA button right.
- Logo: var(--font-display) italic, gradient color, 1.6rem.
- Links: var(--font-body) 400, rgba(255,255,255,0.7), hover white plus underline ::after.
- CTA: gradient background, border-radius:50px, padding:0.7rem 1.8rem, glow shadow.

2. HERO min-height:100vh
- Background: dark gradient using 2-3 colors, position:relative, overflow:hidden.
- Use three floating orbs as real divs, not pseudo-elements:
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
- .orb { position:absolute; border-radius:50%; pointer-events:none; }
- .orb-1: 500px by 500px, top:-100px, right:-100px, radial-gradient using primary at 0.18 alpha, float 8s.
- .orb-2: 350px by 350px, bottom:-50px, left:-80px, radial-gradient using secondary at 0.14 alpha, float 6s reverse.
- .orb-3: 200px by 200px, top:40%, left:40%, radial-gradient using primary at 0.10 alpha, float 10s with 2s delay.
- Hero content must be position:relative; z-index:2; text-align:center.
- Include a small trust badge pill, animated H1 with gradient text, centered subtitle, primary and secondary buttons, and 3 stats with dividers.

3. FEATURES - light background var(--light), color:#111
- Section label: uppercase muted "WHY CHOOSE US", letter-spacing:0.15em.
- H2: gradient text adapted for light background.
- 3 cards in CSS grid repeat(auto-fit,minmax(300px,1fr)), gap:2rem.
- Each card: 64px gradient icon circle, var(--font-display) H3, 3 sentence paragraph, padding:2.5rem, border-radius:var(--r), box-shadow:var(--shadow), class="reveal".
- Hover: translateY(-14px), shadow-lg, border-color:var(--p), transition:var(--t).

4. SERVICES/MENU/PORTFOLIO - dark background var(--bg)
- 6 items minimum, CSS grid repeat(auto-fit,minmax(280px,1fr)).
- Each item class="glass reveal", padding:2rem, border-radius:var(--r).
- H3 color var(--p), var(--font-display), 1.3rem.
- Paragraph rgba(255,255,255,0.65), var(--font-body) 300, line-height:1.7.
- Price/detail: gradient text, 1.6rem, font-weight:700, margin-top:1rem.
- Hover: border-color using primary at 0.4 alpha, background using primary at 0.08 alpha, translateY(-8px), deep shadow.

5. TESTIMONIALS - light background
- 3 cards, class="reveal", position:relative, overflow:hidden.
- Large decorative quote mark with var(--font-display), var(--p), opacity:0.12.
- Stars in var(--p), quote in italic var(--font-body) 300, author name plus title.
- Card: white background, padding:2.5rem, border-radius:var(--r), box-shadow:var(--shadow).
- Hover: translateY(-10px), shadow-lg.

6. CONTACT FORM - dark gradient background
- Two column grid: left info, right form.
- Left includes H2, paragraph, and 3 contact items with simple icon characters.
- Right form must use floating labels:
  .form-group { position:relative; margin-bottom:1.5rem; }
  input, textarea {
    width:100%;
    padding:1rem 1.2rem;
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.12);
    border-radius:var(--r);
    color:white;
    font-size:1rem;
    font-family: var(--font-body), sans-serif;
    transition:var(--t);
  }
  input:focus, textarea:focus {
    outline:none;
    border-color:var(--p);
    box-shadow:0 0 0 3px rgba(255,255,255,0.10);
    background:rgba(255,255,255,0.09);
  }
  label {
    position:absolute;
    left:1.2rem;
    top:1rem;
    color:rgba(255,255,255,0.4);
    pointer-events:none;
    transition:var(--t);
    font-size:0.95rem;
  }
  input:focus + label,
  input:not(:placeholder-shown) + label,
  textarea:focus + label,
  textarea:not(:placeholder-shown) + label {
    transform:translateY(-2rem);
    font-size:0.78rem;
    color:var(--p);
  }
- Submit button: var(--grad), full width, padding:1.1rem, border:none, border-radius:var(--r), white text, font-weight:600, glow shadow, hover opacity and translateY(-2px).

7. FOOTER - background var(--bg)
- 4 columns using grid-template-columns:repeat(auto-fit,minmax(200px,1fr)), gap:3rem.
- border-top:1px solid rgba(255,255,255,0.07), padding:4rem 8% 2rem.
- Col 1: logo, tagline, contact details.
- Col 2: hours or key info.
- Col 3: quick links, hover color var(--p) and translateX(4px).
- Col 4: "Follow Us" plus social links.
- Bottom bar: border-top and centered copyright.

JAVASCRIPT - include exactly this behavior:
// Navbar scroll
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const s = window.scrollY > 60;
  nav.style.padding = s ? '0.5rem 0' : '1rem 0';
  nav.style.boxShadow = s ? '0 4px 30px rgba(0,0,0,0.25)' : 'none';
  nav.style.background = s ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.88)';
});

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      e.target.style.transitionDelay = e.target.dataset.delay || '0ms';
    }
  });
}, {threshold:0.08});
document.querySelectorAll('.reveal').forEach((el,i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(36px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  el.dataset.delay = (i % 3) * 120 + 'ms';
  io.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
      ?.scrollIntoView({behavior:'smooth'});
  })
);

// Form submit
document.querySelector('form')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 3000);
});

MOBILE:
@media (max-width:768px) {
  nav ul { display:none; }
  .hero { padding:6rem 1.5rem 3rem; }
  h1 { font-size:2.8rem; }
  .hero-buttons { flex-direction:column; align-items:stretch; }
  .grid { grid-template-columns:1fr; }
  .contact-grid { grid-template-columns:1fr; }
  .footer-grid { grid-template-columns:1fr 1fr; }
  section { padding:4rem 1.5rem; }
}

CONTENT RULES:
- Real specific business name, never generic names like "Luxury Restaurant".
- Real menu items, prices, addresses, phone numbers, hours, service details, and local-feeling copy.
- Real testimonial full names and detailed 2-3 sentence quotes.
- Never lorem ipsum.
- Never broken image src attributes. Always use high quality Unsplash photos.
- For images use Unsplash Source URLs in this exact format:
  <img src="https://images.unsplash.com/photo-[ID]?w=800&q=80&fit=crop" alt="description">
- For backgrounds use:
  background-image: url('https://images.unsplash.com/photo-[ID]?w=1920&q=80&fit=crop');
- Use these specific photo IDs by business type:
  * Restaurant food: 1504674900247-0877df9cc836
  * Restaurant interior: 1514933651103-005eec06c04b
  * Hotel lobby: 1566073771259-6a8506099945
  * Hotel room: 1590490360182-c33d57733427
  * Fitness gym: 1534438327276-14e5300c3a48
  * Beauty salon: 1562322140-8baeececf3df
  * Real estate: 1580587771525-78b9dba3b914
  * Medical clinic: 1629909613654-28e377c37b09
  * Tech office: 1497366811353-6870744d04b2
  * Coffee shop: 1495474472287-4d71bcdd2085
  * Hero dark abstract: 1507525428034-b723cf961d3e
  * Team people: 1556761175-b413da4baf72
- Never Font Awesome.
- No mention of Oni or AI anywhere in the generated HTML.
- Use tasteful decorative symbols such as stars, diamonds, arrows, checks, and sparkles.

OUTPUT:
- Single complete HTML file, with all CSS in <style> and all JS in <script>.
- Custom CSS only, no Tailwind, no frameworks.
- Minimum 800 lines of HTML/CSS/JS.
- Always wrap the complete website in <ONI_CODE>...</ONI_CODE>.

QUALITY BAR:
Every site you build must feel like it cost $10,000+ to make — think Cormorant Garamond or Playfair Display for headlines, Inter or Jost for body copy, dark luxury colour palettes with a strong primary accent, alternating dark/light sections, scroll-reveal animations, glassmorphism cards, floating orb backgrounds, and real specific copy (names, prices, addresses, hours). Never use placeholders or lorem ipsum. Never use generic business names like "Luxury Restaurant".`;

const ONI_SYSTEM_PROMPT = `You are Oni, an elite AI website 
designer and builder.

For EVERY response output your thought process inside 
<ONI_THOUGHT>...</ONI_THOUGHT> tags first.

**Conversational mode**: casual messages, greetings, questions 
not about building — reply naturally in 1-2 sentences, no code.

**Build mode**: when user asks to build/create/make/design a website:
1. Output your planning/thought process inside <ONI_THOUGHT>...</ONI_THOUGHT> first, using this exact structure:
   PALETTE: [A beautiful design palette name] | [color 1 hex code], [color 2 hex code], [color 3 hex code], [color 4 hex code], [color 5 hex code]
   FONTS: [display font family name] | [body font family name] | [explanation of how these fonts fit the business tone]
   SIGNATURE: [one-sentence description of unique signature layout or interactive element]
   LAYOUT: [one-sentence description of layout design strategy]
   SECTIONS: [comma-separated list of section names/IDs to be built, e.g. navbar, hero, features, services, testimonials, contact, footer]
2. ONE short sentence (e.g. "Here's your restaurant website.")
3. Complete website in <ONI_CODE>...</ONI_CODE>

Build mode rules:
- Single HTML file, all CSS in <style>, all JS in <script>
- Import Google Fonts at top of <style>
- Custom CSS only, no Tailwind, no frameworks
- Design must look like it cost $10,000 to make
- Rich colors matching the business type
- Real content — real names, copy, prices, never placeholders
- Minimum 6 sections: navbar, hero, features, services, 
  testimonials, footer
- Hero minimum 100vh, dramatic typography minimum 80px
- CSS animations and hover effects throughout
- Mobile responsive with media queries
- No mention of Oni or AI anywhere in the output HTML
- Minimum 1000 lines of HTML/CSS/JS`;

const ONI_QUALITY_RULES = `CRITICAL FORMATTING & QUALITY RULES — THESE ARE MANDATORY, NOT SUGGESTIONS:
1. OUTPUT LENGTH: You MUST write a minimum of 1000 lines of code total. The website code must be highly detailed, complete, and production-ready. Write extensive, verbose CSS (aim for 500-700 lines of CSS in <style>), thorough JS, and a rich HTML body. Never output a basic skeleton, stub, or shortened suggestion.
2. CSS VARIABLES: Declare ALL variables in :root including --bg, --p, --s, --light, --text, --text-muted, --font-display, --font-body, --grad, --shadow, --shadow-lg, --r, --t. Never hardcode hex values inline.
3. FONTS: Import TWO Google Fonts at the very top of <style> (one display serif, one body sans). Set --font-display and --font-body in :root. Use them everywhere via CSS variables.
4. ORBS: Hero section MUST have exactly three orb divs as children: <div class="orb orb-1"></div>, <div class="orb orb-2"></div>, <div class="orb orb-3"></div>. Each orb must float and have radial-gradient background.
5. DOCUMENT STRUCTURE & STYLE COMPLETENESS: Write the complete HTML file as one coherent document: <!DOCTYPE html> → <head> with Google Fonts links → <style> block (all CSS) → </head> → <body> (all HTML sections) → <script> → </body> → </html>. The <style> block must be rich, detailed, and verbose (target 600-800 lines of CSS) covering: :root variables, reset, typography, navbar, hero + orbs, all section layouts, card grids, hover effects, animations, keyframes, scroll-reveal classes, modal/drawer styles, form styles, footer, and mobile @media queries. After the closing </style> tag, immediately write the full <body> — do NOT stop between CSS and HTML. The CSS and HTML must be generated as a single continuous output inside one <ONI_CODE> block.
6. BUILD ALL 7 SECTIONS (HTML must contain all of these, fully populated with real, premium copy and rich components):
   a. #navbar — fixed, glassmorphism bg, links, right CTA button with gradient.
   b. .hero — min-height:100vh, 3 orb divs, H1 gradient-text, subtitle, 2 buttons, 3 stat items.
   c. #features — grid of cards, icons, H3, real copy.
   d. #services — grid of services, prices, hover effects.
   e. #testimonials — grid of cards, quotation mark, stars, quotes.
   f. #contact — grid with left info panel + right contact form.
   g. footer — dark bg, 4-column grid, bottom copyright bar.
7. JAVASCRIPT: Include navbar shrink on scroll, IntersectionObserver scroll-reveal for all .reveal elements, smooth anchor scroll, form submit feedback.
8. CONTENT: Real specific business name, real addresses, real prices, real testimonial names. Zero lorem ipsum. Zero placeholder text.
9. WRAP: The entire HTML document goes inside <ONI_CODE>...</ONI_CODE>.
10. ONE SENTENCE before <ONI_CODE> only. No explanations, no markdown outside the code block.
11. IMAGES: You MUST include real, high-quality images in the site. Use Unsplash image URLs in the exact format: <img src="https://images.unsplash.com/photo-[ID]?w=800&q=80&fit=crop" alt="description">. For example, for restaurant food use photo ID 1504674900247-0877df9cc836, and for hotel rooms use 1590490360182-c33d57733427. Never use empty image tags or placeholder URLs.
12. BANNED FRAMEWORKS: NEVER use Bootstrap classes (.col-md-4, .row, .container, .col-*). NEVER use Font Awesome or any icon CDN. Bootstrap is not imported and will break the layout. Use CSS Grid with grid-template-columns instead. For icons, use Unicode symbols only: ★ ✦ ◆ ✓ → ✉ ☎ ◎ or decorative text characters.
13. LIGHT SECTION TEXT COLORS: Sections with a light background (#features, #testimonials) MUST override text to dark: set color: #111 on the section itself, h2/h3 { color: #111 }, p { color: #444 }. White text on a white/light card is completely unreadable — this is a CRITICAL bug.
14. ORBS IN HTML: The hero section HTML MUST physically contain these exact three divs as direct children inside the hero element: <div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>. Without them in the HTML the orb CSS has nothing to apply to.
15. NAV LINKS: The <nav> element inside the navbar MUST have class="nav-links" so the flex layout CSS applies. Without this class the links stack vertically. Each link inside uses class="nav-link".
16. BOX SIZING: Include at the very top of <style>: * { margin: 0; padding: 0; box-sizing: border-box; } This prevents input fields and padded elements from overflowing their containers.
17. HERO CONTENT Z-INDEX: All text/button content inside the hero MUST be wrapped in <div class="hero-content"> with style position:relative; z-index:2 so it renders above the orbs and background image.
18. NEVER STOP MID-GENERATION: You MUST output the complete, finished HTML document in one single pass ending with </html> and then </ONI_CODE>. Do NOT stop after writing CSS. Do NOT write CSS-only output. If the CSS is verbose, make it slightly more concise to leave room for the full HTML body. A complete body with all 7 sections is more important than exhaustive CSS. Always finish.`;

const PREMIUM_COMPONENTS_REFERENCE = `
=========================================
PREMIUM INTERACTIVE COMPONENT SNIPPETS (AVAILABLE FOR MIX-AND-MATCH ACROSS ALL INTENTS/INDUSTRIES):

1. INTERACTIVE RESERVATION MODAL OVERLAY (From Fine-Dining Template):
<!-- Modal Button Trigger -->
<a href="#" class="nav-cta" onclick="openModal(); return false;">Book Now</a>

<!-- Modal Overlay Markup -->
<div id="modal" class="modal-overlay" role="dialog" aria-modal="true">
  <div class="modal-card">
    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
    <h2>Make a Reservation</h2>
    <div class="form-group">
      <input type="text" placeholder="Your name" id="modal-name">
    </div>
    <div class="form-row">
      <div class="form-group">
        <input type="date" id="modal-date">
      </div>
      <div class="form-group">
        <select id="modal-time">
          <option>6:00 PM</option>
          <option>7:30 PM</option>
          <option>9:00 PM</option>
        </select>
      </div>
    </div>
    <button class="form-submit-btn" onclick="submitModal()">Confirm Request</button>
  </div>
</div>

/* CSS for Modal Overlay & Animation */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(10, 8, 7, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-overlay.open { opacity: 1; pointer-events: all; }
.modal-card {
  background: #1C1917;
  border: 1px solid rgba(212, 165, 116, 0.2);
  padding: 48px;
  width: 90%;
  max-width: 500px;
  position: relative;
  transform: translateY(30px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-overlay.open .modal-card { transform: translateY(0); }
.modal-close {
  position: absolute;
  top: 20px; right: 20px;
  background: none; border: none; color: #8C7C72;
  font-size: 32px; cursor: pointer; transition: color 0.3s;
}
.modal-close:hover { color: #D4A574; }

/* JS Modal Functions */
function openModal() { document.getElementById('modal').classList.add('open'); }
function closeModal() { document.getElementById('modal').classList.remove('open'); }
function submitModal() {
  const name = document.getElementById('modal-name').value;
  alert('Thank you, ' + name + '! Your reservation is confirmed.');
  closeModal();
}

2. INTERACTIVE TABBED SWITCHER (From Fine-Dining Menu):
<!-- Tab Buttons -->
<div class="menu-tabs">
  <button class="menu-tab active" onclick="switchTab('tasting')">Tasting Menu</button>
  <button class="menu-tab" onclick="switchTab('alacarte')">À La Carte</button>
  <button class="menu-tab" onclick="switchTab('wine')">Wine Pairing</button>
</div>

<!-- Tab Panels -->
<div id="tab-tasting" class="menu-panel active">...items...</div>
<div id="tab-alacarte" class="menu-panel">...items...</div>
<div id="tab-wine" class="menu-panel">...items...</div>

/* CSS for Tab Switching & Fade-in animations */
.menu-panel { display: none; opacity: 0; transition: opacity 0.4s ease; }
.menu-panel.active { display: grid; opacity: 1; }

/* JS Switch Function */
function switchTab(id) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('tab-' + id).classList.add('active');
}

3. HORIZONTAL LOGO/BRAND MARQUEE TICKER (From Salon/Boutique Template):
<div class="marquee-wrapper">
  <div class="marquee-content">
    <span>ELEVATE DAILY • </span><span>CRAFTED BLENDS • </span><span>LUXURY BEANS • </span>
    <span>ELEVATE DAILY • </span><span>CRAFTED BLENDS • </span><span>LUXURY BEANS • </span>
  </div>
</div>

/* CSS for Infinite Scrolling Marquee */
.marquee-wrapper { overflow: hidden; width: 100%; white-space: nowrap; border-top: 1px solid rgba(212,165,116,0.2); border-bottom: 1px solid rgba(212,165,116,0.2); padding: 16px 0; }
.marquee-content { display: inline-block; animation: marquee 20s linear infinite; }
.marquee-content span { font-family: var(--font-display); font-size: 1.5rem; color: var(--s); margin-right: 40px; text-transform: uppercase; letter-spacing: 0.2em; }
@keyframes marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

4. PREMIUM DENSE GRID GRID-CARDS WITH HOVER DEPTH (From Architecture/Studio Template):
/* CSS Card depth and lift hover effects */
.hover-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}
=========================================
`;

void ONI_LEGACY_SYSTEM_PROMPT;
void ONI_QUALITY_RULES;
void PREMIUM_COMPONENTS_REFERENCE;

type GroqMessage = { role: string; content: string };

function stripOniBlocks(content: string) {
  return content
    .replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, "[Website HTML omitted]")
    .replace(/<ONI_CODE>[\s\S]*/g, "[Website HTML omitted]")
    .replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, "")
    .replace(/<ONI_THOUGHT>[\s\S]*/g, "")
    .trim();
}

function truncateContent(content: string, maxChars = GROQ_MAX_MESSAGE_CHARS) {
  if (content.length <= maxChars) return content;
  return `${content.slice(0, maxChars)}\n...[truncated]`;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 3.0);
}

function isConversationalMessage(text: string): boolean {
  const clean = text.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
  const casualPhrases = new Set([
    "hi", "hello", "hey", "greetings", "yo", "hola", "sup",
    "thanks", "thank you", "thx", "tysm",
    "ok", "okay", "yes", "no", "yep", "nope", "sure", "indeed",
    "cool", "awesome", "great", "wow", "nice", "perfect", "good", "fine",
    "how are you", "hows it going", "whats up",
    "bye", "goodbye", "see ya", "later"
  ]);
  return casualPhrases.has(clean);
}

function isLikelyBuildRequest(text: string): boolean {
  const clean = text.toLowerCase();
  const buildKeywords = [
    "build", "create", "make", "design", "generate", "code", "website", "page", "html", "css", 
    "button", "navbar", "section", "hero", "footer", "card", "layout", "template", "portfolio", 
    "dashboard", "blog", "landing", "style", "change", "modify", "update", "add", "remove", "fix",
    "continue", "go on", "finish", "complete"
  ];
  return buildKeywords.some(kw => clean.includes(kw));
}

function getTemplateReferenceInstruction(promptText: string): string {
  const clean = promptText.trim().toLowerCase();
  const template =
    clean.includes("template: velara retreat") || clean.includes("velara retreat")
      ? { name: "Velara Retreat", prompt: TEMPLATE_PROMPTS.velara }
      : clean.includes("template: moehr atelier") || clean.includes("moehr atelier")
        ? { name: "Moehr Atelier", prompt: TEMPLATE_PROMPTS.moehr }
      : clean.includes("template: maison dore") || clean.includes("maison dore") || clean.includes("hair atelier")
        ? { name: "Maison Dore", prompt: TEMPLATE_PROMPTS.maisonDore }
      : clean.includes("template: vox restaurant") || clean.includes("vox restaurant")
        ? { name: "Vox Restaurant", prompt: TEMPLATE_PROMPTS.vox }
        : null;

  if (!template) return "";

  return [
    "",
    "",
    `The user selected the ${template.name} template. Build the site from this section-by-section design brief, not from a generic category prompt.`,
    "Do not output JSON, markdown code fences, placeholders, or explanatory metadata. Generate the normal Oni response with <ONI_THOUGHT> and <ONI_CODE>.",
    "",
    "SECTION BLUEPRINT:",
    template.prompt,
  ].join("\n");
}

function getExactTemplateResponse(promptText: string): { thought: string; message: string; html: string } | null {
  const clean = promptText.trim().toLowerCase();
  if (clean.startsWith("template: vox restaurant")) {
    return {
      thought: [
        "PALETTE: Midnight Gold Dining | #0A0A0A, #F8F5F0, #C9A96E, #1A1A1A, #9A9080",
        "FONTS: Cormorant Garamond | Jost | Editorial fine-dining display type paired with crisp hospitality body copy.",
        "SIGNATURE: Steak hero, tabbed tasting menus, gallery grid, Chef Elias Voss profile, rotating testimonials, and reservation modal.",
        "LAYOUT: Black and ivory luxury restaurant editorial layout with warm gold accents and booking-focused flow.",
        "SECTIONS: navbar, hero, story, menu, gallery, chef, testimonials, reservations, footer",
      ].join("\n"),
      message: "Here is your Vox Restaurant template.",
      html: VOX_SAMPLE_HTML,
    };
  }

  if (clean.startsWith("template: moehr atelier")) {
    return {
      thought: [
        "PALETTE: Ink and Rust Atelier | #0D0C0A, #F2EFE9, #B85C38, #8A8478, #C4BFB6",
        "FONTS: Playfair Display | DM Sans | DM Mono | Elegant editorial display type paired with restrained modern body copy and precise mono labels.",
        "SIGNATURE: Split cinematic hero, ticker ribbon, manifesto, selected projects grid, studio story, stats strip, and minimal enquiry flow.",
        "LAYOUT: Dark architectural editorial layout with warm paper sections, rust accents, and image-led composition.",
        "SECTIONS: navbar, hero, ticker, manifesto, projects, services, stats, studio, contact, footer",
      ].join("\n"),
      message: "Here is your Moehr Atelier template.",
      html: MOEHR_SAMPLE_HTML,
    };
  }

  if (clean.startsWith("template: maison dore") || clean.startsWith("template: hair atelier")) {
    return {
      thought: [
        "PALETTE: Cream and Bronze Atelier | #FAF7F2, #0E0D0B, #B5844A, #D4A96A, #8A7F72",
        "FONTS: Playfair Display | DM Sans | DM Mono | Fashion-editorial serif headings with clean salon body copy and technical labels.",
        "SIGNATURE: Split hero, marquee service ribbon, consultation-led about section, service grid, stylists portfolio, booking form, and restrained luxury finish.",
        "LAYOUT: Warm editorial salon layout with a black contrast column, airy cream sections, and image-led service panels.",
        "SECTIONS: navbar, hero, marquee, about, services, process, team, gallery, booking, footer",
      ].join("\n"),
      message: "Here is your Maison Dore template.",
      html: MAISON_DORE_SAMPLE_HTML,
    };
  }

  if (clean.startsWith("template: velara retreat")) {
    return {
      thought: [
        "PALETTE: Deep Ocean Gold | #0A0F1E, #F5F0E8, #C9A96E, #4A5568, #8A9B8E",
        "FONTS: Cormorant Garamond | Jost | Luxury resort display type paired with clean hospitality body copy.",
        "SIGNATURE: Cinematic clifftop hero, suite cards, experience sections, dining/location story, and booking CTA.",
        "LAYOUT: Deep navy and ivory hotel editorial layout with gold accents and spacious resort storytelling.",
        "SECTIONS: navbar, hero, intro, rooms, experience, testimonial, dining, location, booking, footer",
      ].join("\n"),
      message: "Here is your Velara Retreat template.",
      html: VELARA_SAMPLE_HTML,
    };
  }

  if (clean.startsWith("template: ame coffee") || clean.startsWith("template: coffee atelier")) {
    return {
      thought: [
        "PALETTE: Cream and Espresso Atelier | #F9F5EF, #14100D, #C4834A, #F1E8DA, #FCFAF7",
        "FONTS: Fraunces | Instrument Sans | Fragment Mono | Luxury editorial display serif paired with minimalist sans body and mechanical monospaced accent tags.",
        "SIGNATURE: Split layout, scrolling logo marquee, horizontal atelier section, pricing menu grid, dynamic interactive contact/enquiry drawer modal.",
        "LAYOUT: Elegant coffee atelier editorial layout with warm cream/oat pages and rich espresso typography.",
        "SECTIONS: navbar, hero, marquee, about, services, testimonials, booking, footer",
      ].join("\n"),
      message: "Here is your Âme Coffee Atelier template.",
      html: AME_COFFEE_SAMPLE_HTML,
    };
  }

  return null;
}

function getCompactHtml(html: string): string {
  if (!html) return "";
  // 1. Remove SVGs (which have huge path data and inflate token count enormously)
  let clean = html.replace(/<svg[\s\S]*?<\/svg>/gi, "<!-- [SVG Icon] -->");
  // 2. Remove base64 image strings if any
  clean = clean.replace(/src="data:image\/[^;]+;base64,[^"]+"/gi, 'src="data:image/png;base64,..."');
  // 3. Shorten any text content between tags longer than 80 chars to 50 chars to keep the code light
  clean = clean.replace(/>([^<]{80,})</g, (match, text) => {
    return `>${text.slice(0, 50)}... [truncated text] <`;
  });
  return clean;
}

function getMatchingTemplateHtml(promptText: string): { name: string; html: string } | null {
  const clean = promptText.toLowerCase();

  // Coffee / Cafe
  if (
    clean.includes("coffee") ||
    clean.includes("cafe") ||
    clean.includes("atelier") ||
    clean.includes("roaster") ||
    clean.includes("barista") ||
    clean.includes("espresso") ||
    clean.includes("brew")
  ) {
    return { name: "Âme Coffee Atelier", html: AME_COFFEE_SAMPLE_HTML };
  }

  // Hotel / Stay
  if (
    clean.includes("hotel") ||
    clean.includes("resort") ||
    clean.includes("villa") ||
    clean.includes("retreat") ||
    clean.includes("stay") ||
    clean.includes("inn") ||
    clean.includes("lodge")
  ) {
    return { name: "Velara Retreat", html: VELARA_SAMPLE_HTML };
  }

  // Restaurant / Food
  if (
    clean.includes("restaurant") ||
    clean.includes("food") ||
    clean.includes("cafe") ||
    clean.includes("bistro") ||
    clean.includes("steak") ||
    clean.includes("dining") ||
    clean.includes("bakery") ||
    clean.includes("kitchen")
  ) {
    return { name: "Vox Restaurant", html: VOX_SAMPLE_HTML };
  }

  // Salon / Beauty
  if (
    clean.includes("salon") ||
    clean.includes("beauty") ||
    clean.includes("hair") ||
    clean.includes("spa") ||
    clean.includes("stylist") ||
    clean.includes("makeup") ||
    clean.includes("parlor") ||
    clean.includes("cosmetic")
  ) {
    return { name: "Maison Dore", html: MAISON_DORE_SAMPLE_HTML };
  }

  // Agency / Creative Portfolio
  if (
    clean.includes("agency") ||
    clean.includes("studio") ||
    clean.includes("portfolio") ||
    clean.includes("atelier") ||
    clean.includes("design") ||
    clean.includes("creative") ||
    clean.includes("architecture") ||
    clean.includes("developer")
  ) {
    return { name: "Moehr Atelier", html: MOEHR_SAMPLE_HTML };
  }

  return null;
}

function streamTextAsSse(content: string) {
  const encoder = new TextEncoder();
  const targetDurationMs = 30_000;
  const targetChunks = Math.max(24, Math.min(80, Math.ceil(content.length / 900)));
  const chunkSize = Math.ceil(content.length / targetChunks);
  const intervalMs = Math.ceil(targetDurationMs / targetChunks);

  let timeout: ReturnType<typeof setTimeout> | null = null;
  let offset = 0;

  return new Response(
    new ReadableStream({
      start(controller) {
        const sendNextChunk = () => {
          if (offset >= content.length) {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
            return;
          }

          const chunk = content.slice(offset, offset + chunkSize);
          offset += chunk.length;
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                choices: [{ delta: { content: chunk } }],
              })}\n\n`
            )
          );

          timeout = setTimeout(sendNextChunk, intervalMs);
        };

        sendNextChunk();
      },
      cancel() {
        if (timeout) {
          clearTimeout(timeout);
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}

function prepareMessagesForGroq(
  messages: GroqMessage[],
  currentHtml: string,
  intent: Intent
): { messages: GroqMessage[]; maxTokens: number; isConversational: boolean } {
  const systemTokens = estimateTokens(ONI_SYSTEM_PROMPT + "\n\n" + ONI_QUALITY_RULES);
  const maxPromptTokensBudget = 40000; // Increased budget to allow full website context (e.g. up to 120k chars)
  const remainingBudget = maxPromptTokensBudget - systemTokens;

  // Process historical messages (everything except the last one), keeping them extremely compact
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role,
    content:
      m.role === "assistant"
        ? truncateContent(stripOniBlocks(m.content) || "[Generated website]", 1200)
        : truncateContent(m.content, 1200),
  }));

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage) {
    return {
      messages: [],
      maxTokens: 7500,
      isConversational: false,
    };
  }

  // Budget remaining space for the last message
  const historyTokens = estimateTokens(JSON.stringify(history));
  let availableTokensForLastMessage = remainingBudget - historyTokens;
  if (availableTokensForLastMessage < 10000) {
    availableTokensForLastMessage = 10000; // Ensure robust budget for user query + HTML context
  }

  const availableChars = Math.floor(availableTokensForLastMessage * 3.0);

  // Reserve up to 5000 chars for the user prompt/attachments
  const lastContentRaw = lastMessage.content;
  const lastContentTruncated = truncateContent(lastContentRaw, 5000);
  const remainingCharsForHtml = Math.max(0, availableChars - lastContentTruncated.length);

  const isConversational = intent === "casual";
  const isNewOrRedesign = intent === "new_website" || intent === "full_redesign";

  let finalLastContent = lastContentTruncated;
  if (currentHtml && !isNewOrRedesign && lastMessage.role === "user") {
    const isContinuation =
      lastContentRaw.toLowerCase().trim() === "continue" ||
      lastContentRaw.toLowerCase().trim() === "continue generating" ||
      lastContentRaw.toLowerCase().trim() === "go on" ||
      lastContentRaw.toLowerCase().trim() === "finish" ||
      lastContentRaw.toLowerCase().trim() === "complete" ||
      lastContentRaw.toLowerCase().trim() === "complete it";

    if (isContinuation) {
      finalLastContent = `User request: ${lastContentTruncated}
      
The previous website generation was cut off mid-way. Below is the incomplete, truncated HTML code. 

You MUST output the COMPLETE, fully-functional, and polished website HTML inside a single <ONI_CODE>...</ONI_CODE> block. Read the truncated code, fill in all the missing CSS selectors, complete the body sections, write the necessary JavaScript scripts, and close all tags properly. Do not leave any section or style incomplete.

<TRUNCATED_HTML_SO_FAR>
${currentHtml}
</TRUNCATED_HTML_SO_FAR>`;
    } else if (isConversational) {
      finalLastContent = lastContentTruncated;
    } else {
      const htmlSliceLimit = Math.max(8000, Math.min(100000, remainingCharsForHtml - 1000));
      const slicedHtml = currentHtml.slice(0, htmlSliceLimit);
      finalLastContent = `User request: ${lastContentTruncated}\n\nThe user is requesting an update, modification, or style change to the existing website below.\n\nCRITICAL DESIGN & REFINEMENT RULES:\n1. Do NOT make a lazy search-and-replace tweak. If the current HTML is simple, basic, or unstyled, you MUST completely upgrade and redesign the sections to make it look like a premium, $50,000 agency site.\n2. Ensure you have at least 6-7 complete, beautifully styled sections: navbar, hero, features grid, services/menu, testimonials, contact form, and footer.\n3. Every element must use var(--font-display) and var(--font-body) custom properties. Import modern Google Fonts at the top of <style>.\n4. All CSS custom variables used (like --shadow, --shadow-lg, transitions, custom gradients) MUST be explicitly declared in :root.\n5. Do NOT write explanations, chat tutorials, or markdown code blocks outside of <ONI_CODE>. Only write exactly one sentence before the code block.\n\n<CURRENT_HTML>\n${slicedHtml}\n</CURRENT_HTML>`;
    }
  }

  const processedLastMessage = {
    role: lastMessage.role,
    content: finalLastContent,
  };

  const finalMessages = [...history, processedLastMessage];

  // Filter out the boilerplate initial welcome/sample messages — they inflate
  // the token count without adding meaningful context for generation.
  const meaningfulMessages = finalMessages.filter((m) => {
    const c = m.content.trim();
    return (
      c !== "" &&
      !c.startsWith("Welcome to Oni!") &&
      !c.includes("Velara — a bespoke five-star") &&
      !c.includes("PALETTE: Deep Ocean Gold") &&
      !c.includes("Vox — a premium, high-impact") &&
      !c.includes("PALETTE: Bold Editorial")
    );
  });

  return {
    messages: meaningfulMessages,
    maxTokens: Math.max(4000, 16000 - Math.floor(estimateTokens(JSON.stringify(meaningfulMessages)) * 1.2)),
    isConversational,
  };
}

function getSystemPromptWithContext(promptText: string, maxContextChars = 30000, isOllama = false): string {
  const cleanPrompt = promptText.toLowerCase();
  let contextText = "\n\n=== WORKSPACE DESIGN SYSTEM GUIDELINES ===\n";

  try {
    const contextDir = path.join(process.cwd(), "oni-context");

    // Standard context files (ordered by priority — COMPONENT_PATTERNS excluded: 60k chars alone
    // would exceed qwen2.5-coder's 32k token context window when combined with the system prompt)
    const essentialFiles = [
      "COLOR_PALETTES.md",
      "TYPOGRAPHY_GUIDE.md",
      "CSS_TECHNIQUES.md",
      "DESIGN_PRINCIPLES.md",
      "ANIMATION_TECHNIQUES.md",
      "REFERENCE_SITES.md"
    ];

    // Conditionally prepend the industry-specific example file (highest priority)
    if (cleanPrompt.includes("restaurant") || cleanPrompt.includes("food") || cleanPrompt.includes("cafe") || cleanPrompt.includes("bistro") || cleanPrompt.includes("dining")) {
      essentialFiles.unshift("RESTAURANT_EXAMPLES.md");
    } else if (cleanPrompt.includes("hotel") || cleanPrompt.includes("resort") || cleanPrompt.includes("stay") || cleanPrompt.includes("suite") || cleanPrompt.includes("room")) {
      essentialFiles.unshift("HOTEL_EXAMPLES.md");
    } else if (cleanPrompt.includes("saas") || cleanPrompt.includes("tech") || cleanPrompt.includes("software") || cleanPrompt.includes("dashboard") || cleanPrompt.includes("app")) {
      essentialFiles.unshift("TECH_SAAS_EXAMPLES.md");
    }

    const availableFiles = essentialFiles.filter(f => fs.existsSync(path.join(contextDir, f)));
    const numFiles = availableFiles.length;

    // Divide total budget evenly across all files so no single file starves the rest.
    // For Ollama (20k budget, ~7 files) each file gets ~2857 chars.
    // For Groq (3k budget, ~7 files) each file gets ~428 chars.
    const maxFileChars = numFiles > 0 ? Math.max(600, Math.floor(maxContextChars / numFiles)) : 1000;
    let totalChars = 0;

    for (const filename of availableFiles) {
      // Hard stop — never exceed total budget
      if (totalChars >= maxContextChars) break;

      const filePath = path.join(contextDir, filename);
      let content = fs.readFileSync(filePath, "utf8");

      // Per-file cap: also ensure the remaining budget isn't blown by one large file
      const remaining = maxContextChars - totalChars;
      const cap = Math.min(maxFileChars, remaining);
      if (content.length > cap) {
        content = content.slice(0, cap) + "\n...[truncated for token budget]";
      }

      contextText += `\n--- ${filename} ---\n${content}\n`;
      totalChars += content.length;
    }

    console.log(`[Oni Context] Loaded ${totalChars} chars of context from ${numFiles} files (budget: ${maxContextChars} chars, model: ${isOllama ? 'Ollama' : 'Groq'}).`);
  } catch (err) {
    console.error("Error loading design context from workspace:", err);
  }

  return isOllama ? contextText : (ONI_SYSTEM_PROMPT + "\n\n" + ONI_QUALITY_RULES) + contextText;
}

void getSystemPromptWithContext;

interface FreeKeys {
  "claude-opus-4-7": string[];
  "gemini-2.5-flash": string[];
  "smart-chat": string[];
}

let cachedKeys: FreeKeys | null = null;
let lastFetchedTime = 0;

async function getLatestFreeKeys(): Promise<FreeKeys> {
  const now = Date.now();
  if (cachedKeys && (now - lastFetchedTime) < 10 * 60 * 1000) {
    return cachedKeys;
  }

  const defaultKeys: FreeKeys = {
    "claude-opus-4-7": (process.env.FREE_KEYS_CLAUDE_OPUS || "").split(",").map(k => k.trim()).filter(Boolean),
    "gemini-2.5-flash": (process.env.FREE_KEYS_GEMINI_FLASH || "").split(",").map(k => k.trim()).filter(Boolean),
    "smart-chat": []
  };

  if (defaultKeys["claude-opus-4-7"].length === 0) {
    defaultKeys["claude-opus-4-7"] = [
      "sk-ceaWeoE6jZEMEEo6lSPXgjd5WIWA6OSoeIrzCa2Fw4n5hEDF",
      "sk-K87O4HeIy4cvjUK9ZREqL1uBROCguGMULi9EPlgF28OaruKV",
      "sk-1WRJ304InZANcQL3hmJP8XpGzVIrsDgYzkGa1k8m1Q5HoU7q",
      "sk-rjS01TDLrNDEodBmQ8DQvhnUlJeNxsvrboT1jiHEMIPiYwPD",
      "sk-jShIV7jFXenRsmJTydNNn6Vot3qfkpPoDmsgkuhReAb5my2B",
      "sk-p9QZv4CxNHOuRKiWQZcDNkExHNzDdvVWnS4HIu3C16PpRrIA"
    ];
  }
  if (defaultKeys["gemini-2.5-flash"].length === 0) {
    defaultKeys["gemini-2.5-flash"] = [
      "sk-QwZyiMIKBqnHIE0TTfUlr9K7IN7X6g7b7IEcbY3X094O63d8",
      "sk-Yp8fC4w5D3k7oPuHfIvWJG7xc1YeKIWsQDMxHUALZSeO2yFs",
      "sk-5Ual4RbNFDLf8i5eJRGiUELctMrj6FIkHNM4Hi2SGWCCOOTZ",
      "sk-0VHlOaF6FAoYldbJeK2vfmbJrZy4PnjugCfiS9PmKoQg15Zz",
      "sk-l7w0B50ExjZj3ELH7BGPuhjlu6K7Iz05SpYjpNNiMlO0JVr7",
      "sk-53KrR1PrpH96kKTnLrn9Qk3doCfzfHRtFywfmYqLZQSObDJi"
    ];
  }
  if (defaultKeys["smart-chat"].length === 0) {
    defaultKeys["smart-chat"] = [
      "sk-sQpqsRSn4BHDrarxUeUW5AFRmIe7jdazMEhZ0cwuvdKaSs9g",
      "sk-kDH48bq0kxyAeYAtKGLpTYLvxJOBJugwXCxb4DlpG0ExLUbm",
      "sk-UqU5Iv2GmbPTQvaTcFG8dVDZmtv0UBp0IHQsmhSCB9enkGUw",
      "sk-Lk8VjVUPXxzsr3QSBVxgyUg6K3htkVETKmCFgH3qLKHy2RNr",
      "sk-s6AjaM4vIQ2F5rX7VU1oAr2zqhgrXrrFMLuOUBk6CEv2Nchs",
      "sk-IW6Ikr4TFsE2fyBd7tvy9e3sGyPjYYdufSxMfuMR9K26blUF"
    ];
  }

  try {
    const res = await fetch("https://raw.githubusercontent.com/alistaitsacle/free-llm-api-keys/main/README.md", {
      signal: AbortSignal.timeout(4000)
    });
    if (!res.ok) throw new Error(`HTTP status ${res.status}`);
    const text = await res.text();

    const claudeKeys: string[] = [];
    const geminiKeys: string[] = [];
    const smartKeys: string[] = [];

    const lines = text.split("\n");
    for (const line of lines) {
      if (line.includes("sk-")) {
        const keyMatch = line.match(/`?(sk-[A-Za-z0-9]{48})`?/);
        if (keyMatch) {
          const key = keyMatch[1];
          if (line.includes("claude-opus-4-7")) {
            claudeKeys.push(key);
          } else if (line.includes("gemini-2.5-flash")) {
            geminiKeys.push(key);
          } else if (line.includes("smart-chat")) {
            smartKeys.push(key);
          }
        }
      }
    }

    cachedKeys = {
      "claude-opus-4-7": claudeKeys.length > 0 ? claudeKeys : defaultKeys["claude-opus-4-7"],
      "gemini-2.5-flash": geminiKeys.length > 0 ? geminiKeys : defaultKeys["gemini-2.5-flash"],
      "smart-chat": smartKeys.length > 0 ? smartKeys : defaultKeys["smart-chat"]
    };
    lastFetchedTime = now;
    console.log(`[Free Keys] Dynamically loaded ${cachedKeys["claude-opus-4-7"].length} Claude, ${cachedKeys["gemini-2.5-flash"].length} Gemini, and ${cachedKeys["smart-chat"].length} Smart-chat keys from GitHub.`);
    return cachedKeys;
  } catch (err: any) {
    console.error("[Free Keys] Failed to fetch latest keys from GitHub, using default fallback pool:", err.message);
    return defaultKeys;
  }
}

const FREE_BASE_URL = "https://aiapiv2.pekpik.com/v1/chat/completions";

export async function POST(req: Request) {
  // Rate limiting — protect Groq credits
  const ip = getClientIp(req);
  if (rateLimiter.isLimitExceeded(`chat:${ip}`, CHAT_RATE_LIMIT)) {
    return new NextResponse("Rate limit exceeded. Please slow down.", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return new NextResponse("Bad request", { status: 400 });
  }

  // ── Credit check & Intent classification ─────────────────────────────────────
  const visitorId = req.headers.get("x-visitor-id") || "";
  let creditCost = 0;
  let useFallbackPool = false;

  // Custom key brings unlimited free generations
  if (visitorId && !body.customApiKey) {
    const credits = await getOrCreateCredits(visitorId);
    if (credits && (credits.plan as string).startsWith("free::")) {
      if ((credits.credits_remaining as number) <= 0) {
        if (process.env.GROQ_API_KEY && process.env.NODE_ENV === "development") {
          console.log("[Credits] Credits depleted, but bypass fallback pool in development because GROQ_API_KEY is configured.");
          useFallbackPool = false;
        } else {
          useFallbackPool = true;
        }
      }
    }
  }

  const lastUserMsgText = body.prompt || (body.messages && body.messages.slice().reverse().find((m: any) => m.role === "user")?.content) || "";
  let intent: Intent = "new_website";
  if (lastUserMsgText) {
    try {
      const hasExistingWebsite = typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0;
      intent = await classifyIntent(lastUserMsgText.slice(0, 500), hasExistingWebsite);
      const routeConfig = routeIntent(intent);
      creditCost = routeConfig.creditCost;
      console.log(`[Credits] intent=${intent} cost=${creditCost}`);
    } catch (err) {
      console.error("[Credits] classifier error:", err);
      creditCost = 8;
      // Fallback detection if classifier fails
      const cleanLower = lastUserMsgText.toLowerCase();
      if (cleanLower.includes("hi") || cleanLower.includes("hello") || cleanLower.includes("hey") || cleanLower.includes("explain")) {
        intent = "casual";
      }
    }
  }

  const isNewOrRedesign = intent === "new_website" || intent === "full_redesign";
  const effectiveHtml = (!isNewOrRedesign && typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0)
    ? body.currentHtml.slice(0, 80000)
    : "";

  if (isNewOrRedesign && typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0) {
    console.log(`[Intent] Classified intent = ${intent}. Bypassing existing HTML to trigger clean-sheet premium generation!`);
  }

  let groqMessages: GroqMessage[] = [];

  if (Array.isArray(body.messages) && body.messages.length > 0) {
    const rawMessages = body.messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));
    const result = prepareMessagesForGroq(rawMessages, effectiveHtml, intent);
    groqMessages = result.messages;
  } else if (body.prompt) {
    const clean = sanitizeText(
      DOMPurify.sanitize(body.prompt, { ALLOWED_TAGS: [] })
    );
    if (!clean || clean.length > 1000) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const banned = ["ignore previous", "system:", "you are now", "jailbreak"];
    if (banned.some((b) => clean.toLowerCase().includes(b))) {
      return new NextResponse("Invalid prompt", { status: 400 });
    }

    const result = prepareMessagesForGroq([{ role: "user", content: clean }], effectiveHtml, intent);
    groqMessages = result.messages;
  } else {
    return new NextResponse("Bad request", { status: 400 });
  }

  const isLocalOrOllamaSelected =
    process.env.ONI_USE_OLLAMA === "true" ||
    body?.defaultModel === "local-ollama";

  const lastUserMsg = groqMessages.slice().reverse().find((m) => m.role === "user");
  if (lastUserMsg && intent !== "casual") {
    lastUserMsg.content += `\n\nCRITICAL FORMATTING REQUIREMENT:\n- You MUST wrap the entire complete website HTML (including all CSS in <style> and all JS in <script>) inside <ONI_CODE>...</ONI_CODE> tags.\n- Do NOT output separate HTML, CSS, or JS code blocks.\n- Do NOT write notes like "This is a basic template" or "customize it as per your requirements". You MUST build the complete, fully styled premium website with real content and copy inside the <ONI_CODE> block.`;
  }

  if (body.userImage && typeof body.userImage === "string" && body.userImage.trim().length > 0) {
    const lastUserMsgIndex = groqMessages.reduce((acc, msg, idx) => msg.role === "user" ? idx : acc, -1);
    if (lastUserMsgIndex !== -1) {
      const userImageInstruction = `\n\nThe user has uploaded an image to use in the website. Use this exact base64 string as the src for the hero background or main image:\n<img src="${body.userImage}" style="width:100%;height:100%;object-fit:cover">\nor as CSS: background-image: url('${body.userImage}');`;
      groqMessages[lastUserMsgIndex].content += userImageInstruction;
    }
  }

  let systemPrompt = ONI_SYSTEM_PROMPT + "\n\n" + ONI_QUALITY_RULES + "\n\n" + PREMIUM_COMPONENTS_REFERENCE;
  const userPromptText = body.prompt || "";
  const hasExistingHtml = effectiveHtml.trim().length > 0;
  if (!hasExistingHtml && userPromptText) {
    const matchingTemplate = getMatchingTemplateHtml(userPromptText);
    if (matchingTemplate) {
      console.log(`[Templates] Matching user request to template: ${matchingTemplate.name}. Injecting component code reference.`);
      systemPrompt += `\n\n<TEMPLATE_SAMPLE_CODE>\n${getCompactHtml(matchingTemplate.html)}\n</TEMPLATE_SAMPLE_CODE>\n\nINSTRUCTIONS FOR TEMPLATE ADAPTATION & COMPONENT EXTRACTION:
1. You have access to a premium template sample above ("${matchingTemplate.name}") that matches the user's business type.
2. Analyze the grid structures, CSS classes, interactive JS logic (e.g. modals, scroll reveals, tabs), and section styles in this template.
3. Extract and borrow components and code snippets from it, adapt them to the user's specific request and brand (brand name, colors, fonts, content), and make them significantly better, more modern, and highly polished.
4. Ensure the output is a complete website containing at least 6-7 fully fleshed-out sections. Do not just copy-paste the template raw; extend it, refine the layout, add animations, and customize it uniquely for the user!
5. CROSS-INDUSTRY MIX-AND-MATCH FREEDOM: You are explicitly encouraged to mix, match, borrow, and adapt components, styles, grids, and script features from the component library snippets provided in the prompt reference (or from other templates) regardless of the industry. For example, if building a coffee shop or hotel website, you can use the interactive booking modal overlay, tabbed menus, scrolling marquee ribbons, or lift cards. Do not restrict yourself to industry boundaries—cross-pollinate features to build the most luxurious, interactive site possible!`;
    }
  }

  if (body.competitorReference && typeof body.competitorReference === "object") {
    const { title, content } = body.competitorReference;
    if (content) {
      systemPrompt += `\n\nCOMPETITOR REFERENCE: ${title || 'Untitled'}
Content: ${content}
Build something better than this for the user's business.
Improve the design, make it more premium and modern.`;
    }
  }

  const messagesToSend = [{ role: "system", content: systemPrompt }, ...groqMessages];

  // ── Three-stage pipeline: Plan → CSS → HTML+JS → Assemble ────────────────────
  const isBuildIntent = intent === "new_website" || intent === "full_redesign" || isLikelyBuildRequest(lastUserMsgText);
  const groqKey = process.env.GROQ_API_KEY?.trim() || "";

  if (isBuildIntent && !useFallbackPool && groqKey) {
    console.log("[Three-Stage] Build request detected. Running Stage 1: Groq design planning...");

    // Helper: call any API non-streaming, return text or null
    async function callNonStreaming(
      apiUrl: string, apiKey: string, model: string, messages: object[], maxTokens: number
    ): Promise<string | null> {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ model, messages, stream: false, max_tokens: maxTokens, temperature: 0.75 }),
        });
        if (!res.ok) {
          console.warn(`[Three-Stage] API call to ${apiUrl} failed: ${res.status}`);
          return null;
        }
        const data = await res.json();
        return data?.choices?.[0]?.message?.content?.trim() || null;
      } catch (err: any) {
        console.warn(`[Three-Stage] API exception: ${err.message}`);
        return null;
      }
    }

    // Determine which model/endpoint to use for code stages
    const codeApiUrl = isLocalOrOllamaSelected ? OLLAMA_CHAT_URL : "https://api.groq.com/openai/v1/chat/completions";
    const codeApiKey = isLocalOrOllamaSelected ? "" : groqKey;
    const codeModel = isLocalOrOllamaSelected ? OLLAMA_MODEL : GROQ_MODEL;
    console.log(`[Three-Stage] Code stages will use: ${isLocalOrOllamaSelected ? "Ollama" : "Groq"} (${codeModel})`);

    // Get matching template reference for CSS/HTML guidance
    const matchingTemplate = getMatchingTemplateHtml(lastUserMsgText);
    const templateRef = matchingTemplate
      ? `\n\n<TEMPLATE_REFERENCE name="${matchingTemplate.name}">\n${getCompactHtml(matchingTemplate.html)}\n</TEMPLATE_REFERENCE>\n\nStudy the class names, grid structures, and component patterns in this template. Reuse and adapt them (not copy-paste) to match the design plan.`
      : "";

    // ── Stage 1: Groq → Design plan (ONI_THOUGHT + one sentence) ──────────────
    const planText = await callNonStreaming(
      "https://api.groq.com/openai/v1/chat/completions",
      groqKey,
      GROQ_MODEL,
      [
        { role: "system", content: ONI_PLANNING_PROMPT },
        { role: "user", content: lastUserMsgText || "Build a premium website." },
      ],
      500
    );

    if (planText) {
      console.log("[Three-Stage] Stage 1 done. Plan:", planText.length, "chars");

      // ── Stage 2: Code model → Pure CSS stylesheet ──────────────────────────
      const cssPromptWithContext = ONI_CSS_PROMPT + templateRef;
      const cssCode = await callNonStreaming(
        codeApiUrl, codeApiKey, codeModel,
        [
          { role: "system", content: cssPromptWithContext },
          { role: "user", content: `DESIGN PLAN:\n${planText}\n\nUSER REQUEST: ${lastUserMsgText}\n\nWrite the complete CSS stylesheet now. Start with @import. Output raw CSS only.` },
        ],
        8000
      );

      if (cssCode) {
        console.log("[Three-Stage] Stage 2 done. CSS:", cssCode.length, "chars");

        // ── Stage 3: Code model → HTML body + inline JS ───────────────────────
        const htmlBodyCode = await callNonStreaming(
          codeApiUrl, codeApiKey, codeModel,
          [
            { role: "system", content: ONI_HTML_BODY_PROMPT + templateRef },
            {
              role: "user",
              content: `DESIGN PLAN:\n${planText}\n\nUSER REQUEST: ${lastUserMsgText}\n\nCSS CLASSES ALREADY DEFINED (use EXACTLY these class names):\n${cssCode.slice(0, 4000)}\n\nNow write the complete <body>...</body> with all 7 sections and the inline <script>. Start with <body>.`,
            },
          ],
          8000
        );

        if (htmlBodyCode) {
          console.log("[Three-Stage] Stage 3 done. HTML body:", htmlBodyCode.length, "chars");

          // ── Assembly: Combine CSS + HTML body into one inline HTML file ────
          const extractTitle = (text: string) => {
            const m = text.match(/PALETTE:\s*([^|]+)/i);
            return m ? m[1].trim() : "Website";
          };
          const cleanCss = cssCode.replace(/^```[\w]*\n?/gm, "").replace(/^```$/gm, "").trim();
          const cleanBody = htmlBodyCode.replace(/^```[\w]*\n?/gm, "").replace(/^```$/gm, "").trim();
          const bodyContent = cleanBody.startsWith("<body") ? cleanBody : `<body>\n${cleanBody}\n</body>`;

          const assembledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${extractTitle(planText)}</title>
  <style>
${cleanCss}
  </style>
</head>
${bodyContent}
</html>`;

          const finalResponse = `${planText}\n\n<ONI_CODE>${assembledHtml}</ONI_CODE>`;
          console.log(`[Three-Stage] Assembly complete. Total output: ${finalResponse.length} chars (~${Math.round(finalResponse.length / 4)} tokens displayed).`);

          if (visitorId && creditCost > 0 && !body?.customApiKey) {
            void deductCredits(visitorId, creditCost);
          }

          return streamTextAsSse(finalResponse);
        } else {
          console.warn("[Three-Stage] Stage 3 (HTML body) failed — falling through to single-stage pipeline.");
        }
      } else {
        console.warn("[Three-Stage] Stage 2 (CSS) failed — falling through to single-stage pipeline.");
      }
    } else {
      console.warn("[Three-Stage] Stage 1 (planning) failed — falling through to single-stage pipeline.");
    }
  }


  // ── Build Unified Cascading Fallback Retries Pipeline ─────────────────────────

  const latestKeys = await getLatestFreeKeys();
  let selectedModel = body?.defaultModel || "oni-pro";

  interface RequestTarget {
    name: string;
    apiUrl: string;
    apiKey: string;
    model: string;
    maxTokens: number;
    timeoutMs?: number;
  }

  const targets: RequestTarget[] = [];

  if (body?.customApiKey) {
    let customUrl = body.customBaseUrl ? body.customBaseUrl.trim() : "https://api.openai.com/v1/chat/completions";
    if (!customUrl.endsWith("/chat/completions") && !customUrl.endsWith("/chat/completions/")) {
      customUrl = customUrl.replace(/\/$/, "") + "/chat/completions";
    }
    targets.push({
      name: "Custom API Provider",
      apiUrl: customUrl,
      apiKey: body.customApiKey.trim(),
      model: selectedModel === "oni-pro" ? GROQ_MODEL : selectedModel,
      maxTokens: GROQ_MAX_TOKENS,
    });
  } else {
    // 1. Local Ollama (Only if explicit local selection or in local dev)
    if (isLocalOrOllamaSelected) {
      targets.push({
        name: "Local Ollama (Qwen 2.5 Coder)",
        apiUrl: OLLAMA_CHAT_URL,
        apiKey: "",
        model: OLLAMA_MODEL,
        maxTokens: GROQ_MAX_TOKENS,
        timeoutMs: 45000,
      });
    }

    // 2. Primary Selected Model (Default to Groq)
    let primaryModel = selectedModel;
    if (selectedModel === "oni-pro" || selectedModel === "oni-creative" || selectedModel === "local-ollama") {
      primaryModel = GROQ_MODEL;
    } else if (selectedModel === "oni-flash") {
      primaryModel = "llama-3.1-8b-instant";
    }

    if (useFallbackPool) {
      // Bypasses primary because user ran out of credits
      const chosenModel = "gemini-2.5-flash";
      const keys = latestKeys[chosenModel];
      targets.push({
        name: "Credits Depleted Fallback Gemini",
        apiUrl: FREE_BASE_URL,
        apiKey: keys[Math.floor(Math.random() * keys.length)],
        model: chosenModel,
        maxTokens: 6000,
      });
    } else if (primaryModel === "claude-opus-4-7") {
      const keys = latestKeys["claude-opus-4-7"];
      targets.push({
        name: "Primary Claude Opus 4.7 Gateway",
        apiUrl: FREE_BASE_URL,
        apiKey: keys[Math.floor(Math.random() * keys.length)],
        model: "claude-opus-4-7",
        maxTokens: 6000,
      });
    } else if (primaryModel === "gemini-2.5-flash") {
      const keys = latestKeys["gemini-2.5-flash"];
      targets.push({
        name: "Primary Gemini 2.5 Flash Gateway",
        apiUrl: FREE_BASE_URL,
        apiKey: keys[Math.floor(Math.random() * keys.length)],
        model: "gemini-2.5-flash",
        maxTokens: 6000,
      });
    } else {
      let groqMaxTokens = GROQ_MAX_TOKENS;

      targets.push({
        name: `Primary Groq (${primaryModel})`,
        apiUrl: "https://api.groq.com/openai/v1/chat/completions",
        apiKey: process.env.GROQ_API_KEY?.trim() || "",
        model: primaryModel,
        maxTokens: groqMaxTokens,
      });
    }

    // 3. Fallback Gemini Flash
    if (selectedModel !== "gemini-2.5-flash" && !useFallbackPool) {
      const keys = latestKeys["gemini-2.5-flash"];
      if (keys && keys.length > 0) {
        targets.push({
          name: "Fallback Gemini 2.5 Flash",
          apiUrl: FREE_BASE_URL,
          apiKey: keys[Math.floor(Math.random() * keys.length)],
          model: "gemini-2.5-flash",
          maxTokens: 6000,
        });
      }
    }

    // 4. Fallback Smart Chat
    const smartKeys = latestKeys["smart-chat"];
    if (smartKeys && smartKeys.length > 0) {
      targets.push({
        name: "Fallback Smart Chat Gateway",
        apiUrl: FREE_BASE_URL,
        apiKey: smartKeys[Math.floor(Math.random() * smartKeys.length)],
        model: "smart-chat",
        maxTokens: 6000,
      });
    }

    // 5. Fallback Claude Opus
    if (selectedModel !== "claude-opus-4-7") {
      const keys = latestKeys["claude-opus-4-7"];
      if (keys && keys.length > 0) {
        targets.push({
          name: "Fallback Claude Opus 4.7",
          apiUrl: FREE_BASE_URL,
          apiKey: keys[Math.floor(Math.random() * keys.length)],
          model: "claude-opus-4-7",
          maxTokens: 6000,
        });
      }
    }
  }

  // ── Execute Targets cascading sequentially ────────────────────────────────────
  let successResponse: Response | null = null;
  let finalUsedTargetName = "";

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    console.log(`[Pipeline Attempt ${i + 1}/${targets.length}] Trying ${target.name} (model: ${target.model})...`);

    try {
      const requestBody = JSON.stringify({
        model: target.model,
        messages: messagesToSend,
        temperature: 0.7,
        max_tokens: target.maxTokens,
        stream: true,
      });

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (target.apiKey) {
        headers["Authorization"] = `Bearer ${target.apiKey}`;
      }

      const controller = new AbortController();
      let timeoutId: any = null;
      if (target.timeoutMs) {
        timeoutId = setTimeout(() => controller.abort(), target.timeoutMs);
      }

      const response = await fetch(target.apiUrl, {
        method: "POST",
        headers,
        body: requestBody,
        signal: target.timeoutMs ? controller.signal : undefined,
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (response.ok) {
        successResponse = response;
        finalUsedTargetName = target.name;
        console.log(`[Pipeline Success] ${target.name} streamed successfully.`);
        break;
      } else {
        const errorText = await response.clone().text().catch(() => "");
        console.warn(`[Pipeline Failure] ${target.name} failed with status ${response.status}: ${errorText}`);
      }
    } catch (err: any) {
      console.warn(`[Pipeline Exception] ${target.name} exception: ${err.message || err}`);
    }
  }

  if (!successResponse) {
    return new NextResponse("All available API pipeline fallback targets failed. Please verify your internet or local connection and settings.", { status: 500 });
  }

  // Deduct credits only if we successfully billed using the primary Groq target
  const billedGroq = finalUsedTargetName.startsWith("Primary Groq");
  if (visitorId && creditCost > 0 && billedGroq && !body?.customApiKey) {
    void deductCredits(visitorId, creditCost);
  }

  return new Response(successResponse.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
