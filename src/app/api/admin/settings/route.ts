import { NextResponse } from "next/server"
import { loadSiteSettings, saveSiteSettings } from "@/lib/admin/site-settings"
import { siteSettingsSchema } from "@/lib/admin/site-settings-validation"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const settings = await loadSiteSettings()
    const hasServiceAccount = !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    return NextResponse.json({ ...settings, hasServiceAccount })
  } catch {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const result = siteSettingsSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      )
    }

    await saveSiteSettings(result.data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
