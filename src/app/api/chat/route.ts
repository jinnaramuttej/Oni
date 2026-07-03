import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { sanitizeText } from "@/lib/auth";
import { rateLimiter, getClientIp } from "@/lib/rate-limit";
import { TEMPLATE_PROMPTS, TEMPLATE_KEYWORDS } from "@/lib/template-prompts";
import { VELARA_SAMPLE_HTML } from "@/lib/velara-sample";
import { MOEHR_SAMPLE_HTML } from "@/lib/moehr-sample";
import { MAISON_DORE_SAMPLE_HTML } from "@/lib/maison-dore-sample";
import { VOX_SAMPLE_HTML } from "@/lib/vox-sample";
import { createSupabaseAdminClientOrNull } from "@/lib/supabase";
import { classifyIntent } from "@/lib/classifier";
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
    return created;
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
- Minimum 800 lines of HTML`;

const ONI_QUALITY_RULES = `CRITICAL FORMATTING & QUALITY RULES — THESE ARE MANDATORY, NOT SUGGESTIONS:
1. OUTPUT LENGTH: You MUST write a minimum of 800 lines of HTML/CSS/JS total. A skeleton or stub will be rejected. Write every section in full detail — verbose CSS, thorough JS, detailed copy.
2. CSS VARIABLES: Declare ALL variables in :root including --bg, --p, --s, --light, --text, --text-muted, --font-display, --font-body, --grad, --shadow, --shadow-lg, --r, --t. Never hardcode hex values inline.
3. FONTS: Import TWO Google Fonts at the very top of <style> (one display serif, one body sans). Set --font-display and --font-body in :root. Use them everywhere via CSS variables.
4. ORBS: Hero section MUST have exactly three orb divs as children: <div class="orb orb-1"></div>, <div class="orb orb-2"></div>, <div class="orb orb-3"></div>. Each orb must be 300px–600px wide with radial-gradient background and a float animation.
5. CSS-FIRST STYLE COMPLETENESS: You MUST write complete, detailed, and robust CSS styling for every single element and section inside the <style> block BEFORE writing any HTML body markup. The CSS block must contain fully-defined, non-empty style rules for #navbar, .nav-inner, .nav-logo, .nav-links, .nav-cta, .hero, .orb, .orb-1, .orb-2, .orb-3, #features, .feature-card, #services, .service-card, #testimonials, .testimonial-card, #contact, .form-group, label, input, textarea, and footer (plus grids, hover effects, transition classes, and @media queries). Do NOT refer to any class or ID in the HTML markup that has not been completely styled in the CSS block.
6. BUILD ALL 7 SECTIONS — write 80–120 lines of CSS per section:
   a. #navbar — fixed, glassmorphism bg, logo (italic display font), centered links, right CTA button with gradient.
   b. .hero — min-height:100vh, 3 orb divs, trust badge pill, H1 gradient-text (clamp 4–7rem), subtitle, 2 buttons, 3 stat items.
   c. #features — light background, 3 glass cards each with 64px gradient icon circle, H3, 3-sentence paragraph.
   d. #services — dark bg, 6 glass cards with H3 in var(--p), price/detail line, hover translateY(-8px).
   e. #testimonials — light bg, 3 white cards, large decorative quote mark, stars, italic quote, author + title.
   f. #contact — dark gradient bg, 2-column grid: left info panel + right form with floating labels.
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
17. HERO CONTENT Z-INDEX: All text/button content inside the hero MUST be wrapped in <div class="hero-content"> with style position:relative; z-index:2 so it renders above the orbs and background image.`;

void ONI_LEGACY_SYSTEM_PROMPT;
void ONI_QUALITY_RULES;

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
    "dashboard", "blog", "landing", "style", "change", "modify", "update", "add", "remove", "fix"
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
  currentHtml: string
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

  const isConversational = isConversationalMessage(lastContentTruncated) || !isLikelyBuildRequest(lastContentTruncated);

  let finalLastContent = lastContentTruncated;
  if (currentHtml && lastMessage.role === "user") {
    if (isConversational) {
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
    maxTokens: isConversational ? 1500 : 16000,
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

  // ── Credit check ────────────────────────────────────────────────────────────
  const visitorId = req.headers.get("x-visitor-id") || "";
  let creditCost = 0;
  let useFallbackPool = false;

  // Custom key brings unlimited free generations
  if (visitorId && !body.customApiKey) {
    const credits = await getOrCreateCredits(visitorId);
    if (credits && (credits.plan as string).startsWith("free::")) {
      if ((credits.credits_remaining as number) <= 0) {
        // Instead of returning 402, use the free fallback keys pool
        useFallbackPool = true;
      }
    }
  }

  const currentHtml =
    typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0
      ? body.currentHtml.slice(0, 80000)
      : "";

  let groqMessages: GroqMessage[] = [];

  if (Array.isArray(body.messages) && body.messages.length > 0) {
    const rawMessages = body.messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));
    const result = prepareMessagesForGroq(rawMessages, currentHtml);
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

    const result = prepareMessagesForGroq([{ role: "user", content: clean }], currentHtml);
    groqMessages = result.messages;
  } else {
    return new NextResponse("Bad request", { status: 400 });
  }

  const isLocalOrOllamaSelected =
    process.env.VERCEL !== "1" ||
    process.env.ONI_USE_OLLAMA === "true" ||
    body?.defaultModel === "local-ollama";

  if (body.userImage && typeof body.userImage === "string" && body.userImage.trim().length > 0) {
    const lastUserMsgIndex = groqMessages.reduce((acc, msg, idx) => msg.role === "user" ? idx : acc, -1);
    if (lastUserMsgIndex !== -1) {
      const userImageInstruction = `\n\nThe user has uploaded an image to use in the website. Use this exact base64 string as the src for the hero background or main image:\n<img src="${body.userImage}" style="width:100%;height:100%;object-fit:cover">\nor as CSS: background-image: url('${body.userImage}');`;
      groqMessages[lastUserMsgIndex].content += userImageInstruction;
    }
  }

  let systemPrompt = ONI_SYSTEM_PROMPT + "\n\n" + ONI_QUALITY_RULES;
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
        timeoutMs: 4000,
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
      // Groq with dynamic token safety cap
      let groqMaxTokens = Math.min(GROQ_MAX_TOKENS, 6000);
      if (primaryModel.includes("8b") || primaryModel.includes("instant")) {
        groqMaxTokens = 2000;
      } else if (primaryModel.includes("70b") || primaryModel === GROQ_MODEL) {
        const promptTokensEst = Math.ceil(JSON.stringify(messagesToSend).length / 3.8);
        groqMaxTokens = Math.max(3000, Math.min(6000, 11000 - promptTokensEst));
      }

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

  // ── Classify intent & determine credit cost (non-blocking, best effort) ────
  if (visitorId) {
    try {
      const lastUserMsg = groqMessages.slice().reverse().find((m) => m.role === "user");
      if (lastUserMsg) {
        const hasExistingWebsite = typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0;
        const intent = await classifyIntent(lastUserMsg.content.slice(0, 500), hasExistingWebsite);
        const routeConfig = routeIntent(intent);
        creditCost = routeConfig.creditCost;
        console.log(`[Credits] intent=${intent} cost=${creditCost}`);
      }
    } catch (err) {
      console.error("[Credits] classifier error (non-fatal):", err);
      creditCost = 8;
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
