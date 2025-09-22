import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import { axiosInstance } from "../../utils/axiosInstance";
import { AxiosError } from "axios";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(
        `${API_PATHS.AUTH.SEND_OTP}?type=RESET_PASSWORD`,
        {
          email,
        }
      );

      if (response.data) {
        console.log(response.data);
        navigate("/createnewpassword");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ChevronLeftIcon className="size-5" />
          Trang chủ
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="border border-gray-200 rounded-2xl shadow-2xl p-5 bg-white">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Quên mật khẩu ?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vui lòng nhập gmail để chúng tôi cung cấp mã OTP xác thực cấp lại
              mật khẩu
            </p>
          </div>
          <div>
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-xs pb-2.5">{error}</p>
                )}
                <div>
                  <Button className="w-full" size="sm" type="submit">
                    Gửi mã OTP
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
