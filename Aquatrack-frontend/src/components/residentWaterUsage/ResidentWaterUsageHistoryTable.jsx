import {
    CalendarDays,
    Droplets,
    Gauge,
    Edit3,
} from "lucide-react";

export default function ResidentWaterUsageHistoryTable({
    waterUsageList = [],
}) {

    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* ================================
                Header
            ================================= */}

            <div className="flex items-center justify-between border-b border-gray-200 p-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100">

                        <Droplets
                            size={22}
                            className="text-cyan-600"
                        />

                    </div>

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">
                            Water Usage History
                        </h2>

                        <p className="text-sm text-gray-500">
                            Complete history of your household water usage.
                        </p>

                    </div>

                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                    {waterUsageList.length} Record{waterUsageList.length !== 1 ? "s" : ""}

                </span>

            </div>

            {/* ================================
                Table
            ================================= */}

            <div className="overflow-x-auto">

                <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Billing Cycle
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Reading Date
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Previous
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Current
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Usage (KL)
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Upload Type
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Remarks
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">

                        {waterUsageList.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="px-6 py-10 text-center text-gray-500"
                                >

                                    No water usage history found.

                                </td>

                            </tr>

                        ) : (

                            waterUsageList.map((usage) => (

                                <tr
                                    key={usage.usageId}
                                    className="transition-colors hover:bg-gray-50"
                                >

                                    {/* Billing Cycle */}

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2">

                                            <CalendarDays
                                                size={16}
                                                className="text-blue-500"
                                            />

                                            <span className="font-medium text-gray-900">

                                                {usage.billingCycle}

                                            </span>

                                        </div>

                                    </td>

                                    {/* Reading Date */}

                                    <td className="px-6 py-4 text-gray-700">

                                        {usage.readingDate}

                                    </td>

                                    {/* Previous Reading */}

                                    <td className="px-6 py-4 text-right font-medium">

                                        {usage.previousReading}

                                    </td>

                                    {/* Current Reading */}

                                    <td className="px-6 py-4 text-right font-medium">

                                        {usage.currentReading}

                                    </td>

                                    {/* Water Usage */}

                                    <td className="px-6 py-4 text-right font-semibold text-cyan-700">

                                        {usage.waterUsage}

                                    </td>

                                    {/* Upload Type */}

                                    <td className="px-6 py-4 text-center">

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                                            {usage.uploadType}

                                        </span>

                                    </td>

                                    {/* Remarks */}

                                    <td className="px-6 py-4 text-gray-600">

                                        {usage.remarks || "-"}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}