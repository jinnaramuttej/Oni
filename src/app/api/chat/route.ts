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
import { buildTemplateInjection, buildFullBrandContext } from "@/lib/templates";
import { selectComponents, buildComponentContext } from "@/lib/component-selector";
import { validateGeneratedHtml } from "@/lib/html-validator";

// ── Runtime config ─────────────────────────────────────────────────────────────
// Force Node.js runtime (required for fs/path, Supabase, and long-running streams)
export const runtime = "nodejs";
// Allow up to 5 minutes for long AI generation streams on Vercel Pro
export const maxDuration = 300;

// ── Feature flags ──────────────────────────────────────────────────────────────
// Set USE_COMPONENT_LIBRARY=true in .env.local to inject oni-components/ snippets
// into the system prompt. Default false → pipeline unchanged.
const USE_COMPONENT_LIBRARY = process.env.USE_COMPONENT_LIBRARY === "true";

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
const IS_LOCAL_DEV = process.env.NODE_ENV === "development";
const USE_THREE_STAGE_PIPELINE = process.env.USE_THREE_STAGE_PIPELINE === "true";

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
const ONI_CSS_PROMPT = `You are a pure CSS code generator API. Given a website design plan, write ONLY the complete CSS stylesheet.

CRITICAL INSTRUCTIONS:
- You must NOT write any introductory text, chat responses, thought process, planning, checklists, or explanations.
- Do NOT wrap your output in markdown code blocks (such as \`\`\`css ... \`\`\`).
- Start your response immediately with the first character of the CSS code (e.g., @import).
- Output ONLY raw CSS — no HTML, no <style> tags, no JavaScript.

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
- Target: 700-900 lines of CSS`;

// Stage 3: HTML body + JS generation (uses class names from Stage 2 CSS)
const ONI_HTML_BODY_PROMPT = `You are a pure HTML and JavaScript code generator API. Given a website design plan and the CSS already written, write the complete HTML body markup and JavaScript.

CRITICAL INSTRUCTIONS:
- You must NOT write any introductory text, chat responses, thought process, planning, checklists, or explanations.
- Do NOT wrap your output in markdown code blocks (such as \`\`\`html ... \`\`\`).
- Start your response immediately with the first character of the HTML code (i.e., <body>).
- Output ONLY raw HTML and JavaScript — no <html>, no <head>, no <style> tags.

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
- Output ONLY: <body>...</body> with the inline <script> inside.`;

// Legacy prompt details removed`;

const ONI_SYSTEM_PROMPT = `You are Oni, an elite AI website designer and builder. You produce complete, production-ready single-file HTML websites that look like they cost $10,000 to build.

For EVERY response, output your planning inside <ONI_THOUGHT>...</ONI_THOUGHT> tags first, then ONE short sentence intro, then the complete website inside <ONI_CODE>...</ONI_CODE>.

━━━ CONVERSATIONAL MODE ━━━
Casual messages, greetings, or non-build questions → reply in 1–2 sentences, no code.

━━━ BUILD MODE (triggered by any request to build/create/make/design a website) ━━━

STEP 1 — Output <ONI_THOUGHT> block with this exact structure:
PALETTE: [palette name] | #hex1, #hex2, #hex3, #hex4, #hex5
FONTS: [display font] | [body font] | [why they match the brand]
SIGNATURE: [the single most unique interactive element or layout trick]
LAYOUT: [overall layout strategy in one sentence]
SECTIONS: navbar, hero, about, menu/services, testimonials, contact, footer

STEP 2 — ONE short sentence (e.g. "Here's your Mirchi Dhaba website.")

STEP 3 — Complete website inside <ONI_CODE>...</ONI_CODE>

━━━ MANDATORY OUTPUT REQUIREMENTS ━━━

SECTIONS — All 7 are REQUIRED. Missing even one is a failure:
  1. navbar      — fixed, glassmorphism blur on scroll, logo, nav links, CTA button
  2. hero        — 100vh minimum, background image with parallax/zoom, H1 ≥80px, eyebrow text, 2 CTAs
  3. about/story — 2-column split layout, story copy, key stats or year established
  4. menu/services — tabbed or grid layout, minimum 9 items across 3 categories, real prices
  5. testimonials — 3 customer quotes with real names, star ratings, avatar initials
  6. contact     — split layout: info panel left + reservation/contact form right, working modal
  7. footer      — 4-column grid, links, copyright, social icons

CSS REQUIREMENTS (minimum 700 lines):
  - :root with all CSS custom properties (10+ variables)
  - Complete reset and base typography
  - Every section fully styled with hover effects
  - 5+ @keyframes animations (fadeUp, parallax zoom, float, shimmer, reveal)
  - IntersectionObserver .reveal / .reveal.in scroll animations
  - Glassmorphism navbar that shrinks on scroll
  - Working tabbed menu panel with JS toggle
  - Reservation modal overlay with form and open/close animation
  - Full @media (max-width: 768px) mobile responsive block
  - Dark mode premium aesthetic — rich backgrounds, accent colors, fine typography

HTML REQUIREMENTS (minimum 300 lines):
  - All 7 sections with full real content (NO placeholders, NO lorem ipsum)
  - Real business name used everywhere
  - Real menu items with actual prices in local currency
  - Real testimonial names and quotes
  - Real address, phone, hours in contact section
  - All buttons and CTAs wired to JS functions
  - ONE <script> block with: navbar scroll shrink, IntersectionObserver for reveals, tab switching, modal open/close, form submit toast

DESIGN QUALITY BAR:
  - Dramatic display typography: serif for headings, clean sans for body
  - Rich color palette matching the business type — no generic grays
  - CSS animations on page load (staggered fadeUp delays)
  - Hover micro-interactions on every card, link, and button
  - Background images from Unsplash (embed full URL, no API key needed)
  - Parallax or zoom effect on hero background
  - Accent color dividers and decorative lines
  - Smooth scroll, smooth modal transitions

STRICT RULES:
  - Single HTML file — ALL CSS in <style>, ALL JS in <script>
  - @import Google Fonts MUST be placed INSIDE the <style> block, as the very first line. Never place @import outside of <style> or raw in the <head>.
  - NO Tailwind, NO Bootstrap, NO external CSS frameworks. NEVER use Bootstrap-style utility classes (container, row, column, one_half, one_fourth, btn, btn-primary, etc.) unless you define them yourself in the <style> block. There is no external CSS framework loaded.
  - NO <link rel="stylesheet">, NO <script src="..."> for external files
  - NEVER use Font Awesome icon classes (fa, fas, far, fab) unless you include the Font Awesome CDN link in <head>. Prefer inline SVG icons or Unicode/emoji symbols instead — simpler and guaranteed to render.
  - NEVER use source.unsplash.com — this service is discontinued and all URLs return broken images. ONLY use images.unsplash.com with a real photo ID (e.g. https://images.unsplash.com/photo-XXXXXXXXXXXXX?w=800&q=80) or a similar working image CDN.
  - NO markdown code fences inside <ONI_CODE>
  - NO mention of Oni or AI in the output HTML
  - ALWAYS wrap the complete HTML in <ONI_CODE>...</ONI_CODE>
  - NEVER stop generating mid-HTML — complete the full </html> closing tag`;

