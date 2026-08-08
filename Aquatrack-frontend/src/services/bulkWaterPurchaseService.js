import api from "../api/axios";

const BASE_URL = "/manager/bulk-water-purchases";

const bulkWaterPurchaseService = {

    // ==========================================
    // Get All Bulk Water Purchases
    // ==========================================

    getAllBulkWaterPurchases: async () => {

        const response = await api.get(BASE_URL);

        return response.data;

    },

    // ==========================================
    // Get Bulk Water Purchase By Id
    // ==========================================

    getBulkWaterPurchaseById: async (purchaseId) => {

        const response = await api.get(
            `${BASE_URL}/${purchaseId}`
        );

        return response.data;

    },

    // ==========================================
    // Create Bulk Water Purchase
    // ==========================================

    createBulkWaterPurchase: async (data) => {

        const response = await api.post(
            BASE_URL,
            data
        );

        return response.data;

    },

    // ==========================================
    // Update Bulk Water Purchase
    // ==========================================

    updateBulkWaterPurchase: async (
        purchaseId,
        data
    ) => {

        const response = await api.put(
            `${BASE_URL}/${purchaseId}`,
            data
        );

        return response.data;

    },

    // ==========================================
    // Delete Bulk Water Purchase
    // ==========================================

    deleteBulkWaterPurchase: async (purchaseId) => {

        const response = await api.delete(
            `${BASE_URL}/${purchaseId}`
        );

        return response.data;

    },

    // ==========================================
    // Get Purchases By Building
    // ==========================================

    getBulkWaterPurchasesByBuilding: async (buildingId) => {

        const response = await api.get(
            `${BASE_URL}/building/${buildingId}`
        );

        return response.data;

    },

    // ==========================================
    // Get Purchases By Billing Cycle
    // ==========================================

    getBulkWaterPurchasesByBillingCycle: async (
        billingCycleId
    ) => {

        const response = await api.get(
            `${BASE_URL}/billing-cycle/${billingCycleId}`
        );

        return response.data;

    }

};

export default bulkWaterPurchaseService;