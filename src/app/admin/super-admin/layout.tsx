
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

  const initializeAuth = useAuthStore(
    (state) => state.initializeAuth
  );

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const isInitialized = useAuthStore(
    (state) => state.isInitialized
  );

  const logout = useAuthStore((state) => state.logout);

  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Restore session and validate Super Admin role.
  useEffect(() => {
    let active = true;

    const checkAuthentication = async () => {
      try {
        const currentState = useAuthStore.getState();

        if (!currentState.isInitialized) {
          await initializeAuth();
        }

        if (!active) return;

        const state = useAuthStore.getState();

        if (!state.isAuthenticated || !state.user) {
          router.replace("/admin/login");
          return;
        }

        if (state.user.role !== "SUPER_ADMIN") {
          if (state.user.role === "OPERATIONS") {
            router.replace(
              "/admin/operations/dashboard"
            );
          } else {
            router.replace("/admin/login");
          }

          return;
        }

        setChecking(false);
      } catch (error) {
        console.error(
          "Super Admin authentication failed:",
          error
        );

        if (active) {
          router.replace("/admin/login");
        }
      }
    };

    void checkAuthentication();

    return () => {
      active = false;
    };
  }, [initializeAuth, router]);

  // Close mobile sidebar after navigation.
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
  };

  if (
    checking ||
    !isInitialized ||
    !isAuthenticated ||
    user?.role !== "SUPER_ADMIN"
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
        Checking access...
      </div>
    );
  }

  const current = navigation.find(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(item.href + "/")
  );

  const pageTitle = current?.label ?? "Admin";

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#172B35] text-white transition-transform lg:translate-x-0 ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/admin/super-admin/dashboard"
            className="font-bold tracking-widest"
          >
            PER-CENT{" "}
            <span className="text-[#D8B779]">
              KERALA
            </span>
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

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
                aria-current={
                  active ? "page" : undefined
                }
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

        <div className="border-t border-white/10 p-4 text-sm text-white/60">
          <p>{user?.name}</p>

          <div className="mt-1 text-xs">
            {user?.role?.replace("_", " ")}
          </div>

          <button
            onClick={() => void handleLogout()}
            className="mt-4 w-full rounded-lg border border-white/15 px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
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

        <div className="hidden lg:block">
          <AdminHeader
            title={pageTitle}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
