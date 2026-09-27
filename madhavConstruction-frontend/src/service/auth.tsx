// src/services/auth.ts
import { apiRequest } from "@/utils/api";

export const loginUser = (username: string, password: string) =>
    apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });

export const logoutUser = () =>
    apiRequest("/auth/logout", { method: "POST" });

// Add a custom error for session expiration
export class SessionExpiredError extends Error {
    constructor(message = "Session expired. Please login again.") {
        super(message);
        this.name = "SessionExpiredError";
    }
}

export const checkSession = async (): Promise<boolean> => {
    try {
        await apiRequest("/auth/session", { method: "GET" });
        return true;
    } catch (err: any) {
        // if backend returns 401 or 440 (login timeout), mark as expired
        if (err?.status === 401 || err?.status === 440) {
            throw new SessionExpiredError();
        }
        return false;
    }
};
