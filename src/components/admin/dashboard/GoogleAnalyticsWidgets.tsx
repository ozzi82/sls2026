"use client"

import { useEffect, useState } from "react"
import { BarChart3, TrendingUp, Globe } from "lucide-react"
import DashboardWidget from "./DashboardWidget"

interface GAData {
  configured: boolean
  message?: string
  error?: string
  visitors?: { today: string; week: string; month: string }
  pageViews?: { today: string; week: string; month: string }
  topPages?: { path: string; views: string }[]
  trafficSources?: { source: string; sessions: string }[]
}

function useGoogleAnalytics() {
  const [data, setData] = useState<GAData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/analytics/google")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch")
        return r.json()
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export function VisitorsWidget() {
  const { data, loading, error } = useGoogleAnalytics()

  if (!loading && !error && data && !data.configured) {
    return (
      <DashboardWidget
        title="Visitors"
        icon={<TrendingUp className="h-4 w-4" />}
        notConfigured={{
          message: data.message || "Google Analytics not configured",
          href: "/admin/integrations/google",
        }}
      />
    )
  }

  return (
    <DashboardWidget
      title="Visitors"
      icon={<TrendingUp className="h-4 w-4" />}
      loading={loading}
      error={error || data?.error || undefined}
    >
      {data?.visitors && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Today", value: data.visitors.today },
            { label: "This Week", value: data.visitors.week },
            { label: "This Month", value: data.visitors.month },
          ].map(({ label, value }) => (
            <div key={label} className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-700">
                {Number(value).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      )}
    </DashboardWidget>
  )
}

export function TopPagesWidget() {
  const { data, loading, error } = useGoogleAnalytics()

  if (!loading && !error && data && !data.configured) {
    return (
      <DashboardWidget
        title="Top Pages"
        icon={<BarChart3 className="h-4 w-4" />}
        notConfigured={{
          message: data.message || "Google Analytics not configured",
          href: "/admin/integrations/google",
        }}
      />
    )
  }

  return (
    <DashboardWidget
      title="Top Pages"
      icon={<BarChart3 className="h-4 w-4" />}
      loading={loading}
      error={error || data?.error || undefined}
    >
      {data?.topPages && (
        <div className="space-y-2">
          {data.topPages.map((page, i) => (
            <div key={page.path} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-gray-400 text-xs w-4">{i + 1}.</span>
                <span className="font-mono text-xs text-gray-700 truncate">{page.path}</span>
              </div>
              <span className="text-xs font-medium text-gray-500 flex-shrink-0 ml-2">
                {Number(page.views).toLocaleString()}
              </span>
            </div>
          ))}
          {data.topPages.length === 0 && (
            <p className="text-sm text-gray-400">No page data yet</p>
          )}
        </div>
      )}
    </DashboardWidget>
  )
}

export function TrafficSourcesWidget() {
  const { data, loading, error } = useGoogleAnalytics()

  if (!loading && !error && data && !data.configured) {
    return (
      <DashboardWidget
        title="Traffic Sources"
        icon={<Globe className="h-4 w-4" />}
        notConfigured={{
          message: data.message || "Google Analytics not configured",
          href: "/admin/integrations/google",
        }}
      />
    )
  }

  const maxSessions = data?.trafficSources?.[0]
    ? Number(data.trafficSources[0].sessions)
    : 1

  return (
    <DashboardWidget
      title="Traffic Sources"
      icon={<Globe className="h-4 w-4" />}
      loading={loading}
      error={error || data?.error || undefined}
    >
      {data?.trafficSources && (
        <div className="space-y-2.5">
          {data.trafficSources.map((source) => {
            const pct = Math.max(5, (Number(source.sessions) / maxSessions) * 100)
            return (
              <div key={source.source} className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{source.source}</span>
                  <span className="text-xs text-gray-500">
                    {Number(source.sessions).toLocaleString()}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
          {data.trafficSources.length === 0 && (
            <p className="text-sm text-gray-400">No source data yet</p>
          )}
        </div>
      )}
    </DashboardWidget>
  )
}
