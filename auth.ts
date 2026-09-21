import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmail, verifyPassword } from "@/lib/auth-users";
import type { EnrollmentStatus, Role } from "@/lib/types";

/**
 * Auth.js (NextAuth v5) configuration.
 *
 * Currently backed by the in-memory mock user store (lib/auth-users.ts) with
 * a JWT session — no database required to review the auth flow end-to-end.
 *
 * PROD: swap the `authorize` callback to query `prisma.user` (see lib/db.ts),
 * and consider switching to the database session strategy with
 * `@auth/prisma-adapter` once persistent sessions across devices matter.
 * Also add OAuth providers here (Google, etc.) if needed — the `Account`
 * model in prisma/schema.prisma is already modeled for it.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = findUserByEmail(email);
        if (!user) return null;

        const valid = verifyPassword(user, password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          enrollmentStatus: user.enrollmentStatus,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { role: Role; enrollmentStatus: EnrollmentStatus };
        token.role = u.role;
        token.enrollmentStatus = u.enrollmentStatus;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.enrollmentStatus = token.enrollmentStatus as EnrollmentStatus;
      }
      return session;
    },
  },
});
