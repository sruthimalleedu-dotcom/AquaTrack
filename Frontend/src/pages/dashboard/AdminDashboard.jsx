import { useEffect, useState } from "react";

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

export default function AdminDashboard() {

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

            const summaryResponse =
                await getDashboardSummary();

            const registrationResponse =
                await getRecentRegistrations();

            console.log(
                "Dashboard Summary :",
                summaryResponse
            );

            console.log(
                "Recent Registrations :",
                registrationResponse
            );

            setSummary(summaryResponse.data);

            setRecentRegistrations(
                registrationResponse.data.slice(0, 5)
            );

        } catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

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

            <div className="space-y-8 p-8">

                {/* ======================================
                    Dashboard Header
                ====================================== */}

                <DashboardHeader />

                {/* ======================================
                    Loading
                ====================================== */}

                {loading && (

                    <div className="rounded-2xl bg-white p-8 shadow">

                        <p className="text-slate-500">

                            Loading dashboard...

                        </p>

                    </div>

                )}

                {/* ======================================
                    Error
                ====================================== */}

                {!loading && error && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-200
                            bg-red-50
                            p-6
                        "
                    >

                        <p className="font-medium text-red-600">

                            {error}

                        </p>

                    </div>

                )}

                {/* ======================================
                    Dashboard Content
                ====================================== */}

                {!loading && !error && summary && (

                    <>

                        {/* ==================================
                            Statistics
                        ================================== */}

                        <div
                            className="
                                grid
                                gap-6
                                sm:grid-cols-2
                                xl:grid-cols-4
                            "
                        >

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

                        {/* ==================================
                            Quick Actions
                        ================================== */}

                        <QuickActions />

                        {/* ==================================
                            Recent Registrations
                        ================================== */}

                        <RecentRegistrations
                            registrations={
                                recentRegistrations
                            }
                        />

                        <PropertyAdminOverview
                            summary={summary}
                        />

                    </>

                )}

            </div>

        </DashboardLayout>

    );

}