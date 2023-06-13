import axios from "axios";

const axiosApi = axios.create({
  baseURL: process.env.SERVER_URL_UTCREW_LIVE,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosApi;
