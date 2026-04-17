# User Management Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace env-var auth with file-based user management supporting Admin/Editor roles, setup wizard, and per-user edit tracking.

**Architecture:** Users stored in `content/settings/users.json`. Passwords hashed with `crypto.scrypt`. Session tokens encode `username:role:tokenVersion:signature` for Edge-compatible middleware. Setup wizard bootstraps first admin user.

**Tech Stack:** Next.js 14, React 18, TypeScript, Zod, Node.js `crypto`, Tailwind CSS, shadcn/ui components.

**Spec:** `docs/superpowers/specs/2026-04-17-user-management-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/lib/admin/users.ts` | User CRUD, password hashing, ID generation, migration, Zod schemas |
| `src/app/api/admin/users/route.ts` | GET (list) + POST (create) user API |
| `src/app/api/admin/users/[id]/route.ts` | PUT (update) + DELETE user API |
| `src/app/api/admin/profile/route.ts` | PUT own profile/password API |
| `src/app/api/admin/setup/route.ts` | POST create first user API |
| `src/app/(admin)/admin/setup/page.tsx` | Setup wizard UI |
| `src/app/(admin)/admin/users/page.tsx` | User management UI |
| `src/app/(admin)/admin/profile/page.tsx` | Profile/password change UI |

### Modified Files
| File | Change |
|------|--------|
| `src/lib/admin/auth.ts` | New token format `username:role:tokenVersion:signature`, read from users.json, scrypt verification |
| `src/middleware.ts` | Extract role from token, role-based route guards, setup redirect exception |
| `src/app/api/admin/auth/route.ts` | Use new auth functions, return role in response |
| `src/app/(admin)/admin/layout.tsx` | System sidebar section, user dropdown in header |
| `src/app/(admin)/admin/login/page.tsx` | Check for users, redirect to setup if none |
| `src/lib/admin/site-settings-types.ts` | Add `username` to `EditLogEntry` |
| `src/lib/admin/site-settings.ts` | Accept username in `appendEditLog` |
| `src/app/api/admin/products/[slug]/route.ts` | Pass username to appendEditLog |
| `src/app/api/admin/pages/[slug]/route.ts` | Pass username to appendEditLog |
| `src/app/api/admin/static-pages/[slug]/route.ts` | Pass username to appendEditLog |
| `src/components/admin/dashboard/RecentEditsWidget.tsx` | Show username in edit entries |

---

## Chunk 1: Core User Library + Auth Rewrite

### Task 1: Create `src/lib/admin/users.ts`

**Files:**
- Create: `src/lib/admin/users.ts`

- [ ] **Step 1: Create the users library**

```typescript
import crypto from "crypto";
import { z } from "zod";
import { readJson, writeJson } from "./content-store";

// --- Types ---

export interface StoredUser {
  id: string;
  username: string;
  displayName: string;
  role: "admin" | "editor";
  passwordHash: string;
  tokenVersion: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
}

export type PublicUser = Omit<StoredUser, "passwordHash">;

// --- Validation ---

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Lowercase alphanumeric and underscores only")
    .transform((v) => v.toLowerCase()),
  displayName: z.string().min(1).max(50),
  password: z.string().min(8),
  role: z.enum(["admin", "editor"]),
});

export const updateUserSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  role: z.enum(["admin", "editor"]).optional(),
  password: z.string().min(8).optional(),
});

export const profileUpdateSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
}).refine(
  (data) => !data.newPassword || data.currentPassword,
  { message: "Current password is required to set a new password", path: ["currentPassword"] }
);

export const setupSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Lowercase alphanumeric and underscores only")
    .transform((v) => v.toLowerCase()),
  displayName: z.string().min(1).max(50),
  password: z.string().min(8),
});

// --- Password Hashing ---

const SCRYPT_KEYLEN = 64;
const SALT_LEN = 32;

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(SALT_LEN);
  const key = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
  return `${salt.toString("hex")}:${key.toString("hex")}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [saltHex, keyHex] = hash.split(":");
  if (!saltHex || !keyHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expectedKey = Buffer.from(keyHex, "hex");
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
  return crypto.timingSafeEqual(derivedKey, expectedKey);
}

// --- ID Generation ---

function generateId(): string {
  const timestamp = Date.now();
  const random = crypto.randomBytes(3).toString("hex");
  return `u_${timestamp}_${random}`;
}

// --- CRUD ---

const USERS_PATH = "settings/users.json";

