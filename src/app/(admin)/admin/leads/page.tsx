"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import {
  Mail,
  FileText,
  Paperclip,
  ExternalLink,
  Trash2,
  CheckCircle2,
  MessageSquare,
  Archive,
} from "lucide-react"
import type { LeadSubmission, LeadIndexEntry } from "@/lib/leads/types"

const statusColors: Record<string, string> = {
  new: "bg-amber-100 text-amber-800",
  read: "bg-blue-100 text-blue-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-500",
}

const formTypeColors: Record<string, string> = {
  contact: "bg-purple-100 text-purple-700",
  quote: "bg-blue-100 text-blue-700",
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadIndexEntry[]>([])
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const fetchLeads = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (typeFilter !== "all") params.set("type", typeFilter)
      if (statusFilter !== "all") params.set("status", statusFilter)
      const res = await fetch(`/api/admin/leads?${params}`)
      const data = await res.json()
      setLeads(data.leads || [])
    } catch {
      toast.error("Failed to load leads")
    } finally {
      setLoading(false)
    }
  }, [typeFilter, statusFilter])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  async function selectLead(entry: LeadIndexEntry) {
    try {
      const res = await fetch(`/api/admin/leads/${entry.id}`)
      const lead = await res.json()
      setSelectedLead(lead)
      if (entry.status === "new") {
        await fetch(`/api/admin/leads/${entry.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "read" }),
        })
        fetchLeads()
      }
    } catch {
      toast.error("Failed to load lead details")
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error()
      toast.success(`Marked as ${status}`)
      fetchLeads()
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: status as LeadSubmission["status"] })
      }
    } catch {
      toast.error("Failed to update status")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Permanently delete this lead?")) return
    try {
      await fetch(`/api/admin/leads/${id}`, { method: "DELETE" })
      toast.success("Lead deleted")
      if (selectedLead?.id === id) setSelectedLead(null)
      fetchLeads()
    } catch {
      toast.error("Failed to delete lead")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading leads...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-md px-3 py-1.5"
          >
            <option value="all">All Types</option>
            <option value="contact">Contact</option>
            <option value="quote">Quote</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-md px-3 py-1.5"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Mail className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>No leads yet</p>
        </div>
      ) : (
        <div className="flex gap-4 h-[calc(100vh-180px)]">
          {/* Left panel — list */}
          <div className="w-[380px] flex-shrink-0 overflow-y-auto border border-gray-200 rounded-lg bg-white">
            {leads.map((entry) => (
              <button
                key={entry.id}
                onClick={() => selectLead(entry)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedLead?.id === entry.id ? "bg-blue-50" : ""
                } ${entry.status === "new" ? "bg-blue-50/50" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-semibold ${
                      entry.status === "new" ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {entry.name}
                  </span>
                  <span className="text-xs text-gray-400">{timeAgo(entry.submittedAt)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mb-1.5">{entry.messagePreview}</p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      formTypeColors[entry.formType]
                    }`}
                  >
                    {entry.formType}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      statusColors[entry.status]
                    }`}
                  >
                    {entry.status}
                  </span>
                  {entry.hasFiles && <Paperclip className="h-3 w-3 text-gray-400" />}
                </div>
              </button>
            ))}
          </div>

          {/* Right panel — detail */}
          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg bg-white p-6">
            {selectedLead ? (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selectedLead.name}</h2>
                    <p className="text-sm text-gray-500">
                      <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                        {selectedLead.email}
                      </a>
                      {selectedLead.company && ` · ${selectedLead.company}`}
                      {selectedLead.phone && ` · ${selectedLead.phone}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(selectedLead.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => updateStatus(selectedLead.id, "replied")}
                      className="p-1.5 rounded hover:bg-green-50 text-green-600"
                      title="Mark as Replied"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => updateStatus(selectedLead.id, "archived")}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                      title="Archive"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedLead.id)}
                      className="p-1.5 rounded hover:bg-red-50 text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {selectedLead.subject && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Subject:</strong> {selectedLead.subject}
                  </p>
                )}

                <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>

                {selectedLead.quoteFields && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Quote Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {selectedLead.quoteFields.projectType && (
                        <div>
                          <span className="text-gray-500">Project Type:</span>{" "}
                          {selectedLead.quoteFields.projectType}
                        </div>
                      )}
                      {selectedLead.quoteFields.dimensions && (
                        <div>
                          <span className="text-gray-500">Dimensions:</span>{" "}
                          {selectedLead.quoteFields.dimensions}
                        </div>
                      )}
                      {selectedLead.quoteFields.quantity && (
                        <div>
                          <span className="text-gray-500">Quantity:</span>{" "}
                          {selectedLead.quoteFields.quantity}
                        </div>
                      )}
                      {selectedLead.quoteFields.deadline && (
                        <div>
                          <span className="text-gray-500">Deadline:</span>{" "}
                          {selectedLead.quoteFields.deadline}
                        </div>
                      )}
                      {selectedLead.quoteFields.notes && (
                        <div className="col-span-2">
                          <span className="text-gray-500">Notes:</span>{" "}
                          {selectedLead.quoteFields.notes}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedLead.files && selectedLead.files.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Attachments</h3>
                    <div className="space-y-1.5">
                      {selectedLead.files.map((file, i) => (
                        <a
                          key={i}
                          href={file.oneDriveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 bg-gray-50 rounded px-3 py-2"
                        >
                          <FileText className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {(file.size / 1024).toFixed(0)} KB
                          </span>
                          <ExternalLink className="h-3 w-3 flex-shrink-0 ml-auto" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p>Select a lead to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
