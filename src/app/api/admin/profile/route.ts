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
