"use client"

import { useEffect, useState } from "react"
import ContentOverviewWidget from "@/components/admin/dashboard/ContentOverviewWidget"
import SeoHealthWidget from "@/components/admin/dashboard/SeoHealthWidget"
import RecentEditsWidget from "@/components/admin/dashboard/RecentEditsWidget"
import { VisitorsWidget, TopPagesWidget, TrafficSourcesWidget, type GAData } from "@/components/admin/dashboard/GoogleAnalyticsWidgets"
import { ActiveSessionsWidget, RecentRecordingsWidget, type ORData } from "@/components/admin/dashboard/OpenReplayWidgets"

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

function useAdminFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch")
        return r.json()
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

export default function AdminDashboard() {
  const internal = useAdminFetch<InternalData>("/api/admin/analytics/internal")
  const ga = useAdminFetch<GAData>("/api/admin/analytics/google")
  const or = useAdminFetch<ORData>("/api/admin/analytics/openreplay")

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <ContentOverviewWidget data={internal.data} loading={internal.loading} error={internal.error} />
        <VisitorsWidget data={ga.data} loading={ga.loading} error={ga.error} />
        <ActiveSessionsWidget data={or.data} loading={or.loading} error={or.error} />

        {/* Row 2 */}
        <TopPagesWidget data={ga.data} loading={ga.loading} error={ga.error} />
        <TrafficSourcesWidget data={ga.data} loading={ga.loading} error={ga.error} />
        <SeoHealthWidget data={internal.data} loading={internal.loading} error={internal.error} />

        {/* Row 3 */}
        <RecentEditsWidget data={internal.data} loading={internal.loading} error={internal.error} />
        <RecentRecordingsWidget data={or.data} loading={or.loading} error={or.error} />
      </div>
    </div>
  )
}
