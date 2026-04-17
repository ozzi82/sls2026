import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

// Routes that require admin role
const ADMIN_ONLY_PATTERNS = [
  /^\/admin\/users/,
  /^\/admin\/integrations/,
  /^\/api\/admin\/users(?!\/check)/,
  /^\/api\/admin\/settings/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
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
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
