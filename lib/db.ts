/**
 * ============================================================================
 * DATABASE CLIENT — NOT YET CONNECTED
 * ============================================================================
 * This project ships a complete production schema at `prisma/schema.prisma`
 * covering every entity the platform needs (users, courses, progress, XP,
 * achievements, payments, certificates, AI knowledge, etc).
 *
 * It is intentionally NOT wired up yet, because doing so without a real
 * database would mean faking a backend that doesn't exist. Every screen in
 * this app currently reads from `lib/data/*` (in-memory demo data, clearly
 * marked as such) instead.
 *
 * TO GO LIVE:
 *   1. Provision PostgreSQL (Neon, Supabase, Railway, RDS, etc).
 *   2. Add to `.env`:
 *        DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
 *        DIRECT_URL="postgresql://user:pass@host:5432/db"   (if using a pooler)
 *   3. Run:
 *        npx prisma generate
 *        npx prisma migrate dev --name init
 *   4. Uncomment the block below.
 *   5. Go through every file in `lib/data/*` — each exported function has a
 *      comment showing the exact Prisma query that should replace the mock
 *      implementation (e.g. `// PROD: prisma.course.findMany(...)`).
 *   6. Point `lib/auth.ts`'s Credentials provider at `prisma.user` instead
 *      of the mock user store, and swap NextAuth's session strategy to
 *      "database" using `@auth/prisma-adapter` if you want persistent
 *      sessions across devices.
 * ============================================================================
 */

// import { PrismaClient } from "@prisma/client";
//
// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
//
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
//   });
//
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const DB_CONNECTED = false;
