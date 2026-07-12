import api from "../api/axios";

export const registerProperty = async (data) => {
  const response = await api.post("/property-registration", data);
  return response.data;
};

export const getAllRegistrations = async () => {
  const response = await api.get("/admin/property-registration");
  return response.data;
};

export const getRegistrationById = async (id) => {
  const response = await api.get(`/admin/property-registration/${id}`);
  return response.data;
};

export const approveRegistration = async (id) => {
  const response = await api.put(
    `/admin/property-registration/${id}/approve`
  );
  return response.data;
};

export const rejectRegistration = async (id, rejectionReason) => {
  const response = await api.put(
    `/admin/property-registration/${id}/reject`,
    {
      rejectionReason,
    }
  );

  return response.data;
};