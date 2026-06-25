import api from "../api/axios";
import axiosPrivate from "../api/axiosPrivate";

// Public routes - use regular api
export const registerUser = (data) => {
    return api.post("/auth/register", data);
};

export const loginUser = (data) => {
    return api.post("/auth/login", data);
};

export const refreshAccessToken = (refreshToken) => {
    return api.post("/auth/refresh-token", { refreshToken });
};

// Protected routes - use axiosPrivate
export const getCurrentUser = () => {
    return axiosPrivate.get("/auth/current-user");
};

export const logoutUser = () => {
    return axiosPrivate.post("/auth/logout");
};
