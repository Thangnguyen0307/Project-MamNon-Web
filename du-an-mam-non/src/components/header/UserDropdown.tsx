import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useUser } from "../../context/UserContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS, BASE_URL_MEDIA } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { EyeIcon, KeyRound, PencilLine, Trash } from "lucide-react";
import { EyeCloseIcon } from "../../icons";
import { useModal } from "../../hooks/useModal";
import Button from "../ui/button/Button";
import ComponentCard from "../common/ComponentCard";
import FileInput from "../form/input/FileInput";

export default function UserDropdown() {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const { clearUser, user, updateUser } = useUser();
  const { isOpen, openModal, closeModal } = useModal();
  const [typeModal, setTypeModal] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avtFile, setAvtFile] = useState<File | null>(null);
  const [paramsUserInfo, setParamsUserInfo] = useState({
    fullName: user?.fullName,
    email: user?.email,
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
        let responseAvt;
        if (avtFile) {
          const formData = new FormData();
          formData.append("images", avtFile);
          responseAvt = await axiosInstance.post(
            API_PATHS.IMAGES.UPLOAD_AVT,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        if (response.data && (!avtFile || responseAvt?.data)) {
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
      } else if (typeModal === "deleteaccount") {
        const response = await axiosInstance.delete(API_PATHS.USER.DELETE_USER);
        if (response) {
          toast.success("Xoá tài khoản thành công");
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
    setTypeModal("deleteaccount");
    openModal();
  };

  const updatePassword = async () => {
    setTypeModal("updatepassword");
    openModal();
  };
  function toggleDropdown() {
    setIsOpenDropDown(!isOpenDropDown);
  }

  function closeDropdown() {
    setIsOpenDropDown(false);
  }

  const handleFileChange = (files: File[] | null) => {
    if (!files || files.length === 0) return;
    setAvtFile(files[0]);
  };

  const handleLogOut = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOG_OUT, {
        refreshToken: localStorage.getItem("refreshToken"),
      });
      if (response) {
        clearUser();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400">
          <span className="block mr-1 font-medium text-theme-sm">
            {user?.fullName}
          </span>
          <svg
            className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
              isOpenDropDown ? "rotate-180" : ""
            }`}
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {user?.avatarUrl ? (
            <span className="ml-3 overflow-hidden rounded-full h-11 w-11">
              <img src={`${BASE_URL_MEDIA}${user?.avatarUrl}`} alt="User" />
            </span>
          ) : (
            <span className="ml-3 overflow-hidden rounded-full h-11 w-11">
              <img src={"/images/user/avt-user.png"} alt="User" />
            </span>
          )}
        </button>

        <Dropdown
          isOpen={isOpenDropDown}
          onClose={closeDropdown}
          className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
          <div className="px-3">
            <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
              {user?.fullName}
            </span>
            <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </span>
          </div>

          <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
            <li>
              <button
                onClick={handleUpdateProfile}
                className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                <PencilLine size={18} />
                Cập nhật hồ sơ
              </button>
            </li>
            <li>
              <button
                onClick={updatePassword}
                className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                <KeyRound size={18} />
                Thay đổi mật khẩu
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                <Trash size={18} />
                Xoá tài khoản
              </button>
            </li>
          </ul>
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
            <svg
              className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z"
                fill=""
              />
            </svg>
            Đăng xuất
          </button>
        </Dropdown>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {typeModal === "updateprofile"
                ? "Cập nhật thông tin"
                : typeModal === "updatepassword"
                ? "Thay đổi mật khẩu"
                : typeModal === "deleteaccount"
                ? "Bạn có chắc chắn xoá tài khoản"
                : ""}
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
                      <div className="mt-5">
                        <ComponentCard title="Hình ảnh">
                          <div>
                            <Label>Chọn file hình ảnh</Label>
                            <FileInput
                              onFilesSelected={handleFileChange}
                              className="custom-class"
                              multiple
                            />
                          </div>
                        </ComponentCard>
                        {avtFile && (
                          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 mt-2">
                            <div className="relative w-full aspect-square border rounded-lg overflow-hidden">
                              <img
                                src={URL.createObjectURL(avtFile)}
                                className="w-full h-full object-cover"
                              />
                              {/* Nút xóa */}
                              <button
                                type="button"
                                onClick={() => setAvtFile(null)}
                                className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                X
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
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
                {typeModal === "deleteaccount" ? "Đồng ý" : "Cập nhật"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
