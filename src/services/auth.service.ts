
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

interface LogoutResponse {
    success: boolean;
    message: string;
}

export const loginAdmin = async (
    credentials: LoginCredentials
): Promise<LoginResponse["data"]> => {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
    );

    const body = response.data;

    if (
        body?.success !== true ||
        !body?.data?.user?.id ||
        !body?.data?.user?.role
    ) {
        console.error("Unexpected login response:", body);

        throw new Error(
            "Invalid login response from server"
        );
    }

    return body.data;
};

export const getCurrentAdmin = async (): Promise<AdminUser> => {
    const response = await api.get<CurrentAdminResponse>(
        "/auth/me"
    );

    const body = response.data;

    if (
        body?.success !== true ||
        !body?.data?.user?.id
    ) {
        throw new Error("Invalid admin session");
    }

    return body.data.user;
};

export const logoutAdmin = async (): Promise<void> => {
    await api.post<LogoutResponse>("/auth/logout");
};
