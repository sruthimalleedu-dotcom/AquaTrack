import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle, Sparkles, Activity } from "lucide-react";

import DashboardLayout from "../../components/ui/DashboardLayout";
import DashboardSummaryCards from "../../components/propertyAdmin/DashboardSummaryCards";
import DashboardQuickActions from "../../components/propertyAdmin/DashboardQuickActions";

import { getPropertyDashboardSummary } from "../../services/propertyDashboardService";

export default function PropertyAdminDashboard() {
  // ==========================================
  // State
  // ==========================================
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    loadDashboard();
  }, []);

  // ==========================================
  // Load Dashboard
  // ==========================================
  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const response = await getPropertyDashboardSummary();

      console.log("Property Dashboard Summary:", response);
      setSummary(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to load dashboard data."
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
            Page Header with Actions
        ====================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                <Sparkles size={13} className="text-blue-500" />
                Property Control Center
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Systems Operational
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Property Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Welcome back! Monitor your assigned apartments, buildings, managers, and residents.
            </p>
          </div>

          {/* Refresh Button */}
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
            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl bg-white border border-slate-200/80 p-5 animate-pulse shadow-sm flex flex-col justify-between"
                >
                  <div className="h-4 w-1/2 bg-slate-200 rounded-md" />
                  <div className="h-8 w-1/3 bg-slate-300 rounded-lg" />
                </div>
              ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div className="h-48 rounded-2xl bg-white border border-slate-200/80 p-6 animate-pulse shadow-sm" />
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
            {/* Summary Metrics Cards */}
            <DashboardSummaryCards summary={summary} />

            {/* Quick Action Shortcuts */}
            <DashboardQuickActions />
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}