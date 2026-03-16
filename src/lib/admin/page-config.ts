import fs from "fs";
import path from "path";
import { PageConfig } from "./page-config-types";

const PRODUCTS_DIR = path.join(process.cwd(), "content", "products");
const PAGES_DIR = path.join(process.cwd(), "content", "pages");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readConfigFile(filePath: string): PageConfig | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeConfigFile(filePath: string, config: PageConfig) {
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2) + "\n", "utf-8");
}

function fileSlugToFilename(fileSlug: string): string {
  // fileSlug is the config ID / filename stem, e.g., "cabinet-signs" or "channel-letters--front-lit"
  // This is NOT the PageConfig.slug field (which stores URL paths like "/products/cabinet-signs")
  return fileSlug + ".json";
}

// Public-facing helpers (read configs for rendering pages)
export function loadProductConfig(fileSlug: string): PageConfig {
  const config = readConfigFile(path.join(PRODUCTS_DIR, fileSlugToFilename(fileSlug)));
  if (!config) throw new Error(`Product config not found: ${fileSlug}`);
  return config;
}

export function loadStaticPageConfig(fileSlug: string): PageConfig {
  const config = readConfigFile(path.join(PAGES_DIR, fileSlugToFilename(fileSlug)));
  if (!config) throw new Error(`Static page config not found: ${fileSlug}`);
  return config;
}

// Product page configs
export function getAllProductConfigs(): PageConfig[] {
  ensureDir(PRODUCTS_DIR);
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => readConfigFile(path.join(PRODUCTS_DIR, f)))
    .filter((c): c is PageConfig => c !== null);
}

export function getProductConfig(fileSlug: string): PageConfig | null {
  return readConfigFile(path.join(PRODUCTS_DIR, fileSlugToFilename(fileSlug)));
}

export function updateProductConfig(fileSlug: string, config: PageConfig): { success: boolean; error?: string } {
  const filePath = path.join(PRODUCTS_DIR, fileSlugToFilename(fileSlug));
  if (!fs.existsSync(filePath)) {
    return { success: false, error: "Product config not found" };
  }
  writeConfigFile(filePath, config);
  return { success: true };
}

// Static page configs
export function getAllStaticConfigs(): PageConfig[] {
  ensureDir(PAGES_DIR);
  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => readConfigFile(path.join(PAGES_DIR, f)))
    .filter((c): c is PageConfig => c !== null);
}

export function getStaticConfig(fileSlug: string): PageConfig | null {
  return readConfigFile(path.join(PAGES_DIR, fileSlugToFilename(fileSlug)));
}

export function updateStaticConfig(fileSlug: string, config: PageConfig): { success: boolean; error?: string } {
  const filePath = path.join(PAGES_DIR, fileSlugToFilename(fileSlug));
  if (!fs.existsSync(filePath)) {
    return { success: false, error: "Static page config not found" };
  }
  writeConfigFile(filePath, config);
  return { success: true };
}
