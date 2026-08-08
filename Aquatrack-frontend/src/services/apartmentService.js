import api from "../api/axios";

// ==========================================
// Get All Apartments
// ==========================================

export async function getApartments() {

    const response = await api.get("/apartments");

    return response.data;

}

// ==========================================
// Get Apartment By Id
// ==========================================

export async function getApartmentById(id) {

    const response = await api.get(`/apartments/${id}`);

    return response.data;

}

// ==========================================
// Create Apartment
// ==========================================

export async function createApartment(data) {

    const response = await api.post("/apartments", data);

    return response.data;

}

// ==========================================
// Update Apartment
// ==========================================

export async function updateApartment(id, data) {

    const response = await api.put(

        `/apartments/${id}`,

        data

    );

    return response.data;

}

// ==========================================
// Delete Apartment
// ==========================================

export async function deleteApartment(id) {

    const response = await api.delete(

        `/apartments/${id}`

    );

    return response.data;

}