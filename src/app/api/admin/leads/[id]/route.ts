import { NextRequest, NextResponse } from "next/server"
import { loadLead, updateLeadStatus, deleteLead } from "@/lib/leads/store"

export const dynamic = "force-dynamic"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const lead = await loadLead(id)
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  }
  return NextResponse.json(lead)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const status = body.status

  if (!["new", "read", "replied", "archived"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const lead = await updateLeadStatus(id, status)
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  }
  return NextResponse.json(lead)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const deleted = await deleteLead(id)
  if (!deleted) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
