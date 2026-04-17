import { NextRequest, NextResponse } from "next/server";
import { getStaticConfig, updateStaticConfig } from "@/lib/admin/page-config";
import { pageConfigSchema } from "@/lib/admin/validation";
import { appendEditLog } from "@/lib/admin/site-settings";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const config = await getStaticConfig(params.slug);
    if (!config) {
      return NextResponse.json({ error: "Static page config not found" }, { status: 404 });
    }
    return NextResponse.json(config);
  } catch (error: unknown) {
    console.error("GET static page error:", error);
    return NextResponse.json({ error: "Failed to load static page config" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const parsed = pageConfigSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await updateStaticConfig(params.slug, parsed.data as unknown as import("@/lib/admin/page-config-types").PageConfig);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    revalidatePath(parsed.data.slug);
    const username = request.headers.get("x-admin-username") || undefined;
    await appendEditLog({ slug: parsed.data.slug, pageType: "static", label: parsed.data.label, username });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("PUT static page error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save" },
      { status: 500 }
    );
  }
}
