import { Eye, Pencil, Trash2 } from "lucide-react";
import waterUsageService from "../../services/waterUsageService";

const WaterUsageTable = ({
    loading,
    waterUsageList,
    onView,
    onEdit,
    refreshData
}) => {

    // ==========================================
    // Delete Reading
    // ==========================================

    const handleDelete = async (reading) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this reading?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await waterUsageService.deleteWaterUsage(
                reading.householdId,
                reading.id
            );

            refreshData();

        } catch (error) {

            console.error(
                "Failed to delete water usage.",
                error
            );

        }

    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="bg-white rounded-xl shadow p-6 text-center">

                Loading water usage...

            </div>

        );

    }

    // ==========================================
    // Empty State
    // ==========================================

    if (waterUsageList.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">

                No water readings found.

            </div>

        );

    }

    // ==========================================
    // Table
    // ==========================================

    return (

        <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="min-w-full divide-y divide-gray-200">

                <thead className="bg-gray-50">

                    <tr>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                            Reading Date
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                            Previous
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                            Current
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                            Usage
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                            Billing Cycle
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                            Uploaded By
                        </th>

                        <th className="px-6 py-3 text-center text-xs font-semibold uppercase">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                    {waterUsageList.map((reading) => (

                        <tr
                            key={reading.id}
                            className="hover:bg-gray-50"
                        >

                            <td className="px-6 py-4">

                                {reading.readingDate}

                            </td>

                            <td className="px-6 py-4">

                                {reading.previousReading}

                            </td>

                            <td className="px-6 py-4">

                                {reading.currentReading}

                            </td>

                            <td className="px-6 py-4 font-semibold text-blue-600">

                                {reading.waterUsage}

                            </td>

                            <td className="px-6 py-4">

                                {reading.billingCycleName}

                            </td>

                            <td className="px-6 py-4">

                                {reading.uploadedByName}

                            </td>

                            <td className="px-6 py-4">

                                <div className="flex justify-center gap-3">

                                    <button
                                        onClick={() => onView(reading)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    <button
                                        onClick={() => onEdit(reading)}
                                        className="text-green-600 hover:text-green-800"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(reading)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default WaterUsageTable;