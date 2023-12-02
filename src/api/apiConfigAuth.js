import axios from "axios";

export const createApiWithAuth = (token) => {
  console.log("TokenInApi", token);
  const API = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const logoutUser = () => {
    window.dispatchEvent(new Event("tokenRemoved"));
    return API.post("/Accounts/Logout");
  };
  return { API, logoutUser };
};
