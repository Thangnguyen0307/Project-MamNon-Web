import { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import {senOtp, resetPassword} from "../../services/authService";
import { validateEmail } from "../../utils/helper";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"send"|"verify">("send");
  const [message, setMessage] = useState<string>("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage("Email không hợp lệ");
      return;
    }
    try {
      const res = await sendOtp({ email });
      setMessage(res?.message || "Đã gửi OTP về email");
      setStep("verify");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Không thể gửi OTP");
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ email, otp, newPassword });
      setMessage(res?.message || "Đổi mật khẩu thành công, hãy đăng nhập");
      setOtp("");
      setNewPassword("");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {step === "send" && (
        <form onSubmit={handleSendOtp} className="space-y-3">
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e:any)=>setEmail(e.target.value)} placeholder="your@email.com" />
          </div>
          <Button type="submit">Gửi OTP</Button>
        </form>
      )}

      {step === "verify" && (
        <form onSubmit={handleReset} className="space-y-3">
          <div>
            <Label>OTP</Label>
            <Input value={otp} onChange={(e:any)=>setOtp(e.target.value)} placeholder="Nhập mã OTP" />
          </div>
          <div>
            <Label>Mật khẩu mới</Label>
            <Input type="password" value={newPassword} onChange={(e:any)=>setNewPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button type="submit">Đặt lại mật khẩu</Button>
        </form>
      )}
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
}
