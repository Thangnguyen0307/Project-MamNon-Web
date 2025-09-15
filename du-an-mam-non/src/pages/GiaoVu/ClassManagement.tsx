import React, { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import ClassManagementTable from "./ClassManagementTable";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ClassManagementFilter from "./ClassManagementFilter";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";

const API_URL = "/api/classes";

const defaultNewClass = {
  name: "",
  level: "",
  teachers: [],
  schoolYear: "",
};

const ClassManagement: React.FC = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [classes, setClasses] = useState<any[]>([]);
  const [newClass, setNewClass] = useState(defaultNewClass);
  const [loading, setLoading] = useState(false);

  // Call API tạo lớp học mới
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClass),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setClasses((prev) => [...prev, result.data]);
        closeModal();
        setNewClass(defaultNewClass);
        alert(result.message || "Tạo lớp học thành công!");
      } else {
        alert(result.message || "Tạo lớp học thất bại!");
      }
    } catch (err) {
      alert("Có lỗi xảy ra khi tạo lớp học!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Quan Ly Mam Non" description="Quan Ly Mam Non" />
      <PageBreadcrumb pageTitle="Giáo Vụ Quản Lý Lớp Học" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách lớp học"
          button={<Button onClick={openModal}>Thêm lớp học</Button>}
          filter={<ClassManagementFilter />}>
          <ClassManagementTable classes={classes} />
        </ComponentCard>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Thêm lớp học mới
              </h4>
            </div>
            <form className="flex flex-col" onSubmit={handleSave}>
              <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Tên lớp học</Label>
                    <Input
                      type="text"
                      value={newClass.name}
                      onChange={(e) =>
                        setNewClass({ ...newClass, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Khối lớp (level)</Label>
                    <Input
                      type="text"
                      value={newClass.level}
                      onChange={(e) =>
                        setNewClass({ ...newClass, level: e.target.value })
                      }
                      required
                      placeholder="Nhập hoặc chọn ID khối lớp"
                    />
                  </div>
                  <div>
                    <Label>Giáo viên (ID, cách nhau dấu phẩy)</Label>
                    <Input
                      type="text"
                      value={newClass.teachers.join(",")}
                      onChange={(e) =>
                        setNewClass({
                          ...newClass,
                          teachers: e.target.value
                            .split(",")
                            .map((id) => id.trim())
                            .filter((id) => id),
                        })
                      }
                      placeholder="Ví dụ: id1,id2"
                    />
                  </div>
                  <div>
                    <Label>Năm học (schoolYear)</Label>
                    <Input
                      type="text"
                      value={newClass.schoolYear}
                      onChange={(e) =>
                        setNewClass({ ...newClass, schoolYear: e.target.value })
                      }
                      required
                    />
                  </div>
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
                <Button size="sm" type="submit" disabled={loading}>
                  {loading ? "Đang lưu..." : "Thêm lớp học"}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ClassManagement;
