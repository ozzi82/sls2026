import { NextResponse } from "next/server"
import { loadSiteSettings } from "@/lib/admin/site-settings"
import { getCached, setCache } from "@/lib/admin/analytics-cache"

export const dynamic = "force-dynamic"

const CACHE_KEY = "google-analytics"

export async function GET() {
  try {
    const settings = loadSiteSettings()

    if (!settings.google.enabled || !settings.google.ga4MeasurementId) {
      return NextResponse.json({ configured: false, message: "Google Analytics not configured" })
    }

    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!serviceAccountKey) {
      return NextResponse.json({ configured: false, message: "Service account key not configured" })
    }

    const cached = getCached(CACHE_KEY)
    if (cached) {
      return NextResponse.json({ configured: true, cached: true, ...cached })
    }

    const { BetaAnalyticsDataClient } = await import("@google-analytics/data")
    const credentials = JSON.parse(serviceAccountKey)
    const analyticsClient = new BetaAnalyticsDataClient({ credentials })

    const propertyId = settings.google.ga4PropertyId
    if (!propertyId) {
      return NextResponse.json({ configured: false, message: "GA4 Property ID not configured" })
    }
    const property = `properties/${propertyId}`

    const [todayRes, weekRes, monthRes, topPagesRes, sourcesRes] = await Promise.all([
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "today", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      }),
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      }),
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      }),
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 5,
      }),
      analyticsClient.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 8,
      }),
    ])

    const getMetric = (res: any, idx: number) => res[0]?.rows?.[0]?.metricValues?.[idx]?.value || "0"

    const data = {
      visitors: {
        today: getMetric(todayRes, 0),
        week: getMetric(weekRes, 0),
        month: getMetric(monthRes, 0),
      },
      pageViews: {
        today: getMetric(todayRes, 1),
        week: getMetric(weekRes, 1),
        month: getMetric(monthRes, 1),
      },
      topPages: (topPagesRes[0].rows || []).map((row: any) => ({
        path: row.dimensionValues?.[0]?.value || "",
        views: row.metricValues?.[0]?.value || "0",
      })),
      trafficSources: (sourcesRes[0].rows || []).map((row: any) => ({
        source: row.dimensionValues?.[0]?.value || "(direct)",
        sessions: row.metricValues?.[0]?.value || "0",
      })),
    }

    setCache(CACHE_KEY, data)
    return NextResponse.json({ configured: true, cached: false, ...data })
  } catch (error: any) {
    console.error("GA4 API error:", error)
    return NextResponse.json(
      { configured: true, error: error.message || "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
