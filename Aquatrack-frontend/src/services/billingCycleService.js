import api from "../api/axios";

// ==========================================
// Create Billing Cycle
// ==========================================

export const createBillingCycle = async (data) => {

    const response = await api.post(
        "/manager/billing-cycles",
        data
    );

    return response.data;

};

// ==========================================
// Get All Billing Cycles
// ==========================================

export const getAllBillingCycles = async () => {

    const response = await api.get(
        "/manager/billing-cycles"
    );

    return response.data.data;

};

// ==========================================
// Get Billing Cycle By ID
// ==========================================

export const getBillingCycleById = async (billingCycleId) => {

    const response = await api.get(
        `/manager/billing-cycles/${billingCycleId}`
    );

    return response.data.data;

};

// ==========================================
// Get Billing Cycles By Building
// ==========================================

export const getBillingCyclesByBuilding = async (buildingId) => {

    const response = await api.get(
        `/manager/billing-cycles/building/${buildingId}`
    );

    return response.data.data;

};

// ==========================================
// Update Billing Cycle
// ==========================================

export const updateBillingCycle = async (
    billingCycleId,
    data
) => {

    const response = await api.put(
        `/manager/billing-cycles/${billingCycleId}`,
        data
    );

    return response.data;

};

// ==========================================
// Close Billing Cycle
// ==========================================

export const closeBillingCycle = async (billingCycleId) => {

    const response = await api.patch(
        `/manager/billing-cycles/${billingCycleId}/close`
    );

    return response.data;

};

// ==========================================
// Delete Billing Cycle
// ==========================================

export const deleteBillingCycle = async (billingCycleId) => {

    const response = await api.delete(
        `/manager/billing-cycles/${billingCycleId}`
    );

    return response.data;

};