export async function loadUsers(): Promise<StoredUser[]> {
  return (await readJson<StoredUser[]>(USERS_PATH)) ?? [];
}

async function saveUsers(users: StoredUser[]): Promise<void> {
  await writeJson(USERS_PATH, users);
}

export async function hasAnyUsers(): Promise<boolean> {
  const users = await loadUsers();
  return users.length > 0;
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  const users = await loadUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function getUserByUsername(username: string): Promise<StoredUser | null> {
  const users = await loadUsers();
  return users.find((u) => u.username === username.toLowerCase()) ?? null;
}

export async function createUser(
  data: z.infer<typeof createUserSchema>,
  createdBy: string
): Promise<PublicUser> {
  const users = await loadUsers();
  if (users.some((u) => u.username === data.username)) {
    throw new Error("USERNAME_EXISTS");
  }
  const now = new Date().toISOString();
  const user: StoredUser = {
    id: generateId(),
    username: data.username,
    displayName: data.displayName,
    role: data.role,
    passwordHash: await hashPassword(data.password),
    tokenVersion: 1,
    createdAt: now,
    createdBy,
    updatedAt: now,
  };
  users.push(user);
  await saveUsers(users);
  return toPublicUser(user);
}

export async function updateUser(
  id: string,
  data: z.infer<typeof updateUserSchema>
): Promise<PublicUser> {
  const users = await loadUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("USER_NOT_FOUND");

  const user = users[index];

  // Guard: cannot demote last admin
  if (data.role && data.role !== "admin" && user.role === "admin") {
    const adminCount = users.filter((u) => u.role === "admin").length;
    if (adminCount <= 1) throw new Error("LAST_ADMIN");
  }

  if (data.displayName !== undefined) user.displayName = data.displayName;
  if (data.role !== undefined) user.role = data.role;
  if (data.password) {
    user.passwordHash = await hashPassword(data.password);
    user.tokenVersion += 1;
  }
  user.updatedAt = new Date().toISOString();

  users[index] = user;
  await saveUsers(users);
  return toPublicUser(user);
}

export async function deleteUser(id: string, requesterId: string): Promise<void> {
  const users = await loadUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("USER_NOT_FOUND");

  if (users[index].id === requesterId) throw new Error("CANNOT_DELETE_SELF");

  if (users[index].role === "admin") {
    const adminCount = users.filter((u) => u.role === "admin").length;
    if (adminCount <= 1) throw new Error("LAST_ADMIN");
  }

  users.splice(index, 1);
  await saveUsers(users);
}

export async function updateProfile(
  userId: string,
  data: z.infer<typeof profileUpdateSchema>
): Promise<PublicUser> {
  const users = await loadUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) throw new Error("USER_NOT_FOUND");

  const user = users[index];

  if (data.newPassword) {
    if (!data.currentPassword) throw new Error("CURRENT_PASSWORD_REQUIRED");
    const valid = await verifyPassword(data.currentPassword, user.passwordHash);
    if (!valid) throw new Error("WRONG_PASSWORD");
    user.passwordHash = await hashPassword(data.newPassword);
    user.tokenVersion += 1;
  }

  if (data.displayName !== undefined) user.displayName = data.displayName;
  user.updatedAt = new Date().toISOString();

  users[index] = user;
  await saveUsers(users);
  return toPublicUser(user);
}

// --- Migration ---

export async function migrateFromEnvVar(): Promise<number> {
  const raw = process.env.ADMIN_USERS;
  if (!raw) return 0;

  const pairs = raw.split(",").filter(Boolean);
  const users: StoredUser[] = [];
  const now = new Date().toISOString();

  for (const pair of pairs) {
    const [username, password] = pair.split(":");
    if (!username || !password) continue;
    users.push({
      id: generateId(),
      username: username.toLowerCase(),
      displayName: username,
      role: "admin",
      passwordHash: await hashPassword(password),
      tokenVersion: 1,
      createdAt: now,
      createdBy: "migration",
      updatedAt: now,
    });
  }

  if (users.length > 0) {
    await saveUsers(users);
    console.log(`[users] Migrated ${users.length} users from ADMIN_USERS env var.`);
  }
  return users.length;
}

// --- Helpers ---

