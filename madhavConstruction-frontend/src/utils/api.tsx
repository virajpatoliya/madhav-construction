
// const API_BASE_URL = "http://localhost:8081/v2/api";
const API_BASE_URL = "/v2/api";
// ✅ Reusable fetch wrapper
export const apiRequest = async (
    endpoint: string,
    options: RequestInit & { responseType?: "json" | "blob" } = {}
) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const res = await fetch(url, {
        // ✅ always include cookies (required for SESSIONID)
        credentials: "include",
        // ✅ ensure correct mode for cross-origin requests
        mode: "cors",
        headers: {
            // ✅ Only set JSON header when body exists and not blob
            ...(options.responseType === "blob"
                ? {}
                : options.body
                    ? { "Content-Type": "application/json" }
                    : {}),
            ...(options.headers || {}),
        },
        ...options,
    });

    // ✅ Handle CORS or network errors more gracefully
    if (!res.ok) {
        let errorText = "";
        try {
            errorText = await res.text();
        } catch {
            errorText = `Request failed with status ${res.status}`;
        }

        console.error(`❌ API Error: [${res.status}] `, errorText);
        throw new Error(errorText || `Request failed: ${res.status}`);
    }

    // ✅ If downloading a file (PDF, Excel, etc.)
    if (options.responseType === "blob") {
        return res; // return full Response object for caller to handle
    }

    // ✅ Safely parse JSON responses
    try {
        return await res.json();
    } catch {
        console.warn(`⚠️ Non-JSON response. `);
        return null;
    }
};


