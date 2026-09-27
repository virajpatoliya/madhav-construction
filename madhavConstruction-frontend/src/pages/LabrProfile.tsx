import InfoModal from '@/components/InfoModal';
import { IconAccessibleFilled, IconAlertTriangleFilled, IconCaretLeftFilled, IconCaretRightFilled, IconCheck, IconChevronLeft, IconChevronRight, IconCircleCheckFilled, IconCoinRupeeFilled, IconCopyPlusFilled, IconDotsVertical, IconDownload, IconExclamationCircleFilled, IconFileSpreadsheet, IconGiftFilled, IconInfoCircleFilled, IconLibraryFilled, IconMoonFilled, IconOctagonPlusFilled, IconPencil, IconPennantFilled, IconPointFilled, IconRotateClockwise, IconSunFilled, IconTrashFilled, IconUserFilled, IconX } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GridLoader, MoonLoader } from 'react-spinners';
import {
    getLabourBySlug,
    deleteLabour,
    addLabourWork,
    downloadLabourWorkPdf,
    editLabourWork,
    deleteWork,
} from "../service/labourService";
import { InfoTooltip } from '@/components/InfoTooltip';
import Dropdown from '@/components/Dropdown';
import SessionExpiredCard from '@/components/SessionExpiredCard';

export interface WorkData {
    id?: string;
    date: string;
    borrow: number;
    companyName: string;
    discription: string;
    workDay: string;
    extraMoney: number;
}

export interface Labour {
    id: string;
    publicId: string;
    slug: string;
    labourName: string;
    companyName: string;
    salary: number;
    borrow: number;
    currentPage: number;
    totalPages: number;
    workData: WorkData[];
    createdAt: string;
    totalBorrow: number;
    unpaid: number;
}

const FinalAmount = (salary: number, borrow: number): number => salary - borrow;

