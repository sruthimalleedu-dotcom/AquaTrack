import api from "../api/axios";

// ==========================================
// Get All Manager Invitations
// ==========================================

export async function getAllManagerInvitations() {

    const response = await api.get(
        "/manager-invitations"
    );

    return response.data;

}

// ==========================================
// Get Manager Invitation By Id
// ==========================================

export async function getManagerInvitationById(id) {

    const response = await api.get(
        `/manager-invitations/${id}`
    );

    return response.data;

}

// ==========================================
// Get Activation Details
// ==========================================

export async function getActivationDetails(token) {

    const response = await api.get(
        `/manager-invitations/activate?token=${token}`
    );

    return response.data;

}

// ==========================================
// Create Manager Invitation
// ==========================================

export async function createManagerInvitation(data) {

    const response = await api.post(
        "/manager-invitations",
        data
    );


    //  console.log("Manager List API:", response.data);

    return response.data;

}

// ==========================================
// Activate Manager
// ==========================================

export async function activateManager(data) {

    const response = await api.post(
        "/manager-invitations/activate",
        data
    );


    return response.data;

}