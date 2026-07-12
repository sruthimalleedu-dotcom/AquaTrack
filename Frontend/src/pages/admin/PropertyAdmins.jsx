import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import {
    getAllPropertyAdmins,
    getPropertyAdminById,
} from "../../services/propertyAdminManagementService";

import PropertyAdminDetailsModal from "../../components/admin/PropertyAdminDetailsModal";

import {
    Search,
    RefreshCw,
} from "lucide-react";

export default function PropertyAdmins() {

    // ==========================================
    // State
    // ==========================================

    const [admins, setAdmins] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // ==========================================
    // Initial Load
    // ==========================================

    useEffect(() => {

        loadPropertyAdmins();

    }, []);

    // ==========================================
    // Load Property Admins
    // ==========================================

    async function loadPropertyAdmins() {

        try {

            setLoading(true);

            setError("");

            const response =
                await getAllPropertyAdmins();

            setAdmins(response.data || []);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load property admins."
            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // View Details
    // ==========================================

    async function handleView(id) {

        try {

            const response =
                await getPropertyAdminById(id);

            setSelectedAdmin(response.data);

            setIsModalOpen(true);

        } catch (error) {

            console.error(error);

            alert("Failed to load property admin.");

        }

    }

    // ==========================================
    // Filter
    // ==========================================

    const filteredAdmins = useMemo(() => {

        return admins.filter((admin) => {

            const keyword = search.toLowerCase();

            const matchesSearch =

                admin.firstName.toLowerCase().includes(keyword) ||

                admin.lastName.toLowerCase().includes(keyword) ||

                admin.email.toLowerCase().includes(keyword);

            const matchesStatus =

                statusFilter === "ALL"

                    ? true

                    : statusFilter === "ACTIVE"

                    ? admin.active

                    : !admin.active;

            return matchesSearch && matchesStatus;

        });

    }, [admins, search, statusFilter]);

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8 p-8">

                {/* Header */}

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h1 className="text-5xl font-bold text-slate-900">

                            Property Admins

                        </h1>

                        <p className="mt-2 text-lg text-slate-500">

                            Manage all property administrators.

                        </p>

                    </div>

                    <div className="rounded-xl bg-blue-600 px-8 py-5 text-white shadow">

                        <p>Total Admins</p>

                        <h2 className="text-4xl font-bold">

                            {admins.length}

                        </h2>

                    </div>

                </div>

                {/* Toolbar */}

                <div className="rounded-2xl bg-white p-6 shadow">

                    <div className="flex flex-col gap-4 lg:flex-row">

                        <div className="relative flex-1">

                            <Search
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input

                                value={search}

                                onChange={(e)=>setSearch(e.target.value)}

                                placeholder="Search..."

                                className="w-full rounded-xl border pl-12 pr-4 py-3 outline-none"

                            />

                        </div>

                        <select

                            value={statusFilter}

                            onChange={(e)=>setStatusFilter(e.target.value)}

                            className="rounded-xl border px-4"

                        >

                            <option value="ALL">All Status</option>

                            <option value="ACTIVE">Active</option>

                            <option value="INACTIVE">Suspended</option>

                        </select>

                        <button

                            onClick={loadPropertyAdmins}

                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white"

                        >

                            <RefreshCw size={18}/>

                            Refresh

                        </button>

                    </div>

                </div>

                {/* Table */}

                <div className="overflow-x-auto rounded-2xl bg-white shadow">

                    {loading &&

                        <div className="p-8">

                            Loading...

                        </div>

                    }

                    {error &&

                        <div className="p-8 text-red-600">

                            {error}

                        </div>

                    }

                    {!loading && !error && (

                        <table className="min-w-full">

                            <thead className="bg-slate-50">

                                <tr>

                                    <th className="px-6 py-4 text-left">Name</th>

                                    <th className="px-6 py-4 text-left">Email</th>

                                    <th className="px-6 py-4 text-left">Phone</th>

                                    <th className="px-6 py-4 text-left">Status</th>

                                    <th className="px-6 py-4 text-center">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredAdmins.map((admin)=>(

                                    <tr
                                        key={admin.id}
                                        className="border-b hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-5">

                                            {admin.firstName} {admin.lastName}

                                        </td>

                                        <td className="px-6 py-5">

                                            {admin.email}

                                        </td>

                                        <td className="px-6 py-5">

                                            {admin.phone}

                                        </td>

                                        <td className="px-6 py-5">

                                            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                                admin.active
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>

                                                {admin.active ? "ACTIVE" : "SUSPENDED"}

                                            </span>

                                        </td>

                                        <td className="px-6 py-5 text-center">

                                            <button

                                                onClick={()=>handleView(admin.id)}

                                                className="rounded-lg bg-blue-600 px-4 py-2 text-white"

                                            >

                                                View

                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

            <PropertyAdminDetailsModal

                open={isModalOpen}

                onClose={() => setIsModalOpen(false)}

                admin={selectedAdmin}

                onRefresh={loadPropertyAdmins}

            />

        </DashboardLayout>

    );

}