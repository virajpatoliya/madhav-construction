import { apiRequest } from "../utils/api";

const ENDPOINT = "/main-bills";

export interface Item {
    description: string;
    size?: string;
    rate?: number;
    amount?: number;
}

export interface MainBill {
    id?: string;
    billHeadingName: string;
    panNo?: string;
    companyName: string;
    input1?: string;
    input2?: string;
    input3?: string;
    billNo: string;
    date: string;
    items: Item[];
    amountWords?: string;
    input4?: string;
}

export interface MainBillResponse {
    content: MainBill[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export const getMainBills = async (page = 0, size = 10): Promise<MainBillResponse> => {
    const resp = await apiRequest(`${ENDPOINT}?page=${page}&size=${size}`, { method: "GET" });
    return resp;
};

export const searchMainBills = async (keyword = "", page = 0, size = 10): Promise<MainBillResponse> => {
    const resp = await apiRequest(`${ENDPOINT}/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`, { method: "GET" });
    return resp;
};

export const getMainBillById = async (id: string): Promise<MainBill | null> => {
    const resp = await apiRequest(`${ENDPOINT}/${id}`, { method: "GET" });
    return resp ?? null;
};

export const addMainBill = async (bill: MainBill): Promise<MainBill> => {
    const resp = await apiRequest(ENDPOINT, { method: "POST", body: JSON.stringify(bill) });
    return resp;
};

export const updateMainBill = async (id: string, bill: MainBill): Promise<MainBill> => {
    const resp = await apiRequest(`${ENDPOINT}/${id}`, { method: "PUT", body: JSON.stringify(bill) });
    return resp;
};

export const deleteMainBill = async (id: string): Promise<void> => {
    await apiRequest(`${ENDPOINT}/${id}`, { method: "DELETE" });
};
