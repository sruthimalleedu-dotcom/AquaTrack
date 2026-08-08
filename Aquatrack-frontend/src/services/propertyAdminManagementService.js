import api from "../api/axios";

// ==========================================
// Get All Property Admins
// ==========================================

export const getAllPropertyAdmins = async () => {

    const response = await api.get(
        "/admin/property-admins"
    );

    return response.data;

};

// ==========================================
// Get Property Admin By Id
// ==========================================

export const getPropertyAdminById = async (id) => {

    const response = await api.get(
        `/admin/property-admins/${id}`
    );

    return response.data;

};

// ==========================================
// Suspend Property Admin
// ==========================================

export const suspendPropertyAdmin = async (id) => {

    const response = await api.put(
        `/admin/property-admins/${id}/suspend`
    );

    return response.data;

};

// ==========================================
// Reactivate Property Admin
// ==========================================

export const reactivatePropertyAdmin = async (id) => {

    const response = await api.put(
        `/admin/property-admins/${id}/reactivate`
    );

    return response.data;

};