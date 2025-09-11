import React, { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import UserManagementTable from "./UserManagementTable";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import UserManagementFilter from "./UserManagementFilter";

const UserManagement = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [form, setForm] = useState({ userid: "", password: "", full_name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Thêm logic thêm giáo viên vào bảng
    closeModal();
    setForm({ userid: "", password: "", full_name: "" });
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
          <div className="relative w-full p-4 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900 lg:p-8">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 text-center">
                Đăng ký giáo viên mới
              </h4>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="px-2">
                <div className="grid grid-cols-1 gap-y-5">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      UserID
                    </label>
                    <input
                      name="userid"
                      type="text"
                      placeholder="UserID"
                      value={form.userid}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Mật khẩu
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Mật khẩu"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Họ tên
                    </label>
                    <input
                      name="full_name"
                      type="text"
                      placeholder="Họ tên"
                      value={form.full_name}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
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
