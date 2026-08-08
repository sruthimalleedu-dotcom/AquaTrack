import api from "../api/axios";

const BASE_URL = "/resident";

// ==========================================
// Resident Household Service
// ==========================================

const residentHouseholdService = {

    /**
     * Fetch logged-in resident household details.
     *
     * GET /api/resident/my-household
     */
    async getMyHousehold() {

        const response = await api.get(`${BASE_URL}/my-household`);

        return response.data.data;

    },

};

export default residentHouseholdService;