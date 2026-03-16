"use client";

import type { FeaturesGridData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAvailableIconNames } from "@/lib/admin/icon-map";
import ListEditor from "./ListEditor";

interface FeaturesGridEditorProps {
  data: FeaturesGridData;
  onChange: (data: FeaturesGridData) => void;
}

export default function FeaturesGridEditor({ data, onChange }: FeaturesGridEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="Section heading"
        />
      </div>
      <div>
        <Label>Items</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ({ icon: "", title: "", description: "" })}
          label="Feature"
          renderItem={(item, _index, update) => (
            <div className="space-y-2">
              <Select
                value={item.icon}
                onValueChange={(v) => update({ ...item, icon: v ?? "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon..." />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableIconNames().map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={item.title}
                onChange={(e) => update({ ...item, title: e.target.value })}
                placeholder="Feature title"
              />
              <Textarea
                value={item.description}
                onChange={(e) => update({ ...item, description: e.target.value })}
                placeholder="Feature description"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
