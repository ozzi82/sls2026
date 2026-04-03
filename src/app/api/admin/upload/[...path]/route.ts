import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = params.path.join("/");
    const { list, getDownloadUrl } = await import("@vercel/blob");
    const blobPath = `uploads/${filePath}`;
    const { blobs } = await list({ prefix: blobPath, limit: 1 });
    const match = blobs.find((b) => b.pathname === blobPath);

    if (!match) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const downloadUrl = await getDownloadUrl(match.url);
    const res = await fetch(downloadUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    }

    const body = await res.arrayBuffer();
    return new NextResponse(body, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: unknown) {
    console.error("Image proxy error:", error);
    return NextResponse.json({ error: "Failed to serve image" }, { status: 500 });
  }
}
