import {
    Gauge,
    Hash,
} from "lucide-react";

export default function WaterMeterCard({ household }) {

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* ================================
                Header
            ================================= */}

            <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100">

                    <Gauge
                        size={22}
                        className="text-cyan-600"
                    />

                </div>

                <div>

                    <h2 className="text-lg font-semibold text-gray-900">
                        Water Meter
                    </h2>

                    <p className="text-sm text-gray-500">
                        Meter information assigned to your household.
                    </p>

                </div>

            </div>

            {/* ================================
                Meter Details
            ================================= */}

            <div className="grid grid-cols-1 gap-5">

                <InfoItem
                    icon={<Hash size={18} />}
                    label="Meter Number"
                    value={household?.meterNumber}
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

            <div className="mb-2 flex items-center gap-2 text-cyan-600">

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