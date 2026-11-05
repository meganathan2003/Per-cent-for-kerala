
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Building2,
    ClipboardCheck,
    FileText,
    CreditCard,
    Megaphone,
    Settings,
    X,
    ShieldCheck,
    LogOut,
} from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navigation = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        roles: ["SUPER_ADMIN", "OPERATIONS", "SALES"],
    },
    {
        label: "Admin Management",
        href: "/admin/admins",
        icon: Users,
        roles: ["SUPER_ADMIN"],
    },
    {
        label: "Properties",
        href: "/admin/properties",
        icon: Building2,
        roles: ["SUPER_ADMIN", "OPERATIONS"],
    },
    {
        label: "Verification",
        href: "/admin/verification",
        icon: ClipboardCheck,
        roles: ["SUPER_ADMIN", "OPERATIONS"],
    },
    {
        label: "Quotations",
        href: "/admin/quotations",
        icon: FileText,
        roles: ["SUPER_ADMIN", "OPERATIONS"],
    },
    {
        label: "Payments",
        href: "/admin/payments",
        icon: CreditCard,
        roles: ["SUPER_ADMIN", "OPERATIONS"],
    },
    {
        label: "Campaigns",
        href: "/admin/campaigns",
        icon: Megaphone,
        roles: ["SUPER_ADMIN", "OPERATIONS"],
    },
    {
        label: "Payment Settings",
        href: "/admin/settings/payment",
        icon: Settings,
        roles: ["SUPER_ADMIN"],
    },
];

export default function AdminSidebar({
    isOpen,
    onClose,
}: AdminSidebarProps) {
    const pathname = usePathname();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const role = user?.role;

    const visibleNavigation = navigation.filter((item) =>
        role ? item.roles.includes(role) : false
    );

    const handleLogout = async () => {
        await logout();
    };

    const isActive = (href: string) => {
        if (href === "/admin/properties") {
            return (
                pathname === href ||
                pathname.startsWith("/admin/properties/")
            );
        }

        return pathname === href;
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-65 flex-col bg-[#172B35] text-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
            >
                {/* Brand */}
                <div className="flex h-19 shrink-0 items-center justify-between border-b border-white/10 px-6">
                    <Link
                        href="/admin/dashboard"
                        onClick={onClose}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D8B779] text-xl font-bold text-[#172B35]">
                            P
                        </div>

                        <div>
                            <p className="text-sm font-bold tracking-[0.16em]">
                                PER-CENT
                            </p>
                            <p className="mt-0.5 text-[9px] tracking-[0.3em] text-[#D8B779]">
                                KERALA
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                    <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        Workspace
                    </p>

                    <nav className="space-y-1.5">
                        {visibleNavigation.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${active
                                            ? "bg-[#D8B779] text-[#172B35] shadow-sm"
                                            : "text-white/65 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <Icon
                                        size={19}
                                        className={
                                            active
                                                ? "text-[#172B35]"
                                                : "text-white/50 transition group-hover:text-[#D8B779]"
                                        }
                                    />

                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom user section */}
                <div className="shrink-0 border-t border-white/10 p-4">
                    <div className="mb-3 flex items-center gap-3 rounded-lg bg-white/5 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D8B779] text-xs font-bold text-[#172B35]">
                            {user?.name
                                ?.trim()
                                .split(/\s+/)
                                .slice(0, 2)
                                .map((part) => part[0])
                                .join("")
                                .toUpperCase() ?? "AD"}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-white">
                                {user?.name ?? "Administrator"}
                            </p>
                            <p className="mt-1 truncate text-[10px] text-white/40">
                                {user?.role?.replace("_", " ") ?? "ADMIN"}
                            </p>
                        </div>

                        <ShieldCheck
                            size={16}
                            className="shrink-0 text-[#D8B779]"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/55 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut size={18} />
                        Sign out
                    </button>

                    <p className="mt-4 text-center text-[10px] text-white/25">
                        © 2026 Per-Cent Kerala
                    </p>
                </div>
            </aside>
        </>
    );
}
