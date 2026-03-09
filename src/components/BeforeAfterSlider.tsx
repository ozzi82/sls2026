"use client";

import Image from "next/image";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";

interface BeforeAfterSliderProps {
  daySrc: string;
  nightSrc?: string;
  alt: string;
}

export default function BeforeAfterSlider({
  daySrc,
  nightSrc,
  alt,
}: BeforeAfterSliderProps) {
  if (!nightSrc) {
    return (
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
        <Image
          src={daySrc}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
      <ReactCompareSlider
        itemOne={
          <div className="relative w-full h-full">
            <Image
              src={daySrc}
              alt={`${alt} — daytime`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>
        }
        itemTwo={
          <div className="relative w-full h-full">
            <Image
              src={nightSrc}
              alt={`${alt} — illuminated at night`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>
        }
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backgroundColor: "#E8590C",
              border: "2px solid white",
              boxShadow: "0 0 12px rgba(232, 89, 12, 0.4)",
              width: 36,
              height: 36,
            }}
            linesStyle={{
              color: "#E8590C",
              width: 2,
              opacity: 0.8,
            }}
          />
        }
        position={50}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
