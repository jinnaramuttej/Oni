import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { sanitizeText } from "@/lib/auth";

const ONI_SYSTEM_PROMPT = `You are Oni, an elite AI website builder. When the user describes a website:

1. Reply with ONE short sentence max (e.g. "Here's your restaurant website.")
2. Then output the COMPLETE website as a single HTML file wrapped in <ONI_CODE>...</ONI_CODE>

Rules:
- Return ONLY the message and code. No markdown wrapper (no \`\`\`html).
- All CSS in <style> and JS in <script> in the same file.
- Premium design, tailwind NOT allowed. Use custom CSS.
- High quality copy, no lorem ipsum.`;

export async function POST(req: Request) {
  // ----- Parse request body -------------------------------------------------
  const body = await req.json().catch(() => null);
  if (!body || (!body.prompt && !Array.isArray(body.messages))) {
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
    groqMessages = body.messages.map((m) => ({
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
    if (banned.some((b) => clean.toLowerCase().includes(b))) {
      return new NextResponse("Invalid prompt", { status: 400 });
    }

    const userContent = currentHtml
      ? `User request: ${clean}\n\nThe user is asking for a change to the existing website below. Return the short conversational message and the FULL updated HTML file again inside <ONI_CODE> tags.\n\n<CURRENT_HTML>\n${currentHtml}\n</CURRENT_HTML>`
      : clean;

    groqMessages = [{ role: "user", content: userContent }];
  }

  // ----- Groq API key -------------------------------------------------------
  const groqApiKey = process.env.GROQ_API_KEY?.trim();

  // ----- Mock SSE stream (when no API key) ----------------------------------
  if (!groqApiKey) {
    const html = clean?.toLowerCase().includes("restaurant") ||
      clean?.toLowerCase().includes("cafe")
      ? buildRestaurantHtml()
      : buildGenericHtml(clean ?? "");

    const mockResponse = `Here's your website — I've created a responsive page layout with custom CSS.\n\n<ONI_CODE>\n${html}\n</ONI_CODE>`;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const tokens = mockResponse.split(" ");
        for (const token of tokens) {
          const content = token + " ";
          const chunk = `data: ${JSON.stringify({
            choices: [{ delta: { content } }],
          })}\n\n`;
          controller.enqueue(encoder.encode(chunk));
          await new Promise((resolve) => setTimeout(resolve, 30));
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

  // ----- Real Groq request --------------------------------------------------
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
        temperature: 0.7,
        max_tokens: 8192,
        stream: true,
      }),
    }
  );

  if (!groqResponse.ok) {
    const errorBody = (await groqResponse
      .json()
      .catch(() => null)) as { error?: { message?: string } } | null;
    const message =
      groqResponse.status === 401 || groqResponse.status === 403
        ? "Groq rejected the API key. Check GROQ_API_KEY in .env.local and restart the dev server."
        : errorBody?.error?.message ?? "Groq request failed";
    return new NextResponse(message, { status: 502 });
  }

  // Forward the streaming response to the client
  return new Response(groqResponse.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
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
