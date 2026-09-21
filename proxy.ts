import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Route protection (Next.js 16 renamed "Middleware" to "Proxy" — same
 * mechanism). Runs before /dashboard/** and /admin/** requests.
 *
 * This is an OPTIMISTIC check only (fast, edge-friendly, based on the JWT).
 * It is not a substitute for per-request authorization inside route
 * handlers and server components — every data-fetching function in
 * lib/data/* and any real Prisma query in production must still verify the
 * user owns/can access the resource it returns.
 */
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isAdmin = nextUrl.pathname.startsWith("/admin");

  if ((isDashboard || isAdmin) && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdmin && role !== "ADMIN" && role !== "INSTRUCTOR") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
