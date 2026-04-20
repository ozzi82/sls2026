import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";
  if (!/<[^>]+>/.test(dirty)) return dirty;
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "del",
      "h1", "h2", "h3", "h4",
      "ul", "ol", "li",
      "a", "span", "div", "img",
      "blockquote", "code", "pre",
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "class", "style", "src", "alt",
      "data-gradient", "data-css-class",
    ],
  });
}
