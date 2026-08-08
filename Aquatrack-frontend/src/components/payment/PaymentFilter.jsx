import React from "react";
import { RotateCcw } from "lucide-react";

// ==========================================
// Constants
// ==========================================

const PAYMENT_STATUS = [
    "ALL",
    "PENDING",
    "SUCCESS",
    "FAILED",
    "CANCELLED",
];

const PAYMENT_METHOD = [
    "ALL",
    "CASH",
    "UPI",
    "CARD",
    "BANK_TRANSFER",
];

// ==========================================
// Component
// ==========================================

const PaymentFilter = ({
    filters,
    onChange,
    onReset,
}) => {

    const handleChange = (e) => {

        const { name, value } = e.target;

        onChange({
            ...filters,
            [name]: value,
        });

    };

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                {/* Payment Status */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Payment Status
                    </label>

                    <select
                        name="paymentStatus"
                        value={filters.paymentStatus}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                        {PAYMENT_STATUS.map((status) => (
                            <option
                                key={status}
                                value={status}
                            >
                                {status}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Payment Method */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Payment Method
                    </label>

                    <select
                        name="paymentMethod"
                        value={filters.paymentMethod}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                        {PAYMENT_METHOD.map((method) => (
                            <option
                                key={method}
                                value={method}
                            >
                                {method}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Billing Cycle */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Billing Cycle
                    </label>

                    <input
                        type="month"
                        name="billingCycle"
                        value={filters.billingCycle}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />

                </div>

                {/* Reset */}

                <div className="flex items-end">

                    <button
                        type="button"
                        onClick={onReset}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <RotateCcw size={16} />

                        Reset Filters

                    </button>

                </div>

            </div>

        </div>

    );

};

export default PaymentFilter;