import Dropdown from '@/components/Dropdown';
import ReusableModal from '@/components/ResuableModal';
import { addLabourWorkSheet, deleteLabourWorkSheet, downloadLabourWorkSheetPdf, getLabourWorkSheet, searchLabourWorkSheet, updateLabourWorkSheet } from '@/service/dashboardService';
import { IconDotsVertical, IconDownload, IconListSearch, IconPlus, IconRotateClockwise, IconSearch, IconX, IconZoomExclamationFilled } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export interface LabourWorkSheet {
    id?: string;
    date: string;
    company: string;
    labour: string;
    work: string;
};


const LabourWorkSheet = () => {



    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState<ModalType>(null);
    const [query, setQuery] = useState("");


    //material
    const [labourWorkSheet, setLabourWorkSheet] = useState<LabourWorkSheet[]>([]);
    const [pageMatrial, setPageMaterial] = useState(0);
    const [totalPagesMaterial, setTotalPagesMaterial] = useState(0);
    const [searchTextLabourWorkSheet, setSearchTextLabourWorkSheet] = useState("");
    const [formLabourWorkSheet, setFormLabourWorkSheet] = useState<LabourWorkSheet>({
        date: today,
        company: "",
        labour: "",
        work: "",

    });
    const [selectedLabourWorkSheet, setSelectedLabourWorkSheet] = useState<LabourWorkSheet | null>(null);
    const [isEditingLabourWorkSheet, setIsEditingLabourWorkSheet] = useState(false);

    type ModalType = "my_Kharcha_Modal" | "material_Modal" | "refresh_kharcha" | "refresh_LabourWorkSheet" | "search" | "addLabour" | null;


    const fetchLabourWorkSheet = async () => {
        setLoading(true);
        try {
            const res = await getLabourWorkSheet({ page: pageMatrial, size: 5, company: searchTextLabourWorkSheet || undefined });

            setLabourWorkSheet(res.content || []);
            setTotalPagesMaterial(res.totalPages || 0);
        } catch (err) {
            console.error("Error fetching material", err);
        } finally {
            setLoading(false);
        }
    };


    const fetchSearchLabourWorkSheet = async (company: string, page: number = 0) => {
        setLoading(true);
        try {
            const res = await searchLabourWorkSheet(company, page, 5);
            setLabourWorkSheet(res.content || []);
            setTotalPagesMaterial(res.totalPages || 0);
        } catch (err) {
            console.error("Error searching material", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchLabourWorkSheet = () => {
        setPageMaterial(0);
        fetchSearchLabourWorkSheet(searchTextLabourWorkSheet, 0);
    };




    // ✅ Centralized refresh function
    const refreshLabourWorkSheet = async () => {
        setLoading(true);
        try {
            const res = await getLabourWorkSheet({ page: pageMatrial, size: 5, company: searchTextLabourWorkSheet || undefined });
            setLabourWorkSheet(res.content || []);
            setTotalPagesMaterial(res.totalPages || 0);
        } catch (err) {
            console.error("Error fetching Material:", err);
        } finally {
            setLoading(false);
        }
    };



    // ✅ on Mount + Pagination refresh
    useEffect(() => {
        refreshLabourWorkSheet();
    }, [pageMatrial]);

    // ✅ Search with debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTextLabourWorkSheet.trim().length > 0) {
                fetchSearchLabourWorkSheet(searchTextLabourWorkSheet);
            } else {
                refreshLabourWorkSheet();
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTextLabourWorkSheet]);



    // ✅ Add new kharcha
    const handleAddMaterial = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 🧱 Backend returns the saved kharcha object
            const newLabourWorkSheet = await addLabourWorkSheet(formLabourWorkSheet);

            // ✅ Clear all input fields
            setFormLabourWorkSheet({ date: today, company: "", labour: "", work: "" });
            setSearchTextLabourWorkSheet("");
            setPageMaterial(0);

            // ✅ Immediately update state with the new entry on top
            setLabourWorkSheet(prev => [newLabourWorkSheet, ...prev]);

            // ✅ Optionally refresh totals
            setModal(null); // close modal
        } catch (err) {
            console.error("Error adding Material:", err);
        }
    };



    const handleRowClickMaterial = (row: LabourWorkSheet) => {
        setSelectedLabourWorkSheet(row);
        setFormLabourWorkSheet(row);
        setIsEditingLabourWorkSheet(false); // ensure normal view first
    };

    const handleDeleteMaterial = async () => {
        if (!selectedLabourWorkSheet?.id) return;
        if (window.confirm("Are you sure you want to delete this record?")) {
            await deleteLabourWorkSheet(selectedLabourWorkSheet.id);
            alert("Deleted successfully!");
            setSelectedLabourWorkSheet(null);
            await fetchLabourWorkSheet(); // refresh
        }
    };

    const handleUpdateMaterial = async () => {
        if (!selectedLabourWorkSheet?.id) return;
        await updateLabourWorkSheet(selectedLabourWorkSheet.id, formLabourWorkSheet);
        alert("Updated successfully!");
        setSelectedLabourWorkSheet(null);
        await fetchLabourWorkSheet(); // refresh
    };


    const handleModal = (item: ModalType) => {
        setModal(item);
        if (item == "refresh_LabourWorkSheet") {
            fetchLabourWorkSheet();
        }
    };


    return (
        <div className='flex  flex-col my-4 gap-1 w-full '>
            <div className='flex flex-row gap-1 items-center justify-between'>
                <div className='flex flex-row gap-1 items-center '>
                    <label className='text-md font-extrabold'>Labour Work Sheet</label>
                    {loading && <MoonLoader size={12} speedMultiplier={2} color='black' />}
                </div>
                <Dropdown
                    trigger={<div className="hover:bg-gray-100 text-gray-950 p-1 rounded-full">
                        <IconDotsVertical size={20} />
                    </div>}>
                    <button
                        onClick={downloadLabourWorkSheetPdf}
                        className="flex items-center gap-2 w-full px-3 transition-all duration-300 py-2 text-left rounded-lg hover:bg-gray-200 hover:text-black-300 font-regular text-black "
                    >
                        <IconDownload size={18} stroke={3} />Download
                    </button>
                </Dropdown>
            </div>
            <div className='w-full flex flex-col  gap-3'>


                <div className='flex w-full flex-row gap-3 '>
                    <div className='px-3 w-full rounded-lg bg-gray-100  flex flex-row items-center gap-2'>
                        <IconSearch stroke={3} />
                        <input
                            value={searchTextLabourWorkSheet}
                            onChange={(e) => setSearchTextLabourWorkSheet(e.target.value)}
                            className='p-2 placeholder:italic bg-transparent outline-none w-full' type="text" placeholder='Serach company here' />
                        {searchTextLabourWorkSheet && <div onClick={() => handleSearchLabourWorkSheet()} className='flex rounded-sm p-1 bg-gray-300'> <IconListSearch /></div>}
                    </div>

                    <button onClick={() => handleModal("material_Modal")} className='flex flex-row p-1 px-3 w-fit rounded-lg bg-blue-950  items-center gap-2'>
                        <IconPlus stroke={5} size={18} className='text-white' />
                        <div className='text-white font-bold'>Add</div>
                    </button>

                    <button onClick={() => handleModal("refresh_LabourWorkSheet")} className='flex flex-row p-1 px-3 w-fit rounded-lg bg-blue-950  items-center gap-2'>
                        <div className='text-white font-bold'><IconRotateClockwise size={18} /></div>
                    </button>

                </div>

                <div className='flex w-full'>
                    <div className="overflow-x-auto no-scrollbar h-64 w-full border-[1px] p-3 rounded-md bg-gray-100">
                        <table className="w-full ">
                            {/* Header */}
                            <thead>
                                <tr className="border-b-[1px] border-gray-300 py-2 text-gray-500 font-bold">
                                    <th className="px-4 py-2 text-left ">Date</th>
                                    <th className="px-4 py-2 text-left ">Company</th>
                                    <th className="px-4 py-2 text-left ">Labour</th>
                                    <th className="px-4 py-2 text-left ">Work</th>
                                </tr>
                            </thead>

                            {/* Body */}
                            {loading ?
                                <tbody>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse-fast w-full">
                                            <td className="px-4 py-2">
                                                <div className="h-6 bg-gray-300 rounded w-24"></div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="h-6 bg-gray-300 rounded w-32"></div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="h-6 bg-gray-300 rounded w-48"></div>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="h-6 bg-gray-300 rounded w-24"></div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                :
                                <tbody >
                                    {labourWorkSheet?.length > 0 ? (
                                        labourWorkSheet.map((row, i) => (
                                            <tr key={i}
                                                onClick={() => handleRowClickMaterial(row)}
                                                className="hover:bg-yellow-100 cursor-pointer transition-colors"
                                            >
                                                <td className="px-4 text-nowrap text-sm text-gray-500 font-medium py-2">{row.date}</td>
                                                <td className="px-4 text-nowrap text-sm text-red-700 font-bold py-2">{row.company}</td>
                                                <td className="px-4  text-sm text-black font-black py-2">{row.labour}</td>
                                                <td className="px-4 text-sm hover:text-wrap truncate max-w-[150px] overflow-hidden whitespace-nowrap  text-gray-500 font-medium py-2">{row.work}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <div className='flex flex-col w-full items-center py-5'>
                                            <IconZoomExclamationFilled className='text-gray-500' size={60} />
                                            <p className="text-gray-500 text-center text-sm font-bold">No data found!</p>
                                        </div>
                                    )}
                                </tbody>}

                            {selectedLabourWorkSheet && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                    <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px] relative">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-bold ">
                                                {isEditingLabourWorkSheet ? "Edit Material" : "View Material"}
                                            </h3>
                                            <button
                                                onClick={() => setSelectedLabourWorkSheet(null)}
                                                className=" text-gray-500 hover:text-black"
                                            >
                                                <IconX size={20} stroke={3} />
                                            </button>


                                        </div>
                                        {selectedLabourWorkSheet && (
                                            <div className="">
                                                {/* When not editing — show info + edit/delete */}
                                                {!isEditingLabourWorkSheet ? (
                                                    <>
                                                        <div className='flex flex-col gap-3'>
                                                            <p className="bg-gray-100 rounded-xl p-3 w-full">
                                                                <strong>Company:</strong> {selectedLabourWorkSheet.company}
                                                            </p>
                                                            <p className="bg-gray-100 rounded-xl p-3 w-full">
                                                                <strong>Date:</strong> {selectedLabourWorkSheet.date}
                                                            </p>
                                                            <p className="bg-gray-100 rounded-xl p-3 w-full">
                                                                <strong>Labour:</strong> {selectedLabourWorkSheet.labour}
                                                            </p>
                                                            <p className="bg-gray-100 rounded-xl p-3 w-full">
                                                                <strong>Work:</strong> {selectedLabourWorkSheet.work}
                                                            </p>
                                                        </div>
                                                        {/* Edit/Delete buttons visible immediately after clicking row */}
                                                        <div className="flex justify-between mt-4 gap-3">
                                                            <button
                                                                onClick={() => setIsEditingLabourWorkSheet(true)}
                                                                className="bg-blue-950 text-white rounded-xl p-3 px-5 w-full font-bold"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                onClick={handleDeleteMaterial}
                                                                className="bg-red-800 text-white rounded-xl p-3 px-5 w-full font-bold"   >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Edit mode form */}
                                                        <div className='flex flex-col gap-3'>
                                                            <div className='flex flex-col gap-1'>
                                                                <label className="block text-sm font-semibold text-gray-600">
                                                                    Company
                                                                </label>
                                                                <input
                                                                    className="bg-gray-100 rounded-xl p-3 w-full"
                                                                    value={formLabourWorkSheet.company || ""}
                                                                    onChange={(e) => setFormLabourWorkSheet({ ...formLabourWorkSheet, company: (e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className='flex flex-col gap-1'>
                                                                <label className="block text-sm font-semibold text-gray-600">
                                                                    Date
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    className="bg-gray-100 rounded-xl p-3 w-full"
                                                                    value={formLabourWorkSheet.date || ""}
                                                                    onChange={(e) => setFormLabourWorkSheet({ ...formLabourWorkSheet, date: (e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className='flex flex-col gap-1'>
                                                                <label className="block text-sm font-semibold text-gray-600 ">
                                                                    Labour Name
                                                                </label>
                                                                <textarea
                                                                    className="bg-gray-100 rounded-xl p-3 w-full"
                                                                    value={formLabourWorkSheet.labour || ""}
                                                                    onChange={(e) => setFormLabourWorkSheet({ ...formLabourWorkSheet, labour: (e.target.value) })}
                                                                />
                                                            </div>

                                                            <div className='flex flex-col gap-1'>
                                                                <label className="block text-sm font-semibold text-gray-600 mb-1">
                                                                    Work
                                                                </label>
                                                                <input
                                                                    className="bg-gray-100 rounded-xl p-3 w-full"
                                                                    type="text"
                                                                    value={formLabourWorkSheet.work || ""}
                                                                    onChange={(e) => setFormLabourWorkSheet({ ...formLabourWorkSheet, work: (e.target.value) })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-3 mt-4 ">
                                                            <button
                                                                onClick={handleUpdateMaterial}
                                                                className="bg-blue-950 text-white rounded-xl p-3 px-5 w-full font-bold"
                                                            >
                                                                Update
                                                            </button>
                                                            <button
                                                                onClick={() => setIsEditingLabourWorkSheet(false)}
                                                                className="bg-red-800 text-white rounded-xl p-3 px-5 w-full font-bold"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}


                                    </div>
                                </div>
                            )}

                        </table>
                    </div>
                </div>

                <ReusableModal
                    handle={handleAddMaterial}
                    isOpen={modal}
                    onClose={() => setModal(null)}
                    title="Labour Work Sheet"
                    subtitle="Be caution once you entered data you can't edit or delete it later."
                >
                    <div className="flex flex-row gap-3 w-full">
                        <div className="flex font-medium text-sm flex-col w-full">
                            <label className="px-2">Company</label>
                            <input
                                value={formLabourWorkSheet.company}
                                onChange={(e) => setFormLabourWorkSheet({ ...formLabourWorkSheet, company: e.target.value })}
                                className=" bg-gray-100 rounded-xl p-3 w-full"
                                type="text"
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="flex font-medium text-sm flex-col w-fit">
                            <label className="px-2">Labour name</label>
                            <input
                                value={formLabourWorkSheet.labour}
                                onChange={(e) => setFormLabourWorkSheet({ ...formLabourWorkSheet, labour: (e.target.value) })}
                                className=" bg-gray-100 rounded-xl p-3 w-full"
                                type="text"
                                placeholder="Labpur name"
                            />
                        </div>


                    </div>
                    <div className="flex font-medium text-sm flex-col w-full">
                        <label className="px-2">Work name</label>
                        <input
                            value={formLabourWorkSheet.work}
                            onChange={(e) => setFormLabourWorkSheet({ ...formLabourWorkSheet, work: e.target.value })}
                            className=" bg-gray-100 rounded-xl p-3 w-full"
                            type="text"
                            placeholder="Work"
                        />
                    </div>
                    {/* ✅ Date + Buttons same row */}
                    <div className="flex flex-row gap-3 w-full items-center justify-between">
                        <div className="flex font-medium text-sm flex-col w-fit">
                            <label className="px-2">Date</label>
                            <input
                                value={formLabourWorkSheet.date}
                                onChange={(e) => setFormLabourWorkSheet({ ...formLabourWorkSheet, date: e.target.value })}
                                className=" bg-gray-100 rounded-xl p-3 w-full"
                                type="date"
                            />
                        </div>

                        <div className="flex flex-row gap-2 w-fit mt-5 text-sm items-center">
                            <button
                                onClick={() => setModal(null)}
                                className="bg-red-600 text-white rounded-xl p-2.5 px-3 font-bold"
                            >
                                Cancel
                            </button>
                            <button type='submit' className="bg-blue-950 text-white rounded-xl p-2.5 px-5 font-bold">
                                Save
                            </button>
                        </div>
                    </div>
                </ReusableModal>

                <div className="flex gap-2 justify-center w-full overflow-x-auto ">
                    {[...Array(totalPagesMaterial)].map((_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 rounded-lg border ${i === pageMatrial ? "bg-blue-950  font-bold text-white" : "bg-gray-100  font-bold text-blue-900"
                                }`}
                            onClick={() => setPageMaterial(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LabourWorkSheet