export function toPublicUser(user: StoredUser): PublicUser {
  const { passwordHash: _, ...publicUser } = user;
  return publicUser;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors in `users.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/users.ts
git commit -m "feat: add user management library with CRUD, hashing, migration"
```

---

### Task 2: Rewrite `src/lib/admin/auth.ts`

**Files:**
- Modify: `src/lib/admin/auth.ts`

- [ ] **Step 1: Rewrite auth.ts with new token format**

Replace the entire file with:

```typescript
import { getUserByUsername, verifyPassword, hasAnyUsers, migrateFromEnvVar, loadUsers } from "./users";
import type { StoredUser } from "./users";

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
  const [username, role, versionStr, _signature] = parts;
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
): Promise<StoredUser | null> {
  // Migration check: if no users.json but ADMIN_USERS env var exists, migrate
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

// Node.js only: verify token version is still valid (not stale from password change)
export async function verifyTokenVersion(username: string, tokenVersion: number): Promise<boolean> {
  const users = await loadUsers();
  const user = users.find((u) => u.username === username);
  if (!user) return false;
  return user.tokenVersion === tokenVersion;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors (there will be errors in files that import the old auth API — we'll fix those next)

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/auth.ts
git commit -m "feat: rewrite auth with role-based tokens and scrypt verification"
```

---

### Task 3: Update auth API route

**Files:**
- Modify: `src/app/api/admin/auth/route.ts`

- [ ] **Step 1: Update the auth route**

Replace the entire file with:

```typescript
import { NextRequest, NextResponse } from "next/server";
import {
  validateCredentials,
  createSessionToken,
  COOKIE_NAME,
} from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password required" },
      { status: 400 }
    );
  }

  const user = await validateCredentials(username, password);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = createSessionToken(user.username, user.role, user.tokenVersion);
  const response = NextResponse.json({
    success: true,
    username: user.username,
    role: user.role,
    displayName: user.displayName,
  });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.FORCE_HTTPS === "true",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/auth/route.ts
git commit -m "feat: update auth route for role-based tokens"
```

---

### Task 4: Update middleware for role-based guards

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 1: Update middleware**

Replace the entire file with:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

// Routes that require admin role
const ADMIN_ONLY_PATTERNS = [
  /^\/admin\/users/,
  /^\/admin\/integrations/,
  /^\/api\/admin\/users/,
  /^\/api\/admin\/settings/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/setup" ||
    pathname === "/api/admin/auth" ||
    pathname === "/api/admin/setup"
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
    // Editors trying to access admin routes get redirected to dashboard
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
```

- [ ] **Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add role-based route guards to middleware"
```

---

### Task 5: Build and verify core compiles

- [ ] **Step 1: Run type check**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`

Fix any type errors before proceeding.

- [ ] **Step 2: Run build**

Run: `npm run build 2>&1 | tail -10`
Expected: Build succeeds

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve type errors from auth rewrite"
```

---

## Chunk 2: Setup Wizard + User API Routes

### Task 6: Create setup API route

**Files:**
- Create: `src/app/api/admin/setup/route.ts`

- [ ] **Step 1: Create the setup route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { hasAnyUsers, createUser, setupSchema, getUserByUsername } from "@/lib/admin/users";
import { createSessionToken, COOKIE_NAME } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Only works when no users exist
  if (await hasAnyUsers()) {
    return NextResponse.json({ error: "Setup already completed" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = setupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  const user = await createUser(
    { ...parsed.data, role: "admin" },
    "setup"
  );

  const fullUser = await getUserByUsername(user.username);
  if (!fullUser) {
    return NextResponse.json({ error: "User creation failed" }, { status: 500 });
  }

  const token = createSessionToken(fullUser.username, fullUser.role, fullUser.tokenVersion);
  const response = NextResponse.json({ success: true, user });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.FORCE_HTTPS === "true",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/setup/route.ts
git commit -m "feat: add setup wizard API route"
```

---

### Task 7: Create setup wizard page

**Files:**
- Create: `src/app/(admin)/admin/setup/page.tsx`

- [ ] **Step 1: Create the setup page**

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // If users already exist, redirect to login
    fetch("/api/admin/users/check")
      .then((r) => r.json())
      .then((data) => {
        if (data.hasUsers) router.replace("/admin/login");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, displayName, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Setup failed");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to Sunlite Admin</CardTitle>
          <CardDescription className="text-center">
            Create your admin account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Admin Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Add a check endpoint for setup page**

The setup page needs to know if users exist. Add a simple public endpoint.

Create `src/app/api/admin/users/check/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { hasAnyUsers } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ hasUsers: await hasAnyUsers() });
}
```

- [ ] **Step 3: Update middleware to allow the check endpoint**

In `src/middleware.ts`, add `/api/admin/users/check` to the public routes check:

```typescript
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/setup" ||
    pathname === "/api/admin/auth" ||
    pathname === "/api/admin/setup" ||
    pathname === "/api/admin/users/check"
  ) {
    return NextResponse.next();
  }
```

- [ ] **Step 4: Update login page to redirect to setup**

In `src/app/(admin)/admin/login/page.tsx`, add a useEffect at the top of the component (after existing state declarations):

```typescript
  useEffect(() => {
    fetch("/api/admin/users/check")
      .then((r) => r.json())
      .then((data) => {
        if (!data.hasUsers) router.replace("/admin/setup");
      })
      .catch(() => {});
  }, [router]);
```

Add `useEffect` to the imports from React.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/admin/setup/route.ts src/app/\(admin\)/admin/setup/page.tsx src/app/api/admin/users/check/route.ts src/middleware.ts src/app/\(admin\)/admin/login/page.tsx
git commit -m "feat: add setup wizard for first admin user"
```

---

### Task 8: Create user management API routes

**Files:**
- Create: `src/app/api/admin/users/route.ts`
- Create: `src/app/api/admin/users/[id]/route.ts`

- [ ] **Step 1: Create users list + create route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { loadUsers, createUser, createUserSchema, toPublicUser } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

export async function GET() {
  const users = await loadUsers();
  return NextResponse.json({ users: users.map(toPublicUser) });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  const createdBy = request.headers.get("x-admin-username") || "unknown";

  try {
    const user = await createUser(parsed.data, createdBy);
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "USERNAME_EXISTS") {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }
    throw err;
  }
}
```

- [ ] **Step 2: Create user update + delete route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser, updateUserSchema, toPublicUser } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const parsed = updateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  try {
    const user = await updateUser(params.id, parsed.data);
    return NextResponse.json({ user });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "USER_NOT_FOUND") {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      if (err.message === "LAST_ADMIN") {
        return NextResponse.json({ error: "Cannot demote the last admin" }, { status: 400 });
      }
    }
    throw err;
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const requesterId = request.headers.get("x-admin-username");

  // Look up requester's ID by username
  const { loadUsers } = await import("@/lib/admin/users");
  const users = await loadUsers();
  const requester = users.find((u) => u.username === requesterId);

  if (!requester) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteUser(params.id, requester.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "USER_NOT_FOUND") {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      if (err.message === "CANNOT_DELETE_SELF") {
        return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
      }
      if (err.message === "LAST_ADMIN") {
        return NextResponse.json({ error: "Cannot delete the last admin" }, { status: 400 });
      }
    }
    throw err;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/admin/users/route.ts src/app/api/admin/users/\[id\]/route.ts
git commit -m "feat: add user CRUD API routes"
```

