import { readJson, writeJson, deleteJson } from "@/lib/admin/content-store"
import type { LeadSubmission, LeadIndexEntry } from "./types"

const LEADS_DIR = "leads"
const INDEX_PATH = "leads/_index.json"

function toIndexEntry(lead: LeadSubmission): LeadIndexEntry {
  return {
    id: lead.id,
    formType: lead.formType,
    status: lead.status,
    name: lead.name,
    email: lead.email,
    submittedAt: lead.submittedAt,
    hasFiles: Array.isArray(lead.files) && lead.files.length > 0,
    messagePreview: lead.message.slice(0, 120),
  }
}

export async function loadLeadIndex(): Promise<LeadIndexEntry[]> {
  const data = await readJson<LeadIndexEntry[]>(INDEX_PATH)
  return data ?? []
}

async function saveIndex(index: LeadIndexEntry[]): Promise<void> {
  index.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
  await writeJson(INDEX_PATH, index)
}

export async function saveLead(lead: LeadSubmission): Promise<void> {
  await writeJson(`${LEADS_DIR}/${lead.id}.json`, lead)
  const index = await loadLeadIndex()
  const filtered = index.filter((e) => e.id !== lead.id)
  filtered.push(toIndexEntry(lead))
  await saveIndex(filtered)
}

export async function loadLead(id: string): Promise<LeadSubmission | null> {
  if (!/^[a-f0-9-]{36}$/.test(id)) return null
  return readJson<LeadSubmission>(`${LEADS_DIR}/${id}.json`)
}

export async function updateLeadStatus(
  id: string,
  status: LeadSubmission["status"]
): Promise<LeadSubmission | null> {
  const lead = await loadLead(id)
  if (!lead) return null
  lead.status = status
  if (status === "read" && !lead.readAt) {
    lead.readAt = new Date().toISOString()
  }
  await saveLead(lead)
  return lead
}

export async function deleteLead(id: string): Promise<boolean> {
  const lead = await loadLead(id)
  if (!lead) return false
  await deleteJson(`${LEADS_DIR}/${id}.json`)
  const index = await loadLeadIndex()
  const filtered = index.filter((e) => e.id !== id)
  await saveIndex(filtered)
  return true
}
