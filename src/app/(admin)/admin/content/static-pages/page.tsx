"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ExternalLink } from "lucide-react";

interface PageConfigSummary {
  slug: string;
  fileSlug: string;
  label: string;
  route: string;
  blockCount: number;
  hiddenBlocks: number;
}

export default function StaticPagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<PageConfigSummary[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/static-pages")
      .then((r) => r.json())
      .then((data) => setPages(data.pages))
      .finally(() => setLoading(false));
  }, []);

  const filtered = pages.filter(
    (page) =>
      !search ||
      `${page.label} ${page.slug} ${page.route}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading pages...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Static Pages</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search static pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No static pages found.</p>
      ) : (
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Name</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Blocks</TableHead>
                <TableHead>Hidden</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((page) => (
                <TableRow
                  key={page.slug}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => router.push(`/admin/static/${page.fileSlug}`)}
                >
                  <TableCell className="font-medium">{page.label}</TableCell>
                  <TableCell className="text-gray-500 font-mono text-sm">
                    {page.route}
                  </TableCell>
                  <TableCell>{page.blockCount}</TableCell>
                  <TableCell>
                    {page.hiddenBlocks > 0 ? (
                      <span className="text-amber-600">{page.hiddenBlocks} hidden</span>
                    ) : (
                      <span className="text-green-600">All visible</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={page.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="text-sm text-gray-400 mt-4">
        {filtered.length} of {pages.length} pages
      </p>
    </div>
  );
}