const ONI_QUALITY_RULES = ``;


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
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        // Disable Vercel/nginx proxy buffering so chunks stream immediately
        "X-Accel-Buffering": "no",
      },
    }
  );
}

function prepareMessagesForGroq(
  messages: GroqMessage[],
  currentHtml: string,
  intent: Intent
): { messages: GroqMessage[]; maxTokens: number; isConversational: boolean } {
  // Trim the conversation history to only the last 6 messages to prevent context overflow
  const trimmedMessages = messages.slice(-6);

  const systemTokens = estimateTokens(ONI_SYSTEM_PROMPT + "\n\n" + ONI_QUALITY_RULES);
  const maxPromptTokensBudget = 40000; // Increased budget to allow full website context (e.g. up to 120k chars)
  const remainingBudget = maxPromptTokensBudget - systemTokens;

  // Process historical messages (everything except the last one), keeping them extremely compact
  const history = trimmedMessages.slice(0, -1).map((m) => ({
    role: m.role,
    content:
      m.role === "assistant"
        ? truncateContent(stripOniBlocks(m.content) || "[Generated website]", 1200)
        : truncateContent(m.content, 1200),
  }));

  const lastMessage = trimmedMessages[trimmedMessages.length - 1];
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

  const isConversational = intent === "casual_chat";
  const isNewOrRedesign = intent === "build_request";

  let finalLastContent = lastContentTruncated;
  if (currentHtml && lastMessage.role === "user") {
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
      
      const isTemplateRequest = isNewOrRedesign && lastContentRaw.toLowerCase().includes("website with these exact design notes");
      
      if (isTemplateRequest) {
        finalLastContent = `User request: ${lastContentTruncated}\n\nThe user wants to build a customized version of the premium template below.\n\nCRITICAL TEMPLATE CUSTOMIZATION RULES:\n1. Use the template HTML below as your exact starting codebase.\n2. Do NOT write a new site from scratch. Modify the text content, colors, images, and layout elements ONLY as requested by the user, while fully retaining the premium CSS styles, grid structures, custom fonts, animations, and JS interactions already present in this template.\n3. Keep the overall look and feel of the original template unless explicitly asked to modify it.\n4. You MUST output the complete modified code inside <ONI_CODE>...</ONI_CODE> tags.\n\n<TEMPLATE_BASE_HTML>\n${slicedHtml}\n</TEMPLATE_BASE_HTML>`;
      } else {
        finalLastContent = `User request: ${lastContentTruncated}\n\nThe user is requesting an update, modification, or style change to the existing website below.\n\nCRITICAL EDIT & PRESERVATION RULES:\n1. Do NOT redesign or recreate the entire website from scratch. Do NOT change layout or style patterns unless requested by the user.\n2. Maintain and preserve the existing layout, CSS styles, colors, custom fonts, sections, content, and JavaScript functionality exactly as they are, EXCEPT for the specific changes requested by the user.\n3. Only modify, add, remove, or restyle the specific code/sections required to fulfill the user's request. Keep the rest of the HTML structure, CSS rules, and JavaScript code completely intact and unchanged.\n4. If the current HTML is simple, basic, or unstyled (e.g. initial template setup), you may upgrade the design as needed. However, if the current HTML is already a fully styled website, you MUST respect and preserve the original design theme and code.\n5. You MUST output the COMPLETE modified website HTML file inside <ONI_CODE>...</ONI_CODE> tags. Do not write explanations, chat tutorials, or markdown code blocks outside of <ONI_CODE>. Only write exactly one sentence before the code block.\n\n<CURRENT_HTML>\n${slicedHtml}\n</CURRENT_HTML>`;
      }
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
    maxTokens: 16000, // Always use full token budget — truncation handled by auto-continuation
    isConversational,
  };
}

