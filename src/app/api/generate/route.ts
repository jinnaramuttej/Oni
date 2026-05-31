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

  // Placeholder: call to AI provider should occur server-side here.
  // For now, return a sanitized echo of the prompt.
  const sanitizedOutput = clean.replace(/<\/?iframe[^>]*>/gi, "");

  return NextResponse.json({ output: sanitizedOutput });
}
