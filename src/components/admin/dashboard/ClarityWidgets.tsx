"use client"

import { BarChart3, MousePointerClick } from "lucide-react"
import DashboardWidget from "./DashboardWidget"

export interface ClarityData {
  configured: boolean
  message?: string
  error?: string
  totalSessions?: number
  totalUsers?: number
  pagesPerSession?: number
  deadClicks?: number
  rageClicks?: number
  topPages?: { url: string; sessions: number }[]
}

interface WidgetProps {
  data: ClarityData | null
  loading: boolean
  error: string | null
}

export function ClarityTrafficWidget({ data, loading, error }: WidgetProps) {
  if (!loading && !error && data && !data.configured) {
    return (
      <DashboardWidget
        title="Site Traffic (24h)"
        icon={<BarChart3 className="h-4 w-4" />}
        notConfigured={{
          message: data.message || "Clarity not configured",
          href: "/admin/integrations/cookie-consent",
        }}
      />
    )
  }

  return (
    <DashboardWidget
      title="Site Traffic (24h)"
      icon={<BarChart3 className="h-4 w-4" />}
      loading={loading}
      error={error || data?.error || undefined}
    >
      {data && data.configured && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data.totalSessions ?? 0}
              </div>
              <div className="text-xs text-gray-500">Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data.totalUsers ?? 0}
              </div>
              <div className="text-xs text-gray-500">Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data.pagesPerSession ?? 0}
              </div>
              <div className="text-xs text-gray-500">Pages/Session</div>
            </div>
          </div>
          <a
            href="https://clarity.microsoft.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            View full dashboard &rarr;
          </a>
        </div>
      )}
    </DashboardWidget>
  )
}

export function ClarityInsightsWidget({ data, loading, error }: WidgetProps) {
  if (!loading && !error && data && !data.configured) {
    return (
      <DashboardWidget
        title="User Behavior"
        icon={<MousePointerClick className="h-4 w-4" />}
        notConfigured={{
          message: data.message || "Clarity not configured",
          href: "/admin/integrations/cookie-consent",
        }}
      />
    )
  }

  const topPages = data?.topPages || []

  return (
    <DashboardWidget
      title="User Behavior"
      icon={<MousePointerClick className="h-4 w-4" />}
      loading={loading}
      error={error || data?.error || undefined}
    >
      {data && data.configured && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data.deadClicks ?? 0}
              </div>
              <div className="text-xs text-gray-500">Dead Clicks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {data.rageClicks ?? 0}
              </div>
              <div className="text-xs text-gray-500">Rage Clicks</div>
            </div>
          </div>
          {topPages.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1.5">Top Pages</p>
              <div className="space-y-1.5">
                {topPages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 truncate mr-2">
                      {page.url.replace(/^https?:\/\/[^/]+/, "") || "/"}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {page.sessions} sessions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardWidget>
  )
}
