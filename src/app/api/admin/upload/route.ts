import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import sharp from "sharp";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_WIDTH = 2400; // max output width in px

export async function POST(request: NextRequest) {
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

  const bytes = Buffer.from(await file.arrayBuffer());

  // Optimize: resize if wider than MAX_WIDTH, convert to WebP, strip metadata
  let pipeline = sharp(bytes).rotate(); // .rotate() auto-orients from EXIF
  const meta = await pipeline.metadata();

  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const optimized = await pipeline
    .webp({ quality: 82, effort: 4 })
    .toBuffer({ resolveWithObject: true });

  // Upload to Vercel Blob
  const blob = await put(`uploads/${safeName}`, optimized.data, {
    access: "public",
    contentType: "image/webp",
  });

  return NextResponse.json({
    url: blob.url,
    width: optimized.info.width,
    height: optimized.info.height,
  });
}