function getSystemPromptWithContext(promptText: string, maxContextChars = 30000): string {
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

    console.log(`[Oni Context] Loaded ${totalChars} chars of context from ${numFiles} files (budget: ${maxContextChars} chars).`);
  } catch (err) {
    console.error("Error loading design context from workspace:", err);
  }

  return (ONI_SYSTEM_PROMPT + "\n\n" + ONI_QUALITY_RULES) + contextText;
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

function extractFontLinks(cssCode: string): { fontLinks: string; cleanedCss: string } {
  let cleanedCss = cssCode;
  const links: string[] = [];
  const importRegex = new RegExp("@import\\s+(?:url\\(['\"]?([^'\"]+)['\"]?\\)|['\"]([^'\"]+)['\"]\\);?", "gi");
  let match;
  while ((match = importRegex.exec(cssCode)) !== null) {
    const url = match[1] || match[2];
    if (url) {
      links.push(`<link rel="stylesheet" href="${url}">`);
    }
  }
  cleanedCss = cleanedCss.replace(importRegex, "").trim();
  return {
    fontLinks: links.join("\n  "),
    cleanedCss
  };
}

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

  // Check for exact template prompts to bypass AI generation and stream the template directly
  const userPromptTextForBypass = body.prompt || "";
  if (userPromptTextForBypass) {
    const cleanUser = userPromptTextForBypass.trim().replace(/\r\n/g, "\n");
    const templatesMapping = [
      { key: "velara", html: VELARA_SAMPLE_HTML, name: "Velara Retreat" },
      { key: "vox", html: VOX_SAMPLE_HTML, name: "Vox Restaurant" },
      { key: "moehr", html: MOEHR_SAMPLE_HTML, name: "Moehr Atelier" },
      { key: "maisonDore", html: MAISON_DORE_SAMPLE_HTML, name: "Maison Dore" },
      { key: "ameCoffee", html: AME_COFFEE_SAMPLE_HTML, name: "Âme Coffee Atelier" },
    ];
    
    const cleanTemplatePrompt = (rawPrompt: string): string => {
      if (!rawPrompt) return "";
      const lines = rawPrompt.split("\n");
      if (lines.length > 0 && lines[0].toUpperCase().startsWith("TEMPLATE:")) {
        return lines.slice(1).join("\n").trim();
      }
      return rawPrompt.trim();
    };

    for (const item of templatesMapping) {
      const rawPrompt = TEMPLATE_PROMPTS[item.key as keyof typeof TEMPLATE_PROMPTS];
      if (rawPrompt) {
        const cleanTemplate = cleanTemplatePrompt(rawPrompt).trim().replace(/\r\n/g, "\n");
        const normUser = cleanUser.toLowerCase().replace(/\s+/g, " ");
        const normTemplate = cleanTemplate.toLowerCase().replace(/\s+/g, " ");
        if (normUser === normTemplate) {
          console.log(`[Templates] Exact match for template prompt: ${item.name}. Bypassing AI pipeline.`);
          const sseResponse = `Here's your website, ${item.name}.\n\n<ONI_CODE>\n${item.html}\n</ONI_CODE>`;
          return streamTextAsSse(sseResponse);
        }
      }
    }
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
  let intent: Intent = "build_request";
  if (lastUserMsgText) {
    try {
      const rawMessages = body.messages ? body.messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })) : [];
      const classification = await classifyIntent(lastUserMsgText, rawMessages);
      intent = classification.intent;
      const routeConfig = routeIntent(intent);
      creditCost = routeConfig.creditCost;
      console.log(`[Credits] intent=${intent} cost=${creditCost}`);
    } catch (err) {
      console.error("[Credits] classifier error:", err);
      creditCost = 8;
      // Fallback detection if classifier fails
      const cleanLower = lastUserMsgText.toLowerCase();
      if (cleanLower.includes("hi") || cleanLower.includes("hello") || cleanLower.includes("hey") || cleanLower.includes("explain")) {
        intent = "casual_chat";
      }
    }
  }

  const isNewOrRedesign = intent === "build_request";
  let effectiveHtml = (!isNewOrRedesign && typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0)
    ? body.currentHtml.slice(0, 80000)
    : "";

  // If starting a new website or redesign, and the prompt matches a template, pre-seed effectiveHtml
  // ── DIAGNOSTIC LOG: pre-seed check ──────────────────────────────────────────
  console.log(`[DIAG][pre-seed] isNewOrRedesign=${isNewOrRedesign}, effectiveHtmlLen=${effectiveHtml.trim().length}, prompt="${lastUserMsgText?.slice(0, 80)}"`)
  
  let templateReferencePromptSection = "";
  
  if (isNewOrRedesign && (!effectiveHtml || effectiveHtml.trim().length === 0) && lastUserMsgText) {
    const matchingTemplate = getMatchingTemplateHtml(lastUserMsgText);
    if (matchingTemplate) {
      // FIX 1: For new builds, do NOT pre-seed effectiveHtml with the full template.
      // Instead, extract a reference snippet under 3000 chars and append it to templateReferencePromptSection.
      const snippet = getCompactHtml(matchingTemplate.html).slice(0, 2800);
      templateReferencePromptSection = `\n\n<TEMPLATE_SAMPLE_CODE>\n${snippet}\n... [Truncated for reference] ...\n</TEMPLATE_SAMPLE_CODE>\n\nINSTRUCTIONS FOR TEMPLATE ADAPTATION & COMPONENT EXTRACTION (style reference only, do not copy verbatim):
1. You have access to a premium template sample above ("${matchingTemplate.name}") that matches the user's business type.
2. Analyze the grid structures, CSS classes, interactive JS logic, and section styles in this template.
3. Use this purely as a structural and style reference; do not copy it verbatim. Customize it uniquely for the user!`;
      console.log(`[DIAG][pre-seed] ✅ NEW BUILD TEMPLATE Snippet Generated (Name: "${matchingTemplate.name}") - Bypassing full pre-seed`);
    } else {
      console.log(`[DIAG][pre-seed] ❌ NOT FIRED — getMatchingTemplateHtml returned null for prompt`);
    }
  } else if (!isNewOrRedesign && typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0) {
    // Keep existing edit flows untouched: effectiveHtml remains populated from genuine currentHtml
    console.log(`[DIAG][pre-seed] ⏭ SKIPPED — Genuine edit flow detected. Keeping effectiveHtml intact.`);
  } else {
    console.log(`[DIAG][pre-seed] ⏭ SKIPPED — conditions not met (isNewOrRedesign=${isNewOrRedesign}, existingHtmlLen=${effectiveHtml.trim().length})`);
  }

  if (isNewOrRedesign && typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0 && !getMatchingTemplateHtml(lastUserMsgText)) {
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

  const lastUserMsg = groqMessages.slice().reverse().find((m) => m.role === "user");
  if (lastUserMsg && intent !== "casual_chat") {
    lastUserMsg.content += `\n\nCRITICAL FORMATTING REQUIREMENT:\n- You MUST wrap the entire complete website HTML (including all CSS in <style> and all JS in <script>) inside <ONI_CODE>...</ONI_CODE> tags.\n- Do NOT output separate HTML, CSS, or JS code blocks.\n- Do NOT write notes like "This is a basic template" or "customize it as per your requirements". You MUST build the complete, fully styled premium website with real content and copy inside the <ONI_CODE> block.`;
  }

  if (body.userImage && typeof body.userImage === "string" && body.userImage.trim().length > 0) {
    const lastUserMsgIndex = groqMessages.reduce((acc, msg, idx) => msg.role === "user" ? idx : acc, -1);
    if (lastUserMsgIndex !== -1) {
      const userImageInstruction = `\n\nThe user has uploaded an image to use in the website. Use this exact base64 string as the src for the hero background or main image:\n<img src="${body.userImage}" style="width:100%;height:100%;object-fit:cover">\nor as CSS: background-image: url('${body.userImage}');`;
      groqMessages[lastUserMsgIndex].content += userImageInstruction;
    }
  }

  const getIndustryFromPrompt = (promptText: string): string => {
    const clean = promptText.toLowerCase();
    if (clean.includes("coffee") || clean.includes("cafe") || clean.includes("restaurant") || clean.includes("food") || clean.includes("bistro") || clean.includes("steak") || clean.includes("dining") || clean.includes("bakery") || clean.includes("kitchen")) {
      return "restaurant";
    }
    if (clean.includes("salon") || clean.includes("beauty") || clean.includes("hair") || clean.includes("spa") || clean.includes("stylist") || clean.includes("makeup") || clean.includes("cosmetic")) {
      return "salon";
    }
    if (clean.includes("medical") || clean.includes("clinic") || clean.includes("hospital") || clean.includes("dentist") || clean.includes("doctor") || clean.includes("health")) {
      return "medical";
    }
    if (clean.includes("fitness") || clean.includes("gym") || clean.includes("workout") || clean.includes("trainer") || clean.includes("coach") || clean.includes("athlete")) {
      return "fitness";
    }
    if (clean.includes("saas") || clean.includes("tech") || clean.includes("software") || clean.includes("dashboard") || clean.includes("app") || clean.includes("startup")) {
      return "saas";
    }
    if (clean.includes("legal") || clean.includes("lawyer") || clean.includes("law") || clean.includes("attorney") || clean.includes("firm")) {
      return "legal";
    }
    if (clean.includes("education") || clean.includes("school") || clean.includes("university") || clean.includes("college") || clean.includes("course") || clean.includes("academy") || clean.includes("learn")) {
      return "education";
    }
    if (clean.includes("portfolio") || clean.includes("design") || clean.includes("creative") || clean.includes("architecture") || clean.includes("developer") || clean.includes("resume") || clean.includes("cv")) {
      return "portfolio";
    }
    return "general";
  };

  const userPromptText = body.prompt || "";
  const industry = body.industry || getIndustryFromPrompt(userPromptText || lastUserMsgText);
  const brandAnswers = body.brandAnswers || null;
  const templateInjection = buildTemplateInjection(industry as any, brandAnswers);

  // ── Component-library injection (feature-flagged) ─────────────────────────
  // ── DIAGNOSTIC LOG: component-library flag ───────────────────────────────
  console.log(`[DIAG][component-lib] USE_COMPONENT_LIBRARY=${USE_COMPONENT_LIBRARY} (env value: "${process.env.USE_COMPONENT_LIBRARY}")`);
  let componentContext = "";
  if (USE_COMPONENT_LIBRARY) {
    try {
      const compResult = selectComponents({
        industry,
        originalPrompt: lastUserMsgText,
        brandAnswers,
      });
      componentContext = buildComponentContext(compResult);
      // ── DIAGNOSTIC: log each selected file + score ──────────────────────
      console.log(`[DIAG][component-lib] ✅ ON — ${compResult.components.length} sections selected:`);
      compResult.components.forEach((r: { filename: string; score: number; section: string }) => {
        console.log(`  • [score=${r.score}] ${r.section} → ${r.filename}`);
      });
      console.log(`[DIAG][component-lib] componentContext total length: ${componentContext.length} chars`);
      console.log("[component-library] injected context, length:", componentContext.length);
    } catch (e) {
      console.error("[component-library] failed, falling back to prompt-only:", e);
      console.log(`[DIAG][component-lib] ❌ THREW ERROR — ${e}`);
    }
  } else {
    console.log(`[DIAG][component-lib] ❌ OFF — USE_COMPONENT_LIBRARY is false → component-selector.ts NOT called, componentContext=""`);
  }

  let systemPrompt =
    ONI_SYSTEM_PROMPT +
    "\n\n" + templateInjection +
    "\n\n" + componentContext +
    "\n\n" + ONI_QUALITY_RULES +
    "\n\n" + PREMIUM_COMPONENTS_REFERENCE +
    templateReferencePromptSection;

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
  const isBuildIntent = (intent === "build_request" || isLikelyBuildRequest(lastUserMsgText)) && !getMatchingTemplateHtml(lastUserMsgText);
  const groqKey = process.env.GROQ_API_KEY?.trim() || "";

  let threeStageSuccess = false;
  let finalResponse = "";
  let successStream: ReadableStream | null = null;
  let finalUsedModel = "";

  if (USE_THREE_STAGE_PIPELINE && isBuildIntent && !useFallbackPool) {
    console.log("[DIAG][3-stage] Build request detected. Running 3-stage pipeline...");
    const threeStageStart = Date.now();

    // Helper: execute stage using the same MODEL_CHAIN targets
    const executeStage = async (
      messages: any[],
      maxTokens: number,
      stageName: string
    ): Promise<{ text: string; modelUsed: string }> => {
      const errorsList: string[] = [];
      
      // Filter out skipped targets (like Groq when prompt is too large)
      for (const target of MODEL_CHAIN) {
        const targetName = target.isOllama ? "ollama" : target.url.includes("groq") ? "groq" : "openrouter";
        if (!target.isOllama && !target.key) {
          continue;
        }

        console.log(`[DIAG][3-stage] Stage: "${stageName}" — Trying target: ${targetName}/${target.model} (timeout: ${target.timeoutMs}ms)`);
        
        try {
          const headers: Record<string, string> = { "Content-Type": "application/json" };
          if (target.key && !target.isOllama) {
            headers["Authorization"] = `Bearer ${target.key}`;
          }
          if (target.url.includes("openrouter.ai")) {
            headers["HTTP-Referer"] = "https://oni.build";
            headers["X-Title"] = "Oni Website Builder";
          }

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), target.timeoutMs);

          const res = await fetch(target.url, {
            method: "POST",
            headers,
            body: JSON.stringify({
              model: target.model,
              messages,
              stream: true, // Use streaming internally to parse tokens in real time or read complete content
              max_tokens: maxTokens,
              temperature: 0.7
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (!res.ok) {
            const errTxt = await res.text().catch(() => "");
            throw new Error(`Status ${res.status}: ${errTxt}`);
          }

          if (!res.body) {
            throw new Error("Response body is null");
          }

          // Consume stream and collect full text
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let accumulatedText = "";
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;

              if (target.isOllama && !trimmed.startsWith("data: ")) {
                try {
                  const parsed = JSON.parse(trimmed);
                  const content = parsed.message?.content || "";
                  if (content) accumulatedText += content;
                } catch { /* skip */ }
              } else if (trimmed.startsWith("data: ")) {
                const dataPayload = trimmed.slice(6).trim();
                if (dataPayload === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(dataPayload);
                  const content = parsed.choices?.[0]?.delta?.content || "";
                  if (content) accumulatedText += content;
                } catch { /* skip */ }
              }
            }
          }

          const cleanedText = accumulatedText.trim();
          if (cleanedText) {
            console.log(`[DIAG][3-stage] Stage: "${stageName}" ✅ SUCCESS using ${targetName}/${target.model} (${cleanedText.length} chars)`);
            return { text: cleanedText, modelUsed: `${targetName}/${target.model}` };
          } else {
            throw new Error("Empty text returned from stream collection");
          }
        } catch (err: any) {
          console.warn(`[DIAG][3-stage] Stage: "${stageName}" ❌ FAILED target ${targetName}/${target.model}:`, err.message);
          errorsList.push(`${targetName}/${target.model}: ${err.message}`);
        }
      }

      throw new Error(`All fallback targets failed for stage "${stageName}". Errors: ${errorsList.join("; ")}`);
    };

    try {
      const brandContextStr = buildFullBrandContext(brandAnswers);
      const userMessageContent = `${brandContextStr}\n\nUSER REQUEST: ${lastUserMsgText || "Build a premium website."}`;

      // Get matching template reference for CSS/HTML guidance
      const matchingTemplate = getMatchingTemplateHtml(lastUserMsgText);
      let templateRef = "";
      if (matchingTemplate !== null) {
        const templateVal = matchingTemplate as { name: string; html: string };
        templateRef = `\n\n<TEMPLATE_REFERENCE name="${templateVal.name}">\n${getCompactHtml(templateVal.html)}\n</TEMPLATE_REFERENCE>\n\nStudy the class names, grid structures, and component patterns in this template. Reuse and adapt them (not copy-paste) to match the design plan.`;
      }

      // ── STAGE 1: Planning Call ───────────────────────────────────────────────
      const stage1Result = await executeStage([
        { role: "system", content: ONI_PLANNING_PROMPT },
        { role: "user", content: userMessageContent }
      ], 500, "Stage 1 — Planning");

      const planText = stage1Result.text;
      const thoughtMatch = planText ? planText.match(/<ONI_THOUGHT>([\s\S]*?)<\/ONI_THOUGHT>/i) : null;
      const parsedThought = thoughtMatch ? thoughtMatch[0] : `<ONI_THOUGHT>\n${planText || ""}\n</ONI_THOUGHT>`;

      // ── STAGE 2: CSS Generation Call ─────────────────────────────────────────
      const stage2Result = await executeStage([
        { role: "system", content: ONI_CSS_PROMPT + templateRef },
        { role: "user", content: `DESIGN PLAN:\n${parsedThought}\n\nUSER REQUEST: ${lastUserMsgText}\n\nWrite the complete CSS stylesheet now. Start with @import. Output raw CSS only. Do NOT write any conversational text, explanations, or thought process. Start immediately with the first CSS selector or @import.` }
      ], 8000, "Stage 2 — CSS Style Sheet");

      const rawCss = stage2Result.text;

      // ── STAGE 3: HTML+JS Generation Call ─────────────────────────────────────
      const stage3Result = await executeStage([
        { role: "system", content: ONI_HTML_BODY_PROMPT + templateRef },
        {
          role: "user",
          content: `DESIGN PLAN:\n${parsedThought}\n\nUSER REQUEST: ${lastUserMsgText}\n\nCSS CLASSES ALREADY DEFINED (use EXACTLY these class names):\n${rawCss.slice(0, 4000)}\n\nNow write the complete <body>...</body> with all 7 sections and the inline <script>. Start with <body>. Do NOT write any conversational text, explanations, or thought process. Start immediately with the <body> tag.`,
        }
      ], 8000, "Stage 3 — HTML Body + Script");

      const rawHtmlJs = stage3Result.text;

      // ── FINAL ASSEMBLY ───────────────────────────────────────────────────────
      const { fontLinks, cleanedCss } = extractFontLinks(rawCss);
      let htmlContent = rawHtmlJs.replace(/^```[\w]*\n?/gm, "").replace(/^```$/gm, "").trim();

      const assembledHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${fontLinks}
  <style>
    ${cleanedCss}
  </style>
</head>
${htmlContent}
</html>`;

      finalResponse = `${planText}\n\n<ONI_CODE>\n${assembledHtml}\n</ONI_CODE>`;
      threeStageSuccess = true;
      
      const totalDuration = Date.now() - threeStageStart;
      console.log(`[DIAG][3-stage] ✅ Pipeline successfully finished. Total Merge Time: ${totalDuration}ms`);
      console.log(`[DIAG][3-stage] Output Lengths: Plan=${planText.length} chars, CSS=${rawCss.length} chars, HTML/JS=${rawHtmlJs.length} chars. Total Assembled HTML=${assembledHtml.length} chars.`);

      // Setup successStream as a stream of the fully assembled response to pass it to the validator block
      const encoder = new TextEncoder();
      successStream = new ReadableStream({
        start(controller) {
          // Stream the assembled response chunk-by-chunk to emulate LLM stream
          const sseLine = `data: ${JSON.stringify({
            choices: [{ delta: { content: finalResponse } }],
          })}\n\n`;
          controller.enqueue(encoder.encode(sseLine));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      });
      finalUsedModel = `3-stage-pipeline (${stage1Result.modelUsed} -> ${stage2Result.modelUsed} -> ${stage3Result.modelUsed})`;
    } catch (err: any) {
      console.warn("[DIAG][3-stage] ❌ 3-stage pipeline failed or timed out. Falling back to single-shot flow:", err.message);
    }
  }


  // ── Build Unified Cascading Fallback Retries Pipeline ─────────────────────────
  const isLocal = process.env.NODE_ENV === 'development' || process.env.USE_LOCAL_MODEL === 'true';

  // FIX 2: Estimate token size (4 characters ~ 1 token rule-of-thumb)
  const totalMessageChars = messagesToSend.reduce((acc, m) => acc + (m.content || "").length, 0);
  const estimatedTokens = Math.ceil(totalMessageChars / 4.0);
  console.log(`[DIAG][Token-Estimate] Total message characters: ${totalMessageChars}, Estimated tokens: ${estimatedTokens}`);

  const skipGroqDueToSize = estimatedTokens > 10000;
  if (skipGroqDueToSize) {
    console.log(`[DIAG][Token-Estimate] ⚠️ SKIPPING Groq due to token limit (estimated: ${estimatedTokens} > 10000 limit) to prevent 413 error`);
  }

  const MODEL_CHAIN = [
    ...(isLocal ? [{
      url: OLLAMA_CHAT_URL,  // http://127.0.0.1:11434/v1/chat/completions
      key: null,
      model: OLLAMA_MODEL,   // qwen2.5-coder from env
      max_tokens: 16000,
      isOllama: true,
      timeoutMs: 90000       // FIX 3: Increased Ollama-specific timeout to 90 seconds
    }] : []),
    ...(!skipGroqDueToSize ? [{
      url: "https://api.groq.com/openai/v1/chat/completions",
      key: process.env.GROQ_API_KEY?.trim(),
      model: "llama-3.3-70b-versatile",
      max_tokens: 16000,
      timeoutMs: 15000
    }] : []),
    {
      url: "https://openrouter.ai/api/v1/chat/completions",
      key: process.env.OPENROUTER_API_KEY?.trim(),
      model: "deepseek/deepseek-chat",
      max_tokens: 16000,
      timeoutMs: 30000
    }
  ];

  const errorsList: string[] = [];

  for (const target of MODEL_CHAIN) {
    const targetName = target.isOllama ? "ollama" : target.url.includes("groq") ? "groq" : "openrouter";

    // If key is needed but missing/empty, skip
    if (!target.isOllama && !target.key) {
      const skipMsg = `[Pipeline] Skipping ${targetName} because API key is missing.`;
      console.warn(skipMsg);
      errorsList.push(`${targetName}: Skipped (API key is missing)`);
      continue;
    }

    console.log(`[Pipeline] Trying model: ${targetName}/${target.model} at ${target.url} (timeout: ${target.timeoutMs}ms)...`);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (target.key && !target.isOllama) {
        headers["Authorization"] = `Bearer ${target.key}`;
      }

      if (target.url.includes("openrouter.ai")) {
        headers["HTTP-Referer"] = "https://oni.build";
        headers["X-Title"] = "Oni Website Builder";
      }

      const requestBody = target.isOllama
        ? JSON.stringify({
            model: target.model,
            messages: messagesToSend, // Use normal messages with role/content objects
            stream: true,
            max_tokens: 16000,
          })
        : JSON.stringify({
            model: target.model,
            messages: messagesToSend,
            temperature: 0.7,
            max_tokens: target.max_tokens,
            stream: true,
          });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), target.timeoutMs);

      const response = await fetch(target.url, {
        method: "POST",
        headers,
        body: requestBody,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(`Status ${response.status}: ${errorText}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      if (target.isOllama) {
        // Handle Ollama native stream format and transform to OpenAI compatible format
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();

        successStream = new ReadableStream({
          async start(controller) {
            let buffer = "";
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  let trimmed = line.trim();
                  if (!trimmed) continue;
                  
                  // If the stream is already in OpenAI/SSE format (e.g. starting with "data: "), strip the prefix.
                  if (trimmed.startsWith("data: ")) {
                    const dataPayload = trimmed.slice(6).trim();
                    if (dataPayload === "[DONE]") {
                      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                      continue;
                    }
                    try {
                      const parsed = JSON.parse(dataPayload);
                      const content = parsed.choices?.[0]?.delta?.content || "";
                      if (content) {
                        const sseLine = `data: ${JSON.stringify({
                          choices: [{ delta: { content } }],
                        })}\n\n`;
                        controller.enqueue(encoder.encode(sseLine));
                      }
                    } catch (e) {
                      console.error("Error parsing OpenAI-style Ollama line:", e);
                    }
                    continue;
                  }

                  try {
                    const parsed = JSON.parse(trimmed);
                    const content = parsed.message?.content || "";
                    if (content) {
                      const sseLine = `data: ${JSON.stringify({
                        choices: [{ delta: { content } }],
                      })}\n\n`;
                      controller.enqueue(encoder.encode(sseLine));
                    }
                    if (parsed.done) {
                      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    }
                  } catch (e) {
                    console.error("Error parsing Ollama line:", e);
                  }
                }
              }
            } catch (err) {
              controller.error(err);
            } finally {
              controller.close();
            }
          }
        });
      } else {
        successStream = response.body;
      }

      finalUsedModel = `${targetName}/${target.model}`;
      break;
    } catch (err: any) {
      const errMsg = err.message || err;
      console.warn(`[Pipeline] Failed ${targetName}/${target.model}:`, errMsg);
      errorsList.push(`${targetName}/${target.model}: ${errMsg}`);
    }
  }

  if (!successStream) {
    return new NextResponse(`All available API pipeline fallback targets failed. Please verify your internet or local connection and settings.\n\nDiagnostics:\n${errorsList.join("\n")}`, { status: 500 });
  }

  console.log(`Using: ${finalUsedModel}`);

  // ── Post-generation HTML validator ────────────────────────────────────────────
  // Only validate build requests (not casual chat). Collects the full stream,
  // extracts ONI_CODE HTML, runs structural checks, retries once if broken.
  const shouldValidate = intent !== "casual_chat";

  if (shouldValidate) {
    // Helper: collect a ReadableStream of SSE data into a single string
    async function collectSseStream(stream: ReadableStream): Promise<string> {
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          // Parse SSE lines to extract delta.content
          for (const line of chunk.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ") || trimmed === "data: [DONE]") continue;
            try {
              const parsed = JSON.parse(trimmed.slice(6));
              const content = parsed?.choices?.[0]?.delta?.content;
              if (content) fullText += content;
            } catch { /* skip unparseable lines */ }
          }
        }
      } catch (err) {
        console.warn("[DIAG][validator] stream collection error:", err);
      } finally {
        reader.releaseLock();
      }
      return fullText;
    }

    const fullResponse = await collectSseStream(successStream);
    const oniCodeMatch = fullResponse.match(/<ONI_CODE>([\s\S]*?)<\/ONI_CODE>/);
    const extractedHtml = oniCodeMatch?.[1]?.trim() ?? "";

    if (extractedHtml) {
      const validation = validateGeneratedHtml(extractedHtml);
      if (validation.valid) {
        console.log(`[DIAG][validator] ✅ PASS — HTML is clean (${extractedHtml.length} chars)`);
      } else {
        console.warn(`[DIAG][validator] ❌ FAIL — ${validation.issues.length} issue(s) found:`);
        validation.issues.forEach(issue => console.warn(`  • ${issue}`));

        // Retry once with a correction instruction
        console.log("[DIAG][validator] 🔄 Retrying generation with correction prompt...");
        const correctionInstruction = `Your previous output had these structural issues that MUST be fixed:\n${validation.issues.map(i => `- ${i}`).join("\n")}\n\nFix ALL of the above. Requirements:\n- Single self-contained HTML file — all CSS in <style>, all JS in <script>, NO external file refs\n- All image src must be full https:// URLs (use Unsplash: https://images.unsplash.com/photo-... or similar)\n- No duplicate id attributes — every id must be unique across the document\n- All HTML tags must use standard syntax: no CSS selectors in tag names (e.g. <div> not <div.class>)`;
        const retryMessages = [
          ...messagesToSend,
          { role: "assistant", content: fullResponse },
          { role: "user", content: correctionInstruction },
        ];

        let retryStream: ReadableStream | null = null;
        for (const target of MODEL_CHAIN) {
          const targetName = target.isOllama ? "ollama" : target.url.includes("groq") ? "groq" : "openrouter";
          if (!target.isOllama && !target.key) continue;
          try {
            const retryHeaders: Record<string, string> = { "Content-Type": "application/json" };
            if (target.key && !target.isOllama) retryHeaders["Authorization"] = `Bearer ${target.key}`;
            if (target.url.includes("openrouter.ai")) {
              retryHeaders["HTTP-Referer"] = "https://oni.build";
              retryHeaders["X-Title"] = "Oni Website Builder";
            }
            const retryController = new AbortController();
            const retryTimeout = setTimeout(() => retryController.abort(), target.timeoutMs);
            const retryBody = JSON.stringify({
              model: target.model,
              messages: retryMessages,
              temperature: 0.7,
              max_tokens: target.max_tokens,
              stream: true,
            });
            const retryRes = await fetch(target.url, {
              method: "POST",
              headers: retryHeaders,
              body: retryBody,
              signal: retryController.signal,
            });
            clearTimeout(retryTimeout);
            if (!retryRes.ok) {
              const errTxt = await retryRes.text().catch(() => "");
              console.warn(`[DIAG][validator] Retry failed on ${targetName}: ${retryRes.status} ${errTxt.slice(0, 200)}`);
              continue;
            }
            if (!retryRes.body) continue;
            retryStream = retryRes.body;
            console.log(`[DIAG][validator] Retry stream obtained from ${targetName}`);
            break;
          } catch (err: any) {
            console.warn(`[DIAG][validator] Retry exception on ${targetName}:`, err.message);
          }
        }

        if (retryStream) {
          // Collect the retry response and validate it
          const retryFull = await collectSseStream(retryStream);
          const retryHtmlMatch = retryFull.match(/<ONI_CODE>([\s\S]*?)<\/ONI_CODE>/);
          const retryHtml = retryHtmlMatch?.[1]?.trim() ?? "";
          if (retryHtml) {
            const retryValidation = validateGeneratedHtml(retryHtml);
            if (retryValidation.valid) {
              console.log(`[DIAG][validator] ✅ RETRY PASS — fixed HTML is clean`);
            } else {
              console.warn(`[DIAG][validator] ⚠️ RETRY STILL INVALID — returning anyway. Issues:`);
              retryValidation.issues.forEach(issue => console.warn(`  • ${issue}`));
            }
          }
          // Stream the retry response to the client
          const billedGroq = finalUsedModel.startsWith("groq");
          if (visitorId && creditCost > 0 && billedGroq && !body?.customApiKey) {
            void deductCredits(visitorId, creditCost);
          }
          return streamTextAsSse(retryFull);
        } else {
          console.warn("[DIAG][validator] ⚠️ No retry stream available — returning original (invalid) response");
        }
      }
    } else {
      // No ONI_CODE block found — not a build response, skip validation
      console.log("[DIAG][validator] ⏭ Skipping validation — no <ONI_CODE> block in response (chat/casual)");
    }

    // Re-stream the (original or unretried) response
    const billedGroq = finalUsedModel.startsWith("groq");
    if (visitorId && creditCost > 0 && billedGroq && !body?.customApiKey) {
      void deductCredits(visitorId, creditCost);
    }
    return streamTextAsSse(fullResponse);
  }

  // Casual chat path: stream raw SSE directly without validation
  const billedGroq = finalUsedModel.startsWith("groq");
  if (visitorId && creditCost > 0 && billedGroq && !body?.customApiKey) {
    void deductCredits(visitorId, creditCost);
  }

  return new Response(successStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
