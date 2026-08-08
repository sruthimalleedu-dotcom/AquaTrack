import {

    Eye,
    Pencil,
    Trash2

} from "lucide-react";

export default function BulkWaterPurchaseTable({

    purchases,

    loading,

    onView,

    onEdit,

    onDelete

}) {

    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-10 text-center shadow">

                Loading bulk water purchases...

            </div>

        );

    }

    if (!purchases.length) {

        return (

            <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow">

                No bulk water purchases found.

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Purchase Date
                            </th>

                            <th className="px-6 py-4 text-left">
                                Building
                            </th>

                            <th className="px-6 py-4 text-left">
                                Supplier
                            </th>

                            <th className="px-6 py-4 text-left">
                                Source
                            </th>

                            <th className="px-6 py-4 text-left">
                                Volume (KL)
                            </th>

                            <th className="px-6 py-4 text-left">
                                Unit Cost
                            </th>

                            <th className="px-6 py-4 text-left">
                                Total Cost
                            </th>

                            <th className="px-6 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {purchases.map((purchase) => (

                            <tr
                                key={purchase.id}
                                className="border-t"
                            >

                                <td className="px-6 py-4">

                                    {purchase.purchaseDate}

                                </td>

                                <td className="px-6 py-4">

                                    {purchase.buildingName}

                                </td>

                                <td className="px-6 py-4 font-medium">

                                    {purchase.supplierName}

                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                                    >

                                        {purchase.source}

                                    </span>

                                </td>

                                <td className="px-6 py-4">

                                    {purchase.volumeKL}

                                </td>

                                <td className="px-6 py-4">

                                    ₹ {purchase.unitCost}

                                </td>

                                <td className="px-6 py-4 font-semibold text-green-700">

                                    ₹ {purchase.totalCost}

                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onView(purchase)}
                                            className="rounded-lg p-2 hover:bg-blue-100"
                                        >

                                            <Eye size={18} />

                                        </button>

                                        <button
                                            onClick={() => onEdit(purchase)}
                                            className="rounded-lg p-2 hover:bg-yellow-100"
                                        >

                                            <Pencil size={18} />

                                        </button>

                                        <button
                                            onClick={() => onDelete(purchase)}
                                            className="rounded-lg p-2 hover:bg-red-100"
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

        </div>

    );

}