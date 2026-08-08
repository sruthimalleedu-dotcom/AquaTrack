import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Search,
  RefreshCw,
  Users,
  Eye,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Filter,
} from "lucide-react";

import DashboardLayout from "../../components/ui/DashboardLayout";
import {
  getAllPropertyAdmins,
  getPropertyAdminById,
} from "../../services/propertyAdminManagementService";
import PropertyAdminDetailsModal from "../../components/admin/PropertyAdminDetailsModal";

export default function PropertyAdmins() {
  const { t } = useTranslation();

  // ==========================================
  // State
  // ==========================================
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    loadPropertyAdmins();
  }, []);

  // ==========================================
  // Load Property Admins
  // ==========================================
  async function loadPropertyAdmins() {
    try {
      setLoading(true);
      setError("");

      const response = await getAllPropertyAdmins();
      setAdmins(response.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || t("admin.propertyAdmins.errors.fetch")
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // View Details
  // ==========================================
  async function handleView(id) {
    try {
      setLoadingId(id);
      const response = await getPropertyAdminById(id);
      setSelectedAdmin(response.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      alert(t("admin.propertyAdmins.errors.view"));
    } finally {
      setLoadingId(null);
    }
  }

  // ==========================================
  // Filter Logic
  // ==========================================
  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const keyword = search.toLowerCase();
      const matchesSearch =
        admin.firstName?.toLowerCase().includes(keyword) ||
        admin.lastName?.toLowerCase().includes(keyword) ||
        admin.email?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : statusFilter === "ACTIVE"
          ? admin.active
          : !admin.active;

      return matchesSearch && matchesStatus;
    });
  }, [admins, search, statusFilter]);

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
                {t("admin.propertyAdmins.badge")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t("admin.propertyAdmins.title")}
            </h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              {t("admin.propertyAdmins.subtitle")}
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
              <Users size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-100">
                {t("admin.propertyAdmins.metric")}
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight">
                {admins.length}
              </h2>
            </div>
          </motion.div>
        </div>

        {/* ======================================
            Toolbar Card
        ====================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            rounded-3xl
            border
            border-slate-200/80
            bg-white/80
            backdrop-blur-xl
            p-5
            shadow-md
            shadow-slate-900/5
          "
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  group-focus-within:text-cyan-500
                  group-focus-within:scale-110
                  transition-all
                  duration-300
                "
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("admin.propertyAdmins.searchPlaceholder")}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/70
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-slate-800
                  placeholder-slate-400
                  outline-none
                  transition-all
                  duration-300
                  focus:bg-white
                  focus:border-cyan-400
                  focus:ring-4
                  focus:ring-cyan-500/10
                  focus:shadow-md
                "
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
                  w-full
                  lg:w-auto
                  appearance-none
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/70
                  py-3
                  pl-4
                  pr-10
                  text-xs
                  font-bold
                  text-slate-700
                  outline-none
                  cursor-pointer
                  transition-all
                  duration-300
                  focus:bg-white
                  focus:border-cyan-400
                  focus:ring-4
                  focus:ring-cyan-500/10
                  hover:border-slate-300
                "
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Suspended</option>
              </select>

              <Filter
                size={14}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={loadPropertyAdmins}
              disabled={loading}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                hover:from-blue-700
                hover:to-cyan-600
                px-6
                py-3
                text-xs
                font-extrabold
                text-white
                shadow-md
                shadow-cyan-500/20
                hover:shadow-lg
                hover:shadow-cyan-500/35
                transition-all
                duration-300
                active:scale-95
                disabled:opacity-60
              "
            >
              <RefreshCw
                size={16}
                className={`transition-transform duration-500 ${loading ? "animate-spin" : "group-hover:rotate-180"}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* ======================================
            Table Container Card
        ====================================== */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-md shadow-slate-900/5 overflow-hidden">
          
          {/* Loading Skeleton State */}
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
              {filteredAdmins.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <Users size={36} className="mx-auto text-slate-300 animate-bounce" />
                  <p className="text-sm font-medium">No property admins found matching your criteria.</p>
                </div>
              ) : (
                <table className="min-w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="px-7 py-4">Admin Name</th>
                      <th className="px-7 py-4">Email Address</th>
                      <th className="px-7 py-4">Phone Number</th>
                      <th className="px-7 py-4">Status</th>
                      <th className="px-7 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredAdmins.map((admin, idx) => (
                      <motion.tr
                        key={admin.id || idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-blue-50/40 transition-colors duration-200"
                      >
                        {/* Name */}
                        <td className="px-7 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                              {admin.firstName?.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {admin.firstName} {admin.lastName}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-7 py-4 font-medium text-slate-600">
                          {admin.email}
                        </td>

                        {/* Phone */}
                        <td className="px-7 py-4 font-medium text-slate-500">
                          {admin.phone || "-"}
                        </td>

                        {/* Status */}
                        <td className="px-7 py-4">
                          {admin.active ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              ACTIVE
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              SUSPENDED
                            </span>
                          )}
                        </td>

                        {/* View Button */}
                        <td className="px-7 py-4 text-center">
                          <button
                            onClick={() => handleView(admin.id)}
                            disabled={loadingId === admin.id}
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
                            <span>{loadingId === admin.id ? "Loading..." : "View"}</span>
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

      {/* Details Modal Component */}
      <PropertyAdminDetailsModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        admin={selectedAdmin}
        onRefresh={loadPropertyAdmins}
      />
    </DashboardLayout>
  );
}