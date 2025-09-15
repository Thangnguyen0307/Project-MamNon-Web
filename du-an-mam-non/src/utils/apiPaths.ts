export const BASE_URL = "https://project-mamnon-be.onrender.com/";

export const API_PATHS = {
  AUTH: {
    LOGIN: "api/auth/login",
    RESET_PASSWORD: "api/auth/reset-password",
    REFRESH_TOKEN: "api/auth/refresh-token",
    LOG_OUT: "api/auth/logout",
    SEND_OTP: "api/auth/send-otp",
    UPDATE_PASSWORD: "api/auth/update-password",
  },
  ADMIN: {
    CREATE_ACCOUNT: "api/admins/create-account",
  },
  USER: {
    GET_ALL_USERS: "api/user",
    GET_USER_INFO: "api/user/my-account",
    UPDATE_USER: (id: string) => `api/user/${id}`,
    DELETE_USER: (id: string) => `api/user/${id}`,
    CHANGE_STATUS: (id: string) => `api/user/${id}/status`,
    CHANGE_ROLE: (id: string) => `api/user/${id}/role`,
  },
  LEVELS: {
    GET_ALL_LEVELS: "api/levels",
    CREATE_LEVEL: "api/levels",
    DETAIL_LEVEL: (id: string) => `api/levels/${id}`,
    UPDATE_LEVEL: (id: string) => `api/levels/${id}`,
    DELETE_LEVEL: (id: string) => `api/levels/${id}`,
  },
};
