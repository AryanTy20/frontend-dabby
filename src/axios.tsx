import axios from "axios";

const baseURL = "http://localhost:5000/api";

export const customAxios = axios.create({
  baseURL,
  withCredentials: true,
});
