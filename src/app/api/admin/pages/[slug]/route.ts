import { NextRequest, NextResponse } from "next/server";
import { getPageBySlug, updatePage, deletePage } from "@/lib/admin/pages";
import { landingPageSchema } from "@/lib/admin/validation";
import { appendEditLog } from "@/lib/admin/site-settings";

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

  appendEditLog({ slug: params.slug, pageType: "landing", label: parsed.data.h1 || params.slug });
  return NextResponse.json({ success: true, page: parsed.data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const result = deletePage(params.slug);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
