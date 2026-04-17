import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export async function GET() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    return NextResponse.json({ files: [] });
  }

  const entries = fs.readdirSync(UPLOADS_DIR);
  const files = entries
    .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
    .map((filename) => {
      const filePath = path.join(UPLOADS_DIR, filename);
      const stat = fs.statSync(filePath);
      return {
        filename,
        url: `/api/uploads/${filename}`,
        size: stat.size,
        createdAt: stat.birthtime.toISOString(),
      };
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ files });
}

export async function DELETE(request: NextRequest) {
  const { filename } = await request.json();
  if (!filename || typeof filename !== "string") {
    return NextResponse.json({ error: "Filename required" }, { status: 400 });
  }

  // Prevent path traversal
  const safeName = path.basename(filename);
  const filePath = path.join(UPLOADS_DIR, safeName);

  if (!filePath.startsWith(UPLOADS_DIR)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  fs.unlinkSync(filePath);
  return NextResponse.json({ success: true });
}
