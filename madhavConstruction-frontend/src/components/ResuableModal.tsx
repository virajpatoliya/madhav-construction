// 📦 FormModalWrapper.jsx
import { IconChevronRight, IconInfoCircleFilled } from "@tabler/icons-react";

export default function ResuableModal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    handle
}) {
    if (!isOpen) return null;

    return (
        <form onSubmit={handle} className="fixed top-0 p-3 left-0 w-screen h-screen bg-black/50 backdrop-blur-md duration-300 transition-all z-50 flex justify-center items-center">
            <div className="bg-white md:w-1/2 rounded-3xl p-5 relative">
                <div className="flex flex-col gap-2 w-full">

                    {/* Header */}
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row text-xl text-gray-950 items-center font-medium justify-between w-full">
                            <label className="flex flex-row items-center">
                                Add details to{" "}
                                <span className="font-extrabold pl-1">{title}</span>
                                <IconChevronRight stroke={5} size={20} />
                            </label>
                            <IconInfoCircleFilled size={18} />
                        </div>
                        {subtitle && (
                            <div className="text-xs text-gray-400 font-medium">{subtitle}</div>
                        )}
                    </div>

                    {/* Custom Form Body (your layout) */}
                    <div className="mt-3 flex flex-col gap-3">{children}</div>

                    {/* Validation note */}
                    <div className="text-xs text-red-400 font-medium italic mt-2">
                        *Please fill all fields, don’t save null data.
                    </div>
                </div>
            </div>
        </form>
    );
}
