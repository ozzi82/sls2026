"use client"

import { Clock } from "lucide-react"
import DashboardWidget from "./DashboardWidget"

interface EditEntry {
  slug: string
  pageType: "product" | "landing" | "static"
  label: string
  timestamp: string
  username?: string
}

interface RecentEditsProps {
  data: { recentEdits: EditEntry[] } | null
  loading: boolean
  error: string | null
}

const typeColors: Record<string, string> = {
  product: "bg-blue-100 text-blue-700",
  landing: "bg-green-100 text-green-700",
  static: "bg-purple-100 text-purple-700",
}

function relativeTime(timestamp: string): string {
  const diff = Date.now() - Date.parse(timestamp)
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

export default function RecentEditsWidget({ data, loading, error }: RecentEditsProps) {
  const edits = data?.recentEdits || []

  return (
    <DashboardWidget
      title="Recent Edits"
      icon={<Clock className="h-4 w-4" />}
      loading={loading}
      error={error || undefined}
    >
      {data && (
        <>
          {edits.length === 0 ? (
            <p className="text-sm text-gray-400 py-2">No recent edits</p>
          ) : (
            <div className="space-y-2.5">
              {edits.map((edit, i) => (
                <div key={`${edit.slug}-${i}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-medium text-gray-700 truncate">{edit.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${typeColors[edit.pageType] || "bg-gray-100 text-gray-600"}`}>
                      {edit.pageType}
                    </span>
                    {edit.username && (
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        by {edit.username}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                    {relativeTime(edit.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </DashboardWidget>
  )
}
