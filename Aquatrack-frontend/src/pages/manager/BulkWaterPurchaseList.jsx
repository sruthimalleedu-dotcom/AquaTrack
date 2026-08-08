import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import BulkWaterPurchaseHeader from "../../components/bulkWaterPurchase/BulkWaterPurchaseHeader";
import BulkWaterPurchaseFilterBar from "../../components/bulkWaterPurchase/BulkWaterPurchaseFilterBar";
import BulkWaterPurchaseTable from "../../components/bulkWaterPurchase/BulkWaterPurchaseTable";
import AddPurchaseModal from "../../components/bulkWaterPurchase/AddPurchaseModal";
import ViewPurchaseModal from "../../components/bulkWaterPurchase/ViewPurchaseModal";
import EditPurchaseModal from "../../components/bulkWaterPurchase/EditPurchaseModal";
import DeletePurchaseModal from "../../components/bulkWaterPurchase/DeletePurchaseModal";

import bulkWaterPurchaseService from "../../services/bulkWaterPurchaseService";
import householdService from "../../services/householdService";
import { getAllBillingCycles } from "../../services/billingCycleService";

export default function BulkWaterPurchaseList() {

    // ==========================================
    // State
    // ==========================================

    const [search, setSearch] = useState("");

    const [purchases, setPurchases] = useState([]);

    const [loading, setLoading] = useState(false);

    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [buildingId, setBuildingId] = useState("");

    const [source, setSource] = useState("");

    const [buildings, setBuildings] = useState([]);
    const [billingCycles, setBillingCycles] = useState([]);

    // ==========================================
    // Load Purchases
    // ==========================================

    useEffect(() => {

        loadPurchases();

    }, []);

    const loadPurchases = async () => {

        try {

            setLoading(true);

            const data =
                await bulkWaterPurchaseService.getAllBulkWaterPurchases();

            setPurchases(data);

        } catch (error) {

            console.error("Load Purchases Error:", error);

        } finally {

            setLoading(false);

        }

    };

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

    useEffect(() => {

        loadBillingCycles();

    }, []);

    const loadBillingCycles = async () => {

        try {

            const data = await getAllBillingCycles();

            setBillingCycles(data);

        } catch (error) {

            console.error("Load Billing Cycles Error:", error);

        }

    };

    // ==========================================
    // Search Filter
    // ==========================================

    const filteredPurchases = useMemo(() => {

        const keyword = search.toLowerCase().trim();

        return purchases.filter((purchase) =>

            purchase.supplierName
                ?.toLowerCase()
                .includes(keyword)

            ||

            purchase.invoiceNumber
                ?.toLowerCase()
                .includes(keyword)

            ||

            purchase.source
                ?.toLowerCase()
                .includes(keyword)

            ||

            purchase.buildingName
                ?.toLowerCase()
                .includes(keyword)

        );

    }, [purchases, search]);

    // ==========================================
    // Actions
    // ==========================================

    const handleCreate = () => {

        setIsAddModalOpen(true);

    };

    const handleSubmit = async (formData) => {

        try {

            await bulkWaterPurchaseService
                .createBulkWaterPurchase(formData);

            setIsAddModalOpen(false);

            await loadPurchases();

        } catch (error) {

            console.error(error);

            alert("Failed to create purchase.");

        }

    };

    const handleView = (purchase) => {

        setSelectedPurchase(purchase);

        setIsViewModalOpen(true);

    };

    const handleEdit = (purchase) => {

        setSelectedPurchase(purchase);

        setIsEditModalOpen(true);

    };

    const handleUpdate = async (formData) => {

        const purchaseId = formData.id || selectedPurchase?.id;

        if (!purchaseId) {
            console.error("No purchase id available for update.");
            return;
        }

        try {

            await bulkWaterPurchaseService.updateBulkWaterPurchase(

                purchaseId,

                formData

            );

            setIsEditModalOpen(false);

            setSelectedPurchase(null);

            await loadPurchases();

        } catch (error) {

            console.error(error);

            alert("Failed to update purchase.");

        }

    };

    const handleDelete = async (purchase) => {

        const confirmed = window.confirm(

            `Delete purchase from ${purchase.supplierName}?`

        );

        if (!confirmed) return;

        try {

            await bulkWaterPurchaseService
                .deleteBulkWaterPurchase(purchase.id);

            await loadPurchases();

        } catch (error) {

            console.error(error);

            alert("Failed to delete purchase.");

        }

    };

    const handleConfirmDelete = async () => {

    try {

        await bulkWaterPurchaseService.deleteBulkWaterPurchase(
            selectedPurchase.id
        );

        setShowDeleteModal(false);
        setSelectedPurchase(null);

        loadPurchases();

    } catch (error) {

        console.error(error);
        alert("Failed to delete purchase.");

    }

};

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <BulkWaterPurchaseHeader
                    onCreate={handleCreate}
                />

                <BulkWaterPurchaseFilterBar
                    search={search}
                    setSearch={setSearch}
                    buildingId={buildingId}
                    setBuildingId={setBuildingId}
                    buildings={buildings}
                    source={source}
                    setSource={setSource}
                />

                <BulkWaterPurchaseTable

                    purchases={filteredPurchases}

                    loading={loading}

                    onView={handleView}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            </div>

            <AddPurchaseModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleSubmit}
                buildings={buildings}
                billingCycles={billingCycles}
            />

            <ViewPurchaseModal

                isOpen={isViewModalOpen}

                purchase={selectedPurchase}

                onClose={() => {

                    setIsViewModalOpen(false);

                    setSelectedPurchase(null);

                }}

            />

            <EditPurchaseModal
                isOpen={isEditModalOpen}
                purchase={selectedPurchase}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedPurchase(null);
                }}
                onSubmit={handleUpdate}
                buildings={buildings}
                billingCycles={billingCycles}

            />

            <DeletePurchaseModal
    isOpen={showDeleteModal}
    onClose={() => setShowDeleteModal(false)}
    purchase={selectedPurchase}
    onConfirm={handleConfirmDelete}
/>

        </DashboardLayout>

    );

}