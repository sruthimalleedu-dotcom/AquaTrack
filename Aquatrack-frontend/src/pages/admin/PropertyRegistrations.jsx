import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Eye,
  Sparkles,
  AlertCircle,
  ClipboardList,
} from "lucide-react";

import DashboardLayout from "../../components/ui/DashboardLayout";
import PropertyRegistrationToolbar from "../../components/admin/PropertyRegistrationToolbar";
import PropertyRegistrationDetailsModal from "../../components/admin/PropertyRegistrationDetailsModal";

import {
  getAllRegistrations,
  getRegistrationById,
} from "../../services/propertyRegistrationService";

export default function AdminRegistrations() {
  const { t } = useTranslation();

  // ==========================================
  // State
  // ==========================================
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    loadRegistrations();
  }, []);

  // ==========================================
  // Fetch Registrations
  // ==========================================
  async function loadRegistrations() {
    try {
      setLoading(true);
      setError("");

      const response = await getAllRegistrations();
      console.log(response);

      setRegistrations(response.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || t("admin.registrations.errors.fetch")
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // View Registration Details
  // ==========================================
  async function handleViewRegistration(id) {
    try {
      setLoadingId(id);
      const response = await getRegistrationById(id);
      console.log("Registration Details :", response);

      setSelectedRegistration(response.data);
      setIsDetailsModalOpen(true);
    } catch (err) {
      console.error(err);
      alert(t("admin.registrations.errors.view"));
    } finally {
      setLoadingId(null);
    }
  }

  // ==========================================
  // Search + Filter Logic
  // ==========================================
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const matchesSearch =
        registration.companyName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        registration.contactPersonName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        registration.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || registration.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [registrations, searchTerm, statusFilter]);

  // Helper for Status Badge Rendering
  const renderStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {t("admin.registrations.statuses.approved")}
          </span>
        );
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            {t("admin.registrations.statuses.rejected")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {t("admin.registrations.statuses.pending")}
          </span>
        );
    }
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* ======================================
            Header Row
        ====================================== */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between pb-2 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                <Sparkles size={13} className="text-blue-500" />
                {t("admin.registrations.badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t("admin.registrations.title")}
            </h1>

            <p className="mt-1 text-sm text-slate-500 font-medium">
              {t("admin.registrations.subtitle")}
            </p>
          </div>

          {/* Metric Pill Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              bg-gradient-to-tr
              from-blue-600
              via-cyan-600
              to-teal-500
              p-5
              text-white
              shadow-lg
              shadow-cyan-500/20
              self-start
              lg:self-auto
            "
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md text-white">
              <ClipboardList size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-100">
                {t("admin.registrations.metric")}
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight">
                {filteredRegistrations.length}
              </h2>
            </div>
          </motion.div>
        </div>

        {/* ======================================
            Toolbar Component
        ====================================== */}
        <PropertyRegistrationToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onRefresh={loadRegistrations}
        />

        {/* ======================================
            Table Container Card
        ====================================== */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-md shadow-slate-900/5 overflow-hidden">
          
          {/* Loading Skeleton */}
          {loading && (
            <div className="p-8 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Error Banner */}
          {!loading && error && (
            <div className="p-8 flex items-center gap-3 text-red-600 font-semibold text-sm">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Main Table */}
          {!loading && !error && (
            <div className="overflow-x-auto">
              {filteredRegistrations.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <Building2 size={36} className="mx-auto text-slate-300 animate-bounce" />
                  <p className="text-sm font-medium">{t("admin.registrations.empty")}</p>
                </div>
              ) : (
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="px-7 py-4 whitespace-nowrap">Company</th>
                      <th className="px-7 py-4 whitespace-nowrap">Contact Person</th>
                      <th className="px-7 py-4 whitespace-nowrap">Email</th>
                      <th className="px-7 py-4 whitespace-nowrap">Property</th>
                      <th className="px-7 py-4 whitespace-nowrap">Apartments</th>
                      <th className="px-7 py-4 whitespace-nowrap">City</th>
                      <th className="px-7 py-4 whitespace-nowrap">Status</th>
                      <th className="px-7 py-4 whitespace-nowrap text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredRegistrations.map((registration, idx) => (
                      <motion.tr
                        key={registration.id || idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-blue-50/40 transition-colors duration-200"
                      >
                        {/* Company */}
                        <td className="px-7 py-4 font-bold text-slate-800 whitespace-nowrap group-hover:text-blue-600 transition-colors">
                          {registration.companyName}
                        </td>

                        {/* Contact Person */}
                        <td className="px-7 py-4 font-medium text-slate-600 whitespace-nowrap">
                          {registration.contactPersonName}
                        </td>

                        {/* Email */}
                        <td className="px-7 py-4 font-medium text-slate-500 whitespace-nowrap">
                          {registration.email}
                        </td>

                        {/* Property Type */}
                        <td className="px-7 py-4 font-medium text-slate-600 whitespace-nowrap">
                          {registration.propertyType || "-"}
                        </td>

                        {/* Number of Apartments */}
                        <td className="px-7 py-4 font-semibold text-slate-700 whitespace-nowrap">
                          {registration.numberOfApartments || "-"}
                        </td>

                        {/* City */}
                        <td className="px-7 py-4 font-medium text-slate-500 whitespace-nowrap">
                          {registration.city || "-"}
                        </td>

                        {/* Status Badge */}
                        <td className="px-7 py-4 whitespace-nowrap">
                          {renderStatusBadge(registration.status)}
                        </td>

                        {/* View Action Button */}
                        <td className="px-7 py-4 text-center whitespace-nowrap">
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
                              px-4
                              py-2
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
          )}
        </div>

      </div>

      {/* Details Modal */}
      <PropertyRegistrationDetailsModal
        open={isDetailsModalOpen}
        registration={selectedRegistration}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedRegistration(null);
        }}
        onSuccess={loadRegistrations}
      />
    </DashboardLayout>
  );
}