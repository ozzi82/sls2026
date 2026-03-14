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
