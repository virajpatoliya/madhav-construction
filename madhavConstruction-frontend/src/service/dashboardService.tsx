
import { apiRequest } from "@/utils/api";


// 🔹 Kharcha
export const getKharcha = (params: { page: number; size: number; company?: string }) =>
    apiRequest(`/kharcha/all?page=${params.page}&size=${params.size}&company=${params.company || ""}`);

export const searchKharcha = (company: string, page = 0, size = 5) =>
    apiRequest(`/kharcha/search?company=${company}&page=${page}&size=${size}`);

export const addKharcha = (form: any) =>
    apiRequest("/kharcha", {
        method: "POST",
        body: JSON.stringify(form),
    });

export const getKharchaTotals = () =>
    Promise.all([
        apiRequest("/kharcha/totalCompanies"),
        apiRequest("/kharcha/total"),
    ]);


// 🔹 Update existing kharcha
export const updateKharcha = (id: string, form: any) =>
    apiRequest(`/kharcha/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
    });

// 🔹 Delete kharcha
export const deleteKharcha = (id: string) =>
    apiRequest(`/kharcha/${id}`, {
        method: "DELETE",
    });

// 🔹 Download Kharcha PDF report
export const downloadKharchaPdf = async () => {
    const res = await apiRequest(`/kharcha/download-pdf`, {
        method: "GET",
        responseType: "blob",
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kharcha_report.pdf";
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    // Trigger browser download
    link.href = url;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};







// 🔹 Material
export const getMaterial = (params: { page: number; size: number; company?: string }) =>
    apiRequest(`/material/all?page=${params.page}&size=${params.size}&company=${params.company || ""}`);

export const searchMaterial = (company: string, page = 0, size = 5) =>
    apiRequest(`/material/search?company=${company}&page=${page}&size=${size}`);

export const addMaterial = (form: any) =>
    apiRequest("/material", {
        method: "POST",
        body: JSON.stringify(form),
    });

export const getMaterialTotals = () =>
    Promise.all([
        apiRequest("/material/totalCompanies"),
        apiRequest("/material/total"),
    ]);

// 🔹 Update existing material
export const updateMaterial = (id: string, form: any) =>
    apiRequest(`/material/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
    });

// 🔹 Delete material
export const deleteMaterial = (id: string) =>
    apiRequest(`/material/${id}`, {
        method: "DELETE",
    });


// 🔹 Download Material PDF report

export const downloadMaterialPdf = async () => {
    const res = await apiRequest(`/material/download-pdf`, {
        method: "GET",
        responseType: "blob",
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Material_report.pdf";
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    // Trigger browser download
    link.href = url;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};







// 🔹 LabourWorkSheet
export const getLabourWorkSheet = (params: { page: number; size: number; company?: string }) =>
    apiRequest(`/labourworksheet/all?page=${params.page}&size=${params.size}&company=${params.company || ""}`);

export const searchLabourWorkSheet = (
    query?: string,
    page: number = 0,
    size: number = 5
) => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    params.append("page", String(page));
    params.append("size", String(size));

    return apiRequest(`/labourworksheet/search?${params.toString()}`);
};

export const addLabourWorkSheet = (form: any) =>
    apiRequest("/labourworksheet", {
        method: "POST",
        body: JSON.stringify(form),
    });

// 🔹 Update existing material
export const updateLabourWorkSheet = (id: string, form: any) =>
    apiRequest(`/labourworksheet/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
    });

// 🔹 Delete material
export const deleteLabourWorkSheet = (id: string) =>
    apiRequest(`/labourworksheet/${id}`, {
        method: "DELETE",
    });


// 🔹 Download PDF report



export const downloadLabourWorkSheetPdf = async () => {
    try {
        // 1️⃣ Fetch PDF from backend
        const res = await apiRequest(`/labourworksheet/download-pdf`, {
            method: "GET",
            responseType: "blob",
        });

        // 2️⃣ Extract filename from Content-Disposition header
        const contentDisposition = res.headers.get("content-disposition");
        let filename = "Labour_Work_Sheet_Report.pdf"; // default name
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
                filename = decodeURIComponent(match[1]);
            }
        }

        // 3️⃣ Convert response into a Blob
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        // 4️⃣ Create a hidden anchor link
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);

        // 5️⃣ Trigger download
        link.click();

        // 6️⃣ Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("❌ Error downloading Labour Work Sheet PDF:", error);
        alert("Failed to download Labour Work Sheet Report. Please try again.");
    }
};



