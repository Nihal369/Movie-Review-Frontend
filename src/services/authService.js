import axios from "axios";

const API = "http://127.0.0.1:8000/api";

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API}/register/`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API}/login/`,
    userData
  );

  return response.data;
};