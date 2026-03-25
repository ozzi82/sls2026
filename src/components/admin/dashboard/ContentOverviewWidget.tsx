"use client"

import { LayoutGrid, Package, FileText, Layers } from "lucide-react"
import DashboardWidget from "./DashboardWidget"

interface ContentOverviewProps {
  data: {
    counts: {
      products: number
      landingPages: number
      staticPages: number
      totalBlocks: number
    }
  } | null
  loading: boolean
  error: string | null
}

const stats = [
  { key: "products" as const, label: "Products", color: "text-blue-600 bg-blue-50", icon: Package },
  { key: "landingPages" as const, label: "Landing Pages", color: "text-green-600 bg-green-50", icon: FileText },
  { key: "staticPages" as const, label: "Static Pages", color: "text-purple-600 bg-purple-50", icon: FileText },
  { key: "totalBlocks" as const, label: "Total Blocks", color: "text-gray-600 bg-gray-50", icon: Layers },
]

export default function ContentOverviewWidget({ data, loading, error }: ContentOverviewProps) {
  return (
    <DashboardWidget
      title="Content Overview"
      icon={<LayoutGrid className="h-4 w-4" />}
      loading={loading}
      error={error || undefined}
    >
      {data && (
        <div className="grid grid-cols-2 gap-3">
          {stats.map(({ key, label, color, icon: Icon }) => (
            <div key={key} className={`rounded-lg p-3 ${color.split(" ")[1]}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className={`h-3.5 w-3.5 ${color.split(" ")[0]}`} />
              </div>
              <div className={`text-2xl font-bold ${color.split(" ")[0]}`}>
                {data.counts[key]}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      )}
    </DashboardWidget>
  )
}