export const LabrProfile = () => {
    const tableRef = useRef<HTMLTableElement | null>(null);
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [loading, setLoader] = useState(true);
    const [isOpen, setOpenId] = useState<string | null>(null);

    const navigate = useNavigate();
    const [extraMoney, setExtraMoney] = useState("");
    const [newWork, setNewWork] = useState<WorkData>({
        date: today,
        borrow: 0,
        companyName: "",
        discription: "",
        workDay: "Full day",
        extraMoney: 0,
    });
    const { slugAndId } = useParams();
    const [labour, setLabour] = useState<Labour | null>(null);
    const [page, setPage] = useState(0);
    const handleSubmit = (bill) => {
        // do something
        navigate(`${bill}`); // redirect to About
    }
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedWork, setEditedWork] = useState<WorkData | null>(null);
    const [modal, setModal] = useState<ModalType>(null);
    const [query, setQuery] = useState("");
    const [deleteName, setDeleteName] = useState("");
    type ModalType = "addLabour_Data_Modal" | "salary_Modal" | "extra_Modal" | "refresh" | "given_Modal" | "upaid_Modal" | "delete" | null;
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest("td")) {
                setOpenId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    useEffect(() => {
        fetchLabour();
    }, [slugAndId, page]);


    const fetchLabour = async () => {
        if (!slugAndId) return;
        setLoader(true);
        try {
            const res = await getLabourBySlug(slugAndId, page, 10);
            setLabour({
                ...res.labour,
                currentPage: res.currentPage,
                totalPages: res.totalPages,
                totalItems: res.totalItems,
            });
        } catch (err) {
            console.error("Error fetching labour:", err);
            setLabour(null);
        } finally {
            setLoader(false);
        }
    };
    const handleDelete = async () => {
        if (!slugAndId) return;
        try {
            await deleteLabour(slugAndId);
            setModal(null);
            navigate("/dashboard"); // ✅ redirect
        } catch (err) {
            console.error("Error deleting labour:", err);
        }
    };


    const handleAddWork = async () => {
        if (!labour || !slugAndId) return;

        // Update UI instantly
        const updatedWorkData = [...labour.workData, newWork];
        setLabour({ ...labour, workData: updatedWorkData });
        try {
            await addLabourWork(slugAndId, newWork);
            setModal(null);
        } catch (err) {
            console.error("Error adding work:", err);
        }
    }

    useEffect(() => {
        const table = tableRef.current;
        if (!table) return;

        const cols = table.querySelectorAll('th');

        cols.forEach((col) => {
            const resizer = document.createElement('div');
            resizer.style.width = '5px';
            resizer.style.height = '100%';
            resizer.style.position = 'absolute';
            resizer.style.right = '0';
            resizer.style.top = '0';
            resizer.style.cursor = 'col-resize';
            resizer.style.userSelect = 'none';

            col.style.position = 'relative';
            col.appendChild(resizer);

            let startX: number;
            let startWidth: number;

            resizer.addEventListener('mousedown', (e) => {
                startX = e.clientX;
                startWidth = col.offsetWidth;

                const onMouseMove = (e: MouseEvent) => {
                    const newWidth = startWidth + (e.clientX - startX);
                    col.style.width = `${newWidth}px`;
                };

                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });
    }, []);

    const handleModal = (item: ModalType) => {
        setModal(item);
        if (item == "refresh") {
            setOpenId(null);
            fetchLabour();
        }

    };


    const handleDeleteWork = async (workId: string) => {
        try {
            const slugAndId = `${labour.slug}-${labour.publicId}`;
            await deleteWork(slugAndId, workId);

            setLabour((prev) => ({
                ...prev,
                workData: prev.workData.filter((w) => w.id !== workId),
            }));
        } catch (err) {
            console.error("❌ Failed to delete work:", err);
        }
    };

    const formatted = (createdAt) => {
        return new Date(createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short", // "May"
            year: "numeric"
        });
    }

    const getWorkDayClass = (workDay) => {
        switch (workDay) {
            case 'Leave':
                return 'bg-red-800 text-white';
            case 'Half day':
            case 'Half night':
                return 'bg-yellow-500 text-black';
            default:
                return 'bg-blue-950 text-white';
        }
    };
    return (
        <div className='w-full flex pt-8 md:pt-14 justify-center'>
            <div className='flex flex-col w-full  justify-center bg-white shadow-2xl  md:mt-10'>
                <div className="bg-blue-950 flex flex-row text-white items-center p-2 text-md font-medium">
                    <div className="bg-yellow-500 w-7 h-7 mx-4 text-black rounded-full flex items-center justify-center">
                        <IconChevronLeft stroke={2} onClick={() => navigate(-1)} size={25} />
                    </div>
                    <IconUserFilled size={20} />
                    <div className="text-lg font-bold">Labour Profile</div>
                </div>
                <div className='flex flex-col space-y-1 mt-3'>
                    <div className='flex flex-col items-center w-full px-4 gap-3 '>

                        <div className='flex flex-col gap-3 w-full '>
                            <div className='w-full flex flex-row gap-3 items-center justify-between'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row justify-between items-center w-full'>
                                        <div className='flex flex-row gap-1 items-center w-full'>
                                            <div className='text-lg font-bold'>Labour info</div>
                                            <IconInfoCircleFilled className='text-gray-500' size={18} />
                                        </div>

                                        <div className='flex flex-row items-center justify-center '>
                                            <button onClick={() => handleModal("addLabour_Data_Modal")} className='flex transition-transform active:scale-95 cursor-pointer flex-row gap-2 bg-gray-100 rounded-full p-2 px-3 h-fit w-fit text-sm items-center'>
                                                <span className='text-blue-950 font-bold'><IconOctagonPlusFilled size={15} /></span>
                                                <span className='text-xs font-bold'>Record</span>
                                            </button>
                                            <div className='flex items-center'>
                                                <Dropdown
                                                    trigger={<div className="text-gray-950 p-1 rounded-full">
                                                        <IconDotsVertical size={20} />
                                                    </div>
                                                    }
                                                >
                                                    <button
                                                        onClick={() => handleModal("delete")}
                                                        className="flex items-center gap-2 w-full px-3 transition-all duration-300 py-2 text-left rounded-lg hover:bg-red-900 hover:text-red-300 font-semibold text-red-600 "
                                                    >
                                                        <IconTrashFilled size={20} /> Delete
                                                    </button>
                                                    <button
                                                        onClick={() => handleModal("refresh")}
                                                        className="flex items-center gap-2 w-full px-3 transition-all duration-300 py-2 text-left rounded-lg hover:bg-gray-200 hover:text-black-300 font-regular text-black "
                                                    >
                                                        <IconRotateClockwise size={18} stroke={3} /> Refresh
                                                    </button>
                                                    <button
                                                        onClick={() => downloadLabourWorkPdf(`${labour.slug}/${labour.publicId}`)}
                                                        className="flex items-center gap-2 w-full px-3 transition-all duration-300 py-2 text-left rounded-lg hover:bg-gray-200 hover:text-black-300 font-regular text-black "
                                                    >
                                                        <IconDownload size={18} stroke={3} /> Download
                                                    </button>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-xs w-full text-gray-400 font-medium '>
                                        You can add data and delete this profile.
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex flex-col md:flex-row gap-2 md:gap-3 items-center justify-center'>
                                <div className='flex flex-col  w-full '>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <div className='flex-row flex gap-1 items-center'>
                                            <IconAccessibleFilled size={20} />
                                            <label className='text-md font-bold'> Personel detail</label>
                                        </div>
                                        {loading && <MoonLoader size={12} speedMultiplier={2} color='black' />}
                                    </div>
                                    <div className='flex flex-row gap-3 w-full items-center'>
                                        <div>
                                            <div className='bg-gray-100 w-28 flex flex-nowrap h-28 p-2 object-cover rounded-full'>
                                                {loading ? <div className=' w-24 flex flex-nowrap h-24 rounded-full p-2 bg-gray-300 animate-pulse-fast  '></div> : <img src='/images/labourlogo.webp' alt='labourlogo' />}
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-full p-3 gap-2 rounded-lg bg-gray-100 '>
                                            <div className='flex flex-row justify-between w-full '>
                                                <div className='flex flex-col w-full '>
                                                    <label className='text-sm font-bold text-gray-400'>Name</label>
                                                    {loading ? <div className='p-3 bg-gray-300 animate-pulse-fast rounded-lg '></div> : <div className='text-sm font-medium text-black'>{labour?.labourName}</div>}
                                                </div>
                                                <div> {labour?.totalBorrow == 0 ? <div className='text-gray-400'><IconSunFilled size={25} /></div> : <div className='flex flex-row text-gray-500 items-center gap-2 '><div><IconMoonFilled size={18} /></div><div><IconGiftFilled size={20} /></div></div>}

                                                </div>
                                            </div>
                                            <div className='flex flex-col w-full '>
                                                <label className='text-sm font-bold text-gray-400'>Company</label>
                                                {loading ? <div className='p-3 bg-gray-300 animate-pulse-fast rounded-lg '></div> : <div className='text-sm font-medium text-black'>{labour?.companyName}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-1 w-full h-full '>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <div className='flex-row flex gap-1 items-center'>
                                            <IconLibraryFilled size={20} />
                                            <label className='text-md font-bold'> Account detail</label>
                                        </div>
                                        {loading && <MoonLoader size={12} speedMultiplier={2} color='black' />}
                                    </div>
                                    <div className='flex flex-row gap-3 w-full h-full overflow-x-auto no-scrollbar items-center'>

                                        <div onClick={() => handleModal("salary_Modal")} className='flex flex-col px-6 hover:scale-[1.01] cursor-pointer active:scale-95 transition-all w-full p-3 h-full justify-center gap-1 items-center rounded-xl bg-green-800 '>
                                            <div className='flex-row flex gap-1 items-center'>
                                                <IconCoinRupeeFilled size={18} className='text-white' />
                                                <label className='text-sm font-bold text-white'>Roj</label>
                                            </div>
                                            {loading ? <GridLoader size={5} color='white' /> : <div className='text-lg md:text-2xl font-extrabold text-green-300'>Rs.{labour?.salary}</div>}
                                        </div>

                                        <div onClick={() => handleModal("given_Modal")} className='flex flex-col px-6 hover:scale-[1.01] cursor-pointer active:scale-95 transition-all w-full p-3 h-full justify-center gap-1 items-center rounded-xl bg-sky-800 '>
                                            <div className='flex-row flex gap-1 items-center'>
                                                <IconCircleCheckFilled size={18} className='text-white' />
                                                <label className='text-sm font-bold text-white'>Uppad</label>
                                            </div>
                                            {loading ? <GridLoader size={5} color='white' /> : <div className='text-lg  md:text-2xl  font-extrabold text-sky-300'>Rs.{labour?.borrow}</div>}
                                        </div>


                                        <div
                                            onClick={() => handleModal("upaid_Modal")}
                                            className={`flex flex-col px-6 cursor-pointer hover:scale-[1.01] active:scale-95  transition-all w-full p-3 h-full justify-center gap-1 items-center rounded-xl
                                                    ${labour?.unpaid > 0
                                                    ? "bg-red-800"      // still owed
                                                    : labour?.unpaid < 0
                                                        ? "bg-yellow-700"   // owner took money back
                                                        : "bg-gray-700"     // fully settled
                                                }`}
                                        >
                                            <div className="flex-row flex gap-1 items-center">
                                                <IconExclamationCircleFilled size={18} className="text-white" />
                                                <label className="text-sm font-bold text-nowrap text-white">
                                                    {labour?.unpaid < 0 ? "Taken Back" : "Unpaid"}
                                                </label>
                                            </div>

                                            {loading ? (
                                                <GridLoader size={5} color="white" />
                                            ) : (
                                                <div
                                                    className={`text-lg md:text-2xl font-extrabold
                                                          ${labour?.unpaid > 0
                                                            ? "text-red-300"
                                                            : labour?.unpaid < 0
                                                                ? "text-yellow-300"
                                                                : "text-gray-300"
                                                        }`}
                                                >
                                                    Rs.{Math.abs(labour?.unpaid)}
                                                </div>
                                            )}
                                        </div>

                                        <div onClick={() => handleModal("extra_Modal")} className='flex flex-col px-6 cursor-pointer hover:scale-[1.01] active:scale-95 transition-all w-full p-3 h-full justify-center gap-1 items-center rounded-xl  bg-violet-800 '>
                                            <div className='flex-row flex gap-1 items-center'>
                                                <IconGiftFilled size={18} className='text-white' />
                                                <label className='text-sm font-bold text-white'>Extra</label>
                                            </div>
                                            {loading ? <GridLoader size={5} color='white' /> : <div className='text-lg  md:text-2xl font-extrabold text-violet-300'>Rs.{labour?.totalBorrow}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row  my-1 w-full  items-center justify-end'>
                                <IconPointFilled size={10} className='text-gray-400' />
                                <span className='text-xs font-bold text-gray-400'>Joined since</span>
                                <span className='text-xs font-regular pl-1 text-gray-900 italic'>{labour?.createdAt == null ? "no data" : formatted(labour?.createdAt)}</span>
                            </div>
                        </div>

                        <div className='flex  flex-col mb-4 gap-1 w-full '>
                            <div className='flex flex-row justify-between w-full'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <div className='flex-row flex gap-1 items-center'>
                                        <  IconFileSpreadsheet size={20} />
                                        <label className='text-md font-bold'> Records</label>
                                    </div>
                                    {loading && <MoonLoader size={12} speedMultiplier={2} color='black' />}
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-3">
                                <div className="flex w-full">
                                    <div className="relative overflow-x-auto no-scrollbar w-full border p-3 rounded-3xl bg-gray-100">
                                        <table ref={tableRef} className="w-full">
                                            {/* Header */}
                                            <thead>
                                                <tr className="border-b border-gray-300 py-2 text-gray-900 font-bold">
                                                    <th className="px-4 py-2 text-left">Date</th>
                                                    <th className="px-4 py-2 text-left">Company</th>
                                                    <th className="px-4 py-2 text-left">Description</th>
                                                    <th className="px-4 py-2 text-left">Money</th>
                                                    <th className="px-4 py-2 text-left text-nowrap">Work time</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {loading ? (
                                                    Array.from({ length: 10 }).map((_, i) => (
                                                        <tr key={i} className="animate-pulse-fast">
                                                            {Array.from({ length: 5 }).map((__, j) => (
                                                                <td key={j} className="px-4 py-2">
                                                                    <div className="h-6 bg-gray-300 rounded w-24"></div>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))
                                                ) : labour?.workData && labour.workData.length > 0 ? (
                                                    labour.workData.map((entry, index) => (
                                                        <tr
                                                            key={entry.id || index}
                                                            className="hover:bg-gray-300 cursor-pointer transition-all"
                                                        >
                                                            {/* Date */}
                                                            <td className="px-4 py-2 text-teal-700 font-semibold text-nowrap">
                                                                {editingIndex === index ? (
                                                                    <input
                                                                        type="date"
                                                                        value={editedWork?.date || entry.date}
                                                                        onChange={(e) =>
                                                                            setEditedWork({ ...editedWork, date: e.target.value })
                                                                        }
                                                                        className="border p-1 rounded-lg w-fit"
                                                                    />
                                                                ) : (
                                                                    entry.date
                                                                )}
                                                            </td>

                                                            {/* Company */}
                                                            <td className="px-4 py-2 text-blue-900 font-extrabold text-nowrap">
                                                                {editingIndex === index ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedWork?.companyName || entry.companyName}
                                                                        onChange={(e) =>
                                                                            setEditedWork({
                                                                                ...editedWork,
                                                                                companyName: e.target.value,
                                                                            })
                                                                        }
                                                                        className="border p-1 rounded-lg w-fit"
                                                                    />
                                                                ) : (
                                                                    entry.companyName
                                                                )}
                                                            </td>

                                                            {/* Description */}
                                                            <td className="px-4 py-2 text-black truncate max-w-[150px] overflow-hidden">
                                                                {editingIndex === index ? (
                                                                    <input
                                                                        type="text"
                                                                        value={editedWork?.discription || entry.discription}
                                                                        onChange={(e) =>
                                                                            setEditedWork({
                                                                                ...editedWork,
                                                                                discription: e.target.value,
                                                                            })
                                                                        }
                                                                        className="border p-1 rounded-lg w-fit"
                                                                    />
                                                                ) : (
                                                                    entry.discription
                                                                )}
                                                            </td>

                                                            {/* Borrow */}
                                                            <td className="px-4 py-2 text-red-900 font-bold">
                                                                {editingIndex === index ? (
                                                                    <input
                                                                        type="number"
                                                                        value={editedWork?.borrow ?? entry.borrow}
                                                                        onChange={(e) =>
                                                                            setEditedWork({
                                                                                ...editedWork,
                                                                                borrow: Number(e.target.value),
                                                                            })
                                                                        }
                                                                        className="border p-1 rounded-lg w-fit"
                                                                    />
                                                                ) : (
                                                                    `Rs.${entry.borrow}`
                                                                )}
                                                            </td>

                                                            {/* Work Day */}
                                                            <td className={`px-4 py-2 ${getWorkDayClass(entry.workDay)}`}>
                                                                {editingIndex === index ? (
                                                                    <select
                                                                        value={editedWork?.workDay || entry.workDay}
                                                                        onChange={(e) =>
                                                                            setEditedWork({
                                                                                ...editedWork,
                                                                                workDay: e.target.value,
                                                                            })
                                                                        }
                                                                        className="bg-transparent text-white font-extrabold outline-none w-fit p-1 rounded-2xl"
                                                                    >
                                                                        <option className="bg-blue-950" value="Full day">
                                                                            Full day
                                                                        </option>
                                                                        <option className="bg-yellow-600" value="Half day">
                                                                            Half day
                                                                        </option>
                                                                        <option className="bg-red-700" value="Leave">
                                                                            Leave
                                                                        </option>
                                                                    </select>
                                                                ) : (
                                                                    <span className="text-white font-semibold text-sm">
                                                                        {entry.workDay}
                                                                    </span>
                                                                )}
                                                            </td>

                                                            {/* Actions */}
                                                            <td className="px-1">
                                                                {editingIndex === index ? (
                                                                    <div className="flex gap-1">
                                                                        <button
                                                                            className="text-gray-900 hover:text-white hover:bg-gray-900 p-1 rounded-lg"
                                                                            onClick={async () => {
                                                                                if (!editedWork) return;
                                                                                try {
                                                                                    const workId = entry.id || crypto.randomUUID();
                                                                                    editedWork.id = workId;
                                                                                    await editLabourWork(
                                                                                        `${labour.slug}-${labour.publicId}`,
                                                                                        workId,
                                                                                        editedWork
                                                                                    );
                                                                                    const updatedWorkData = [...labour.workData];
                                                                                    updatedWorkData[index] = { ...editedWork };
                                                                                    setLabour({
                                                                                        ...labour,
                                                                                        workData: updatedWorkData,
                                                                                    });
                                                                                    setEditingIndex(null);
                                                                                } catch (err) {
                                                                                    console.error(err);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <IconCopyPlusFilled size={20} />
                                                                        </button>
                                                                        <button
                                                                            className="hover:text-white hover:bg-gray-900 text-red-800 p-1 rounded-lg"
                                                                            onClick={() => setEditingIndex(null)}
                                                                        >
                                                                            <IconX size={20} stroke={3} />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="relative">
                                                                        <Dropdown
                                                                            trigger={
                                                                                <div
                                                                                    className="hover:bg-gray-200 text-gray-950 ml-3 rounded-full cursor-pointer p-1"
                                                                                    role="button"
                                                                                    tabIndex={0}
                                                                                >
                                                                                    <IconDotsVertical size={20} />
                                                                                </div>
                                                                            }
                                                                            usePortal={true}
                                                                        >
                                                                            <div className="flex flex-col">
                                                                                <button
                                                                                    onClick={() => handleDeleteWork(entry.id)}
                                                                                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-900 hover:text-red-300 font-semibold text-red-600"
                                                                                >
                                                                                    <IconTrashFilled size={16} /> Delete Bill
                                                                                </button>

                                                                                <button
                                                                                    onClick={() => {
                                                                                        setEditingIndex(index);
                                                                                        setEditedWork({ ...entry });
                                                                                        setOpenId(null);
                                                                                    }}
                                                                                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-300 text-gray-900"
                                                                                >
                                                                                    <IconPencil size={16} /> Edit
                                                                                </button>
                                                                            </div>
                                                                        </Dropdown>

                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={6} className="text-center py-4 text-gray-500">
                                                            No work data found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>


                            <div className="flex justify-end my-1">
                                {/* {labour && ( */}
                                <div className='flex  items-center flex-row gap-1'>
                                    {/* Previous */}
                                    <button
                                        onClick={() => setPage((p) => Math.max(p - 1, 0))}
                                        disabled={labour?.currentPage === 0}
                                        className=" disabled:opacity-50"
                                    >
                                        <IconCaretLeftFilled size={20} />
                                    </button>

                                    {/* Page numbers */}
                                    {Array.from({ length: labour?.totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i)}
                                            className={`p-1 h-8 w-8 font-extrabold text-xs rounded-lg  ${i === labour.currentPage
                                                ? "bg-blue-950 text-white"
                                                : "bg-gray-100 text-black"
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    {/* Next */}
                                    <button
                                        onClick={() =>
                                            setPage((p) => Math.min(p + 1, labour?.totalPages - 1))
                                        }
                                        disabled={labour?.currentPage === labour?.totalPages - 1}
                                        className="disabled:opacity-50"
                                    >
                                        <IconCaretRightFilled size={20} />
                                    </button>
                                </div>
                                {/* )} */}
                            </div>
                        </div>

                        {modal === "salary_Modal" && (
                            <InfoModal
                                open={true}
                                onClose={() => setModal(null)}
                                bgColor="bg-green-800"
                                icon={IconCoinRupeeFilled}
                                title="Salary info"
                                labourName={labour.labourName + "."}
                                description="The salary of labour "
                                labelIcon={IconCoinRupeeFilled}
                                label="Salary"
                                amount={"Rs." + labour.salary}
                                amountColor="text-green-800"
                                footer="The Salary amount is total amount you have to pay wages monthly, It may be editable further."
                            />
                        )}

                        {modal === "given_Modal" && (
                            <InfoModal
                                open={true}
                                onClose={() => setModal(null)}
                                bgColor="bg-sky-800"
                                icon={IconCircleCheckFilled}
                                title="Given info"
                                description="You have already paid the wages to "
                                labourName={labour.labourName + "."}
                                labelIcon={IconCircleCheckFilled}
                                label="Given wages amount"
                                amount={"Rs." + labour.borrow}
                                amountColor="text-sky-800"
                                footer="The Given amount will get deduct from the salary only."
                            />
                        )}

                        {modal === "upaid_Modal" && (
                            <InfoModal
                                open={true}
                                onClose={() => setModal(null)}
                                bgColor="bg-red-800"
                                icon={IconExclamationCircleFilled}
                                title="Unpaid info"
                                labourName={labour.labourName + "."}
                                description="You have not yet paid the wages to "
                                labelIcon={IconExclamationCircleFilled}
                                label="Unpaid wages amount"
                                amount={"Rs." + labour.unpaid}
                                amountColor="text-red-800"
                                footer="The Unpaid amount will get reset to 0 automatically, in the beginning of the new month."
                            />
                        )}

                        {modal === "extra_Modal" && (
                            <InfoModal
                                open={true}
                                onClose={() => setModal(null)}
                                bgColor="bg-violet-800"
                                icon={IconGiftFilled}
                                title="Extra info"
                                labourName={labour.labourName + "."}
                                description="This extra money is your bonus money for your night working hours. "
                                labelIcon={IconGiftFilled}
                                label="Extra wages"
                                amount={"Rs." + labour.totalBorrow}
                                amountColor="text-violet-800"
                                footer="The extra amount will get reset to 0 automatically, in the beginning of the new month."
                            />
                        )}


                        {modal == "addLabour_Data_Modal" && <div className='fixed top-0 p-3 left-0 w-screen h-screen bg-black/50 backdrop-blur-md duration-300 transition-all  z-50 flex justify-center items-center'>
                            <div className='bg-white  md:w-1/2 rounded-3xl p-5 relative'>
                                <div className='flex flex-col gap-2 w-full'>

                                    <div className='flex flex-col w-full'>
                                        <div className='flex flex-row text-xl text-gray-950 items-center font-medium justify-between w-full'>
                                            <label className='flex flex-row items-center'>Add details to  <span className='font-extrabold pl-1'>Record</span><IconChevronRight stroke={5} size={20} /> </label>
                                            <InfoTooltip message='Here you can add new details in the time track sheet.' />
                                        </div>
                                        <div className='text-xs text-gray-400 font-medium '>
                                            Be caution once you entered data you can't edit or delete it later.
                                        </div>
                                    </div>


                                    <div className='flex flex-row gap-3 mt-3 w-full'>
                                        <div className='flex font-medium text-sm flex-col w-full'>
                                            <label className='px-2'>Company</label>
                                            <input value={newWork.companyName}
                                                onChange={(e) => setNewWork({ ...newWork, companyName: e.target.value })} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="text" placeholder='Enter company name' />
                                        </div>

                                        <div className='flex font-medium text-sm flex-col w-fit'>
                                            <label className='px-2'>Borrow</label>
                                            <input id='number' value={newWork.borrow}
                                                onChange={(e) => setNewWork({ ...newWork, borrow: Number(e.target.value) })} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="number" placeholder='Enter money' />
                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-3 mt-3 w-full'>
                                        <div className='flex flex-col md:flex-row w-fit gap-3  items-center justify-center'>
                                            <div className='flex font-medium text-sm flex-col w-full'>
                                                <label className='px-2'>Work time</label>

                                                <select
                                                    id="workday "
                                                    name="workday"
                                                    value={newWork.workDay}
                                                    onChange={(e) => setNewWork({ ...newWork, workDay: e.target.value, extraMoney: e.target.value === "Full night" ? newWork.extraMoney ?? 0 : 0, })}

                                                    required
                                                    className='border-2 bg-gray-100 border-none rounded-xl p-3 w-fit'
                                                >
                                                    <option value="Full day">Full day</option>
                                                    <option value="Half day">Half day</option>
                                                    <option value="Full night">Full Night</option>
                                                    <option value="Half night">Half Night</option>
                                                    <option value="Leave">Leave</option>
                                                </select>
                                            </div>
                                        </div>
                                        {(newWork.workDay === "Full night" || newWork.workDay === "Half night") && (
                                            <div className='flex font-medium text-sm flex-col w-fit'>
                                                <label className='px-2'>Extra Money</label>
                                                <input id='number' value={newWork.extraMoney}
                                                    onChange={(e) => setNewWork({ ...newWork, extraMoney: Number(e.target.value) })} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="number" placeholder='Enter money' />
                                            </div>
                                        )}
                                        <div className='flex font-medium text-sm flex-col w-full'>
                                            <label className='px-2'>Description</label>
                                            <input id='company' value={newWork.discription}
                                                onChange={(e) => setNewWork({ ...newWork, discription: e.target.value })} required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="text" placeholder='Write ' />
                                        </div>
                                    </div>


                                    <div className='flex flex-row gap-3 w-full items-center justify-between'>
                                        <div className='flex font-medium text-sm flex-col w-fit'>
                                            <label className='px-2'>Date</label>
                                            <input value={newWork.date}
                                                onChange={(e) => setNewWork({ ...newWork, date: e.target.value })} id='date' required className='border-2 outline-black bg-gray-100 border-none rounded-xl p-3 w-full' type="date" placeholder='Write ' />
                                        </div>

                                        <div className='flex flex-row gap-2 w-fit mt-5 text-sm items-center'>
                                            <button onClick={() => setModal(null)} className='bg-red-600 text-white rounded-xl p-2.5 px-3 font-bold'>Cancel</button>
                                            <button onClick={handleAddWork} className='bg-blue-950 text-white rounded-xl p-2.5 px-5 font-bold'>Save</button>
                                        </div>

                                    </div>
                                    <div className='text-xs text-red-400 font-medium italic'>
                                        *Please fill all field given above, don't save null data.
                                    </div>
                                </div>
                            </div>
                        </div>
                        }

                        {modal == "delete" && (
                            <div className="fixed top-0 p-3 left-0 w-screen h-screen bg-black/50 backdrop-blur-md duration-300 transition-all z-50 flex justify-center items-center">
                                <div className="bg-white md:w-1/2 rounded-3xl p-5 relative">
                                    <div className="flex flex-col gap-4 w-full">


                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-row text-xl text-gray-950 items-center font-medium justify-between w-full">
                                                <div className="flex flex-row gap-1 items-center w-full">
                                                    <label className="flex flex-row font-extrabold items-center">
                                                        Delete labour account <IconChevronRight stroke={5} size={20} />
                                                    </label>
                                                </div>
                                                <IconInfoCircleFilled size={18} />
                                            </div>
                                            <div className="text-xs text-gray-400 font-medium">
                                                To delete the labour account please type the name in the box below.
                                            </div>
                                        </div>


                                        {deleteName !== "" && deleteName !== labour.labourName && (
                                            <div className='w-full flex justify-center'>
                                                <div className="font-semibold w-fit bg-red-200 rounded-md p-1 px-3 text-center text-md text-red-600">
                                                    Name did not match!
                                                </div>
                                            </div>
                                        )}


                                        <div className="flex font-medium text-sm flex-col w-full">
                                            <label className="px-2 pb-1 font-semibold">Enter labour name to delete account</label>
                                            <div className={` items-center flex flex-row justify-center border-2 rounded-xl  w-full text-red-700 font-extrabold bg-gray-100 ${deleteName !== "" && deleteName !== labour.labourName
                                                ? "border-red-500 outline-red-500"
                                                : "border-none outline-black"
                                                }`}>
                                                <input
                                                    required
                                                    value={deleteName}
                                                    onChange={(e) => setDeleteName(e.target.value)}
                                                    className="p-3 outline-none w-full text-red-700 font-extrabold bg-transparent"
                                                    type="text"
                                                    placeholder="Write labour name here"
                                                />
                                                <div className='px-2'>
                                                    <IconCheck className={`text-green-600 ${labour.labourName === deleteName ? "visible" : "invisible"}`} size={20} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Warning */}
                                        <div className="text-sm font-semibold items-center gap-1 flex flex-row bg-yellow-400 p-3 rounded-xl text-red-600 italic">

                                            <IconAlertTriangleFilled size={20} />
                                            You will lose all the data of this labour and cannot recover it once deleted!
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex flex-row gap-3 w-full items-center justify-between">
                                            <div className="flex flex-row gap-4 w-full justify-end text-sm items-center">
                                                <button
                                                    onClick={() => setModal(null)}
                                                    className="bg-blue-950 text-white rounded-xl p-2.5 px-3 font-bold"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleDelete()}
                                                    disabled={deleteName !== labour.labourName}
                                                    className={`rounded-xl p-2.5 px-5 font-bold ${deleteName === labour.labourName
                                                        ? "bg-red-600 text-white cursor-pointer"
                                                        : "bg-red-300 text-gray-100 cursor-not-allowed"
                                                        }`}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}




                    </div>
                </div>
            </div>
        </div >
    )
}
