import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    X,
    AlertTriangle,
    Building2,
    ShieldAlert,
} from "lucide-react";
import householdService from "../../services/householdService";

export default function DeleteHouseholdModal({
    open,
    household,
    onClose,
    onSuccess,
}) {
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);

    if (!open || !household) return null;

    const handleDelete = async () => {
        try {
            setLoading(true);
            await householdService.deleteHousehold(household.floorId, household.id);
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            setShake(true);
            setTimeout(() => setShake(false), 600);
            alert(error.response?.data?.message || "Failed to delete household.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && household && (
                <motion.div
                    key="delete-household-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && !loading && onClose()}
                >
                    <motion.div
                        key="delete-household-card"
                        initial={{ opacity: 0, scale: 0.88, y: 28 }}
                        animate={
                            shake
                                ? {
                                      x: [-10, 10, -8, 8, -4, 4, 0],
                                      opacity: 1,
                                      scale: 1,
                                      y: 0,
                                      transition: { duration: 0.5 },
                                  }
                                : { opacity: 1, scale: 1, y: 0 }
                        }
                        exit={{ opacity: 0, scale: 0.88, y: 28 }}
                        transition={{ type: "spring", stiffness: 360, damping: 28 }}
                        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/95 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.7)] shadow-rose-950/30 text-white"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-red-500 to-orange-500" />
                        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-rose-500/8 rounded-full blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-10 -left-10 w-36 h-36 bg-red-500/8 rounded-full blur-2xl" />

                        <div className="relative p-7">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                                        <motion.div
                                            animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                            className="absolute inset-0 rounded-2xl bg-rose-500/30"
                                        />
                                        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-lg shadow-rose-500/40">
                                            <Trash2 size={24} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-bold tracking-wide uppercase">
                                            <ShieldAlert size={11} />
                                            Danger Zone
                                        </div>
                                        <h2 className="text-xl font-extrabold text-white tracking-tight">
                                            Delete Household
                                        </h2>
                                        <p className="text-xs text-slate-400 font-medium">
                                            This action is permanent and cannot be undone.
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={onClose}
                                    disabled={loading}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700/80 transition-colors duration-200 disabled:opacity-40"
                                >
                                    <X size={18} />
                                </motion.button>
                            </div>

                            <div className="border-t border-slate-800/80 mb-6" />

                            <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/8 px-4 py-3.5 mb-5">
                                <AlertTriangle size={18} className="shrink-0 text-amber-400 mt-0.5" />
                                <p className="text-sm text-amber-200/80 font-medium leading-relaxed">
                                    Deleting this household will remove its meter, resident and billing data permanently.
                                </p>
                            </div>

                            <div className="flex items-start gap-4 rounded-2xl border border-slate-700/60 bg-slate-800/50 px-5 py-4 mb-7">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-600 to-slate-500 text-white shadow-sm">
                                    <Building2 size={18} />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-extrabold text-white text-base truncate">
                                        {household.houseNumber}
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-400 font-medium">
                                        {household.apartmentName} • {household.buildingName} • {household.floorName}
                                    </p>
                                </div>
                                <div className="ml-auto flex items-center gap-1.5 shrink-0">
                                    <motion.span
                                        animate={{ opacity: [1, 0.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.2 }}
                                        className="w-2 h-2 rounded-full bg-rose-500"
                                    />
                                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wide">
                                        To Delete
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={onClose}
                                    disabled={loading}
                                    className="flex-1 px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-300 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200 disabled:opacity-50"
                                >
                                    Keep Household
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="group relative flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white text-sm font-extrabold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                                    <span className="relative flex items-center gap-2">
                                        {loading ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 size={16} />
                                                Yes, Delete
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
