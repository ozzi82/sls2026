# Admin CMS Editor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a built-in admin editor at `/admin` for editing and creating SEO landing pages stored as JSON files.

**Architecture:** Next.js 14 app routes under `src/app/(admin)/admin/` (route group) with API routes at `src/app/api/admin/` that read/write JSON files in `content/landing-pages/`. The admin uses its own root layout (no public Header/Footer/ThemeSwitcher). Cookie-based auth via middleware. shadcn/ui for UI components, Tiptap for WYSIWYG editing.

**Important layout note:** The public site's root layout (`src/app/layout.tsx`) includes Header, Footer, and ThemeSwitcher. Admin pages must NOT inherit these. We solve this using Next.js route groups: move existing pages into `src/app/(public)/` with their own layout containing the public chrome, and place admin pages in `src/app/(admin)/` with a minimal layout. The root `src/app/layout.tsx` becomes a bare HTML shell shared by both.

**Tech Stack:** Next.js 14, shadcn/ui, Tiptap, Zod, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-03-14-admin-cms-editor-design.md`

---

## Chunk 1: Setup & Auth

### Task 1: Install Dependencies and Initialize shadcn/ui

**Files:**
- Modify: `package.json`
- Create: `components.json` (shadcn/ui config)
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Install Tiptap and Zod**

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/pm zod
```

- [ ] **Step 2: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: `tailwind.config.ts`
- Components alias: `@/components/ui`
- Utils alias: `@/lib/utils`

- [ ] **Step 3: Install shadcn/ui components**

```bash
npx shadcn@latest add button input table select card tabs dialog textarea badge toast label separator
```

- [ ] **Step 4: Verify the dev server still starts**

```bash
npm run dev
```

Visit `http://localhost:3000` — the public site should look unchanged.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: install shadcn/ui, tiptap, and zod dependencies"
```

---

### Task 2: Restructure Layouts with Route Groups

**Files:**
- Modify: `src/app/layout.tsx` — strip to bare HTML shell (fonts + metadata only)
- Create: `src/app/(public)/layout.tsx` — move Header, Footer, ThemeSwitcher here
- Move: all existing pages in `src/app/` (except `layout.tsx`) into `src/app/(public)/`

This is the most critical structural change. Without it, admin pages will render with the public site's Header, Footer, and ThemeSwitcher.

- [ ] **Step 1: Create the `(public)` route group directory**

```bash
mkdir -p src/app/\(public\)
```

- [ ] **Step 2: Move all existing pages into `(public)`**

Move these directories/files into `src/app/(public)/`:
- `about/`, `contact/`, `gallery/`, `get-a-quote/`, `products/`, `resources/`, `services/`, `signs/`, `why-sunlite/`
- `page.tsx` (homepage)
- `sitemap.ts`

```bash
# Move directories
for dir in about contact gallery get-a-quote products resources services signs why-sunlite; do
  mv "src/app/$dir" "src/app/(public)/$dir"
done

# Move files
mv src/app/page.tsx "src/app/(public)/page.tsx"
mv src/app/sitemap.ts "src/app/(public)/sitemap.ts"
```

- [ ] **Step 3: Create the public layout**

Create `src/app/(public)/layout.tsx` with the Header/Footer/ThemeSwitcher that was in the root layout:

```tsx
// src/app/(public)/layout.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('sunlite-theme');if(t)document.documentElement.classList.add('theme-'+t)}catch(e){}})()`,
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
      <ThemeSwitcher />
    </>
  );
}
```

- [ ] **Step 4: Simplify the root layout to a bare HTML shell**

Update `src/app/layout.tsx` to keep only the `<html>`, `<body>`, fonts, metadata, and JSON-LD — remove Header, Footer, ThemeSwitcher, and their imports:

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Instrument_Serif, Outfit, DM_Sans, Space_Grotesk, Inter, Bebas_Neue, Source_Sans_3 } from "next/font/google";
import "./globals.css";

// ... keep all font declarations and metadata/JSON-LD as-is ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${outfit.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${inter.variable} ${bebasNeue.variable} ${sourceSans.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify the public site still works**

```bash
npm run dev
```

Visit `http://localhost:3000` — the public site should look exactly the same. Check a few pages. The route group `(public)` is invisible in the URL.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: restructure layouts with route groups for admin separation"
```

---

### Task 3: Environment Variables

**Files:**
- Create: `.env.local`
- Modify: `.gitignore` (verify `.env.local` is ignored)

- [ ] **Step 1: Create `.env.local` with admin credentials**

```env
ADMIN_USERS=ozan:admin123
ADMIN_SECRET=sunlite-admin-secret-change-me-in-production
```

- [ ] **Step 2: Verify `.env.local` is in `.gitignore`**

Next.js gitignore templates include this by default. Check and add if missing:

```
.env.local
```

- [ ] **Step 3: Commit** (only `.gitignore` if changed — never commit `.env.local`)

```bash
git add .gitignore
git commit -m "chore: ensure .env.local is gitignored"
```

---

### Task 3: Auth Utility Library

**Files:**
- Create: `src/lib/admin/auth.ts`

This module handles credential parsing, cookie signing/verifying, and is shared by middleware and API routes.

- [ ] **Step 1: Create the auth utility**

```typescript
// src/lib/admin/auth.ts
import crypto from "crypto";

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

