import api from "../api/axios";

// ==========================================
// Login
// ==========================================

export const login = async (credentials) => {

    const response = await api.post(
        "/auth/login",
        credentials
    );

    return response.data;

};

// ==========================================
// Forgot Password
// ==========================================

export const forgotPassword = async (email) => {

    const response = await api.post(
        "/auth/forgot-password",
        {
            email,
        }
    );

    return response.data;

};

// ==========================================
// Reset Password
// ==========================================

export const resetPassword = async (
    token,
    newPassword,
    confirmPassword
) => {

    const response = await api.post(
        "/auth/reset-password",
        {
            token,
            newPassword,
            confirmPassword,
        }
    );

    return response.data;

};