"use client"

import Link from "next/link"
import { AlertCircle, Settings } from "lucide-react"

interface DashboardWidgetProps {
  title: string
  icon?: React.ReactNode
  children?: React.ReactNode
  loading?: boolean
  error?: string
  notConfigured?: { message: string; href: string }
  className?: string
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-3 pt-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  )
}

export default function DashboardWidget({
  title,
  icon,
  children,
  loading,
  error,
  notConfigured,
  className = "",
}: DashboardWidgetProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-5 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-gray-500">{icon}</span>}
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      </div>

      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <div className="flex items-center gap-2 text-red-600 text-sm py-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      ) : notConfigured ? (
        <div className="text-sm text-gray-500 py-2">
          <p className="mb-2">{notConfigured.message}</p>
          <Link
            href={notConfigured.href}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
          >
            <Settings className="h-3.5 w-3.5" />
            Configure
          </Link>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
