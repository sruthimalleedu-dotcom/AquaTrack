import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

// ==========================================
// Constants
// ==========================================

const PAYMENT_STATUS = [
    "PENDING",
    "SUCCESS",
    "FAILED",
    "CANCELLED",
];

// ==========================================
// Component
// ==========================================

const UpdatePaymentStatusModal = ({
    isOpen,
    payment,
    loading = false,
    onClose,
    onSubmit,
}) => {

    const [formData, setFormData] = useState({
        paymentStatus: "PENDING",
        transactionId: "",
        remarks: "",
    });

    // ==========================================
    // Load Selected Payment
    // ==========================================

    useEffect(() => {

        if (payment) {

            setFormData({
                paymentStatus: payment.paymentStatus || "PENDING",
                transactionId: payment.transactionId || "",
                remarks: payment.remarks || "",
            });

        }

    }, [payment]);

    // ==========================================
    // Handle Change
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    if (!isOpen || !payment) return null;

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
                    className="w-full max-w-xl rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
                >

                    {/* ==========================================
                        Header
                    ========================================== */}

                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-700">

                        <div>

                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Update Payment Status
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Invoice : {payment.invoiceNumber}
                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X size={20} />
                        </button>

                    </div>

                    {/* ==========================================
                        Form
                    ========================================== */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 p-6"
                    >

                        {/* Status */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Payment Status
                            </label>

                            <select
                                name="paymentStatus"
                                value={formData.paymentStatus}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
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

                        {/* Transaction ID */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Transaction ID
                            </label>

                            <input
                                type="text"
                                name="transactionId"
                                value={formData.transactionId}
                                onChange={handleChange}
                                placeholder="Enter Transaction ID"
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
                            />

                        </div>

                        {/* Remarks */}

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Remarks
                            </label>

                            <textarea
                                rows={4}
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                placeholder="Enter Remarks"
                                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800"
                            />

                        </div>

                        {/* Footer */}

                        <div className="flex justify-end gap-3 pt-2">

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl border border-gray-300 px-5 py-2.5 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? "Updating..."
                                    : "Update Status"}
                            </button>

                        </div>

                    </form>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

};

export default UpdatePaymentStatusModal;