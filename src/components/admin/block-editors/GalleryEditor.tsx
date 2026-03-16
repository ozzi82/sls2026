"use client";

import type { GalleryData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ListEditor from "./ListEditor";

interface GalleryEditorProps {
  data: GalleryData;
  onChange: (data: GalleryData) => void;
}

export default function GalleryEditor({ data, onChange }: GalleryEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="Gallery heading"
        />
      </div>
      <div>
        <Label>Images</Label>
        <ListEditor
          items={data.images}
          onChange={(images) => onChange({ ...data, images })}
          createItem={() => ({ src: "", alt: "" })}
          label="Image"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <Input
                value={item.src}
                onChange={(e) => update({ ...item, src: e.target.value })}
                placeholder="Image URL"
              />
              <Input
                value={item.alt}
                onChange={(e) => update({ ...item, alt: e.target.value })}
                placeholder="Alt text"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
