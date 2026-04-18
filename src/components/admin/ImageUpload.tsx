"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Upload, Image as ImageIcon, X } from "lucide-react";

export interface UploadResult {
  url: string;
  width?: number;
  height?: number;
}

interface MediaFile {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
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
  const [showLibrary, setShowLibrary] = useState(false);
  const [libraryFiles, setLibraryFiles] = useState<MediaFile[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  const fetchLibrary = useCallback(async () => {
    setLoadingLibrary(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      setLibraryFiles(data.files || []);
    } catch {
      // Silently fail
    } finally {
      setLoadingLibrary(false);
    }
  }, []);

  useEffect(() => {
    if (showLibrary) fetchLibrary();
  }, [showLibrary, fetchLibrary]);

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

  function selectFromLibrary(file: MediaFile) {
    onChange(file.url);
    setShowLibrary(false);
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
        <button
          type="button"
          onClick={() => setShowLibrary(!showLibrary)}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-colors"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          Library
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

      {/* Media Library Picker */}
      {showLibrary && (
        <div className="mt-2 border border-gray-200 rounded-lg bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">Select from Media Library</span>
            <button
              type="button"
              onClick={() => setShowLibrary(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {loadingLibrary ? (
            <p className="text-xs text-gray-400 py-4 text-center">Loading...</p>
          ) : libraryFiles.length === 0 ? (
            <p className="text-xs text-gray-400 py-4 text-center">No images in library</p>
          ) : (
            <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
              {libraryFiles.map((file) => (
                <button
                  key={file.filename}
                  type="button"
                  onClick={() => selectFromLibrary(file)}
                  className="aspect-square rounded border border-gray-200 overflow-hidden hover:border-blue-400 hover:ring-2 hover:ring-blue-200 transition-all"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={file.url}
                    alt={file.filename}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {value && !showLibrary && (
        <div className="mt-2 rounded-md overflow-hidden border border-white/10 max-w-[200px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-auto" />
        </div>
      )}
    </div>
  );
}
