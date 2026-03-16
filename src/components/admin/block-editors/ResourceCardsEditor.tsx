"use client";

import type { ResourceCardsData } from "@/lib/admin/page-config-types";
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

interface ResourceCardsEditorProps {
  data: ResourceCardsData;
  onChange: (data: ResourceCardsData) => void;
}

export default function ResourceCardsEditor({ data, onChange }: ResourceCardsEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={data.heading ?? ""}
          onChange={(e) => onChange({ ...data, heading: e.target.value })}
          placeholder="Section heading"
        />
      </div>
      <div>
        <Label>Resources</Label>
        <ListEditor
          items={data.items}
          onChange={(items) => onChange({ ...data, items })}
          createItem={() => ({ icon: "", title: "", description: "", href: "" })}
          label="Resource"
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
                placeholder="Title"
              />
              <Textarea
                value={item.description}
                onChange={(e) => update({ ...item, description: e.target.value })}
                placeholder="Description"
              />
              <Input
                value={item.href}
                onChange={(e) => update({ ...item, href: e.target.value })}
                placeholder="Link href"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
