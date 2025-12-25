import API from "./api";

export const createMaintenanceRequest = async (requestData) => {
  try {
    const response = await API.post("/maintenance", requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTenantMaintenanceRequests = async () => {
  try {
    const response = await API.get("/maintenance/tenant");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOwnerMaintenanceRequests = async () => {
  try {
    const response = await API.get("/maintenance/owner");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMaintenanceRequestStatus = async (id, status) => {
  try {
    const response = await API.put(`/maintenance/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};