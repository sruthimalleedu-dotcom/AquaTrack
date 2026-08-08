import api from "../api/axios";

// ==========================================
// Get All Floors
// ==========================================

export async function getFloors(buildingId) {

    const response = await api.get(
        `/buildings/${buildingId}/floors`
    );

    return response.data;

}

// ==========================================
// Get Floor By Id
// ==========================================

export async function getFloorById(
    buildingId,
    floorId
) {

    const response = await api.get(
        `/buildings/${buildingId}/floors/${floorId}`
    );

    return response.data;

}

// ==========================================
// Create Floor
// ==========================================

export async function createFloor(
    buildingId,
    data
) {

    const response = await api.post(
        `/buildings/${buildingId}/floors`,
        data
    );

    return response.data;

}



// ==========================================
// Update Floor
// ==========================================

export async function updateFloor(
    buildingId,
    floorId,
    data
) {

    const response = await api.put(
        `/buildings/${buildingId}/floors/${floorId}`,
        data
    );

    return response.data;

}

// ==========================================
// Delete Floor
// ==========================================

export async function deleteFloor(
    buildingId,
    floorId
) {

    const response = await api.delete(
        `/buildings/${buildingId}/floors/${floorId}`
    );

    return response.data;

}
