import api from "../api/axios";

// ==========================================
// Validate Activation Token
// ==========================================

export const validateActivationToken = async (token) => {

    const response = await api.get(
        `/property-admin/activate?token=${token}`
    );

    return response.data;

};

// ==========================================
// Set Password
// ==========================================

export const setPassword = async (data) => {

    const response = await api.post(
        "/property-admin/set-password",
        data
    );

    return response.data;

};