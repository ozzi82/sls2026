import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "GOOGLE_CLIENT_ID not configured" }, { status: 500 });
  }

  // Build the redirect URI from the host header (request.url is localhost behind reverse proxy)
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = process.env.FORCE_HTTPS === "true" ? "https" : "http";
  const redirectUri = `${protocol}://${host}/api/admin/google/callback`;

  // Generate a state token for CSRF protection
  const state = crypto.randomBytes(16).toString("hex");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    access_type: "offline",
    prompt: "consent",
    state,
  });

  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );

  // Store state in a cookie for verification on callback
  response.cookies.set("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.FORCE_HTTPS === "true",
    sameSite: "lax",
    path: "/",
    maxAge: 600, // 10 minutes
  });

  return response;
}
