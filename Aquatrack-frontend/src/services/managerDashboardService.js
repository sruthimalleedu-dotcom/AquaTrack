import api from "../api/axios";

/**
 * ==========================================
 * Manager Dashboard API Service
 * ==========================================
 */

/**
 * Dashboard Summary
 */
export const getDashboardSummary = async () => {

    const response = await api.get("/manager/dashboard/summary");

    return response.data;

};

/**
 * Monthly Water Consumption
 */
export const getMonthlyWaterConsumption = async () => {

    const response = await api.get(
        "/manager/dashboard/water-consumption"
    );

    return response.data;

};

/**
 * Building-wise Water Usage
 */
export const getBuildingUsage = async () => {

    const response = await api.get(
        "/manager/dashboard/building-usage"
    );

    return response.data;

};

/**
 * Payment Status Chart
 */
export const getPaymentStatus = async () => {

    const response = await api.get(
        "/manager/dashboard/payment-status"
    );

    return response.data;

};

/**
 * Bill Status Chart
 */
export const getBillStatus = async () => {

    const response = await api.get(
        "/manager/dashboard/bill-status"
    );

    return response.data;

};

/**
 * Revenue Trend
 */
export const getRevenueTrend = async () => {

    const response = await api.get(
        "/manager/dashboard/revenue-trend"
    );

    return response.data;

};

/**
 * Top Water Consumers
 */
export const getTopConsumers = async () => {

    const response = await api.get(
        "/manager/dashboard/top-consumers"
    );

    return response.data;

};

/**
 * Recent Bills
 */
export const getRecentBills = async () => {

    const response = await api.get(
        "/manager/dashboard/recent-bills"
    );

    return response.data;

};

/**
 * Recent Payments
 */
export const getRecentPayments = async () => {

    const response = await api.get(
        "/manager/dashboard/recent-payments"
    );

    return response.data;

};

/**
 * Dashboard Alerts
 */
export const getDashboardAlerts = async () => {

    const response = await api.get(
        "/manager/dashboard/alerts"
    );

    return response.data;

};