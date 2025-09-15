import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import UserManagementTable from "./UserManagementTable";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import UserManagementFilter from "./UserManagementFilter";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const UserManagement = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const role = [
    { value: "ADMIN", label: "Admin" },
    { value: "TEACHER", label: "Teacher" },
  ];
  const [userData, setUserData] = useState({
    email: "",
    role: "",
    error: "",
  });

  const clearData = () => {
    setUserData({
      email: "",
      role: "",
      error: "",
    });
  };

  const handleValueChange = (key: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log(userData);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Thêm logic thêm giáo viên vào bảng
    closeModal();
    try {
      const response = await axiosInstance.post(
        API_PATHS.ADMIN.CREATE_ACCOUNT,
        {
          email: userData.email,
          role: userData.role,
        }
      );

      if (response) {
        toast.success("Tạo tài khoản thành công");
        clearData();
      }

      console.log(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <PageMeta title="Quan Ly Mam Non" description="Quan Ly Mam Non" />
      <PageBreadcrumb pageTitle="Giáo Vụ Quản Lý Người Dùng" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách người dùng"
          button={<Button onClick={openModal}>Thêm giáo viên</Button>}
          filter={<UserManagementFilter />}>
          <UserManagementTable />
        </ComponentCard>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[500px] m-4">
          <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 text-center">
                Đăng ký giáo viên mới
              </h4>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="text"
                      placeholder="Vui lòng nhập email"
                      onChange={({ target }) => {
                        handleValueChange(target.name, target.value);
                      }}
                      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required={true}
                    />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select
                      name="role"
                      options={role}
                      placeholder="Vui lòng chọn role người dùng"
                      onChange={(name, value) => handleValueChange(name, value)}
                      className="dark:bg-dark-900  "
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={closeModal}>
                  Hủy
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  className="bg-brand-500 text-white">
                  Đăng ký
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserManagement;
