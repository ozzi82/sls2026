import { NextRequest, NextResponse } from "next/server";
import { writeJson } from "@/lib/admin/content-store";

export const dynamic = "force-dynamic";

interface GoogleTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email?: string;
}

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = process.env.FORCE_HTTPS === "true" ? "https" : "http";
  return `${protocol}://${host}`;
}

function redirectTo(request: NextRequest, path: string): NextResponse {
  return NextResponse.redirect(`${getBaseUrl(request)}${path}`);
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return redirectTo(request, `/admin/integrations/google?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return redirectTo(request, "/admin/integrations/google?error=no_code");
  }

  // Verify CSRF state
  const storedState = request.cookies.get("google_oauth_state")?.value;
  if (!state || state !== storedState) {
    return redirectTo(request, "/admin/integrations/google?error=invalid_state");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return redirectTo(request, "/admin/integrations/google?error=missing_credentials");
  }

  const baseUrl = getBaseUrl(request);
  const redirectUri = `${baseUrl}/api/admin/google/callback`;

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("[google-oauth] Token exchange failed:", err);
      return redirectTo(request, "/admin/integrations/google?error=token_exchange_failed");
    }

    const tokenData = await tokenRes.json();

    // Get user email for display
    let email: string | undefined;
    try {
      const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      if (userRes.ok) {
        const user = await userRes.json();
        email = user.email;
      }
    } catch {
      // Not critical
    }

    // Save tokens to file
    const tokens: GoogleTokens = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: Date.now() + tokenData.expires_in * 1000,
      email,
    };

    await writeJson("settings/google-tokens.json", tokens);

    const response = redirectTo(request, "/admin/integrations/google?connected=true");
    response.cookies.delete("google_oauth_state");
    return response;
  } catch (err) {
    console.error("[google-oauth] Callback error:", err);
    return redirectTo(request, "/admin/integrations/google?error=callback_failed");
  }
}
