import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import HouseholdHeader from "../../components/household/HouseholdHeader";
import HouseholdSearchBar from "../../components/household/HouseholdSearchBar";
import HouseholdTable from "../../components/household/HouseholdTable";

import CreateHouseholdModal from "../../components/household/CreateHouseholdModal";
import ViewHouseholdModal from "../../components/household/ViewHouseholdModal";
import EditHouseholdModal from "../../components/household/EditHouseholdModal";
import DeleteHouseholdModal from "../../components/household/DeleteHouseholdModal";

import householdService from "../../services/householdService";

export default function HouseholdList() {

    // ==========================================
    // State
    // ==========================================

    const [households, setHouseholds] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

  
    const [selectedHousehold, setSelectedHousehold] = useState(null);

        const closeViewModal = () => {

    setShowViewModal(false);

    setSelectedHousehold(null);

};

const closeEditModal = () => {

    setShowEditModal(false);

    setSelectedHousehold(null);

};

const closeDeleteModal = () => {

    setShowDeleteModal(false);

    setSelectedHousehold(null);

};

    // ==========================================
    // Initial Load
    // ==========================================

    useEffect(() => {
        loadHouseholds();
    }, []);

    // ==========================================
    // Load Households
    // ==========================================

   async function loadHouseholds() {

    try {

        setLoading(true);
        setError("");

        const households =
            await householdService.getManagerHouseholds();

        setHouseholds(households);

    } catch (error) {

        console.error("Failed to load households:", error);

        setError(
            error.response?.data?.message ||
            "Failed to load households."
        );

    } finally {

        setLoading(false);

    }

}
    // ==========================================
    // Search Filter
    // ==========================================

    const filteredHouseholds = useMemo(() => {

        return households.filter((household) =>

            household.houseNumber
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            household.meterNumber
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            household.apartmentName
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            household.buildingName
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            household.floorName
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [households, search]);

    // ==========================================
    // Actions
    // ==========================================

    function handleCreateHousehold() {
        setShowCreateModal(true);
    }

    function handleView(household) {

    setSelectedHousehold(household);

    setShowViewModal(true);

}

function handleEdit(household) {

    setSelectedHousehold(household);

    setShowEditModal(true);

}

function handleDelete(household) {

    setSelectedHousehold(household);

    setShowDeleteModal(true);

}

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <HouseholdHeader
                    onCreate={handleCreateHousehold}
                />

                <HouseholdSearchBar
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

                {!loading && filteredHouseholds.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

                        <h3 className="text-lg font-semibold text-gray-700">
                            No Households Found
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Create your first household to get started.
                        </p>

                    </div>

                ) : (

                    <HouseholdTable
                        households={filteredHouseholds}
                        loading={loading}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                )}

                <CreateHouseholdModal
    open={showCreateModal}
    onClose={() => setShowCreateModal(false)}
    onSuccess={loadHouseholds}
/>

            </div>

            <ViewHouseholdModal
    open={showViewModal}
    household={selectedHousehold}
    onClose={closeViewModal}
/>

<EditHouseholdModal
    open={showEditModal}
    household={selectedHousehold}
    onClose={closeEditModal}
    onSuccess={loadHouseholds}
/>

<DeleteHouseholdModal
    open={showDeleteModal}
    household={selectedHousehold}
    onClose={closeDeleteModal}
    onSuccess={loadHouseholds}
/>

        </DashboardLayout>

    );

}