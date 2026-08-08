import {

    Eye,
    Pencil,
    Lock,
    Trash2

} from "lucide-react";

export default function BillingCycleTable({

    billingCycles,

    loading,

    onView,

    onEdit,

    onClose,

    onDelete

}) {

    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-10 text-center shadow">

                Loading billing cycles...

            </div>

        );

    }

    if (!billingCycles.length) {

        return (

            <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow">

                No billing cycles found.

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

                                Cycle Name

                            </th>

                            <th className="px-6 py-4 text-left">

                                Building

                            </th>

                            <th className="px-6 py-4 text-left">

                                Start Date

                            </th>

                            <th className="px-6 py-4 text-left">

                                End Date

                            </th>

                            <th className="px-6 py-4 text-left">

                                Due Date

                            </th>

                            <th className="px-6 py-4 text-left">

                                Status

                            </th>

                            <th className="px-6 py-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {billingCycles.map((cycle) => (

                            <tr

                                key={cycle.id}

                                className="border-t"

                            >

                                <td className="px-6 py-4 font-medium">

                                    {cycle.cycleName}

                                </td>

                                <td className="px-6 py-4">

                                    {cycle.buildingName}

                                </td>

                                <td className="px-6 py-4">

                                    {cycle.startDate}

                                </td>

                                <td className="px-6 py-4">

                                    {cycle.endDate}

                                </td>

                                <td className="px-6 py-4">

                                    {cycle.dueDate}

                                </td>

                                <td className="px-6 py-4">

                                    <span

                                        className={`rounded-full px-3 py-1 text-xs font-semibold

                                        ${cycle.billingStatus === "OPEN"

                                            ? "bg-green-100 text-green-700"

                                            : "bg-gray-200 text-gray-700"

                                        }`}

                                    >

                                        {cycle.billingStatus}

                                    </span>

                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button

                                            onClick={() =>

                                                onView(cycle)

                                            }

                                            className="rounded-lg p-2 hover:bg-blue-100"

                                        >

                                            <Eye size={18} />

                                        </button>

                                        <button

                                            onClick={() =>

                                                onEdit(cycle)

                                            }

                                            className="rounded-lg p-2 hover:bg-yellow-100"

                                        >

                                            <Pencil size={18} />

                                        </button>

                                        {

                                            cycle.billingStatus === "OPEN" && (

                                                <button

                                                    onClick={() =>

                                                        onClose(cycle)

                                                    }

                                                    className="rounded-lg p-2 hover:bg-orange-100"

                                                >

                                                    <Lock size={18} />

                                                </button>

                                            )

                                        }

                                        <button

                                            onClick={() =>

                                                onDelete(cycle)

                                            }

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