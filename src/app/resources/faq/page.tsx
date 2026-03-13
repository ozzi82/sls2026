import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import FAQAccordion from "@/components/FAQAccordion";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Wholesale FAQ — Trade Account & Channel Letter Ordering Questions | Sunlite Signs",
  description:
    "Frequently asked questions about wholesale trade accounts, ordering channel letters, turnaround times, shipping, UL listing, and working with Sunlite Signs. We sell exclusively to sign shops — never retail.",
  keywords: [
    "wholesale sign FAQ",
    "trade account sign questions",
    "wholesale channel letter ordering",
    "wholesale sign turnaround time",
    "UL listed signs FAQ",
    "sign manufacturer wholesale FAQ",
    "channel letter shipping wholesale",
    "wholesale sign pricing trade",
  ],
  openGraph: {
    title: "Wholesale FAQ — Trade Account & Channel Letter Ordering Questions | Sunlite Signs",
    description:
      "Answers to common questions about wholesale trade accounts and ordering channel letters from Sunlite Signs. We sell exclusively to the trade.",
    url: "https://sunlitesigns.com/resources/faq",
  },
};

const faqs = [
  {
    question: "Do you sell to the general public?",
    answer:
      "No. Sunlite Signs sells exclusively to sign companies, sign shops, and trade professionals. We do not sell retail. We have never sold retail, and we never will. This is a core principle of our business — your clients remain your clients, and we will never compete with you for end-user business.",
  },
  {
    question: "How do I open a wholesale trade account?",
    answer:
      "Opening a wholesale trade account with Sunlite Signs is straightforward. Contact us through our website or call our sales team. We will verify your sign shop business credentials and set you up as a trade partner. There is no account fee or minimum annual commitment. Once established, you can request wholesale quotes and place orders directly with our team.",
  },
  {
    question: "Do you compete with your wholesale partners?",
    answer:
      "Never. We do not have a retail storefront and never sell direct to end users. Sunlite Signs is a wholesale-only manufacturer built to support sign shops and trade professionals. We do not accept orders from the general public, homeowners, or businesses looking to buy their own signage. Your customer relationships are protected.",
  },
  {
    question: "How do I get a wholesale quote for a channel letter project?",
    answer:
      "Submit your project details through our Request Wholesale Pricing form or email us directly. We accept AI files, PDFs, hand sketches, or detailed written descriptions. Include letter height, font, color, illumination type, quantity, and any special requirements. You will receive a detailed wholesale trade quote within 48 hours.",
  },
  {
    question: "What is your typical turnaround time?",
    answer:
      "Standard production time is approximately 3 weeks from approval of shop drawings and receipt of deposit. Rush orders may be accommodated depending on current production capacity. Contact us to discuss timeline requirements for time-sensitive projects.",
  },
  {
    question: "Do you ship to both the USA and Canada?",
    answer:
      "Yes. We ship to sign shops and trade partners throughout the United States and Canada. All signs are carefully crated for safe transit with full insurance and tracking. We work with experienced freight carriers who specialize in sign shipments to minimize the risk of damage.",
  },
  {
    question: "Are your illuminated signs UL listed?",
    answer:
      "Yes. Every illuminated sign produced by Sunlite Signs is UL listed and carries the UL label. This includes all channel letters, lightboxes, and other illuminated products. UL listing ensures safety compliance and is required or strongly recommended by building codes in most jurisdictions across the USA and Canada.",
  },
  {
    question: "What materials do you use for channel letters?",
    answer:
      "Our channel letters feature aluminum returns (0.040\" or 0.063\" depending on letter size), acrylic faces in any Pantone color, premium LED modules from brands like Samsung and Nichia, and UL-listed power supplies. We use German-engineered fabrication processes from our partnership with LKF Lichtwerbung in Nuremberg for precision manufacturing.",
  },
  {
    question: "What is the difference between trimless and trim cap channel letters?",
    answer:
      "Traditional channel letters use a plastic trim cap to secure the acrylic face to the aluminum return. Trimless channel letters eliminate this trim cap entirely, creating a seamless, modern junction between the face and return. Trimless letters offer a cleaner, more contemporary appearance and are increasingly specified by architects and designers. Both options are available at wholesale trade pricing. See our detailed comparison in the blog.",
  },
  {
    question: "What illumination options are available?",
    answer:
      "We offer four illumination options at wholesale trade pricing: face-lit (light through the face for maximum visibility), halo-lit (light projected backward for an elegant halo effect), front-and-halo (dual illumination for premium impact), and non-illuminated (no internal lighting). Each option serves different aesthetic and functional needs. Our Choosing Illumination Types guide covers this in detail.",
  },
  {
    question: "Do you provide shop drawings for approval before production?",
    answer:
      "Yes. Before beginning production, we provide detailed shop drawings showing letter dimensions, font, colors, layout, and specifications for your review and approval. Production begins only after you approve the drawings. This ensures the final product matches your expectations exactly.",
  },
  {
    question: "What is your minimum order size?",
    answer:
      "We work with trade partners on projects of all sizes, from single-word sign sets to large multi-location rollouts. Contact us with your project details and we will provide a wholesale quote regardless of size. We understand that sign shops need flexible wholesale manufacturing partners who can handle both small and large orders.",
  },
  {
    question: "How are the signs packaged for shipping?",
    answer:
      "Every sign set is carefully crated in custom-built wooden or corrugated crating designed to protect the product during transit. Letters are individually wrapped and separated to prevent contact damage. We include installation hardware, wiring diagrams, paper patterns (for stud-mount letters), and all documentation needed for a smooth installation.",
  },
  {
    question: "What warranty do you offer?",
    answer:
      "Sunlite Signs stands behind every product with a comprehensive warranty covering manufacturing defects in materials and workmanship. LED modules carry a multi-year warranty, and our power supplies are warranted for reliable performance. Contact us for complete warranty details specific to your product type.",
  },
  {
    question: "Can you match specific brand colors?",
    answer:
      "Absolutely. We can produce acrylic faces and painted returns in virtually any Pantone color to match your client's brand specifications precisely. Provide the PMS color number with your wholesale order and we will ensure an accurate match. We can also work with custom vinyl wraps for specialty finishes.",
  },
  {
    question: "What is German engineering and how does it apply to your signs?",
    answer:
      "Sunlite Signs has a manufacturing partnership with LKF Lichtwerbung, a precision sign manufacturing firm based in Nuremberg, Germany. This partnership brings decades of German engineering expertise, tooling, and quality standards to our Florida-based production facility. It influences our fabrication tolerances, quality control processes, and the design of our trimless system.",
  },
  {
    question: "Why should my sign shop choose a wholesale-only manufacturer?",
    answer:
      "Choosing a wholesale-only manufacturer like Sunlite Signs means your supplier will never compete with you for business. Many sign manufacturers sell both wholesale and retail, which puts them in direct competition with their own trade partners. We believe that is wrong. Sunlite Signs sells only to sign shops and trade professionals — we will never sell to the end user, never undercut your pricing, and never market to your clients. Your business is safe with us.",
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-bg-primary pt-32 pb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "FAQ" },
            ]}
          />
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-4">
              <Lock className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Resources</span>
            </div>
            <div className="gold-line mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Wholesale FAQ
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Answers to the most common questions about wholesale trade accounts, ordering channel letters, and
              working with Sunlite Signs. We sell exclusively to sign shops and trade professionals — we never sell retail. If you do not find your answer here, contact
              our team directly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ List */}
      <FAQAccordion faqs={faqs} heading="Wholesale FAQ" />

      {/* Still Have Questions */}
      <section className="section-padding bg-bg-light">
        <div className="container-max">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-4 py-1.5 mb-6">
                <Lock className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-brand-gold text-xs font-heading font-semibold uppercase tracking-widest">Trade Accounts Only</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-4">
                Still Have Questions? We Never Sell Retail.
              </h2>
              <p className="text-text-dark/60 max-w-xl mx-auto mb-8">
                Ready to get trade pricing on your next project? Our team is ready to help sign shops and trade professionals. We sell exclusively to the trade — never to the general public.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/get-a-quote" className="btn-primary">
                  Request Wholesale Pricing
                </Link>
                <a
                  href="mailto:hello@sunlitesigns.com"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-text-dark/20 text-text-dark font-heading font-semibold text-sm uppercase tracking-wider rounded hover:border-brand-gold hover:text-brand-gold transition-colors duration-300"
                >
                  Email Us
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-dark/50">
                <a href="tel:+6892940912" className="hover:text-brand-gold transition-colors">
                  (689) 294-0912
                </a>
                <a
                  href="mailto:hello@sunlitesigns.com"
                  className="hover:text-brand-gold transition-colors"
                >
                  hello@sunlitesigns.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
