import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (userSignInDto) => {
  return API.post("/Accounts/Login", userSignInDto);
};
