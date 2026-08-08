import { useEffect, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import ResidentWaterUsageHeader from "../../components/residentWaterUsage/ResidentWaterUsageHeader";
import ResidentWaterUsageSummaryCards from "../../components/residentWaterUsage/ResidentWaterUsageSummaryCards";
import ResidentWaterUsageHistoryTable from "../../components/residentWaterUsage/ResidentWaterUsageHistoryTable";

import residentWaterUsageService from "../../services/residentWaterUsageService";

export default function MyWaterUsageList() {

    // ==========================================
    // State
    // ==========================================

    const [waterUsageList, setWaterUsageList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // Initial Load
    // ==========================================

    useEffect(() => {
        loadWaterUsage();
    }, []);

    // ==========================================
    // Load Water Usage
    // ==========================================

    async function loadWaterUsage() {

        try {

            setLoading(true);
            setError("");

            const response =
                await residentWaterUsageService.getMyWaterUsage();

            setWaterUsageList(response);

        } catch (error) {

            console.error(
                "Failed to load water usage:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load water usage."
            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Latest Usage
    // ==========================================

    const latestUsage =
        waterUsageList.length > 0
            ? waterUsageList[0]
            : null;

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex items-center justify-center py-20">

                    <div className="text-lg text-gray-500">

                        Loading water usage...

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <ResidentWaterUsageHeader />

                {error && (

                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                        <p className="text-red-600">

                            {error}

                        </p>

                    </div>

                )}

                {!error && (

                    <>

                        <ResidentWaterUsageSummaryCards
                            latestUsage={latestUsage}
                        />

                        <ResidentWaterUsageHistoryTable
                            waterUsageList={waterUsageList}
                        />

                    </>

                )}

            </div>

        </DashboardLayout>

    );

}