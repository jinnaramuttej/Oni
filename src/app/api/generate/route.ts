import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { getUserFromRequest, sanitizeText } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.prompt !== "string") return new NextResponse("Bad request", { status: 400 });

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
    const sanitizedOutput = clean.replace(/<\/?iframe[^>]*>/gi, "");
    return NextResponse.json({ output: sanitizedOutput });
  }

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
          content:
            "You are Oni, a concise product-building assistant. Keep responses practical, clear, and brief.",
        },
        {
          role: "user",
          content: clean,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
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
