import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * Read a JSON file from the local filesystem.
 */
export async function readJson<T = unknown>(relativePath: string): Promise<T | null> {
  const filePath = path.join(CONTENT_ROOT, relativePath);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Write a JSON file to the local filesystem.
 */
export async function writeJson<T = unknown>(relativePath: string, data: T): Promise<void> {
  const json = JSON.stringify(data, null, 2) + "\n";
  const filePath = path.join(CONTENT_ROOT, relativePath);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, json, "utf-8");
}

/**
 * Check if a JSON file exists on the local filesystem.
 */
export async function jsonExists(relativePath: string): Promise<boolean> {
  const filePath = path.join(CONTENT_ROOT, relativePath);
  return fs.existsSync(filePath);
}

/**
 * List JSON files in a directory.
 * Returns filenames (not full paths), e.g. ["home.json", "about.json"].
 */
export async function listJsonFiles(relativeDir: string): Promise<string[]> {
  const localDir = path.join(CONTENT_ROOT, relativeDir);
  try {
    return fs.readdirSync(localDir).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
}

/**
 * Delete a JSON file from the local filesystem.
 */
export async function deleteJson(relativePath: string): Promise<void> {
  const filePath = path.join(CONTENT_ROOT, relativePath);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch {
    // Ignore
  }
}
