import { motion } from "framer-motion";
import {
    Eye,
    Pencil,
    Trash2,
    Layers,
    AlertCircle,
} from "lucide-react";

// ============================================
// Skeleton Loader Row
// ============================================
function SkeletonRow() {
    return (
        <tr className="border-t border-slate-100">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <td key={i} className="px-6 py-5">
                    <div className="h-4 w-full rounded-full bg-slate-200/70 animate-pulse" />
                </td>
            ))}
        </tr>
    );
}

export default function HouseholdTable({
    households,
    loading,
    onView,
    onEdit,
    onDelete,
}) {
    if (loading) {
        return (
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-md shadow-slate-900/5">
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70">
                            {[
                                "House No",
                                "Meter No",
                                "Apartment",
                                "Building",
                                "Floor",
                                "Residents",
                                "Status",
                                "Actions",
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4].map((i) => (
                            <SkeletonRow key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (!households.length) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200/80 border-dashed bg-white/80 backdrop-blur-xl py-20 text-center shadow-md shadow-slate-900/5"
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/30">
                    <Layers size={30} />
                </div>
                <div>
                    <h3 className="text-lg font-extrabold text-slate-800">No Households Found</h3>
                    <p className="mt-1.5 text-sm text-slate-500 font-medium max-w-xs mx-auto">
                        Add households to begin managing meters, residents and status in one place.
                    </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 border border-blue-100">
                    <AlertCircle size={13} className="text-cyan-500" />
                    Select "Create Household" to continue
                </div>
            </motion.div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-md shadow-slate-900/5">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70">
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                House No
                            </th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Meter No
                            </th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Apartment
                            </th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Building
                            </th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Floor
                            </th>
                            <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Residents
                            </th>
                            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80">
                        {households.map((household, idx) => (
                            <motion.tr
                                key={household.id}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04, duration: 0.35, ease: "easeOut" }}
                                className="group hover:bg-blue-50/40 transition-colors duration-200"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                                        {household.houseNumber}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                    {household.meterNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                    {household.apartmentName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                    {household.buildingName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                    {household.floorName}
                                </td>
                                <td className="px-6 py-4 text-center whitespace-nowrap text-slate-600">
                                    {household.totalResidents}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                                            household.status === "ACTIVE"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-rose-100 text-rose-700"
                                        }`}
                                    >
                                        {household.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.12 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onView(household)}
                                            title="View"
                                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                                        >
                                            <Eye size={16} />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.12 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onEdit(household)}
                                            title="Edit"
                                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-200 hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-500/30"
                                        >
                                            <Pencil size={16} />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.12 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onDelete(household)}
                                            title="Delete"
                                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition-all duration-200 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-500/30"
                                        >
                                            <Trash2 size={16} />
                                        </motion.button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
