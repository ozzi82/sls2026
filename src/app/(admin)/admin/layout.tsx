"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Toaster } from "sonner";
import {
  LayoutDashboard,
  Package,
  FileText,
  File,
  FilePlus,
  BarChart3,
  MousePointerClick,
  Cookie,
  LogOut,
  Users,
  User,
  ChevronDown,
  Image,
  ArrowRightLeft,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
};

const navSections: NavSection[] = [
  {
    title: "Main",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/content/products", label: "Product Pages", icon: Package },
      { href: "/admin/content/landing-pages", label: "Landing Pages", icon: FileText },
      { href: "/admin/content/static-pages", label: "Static Pages", icon: File },
      { href: "/admin/pages/new", label: "New Landing Page", icon: FilePlus },
      { href: "/admin/media", label: "Media Library", icon: Image },
    ],
  },
  {
    title: "Integrations",
    adminOnly: true,
    items: [
      { href: "/admin/integrations/google", label: "Google Analytics", icon: BarChart3 },
      { href: "/admin/integrations/openreplay", label: "Heatmap & Sessions", icon: MousePointerClick },
      { href: "/admin/integrations/cookie-consent", label: "Cookie Consent", icon: Cookie },
    ],
  },
  {
    title: "System",
    adminOnly: true,
    items: [
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/redirects", label: "Redirects", icon: ArrowRightLeft },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string; displayName: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser({
            username: data.user.username,
            role: data.user.role,
            displayName: data.user.displayName,
          });
        }
      })
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Don't show shell on login or setup page
  if (pathname === "/admin/login" || pathname === "/admin/setup") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  function isActive(item: NavItem): boolean {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  }

  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Sunlite Admin</h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <User className="h-4 w-4" />
            <span>{currentUser?.displayName || "User"}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <Link
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setUserDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
              >
                <span className="flex items-center gap-2">
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-53px)] p-4">
          <nav className="space-y-5">
            {navSections
              .filter((section) => !section.adminOnly || isAdmin)
              .map((section) => (
                <div key={section.title}>
                  <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {section.title}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item)
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
