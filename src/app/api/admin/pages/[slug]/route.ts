import { NextRequest, NextResponse } from "next/server";
import { getPageBySlug, updatePage, deletePage } from "@/lib/admin/pages";
import { landingPageSchema } from "@/lib/admin/validation";
import { appendEditLog } from "@/lib/admin/site-settings";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await getPageBySlug(params.slug);
    if (!result) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    return NextResponse.json(result.page);
  } catch (error: unknown) {
    console.error("GET page error:", error);
    return NextResponse.json({ error: "Failed to load page" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const parsed = landingPageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await updatePage(params.slug, parsed.data);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    const username = request.headers.get("x-admin-username") || undefined;
    await appendEditLog({ slug: params.slug, pageType: "landing", label: parsed.data.h1 || params.slug, username });
    return NextResponse.json({ success: true, page: parsed.data });
  } catch (error: unknown) {
    console.error("PUT page error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await deletePage(params.slug);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("DELETE page error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete" },
      { status: 500 }
    );
  }
}
