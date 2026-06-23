import { NextResponse } from "next/server";
import { attachSessionCookie, createUser, sanitizeText, validateAuthInput } from "@/lib/auth";
import { rateLimiter, getClientIp } from "@/lib/rate-limit";

// 3 signups per hour per IP — prevents bot account creation
const SIGNUP_LIMIT = { windowMs: 60 * 60 * 1000, max: 3 };

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (rateLimiter.isLimitExceeded(`signup:${ip}`, SIGNUP_LIMIT)) {
    return NextResponse.json(
      { error: "Too many signup attempts. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": "3600" } }
    );
  }

  const body = await req.json().catch(() => null);
  const data = validateAuthInput(body);

  if (!data) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (!data.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (data.password !== data.confirmPassword) {
    return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
  }

  const result = await createUser({
    name: sanitizeText(data.name),
    email: data.email,
    password: data.password,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  const response = NextResponse.json({ user: result.user }, { status: 201 });
  return attachSessionCookie(response, result.user.id);
}
