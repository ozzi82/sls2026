"use client";

import type { MarqueeData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ListEditor from "./ListEditor";

interface MarqueeEditorProps {
  data: MarqueeData;
  onChange: (data: MarqueeData) => void;
}

export default function MarqueeEditor({ data, onChange }: MarqueeEditorProps) {
  return (
    <div className="space-y-4">
      <Label>Messages</Label>
      <ListEditor
        items={data.messages}
        onChange={(messages) => onChange({ ...data, messages })}
        createItem={() => ""}
        label="Message"
        renderItem={(item, _index, update) => (
          <Input
            value={item}
            onChange={(e) => update(e.target.value)}
            placeholder="Marquee message"
          />
        )}
      />
    </div>
  );
}
