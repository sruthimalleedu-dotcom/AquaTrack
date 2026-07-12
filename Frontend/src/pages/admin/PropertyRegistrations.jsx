import { useEffect, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";
import PropertyRegistrationToolbar from "../../components/admin/PropertyRegistrationToolbar";
import PropertyRegistrationDetailsModal from "../../components/admin/PropertyRegistrationDetailsModal";


import { getAllRegistrations, getRegistrationById } from "../../services/propertyRegistrationService";


export default function AdminRegistrations() {

    // ==========================================
    // State
    // ==========================================

    const [registrations, setRegistrations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [selectedRegistration, setSelectedRegistration] = useState(null);

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // ==========================================
    // Initial Load
    // ==========================================

    useEffect(() => {

        loadRegistrations();

    }, []);

    // ==========================================
    // Fetch Registrations
    // ==========================================

    async function loadRegistrations() {

        try {

            setLoading(true);

            setError("");

            const response = await getAllRegistrations();

            console.log(response);

            setRegistrations(response.data || []);

        } catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "Failed to fetch property registrations."

            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // View Registration Details
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
    // Search + Filter
    // ==========================================

    const filteredRegistrations = registrations.filter((registration) => {

        const matchesSearch =

            registration.companyName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            registration.contactPersonName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            registration.email
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =

            statusFilter === "ALL" ||

            registration.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-6 p-4 md:p-6 xl:p-8">

                {/* ======================================
                    Header
                ====================================== */}

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1
    className="
        text-2xl
        md:text-3xl
        font-bold
        text-slate-900
    "
>
                            Property Registration Requests
                        </h1>

                        <p
    className="
        mt-2
        text-sm
        md:text-base
        text-slate-500
    "
>

                            Review, approve and manage property registration requests.

                        </p>

                    </div>

                    <div
    className="
        w-full
        sm:w-fit

        rounded-xl
        bg-blue-600

        px-5
        py-4

        text-white
        shadow
    "
>

                        <p className="text-sm">

                            Total Requests

                        </p>

                        <h2 className="text-2xl font-bold">

                            {filteredRegistrations.length}

                        </h2>

                    </div>

                </div>

                {/* ======================================
                    Toolbar
                ====================================== */}

                <PropertyRegistrationToolbar

                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}

                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}

                    onRefresh={loadRegistrations}

                />

                {/* ======================================
                    Loading
                ====================================== */}

                {loading && (

                    <div className="rounded-2xl bg-white p-8 shadow">

                        <p className="text-slate-500">

                            Loading registrations...

                        </p>

                    </div>

                )}

                {/* ======================================
                    Error
                ====================================== */}

                {!loading && error && (

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                        <p className="font-medium text-red-600">

                            {error}

                        </p>

                    </div>

                )}

                {/* ======================================
                    Table
                ====================================== */}

                {!loading && !error && (

                    <div
    className="
        overflow-x-auto
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow
    "
>

                        <table
    className="
        w-full
        min-w-[1200px]
    "
>

                            <thead className="bg-slate-100">

                                <tr>

                                    <th className="
    whitespace-nowrap
    px-6
    py-4
    text-left
">Company</th>

                                    <th className="
    whitespace-nowrap
    px-6
    py-4
    text-left
">Contact Person</th>

                                    <th className="
    whitespace-nowrap
    px-6
    py-4
    text-left
">Email</th>

                                    <th className="
    whitespace-nowrap
    px-6
    py-4
    text-left
">Property</th>

                                    <th className="
    whitespace-nowrap
    px-6
    py-4
    text-left
">Apartments</th>

                                    <th className="
    whitespace-nowrap
    px-6
    py-4
    text-left
">City</th>

                                    <th className="
    whitespace-nowrap
    px-6
    py-4
    text-left
">Status</th>

                                    <th className="
    whitespace-nowrap
    px-6
    py-4
    text-left
">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredRegistrations.map((registration) => (

                                    <tr
                                        key={registration.id}
                                        className="border-b hover:bg-slate-50"
                                    >

                                        <td className="
    whitespace-nowrap
    px-6
    py-4
    font-semibold
">

                                            {registration.companyName}

                                        </td>

                                        <td className="
    whitespace-nowrap
    px-6
    py-4
">

                                            {registration.contactPersonName}

                                        </td>

                                        <td className="
    whitespace-nowrap
    px-6
    py-4
">

                                            {registration.email}

                                        </td>

                                        <td className="
    whitespace-nowrap
    px-6
    py-4
">

                                            {registration.propertyType}

                                        </td>

                                        <td className="
    whitespace-nowrap
    px-6
    py-4
">

                                            {registration.numberOfApartments}

                                        </td>

                                        <td className="
    whitespace-nowrap
    px-6
    py-4
">

                                            {registration.city}

                                        </td>

                                        <td className="
    whitespace-nowrap
    px-6
    py-4
">

                                            <span
                                                className={`
    inline-flex
    items-center
    justify-center

    rounded-full

    px-3
    py-1

    text-sm
    font-semibold

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

                                        <td className="
    whitespace-nowrap
    px-6
    py-4
    text-center
">

                                            <button onClick={() =>
    handleViewRegistration(
        registration.id
    )
}
                                                className="
    w-full
    sm:w-auto
    rounded-lg
    bg-blue-600
    px-4
    py-2
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

                )}

            </div>
            <PropertyRegistrationDetailsModal

    open={isDetailsModalOpen}

    registration={selectedRegistration}

    onClose={() => {

        setIsDetailsModalOpen(false);

        setSelectedRegistration(null);

    }}

    onSuccess={loadRegistrations}

/>

        </DashboardLayout>
        

    );

}