
"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";
import AdminHeader from "@/components/admin/layout/admin-header";

const navigation = [
  { label: "Dashboard", href: "/admin/operations/dashboard" },
  { label: "Properties", href: "/admin/operations/properties" },
  { label: "Quotations", href: "/admin/operations/quotations" },
  { label: "Payments", href: "/admin/operations/payments" },
  { label: "Campaigns", href: "/admin/operations/campaigns" },
];

export default function RoleLayout({
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
  const [loggingOut, setLoggingOut] = useState(false);

  // Authentication and role verification.
  useEffect(() => {
    let active = true;

    const checkAuthentication = async () => {
      try {
        const currentState = useAuthStore.getState();

        // On page refresh, Zustand starts uninitialized.
        // Restore the session using the HttpOnly cookie.
        if (!currentState.isInitialized) {
          await initializeAuth();
        }

        if (!active) return;

        const state = useAuthStore.getState();

        if (!state.isAuthenticated || !state.user) {
          router.replace("/admin/login");
          return;
        }

        if (state.user.role !== "OPERATIONS") {
          if (state.user.role === "SUPER_ADMIN") {
            router.replace(
              "/admin/super-admin/dashboard"
            );
          } else {
            router.replace("/admin/login");
          }

          return;
        }

        setChecking(false);
      } catch (error) {
        console.error(
          "Operations authentication failed:",
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

  // Close mobile sidebar when navigating.
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    await logout();
  };

  if (
    checking ||
    !isInitialized ||
    !isAuthenticated ||
    user?.role !== "OPERATIONS"
  ) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#F7F8FA]">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#8A6A32] border-t-transparent" />

        <p className="text-sm font-medium text-gray-500">
          Checking access...
        </p>
      </div>
    );
  }

  const current = navigation.find(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(item.href + "/")
  );

  const pageTitle = current?.label ?? "Operations";

  const SidebarContent = () => (
    <>
      <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
        <Link
          href="/admin/operations/dashboard"
          className="font-bold tracking-widest"
        >
          PER-CENT{" "}
          <span className="text-[#D8B779]">
            KERALA
          </span>
        </Link>

        <button
          className="rounded-lg p-1 hover:bg-white/10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <X size={21} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs uppercase tracking-widest text-white/40">
          Operations Workspace
        </p>

        {navigation.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`block rounded-lg px-3 py-3 text-sm transition-colors ${active
                  ? "bg-[#D8B779] font-semibold text-[#172B35]"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="truncate text-sm font-semibold text-white">
          {user?.name ?? "Operations Admin"}
        </p>

        <p className="mt-1 text-xs text-white/50">
          Operations Admin
        </p>

        <button
          onClick={() => void handleLogout()}
          disabled={loggingOut}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loggingOut && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          )}

          {loggingOut ? "Signing out..." : "Logout"}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] flex-col bg-[#172B35] text-white lg:flex">
        <SidebarContent />
      </aside>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#172B35] text-white transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <SidebarContent />
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
        <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-[#172B35] hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>

          <span className="py-3 text-sm font-semibold text-[#172B35]">
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
