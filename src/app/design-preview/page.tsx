"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, Phone, Zap, Shield, Clock, Truck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const stats = [
  { value: "UL 48", label: "Listed & Certified", icon: Shield },
  { value: "24h", label: "Quote Turnaround", icon: Clock },
  { value: "3 Wk", label: "Door-to-Door", icon: Truck },
  { value: "US/CA", label: "Nationwide Shipping", icon: Zap },
];

const products = [
  { name: "Channel Letters", desc: "Face lit, halo lit & combination LED illumination", tag: "Most Popular" },
  { name: "EdgeLuxe Trimless", desc: '1.2" profile, embedded LEDs, no trim cap', tag: "Premium" },
  { name: "Blade Signs", desc: "Projecting signs for maximum storefront visibility", tag: null },
  { name: "SEG Light Boxes", desc: "Silicone-edged graphic displays from 1\" deep", tag: "New" },
  { name: "Flat Cut Letters", desc: "Precision-cut aluminum & stainless steel letterforms", tag: null },
  { name: "Cabinet Signs", desc: "Illuminated cabinet & push-through signage", tag: null },
];

export default function DesignPreview() {
  return (
    <div
      className="min-h-screen -mt-[80px]"
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        background: "#0A0A0A",
        color: "white",
      }}
    >
      {/* ═══════════════════════════════════════════
          NOTICE BAR
          ═══════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] text-center py-2.5 px-4">
        <p
          className="text-xs font-bold uppercase tracking-[0.2em] text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Design System Preview — Bold & Dynamic with Modern Fonts
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A0A1A] to-[#0F0F2D]" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(249,115,22,0.08),transparent_70%)]" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,169,110,0.06),transparent_70%)]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-24 lg:pb-32 pt-[30vh]">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div
              className="h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#D4B87A] mb-10"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 60, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />

            <motion.p
              custom={0}
              variants={fadeUp}
              className="font-bold text-[11px] uppercase tracking-[0.3em] text-[#C9A96E] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Wholesale Only · Trade Accounts
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] mb-8 tracking-[-0.03em] font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Precision Signage,
              <br />
              <span className="text-[#C9A96E]">
                Exclusively Wholesale.
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-base lg:text-lg text-white/40 max-w-lg leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              German-engineered channel letters, blade signs & illuminated
              signage — built for sign shops, never sold retail.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
              <button
                className="bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold text-sm uppercase tracking-[0.08em] px-10 py-5 rounded-md shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-[0_0_50px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 transition-all duration-300 border-none cursor-pointer"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Request Trade Pricing
              </button>
              <button
                className="text-white/70 font-semibold text-sm uppercase tracking-[0.08em] px-10 py-5 rounded-md border border-white/15 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 flex items-center gap-2 bg-transparent cursor-pointer"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                View Products
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
          <span
            className="text-[10px] uppercase tracking-[0.3em] text-white/20"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16 -mt-2">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#111118] rounded-xl border border-white/[0.06] overflow-hidden">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-10 lg:py-14 text-center border-r border-white/[0.04] last:border-r-0"
              >
                <stat.icon className="w-5 h-5 text-[#C9A96E]/40 mx-auto mb-4" />
                <div
                  className="text-3xl sm:text-4xl lg:text-[42px] font-bold bg-gradient-to-r from-[#C9A96E] to-[#D4B87A] bg-clip-text text-transparent mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="my-20 mx-6 sm:mx-10 lg:mx-16 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />

      {/* ═══════════════════════════════════════════
          STORY — Asymmetric light section
          ═══════════════════════════════════════════ */}
      <section className="mx-6 sm:mx-10 lg:mx-16">
        <div className="bg-[#FAFAFA] rounded-2xl overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-16 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-[#e8e4de] to-[#d4cfc6] flex items-center justify-center">
                  <span
                    className="text-[#0A0A0A]/10 font-bold text-sm uppercase tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Product Photo
                  </span>
                </div>
                <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-[#C9A96E]/40 rounded-br-lg hidden lg:block" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <p
                  className="font-bold text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] mb-5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Our Story
                </p>
                <h2
                  className="text-3xl lg:text-[42px] text-[#0A0A0A] leading-[1.1] mb-6 font-bold tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Custom European Signage,{" "}
                  <span className="text-[#C9A96E]">Wholesale.</span>
                </h2>
                <p className="text-[#0A0A0A]/45 leading-relaxed mb-4 text-[15px]" style={{ fontFamily: "var(--font-inter)" }}>
                  The foundation of Sunlite Signs begins with a partnership
                  rooted in German precision engineering — and a commitment to
                  never compete with our customers.
                </p>
                <p className="text-[#0A0A0A]/45 leading-relaxed mb-8 text-[15px]" style={{ fontFamily: "var(--font-inter)" }}>
                  From LKF Lichtwerbung in Nuremberg to Florida, we bring
                  decades of European signage expertise exclusively to the
                  trade.
                </p>
                <button
                  className="text-[#C9A96E] font-bold text-[13px] uppercase tracking-[0.1em] flex items-center gap-2 hover:gap-3 transition-all group bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Read Our Story
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="my-20 mx-6 sm:mx-10 lg:mx-16 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />

      {/* ═══════════════════════════════════════════
          PRODUCTS — Bold grid
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="h-[2px] w-12 bg-gradient-to-r from-[#C9A96E] to-[#D4B87A] mx-auto mb-8" />
            <h2
              className="text-4xl lg:text-[56px] leading-[1.05] mb-5 tracking-[-0.02em] font-bold"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              What We <span className="text-[#C9A96E]">Build</span>
            </h2>
            <p className="text-white/35 max-w-md mx-auto text-[15px]" style={{ fontFamily: "var(--font-inter)" }}>
              Precision-engineered signage solutions, manufactured exclusively
              for the trade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-[#111118] border border-white/[0.06] rounded-xl overflow-hidden cursor-pointer hover:border-[#C9A96E]/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-400"
              >
                <div className="h-[200px] bg-gradient-to-br from-[#0A0A1A] to-[#0F0F2D] relative flex items-center justify-center overflow-hidden">
                  <span
                    className="text-5xl font-extrabold text-white/[0.04] group-hover:text-white/[0.06] transition-colors duration-500"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {product.name.split(" ").map(w => w[0]).join("")}
                  </span>
                  {product.tag && (
                    <span
                      className="absolute top-4 right-4 bg-[#F97316]/10 text-[#F97316] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-[#F97316]/20"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/0 to-[#F97316]/0 group-hover:from-[#F97316]/5 group-hover:to-transparent transition-all duration-500" />
                </div>
                <div className="p-6">
                  <h3
                    className="font-bold text-lg mb-2 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {product.name}
                    <ArrowRight className="w-4 h-4 text-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {product.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="my-20 mx-6 sm:mx-10 lg:mx-16 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />

      {/* ═══════════════════════════════════════════
          ENGINEERING — Asymmetric dark
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="font-bold text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] mb-5"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Included with Every Project
              </p>
              <h2
                className="text-3xl lg:text-[42px] leading-[1.1] mb-6 font-bold tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Complimentary{" "}
                <span className="text-[#C9A96E]">Engineering.</span>
              </h2>
              <p className="text-white/35 leading-relaxed mb-8 text-[15px]" style={{ fontFamily: "var(--font-inter)" }}>
                With our German design and engineering roots, we contribute
                complimentary engineering services to every project — from
                conceptual integration of structural and material sciences, to
                manufacturing engineering and packaging.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  "Concept & Materials",
                  "Structural Engineering",
                  "Electrical Layout",
                  "Manufacturing Engineering",
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 text-white/50 text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#C9A96E] to-[#D4B87A] flex-shrink-0" />
                    {service}
                  </div>
                ))}
              </div>

              <button
                className="text-[#C9A96E] font-bold text-[13px] uppercase tracking-[0.1em] flex items-center gap-2 hover:gap-3 transition-all group bg-transparent border border-[#C9A96E] px-8 py-4 rounded-md hover:bg-[#C9A96E]/10 cursor-pointer"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Explore Services
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-[#111118] to-[#0F0F2D] flex items-center justify-center border border-white/[0.06]">
                <span
                  className="text-white/[0.06] font-bold text-sm uppercase tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Engineering Photo
                </span>
              </div>
              <div className="absolute -top-3 -left-3 w-20 h-20 border-l-2 border-t-2 border-[#C9A96E]/40 rounded-tl-lg hidden lg:block" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="my-20 mx-6 sm:mx-10 lg:mx-16 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />

      {/* ═══════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16 pb-32">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="bg-gradient-to-br from-[#111118] to-[#0F0F2D] rounded-2xl border border-white/[0.06] overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(249,115,22,0.06),transparent_70%)]" />

            <div className="relative z-10 text-center px-8 py-20 lg:py-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 border border-[#C9A96E]/20 rounded-full px-5 py-2 mb-10">
                  <Lock className="w-3 h-3 text-[#C9A96E]" />
                  <span
                    className="text-[#C9A96E] text-[10px] font-bold uppercase tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Trade Accounts Only
                  </span>
                </div>

                <h2
                  className="text-4xl lg:text-[56px] leading-[1.05] mb-5 tracking-[-0.02em] font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Get Your Product{" "}
                  <span className="text-[#C9A96E]">Started.</span>
                </h2>

                <p className="text-white/35 max-w-md mx-auto mb-12 text-[15px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  Request wholesale pricing for your next project. Detailed trade
                  quotes within 24 hours. Delivered in 3 weeks door to door.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <button
                    className="bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold text-sm uppercase tracking-[0.08em] px-12 py-5 rounded-md shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-[0_0_50px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto border-none cursor-pointer"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Request Trade Pricing
                  </button>
                  <button
                    className="text-white/70 font-semibold text-sm uppercase tracking-[0.08em] px-12 py-5 rounded-md border border-white/15 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center bg-transparent cursor-pointer"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <Phone className="w-4 h-4" />
                    (689) 294-0912
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-white/20" style={{ fontFamily: "var(--font-inter)" }}>
                  <span>(689) 294-0912</span>
                  <span className="hidden sm:inline text-white/10">|</span>
                  <span>hello@sunlitesigns.com</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DESIGN SYSTEM REFERENCE
          ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 lg:px-16 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-4xl font-bold tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Design System <span className="text-[#C9A96E]">Reference</span>
            </h2>
          </div>

          {/* Color Palette */}
          <div className="mb-20">
            <p
              className="font-bold text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] mb-8"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Color Palette
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Deep Black", hex: "#0A0A0A", bg: "#0A0A0A", text: "rgba(255,255,255,0.15)" },
                { name: "Navy Gradient", hex: "#0F0F2D", bg: "linear-gradient(135deg,#0A0A0A,#0F0F2D)", text: "rgba(255,255,255,0.15)" },
                { name: "Card Surface", hex: "#111118", bg: "#111118", text: "rgba(255,255,255,0.15)" },
                { name: "Brand Gold", hex: "#C9A96E", bg: "#C9A96E", text: "#0A0A0A" },
                { name: "CTA Orange", hex: "#F97316", bg: "linear-gradient(135deg,#F97316,#FB923C)", text: "white" },
                { name: "Light BG", hex: "#FAFAFA", bg: "#FAFAFA", text: "rgba(0,0,0,0.15)" },
              ].map((c) => (
                <div key={c.name} className="rounded-xl overflow-hidden border border-white/[0.06]">
                  <div
                    className="h-24 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ background: c.bg, color: c.text, fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {c.name}
                  </div>
                  <div className="bg-[#111118] p-4">
                    <div className="font-bold text-sm" style={{ fontFamily: "var(--font-space-grotesk)" }}>{c.name}</div>
                    <div className="text-xs text-white/30 font-mono mt-1">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Scale */}
          <div className="mb-20">
            <p
              className="font-bold text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] mb-8"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Typography Scale
            </p>
            <div className="space-y-0">
              {[
                {
                  label: "Display / H1",
                  spec: "Space Grotesk Bold 72-88px",
                  el: <span className="text-5xl lg:text-7xl tracking-[-0.03em] font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>Precision <span className="text-[#C9A96E]">Signage.</span></span>,
                },
                {
                  label: "Statement",
                  spec: "Space Grotesk Bold 48px",
                  el: <span className="text-4xl lg:text-5xl font-bold tracking-[-0.02em]" style={{ fontFamily: "var(--font-space-grotesk)" }}>What We <span className="text-[#C9A96E]">Build</span></span>,
                },
                {
                  label: "Section Heading",
                  spec: "Space Grotesk 800 28px",
                  el: <span className="font-extrabold text-2xl uppercase tracking-[0.02em]" style={{ fontFamily: "var(--font-space-grotesk)" }}>Channel Letters</span>,
                },
                {
                  label: "Body",
                  spec: "Inter 16px",
                  el: <span className="text-base text-white/60 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>German-engineered wholesale channel letters for sign shops across the USA and Canada. UL listed, precision built.</span>,
                },
                {
                  label: "Micro Label",
                  spec: "Space Grotesk 700 11px",
                  el: <span className="font-bold text-[11px] uppercase tracking-[0.25em] text-[#C9A96E]" style={{ fontFamily: "var(--font-space-grotesk)" }}>Wholesale Only · UL 48 Listed · German Engineering</span>,
                },
              ].map((t) => (
                <div key={t.label} className="flex flex-col lg:flex-row lg:items-baseline gap-4 lg:gap-10 py-8 border-b border-white/[0.06]">
                  <div className="lg:min-w-[160px] flex-shrink-0">
                    <div
                      className="font-semibold text-[11px] uppercase tracking-[0.15em] text-white/30"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {t.label}
                    </div>
                    <div className="text-[10px] text-white/15 mt-1" style={{ fontFamily: "var(--font-inter)" }}>{t.spec}</div>
                  </div>
                  <div>{t.el}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div>
            <p
              className="font-bold text-[11px] uppercase tracking-[0.25em] text-[#C9A96E] mb-8"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Buttons
            </p>
            <div className="flex flex-wrap gap-5 items-center">
              <button
                className="bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white font-bold text-sm uppercase tracking-[0.08em] px-10 py-5 rounded-md shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-[0_0_50px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 transition-all duration-300 border-none cursor-pointer"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Primary CTA
              </button>
              <button
                className="text-white/70 font-semibold text-sm uppercase tracking-[0.08em] px-10 py-5 rounded-md border border-white/15 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 bg-transparent cursor-pointer"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Secondary
              </button>
              <button
                className="text-[#C9A96E] font-bold text-[13px] uppercase tracking-[0.1em] px-8 py-4 rounded-md border border-[#C9A96E] hover:bg-[#C9A96E]/10 transition-all duration-300 bg-transparent cursor-pointer"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ghost
              </button>
              <button
                className="text-[#C9A96E] font-bold text-[13px] uppercase tracking-[0.1em] flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none cursor-pointer"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Text Link <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
