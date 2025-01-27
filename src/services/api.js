import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // Backend URL
});

// Interceptor to include tokens in requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export default API;
