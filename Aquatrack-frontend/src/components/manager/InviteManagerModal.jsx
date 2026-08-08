import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UserCog,
  User,
  Mail,
  Phone,
  Building2,
  Building,
  Sparkles,
  Loader2,
  Send,
  CheckSquare,
  Square,
  AlertCircle,
} from "lucide-react";

import { getApartments } from "../../services/apartmentService";
import { getBuildings } from "../../services/buildingService";
import { createManagerInvitation } from "../../services/managerInvitationService";

// ============================================
// Reusable Dark Input
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
export default function InviteManagerModal({ onClose }) {
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    apartmentId: "",
    buildingIds: [],
  });

  const [apartments, setApartments] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loadingApartments, setLoadingApartments] = useState(true);
  const [loadingBuildings, setLoadingBuildings] = useState(false);

  // ==========================================
  // Load Apartments
  // ==========================================
  useEffect(() => {
    loadApartments();
  }, []);

  async function loadApartments() {
    try {
      setLoadingApartments(true);
      const response = await getApartments();
      setApartments(response.data || []);
    } catch (error) {
      console.error("Failed to load apartments", error);
    } finally {
      setLoadingApartments(false);
    }
  }

  // ==========================================
  // Load Buildings on Apartment Change
  // ==========================================
  useEffect(() => {
    if (!formData.apartmentId) {
      setBuildings([]);
      return;
    }
    loadBuildings(formData.apartmentId);
  }, [formData.apartmentId]);

  async function loadBuildings(apartmentId) {
    try {
      setLoadingBuildings(true);
      const response = await getBuildings(apartmentId);
      setBuildings(response.data || []);
    } catch (error) {
      console.error("Failed to load buildings", error);
      setBuildings([]);
    } finally {
      setLoadingBuildings(false);
    }
  }

  // ==========================================
  // Input Change
  // ==========================================
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "apartmentId") {
      setFormData((prev) => ({ ...prev, apartmentId: value, buildingIds: [] }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ==========================================
  // Building Toggle
  // ==========================================
  function handleBuildingChange(buildingId) {
    setFormData((prev) => {
      const selected = prev.buildingIds.includes(buildingId);
      return {
        ...prev,
        buildingIds: selected
          ? prev.buildingIds.filter((id) => id !== buildingId)
          : [...prev.buildingIds, buildingId],
      };
    });
  }

  // ==========================================
  // Submit
  // ==========================================
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await createManagerInvitation(formData);
      console.log(response);
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to send invitation.");
    } finally {
      setSubmitting(false);
    }
  }

  const isFormValid =
    formData.firstName.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.apartmentId &&
    formData.buildingIds.length > 0;

  // ==========================================
  // UI
  // ==========================================
  return (
    <AnimatePresence>
      <motion.div
        key="invite-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && !submitting && onClose()}
      >
        <motion.div
          key="invite-card"
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
            shadow-purple-950/30
            text-white
          "
        >
          {/* Top Gradient Strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-violet-400 to-indigo-500" />

          {/* Ambient Glow Orbs */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 bg-purple-500/8 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-500/8 rounded-full blur-2xl" />

          {/* Scrollable Body */}
          <div className="relative overflow-y-auto max-h-[90vh] p-8">

            {/* ================================
                Header
            ================================ */}
            <div className="flex items-start justify-between mb-7">
              <div className="flex items-center gap-4">
                <div className="
                  flex h-13 w-13 shrink-0 items-center justify-center
                  rounded-2xl p-3
                  bg-gradient-to-tr from-purple-600 via-violet-500 to-indigo-400
                  text-white shadow-lg shadow-purple-500/30
                ">
                  <UserCog size={24} />
                </div>
                <div>
                  <div className="mb-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-bold tracking-wide uppercase">
                    <Sparkles size={11} />
                    Manager Onboarding
                  </div>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Invite Manager
                  </h2>
                  <p className="text-sm text-slate-400 font-medium">
                    Send an activation invitation to a new property manager.
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                disabled={submitting}
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
                Form
            ================================ */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* First Name + Last Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <ModalInput
                  icon={<User size={17} />}
                  label="First Name"
                  name="firstName"
                  placeholder="e.g. Alex"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                />
                <ModalInput
                  icon={<User size={17} />}
                  label="Last Name"
                  name="lastName"
                  placeholder="e.g. Mercer"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={submitting}
                />
              </div>

              {/* Email + Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <ModalInput
                  icon={<Mail size={17} />}
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="manager@skyline.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                />
                <ModalInput
                  icon={<Phone size={17} />}
                  label="Phone Number"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                />
              </div>

              {/* Apartment Selector */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Apartment <span className="text-cyan-500">*</span>
                </label>
                <div className="relative group">
                  <Building2
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors duration-300 z-10"
                  />
                  <select
                    name="apartmentId"
                    value={formData.apartmentId}
                    onChange={handleChange}
                    disabled={submitting || loadingApartments}
                    className="
                      w-full rounded-xl
                      border border-slate-700/80
                      bg-slate-950/60
                      py-3 pl-10 pr-4
                      text-sm text-white
                      outline-none
                      transition-all duration-300
                      focus:bg-slate-950/90
                      focus:border-cyan-400
                      focus:ring-4 focus:ring-cyan-500/15
                      disabled:opacity-50
                      cursor-pointer
                    "
                  >
                    <option value="" className="bg-slate-900 text-slate-400">
                      {loadingApartments ? "Loading apartments..." : "Select apartment"}
                    </option>
                    {apartments.map((apt) => (
                      <option key={apt.id} value={apt.id} className="bg-slate-900 text-white">
                        {apt.apartmentName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Building Multi-Selector */}
              <AnimatePresence>
                {formData.apartmentId && (
                  <motion.div
                    key="buildings-panel"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Assign Buildings <span className="text-cyan-500">*</span>
                        </label>
                        {formData.buildingIds.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20 text-[11px] font-bold">
                            {formData.buildingIds.length} selected
                          </span>
                        )}
                      </div>

                      <div className="rounded-2xl border border-slate-700/60 bg-slate-950/40 p-4">

                        {/* Loading Buildings */}
                        {loadingBuildings && (
                          <div className="flex items-center gap-3 text-slate-400 text-sm py-2">
                            <Loader2 size={16} className="animate-spin text-cyan-400" />
                            Loading buildings...
                          </div>
                        )}

                        {/* No Buildings */}
                        {!loadingBuildings && buildings.length === 0 && (
                          <div className="flex items-center gap-2 text-slate-500 text-sm py-2">
                            <AlertCircle size={16} />
                            No buildings found for this apartment.
                          </div>
                        )}

                        {/* Building Grid */}
                        {!loadingBuildings && buildings.length > 0 && (
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {buildings.map((building, idx) => {
                              const isChecked = formData.buildingIds.includes(building.id);

                              return (
                                <motion.label
                                  key={building.id}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  onClick={() => handleBuildingChange(building.id)}
                                  className={`
                                    group
                                    flex items-center gap-3
                                    rounded-xl border px-4 py-3
                                    cursor-pointer
                                    transition-all duration-200
                                    ${isChecked
                                      ? "border-purple-500/50 bg-purple-500/10 text-purple-300"
                                      : "border-slate-700/60 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:bg-slate-800/60 hover:text-slate-300"
                                    }
                                  `}
                                >
                                  {/* Custom Checkbox */}
                                  <span className={`shrink-0 transition-colors duration-200 ${isChecked ? "text-purple-400" : "text-slate-600"}`}>
                                    {isChecked
                                      ? <CheckSquare size={18} className="text-purple-400" />
                                      : <Square size={18} />
                                    }
                                  </span>

                                  <span className="flex items-center gap-2 text-sm font-semibold">
                                    <Building size={14} className={isChecked ? "text-purple-400" : "text-slate-500"} />
                                    {building.buildingName}
                                  </span>

                                  {isChecked && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="ml-auto w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]"
                                    />
                                  )}
                                </motion.label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="border-t border-slate-800/80 pt-2" />

              {/* Actions */}
              <div className="flex items-center gap-3 pt-1">
                {/* Cancel */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  disabled={submitting}
                  className="
                    flex-1
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
                  whileHover={isFormValid && !submitting ? { scale: 1.02 } : {}}
                  whileTap={isFormValid && !submitting ? { scale: 0.97 } : {}}
                  disabled={!isFormValid || submitting}
                  className={`
                    group
                    relative
                    flex-1
                    flex items-center justify-center gap-2
                    px-6 py-3 rounded-xl
                    text-white text-sm font-extrabold
                    overflow-hidden
                    shadow-lg
                    transition-all duration-300
                    ${isFormValid && !submitting
                      ? "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 shadow-purple-500/25 hover:shadow-purple-500/40 cursor-pointer"
                      : "bg-slate-700 shadow-none cursor-not-allowed opacity-50"
                    }
                  `}
                >
                  {/* Shimmer */}
                  {isFormValid && !submitting && (
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  )}

                  <span className="relative flex items-center gap-2">
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending Invitation...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Invitation
                      </>
                    )}
                  </span>
                </motion.button>
              </div>

            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}