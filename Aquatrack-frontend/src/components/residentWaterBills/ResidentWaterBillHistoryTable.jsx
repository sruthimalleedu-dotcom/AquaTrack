import { motion } from "framer-motion";
import { ReceiptText } from "lucide-react";

const ResidentWaterBillHistoryTable = ({ bills = [] }) => {

    // ==========================================
    // Status Badge
    // ==========================================

    const getStatusBadge = (status) => {

        switch (status) {

            case "PAID":
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Paid
                    </span>
                );

            case "OVERDUE":
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        Overdue
                    </span>
                );

            default:
                return (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Pending
                    </span>
                );

        }

    };

    // ==========================================
    // Empty State
    // ==========================================

    if (!bills.length) {

        return (

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">

                <ReceiptText className="mx-auto w-14 h-14 text-gray-400" />

                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    No Water Bills Found
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Your generated water bills will appear here.
                </p>

            </div>

        );

    }

    // ==========================================
    // Table
    // ==========================================

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
        >

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50 dark:bg-gray-800">

                        <tr className="text-left">

                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Invoice
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Billing Cycle
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Usage (KL)
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Total Amount
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Due Date
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">

                        {bills.map((bill, index) => (

                            <motion.tr
                                key={bill.billId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.25,
                                    delay: index * 0.05,
                                }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >

                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {bill.invoiceNumber}
                                </td>

                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    {bill.billingCycle}
                                </td>

                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    {Number(bill.consumptionKL).toFixed(2)} KL
                                </td>

                                <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">
                                    ₹{Number(bill.totalAmount).toFixed(2)}
                                </td>

                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                    {bill.dueDate}
                                </td>

                                <td className="px-6 py-4">
                                    {getStatusBadge(bill.billStatus)}
                                </td>

                            </motion.tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </motion.div>

    );

};

export default ResidentWaterBillHistoryTable;