import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import { axiosInstance } from "../../utils/axiosInstance";
import { useUser } from "../../context/UserContext";
import { AxiosError } from "axios";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Vui lòng nhập email đúng định dạng abc@example");
      return;
    }

    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        updateUser(user);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1  rounded-2xl">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <ChevronLeftIcon className="size-5" />
          Trang chủ
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto ">
        <div className="border border-gray-200 rounded-2xl shadow-2xl p-5 bg-white">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Đăng nhập
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nhập mật khẩu và tài khoản đã được cấp
            </p>
          </div>
          <div className="">
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div className="mb-3">
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>
                <div className="mb-2">
                  <Label>
                    Mật khẩu <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Vui lòng nhập mật khẩu"
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
                <div className="flex items-center justify-between">
                  <Link
                    to="/resetpassword"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">
                    Quên mật khẩu ?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit">
                    Đăng nhập
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
