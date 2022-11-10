import axios from "axios";

// const baseURL = "http://localhost:5000/api";
const baseURL = "https://dobby-project.herokuapp.com/api";

export const customAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
