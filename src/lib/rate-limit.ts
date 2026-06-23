import { NextRequest } from "next/server";

export type RateLimitRule = {
  windowMs: number;
  max: number;
};

class RateLimiterInstance {
  // Maps IP+Route key to an array of timestamps
  private cache = new Map<string, number[]>();
  private checkCount = 0;

  /**
   * Check if a request exceeds the limit for the given key and rule.
   */
  public isLimitExceeded(key: string, rule: RateLimitRule): boolean {
    const now = Date.now();
    const timestamps = this.cache.get(key) || [];

    // Filter timestamps to only keep those within the sliding window
    const recent = timestamps.filter((time) => now - time < rule.windowMs);

    if (recent.length >= rule.max) {
      // Exceeded limit: update cache with the filtered timestamps
      this.cache.set(key, recent);
      return true;
    }

    // Accept request: add current timestamp and save
    recent.push(now);
    this.cache.set(key, recent);

    // Periodic pruning to avoid memory leaks
    this.checkCount++;
    if (this.checkCount >= 500) {
      this.checkCount = 0;
      this.prune();
    }

    return false;
  }

  /**
   * Prune expired timestamps across all cache entries.
   */
  private prune(): void {
    const now = Date.now();
    // Use 1 hour as the absolute maximum sliding window duration to clean up old IPs
    const maxWindowMs = 3600000;

    for (const [key, timestamps] of this.cache.entries()) {
      const recent = timestamps.filter((time) => now - time < maxWindowMs);
      if (recent.length === 0) {
        this.cache.delete(key);
      } else {
        this.cache.set(key, recent);
      }
    }
  }
}

// Singleton rate limiter instance
export const rateLimiter = new RateLimiterInstance();

/**
 * Get client IP address from request headers.
 */
export function getClientIp(req: Request | NextRequest): string {
  // In Next.js, `req` might be NextRequest, check for standard headers
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // x-forwarded-for can be a comma-separated list; first one is the client
    const ip = xForwardedFor.split(",")[0].trim();
    if (ip) return ip;
  }

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  // If running in Node/Next runtime context
  const socketIp = (req as any).socket?.remoteAddress;
  if (socketIp) return socketIp;

  return "127.0.0.1";
}
