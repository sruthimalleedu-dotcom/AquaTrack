import {
    Eye,
    Pencil,
    Download
} from "lucide-react";

export default function WaterBillTable({

    bills = [],

    loading,

    onView,

    onStatus,

    onDownload

}) {

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-10 text-center">

                <p className="text-gray-500">

                    Loading water bills...

                </p>

            </div>

        );

    }

    // ==========================================
    // Empty State
    // ==========================================

    if (!bills.length) {

        return (

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-10 text-center">

                <p className="text-gray-500">

                    No water bills found.

                </p>

            </div>

        );

    }

    // ==========================================
    // Badge Color
    // ==========================================

    const getStatusColor = (status) => {

        switch (status) {

            case "PAID":
                return "bg-green-100 text-green-700";

            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "OVERDUE":
                return "bg-red-100 text-red-700";

            case "CANCELLED":
                return "bg-gray-200 text-gray-700";

            default:
                return "bg-gray-100 text-gray-700";

        }

    };

    return (

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow overflow-hidden">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50 dark:bg-slate-800">

                        <tr>

                            <th className="px-5 py-3 text-left text-sm font-semibold">
                                Invoice
                            </th>

                            <th className="px-5 py-3 text-left text-sm font-semibold">
                                Household
                            </th>

                            <th className="px-5 py-3 text-left text-sm font-semibold">
                                Resident
                            </th>

                            <th className="px-5 py-3 text-right text-sm font-semibold">
                                Usage (KL)
                            </th>

                            <th className="px-5 py-3 text-right text-sm font-semibold">
                                Shared Cost
                            </th>

                            <th className="px-5 py-3 text-right text-sm font-semibold">
                                Tariff
                            </th>

                            <th className="px-5 py-3 text-right text-sm font-semibold">
                                Adjustment
                            </th>

                            <th className="px-5 py-3 text-right text-sm font-semibold">
                                Total
                            </th>

                            <th className="px-5 py-3 text-center text-sm font-semibold">
                                Status
                            </th>

                            <th className="px-5 py-3 text-center text-sm font-semibold">
                                Due Date
                            </th>

                            <th className="px-5 py-3 text-center text-sm font-semibold">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            bills.map((bill) => (

                                <tr

                                    key={bill.billId}

                                    className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"

                                >

                                    {/* Invoice */}

                                    <td className="px-5 py-4 font-medium">

                                        {bill.invoiceNumber}

                                    </td>

                                    {/* Household */}

                                    <td className="px-5 py-4">

                                        {bill.householdNumber}

                                    </td>

                                    {/* Resident */}

                                    <td className="px-5 py-4">

                                        {bill.residentName}

                                    </td>

                                    {/* Usage */}

                                    <td className="px-5 py-4 text-right">

                                        {bill.consumptionKL}

                                    </td>

                                    {/* Shared Cost */}

                                    <td className="px-5 py-4 text-right">

                                        ₹ {Number(
                                            bill.sharedWaterCost
                                        ).toFixed(2)}

                                    </td>

                                    {/* Tariff */}

                                    <td className="px-5 py-4 text-right">

                                        ₹ {Number(
                                            bill.tariffCharge
                                        ).toFixed(2)}

                                    </td>

                                    {/* Adjustment */}

                                    <td className="px-5 py-4 text-right">

                                        ₹ {Number(
                                            bill.adjustmentAmount
                                        ).toFixed(2)}

                                    </td>

                                    {/* Total */}

                                    <td className="px-5 py-4 text-right font-semibold">

                                        ₹ {Number(
                                            bill.totalAmount
                                        ).toFixed(2)}

                                    </td>

                                    {/* Status */}

                                    <td className="px-5 py-4 text-center">

                                        <span

                                            className={`
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-semibold
                                                ${getStatusColor(bill.billStatus)}
                                            `}

                                        >

                                            {bill.billStatus}

                                        </span>

                                    </td>

                                    {/* Due Date */}

                                    <td className="px-5 py-4 text-center">

                                        {bill.dueDate}

                                    </td>

                                    {/* Actions */}

                                    <td className="px-5 py-4">

                                        <div className="flex justify-center gap-2">

                                            <button

                                                onClick={() => onView(bill)}

                                                className="p-2 rounded-lg hover:bg-blue-100"

                                            >

                                                <Eye size={18} />

                                            </button>

                                            <button

                                                onClick={() => onStatus(bill)}

                                                className="p-2 rounded-lg hover:bg-yellow-100"

                                            >

                                                <Pencil size={18} />

                                            </button>

                                            <button

                                                onClick={() => onDownload(bill)}

                                                className="p-2 rounded-lg hover:bg-green-100"

                                            >

                                                <Download size={18} />

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}