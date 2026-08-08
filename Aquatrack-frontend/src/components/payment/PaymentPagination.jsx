import React from "react";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// ==========================================
// Payment Pagination
// ==========================================

const PaymentPagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}) => {

    if (totalPages <= 1) return null;

    // ==========================================
    // Generate Page Numbers
    // ==========================================

    const getPageNumbers = () => {

        const pages = [];

        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            end = Math.min(totalPages, 5);
        }

        if (currentPage >= totalPages - 2) {
            start = Math.max(1, totalPages - 4);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;

    };

    const pageNumbers = getPageNumbers();

    return (

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:flex-row">

            {/* Page Info */}

            <p className="text-sm text-gray-500 dark:text-gray-400">
                Page{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {totalPages}
                </span>
            </p>

            {/* Pagination Buttons */}

            <div className="flex items-center gap-2">

                {/* Previous */}

                <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg border border-gray-300
                        transition
                        hover:bg-gray-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        dark:border-gray-700
                        dark:hover:bg-gray-800
                    "
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Page Numbers */}

                {pageNumbers.map((page) => (

                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`
                            h-10
                            w-10
                            rounded-lg
                            text-sm
                            font-medium
                            transition
                            ${
                                currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                            }
                        `}
                    >
                        {page}
                    </button>

                ))}

                {/* Next */}

                <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg border border-gray-300
                        transition
                        hover:bg-gray-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        dark:border-gray-700
                        dark:hover:bg-gray-800
                    "
                >
                    <ChevronRight size={18} />
                </button>

            </div>

        </div>

    );

};

export default PaymentPagination;