"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/hero-bg1.jpg",
    alt: "Channel letter signage — university building identification",
  },
  {
    src: "/hero-bg2.webp",
    alt: "Custom illuminated sign fabrication — event signage project",
  },
  {
    src: "/hero-bg3.jpg",
    alt: "Wholesale illuminated signage by Sunlite Signs",
  },
  {
    src: "/hero-bg4.jpg",
    alt: "Premium channel letter manufacturing by Sunlite Signs",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/10" />

      {/* Slide indicators */}
      <div className="absolute bottom-52 lg:bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-brand-gold w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </>
  );
}
