import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, X } from "lucide-react";

import HouseholdForm from "./HouseholdForm";
import householdService from "../../services/householdService";

export default function CreateHouseholdModal({

    open,
    onClose,
    onSuccess

}) {

    const initialState = {

        buildingId: "",
        floorId: "",

        houseNumber: "",
        meterNumber: "",

        status: "ACTIVE"

    };

    const [formData, setFormData] =
        useState(initialState);

    const [errors, setErrors] =
        useState({});

    const [loading, setLoading] =
        useState(false);

    if (!open) return null;

    // ==========================
    // Validation
    // ==========================

    const validate = () => {

        const newErrors = {};

        if (!formData.buildingId)
            newErrors.buildingId = "Building is required.";

        if (!formData.floorId)
            newErrors.floorId = "Floor is required.";

        if (!formData.houseNumber.trim())
            newErrors.houseNumber = "House Number is required.";

        if (!formData.meterNumber.trim())
            newErrors.meterNumber = "Meter Number is required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    // ==========================
    // Submit
    // ==========================

    const handleSubmit = async () => {

        if (!validate()) return;

        try {

            setLoading(true);

            await householdService.createHousehold(

                formData.floorId,

                {

                    houseNumber: formData.houseNumber,

                    meterNumber: formData.meterNumber,

                    status: formData.status

                }

            );

            setFormData(initialState);

            onSuccess();

            onClose();

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
                    key="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        key="modal-card"
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 20 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/95 shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
                    >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500" />
                        <div className="relative overflow-hidden p-8">
                            <div className="flex items-center justify-between gap-4 pb-6">
                                <div>
                                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan-200 border border-cyan-500/20">
                                        <Building2 size={14} />
                                        Household
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-white">
                                        Create Household
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Add a new household with building, floor, meter, and status details.
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-950/90 text-slate-300 transition-colors duration-200 hover:border-cyan-400 hover:bg-slate-900 hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <HouseholdForm
                                    formData={formData}
                                    setFormData={setFormData}
                                    errors={errors}
                                />
                            </div>

                            <div className="mt-6 flex flex-col gap-3 border-t border-slate-800/80 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    onClick={onClose}
                                    disabled={loading}
                                    className="rounded-2xl border border-slate-700/80 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-300 transition-colors duration-200 hover:border-cyan-400 hover:bg-slate-900 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:brightness-110 disabled:opacity-50"
                                >
                                    {loading ? "Creating..." : "Create Household"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
