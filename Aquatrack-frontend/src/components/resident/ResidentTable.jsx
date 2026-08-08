import {
    Eye,
    Pencil,
    UserX,
    UserCheck
} from "lucide-react";

export default function ResidentTable({

    residents,
    loading,

    onView,
    onEdit,
    onSuspend,
    onReactivate

}) {

    if (loading) {

        return (

            <div className="rounded-xl border bg-white p-10 text-center">

                <p className="text-gray-500">
                    Loading residents...
                </p>

            </div>

        );

    }

    if (!loading && residents.length === 0) {

        return (

            <div className="rounded-xl border border-dashed bg-white p-10 text-center">

                <h3 className="text-lg font-semibold text-gray-700">
                    No Residents Found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    Select a household or create your first resident.
                </p>

            </div>

        );

    }

    return (

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Name
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Phone
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Apartment
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                House No.
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Status
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {residents.map((resident) => (

                            <tr
                                key={resident.id}
                                className="border-t hover:bg-gray-50"
                            >

                                {/* Name */}

                                <td className="px-6 py-4 font-medium">

                                    {`${resident.firstName} ${resident.lastName || ""}`.trim()}

                                </td>

                                {/* Email */}

                                <td className="px-6 py-4">

                                    {resident.email}

                                </td>

                                {/* Phone */}

                                <td className="px-6 py-4">

                                    {resident.phone}

                                </td>

                                {/* Apartment */}

                                <td className="px-6 py-4">

                                    {resident.apartmentName}

                                </td>

                                {/* House Number */}

                                <td className="px-6 py-4">

                                    {resident.houseNumber}

                                </td>

                                {/* Status */}

                                <td className="px-6 py-4">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            resident.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {resident.isActive ? "Active" : "Inactive"}
                                    </span>

                                </td>

                                {/* Actions */}

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onView(resident)}
                                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                            title="View Resident"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            onClick={() => onEdit(resident)}
                                            className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
                                            title="Edit Resident"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        {resident.isActive ? (

                                            <button
                                                onClick={() => onSuspend(resident)}
                                                className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                                title="Suspend Resident"
                                            >
                                                <UserX size={18} />
                                            </button>

                                        ) : (

                                            <button
                                                onClick={() => onReactivate(resident)}
                                                className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                                                title="Reactivate Resident"
                                            >
                                                <UserCheck size={18} />
                                            </button>

                                        )}

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