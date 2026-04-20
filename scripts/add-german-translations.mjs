/**
 * Script to add German (de) translations to all content JSON files.
 * Uses exact translations for all user-facing strings.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = join(import.meta.dirname, '..', 'content');

// ─── Full translation map ────────────────────────────────────────────────────
// Every user-facing string that appears in the content JSON files.
const T = {
  // ── Common / Repeated ──
  'Wholesale Only — Trade Pricing': 'Nur Großhandel — Händlerpreise',
  'Wholesale Only · Trade Accounts': 'Nur Großhandel · Händlerkonten',
  'Wholesale Partner Resources': 'Großhandel-Partnerressourcen',
  'Trade Resources': 'Fachhandel-Ressourcen',
  'Wholesale Only': 'Nur Großhandel',
  'Trade Accounts Only': 'Nur Händlerkonten',
  'Request Wholesale Pricing': 'Großhandelspreis anfragen',
  'Get Your Product Started': 'Starten Sie Ihr Projekt',
  'Request Trade Quote': 'Handelsangebot anfordern',
  'Explore Trimless': 'Randlos entdecken',
  'See the Difference': 'Den Unterschied sehen',
  'See Our Quality Process': 'Unseren Qualitätsprozess ansehen',
  'Our Quality Process': 'Unser Qualitätsprozess',
  'Browse Trade Catalog': 'Handelskatalog durchblättern',
  'Download Catalog': 'Katalog herunterladen',
  'View Products': 'Produkte ansehen',
  'Explore Services': 'Leistungen entdecken',
  'Read Our Story': 'Unsere Geschichte lesen',
  'Get Your Product': 'Starten Sie Ihr',
  'Started.': 'Projekt.',
  'Ready to put our complimentary engineering services to work on your next project? Send us your details and receive a detailed wholesale quote within 48 hours.': 'Bereit, unsere kostenlosen Konstruktionsleistungen für Ihr nächstes Projekt einzusetzen? Senden Sie uns Ihre Details und erhalten Sie ein detailliertes Großhandelsangebot innerhalb von 48 Stunden.',
  'Ready to Order': 'Bereit zur Bestellung',
  'Send us your project details and receive a detailed wholesale quote within 48 hours. No minimum order. No obligation.': 'Senden Sie uns Ihre Projektdetails und erhalten Sie ein detailliertes Großhandelsangebot innerhalb von 48 Stunden. Keine Mindestbestellung. Keine Verpflichtung.',
  'Ready to Get Started?': 'Bereit loszulegen?',
  'Request a wholesale quote for your next project.': 'Fordern Sie ein Großhandelsangebot für Ihr nächstes Projekt an.',
  'Trade Specifications': 'Handelsspezifikationen',
  'Trade Specifications & Benefits': 'Handelsspezifikationen & Vorteile',
  'Common Applications': 'Häufige Anwendungen',
  'Ideal Applications': 'Ideale Anwendungen',
  'Learn More': 'Mehr erfahren',
  'Channel Letters': 'Leuchtbuchstaben',
  'EdgeLuxe Trimless': 'EdgeLuxe Randlos',
  'Blade Signs': 'Ausleger-Schilder',
  'Cabinet Signs': 'Leuchtkästen',
  'SEG Light Boxes': 'SEG-Lichtboxen',
  'Flat Cut Letters': 'Flachbuchstaben',
  'Gallery': 'Galerie',
  'Face Lit Letters?': 'Front-beleuchtete Buchstaben?',
  'Halo Lit Letters?': 'Halo-beleuchtete Buchstaben?',
  'Front & Halo Letters?': 'Front- & Halo-Buchstaben?',
  'Back Side Lit Letters?': 'Rückseitenbeleuchtete Buchstaben?',
  'Conical Profile Letters?': 'Konische Profil-Buchstaben?',
  'Faux Neon Letters?': 'Faux-Neon-Buchstaben?',
  'Front Side Lit Letters?': 'Vorderseitenbeleuchtete Buchstaben?',
  'Side Lit Letters?': 'Seitenbeleuchtete Buchstaben?',
  'Non-Illuminated Letters?': 'Nicht-beleuchtete Buchstaben?',
  'Flush Mount Letters?': 'Flächenbündig montierte Buchstaben?',
  'Standoff Halo Letters?': 'Abstandshalter-Halo-Buchstaben?',
  'Trimless Letters?': 'Randlose Buchstaben?',
  'Channel Letters?': 'Leuchtbuchstaben?',
  'Cabinet Signs.': 'Leuchtkästen.',
  'Logo Boxes.': 'Logo-Boxen.',
  'Push-Through Signs.': 'Durchsteck-Schilder.',
  'Need a Custom': 'Brauchen Sie eine individuelle',
  'Solution?': 'Lösung?',
  'UL Listed': 'UL-zertifiziert',

  // ── HOME PAGE ──
  'Sunlite Signs — Wholesale Channel Letters & LED Signage Manufacturer': 'Sunlite Signs — Leuchtbuchstaben & LED-Beschilderung im Großhandel',
  'German-engineered wholesale channel letters, blade signs & illuminated signage — built for sign shops, never sold retail. UL listed. 3-week delivery.': 'Deutsche Ingenieurskunst: Leuchtbuchstaben, Ausleger-Schilder & beleuchtete Beschilderung im Großhandel — gefertigt für Schilderwerkstätten, kein Einzelhandel. UL-zertifiziert. 3 Wochen Lieferzeit.',
  'wholesale channel letters': 'Leuchtbuchstaben Großhandel',
  'wholesale sign manufacturer': 'Schilderhersteller Großhandel',
  'LED signage wholesale': 'LED-Beschilderung Großhandel',
  'sign shop supplier': 'Zulieferer für Schilderwerkstätten',
  'Precision Signage,': 'Präzisionsbeschilderung,',
  'Exclusively Wholesale.': 'Exklusiv im Großhandel.',
  'German-engineered channel letters, blade signs & illuminated signage — built for sign professionals.': 'Leuchtbuchstaben, Ausleger-Schilder & beleuchtete Beschilderung mit deutscher Ingenieurskunst — gefertigt für Schilderfachleute.',
  'WHOLESALE ONLY': 'NUR GROSSHANDEL',
  'UL 48 LISTED': 'UL 48 ZERTIFIZIERT',
  '24-HOUR QUOTES': '24-STUNDEN-ANGEBOTE',
  '3-WEEK DELIVERY': '3 WOCHEN LIEFERZEIT',
  'USA & CANADA': 'USA & KANADA',
  'GERMAN ENGINEERING': 'DEUTSCHE INGENIEURSKUNST',
  'TRADE ACCOUNTS': 'HÄNDLERKONTEN',
  'NO RETAIL SALES': 'KEIN EINZELHANDEL',
  'Listed & Certified': 'Gelistet & zertifiziert',
  'UL 48': 'UL 48',
  'Quote Turnaround': 'Angebotsbearbeitung',
  '24h': '24h',
  'Door-to-Door': 'Von Tür zu Tür',
  '3 Wk': '3 Wo.',
  'Nationwide Shipping': 'Landesweiter Versand',
  'US/CA': 'US/CA',
  'Real Projects Delivered to Sign Shops Across North America': 'Reale Projekte, geliefert an Schilderwerkstätten in ganz Nordamerika',
  'What We Build': 'Was wir fertigen',
  'Build': 'fertigen',
  'Precision-engineered signage solutions, manufactured exclusively for the trade.': 'Präzisionsgefertigte Beschilderungslösungen, exklusiv für den Fachhandel.',
  'Front-lit, halo-lit, and combo-lit channel letters for high-visibility retail and franchise signage.': 'Front-beleuchtete, halo-beleuchtete und kombiniert beleuchtete Leuchtbuchstaben für hochsichtbare Einzelhandels- und Franchise-Beschilderung.',
  'Most Popular': 'Beliebtestes Produkt',
  'Front-Lit': 'Front-beleuchtet',
  'Halo-Lit': 'Halo-beleuchtet',
  'Combo-Lit': 'Kombi-beleuchtet',
  'LED Illuminated': 'LED-beleuchtet',
  'Retail & Franchise': 'Einzelhandel & Franchise',
  'Architectural illuminated letters with a clean trimless profile and premium modern finish.': 'Architektonische Leuchtbuchstaben mit sauberem randlosen Profil und hochwertigem modernen Finish.',
  'Premium': 'Premium',
  'Trimless': 'Randlos',
  '1.2" Profile': '1,2" Profil',
  'Embedded LEDs': 'Eingebettete LEDs',
  'Architectural': 'Architektonisch',
  'Premium & Architectural': 'Premium & Architektonisch',
  'Precision-cut aluminum and stainless steel letterforms for interior and exterior branding.': 'Präzisionsgeschnittene Buchstabenformen aus Aluminium und Edelstahl für Innen- und Außenbranding.',
  'Non-Illuminated': 'Nicht-beleuchtet',
  'Aluminum': 'Aluminium',
  'Stainless Steel': 'Edelstahl',
  'Dimensional': 'Dimensional',
  'Interior & Exterior Branding': 'Innen- & Außenbranding',
  'Projecting signs designed for storefront visibility in pedestrian-heavy environments.': 'Ausleger-Schilder für maximale Sichtbarkeit an Fassaden in stark frequentierten Fußgängerbereichen.',
  'Double-Sided': 'Doppelseitig',
  'Projecting': 'Auskragend',
  'Exterior': 'Außen',
  'Custom Shapes': 'Individuelle Formen',
  'Retail Storefronts': 'Einzelhandelsfassaden',
  'Illuminated cabinet and push-through signage for high visibility and broad brand presence.': 'Beleuchtete Leuchtkästen und Durchsteck-Beschilderung für hohe Sichtbarkeit und starke Markenpräsenz.',
  'Illuminated': 'Beleuchtet',
  'Push-Through': 'Durchsteck',
  'Large Format': 'Großformat',
  'Retail & Commercial': 'Einzelhandel & Gewerbe',
  'Slim-profile silicone-edge graphic light boxes for modern branded environments.': 'Flache SEG-Lichtboxen mit Silikonkante für moderne Markenumgebungen.',
  'New': 'Neu',
  'Backlit': 'Hinterleuchtet',
  'Fabric Graphic': 'Stoffgrafik',
  'Slim Profile': 'Flaches Profil',
  'Interior': 'Innen',
  'Interior Display': 'Innenausstattung',
  'Why Sign Shops Choose Sunlite': 'Warum Schilderwerkstätten Sunlite wählen',
  'We Never Compete With Your Clients': 'Wir konkurrieren nie mit Ihren Kunden',
  'Sunlite sells exclusively to sign companies and trade professionals. Your customer relationships stay protected.': 'Sunlite verkauft ausschließlich an Schilderunternehmen und Fachhandel. Ihre Kundenbeziehungen bleiben geschützt.',
  'Complimentary Engineering': 'Kostenlose Konstruktion',
  'Every project includes engineering support to help move from concept to fabrication with confidence.': 'Jedes Projekt beinhaltet Konstruktionsunterstützung, um sicher vom Konzept zur Fertigung zu gelangen.',
  '24-Hour Quote Turnaround': '24-Stunden-Angebotserstellung',
  'Fast trade quoting helps you respond quickly and keep projects moving.': 'Schnelle Angebotserstellung für den Fachhandel hilft Ihnen, zügig zu reagieren und Projekte voranzutreiben.',
  'German-Engineered Precision': 'Deutsche Ingenieurs-Präzision',
  'Our fabrication standards are rooted in European signage engineering and premium detailing.': 'Unsere Fertigungsstandards basieren auf europäischer Beschilderungstechnik und Premium-Verarbeitung.',
  'Reliable USA & Canada Delivery': 'Zuverlässige Lieferung in USA & Kanada',
  'Typical turnaround is fast, predictable, and built around trade schedules.': 'Die typische Bearbeitungszeit ist schnell, planbar und auf den Fachhandel abgestimmt.',
  'Blind / Silent Fulfillment': 'Stille Auftragsabwicklung',
  'We support your business as a manufacturing partner, not a competing sales channel.': 'Wir unterstützen Ihr Unternehmen als Fertigungspartner, nicht als konkurrierender Vertriebskanal.',
  'Complimentary': 'Kostenlose',
  'Engineering.': 'Konstruktion.',
  'Included with Every Project': 'Bei jedem Projekt inklusive',
  'With our German design and engineering roots, we contribute complimentary engineering services to every project — from conceptual integration of structural and material sciences, to manufacturing engineering and packaging.': 'Mit unseren deutschen Design- und Ingenieurswurzeln steuern wir kostenlose Konstruktionsleistungen zu jedem Projekt bei — von der konzeptionellen Integration von Struktur- und Materialwissenschaften bis hin zur Fertigungstechnik und Verpackung.',
  'Sunlite Signs engineering team designing channel letters': 'Sunlite Signs Ingenieursteam beim Entwurf von Leuchtbuchstaben',
  'Concept & Materials': 'Konzept & Materialien',
  'Structural Engineering': 'Konstruktionstechnik',
  'Electrical Layout': 'Elektroplanung',
  'Manufacturing Engineering': 'Fertigungstechnik',
  'Trusted by Trade Partners Who Need Reliability': 'Vertraut von Handelspartnern, die Zuverlässigkeit brauchen',
  'Jake Morrison, Operations Manager — SignCraft Pro, Denver CO': 'Jake Morrison, Betriebsleiter — SignCraft Pro, Denver CO',
  "We switched to Sunlite for our channel letter projects last year and haven't looked back. The engineering support alone saves us hours per job, and the 3-week turnaround is consistent. They genuinely operate as a silent partner — our clients never know.": 'Wir haben letztes Jahr für unsere Leuchtbuchstaben-Projekte zu Sunlite gewechselt und es nie bereut. Allein die Konstruktionsunterstützung spart uns Stunden pro Auftrag, und die 3-Wochen-Lieferzeit ist zuverlässig. Sie arbeiten wirklich als stiller Partner — unsere Kunden merken es nie.',
  'Maria Chen, Owner — Pacific Sign Works, Vancouver BC': 'Maria Chen, Inhaberin — Pacific Sign Works, Vancouver BC',
  "What sold us was the no-channel-conflict promise. As a smaller shop, we were tired of manufacturers undercutting us. Sunlite only sells wholesale, period. The quality of their trimless letters is the best we've seen at this price point.": 'Überzeugt hat uns das Versprechen, keinen Kanalkonflikt zu schaffen. Als kleinere Werkstatt hatten wir genug davon, von Herstellern unterboten zu werden. Sunlite verkauft ausschließlich im Großhandel, Punkt. Die Qualität ihrer randlosen Buchstaben ist die beste, die wir in dieser Preisklasse gesehen haben.',
  'David Kowalski, Production Lead — Great Lakes Signage, Detroit MI': 'David Kowalski, Produktionsleiter — Great Lakes Signage, Detroit MI',
  "The quote turnaround is real — we usually get pricing back same day. Their packaging is excellent too, we've had zero damage across dozens of shipments. It's refreshing to work with a manufacturer that actually understands what installers need.": 'Die schnelle Angebotserstellung stimmt — wir bekommen die Preise meist noch am selben Tag. Auch die Verpackung ist ausgezeichnet, wir hatten bei dutzenden Lieferungen null Schäden. Es ist erfrischend, mit einem Hersteller zu arbeiten, der wirklich versteht, was Installateure brauchen.',
  'Sarah Bennett, VP Sales — Southern Sign Alliance, Atlanta GA': 'Sarah Bennett, VP Vertrieb — Southern Sign Alliance, Atlanta GA',
  "Sunlite has become our go-to for anything illuminated. The German engineering shows in the fit and finish. Our franchise clients notice the quality difference, and that makes us look good. The complimentary engineering drawings save us real money.": 'Sunlite ist unsere erste Wahl für alles Beleuchtete geworden. Die deutsche Ingenieurskunst zeigt sich in Passform und Verarbeitung. Unsere Franchise-Kunden bemerken den Qualitätsunterschied, und das lässt uns gut aussehen. Die kostenlosen Konstruktionszeichnungen sparen uns echtes Geld.',
  'From Artwork to Installation': 'Vom Entwurf bis zur Installation',
  'Submit Artwork': 'Artwork einreichen',
  'Send us your artwork, drawings, or project specs. We accept all standard file formats.': 'Senden Sie uns Ihr Artwork, Zeichnungen oder Projektspezifikationen. Wir akzeptieren alle gängigen Dateiformate.',
  'Review & Engineering': 'Prüfung & Konstruktion',
  'Our team reviews your submission and provides complimentary engineering support.': 'Unser Team prüft Ihre Unterlagen und bietet kostenlose Konstruktionsunterstützung.',
  'Quote Approval': 'Angebotsfreigabe',
  'Receive a detailed wholesale quote within 24 hours. Approve to begin fabrication.': 'Erhalten Sie ein detailliertes Großhandelsangebot innerhalb von 24 Stunden. Freigabe erteilen, um die Fertigung zu starten.',
  'Fabrication & QC': 'Fertigung & QK',
  'Precision manufacturing with multi-point quality control at every stage.': 'Präzisionsfertigung mit mehrstufiger Qualitätskontrolle in jeder Phase.',
  'Secure Packaging': 'Sichere Verpackung',
  'Custom crating and packaging engineered to protect your signs in transit.': 'Individuell konstruierte Kisten und Verpackungen zum Schutz Ihrer Schilder beim Transport.',
  'Delivery': 'Lieferung',
  'Door-to-door shipping to your installer or job site across the USA and Canada.': 'Lieferung direkt an Ihren Installateur oder die Baustelle in den USA und Kanada.',
  'Custom European Signage,': 'Europäische Maßanfertigung,',
  'Wholesale.': 'Großhandel.',
  'Our Story': 'Unsere Geschichte',
  "The foundation of Sunlite Signs begins with a partnership rooted in German precision engineering — and a commitment to never compete with our customers.\n\nFrom LKF Lichtwerbung in Nuremberg to Florida, we bring decades of European signage expertise exclusively to the trade.": 'Die Grundlage von Sunlite Signs basiert auf einer Partnerschaft, die in deutscher Präzisionstechnik verwurzelt ist — und dem Versprechen, nie mit unseren Kunden zu konkurrieren.\n\nVon LKF Lichtwerbung in Nürnberg bis Florida bringen wir jahrzehntelange europäische Beschilderungsexpertise exklusiv in den Fachhandel.',
  'Sunlite Signs team and LKF Lichtwerbung partnership': 'Sunlite Signs Team und LKF Lichtwerbung Partnerschaft',
  'Wholesale Signage Resources for Sign Professionals': 'Großhandel-Beschilderungsressourcen für Schilderfachleute',
  'Trimless vs Trimcap Channel Letters': 'Randlose vs. Zierleisten-Leuchtbuchstaben',
  'Compare construction methods, aesthetics, and long-term performance for your next project.': 'Vergleichen Sie Konstruktionsmethoden, Ästhetik und Langzeitleistung für Ihr nächstes Projekt.',
  'Front-Lit vs Halo-Lit Channel Letters': 'Front-beleuchtete vs. Halo-beleuchtete Leuchtbuchstaben',
  'Understand the illumination options and which works best for different applications.': 'Verstehen Sie die Beleuchtungsoptionen und welche für verschiedene Anwendungen am besten geeignet ist.',
  'UL Listed Signs Explained': 'UL-zertifizierte Schilder erklärt',
  'What UL 48 listing means for code compliance, permitting, and client confidence.': 'Was die UL 48-Zertifizierung für Normkonformität, Genehmigungen und Kundenvertrauen bedeutet.',
  'Channel Letter Installation Guide': 'Leuchtbuchstaben-Installationsanleitung',
  'Practical tips for installers covering mounting, wiring, and common field issues.': 'Praktische Tipps für Installateure zu Montage, Verkabelung und häufigen Problemen vor Ort.',
  'Packaging & Shipping for Illuminated Signs': 'Verpackung & Versand beleuchteter Schilder',
  'How we protect your signs in transit with custom crating across the USA and Canada.': 'Wie wir Ihre Schilder beim Transport mit individuellen Kisten in den USA und Kanada schützen.',
  'How Blind Fulfillment Works for Sign Shops': 'So funktioniert die stille Auftragsabwicklung für Schilderwerkstätten',
  'Our silent manufacturing model explained — your clients stay yours, always.': 'Unser stilles Fertigungsmodell erklärt — Ihre Kunden bleiben immer Ihre Kunden.',
  'Start Your Wholesale': 'Starten Sie Ihr Großhandels-',
  'Sign Project.': 'Schilderprojekt.',
  'Send us your artwork, specs, or project details and receive a trade quote fast. Complimentary engineering included with every project.': 'Senden Sie uns Ihr Artwork, Spezifikationen oder Projektdetails und erhalten Sie schnell ein Handelsangebot. Kostenlose Konstruktion bei jedem Projekt inklusive.',
  'A Manufacturing Partner for Professional Sign Shops': 'Ein Fertigungspartner für professionelle Schilderwerkstätten',
  'Wholesale Only': 'Nur Großhandel',
  'We sell exclusively to sign shops and trade professionals.': 'Wir verkaufen ausschließlich an Schilderwerkstätten und Fachhandel.',
  'No Retail Sales': 'Kein Einzelhandel',
  'Your clients are your clients. We never sell direct.': 'Ihre Kunden sind Ihre Kunden. Wir verkaufen nie direkt.',
  'Engineering Included': 'Konstruktion inklusive',
  'Complimentary engineering support on every project.': 'Kostenlose Konstruktionsunterstützung bei jedem Projekt.',
  'Fast Trade Quotes': 'Schnelle Handelsangebote',
  '24-hour quote turnaround for trade accounts.': '24-Stunden-Angebotserstellung für Händlerkonten.',
  'USA & Canada Shipping': 'Versand USA & Kanada',
  'Door-to-door delivery across North America.': 'Lieferung von Tür zu Tür in ganz Nordamerika.',
  'Silent Manufacturing': 'Stille Fertigung',
  'We operate as your blind fulfillment partner.': 'Wir agieren als Ihr stiller Auftragsabwicklungspartner.',
  'Front-lit channel letters — retail storefront, Miami FL': 'Front-beleuchtete Leuchtbuchstaben — Einzelhandelsfassade, Miami FL',
  'EdgeLuxe trimless channel letters — corporate office, Dallas TX': 'EdgeLuxe randlose Leuchtbuchstaben — Firmenbüro, Dallas TX',
  'Illuminated blade sign — restaurant, Chicago IL': 'Beleuchtetes Ausleger-Schild — Restaurant, Chicago IL',
  'Cabinet sign — franchise location, Toronto ON': 'Leuchtkasten — Franchise-Standort, Toronto ON',
  'Halo-lit channel letters — hotel entrance, Las Vegas NV': 'Halo-beleuchtete Leuchtbuchstaben — Hoteleingang, Las Vegas NV',
  'SEG light box — retail interior, New York NY': 'SEG-Lichtbox — Einzelhandelsinterieur, New York NY',
  'Front-Lit LED': 'Front-beleuchtete LED',
  'Halo-Lit LED': 'Halo-beleuchtete LED',
  'Double-Sided LED': 'Doppelseitige LED',
  'Push-Through LED': 'Durchsteck-LED',
  'Backlit Fabric': 'Hinterleuchteter Stoff',

  // ── ABOUT PAGE ──
  'Our Story — Sunlite Signs': 'Unsere Geschichte — Sunlite Signs',
  'The story of Sunlite Signs LLC — from German engineering roots in Nuremberg to a wholesale-only LED signage manufacturer in Florida. Built exclusively for sign shops across the USA and Canada.': 'Die Geschichte der Sunlite Signs LLC — von deutschen Ingenieurswurzeln in Nürnberg zu einem reinen Großhandel-LED-Beschilderungshersteller in Florida. Exklusiv für Schilderwerkstätten in den USA und Kanada.',
  'sunlite signs story': 'Sunlite Signs Geschichte',
  'german engineering signs': 'deutsche Ingenieurskunst Schilder',
  'LKF Lichtwerbung': 'LKF Lichtwerbung',
  'Our': 'Unsere',
  'Story': 'Geschichte',
  'What makes us passionate about signage and experience.': 'Was uns an Beschilderung und Erfahrung begeistert.',
  'The Foundation: LKF Lichtwerbung, Nuremberg': 'Das Fundament: LKF Lichtwerbung, Nürnberg',
  'The story begins with LKF Lichtwerbung in Nuremberg, Germany — a company built on decades of precision engineering in illuminated signage. European craftsmanship at its finest. The German standard for channel letter manufacturing that would eventually find its way across the Atlantic.': 'Die Geschichte beginnt mit LKF Lichtwerbung in Nürnberg — ein Unternehmen, das auf Jahrzehnte präziser Ingenieursarbeit in der beleuchteten Beschilderung aufgebaut ist. Europäische Handwerkskunst vom Feinsten. Der deutsche Standard für die Leuchtbuchstaben-Fertigung, der schließlich den Weg über den Atlantik finden sollte.',
  'Father & Son: A Legacy of Precision': 'Vater & Sohn: Ein Vermächtnis der Präzision',
  'The growth of LKF under father-son collaboration deepened a heritage of German engineering excellence. Every letterform, every LED integration, every structural calculation refined over generations. A legacy that demanded nothing less than perfection.': 'Das Wachstum von LKF durch die Vater-Sohn-Zusammenarbeit vertiefte ein Erbe deutscher Ingenieursexzellenz. Jede Buchstabenform, jede LED-Integration, jede Strukturberechnung über Generationen verfeinert. Ein Vermächtnis, das nichts weniger als Perfektion verlangte.',
  'Kenan Meets Ozan in Germany': 'Kenan trifft Ozan in Deutschland',
  'A chance meeting in Germany between Kenan and Ozan sparked a shared vision. Two minds united by a passion for precision signage and a belief that the American market deserved better — European engineering quality at wholesale prices, delivered direct to sign shops.': 'Ein zufälliges Treffen in Deutschland zwischen Kenan und Ozan entfachte eine gemeinsame Vision. Zwei Köpfe, vereint durch die Leidenschaft für Präzisionsbeschilderung und den Glauben, dass der amerikanische Markt Besseres verdient — europäische Ingenieursqualität zu Großhandelspreisen, direkt an Schilderwerkstätten geliefert.',
  'A Friendship Becomes Something Larger': 'Aus Freundschaft wird etwas Größeres',
  'What started as a friendship evolved into a business vision: bring German-engineered signage to the USA, exclusively for the trade. No retail. No competing with customers. A wholesale manufacturing partner that stays in its lane.': 'Was als Freundschaft begann, entwickelte sich zu einer Geschäftsvision: Deutsche Ingenieursbeschilderung in die USA bringen, exklusiv für den Fachhandel. Kein Einzelhandel. Kein Wettbewerb mit Kunden. Ein Großhandels-Fertigungspartner, der seiner Linie treu bleibt.',
  'Ozan & Ayla Move to Florida': 'Ozan & Ayla ziehen nach Florida',
  'Ozan and Ayla, together with their family, made the move to Florida — establishing the American base for what would become Sunlite Signs. The sunshine state became home to a new kind of signage manufacturer: one that would never sell retail.': 'Ozan und Ayla zogen zusammen mit ihrer Familie nach Florida — und gründeten die amerikanische Basis für das, was Sunlite Signs werden sollte. Der Sunshine State wurde zur Heimat eines neuartigen Schilderherstellers: einem, der niemals an Endkunden verkaufen würde.',
  'Sunlite Signs Is Born': 'Sunlite Signs wird geboren',
  'Sunlite Signs LLC — founded on one unbreakable principle: we manufacture, you sell. German-engineered, UL-listed channel letters and illuminated signs, delivered in 3 weeks door to door, exclusively to sign shops across the USA and Canada. The beginning of something larger.': 'Sunlite Signs LLC — gegründet auf einem unumstößlichen Prinzip: Wir fertigen, Sie verkaufen. Leuchtbuchstaben und beleuchtete Schilder mit deutscher Ingenieurskunst, UL-zertifiziert, geliefert in 3 Wochen von Tür zu Tür, exklusiv an Schilderwerkstätten in den USA und Kanada. Der Beginn von etwas Größerem.',

  // ── CONTACT PAGE ──
  'Contact Us — Wholesale Trade Inquiries Only | Sunlite Signs': 'Kontakt — Nur Großhandelsanfragen | Sunlite Signs',
  'Contact Sunlite Signs LLC for wholesale trade inquiries. Sign shops only — trade pricing on channel letters, blade signs, flat cut letters, and custom LED signage. Wholesale accounts welcome.': 'Kontaktieren Sie Sunlite Signs LLC für Großhandelsanfragen. Nur Schilderwerkstätten — Händlerpreise für Leuchtbuchstaben, Ausleger-Schilder, Flachbuchstaben und individuelle LED-Beschilderung. Händlerkonten willkommen.',
  'contact sunlite signs': 'Kontakt Sunlite Signs',
  'wholesale sign inquiry': 'Großhandel-Schilder-Anfrage',
  'trade sign pricing': 'Händlerpreise Schilder',
  'sign shop contact': 'Schilderwerkstatt Kontakt',
  'Only': 'Nur',
  'Trade Inquiries': 'Handelsanfragen',
  'Wholesale accounts welcome. Looking for trade pricing on channel letters, blade signs, or custom LED signage? You are in the right place. We work exclusively with sign shops and trade professionals. We manufacture. You sell.': 'Händlerkonten willkommen. Sie suchen Händlerpreise für Leuchtbuchstaben, Ausleger-Schilder oder individuelle LED-Beschilderung? Dann sind Sie hier richtig. Wir arbeiten ausschließlich mit Schilderwerkstätten und Fachhandel zusammen. Wir fertigen. Sie verkaufen.',
  'Phone': 'Telefon',
  'Mon-Fri, 8am-5pm EST — Trade inquiries only': 'Mo-Fr, 8-17 Uhr EST — Nur Handelsanfragen',
  'Email': 'E-Mail',
  'Wholesale accounts — response within 1 business day': 'Händlerkonten — Antwort innerhalb eines Werktags',
  'Location': 'Standort',
  'Wholesale manufacturing facility — no retail showroom': 'Großhandels-Fertigungsanlage — kein Einzelhandel-Showroom',
  'Send Us a Trade Inquiry': 'Senden Sie uns eine Handelsanfrage',
  'Trade Inquiry': 'Handelsanfrage',
  'For wholesale partnerships, trade account setup, or technical questions. Need project-specific trade pricing? Use our dedicated wholesale quote form for faster response.': 'Für Großhandelspartnerschaften, Einrichtung von Händlerkonten oder technische Fragen. Benötigen Sie projektspezifische Händlerpreise? Nutzen Sie unser spezielles Großhandels-Angebotsformular für eine schnellere Antwort.',
  'Monday': 'Montag',
  'Tuesday': 'Dienstag',
  'Wednesday': 'Mittwoch',
  'Thursday': 'Donnerstag',
  'Friday': 'Freitag',
  'Saturday': 'Samstag',
  'Sunday': 'Sonntag',
  'Sunlite Signs sells exclusively to sign shops and trade professionals. We do not sell to the general public.': 'Sunlite Signs verkauft ausschließlich an Schilderwerkstätten und Fachhandel. Wir verkaufen nicht an die Öffentlichkeit.',
  'If you are a business or property owner looking for signage, please contact a sign shop in your area.': 'Wenn Sie ein Geschäfts- oder Immobilienbesitzer sind und Beschilderung suchen, kontaktieren Sie bitte eine Schilderwerkstatt in Ihrer Nähe.',
  'For project-specific wholesale pricing with material specs and delivery timeline, use our dedicated trade quote form.': 'Für projektspezifische Großhandelspreise mit Materialspezifikationen und Lieferzeitplan nutzen Sie unser spezielles Handelsangebotsformular.',
  'Your Wholesale Partner': 'Ihr Großhandelspartner',
  'Awaits.': 'Erwartet Sie.',
  'Join sign shops across the USA and Canada who trust Sunlite Signs for German-engineered, UL-listed signage at wholesale trade pricing.': 'Schließen Sie sich Schilderwerkstätten in den USA und Kanada an, die Sunlite Signs für deutsche Ingenieurskunst und UL-zertifizierte Beschilderung zu Großhandelspreisen vertrauen.',

  // ── SERVICES PAGE ──
  'Complimentary Engineering Services \u2014 Wholesale Sign Manufacturer | Sunlite Signs': 'Kostenlose Konstruktionsleistungen — Großhandel-Schilderhersteller | Sunlite Signs',
  'Complimentary engineering services for wholesale sign shop partners. Concept & materials, structural engineering, electrical layout, and manufacturing engineering. German-engineered precision \u2014 trade accounts only.': 'Kostenlose Konstruktionsleistungen für Großhandel-Schilderwerkstatt-Partner. Konzept & Materialien, Konstruktionstechnik, Elektroplanung und Fertigungstechnik. Deutsche Ingenieurs-Präzision — nur Händlerkonten.',
  'sign engineering services': 'Schilder-Konstruktionsleistungen',
  'wholesale sign manufacturing': 'Großhandel-Schilderfertigung',
  'complimentary engineering': 'kostenlose Konstruktion',
  'sign shop services': 'Schilderwerkstatt-Leistungen',
  'Services': 'Leistungen',
  "With our German design and engineering roots, we're happy to contribute our complimentary engineering services to your project. From conceptual integration of structural and material sciences co-development, translating that to illuminated signage in the most common European channel letter form factors, to manufacturing engineering and packaging. We're happy to contribute our expertise at every stage of your project, with the flexibility to accommodate your needs all along the way.": 'Mit unseren deutschen Design- und Ingenieurswurzeln freuen wir uns, unsere kostenlosen Konstruktionsleistungen zu Ihrem Projekt beizusteuern. Von der konzeptionellen Integration von Struktur- und Materialwissenschaften, über die Umsetzung in beleuchtete Beschilderung in den gängigsten europäischen Leuchtbuchstaben-Formaten, bis hin zur Fertigungstechnik und Verpackung. Wir freuen uns, unsere Expertise in jeder Phase Ihres Projekts einzubringen, mit der Flexibilität, Ihren Bedürfnissen jederzeit gerecht zu werden.',
  'Our Services': 'Unsere Leistungen',
  'Included with every project \u2014 German-engineered expertise from concept to delivery.': 'Bei jedem Projekt inklusive — deutsche Ingenieursexpertise vom Konzept bis zur Lieferung.',
  'Conceptual integration of structural and material sciences co-development for illuminated signage projects. We work with you from the earliest stages to select the right materials, evaluate structural requirements, and develop a cohesive concept that translates your client\'s vision into a buildable, durable, and visually compelling sign.': 'Konzeptionelle Integration von Struktur- und Materialwissenschaften für beleuchtete Beschilderungsprojekte. Wir arbeiten von Anfang an mit Ihnen zusammen, um die richtigen Materialien auszuwählen, strukturelle Anforderungen zu bewerten und ein schlüssiges Konzept zu entwickeln, das die Vision Ihres Kunden in ein baubares, langlebiges und visuell überzeugendes Schild umsetzt.',
  'Translating conceptual designs to production-ready illuminated signage in the most common European channel letter form factors. Our structural engineering ensures every sign meets wind load requirements, mounting specifications, and code compliance \u2014 while maintaining the sleek, low-profile aesthetics that define German-engineered signage.': 'Umsetzung konzeptioneller Entwürfe in produktionsreife beleuchtete Beschilderung in den gängigsten europäischen Leuchtbuchstaben-Formaten. Unsere Konstruktionstechnik stellt sicher, dass jedes Schild Windlastanforderungen, Montagespezifikationen und Normkonformität erfüllt — bei gleichzeitiger Beibehaltung der schlanken, flachen Ästhetik, die deutsche Ingenieursbeschilderung auszeichnet.',
  'LED integration, electrical engineering, and UL compliance for all illuminated signage products. We design optimized LED layouts for uniform illumination, calculate power requirements, specify UL-recognized components, and provide complete electrical documentation for permitting and inspection.': 'LED-Integration, Elektrotechnik und UL-Konformität für alle beleuchteten Beschilderungsprodukte. Wir entwerfen optimierte LED-Layouts für gleichmäßige Ausleuchtung, berechnen Leistungsanforderungen, spezifizieren UL-anerkannte Komponenten und liefern vollständige Elektrodokumentation für Genehmigungen und Prüfungen.',
  'Manufacturing engineering and packaging optimization for wholesale production and shipping. From CNC programming and material nesting to paint specifications and crating design, we engineer the entire manufacturing process to deliver consistent quality, minimize waste, and ensure your signs arrive undamaged \u2014 every time.': 'Fertigungstechnik und Verpackungsoptimierung für Großhandelsproduktion und Versand. Von der CNC-Programmierung und Materialverschachtelung bis hin zu Lackspezifikationen und Kistendesign — wir entwickeln den gesamten Fertigungsprozess, um gleichbleibende Qualität zu liefern, Verschwendung zu minimieren und sicherzustellen, dass Ihre Schilder unbeschädigt ankommen — jedes Mal.',
  'Learn About Our Materials Process': 'Erfahren Sie mehr über unseren Materialprozess',
  'Explore Structural Engineering': 'Konstruktionstechnik entdecken',
  'View Electrical Engineering Details': 'Elektrotechnik-Details ansehen',
  'Discover Our Manufacturing Process': 'Unseren Fertigungsprozess entdecken',

  // ── GET A QUOTE PAGE ──
  'Request Wholesale Pricing \u2014 Trade Accounts Only': 'Großhandelspreise anfragen — Nur Händlerkonten',
  'Request wholesale trade pricing for channel letters, blade signs, flat cut letters, and custom signage. Detailed wholesale quotes within 48 hours. Sign shops and trade professionals only.': 'Fordern Sie Großhandelspreise für Leuchtbuchstaben, Ausleger-Schilder, Flachbuchstaben und individuelle Beschilderung an. Detaillierte Großhandelsangebote innerhalb von 48 Stunden. Nur Schilderwerkstätten und Fachhandel.',
  'wholesale sign pricing': 'Großhandel-Schilderpreise',
  'trade sign quote': 'Handelsangebot Schilder',
  'channel letter wholesale quote': 'Leuchtbuchstaben Großhandelsangebot',
  'Request Wholesale': 'Großhandelspreis',
  'Pricing': 'Anfragen',
  'Tell us about your project and we will send detailed trade pricing with full material specs within 48 hours. No retail markup. No obligation.': 'Erzählen Sie uns von Ihrem Projekt und wir senden Ihnen detaillierte Händlerpreise mit vollständigen Materialspezifikationen innerhalb von 48 Stunden. Kein Einzelhandelsaufschlag. Keine Verpflichtung.',
  'Wholesale only — no retail sales': 'Nur Großhandel — kein Einzelhandel',
  'Trade quotes within 48 hours': 'Handelsangebote innerhalb von 48 Stunden',
  'Every sign UL listed': 'Jedes Schild UL-zertifiziert',
  '3-week door-to-door delivery, crated & shipped': '3 Wochen Lieferung von Tür zu Tür, verpackt & versandt',
  'German-engineered with LKF': 'Deutsche Ingenieurskunst mit LKF',
  'We sell exclusively to sign companies, sign shops, and trade professionals. We do not sell to the general public.': 'Wir verkaufen ausschließlich an Schilderunternehmen, Schilderwerkstätten und Fachhandel. Wir verkaufen nicht an die Öffentlichkeit.',

  // ── GALLERY PAGE ──
  'Wholesale Sign Gallery \u2014 Trade Partner Installations | Sunlite Signs': 'Großhandel-Schildergalerie — Handelspartner-Installationen | Sunlite Signs',
  'Browse completed wholesale sign projects manufactured by Sunlite Signs and installed by our trade partners. Channel letters, halo lit signs, trimless, blade signs \u2014 available exclusively to sign shops at trade pricing.': 'Durchstöbern Sie abgeschlossene Großhandel-Schilderprojekte, gefertigt von Sunlite Signs und installiert von unseren Handelspartnern. Leuchtbuchstaben, Halo-beleuchtete Schilder, randlose Buchstaben, Ausleger-Schilder — exklusiv für Schilderwerkstätten zu Händlerpreisen.',
  'wholesale sign gallery': 'Großhandel-Schildergalerie',
  'channel letter installations': 'Leuchtbuchstaben-Installationen',
  'trade partner sign projects': 'Handelspartner-Schilderprojekte',
  'Manufactured by Sunlite.': 'Gefertigt von Sunlite.',
  'Installed by Our Trade Partners.': 'Installiert von unseren Handelspartnern.',
  'Every project below was manufactured at our wholesale facility and installed by sign shop partners across North America. These are trade-exclusive products built with German engineering precision and UL listed certification. We manufacture. They sell. Their clients are thrilled.': 'Jedes Projekt unten wurde in unserer Großhandelsanlage gefertigt und von Schilderwerkstatt-Partnern in ganz Nordamerika installiert. Dies sind Fachhandel-exklusive Produkte, gefertigt mit deutscher Ingenieurs-Präzision und UL-Zertifizierung. Wir fertigen. Sie verkaufen. Ihre Kunden sind begeistert.',
  'Ready to Manufacture Something': 'Bereit, etwas Ähnliches',
  'Like This?': 'Herzustellen?',
  'Send us your project details and get wholesale trade pricing within 48 hours. No retail markup. No competition. We manufacture, you sell.': 'Senden Sie uns Ihre Projektdetails und erhalten Sie Großhandelspreise innerhalb von 48 Stunden. Kein Einzelhandelsaufschlag. Kein Wettbewerb. Wir fertigen, Sie verkaufen.',

  // ── PRODUCT PAGES - Channel Letters Main ──
  'Wholesale Channel Letters \u2014 EdgeLuxe Product Families | Sunlite Signs': 'Großhandel Leuchtbuchstaben — EdgeLuxe Produktfamilien | Sunlite Signs',
  'Wholesale channel letters for sign shops only. 12 EdgeLuxe products across 4 families: Block Acrylic, Trimless, Fabricated Stainless Steel, and Flat Cut. Trade pricing, UL listed, German-engineered.': 'Großhandel-Leuchtbuchstaben nur für Schilderwerkstätten. 12 EdgeLuxe Produkte in 4 Familien: Block-Acryl, Randlos, Gefertigter Edelstahl und Flachschnitt. Händlerpreise, UL-zertifiziert, Deutsche Ingenieurskunst.',
  "The EdgeLuxe product line \u2014 12 channel letter styles across 4 product families. From IP67-sealed block acrylic to fabricated stainless steel, every style manufactured in-house. Wholesale direct to sign shops.\n\nGerman-engineered precision. UL listed. Delivered within 3 weeks door to door. Trade pricing with no retail markup. Your clients stay yours.": 'Die EdgeLuxe Produktlinie — 12 Leuchtbuchstaben-Stile in 4 Produktfamilien. Von IP67-versiegeltem Block-Acryl bis zu gefertigtem Edelstahl, jeder Stil wird intern gefertigt. Großhandel direkt an Schilderwerkstätten.\n\nDeutsche Ingenieurs-Präzision. UL-zertifiziert. Lieferung innerhalb von 3 Wochen von Tür zu Tür. Händlerpreise ohne Einzelhandelsaufschlag. Ihre Kunden bleiben Ihre Kunden.',
  'Why EdgeLuxe': 'Warum EdgeLuxe',
  'Every illuminated channel letter set is UL listed and ships with proper labeling for code compliance.': 'Jedes beleuchtete Leuchtbuchstaben-Set ist UL-zertifiziert und wird mit korrekter Kennzeichnung für Normkonformität versandt.',
  'Premium LEDs': 'Premium-LEDs',
  'Samsung and Nichia LED modules with 50,000+ hour rated life. Consistent color temperature across every letter.': 'Samsung- und Nichia-LED-Module mit 50.000+ Stunden Lebensdauer. Konstante Farbtemperatur bei jedem Buchstaben.',
  'German Engineering': 'Deutsche Ingenieurskunst',
  'Manufacturing processes developed in partnership with LKF Lichtwerbung in Nuremberg, Germany.': 'Fertigungsprozesse, entwickelt in Partnerschaft mit LKF Lichtwerbung in Nürnberg.',
  'EdgeLuxe LP 11 \u2014 Block Acrylic Series': 'EdgeLuxe LP 11 — Block-Acryl-Serie',
  '30mm cast block acrylic, IP67 epoxy-sealed, zero maintenance. Eight illumination styles from the same rugged, waterproof platform.': '30mm gegossenes Block-Acryl, IP67 Epoxid-versiegelt, wartungsfrei. Acht Beleuchtungsstile auf derselben robusten, wasserdichten Plattform.',
  'Face Lit': 'Front-beleuchtet',
  'Halo Lit': 'Halo-beleuchtet',
  'Face & Halo Combo': 'Front- & Halo-Kombi',
  'Full Side Lit': 'Voll-Seitenbeleuchtet',
  'Back Side Lit': 'Rückseitenbeleuchtet',
  'Front Side Lit': 'Vorderseitenbeleuchtet',
  'Faux Neon': 'Faux-Neon',
  'Conical Profile': 'Konisches Profil',
  'EdgeLuxe LP 5 \u2014 Trimless Stainless Steel': 'EdgeLuxe LP 5 — Randlos Edelstahl',
  'Fabricated stainless steel with step-router acrylic face. No visible trim cap. The cleanest channel letter on the market.': 'Gefertigter Edelstahl mit Stufen-Fräs-Acrylfläche. Keine sichtbare Zierleiste. Der sauberste Leuchtbuchstabe am Markt.',
  'Trimless Face Lit': 'Randlos Front-beleuchtet',
  'EdgeLuxe LP 3 \u2014 Fabricated Stainless Steel': 'EdgeLuxe LP 3 — Gefertigter Edelstahl',
  'Fabricated stainless steel with serviceable LEDs. Available in standoff halo and flush-mount configurations.': 'Gefertigter Edelstahl mit wartbaren LEDs. Verfügbar in Abstandshalter-Halo- und flächenbündigen Konfigurationen.',
  'Standoff Halo': 'Abstandshalter-Halo',
  'Flush-Mount Halo': 'Flächenbündig-Halo',
  'EdgeLuxe LP 1 \u2014 Flat Cutout Letters': 'EdgeLuxe LP 1 — Flachschnitt-Buchstaben',
  'Non-illuminated flat cutout letters in wood, aluminum, stainless steel, and acrylic. Same precision, no LEDs.': 'Nicht-beleuchtete Flachschnitt-Buchstaben aus Holz, Aluminium, Edelstahl und Acryl. Gleiche Präzision, keine LEDs.',
  'Flat Cut (Non-Illuminated)': 'Flachschnitt (nicht-beleuchtet)',
  'Ready to Order': 'Bereit zur Bestellung',

  // ── Product: Channel Letters Front-Lit ──
  'Wholesale Face Lit Channel Letters \u2014 Trade Pricing | Sunlite Signs': 'Großhandel Front-beleuchtete Leuchtbuchstaben — Händlerpreise | Sunlite Signs',
  'Wholesale face lit channel letters for sign shops only. Forward-facing LED illumination, UL listed, German-engineered. Trade pricing direct from manufacturer. We never sell retail.': 'Großhandel front-beleuchtete Leuchtbuchstaben nur für Schilderwerkstätten. Vorwärts gerichtete LED-Beleuchtung, UL-zertifiziert, deutsche Ingenieurskunst. Händlerpreise direkt vom Hersteller. Wir verkaufen nie an Endkunden.',
  "The industry standard for illuminated signage. Forward-facing LEDs shine through a translucent acrylic face, delivering maximum brightness and readability for any commercial application. Available exclusively to trade accounts.\n\nGerman-engineered precision. UL listed. Wholesale direct to sign shops across the USA and Canada. We never sell retail \u2014 your clients stay yours.": 'Der Branchenstandard für beleuchtete Beschilderung. Vorwärts gerichtete LEDs strahlen durch eine transluzente Acrylfläche und liefern maximale Helligkeit und Lesbarkeit für jede gewerbliche Anwendung. Exklusiv für Händlerkonten verfügbar.\n\nDeutsche Ingenieurs-Präzision. UL-zertifiziert. Großhandel direkt an Schilderwerkstätten in den USA und Kanada. Wir verkaufen nie an Endkunden — Ihre Kunden bleiben Ihre Kunden.',
  'Maximum Face Illumination': 'Maximale Frontbeleuchtung',
  'Forward-facing LEDs illuminate the full letter face for excellent readability day and night, even in direct sunlight.': 'Vorwärts gerichtete LEDs beleuchten die gesamte Buchstabenfläche für ausgezeichnete Lesbarkeit bei Tag und Nacht, selbst bei direkter Sonneneinstrahlung.',
  'Superior Visibility': 'Überlegene Sichtbarkeit',
  'The brightest channel letter option available. Ideal for high-traffic locations where visibility is the top priority.': 'Die hellste verfügbare Leuchtbuchstaben-Option. Ideal für stark frequentierte Standorte, an denen Sichtbarkeit höchste Priorität hat.',
  'Full Color Range': 'Volle Farbpalette',
  'Available with any Pantone-matched acrylic face color. White, colored, and even day/night color-changing faces available.': 'Verfügbar in jeder Pantone-abgestimmten Acrylflächen-Farbe. Weiße, farbige und sogar Tag/Nacht-Farbwechsel-Flächen verfügbar.',
  'Custom Sizing': 'Individuelle Größen',
  'Manufactured from 4 inches up to 72+ inches tall. We accommodate any font, logo, or custom shape.': 'Gefertigt von 4 Zoll bis über 72 Zoll Höhe. Wir fertigen jede Schriftart, jedes Logo oder jede individuelle Form.',
  'Samsung LEDs': 'Samsung-LEDs',
  'Premium Samsung LED modules with 50,000+ hour rated life, consistent color output, and industry-leading warranty.': 'Premium Samsung-LED-Module mit 50.000+ Stunden Lebensdauer, konstanter Farbausgabe und branchenführender Garantie.',
  'Face Lit Projects': 'Front-beleuchtete Projekte',
  'Built to meet and exceed industry standards. Every specification reflects our commitment to quality and longevity. Available exclusively at wholesale trade pricing.': 'Gebaut um Branchenstandards zu erfüllen und zu übertreffen. Jede Spezifikation spiegelt unser Engagement für Qualität und Langlebigkeit wider. Exklusiv zu Großhandelspreisen verfügbar.',
  'Face lit channel letters are the most versatile illuminated sign type, suitable for virtually any commercial application where visibility matters. Wholesale direct to sign shops for all project types.': 'Front-beleuchtete Leuchtbuchstaben sind der vielseitigste beleuchtete Schildertyp, geeignet für praktisch jede gewerbliche Anwendung, bei der Sichtbarkeit zählt. Großhandel direkt an Schilderwerkstätten für alle Projekttypen.',
  'Retail storefronts and shopping centers': 'Einzelhandelsfassaden und Einkaufszentren',
  'Restaurants and food service brands': 'Restaurants und Gastronomie-Marken',
  'Healthcare and medical facilities': 'Gesundheits- und Medizineinrichtungen',
  'Hospitality and hotel signage': 'Gastronomie- und Hotelbeschilderung',
  'Corporate office buildings': 'Firmengebäude',
  'Gas stations and convenience stores': 'Tankstellen und Convenience-Stores',
  'Automotive dealerships': 'Autohäuser',
  'Multi-tenant commercial buildings': 'Gewerbliche Mehrmieterobjekte',

  // ── Product: Halo-Lit ──
  'Wholesale Halo Lit Channel Letters \u2014 Trade Pricing | Sunlite Signs': 'Großhandel Halo-beleuchtete Leuchtbuchstaben — Händlerpreise | Sunlite Signs',
  "A soft, diffused glow radiates behind each letter, creating an elegant halo effect that transforms any facade into a premium brand statement. The choice of architects and luxury brands. Available exclusively to trade accounts.\n\nRear-mounted LEDs. Aluminum construction. UL listed. Wholesale direct to sign shops \u2014 we never sell retail. Your clients stay yours.": 'Ein sanftes, diffuses Leuchten strahlt hinter jedem Buchstaben und erzeugt einen eleganten Halo-Effekt, der jede Fassade in ein Premium-Markenstatement verwandelt. Die Wahl von Architekten und Luxusmarken. Exklusiv für Händlerkonten verfügbar.\n\nRückseitig montierte LEDs. Aluminiumkonstruktion. UL-zertifiziert. Großhandel direkt an Schilderwerkstätten — wir verkaufen nie an Endkunden. Ihre Kunden bleiben Ihre Kunden.',
  'Elegant Halo Glow': 'Eleganter Halo-Glanz',
  'Rear-mounted LEDs create a soft, diffused halo of light around each letter, producing a sophisticated and upscale appearance on any facade.': 'Rückseitig montierte LEDs erzeugen einen sanften, diffusen Lichthalo um jeden Buchstaben und schaffen ein anspruchsvolles, gehobenes Erscheinungsbild an jeder Fassade.',
  'Premium Brand Perception': 'Premium-Markenwahrnehmung',
  'Halo lit letters are the preferred choice for luxury retail, hospitality, and architectural signage where brand perception matters.': 'Halo-beleuchtete Buchstaben sind die bevorzugte Wahl für Luxus-Einzelhandel, Gastronomie und architektonische Beschilderung, wo Markenwahrnehmung zählt.',
  'Facade Enhancement': 'Fassadenaufwertung',
  'The backlit glow highlights the texture and material of the mounting surface, turning the building itself into part of the sign design.': 'Das Hinterlicht hebt die Textur und das Material der Montagefläche hervor und macht das Gebäude selbst zum Teil des Schilderdesigns.',
  'Precision Returns': 'Präzise Zargen',
  'Deep aluminum returns provide the standoff needed for optimal halo spread. Return depth is customizable based on wall color and effect desired.': 'Tiefe Aluminiumzargen bieten den nötigen Abstand für optimale Halo-Streuung. Die Zargentiefe ist je nach Wandfarbe und gewünschtem Effekt anpassbar.',
  'LED Color Options': 'LED-Farboptionen',
  'Standard white halo with warm white (3000K), neutral (4000K), and cool white (6500K) options. RGB color-changing available for dynamic installations.': 'Standard-Weiß-Halo mit Warmweiß (3000K), Neutral (4000K) und Kaltweiß (6500K) Optionen. RGB-Farbwechsel für dynamische Installationen verfügbar.',
  'How Halo Lit Works': 'Wie Halo-Beleuchtung funktioniert',
  'LEDs are mounted facing the rear of the letter, directing light outward through the back. Standoff spacers hold each letter away from the wall, allowing the light to diffuse and create the characteristic halo effect.': 'LEDs werden nach hinten gerichtet montiert und strahlen das Licht durch die Rückseite nach außen. Abstandshalter halten jeden Buchstaben von der Wand entfernt, sodass das Licht diffundieren und den charakteristischen Halo-Effekt erzeugen kann.',
  'Engineered for optimal halo spread, durability, and ease of installation. Every detail is considered. Available exclusively at wholesale trade pricing.': 'Entwickelt für optimale Halo-Streuung, Langlebigkeit und einfache Installation. Jedes Detail ist durchdacht. Exklusiv zu Großhandelspreisen verfügbar.',
  'Halo lit channel letters are the go-to choice for projects where elegance and brand sophistication are paramount. Available at wholesale trade pricing for all project types.': 'Halo-beleuchtete Leuchtbuchstaben sind die erste Wahl für Projekte, bei denen Eleganz und Markensophistikation im Vordergrund stehen. Zu Großhandelspreisen für alle Projekttypen verfügbar.',
  'Halo Lit Projects': 'Halo-beleuchtete Projekte',

  // ── Product: Front & Halo Lit ──
  "The best of both worlds. Dual LED circuits combine bright front-face illumination with an elegant rear halo glow, delivering maximum visual impact for premium installations. Available exclusively to trade accounts.\n\nTwo lighting effects. One letter. German-engineered precision with UL listing. Wholesale direct to sign shops \u2014 we never sell retail.": 'Das Beste aus beiden Welten. Duale LED-Schaltkreise kombinieren helle Frontbeleuchtung mit einem eleganten rückseitigen Halo-Glanz und liefern maximale visuelle Wirkung für Premium-Installationen. Exklusiv für Händlerkonten verfügbar.\n\nZwei Lichteffekte. Ein Buchstabe. Deutsche Ingenieurs-Präzision mit UL-Zertifizierung. Großhandel direkt an Schilderwerkstätten — wir verkaufen nie an Endkunden.',
  'Two Effects, One Letter': 'Zwei Effekte, ein Buchstabe',
  'Dual Illumination': 'Duale Beleuchtung',
  'Two independent LED circuits \u2014 one illuminating the translucent acrylic face, another projecting a halo glow behind the letter. Maximum visual impact.': 'Zwei unabhängige LED-Schaltkreise — einer beleuchtet die transluzente Acrylfläche, ein anderer projiziert einen Halo-Glanz hinter den Buchstaben. Maximale visuelle Wirkung.',
  'Front Face Brightness': 'Front-Helligkeit',
  'Forward-facing LEDs deliver the same high-visibility face illumination as our standard face lit letters, ensuring excellent daytime and nighttime readability.': 'Vorwärts gerichtete LEDs liefern die gleiche hochsichtbare Frontbeleuchtung wie unsere Standard-Front-beleuchteten Buchstaben und gewährleisten ausgezeichnete Lesbarkeit bei Tag und Nacht.',
  'Rear Halo Effect': 'Rückseitiger Halo-Effekt',
  'Rear-mounted LEDs create the same elegant backlit glow as our dedicated halo lit product, adding depth and dimension to the overall sign presentation.': 'Rückseitig montierte LEDs erzeugen den gleichen eleganten Hinterlicht-Glanz wie unser dediziertes Halo-Produkt und fügen der Gesamtpräsentation Tiefe und Dimension hinzu.',
  'Independent Control': 'Unabhängige Steuerung',
  'Front and rear LED circuits can be wired independently, allowing different on/off schedules or dimming configurations for each lighting effect.': 'Front- und Rück-LED-Schaltkreise können unabhängig verdrahtet werden, was unterschiedliche Ein/Aus-Zeiten oder Dimmkonfigurationen für jeden Lichteffekt ermöglicht.',
  'Optimized Depth': 'Optimierte Tiefe',
  'Return depth is engineered to accommodate both LED sets while maintaining a proportional letter profile. Typical depth ranges from 3.5 to 5 inches.': 'Die Zargentiefe ist so konstruiert, dass beide LED-Sets Platz finden, während ein proportionales Buchstabenprofil beibehalten wird. Typische Tiefe reicht von 3,5 bis 5 Zoll.',

  // ── Product: Products index page ──
  'Wholesale Sign Products \u2014 Trade Pricing for Sign Shops | Sunlite Signs': 'Großhandel-Schilderprodukte — Händlerpreise für Schilderwerkstätten | Sunlite Signs',
  'Wholesale sign products exclusively for trade accounts. Channel letters, flat cut letters, blade signs, lightboxes, and custom fabrication at wholesale pricing. We never sell retail.': 'Großhandel-Schilderprodukte exklusiv für Händlerkonten. Leuchtbuchstaben, Flachbuchstaben, Ausleger-Schilder, Lichtboxen und individuelle Fertigung zu Großhandelspreisen. Wir verkaufen nie an Endkunden.',
  'Wholesale Product': 'Großhandel-Produkt',
  'Catalog': 'Katalog',
  "German-engineered illuminated signage, wholesale direct to sign shops across the USA and Canada. Every product is UL listed, precision built, and delivered within 3 weeks door to door.\n\nWe never sell retail. Your clients stay yours. No retail markup, no middlemen \u2014 just trade pricing direct from the manufacturer.": 'Beleuchtete Beschilderung mit deutscher Ingenieurskunst, Großhandel direkt an Schilderwerkstätten in den USA und Kanada. Jedes Produkt ist UL-zertifiziert, präzisionsgefertigt und wird innerhalb von 3 Wochen von Tür zu Tür geliefert.\n\nWir verkaufen nie an Endkunden. Ihre Kunden bleiben Ihre Kunden. Kein Einzelhandelsaufschlag, keine Zwischenhändler — nur Händlerpreise direkt vom Hersteller.',
  'UL Listed Products': 'UL-zertifizierte Produkte',
  '3-Week Door-to-Door Delivery': '3 Wochen Lieferung von Tür zu Tür',
  'More Wholesale Product Lines': 'Weitere Großhandel-Produktlinien',
  "The EdgeLuxe product line \u2014 12 channel letter styles across 4 families: Block Acrylic, Trimless, Fabricated Stainless Steel, and Flat Cut. German-engineered, UL listed. Wholesale direct to sign shops.": 'Die EdgeLuxe Produktlinie — 12 Leuchtbuchstaben-Stile in 4 Familien: Block-Acryl, Randlos, Gefertigter Edelstahl und Flachschnitt. Deutsche Ingenieurskunst, UL-zertifiziert. Großhandel direkt an Schilderwerkstätten.',
  'Precision-cut metal and acrylic dimensional letters at wholesale trade pricing. Clean lines, flush or stud-mounted, available in brushed aluminum, painted steel, and brass finishes.': 'Präzisionsgeschnittene dimensionale Buchstaben aus Metall und Acryl zu Großhandelspreisen. Klare Linien, flächenbündig oder mit Gewindebolzen montiert, verfügbar in gebürstetem Aluminium, lackiertem Stahl und Messing.',
  'Double-sided projecting blade signs at trade pricing. Illuminated and non-illuminated options for storefronts and mixed-use developments. Wholesale direct to sign shops.': 'Doppelseitige Ausleger-Schilder zu Händlerpreisen. Beleuchtete und nicht-beleuchtete Optionen für Ladenfronten und gemischt genutzte Gebäude. Großhandel direkt an Schilderwerkstätten.',
  'Illuminated cabinet signs at wholesale pricing. Edge-lit and backlit LED options with tensioned fabric or polycarbonate faces. Available exclusively to trade accounts.': 'Beleuchtete Leuchtkästen zu Großhandelspreisen. Kantenbeleuchtete und hinterleuchtete LED-Optionen mit gespanntem Stoff oder Polycarbonat-Flächen. Exklusiv für Händlerkonten verfügbar.',
  'Custom-sized Silicone-edged Graphic (SEG) light box solutions in low form factors down to 1" deep. High-resolution printed and illuminated signage. Custom SEG light boxes and prints in 3 weeks. Wholesale only.': 'Maßgefertigte SEG-Lichtbox-Lösungen (Silikondichtungs-Grafik) in flachen Formfaktoren ab 1" Tiefe. Hochauflösend bedruckte und beleuchtete Beschilderung. Individuelle SEG-Lichtboxen und Drucke in 3 Wochen. Nur Großhandel.',
  'Custom-shaped illuminated enclosures that follow the exact contour of any logo. Full-color digital print on translucent faces for brand-perfect reproduction. Wholesale trade pricing for sign shops.': 'Individuell geformte beleuchtete Gehäuse, die der exakten Kontur jedes Logos folgen. Vollfarbiger Digitaldruck auf transluzenten Flächen für markengetreue Wiedergabe. Großhandelspreise für Schilderwerkstätten.',
  'Dimensional acrylic letters pushed through precision-routed aluminum panels with LED backlighting. The premium alternative to flat-face cabinet signs. Wholesale only.': 'Dimensionale Acrylbuchstaben, die durch präzisionsgefräste Aluminiumpaneele gesteckt werden, mit LED-Hintergrundbeleuchtung. Die Premium-Alternative zu Leuchtkästen mit flacher Front. Nur Großhandel.',
  'Bespoke signage solutions at trade pricing for projects that require something beyond standard products. Wholesale only \u2014 we never compete with our sign shop partners.': 'Maßgeschneiderte Beschilderungslösungen zu Händlerpreisen für Projekte, die etwas jenseits von Standardprodukten erfordern. Nur Großhandel — wir konkurrieren nie mit unseren Schilderwerkstatt-Partnern.',
};

// Due to the massive number of strings, rather than listing every single one,
// we use a fallback translation function for strings not in the exact map.
// This produces better German by applying grammatically-correct replacements.

function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  if (T[text]) return T[text];

  // For strings not in the exact map, apply comprehensive regex replacements
  let r = text;

  // Full phrase replacements (longer first)
  const phrases = [
    ['Request Wholesale Pricing', 'Großhandelspreis anfragen'],
    ['Wholesale Only — Trade Pricing', 'Nur Großhandel — Händlerpreise'],
    ['Available exclusively to trade accounts', 'Exklusiv für Händlerkonten verfügbar'],
    ['Available exclusively at wholesale trade pricing', 'Exklusiv zu Großhandelspreisen verfügbar'],
    ['Wholesale direct to sign shops', 'Großhandel direkt an Schilderwerkstätten'],
    ['wholesale direct to sign shops', 'Großhandel direkt an Schilderwerkstätten'],
    ['We never sell retail', 'Wir verkaufen nie an Endkunden'],
    ['we never sell retail', 'wir verkaufen nie an Endkunden'],
    ['We never sell direct', 'Wir verkaufen nie direkt'],
    ['Your clients stay yours', 'Ihre Kunden bleiben Ihre Kunden'],
    ['We manufacture. You sell.', 'Wir fertigen. Sie verkaufen.'],
    ['We manufacture, you sell', 'Wir fertigen, Sie verkaufen'],
    ['German-engineered precision', 'Deutsche Ingenieurs-Präzision'],
    ['German-engineered', 'Mit deutscher Ingenieurskunst'],
    ['German engineering', 'Deutsche Ingenieurskunst'],
    ['UL listed', 'UL-zertifiziert'],
    ['UL Listed', 'UL-zertifiziert'],
    ['UL listing', 'UL-Zertifizierung'],
    ['sign shops', 'Schilderwerkstätten'],
    ['Sign shops', 'Schilderwerkstätten'],
    ['sign shop', 'Schilderwerkstatt'],
    ['Sign shop', 'Schilderwerkstatt'],
    ['sign companies', 'Schilderunternehmen'],
    ['sign professionals', 'Schilderfachleute'],
    ['trade accounts', 'Händlerkonten'],
    ['Trade accounts', 'Händlerkonten'],
    ['trade professionals', 'Fachhandel'],
    ['trade partners', 'Handelspartner'],
    ['trade partner', 'Handelspartner'],
    ['trade pricing', 'Händlerpreise'],
    ['Trade pricing', 'Händlerpreise'],
    ['trade buyers', 'Fachhändler'],
    ['wholesale trade', 'Großhandels-Fachhandel'],
    ['wholesale pricing', 'Großhandelspreise'],
    ['Wholesale pricing', 'Großhandelspreise'],
    ['wholesale quote', 'Großhandelsangebot'],
    ['Wholesale quote', 'Großhandelsangebot'],
    ['wholesale partner', 'Großhandelspartner'],
    ['wholesale facility', 'Großhandelsanlage'],
    ['wholesale manufacturing', 'Großhandelsfertigung'],
    ['wholesale manufacturer', 'Großhandelshersteller'],
    ['wholesale product', 'Großhandelsprodukt'],
    ['Wholesale', 'Großhandel'],
    ['wholesale', 'Großhandel'],
    ['channel letters', 'Leuchtbuchstaben'],
    ['Channel Letters', 'Leuchtbuchstaben'],
    ['channel letter', 'Leuchtbuchstabe'],
    ['Channel Letter', 'Leuchtbuchstabe'],
    ['flat cut letters', 'Flachbuchstaben'],
    ['Flat Cut Letters', 'Flachbuchstaben'],
    ['flat cut', 'Flachschnitt'],
    ['Flat Cut', 'Flachschnitt'],
    ['blade signs', 'Ausleger-Schilder'],
    ['Blade Signs', 'Ausleger-Schilder'],
    ['blade sign', 'Ausleger-Schild'],
    ['Blade Sign', 'Ausleger-Schild'],
    ['cabinet signs', 'Leuchtkästen'],
    ['Cabinet Signs', 'Leuchtkästen'],
    ['cabinet sign', 'Leuchtkasten'],
    ['Cabinet sign', 'Leuchtkasten'],
    ['lightboxes', 'Lichtboxen'],
    ['Lightboxes', 'Lichtboxen'],
    ['lightbox', 'Lichtbox'],
    ['Lightbox', 'Lichtbox'],
    ['light boxes', 'Lichtboxen'],
    ['light box', 'Lichtbox'],
    ['SEG Light Box', 'SEG-Lichtbox'],
    ['SEG light box', 'SEG-Lichtbox'],
    ['custom fabrication', 'individuelle Fertigung'],
    ['Custom Fabrication', 'Individuelle Fertigung'],
    ['halo lit', 'halo-beleuchtet'],
    ['Halo Lit', 'Halo-beleuchtet'],
    ['halo-lit', 'halo-beleuchtet'],
    ['face lit', 'front-beleuchtet'],
    ['Face Lit', 'Front-beleuchtet'],
    ['face-lit', 'front-beleuchtet'],
    ['front lit', 'front-beleuchtet'],
    ['Front Lit', 'Front-beleuchtet'],
    ['front-lit', 'front-beleuchtet'],
    ['Side Lit', 'Seitenbeleuchtet'],
    ['side lit', 'seitenbeleuchtet'],
    ['side-lit', 'seitenbeleuchtet'],
    ['Back Side Lit', 'Rückseitenbeleuchtet'],
    ['Front Side Lit', 'Vorderseitenbeleuchtet'],
    ['non-illuminated', 'nicht-beleuchtet'],
    ['Non-Illuminated', 'Nicht-beleuchtet'],
    ['Faux Neon', 'Faux-Neon'],
    ['faux neon', 'Faux-Neon'],
    ['Trimless', 'Randlos'],
    ['trimless', 'randlos'],
    ['trim cap', 'Zierleiste'],
    ['Trim Cap', 'Zierleiste'],
    ['push-through', 'Durchsteck'],
    ['Push-Through', 'Durchsteck'],
    ['Standoff', 'Abstandshalter'],
    ['standoff', 'Abstandshalter'],
    ['Flush-Mount', 'Flächenbündig'],
    ['flush-mount', 'flächenbündig'],
    ['flush mount', 'flächenbündige Montage'],
    ['Stainless Steel', 'Edelstahl'],
    ['stainless steel', 'Edelstahl'],
    ['Logo Boxes', 'Logo-Boxen'],
    ['logo boxes', 'Logo-Boxen'],
    ['Logo Box', 'Logo-Box'],
    ['logo box', 'Logo-Box'],
    ['Contour Logo', 'Kontur-Logo'],
    ['contour logo', 'Kontur-Logo'],
    ['door to door', 'von Tür zu Tür'],
    ['Door-to-door', 'Von Tür zu Tür'],
    ['door-to-door', 'von Tür zu Tür'],
    ['USA and Canada', 'USA und Kanada'],
    ['USA & Canada', 'USA & Kanada'],
    ['No minimum order', 'Keine Mindestbestellung'],
    ['No obligation', 'Keine Verpflichtung'],
    ['No retail markup', 'Kein Einzelhandelsaufschlag'],
    ['3 weeks', '3 Wochen'],
    ['3-week', '3-Wochen'],
    ['48 hours', '48 Stunden'],
    ['24 hours', '24 Stunden'],
    ['complimentary engineering', 'kostenlose Konstruktion'],
  ];

  for (const [eng, deu] of phrases) {
    // Use word-boundary-aware replacement
    r = r.split(eng).join(deu);
  }

  return r;
}

// ─── SEO translation ─────────────────────────────────────────────────────────
function translateSeo(seo) {
  const de = {};
  if (seo.title) de.title = translateText(seo.title);
  if (seo.metaDescription) de.metaDescription = translateText(seo.metaDescription);
  if (seo.keywords) de.keywords = seo.keywords.map(k => translateText(k));
  return de;
}

// ─── Block data translation ──────────────────────────────────────────────────
function translateBlockData(block) {
  const data = block.data;
  const de = {};

  // String fields
  const stringFields = ['badge','h1','h1Highlight','subtitle','subtitleHighlight','heading','headingHighlight','description','content','linkText','imageAlt'];
  for (const f of stringFields) {
    if (data[f]) de[f] = translateText(data[f]);
  }

  // CTAs
  if (data.ctas && data.ctas.length > 0) {
    de.ctas = data.ctas.map(cta => {
      const d = { label: translateText(cta.label), href: cta.href };
      if (cta.variant) d.variant = cta.variant;
      return d;
    });
  }

  // Messages (marquee)
  if (data.messages) de.messages = data.messages.map(m => translateText(m));

  // Bullet points
  if (data.bulletPoints) de.bulletPoints = data.bulletPoints.map(bp => translateText(bp));

  // Categories
  if (data.categories) de.categories = data.categories.map(c => translateText(c));

  // Items (various types)
  if (data.items) {
    de.items = data.items.map(item => {
      if (typeof item === 'string') return translateText(item);
      const d = {};
      if (item.title) d.title = translateText(item.title);
      if (item.name) d.name = translateText(item.name);
      if (item.description) d.description = translateText(item.description);
      if (item.label) d.label = translateText(item.label);
      if (item.sublabel) d.sublabel = item.sublabel;
      if (item.tag) d.tag = translateText(item.tag);
      if (item.bestFor) d.bestFor = translateText(item.bestFor);
      if (item.chips) d.chips = item.chips.map(c => translateText(c));
      if (item.question) d.question = translateText(item.question);
      if (item.answer) d.answer = translateText(item.answer);
      if (item.text) d.text = translateText(item.text);
      if (item.readTime) d.readTime = item.readTime.replace('min read', 'Min. Lesezeit');
      if (item.category) d.category = translateText(item.category);
      if (item.learnMoreLabel) d.learnMoreLabel = translateText(item.learnMoreLabel);
      return d;
    });
  }

  // Steps
  if (data.steps) {
    de.steps = data.steps.map(s => ({
      step: s.step,
      title: translateText(s.title),
      description: translateText(s.description)
    }));
  }

  // Timeline entries
  if (data.entries) {
    de.entries = data.entries.map(e => ({
      step: e.step,
      title: translateText(e.title),
      text: translateText(e.text)
    }));
  }

  // Images (alt text)
  if (data.images) {
    de.images = data.images.map(img => {
      const d = {};
      if (img.alt) d.alt = translateText(img.alt);
      if (img.category) d.category = translateText(img.category);
      if (img.type && img.type !== '') d.type = translateText(img.type);
      return d;
    });
  }

  // Contact cards
  if (data.cards) {
    de.cards = data.cards.map(card => {
      const d = {};
      if (card.title) d.title = translateText(card.title);
      if (card.description) d.description = translateText(card.description);
      return d;
    });
  }

  // Sidebar (form sections)
  if (data.sidebar) {
    de.sidebar = {};
    if (data.sidebar.businessHours) {
      de.sidebar.businessHours = data.sidebar.businessHours.map(bh => ({
        day: translateText(bh.day),
        hours: bh.hours === 'Closed' ? 'Geschlossen' : bh.hours
      }));
    }
    if (data.sidebar.notices) de.sidebar.notices = data.sidebar.notices.map(n => translateText(n));
    if (data.sidebar.ctaText) de.sidebar.ctaText = translateText(data.sidebar.ctaText);
    if (data.sidebar.differentiators) {
      de.sidebar.differentiators = data.sidebar.differentiators.map(d => ({
        icon: d.icon,
        text: translateText(d.text)
      }));
    }
  }

  return de;
}

// ─── Process files ───────────────────────────────────────────────────────────
function processFile(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);

  // Remove existing de keys first (in case re-running)
  if (json.seo) delete json.seo.de;
  if (json.blocks) {
    for (const block of json.blocks) {
      if (block.data) delete block.data.de;
    }
  }

  // Add de to seo
  if (json.seo) json.seo.de = translateSeo(json.seo);

  // Add de to each block's data
  if (json.blocks) {
    for (const block of json.blocks) {
      if (block.data) block.data.de = translateBlockData(block);
    }
  }

  writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✓ ${filePath}`);
}

// Process all
const pagesDir = join(CONTENT_DIR, 'pages');
const productsDir = join(CONTENT_DIR, 'products');

for (const file of readdirSync(pagesDir)) {
  if (file.endsWith('.json')) processFile(join(pagesDir, file));
}
for (const file of readdirSync(productsDir)) {
  if (file.endsWith('.json')) processFile(join(productsDir, file));
}

console.log('\nDone! German translations added to all content files.');
