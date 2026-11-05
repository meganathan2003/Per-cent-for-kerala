
import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        Accept: "application/json",
    },
});

// Attach JWT and configure request headers
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== "undefined") {
            const isLoginRequest = config.url?.includes("/auth/login");

            if (!isLoginRequest) {
                const token = localStorage.getItem("admin_token");

                if (token) {
                    config.headers.set(
                        "Authorization",
                        `Bearer ${token}`
                    );
                }
            }
        }

        // Let browser set multipart boundary for FormData.
        if (
            typeof FormData !== "undefined" &&
            config.data instanceof FormData
        ) {
            config.headers.delete("Content-Type");
        } else if (config.data !== undefined) {
            config.headers.set(
                "Content-Type",
                "application/json"
            );
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Handle API responses and errors
api.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
        if (typeof window !== "undefined") {
            const status = error.response?.status;

            const isLoginPage =
                window.location.pathname.includes("/admin/login");

            const isLoginRequest =
                error.config?.url?.includes("/auth/login");

            if (
                status === 401 &&
                !isLoginPage &&
                !isLoginRequest
            ) {
                localStorage.removeItem("admin_token");
                localStorage.removeItem("admin_user");

                window.location.href = "/admin/login";
            }
        }

        return Promise.reject(error);
    }
);

// Public form submission
export const submitPublicForm = async (
    endpoint: string,
    data: unknown
) => {
    const response = await api.post(`/${endpoint}`, data);

    return response.data;
};

export default api;
