import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle } from "lucide-react";

import DashboardLayout from "../../components/ui/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentRegistrations from "../../components/dashboard/RecentRegistrations";
import PropertyAdminOverview from "../../components/dashboard/PropertyAdminOverview";

import {
  Building2,
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import {
  getDashboardSummary,
  getRecentRegistrations,
} from "../../services/dashboardService";

export default function SuperAdminDashboard() {
  // ==========================================
  // State
  // ==========================================
  const [summary, setSummary] = useState(null);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    loadDashboard();
  }, []);

  // ==========================================
  // Load Dashboard Data
  // ==========================================
  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const summaryResponse = await getDashboardSummary();
      const registrationResponse = await getRecentRegistrations();

      console.log("Dashboard Summary :", summaryResponse);
      console.log("Recent Registrations :", registrationResponse);

      setSummary(summaryResponse.data);
      setRecentRegistrations(registrationResponse.data?.slice(0, 5) || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to load super admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* ======================================
            Dashboard Header Row with Refresh Action
        ====================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
          <DashboardHeader />

          {/* Refresh Action */}
          <button
            onClick={loadDashboard}
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-xl
              bg-white
              hover:bg-slate-50
              border
              border-slate-200
              text-slate-700
              font-semibold
              text-sm
              shadow-sm
              hover:shadow
              transition-all
              duration-200
              active:scale-95
              disabled:opacity-60
              self-start
              sm:self-auto
            "
          >
            <RefreshCw
              size={16}
              className={`text-slate-500 ${loading ? "animate-spin text-blue-600" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>

        {/* ======================================
            Loading Skeleton State
        ====================================== */}
        {loading && (
          <div className="space-y-6">
            {/* Stat Cards Skeleton */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-white border border-slate-200/80 p-5 animate-pulse shadow-sm flex flex-col justify-between"
                >
                  <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
                  <div className="h-7 w-1/3 bg-slate-300 rounded-lg" />
                </div>
              ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div className="h-40 rounded-2xl bg-white border border-slate-200/80 p-6 animate-pulse shadow-sm" />
          </div>
        )}

        {/* ======================================
            Error Banner
        ====================================== */}
        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-2xl
              border
              border-red-200
              bg-red-50/90
              p-5
              text-red-800
              shadow-sm
            "
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={22} className="text-red-500 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Dashboard Update Error</h4>
                <p className="text-xs text-red-600 mt-0.5">{error}</p>
              </div>
            </div>

            <button
              onClick={loadDashboard}
              className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* ======================================
            Dashboard Content (With Entry Motion)
        ====================================== */}
        {!loading && !error && summary && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Statistics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Registrations"
                value={summary.totalRegistrations}
                icon={Building2}
                color="blue"
              />

              <StatCard
                title="Pending Registrations"
                value={summary.pendingRegistrations}
                icon={Clock3}
                color="yellow"
              />

              <StatCard
                title="Approved"
                value={summary.approvedRegistrations}
                icon={CheckCircle2}
                color="green"
              />

              <StatCard
                title="Rejected"
                value={summary.rejectedRegistrations}
                icon={XCircle}
                color="red"
              />

              <StatCard
                title="Property Admins"
                value={summary.totalPropertyAdmins}
                icon={Users}
                color="purple"
              />

              <StatCard
                title="Active Admins"
                value={summary.activePropertyAdmins}
                icon={UserCheck}
                color="green"
              />

              <StatCard
                title="Inactive Admins"
                value={summary.inactivePropertyAdmins}
                icon={UserX}
                color="slate"
              />
            </div>

            {/* Quick Actions Shortcuts */}
            <QuickActions />

            {/* Recent Registrations Table/List */}
            <RecentRegistrations registrations={recentRegistrations} />

            {/* Property Admin System Overview */}
            <PropertyAdminOverview summary={summary} />
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}