"use client"

import { useEffect, useState } from "react"
import { Monitor, Play } from "lucide-react"
import DashboardWidget from "./DashboardWidget"

interface ORData {
  configured: boolean
  message?: string
  error?: string
  activeSessions?: number
  recentSessions?: {
    id: string
    duration: number
    pages: number
    url: string
  }[]
}

function useOpenReplay() {
  const [data, setData] = useState<ORData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/analytics/openreplay")
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

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60
  return `${minutes}m ${remaining}s`
}

export function ActiveSessionsWidget() {
  const { data, loading, error } = useOpenReplay()

  if (!loading && !error && data && !data.configured) {
    return (
      <DashboardWidget
        title="Active Sessions"
        icon={<Monitor className="h-4 w-4" />}
        notConfigured={{
          message: data.message || "OpenReplay not configured",
          href: "/admin/integrations/openreplay",
        }}
      />
    )
  }

  return (
    <DashboardWidget
      title="Active Sessions"
      icon={<Monitor className="h-4 w-4" />}
      loading={loading}
      error={error || data?.error || undefined}
    >
      {data && (
        <div className="py-2">
          <div className="text-4xl font-bold text-gray-900">
            {data.activeSessions ?? 0}
          </div>
          <div className="text-xs text-gray-500 mt-1">Active now</div>
        </div>
      )}
    </DashboardWidget>
  )
}

export function RecentRecordingsWidget() {
  const { data, loading, error } = useOpenReplay()

  if (!loading && !error && data && !data.configured) {
    return (
      <DashboardWidget
        title="Recent Recordings"
        icon={<Play className="h-4 w-4" />}
        notConfigured={{
          message: data.message || "OpenReplay not configured",
          href: "/admin/integrations/openreplay",
        }}
      />
    )
  }

  const sessions = data?.recentSessions || []

  return (
    <DashboardWidget
      title="Recent Recordings"
      icon={<Play className="h-4 w-4" />}
      loading={loading}
      error={error || data?.error || undefined}
    >
      {data && (
        <>
          {sessions.length === 0 ? (
            <p className="text-sm text-gray-400 py-2">No recent recordings</p>
          ) : (
            <div className="space-y-2.5">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700">{formatDuration(session.duration)}</span>
                    <span className="text-xs text-gray-400">{session.pages} pages</span>
                  </div>
                  <a
                    href={session.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </DashboardWidget>
  )
}
