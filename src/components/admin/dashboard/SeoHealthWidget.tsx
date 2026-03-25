"use client"

import { Search, CheckCircle2 } from "lucide-react"
import DashboardWidget from "./DashboardWidget"

interface SeoIssue {
  slug: string
  label: string
  pageType: string
  missing: string[]
}

interface SeoHealthProps {
  data: { seoIssues: SeoIssue[] } | null
  loading: boolean
  error: string | null
}

const badgeLabels: Record<string, string> = {
  title: "Title",
  metaDescription: "Description",
  ogImage: "OG Image",
}

const badgeColors: Record<string, string> = {
  title: "bg-red-100 text-red-700",
  metaDescription: "bg-amber-100 text-amber-700",
  ogImage: "bg-orange-100 text-orange-700",
}

export default function SeoHealthWidget({ data, loading, error }: SeoHealthProps) {
  const issues = data?.seoIssues || []

  return (
    <DashboardWidget
      title="SEO Health"
      icon={<Search className="h-4 w-4" />}
      loading={loading}
      error={error || undefined}
    >
      {data && (
        <>
          {issues.length === 0 ? (
            <div className="flex items-center gap-2 text-green-600 text-sm py-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>All pages have complete SEO</span>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {issues.map((issue) => (
                <div key={issue.slug} className="text-sm">
                  <div className="font-medium text-gray-700 mb-1">{issue.label}</div>
                  <div className="flex flex-wrap gap-1">
                    {issue.missing.map((field) => (
                      <span
                        key={field}
                        className={`text-xs px-1.5 py-0.5 rounded ${badgeColors[field] || "bg-gray-100 text-gray-600"}`}
                      >
                        {badgeLabels[field] || field}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </DashboardWidget>
  )
}
