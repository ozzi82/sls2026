import { NextRequest, NextResponse } from "next/server";
import { loadUsers, updateUser, deleteUser, updateUserSchema } from "@/lib/admin/users";

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
  const requestUsername = request.headers.get("x-admin-username");
  const users = await loadUsers();
  const requester = users.find((u) => u.username === requestUsername);

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