---

### Task 9: Create profile API route

**Files:**
- Create: `src/app/api/admin/profile/route.ts`

- [ ] **Step 1: Create profile route**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { loadUsers, updateProfile, profileUpdateSchema, toPublicUser } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const username = request.headers.get("x-admin-username");
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await loadUsers();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}

export async function PUT(request: NextRequest) {
  const username = request.headers.get("x-admin-username");
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await loadUsers();
  const currentUser = users.find((u) => u.username === username);
  if (!currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await request.json();
  const parsed = profileUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid input" },
      { status: 400 }
    );
  }

  try {
    const user = await updateProfile(currentUser.id, parsed.data);
    return NextResponse.json({ user });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "WRONG_PASSWORD") {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }
    }
    throw err;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/admin/profile/route.ts
git commit -m "feat: add profile update API route"
```

---

### Task 10: Build check

- [ ] **Step 1: Type check + build**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Then: `npm run build 2>&1 | tail -10`

Fix any errors.

- [ ] **Step 2: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve type/build errors for user management APIs"
```

---

## Chunk 3: Admin UI Pages + Layout Updates

### Task 11: Create users management page

**Files:**
- Create: `src/app/(admin)/admin/users/page.tsx`

- [ ] **Step 1: Create users page**

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Pencil, Trash2 } from "lucide-react";

