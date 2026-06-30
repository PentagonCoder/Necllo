import api from "../api/axios";

export const loginRequest = (credentials) => {
  return api.post("/api/users/login", credentials);
};

export const registerRequest = (userData) => {
  return api.post("/api/users/register", userData);
};

export const fetchProfile = () => {
  return api.post("/api/users/profile");
};

export const logoutRequest = () => {
  return api.post("/api/users/logout");
};

export const refreshTokenRequest = () => {
  return api.post("/api/users/refresh-Token");
};

export const verifyEmailRequest = (token) => {
  return api.get(`/api/users/verify-email/${token}`);
}