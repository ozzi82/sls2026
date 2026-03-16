"use client";

import type { TimelineData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ListEditor from "./ListEditor";

interface TimelineEditorProps {
  data: TimelineData;
  onChange: (data: TimelineData) => void;
}

export default function TimelineEditor({ data, onChange }: TimelineEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading ?? ""}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="Timeline heading"
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
              <Input
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Title"
              />
              <Textarea
                value={item.text}
                onChange={(e) => update({ ...item, text: e.target.value })}
                placeholder="Text"
              />
              <Input
                value={item.image ?? ""}
                onChange={(e) => update({ ...item, image: e.target.value })}
                placeholder="Image URL"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
