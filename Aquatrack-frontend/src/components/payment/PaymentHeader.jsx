import { motion } from "framer-motion";
import {
    CreditCard,
    RefreshCw,
} from "lucide-react";

// ==========================================
// Component
// ==========================================

const PaymentHeader = ({
    title = "Payments",
    subtitle = "Manage and monitor all water bill payments.",
    showRefresh = true,
    refreshing = false,
    onRefresh,
}) => {

    return (

        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                dark:border-gray-700
                dark:bg-gray-900
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >

            {/* ======================================
                Left Section
            ====================================== */}

            <div className="flex items-center gap-4">

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-100
                        text-blue-600
                        dark:bg-blue-900/30
                        dark:text-blue-400
                    "
                >
                    <CreditCard size={28} />
                </div>

                <div>

                    <h1
                        className="
                            text-2xl
                            font-bold
                            text-gray-900
                            dark:text-white
                        "
                    >
                        {title}
                    </h1>

                    <p
                        className="
                            mt-1
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        {subtitle}
                    </p>

                </div>

            </div>

            {/* ======================================
                Right Section
            ====================================== */}

            {showRefresh && (

                <button
                    onClick={onRefresh}
                    disabled={refreshing}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-5
                        py-3
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

                    <RefreshCw
                        size={18}
                        className={
                            refreshing
                                ? "animate-spin"
                                : ""
                        }
                    />

                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"}

                </button>

            )}

        </motion.div>

    );

};

export default PaymentHeader;