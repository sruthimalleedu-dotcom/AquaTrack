import { motion } from "framer-motion";
import {
    Receipt,
    Clock3,
    CheckCircle2,
    IndianRupee,
} from "lucide-react";

const ResidentWaterBillSummaryCards = ({ bills = [] }) => {

    // ==========================================
    // Summary Calculations
    // ==========================================

    const totalBills = bills.length;

    const pendingBills = bills.filter(
        (bill) => bill.billStatus === "PENDING"
    ).length;

    const paidBills = bills.filter(
        (bill) => bill.billStatus === "PAID"
    ).length;

    const totalAmount = bills.reduce(
        (sum, bill) => sum + Number(bill.totalAmount || 0),
        0
    );

    // ==========================================
    // Cards
    // ==========================================

    const cards = [
        {
            title: "Total Bills",
            value: totalBills,
            icon: Receipt,
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            title: "Pending Bills",
            value: pendingBills,
            icon: Clock3,
            color: "text-yellow-600",
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
        },
        {
            title: "Paid Bills",
            value: paidBills,
            icon: CheckCircle2,
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-900/30",
        },
        {
            title: "Total Amount",
            value: `₹${totalAmount.toFixed(2)}`,
            icon: IndianRupee,
            color: "text-purple-600",
            bg: "bg-purple-100 dark:bg-purple-900/30",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.08,
                        }}
                        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-5"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {card.value}
                                </h2>
                            </div>

                            <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.bg}`}
                            >
                                <Icon
                                    className={`w-7 h-7 ${card.color}`}
                                />
                            </div>

                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ResidentWaterBillSummaryCards;