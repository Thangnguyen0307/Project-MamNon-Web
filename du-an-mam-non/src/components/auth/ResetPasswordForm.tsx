import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { validateEmail } from "../../utils/helper";
import { resetPassword, sendOtp } from "../../services/authService";
import { EyeIcon, EyeCloseIcon } from "../../icons";

const RESEND_COOLDOWN = 60; // giây

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [msg, setMsg] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // đếm ngược cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const canSend = validateEmail(email) && cooldown === 0 && !sendingOtp;

  async function handleSendOtp() {
    if (!canSend) return;

    setSendingOtp(true);
    setIsError(false);
    setMsg("");

    try {
      const res = await sendOtp({ email, type: "RESET_PASSWORD" });
      setMsg(res?.message || "Đã gửi OTP về email của bạn.");
      setIsError(false);
      setCooldown(RESEND_COOLDOWN);
    } catch (err: any) {
      const m =
        err?.response?.data?.message ||
        err?.message ||
        "Không thể gửi OTP. Vui lòng thử lại.";
      setIsError(true);
      setMsg(m);
    } finally {
      setSendingOtp(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    // validate đơn giản
    if (!validateEmail(email)) {
      setIsError(true);
      setMsg("Email không hợp lệ");
      return;
    }
    if (!otp || otp.trim().length < 4) {
      setIsError(true);
      setMsg("Mã OTP không hợp lệ");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setIsError(true);
      setMsg("Mật khẩu tối thiểu 6 ký tự");
      return;
    }
    if (newPassword !== confirm) {
      setIsError(true);
      setMsg("Xác nhận mật khẩu không khớp");
      return;
    }

    setSubmitting(true);
    setMsg("");
    setIsError(false);

    try {
      const res = await resetPassword({ email, otp, newPassword });
      setIsError(false);
      setMsg(res?.message || "Đổi mật khẩu thành công. Vui lòng đăng nhập!");
      setTimeout(() => navigate("/signin", { replace: true }), 800);
    } catch (err: any) {
      const m =
        err?.response?.data?.message ||
        err?.message ||
        "Đặt lại mật khẩu thất bại. Vui lòng thử lại.";
      setIsError(true);
      setMsg(m);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">Đặt lại mật khẩu</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Nhập email, mã OTP và mật khẩu mới để tiếp tục
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* EMAIL + SENDOTP (chung 1 pill, viền xanh) */}
          <div>
            <Label>Email</Label>
            <div className="relative flex-1">
              <Input
                className="h-11 w-full rounded-full bg-white border-2 border-brand-500 pl-4 pr-[118px]
                           text-gray-800 placeholder:text-gray-400 placeholder:italic
                           focus:ring-2 focus:ring-brand-300 dark:bg-gray-900 dark:text-white/90"
                placeholder="you@example.com"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={!canSend}
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full text-sm font-medium
                            ${canSend
                              ? "bg-brand-500 text-white hover:bg-brand-600"
                              : "bg-brand-200 text-white/80 pointer-events-none"}
                           `}
              >
                {sendingOtp
                  ? "Đang gửi..."
                  : cooldown > 0
                  ? `Gửi lại ${cooldown}s`
                  : "SendOTP"}
              </button>
            </div>
          </div>

          {/* OTP (pill nền xanh + viền xanh) */}
          <div>
            <Label>Mã OTP</Label>
            <Input
              inputMode="numeric"
              autoComplete="one-time-code"
              className="h-11 w-full rounded-full bg-brand-50 border-2 border-brand-500 px-4
                         text-gray-800 placeholder:text-brand-400 placeholder:italic
                         focus:ring-2 focus:ring-brand-300 dark:bg-brand-500/10 dark:text-white/90"
              placeholder="Nhập OTP"
              value={otp}
              onChange={(e: any) => setOtp(e.target.value)}
            />
            
          </div>

          {/* PASSWORDS */}
          <div>
            <Label>Mật khẩu mới</Label>
            <div className="relative">
              <Input
                type={showPw1 ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
                className="h-11 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPw1((v) => !v)}
                className="absolute -translate-y-1/2 right-3 top-1/2"
                aria-label={showPw1 ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPw1 ? (
                  <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label>Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                type={showPw2 ? "text" : "password"}
                placeholder="••••••••"
                value={confirm}
                onChange={(e: any) => setConfirm(e.target.value)}
                className="h-11 rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                className="absolute -translate-y-1/2 right-3 top-1/2"
                aria-label={showPw2 ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPw2 ? (
                  <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* MESSAGE */}
          {msg && (
            <div
              className={`text-sm rounded-lg px-3 py-2 ${
                isError
                  ? "bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-400/30"
                  : "bg-green-50 text-green-600 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-400/30"
              }`}
              role="alert"
              aria-live="polite"
            >
              {msg}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </Button>

          <div className="text-center text-sm text-gray-500 mt-1">
            <Link
              to="/signin"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
