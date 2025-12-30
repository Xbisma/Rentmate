import API from "./api";

/**
 * Tenant side – view own tenancies
 */
export const getTenantTenancies = async () => {
  try {
    const response = await API.get("/tenancies");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Owner side – view tenancies of owned properties
 */
export const getOwnerTenancies = async () => {
  try {
    const response = await API.get("/tenancies/owner");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * View single tenancy details
 */
export const getTenancyById = async (id) => {
  try {
    const response = await API.get(`/tenancies/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
