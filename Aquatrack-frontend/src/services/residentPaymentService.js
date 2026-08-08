import api from "../api/axios";

// ==========================================
// Resident Payment Service
// ==========================================

// ==========================================
// Get My Payments
// ==========================================

export const getMyPayments = async () => {

    const response = await api.get(
        "/resident/payments"
    );

    return response.data;

};

// ==========================================
// Get My Payment By ID
// ==========================================

export const getMyPaymentById = async (
    paymentId
) => {

    const response = await api.get(
        `/resident/payments/${paymentId}`
    );

    return response.data;

};

// ==========================================
// Get My Payment Summary
// ==========================================

export const getMyPaymentSummary = async () => {

    const response = await api.get(
        "/resident/payments/summary"
    );

    return response.data;

};

// ==========================================
// Pay My Water Bill
// ==========================================

export const payMyWaterBill = async (
    paymentData
) => {

    const response = await api.post(
        "/resident/payments",
        paymentData
    );

    return response.data;

};