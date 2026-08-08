import {
    CalendarDays,
    Droplets,
    Gauge,
    Activity,
} from "lucide-react";

export default function ResidentWaterUsageSummaryCards({
    latestUsage,
}) {

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
                title="Total Usage"
                value={`${latestUsage?.waterUsage ?? "-"} KL`}
                icon={<Droplets size={22} />}
                iconBg="bg-cyan-100"
                iconColor="text-cyan-600"
            />

            <SummaryCard
                title="Current Reading"
                value={latestUsage?.currentReading ?? "-"}
                icon={<Gauge size={22} />}
                iconBg="bg-green-100"
                iconColor="text-green-600"
            />

            <SummaryCard
                title="Previous Reading"
                value={latestUsage?.previousReading ?? "-"}
                icon={<Activity size={22} />}
                iconBg="bg-yellow-100"
                iconColor="text-yellow-600"
            />

            <SummaryCard
                title="Billing Cycle"
                value={latestUsage?.billingCycle ?? "-"}
                icon={<CalendarDays size={22} />}
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
            />

        </div>

    );

}

// ==========================================
// Summary Card
// ==========================================

function SummaryCard({
    title,
    value,
    icon,
    iconBg,
    iconColor,
}) {

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-gray-500">

                        {title}

                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-gray-900">

                        {value}

                    </h3>

                </div>

                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
                >

                    <div className={iconColor}>

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}