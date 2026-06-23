import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { sanitizeText } from "@/lib/auth";

const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_MAX_TOKENS = 11000;
const GROQ_MAX_HISTORY_MESSAGES = 6;
const GROQ_MAX_MESSAGE_CHARS = 4000;
const ONI_SYSTEM_PROMPT = `You are Oni, an elite AI website designer and builder. Every website you generate must be beautiful, production-ready, and worthy of a $50,000 agency.

RESPONSE FORMAT:
- For every response, output your planning inside <ONI_THOUGHT>...</ONI_THOUGHT> first.
- Casual messages: 1-2 natural sentences after the thought block, no code.
- Website requests: one short sentence after the thought block, then complete HTML in <ONI_CODE>...</ONI_CODE>.

FONTS - always import both at the top of <style>:
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&display=swap');

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
  --grad: linear-gradient(135deg, var(--p), var(--s));
  --shadow: 0 10px 40px rgba(0,0,0,0.12);
  --shadow-lg: 0 25px 60px rgba(0,0,0,0.22);
  --r: 16px;
  --t: all 0.3s cubic-bezier(0.4,0,0.2,1);
}

* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; font-size:16px; }
body {
  font-family:'Inter',sans-serif;
  font-weight:300;
  line-height:1.7;
  background:var(--bg);
  color:var(--text);
  overflow-x:hidden;
}

TYPE SCALE - always use:
h1 { font-family:'Playfair Display',serif; font-size:clamp(3.5rem,9vw,7rem); font-weight:900; line-height:1.05; letter-spacing:-0.03em; }
h2 { font-family:'Playfair Display',serif; font-size:clamp(2rem,5vw,3.5rem); font-weight:700; line-height:1.15; }
h3 { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:700; }
p  { font-size:1.05rem; line-height:1.8; color:rgba(255,255,255,0.72); }

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
- Logo: Playfair Display italic, gradient color, 1.6rem.
- Links: Inter 400, rgba(255,255,255,0.7), hover white plus underline ::after.
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
- Each card: 64px gradient icon circle, Playfair H3, 3 sentence paragraph, padding:2.5rem, border-radius:var(--r), box-shadow:var(--shadow), class="reveal".
- Hover: translateY(-14px), shadow-lg, border-color:var(--p), transition:var(--t).

4. SERVICES/MENU/PORTFOLIO - dark background var(--bg)
- 6 items minimum, CSS grid repeat(auto-fit,minmax(280px,1fr)).
- Each item class="glass reveal", padding:2rem, border-radius:var(--r).
- H3 color var(--p), Playfair, 1.3rem.
- Paragraph rgba(255,255,255,0.65), Inter 300, line-height:1.7.
- Price/detail: gradient text, 1.6rem, font-weight:700, margin-top:1rem.
- Hover: border-color using primary at 0.4 alpha, background using primary at 0.08 alpha, translateY(-8px), deep shadow.

5. TESTIMONIALS - light background
- 3 cards, class="reveal", position:relative, overflow:hidden.
- Large decorative quote mark with Playfair, var(--p), opacity:0.12.
- Stars in var(--p), quote in italic Inter 300, author name plus title.
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
    font-family:'Inter',sans-serif;
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
- Never broken image src attributes.
- Never Font Awesome.
- No mention of Oni or AI anywhere in the generated HTML.
- Use tasteful decorative symbols such as stars, diamonds, arrows, checks, and sparkles.

OUTPUT:
- Single complete HTML file, with all CSS in <style> and all JS in <script>.
- Custom CSS only, no Tailwind, no frameworks.
- Minimum 800 lines of HTML/CSS/JS.
- Always wrap the complete website in <ONI_CODE>...</ONI_CODE>.`;

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

