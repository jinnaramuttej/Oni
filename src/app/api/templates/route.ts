import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return new NextResponse("Missing template name", { status: 400 });
  }

  // Prevent path traversal
  const sanitizedName = path.basename(name).replace(/[^a-zA-Z0-9\s&\.\-_]/g, "");
  const filePath = path.join(process.cwd(), "oni-components", "full-templates", `${sanitizedName}.html`);

  try {
    if (fs.existsSync(filePath)) {
      const html = await fs.promises.readFile(filePath, "utf-8");
      return new NextResponse(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }
    return new NextResponse("Template file not found", { status: 404 });
  } catch (err: any) {
    return new NextResponse(`Error reading template: ${err?.message || err}`, { status: 500 });
  }
}
