import React, { useEffect, useState } from "react";
import { getAbstractBills, addAbstractBill, updateAbstractBill, deleteAbstractBill, searchAbstractBills } from "../../../service/abstractService";
import { Bill } from "../../../service/abstractService";
import { v4 as uuidv4 } from "uuid";
import { IconArtboardFilled, IconArticleFilled, IconCaretLeftFilled, IconCaretRightFilled, IconCaretUp, IconCaretUpFilled, IconChevronLeft, IconChevronRight, IconCircleChevronRightFilled, IconCirclePlusFilled, IconDotsVertical, IconFileSpreadsheet, IconReportSearch, IconSearch, IconSelectAll, IconSquareRoundedXFilled, IconTrash, IconTrashFilled, IconZoomExclamationFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import BillCard from "../BillCard";
import AbstractBillForm from "./AbstractBillForm";

const AbstractBill: React.FC = () => {

    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState<Bill | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const [openId, setOpenId] = useState<string | null>(null);


    // Load bills (paginated + optional search)
    const load = async (p = 0, size = 10, company?: string) => {
        setLoading(true);
        try {
            const res = company && company.trim()
                ? await searchAbstractBills(company.trim(), p, size) // 🔥 hits `/search`
                : await getAbstractBills(p, size);                   // 🔥 hits `/bills`

            setBills(res.bills);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error("Error fetching bills", err);
            setBills([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    // Handle search
    const handleSearch = async () => {
        const trimmed = search.trim();
        if (trimmed) {
            const res = await searchAbstractBills(trimmed, 0, 10);
            setBills(res.bills);
            setPage(res.currentPage);
            setTotalPages(res.totalPages);
        } else {
            await load(0, 10);
        }
    };


    // Add new bill
    const onAdd = () => {
        setEditing({
            companyName: "",
            workName: "",
            billNo: "",
            date: new Date().toISOString().split("T")[0],
            abstractSection: [],
        });
    };

    // Save (create or update)
    const onSave = async (bill: Bill) => {
        setLoading(true);
        try {
            if (bill.id) {
                await updateAbstractBill(bill.id, bill);
                await load(page, 10, search || undefined);
            } else {
                await addAbstractBill(bill);
                await load(0, 10, search || undefined); // go to first page
            }
            setEditing(null); // ✅ closes modal
        } catch (err) {
            console.error("Save failed", err);
            alert("Save failed");
        } finally {
            setLoading(false);
        }
    };



    // Delete bill
    const onDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm("Delete this bill?")) return;
        setLoading(true);
        try {
            await deleteAbstractBill(id);
            await load(page, 10, search || undefined);
        } catch (err) {
            console.error("Delete failed", err);
            alert("Delete failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-full flex pt-8 md:pt-14 '>
            <div className='flex flex-col w-full bg-white md:mt-10'>
                <div className="bg-blue-950 flex flex-row text-white items-center p-2 gap-1 text-md font-medium mb-3">
                    <div className="bg-yellow-500 w-7 h-7 mx-4 text-black rounded-full flex items-center justify-center">
                        <IconChevronLeft stroke={2} onClick={() => navigate(-1)} size={25} />
                    </div>
                    <IconFileSpreadsheet size={20} />
                    <div className="text-lg font-bold">Abstract Bill</div>
                </div>
                <div className='flex flex-col w-full  p-3 gap-1'>
                    <div className='flex w-full items-center justify-center'>
                        <div className='flex flex-row justify-center w-full gap-3 md:w-1/2'>
                            <div className='flex flex-row outline-black w-full p-0.5  px-2 bg-gray-100 rounded-xl gap-1 items-center'>
                                <div>
                                    <IconSearch stroke={3} size={25} /></div>
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by company"
                                    type='text' className='p-2 outline-none w-full bg-transparent' />
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="p-1 rounded-full hover:bg-gray-300 transition"
                                    >
                                        <IconSquareRoundedXFilled size={24} className="text-gray-600" />
                                    </button>
                                )}
                            </div>

                            <div>{search && (
                                <button
                                    onClick={handleSearch}
                                    className="p-2.5 rounded-xl bg-gray-200 transition"
                                >
                                    <IconReportSearch size={24} className="text-gray-600" />
                                </button>
                            )}</div>
                        </div>
                    </div>
                </div>
                <section className="flex flex-col p-3">
                    <div className="flex flex-row justify-between items-center pb-2">
                        <label className='text-md font-extrabold text-nowrap px-1'>Your Bills</label>
                        <div className="flex flex-row items-center gap-2 bg-gray-200 rounded-xl">
                            <button
                                disabled={page <= 0}
                                onClick={() => load(page - 1, 10, search || undefined)}
                            >
                                <IconCaretLeftFilled className="text-blue-900" size={20} />
                            </button>
                            <div className="text-xs text-blue-900 font-black ">
                                {page + 1}
                            </div>
                            <button
                                disabled={page >= totalPages - 1}
                                onClick={() => load(page + 1, 10, search || undefined)}
                            >
                                <IconCaretRightFilled className="text-blue-900" size={20} />
                            </button>
                        </div>
                    </div>
                    {loading ? (
                        <div className="w-full ">
                            <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                {/* + Add Bill button as first grid item */}
                                {/* Bills */}
                                {Array(48).fill(0).map((_, b) => (
                                    <div
                                        className=" flex flex-col animate-pulse-fast gap-2 bg-gray-100 p-3 rounded-2xl"
                                        key={b}
                                    >
                                        <span className="text-xs bg-gray-400 font-regular rounded-xl w-16 h-3"></span>
                                        <div
                                            className="bg-gray-300 w-full p-1 h-16 rounded-lg"
                                        >

                                        </div>
                                        <span className="text-xs bg-gray-400 font-regular rounded-xl w-16 h-3"></span>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full ">
                            <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                {/* + Add Bill button as first grid item */}
                                <div className="bg-gray-100 flex justify-center items-center hover:bg-blue-950 hover:text-white text-gray-500 transition-all duration-300 p-3 rounded-2xl h-full">
                                    <button
                                        onClick={onAdd}
                                        className="flex flex-row gap-1 justify-center font-black text-xl hover:bg-transparent items-center  py-2 rounded-lg w-full h-full"
                                    >
                                        <IconCirclePlusFilled /> Bill
                                    </button>
                                </div>

                                {/* Bills */}
                                {bills.map((b) => (
                                    <BillCard
                                        key={b.id}
                                        b={b}
                                        onDelete={onDelete}
                                        setEditing={setEditing}
                                        openId={openId}
                                        setOpenId={setOpenId}
                                    />
                                ))}

                                {/* Empty state */}
                                {bills?.length === 0 && (
                                    <div className="flex flex-col w-full items-center py-5 col-span-full">
                                        <IconZoomExclamationFilled className="text-gray-500" size={60} />
                                        <p className="text-gray-500 text-center text-sm font-bold">No bills found!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    )}

                    {/* Pagination */}

                </section>

                {/* Bill form modal */}
                {editing && (
                    <AbstractBillForm
                        bill={editing}
                        onClose={() => setEditing(null)}
                        onSave={onSave}
                    />
                )}
            </div>
        </div >
    );
};

export default AbstractBill;




