import { db } from "@/lib/db";

/**
 * Fixed-window rate limit backed by PostgreSQL (no Redis needed).
 * One atomic upsert: starts a new window when the old one expired.
 * Returns { allowed, count, limit }.
 */
export async function rateLimit(key, { limit, windowSeconds }) {
  const rows = await db.$queryRaw`
    INSERT INTO "RateLimit" ("key", "count", "windowStart")
    VALUES (${key}, 1, timezone('utc', now()))
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "RateLimit"."windowStart" < timezone('utc', now()) - make_interval(secs => ${windowSeconds}::double precision)
        THEN 1 ELSE "RateLimit"."count" + 1 END,
      "windowStart" = CASE
        WHEN "RateLimit"."windowStart" < timezone('utc', now()) - make_interval(secs => ${windowSeconds}::double precision)
        THEN timezone('utc', now()) ELSE "RateLimit"."windowStart" END
    RETURNING "count"
  `;

  const count = Number(rows[0]?.count ?? 1);
  return { allowed: count <= limit, count, limit };
}
