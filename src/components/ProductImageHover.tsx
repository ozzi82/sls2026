"use client";

import Image from "next/image";

interface ProductImageHoverProps {
  daySrc: string;
  nightSrc?: string;
  alt: string;
  sizes?: string;
}

export default function ProductImageHover({
  daySrc,
  nightSrc,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: ProductImageHoverProps) {
  if (!nightSrc) {
    return (
      <div className="relative aspect-[4/3]">
        <Image
          src={daySrc}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] group/img">
      <Image
        src={daySrc}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-opacity duration-500 group-hover/img:opacity-0"
      />
      <Image
        src={nightSrc}
        alt={`${alt} — illuminated at night`}
        fill
        sizes={sizes}
        className="object-cover opacity-0 transition-opacity duration-500 group-hover/img:opacity-100"
      />
    </div>
  );
}
