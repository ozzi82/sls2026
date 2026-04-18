"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileArchive } from "lucide-react";
import { toast } from "sonner";

export default function BackupPage() {
  const [downloading, setDownloading] = useState(false);

  async function handleBackup() {
    setDownloading(true);
    try {
      const res = await fetch("/api/admin/backup");
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Backup failed");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = res.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/"/g, "") || "sunlite-backup.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Backup downloaded");
    } catch {
      toast.error("Backup failed");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Backup & Export</h1>
      <p className="text-sm text-gray-500 mb-8">
        Download a ZIP file containing all your content and uploaded images.
      </p>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <FileArchive className="h-10 w-10 text-gray-400 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Full Backup</h2>
            <p className="text-sm text-gray-500 mb-4">
              Includes all pages, products, landing pages, site settings, user accounts, redirects, and uploaded images.
            </p>
            <Button onClick={handleBackup} disabled={downloading}>
              <Download className="h-4 w-4 mr-2" />
              {downloading ? "Preparing backup..." : "Download Backup"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
