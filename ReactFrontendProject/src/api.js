import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error("Erreur API:", error.response.status, error.response.data);
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: "Backend inaccessible" });
  }
);

export default API;