function sign(username: string): string {
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(username);
  return `${username}:${hmac.digest("hex")}`;
}

export function verifyToken(token: string): string | null {
  const [username, signature] = token.split(":");
  if (!username || !signature) return null;
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
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/admin/auth.ts
git commit -m "feat: add admin auth utility (cookie signing, credential validation)"
```

---

### Task 4: Auth API Route

**Files:**
- Create: `src/app/api/admin/auth/route.ts`

- [ ] **Step 1: Create the auth route**

```typescript
// src/app/api/admin/auth/route.ts
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

  if (!validateCredentials(username, password)) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = createSessionToken(username);
  const response = NextResponse.json({ success: true, username });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
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

- [ ] **Step 2: Test manually**

```bash
# Start dev server, then:
curl -X POST http://localhost:3000/api/admin/auth \
  -H "Content-Type: application/json" \
  -d '{"username":"ozan","password":"admin123"}'
```

Expected: `{"success":true,"username":"ozan"}` with Set-Cookie header.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/admin/auth/route.ts
git commit -m "feat: add admin auth API route (login/logout)"
```

---

### Task 5: Middleware

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Create the middleware**

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and API auth route
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/auth")
  ) {
    return NextResponse.next();
  }

  // Check auth cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !verifyToken(token)) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

- [ ] **Step 2: Test manually**

Visit `http://localhost:3000/admin` — should redirect to `/admin/login`.

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add auth middleware protecting /admin routes"
```

---

### Task 6: Login Page

**Files:**
- Create: `src/app/(admin)/admin/login/page.tsx`

- [ ] **Step 1: Create the login page**

```tsx
// src/app/(admin)/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sunlite Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              />
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 2: Test manually**

Visit `http://localhost:3000/admin/login`. Enter credentials. Should redirect to `/admin` on success (will 404 until dashboard is built — that's expected).

- [ ] **Step 3: Commit**

```bash
git add "src/app/(admin)/admin/login/page.tsx"
git commit -m "feat: add admin login page"
```

---

## Chunk 2: Admin Data Layer (API Routes & Shared Utilities)

### Task 7: JSON File Utilities

**Files:**
- Create: `src/lib/admin/pages.ts`
- Create: `src/lib/admin/validation.ts`

This is the core data layer — reading, writing, and validating landing page JSON files.

- [ ] **Step 1: Create the Zod validation schema**

```typescript
// src/lib/admin/validation.ts
import { z } from "zod";

export const landingPageSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  hubSlug: z.string().min(1),
  hubName: z.string().min(1),
  primaryKeyword: z.string().min(1),
  secondaryKeywords: z.array(z.string()),
  title: z.string().min(1),
  metaDescription: z.string().min(1),
  h1: z.string().min(1),
  h1Highlight: z.string().min(1),
  heroSubtitle: z.string().min(1),
  sections: z.array(
    z.object({
      heading: z.string().min(1),
      content: z.string().min(1),
    })
  ),
  faqs: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })
  ),
  relatedSlugs: z.array(z.string()),
  schemaType: z.enum(["Product", "Service"]),
});

// Type assertion to ensure Zod schema stays in sync with the canonical type
import type { LandingPage } from "@/lib/landing-pages/types";
type _AssertCompatible = LandingPage extends z.infer<typeof landingPageSchema> ? true : never;
```

- [ ] **Step 2: Create the JSON file read/write utilities**

```typescript
// src/lib/admin/pages.ts
import fs from "fs";
import path from "path";
import { LandingPage } from "@/lib/landing-pages/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "landing-pages");

export const hubToFiles: Record<string, string[]> = {
  "cabinet-signs": ["cabinet-signs.json"],
  "channel-letters": ["channel-letters-1.json", "channel-letters-2.json"],
  "blade-signs": ["blade-signs.json"],
  "flat-cut-letters": ["flat-cut-letters.json"],
  "light-boxes": ["light-boxes.json"],
  "logo-boxes": ["logo-boxes.json"],
  "push-through-signs": ["push-through-signs.json"],
  "general": ["general.json"],
  "engineering": ["engineering.json"],
  "illumination": ["illumination.json"],
};

export const hubNames: Record<string, string> = {
  "cabinet-signs": "Cabinet Signs",
  "channel-letters": "Channel Letters",
  "blade-signs": "Blade Signs",
  "flat-cut-letters": "Flat Cut Letters",
  "light-boxes": "Light Boxes",
  "logo-boxes": "Logo Boxes",
  "push-through-signs": "Push-Through Signs",
  "general": "General",
  "engineering": "Engineering",
  "illumination": "Illumination",
};

function readJsonFile(filename: string): LandingPage[] {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeJsonFile(filename: string, data: LandingPage[]) {
  const filePath = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function getAllPages(): LandingPage[] {
  const allPages: LandingPage[] = [];
  for (const files of Object.values(hubToFiles)) {
    for (const file of files) {
      allPages.push(...readJsonFile(file));
    }
  }
  return allPages;
}

export function getPageBySlug(
  slug: string
): { page: LandingPage; file: string } | null {
  for (const [, files] of Object.entries(hubToFiles)) {
    for (const file of files) {
      const pages = readJsonFile(file);
      const page = pages.find((p) => p.slug === slug);
      if (page) return { page, file };
    }
  }
  return null;
}

export function updatePage(
  slug: string,
  updated: LandingPage
): { success: boolean; error?: string } {
  const result = getPageBySlug(slug);
  if (!result) return { success: false, error: "Page not found" };

  const pages = readJsonFile(result.file);
  const index = pages.findIndex((p) => p.slug === slug);
  pages[index] = updated;
  writeJsonFile(result.file, pages);
  return { success: true };
}

export function createPage(
  page: LandingPage
): { success: boolean; error?: string } {
  // Check slug uniqueness
  const existing = getPageBySlug(page.slug);
  if (existing) {
    return { success: false, error: `Slug "${page.slug}" already exists` };
  }

  // Determine target file
  const files = hubToFiles[page.hubSlug];
  if (!files) {
    return { success: false, error: `Unknown hub: ${page.hubSlug}` };
  }

  // For channel-letters, append to the second file
  const targetFile = files.length > 1 ? files[files.length - 1] : files[0];
  const pages = readJsonFile(targetFile);
  pages.push(page);
  writeJsonFile(targetFile, pages);
  return { success: true };
}
```

- [ ] **Step 3: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/admin/validation.ts src/lib/admin/pages.ts
git commit -m "feat: add admin data layer (JSON read/write, Zod validation)"
```

---

### Task 8: Pages API Routes

**Files:**
- Create: `src/app/api/admin/pages/route.ts`
- Create: `src/app/api/admin/pages/[slug]/route.ts`

- [ ] **Step 1: Create the pages list + create route**

```typescript
// src/app/api/admin/pages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllPages, createPage, hubNames, hubToFiles } from "@/lib/admin/pages";
import { landingPageSchema } from "@/lib/admin/validation";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const hub = request.nextUrl.searchParams.get("hub");
  let pages = getAllPages();

  if (hub) {
    pages = pages.filter((p) => p.hubSlug === hub);
  }

  return NextResponse.json({
    pages,
    hubs: Object.entries(hubNames).map(([slug, name]) => ({ slug, name })),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = landingPageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Verify hubSlug is valid
  if (!hubToFiles[parsed.data.hubSlug]) {
    return NextResponse.json(
      { error: `Unknown hub: ${parsed.data.hubSlug}` },
      { status: 400 }
    );
  }

  const result = createPage(parsed.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json({ success: true, page: parsed.data }, { status: 201 });
}
```

- [ ] **Step 2: Create the single page get + update route**

```typescript
// src/app/api/admin/pages/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPageBySlug, updatePage } from "@/lib/admin/pages";
import { landingPageSchema } from "@/lib/admin/validation";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const result = getPageBySlug(params.slug);
  if (!result) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }
  return NextResponse.json(result.page);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const parsed = landingPageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const result = updatePage(params.slug, parsed.data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ success: true, page: parsed.data });
}
```

- [ ] **Step 3: Test manually with curl**

```bash
# Get all pages
curl http://localhost:3000/api/admin/pages -b "admin_session=<token>"

# Get single page
curl http://localhost:3000/api/admin/pages/illuminated-cabinet-signs -b "admin_session=<token>"
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/admin/pages/
git commit -m "feat: add admin pages API routes (list, get, create, update)"
```

---

## Chunk 3: Admin Layout & Dashboard

### Task 9: Admin Layout

**Files:**
- Create: `src/app/(admin)/admin/layout.tsx`

The admin lives inside the `(admin)` route group, which inherits only the bare root layout (HTML/body/fonts). No Header, Footer, or ThemeSwitcher.

- [ ] **Step 1: Create the admin layout**

```tsx
// src/app/(admin)/admin/layout.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FilePlus, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show shell on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/pages/new", label: "New Page", icon: FilePlus },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          Sunlite Admin
        </h1>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-53px)] p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify it renders**

