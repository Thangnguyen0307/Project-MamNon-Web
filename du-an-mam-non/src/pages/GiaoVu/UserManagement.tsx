import React, { useEffect, useState } from "react";
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
import { toBoolean } from "../../utils/helper";

const UserManagement = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const role = [
    { value: "ADMIN", label: "Admin" },
    { value: "TEACHER", label: "Teacher" },
  ];
  const status = [
    { value: true, label: "Hoạt động" },
    { value: false, label: "Khoá" },
  ];
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [selectedType, setSelectedType] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const defaultUsersParam = {
    id: "",
    email: "",
    role: "",
    fullName: "",
    isActive: "",
  };
  const [usersParam, setUsersParam] = useState(defaultUsersParam);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleValueChange = (key: string, value: string) => {
    setUsersParam((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const modalCreate = () => {
    setSelectedItem(null);
    setUsersParam(defaultUsersParam);
    openModal();
  };

  const modalUpdate = (id: string, type: string) => {
    setSelectedItem(id);
    if (type === "changeStatus") {
      setSelectedType(type);
    } else if (type === "changeRole") {
      setSelectedType(type);
    } else {
      return;
    }
    openModal();
  };

  const fetchAllUsers = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.ADMIN.GET_ALL_USER);
      if (response.data?.length > 0) {
        setUserData(response.data);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const changeRoleUser = async (id: string) => {
    if (loading) return;
    setLoading(true);
    console.log(usersParam.role);

    try {
      const response = await axiosInstance.put(
        API_PATHS.ADMIN.CHANGE_ROLE(id),
        {
          role: usersParam.role,
        }
      );
      if (response.data) {
        toast.success("Đổi role tài khoản thành công");
        fetchAllUsers();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const changeStatusUser = async (id: string) => {
    if (loading) return;
    try {
      const response = await axiosInstance.put(
        API_PATHS.ADMIN.CHANGE_STATUS(id),
        {
          isActive: toBoolean(usersParam.isActive),
        }
      );

      if (response.data) {
        toast.success("Đổi status tài khoản thành công");
        fetchAllUsers();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    try {
      if (!selectedItem) {
        const response = await axiosInstance.post(
          API_PATHS.ADMIN.CREATE_ACCOUNT,
          {
            email: usersParam.email,
            role: usersParam.role,
          }
        );
        if (response.data) {
          toast.success("Tạo tài khoản người dùng thành công");
          fetchAllUsers();
        }
      } else if (selectedItem && selectedType === "changeStatus") {
        changeStatusUser(selectedItem);
      } else if (selectedItem && selectedType === "changeRole") {
        changeRoleUser(selectedItem);
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

  return (
    <>
      <PageMeta title="Quan Ly Mam Non" description="Quan Ly Mam Non" />
      <PageBreadcrumb pageTitle="Giáo Vụ Quản Lý Người Dùng" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách người dùng"
          button={<Button onClick={modalCreate}>Thêm giáo viên</Button>}
          filter={<UserManagementFilter />}>
          <UserManagementTable data={userData} modalUpdate={modalUpdate} />
        </ComponentCard>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[500px] m-4">
          <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 text-center">
                {!selectedItem
                  ? "Đăng ký người dùng mới"
                  : selectedType === "changeStatus"
                  ? "Đổi trạng thái tài khoản người dùng"
                  : selectedType === "changeRole"
                  ? "Đổi Role tài khoản người dùng"
                  : ""}
              </h4>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  {!selectedItem && (
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
                  )}
                  {selectedItem && (
                    <>
                      {selectedType === "changeRole" && (
                        <div>
                          <Label>Role</Label>
                          <Select
                            name="role"
                            options={role}
                            placeholder="Vui lòng chọn trạng thái người dùng"
                            onChange={(name, value) =>
                              handleValueChange(name, value)
                            }
                            className="dark:bg-dark-900  "
                          />
                        </div>
                      )}
                      {selectedType === "changeStatus" && (
                        <div>
                          <Label>Status</Label>
                          <Select
                            name="isActive"
                            options={status}
                            placeholder="Vui lòng chọn trạng thái người dùng"
                            onChange={(name, value) =>
                              handleValueChange(name, value)
                            }
                            className="dark:bg-dark-900  "
                          />
                        </div>
                      )}
                    </>
                  )}
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
                  {!selectedItem ? "Tạo mới" : "Cập nhật"}
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
