import api from "../api/axios";

// ==========================================
// Manager Payment Service
// ==========================================

// ==========================================
// Get All Payments
// ==========================================

export const getAllPayments = async () => {

    const response = await api.get(
        "/manager/payments"
    );

    return response.data;

};

// ==========================================
// Get Payment By ID
// ==========================================

export const getPaymentById = async (
    paymentId
) => {

    const response = await api.get(
        `/manager/payments/${paymentId}`
    );

    return response.data;

};

// ==========================================
// Get Payment Summary
// ==========================================

export const getPaymentSummary = async () => {

    const response = await api.get(
        "/manager/payments/summary"
    );

    return response.data;

};

// ==========================================
// Update Payment Status
// ==========================================

export const updatePaymentStatus = async (
    paymentId,
    paymentData
) => {

    const response = await api.put(
        `/manager/payments/${paymentId}/status`,
        paymentData
    );

    return response.data;

};

// ==========================================
// Get Household Payments
// ==========================================

export const getPaymentsByHousehold = async (
    householdId
) => {

    const response = await api.get(
        `/manager/payments/household/${householdId}`
    );

    return response.data;

};