import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import ResidentHeader from "../../components/resident/ResidentHeader";
import ResidentFilterBar from "../../components/resident/ResidentFilterBar";
import ResidentTable from "../../components/resident/ResidentTable";
import CreateResidentModal from "../../components/resident/CreateResidentModal";
import ViewResidentModal from "../../components/resident/ViewResidentModal";
import EditResidentModal from "../../components/resident/EditResidentModal";


import householdService from "../../services/householdService";
import residentService from "../../services/residentService";
import residentInvitationService from "../../services/residentInvitationService";

export default function ResidentList() {

    // ==========================================
    // State
    // ==========================================

    const [search, setSearch] = useState("");

    const [buildingId, setBuildingId] = useState("");
    const [floorId, setFloorId] = useState("");
    const [householdId, setHouseholdId] = useState("");

    const [buildings, setBuildings] = useState([]);
    const [floors, setFloors] = useState([]);
    const [households, setHouseholds] = useState([]);

    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(false);

  
    
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const [selectedResident, setSelectedResident] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // ==========================================
    // Load Buildings
    // ==========================================

    useEffect(() => {

        loadBuildings();

    }, []);

    const loadBuildings = async () => {

        try {

            const data =
                await householdService.getManagerBuildings();

            setBuildings(data);

        } catch (error) {

            console.error("Load Buildings Error:", error);

        }

    };

    // ==========================================
// Load Floors
// ==========================================

useEffect(() => {

    if (!buildingId) {

        setFloors([]);
        setFloorId("");

        setHouseholds([]);
        setHouseholdId("");

        return;

    }

    loadFloors(buildingId);

}, [buildingId]);

const loadFloors = async (buildingId) => {

    try {

        const data =
            await householdService.getManagerFloors(buildingId);

        setFloors(data);

    } catch (error) {

        console.error("Load Floors Error:", error);

    }

};

// ==========================================
// Load Households
// ==========================================

useEffect(() => {

    if (!floorId) {

        setHouseholds([]);
        setHouseholdId("");

        return;

    }

    loadHouseholds(floorId);

}, [floorId]);

const loadHouseholds = async (floorId) => {

    try {

        const data =
            await householdService.getManagerHouseholds();

        const filtered = data.filter(

            household =>

                String(household.floorId) === String(floorId)

        );

        setHouseholds(filtered);

    } catch (error) {

        console.error("Load Households Error:", error);

    }

};

// ==========================================
// Load Residents
// ==========================================

useEffect(() => {

    if (!householdId) {

        setResidents([]);

        return;

    }

    loadResidents(householdId);

}, [householdId]);

const loadResidents = async (householdId) => {

    try {

        setLoading(true);

        const data =
            await residentService.getResidents(householdId);

        setResidents(data);

    } catch (error) {

        console.error("Load Residents Error:", error);

    } finally {

        setLoading(false);

    }

};

    // ==========================================
// Search Filter
// ==========================================

const filteredResidents = useMemo(() => {

    const searchTerm = search.toLowerCase().trim();

    return residents.filter((resident) =>

        `${resident.firstName ?? ""} ${resident.lastName ?? ""}`
            .trim()
            .toLowerCase()
            .includes(searchTerm)

        ||

        resident.email
            ?.toLowerCase()
            .includes(searchTerm)

        ||

        resident.phone
            ?.toLowerCase()
            .includes(searchTerm)

        ||

        resident.houseNumber
            ?.toLowerCase()
            .includes(searchTerm)

        ||

        resident.apartmentName
            ?.toLowerCase()
            .includes(searchTerm)

    );

}, [residents, search]);

    // ==========================================
    // Actions
    // ==========================================

    const handleCreateResident = () => {

    if (!householdId) {

        alert("Please select a household first.");

        return;

    }

    setIsCreateModalOpen(true);

};

// ==========================================
// Submit Resident
// ==========================================

const handleSubmitResident = async (formData) => {

    try {

        // Create Resident
        const resident = await residentService.createResident(
            householdId,
            formData
        );

        // Send Invitation Email
        if (formData.sendInvitation) {

            await residentInvitationService.createResidentInvitation({

                residentId: resident.id

            });

        }

        setIsCreateModalOpen(false);

        await loadResidents(householdId);

        alert(
            formData.sendInvitation
                ? "Resident created and invitation email sent successfully."
                : "Resident created successfully."
        );

    } catch (error) {

        console.error("Create Resident Error:", error);

        alert("Failed to create resident.");

    }

};
// ==========================================
// View Resident
// ==========================================

const handleView = (resident) => {

    setSelectedResident(resident);

    setIsViewModalOpen(true);

};

// ==========================================
// Edit Resident
// ==========================================

const handleEdit = (resident) => {

    setSelectedResident(resident);

    setIsEditModalOpen(true);

};

// ==========================================
// Update Resident
// ==========================================

const handleUpdateResident = async (formData) => {

    try {

        await residentService.updateResident(

            householdId,
            selectedResident.id,
            formData

        );

        setIsEditModalOpen(false);

        setSelectedResident(null);

        await loadResidents(householdId);

    } catch (error) {

        console.error(error);

        alert("Failed to update resident.");

    }

};

// ==========================================
// Suspend Resident
// ==========================================

const handleSuspend = async (resident) => {

    const confirmed = window.confirm(
        `Are you sure you want to suspend ${resident.firstName}?`
    );

    if (!confirmed) return;

    try {

        await residentService.suspendResident(
            householdId,
            resident.id
        );

        await loadResidents(householdId);

    } catch (error) {

        console.error(error);

        alert("Failed to suspend resident.");

    }

};

// ==========================================
// Reactivate Resident
// ==========================================

const handleReactivate = async (resident) => {

    const confirmed = window.confirm(
        `Reactivate ${resident.firstName}?`
    );

    if (!confirmed) return;

    try {

        await residentService.reactivateResident(
            householdId,
            resident.id
        );

        await loadResidents(householdId);

    } catch (error) {

        console.error(error);

        alert("Failed to reactivate resident.");

    }

};
    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <ResidentHeader
                    onCreate={handleCreateResident}
                />

                <ResidentFilterBar

                    search={search}
                    setSearch={setSearch}

                    buildingId={buildingId}
                    setBuildingId={setBuildingId}
                    buildings={buildings}

                    floorId={floorId}
                    setFloorId={setFloorId}
                    floors={floors}

                    householdId={householdId}
                    setHouseholdId={setHouseholdId}
                    households={households}

                />

                <ResidentTable

                    residents={filteredResidents}
                    loading={loading}

                    onView={handleView}
                    onEdit={handleEdit}
                    onSuspend={handleSuspend}
                    onReactivate={handleReactivate}

                />

            </div>

            <CreateResidentModal
    isOpen={isCreateModalOpen}
    onClose={() => setIsCreateModalOpen(false)}
    onSubmit={handleSubmitResident}
/>
<ViewResidentModal
    isOpen={isViewModalOpen}
    onClose={() => {
        setIsViewModalOpen(false);
        setSelectedResident(null);
    }}
    resident={selectedResident}
/>
<EditResidentModal
    isOpen={isEditModalOpen}
    onClose={() => {
        setIsEditModalOpen(false);
        setSelectedResident(null);
    }}
    resident={selectedResident}
    onSubmit={handleUpdateResident}
/>

        </DashboardLayout>

    );

}
