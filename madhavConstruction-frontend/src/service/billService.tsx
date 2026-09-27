// src/billService.
import { apiRequest } from "../utils/api"; // your wrapper
// src/types.ts
export type Entry = {
    id: string;   // uuid string
    item: string;
    nos: number;
    length: number;
    breadth: number;
    depth: number;
};

export type Section = {
    id: string;
    title: string;
    entries: Entry[];
};

export type Bill = {
    id?: string; // optional - created by backend
    companyName: string;
    workName: string;
    date: string; // "YYYY-MM-DD"
    sections: Section[];
};

// Normalized response wrapper (frontend-side)
export type BillResponse = {
    bills: Bill[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
};

const ENDPOINT = "/bills";

/**
 * Normalizes backend responses into BillResponse shape.
 * Handles:
 * - raw array
 * - { content: [...], totalItems|totalElements, currentPage|number, totalPages }
 * - { bills: [...], totalItems, currentPage, totalPages }
 */
function normalize(resp: any, page = 0, size = 10): BillResponse {
    if (!resp) return { bills: [], totalItems: 0, currentPage: 0, totalPages: 0 };

    // If backend returned an array directly
    if (Array.isArray(resp)) {
        return {
            bills: resp,
            totalItems: resp.length,
            currentPage: 0,
            totalPages: 1,
        };
    }

    // If backend returns { content: [...] } (Spring pageable)
    if (resp.content && Array.isArray(resp.content)) {
        const totalItems = resp.totalItems ?? resp.totalElements ?? resp.content.length;
        const currentPage = resp.currentPage ?? resp.page ?? resp.number ?? page;
        const totalPages = resp.totalPages ?? Math.ceil((totalItems || resp.content.length) / size);
        return {
            bills: resp.content,
            totalItems,
            currentPage,
            totalPages,
        };
    }

    // If backend returns { bills: [...] }
    if (resp.bills && Array.isArray(resp.bills)) {
        return {
            bills: resp.bills,
            totalItems: resp.totalItems ?? resp.bills.length,
            currentPage: resp.currentPage ?? 0,
            totalPages: resp.totalPages ?? 1,
        };
    }

    // Fallback: maybe the server returned a single bill
    if (resp.id && resp.companyName) {
        return {
            bills: [resp],
            totalItems: 1,
            currentPage: 0,
            totalPages: 1,
        };
    }

    // unknown shape -> empty
    return { bills: [], totalItems: 0, currentPage: 0, totalPages: 0 };
}

// Fetch paginated bills (page,size optional) + optional company filter

export const getBillById = async (id: string): Promise<Bill | null> => {
    const resp = await apiRequest(`${ENDPOINT}/${id}`, { method: "GET" });
    return resp ?? null;
};

export const addBill = async (bill: Bill): Promise<Bill> => {
    const resp = await apiRequest(ENDPOINT, { method: "POST", body: JSON.stringify(bill) });
    return resp;
};

export const updateBill = async (id: string, bill: Bill): Promise<Bill> => {
    const resp = await apiRequest(`${ENDPOINT}/${id}`, { method: "PUT", body: JSON.stringify(bill) });
    return resp;
};

export const deleteBill = async (id: string): Promise<void> => {
    await apiRequest(`${ENDPOINT}/${id}`, { method: "DELETE" });
};

export const getBills = async (page = 0, size = 10): Promise<BillResponse> => {
    const query = `?page=${page}&size=${size}`;
    const resp = await apiRequest(`/bills${query}`, { method: "GET" });
    return normalize(resp, page, size);
};

export const searchBills = async (company: string, page = 0, size = 10): Promise<BillResponse> => {
    const query = `?company=${encodeURIComponent(company)}&page=${page}&size=${size}`;
    const resp = await apiRequest(`/bills/search${query}`, { method: "GET" }); // ✅ hits /search
    return normalize(resp, page, size);
};


