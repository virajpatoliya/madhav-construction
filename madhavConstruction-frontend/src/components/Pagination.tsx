import React, { useState } from "react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page - 1); // backend expects 0-based page index
    };

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium 
            ${page === currentPage ? "bg-accent text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
