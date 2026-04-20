"use client";

import type { FeaturesGridData } from "@/lib/admin/page-config-types";
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
import RichTextEditor from "../RichTextEditor";

interface FeaturesGridEditorProps {
  data: FeaturesGridData;
  onChange: (data: FeaturesGridData) => void;
}

export default function FeaturesGridEditor({ data, onChange }: FeaturesGridEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <RichTextEditor
          variant="compact"
          content={data.heading}
          onChange={(html) => onChange({ ...data, heading: html })}
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
              <RichTextEditor
                variant="compact"
                content={item.title}
                onChange={(html) => update({ ...item, title: html })}
              />
              <RichTextEditor
                variant="full"
                content={item.description}
                onChange={(html) => update({ ...item, description: html })}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
