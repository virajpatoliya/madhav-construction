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

let sessionCheck: Promise<boolean> | null = null;

const requestSession = async (): Promise<boolean> => {
    try {
        await apiRequest("/auth/session", {
            method: "GET",
            silentStatuses: [401, 440],
        });
        return true;
    } catch (err) {
        const status = err instanceof Error && "status" in err
            ? err.status
            : undefined;

        if (status === 440) {
            throw new SessionExpiredError();
        }

        return false;
    }
};

export const checkSession = (): Promise<boolean> => {
    if (!sessionCheck) {
        sessionCheck = requestSession().finally(() => {
            sessionCheck = null;
        });
    }

    return sessionCheck;
};
