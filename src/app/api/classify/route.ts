import { NextResponse } from "next/server";
import { classifyIntent } from "@/lib/classifier";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.message !== "string") {
    return new NextResponse("Bad request", { status: 400 });
  }
  const history = Array.isArray(body.history) ? body.history : [];
  try {
    const result = await classifyIntent(body.message, history);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[Classify API] Error:", err);
    return new NextResponse(err.message || "Classification failed", { status: 500 });
  }
}
