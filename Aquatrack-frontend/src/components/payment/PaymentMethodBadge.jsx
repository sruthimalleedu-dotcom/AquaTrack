import React from "react";
import {
    CreditCard,
    Landmark,
    Wallet,
    Smartphone,
    CircleDollarSign,
} from "lucide-react";

// ==========================================
// Payment Method Configuration
// ==========================================

const methodConfig = {
    CASH: {
        label: "Cash",
        icon: Wallet,
        className:
            "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    },

    UPI: {
        label: "UPI",
        icon: Smartphone,
        className:
            "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    },

    CARD: {
        label: "Card",
        icon: CreditCard,
        className:
            "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
    },

    BANK_TRANSFER: {
        label: "Bank Transfer",
        icon: Landmark,
        className:
            "bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
    },
};

// ==========================================
// Component
// ==========================================

const PaymentMethodBadge = ({ method }) => {

    const config = methodConfig[method] || {
        label: method || "Unknown",
        icon: CircleDollarSign,
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

export default PaymentMethodBadge;