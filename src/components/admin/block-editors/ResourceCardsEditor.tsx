"use client";

import type { ResourceCardsData } from "@/lib/admin/page-config-types";
import { Input } from "@/components/ui/input";
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

interface ResourceCardsEditorProps {
  data: ResourceCardsData;
  onChange: (data: ResourceCardsData) => void;
}

export default function ResourceCardsEditor({ data, onChange }: ResourceCardsEditorProps) {
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
