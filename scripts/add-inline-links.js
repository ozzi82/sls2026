const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'content', 'landing-pages');

// Load all pages to build a lookup
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
const allPages = [];
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  for (const entry of data) {
    allPages.push(entry);
  }
}

// Build slug -> page map
const slugMap = {};
for (const p of allPages) {
  slugMap[p.slug] = p;
}

// Build hub -> slugs map
const hubMap = {};
for (const p of allPages) {
  if (!hubMap[p.hubSlug]) hubMap[p.hubSlug] = [];
  hubMap[p.hubSlug].push(p.slug);
}

// Product hub paths
const productHubs = {
  'channel-letters': '/products/channel-letters',
  'blade-signs': '/products/blade-signs',
  'flat-cut-letters': '/products/flat-cut-letters',
  'light-boxes': '/products/lightboxes',
  'cabinet-signs': '/products/cabinet-signs',
  'logo-boxes': '/products/logo-boxes',
  'push-through-signs': '/products/push-through-signs',
  'seg-light-boxes': '/products/seg-light-boxes',
};

// Key cross-hub targets that work well as link anchors
const crossHubTargets = [
  'wholesale-sign-manufacturer',
  'complimentary-sign-engineering',
  'ul-listed-signs-explained',
  'sign-permit-requirements',
  'led-illumination-types-for-signs',
  'led-module-technology',
  'energy-savings-with-led-signs',
  'sign-roi-for-businesses',
  'structural-engineering-for-signs',
];

// Generate keyword variations from a slug and page data
function getKeywords(slug, page) {
  const kws = [];
  // From slug: "led-blade-signs" -> "led blade signs"
  const fromSlug = slug.replace(/-/g, ' ');
  kws.push(fromSlug);
  if (page) {
    kws.push(page.primaryKeyword);
    kws.push(...page.secondaryKeywords.slice(0, 3));
    // h1Highlight is often a good short phrase
    if (page.h1Highlight && page.h1Highlight.length > 6) kws.push(page.h1Highlight.toLowerCase());
  }
  // Also try partial: "blade signs", "channel letters", "light boxes"
  const parts = fromSlug.split(' ');
  if (parts.length >= 3) {
    kws.push(parts.slice(1).join(' ')); // drop first word
    kws.push(parts.slice(0, 2).join(' ')); // first two words
  }
  // Dedupe and filter
  return [...new Set(kws.map(k => k.toLowerCase()))].filter(k => k.length >= 6);
}

// Build keyword -> slug mapping for natural linking
function buildLinkCandidates(currentSlug, currentHub) {
  const candidates = [];

  // Same-hub siblings (highest priority)
  const siblings = (hubMap[currentHub] || []).filter(s => s !== currentSlug);
  for (const slug of siblings) {
    const p = slugMap[slug];
    if (!p) continue;
    candidates.push({
      slug,
      href: `/signs/${slug}`,
      keywords: getKeywords(slug, p),
      priority: 1,
    });
  }

  // Related slugs
  const current = slugMap[currentSlug];
  if (current) {
    for (const slug of current.relatedSlugs) {
      if (slug === currentSlug) continue;
      const p = slugMap[slug];
      if (!p) continue;
      if (!candidates.find(c => c.slug === slug)) {
        candidates.push({
          slug,
          href: `/signs/${slug}`,
          keywords: getKeywords(slug, p),
          priority: 2,
        });
      }
    }
  }

  // Cross-hub targets
  for (const slug of crossHubTargets) {
    if (slug === currentSlug) continue;
    const p = slugMap[slug];
    if (!p) continue;
    if (!candidates.find(c => c.slug === slug)) {
      candidates.push({
        slug,
        href: `/signs/${slug}`,
        keywords: getKeywords(slug, p),
        priority: 3,
      });
    }
  }

  // Product hub links
  for (const [hub, href] of Object.entries(productHubs)) {
    if (hub === currentHub) continue;
    candidates.push({
      slug: `hub-${hub}`,
      href,
      keywords: [hub.replace(/-/g, ' ')],
      priority: 4,
    });
  }

  return candidates;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function addLinksToContent(html, currentSlug, currentHub) {
  const candidates = buildLinkCandidates(currentSlug, currentHub);
  let linksAdded = 0;
  const maxLinks = 3; // per section
  const usedSlugs = new Set();

  for (const candidate of candidates) {
    if (linksAdded >= maxLinks) break;
    if (usedSlugs.has(candidate.slug)) continue;

    for (const keyword of candidate.keywords) {
      if (linksAdded >= maxLinks) break;

      // Skip very short keywords that might match too broadly
      if (keyword.length < 6) continue;

      // Check if keyword exists in text (not already inside an <a> tag)
      const regex = new RegExp(
        `(?<!<a[^>]*>.*?)(?<!["/])\\b(${escapeRegex(keyword)})\\b(?![^<]*<\\/a>)`,
        'i'
      );

      // Simpler approach: find the keyword, make sure it's not already linked
      const lowerHtml = html.toLowerCase();
      const lowerKw = keyword.toLowerCase();
      const idx = lowerHtml.indexOf(lowerKw);

      if (idx === -1) continue;

      // Check if already inside an <a> tag
      const before = html.substring(0, idx);
      const lastOpenA = before.lastIndexOf('<a ');
      const lastCloseA = before.lastIndexOf('</a>');
      if (lastOpenA > lastCloseA) continue; // inside an <a> tag

      // Check not inside an HTML attribute
      const lastOpenTag = before.lastIndexOf('<');
      const lastCloseTag = before.lastIndexOf('>');
      if (lastOpenTag > lastCloseTag) continue; // inside a tag

      // Replace first occurrence
      const original = html.substring(idx, idx + keyword.length);
      const link = `<a href="${candidate.href}">${original}</a>`;
      html = html.substring(0, idx) + link + html.substring(idx + keyword.length);

      linksAdded++;
      usedSlugs.add(candidate.slug);
      break; // move to next candidate
    }
  }

  return { html, linksAdded };
}

// Process all files
let totalLinks = 0;
let totalSections = 0;

for (const file of files) {
  const filePath = path.join(DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let fileLinks = 0;

  for (const entry of data) {
    for (let i = 0; i < entry.sections.length; i++) {
      const { html, linksAdded } = addLinksToContent(
        entry.sections[i].content,
        entry.slug,
        entry.hubSlug
      );
      entry.sections[i].content = html;
      fileLinks += linksAdded;
      totalSections++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  totalLinks += fileLinks;
  console.log(`${file}: ${fileLinks} links added`);
}

console.log(`\nTotal: ${totalLinks} links across ${totalSections} sections in ${files.length} files`);
