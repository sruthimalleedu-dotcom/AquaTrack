import React from "react";
import { CheckCircle, Clock, XCircle, Ban } from "lucide-react";

// ==========================================
// Payment Status Badge
// ==========================================

const statusConfig = {
    SUCCESS: {
        label: "Paid",
        icon: CheckCircle,
        className:
            "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    },

    PENDING: {
        label: "Pending",
        icon: Clock,
        className:
            "bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    },

    FAILED: {
        label: "Failed",
        icon: XCircle,
        className:
            "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    },

    CANCELLED: {
        label: "Cancelled",
        icon: Ban,
        className:
            "bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
    },
};

// ==========================================
// Component
// ==========================================

const PaymentStatusBadge = ({ status }) => {

    const config = statusConfig[status] || {
        label: status || "Unknown",
        icon: Clock,
        className:
            "bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
    };

    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
        >
            <Icon size={14} />
            {config.label}
        </span>
    );
};

export default PaymentStatusBadge;