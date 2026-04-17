import { NextResponse } from "next/server";
import { hasAnyUsers } from "@/lib/admin/users";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ hasUsers: await hasAnyUsers() });
}
