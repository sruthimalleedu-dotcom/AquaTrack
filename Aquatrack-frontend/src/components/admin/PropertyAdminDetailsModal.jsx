import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, ShieldAlert, User, Mail, Phone, Shield } from "lucide-react";

import {
  suspendPropertyAdmin,
  reactivatePropertyAdmin,
} from "../../services/propertyAdminManagementService";

export default function PropertyAdminDetailsModal({
  open,
  onClose,
  admin,
  onRefresh,
}) {
  if (!open || !admin) return null;

  // ==========================================
  // Suspend
  // ==========================================
  async function handleSuspend() {
    const confirmed = window.confirm(
      `Are you sure you want to suspend Property Admin ${admin.firstName} ${admin.lastName}?`
    );

    if (!confirmed) return;

    try {
      await suspendPropertyAdmin(admin.id);
      alert("Property Admin suspended successfully.");
      onRefresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to suspend property admin."
      );
    }
  }

  // ==========================================
  // Reactivate
  // ==========================================
  async function handleReactivate() {
    const confirmed = window.confirm(
      `Are you sure you want to reactivate Property Admin ${admin.firstName} ${admin.lastName}?`
    );

    if (!confirmed) return;

    try {
      await reactivatePropertyAdmin(admin.id);
      alert("Property Admin reactivated successfully.");
      onRefresh();
      onClose();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to reactivate property admin."
      );
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="
            relative
            w-full
            max-w-3xl
            rounded-3xl
            bg-white/95
            backdrop-blur-2xl
            shadow-2xl
            shadow-slate-950/20
            border
            border-slate-200/80
            overflow-hidden
            z-10
          "
        >
          {/* Top Decorative Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shadow-inner">
                {admin.firstName?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                  {admin.firstName} {admin.lastName}
                  {admin.active ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      SUSPENDED
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Review and manage administrator information
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all active:scale-95"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body Fields */}
          <div className="grid gap-4 p-8 sm:grid-cols-2">
            <Field
              icon={<User size={16} className="text-blue-500" />}
              label="First Name"
              value={admin.firstName}
            />

            <Field
              icon={<User size={16} className="text-blue-500" />}
              label="Last Name"
              value={admin.lastName}
            />

            <Field
              icon={<Mail size={16} className="text-cyan-500" />}
              label="Email Address"
              value={admin.email}
            />

            <Field
              icon={<Phone size={16} className="text-teal-500" />}
              label="Phone Number"
              value={admin.phone}
            />

            <Field
              icon={<Shield size={16} className="text-purple-500" />}
              label="Assigned Role"
              value={admin.role}
            />

            <Field
              icon={
                admin.active ? (
                  <ShieldCheck size={16} className="text-emerald-500" />
                ) : (
                  <ShieldAlert size={16} className="text-rose-500" />
                )
              }
              label="Account Status"
              value={admin.active ? "ACTIVE" : "SUSPENDED"}
              highlight={admin.active ? "text-emerald-600" : "text-rose-600"}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-8 py-5 bg-slate-50/50">
            {admin.active ? (
              <button
                onClick={handleSuspend}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-rose-600
                  to-red-600
                  hover:from-rose-700
                  hover:to-red-700
                  px-5
                  py-2.5
                  text-xs
                  font-extrabold
                  text-white
                  shadow-md
                  shadow-rose-500/20
                  transition-all
                  duration-200
                  active:scale-95
                "
              >
                <ShieldAlert size={16} />
                <span>Suspend Admin</span>
              </button>
            ) : (
              <button
                onClick={handleReactivate}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-600
                  to-teal-600
                  hover:from-emerald-700
                  hover:to-teal-700
                  px-5
                  py-2.5
                  text-xs
                  font-extrabold
                  text-white
                  shadow-md
                  shadow-emerald-500/20
                  transition-all
                  duration-200
                  active:scale-95
                "
              >
                <ShieldCheck size={16} />
                <span>Reactivate Admin</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="
                rounded-xl
                bg-slate-200/80
                hover:bg-slate-300/80
                px-5
                py-2.5
                text-xs
                font-bold
                text-slate-700
                transition-all
                active:scale-95
              "
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ==========================================
// Reusable Glass Field Component
// ==========================================
function Field({ icon, label, value, highlight }) {
  return (
    <div className="rounded-2xl bg-slate-50/80 border border-slate-200/70 p-4 transition-all hover:border-blue-300/80">
      <div className="flex items-center gap-1.5 mb-1 text-slate-400">
        {icon}
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className={`text-base font-bold tracking-tight ${highlight || "text-slate-800"}`}>
        {value || "-"}
      </p>
    </div>
  );
}