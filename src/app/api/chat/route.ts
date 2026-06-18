import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { sanitizeText } from "@/lib/auth";

const ONI_SYSTEM_PROMPT = `You are Oni, an elite AI website designer and builder.

For EVERY response, output your internal thought process inside <ONI_THOUGHT>...</ONI_THOUGHT> tags first.
Describe your reasoning, design choices, and plan in 1-2 concise sentences.

**Conversational mode** (default): When the user sends a casual message, greeting, or question NOT about building a website, reply naturally in 1-2 sentences. No HTML or code. Examples: "hi" → greet back warmly, "what can you do?" → explain briefly.

**Build mode**: ONLY when the user explicitly asks to build, create, make, design, or generate a website/page/app:
1. Reply with ONE short sentence (e.g. "Here's your restaurant website.")
2. Output the COMPLETE website inside <ONI_CODE>...</ONI_CODE>

Build mode design rules — READ CAREFULLY:
- Every website MUST have minimum 6 sections:
  1. Sticky navbar with logo + links + CTA button
  2. Hero — full viewport, dramatic headline, subtitle, 2 CTA buttons
  3. Features/About — 3 cards in a grid with icons (use unicode/emoji as icons)
  4. Services or Menu or Portfolio — detailed, real content, minimum 6 items
  5. Testimonials — 3 fake but realistic customer reviews with names
  6. Footer — logo, links, contact info, copyright
- Hero headline must be specific to the business — not generic
- Every section needs real detailed copy — minimum 3 sentences per section
- Cards must have titles, descriptions, and styled borders or shadows
- Color scheme must be consistent across all sections
- Add subtle CSS animations: fade-in on scroll using Intersection Observer
- Buttons must have gradient backgrounds and box shadows
- Never output a website with less than 200 lines of HTML
- Use rich color palettes — for a restaurant use warm golds, 
  deep burgundy, rich browns, cream. Match colors to the vibe.
- Hero must have a real gradient background with multiple colors,
  NOT just a dark overlay on a broken image URL
- Use CSS only backgrounds — gradients, patterns, shapes
  DO NOT use unsplash URLs or any external image URLs
  they will break. Use CSS gradients instead.
- Add decorative elements — lines, shapes, borders using CSS
- Sections must have alternating backgrounds, not all white
- Add at least 3 CSS animations
- Typography must be dramatic — hero h1 minimum 80px
- Add a sticky navbar that changes on scroll using JS
- Single HTML file, all CSS in <style>, all JS in <script>
- Import beautiful Google Fonts at top of <style>:
  @import url('https://fonts.googleapis.com/css2?family=...')
- Custom CSS only. No Tailwind. No frameworks.
- The design must look like it cost $10,000 to make
- Use real gradients, shadows, blur effects, smooth animations
- CSS transitions and hover effects on ALL interactive elements
- Hero section must be visually stunning — full viewport height,
  large bold typography, gradient or dark overlay background
- Professional color palette — not just black and white,
  pick colors that match the business type
- Real business content — real name, real menu items, real copy,
  real pricing, real team names. Never generic placeholder text.
- Mobile responsive with media queries for 768px and below
- Smooth scroll behavior
- No mention of Oni, AI, or generated anywhere in the output
- No markdown code fences, return raw HTML only

If unsure whether user wants a website built, ask to clarify.`;

