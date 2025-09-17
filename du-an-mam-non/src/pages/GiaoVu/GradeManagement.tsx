import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { GradeManagementTable } from "./GradeManagementTable";
import dayjs from "dayjs";

const GradeManagement: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [levelsData, setLevelsData] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const defaultLevelsParam = {
    name: "",
    createdAt: "",
    updatedAt: "",
  };
  const [levelsParam, setLevelsParam] = useState(defaultLevelsParam);

  useEffect(() => {
    fetchAllLevels();
  }, [pagination.page]);

  const handleValueChange = (key: string, value: string) => {
    setLevelsParam((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const setPage = (key: string, value: number) => {
    setPagination((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const modalCreate = () => {
    setSelectedItem(null);
    setLevelsParam(defaultLevelsParam);
    openModal();
  };

  const modalUpdate = (id: string) => {
    setSelectedItem(id);
    fetchDetailLevels(id);
    openModal();
  };

  const fetchAllLevels = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.LEVELS.GET_ALL_LEVELS}?page=${pagination.page}&limit=${pagination.limit}`
      );

      if (response.data.data.levels?.length > 0) {
        setLevelsData(response.data.data.levels);
        setPagination(response.data.data.pagination);
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

  const fetchDetailLevels = async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.LEVELS.DETAIL_LEVEL(id)
      );
      if (response.data.data) {
        toast.success("Lấy dữ liệu chi tiết khối lợp học thành công");
        setLevelsParam(response.data.data);
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
          API_PATHS.LEVELS.CREATE_LEVEL,
          {
            name: levelsParam.name,
          }
        );
        if (response) {
          toast.success("Tạo khối lớp học thành công");
          fetchAllLevels();
        }
      } else {
        const response = await axiosInstance.put(
          API_PATHS.LEVELS.UPDATE_LEVEL(selectedItem),
          {
            name: levelsParam.name,
          }
        );
        if (response) {
          toast.success("Cập nhật khối lớp học thành công");
          fetchAllLevels();
        }
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleDelete = async (id: string) => {
    setSelectedItem(id);
    try {
      const response = await axiosInstance.delete(
        API_PATHS.LEVELS.DELETE_LEVEL(id)
      );
      if (response) {
        toast.success("Xoá khối lớp học thành công");
        fetchAllLevels();
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
      <PageBreadcrumb pageTitle="Giáo Vụ Quản Lý Khối Lớp Học" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách khối lớp học"
          button={<Button onClick={modalCreate}>Thêm khối lớp học</Button>}>
          <GradeManagementTable
            data={levelsData}
            modalUpdate={modalUpdate}
            deleteData={handleDelete}
            setPage={setPage}
            pagination={pagination}
          />
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[500px] m-4">
            <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 text-center">
                  {!selectedItem ? "Thêm khối lớp học mới" : "Chi tiết lớp học"}
                </h4>
              </div>
              {loading ? (
                <p className="text-center">Đang tải dữ liệu...</p>
              ) : (
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                      <div>
                        <Label>Tên khối lớp học</Label>
                        <Input
                          value={levelsParam.name ?? ""}
                          name="name"
                          type="text"
                          placeholder="Vui lòng nhập tên khối lớp học"
                          onChange={({ target }) => {
                            handleValueChange(target.name, target.value);
                          }}
                          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          required={true}
                        />
                      </div>
                      {selectedItem ? (
                        <>
                          <div>
                            <Label>Ngày tạo</Label>
                            <Input
                              value={
                                dayjs(levelsParam?.createdAt).format(
                                  "DD/MM/YYYY HH:mm"
                                ) ?? ""
                              }
                              name="name"
                              type="text"
                              disabled={true}
                              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                              required={true}
                            />
                          </div>
                          <div>
                            <Label>Ngày cập nhật</Label>
                            <Input
                              value={
                                dayjs(levelsParam?.updatedAt).format(
                                  "DD/MM/YYYY HH:mm"
                                ) ?? ""
                              }
                              name="name"
                              type="text"
                              disabled={true}
                              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                              required={true}
                            />
                          </div>
                        </>
                      ) : (
                        ""
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
              )}
            </div>
          </Modal>
        </ComponentCard>
      </div>
    </>
  );
};

export default GradeManagement;
