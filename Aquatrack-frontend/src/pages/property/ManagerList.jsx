import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../../components/ui/DashboardLayout";

import ManagerHeader from "../../components/manager/ManagerHeader";
import ManagerStats from "../../components/manager/ManagerStats";
import ManagerSearchBar from "../../components/manager/ManagerSearchBar";
import ManagerTable from "../../components/manager/ManagerTable";
import InviteManagerModal from "../../components/manager/InviteManagerModal";

import {
    getAllManagerInvitations,
} from "../../services/managerInvitationService";

export default function ManagerList() {

    // ==========================================
    // State
    // ==========================================

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [search, setSearch] = useState("");

    const [managers, setManagers] = useState([]);

    const [loading, setLoading] = useState(true);

    // ==========================================
    // Load Managers
    // ==========================================

    useEffect(() => {

        loadManagers();

    }, []);

    async function loadManagers() {

        try {

            setLoading(true);

            const response =
                await getAllManagerInvitations();

            // console.log("Response received:", response);

            setManagers(response.data || []);

        } catch (error) {

            console.error("Failed to load manager invitations.", error);

            console.error(
                "Failed to load manager invitations.",
                error
            );

            setManagers([]);

        } finally {

            setLoading(false);

        }

    }

    // ==========================================
    // Filter Managers
    // ==========================================

    const filteredManagers = useMemo(() => {

        return managers.filter((manager) => {

            const keyword = search.toLowerCase();

            return (

                manager.firstName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                manager.lastName
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                manager.email
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                manager.apartmentName
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    }, [managers, search]);

    // ==========================================
    // UI
    // ==========================================

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* ======================================
                    Header
                ====================================== */}

                <ManagerHeader
                    onCreate={() =>
                        setShowCreateModal(true)
                    }
                />

                {/* ======================================
                    Statistics
                ====================================== */}

                <ManagerStats
                    managers={managers}
                />

                {/* ======================================
                    Search
                ====================================== */}

                <ManagerSearchBar
                    search={search}
                    setSearch={setSearch}
                />

                {/* ======================================
                    Manager Table
                ====================================== */}

                <ManagerTable
                    managers={filteredManagers}
                    loading={loading}
                    onRefresh={loadManagers}
                />

                {/* ======================================
                    Invite Manager Modal
                ====================================== */}

                {showCreateModal && (

                    <InviteManagerModal
                        onClose={() =>
                            setShowCreateModal(false)
                        }
                    />

                )}

            </div>

        </DashboardLayout>

    );

}