Visit `http://localhost:3000/admin` (after logging in). Should see header + sidebar with empty main area.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(admin)/admin/layout.tsx"
git commit -m "feat: add admin layout with sidebar and header"
```

---

### Task 10: Dashboard Page

**Files:**
- Create: `src/app/(admin)/admin/page.tsx`

- [ ] **Step 1: Create the dashboard**

```tsx
// src/app/(admin)/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus } from "lucide-react";

interface PageSummary {
  slug: string;
  hubSlug: string;
  hubName: string;
  h1: string;
  h1Highlight: string;
  primaryKeyword: string;
}

interface Hub {
  slug: string;
  name: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [pages, setPages] = useState<PageSummary[]>([]);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [search, setSearch] = useState("");
  const [hubFilter, setHubFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((res) => res.json())
      .then((data) => {
        setPages(data.pages);
        setHubs(data.hubs);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = pages.filter((page) => {
    const matchesSearch =
      !search ||
      `${page.h1} ${page.h1Highlight} ${page.slug} ${page.primaryKeyword}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesHub =
      hubFilter === "all" || page.hubSlug === hubFilter;
    return matchesSearch && matchesHub;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading pages...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Landing Pages</h2>
        <Button onClick={() => router.push("/admin/pages/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Page
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={hubFilter} onValueChange={setHubFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Hubs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Hubs</SelectItem>
            {hubs.map((hub) => (
              <SelectItem key={hub.slug} value={hub.slug}>
                {hub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No pages found.</p>
      ) : (
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Hub</TableHead>
                <TableHead>Primary Keyword</TableHead>
                <TableHead>Slug</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((page) => (
                <TableRow
                  key={page.slug}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => router.push(`/admin/pages/${page.slug}`)}
                >
                  <TableCell className="font-medium">
                    {page.h1} {page.h1Highlight}
                  </TableCell>
                  <TableCell>{page.hubName}</TableCell>
                  <TableCell>{page.primaryKeyword}</TableCell>
                  <TableCell className="text-gray-500 font-mono text-sm">
                    {page.slug}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="text-sm text-gray-400 mt-4">
        {filtered.length} of {pages.length} pages
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Test manually**

Visit `http://localhost:3000/admin`. Should see a table of 120 pages. Test search and hub filter.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(admin)/admin/page.tsx"
git commit -m "feat: add admin dashboard with page table, search, and hub filter"
```

---

## Chunk 4: Rich Text Editor & Page Form

### Task 11: Tiptap Rich Text Editor Component

**Files:**
- Create: `src/components/admin/RichTextEditor.tsx`

- [ ] **Step 1: Create the WYSIWYG editor**

```tsx
// src/components/admin/RichTextEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading3,
  Heading4,
  Link as LinkIcon,
  Undo,
  Redo,
  Unlink,
} from "lucide-react";
import { useCallback, useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "" },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      title={title}
      className="h-8 w-8 p-0"
    >
      {children}
    </Button>
  );

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          isActive={editor.isActive("heading", { level: 4 })}
          title="Heading 4"
        >
          <Heading4 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive("link")}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        {editor.isActive("link") && (
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Remove Link"
          >
            <Unlink className="h-4 w-4" />
          </ToolbarButton>
        )}
        <div className="flex-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[180px]"
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/admin/RichTextEditor.tsx
git commit -m "feat: add Tiptap rich text editor component"
```

---

### Task 12: PageForm Component

**Files:**
- Create: `src/components/admin/PageForm.tsx`

This is the main form used by both edit and create pages.

- [ ] **Step 1: Create the PageForm**

```tsx
// src/components/admin/PageForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  X,
  Save,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";

const HUB_OPTIONS = [
  { slug: "cabinet-signs", name: "Cabinet Signs" },
  { slug: "channel-letters", name: "Channel Letters" },
  { slug: "blade-signs", name: "Blade Signs" },
  { slug: "flat-cut-letters", name: "Flat Cut Letters" },
  { slug: "light-boxes", name: "Light Boxes" },
  { slug: "logo-boxes", name: "Logo Boxes" },
  { slug: "push-through-signs", name: "Push-Through Signs" },
  { slug: "general", name: "General" },
  { slug: "engineering", name: "Engineering" },
  { slug: "illumination", name: "Illumination" },
];

interface PageFormData {
  slug: string;
  hubSlug: string;
  hubName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  h1Highlight: string;
  heroSubtitle: string;
  sections: { heading: string; content: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  schemaType: "Product" | "Service";
}

interface PageFormProps {
  initialData?: PageFormData;
  allSlugs: string[];
  isEdit: boolean;
  onSubmit: (data: PageFormData) => Promise<{ success: boolean; error?: string }>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PageForm({
  initialData,
  allSlugs,
  isEdit,
  onSubmit,
}: PageFormProps) {
  const [form, setForm] = useState<PageFormData>(
    initialData || {
      slug: "",
      hubSlug: "",
      hubName: "",
      primaryKeyword: "",
      secondaryKeywords: [],
      title: "",
      metaDescription: "",
      h1: "",
      h1Highlight: "",
      heroSubtitle: "",
      sections: [{ heading: "", content: "" }],
      faqs: [{ question: "", answer: "" }],
      relatedSlugs: [],
      schemaType: "Product",
    }
  );

  const [seoOpen, setSeoOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [keywordInput, setKeywordInput] = useState("");
  const [relatedInput, setRelatedInput] = useState("");

  function update<K extends keyof PageFormData>(key: K, value: PageFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-generate slug from h1 fields on create
      if (!isEdit && (key === "h1" || key === "h1Highlight")) {
        const h1 = key === "h1" ? (value as string) : prev.h1;
        const highlight = key === "h1Highlight" ? (value as string) : prev.h1Highlight;
        next.slug = slugify(`${h1} ${highlight}`);
      }
      // Auto-derive hubName from hubSlug
      if (key === "hubSlug") {
        const hub = HUB_OPTIONS.find((h) => h.slug === value);
        next.hubName = hub?.name || "";
      }
      return next;
    });
  }

  function updateSection(
    index: number,
    field: "heading" | "content",
    value: string
  ) {
    const sections = [...form.sections];
    sections[index] = { ...sections[index], [field]: value };
    setForm((prev) => ({ ...prev, sections }));
  }

  function addSection() {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { heading: "", content: "" }],
    }));
  }

