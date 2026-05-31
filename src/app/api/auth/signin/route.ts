import { NextResponse } from "next/server";
import { authenticateUser, attachSessionCookie, validateAuthInput } from "@/lib/auth";

export async function POST(req: Request) {
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
