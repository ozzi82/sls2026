"use client";

import { useState } from "react";
import type { GalleryData, GalleryImage } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, ArrowUp, ArrowDown, Tag, X } from "lucide-react";
import ImageUpload, { type UploadResult } from "@/components/admin/ImageUpload";
import RichTextEditor from "../RichTextEditor";

interface GalleryEditorProps {
  data: GalleryData;
  onChange: (data: GalleryData) => void;
}

export default function GalleryEditor({ data, onChange }: GalleryEditorProps) {
  const [newCategory, setNewCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = data.categories ?? [];
  const images = data.images ?? [];

  const filtered =
    filterCategory === "All"
      ? images
      : images.filter((img) => img.category === filterCategory);

  function setCategories(cats: string[]) {
    onChange({ ...data, categories: cats });
  }

  function setImages(imgs: GalleryImage[]) {
    onChange({ ...data, images: imgs });
  }

  function addCategory() {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories([...categories, trimmed]);
    setNewCategory("");
  }

  function removeCategory(cat: string) {
    setCategories(categories.filter((c) => c !== cat));
    // Also clear category from images that had it
    setImages(
      images.map((img) =>
        img.category === cat ? { ...img, category: "" } : img
      )
    );
    if (filterCategory === cat) setFilterCategory("All");
  }

  function addImage() {
    setImages([
      ...images,
      {
        src: "",
        alt: "",
        category: filterCategory !== "All" ? filterCategory : categories[0] ?? "",
        type: "",
        location: "",
        turnaround: "",
      },
    ]);
  }

  function updateImage(realIndex: number, updated: GalleryImage) {
    const next = [...images];
    next[realIndex] = updated;
    setImages(next);
  }

  function removeImage(realIndex: number) {
    setImages(images.filter((_, i) => i !== realIndex));
  }

  function moveImage(realIndex: number, direction: -1 | 1) {
    const newIndex = realIndex + direction;
    if (newIndex < 0 || newIndex >= images.length) return;
    const next = [...images];
    [next[realIndex], next[newIndex]] = [next[newIndex], next[realIndex]];
    setImages(next);
  }

  // Map filtered items to their real index in the full array
  function getRealIndex(filteredIndex: number): number {
    const item = filtered[filteredIndex];
    return images.indexOf(item);
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <Label>Heading</Label>
        <RichTextEditor
          variant="compact"
          content={data.heading}
          onChange={(html) => onChange({ ...data, heading: html })}
        />
      </div>

      {/* Category Management */}
      <div className="space-y-3">
        <Label className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          Categories ({categories.length})
        </Label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-gold/10 text-brand-gold border border-brand-gold/20"
            >
              {cat}
              <button
                type="button"
                onClick={() => removeCategory(cat)}
                className="ml-0.5 hover:text-red-400 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
            placeholder="New category name..."
            className="flex-1"
          />
          <Button type="button" variant="outline" size="sm" onClick={addCategory} disabled={!newCategory.trim()}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Filter + Image List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Images ({filtered.length}{filterCategory !== "All" ? ` in ${filterCategory}` : ` total`})</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Filter:</span>
            <Select value={filterCategory} onValueChange={(v) => setFilterCategory(v ?? "All")}>
              <SelectTrigger className="w-[180px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat} ({images.filter((img) => img.category === cat).length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.map((img, fi) => {
          const ri = getRealIndex(fi);
          return (
            <div key={ri} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-1 justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  #{ri + 1} — {img.category || "Uncategorized"}
                </span>
                <div className="flex items-center gap-1">
                  <Button type="button" variant="ghost" size="sm" onClick={() => moveImage(ri, -1)} disabled={ri === 0}>
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => moveImage(ri, 1)} disabled={ri === images.length - 1}>
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeImage(ri)}>
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Image</Label>
                <ImageUpload
                  value={img.src}
                  onChange={(result) => {
                    if (typeof result === "string") {
                      updateImage(ri, { ...img, src: result });
                    } else {
                      updateImage(ri, {
                        ...img,
                        src: (result as UploadResult).url,
                        width: (result as UploadResult).width,
                        height: (result as UploadResult).height,
                      });
                    }
                  }}
                  placeholder="/uploads/project-photo.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Category</Label>
                  <Select
                    value={img.category || ""}
                    onValueChange={(v) => updateImage(ri, { ...img, category: v ?? "" })}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Sign Type</Label>
                  <RichTextEditor
                    variant="compact"
                    content={img.type ?? ""}
                    onChange={(html) => updateImage(ri, { ...img, type: html })}
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Alt Text</Label>
                <RichTextEditor
                  variant="full"
                  content={img.alt}
                  onChange={(html) => updateImage(ri, { ...img, alt: html })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Location</Label>
                  <Input
                    value={img.location ?? ""}
                    onChange={(e) => updateImage(ri, { ...img, location: e.target.value })}
                    placeholder="Miami, FL"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Turnaround</Label>
                  <Input
                    value={img.turnaround ?? ""}
                    onChange={(e) => updateImage(ri, { ...img, turnaround: e.target.value })}
                    placeholder="18 days"
                  />
                </div>
              </div>
            </div>
          );
        })}

        <Button type="button" variant="outline" size="sm" onClick={addImage}>
          <Plus className="h-3 w-3 mr-1" />
          Add Image{filterCategory !== "All" ? ` to ${filterCategory}` : ""}
        </Button>
      </div>
    </div>
  );
}
