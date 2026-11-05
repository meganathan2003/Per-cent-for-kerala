
import api from "@/lib/api";
import type { AdminUser } from "@/types/admin";

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: AdminUser;
        expiresIn: string;
    };
}

interface CurrentAdminResponse {
    success: boolean;
    message: string;
    data: {
        user: AdminUser;
    };
}

export const loginAdmin = async (
    credentials: LoginCredentials
): Promise<LoginResponse["data"]> => {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
    );

    const result = response.data?.data;

    if (!response.data?.success || !result?.user) {
        throw new Error("Invalid login response from server");
    }

    return result;
};

export const getCurrentAdmin = async (): Promise<AdminUser> => {
    const response = await api.get<CurrentAdminResponse>("/auth/me");

    const user = response.data?.data?.user;

    if (!response.data?.success || !user) {
        throw new Error("Invalid admin session");
    }

    return user;
};

export const logoutAdmin = async (): Promise<void> => {
    await api.post("/auth/logout");
};
