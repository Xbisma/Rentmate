import API from "./api";

export const getNotifications = async () => {
  try {
    const response = await API.get("/notifications");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await API.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    throw error;
  }
};