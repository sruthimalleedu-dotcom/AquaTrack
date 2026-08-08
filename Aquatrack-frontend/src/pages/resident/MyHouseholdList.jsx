import { useEffect, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import MyHouseholdHeader from "../../components/residentHousehold/MyHouseholdHeader";
import HouseholdInfoCard from "../../components/residentHousehold/HouseholdInfoCard";
import WaterMeterCard from "../../components/residentHousehold/WaterMeterCard";
import HouseholdMembersTable from "../../components/residentHousehold/HouseholdMembersTable";

import residentHouseholdService from "../../services/residentHouseholdService";

export default function MyHouseholdList() {

    // ==========================================
    // State
    // ==========================================

    const [household, setHousehold] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // Initial Load
    // ==========================================

    useEffect(() => {
        loadHousehold();
    }, []);

    // ==========================================
    // Load Household
    // ==========================================

    async function loadHousehold() {

        try {

            setLoading(true);
            setError("");

            const response =
                await residentHouseholdService.getMyHousehold();

            setHousehold(response);

        } catch (error) {

            console.error("Failed to load household:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load household information."
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

                    <div className="text-gray-500 text-lg">
                        Loading household information...
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

                <MyHouseholdHeader />

                {error && (

                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">

                        <p className="text-red-600">

                            {error}

                        </p>

                    </div>

                )}

                {!error && household && (

                    <>

                        <HouseholdInfoCard
                            household={household}
                        />

                        <WaterMeterCard
                            household={household}
                        />

                        <HouseholdMembersTable
                            members={household.members}
                        />

                    </>

                )}

            </div>

        </DashboardLayout>

    );

}