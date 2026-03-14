const COOKIE_NAME = "admin_session";

interface AdminUser {
  username: string;
  password: string;
}

function getAdminUsers(): AdminUser[] {
  const raw = process.env.ADMIN_USERS || "";
  return raw
    .split(",")
    .filter(Boolean)
    .map((pair) => {
      const [username, password] = pair.split(":");
      return { username, password };
    });
}

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET env var is required");
  return secret;
}

function simpleHash(str: string): string {
  // Simple HMAC-like hash using string operations
  // Compatible with both Node.js and Edge Runtime
  const secret = getSecret();
  let hash = 0;
  const combined = secret + ":" + str + ":" + secret;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  // Create a longer hash by repeating with different seeds
  let hash2 = 0;
  const combined2 = str + ":" + secret + ":" + str;
  for (let i = 0; i < combined2.length; i++) {
    const char = combined2.charCodeAt(i);
    hash2 = ((hash2 << 7) - hash2 + char) | 0;
  }
  return Math.abs(hash).toString(36) + Math.abs(hash2).toString(36);
}

function sign(username: string): string {
  const signature = simpleHash(username);
  return `${username}:${signature}`;
}

export function verifyToken(token: string): string | null {
  const colonIndex = token.indexOf(":");
  if (colonIndex === -1) return null;
  const username = token.substring(0, colonIndex);
  if (!username) return null;
  const expected = sign(username);
  if (token === expected) return username;
  return null;
}

export function validateCredentials(
  username: string,
  password: string
): boolean {
  const users = getAdminUsers();
  return users.some((u) => u.username === username && u.password === password);
}

export function createSessionToken(username: string): string {
  return sign(username);
}

export { COOKIE_NAME };
