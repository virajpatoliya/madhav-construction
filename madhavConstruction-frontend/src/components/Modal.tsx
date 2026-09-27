import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    children?: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 p-3 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md rounded-md shadow-lg p-6 relative">
                {/* Close button */}
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                    onClick={onClose}
                >
                    ✖
                </button>

                {title && <h2 className="text-lg text-red-700 font-bold mb-4">{title}</h2>}

                {children}

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
