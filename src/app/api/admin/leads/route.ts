import { NextRequest, NextResponse } from "next/server"
import { loadLeadIndex } from "@/lib/leads/store"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const typeFilter = searchParams.get("type")
    const statusFilter = searchParams.get("status")

    let leads = await loadLeadIndex()

    if (typeFilter && (typeFilter === "contact" || typeFilter === "quote")) {
      leads = leads.filter((l) => l.formType === typeFilter)
    }
    if (
      statusFilter &&
      ["new", "read", "replied", "archived"].includes(statusFilter)
    ) {
      leads = leads.filter((l) => l.status === statusFilter)
    }

    return NextResponse.json({ leads })
  } catch (err) {
    console.error("Failed to load leads:", err)
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 })
  }
}
