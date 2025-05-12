import { id } from "@/utils";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const errors = ref<any>(null);

axios.defaults.headers.common["contentType"] = "application/json";
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.defaults.headers.common["Cache-control"] = "no-store";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Pragma"] = "no-cache";
axios.defaults.headers.common["Expires"] = 0;
axios.defaults.headers.common["X-Request-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

const axiosDefault = axios.create();

axiosDefault.defaults.headers.common["Fingerprint"] = id();
axiosDefault.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const whiteList: string[] = [
  "/Authorize/SignIn",
  "/Authorize/TwoFactor",
  "/Authorize/ForgotPassword",
  "/Authorize/RecoverPassword",
  "/signalr",
]; // this url api not using token

// Attach Authorize before send request
axiosDefault.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (import.meta.env.VITE_LOCALSTORAGE_USER_NAME) {
      const user =
        localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_USER_NAME) ?? "";

      const userObj = user ? JSON.parse(user) : null;
      if (userObj && userObj.token)
        config.headers["Authorization"] = `Bearer ${userObj.token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// Exceptions for 401 after receive response
axiosDefault.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    // if error 401 and not include auth api return login
    errors.value = error;
    if (
      error.response.status === 401 &&
      !whiteList.includes(error.config.url)
    ) {
      {
        window.location.href = "/login";
      }
      // if error 403 return 403page
    } else if (error.response.status === 403) {
      window.location.href = "/403";
    }
    return Promise.reject(error);
  },
);

export { axiosDefault, errors };
