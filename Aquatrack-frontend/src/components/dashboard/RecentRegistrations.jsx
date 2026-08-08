import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, ArrowRight, Building2, CheckCircle2, Clock, XCircle, Sparkles } from "lucide-react";

import PropertyRegistrationDetailsModal from "../admin/PropertyRegistrationDetailsModal";
import { getRegistrationById } from "../../services/propertyRegistrationService";

export default function RecentRegistrations({ registrations = [] }) {
  // ==========================================
  // State
  // ==========================================
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  // ==========================================
  // View Registration Handler
  // ==========================================
  async function handleViewRegistration(id) {
    try {
      setLoadingId(id);
      const response = await getRegistrationById(id);
      console.log("Registration Details :", response);

      setSelectedRegistration(response.data);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Failed to load registration details.");
    } finally {
      setLoadingId(null);
    }
  }

  // Helper for Status Badge Styling & Icons
  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Approved
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          rounded-3xl
          border
          border-slate-200/80
          bg-white/80
          backdrop-blur-xl
          shadow-md
          shadow-slate-900/5
          overflow-hidden
        "
      >
        {/* ======================================
            Card Header
        ====================================== */}
        <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Recent Property Registrations
              <Sparkles size={16} className="text-cyan-500" />
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 font-medium">
              Latest property registration requests requiring admin review
            </p>
          </div>

          <Link
            to="/admin/registrations"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              hover:from-blue-700
              hover:to-cyan-600
              px-4
              py-2.5
              text-xs
              font-bold
              text-white
              shadow-sm
              hover:shadow-md
              hover:shadow-cyan-500/20
              transition-all
              duration-200
              active:scale-95
            "
          >
            <span>View All</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ======================================
            Registrations Table
        ====================================== */}
        <div className="overflow-x-auto">
          {registrations.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Building2 size={36} className="mx-auto text-slate-300 animate-bounce" />
              <p className="text-sm font-medium">No recent registrations found.</p>
            </div>
          ) : (
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-7 py-3.5">Company</th>
                  <th className="px-7 py-3.5">Contact Person</th>
                  <th className="px-7 py-3.5">City</th>
                  <th className="px-7 py-3.5">Status</th>
                  <th className="px-7 py-3.5 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {registrations.map((registration, idx) => (
                  <motion.tr
                    key={registration.id || idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="
                      group
                      hover:bg-blue-50/40
                      transition-colors
                      duration-200
                    "
                  >
                    {/* Company */}
                    <td className="px-7 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                          {registration.companyName?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {registration.companyName}
                        </span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-7 py-4 font-medium text-slate-600">
                      {registration.contactPersonName || "N/A"}
                    </td>

                    {/* City */}
                    <td className="px-7 py-4 text-slate-500 font-medium">
                      {registration.city || "N/A"}
                    </td>

                    {/* Status Badge */}
                    <td className="px-7 py-4">
                      {getStatusBadge(registration.status)}
                    </td>

                    {/* View Action Button */}
                    <td className="px-7 py-4 text-center">
                      <button
                        onClick={() => handleViewRegistration(registration.id)}
                        disabled={loadingId === registration.id}
                        className="
                          group/btn
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-xl
                          bg-slate-100
                          hover:bg-blue-600
                          text-slate-700
                          hover:text-white
                          px-3.5
                          py-1.5
                          text-xs
                          font-bold
                          transition-all
                          duration-200
                          active:scale-95
                          disabled:opacity-50
                          shadow-xs
                        "
                      >
                        <Eye
                          size={14}
                          className="transition-transform duration-200 group-hover/btn:scale-110"
                        />
                        <span>{loadingId === registration.id ? "Loading..." : "View"}</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* ======================================
          Details Modal Component
      ====================================== */}
      <PropertyRegistrationDetailsModal
        open={isDetailsModalOpen}
        registration={selectedRegistration}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedRegistration(null);
        }}
      />
    </>
  );
}