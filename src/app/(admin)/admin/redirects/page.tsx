"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Redirect {
  id: string;
  from: string;
  to: string;
  permanent: boolean;
}

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ from: "", to: "", permanent: true });

  const fetchRedirects = useCallback(async () => {
    const res = await fetch("/api/admin/redirects");
    const data = await res.json();
    setRedirects(data.redirects || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchRedirects(); }, [fetchRedirects]);

  function resetForm() {
    setFormData({ from: "", to: "", permanent: true });
    setShowForm(false);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch("/api/admin/redirects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Failed to save redirect");
        return;
      }

      toast.success(editingId ? "Redirect updated" : "Redirect added");
      resetForm();
      fetchRedirects();
    } catch {
      toast.error("Network error");
    }
  }

  async function handleDelete(id: string, from: string) {
    if (!confirm(`Delete redirect from "${from}"?`)) return;

    const res = await fetch("/api/admin/redirects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Redirect deleted");
    fetchRedirects();
  }

  function startEdit(r: Redirect) {
    setFormData({ from: r.from, to: r.to, permanent: r.permanent });
    setEditingId(r.id);
    setShowForm(true);
  }

  if (loading) return <p className="text-gray-500">Loading redirects...</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Redirects</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage 301/302 redirects. Changes take effect on next page load.
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Redirect
          </Button>
        )}
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Redirect" : "Add Redirect"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From Path</Label>
                <Input
                  id="from"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  placeholder="/old-page"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">To Path / URL</Label>
                <Input
                  id="to"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  placeholder="/new-page"
                  required
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={formData.permanent}
                onChange={(e) => setFormData({ ...formData, permanent: e.target.checked })}
                className="rounded border-gray-300"
              />
              Permanent redirect (301) — uncheck for temporary (302)
            </label>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update" : "Add"}</Button>
              <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {redirects.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <ArrowRight className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No redirects configured</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">From</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">To</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {redirects.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-mono text-gray-900">{r.from}</td>
                  <td className="px-4 py-3 font-mono text-gray-700">{r.to}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      r.permanent
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {r.permanent ? "301" : "302"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => startEdit(r)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(r.id, r.from)}>
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
