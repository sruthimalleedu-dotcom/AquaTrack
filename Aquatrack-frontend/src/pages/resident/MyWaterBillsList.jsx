import { useEffect, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import ResidentWaterBillHeader from "../../components/residentWaterBills/ResidentWaterBillHeader";
import ResidentWaterBillSummaryCards from "../../components/residentWaterBills/ResidentWaterBillSummaryCards";
import ResidentWaterBillHistoryTable from "../../components/residentWaterBills/ResidentWaterBillHistoryTable";

import residentWaterBillService from "../../services/residentWaterBillService";

export default function MyWaterBillsList() {

    // ==========================================
    // State
    // ==========================================

    const [waterBills, setWaterBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // Initial Load
    // ==========================================

    useEffect(() => {
        loadWaterBills();
    }, []);

    // ==========================================
    // Load Water Bills
    // ==========================================

    async function loadWaterBills() {

        try {

            setLoading(true);
            setError("");

            const response =
                await residentWaterBillService.getMyWaterBills();

            setWaterBills(response);

        } catch (error) {

            console.error(
                "Failed to load water bills:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load water bills."
            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex items-center justify-center py-20">

                    <div className="text-lg text-gray-500">

                        Loading water bills...

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

                <ResidentWaterBillHeader />

                {error && (

                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                        <p className="text-red-600">

                            {error}

                        </p>

                    </div>

                )}

                {!error && (

                    <>

                        <ResidentWaterBillSummaryCards
                            bills={waterBills}
                        />

                        <ResidentWaterBillHistoryTable
                            bills={waterBills}
                        />

                    </>

                )}

            </div>

        </DashboardLayout>

    );

}