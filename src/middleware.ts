import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

// Routes that require admin role
const ADMIN_ONLY_PATTERNS = [
  /^\/admin\/users/,
  /^\/admin\/integrations/,
  /^\/admin\/redirects/,
  /^\/api\/admin\/users(?!\/check)/,
  /^\/api\/admin\/settings/,
  /^\/api\/admin\/redirects/,
];

// In-memory redirect cache (populated from API, refreshed every 60s)
let redirectCache: { from: string; to: string; permanent: boolean }[] | null = null;
let redirectCacheTs = 0;
const REDIRECT_CACHE_TTL = 60_000;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Public redirects (non-admin, non-api routes) ---
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    if (!redirectCache || Date.now() - redirectCacheTs > REDIRECT_CACHE_TTL) {
      try {
        const res = await fetch(`${request.nextUrl.origin}/api/public/redirects`);
        if (res.ok) {
          const data = await res.json();
          redirectCache = data.redirects || [];
          redirectCacheTs = Date.now();
        }
      } catch {
        // Don't block on errors
      }
    }

    if (redirectCache) {
      const match = redirectCache.find((r) => r.from === pathname);
      if (match) {
        const dest = match.to.startsWith("http")
          ? match.to
          : `${request.nextUrl.origin}${match.to}`;
        return NextResponse.redirect(dest, match.permanent ? 308 : 307);
      }
    }

    return NextResponse.next();
  }

  // --- Admin routes below ---

  // Allow public admin routes
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/setup" ||
    pathname === "/api/admin/auth" ||
    pathname === "/api/admin/setup" ||
    pathname === "/api/admin/users/check"
  ) {
    return NextResponse.next();
  }

  // Check auth cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const verified = verifyToken(token);
  if (!verified) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin-only routes
  const isAdminOnly = ADMIN_ONLY_PATTERNS.some((p) => p.test(pathname));
  if (isAdminOnly && verified.role !== "admin") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    const dashUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashUrl);
  }

  // Add username header for API routes to read
  const response = NextResponse.next();
  response.headers.set("x-admin-username", verified.username);
  response.headers.set("x-admin-role", verified.role);
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    // Public pages for redirects (exclude static assets)
    "/((?!_next|api|favicon|uploads|.*\\.).*)",
  ],
};
