import axiosInstance from "./axiosInstance";
import { axiosErrorHandler } from "./axiosErrorHandler";

export async function axiosPost(url, params = null) {
  debugger;
  const controllerRef = new AbortController();
  return await axiosInstance
    .post(url, params, {
      signal: controllerRef.signal,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw axiosErrorHandler(err);
    })
    .finally(() => {
      controllerRef.abort();
    });
}
export async function axiosGet(url, params = null) {
  debugger;
  console.log("get url", url);
  const controllerRef = new AbortController();
  return await axiosInstance
    .request({
      url,
      params,
    })
    .then((res) => {
      debugger;
      return res.data;
    })
    .catch((err) => {
      debugger;
      throw axiosErrorHandler(err);
    })
    .finally(() => {
      controllerRef.abort();
    });
}
