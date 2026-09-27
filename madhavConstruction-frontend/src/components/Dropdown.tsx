import { useState, useEffect, useRef } from "react";

type DropdownProps = {
    trigger: React.ReactNode; // button/icon to open dropdown
    children: React.ReactNode; // dropdown menu items
};

export default function Dropdown({ trigger, children }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // close dropdown if clicked outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative text-left">
            {/* ✅ FIX: replaced <button> with <div role="button"> to avoid nested button warning */}
            <div
                role="button"
                tabIndex={0}
                onClick={() => setOpen((prev) => !prev)}
                className="inline-block cursor-pointer select-none z-10"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setOpen((prev) => !prev);
                }}
            >
                {trigger}
            </div>

            {open && (
                <div className="absolute right-0 w-40 p-1 bg-white shadow-md rounded-lg z-50">
                    {children}
                </div>
            )}
        </div>
    );
}
