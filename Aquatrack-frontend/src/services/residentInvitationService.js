import api from "../api/axios";

const residentInvitationService = {

    // ==========================================
    // Create Resident Invitation
    // ==========================================

    async createResidentInvitation(data) {

        const response = await api.post(
            "/resident-invitations",
            data
        );

        return response.data;

    },

    // ==========================================
    // Get All Invitations
    // ==========================================

    async getAllResidentInvitations() {

        const response = await api.get(
            "/resident-invitations"
        );

        return response.data;

    },

    // ==========================================
    // Get Invitation By ID
    // ==========================================

    async getResidentInvitationById(invitationId) {

        const response = await api.get(
            `/resident-invitations/${invitationId}`
        );

        return response.data;

    },

    // ==========================================
    // Get Activation Details
    // ==========================================

    async getActivationDetails(token) {

        const response = await api.get(
            `/resident-invitations/activate?token=${token}`
        );

        return response.data;

    },

    // ==========================================
    // Activate Resident
    // =========================================

    async activateResident(data) {

        const response = await api.post(
            "/resident-invitations/activate",
            data
        );

        return response.data;

    }

};

export default residentInvitationService;