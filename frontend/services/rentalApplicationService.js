import API from "./api";

export const applyForProperty = async (applicationData) => {
  try {
    const response = await API.post("/applications", applicationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTenantApplications = async () => {
  try {
    const response = await API.get("/applications/tenant");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOwnerApplications = async () => {
  try {
    const response = await API.get("/applications/owner");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateApplicationStatus = async (id, status) => {
  try {
    const response = await API.put(`/applications/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};