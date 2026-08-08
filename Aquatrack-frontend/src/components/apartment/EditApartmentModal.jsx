import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  MapPin,
  Home,
  Pencil,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  getApartmentById,
  updateApartment,
} from "../../services/apartmentService";

// ============================================
// Skeleton Form Loader
// ============================================
function SkeletonForm() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-28 rounded-lg bg-slate-700" />
            <div className="h-12 rounded-xl bg-slate-800" />
          </div>
        ))}
      </div>
      {[1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-32 rounded-lg bg-slate-700" />
          <div className="h-12 rounded-xl bg-slate-800" />
        </div>
      ))}
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-16 rounded-lg bg-slate-700" />
            <div className="h-12 rounded-xl bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Reusable Dark Input Field
// ============================================
function ModalInput({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  required,
  min,
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
        {required && <span className="ml-1 text-cyan-500">*</span>}
      </label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          min={min}
          className="
            w-full rounded-xl
            border border-slate-700/80
            bg-slate-950/60
            py-3 pl-10 pr-4
            text-sm text-white placeholder-slate-600
            outline-none
            transition-all duration-300
            focus:bg-slate-950/90
            focus:border-cyan-400
            focus:ring-4 focus:ring-cyan-500/15
            disabled:opacity-50
          "
        />
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================
export default function EditApartmentModal({
  open,
  apartmentId,
  onClose,
  onSuccess,
}) {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    apartmentName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    totalHouseholds: "",
  });

  // ==========================================
  // Load Apartment on Open
  // ==========================================
  useEffect(() => {
    if (open && apartmentId) {
      loadApartment();
    }
  }, [open, apartmentId]);

  async function loadApartment() {
    try {
      setFetchLoading(true);
      const response = await getApartmentById(apartmentId);
      const apartment = response.data;

      setFormData({
        apartmentName: apartment.apartmentName,
        addressLine1: apartment.addressLine1,
        addressLine2: apartment.addressLine2 || "",
        city: apartment.city,
        state: apartment.state,
        pincode: apartment.pincode,
        totalHouseholds: apartment.totalHouseholds,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setFetchLoading(false);
    }
  }

  // ==========================================
  // Handle Input Change
  // ==========================================
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ==========================================
  // Submit
  // ==========================================
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSubmitLoading(true);

      await updateApartment(apartmentId, {
        apartmentName: formData.apartmentName,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        totalHouseholds: Number(formData.totalHouseholds),
      });

      // Brief success flash
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onSuccess();
        onClose();
      }, 900);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update apartment.");
    } finally {
      setSubmitLoading(false);
    }
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="edit-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && !submitLoading && onClose()}
        >
          <motion.div
            key="edit-card"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="
              relative
              w-full
              max-w-2xl
              overflow-hidden
              rounded-3xl
              border
              border-slate-800/90
              bg-slate-900/95
              backdrop-blur-2xl
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
              shadow-cyan-950/40
              text-white
            "
          >
            {/* Top Gradient Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500" />

            {/* Ambient Glow Orbs */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 bg-emerald-500/8 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-500/8 rounded-full blur-2xl" />

            {/* Scrollable Body */}
            <div className="relative overflow-y-auto max-h-[90vh] p-8">

              {/* ================================
                  Header
              ================================ */}
              <div className="flex items-start justify-between mb-7">
                <div className="flex items-center gap-4">
                  {/* Icon Block */}
                  <div className="
                    flex h-13 w-13 shrink-0 items-center justify-center
                    rounded-2xl
                    bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400
                    text-white shadow-lg shadow-emerald-500/30
                    p-3
                  ">
                    <Pencil size={22} />
                  </div>

                  <div>
                    <div className="mb-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold tracking-wide uppercase">
                      <Sparkles size={11} />
                      Edit Property
                    </div>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">
                      Edit Apartment
                    </h2>
                    <p className="text-sm text-slate-400 font-medium">
                      Update apartment details and save changes.
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={onClose}
                  disabled={submitLoading}
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl bg-slate-800 text-slate-400
                    hover:bg-rose-500/20 hover:text-rose-400
                    border border-slate-700/80
                    transition-colors duration-200
                    disabled:opacity-40
                  "
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-800/80 mb-7" />

              {/* ================================
                  Skeleton or Form
              ================================ */}
              {fetchLoading ? (
                <SkeletonForm />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Apartment Name + Total Households */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ModalInput
                      icon={<Building2 size={17} />}
                      label="Apartment Name"
                      name="apartmentName"
                      placeholder="e.g. Skyline Residency"
                      value={formData.apartmentName}
                      onChange={handleChange}
                      disabled={submitLoading}
                      required
                    />

                    <ModalInput
                      icon={<Home size={17} />}
                      label="Total Households"
                      name="totalHouseholds"
                      type="number"
                      min="1"
                      placeholder="e.g. 120"
                      value={formData.totalHouseholds}
                      onChange={handleChange}
                      disabled={submitLoading}
                      required
                    />
                  </div>

                  {/* Address Line 1 */}
                  <ModalInput
                    icon={<MapPin size={17} />}
                    label="Address Line 1"
                    name="addressLine1"
                    placeholder="Street address, plot number..."
                    value={formData.addressLine1}
                    onChange={handleChange}
                    disabled={submitLoading}
                    required
                  />

                  {/* Address Line 2 */}
                  <ModalInput
                    icon={<MapPin size={17} />}
                    label="Address Line 2"
                    name="addressLine2"
                    placeholder="Landmark, area, colony (optional)"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    disabled={submitLoading}
                  />

                  {/* City / State / Pincode */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <ModalInput
                      icon={<MapPin size={17} />}
                      label="City"
                      name="city"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={submitLoading}
                      required
                    />

                    <ModalInput
                      icon={<MapPin size={17} />}
                      label="State"
                      name="state"
                      placeholder="Maharashtra"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={submitLoading}
                      required
                    />

                    <ModalInput
                      icon={<MapPin size={17} />}
                      label="Pincode"
                      name="pincode"
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={handleChange}
                      disabled={submitLoading}
                      required
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-800/80 pt-2" />

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-1">
                    {/* Cancel */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      disabled={submitLoading}
                      className="
                        px-5 py-3 rounded-xl
                        border border-slate-700
                        bg-slate-800/60 text-slate-300
                        text-sm font-semibold
                        hover:bg-slate-800 hover:text-white
                        transition-all duration-200
                        disabled:opacity-50
                      "
                    >
                      Cancel
                    </motion.button>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={submitLoading || saved}
                      className="
                        group
                        relative
                        flex items-center gap-2
                        px-6 py-3 rounded-xl
                        text-white text-sm font-extrabold
                        overflow-hidden
                        shadow-lg
                        transition-all duration-500
                        disabled:cursor-not-allowed
                        disabled:opacity-80
                      "
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
                      {/* Shimmer */}
                      {!saved && (
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      )}

                      <span className="relative flex items-center gap-2">
                        {saved ? (
                          <>
                            <CheckCircle2 size={16} className="animate-bounce" />
                            Saved!
                          </>
                        ) : submitLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            Update Apartment
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>

                </form>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}