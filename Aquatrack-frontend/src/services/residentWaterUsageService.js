import api from "../api/axios";

const BASE_URL = "/resident";

// ==========================================
// Resident Water Usage Service
// ==========================================

const residentWaterUsageService = {

    /**
     * Fetch water usage history of the
     * logged-in resident.
     *
     * GET /api/resident/water-usage
     */
    async getMyWaterUsage() {

        const response = await api.get(
            `${BASE_URL}/water-usage`
        );

        return response.data.data;

    },

};

export default residentWaterUsageService;