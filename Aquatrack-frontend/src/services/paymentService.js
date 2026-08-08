import api from "../api/axios";

// ==========================================
// Payment Service
// ==========================================

// ==========================================
// Create Payment
// ==========================================

export const createPayment = async (paymentData) => {

    const response = await api.post(
        "/payments",
        paymentData
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
        `/payments/${paymentId}/status`,
        paymentData
    );

    return response.data;

};

// ==========================================
// Get All Payments
// ==========================================

export const getAllPayments = async () => {

    const response = await api.get(
        "/payments"
    );

    return response.data;

};

// ==========================================
// Get Payment By ID
// ==========================================

export const getPaymentById = async (paymentId) => {

    const response = await api.get(
        `/payments/${paymentId}`
    );

    return response.data;

};

// ==========================================
// Get Payments By Water Bill
// ==========================================

export const getPaymentsByWaterBill = async (
    waterBillId
) => {

    const response = await api.get(
        `/payments/water-bill/${waterBillId}`
    );

    return response.data;

};

// ==========================================
// Get Payment Summary
// ==========================================

export const getPaymentSummary = async () => {

    const response = await api.get(
        "/payments/summary"
    );

    return response.data;

};