import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { EyeCloseIcon, EyeIcon } from "../../icons";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user, updateUser } = useUser();
  const [typeModal, setTypeModal] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [paramsUserInfo, setParamsUserInfo] = useState({
    fullName: user?.fullName,
    email: user?.email,
    otpCode: "",
    newPassword: "",
    currentPassword: "",
  });
  const handleValueChange = (key: string, value: string) => {
    setParamsUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (typeModal === "updateprofile") {
        const response = await axiosInstance.put(API_PATHS.USER.UPDATE_USER, {
          fullName: paramsUserInfo.fullName,
        });

        if (response.data) {
          updateUser({
            ...user!,
            fullName: response.data.fullName,
          });
          closeModal();
          toast.success("Cập nhật tài khoản thành công");
        }
      } else if (typeModal === "updatepassword") {
        const response = await axiosInstance.put(
          API_PATHS.AUTH.UPDATE_PASSWORD,
          {
            currentPassword: paramsUserInfo.currentPassword,
            newPassword: paramsUserInfo.newPassword,
          }
        );

        if (response.data) {
          toast.success("Cập nhật mật khẩu thành công");
          closeModal();
        }
      } else {
        return;
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleUpdateProfile = () => {
    setTypeModal("updateprofile");
    openModal();
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(API_PATHS.USER.DELETE_USER);
      if (response) {
        toast.success("Xoá tài khoản thành công");
        closeModal();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const updatePassword = async () => {
    setTypeModal("updatepassword");
    openModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Thông tin tài khoản
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Họ và tên
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.fullName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-8 gap-3 justify-end">
        <button
          onClick={handleUpdateProfile}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Cập nhật hồ sơ
        </button>
        <button
          onClick={updatePassword}
          className="flex w-full  items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Thay đổi mật khẩu
        </button>

        <button
          onClick={handleDelete}
          className="flex w-full  items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Xoá tài khoản
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Cập nhật thông tin tài khoản
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                  {typeModal === "updateprofile" ? (
                    <div>
                      <Label>Họ và tên</Label>
                      <Input
                        placeholder="Nhập họ và tên"
                        value={paramsUserInfo.fullName}
                        name="fullName"
                        type="text"
                        onChange={({ target }) => {
                          handleValueChange(target.name, target.value);
                        }}
                      />
                    </div>
                  ) : typeModal === "updatepassword" ? (
                    <div>
                      <Label>Mật khẩu hiện tại</Label>
                      <div className="relative">
                        <Input
                          placeholder="Nhập mật khẩu hiện tại"
                          name="currentPassword"
                          type={showPassword ? "text" : "password"}
                          onChange={({ target }) => {
                            handleValueChange(target.name, target.value);
                          }}
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
                      <Label>Mật khẩu mới</Label>
                      <div className="relative">
                        <Input
                          placeholder="Nhập mật khẩu muốn thay đổi"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          onChange={({ target }) => {
                            handleValueChange(target.name, target.value);
                          }}
                        />
                        <span
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                          {showNewPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Đóng
              </Button>
              <Button size="sm" onClick={handleSave}>
                Cập nhật
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
