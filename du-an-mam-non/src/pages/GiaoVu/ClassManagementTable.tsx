import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { DeleteUserIcon, EditUserIcon } from "../../icons";
import Pagination from "../../components/common/Pagination";
import { LevelsData } from "./GradeManagementTable";

export interface Teacher {
  id: string;
  fullName: string;
}
export interface ClassesData {
  id: string;
  name: string;
  schoolYear: string;
  level: LevelsData;
  teachers: Teacher[];
  createdAt: string;
  updatedAt: string;
}

interface TableProps {
  data: ClassesData[];
  modalUpdate: (id: string) => void;
  deleteData: (id: string) => void;
  setPage: (key: string, value: number) => void;
  pagination: Pagination;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const ClassManagementTable: React.FC<TableProps> = ({
  data,
  modalUpdate,
  deleteData,
  setPage,
  pagination,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Tên lớp học
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Khối lớp
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Giáo viên
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Năm học
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          {data?.length > 0 ? (
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item: ClassesData) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.name.toUpperCase()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.level.name.toUpperCase()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.teachers.length > 0
                      ? item.teachers.map((teacher: Teacher) => {
                          return <p key={teacher.id}>{teacher.fullName}</p>;
                        })
                      : "Chưa phân công giáo viên"}{" "}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.schoolYear}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-5">
                      <span
                        className="text-lg hover:cursor-pointer hover:scale-120 transition-all duration-200 ease-in-out"
                        onClick={() => modalUpdate(item.id)}>
                        <EditUserIcon />
                      </span>
                      <span
                        className="text-lg hover:cursor-pointer hover:scale-120 transition-all duration-200 ease-in-out"
                        onClick={() => deleteData(item.id)}>
                        <DeleteUserIcon />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <tr className="">
              <td colSpan={5} className="px-4 py-3 text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </Table>

        <Pagination
          total={pagination.total}
          limit={pagination.limit}
          current={pagination.page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
