"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export interface UploadResult {
  url: string;
  width?: number;
  height?: number;
}

interface ImageUploadProps {
  value: string;
  onChange: (result: UploadResult | string) => void;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, placeholder }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange({ url: data.url, width: data.width, height: data.height });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => { setError(null); onChange(e.target.value); }}
          placeholder={placeholder || "/uploads/image.jpg"}
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 border border-brand-gold/20 transition-colors disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {value && (
        <div className="mt-2 rounded-md overflow-hidden border border-white/10 max-w-[200px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
}
