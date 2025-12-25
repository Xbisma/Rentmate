import API from "./api";

export const getTenantTenancies = async () => {
  try {
    const response = await API.get("/tenancies");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTenancyById = async (id) => {
  try {
    const response = await API.get(`/tenancies/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};