import { NextRequest, NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/admin/content-store";

export const dynamic = "force-dynamic";

interface Redirect {
  id: string;
  from: string;
  to: string;
  permanent: boolean;
}

const REDIRECTS_PATH = "settings/redirects.json";

export async function GET() {
  const redirects = await readJson<Redirect[]>(REDIRECTS_PATH);
  return NextResponse.json({ redirects: redirects || [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { from, to, permanent } = body;

  if (!from || !to) {
    return NextResponse.json({ error: "From and To paths are required" }, { status: 400 });
  }

  // Normalize: ensure paths start with /
  const normalizedFrom = from.startsWith("/") ? from : `/${from}`;
  const normalizedTo = to.startsWith("/") ? to : to.startsWith("http") ? to : `/${to}`;

  const redirects = (await readJson<Redirect[]>(REDIRECTS_PATH)) || [];

  // Check for duplicates
  if (redirects.some((r) => r.from === normalizedFrom)) {
    return NextResponse.json({ error: "A redirect from this path already exists" }, { status: 409 });
  }

  const redirect: Redirect = {
    id: `r_${Date.now()}`,
    from: normalizedFrom,
    to: normalizedTo,
    permanent: permanent !== false,
  };

  redirects.push(redirect);
  await writeJson(REDIRECTS_PATH, redirects);

  return NextResponse.json({ redirect }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, from, to, permanent } = body;

  if (!id || !from || !to) {
    return NextResponse.json({ error: "ID, From, and To are required" }, { status: 400 });
  }

  const redirects = (await readJson<Redirect[]>(REDIRECTS_PATH)) || [];
  const index = redirects.findIndex((r) => r.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Redirect not found" }, { status: 404 });
  }

  const normalizedFrom = from.startsWith("/") ? from : `/${from}`;
  const normalizedTo = to.startsWith("/") ? to : to.startsWith("http") ? to : `/${to}`;

  // Check for duplicates (excluding self)
  if (redirects.some((r) => r.from === normalizedFrom && r.id !== id)) {
    return NextResponse.json({ error: "A redirect from this path already exists" }, { status: 409 });
  }

  redirects[index] = { id, from: normalizedFrom, to: normalizedTo, permanent: permanent !== false };
  await writeJson(REDIRECTS_PATH, redirects);

  return NextResponse.json({ redirect: redirects[index] });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const redirects = (await readJson<Redirect[]>(REDIRECTS_PATH)) || [];
  const filtered = redirects.filter((r) => r.id !== id);

  if (filtered.length === redirects.length) {
    return NextResponse.json({ error: "Redirect not found" }, { status: 404 });
  }

  await writeJson(REDIRECTS_PATH, filtered);
  return NextResponse.json({ success: true });
}
