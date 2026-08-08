import api from "../api/axios";

// ==========================================
// Property Admin Dashboard
// ==========================================

export async function getPropertyDashboardSummary() {

    const response = await api.get(
        "/property-admin/dashboard/summary"
    );

    return response.data;

}