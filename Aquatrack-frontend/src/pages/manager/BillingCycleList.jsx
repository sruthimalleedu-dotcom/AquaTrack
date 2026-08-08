import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
    createBillingCycle,
    updateBillingCycle,
    closeBillingCycle,
    deleteBillingCycle
} from "../../services/billingCycleService";

import DashboardLayout from "../../components/ui/DashboardLayout";



import BillingCycleHeader from "../../components/billingcycle/BillingCycleHeader";
import BillingCycleFilterBar from "../../components/billingcycle/BillingCycleFilterBar";
import BillingCycleTable from "../../components/billingcycle/BillingCycleTable";

import CreateBillingCycleModal from "../../components/billingcycle/CreateBillingCycleModal";
import ViewBillingCycleModal from "../../components/billingcycle/ViewBillingCycleModal";
import EditBillingCycleModal from "../../components/billingcycle/EditBillingCycleModal";
import DeleteBillingCycleModal from "../../components/billingcycle/DeleteBillingCycleModal";

import householdService from "../../services/householdService";

import {
    getBillingCyclesByBuilding
} from "../../services/billingCycleService";

export default function BillingCycleList() {
    const { t } = useTranslation();

    // ==========================================
    // State
    // ==========================================

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [buildingId, setBuildingId] = useState("");

    const [buildings, setBuildings] = useState([]);

    const [billingCycles, setBillingCycles] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedBillingCycle, setSelectedBillingCycle] = useState(null);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

            console.error(
                "Load Buildings Error:",
                error
            );

        }

    };

        // ==========================================
    // Load Billing Cycles
    // ==========================================

    useEffect(() => {

        if (!buildingId) {

            setBillingCycles([]);

            return;

        }

        loadBillingCycles(buildingId);

    }, [buildingId]);

    const loadBillingCycles = async (buildingId) => {

        try {

            setLoading(true);

            const data =
                await getBillingCyclesByBuilding(
                    buildingId
                );

            setBillingCycles(data);

        } catch (error) {

            console.error(
                "Load Billing Cycles Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Search & Status Filter
    // ==========================================

    const filteredBillingCycles = useMemo(() => {

        const searchTerm =
            search.toLowerCase().trim();

        return billingCycles.filter(cycle => {

            const matchesSearch =

                cycle.cycleName
                    ?.toLowerCase()
                    .includes(searchTerm)

                ||

                cycle.buildingName
                    ?.toLowerCase()
                    .includes(searchTerm);

            const matchesStatus =

                !status ||

                cycle.billingStatus === status;

            return (
                matchesSearch &&
                matchesStatus
            );

        });

    }, [
        billingCycles,
        search,
        status
    ]);

        // ==========================================
    // Create Billing Cycle
    // ==========================================

    const handleCreateBillingCycle = () => {

        if (!buildingId) {

            alert(t("manager.billingCycles.alerts.selectBuilding"));

            return;

        }

        setIsCreateModalOpen(true);

    };

    // ==========================================
    // Submit Billing Cycle
    // ==========================================

    const handleSubmitBillingCycle = async (formData) => {

        try {

            await createBillingCycle({

                ...formData,

                buildingId

            });

            setIsCreateModalOpen(false);

            await loadBillingCycles(buildingId);

            alert(t("manager.billingCycles.alerts.created"));

        } catch (error) {

            console.error("Create Billing Cycle Error:", error);

            alert(t("manager.billingCycles.alerts.createFailed"));

        }

    };

    // ==========================================
    // View Billing Cycle
    // ==========================================

    const handleView = (billingCycle) => {

        setSelectedBillingCycle(billingCycle);

        setIsViewModalOpen(true);

    };

    // ==========================================
    // Edit Billing Cycle
    // ==========================================

    const handleEdit = (billingCycle) => {

        setSelectedBillingCycle(billingCycle);

        setIsEditModalOpen(true);

    };

    // ==========================================
    // Update Billing Cycle
    // ==========================================

    const handleUpdateBillingCycle = async (formData) => {

        try {

            await updateBillingCycle(

                selectedBillingCycle.id,

                formData

            );

            setIsEditModalOpen(false);

            setSelectedBillingCycle(null);

            await loadBillingCycles(buildingId);

            alert("Billing cycle updated successfully.");

        } catch (error) {

            console.error("Update Billing Cycle Error:", error);

            alert(t("manager.billingCycles.alerts.updateFailed"));

        }

    };

    // ==========================================
    // Close Billing Cycle
    // ==========================================

    const handleClose = async (billingCycle) => {

        const confirmed = window.confirm(

            `Close billing cycle "${billingCycle.cycleName}"?`

        );

        if (!confirmed) return;

        try {

            await closeBillingCycle(

                billingCycle.id

            );

            await loadBillingCycles(buildingId);

            alert("Billing cycle closed successfully.");

        } catch (error) {

            console.error("Close Billing Cycle Error:", error);

            alert(t("manager.billingCycles.alerts.closeFailed"));

        }

    };
    
        // ==========================================
    // Open Delete Modal
    // ==========================================

    const handleDelete = (billingCycle) => {

        setSelectedBillingCycle(billingCycle);

        setIsDeleteModalOpen(true);

    };

    // ==========================================
    // Confirm Delete Billing Cycle
    // ==========================================

    const handleConfirmDelete = async () => {

        if (!selectedBillingCycle) return;

        try {

            await deleteBillingCycle(
                selectedBillingCycle.id
            );

            setIsDeleteModalOpen(false);

            setSelectedBillingCycle(null);

            await loadBillingCycles(buildingId);

            alert("Billing cycle deleted successfully.");

        } catch (error) {

            console.error(
                "Delete Billing Cycle Error:",
                error
            );

            alert(t("manager.billingCycles.alerts.deleteFailed"));

        }

    };

        // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <BillingCycleHeader
                    onCreate={handleCreateBillingCycle}
                />

                <BillingCycleFilterBar

                    search={search}
                    setSearch={setSearch}

                    status={status}
                    setStatus={setStatus}

                    buildingId={buildingId}
                    setBuildingId={setBuildingId}

                    buildings={buildings}

                />

                <BillingCycleTable

                    billingCycles={filteredBillingCycles}

                    loading={loading}

                    onView={handleView}

                    onEdit={handleEdit}

                    onClose={handleClose}

                    onDelete={handleDelete}

                />

            </div>

            <CreateBillingCycleModal

                isOpen={isCreateModalOpen}

                onClose={() =>

                    setIsCreateModalOpen(false)

                }

                buildingId={buildingId}

                onSubmit={handleSubmitBillingCycle}

            />

            <ViewBillingCycleModal

                isOpen={isViewModalOpen}

                onClose={() => {

                    setIsViewModalOpen(false);

                    setSelectedBillingCycle(null);

                }}

                billingCycle={selectedBillingCycle}

            />

            <EditBillingCycleModal

                isOpen={isEditModalOpen}

                onClose={() => {

                    setIsEditModalOpen(false);

                    setSelectedBillingCycle(null);

                }}

                billingCycle={selectedBillingCycle}

                onSubmit={handleUpdateBillingCycle}

            />

            <DeleteBillingCycleModal

    isOpen={isDeleteModalOpen}

    onClose={() => {

        setIsDeleteModalOpen(false);

        setSelectedBillingCycle(null);

    }}

    billingCycle={selectedBillingCycle}

    onConfirm={handleConfirmDelete}

/>

        </DashboardLayout>

    );

}