import API from "./api";

export const getTenantDashboard = async () => {
  try {
    const response = await API.get("/dashboard/tenant");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOwnerDashboard = async () => {
  try {
    const response = await API.get("/dashboard/owner");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminDashboard = async () => {
  try {
    const response = await API.get("/dashboard/admin");
    return response.data;
  } catch (error) {
    throw error;
  }
};