
import { apiRequest } from "@/utils/api";

// 🔹 Labour
export const addLabour = (payload: any) =>
    apiRequest("/labour", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const getLabours = () =>
    apiRequest("/labour");

export const getLabourBySlug = (slugAndId: string, page: number, size = 10) =>
    apiRequest(`/labour/${slugAndId}?page=${page}&size=${size}`);

export const deleteLabour = (slugAndId: string) =>
    apiRequest(`/labour/${slugAndId}`, { method: "DELETE" });

export const addLabourWork = (slugAndId: string, work: any) =>
    apiRequest(`/labour/${slugAndId}/work`, {
        method: "POST",
        body: JSON.stringify(work),
    });

export const downloadLabourWorkPdf = async (slugAndId: string) => {
    const res: Response = await apiRequest(`/labour/${slugAndId}/download-pdf`, {
        method: "GET",
        responseType: "blob",
    });

    const blob = await res.blob();

    // Extract filename from headers
    let filename = "labour_work.pdf";
    const disposition = res.headers.get("content-disposition") || res.headers.get("Content-Disposition");
    if (disposition) {
        // Try filename* first
        let match = disposition.match(/filename\*=(?:UTF-8'')?([^;]+)/i);
        if (match && match[1]) {
            filename = decodeURIComponent(match[1].replace(/"/g, ''));
        } else {
            // Fallback to filename
            match = disposition.match(/filename=([^;]+)/i);
            if (match && match[1]) {
                filename = match[1].replace(/"/g, '');
            }
        }
    }

    // Trigger download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename; // ✅ now uses labour name from backend
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};


export const editLabourWork = (slugAndId: string, workId: string, work: any) =>
    apiRequest(`/labour/${slugAndId}/work/${workId}`, {
        method: "PUT",
        body: JSON.stringify(work),
    });


export async function deleteWork(slugAndId: string, workId: string) {
    return apiRequest(`/labour/${slugAndId}/work/${workId}`, {
        method: "DELETE",
    });
}


