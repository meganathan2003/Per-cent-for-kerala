
import axios from "axios";

const BASE_URL = (
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PROD
        : process.env.NEXT_PUBLIC_API_URL_LOCAL
)?.replace(/\/+$/, "");

if (!BASE_URL) {
    throw new Error("API URL is not configured");
}

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers.delete("Content-Type");
    } else if (config.data !== undefined) {
        config.headers.set("Content-Type", "application/json");
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined") {
            const status = error.response?.status;
            const isLoginPage = window.location.pathname === "/admin/login";
            const isLoginRequest = error.config?.url?.includes("/auth/login");
            const isMeRequest = error.config?.url?.includes("/auth/me");

            if (
                status === 401 &&
                !isLoginPage &&
                !isLoginRequest &&
                !isMeRequest
            ) {
                window.location.href = "/admin/login";
            }
        }

        return Promise.reject(error);
    }
);

export const submitPublicForm = async (
    endpoint: string,
    data: unknown
) => {
    const response = await api.post(`/${endpoint}`, data);
    return response.data;
};

export default api;
