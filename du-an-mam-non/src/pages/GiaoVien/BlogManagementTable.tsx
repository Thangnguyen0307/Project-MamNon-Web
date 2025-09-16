import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { DeleteUserIcon, EditUserIcon } from "../../icons";
import Pagination from "../../components/common/Pagination";

export interface author {
  id: string;
  email: string;
  fullName: string;
}

export interface Level {
  _id: string;
  name: string;
}

interface ClassInfo {
  id: string;
  name: string;
  level: Level;
}

export interface BlogsData {
  id: string;
  title: string;
  content: string;
  images: string[];
  author: author;
  class: ClassInfo;
  createdAt: string;
  updatedAt: string;
}

interface TableProps {
  data: BlogsData[];
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
// Define the table data using the interface

export const BlogsManagementTable: React.FC<TableProps> = ({
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
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Tiêu đề
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Email người đăng
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Họ tên người đăng
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Lớp học
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Khối lớp học
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
              {data.map((item: BlogsData) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.title.toUpperCase()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.author.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.author.fullName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.class?.name ?? "Chưa có lớp học"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.class?.level?.name.toUpperCase() ??
                      "Chưa có khối lớp học"}
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
            <div>Chưa có dữ liệu</div>
          )}
        </Table>
        {/* Pagination */}
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
