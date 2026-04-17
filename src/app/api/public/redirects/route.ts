import { NextResponse } from "next/server";
import { readJson } from "@/lib/admin/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const redirects = await readJson<{ from: string; to: string; permanent: boolean }[]>(
    "settings/redirects.json"
  );
  return NextResponse.json({ redirects: redirects || [] });
}
