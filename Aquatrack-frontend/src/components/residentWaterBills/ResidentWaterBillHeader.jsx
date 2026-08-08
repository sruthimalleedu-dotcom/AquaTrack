import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

const ResidentWaterBillHeader = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                    <Receipt className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Water Bills
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        View your generated water bills, due dates, and payment status.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ResidentWaterBillHeader;