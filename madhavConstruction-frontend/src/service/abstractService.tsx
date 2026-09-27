import { apiRequest } from "../utils/api";

// ======================
//  Type Definitions
// ======================
export type Entry = {
    id: string;        // uuid string
    item: string;
    nos: number;
    rate: number;
    perUnit: string;
    amount: number;
};

export type Section = {
    id: string;
    title: string;
    entries: Entry[];
};

export type Bill = {
    id?: string;       // optional - created by backend
    companyName: string;
    workName: string;
    billNo: string;
    date: string;      // YYYY-MM-DD
    abstractSection: Section[];
};

// Normalized pagination shape
export type AbstractBillResponse = {
    bills: Bill[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
};

// ======================
// Base Endpoint
// ======================
const ENDPOINT = "/abstract-bills"; // 👈 Your backend should expose this

// ======================
// Response Normalizer
// ======================
function normalize(resp: any, page = 0, size = 10): AbstractBillResponse {
    if (!resp) return { bills: [], totalItems: 0, currentPage: 0, totalPages: 0 };

    // Array
    if (Array.isArray(resp)) {
        return {
            bills: resp,
            totalItems: resp.length,
            currentPage: 0,
            totalPages: 1,
        };
    }

    // Spring Pageable { content: [...], totalElements, number }
    if (resp.content && Array.isArray(resp.content)) {
        const totalItems = resp.totalItems ?? resp.totalElements ?? resp.content.length;
        const currentPage = resp.currentPage ?? resp.page ?? resp.number ?? page;
        const totalPages = resp.totalPages ?? Math.ceil(totalItems / size);
        return {
            bills: resp.content,
            totalItems,
            currentPage,
            totalPages,
        };
    }

    // Already wrapped { bills: [...] }
    if (resp.bills && Array.isArray(resp.bills)) {
        return {
            bills: resp.bills,
            totalItems: resp.totalItems ?? resp.bills.length,
            currentPage: resp.currentPage ?? 0,
            totalPages: resp.totalPages ?? 1,
        };
    }

    // Single item fallback
    if (resp.id && resp.companyName) {
        return {
            bills: [resp],
            totalItems: 1,
            currentPage: 0,
            totalPages: 1,
        };
    }

    return { bills: [], totalItems: 0, currentPage: 0, totalPages: 0 };
}

// ======================
//  API Functions
// ======================

// Get all abstract bills (paginated)
export const getAbstractBills = async (page = 0, size = 10): Promise<AbstractBillResponse> => {
    const query = `?page=${page}&size=${size}`;
    const resp = await apiRequest(`${ENDPOINT}${query}`, { method: "GET" });
    return normalize(resp, page, size);
};

//  Search by company or workName
export const searchAbstractBills = async (keyword: string, page = 0, size = 10): Promise<AbstractBillResponse> => {
    const query = `?q=${encodeURIComponent(keyword)}&page=${page}&size=${size}`;
    const resp = await apiRequest(`${ENDPOINT}/search${query}`, { method: "GET" });
    return normalize(resp, page, size);
};

//  Get one bill by ID
export const getAbstractBillById = async (id: string): Promise<Bill | null> => {
    const resp = await apiRequest(`${ENDPOINT}/${id}`, { method: "GET" });
    return resp ?? null;
};

//  Add new abstract bill
export const addAbstractBill = async (bill: Bill): Promise<Bill> => {
    const resp = await apiRequest(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(bill),
    });
    return resp;
};

//  Update existing abstract bill
export const updateAbstractBill = async (id: string, bill: Bill): Promise<Bill> => {
    const resp = await apiRequest(`${ENDPOINT}/${id}`, {
        method: "PUT",
        body: JSON.stringify(bill),
    });
    return resp;
};

//  Delete abstract bill
export const deleteAbstractBill = async (id: string): Promise<void> => {
    await apiRequest(`${ENDPOINT}/${id}`, { method: "DELETE" });
};
