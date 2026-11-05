
import { create } from "zustand";

import type { AdminUser } from "@/types/admin";
import { loginAdmin, logoutAdmin } from "@/services/auth.service";

interface AuthState {
    user: AdminUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true });

        try {
            const result = await loginAdmin({ email, password });

            localStorage.setItem("admin_token", result.token);
            localStorage.setItem(
                "admin_user",
                JSON.stringify(result.user)
            );

            set({
                user: result.user,
                token: result.token,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        try {
            await logoutAdmin();
        } finally {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");

            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });

            window.location.href = "/admin/login";
        }
    },

    initializeAuth: () => {
        const token = localStorage.getItem("admin_token");
        const storedUser = localStorage.getItem("admin_user");

        if (!token || !storedUser) {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");

            set({
                user: null,
                token: null,
                isAuthenticated: false,
            });

            return;
        }

        try {
            const user = JSON.parse(storedUser) as AdminUser;

            if (
                !user ||
                typeof user !== "object" ||
                !user.id ||
                !user.role
            ) {
                throw new Error("Invalid stored admin user");
            }

            if (
                user.role !== "SUPER_ADMIN" &&
                user.role !== "OPERATIONS"
            ) {
                throw new Error("Invalid admin role");
            }

            set({
                user,
                token,
                isAuthenticated: true,
            });
        } catch {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_user");

            set({
                user: null,
                token: null,
                isAuthenticated: false,
            });
        }
    },
}));
