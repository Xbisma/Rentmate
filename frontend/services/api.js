import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Handle token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");

      if (typeof window !== "undefined" && !window.location.pathname.includes("/auth/")) {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
