import api from "../api/axios";

const residentService = {

    // ==========================================
    // Get Residents By Household
    // ==========================================

    async getResidents(householdId) {

        const response = await api.get(
            `/households/${householdId}/residents`
        );

        return response.data.data;

    },

    // ==========================================
    // Get Resident By ID
    // ==========================================

    async getResidentById(householdId, residentId) {

        const response = await api.get(
            `/households/${householdId}/residents/${residentId}`
        );

        return response.data.data;

    },

    // ==========================================
    // Create Resident
    // ==========================================

    async createResident(householdId, residentData) {

        const response = await api.post(
            `/households/${householdId}/residents`,
            residentData
        );

        return response.data.data;

    },

    // ==========================================
    // Update Resident
    // ==========================================

    async updateResident(
        householdId,
        residentId,
        residentData
    ) {

        const response = await api.put(
            `/households/${householdId}/residents/${residentId}`,
            residentData
        );

        return response.data.data;

    },

    // ==========================================
    // Suspend Resident
    // ==========================================

    async suspendResident(householdId, residentId) {

        const response = await api.patch(
            `/households/${householdId}/residents/${residentId}/suspend`
        );

        return response.data;

    },

    // ==========================================
    // Reactivate Resident
    // ==========================================

    async reactivateResident(householdId, residentId) {

        const response = await api.patch(
            `/households/${householdId}/residents/${residentId}/reactivate`
        );

        return response.data;

    }

};

export default residentService;