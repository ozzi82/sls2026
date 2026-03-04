"use client";

import { useState } from "react";
import PlaceholderImage from "@/components/PlaceholderImage";
import AnimatedSection from "@/components/AnimatedSection";

type Category = "All" | "Channel Letters" | "Blade Signs" | "Flat Cut" | "Lightboxes";

interface GalleryItem {
  label: string;
  category: Category;
  aspectRatio: string;
}

const categories: Category[] = [
  "All",
  "Channel Letters",
  "Blade Signs",
  "Flat Cut",
  "Lightboxes",
];

const galleryItems: GalleryItem[] = [
  {
    label: "Front Lit Channel Letters — Restaurant Storefront, Night",
    category: "Channel Letters",
    aspectRatio: "aspect-[3/4]",
  },
  {
    label: "Halo Lit Channel Letters — Boutique Hotel Facade",
    category: "Channel Letters",
    aspectRatio: "aspect-video",
  },
  {
    label: "Trimless EdgeLuxe Letters — Modern Office Building",
    category: "Channel Letters",
    aspectRatio: "aspect-square",
  },
  {
    label: "Illuminated Blade Sign — Downtown Retail District",
    category: "Blade Signs",
    aspectRatio: "aspect-[4/5]",
  },
  {
    label: "Brushed Aluminum Flat Cut Letters — Corporate Lobby",
    category: "Flat Cut",
    aspectRatio: "aspect-video",
  },
  {
    label: "Double-Sided Lightbox — Shopping Center Entrance",
    category: "Lightboxes",
    aspectRatio: "aspect-[3/4]",
  },
  {
    label: "Front & Halo Lit Channel Letters — Medical Center",
    category: "Channel Letters",
    aspectRatio: "aspect-video",
  },
  {
    label: "Painted Blade Sign with LED Halo — Coffee Shop",
    category: "Blade Signs",
    aspectRatio: "aspect-square",
  },
  {
    label: "Stainless Steel Flat Cut Letters — Law Office",
    category: "Flat Cut",
    aspectRatio: "aspect-[4/5]",
  },
  {
    label: "Slim LED Lightbox — Fast Casual Restaurant",
    category: "Lightboxes",
    aspectRatio: "aspect-video",
  },
  {
    label: "Reverse Lit Channel Letters — Luxury Retail, Dusk",
    category: "Channel Letters",
    aspectRatio: "aspect-[3/4]",
  },
  {
    label: "Large Format Lightbox — Auto Dealership Showroom",
    category: "Lightboxes",
    aspectRatio: "aspect-square",
  },
];

export default function GalleryFilter() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2.5 rounded text-sm font-heading font-medium uppercase tracking-wider transition-all duration-300 ${
              active === cat
                ? "bg-brand-gold text-primary-dark"
                : "bg-white/5 border border-white/10 text-text-light/60 hover:border-brand-gold/30 hover:text-brand-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, index) => (
          <AnimatedSection key={item.label} delay={index * 0.05}>
            <div className="break-inside-avoid group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl">
                <PlaceholderImage
                  label={item.label}
                  className="rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                  aspectRatio={item.aspectRatio}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <div className="p-4">
                    <span className="text-xs font-heading uppercase tracking-wider text-brand-gold">
                      {item.category}
                    </span>
                    <p className="text-sm text-text-light/90 mt-1">
                      {item.label.split(" — ")[1] || item.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-light/50 font-body">
            No projects found in this category.
          </p>
        </div>
      )}
    </>
  );
}
