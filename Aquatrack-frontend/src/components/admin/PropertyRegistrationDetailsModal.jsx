import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  AlertCircle,
  Building2,
  Sparkles,
} from "lucide-react";

import {
  approveRegistration,
  rejectRegistration,
} from "../../services/propertyRegistrationService";

export default function PropertyRegistrationDetailsModal({
  open,
  registration,
  onClose,
  onSuccess,
}) {
  if (!open || !registration) {
    return null;
  }

  const [loading, setLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectBox, setShowRejectBox] = useState(false);

  // ==========================================
  // Approve Action
  // ==========================================
  async function handleApprove() {
    try {
      setLoading(true);
      const response = await approveRegistration(registration.id);
      console.log(response);

      alert("Property Registration Approved Successfully.");
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to approve registration."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // Reject Action
  // ==========================================
  async function handleReject() {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    try {
      setLoading(true);
      const response = await rejectRegistration(
        registration.id,
        rejectionReason
      );
      console.log(response);

      alert("Property Registration Rejected Successfully.");
      setShowRejectBox(false);
      setRejectionReason("");
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to reject registration."
      );
    } finally {
      setLoading(false);
    }
  }

  // Helper for Status Badge Rendering
  const renderStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={13} className="text-emerald-500" />
            APPROVED
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle size={13} className="text-rose-500" />
            REJECTED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock size={13} className="text-amber-500 animate-spin" />
            PENDING REVIEW
          </span>
        );
    }
  };

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

        {/* Modal Window */}
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
          {/* Top Gradient Highlight Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-8 py-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-inner">
                <Building2 size={22} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Registration Details
                  </h2>
                  {renderStatusBadge(registration.status)}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Review applicant details and manage approval status
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

          {/* Info Grid */}
          <div className="grid gap-3.5 p-7 sm:grid-cols-2 max-h-[60vh] overflow-y-auto">
            <InfoItem
              icon={<Building size={15} className="text-blue-500" />}
              label="Company Name"
              value={registration.companyName}
            />

            <InfoItem
              icon={<User size={15} className="text-blue-500" />}
              label="Contact Person"
              value={registration.contactPersonName}
            />

            <InfoItem
              icon={<Mail size={15} className="text-cyan-500" />}
              label="Email Address"
              value={registration.email}
            />

            <InfoItem
              icon={<Phone size={15} className="text-teal-500" />}
              label="Phone Number"
              value={registration.phone}
            />

            <InfoItem
              icon={<Sparkles size={15} className="text-purple-500" />}
              label="Property Type"
              value={registration.propertyType}
            />

            <InfoItem
              icon={<Building2 size={15} className="text-indigo-500" />}
              label="Total Apartments"
              value={registration.numberOfApartments}
            />

            <InfoItem
              icon={<MapPin size={15} className="text-rose-500" />}
              label="Street Address"
              value={registration.address}
              colSpan="sm:col-span-2"
            />

            <InfoItem
              icon={<MapPin size={15} className="text-emerald-500" />}
              label="City"
              value={registration.city}
            />

            <InfoItem
              icon={<MapPin size={15} className="text-amber-500" />}
              label="State"
              value={registration.state}
            />

            <InfoItem
              icon={<MapPin size={15} className="text-slate-500" />}
              label="Pincode"
              value={registration.pincode}
            />
          </div>

          {/* Rejection Reason Expandable Box */}
          <AnimatePresence>
            {showRejectBox && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-rose-100 bg-rose-50/50 p-6"
              >
                <div className="flex items-center gap-2 mb-2 text-rose-700 font-bold text-sm">
                  <AlertCircle size={16} />
                  <span>Enter Rejection Reason</span>
                </div>

                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Provide a clear explanation for rejecting this registration request..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-rose-200
                    bg-white
                    p-3.5
                    text-sm
                    text-slate-800
                    placeholder-slate-400
                    outline-none
                    transition-all
                    focus:border-rose-500
                    focus:ring-4
                    focus:ring-rose-500/10
                  "
                />

                <div className="mt-3 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setShowRejectBox(false);
                      setRejectionReason("");
                    }}
                    className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleReject}
                    disabled={loading}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-xl
                      bg-gradient-to-r
                      from-rose-600
                      to-red-600
                      hover:from-rose-700
                      hover:to-red-700
                      px-5
                      py-2
                      text-xs
                      font-extrabold
                      text-white
                      shadow-md
                      shadow-rose-500/20
                      transition-all
                      active:scale-95
                      disabled:opacity-50
                    "
                  >
                    <Send size={13} />
                    <span>{loading ? "Rejecting..." : "Confirm Rejection"}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-slate-100 px-8 py-4 bg-slate-50/50">
            <div className="text-xs text-slate-400 font-medium">
              ID: <span className="font-mono text-slate-600">{registration.id}</span>
            </div>

            <div className="flex items-center gap-3">
              {registration.status === "PENDING" && !showRejectBox && (
                <>
                  <button
                    onClick={() => setShowRejectBox(true)}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-xl
                      bg-rose-50
                      hover:bg-rose-100
                      border
                      border-rose-200
                      px-4
                      py-2.5
                      text-xs
                      font-extrabold
                      text-rose-700
                      transition-all
                      active:scale-95
                    "
                  >
                    <XCircle size={15} />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-xl
                      bg-gradient-to-r
                      from-emerald-600
                      to-teal-500
                      hover:from-emerald-700
                      hover:to-teal-600
                      px-5
                      py-2.5
                      text-xs
                      font-extrabold
                      text-white
                      shadow-md
                      shadow-emerald-500/20
                      transition-all
                      active:scale-95
                      disabled:opacity-50
                    "
                  >
                    <CheckCircle2 size={15} />
                    <span>{loading ? "Approving..." : "Approve Registration"}</span>
                  </button>
                </>
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
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Reusable Glass Item Component
function InfoItem({ icon, label, value, colSpan }) {
  return (
    <div className={`rounded-2xl bg-slate-50/80 border border-slate-200/70 p-3.5 transition-all hover:border-blue-300/80 ${colSpan || ""}`}>
      <div className="flex items-center gap-1.5 mb-0.5 text-slate-400">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-sm font-bold text-slate-800 tracking-tight">
        {value || "-"}
      </p>
    </div>
  );
}