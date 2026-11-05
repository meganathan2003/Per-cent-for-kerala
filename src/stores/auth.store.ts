
import { create } from "zustand";

import type { AdminUser } from "@/types/admin";

import {
    loginAdmin,
    logoutAdmin,
    getCurrentAdmin,
} from "@/services/auth.service";


let initializationPromise: Promise<void> | null = null;



interface AuthState {
    user: AdminUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;

    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}

const ALLOWED_ROLES = ["SUPER_ADMIN", "OPERATIONS"];

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,

    // Login using the backend API.
    login: async (email, password) => {
        set({ isLoading: true });

        try {
            const result = await loginAdmin({
                email,
                password,
            });

            const user = result.user;

            if (
                !user?.id ||
                !ALLOWED_ROLES.includes(user.role)
            ) {
                throw new Error(
                    "This account does not have admin portal access."
                );
            }

            // Login API already returned the authenticated user.
            // No need to call /auth/me immediately after login.
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

    // Logout and clear the server-side cookie.
    logout: async () => {
        set({ isLoading: true });

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
                window.location.replace("/admin/login");
            }
        }
    },

    // Restore the session after a page refresh.

    initializeAuth: () => {
        if (initializationPromise) {
            return initializationPromise;
        }

        initializationPromise = (async () => {
            set({ isLoading: true });

            try {
                const user = await getCurrentAdmin();

                if (
                    !user?.id ||
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
            } catch (error) {
                console.error("Session initialization failed:", error);

                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                    isInitialized: true,
                });
            } finally {
                initializationPromise = null;
            }
        })();

        return initializationPromise;
    },

}));
