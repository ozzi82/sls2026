import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

const ADMIN_ONLY_PATTERNS = [
  /^\/admin\/users/,
  /^\/admin\/integrations/,
  /^\/admin\/redirects/,
  /^\/api\/admin\/users(?!\/check)/,
  /^\/api\/admin\/settings/,
  /^\/api\/admin\/redirects/,
];

let redirectCache: { from: string; to: string; permanent: boolean }[] | null = null;
let redirectCacheTs = 0;
const REDIRECT_CACHE_TTL = 60_000;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Locale detection ---
  const isDeRoute = pathname.startsWith("/de/") || pathname === "/de";
  const strippedPath = isDeRoute ? pathname.replace(/^\/de/, "") || "/" : pathname;

  // --- Public routes (non-admin, non-api) ---
  if (!strippedPath.startsWith("/admin") && !strippedPath.startsWith("/api")) {
    // Refresh redirect cache
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

    // Check redirects against strippedPath (works for both /de/ and non-/de/ routes)
    if (redirectCache) {
      const match = redirectCache.find((r) => r.from === strippedPath);
      if (match) {
        const destPath = match.to.startsWith("http")
          ? match.to
          : isDeRoute
            ? `${request.nextUrl.origin}/de${match.to}`
            : `${request.nextUrl.origin}${match.to}`;
        return NextResponse.redirect(destPath, match.permanent ? 308 : 307);
      }
    }

    // If /de/ route, rewrite to unprefixed path with x-locale header
    if (isDeRoute) {
      const url = request.nextUrl.clone();
      url.pathname = strippedPath;
      const response = NextResponse.rewrite(url);
      response.headers.set("x-locale", "de");
      return response;
    }

    // Geo-detection for English routes (no /de/ prefix)
    const hasLocalePref = request.cookies.has("locale-preference");
    const wasGeoRedirected = request.cookies.has("geo-redirected");
    if (!hasLocalePref && !wasGeoRedirected) {
      const country = request.headers.get("cf-ipcountry");
      if (country && ["DE", "AT", "CH"].includes(country)) {
        const deUrl = new URL(`/de${pathname}`, request.url);
        const response = NextResponse.redirect(deUrl, 302);
        response.cookies.set("geo-redirected", "1", { path: "/" });
        return response;
      }
    }

    return NextResponse.next();
  }

  // --- Admin routes below (unchanged) ---
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/setup" ||
    pathname === "/api/admin/auth" ||
    pathname === "/api/admin/setup" ||
    pathname === "/api/admin/users/check"
  ) {
    return NextResponse.next();
  }

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

  const isAdminOnly = ADMIN_ONLY_PATTERNS.some((p) => p.test(pathname));
  if (isAdminOnly && verified.role !== "admin") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }
    const dashUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashUrl);
  }

  const response = NextResponse.next();
  response.headers.set("x-admin-username", verified.username);
  response.headers.set("x-admin-role", verified.role);
  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/de/:path*",
    "/((?!_next|api|favicon|uploads|.*\\.).*)",
  ],
};
