import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://172.16.0.2:4003/UTCrew/Proxy/CoreService.svc/", //process.env.SERVER_URL_UTCREW_LOCAL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosApi;
