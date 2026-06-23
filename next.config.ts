import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer policy
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features we don't need
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Force HTTPS (1 year, include subdomains)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Content Security Policy
  // - default-src 'self': only load resources from same origin
  // - script-src 'self' 'unsafe-inline': Next.js inline scripts need unsafe-inline; tighten with nonce in future
  // - style-src 'self' 'unsafe-inline' fonts.googleapis.com: Google Fonts + Tailwind inline styles
  // - font-src 'self' fonts.gstatic.com: Google Fonts files
  // - img-src 'self' data: blob: randomuser.me images.unsplash.com: remote images used in templates
  // - connect-src 'self': API calls to same origin only
  // - frame-ancestors 'none': prevent embedding in iframes (same as X-Frame-Options: DENY)
  // - object-src 'none': block Flash, Silverlight, and similar plugins
  // - base-uri 'self': prevent base tag hijacking
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://randomuser.me https://images.unsplash.com",
      "connect-src 'self'",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
