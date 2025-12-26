// frontend/services/authService.js
import API from "./api";

export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    // Rethrow the error so it can be caught in the component
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await API.post("/users/reset-password", resetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  return token ? { 
    token, 
    userType: localStorage.getItem("userType"),
    userId: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName")
  } : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};