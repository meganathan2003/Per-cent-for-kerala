
"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";
import AdminHeader from "@/components/admin/layout/admin-header";

const navigation = [
  { label: "Dashboard", href: "/admin/super-admin/dashboard" },
  { label: "Admin Management", href: "/admin/super-admin/admins" },
  { label: "Properties", href: "/admin/super-admin/properties" },
  { label: "Quotations", href: "/admin/super-admin/quotations" },
  { label: "Payments", href: "/admin/super-admin/payments" },
  { label: "Campaigns", href: "/admin/super-admin/campaigns" },
  {
    label: "Payment Settings",
    href: "/admin/super-admin/settings/payment",
  },
];

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const user = useAuthStore((state) => state.user);

  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize authentication and validate role
  useEffect(() => {
    let active = true;

    const checkAuthentication = async () => {
      try {
        await initializeAuth();

        if (!active) return;

        const state = useAuthStore.getState();

        // User is not authenticated
        if (!state.isAuthenticated || !state.token) {
          router.replace("/admin/login");
          return;
        }

        // Operations user cannot access Super Admin pages
        if (state.user?.role !== "SUPER_ADMIN") {
          if (state.user?.role === "OPERATIONS") {
            router.replace("/admin/operations/dashboard");
          } else {
            router.replace("/admin/login");
          }
          return;
        }

        // Authorized Super Admin
        setChecking(false);
      } catch {
        router.replace("/admin/login");
      }
    };

    void checkAuthentication();

    return () => {
      active = false;
    };
  }, [initializeAuth, router]);

  // Close mobile sidebar when navigating
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent rendering protected content while checking access
  if (checking || user?.role !== "SUPER_ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Checking access...
      </div>
    );
  }

  const current = navigation.find(
    (item) =>
      pathname === item.href || pathname.startsWith(item.href + "/")
  );

  const pageTitle = current?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-[#F7F8FA]">

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#172B35] text-white transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/admin/super-admin/dashboard"
            className="font-bold tracking-widest"
          >
            PER-CENT{" "}
            <span className="text-[#D8B779]">KERALA</span>
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-3 px-3 text-xs uppercase tracking-widest text-white/40">
            Workspace
          </p>

          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-3 text-sm transition-colors ${active
                    ? "bg-[#D8B779] font-semibold text-[#172B35]"
                    : "text-white/75 hover:bg-white/10"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logged-in user */}
        <div className="border-t border-white/10 p-4 text-sm text-white/60">
          {user?.name}

          <div className="mt-1 text-xs">
            {user?.role?.replace("_", " ")}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="min-h-screen lg:pl-[260px]">

        {/* Mobile header */}
        <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          <span className="py-3 text-sm font-semibold">
            {pageTitle}
          </span>
        </div>

        {/* Desktop header */}
        <div className="hidden lg:block">
          <AdminHeader
            title={pageTitle}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
