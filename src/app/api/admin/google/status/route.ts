import { NextResponse } from "next/server";
import { readJson } from "@/lib/admin/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const tokens = await readJson<{
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    email?: string;
  }>("settings/google-tokens.json");

  if (!tokens || !tokens.refreshToken) {
    return NextResponse.json({ connected: false });
  }

  return NextResponse.json({
    connected: true,
    email: tokens.email || "Connected",
  });
}

export async function DELETE() {
  const { deleteJson } = await import("@/lib/admin/content-store");
  await deleteJson("settings/google-tokens.json");
  return NextResponse.json({ success: true });
}
