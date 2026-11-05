
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Menu,
    Bell,
    ChevronDown,
    LogOut,
    UserRound,
    ShieldCheck,
} from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";

interface AdminHeaderProps {
    title: string;
    onMenuClick: () => void;
}

const roleLabels: Record<string, string> = {
    SUPER_ADMIN: "Super Admin",
    OPERATIONS: "Operations",
    SALES: "Sales",
};

export default function AdminHeader({
    title,
    onMenuClick,
}: AdminHeaderProps) {
    const router = useRouter();

    const [profileOpen, setProfileOpen] = useState(false);

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const initials = user?.name
        ? user.name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase()
        : "AD";

    const role = user?.role
        ? roleLabels[user.role] ?? user.role
        : "Administrator";

    return (
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
            {/* Left section */}
            <div className="flex min-w-0 items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#172B35] transition hover:bg-gray-100 lg:hidden"
                >
                    <Menu size={22} />
                </button>

                <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-[#172B35] sm:text-xl">
                        {title}
                    </p>
                    <p className="hidden text-xs text-gray-400 sm:block">
                        Per-Cent Kerala / Admin Console
                    </p>
                </div>
            </div>

            {/* Right section */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                {/* Notifications - UI placeholder */}
                <button
                    type="button"
                    aria-label="Notifications"
                    title="Notifications"
                    className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[#172B35]"
                >
                    <Bell size={20} />
                </button>

                <div className="h-8 w-px bg-gray-200" />

                {/* Profile dropdown */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        aria-expanded={profileOpen}
                        aria-label="Open profile menu"
                        className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-50 sm:gap-3"
                    >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#172B35] text-xs font-semibold text-[#D8B779]">
                            {initials}
                        </div>

                        <div className="hidden min-w-0 text-left sm:block">
                            <p className="max-w-[140px] truncate text-sm font-semibold text-[#172B35]">
                                {user?.name ?? "Administrator"}
                            </p>
                            <p className="text-xs text-gray-400">
                                {role}
                            </p>
                        </div>

                        <ChevronDown
                            size={16}
                            className={`hidden text-gray-400 transition sm:block ${profileOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {profileOpen && (
                        <>
                            {/* Outside click layer */}
                            <button
                                type="button"
                                aria-label="Close profile menu"
                                className="fixed inset-0 z-40 cursor-default"
                                onClick={() => setProfileOpen(false)}
                            />

                            <div className="absolute right-0 top-full z-50 mt-3 w-[min(280px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                                <div className="border-b border-gray-100 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#172B35] text-sm font-semibold text-[#D8B779]">
                                            {initials}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-[#172B35]">
                                                {user?.name ?? "Administrator"}
                                            </p>
                                            <p className="truncate text-xs text-gray-500">
                                                {user?.email ?? ""}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#D8B779]/15 px-3 py-1.5 text-xs font-medium text-[#80652F]">
                                        <ShieldCheck size={14} />
                                        {role}
                                    </div>
                                </div>

                                <div className="p-2">
                                    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500">
                                        <UserRound size={17} />
                                        <span>Signed in as {role}</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        <LogOut size={17} />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
