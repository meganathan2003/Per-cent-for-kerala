export type AdminRole = "SUPER_ADMIN" | "OPERATIONS" | "SALES";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: AdminRole;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: AdminUser;
}