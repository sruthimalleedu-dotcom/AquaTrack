import { useState } from "react";
import { Link } from "react-router-dom";

import PropertyRegistrationDetailsModal from "../admin/PropertyRegistrationDetailsModal";

import {
    getRegistrationById,
} from "../../services/propertyRegistrationService";

export default function RecentRegistrations({

    registrations = [],

}) {

    // ==========================================
    // State
    // ==========================================

    const [selectedRegistration, setSelectedRegistration] = useState(null);

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // ==========================================
    // View Registration
    // ==========================================

    async function handleViewRegistration(id) {

        try {

            const response = await getRegistrationById(id);

            console.log("Registration Details :", response);

            setSelectedRegistration(response.data);

            setIsDetailsModalOpen(true);

        } catch (error) {

            console.error(error);

            alert("Failed to load registration details.");

        }

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <>

            <div
                className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                "
            >

                {/* ======================================
                    Header
                ====================================== */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        px-6
                        py-5
                    "
                >

                    <div>

                        <h2 className="text-xl font-bold">

                            Recent Property Registrations

                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                            Latest registration requests

                        </p>

                    </div>

                    <Link
                        to="/admin/registrations"
                        className="
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >

                        View All

                    </Link>

                </div>

                {/* ======================================
                    Table
                ====================================== */}

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead>

                            <tr
                                className="
                                    border-b
                                    bg-slate-50
                                "
                            >

                                <th className="px-6 py-4 text-left">

                                    Company

                                </th>

                                <th className="px-6 py-4 text-left">

                                    Contact

                                </th>

                                <th className="px-6 py-4 text-left">

                                    City

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

                            {registrations.map((registration) => (

                                <tr
                                    key={registration.id}
                                    className="
                                        border-b
                                        hover:bg-slate-50
                                        transition
                                    "
                                >

                                    <td className="px-6 py-4 font-semibold">

                                        {registration.companyName}

                                    </td>

                                    <td className="px-6 py-4">

                                        {registration.contactPersonName}

                                    </td>

                                    <td className="px-6 py-4">

                                        {registration.city}

                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`
                                                rounded-full
                                                px-3
                                                py-1
                                                text-sm
                                                font-medium

                                                ${
                                                    registration.status === "APPROVED"
                                                        ? "bg-green-100 text-green-700"
                                                        : registration.status === "REJECTED"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }
                                            `}
                                        >

                                            {registration.status}

                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button
                                            onClick={() =>
                                                handleViewRegistration(
                                                    registration.id
                                                )
                                            }
                                            className="
                                                rounded-lg
                                                bg-blue-600
                                                px-4
                                                py-2
                                                text-sm
                                                font-semibold
                                                text-white
                                                transition
                                                hover:bg-blue-700
                                            "
                                        >

                                            View

                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ======================================
                Details Modal
            ====================================== */}

            <PropertyRegistrationDetailsModal

                open={isDetailsModalOpen}

                registration={selectedRegistration}

                onClose={() => {

                    setIsDetailsModalOpen(false);

                    setSelectedRegistration(null);

                }}

            />

        </>

    );

}