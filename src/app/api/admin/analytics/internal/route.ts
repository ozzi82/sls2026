import { NextResponse } from "next/server"
import { getAllProductConfigs, getAllStaticConfigs } from "@/lib/admin/page-config"
import { getAllPages } from "@/lib/admin/pages"
import { loadEditLog } from "@/lib/admin/site-settings"
import type { PageConfig } from "@/lib/admin/page-config-types"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const products = getAllProductConfigs()
    const statics = getAllStaticConfigs()
    const landingPages = getAllPages()
    const editLog = loadEditLog()

    const allConfigs: PageConfig[] = [
      ...products.map((p) => p),
      ...statics.map((s) => s),
    ]

    const seoIssues = allConfigs
      .filter((c) => {
        const seo = c.seo
        return !seo.metaDescription || !seo.title || !seo.ogImage
      })
      .map((c) => ({
        slug: c.slug,
        label: c.label,
        pageType: c.pageType,
        missing: [
          ...(!c.seo.title ? ["title"] : []),
          ...(!c.seo.metaDescription ? ["metaDescription"] : []),
          ...(!c.seo.ogImage ? ["ogImage"] : []),
        ],
      }))

    return NextResponse.json({
      counts: {
        products: products.length,
        landingPages: landingPages.length,
        staticPages: statics.length,
        totalBlocks: allConfigs.reduce((sum, c) => sum + c.blocks.length, 0),
      },
      seoIssues,
      recentEdits: editLog.slice(0, 5),
    })
  } catch {
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 })
  }
}
