import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, AVIF` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum 10 MB." },
        { status: 400 }
      );
    }

    // Sanitise filename
    const base = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    const timestamp = Date.now();
    const safeName = `${base}-${timestamp}.webp`;

    let uploadData: Buffer;
    let width: number | undefined;
    let height: number | undefined;

    try {
      // Try sharp for optimization (resize + WebP conversion)
      const sharp = (await import("sharp")).default;
      const bytes = Buffer.from(await file.arrayBuffer());
      let pipeline = sharp(bytes).rotate();
      const meta = await pipeline.metadata();

      if (meta.width && meta.width > 2400) {
        pipeline = pipeline.resize({ width: 2400, withoutEnlargement: true });
      }

      const optimized = await pipeline
        .webp({ quality: 82, effort: 4 })
        .toBuffer({ resolveWithObject: true });

      uploadData = optimized.data;
      width = optimized.info.width;
      height = optimized.info.height;
    } catch {
      // sharp unavailable — upload original file as-is
      uploadData = Buffer.from(await file.arrayBuffer());
    }

    // Ensure uploads directory exists
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    // Write file to public/uploads/
    const filePath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(filePath, uploadData);

    return NextResponse.json({
      url: `/uploads/${safeName}`,
      width,
      height,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
