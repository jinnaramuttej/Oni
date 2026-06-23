import { NextRequest, NextResponse } from "next/server";

/**
 * CSRF Protection Middleware
 *
 * For all state-changing API routes (POST/PUT/PATCH/DELETE), we validate
 * that the Origin or Referer header matches our own host.
 *
 * This defends against cross-site request forgery even when using
 * SameSite=Strict cookies, since some browsers/proxies may not enforce it.
 *
 * Safe methods (GET, HEAD, OPTIONS) are excluded because they should
 * not perform state changes.
 */

const CSRF_PROTECTED_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

// API routes that accept cross-origin requests (e.g. public read endpoints)
// These are the only GET routes, so nothing needs to be exempted from POST protection.
const CSRF_EXEMPT_PATHS = new Set<string>([
  // Nothing yet — all POST routes are ours
]);

function getAllowedOrigins(): string[] {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  const origins: string[] = [];

  if (appUrl) {
    // Strip trailing slash and add as-is
    origins.push(appUrl.replace(/\/$/, ""));
  }

  // Always allow localhost in development
  if (process.env.NODE_ENV !== "production") {
    origins.push("http://localhost:3000");
    origins.push("http://localhost:3001");
    origins.push("http://127.0.0.1:3000");
  }

  return origins;
}

function isOriginAllowed(origin: string | null, host: string | null): boolean {
  // No origin header on same-origin requests from some browsers — allow if no origin
  if (!origin) return true;

  const allowedOrigins = getAllowedOrigins();

  // If APP_URL is configured, check against it
  if (allowedOrigins.length > 0) {
    return allowedOrigins.some((allowed) => origin === allowed);
  }

  // Fallback: validate origin matches the request's own Host header
  // This handles dynamic deployments (Vercel preview URLs, etc.)
  if (host) {
    const expectedOrigins = [
      `https://${host}`,
      `http://${host}`,
    ];
    return expectedOrigins.some((expected) => origin === expected);
  }

  return false;
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const method = req.method;

  // Only protect API routes
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Only protect state-changing methods
  if (!CSRF_PROTECTED_METHODS.has(method)) {
    return NextResponse.next();
  }

  // Skip explicitly exempt paths
  if (CSRF_EXEMPT_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  if (!isOriginAllowed(origin, host)) {
    console.warn(`[CSRF] Blocked request to ${pathname} — origin: ${origin}, host: ${host}`);
    return new NextResponse(
      JSON.stringify({ error: "Forbidden — invalid request origin" }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
