import React from "react";
import { motion } from "framer-motion";
import { Eye, Edit3 } from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";
import PaymentMethodBadge from "./PaymentMethodBadge";

// ==========================================
// Payment Table
// ==========================================

const PaymentTable = ({
    payments = [],
    loading = false,
    role = "MANAGER",
    onView,
    onUpdateStatus,
}) => {

    // ==========================================
    // Loading State
    // ==========================================

    if (loading) {

        return (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">
                    Loading payments...
                </p>
            </div>
        );

    }

    // ==========================================
    // Empty State
    // ==========================================

    if (!payments.length) {

        return (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">
                    No payment records found.
                </p>
            </div>
        );

    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
        >

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100 dark:bg-gray-800">

                        <tr>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Invoice
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Billing Cycle
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Amount
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Method
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Status
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Payment Date
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-semibold">
                                Due Date
                            </th>

                            <th className="px-5 py-4 text-center text-sm font-semibold">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {payments.map((payment, index) => (

                            <motion.tr
                                key={payment.paymentId}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.03,
                                }}
                                className="border-t border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                            >

                                <td className="px-5 py-4 font-medium">
                                    {payment.invoiceNumber}
                                </td>

                                <td className="px-5 py-4">
                                    {payment.billingCycle}
                                </td>

                                <td className="px-5 py-4 font-semibold">
                                    ₹{Number(payment.amount).toLocaleString()}
                                </td>

                                <td className="px-5 py-4">
                                    <PaymentMethodBadge
                                        method={payment.paymentMethod}
                                    />
                                </td>

                                <td className="px-5 py-4">
                                    <PaymentStatusBadge
                                        status={payment.paymentStatus}
                                    />
                                </td>

                                <td className="px-5 py-4">
                                    {payment.paymentDate}
                                </td>

                                <td className="px-5 py-4">
                                    {payment.dueDate}
                                </td>

                                <td className="px-5 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onView(payment)}
                                            className="rounded-lg bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                                            title="View"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        {role !== "RESIDENT" && (
                                            <button
                                                onClick={() =>
                                                    onUpdateStatus(payment)
                                                }
                                                className="rounded-lg bg-amber-500 p-2 text-white transition hover:bg-amber-600"
                                                title="Update Status"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                        )}

                                    </div>

                                </td>

                            </motion.tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </motion.div>
    );

};

export default PaymentTable;