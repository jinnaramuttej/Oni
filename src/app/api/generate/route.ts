import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { getUserFromRequest, sanitizeText } from "@/lib/auth";

const ONI_SYSTEM_PROMPT = `You are Oni, an expert AI website builder. When the user describes any website, you must respond with:

1. A single short sentence acknowledging what you're building (example: 'Here is your restaurant website.')

2. The COMPLETE website as a single self-contained HTML file wrapped exactly like this:
<ONI_CODE>
<!DOCTYPE html>
<html>
...full website code...
</html>
</ONI_CODE>

Rules for the HTML:
- Complete single file with all CSS inside <style> tags and all JS inside <script> tags
- Real actual content — real restaurant name, real menu items, real copy. Never use placeholder text.
- Beautiful modern design, fully responsive
- No mention of Oni, AI, or generated anywhere in the HTML
- Hero heading must NEVER be the user's raw prompt text`;

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.prompt !== "string") return new NextResponse("Bad request", { status: 400 });
  const currentHtml =
    typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0
      ? body.currentHtml.slice(0, 80000)
      : "";

  // Sanitize input strictly (strip all HTML)
  const clean = sanitizeText(DOMPurify.sanitize(body.prompt, { ALLOWED_TAGS: [] }));
  if (!clean || clean.length > 1000) return new NextResponse("Bad request", { status: 400 });

  // Basic banned token checks to reduce prompt injection
  const banned = ["ignore previous", "system:", "you are now", "jailbreak"];
  if (banned.some((b) => clean.toLowerCase().includes(b))) {
    return new NextResponse("Invalid prompt", { status: 400 });
  }

  const groqApiKey = process.env.GROQ_API_KEY?.trim();

  if (!groqApiKey) {
    return NextResponse.json({ output: buildLocalWebsiteResponse(clean) });
  }

  const userContent = currentHtml
    ? `User request: ${clean}

The user is asking for a change to the existing website below. Return the short conversational message and the FULL updated HTML file again inside <ONI_CODE> tags.

<CURRENT_HTML>
${currentHtml}
</CURRENT_HTML>`
    : clean;

  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${groqApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: ONI_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.75,
      max_tokens: 8192,
    }),
  });

  if (!groqResponse.ok) {
    const errorBody = (await groqResponse.json().catch(() => null)) as { error?: { message?: string } } | null;
    const message =
      groqResponse.status === 401 || groqResponse.status === 403
        ? "Groq rejected the API key. Check GROQ_API_KEY in .env.local and restart the dev server."
        : errorBody?.error?.message ?? "Groq request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const data = (await groqResponse.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };

  const output = data.choices?.[0]?.message?.content?.trim();

  if (!output) {
    return NextResponse.json({ error: "Empty Groq response" }, { status: 502 });
  }

  return NextResponse.json({ output });
}

