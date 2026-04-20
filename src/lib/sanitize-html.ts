/**
 * Basic HTML sanitization for CMS content.
 * Strips script tags and event handlers but allows safe HTML.
 * Content comes from our own admin CMS (trusted), so this is a safety net, not a primary defense.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  if (!/<[^>]+>/.test(dirty)) return dirty;
  // Strip script tags and event handlers
  return dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "");
}
