import api from "../lib/api";
import type {
    AdminUser,
    LoginCredentials,
    LoginResponse,
} from "@/types/admin";

interface BackendLoginResponse {
    success: boolean;
    message?: string;
    data: {
        token?: string;
        accessToken?: string;
        user?: AdminUser;
        admin?: AdminUser;
    };
}

export async function loginAdmin(
    credentials: LoginCredentials
): Promise<LoginResponse> {
    const response = await api.post<BackendLoginResponse>(
        "/auth/login",
        credentials
    );

    // Handle backend response here
    const result = response.data.data;

    const token = result.token ?? result.accessToken;
    const user = result.user ?? result.admin;

    if (!token || !user) {
        throw new Error("Invalid login response from server");
    }

    return {
        token,
        user,
    };
}
export async function logoutAdmin() {
    // Current backend has no logout endpoint.
    // Remove the locally stored session.
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
}