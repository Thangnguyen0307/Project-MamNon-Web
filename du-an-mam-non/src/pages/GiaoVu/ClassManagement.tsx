import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ClassManagementFilter from "./ClassManagementFilter";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ClassManagementTable } from "./ClassManagementTable";
import dayjs from "dayjs";
import Select from "../../components/form/Select";
import { LevelsData } from "./GradeManagementTable";

const ClassManagement: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [classesData, setClassesData] = useState([]);
  const [optionLevels, setOptionLevels] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 1,
    total: 0,
    pages: 0,
  });
  const defaultClassesParam = {
    name: "",
    schoolYear: "",
    level: {
      id: "",
      name: "",
    },
    teacher: [],
    createdAt: "",
    updatedAt: "",
  };
  const [classesParam, setClassesParam] = useState(defaultClassesParam);
  const setPage = (key: string, value: number) => {
    setPagination((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    fetchAllClasses();
  }, [pagination.page]);

  useEffect(() => {
    fetchOptionsLevels();
  }, []);

  const handleValueChange = (key: string, value: string) => {
    if (key === "levelName") {
      setClassesParam((prev) => ({
        ...prev,
        level: { ...prev.level, id: value },
      }));
    } else {
      setClassesParam((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const modalCreate = () => {
    setSelectedItem(null);
    setClassesParam(defaultClassesParam);
    openModal();
  };
  const modalUpdate = (id: string) => {
    setSelectedItem(id);
    fetchDetailClasses(id);
    openModal();
  };

  const fetchOptionsLevels = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.LEVELS.GET_ALL_LEVELS);

      if (response.data.data.levels?.length > 0) {
        const options = response.data.data.levels.map((item: LevelsData) => ({
          value: item.id,
          label: item.name,
        }));
        setOptionLevels(options);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const fetchAllClasses = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.CLASSES.GET_ALL_CLASSES}?page=${pagination.page}&limit=${pagination.limit}`
      );

      if (response.data.data.classes?.length > 0) {
        setClassesData(response.data.data.classes);
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

  const fetchDetailClasses = async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.CLASSES.DETAIL_CLASSES(id)
      );
      if (response.data.data) {
        setClassesParam(response.data.data);
        toast.success("Lấy dữ liệu chi tiết lớp học thành công");
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
          API_PATHS.CLASSES.CREATE_CLASSES,
          {
            name: classesParam.name,
            level: classesParam.level.id,
            schoolYear: classesParam.schoolYear,
          }
        );
        if (response) {
          toast.success("Tạo lớp học thành công");
          fetchAllClasses();
        }
      } else {
        const response = await axiosInstance.put(
          API_PATHS.CLASSES.UPDATE_CLASSES(selectedItem),
          {
            name: classesParam.name,
            level: classesParam.level.id,
            schoolYear: classesParam.schoolYear,
          }
        );
        if (response) {
          toast.success("Cập nhật lớp học thành công");
          fetchAllClasses();
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
        API_PATHS.CLASSES.DETAIL_CLASSES(id)
      );
      if (response) {
        toast.success("Xoá lớp học thành công");
        fetchAllClasses();
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
      <PageBreadcrumb pageTitle="Giáo Vụ Quản Lý Lớp Học" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách lớp học"
          button={<Button onClick={modalCreate}>Thêm lớp học</Button>}
          filter={<ClassManagementFilter />}>
          <ClassManagementTable
            data={classesData}
            modalUpdate={modalUpdate}
            deleteData={handleDelete}
            setPage={setPage}
            pagination={pagination}
          />
        </ComponentCard>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                {!selectedItem ? "Thêm lớp học mới" : "Chi tiết lớp học"}
              </h4>
            </div>
            {loading ? (
              <p className="text-center">Đang tải dữ liệu</p>
            ) : (
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div>
                      <Label>Tên lớp học</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Vui lòng nhập tên lớp học"
                        value={classesParam.name ?? ""}
                        onChange={({ target }) => {
                          handleValueChange(target.name, target.value);
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Label>Khối lớp (level)</Label>
                      <Select
                        name="levelName"
                        defaultValue={classesParam.level.id}
                        options={optionLevels}
                        placeholder="Chọn khối lớp"
                        onChange={(name, value) => {
                          handleValueChange(name, value);
                        }}
                        className="dark:bg-dark-900"
                      />
                    </div>
                    {/* <div>
                    <Label>Giáo viên (ID, cách nhau dấu phẩy)</Label>
                    <Input
                      type="text"
                      value={classesParam.teacher}
                      onChange={({ target }) => {
                        handleValueChange(target.name, target.value);
                      }}
                      placeholder="Ví dụ: id1,id2"
                    />
                  </div> */}
                    <div>
                      <Label>Năm học (schoolYear)</Label>
                      <Input
                        name="schoolYear"
                        type="text"
                        value={classesParam.schoolYear ?? ""}
                        placeholder="Vui lòng chọn niên khoá"
                        onChange={({ target }) => {
                          handleValueChange(target.name, target.value);
                        }}
                        required
                      />
                    </div>
                    {selectedItem && (
                      <>
                        <div>
                          <Label>Ngày tạo</Label>
                          <Input
                            name="createdAt"
                            type="text"
                            value={
                              dayjs(classesParam?.createdAt).format(
                                "DD/MM/YYYY HH:mm"
                              ) ?? ""
                            }
                            onChange={({ target }) => {
                              handleValueChange(target.name, target.value);
                            }}
                            disabled
                            required
                          />
                        </div>
                        <div>
                          <Label>Ngày cập nhật</Label>
                          <Input
                            name="updatedAt"
                            type="text"
                            value={
                              dayjs(classesParam?.updatedAt).format(
                                "DD/MM/YYYY HH:mm"
                              ) ?? ""
                            }
                            onChange={({ target }) => {
                              handleValueChange(target.name, target.value);
                            }}
                            disabled
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={closeModal}
                    type="button"
                    disabled={loading}>
                    Đóng
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
      </div>
    </>
  );
};

export default ClassManagement;
