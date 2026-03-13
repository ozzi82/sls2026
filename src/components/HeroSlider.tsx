"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  { src: "/hero-bg1.jpg", alt: "Channel letter signage — university building identification" },
  { src: "/hero-bg2.webp", alt: "Custom illuminated sign fabrication — event signage project" },
  { src: "/hero-bg3.jpg", alt: "Wholesale illuminated signage by Sunlite Signs" },
  { src: "/hero-bg4.jpg", alt: "Premium channel letter manufacturing by Sunlite Signs" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className={`object-cover transition-transform duration-[8000ms] ease-out ${
              index === current ? "scale-[1.06]" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Vertical slide indicators — right edge */}
      <div className="absolute bottom-8 right-6 lg:right-16 z-20 flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-1.5 transition-all duration-500 rounded-full ${
              index === current
                ? "h-8 bg-brand-gold"
                : "h-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}
