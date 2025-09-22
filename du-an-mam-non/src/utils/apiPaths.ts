export const BASE_URL = "https://techleaf.pro/projects/mam-non-media/";

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
    CHANGE_STATUS: (id: string) => `api/user/${id}/status`,
    CHANGE_ROLE: (id: string) => `api/user/${id}/role`,
    GET_ALL_USER: "api/user/",
  },
  USER: {
    GET_ALL_USERS: "api/user",
    GET_USER_INFO: "api/user/my-account",
    UPDATE_USER: `api/user/my-account`,
    DELETE_USER: `api/user/my-account`,
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
  CLASSES: {
    GET_ALL_CLASSES: "api/classes",
    CREATE_CLASSES: "api/classes",
    DETAIL_CLASSES: (id: string) => `api/classes/${id}`,
    UPDATE_CLASSES: (id: string) => `api/classes/${id}`,
    DELETE_CLASSES: (id: string) => `api/classes/${id}`,
    GET_CLASSES_BY_TEACHER: "api/classes/user",
  },
  BLOG: {
    GET_ALL_BLOGS: "api/blogs",
    CREATE_BLOG: "api/blogs",
    DETAIL_BLOG: (id: string) => `api/blogs/${id}`,
    UPDATE_BLOG: (id: string) => `api/blogs/${id}`,
    DELETE_BLOG: (id: string) => `api/blogs/${id}`,
  },
};
