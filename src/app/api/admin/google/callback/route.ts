import { NextRequest, NextResponse } from "next/server";
import { writeJson } from "@/lib/admin/content-store";

export const dynamic = "force-dynamic";

interface GoogleTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email?: string;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/admin/integrations/google?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/admin/integrations/google?error=no_code", request.url)
    );
  }

  // Verify CSRF state
  const storedState = request.cookies.get("google_oauth_state")?.value;
  if (!state || state !== storedState) {
    return NextResponse.redirect(
      new URL("/admin/integrations/google?error=invalid_state", request.url)
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      new URL("/admin/integrations/google?error=missing_credentials", request.url)
    );
  }

  const redirectUri = `${url.origin}/api/admin/google/callback`;

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
      return NextResponse.redirect(
        new URL("/admin/integrations/google?error=token_exchange_failed", request.url)
      );
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

    const response = NextResponse.redirect(
      new URL("/admin/integrations/google?connected=true", request.url)
    );

    // Clear the state cookie
    response.cookies.delete("google_oauth_state");

    return response;
  } catch (err) {
    console.error("[google-oauth] Callback error:", err);
    return NextResponse.redirect(
      new URL("/admin/integrations/google?error=callback_failed", request.url)
    );
  }
}