function prepareMessagesForGroq(
  messages: GroqMessage[],
  currentHtml: string
): { messages: GroqMessage[]; maxTokens: number } {
  const systemTokens = estimateTokens(ONI_SYSTEM_PROMPT);
  const maxPromptTokensBudget = 6500; // Target prompt size to allow plenty of output space
  const remainingBudget = maxPromptTokensBudget - systemTokens;

  // Process historical messages (everything except the last one), keeping them extremely compact
  const history = messages.slice(0, -1).map((m) => ({
    role: m.role,
    content:
      m.role === "assistant"
        ? truncateContent(stripOniBlocks(m.content) || "[Generated website]", 600)
        : truncateContent(m.content, 600),
  }));

  const lastMessage = messages[messages.length - 1];
  if (!lastMessage) {
    return {
      messages: [],
      maxTokens: Math.max(4000, Math.min(16000, 11000 - systemTokens)),
    };
  }

  // Budget remaining space for the last message
  const historyTokens = estimateTokens(JSON.stringify(history));
  let availableTokensForLastMessage = remainingBudget - historyTokens;
  if (availableTokensForLastMessage < 2000) {
    availableTokensForLastMessage = 2000; // Ensure minimal budget for user query
  }

  const availableChars = Math.floor(availableTokensForLastMessage * 3.0);

  // Reserve up to 3000 chars for the user prompt/attachments
  const lastContentRaw = lastMessage.content;
  const lastContentTruncated = truncateContent(lastContentRaw, Math.min(3000, availableChars));
  const remainingCharsForHtml = Math.max(0, availableChars - lastContentTruncated.length);

  let finalLastContent = lastContentTruncated;
  if (currentHtml && lastMessage.role === "user") {
    if (isConversationalMessage(lastContentTruncated)) {
      finalLastContent = lastContentTruncated;
    } else {
      // Slice currentHtml dynamically based on remaining character budget, capping at 24000 characters
      const htmlSliceLimit = Math.max(2000, Math.min(24000, remainingCharsForHtml - 500));
      const slicedHtml = currentHtml.slice(0, htmlSliceLimit);
      finalLastContent = `User request: ${lastContentTruncated}\n\nThe user might be asking for a change or addition to the existing website below, or they might just be chatting or asking a general question.\n\nIf the request is casual conversation, a greeting, or a question NOT asking to change/modify the website, do NOT output any code. Just reply in 1-2 natural sentences.\n\nOnly if the user is requesting a modification, style change, or update to the website, return the updated FULL HTML file inside <ONI_CODE>...</ONI_CODE> tags.\n\n<CURRENT_HTML>\n${slicedHtml}\n</CURRENT_HTML>`;
    }
  }

  const processedLastMessage = {
    role: lastMessage.role,
    content: finalLastContent,
  };

  const finalMessages = [...history, processedLastMessage];

  // Calculate final total prompt tokens
  const totalPromptTokens = systemTokens + estimateTokens(JSON.stringify(finalMessages));

  // Limit total requested tokens (prompt + output) to 11000 to fit under the 12000 TPM limit
  const calculatedMaxTokens = Math.max(4000, Math.min(16000, 11000 - totalPromptTokens));

  return {
    messages: finalMessages,
    maxTokens: calculatedMaxTokens,
  };
}

export async function POST(req: Request) {
  console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
  console.log('GROQ_API_KEY first 8 chars:', process.env.GROQ_API_KEY?.slice(0, 8));

  const body = await req.json().catch(() => null);
  if (!body) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const currentHtml =
    typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0
      ? body.currentHtml.slice(0, 80000)
      : "";

  let groqMessages: GroqMessage[] = [];
  let maxTokens = 8000;

  if (Array.isArray(body.messages) && body.messages.length > 0) {
    const rawMessages = body.messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));
    const result = prepareMessagesForGroq(rawMessages, currentHtml);
    groqMessages = result.messages;
    maxTokens = result.maxTokens;
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
    maxTokens = result.maxTokens;
  } else {
    return new NextResponse("Bad request", { status: 400 });
  }

  const groqApiKey = process.env.GROQ_API_KEY?.trim();
  if (!groqApiKey) {
    return new NextResponse("GROQ_API_KEY is missing", { status: 500 });
  }

  try {
    const defaultModelInput = body?.defaultModel || "oni-pro";
    let modelToUse = GROQ_MODEL;
    if (defaultModelInput === "oni-flash") {
      modelToUse = "llama-3.1-8b-instant";
    }

    const messagesToSend = [{ role: "system", content: ONI_SYSTEM_PROMPT }, ...groqMessages];
    const requestBody = JSON.stringify({
      model: modelToUse,
      messages: messagesToSend,
      temperature: 0.9,
      max_tokens: maxTokens,
      stream: true,
    });
    console.log('Request body length:', requestBody.length, 'Model used:', modelToUse);

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    if (groqResponse.ok) {
      console.log('Groq request successful, streaming response!');
      return new Response(groqResponse.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const errorBody = await groqResponse.text();
    console.error('Groq error:', {
      status: groqResponse.status,
      statusText: groqResponse.statusText,
      body: errorBody
    });
    return new NextResponse(
      `Groq error ${groqResponse.status} ${groqResponse.statusText}: ${errorBody}`,
      { status: groqResponse.status }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Groq error:', err);
    return new NextResponse(`Groq request failed: ${message}`, { status: 500 });
  }
}
