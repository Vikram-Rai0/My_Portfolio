import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForDb = globalThis;

function createClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.");
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

// Reuse one client across hot reloads in development.
export const db = globalForDb.__portfolioDb ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__portfolioDb = db;
}
