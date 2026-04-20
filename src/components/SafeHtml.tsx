import { sanitizeHtml } from "@/lib/sanitize-html";

interface SafeHtmlProps {
  html: string | undefined | null;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function SafeHtml({ html, as: Tag = "span", className }: SafeHtmlProps) {
  if (!html) return null;
  // If no HTML tags, render as plain text
  if (!/<[^>]+>/.test(html)) {
    return <Tag className={className}>{html}</Tag>;
  }
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />;
}
