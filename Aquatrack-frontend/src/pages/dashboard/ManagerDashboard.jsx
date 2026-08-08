import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import DashboardSummaryCards from "../../components/manager/DashboardSummaryCards";
import DashboardCharts from "../../components/manager/DashboardCharts";
import DashboardAlerts from "../../components/manager/DashboardAlerts";
import DashboardQuickActions from "../../components/manager/DashboardQuickActions";

import TopConsumersTable from "../../components/manager/tables/TopConsumersTable";
import RecentBillsTable from "../../components/manager/tables/RecentBillsTable";
import RecentPaymentsTable from "../../components/manager/tables/RecentPaymentsTable";

import {
  getDashboardSummary,
  getMonthlyWaterConsumption,
  getBuildingUsage,
  getPaymentStatus,
  getBillStatus,
  getRevenueTrend,
  getTopConsumers,
  getRecentBills,
  getRecentPayments,
  getDashboardAlerts,
} from "../../services/managerDashboardService";

export default function ManagerDashboard() {

  // ==========================================
  // State
  // ==========================================

  const [dashboard, setDashboard] = useState({
    summary: null,
    monthlyConsumption: [],
    buildingUsage: [],
    paymentStatus: null,
    billStatus: null,
    revenueTrend: [],
    topConsumers: [],
    recentBills: [],
    recentPayments: [],
    alerts: [],
  });

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

      const [

        summary,

        monthlyConsumption,

        buildingUsage,

        paymentStatus,

        billStatus,

        revenueTrend,

        topConsumers,

        recentBills,

        recentPayments,

        alerts,

      ] = await Promise.all([

        getDashboardSummary(),

        getMonthlyWaterConsumption(),

        getBuildingUsage(),

        getPaymentStatus(),

        getBillStatus(),

        getRevenueTrend(),

        getTopConsumers(),

        getRecentBills(),

        getRecentPayments(),

        getDashboardAlerts(),

      ]);

      setDashboard({

        summary: summary.data,

        monthlyConsumption: monthlyConsumption.data,

        buildingUsage: buildingUsage.data,

        paymentStatus: paymentStatus.data,

        billStatus: billStatus.data,

        revenueTrend: revenueTrend.data,

        topConsumers: topConsumers.data,

        recentBills: recentBills.data,

        recentPayments: recentPayments.data,

        alerts: alerts.data,

      });

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Failed to load dashboard."

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

      <div className="mx-auto max-w-7xl space-y-8">

        {/* ========================================== */}
        {/* Header */}
        {/* ========================================== */}

        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">

              <Sparkles size={14} />

              Building Operations Hub

            </div>

            <h1 className="text-3xl font-bold text-slate-900">

              Manager Dashboard

            </h1>

            <p className="mt-1 text-slate-500">

              Monitor buildings, residents, bills and water consumption
              from one centralized dashboard.

            </p>

          </div>

          <button
            onClick={loadDashboard}
            disabled={loading}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              font-medium
              shadow-sm
              hover:bg-slate-50
              disabled:opacity-60
            "
          >

            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />

            Refresh Dashboard

          </button>

        </div>

        {/* ========================================== */}
        {/* Error */}
        {/* ========================================== */}

        {!loading && error && (

          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">

            <AlertCircle className="mt-0.5 text-red-600" />

            <div>

              <h3 className="font-semibold text-red-700">

                Failed to load dashboard

              </h3>

              <p className="mt-1 text-sm text-red-600">

                {error}

              </p>

            </div>

          </div>

        )}

        {/* ========================================== */}
        {/* Dashboard */}
        {/* ========================================== */}

        {!loading && !error && (

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >

            {/* KPI Cards */}

            <DashboardSummaryCards
              summary={dashboard.summary}
            />

            {/* Charts */}

            <DashboardCharts
              monthlyConsumption={dashboard.monthlyConsumption}
              buildingUsage={dashboard.buildingUsage}
              paymentStatus={dashboard.paymentStatus}
              billStatus={dashboard.billStatus}
              revenueTrend={dashboard.revenueTrend}
            />

            {/* Tables */}

            <div className="space-y-8">

    <TopConsumersTable
        data={dashboard.topConsumers}
        loading={loading}
    />

    <div className="grid gap-8 xl:grid-cols-2">

        <RecentBillsTable
            data={dashboard.recentBills}
            loading={loading}
        />

        <RecentPaymentsTable
            data={dashboard.recentPayments}
            loading={loading}
        />

    </div>

</div>

            {/* Alerts */}

            <DashboardAlerts
              alerts={dashboard.alerts}
            />

            {/* Quick Actions */}

            <DashboardQuickActions />

          </motion.div>

        )}

      </div>

    </DashboardLayout>

  );

}