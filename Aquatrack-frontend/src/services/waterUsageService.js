import api from "../api/axios";

const BASE_URL = "/manager";

const waterUsageService = {

    // ==========================================
    // Get All Water Usage
    // ==========================================

    getAllWaterUsage: async (householdId) => {

        const response = await api.get(
            `${BASE_URL}/households/${householdId}/water-usage`
        );

        return response.data;

    },

    // ==========================================
    // Get Water Usage By Id
    // ==========================================

    getWaterUsageById: async (
        householdId,
        waterUsageId
    ) => {

        const response = await api.get(
            `${BASE_URL}/households/${householdId}/water-usage/${waterUsageId}`
        );

        return response.data;

    },

    // ==========================================
    // Create Water Usage
    // ==========================================

    createWaterUsage: async (
        householdId,
        data
    ) => {

        const response = await api.post(
            `${BASE_URL}/households/${householdId}/water-usage`,
            data
        );

        return response.data;

    },

    // ==========================================
    // Update Water Usage
    // ==========================================

    updateWaterUsage: async (
        householdId,
        waterUsageId,
        data
    ) => {

        const response = await api.put(
            `${BASE_URL}/households/${householdId}/water-usage/${waterUsageId}`,
            data
        );

        return response.data;

    },

    // ==========================================
    // Delete Water Usage
    // ==========================================

    deleteWaterUsage: async (
        householdId,
        waterUsageId
    ) => {

        const response = await api.delete(
            `${BASE_URL}/households/${householdId}/water-usage/${waterUsageId}`
        );

        return response.data;

    }

};

export default waterUsageService;