function buildLocalWebsiteResponse(prompt: string) {
  const html = prompt.toLowerCase().includes("restaurant") || prompt.toLowerCase().includes("cafe")
    ? buildRestaurantHtml()
    : buildGenericHtml(prompt);

  return `Here's your website — I've included a complete responsive page with real copy, polished sections, and internal CSS. Tell me what you'd like changed next.

<ONI_CODE>
${html}
</ONI_CODE>`;
}

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
    .hours { position: absolute; left: 24px; right: 24px; bottom: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .hours div { border-radius: 22px; background: rgba(255, 248, 239, .9); padding: 18px; }
    .section { padding: 76px clamp(20px, 6vw, 72px); }
    .section-title { display: flex; justify-content: space-between; gap: 24px; align-items: end; margin-bottom: 30px; }
    h2 { margin: 0; font-size: clamp(2.2rem, 5vw, 4.6rem); line-height: .95; letter-spacing: -.06em; color: #2a1c16; }
    .section-title p { max-width: 440px; color: #795c48; line-height: 1.7; }
    .menu { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
    .dish { border: 1px solid rgba(42, 28, 22, .12); border-radius: 28px; background: #fffdf8; padding: 24px; box-shadow: 0 18px 44px rgba(80, 45, 28, .07); }
    .dish strong { display: flex; justify-content: space-between; gap: 16px; color: #2a1c16; font-size: 1.05rem; }
    .dish p { color: #795c48; line-height: 1.6; margin-bottom: 0; }
    .about { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; align-items: stretch; }
    .about-card { border-radius: 32px; background: #2a1c16; color: #fff8ef; padding: 38px; }
    .about-card p { color: rgba(255,248,239,.7); line-height: 1.8; font-size: 1.05rem; }
    .about-image { min-height: 420px; border-radius: 32px; background: url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80") center/cover; }
    .contact { border-radius: 36px; background: #e9d6bd; padding: clamp(28px, 5vw, 56px); display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .contact form { display: grid; gap: 12px; }
    input, textarea { width: 100%; border: 0; border-radius: 16px; padding: 14px 16px; font: inherit; background: rgba(255,255,255,.75); color: #2a1c16; }
    textarea { min-height: 120px; resize: vertical; }
    button { border: 0; border-radius: 999px; padding: 14px 18px; background: #2a1c16; color: white; font-weight: 800; cursor: pointer; }
    footer { padding: 28px clamp(20px, 6vw, 72px); color: #795c48; display: flex; justify-content: space-between; gap: 20px; border-top: 1px solid rgba(42, 28, 22, .12); }
    @media (max-width: 900px) { nav { display: none; } .hero, .about, .contact { grid-template-columns: 1fr; } .photo-card { min-height: 420px; } .menu { grid-template-columns: 1fr; } .section-title { display: block; } footer { flex-direction: column; } }
  </style>
</head>
<body>
  <header>
    <a class="logo" href="#">Ember & Sage</a>
    <nav><a href="#menu">Menu</a><a href="#about">Our Story</a><a href="#contact">Contact</a></nav>
    <a class="reserve" href="#contact">Reserve a Table</a>
  </header>
  <main>
    <section class="hero">
      <div>
        <div class="eyebrow">Wood-fired dining in Austin</div>
        <h1>Seasonal plates kissed by flame.</h1>
        <p>Ember & Sage serves hearth-roasted vegetables, handmade pastas, and responsibly sourced meats in a warm neighborhood dining room.</p>
        <div class="actions"><a class="primary" href="#menu">Explore the Menu</a><a class="secondary" href="#contact">Book Tonight</a></div>
      </div>
      <div class="photo-card" aria-label="Restaurant dining table">
        <div class="hours"><div><strong>Dinner</strong><br />Tue-Sun, 5-10 PM</div><div><strong>Brunch</strong><br />Sat-Sun, 10-2 PM</div></div>
      </div>
    </section>
    <section class="section" id="menu">
      <div class="section-title"><h2>Guest favorites</h2><p>Every dish is built around market produce, slow cooking, and bright finishing herbs.</p></div>
      <div class="menu">
        <article class="dish"><strong>Charred Carrot Hummus <span>$14</span></strong><p>Smoked paprika oil, pistachio dukkah, grilled sourdough.</p></article>
        <article class="dish"><strong>Wild Mushroom Mafaldine <span>$26</span></strong><p>Brown butter, thyme, parmesan, black pepper.</p></article>
        <article class="dish"><strong>Oak-Grilled Branzino <span>$34</span></strong><p>Lemon relish, fennel salad, roasted garlic aioli.</p></article>
        <article class="dish"><strong>Heritage Pork Chop <span>$36</span></strong><p>Apple mostarda, ember-roasted sweet potatoes, sage jus.</p></article>
        <article class="dish"><strong>Market Greens <span>$16</span></strong><p>Whipped ricotta, citrus vinaigrette, toasted seeds.</p></article>
        <article class="dish"><strong>Olive Oil Cake <span>$12</span></strong><p>Blood orange, mascarpone cream, candied rosemary.</p></article>
      </div>
    </section>
    <section class="section about" id="about">
      <div class="about-image" aria-label="Chef preparing a dish"></div>
      <div class="about-card"><h2>Built around the hearth.</h2><p>Chef Mara Voss opened Ember & Sage after a decade cooking across the Southwest. The kitchen centers on a live-fire grill, local farms, and a wine list made for long dinners.</p><p>Come for a quick handmade pasta at the bar or settle in for a full table of shared plates.</p></div>
    </section>
    <section class="section" id="contact">
      <div class="contact">
        <div><h2>Reserve your table.</h2><p>214 Willow Street, Austin, TX<br />hello@emberandsage.example<br />(512) 555-0148</p></div>
        <form><input placeholder="Name" /><input placeholder="Email" /><input placeholder="Party size" /><textarea placeholder="Preferred date and notes"></textarea><button type="button">Request Reservation</button></form>
      </div>
    </section>
  </main>
  <footer><span>Ember & Sage</span><span>Seasonal wood-fired kitchen</span></footer>
</body>
</html>`;
}

function buildGenericHtml(prompt: string) {
  const title = prompt.toLowerCase().includes("portfolio") ? "Maya Chen Studio" : "Northstar Creative";
  const headline = prompt.toLowerCase().includes("portfolio")
    ? "Digital design work with clarity and momentum."
    : "A sharper website for a modern brand.";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #0d0f14; color: #f8fafc; }
    header { display: flex; justify-content: space-between; align-items: center; padding: 26px clamp(20px, 6vw, 76px); border-bottom: 1px solid rgba(255,255,255,.1); }
    nav { display: flex; gap: 22px; color: rgba(248,250,252,.62); }
    .brand { font-weight: 800; letter-spacing: -.03em; }
    .hero { padding: 96px clamp(20px, 6vw, 76px); min-height: 76vh; display: grid; align-content: center; background: radial-gradient(circle at 78% 20%, rgba(45,212,191,.18), transparent 30%); }
    .eyebrow { color: #5eead4; text-transform: uppercase; letter-spacing: .22em; font-size: .78rem; font-weight: 800; }
    h1 { max-width: 900px; margin: 16px 0 22px; font-size: clamp(3rem, 8vw, 7.2rem); line-height: .92; letter-spacing: -.075em; }
    p { max-width: 680px; color: rgba(248,250,252,.66); line-height: 1.8; font-size: 1.05rem; }
    .button { display: inline-flex; width: fit-content; margin-top: 28px; padding: 14px 20px; border-radius: 999px; background: #f8fafc; color: #0d0f14; font-weight: 800; text-decoration: none; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 0 clamp(20px, 6vw, 76px) 88px; }
    .card { border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.045); border-radius: 26px; padding: 26px; min-height: 220px; }
    .card h2 { margin-top: 0; font-size: 1.4rem; }
    .contact { margin: 0 clamp(20px, 6vw, 76px) 76px; padding: 40px; border-radius: 30px; background: #f8fafc; color: #0d0f14; }
    .contact p { color: rgba(13,15,20,.68); }
    @media (max-width: 760px) { nav { display: none; } .grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header><div class="brand">${title}</div><nav><span>Work</span><span>Services</span><span>Contact</span></nav></header>
  <main>
    <section class="hero"><div class="eyebrow">Independent web studio</div><h1>${headline}</h1><p>Strategy, design, and front-end craft for teams that need a focused online presence with strong storytelling and conversion paths.</p><a class="button" href="#contact">Start a Project</a></section>
    <section class="grid"><article class="card"><h2>Brand Systems</h2><p>Clear visual direction, typography, and components that make every page feel consistent.</p></article><article class="card"><h2>Responsive Pages</h2><p>Layouts that feel intentional on phones, tablets, and wide screens.</p></article><article class="card"><h2>Launch Support</h2><p>Clean handoff, fast iteration, and practical guidance for publishing.</p></article></section>
    <section class="contact" id="contact"><h2>Let's build the first version.</h2><p>Email hello@northstar.example with your goals, timeline, and must-have sections.</p></section>
  </main>
</body>
</html>`;
}
