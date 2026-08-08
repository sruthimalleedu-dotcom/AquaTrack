import React from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    CheckCircle2,
    Clock3,
    XCircle,
    Ban,
    IndianRupee,
} from "lucide-react";

// ==========================================
// Payment Summary Cards
// ==========================================

const PaymentSummaryCards = ({ summary }) => {

    const cards = [
        {
            title: "Total Payments",
            value: summary?.totalPayments ?? 0,
            icon: CreditCard,
            bg: "bg-blue-500",
        },
        {
            title: "Successful",
            value: summary?.successfulPayments ?? 0,
            icon: CheckCircle2,
            bg: "bg-green-500",
        },
        {
            title: "Pending",
            value: summary?.pendingPayments ?? 0,
            icon: Clock3,
            bg: "bg-yellow-500",
        },
        {
            title: "Failed",
            value: summary?.failedPayments ?? 0,
            icon: XCircle,
            bg: "bg-red-500",
        },
        {
            title: "Cancelled",
            value: summary?.cancelledPayments ?? 0,
            icon: Ban,
            bg: "bg-gray-500",
        },
        {
            title: "Total Paid",
            value: `₹${Number(
                summary?.totalPaidAmount ?? 0
            ).toLocaleString()}`,
            icon: IndianRupee,
            bg: "bg-emerald-500",
        },
        {
            title: "Pending Amount",
            value: `₹${Number(
                summary?.pendingAmount ?? 0
            ).toLocaleString()}`,
            icon: IndianRupee,
            bg: "bg-orange-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {cards.map((card, index) => {

                const Icon = card.icon;

                return (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.25,
                            delay: index * 0.05,
                        }}
                        whileHover={{
                            y: -4,
                            transition: { duration: 0.2 },
                        }}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    {card.value}
                                </h2>

                            </div>

                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${card.bg}`}
                            >
                                <Icon size={24} />
                            </div>

                        </div>

                    </motion.div>
                );

            })}

        </div>
    );

};

export default PaymentSummaryCards;