import { apiRequest } from "@/utils/api"; // your common API service

// Base API endpoint
// eslint-disable-next-line react-refresh/only-export-components
const ENDPOINT = "/invoices";

// --- 🧾 Type Definitions ---
export interface InvoiceItem {
    srNo: number;
    description: string;
    amount: number;
}

export interface Invoice {
    id?: string;
    billNo: string;
    date: string;
    companyName: string;
    customerAddress: string;
    gstno: string;
    amountWords: string;
    items: InvoiceItem[];
}

export interface InvoiceResponse {
    content: Invoice[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

// --- 🧩 API Functions ---

// ✅ Get all invoices (paginated)
export const getInvoices = async (page = 0, size = 10): Promise<InvoiceResponse> => {
    const query = `?page=${page}&size=${size}`;
    const resp = await apiRequest(`${ENDPOINT}${query}`, { method: "GET" });
    return resp;
};

// ✅ Search invoices by keyword (companyName or billNo)
export const searchInvoices = async (keyword = "", page = 0, size = 10): Promise<InvoiceResponse> => {
    const query = `?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`;
    const resp = await apiRequest(`${ENDPOINT}/search${query}`, { method: "GET" });
    return resp;
};

// ✅ Get a single invoice by ID
export const getInvoiceById = async (id: string): Promise<Invoice | null> => {
    const resp = await apiRequest(`${ENDPOINT}/${id}`, { method: "GET" });
    return resp ?? null;
};

// ✅ Add a new invoice
export const addInvoice = async (invoice: Invoice): Promise<Invoice> => {
    const resp = await apiRequest(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(invoice),
    });
    return resp;
};

// ✅ Update an existing invoice
export const updateInvoice = async (id: string, invoice: Invoice): Promise<Invoice> => {
    const resp = await apiRequest(`${ENDPOINT}/${id}`, {
        method: "PUT",
        body: JSON.stringify(invoice),
    });
    return resp;
};

// ✅ Delete an invoice
export const deleteInvoice = async (id: string): Promise<void> => {
    await apiRequest(`${ENDPOINT}/${id}`, { method: "DELETE" });
};

