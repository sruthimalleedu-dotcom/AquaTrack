import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import householdService from "../../services/householdService";
import waterUsageService from "../../services/waterUsageService";

import WaterUsageHeader from "../../components/waterUsage/WaterUsageHeader";
import WaterUsageFilterBar from "../../components/waterUsage/WaterUsageFilterBar";
import WaterUsageTable from "../../components/waterUsage/WaterUsageTable";

import AddReadingModal from "../../components/waterUsage/AddReadingModal";
import EditReadingModal from "../../components/waterUsage/EditReadingModal";
import ViewReadingModal from "../../components/waterUsage/ViewReadingModal";

const WaterUsageList = () => {

    // ==========================================
    // Filter State
    // ==========================================

    const [search, setSearch] = useState("");

    const [sortOrder, setSortOrder] = useState("latest");

    const [buildingId, setBuildingId] = useState("");

    const [floorId, setFloorId] = useState("");

    const [householdId, setHouseholdId] = useState("");

    // ==========================================
    // Dropdown Data
    // ==========================================

    const [buildings, setBuildings] = useState([]);

    const [floors, setFloors] = useState([]);

    const [households, setHouseholds] = useState([]);

    // ==========================================
    // Water Usage State
    // ==========================================

    const [waterUsageList, setWaterUsageList] = useState([]);

    const [loading, setLoading] = useState(false);

    // ==========================================
    // Modal State
    // ==========================================

    const [selectedReading, setSelectedReading] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [showViewModal, setShowViewModal] = useState(false);

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
                await householdService.getHouseholdsByFloor(floorId);

            setHouseholds(Array.isArray(data) ? data : []);

        } catch (error) {

            console.error("Load Households Error:", error);

        }

    };

    // ==========================================
    // Load Water Usage
    // ==========================================

    useEffect(() => {

        if (!householdId) {

            setWaterUsageList([]);

            return;

        }

        loadWaterUsage(householdId);

    }, [householdId]);

    const loadWaterUsage = async (householdId) => {

        try {

            setLoading(true);

            const data =
                await waterUsageService.getAllWaterUsage(householdId);

            setWaterUsageList(data);

        } catch (error) {

            console.error("Load Water Usage Error:", error);

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Search + Sort
    // ==========================================

    const filteredWaterUsage = useMemo(() => {

        const keyword = search.toLowerCase().trim();

        const list = Array.isArray(waterUsageList)
            ? waterUsageList
            : [];

        return list

            .filter((reading) =>

                reading.readingDate
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                reading.remarks
                    ?.toLowerCase()
                    .includes(keyword)

            )

            .sort((a, b) =>

                sortOrder === "latest"

                    ? new Date(b.readingDate) - new Date(a.readingDate)

                    : new Date(a.readingDate) - new Date(b.readingDate)

            );

    }, [waterUsageList, search, sortOrder]);

    // ==========================================
    // Actions
    // ==========================================

    const handleView = (reading) => {

        setSelectedReading(reading);

        setShowViewModal(true);

    };

    const handleEdit = (reading) => {

        setSelectedReading(reading);

        setShowEditModal(true);

    };

    const handleAdd = () => {

        if (!householdId) {

            alert("Please select a household first.");

            return;

        }

        setShowAddModal(true);

    };

    return (

    <DashboardLayout>

        <div className="space-y-8">

            <WaterUsageHeader
                onAdd={handleAdd}
            />

            <WaterUsageFilterBar

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

                sortOrder={sortOrder}
                setSortOrder={setSortOrder}

            />

            <WaterUsageTable

                loading={loading}
                householdId={householdId}
                waterUsageList={filteredWaterUsage}

                onView={handleView}
                onEdit={handleEdit}

                refreshData={() => loadWaterUsage(householdId)}

            />

            <AddReadingModal

                open={showAddModal}
                householdId={householdId}

                onClose={() => setShowAddModal(false)}

                onSuccess={() => loadWaterUsage(householdId)}

            />

            <EditReadingModal

                open={showEditModal}
                householdId={householdId}
                reading={selectedReading}

                onClose={() => {
                    setShowEditModal(false);
                    setSelectedReading(null);
                }}

                onSuccess={() => loadWaterUsage(householdId)}

            />

            <ViewReadingModal

                open={showViewModal}
                reading={selectedReading}

                onClose={() => {
                    setShowViewModal(false);
                    setSelectedReading(null);
                }}

            />

        </div>

    </DashboardLayout>

);

};

export default WaterUsageList;