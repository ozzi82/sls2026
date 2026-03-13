import Link from "next/link";

interface BreadcrumbItem {
  /** Display text — use `label` or `name` (both supported for backwards compatibility) */
  label?: string;
  name?: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label || item.name,
      ...(item.href && { item: `https://sunlitesigns.com${item.href}` }),
    })),
  };

  const isLast = (index: number) => index === items.length - 1;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center gap-2 font-heading font-semibold text-[11px] uppercase tracking-[0.15em]">
          {items.map((item, index) => {
            const text = item.label || item.name;
            return (
              <li key={text} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-brand-gold">/</span>
                )}
                {item.href && !isLast(index) ? (
                  <Link href={item.href} className="text-white/60 hover:text-brand-gold transition-colors">
                    {text}
                  </Link>
                ) : (
                  <span className="text-white/40">{text}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
