"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import type { GalleryImage } from "@/lib/admin/page-config-types";

interface GalleryFilterProps {
  categories: string[];
  images: GalleryImage[];
}

export default function GalleryFilter({ categories, images }: GalleryFilterProps) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? images
      : images.filter((item) => item.category === active);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2.5 rounded-lg text-sm font-heading font-medium uppercase tracking-wider transition-all duration-300 ${
              active === cat
                ? "bg-brand-gold text-bg-primary"
                : "bg-bg-card border border-white/[0.06] text-white/60 hover:border-brand-gold/30 hover:text-brand-gold"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 text-[10px] opacity-60">
                ({images.filter((img) => img.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Masonry Grid — natural aspect ratios, no cropping */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {filtered.map((item, index) => (
          <AnimatedSection key={`${item.src}-${index}`} delay={index * 0.05}>
            <div className="break-inside-avoid group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl bg-bg-card border border-white/[0.06] hover:border-brand-gold/30 transition-all duration-400">
                {item.src ? (
                  item.width && item.height ? (
                    /* Known dimensions — render at natural aspect ratio */
                    <Image
                      src={item.src.startsWith("/") ? item.src : `/${item.src}`}
                      alt={item.alt || item.category}
                      width={item.width}
                      height={item.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    /* No dimensions stored — use fill with object-contain fallback */
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={item.src.startsWith("/") ? item.src : `/${item.src}`}
                        alt={item.alt || item.category}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  )
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent rounded-xl" />
                )}

                {/* Hover overlay with details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end">
                  <div className="p-4 w-full">
                    <span className="text-xs font-heading uppercase tracking-wider text-brand-gold">
                      {item.category}
                    </span>
                    {item.type && (
                      <p className="text-sm text-white/80 mt-1">{item.type}</p>
                    )}
                    {(item.location || item.turnaround) && (
                      <div className="flex items-center gap-3 text-white/50 text-xs mt-1">
                        {item.location && <span>{item.location}</span>}
                        {item.location && item.turnaround && (
                          <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
                        )}
                        {item.turnaround && <span>{item.turnaround}</span>}
                      </div>
                    )}
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
          <p className="text-white/60 font-body">
            No projects found in this category.
          </p>
        </div>
      )}
    </>
  );
}
