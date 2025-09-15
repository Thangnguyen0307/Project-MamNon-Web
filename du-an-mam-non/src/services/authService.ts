import { axiosInstance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export type SendOtpPayload = { email: string };
export type ResetPasswordPayload = { email: string; otp: string; newPassword: string };
export type UpdatePasswordPayload = { currentPassword: string; newPassword: string };

export async function sendOtp(payload: SendOtpPayload) {
  const { data } = await axiosInstance.post(API_PATHS.AUTH.SEND_OTP, payload);
  return data; // { message }
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const { data } = await axiosInstance.put(API_PATHS.AUTH.RESET_PASSWORD, payload);
  return data; // { message }
}

export async function updatePassword(payload: UpdatePasswordPayload) {
  const { data } = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PASSWORD, payload);
  return data; // { message }
}

export async function logout() {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    
    await axiosInstance.post(API_PATHS.AUTH.LOG_OUT, { refreshToken });
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

const AuthService = { sendOtp, resetPassword, updatePassword, logout };
export default AuthService;
