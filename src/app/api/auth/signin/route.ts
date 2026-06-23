import { NextResponse } from "next/server";
import { authenticateUser, attachSessionCookie, validateAuthInput } from "@/lib/auth";
import { rateLimiter, getClientIp } from "@/lib/rate-limit";

// 5 attempts per 15 minutes per IP — brute-force protection
const SIGNIN_LIMIT = { windowMs: 15 * 60 * 1000, max: 5 };

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (rateLimiter.isLimitExceeded(`signin:${ip}`, SIGNIN_LIMIT)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please wait 15 minutes and try again." },
      { status: 429, headers: { "Retry-After": "900" } }
    );
  }

  const body = await req.json().catch(() => null);
  const data = validateAuthInput(body);

  if (!data) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = await authenticateUser({ email: data.email, password: data.password });
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  const response = NextResponse.json({ user: result.user });
  return attachSessionCookie(response, result.user.id);
}
