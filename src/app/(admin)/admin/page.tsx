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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Trash2, ExternalLink } from "lucide-react";

// Landing page types (existing)
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

// Product/static page types (new)
interface PageConfigSummary {
  slug: string;
  label: string;
  route: string;
  blockCount: number;
  hiddenBlocks: number;
}

export default function AdminDashboard() {
  const router = useRouter();

  // Landing pages state
  const [landingPages, setLandingPages] = useState<LandingPageSummary[]>([]);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [landingSearch, setLandingSearch] = useState("");
  const [hubFilter, setHubFilter] = useState("all");

  // Product pages state
  const [productPages, setProductPages] = useState<PageConfigSummary[]>([]);
  const [productSearch, setProductSearch] = useState("");

  // Static pages state
  const [staticPages, setStaticPages] = useState<PageConfigSummary[]>([]);
  const [staticSearch, setStaticSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/pages").then((r) => r.json()),
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/static-pages").then((r) => r.json()),
    ])
      .then(([landingData, productData, staticData]) => {
        setLandingPages(landingData.pages);
        setHubs(landingData.hubs);
        setProductPages(productData.pages);
        setStaticPages(staticData.pages);
      })
      .finally(() => setLoading(false));
  }, []);

  // Landing page filters
  const filteredLanding = landingPages.filter((page) => {
    const matchesSearch =
      !landingSearch ||
      `${page.h1} ${page.h1Highlight} ${page.slug} ${page.primaryKeyword}`
        .toLowerCase()
        .includes(landingSearch.toLowerCase());
    const matchesHub = hubFilter === "all" || page.hubSlug === hubFilter;
    return matchesSearch && matchesHub;
  });

  // Product page filters
  const filteredProducts = productPages.filter(
    (page) =>
      !productSearch ||
      `${page.label} ${page.slug} ${page.route}`
        .toLowerCase()
        .includes(productSearch.toLowerCase())
  );

  // Static page filters
  const filteredStatic = staticPages.filter(
    (page) =>
      !staticSearch ||
      `${page.label} ${page.slug} ${page.route}`
        .toLowerCase()
        .includes(staticSearch.toLowerCase())
  );

  async function handleDeleteLanding(slug: string) {
    if (!confirm(`Delete landing page "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setLandingPages((prev) => prev.filter((p) => p.slug !== slug));
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
        <h2 className="text-2xl font-bold text-gray-900">Page Management</h2>
        <Button onClick={() => router.push("/admin/pages/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Landing Page
        </Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-6">
          <TabsTrigger value="products">
            Product Pages ({productPages.length})
          </TabsTrigger>
          <TabsTrigger value="landing">
            Landing Pages ({landingPages.length})
          </TabsTrigger>
          <TabsTrigger value="static">
            Static Pages ({staticPages.length})
          </TabsTrigger>
        </TabsList>

        {/* ═══ PRODUCT PAGES TAB ═══ */}
        <TabsContent value="products">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search product pages..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No product pages found.</p>
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
                  {filteredProducts.map((page) => (
                    <TableRow
                      key={page.slug}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        const fileSlug = page.slug.replace(/^\//, "").replace(/\//g, "--");
                        router.push(`/admin/products/${fileSlug}`);
                      }}
                    >
                      <TableCell className="font-medium">{page.label}</TableCell>
                      <TableCell className="text-gray-500 font-mono text-sm">{page.route}</TableCell>
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
            {filteredProducts.length} of {productPages.length} pages
          </p>
        </TabsContent>

        {/* ═══ LANDING PAGES TAB ═══ */}
        <TabsContent value="landing">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search landing pages..."
                value={landingSearch}
                onChange={(e) => setLandingSearch(e.target.value)}
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

          {filteredLanding.length === 0 ? (
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
                  {filteredLanding.map((page) => (
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
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`/signs/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDeleteLanding(page.slug)}
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
            {filteredLanding.length} of {landingPages.length} pages
          </p>
        </TabsContent>

        {/* ═══ STATIC PAGES TAB ═══ */}
        <TabsContent value="static">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search static pages..."
                value={staticSearch}
                onChange={(e) => setStaticSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredStatic.length === 0 ? (
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
                  {filteredStatic.map((page) => (
                    <TableRow
                      key={page.slug}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        const fileSlug = page.slug.replace(/^\//, "").replace(/\//g, "--");
                        router.push(`/admin/static/${fileSlug}`);
                      }}
                    >
                      <TableCell className="font-medium">{page.label}</TableCell>
                      <TableCell className="text-gray-500 font-mono text-sm">{page.route}</TableCell>
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
            {filteredStatic.length} of {staticPages.length} pages
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
