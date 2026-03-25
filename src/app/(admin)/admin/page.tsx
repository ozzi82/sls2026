"use client"

import { useEffect, useState } from "react"
import ContentOverviewWidget from "@/components/admin/dashboard/ContentOverviewWidget"
import SeoHealthWidget from "@/components/admin/dashboard/SeoHealthWidget"
import RecentEditsWidget from "@/components/admin/dashboard/RecentEditsWidget"
import { VisitorsWidget, TopPagesWidget, TrafficSourcesWidget } from "@/components/admin/dashboard/GoogleAnalyticsWidgets"
import { ActiveSessionsWidget, RecentRecordingsWidget } from "@/components/admin/dashboard/OpenReplayWidgets"

interface InternalData {
  counts: {
    products: number
    landingPages: number
    staticPages: number
    totalBlocks: number
  }
  seoIssues: {
    slug: string
    label: string
    pageType: string
    missing: string[]
  }[]
  recentEdits: {
    slug: string
    pageType: "product" | "landing" | "static"
    label: string
    timestamp: string
  }[]
}

export default function AdminDashboard() {
  const [internalData, setInternalData] = useState<InternalData | null>(null)
  const [internalLoading, setInternalLoading] = useState(true)
  const [internalError, setInternalError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/analytics/internal")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch internal analytics")
        return r.json()
      })
      .then(setInternalData)
      .catch((e) => setInternalError(e.message))
      .finally(() => setInternalLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <ContentOverviewWidget data={internalData} loading={internalLoading} error={internalError} />
        <VisitorsWidget />
        <ActiveSessionsWidget />

        {/* Row 2 */}
        <TopPagesWidget />
        <TrafficSourcesWidget />
        <SeoHealthWidget data={internalData} loading={internalLoading} error={internalError} />

        {/* Row 3 */}
        <RecentEditsWidget data={internalData} loading={internalLoading} error={internalError} />
        <RecentRecordingsWidget />
      </div>
    </div>
  )
}
