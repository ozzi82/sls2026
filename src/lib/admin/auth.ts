// Edge-compatible module — no Node.js imports at top level.
// Node.js-only functions use dynamic imports.

export const COOKIE_NAME = "admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET env var is required");
  return secret;
}

// Edge-compatible hash for session token signing
function simpleHash(str: string): string {
  const secret = getSecret();
  let hash = 0;
  const combined = secret + ":" + str + ":" + secret;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  let hash2 = 0;
  const combined2 = str + ":" + secret + ":" + str;
  for (let i = 0; i < combined2.length; i++) {
    const char = combined2.charCodeAt(i);
    hash2 = ((hash2 << 7) - hash2 + char) | 0;
  }
  return Math.abs(hash).toString(36) + Math.abs(hash2).toString(36);
}

// Token format: username:role:tokenVersion:signature
export function createSessionToken(username: string, role: string, tokenVersion: number): string {
  const payload = `${username}:${role}:${tokenVersion}`;
  const signature = simpleHash(payload);
  return `${payload}:${signature}`;
}

// Edge-compatible: extracts username and role from token without file reads
export function verifyToken(token: string): { username: string; role: string; tokenVersion: number } | null {
  const parts = token.split(":");
  if (parts.length !== 4) return null;
  const [username, role, versionStr] = parts;
  if (!username || !role || !versionStr) return null;
  const tokenVersion = parseInt(versionStr, 10);
  if (isNaN(tokenVersion)) return null;

  const payload = `${username}:${role}:${tokenVersion}`;
  const expectedSignature = simpleHash(payload);
  if (parts[3] !== expectedSignature) return null;

  return { username, role, tokenVersion };
}

// Node.js only: validates credentials against users.json
export async function validateCredentials(
  username: string,
  password: string
) {
  const { getUserByUsername, verifyPassword, hasAnyUsers, migrateFromEnvVar } = await import("./users");

  const hasUsers = await hasAnyUsers();
  if (!hasUsers) {
    const migrated = await migrateFromEnvVar();
    if (migrated === 0) return null;
  }

  const user = await getUserByUsername(username);
  if (!user) return null;

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return null;

  return user;
}

// Node.js only: verify token version is still valid
export async function verifyTokenVersion(username: string, tokenVersion: number): Promise<boolean> {
  const { loadUsers } = await import("./users");
  const users = await loadUsers();
  const user = users.find((u: { username: string }) => u.username === username);
  if (!user) return false;
  return user.tokenVersion === tokenVersion;
}
