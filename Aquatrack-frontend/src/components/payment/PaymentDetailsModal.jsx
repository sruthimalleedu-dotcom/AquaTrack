import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";
import PaymentMethodBadge from "./PaymentMethodBadge";

// ==========================================
// Payment Details Modal
// ==========================================

const PaymentDetailsModal = ({
    isOpen,
    onClose,
    payment,
}) => {

    if (!isOpen || !payment) return null;

    const DetailRow = ({ label, value }) => (
        <div className="flex flex-col gap-1 border-b border-gray-100 py-3 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {label}
            </span>

            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {value || "-"}
            </span>
        </div>
    );

    return (
        <AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            >

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: 20,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
                >

                    {/* ==========================================
                        Header
                    ========================================== */}

                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">

                        <div>

                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Payment Details
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                View complete payment information.
                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X size={20} />
                        </button>

                    </div>

                    {/* ==========================================
                        Body
                    ========================================== */}

                    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

                        <DetailRow
                            label="Invoice Number"
                            value={payment.invoiceNumber}
                        />

                        <DetailRow
                            label="Billing Cycle"
                            value={payment.billingCycle}
                        />

                        <DetailRow
                            label="Transaction ID"
                            value={payment.transactionId}
                        />

                        <DetailRow
                            label="Amount"
                            value={`₹${Number(payment.amount).toLocaleString()}`}
                        />

                        <DetailRow
                            label="Payment Date"
                            value={payment.paymentDate}
                        />

                        <DetailRow
                            label="Due Date"
                            value={payment.dueDate}
                        />

                        <div className="border-b border-gray-100 py-3 dark:border-gray-700">

                            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                Payment Method
                            </p>

                            <PaymentMethodBadge
                                method={payment.paymentMethod}
                            />

                        </div>

                        <div className="border-b border-gray-100 py-3 dark:border-gray-700">

                            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                Payment Status
                            </p>

                            <PaymentStatusBadge
                                status={payment.paymentStatus}
                            />

                        </div>

                    </div>

                    {/* ==========================================
                        Remarks
                    ========================================== */}

                    <div className="px-6 pb-6">

                        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Remarks
                        </p>

                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">

                            {payment.remarks || "No remarks available."}

                        </div>

                    </div>

                    {/* ==========================================
                        Footer
                    ========================================== */}

                    <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-700">

                        <button
                            onClick={onClose}
                            className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                        >
                            Close
                        </button>

                    </div>

                </motion.div>

            </motion.div>

        </AnimatePresence>
    );

};

export default PaymentDetailsModal;