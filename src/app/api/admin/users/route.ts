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
