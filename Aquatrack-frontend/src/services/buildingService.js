import api from "../api/axios";

// ==========================================
// Get Buildings By Apartment
// ==========================================

export async function getBuildings(apartmentId) {

    const response = await api.get(

        `/apartments/${apartmentId}/buildings`

    );

    return response.data;

}

// ==========================================
// Create Building
// ==========================================

export async function createBuilding(
    apartmentId,
    data
) {

    const response = await api.post(

        `/apartments/${apartmentId}/buildings`,

        data

    );

    return response.data;

}

// ==========================================
// Get Building
// ==========================================

export async function getBuilding(
    apartmentId,
    buildingId
) {

    const response = await api.get(

        `/apartments/${apartmentId}/buildings/${buildingId}`

    );

    return response.data;

}

// ==============================
// Manager Buildings
// ==============================

export const getManagerBuildings = async () => {

    const response = await api.get(
        "/manager/buildings"
    );

    return response.data;

};

// ==========================================
// Update Building
// ==========================================

export async function updateBuilding(
    apartmentId,
    buildingId,
    data
) {

    const response = await api.put(

        `/apartments/${apartmentId}/buildings/${buildingId}`,

        data

    );

    return response.data;

}

// ==========================================
// Delete Building
// ==========================================

export async function deleteBuilding(
    apartmentId,
    buildingId
) {

    const response = await api.delete(

        `/apartments/${apartmentId}/buildings/${buildingId}`

    );

    return response.data;

}