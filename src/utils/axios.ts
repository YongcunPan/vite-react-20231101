import axios, { AxiosError } from "axios";
import store from "../app/store";
import { showLoading, hideLoading } from "../app/features/global/globalSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337",
  timeout: 3000,
  headers: {
    ["Content-Type"]: "application/json",
    Accept: "application/json",
  },
});

let requestCount = 0;
function show() {
  if (requestCount === 0) store.dispatch(showLoading());
  requestCount++;
}
function hide() {
  if (requestCount <= 0) return;
  requestCount--;
  if (requestCount === 0) store.dispatch(hideLoading());
}

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${store.getState().auth.token}`;
    if (config?.loading) show();
    return config;
  },
  (error: AxiosError) => {
    if (error?.config?.loading) hide();
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config?.loading) hide();
    return response;
  },
  (error: AxiosError) => {
    if (error?.config?.loading) hide();
    return Promise.reject(error);
  }
);

const http = {
  get: (url: string, params: object = {}, loading = true) =>
    axiosInstance.request({ method: "get", url, params, loading }),

  post: (url: string, data: object, loading = true) =>
    axiosInstance.request({ method: "post", url, data, loading }),
};

export default http;
