import React, { useEffect, useRef } from "react";
import { IconDotsVertical, IconPencil, IconTrashFilled } from "@tabler/icons-react";
import AnimatedSection from "@/components/AnimatedSection";

const BillCard = ({ b, onDelete, setEditing, openId, setOpenId }) => {
    const isOpen = openId === b.id;
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpenId(null);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setOpenId]);

    return (
        <AnimatedSection animation="fade-in">
            <div
                onClick={() => setEditing(b)}
                className="hover:bg-gray-200  hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer gap-1 flex flex-col bg-gray-100 p-3 min-h-full rounded-2xl"
            >
                <div className="flex items-center flex-row justify-between  relative">
                    <span className="text-xs text-gray-500 font-regular">{b.date}</span>

                    {/* Dots button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenId(isOpen ? null : b.id); // toggle dropdown
                        }}
                        className="hover:bg-gray-300 text-gray-400 rounded-full"
                    >
                        <IconDotsVertical size={20} />
                    </button>

                    {/* Dropdown menu */}
                    {isOpen && (
                        <div
                            ref={dropdownRef}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-6 bg-white text-sm shadow-md p-1 rounded-xl  w-32 z-10"
                        >
                            <button
                                onClick={() => onDelete(b.id)}
                                className="flex items-center gap-2 w-full px-3 transition-all duration-300 py-2 text-left rounded-lg hover:bg-red-900 hover:text-red-300 font-semibold text-red-600 "
                            >
                                <IconTrashFilled size={16} /> Delete Bill
                            </button>
                            <button
                                onClick={() => onDelete(b.id)}
                                className="flex items-center hover:bg-gray-200 transition-all duration-300 rounded-lg  gap-2 w-full px-3 py-2 text-left font-regular text-gray-900 "
                            >
                                <IconPencil size={16} /> Edit
                            </button>
                        </div>
                    )}
                </div>

                <span className="text-3xl truncate text-blue-900 font-black">{b.companyName}</span>
                <span className="text-sm truncate text-black font-medium">{b.workName}</span>
                <span className="text-sm truncate text-gray-500 font-bold">{b.billNo}</span>

            </div>
        </AnimatedSection>
    );
};

export default BillCard;
