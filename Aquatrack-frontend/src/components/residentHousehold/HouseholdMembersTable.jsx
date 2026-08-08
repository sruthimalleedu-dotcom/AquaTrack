import {
    Mail,
    Phone,
    Users,
} from "lucide-react";

export default function HouseholdMembersTable({ members = [] }) {

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

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                        <Users
                            size={22}
                            className="text-green-600"
                        />

                    </div>

                    <div>

                        <h2 className="text-lg font-semibold text-gray-900">
                            Household Members
                        </h2>

                        <p className="text-sm text-gray-500">
                            Residents currently assigned to this household.
                        </p>

                    </div>

                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                    {members.length} Member{members.length !== 1 ? "s" : ""}

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
                                Resident
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Phone
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100 bg-white">

                        {members.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={3}
                                    className="px-6 py-10 text-center text-gray-500"
                                >

                                    No household members found.

                                </td>

                            </tr>

                        ) : (

                            members.map((member) => (

                                <tr
                                    key={member.residentId}
                                    className="hover:bg-gray-50 transition-colors"
                                >

                                    {/* Resident */}

                                    <td className="px-6 py-4">

                                        <div className="font-semibold text-gray-900">

                                            {member.firstName} {member.lastName}

                                        </div>

                                    </td>

                                    {/* Email */}

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2 text-gray-600">

                                            <Mail
                                                size={16}
                                                className="text-blue-500"
                                            />

                                            <span>

                                                {member.email}

                                            </span>

                                        </div>

                                    </td>

                                    {/* Phone */}

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-2 text-gray-600">

                                            <Phone
                                                size={16}
                                                className="text-green-500"
                                            />

                                            <span>

                                                {member.phone || "-"}

                                            </span>

                                        </div>

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