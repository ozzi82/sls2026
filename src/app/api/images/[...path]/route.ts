import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = params.path.join("/");
    const { list } = await import("@vercel/blob");
    const blobPath = `uploads/${filePath}`;
    const { blobs } = await list({ prefix: blobPath, limit: 1 });
    const match = blobs.find((b) => b.pathname === blobPath);

    if (!match) {
      console.error(`[image-proxy] No blob found for path: ${blobPath}`);
      return new NextResponse("Not found", { status: 404 });
    }

    // For private blobs, fetch using the token in Authorization header
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const res = await fetch(match.url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
      console.error(`[image-proxy] Fetch failed: ${res.status} ${res.statusText} for ${match.url}`);
      return new NextResponse("Failed to fetch", { status: 502 });
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
    return new NextResponse("Server error", { status: 500 });
  }
}
