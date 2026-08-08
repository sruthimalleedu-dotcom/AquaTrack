import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Building2,
    Layers,
    Hash,
    Home,
    Sparkles,
    AlertCircle,
    User,
    CalendarDays,
} from "lucide-react";

function InfoTile({ icon: Icon, label, value, gradient, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.35, ease: "easeOut" }}
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-800/60
                bg-slate-800/40
                p-5
                hover:border-cyan-500/30
                hover:bg-slate-800/70
                transition-all
                duration-300
            "
        >
            <div className="pointer-events-none absolute -bottom-6 -right-6 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/15 transition-all duration-500" />

            <div className="flex items-center gap-3 mb-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr ${gradient} text-white shadow-md`}>
                    <Icon size={16} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {label}
                </span>
            </div>

            <p className="text-base font-bold text-white truncate">
                {value || <span className="text-slate-500 font-normal italic">—</span>}
            </p>
        </motion.div>
    );
}

export default function ViewHouseholdModal({ open, household, onClose }) {
    if (!open || !household) return null;

    const fields = [
        {
            icon: Building2,
            label: "House Number",
            value: household.houseNumber,
            gradient: "from-blue-600 to-cyan-500 shadow-blue-500/20",
        },
        {
            icon: Hash,
            label: "Meter Number",
            value: household.meterNumber,
            gradient: "from-emerald-600 to-teal-500 shadow-emerald-500/20",
        },
        {
            icon: Layers,
            label: "Apartment",
            value: household.apartmentName,
            gradient: "from-violet-600 to-indigo-500 shadow-violet-500/20",
        },
        {
            icon: Building2,
            label: "Building",
            value: household.buildingName,
            gradient: "from-cyan-600 to-sky-500 shadow-cyan-500/20",
        },
        {
            icon: Layers,
            label: "Floor",
            value: household.floorName,
            gradient: "from-pink-600 to-rose-500 shadow-pink-500/20",
        },
        {
            icon: User,
            label: "Residents",
            value: household.totalResidents,
            gradient: "from-amber-500 to-orange-500 shadow-amber-500/20",
        },
        {
            icon: AlertCircle,
            label: "Status",
            value: household.status,
            gradient: "from-emerald-600 to-teal-500 shadow-emerald-500/20",
        },
        {
            icon: User,
            label: "Created By",
            value: household.createdBy,
            gradient: "from-slate-600 to-slate-500 shadow-slate-500/20",
        },
        {
            icon: CalendarDays,
            label: "Created At",
            value: household.createdAt,
            gradient: "from-blue-500 to-sky-500 shadow-cyan-500/20",
        },
        {
            icon: User,
            label: "Last Updated By",
            value: household.updatedBy,
            gradient: "from-slate-600 to-slate-500 shadow-slate-500/20",
        },
        {
            icon: CalendarDays,
            label: "Last Updated At",
            value: household.updatedAt,
            gradient: "from-blue-500 to-sky-500 shadow-cyan-500/20",
        },
    ];

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="household-view-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        key="household-view-card"
                        initial={{ opacity: 0, scale: 0.92, y: 32 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 32 }}
                        transition={{ type: "spring", stiffness: 340, damping: 28 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/95 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.7)] shadow-cyan-950/40 text-white"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400" />
                        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-cyan-500/8 rounded-full blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-12 -left-12 w-40 h-40 bg-blue-500/8 rounded-full blur-2xl" />

                        <div className="relative overflow-y-auto max-h-[90vh]">
                            <div className="flex items-start justify-between p-8 pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/30 p-3">
                                        <Building2 size={24} />
                                    </div>
                                    <div>
                                        <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-cyan-200 border border-cyan-500/20">
                                            <Sparkles size={11} />
                                            Household Details
                                        </div>
                                        <h2 className="text-2xl font-extrabold text-white tracking-tight">
                                            Household Details
                                        </h2>
                                        <p className="text-sm text-slate-400 font-medium">
                                            Full information for this household record.
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={onClose}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700/80 transition-colors duration-200"
                                >
                                    <X size={18} />
                                </motion.button>
                            </div>

                            <div className="mx-8 border-t border-slate-800/80" />

                            <div className="p-8 pt-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {fields.map((field, idx) => (
                                        <InfoTile
                                            key={field.label}
                                            icon={field.icon}
                                            label={field.label}
                                            value={field.value}
                                            gradient={field.gradient}
                                            delay={idx * 0.06}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-800/80 px-8 py-5">
                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                    <Home size={13} />
                                    AquaTrack Household Registry
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={onClose}
                                    className="px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
