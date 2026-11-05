
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";
import { useAuthStore } from "@/stores/auth.store";

interface AdminShellProps {
    children: React.ReactNode;
}

const pageTitles: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/admins": "Admin Management",
    "/admin/properties": "Properties",
    "/admin/verification": "Property Verification",
    "/admin/quotations": "Quotations",
    "/admin/payments": "Payments",
    "/admin/campaigns": "Campaign Management",
    "/admin/settings/payment": "Payment Settings",
};

export default function AdminShell({
    children,
}: AdminShellProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const initializeAuth = useAuthStore(
        (state) => state.initializeAuth
    );

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        let active = true;

        const checkAuthentication = async () => {
            if (isLoginPage) {
                setIsCheckingAuth(false);
                return;
            }

            setIsCheckingAuth(true);

            try {
                const currentState = useAuthStore.getState();

                // Restore session after browser refresh.
                if (!currentState.isInitialized) {
                    await initializeAuth();
                }

                if (!active) return;

                // Read the latest Zustand state after initialization.
                const authState = useAuthStore.getState();

                if (
                    !authState.isAuthenticated ||
                    !authState.user
                ) {
                    router.replace("/admin/login");
                    return;
                }

                setIsCheckingAuth(false);
            } catch (error) {
                console.error(
                    "Admin authentication check failed:",
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
    }, [isLoginPage, initializeAuth, router]);

    // Reset sidebar when navigating.
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Login page does not need the admin shell.
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Prevent protected content from flashing before auth verification.
    if (isCheckingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#172B35]/15 border-t-[#172B35]" />

                    <p className="text-sm text-gray-500">
                        Checking authentication...
                    </p>
                </div>
            </div>
        );
    }

    const title =
        pageTitles[pathname] ??
        (pathname.startsWith("/admin/properties/")
            ? "Property Details"
            : "Admin");

    return (
        <div className="min-h-screen bg-[#F7F8FA]">
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="min-h-screen lg:pl-[260px]">
                <AdminHeader
                    title={title}
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="min-h-[calc(100vh-76px)] p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-[1600px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
