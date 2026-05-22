/**
 * Simple in-memory rate limiter for API routes.
 * Limits requests per IP address within a time window.
 * Note: This resets on server restart. For production at scale, use Redis.
 */

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(
  ip: string,
  {
    maxRequests = 5,
    windowMs = 60 * 1000, // 1 minute default
  }: {
    maxRequests?: number;
    windowMs?: number;
  } = {}
): { success: boolean; remaining: number } {
  const now = Date.now();
  const key = ip;

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: maxRequests - entry.count };
}
