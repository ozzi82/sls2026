"use client";

import type { ContactInfoData } from "@/lib/admin/page-config-types";
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

interface ContactInfoEditorProps {
  data: ContactInfoData;
  onChange: (data: ContactInfoData) => void;
}

export default function ContactInfoEditor({ data, onChange }: ContactInfoEditorProps) {
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
        <Label>Cards</Label>
        <ListEditor
          items={data.cards}
          onChange={(cards) => onChange({ ...data, cards })}
          createItem={() => ({ icon: "", title: "", value: "", note: "", href: "", description: "" })}
          label="Card"
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
              <Input
                value={item.value}
                onChange={(e) => update({ ...item, value: e.target.value })}
                placeholder="Value"
              />
              <Input
                value={item.note ?? ""}
                onChange={(e) => update({ ...item, note: e.target.value })}
                placeholder="Note"
              />
              <Input
                value={item.href ?? ""}
                onChange={(e) => update({ ...item, href: e.target.value })}
                placeholder="Link href"
              />
              <Input
                value={item.description ?? ""}
                onChange={(e) => update({ ...item, description: e.target.value })}
                placeholder="Description"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
