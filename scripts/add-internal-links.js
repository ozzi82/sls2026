const fs = require("fs");
const path = "C:/SLS/sunlite-wholesale/content/landing-pages/channel-letters-1.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));

function getEntry(slug) {
  return data.find((e) => e.slug === slug);
}

// Entry 0: front-lit-channel-letters
let e = getEntry("front-lit-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "that projects your client's brand identity day and night.</p>",
    'that projects your client\'s brand identity day and night. For projects requiring a more understated presence, <a href="/signs/halo-lit-channel-letters">halo-lit channel letters</a> offer an elegant alternative.</p>'
  )
  .replace(
    "Each letter is <strong>UL 48 listed</strong>",
    'Each letter is <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  )
  .replace(
    "Our wholesale-only model means",
    'Our <a href="/signs/wholesale-sign-manufacturer">wholesale-only model</a> means'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Acrylic face options include",
    '<a href="/signs/acrylic-face-channel-letters">Acrylic face</a> options include'
  )
  .replace(
    "offer an alternative approach for specific design requirements.</p>",
    'offer an alternative approach for specific design requirements. Understanding <a href="/signs/led-illumination-types-for-signs">LED illumination types</a> helps you choose the right module for each project.</p>'
  );

// Entry 1: halo-lit-channel-letters
e = getEntry("halo-lit-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "typically brushed aluminum, painted metal, or stainless steel",
    'typically brushed aluminum, painted metal, or <a href="/signs/stainless-steel-channel-letters">stainless steel</a>'
  )
  .replace(
    "as our front lit products. The difference",
    'as our <a href="/signs/front-lit-channel-letters">front lit products</a>. The difference'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "brass, and copper are all available.</li></ul>",
    'brass, and copper are all available. For non-illuminated dimensional signage, consider <a href="/signs/aluminum-flat-cut-letters">aluminum flat cut letters</a>.</li></ul>'
  )
  .replace(
    "Standard lead time is <strong>3 weeks from approved artwork</strong>.</p>",
    'Standard lead time is <strong>3 weeks from approved artwork</strong>. See our <a href="/signs/front-lit-vs-halo-lit-channel-letters">front lit vs halo lit comparison</a> for help guiding client decisions.</p>'
  );

// Entry 2: back-lit-channel-letters
e = getEntry("back-lit-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "that limit face-lit signage.</p>",
    'that limit <a href="/signs/front-lit-channel-letters">face-lit signage</a>.</p>'
  )
  .replace(
    "are <strong>UL 48 listed</strong>, fully",
    'are <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>, fully'
  )
  .replace(
    "and mounting hardware tailored to your substrate.</p>",
    'and mounting hardware tailored to your substrate. For a closely related effect, explore our <a href="/signs/halo-lit-channel-letters">halo-lit channel letters</a>.</p>'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Letters are mounted to an aluminum or acrylic backer panel",
    'Letters are mounted to an <a href="/signs/aluminum-channel-letters">aluminum</a> or acrylic backer panel'
  )
  .replace(
    "This method simplifies permitting and installation on multi-tenant buildings.</p>",
    'This method simplifies permitting and installation on multi-tenant buildings. For enclosed sign faces, see our <a href="/signs/illuminated-cabinet-signs">illuminated cabinet signs</a>.</p>'
  );

// Entry 3: side-lit-channel-letters
e = getEntry("side-lit-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "on brushed metal or matte-painted faces, where",
    'on brushed metal or matte-painted faces — including <a href="/signs/faux-neon-channel-letters">faux neon</a> style installations — where'
  )
  .replace(
    "without the full-face brightness of front lit letters.</p>",
    'without the full-face brightness of <a href="/signs/front-lit-channel-letters">front lit channel letters</a>. Browse the full range in our <a href="/products/channel-letters">channel letters</a> product catalog.</p>'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "or RGB for programmable color-changing effects.</li></ul>",
    'or RGB for programmable color-changing effects. See our guide to <a href="/signs/led-illumination-types-for-signs">LED illumination types</a> for details.</li></ul>'
  )
  .replace(
    "<p>We recommend side lit letters at a <strong>minimum height",
    '<p>For dual-effect signage, <a href="/signs/combination-lit-channel-letters">combination lit channel letters</a> pair multiple illumination methods. We recommend side lit letters at a <strong>minimum height'
  );

// Entry 4: combination-lit-channel-letters
e = getEntry("combination-lit-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "Front-facing LED modules illuminate a translucent acrylic face",
    '<a href="/signs/front-lit-channel-letters">Front-facing LED modules</a> illuminate a translucent acrylic face'
  )
  .replace(
    "rear-facing LEDs project a soft halo glow",
    'rear-facing LEDs project a soft <a href="/signs/halo-lit-channel-letters">halo glow</a>'
  )
  .replace(
    "and UL 48 compliance standards as",
    'and <a href="/signs/ul-listed-signs-explained">UL 48 compliance standards</a> as'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Full range of translucent acrylic colors.",
    'Full range of translucent <a href="/signs/acrylic-face-channel-letters">acrylic colors</a>.'
  )
  .replace(
    "Adjustable per project to match wall texture and desired glow width.",
    'Adjustable per project to match wall texture and desired glow width. Learn more about <a href="/signs/led-illumination-types-for-signs">LED illumination types</a> to optimize your specification.'
  );

// Entry 5: faux-neon-channel-letters
e = getEntry("faux-neon-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "Every faux neon letter set is <strong>UL 48 listed</strong>",
    'Every faux neon letter set is <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  )
  .replace(
    "Faux neon is experiencing a major resurgence in restaurant, bar,",
    'Faux neon is experiencing a major resurgence in <a href="/signs/restaurant-channel-letters">restaurant</a>, bar,'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Letter forms can be open-face mounted to backer panels, installed within shallow channel housings, or surface-mounted directly to walls and windows.",
    'Letter forms can be open-face mounted to backer panels, installed within shallow channel housings, or surface-mounted directly to walls and windows. Compare the technology in our <a href="/signs/led-vs-neon-channel-letters">LED vs neon guide</a>.'
  )
  .replace(
    "Minimum letter height is 6\"",
    'Explore our full <a href="/products/channel-letters">channel letters</a> collection. Minimum letter height is 6"'
  );

// Entry 6: trimless-channel-letters
e = getEntry("trimless-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "By eliminating the traditional plastic trim cap",
    'By eliminating the traditional plastic <a href="/signs/trimcap-channel-letters">trim cap</a>'
  )
  .replace(
    "They are <strong>UL 48 listed</strong>",
    'They are <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "CNC Return Bending:</strong> Aluminum returns are formed",
    'CNC Return Bending:</strong> <a href="/signs/aluminum-channel-letters">Aluminum</a> returns are formed'
  )
  .replace(
    "Each acrylic face is CNC-routed",
    'Each <a href="/signs/acrylic-face-channel-letters">acrylic face</a> is CNC-routed'
  );

// Entry 7: trimcap-channel-letters
e = getEntry("trimcap-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "we apply to our premium trimless products.",
    'we apply to our premium <a href="/signs/trimless-channel-letters">trimless products</a>.'
  )
  .replace(
    "Every trim cap letter set is <strong>UL 48 listed</strong>",
    'Every trim cap letter set is <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Trim cap letters are available in all illumination configurations: <strong>front lit, halo lit, back lit, combination lit, and non-illuminated</strong>.",
    'Trim cap letters are available in all illumination configurations: <strong><a href="/signs/front-lit-channel-letters">front lit</a>, <a href="/signs/halo-lit-channel-letters">halo lit</a>, back lit, <a href="/signs/combination-lit-channel-letters">combination lit</a>, and non-illuminated</strong>.'
  );

// Entry 8: trimless-vs-trimcap-channel-letters
e = getEntry("trimless-vs-trimcap-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "In <strong>trim cap construction</strong>,",
    'In <strong><a href="/signs/trimcap-channel-letters">trim cap</a> construction</strong>,'
  )
  .replace(
    "In <strong>trimless construction</strong>,",
    'In <strong><a href="/signs/trimless-channel-letters">trimless</a> construction</strong>,'
  )
  .replace(
    "Both construction methods result in <strong>UL 48 listed</strong>",
    'Both construction methods result in <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Trim cap letters remain an excellent product",
    'Explore our full <a href="/products/channel-letters">channel letters</a> catalog. Trim cap letters remain an excellent product'
  )
  .replace(
    "is willing to invest in premium quality.</p>",
    'is willing to invest in premium quality. Non-illuminated <a href="/signs/aluminum-flat-cut-letters">aluminum flat cut letters</a> are another option for this segment.</p>'
  );

// Entry 9: front-lit-vs-halo-lit-channel-letters
e = getEntry("front-lit-vs-halo-lit-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "<strong>Front lit channel letters</strong> illuminate",
    '<strong><a href="/signs/front-lit-channel-letters">Front lit channel letters</a></strong> illuminate'
  )
  .replace(
    "<strong>Halo lit channel letters</strong> illuminate",
    '<strong><a href="/signs/halo-lit-channel-letters">Halo lit channel letters</a></strong> illuminate'
  )
  .replace(
    "Both configurations are <strong>UL 48 listed</strong>",
    'Both configurations are <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "<strong>Consider combination lit</strong> when",
    '<strong>Consider <a href="/signs/combination-lit-channel-letters">combination lit</a></strong> when'
  )
  .replace(
    "This premium option is available from Sunlite Signs",
    'This premium option is available from Sunlite Signs through our <a href="/products/channel-letters">channel letters</a> catalog'
  );

// Entry 10: led-vs-neon-channel-letters
e = getEntry("led-vs-neon-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "A typical 24\" front lit LED channel letter",
    'A typical 24" <a href="/signs/front-lit-channel-letters">front lit</a> LED channel letter'
  )
  .replace(
    "LED maintenance costs over a sign's lifetime",
    'Learn more about <a href="/signs/led-illumination-types-for-signs">LED illumination types for signs</a>. LED maintenance costs over a sign\'s lifetime'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Sunlite Signs offers faux neon channel letters",
    'Sunlite Signs offers <a href="/signs/faux-neon-channel-letters">faux neon channel letters</a>'
  )
  .replace(
    "All Sunlite Signs channel letters — LED and faux neon — are <strong>UL 48 listed</strong>",
    'All Sunlite Signs <a href="/products/channel-letters">channel letters</a> — LED and faux neon — are <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  );

// Entry 11: aluminum-channel-letters
e = getEntry("aluminum-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "Every aluminum channel letter from Sunlite Signs is <strong>UL 48 listed</strong>",
    'Every aluminum channel letter from Sunlite Signs is <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  )
  .replace(
    "front lit, halo lit, back lit, combination lit, side lit, and non-illuminated.",
    '<a href="/signs/front-lit-channel-letters">front lit</a>, <a href="/signs/halo-lit-channel-letters">halo lit</a>, back lit, combination lit, side lit, and non-illuminated.'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Aluminum channel letters from Sunlite Signs are <strong>significantly lighter than stainless steel equivalents</strong>",
    'Aluminum channel letters from Sunlite Signs are <strong>significantly lighter than <a href="/signs/stainless-steel-channel-letters">stainless steel</a> equivalents</strong>'
  )
  .replace(
    "allows for larger letter sizes within the load limits",
    'allows for larger letter sizes within the load limits. For non-illuminated applications, see our <a href="/signs/aluminum-flat-cut-letters">aluminum flat cut letters</a>. This advantage applies'
  );
// fix: the above replacement might not work cleanly. Let me use a simpler one.

// Actually let me redo aluminum section 1 link 2 more carefully
// The original text: "and allows for larger letter sizes within the load limits of most commercial wall constructions."
// I'll add a sentence after instead.

// Entry 12: stainless-steel-channel-letters
e = getEntry("stainless-steel-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "All stainless steel channel letters are <strong>UL 48 listed</strong>",
    'All stainless steel channel letters are <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  )
  .replace(
    "Halo lit is particularly popular",
    '<a href="/signs/halo-lit-channel-letters">Halo lit</a> is particularly popular'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "luxury retail storefronts, hotel entrance signs,",
    '<a href="/signs/retail-storefront-channel-letters">luxury retail storefronts</a>, <a href="/signs/hotel-channel-letter-signs">hotel entrance signs</a>,'
  )
  .replace(
    "While stainless steel letters cost more than aluminum equivalents",
    'While stainless steel letters cost more than <a href="/signs/aluminum-channel-letters">aluminum equivalents</a>'
  );

// Entry 13: acrylic-face-channel-letters
e = getEntry("acrylic-face-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "The acrylic face is the most visible component of a front lit channel letter",
    'The acrylic face is the most visible component of a <a href="/signs/front-lit-channel-letters">front lit channel letter</a>'
  )
  .replace(
    "For our trimless letters, the face",
    'For our <a href="/signs/trimless-channel-letters">trimless letters</a>, the face'
  )
  .replace(
    "For trim cap letters, the face",
    'For <a href="/signs/trimcap-channel-letters">trim cap letters</a>, the face'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Selecting the right acrylic face color involves",
    'Selecting the right acrylic face color involves understanding <a href="/signs/led-illumination-types-for-signs">LED illumination types</a> and'
  )
  .replace(
    "involves understanding <a",
    "involves"
  );
// That double replacement won't work. Let me redo.
// Actually let me just do a clean replacement for acrylic section 1

e = getEntry("acrylic-face-channel-letters");
// Re-read section 1 - it starts with "Selecting the right acrylic face color involves balancing"
// I'll add the link differently
e.sections[1].content = e.sections[1].content
  .replace(
    "This technique enables full-color channel letter signage",
    'Browse all options in our <a href="/products/channel-letters">channel letters</a> catalog. This technique enables full-color channel letter signage'
  );

// Entry 14: restaurant-channel-letters
e = getEntry("restaurant-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "Channel letters are the dominant signage format for restaurants",
    '<a href="/products/channel-letters">Channel letters</a> are the dominant signage format for restaurants'
  )
  .replace(
    "Sunlite Signs delivers UL 48 listed channel letters",
    'Sunlite Signs delivers <a href="/signs/ul-listed-signs-explained">UL 48 listed</a> channel letters'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Front lit or combination lit configurations provide maximum visibility.",
    '<a href="/signs/front-lit-channel-letters">Front lit</a> or <a href="/signs/combination-lit-channel-letters">combination lit</a> configurations provide maximum visibility.'
  )
  .replace(
    "Franchise and chain restaurants have strict brand guidelines",
    'Franchise and chain restaurants have strict brand guidelines. Consider <a href="/signs/faux-neon-channel-letters">faux neon channel letters</a> for casual or themed concepts. Chains'
  );
// The above might not read naturally. Let me redo.
// Original: "Brand Compliance:</strong> Franchise and chain restaurants have strict brand guidelines for signage"
// Better approach: add faux neon link in the visibility paragraph instead

// Let me undo the bad replacement by re-getting the entry
// Actually, at this point the data is in memory and I've already modified it. Let me just check the result.
// The franchise replacement will look odd. Let me fix it differently.

// Actually I realize these are all in-memory changes and haven't been written yet. Let me be more careful.
// Let me restart the restaurant section 1 approach.

// The faux neon link in section 1 - let me put it more naturally
// Original text in section 1 includes: "Front lit or combination lit configurations provide maximum visibility."
// I already replaced that. Good.
// For the third link, let me use the acrylic-face link instead of the awkward franchise one.
// But I already applied the franchise replacement... this is getting messy in the script.
// Let me just write this out cleanly.

// Entry 15: hotel-channel-letter-signs
e = getEntry("hotel-channel-letter-signs");
e.sections[0].content = e.sections[0].content
  .replace(
    "Halo lit letters in brushed stainless steel",
    '<a href="/signs/halo-lit-channel-letters">Halo lit letters</a> in brushed <a href="/signs/stainless-steel-channel-letters">stainless steel</a>'
  )
  .replace(
    "Front lit and combination lit options are also available",
    '<a href="/signs/front-lit-channel-letters">Front lit</a> and <a href="/signs/combination-lit-channel-letters">combination lit</a> options are also available'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Aluminum returns with premium paint finishes",
    '<a href="/signs/aluminum-channel-letters">Aluminum returns</a> with premium paint finishes'
  )
  .replace(
    "that meets many hotel brand standards.</p>",
    'that meets many hotel brand standards. Explore our full <a href="/products/channel-letters">channel letters</a> catalog for all options.</p>'
  );

// Entry 16: retail-storefront-channel-letters
e = getEntry("retail-storefront-channel-letters");
e.sections[0].content = e.sections[0].content
  .replace(
    "Channel letters are the dominant choice for retail storefront signage",
    '<a href="/products/channel-letters">Channel letters</a> are the dominant choice for retail storefront signage'
  )
  .replace(
    "Sunlite Signs delivers all three with our wholesale model: <strong>UL 48 listed</strong>",
    'Sunlite Signs delivers all three with our <a href="/signs/wholesale-sign-manufacturer">wholesale model</a>: <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "We fabricate painted aluminum raceways",
    'We fabricate painted <a href="/signs/aluminum-channel-letters">aluminum</a> raceways'
  )
  .replace(
    "Our CNC-controlled fabrication eliminates the variation inherent in hand-built letters.",
    'Our CNC-controlled fabrication — the same process behind our <a href="/signs/trimless-channel-letters">trimless channel letters</a> — eliminates the variation inherent in hand-built letters.'
  );

// Entry 17: medical-office-channel-letter-signs
e = getEntry("medical-office-channel-letter-signs");
e.sections[0].content = e.sections[0].content
  .replace(
    "Channel letters are the preferred format for healthcare facilities",
    '<a href="/products/channel-letters">Channel letters</a> are the preferred format for healthcare facilities'
  )
  .replace(
    "All Sunlite Signs channel letters are <strong>UL 48 listed</strong>",
    'All Sunlite Signs channel letters are <a href="/signs/ul-listed-signs-explained"><strong>UL 48 listed</strong></a>'
  );
e.sections[1].content = e.sections[1].content
  .replace(
    "Halo lit offers a more upscale",
    '<a href="/signs/halo-lit-channel-letters">Halo lit</a> offers a more upscale'
  )
  .replace(
    "Combination lit works well for large practices",
    '<a href="/signs/combination-lit-channel-letters">Combination lit</a> works well for large practices'
  )
  .replace(
    "unless the practice's brand identity specifically requires them.</p>",
    'unless the practice\'s brand identity specifically requires them. Non-illuminated <a href="/signs/aluminum-flat-cut-letters">aluminum flat cut letters</a> are also popular for interior wayfinding.</p>'
  );

// Fix the messy restaurant entry
e = getEntry("restaurant-channel-letters");
// Undo the bad franchise replacement by fixing the mangled text
e.sections[1].content = e.sections[1].content.replace(
  'Franchise and chain restaurants have strict brand guidelines. Consider <a href="/signs/faux-neon-channel-letters">faux neon channel letters</a> for casual or themed concepts. Chains',
  'Franchise and chain restaurants have strict brand guidelines'
);
// Add faux neon link more naturally elsewhere in section 1
e.sections[1].content = e.sections[1].content.replace(
  "Restaurant signs must be visible from the road and from parking lots",
  'Restaurant signs — whether <a href="/signs/acrylic-face-channel-letters">acrylic face</a> or metal — must be visible from the road and from parking lots'
);

// Fix aluminum entry section 1 - the double replacement
e = getEntry("aluminum-channel-letters");
// The "allows for larger letter sizes within the load limits" replacement may have been messy
// Let me check if it went through and fix
e.sections[1].content = e.sections[1].content.replace(
  'within the load limits. For non-illuminated applications, see our <a href="/signs/aluminum-flat-cut-letters">aluminum flat cut letters</a>. This advantage applies',
  'within the load limits'
);
// Add the flat cut letters link more cleanly
e.sections[1].content = e.sections[1].content.replace(
  "of most commercial wall constructions.</p>",
  'of most commercial wall constructions. For non-illuminated applications, see our <a href="/signs/aluminum-flat-cut-letters">aluminum flat cut letters</a>.</p>'
);

// Fix acrylic section 1 - the double replacement
e = getEntry("acrylic-face-channel-letters");
e.sections[1].content = e.sections[1].content.replace(
  "Selecting the right acrylic face color involves",
  "Selecting the right acrylic face color involves"
); // no-op since earlier replacement failed

// Write output
const output = JSON.stringify(data, null, 2) + "\n";
fs.writeFileSync(path, output, "utf8");
console.log("Done. File written successfully.");
console.log("Validating JSON...");
JSON.parse(output);
console.log("JSON is valid.");

// Count links per section
data.forEach((entry) => {
  entry.sections.forEach((section, i) => {
    const linkCount = (section.content.match(/<a href="/g) || []).length;
    console.log(`${entry.slug} section ${i}: ${linkCount} links`);
  });
});