interface User {
  id: string;
  username: string;
  displayName: string;
  role: "admin" | "editor";
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "",
    role: "editor" as "admin" | "editor",
  });

  const fetchUsers = useCallback(async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  function resetForm() {
    setFormData({ username: "", displayName: "", password: "", role: "editor" });
    setShowForm(false);
    setEditingId(null);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        const body: Record<string, string> = {};
        if (formData.displayName) body.displayName = formData.displayName;
        if (formData.role) body.role = formData.role;
        if (formData.password) body.password = formData.password;

        const res = await fetch(`/api/admin/users/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Update failed");
          return;
        }
      } else {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Creation failed");
          return;
        }
      }
      resetForm();
      fetchUsers();
    } catch {
      setError("Network error");
    }
  }

  async function handleDelete(id: string, username: string) {
    if (!confirm(`Delete user "${username}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Delete failed");
      return;
    }
    fetchUsers();
  }

  function startEdit(user: User) {
    setFormData({
      username: user.username,
      displayName: user.displayName,
      password: "",
      role: user.role,
    });
    setEditingId(user.id);
    setShowForm(true);
    setError("");
  }

  if (loading) return <p className="text-gray-500">Loading users...</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        {!showForm && (
          <Button onClick={() => { resetForm(); setShowForm(true); }}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        )}
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit User" : "Add User"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!editingId && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required={!editingId}
                  placeholder="lowercase, letters/numbers/underscores"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "editor" })}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                {editingId ? "New Password (leave blank to keep current)" : "Password"}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingId}
                minLength={8}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
              <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Username</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Display Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Created</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium text-gray-900">{user.username}</td>
                <td className="px-4 py-3 text-gray-700">{user.displayName}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    user.role === "admin"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => startEdit(user)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id, user.username)}>
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(admin\)/admin/users/page.tsx
git commit -m "feat: add user management page"
```

---

### Task 12: Create profile page

**Files:**
- Create: `src/app/(admin)/admin/profile/page.tsx`

- [ ] **Step 1: Create profile page**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setDisplayName(data.user.displayName);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword && newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword && !currentPassword) {
      setError("Current password is required to change password");
      return;
    }

    setSaving(true);
    try {
      const body: Record<string, string> = { displayName };
      if (newPassword) {
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }

      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Update failed");
        return;
      }

      setMessage("Profile updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

            <hr className="border-gray-200" />

            <p className="text-sm text-gray-500">Leave password fields blank to keep your current password.</p>

            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}

            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(admin\)/admin/profile/page.tsx
git commit -m "feat: add profile page for password and display name changes"
```

---

### Task 13: Update admin layout (sidebar + header)

**Files:**
- Modify: `src/app/(admin)/admin/layout.tsx`

- [ ] **Step 1: Update layout with System section and user dropdown**

Replace the entire file with:

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  FileText,
  File,
  FilePlus,
  BarChart3,
  MousePointerClick,
  Cookie,
  LogOut,
  Users,
  User,
  ChevronDown,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
};

