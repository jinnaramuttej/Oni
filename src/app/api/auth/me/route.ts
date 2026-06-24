import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Return a guest user by default so the app runs without auth checks
  const guestUser = {
    id: "guest",
    name: "Guest User",
    email: "guest@oni.ai",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ user: guestUser });
}
