import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { DeleteUserIcon, EditUserIcon } from "../../icons";
import Pagination from "../../components/common/Pagination";

interface ClassItem {
  id: string | number;
  name: string;
  level?: string;
  teachers?: { id: string; full_name: string }[];
  schoolYear?: string;
  status?: string;
}

export default function ClassManagementTable({
  onDelete,
  onEdit,
}: {
  onDelete?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
}) {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<ClassItem | null>(null);

  // Lấy danh sách lớp học từ API
  useEffect(() => {
    setLoading(true);
    fetch("/api/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Hàm lấy thông tin lớp học theo id
  const fetchClassById = async (id: string | number) => {
    try {
      const res = await fetch(`/api/classes/${id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedClass(data);
        alert(`Thông tin lớp học:\n${JSON.stringify(data, null, 2)}`);
      } else {
        alert("Không tìm thấy lớp học!");
      }
    } catch (err) {
      alert("Có lỗi khi lấy thông tin lớp học!");
    }
  };

  // Hàm cập nhật thông tin lớp học
  const handleEditClass = async (id: string | number) => {
    try {
      const res = await fetch(`/api/classes/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEditMode(true);
        setEditData({ ...data });
      } else {
        alert("Không tìm thấy lớp học!");
      }
    } catch (err) {
      alert("Có lỗi khi lấy thông tin lớp học!");
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      try {
        const res = await fetch(`/api/classes/${editData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        });
        if (res.ok) {
          // Reload lại danh sách lớp học
          fetch("/api/classes")
            .then((res) => res.json())
            .then((data) => setClasses(data));
          setEditMode(false);
          setEditData(null);
          alert("Cập nhật lớp học thành công!");
        } else {
          alert("Cập nhật lớp học thất bại!");
        }
      } catch (err) {
        alert("Có lỗi khi cập nhật lớp học!");
      }
    }
  };

  // Hàm xóa lớp học
  const handleDeleteClass = async (id: string | number) => {
    try {
      const res = await fetch(`/api/classes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setClasses((prev) => prev.filter((cls) => cls.id !== id));
        alert("Đã xóa lớp học!");
      } else {
        alert("Xóa lớp học thất bại!");
      }
    } catch (err) {
      alert("Có lỗi khi xóa lớp học!");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Tên lớp học
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Khối lớp
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Giáo viên
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Năm học
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Trạng thái
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : classes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                  Không có lớp học nào.
                </TableCell>
              </TableRow>
            ) : (
              classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell
                    className="px-5 py-4 text-start font-medium text-gray-800 text-theme-sm dark:text-white/90 cursor-pointer hover:underline"
                    onClick={() => fetchClassById(cls.id)}
                    title="Xem chi tiết lớp học"
                  >
                    {cls.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {cls.level || "-"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {cls.teachers && cls.teachers.length > 0
                      ? cls.teachers.map((t) => t.full_name).join(", ")
                      : "-"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {cls.schoolYear || "-"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        cls.status === "Active"
                          ? "success"
                          : cls.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {cls.status || "Chưa xác định"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center">
                    <div className="flex items-center gap-5 justify-center">
                      <button
                        type="button"
                        title="Cập nhật thông tin"
                        className="text-lg hover:cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
                        onClick={() => handleEditClass(cls.id)}
                      >
                        <EditUserIcon />
                      </button>
                      <button
                        type="button"
                        title="Xóa lớp học"
                        className="btn btn-success btn-update-event flex justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                        onClick={() => handleDeleteClass(cls.id)}
                      >
                        <DeleteUserIcon />
                        <span className="ml-2">Xóa</span>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* Popup cập nhật thông tin lớp học */}
        {editMode && editData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
              <h3 className="text-lg font-bold mb-4">Cập nhật lớp học</h3>
              <form onSubmit={handleSaveEdit} className="flex flex-col gap-3">
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  placeholder="Tên lớp học"
                  required
                />
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={editData.level || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, level: e.target.value })
                  }
                  placeholder="Khối lớp"
                />
                <input
                  className="border rounded px-2 py-1"
                  type="text"
                  value={editData.schoolYear || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, schoolYear: e.target.value })
                  }
                  placeholder="Năm học"
                />
                <div className="flex gap-2 justify-end mt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-300 text-gray-700"
                    onClick={() => {
                      setEditMode(false);
                      setEditData(null);
                    }}
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-500 text-white"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* <Pagination total={classes.length} limit={10} /> */}
      </div>
    </div>
  );
}
