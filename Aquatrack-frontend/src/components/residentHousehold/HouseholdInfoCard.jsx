import {
    Building2,
    Home,
    Layers3,
    MapPinned,
    CheckCircle,
} from "lucide-react";

export default function HouseholdInfoCard({ household }) {

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* ================================
                Header
            ================================= */}

            <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">

                    <Home
                        size={22}
                        className="text-blue-600"
                    />

                </div>

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Household Information
                    </h2>

                    <p className="text-sm text-gray-500">
                        Basic details of your household.
                    </p>

                </div>

            </div>

            {/* ================================
                Information Grid
            ================================= */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* House Number */}

                <InfoItem
                    icon={<Home size={18} />}
                    label="House Number"
                    value={household?.houseNumber}
                />

                {/* Apartment */}

                <InfoItem
                    icon={<Building2 size={18} />}
                    label="Apartment"
                    value={household?.apartmentName}
                />

                {/* Building */}

                <InfoItem
                    icon={<Building2 size={18} />}
                    label="Building"
                    value={household?.buildingName}
                />

                {/* Floor */}

                <InfoItem
                    icon={<Layers3 size={18} />}
                    label="Floor"
                    value={household?.floorName}
                />

                {/* Status */}

                <InfoItem
                    icon={<CheckCircle size={18} />}
                    label="Status"
                    value={household?.householdStatus}
                />

                {/* Household ID */}

                <InfoItem
                    icon={<MapPinned size={18} />}
                    label="Household ID"
                    value={household?.householdId}
                />

            </div>

        </div>

    );

}

// ==========================================
// Reusable Info Item
// ==========================================

function InfoItem({
    icon,
    label,
    value,
}) {

    return (

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

            <div className="mb-2 flex items-center gap-2 text-blue-600">

                {icon}

                <span className="text-sm font-medium">
                    {label}
                </span>

            </div>

            <p className="text-base font-semibold text-gray-900">

                {value || "-"}

            </p>

        </div>

    );

}