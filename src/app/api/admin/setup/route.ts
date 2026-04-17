import { NextRequest, NextResponse } from "next/server";
import { hasAnyUsers, createUser, setupSchema, getUserByUsername } from "@/lib/admin/users";
import { createSessionToken, COOKIE_NAME } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
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
