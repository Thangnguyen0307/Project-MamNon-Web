import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <>
      <PageMeta title="Reset Password" />
      <AuthLayout title="Đặt lại mật khẩu" subtitle="Nhập email, OTP và mật khẩu mới">
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
}
