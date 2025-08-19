import Cookies from "js-cookie";
import axios from "axios";
import { API_BASE_URL } from "../consts/consts";

// Create an Axios instance

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    // Add an authorization token if available
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