  function removeSection(index: number) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  }

  function moveSection(index: number, direction: -1 | 1) {
    const sections = [...form.sections];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];
    setForm((prev) => ({ ...prev, sections }));
  }

  function updateFaq(
    index: number,
    field: "question" | "answer",
    value: string
  ) {
    const faqs = [...form.faqs];
    faqs[index] = { ...faqs[index], [field]: value };
    setForm((prev) => ({ ...prev, faqs }));
  }

  function addFaq() {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  }

  function removeFaq(index: number) {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  }

  function moveFaq(index: number, direction: -1 | 1) {
    const faqs = [...form.faqs];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= faqs.length) return;
    [faqs[index], faqs[newIndex]] = [faqs[newIndex], faqs[index]];
    setForm((prev) => ({ ...prev, faqs }));
  }

  function addKeyword() {
    const kw = keywordInput.trim();
    if (kw && !form.secondaryKeywords.includes(kw)) {
      update("secondaryKeywords", [...form.secondaryKeywords, kw]);
    }
    setKeywordInput("");
  }

  function removeKeyword(kw: string) {
    update(
      "secondaryKeywords",
      form.secondaryKeywords.filter((k) => k !== kw)
    );
  }

  function addRelatedSlug() {
    const slug = relatedInput.trim();
    if (slug && !form.relatedSlugs.includes(slug) && allSlugs.includes(slug)) {
      update("relatedSlugs", [...form.relatedSlugs, slug]);
    }
    setRelatedInput("");
  }

  function removeRelatedSlug(slug: string) {
    update(
      "relatedSlugs",
      form.relatedSlugs.filter((s) => s !== slug)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const result = await onSubmit(form);
    if (result.success) {
      setMessage({ type: "success", text: "Saved successfully!" });
    } else {
      setMessage({ type: "error", text: result.error || "Save failed" });
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Save button + status */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save"}
        </Button>
        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hub</Label>
              <Select
                value={form.hubSlug}
                onValueChange={(v) => update("hubSlug", v)}
                disabled={isEdit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hub..." />
                </SelectTrigger>
                <SelectContent>
                  {HUB_OPTIONS.map((hub) => (
                    <SelectItem key={hub.slug} value={hub.slug}>
                      {hub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Schema Type</Label>
              <Select
                value={form.schemaType}
                onValueChange={(v) =>
                  update("schemaType", v as "Product" | "Service")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              disabled={isEdit}
              className="font-mono"
            />
            {!isEdit && (
              <p className="text-xs text-gray-500">
                Auto-generated from heading. Edit if needed.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hero */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>H1</Label>
              <Input
                value={form.h1}
                onChange={(e) => update("h1", e.target.value)}
                placeholder="e.g. Wholesale Illuminated"
              />
            </div>
            <div className="space-y-2">
              <Label>H1 Highlight</Label>
              <Input
                value={form.h1Highlight}
                onChange={(e) => update("h1Highlight", e.target.value)}
                placeholder="e.g. Cabinet Signs"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <Textarea
              value={form.heroSubtitle}
              onChange={(e) => update("heroSubtitle", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO (collapsible) */}
      <Card>
        <CardHeader
          className="cursor-pointer"
          onClick={() => setSeoOpen(!seoOpen)}
        >
          <div className="flex items-center justify-between">
            <CardTitle>SEO</CardTitle>
            {seoOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </CardHeader>
        {seoOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Primary Keyword</Label>
              <Input
                value={form.primaryKeyword}
                onChange={(e) => update("primaryKeyword", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary Keywords</Label>
              <div className="flex gap-2">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                  placeholder="Type and press Enter"
                />
                <Button type="button" variant="outline" onClick={addKeyword}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.secondaryKeywords.map((kw) => (
                  <Badge key={kw} variant="secondary" className="gap-1">
                    {kw}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeKeyword(kw)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Content Sections */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Content Sections</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addSection}>
              <Plus className="h-4 w-4 mr-1" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {form.sections.map((section, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  Section {i + 1}
                </span>
                <div className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(i, -1)}
                  disabled={i === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveSection(i, 1)}
                  disabled={i === form.sections.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(i)}
                  disabled={form.sections.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Heading</Label>
                <Input
                  value={section.heading}
                  onChange={(e) => updateSection(i, "heading", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor
                  content={section.content}
                  onChange={(html) => updateSection(i, "content", html)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>FAQs</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addFaq}>
              <Plus className="h-4 w-4 mr-1" />
              Add FAQ
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  FAQ {i + 1}
                </span>
                <div className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveFaq(i, -1)}
                  disabled={i === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveFaq(i, 1)}
                  disabled={i === form.faqs.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFaq(i)}
                  disabled={form.faqs.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Question</Label>
                <Input
                  value={faq.question}
                  onChange={(e) => updateFaq(i, "question", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Answer</Label>
                <Textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Related Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Related Pages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={relatedInput} onValueChange={setRelatedInput}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a page..." />
              </SelectTrigger>
              <SelectContent>
                {allSlugs
                  .filter((s) => !form.relatedSlugs.includes(s) && s !== form.slug)
                  .map((slug) => (
                    <SelectItem key={slug} value={slug}>
                      {slug}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button type="button" variant="outline" onClick={addRelatedSlug}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.relatedSlugs.map((slug) => (
              <Badge key={slug} variant="secondary" className="gap-1">
                {slug}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeRelatedSlug(slug)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Bottom save */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving..." : "Save"}
        </Button>
        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/admin/PageForm.tsx
git commit -m "feat: add PageForm component with all fields, sections, FAQs, and related pages"
```

---

## Chunk 5: Edit & Create Pages

### Task 13: Edit Page

**Files:**
- Create: `src/app/(admin)/admin/pages/[slug]/page.tsx`

- [ ] **Step 1: Create the edit page**

```tsx
// src/app/(admin)/admin/pages/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageForm from "@/components/admin/PageForm";
import type { LandingPage } from "@/lib/landing-pages/types";

export default function EditPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [pageData, setPageData] = useState<LandingPage | null>(null);
  const [allSlugs, setAllSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/pages/${slug}`).then((r) => {
        if (!r.ok) throw new Error("Page not found");
        return r.json();
      }),
      fetch("/api/admin/pages").then((r) => r.json()),
    ])
      .then(([page, listData]) => {
        setPageData(page);
        setAllSlugs(listData.pages.map((p: LandingPage) => p.slug));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(data: LandingPage) {
    const res = await fetch(`/api/admin/pages/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      return { success: false, error: result.error || "Save failed" };
    }
    return { success: true };
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (error || !pageData) {
    return <p className="text-red-600">{error || "Page not found"}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Edit: {pageData.h1} {pageData.h1Highlight}
      </h2>
      <PageForm
        initialData={pageData}
        allSlugs={allSlugs}
        isEdit={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

- [ ] **Step 2: Test manually**

From the dashboard, click on any page row. Should navigate to `/admin/pages/[slug]` and show the form populated with data. Edit a field, save, verify the JSON file changed.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(admin)/admin/pages/"
git commit -m "feat: add admin edit page"
```

---

### Task 14: Create Page

**Files:**
- Create: `src/app/(admin)/admin/pages/new/page.tsx`

- [ ] **Step 1: Create the new page form**

```tsx
// src/app/(admin)/admin/pages/new/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageForm from "@/components/admin/PageForm";
import type { LandingPage } from "@/lib/landing-pages/types";

export default function NewPage() {
  const router = useRouter();
  const [allSlugs, setAllSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then((data) => {
        setAllSlugs(data.pages.map((p: LandingPage) => p.slug));
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(data: LandingPage) {
    const res = await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      return { success: false, error: result.error || "Create failed" };
    }
    // Redirect to edit page after creation
    router.push(`/admin/pages/${data.slug}`);
    return { success: true };
  }

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">New Landing Page</h2>
      <PageForm
        allSlugs={allSlugs}
        isEdit={false}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

- [ ] **Step 2: Test manually**

Click "New Page" from dashboard. Fill in all fields. Save. Should redirect to edit page. Verify the new entry appears in the correct JSON file.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(admin)/admin/pages/"new/page.tsx
git commit -m "feat: add admin create page"
```

---

## Chunk 6: Final Verification

### Task 15: End-to-End Verification

- [ ] **Step 1: Verify the full flow**

```bash
npm run dev
```

1. Visit `http://localhost:3000` — public site should look unchanged
2. Visit `http://localhost:3000/admin` — should redirect to login
3. Log in with credentials from `.env.local`
4. Dashboard shows 120 pages with search and filter working
5. Click a page → edit form loads with correct data
6. Edit the hero subtitle on any page → Save → check the JSON file
7. Go back to dashboard → click "New Page"
8. Fill out all fields including sections and FAQs → Save
9. Verify new page appears in the correct JSON file
10. Visit `http://localhost:3000/signs/[new-slug]` to verify it renders

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Verify production build works**

```bash
npm run build
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete admin CMS editor for landing pages"
```
