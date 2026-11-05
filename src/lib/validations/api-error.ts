
import axios from "axios";

interface BackendErrorResponse {
    success?: boolean;
    message?: string;
    errors?: unknown;
}

export function getApiErrorMessage(
    error: unknown,
    fallback = "Something went wrong. Please try again."
): string {
    // Network / Axios error
    if (axios.isAxiosError<BackendErrorResponse>(error)) {
        // Request reached server and received a response
        if (error.response) {
            const status = error.response.status;
            const backendMessage = error.response.data?.message;

            switch (status) {
                case 400:
                    return backendMessage || "Invalid request. Please check your information.";

                case 401:
                    return "Email or password is incorrect. Please try again.";

                case 403:
                    return "You don't have permission to perform this action.";

                case 404:
                    return "The requested information could not be found.";

                case 409:
                    return backendMessage || "This action conflicts with an existing record.";

                case 422:
                    return backendMessage || "Please check the information you entered.";

                case 429:
                    return "Too many attempts. Please try again later.";

                case 500:
                case 501:
                case 502:
                case 503:
                case 504:
                    return "Something went wrong on our server. Please try again later.";

                default:
                    return backendMessage || fallback;
            }
        }

        // Server did not respond
        if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
            return "The request took too long. Please try again.";
        }

        if (error.code === "ERR_NETWORK" || !error.response) {
            return "Unable to connect to the server. Please check your connection.";
        }
    }

    // Non-Axios errors
    if (error instanceof Error) {
        return error.message || fallback;
    }

    return fallback;
}