function createMockStream(clean: string | undefined, groqMessages: { role: string; content: string }[]) {
  const userText = (clean ?? groqMessages.at(-1)?.content ?? "").toLowerCase();

  // Only generate HTML when user explicitly asks to build something
  const isBuildRequest = /\b(build|create|make|design|generate|code)\b/.test(userText);

  let mockResponse: string;
  if (!isBuildRequest) {
    // Conversational reply — no HTML
    const conversational: Record<string, string> = {
      hi: "Hey! I'm Oni 👋 — ask me to build you a website and I'll get right on it.",
      hello: "Hello! Ready to build something great? Just describe the site you want.",
      hey: "Hey there! Describe a website and I'll generate it for you instantly.",
      thanks: "Happy to help! Let me know if you need any changes.",
      "what can you do": "I can build full websites from a description — try: \"make me a portfolio site\" or \"create a restaurant landing page\".",
    };
    const reply =
      Object.entries(conversational).find(([k]) => userText.includes(k))?.[1] ??
      "I'm Oni, your AI website builder. Describe a site you'd like me to build!";
    mockResponse = `<ONI_THOUGHT>Analyzing conversational request and introducing capabilities.</ONI_THOUGHT>${reply}`;
  } else {
    const html =
      userText.includes("restaurant") || userText.includes("cafe")
        ? buildRestaurantHtml()
        : buildGenericHtml(clean ?? "");
    mockResponse = `<ONI_THOUGHT>Planning the layout, custom CSS style structure, and content organization for the requested site. Setting up a self-contained HTML document.</ONI_THOUGHT>Here's your website — a responsive layout with custom CSS.\n\n<ONI_CODE>\n${html}\n</ONI_CODE>`;
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendChunk = async (text: string) => {
        const chunk = `data: ${JSON.stringify({
          choices: [{ delta: { content: text } }],
        })}\n\n`;
        controller.enqueue(encoder.encode(chunk));
      };

      const thoughtMatch = mockResponse.match(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/);
      const thoughtPart = thoughtMatch ? thoughtMatch[0] : "";
      const remainingAfterThought = mockResponse.replace(thoughtPart, "");

      const codeMatch = remainingAfterThought.match(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/);
      const descriptionPart = codeMatch ? remainingAfterThought.replace(codeMatch[0], "") : remainingAfterThought;
      const codePart = codeMatch ? codeMatch[0] : "";

      // 1. Stream thoughtPart
      if (thoughtPart) {
        const words = thoughtPart.split(/(\s+)/);
        for (const word of words) {
          if (word) {
            await sendChunk(word);
            await new Promise((resolve) => setTimeout(resolve, 25));
          }
        }
      }

      // 2. Stream descriptionPart
      if (descriptionPart) {
        const words = descriptionPart.split(/(\s+)/);
        for (const word of words) {
          if (word) {
            await sendChunk(word);
            await new Promise((resolve) => setTimeout(resolve, 35));
          }
        }
      }

      // 3. Stream codePart
      if (codePart) {
        const chunkSize = 40;
        for (let i = 0; i < codePart.length; i += chunkSize) {
          const chunkText = codePart.slice(i, i + chunkSize);
          await sendChunk(chunkText);
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
      }

      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: Request) {
  console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
  console.log('GROQ_API_KEY first 8 chars:', process.env.GROQ_API_KEY?.slice(0, 8));

  // ----- Parse request body -------------------------------------------------
  const body = await req.json().catch(() => null);
  if (!body) {
    return new NextResponse("Bad request", { status: 400 });
  }

  // ----- Preserve current HTML (for incremental edits) -----------------------
  const currentHtml =
    typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0
      ? body.currentHtml.slice(0, 80000)
      : "";

  // ----- Build Groq messages -------------------------------------------------
  let groqMessages: { role: string; content: string }[] = [];
  let clean: string | undefined; // only defined when a raw prompt is sent

  if (Array.isArray(body.messages) && body.messages.length > 0) {
    // Client already supplied a sanitized history
    groqMessages = body.messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));
  } else if (body.prompt) {
    // Sanitize raw prompt
    clean = sanitizeText(
      DOMPurify.sanitize(body.prompt, { ALLOWED_TAGS: [] })
    );
    if (!clean || clean.length > 1000) {
      return new NextResponse("Bad request", { status: 400 });
    }

    // Basic banned token checks
    const banned = ["ignore previous", "system:", "you are now", "jailbreak"];
    if (banned.some((b) => clean!.toLowerCase().includes(b))) {
      return new NextResponse("Invalid prompt", { status: 400 });
    }

    const userContent = currentHtml
      ? `User request: ${clean}\n\nThe user is asking for a change to the existing website below. Return the short conversational message and the FULL updated HTML file again inside <ONI_CODE> tags.\n\n<CURRENT_HTML>\n${currentHtml}\n</CURRENT_HTML>`
      : clean;

    groqMessages = [{ role: "user", content: userContent }];
  } else {
    return new NextResponse("Bad request", { status: 400 });
  }

  // ----- Groq API key -------------------------------------------------------
  const groqApiKey = process.env.GROQ_API_KEY?.trim();

  // ----- Mock SSE stream (ONLY when no API key) -----------------------------
  if (!groqApiKey) {
    return createMockStream(clean, groqMessages);
  }

  // ----- Real Groq request --------------------------------------------------
  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: ONI_SYSTEM_PROMPT }, ...groqMessages],
          temperature: 0.9,
          max_tokens: 16000,
          stream: true,
        }),
      }
    );

    if (groqResponse.ok) {
      // Forward the streaming response to the client
      return new Response(groqResponse.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // If response not ok, log error and return it
    const errorBody = await groqResponse.text();
    console.error('Groq error:', {
      status: groqResponse.status,
      statusText: groqResponse.statusText,
      body: errorBody
    });

    return new NextResponse(errorBody, { 
      status: groqResponse.status, 
      headers: { "Content-Type": "text/plain" } 
    });
  } catch (err) {
    console.error('Groq error:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

/* -------------------------------------------------------------------------
   Helper HTML builders (unchanged)
-------------------------------------------------------------------------- */
function buildRestaurantHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ember & Sage | Wood-Fired Kitchen</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #2f251f; background: #fff8ef; }
    a { color: inherit; text-decoration: none; }
    header { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; justify-content: space-between; padding: 22px clamp(20px, 6vw, 72px); background: rgba(255, 248, 239, .88); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(91, 59, 37, .12); }
    .logo { font-size: 1.25rem; font-weight: 800; letter-spacing: -.03em; }
    nav { display: flex; gap: 24px; color: #795c48; font-size: .95rem; }
    .reserve { border: 1px solid #5f3726; border-radius: 999px; padding: 10px 16px; font-weight: 700; }
    .hero { min-height: 82vh; display: grid; grid-template-columns: 1.05fr .95fr; gap: 48px; align-items: center; padding: 64px clamp(20px, 6vw, 72px); }
    .eyebrow { color: #a4572f; font-weight: 800; text-transform: uppercase; letter-spacing: .18em; font-size: .78rem; }
    h1 { margin: 14px 0 20px; max-width: 780px; font-size: clamp(3.3rem, 8vw, 7.6rem); line-height: .88; letter-spacing: -.08em; color: #2a1c16; }
    .hero p { max-width: 620px; color: #765b48; font-size: 1.15rem; line-height: 1.8; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
    .primary, .secondary { border-radius: 999px; padding: 14px 20px; font-weight: 800; }
    .primary { background: #2a1c16; color: white; }
    .secondary { border: 1px solid rgba(42, 28, 22, .2); color: #2a1c16; }
    .photo-card { min-height: 560px; border-radius: 36px; background: linear-gradient(145deg, rgba(65, 34, 20, .25), transparent), url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80") center/cover; box-shadow: 0 30px 80px rgba(80, 45, 28, .26); position: relative; overflow: hidden; }
  </style>
</head>
<body>
  <header>
    <div class="logo">Ember & Sage</div>
    <nav>
      <a href="#menu">Menu</a>
      <a href="#about">About</a>
      <a href="#reserve" class="reserve">Reserve Table</a>
    </nav>
  </header>
  <main>
    <section class="hero">
      <div>
        <div class="eyebrow">Wood-Fired Kitchen</div>
        <h1>Flavor Born in Fire.</h1>
        <p>A culinary destination celebrating rustic cooking, carefully sourced ingredients, and seasonal tastes cooked to perfection over natural embers.</p>
        <div class="actions">
          <a href="#menu" class="primary">View Menu</a>
          <a href="#reserve" class="secondary">Book Table</a>
        </div>
      </div>
      <div class="photo-card"></div>
    </section>
  </main>
</body>
</html>`;
}

function buildGenericHtml(prompt: string) {
  const displayTitle = prompt
    ? prompt.charAt(0).toUpperCase() + prompt.slice(1)
    : "Custom Digital Experience";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${displayTitle}</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0f0f11;
      color: #f4f4f5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 24px;
    }
    .container {
      max-width: 600px;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 16px;
      background: linear-gradient(to right, #a1a1aa, #ffffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      color: #a1a1aa;
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .btn {
      display: inline-block;
      background: #ffffff;
      color: #000000;
      padding: 12px 24px;
      border-radius: 9999px;
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .btn:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${displayTitle}</h1>
    <p>Your beautiful, responsive web experience is fully customized and ready. Let me know what features or design updates you would like to apply next!</p>
    <a href="#" class="btn">Explore Now</a>
  </div>
</body>
</html>`;
}
