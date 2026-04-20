"use client";

import { useState, useRef, useEffect } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerButtonProps {
  color: string;
  onChange: (color: string) => void;
  title: string;
}

export default function ColorPickerButton({ color, onChange, title }: ColorPickerButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title={title}
        onClick={() => setOpen(!open)}
        className="h-8 w-8 rounded border border-gray-300 flex items-center justify-center hover:border-gray-400"
      >
        <div
          className="h-5 w-5 rounded-sm border border-gray-200"
          style={{ backgroundColor: color || "#000000" }}
        />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <HexColorPicker color={color || "#000000"} onChange={onChange} />
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500">#</span>
            <HexColorInput
              color={color || "#000000"}
              onChange={onChange}
              className="w-full text-xs border border-gray-200 rounded px-2 py-1"
            />
          </div>
          <button
            type="button"
            onClick={() => { onChange(""); setOpen(false); }}
            className="mt-2 text-xs text-gray-400 hover:text-gray-600 w-full text-center"
          >
            Remove color
          </button>
        </div>
      )}
    </div>
  );
}
