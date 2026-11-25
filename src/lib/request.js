import { createHmac } from "node:crypto";

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function getClientIp(headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}

/** Stores a keyed hash instead of the raw IP address. */
export function hashIp(ip) {
  const secret = process.env.AUTH_SECRET || "dev-only-secret";
  return createHmac("sha256", secret).update(ip).digest("hex").slice(0, 32);
}
