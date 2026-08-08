import {
    Building2,
    CalendarDays,
    Droplets,
    IndianRupee,
    Gauge,
    Activity,
    Waves,
    AlertTriangle,
    Wallet
} from "lucide-react";

export default function DistributionSummary({ summary }) {

    if (!summary) return null;

    const cards = [

        {
            title: "Purchased Water",
            value: `${Number(summary.purchasedWaterKL).toFixed(2)} KL`,
            icon: <Droplets className="h-6 w-6 text-blue-600" />,
            bg: "bg-blue-50"
        },

        {
            title: "Purchase Cost",
            value: `₹ ${Number(summary.purchaseCost).toFixed(2)}`,
            icon: <IndianRupee className="h-6 w-6 text-green-600" />,
            bg: "bg-green-50"
        },

        {
            title: "Cost / KL",
            value: `₹ ${Number(summary.costPerKL).toFixed(2)}`,
            icon: <Gauge className="h-6 w-6 text-purple-600" />,
            bg: "bg-purple-50"
        },

        {
            title: "Household Usage",
            value: `${Number(summary.householdUsageKL).toFixed(2)} KL`,
            icon: <Activity className="h-6 w-6 text-indigo-600" />,
            bg: "bg-indigo-50"
        },

        {
            title: "Common Area Usage",
            value: `${Number(summary.commonAreaUsageKL).toFixed(2)} KL`,
            icon: <Building2 className="h-6 w-6 text-orange-600" />,
            bg: "bg-orange-50"
        },

        {
            title: "Remaining Water",
            value: `${Number(summary.remainingWaterKL).toFixed(2)} KL`,
            icon: <Waves className="h-6 w-6 text-cyan-600" />,
            bg: "bg-cyan-50"
        },

        {
            title: "Water Loss",
            value: `${Number(summary.waterLossKL).toFixed(2)} KL`,
            icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
            bg: "bg-red-50"
        },

        {
            title: "Water Utilization",
            value: `${Number(summary.waterUtilizationPercentage).toFixed(2)} %`,
            icon: <Droplets className="h-6 w-6 text-sky-600" />,
            bg: "bg-sky-50"
        }

    ];

    return (

        <div className="space-y-6">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                            Building Water Summary

                        </h2>

                        <p className="mt-2 text-gray-500">

                            Water accounting overview for the selected billing cycle.

                        </p>

                    </div>

                    <div className="flex flex-wrap gap-6">

                        <div className="flex items-center gap-2">

                            <Building2 className="h-5 w-5 text-blue-600" />

                            <div>

                                <p className="text-xs text-gray-500">

                                    Building

                                </p>

                                <p className="font-semibold">

                                    {summary.buildingName}

                                </p>

                            </div>

                        </div>

                        <div className="flex items-center gap-2">

                            <CalendarDays className="h-5 w-5 text-green-600" />

                            <div>

                                <p className="text-xs text-gray-500">

                                    Billing Cycle

                                </p>

                                <p className="font-semibold">

                                    {summary.billingCycleName}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ==========================================
                KPI Cards
            ========================================== */}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">

                                    {card.title}

                                </p>

                                <h3 className="mt-2 text-2xl font-bold text-gray-800">

                                    {card.value}

                                </h3>

                            </div>

                            <div
                                className={`rounded-xl p-3 ${card.bg}`}
                            >

                                {card.icon}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* ==========================================
                Recovery Cost
            ========================================== */}

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">

                <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-white p-3">

                        <Wallet className="h-7 w-7 text-emerald-600" />

                    </div>

                    <div>

                        <p className="text-sm text-gray-600">

                            Recovery Cost

                        </p>

                        <h2 className="text-3xl font-bold text-emerald-700">

                            ₹ {Number(summary.recoveryCost).toFixed(2)}

                        </h2>

                    </div>

                </div>

            </div>

        </div>

    );

}