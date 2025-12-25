import API from "./api";

export const payRent = async (paymentData) => {
  try {
    const response = await API.post("/payments/pay", paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTenantPayments = async () => {
  try {
    const response = await API.get("/payments/tenant");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOwnerPayments = async () => {
  try {
    const response = await API.get("/payments/owner");
    return response.data;
  } catch (error) {
    throw error;
  }
};