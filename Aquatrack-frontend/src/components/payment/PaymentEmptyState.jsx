import React from "react";
import { CreditCard, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

// ==========================================
// Payment Empty State
// ==========================================

const PaymentEmptyState = ({
    title = "No Payments Found",
    description = "There are no payment records available at the moment.",
    showReset = false,
    onReset,
}) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900"
        >

            {/* Icon */}

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <CreditCard
                    size={40}
                    className="text-blue-600 dark:text-blue-400"
                />
            </div>

            {/* Title */}

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
            </h2>

            {/* Description */}

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                {description}
            </p>

            {/* Reset Button */}

            {showReset && (
                <button
                    type="button"
                    onClick={onReset}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    <RefreshCw size={18} />

                    Reset Filters
                </button>
            )}

        </motion.div>
    );

};

export default PaymentEmptyState;