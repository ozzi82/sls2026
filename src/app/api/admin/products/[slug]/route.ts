import { NextRequest, NextResponse } from "next/server";
import { getProductConfig, updateProductConfig } from "@/lib/admin/page-config";
import { pageConfigSchema } from "@/lib/admin/validation";
import { appendEditLog } from "@/lib/admin/site-settings";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const config = getProductConfig(params.slug);
  if (!config) {
    return NextResponse.json({ error: "Product config not found" }, { status: 404 });
  }
  return NextResponse.json(config);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const parsed = pageConfigSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const result = updateProductConfig(params.slug, parsed.data as unknown as import("@/lib/admin/page-config-types").PageConfig);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  revalidatePath(parsed.data.slug);
  appendEditLog({ slug: parsed.data.slug, pageType: "product", label: parsed.data.label });

  return NextResponse.json({ success: true });
}
