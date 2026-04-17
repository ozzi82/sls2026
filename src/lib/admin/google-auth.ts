import { readJson, writeJson } from "./content-store";

interface GoogleTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  email?: string;
}

const TOKENS_PATH = "settings/google-tokens.json";

export async function getValidAccessToken(): Promise<string | null> {
  const tokens = await readJson<GoogleTokens>(TOKENS_PATH);
  if (!tokens || !tokens.refreshToken) return null;

  // If token is still valid (with 5 min buffer), return it
  if (tokens.accessToken && tokens.expiresAt > Date.now() + 5 * 60 * 1000) {
    return tokens.accessToken;
  }

  // Refresh the token
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: tokens.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!res.ok) {
      console.error("[google-auth] Token refresh failed:", await res.text());
      return null;
    }

    const data = await res.json();
    tokens.accessToken = data.access_token;
    tokens.expiresAt = Date.now() + data.expires_in * 1000;
    await writeJson(TOKENS_PATH, tokens);

    return tokens.accessToken;
  } catch (err) {
    console.error("[google-auth] Refresh error:", err);
    return null;
  }
}
