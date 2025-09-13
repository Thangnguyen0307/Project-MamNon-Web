import axios, { AxiosRequestConfig } from "axios";
import { API_PATHS, BASE_URL } from "./apiPaths";
import { redirect } from "react-router";

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//! Request Interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//! Response Interceptor

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    //! Handle common errors globally
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (token) {
                originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${token}`,
                };
              }
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await axiosInstance.post<{ accessToken: string }>(
            API_PATHS.AUTH.REFRESH_TOKEN,
            {
              refreshToken: localStorage.getItem("refreshToken"),
            }
          );

          const newAccess = res.data.accessToken;
          localStorage.setItem("accessToken", newAccess);

          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccess}`;
          processQueue(null, newAccess);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccess}`,
          };

          return axiosInstance(originalRequest);
        } catch (err: unknown) {
          processQueue(err, null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          redirect("/signin");
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else if (error.response.status === 500) {
        console.log("Server error. Please try again later.");
      } else if (error.code === "ECONNABORTED") {
        console.log("Request time out. Please try again.");
      }
    }
    return Promise.reject(error);
  }
);
