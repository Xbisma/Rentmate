import API from "./api";

export const triggerRentAlerts = async () => {
  try {
    const response = await API.get("/alerts/rent-alerts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const triggerLeaseAlerts = async () => {
  try {
    const response = await API.get("/alerts/lease-alerts");
    return response.data;
  } catch (error) {
    throw error;
  }
};