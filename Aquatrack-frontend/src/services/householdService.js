import api from "../api/axios";

const BASE_URL = "/manager";

const householdService = {

    // ==========================================
    // Dashboard
    // ==========================================

    getManagerHouseholds: async () => {

        const response = await api.get(
            `${BASE_URL}/households`
        );

        return response.data.data;

    },

    // ==========================================
    // Buildings
    // ==========================================

    getManagerBuildings: async () => {

        const response = await api.get(
            `${BASE_URL}/buildings`
        );

        return response.data?.data ?? response.data;

    },

    // ==========================================
    // Floors
    // ==========================================

    getManagerFloors: async (buildingId) => {

        const response = await api.get(
            `${BASE_URL}/buildings/${buildingId}/floors`
        );

        return response.data;

    },

    // ==========================================
    // Households by Floor
    // ==========================================

    getHouseholdsByFloor: async (floorId) => {

        const response = await api.get(
            `${BASE_URL}/floors/${floorId}/households`
        );

        return response.data.data;

    },

    getHouseholdById: async (floorId, householdId) => {

        const response = await api.get(
            `${BASE_URL}/floors/${floorId}/households/${householdId}`
        );

        return response.data.data;

    },

    createHousehold: async (floorId, data) => {

        const response = await api.post(
            `${BASE_URL}/floors/${floorId}/households`,
            data
        );

        return response.data.data;

    },

    updateHousehold: async (
        floorId,
        householdId,
        data
    ) => {

        const response = await api.put(
            `${BASE_URL}/floors/${floorId}/households/${householdId}`,
            data
        );

        return response.data.data;

    },

    deleteHousehold: async (
        floorId,
        householdId
    ) => {

        const response = await api.delete(
            `${BASE_URL}/floors/${floorId}/households/${householdId}`
        );

        return response.data;

    }

};

export default householdService;