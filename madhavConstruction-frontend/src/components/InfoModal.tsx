import { IconX } from "@tabler/icons-react";

function InfoModal({
    open,
    labourName,
    onClose,
    bgColor,
    icon: Icon,
    title,
    description,
    labelIcon: LabelIcon,
    label,
    amount,
    amountColor,
    footer
}) {
    if (!open) return null;

    return (
        <div className="fixed top-0 p-3 left-0 w-screen h-screen bg-black/50 backdrop-blur-md duration-300 transition-all z-50 flex justify-center items-center">
            <div className={`${bgColor} md:w-1/2 rounded-3xl p-5 relative`}>
                <div className="flex flex-col gap-2 w-full">

                    {/* Header */}
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row gap-1 items-center w-full">
                            <Icon size={24} className="text-white" />
                            <div className="text-lg font-bold text-white">{title}</div>
                        </div>
                        <IconX onClick={onClose} className="text-white cursor-pointer" size={20} />
                    </div>

                    {/* Description */}
                    <div className="text-sm font-regular text-white">{description} <span className="font-bold"> {labourName}</span></div>

                    {/* Amount box */}
                    <div className="flex flex-row gap-3 bg-gray-100 rounded-xl p-3 items-center justify-center">
                        <div className="flex-row flex gap-1 items-center">
                            <LabelIcon size={18} className="text-gray-900" />
                            <label className="text-sm font-bold text-gray-900">{label}</label>
                        </div>
                        <div className={`text-lg md:text-xl font-black ${amountColor}`}>{amount}</div>
                    </div>

                    {/* Footer note */}
                    <div className="text-xs font-regular text-red-100">{footer}</div>
                </div>
            </div>
        </div>
    );
}

export default InfoModal;
