import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import FloorHeader from "../../components/floor/FloorHeader";
import ApartmentSelector from "../../components/building/ApartmentSelector";
import BuildingSelector from "../../components/floor/BuildingSelector";
import FloorSearchBar from "../../components/floor/FloorSearchBar";
import FloorTable from "../../components/floor/FloorTable";

import CreateFloorModal from "../../components/floor/CreateFloorModal";
import ViewFloorModal from "../../components/floor/ViewFloorModal";
import EditFloorModal from "../../components/floor/EditFloorModal";
import DeleteFloorModal from "../../components/floor/DeleteFloorModal";

import { getApartments } from "../../services/apartmentService";
import { getBuildings } from "../../services/buildingService";
import { getFloors } from "../../services/floorService";

export default function FloorList() {

    // ==========================================
    // Apartment State
    // ==========================================

    const [apartments, setApartments] = useState([]);
    const [selectedApartment, setSelectedApartment] = useState("");

    // ==========================================
    // Building State
    // ==========================================

    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState("");

    // ==========================================
    // Floor State
    // ==========================================

    const [floors, setFloors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedFloorId, setSelectedFloorId] = useState(null);

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
            setSelectedBuilding("");
            setFloors([]);

        }

    }, [selectedApartment]);

    async function loadBuildings() {

        try {

            const response = await getBuildings(selectedApartment);

            setBuildings(response.data || []);

        } catch (error) {

            console.error("Failed to load buildings:", error);

        }

    }

    // ==========================================
    // Load Floors
    // ==========================================

    useEffect(() => {

        if (selectedBuilding) {

            loadFloors();

        } else {

            setFloors([]);

        }

    }, [selectedBuilding]);

    async function loadFloors() {

        try {

            setLoading(true);
            setError("");

            const response = await getFloors(selectedBuilding);

            setFloors(response.data || []);

        } catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "Failed to load floors."

            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Search Filter
    // ==========================================

    const filteredFloors = useMemo(() => {

        return floors.filter((floor) =>

            floor.floorName

                ?.toLowerCase()

                .includes(search.toLowerCase())

        );

    }, [floors, search]);

        // ==========================================
    // Actions
    // ==========================================

    function handleCreate() {

        if (!selectedBuilding) {

            alert("Please select a building first.");

            return;

        }

        setShowCreateModal(true);

    }

    function handleView(floor) {

        setSelectedFloor(floor);

        setShowViewModal(true);

    }

    function handleEdit(floor) {

        setSelectedFloorId(floor.id);

        setShowEditModal(true);

    }

    function handleDelete(floor) {

        setSelectedFloor(floor);

        setShowDeleteModal(true);

    }

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <FloorHeader
                    onCreate={handleCreate}
                    disabled={!selectedBuilding}
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

                            Choose an apartment to continue.

                        </p>

                    </div>

                ) : (

                    <>

                        <BuildingSelector
                            buildings={buildings}
                            selectedBuilding={selectedBuilding}
                            onChange={setSelectedBuilding}
                        />

                        {!selectedBuilding ? (

                            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

                                <h3 className="text-lg font-semibold text-gray-700">

                                    Select a Building

                                </h3>

                                <p className="mt-2 text-sm text-gray-500">

                                    Choose a building to manage floors.

                                </p>

                            </div>

                        ) : (

                            <>

                                <FloorSearchBar
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

                                {!loading && filteredFloors.length === 0 ? (

                                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

                                        <h3 className="text-lg font-semibold text-gray-700">

                                            No Floors Found

                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">

                                            Create your first floor for this building.

                                        </p>

                                    </div>

                                ) : (

                                    <FloorTable
                                        floors={filteredFloors}
                                        loading={loading}
                                        onView={handleView}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />

                                )}

                            </>

                        )}

                    </>

                )}

            </div>

            <CreateFloorModal
                open={showCreateModal}
                buildingId={selectedBuilding}
                onClose={() => setShowCreateModal(false)}
                onSuccess={loadFloors}
            />

            <ViewFloorModal
                open={showViewModal}
                buildingId={selectedBuilding}
                floor={selectedFloor}
                onClose={() => setShowViewModal(false)}
            />

            <EditFloorModal
                open={showEditModal}
                buildingId={selectedBuilding}
                floorId={selectedFloorId}
                onClose={() => setShowEditModal(false)}
                onSuccess={loadFloors}
            />

            <DeleteFloorModal
                open={showDeleteModal}
                buildingId={selectedBuilding}
                floor={selectedFloor}
                onClose={() => setShowDeleteModal(false)}
                onSuccess={loadFloors}
            />


        </DashboardLayout>

    );

}