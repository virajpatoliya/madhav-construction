import { IconCaretLeftFilled, IconInfoCircleFilled } from "@tabler/icons-react";
import { useState } from "react";

export const InfoTooltip: React.FC<{ message: string }> = ({ message }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative inline-block">
            {/* Info icon */}
            <span
                className="text-white items-center cursor-pointer text-xs"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={() => setShow(!show)} // ✅ for mobile tap
            >
                <IconInfoCircleFilled className='text-white' size={15} />
            </span>

            {/* Tooltip */}
            {show && (
                <div className="absolute flex flex-row left-2.5 shadow-2xl w-40  z-50">
                    <div className='flex absolute -translate-y-5'>
                        <IconCaretLeftFilled className='text-black' />
                    </div>
                    <div className="absolute left-3 -translate-y-1/2 bg-gray-950/90 backdrop-blur-sm text-white text-xs font-light rounded-3xl p-3 shadow-md ">
                        {message}
                    </div>
                </div>
            )
            }
        </div >
    );
};