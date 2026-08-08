import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, Pencil, Loader2, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

import HouseholdForm from "./HouseholdForm";
import householdService from "../../services/householdService";

export default function EditHouseholdModal({
    open,
    household,
    onClose,
    onSuccess,
}) {
    const [formData, setFormData] = useState({
        buildingId: "",
        floorId: "",
        houseNumber: "",
        meterNumber: "",
        status: "ACTIVE",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!household) return;

        setFormData({
            buildingId: String(household.buildingId ?? ""),
            floorId: String(household.floorId ?? ""),
            houseNumber: household.houseNumber ?? "",
            meterNumber: household.meterNumber ?? "",
            status: household.status ?? "ACTIVE",
        });
    }, [household]);

    if (!open || !household) return null;

    const validate = () => {
        const newErrors = {};

        if (!formData.buildingId) newErrors.buildingId = "Building is required.";
        if (!formData.floorId) newErrors.floorId = "Floor is required.";
        if (!formData.houseNumber.trim()) newErrors.houseNumber = "House Number is required.";
        if (!formData.meterNumber.trim()) newErrors.meterNumber = "Meter Number is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async () => {
        if (!validate()) return;

        try {
            setLoading(true);

            await householdService.updateHousehold(
                formData.floorId,
                household.id,
                {
                    houseNumber: formData.houseNumber,
                    meterNumber: formData.meterNumber,
                    status: formData.status,
                }
            );

            setSaved(true);
            setTimeout(() => {
                setSaved(false);
                onSuccess();
                onClose();
            }, 900);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="edit-household-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && !loading && onClose()}
                >
                    <motion.div
                        key="edit-household-card"
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/95 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.7)] shadow-cyan-950/40 text-white"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500" />
                        <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 bg-emerald-500/8 rounded-full blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-500/8 rounded-full blur-2xl" />

                        <div className="relative overflow-y-auto max-h-[90vh] p-8">
                            <div className="flex items-start justify-between mb-7">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 text-white shadow-lg shadow-emerald-500/30 p-3">
                                        <Pencil size={22} />
                                    </div>
                                    <div>
                                        <div className="mb-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold tracking-wide uppercase">
                                            <Sparkles size={11} />
                                            Edit Household
                                        </div>
                                        <h2 className="text-2xl font-extrabold text-white tracking-tight">
                                            Edit Household
                                        </h2>
                                        <p className="text-sm text-slate-400 font-medium">
                                            Update the household details and save changes.
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

                            <div className="border-t border-slate-800/80 mb-7" />

                            <div className="space-y-6">
                                <HouseholdForm formData={formData} setFormData={setFormData} errors={errors} />

                                <div className="flex flex-col gap-3 border-t border-slate-800/80 pt-5 sm:flex-row sm:justify-end">
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={onClose}
                                        disabled={loading}
                                        className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-300 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200 disabled:opacity-50"
                                    >
                                        Cancel
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleUpdate}
                                        disabled={loading || saved}
                                        className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold text-white shadow-lg transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-80"
                                        style={{
                                            background: saved
                                                ? "linear-gradient(to right, #10b981, #059669)"
                                                : "linear-gradient(to right, #10b981, #0891b2, #10b981)",
                                            backgroundSize: "200% auto",
                                            boxShadow: saved
                                                ? "0 8px 25px rgba(16,185,129,0.35)"
                                                : "0 8px 25px rgba(6,182,212,0.25)",
                                        }}
                                    >
                                        {!saved && (
                                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                                        )}
                                        <span className="relative flex items-center gap-2">
                                            {saved ? (
                                                <>
                                                    <CheckCircle2 size={16} className="animate-bounce" />
                                                    Saved!
                                                </>
                                            ) : loading ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    Update Household
                                                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </span>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
