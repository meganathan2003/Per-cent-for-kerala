
import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";

// Select API URL based on environment
const BASE_URL = (
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PROD
        : process.env.NEXT_PUBLIC_API_URL_LOCAL
)?.replace(/\/+$/, "");

if (!BASE_URL) {
    throw new Error(
        "API URL is not configured. Check NEXT_PUBLIC_API_URL_LOCAL or NEXT_PUBLIC_API_URL_PROD"
    );
}

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,

    // Required for HttpOnly cookie authentication
    withCredentials: true,

    headers: {
        Accept: "application/json",
    },
});

// Configure request headers
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        // Let browser set multipart boundary for FormData
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
                // Remove old localStorage authentication data
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
