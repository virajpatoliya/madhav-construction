import React, { useEffect, useState } from "react";
import {
    getInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    searchInvoices,
    Invoice,
} from "../../../service/InvoiceService"; // ✅ Updated path
import InvoiceBillForm from "../InvoiceBill/InvoiceBillForm";
import BillCard from "../BillCard";
import {
    IconChevronLeft,
    IconFileInvoiceFilled,
    IconReportSearch,
    IconSearch,
    IconSquareRoundedXFilled,
    IconCaretLeftFilled,
    IconCaretRightFilled,
    IconCirclePlusFilled,
    IconZoomExclamationFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const InvoiceBill: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState<Invoice | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [openId, setOpenId] = useState<string | null>(null);
    const navigate = useNavigate();

    // 🔹 Load invoices (with pagination & optional search)
    const load = async (p = 0, size = 10, keyword?: string) => {
        setLoading(true);
        try {
            const res =
                keyword && keyword.trim()
                    ? await searchInvoices(keyword.trim(), p, size)
                    : await getInvoices(p, size);

            setInvoices(res.content);
            setPage(res.number);
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error("Error fetching invoices", err);
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    // 🔍 Handle search
    const handleSearch = async () => {
        if (search.trim()) {
            await load(0, 10, search);
        } else {
            await load(0, 10);
        }
    };

    // ➕ Add new invoice
    const onAdd = () => {
        setEditing({
            billNo: "",
            date: new Date().toISOString().split("T")[0],
            companyName: "",
            customerAddress: "",
            gstno: "",
            amountWords: "",
            items: [],
        });
    };

    // 💾 Save invoice
    const onSave = async (invoice: Invoice) => {
        setLoading(true);
        try {
            if (invoice.id) {
                await updateInvoice(invoice.id, invoice);
            } else {
                await addInvoice(invoice);
            }
            setEditing(null);
            await load(page, 10, search || undefined);
        } catch (err) {
            console.error("Save failed", err);
            alert("Save failed");
        } finally {
            setLoading(false);
        }
    };

    // ❌ Delete invoice
    const onDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm("Delete this invoice?")) return;
        setLoading(true);
        try {
            await deleteInvoice(id);
            await load(page, 10, search || undefined);
        } catch (err) {
            console.error("Delete failed", err);
            alert("Delete failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex pt-8 md:pt-14">
            <div className="flex flex-col w-full bg-white md:mt-10">
                {/* Header */}
                <div className="bg-blue-950 flex flex-row text-white items-center p-2 gap-1 text-md font-medium mb-3">
                    <div className="bg-yellow-500 w-7 h-7 mx-4 text-black rounded-full flex items-center justify-center">
                        <IconChevronLeft stroke={2} onClick={() => navigate(-1)} size={25} />
                    </div>
                    <IconFileInvoiceFilled size={20} />
                    <div className="text-lg font-bold">Invoice Bill</div>
                </div>

                {/* Search bar */}
                <div className="flex flex-col w-full p-3 gap-1">
                    <div className="flex w-full items-center justify-center">
                        <div className="flex flex-row justify-center w-full gap-3 md:w-1/2">
                            <div className="flex flex-row outline-black w-full p-0.5 px-2 bg-gray-100 rounded-xl gap-1 items-center">
                                <IconSearch stroke={3} size={25} />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by company or bill no"
                                    type="text"
                                    className="p-2 outline-none w-full bg-transparent"
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="p-1 rounded-full hover:bg-gray-300 transition"
                                    >
                                        <IconSquareRoundedXFilled
                                            size={24}
                                            className="text-gray-600"
                                        />
                                    </button>
                                )}
                            </div>
                            {search && (
                                <button
                                    onClick={handleSearch}
                                    className="p-2.5 rounded-xl bg-gray-200 transition"
                                >
                                    <IconReportSearch size={24} className="text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Invoices list */}
                <section className="flex flex-col p-3">
                    <div className="flex flex-row justify-between items-center pb-2">
                        <label className="text-md font-extrabold text-nowrap px-1">
                            Your Invoices
                        </label>
                        <div className="flex flex-row items-center gap-2 bg-gray-200 rounded-xl">
                            <button
                                disabled={page <= 0}
                                onClick={() => load(page - 1, 10, search || undefined)}
                            >
                                <IconCaretLeftFilled className="text-blue-900" size={20} />
                            </button>
                            <div className="text-xs text-blue-900 font-black">{page + 1}</div>
                            <button
                                disabled={page >= totalPages - 1}
                                onClick={() => load(page + 1, 10, search || undefined)}
                            >
                                <IconCaretRightFilled className="text-blue-900" size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Loading shimmer */}
                    {loading ? (
                        <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {Array(12)
                                .fill(0)
                                .map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col animate-pulse-fast gap-2 bg-gray-100 p-3 rounded-2xl"
                                    >
                                        <div className="bg-gray-300 w-full h-20 rounded-lg"></div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {/* Add Invoice Button */}
                            <div className="bg-gray-100 flex justify-center items-center hover:bg-blue-950 hover:text-white text-gray-500 transition-all duration-300 p-3 rounded-2xl h-full">
                                <button
                                    onClick={onAdd}
                                    className="flex flex-row gap-1 justify-center font-black text-xl hover:bg-transparent items-center py-2 rounded-lg w-full h-full"
                                >
                                    <IconCirclePlusFilled /> Invoice
                                </button>
                            </div>

                            {/* Invoices */}
                            {invoices.map((inv) => (
                                <BillCard
                                    key={inv.id}
                                    b={inv}
                                    onDelete={onDelete}
                                    setEditing={setEditing}
                                    openId={openId}
                                    setOpenId={setOpenId}
                                />
                            ))}

                            {/* Empty state */}
                            {invoices.length === 0 && (
                                <div className="flex flex-col w-full items-center py-5 col-span-full">
                                    <IconZoomExclamationFilled className="text-gray-500" size={60} />
                                    <p className="text-gray-500 text-center text-sm font-bold">
                                        No invoices found!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
                {editing && (
                    <InvoiceBillForm
                        bill={editing}
                        onClose={() => setEditing(null)}
                        onSave={onSave}
                    />
                )}
            </div>
        </div>
    );
};

export default InvoiceBill;
