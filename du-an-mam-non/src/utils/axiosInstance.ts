import axios from "axios";
import { API_PATHS, BASE_URL } from "./apiPaths";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// raw axios để gọi refresh mà không gắn Authorization
const rawAxios = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const isRefreshCall =
    !!config.url && config.url.includes(API_PATHS.AUTH.REFRESH_TOKEN);
  if (token && !isRefreshCall) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: Array<(newAccess: string) => void> = [];
const flushQueue = (t: string) => {
  queue.forEach((cb) => cb(t));
  queue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const resp = error?.response;
    const original = error?.config;

    if (!resp || resp.status !== 401 || original?._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    // ❗ Không refresh cho các call đặc biệt
    const url = String(original?.url || "");
    if (
      url.includes(API_PATHS.AUTH.REFRESH_TOKEN) ||
      url.includes(API_PATHS.AUTH.LOG_OUT)
    ) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");
    // ❗ Không có refreshToken => KHÔNG gọi refresh-token
    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Xếp hàng đợi đến khi có token mới
      return new Promise((resolve) => {
        queue.push((newAccess) => {
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${newAccess}`;
          resolve(axiosInstance(original));
        });
      });
    }

    isRefreshing = true;
    try {
      // Gọi refresh bằng rawAxios, không đính kèm Authorization
      let r = await rawAxios.post(API_PATHS.AUTH.REFRESH_TOKEN, { refreshToken });

      // phòng trường hợp BE trả kiểu khác
      const data = r?.data || {};
      const newAccess =
        data.accessToken || data.access_token || data.token || data?.data?.accessToken;
      const newRefresh =
        data.refreshToken || data.refresh_token || data?.data?.refreshToken;

      if (!newAccess) throw new Error("No access token returned by refresh endpoint");

      localStorage.setItem("accessToken", newAccess);
      if (newRefresh) localStorage.setItem("refreshToken", newRefresh);

      flushQueue(newAccess);

      original.headers = original.headers || {};
      original.headers.Authorization = `Bearer ${newAccess}`;
      return axiosInstance(original);
    } catch (e) {
      queue = [];
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
