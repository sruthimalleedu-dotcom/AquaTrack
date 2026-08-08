import React from "react";
import { Search, X } from "lucide-react";

// ==========================================
// Payment Search
// ==========================================

const PaymentSearch = ({
    value = "",
    onChange,
    placeholder = "Search by Invoice No, Transaction ID, Household..."
}) => {

    const handleClear = () => {
        onChange("");
    };

    return (

        <div className="relative w-full">

            {/* Search Icon */}

            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            {/* Input */}

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    py-3
                    pl-11
                    pr-11
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                    dark:border-gray-700
                    dark:bg-gray-800
                    dark:text-white
                    dark:placeholder:text-gray-400
                    dark:focus:ring-blue-900/30
                "
            />

            {/* Clear Button */}

            {value && (

                <button
                    type="button"
                    onClick={handleClear}
                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-full
                        p-1
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-700
                        dark:hover:bg-gray-700
                        dark:hover:text-white
                    "
                >
                    <X size={16} />
                </button>

            )}

        </div>

    );

};

export default PaymentSearch;