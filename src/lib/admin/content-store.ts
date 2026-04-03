import fs from "fs";
import path from "path";

const IS_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;
const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * Read a JSON file from Vercel Blob (if available) or local filesystem.
 * Blob takes precedence — if a file was edited via admin, the Blob version wins.
 * Falls back to the committed file in the repo for unedited content.
 */
export async function readJson<T = unknown>(relativePath: string): Promise<T | null> {
  if (IS_BLOB) {
    try {
      const { list, getDownloadUrl } = await import("@vercel/blob");
      const blobPath = `content/${relativePath}`;
      const { blobs } = await list({ prefix: blobPath, limit: 1 });
      const match = blobs.find((b) => b.pathname === blobPath);
      if (match) {
        const downloadUrl = await getDownloadUrl(match.url);
        const res = await fetch(downloadUrl);
        if (res.ok) return (await res.json()) as T;
      }
    } catch (err) {
      console.error(`[content-store] readJson blob error for ${relativePath}:`, err);
      // Fall through to filesystem
    }
  }

  // Filesystem fallback (works locally + serves committed content on Vercel at build time)
  const filePath = path.join(CONTENT_ROOT, relativePath);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Write a JSON file to Vercel Blob (if available) or local filesystem.
 */
export async function writeJson<T = unknown>(relativePath: string, data: T): Promise<void> {
  const json = JSON.stringify(data, null, 2) + "\n";

  if (IS_BLOB) {
    try {
      const { put } = await import("@vercel/blob");
      const blobPath = `content/${relativePath}`;
      await put(blobPath, json, {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
      });
      return;
    } catch (err) {
      console.error(`[content-store] writeJson blob error for ${relativePath}:`, err);
      throw err;
    }
  }

  // Local filesystem fallback
  const filePath = path.join(CONTENT_ROOT, relativePath);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, json, "utf-8");
}

/**
 * Check if a JSON file exists in Vercel Blob or local filesystem.
 */
export async function jsonExists(relativePath: string): Promise<boolean> {
  if (IS_BLOB) {
    try {
      const { list } = await import("@vercel/blob");
      const blobPath = `content/${relativePath}`;
      const { blobs } = await list({ prefix: blobPath, limit: 1 });
      if (blobs.some((b) => b.pathname === blobPath)) return true;
    } catch {
      // Fall through to filesystem
    }
  }

  const filePath = path.join(CONTENT_ROOT, relativePath);
  return fs.existsSync(filePath);
}

/**
 * List JSON files in a directory (Vercel Blob or local filesystem).
 * Returns filenames (not full paths), e.g. ["home.json", "about.json"].
 */
export async function listJsonFiles(relativeDir: string): Promise<string[]> {
  const localDir = path.join(CONTENT_ROOT, relativeDir);
  // Always start with local files (committed content)
  let localFiles: string[] = [];
  try {
    localFiles = fs.readdirSync(localDir).filter((f) => f.endsWith(".json"));
  } catch {
    // Directory may not exist
  }

  if (!IS_BLOB) return localFiles;

  // In Blob mode, also check for Blob-only files and merge
  try {
    const { list } = await import("@vercel/blob");
    const prefix = `content/${relativeDir}/`;
    const { blobs } = await list({ prefix });
    const blobFiles = blobs
      .map((b) => b.pathname.replace(prefix, ""))
      .filter((f) => f.endsWith(".json") && !f.includes("/"));

    // Merge: blob files override local, but include both sets
    const allFiles = new Set([...localFiles, ...blobFiles]);
    return Array.from(allFiles).sort();
  } catch {
    return localFiles;
  }
}

/**
 * Delete a JSON file from Vercel Blob. No-op for local filesystem
 * (we don't delete committed files locally).
 */
export async function deleteJson(relativePath: string): Promise<void> {
  if (IS_BLOB) {
    try {
      const { list, del } = await import("@vercel/blob");
      const blobPath = `content/${relativePath}`;
      const { blobs } = await list({ prefix: blobPath, limit: 1 });
      const match = blobs.find((b) => b.pathname === blobPath);
      if (match) await del(match.url);
    } catch {
      // Ignore
    }
  }
}