const navSections: NavSection[] = [
  {
    title: "Main",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/content/products", label: "Product Pages", icon: Package },
      { href: "/admin/content/landing-pages", label: "Landing Pages", icon: FileText },
      { href: "/admin/content/static-pages", label: "Static Pages", icon: File },
      { href: "/admin/pages/new", label: "New Landing Page", icon: FilePlus },
    ],
  },
  {
    title: "Integrations",
    adminOnly: true,
    items: [
      { href: "/admin/integrations/google", label: "Google Analytics", icon: BarChart3 },
      { href: "/admin/integrations/openreplay", label: "Heatmap & Sessions", icon: MousePointerClick },
      { href: "/admin/integrations/cookie-consent", label: "Cookie Consent", icon: Cookie },
    ],
  },
  {
    title: "System",
    adminOnly: true,
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string; displayName: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser({
            username: data.user.username,
            role: data.user.role,
            displayName: data.user.displayName,
          });
        }
      })
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Don't show shell on login or setup page
  if (pathname === "/admin/login" || pathname === "/admin/setup") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  function isActive(item: NavItem): boolean {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  }

  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Sunlite Admin</h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <User className="h-4 w-4" />
            <span>{currentUser?.displayName || "User"}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <Link
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setUserDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
              >
                <span className="flex items-center gap-2">
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-53px)] p-4">
          <nav className="space-y-5">
            {navSections
              .filter((section) => !section.adminOnly || isAdmin)
              .map((section) => (
                <div key={section.title}>
                  <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {section.title}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item)
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(admin\)/admin/layout.tsx
git commit -m "feat: add user dropdown and role-based sidebar sections"
```

---

### Task 14: Build and verify

- [ ] **Step 1: Type check + build**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Then: `npm run build 2>&1 | tail -10`

Fix any errors.

- [ ] **Step 2: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve build errors for admin UI"
```

---

## Chunk 4: Edit Log Enhancement

### Task 15: Update edit log types and function

**Files:**
- Modify: `src/lib/admin/site-settings-types.ts`
- Modify: `src/lib/admin/site-settings.ts`

- [ ] **Step 1: Add username to EditLogEntry**

In `src/lib/admin/site-settings-types.ts`, update the interface:

```typescript
export interface EditLogEntry {
  slug: string
  pageType: "product" | "landing" | "static"
  label: string
  timestamp: string
  username?: string
}
```

- [ ] **Step 2: Update appendEditLog to accept username**

In `src/lib/admin/site-settings.ts`, change the function signature:

```typescript
export async function appendEditLog(entry: Omit<EditLogEntry, "timestamp">): Promise<void> {
```

No change needed — `username` is already optional in the type, so existing callers won't break. The content API routes will start passing it.

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/site-settings-types.ts
git commit -m "feat: add username field to edit log entries"
```

---

### Task 16: Update content API routes to pass username

**Files:**
- Modify: `src/app/api/admin/products/[slug]/route.ts`
- Modify: `src/app/api/admin/pages/[slug]/route.ts`
- Modify: `src/app/api/admin/static-pages/[slug]/route.ts`

- [ ] **Step 1: Update products route**

In `src/app/api/admin/products/[slug]/route.ts`, in the PUT handler, change the appendEditLog call. The `request` parameter is already available. Add username extraction:

Find this line:
```typescript
await appendEditLog({ slug: parsed.data.slug, pageType: "product", label: parsed.data.label });
```

Replace with:
```typescript
const username = request.headers.get("x-admin-username") || undefined;
await appendEditLog({ slug: parsed.data.slug, pageType: "product", label: parsed.data.label, username });
```

- [ ] **Step 2: Update pages route**

In `src/app/api/admin/pages/[slug]/route.ts`, same change:

Find:
```typescript
await appendEditLog({ slug: params.slug, pageType: "landing", label: parsed.data.h1 || params.slug });
```

Replace with:
```typescript
const username = request.headers.get("x-admin-username") || undefined;
await appendEditLog({ slug: params.slug, pageType: "landing", label: parsed.data.h1 || params.slug, username });
```

- [ ] **Step 3: Update static-pages route**

In `src/app/api/admin/static-pages/[slug]/route.ts`, same change:

Find:
```typescript
await appendEditLog({ slug: parsed.data.slug, pageType: "static", label: parsed.data.label });
```

Replace with:
```typescript
const username = request.headers.get("x-admin-username") || undefined;
await appendEditLog({ slug: parsed.data.slug, pageType: "static", label: parsed.data.label, username });
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/admin/products/\[slug\]/route.ts src/app/api/admin/pages/\[slug\]/route.ts src/app/api/admin/static-pages/\[slug\]/route.ts
git commit -m "feat: pass username to edit log from content API routes"
```

---

### Task 17: Update RecentEditsWidget to show username

**Files:**
- Modify: `src/components/admin/dashboard/RecentEditsWidget.tsx`

- [ ] **Step 1: Add username to the widget**

In `src/components/admin/dashboard/RecentEditsWidget.tsx`:

Add `username?: string` to the `EditEntry` interface:

```typescript
interface EditEntry {
  slug: string
  pageType: "product" | "landing" | "static"
  label: string
  timestamp: string
  username?: string
}
```

In the edit entry row rendering, add the username display after the type badge. Find this block:

```tsx
<span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${typeColors[edit.pageType] || "bg-gray-100 text-gray-600"}`}>
  {edit.pageType}
</span>
```

Add after it:
```tsx
{edit.username && (
  <span className="text-xs text-gray-400 flex-shrink-0">
    by {edit.username}
  </span>
)}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/admin/dashboard/RecentEditsWidget.tsx
git commit -m "feat: show username in recent edits widget"
```

---

### Task 18: Final build + verification

- [ ] **Step 1: Full type check and build**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Then: `npm run build 2>&1 | tail -15`

Expected: Build succeeds with no errors.

- [ ] **Step 2: Fix any remaining errors and commit**

```bash
git add -A
git commit -m "fix: resolve any remaining build errors"
```

- [ ] **Step 3: Push to sls2026**

```bash
git push sls2026 main
```
