import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import ApartmentHeader from "../../components/apartment/ApartmentHeader";
import ApartmentSearchBar from "../../components/apartment/ApartmentSearchBar";
import ApartmentTable from "../../components/apartment/ApartmentTable";
import CreateApartmentModal from "../../components/apartment/CreateApartmentModal";
import ViewApartmentModal from "../../components/apartment/ViewApartmentModal";
import EditApartmentModal from "../../components/apartment/EditApartmentModal";
import DeleteApartmentModal from "../../components/apartment/DeleteApartmentModal";

import { getApartments } from "../../services/apartmentService";

export default function ApartmentList() {

    // ==========================================
    // State
    // ==========================================

    const [apartments, setApartments] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedApartmentId, setSelectedApartmentId] = useState(null);
    const [selectedApartment, setSelectedApartment] = useState(null);

    // ==========================================
    // Initial Load
    // ==========================================

    useEffect(() => {
        loadApartments();
    }, []);

    // ==========================================
    // Load Apartments
    // ==========================================

    async function loadApartments() {

        try {

            setLoading(true);
            setError("");

            const response = await getApartments();

            setApartments(response.data || []);

        } catch (error) {

            console.error("Failed to load apartments:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load apartments."
            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Search Filter
    // ==========================================

    const filteredApartments = useMemo(() => {

        return apartments.filter((apartment) =>
            apartment.apartmentName
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [apartments, search]);

    // ==========================================
    // Actions
    // ==========================================

    function handleCreateApartment() {
        setShowCreateModal(true);
    }

    function handleView(apartment) {
        setSelectedApartmentId(apartment.id);
        setShowViewModal(true);
    }

    function handleEdit(apartment) {
        setSelectedApartmentId(apartment.id);
        setShowEditModal(true);
    }

    function handleDelete(apartment) {
        setSelectedApartment(apartment);
        setShowDeleteModal(true);
    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <ApartmentHeader
                    onCreate={handleCreateApartment}
                />

                <ApartmentSearchBar
                    search={search}
                    setSearch={setSearch}
                />

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                        <p className="text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                {!loading && filteredApartments.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

                        <h3 className="text-lg font-semibold text-gray-700">
                            No Apartments Found
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Create your first apartment to get started.
                        </p>

                    </div>

                ) : (

                    <ApartmentTable
                        apartments={filteredApartments}
                        loading={loading}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                )}

                <CreateApartmentModal
                    open={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={loadApartments}
                />

            </div>

            <ViewApartmentModal
                open={showViewModal}
                apartmentId={selectedApartmentId}
                onClose={() => setShowViewModal(false)}
            />

            <EditApartmentModal
                open={showEditModal}
                apartmentId={selectedApartmentId}
                onClose={() => setShowEditModal(false)}
                onSuccess={loadApartments}
            />

            <DeleteApartmentModal
                open={showDeleteModal}
                apartment={selectedApartment}
                onClose={() => setShowDeleteModal(false)}
                onSuccess={loadApartments}
            />

        </DashboardLayout>

    );

}