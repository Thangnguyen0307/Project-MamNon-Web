import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { validateEmail } from "../../utils/helper";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    setMsg("");
    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.AUTH.SEND_OTP, { email });
      setMsg("Đã gửi mã OTP tới email của bạn.");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Gửi OTP thất bại. Thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }
    if (!/^\d{6}$/.test(otpCode.trim())) {
      setError("OTP phải gồm 6 chữ số");
      return;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu không khớp");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.put(API_PATHS.AUTH.RESET_PASSWORD, {
        email: email.trim(),
        otpCode: otpCode.trim(),
        newPassword: newPassword,
      });
      setMsg("Đặt lại mật khẩu thành công. Đang chuyển về trang đăng nhập...");
      setTimeout(() => navigate("/signin", { replace: true }), 1200);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Đặt lại mật khẩu thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 className="mb-1 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Đặt lại mật khẩu
      </h2>
      <p className="mb-6 text-theme-sm text-gray-500 dark:text-gray-400">
        Nhập email, mã OTP và mật khẩu mới theo hướng dẫn.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-red-600 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}
      {msg && (
        <div className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          {msg}
        </div>
      )}

      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Label htmlFor="otp">Mã OTP</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              placeholder="6 chữ số"
              value={otpCode}
              onChange={(e: any) => setOtpCode(e.target.value)}
            />
          </div>
          <Button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || !email}
            className="shrink-0"
          >
            Gửi mã
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="newPassword">Mật khẩu mới</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="••••••••"
          value={newPassword}
          onChange={(e: any) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
      </Button>
    </form>
  );
}
