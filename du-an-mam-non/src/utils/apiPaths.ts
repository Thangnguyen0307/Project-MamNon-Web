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
    GET_USER_INFO: (id: string) => `api/user/${id}`,
    UPDATE_USER: (id: string) => `api/user/${id}`,
    DELETE_USER: (id: string) => `api/user/${id}`,
    CHANGE_STATUS: (id: string) => `api/user/${id}/status`,
    CHANGE_ROLE: (id: string) => `api/user/${id}/role`,
  },
};
