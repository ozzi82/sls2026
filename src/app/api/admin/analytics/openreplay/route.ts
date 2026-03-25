import { NextResponse } from "next/server"
import { loadSiteSettings } from "@/lib/admin/site-settings"
import { getCached, setCache } from "@/lib/admin/analytics-cache"

export const dynamic = "force-dynamic"

const CACHE_KEY = "openreplay-analytics"

export async function GET() {
  try {
    const settings = loadSiteSettings()

    if (!settings.openreplay.enabled || !settings.openreplay.serverUrl || !settings.openreplay.projectKey) {
      return NextResponse.json({
        configured: false,
        message: "OpenReplay not configured — requires self-hosted server",
      })
    }

    const cached = getCached(CACHE_KEY)
    if (cached) {
      return NextResponse.json({ configured: true, cached: true, ...cached })
    }

    const { serverUrl, projectKey } = settings.openreplay

    const [sessionsRes] = await Promise.all([
      fetch(`${serverUrl}/api/v1/${projectKey}/sessions/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 5,
          startDate: Date.now() - 24 * 60 * 60 * 1000,
          endDate: Date.now(),
        }),
      }).catch(() => null),
    ])

    const sessionsData = sessionsRes?.ok ? await sessionsRes.json() : null

    const data = {
      activeSessions: sessionsData?.total || 0,
      recentSessions: (sessionsData?.sessions || []).slice(0, 5).map((s: any) => ({
        id: s.sessionId,
        duration: s.duration,
        pages: s.pagesCount,
        url: `${serverUrl}/session/${s.sessionId}`,
      })),
    }

    setCache(CACHE_KEY, data)
    return NextResponse.json({ configured: true, cached: false, ...data })
  } catch (error: any) {
    console.error("OpenReplay API error:", error)
    return NextResponse.json(
      { configured: true, error: error.message || "Failed to fetch OpenReplay data" },
      { status: 500 }
    )
  }
}
