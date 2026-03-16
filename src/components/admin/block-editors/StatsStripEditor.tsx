"use client";

import type { StatsStripData } from "@/lib/admin/page-config-types";
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

interface StatsStripEditorProps {
  data: StatsStripData;
  onChange: (data: StatsStripData) => void;
}

export default function StatsStripEditor({ data, onChange }: StatsStripEditorProps) {
  return (
    <div className="space-y-4">
      <Label>Stats</Label>
      <ListEditor
        items={data.items}
        onChange={(items) => onChange({ ...data, items })}
        createItem={() => ({ icon: "", label: "", sublabel: "" })}
        label="Stat"
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
              value={item.label}
              onChange={(e) => update({ ...item, label: e.target.value })}
              placeholder="Label"
            />
            <Input
              value={item.sublabel ?? ""}
              onChange={(e) => update({ ...item, sublabel: e.target.value })}
              placeholder="Sublabel"
            />
          </div>
        )}
      />
    </div>
  );
}
