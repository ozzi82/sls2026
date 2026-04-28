export interface LeadSubmission {
  id: string
  formType: "contact" | "quote"
  status: "new" | "read" | "replied" | "archived"
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string
  message: string
  quoteFields?: {
    projectType: string
    dimensions: string
    quantity: string
    deadline: string
    notes: string
  }
  files?: Array<{
    name: string
    oneDriveUrl: string
    size: number
  }>
  submittedAt: string
  readAt?: string
}

export interface LeadIndexEntry {
  id: string
  formType: "contact" | "quote"
  status: "new" | "read" | "replied" | "archived"
  name: string
  email: string
  submittedAt: string
  hasFiles: boolean
  messagePreview: string
}
