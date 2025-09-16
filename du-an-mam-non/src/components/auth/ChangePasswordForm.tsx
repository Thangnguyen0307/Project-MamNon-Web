import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../services/authService";
import { useUser } from "../../context/UserContext";

export type ChangePasswordFormProps = {
  className?: string;
  title?: string;
  forceRelogin?: boolean;
  redirectTo?: string;
  onSuccess?: (resp?: any) => void;
};

export default function ChangePasswordForm({
  className = "",
  title = "Change Password",
  forceRelogin = true,
  redirectTo = "/signin",
  onSuccess,
}: ChangePasswordFormProps) {
  const navigate = useNavigate();
  const { clearUser } = useUser?.() ?? { clearUser: () => {} };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNew, setConfirmNew] = useState("");
  const [show, setShow] = useState({ cur: false, nw: false, cf: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length >= 8 &&
    newPassword !== currentPassword &&
    confirmNew === newPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!valid) {
      setError(
        "Vui lòng kiểm tra lại: mật khẩu mới ≥ 8 ký tự, khác mật khẩu hiện tại và khớp xác nhận."
      );
      return;
    }
    try {
      setSubmitting(true);
      const resp = await updatePassword({
        currentPassword,
        newPassword,
      });

      // nếu có callback truyền vào từ page, ưu tiên gọi callback
      if (onSuccess) {
        onSuccess(resp);
        return;
      }

      // mặc định: thông báo + logout bắt buộc (an toàn)
      alert("Cập nhật mật khẩu thành công!");
      if (forceRelogin) {
        try {
          clearUser?.();
        } catch {}
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate(redirectTo, { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Đổi mật khẩu thất bại. Vui lòng kiểm tra mật khẩu hiện tại.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border px-3 py-2 outline-none dark:bg-gray-900 dark:border-gray-800";
  const labelCls = "block text-sm mb-1";

  return (
    <div className={`w-full ${className}`}>
      <h1 className="text-2xl font-semibold mb-6">{title}</h1>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        {/* Current password */}
        <div>
          <label className={labelCls}>Current password</label>
          <div className="relative">
            <input
              type={show.cur ? "text" : "password"}
              className={inputCls}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
              onClick={() => setShow((s) => ({ ...s, cur: !s.cur }))}
            >
              {show.cur ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* New password */}
        <div>
          <label className={labelCls}>New password</label>
          <div className="relative">
            <input
              type={show.nw ? "text" : "password"}
              className={inputCls}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
              onClick={() => setShow((s) => ({ ...s, nw: !s.nw }))}
            >
              {show.nw ? "Hide" : "Show"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Gợi ý: ≥ 8 ký tự; nên có chữ hoa, chữ thường và số/ký tự đặc biệt.
          </p>
        </div>

        {/* Confirm new password */}
        <div>
          <label className={labelCls}>Confirm new password</label>
          <div className="relative">
            <input
              type={show.cf ? "text" : "password"}
              className={inputCls}
              value={confirmNew}
              onChange={(e) => setConfirmNew(e.target.value)}
              placeholder="Re-enter new password"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
              onClick={() => setShow((s) => ({ ...s, cf: !s.cf }))}
            >
              {show.cf ? "Hide" : "Show"}
            </button>
          </div>
          {confirmNew && confirmNew !== newPassword && (
            <p className="text-xs text-red-500 mt-1">
              Mật khẩu xác nhận không khớp.
            </p>
          )}
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!valid || submitting}
          className="w-full rounded-xl bg-indigo-600 text-white py-2 disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
