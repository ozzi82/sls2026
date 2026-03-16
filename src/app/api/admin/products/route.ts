import { NextResponse } from "next/server";
import { getAllProductConfigs } from "@/lib/admin/page-config";

export const dynamic = "force-dynamic";

export async function GET() {
  const configs = getAllProductConfigs();
  const pages = configs.map((c) => ({
    slug: c.slug,
    label: c.label,
    route: c.slug.startsWith("/") ? c.slug : `/${c.slug}`,
    blockCount: c.blocks.length,
    hiddenBlocks: c.blocks.filter((b) => !b.visible).length,
  }));
  return NextResponse.json({ pages });
}
