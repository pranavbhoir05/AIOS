import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Request interceptor for regular API (for public routes)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response interceptor for regular API
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Just log and pass through - axiosPrivate handles refresh
        if (error.response?.status === 401) {
            console.log("Session expired or not authenticated");
        }
        return Promise.reject(error);
    }
);

export default api;
