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
export const registerUser = (userRegisterDto) => {
  return API.post("/Accounts/Register", userRegisterDto);
};
export const getUserByName = (userName) => {
  return API.post("/Accounts/GetUserByName", userName);
};
