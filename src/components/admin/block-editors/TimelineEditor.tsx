"use client";

import type { TimelineData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/admin/ImageUpload";
import ListEditor from "./ListEditor";
import RichTextEditor from "../RichTextEditor";

interface TimelineEditorProps {
  data: TimelineData;
  onChange: (data: TimelineData) => void;
}

export default function TimelineEditor({ data, onChange }: TimelineEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <RichTextEditor
          variant="compact"
          content={data.heading ?? ""}
          onChange={(html) => onChange({ ...data, heading: html })}
        />
      </div>
      <div>
        <Label>Entries</Label>
        <ListEditor
          items={data.entries}
          onChange={(entries) => onChange({ ...data, entries })}
          createItem={() => ({ step: data.entries.length + 1, title: "", text: "", image: "" })}
          label="Entry"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <Input
                type="number"
                value={item.step}
                onChange={(e) => update({ ...item, step: Number(e.target.value) })}
                placeholder="Step number"
              />
              <RichTextEditor
                variant="compact"
                content={item.title}
                onChange={(html) => update({ ...item, title: html })}
              />
              <RichTextEditor
                variant="full"
                content={item.text}
                onChange={(html) => update({ ...item, text: html })}
              />
              <ImageUpload
                value={item.image ?? ""}
                onChange={(result) => update({ ...item, image: typeof result === "string" ? result : result.url })}
                placeholder="Image URL"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
