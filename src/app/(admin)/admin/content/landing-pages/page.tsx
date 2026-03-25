"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Trash2, ExternalLink } from "lucide-react";

interface LandingPageSummary {
  slug: string;
  hubSlug: string;
  hubName: string;
  h1: string;
  h1Highlight: string;
  primaryKeyword: string;
}

interface Hub {
  slug: string;
  name: string;
}

export default function LandingPagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<LandingPageSummary[]>([]);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [search, setSearch] = useState("");
  const [hubFilter, setHubFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then((data) => {
        setPages(data.pages);
        setHubs(data.hubs);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = pages.filter((page) => {
    const matchesSearch =
      !search ||
      `${page.h1} ${page.h1Highlight} ${page.slug} ${page.primaryKeyword}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesHub = hubFilter === "all" || page.hubSlug === hubFilter;
    return matchesSearch && matchesHub;
  });

  async function handleDelete(slug: string) {
    if (!confirm(`Delete landing page "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setPages((prev) => prev.filter((p) => p.slug !== slug));
      }
    } finally {
      setDeleting(null);
    }
  }

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
        <h1 className="text-2xl font-bold text-gray-900">Landing Pages</h1>
        <Button onClick={() => router.push("/admin/pages/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Landing Page
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search landing pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={hubFilter} onValueChange={(v) => setHubFilter(v || "all")}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Hubs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Hubs</SelectItem>
            {hubs.map((hub) => (
              <SelectItem key={hub.slug} value={hub.slug}>
                {hub.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No landing pages found.</p>
      ) : (
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Hub</TableHead>
                <TableHead>Primary Keyword</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((page) => (
                <TableRow
                  key={page.slug}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => router.push(`/admin/pages/${page.slug}`)}
                >
                  <TableCell className="font-medium">
                    {page.h1} {page.h1Highlight}
                  </TableCell>
                  <TableCell>{page.hubName}</TableCell>
                  <TableCell>{page.primaryKeyword}</TableCell>
                  <TableCell className="text-gray-500 font-mono text-sm">
                    {page.slug}
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={`/signs/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(page.slug)}
                        disabled={deleting === page.slug}
                        className="text-gray-400 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
