import React, { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useModal } from "../../hooks/useModal";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { BlogsManagementTable } from "./BlogManagementTable";
import BlogManagementFilter from "./BlogManagementFilter";

const BlogManagement: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const defaultLevelsParam = {
    id: "",
    title: "",
    content: "",
    images: [],
    author: {
      id: "",
      email: "",
      fullName: "",
    },
    class: "",
    createdAt: "",
    updatedAt: "",
  };
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [blogsParam, setBlogsParam] = useState(defaultLevelsParam);

  useEffect(() => {
    fetchAllBlogs();
  }, [pagination.page]);

  const handleValueChange = (key: string, value: string) => {
    setBlogsParam((prev) => ({
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
    setBlogsParam(defaultLevelsParam);
    openModal();
  };

  const modalUpdate = (id: string) => {
    setSelectedItem(id);
    fetchDetailBlogs(id);
    openModal();
  };

  const fetchAllBlogs = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.BLOG.GET_ALL_BLOGS}?page=${pagination.page}&limit=${pagination.limit}`
      );

      if (response.data.data.blogs?.length > 0) {
        setBlogsData(response.data.data.blogs);
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

  const fetchDetailBlogs = async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.LEVELS.DETAIL_LEVEL(id)
      );
      if (response.data.data) {
        toast.success("Lấy dữ liệu chi tiết khối lợp học thành công");
        setBlogsParam(response.data.data);
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
            name: blogsParam.id,
          }
        );
        if (response) {
          toast.success("Tạo khối lớp học thành công");
          fetchAllBlogs();
        }
      } else {
        const response = await axiosInstance.put(
          API_PATHS.LEVELS.UPDATE_LEVEL(selectedItem),
          {
            name: blogsParam.id,
          }
        );
        if (response) {
          toast.success("Cập nhật khối lớp học thành công");
          fetchAllBlogs();
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
        fetchAllBlogs();
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
      <PageBreadcrumb pageTitle="Giáo Viên Quản Lý Bài Viết" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách bài viết"
          button={
            <Button className="max-sm:text-xs" onClick={modalCreate}>
              Thêm bài viết
            </Button>
          }
          filter={<BlogManagementFilter />}>
          <BlogsManagementTable
            data={blogsData}
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
                Thêm thông tin hoạt động
              </h4>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                <div>
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Social Links
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div>
                      <Label>Facebook</Label>
                      <Input
                        type="text"
                        value="https://www.facebook.com/PimjoHQ"
                        onChange={({ target }) => {
                          handleValueChange(target.name, target.value);
                        }}
                      />
                    </div>

                    <div>
                      <Label>X.com</Label>
                      <Input type="text" value="https://x.com/PimjoHQ" />
                    </div>

                    <div>
                      <Label>Linkedin</Label>
                      <Input
                        type="text"
                        value="https://www.linkedin.com/company/pimjo"
                      />
                    </div>

                    <div>
                      <Label>Instagram</Label>
                      <Input
                        type="text"
                        value="https://instagram.com/PimjoHQ"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-7">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Personal Information
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>First Name</Label>
                      <Input type="text" value="Musharof" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Last Name</Label>
                      <Input type="text" value="Chowdhury" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Email Address</Label>
                      <Input type="text" value="randomuser@pimjo.com" />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <Label>Phone</Label>
                      <Input type="text" value="+09 363 398 46" />
                    </div>

                    <div className="col-span-2">
                      <Label>Bio</Label>
                      <Input type="text" value="Team Manager" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
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

export default BlogManagement;
