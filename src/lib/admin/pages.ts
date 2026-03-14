import fs from "fs";
import path from "path";
import { LandingPage } from "@/lib/landing-pages/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "landing-pages");

export const hubToFiles: Record<string, string[]> = {
  "cabinet-signs": ["cabinet-signs.json"],
  "channel-letters": ["channel-letters-1.json", "channel-letters-2.json"],
  "blade-signs": ["blade-signs.json"],
  "flat-cut-letters": ["flat-cut-letters.json"],
  "light-boxes": ["light-boxes.json"],
  "logo-boxes": ["logo-boxes.json"],
  "push-through-signs": ["push-through-signs.json"],
  "general": ["general.json"],
  "engineering": ["engineering.json"],
  "illumination": ["illumination.json"],
};

export const hubNames: Record<string, string> = {
  "cabinet-signs": "Cabinet Signs",
  "channel-letters": "Channel Letters",
  "blade-signs": "Blade Signs",
  "flat-cut-letters": "Flat Cut Letters",
  "light-boxes": "Light Boxes",
  "logo-boxes": "Logo Boxes",
  "push-through-signs": "Push-Through Signs",
  "general": "General",
  "engineering": "Engineering",
  "illumination": "Illumination",
};

function readJsonFile(filename: string): LandingPage[] {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeJsonFile(filename: string, data: LandingPage[]) {
  const filePath = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function getAllPages(): LandingPage[] {
  const allPages: LandingPage[] = [];
  for (const files of Object.values(hubToFiles)) {
    for (const file of files) {
      allPages.push(...readJsonFile(file));
    }
  }
  return allPages;
}

export function getPageBySlug(
  slug: string
): { page: LandingPage; file: string } | null {
  for (const [, files] of Object.entries(hubToFiles)) {
    for (const file of files) {
      const pages = readJsonFile(file);
      const page = pages.find((p) => p.slug === slug);
      if (page) return { page, file };
    }
  }
  return null;
}

export function updatePage(
  slug: string,
  updated: LandingPage
): { success: boolean; error?: string } {
  const result = getPageBySlug(slug);
  if (!result) return { success: false, error: "Page not found" };

  const pages = readJsonFile(result.file);
  const index = pages.findIndex((p) => p.slug === slug);
  pages[index] = updated;
  writeJsonFile(result.file, pages);
  return { success: true };
}

export function createPage(
  page: LandingPage
): { success: boolean; error?: string } {
  // Check slug uniqueness
  const existing = getPageBySlug(page.slug);
  if (existing) {
    return { success: false, error: `Slug "${page.slug}" already exists` };
  }

  // Determine target file
  const files = hubToFiles[page.hubSlug];
  if (!files) {
    return { success: false, error: `Unknown hub: ${page.hubSlug}` };
  }

  // For channel-letters, append to the second file
  const targetFile = files.length > 1 ? files[files.length - 1] : files[0];
  const pages = readJsonFile(targetFile);
  pages.push(page);
  writeJsonFile(targetFile, pages);
  return { success: true };
}
