import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import BuildingHeader from "../../components/building/BuildingHeader";
import ApartmentSelector from "../../components/building/ApartmentSelector";
import BuildingSearchBar from "../../components/building/BuildingSearchBar";
import BuildingTable from "../../components/building/BuildingTable";
import CreateBuildingModal from "../../components/building/CreateBuildingModal";
import ViewBuildingModal from "../../components/building/ViewBuildingModal";
import EditBuildingModal from "../../components/building/EditBuildingModal";
import DeleteBuildingModal from "../../components/building/DeleteBuildingModal";

import { getApartments } from "../../services/apartmentService";
import { getBuildings } from "../../services/buildingService";

export default function BuildingList() {

    // ==========================================
    // Apartment State
    // ==========================================

    const [apartments, setApartments] = useState([]);
    const [selectedApartment, setSelectedApartment] = useState("");

    // ==========================================
    // Building State
    // ==========================================

    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [selectedBuildingId, setSelectedBuildingId] = useState(null);

    // ==========================================
    // Modal State
    // ==========================================

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

            const response = await getApartments();

            setApartments(response.data || []);

        } catch (error) {

            console.error("Failed to load apartments:", error);

        }

    }

    // ==========================================
    // Load Buildings
    // ==========================================

    useEffect(() => {

        if (selectedApartment) {

            loadBuildings();

        } else {

            setBuildings([]);

        }

    }, [selectedApartment]);

    async function loadBuildings() {

        try {

            setLoading(true);
            setError("");

            const response = await getBuildings(selectedApartment);

            setBuildings(response.data || []);

        } catch (error) {

            console.error("Failed to load buildings:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load buildings."
            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Search Filter
    // ==========================================

    const filteredBuildings = useMemo(() => {

        return buildings.filter((building) =>
            building.buildingName
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [buildings, search]);

    // ==========================================
    // Actions
    // ==========================================

    function handleCreate() {

        if (!selectedApartment) {

            alert("Please select an apartment first.");

            return;

        }

        setShowCreateModal(true);

    }

    function handleView(building) {

        setSelectedBuilding(building);
        setShowViewModal(true);

    }

    function handleEdit(building) {

        setSelectedBuildingId(building.id);
        setShowEditModal(true);

    }

    function handleDelete(building) {

        setSelectedBuilding(building);
        setShowDeleteModal(true);

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <BuildingHeader
                    onCreate={handleCreate}
                    disabled={!selectedApartment}
                />

                <ApartmentSelector
                    apartments={apartments}
                    selectedApartment={selectedApartment}
                    onChange={setSelectedApartment}
                />

                {!selectedApartment ? (

                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

                        <h3 className="text-lg font-semibold text-gray-700">
                            Select an Apartment
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Choose an apartment to manage its buildings.
                        </p>

                    </div>

                ) : (

                    <>

                        <BuildingSearchBar
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

                        {!loading && filteredBuildings.length === 0 ? (

                            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

                                <h3 className="text-lg font-semibold text-gray-700">
                                    No Buildings Found
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Create your first building for this apartment.
                                </p>

                            </div>

                        ) : (

                            <BuildingTable
                                buildings={filteredBuildings}
                                loading={loading}
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />

                        )}

                    </>

                )}

            </div>

            <CreateBuildingModal
                open={showCreateModal}
                apartmentId={selectedApartment}
                onClose={() => setShowCreateModal(false)}
                onSuccess={loadBuildings}
            />

            <ViewBuildingModal
                open={showViewModal}
                building={selectedBuilding}
                onClose={() => setShowViewModal(false)}
            />

            <EditBuildingModal
                open={showEditModal}
                apartmentId={selectedApartment}
                buildingId={selectedBuildingId}
                onClose={() => setShowEditModal(false)}
                onSuccess={loadBuildings}
            />

            <DeleteBuildingModal
                open={showDeleteModal}
                apartmentId={selectedApartment}
                building={selectedBuilding}
                onClose={() => setShowDeleteModal(false)}
                onSuccess={loadBuildings}
            />

        </DashboardLayout>

    );

}