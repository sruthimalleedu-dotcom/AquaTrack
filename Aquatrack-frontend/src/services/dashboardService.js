import api from "../api/axios";

// ==========================================
// Dashboard Summary
// ==========================================

export const getDashboardSummary = async () => {

    const response = await api.get(
        "/admin/dashboard"
    );

    return response.data;

};

// ==========================================
// Recent Property Registrations
// ==========================================

export const getRecentRegistrations = async () => {

    const response = await api.get(
        "/admin/property-registration"
    );

    return response.data;

};