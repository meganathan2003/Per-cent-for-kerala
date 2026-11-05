
import { create } from "zustand";

import type { AdminUser } from "@/types/admin";

import {
    loginAdmin,
    logoutAdmin,
    getCurrentAdmin,
} from "@/services/auth.service";

interface AuthState {
    user: AdminUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;

    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,

    login: async (email, password) => {
        set({
            isLoading: true,
        });

        try {
            const result = await loginAdmin({
                email,
                password,
            });

            const user = result.user;

            if (
                !user ||
                !user.id ||
                !["SUPER_ADMIN", "OPERATIONS"].includes(user.role)
            ) {
                throw new Error(
                    "This account does not have admin portal access."
                );
            }

            set({
                user,
                isAuthenticated: true,
                isLoading: false,
                isInitialized: true,
            });
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isInitialized: true,
            });

            throw error;
        }
    },

    logout: async () => {
        set({
            isLoading: true,
        });

        try {
            await logoutAdmin();
        } catch (error) {
            console.error("Logout API failed:", error);
        } finally {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isInitialized: true,
            });

            if (typeof window !== "undefined") {
                window.location.href = "/admin/login";
            }
        }
    },

    initializeAuth: async () => {
        set({
            isLoading: true,
        });

        try {
            const user = await getCurrentAdmin();

            if (
                !user ||
                !user.id ||
                !["SUPER_ADMIN", "OPERATIONS"].includes(user.role)
            ) {
                throw new Error("Invalid admin session");
            }

            set({
                user,
                isAuthenticated: true,
                isLoading: false,
                isInitialized: true,
            });
        } catch {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isInitialized: true,
            });
        }
    },
}));
