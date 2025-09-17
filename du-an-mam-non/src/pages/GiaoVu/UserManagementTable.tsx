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
import Badge from "../../components/ui/badge/Badge";

export interface UserData {
  id: string;
  email: string;
  role: string;
  fullName: string;
  isActive: boolean;
}

interface TableProps {
  data: UserData[];
  modalUpdate: (id: string, type: string) => void;
  setPage: (key: string, value: number) => void;
  pagination: Pagination;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const UserManagementTable: React.FC<TableProps> = ({
  data,
  modalUpdate,
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
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Họ và tên
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Role
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Trạng thái
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {data.length > 0 ? (
            data.map((item) => (
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-start">
                    {item.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    {item.fullName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    {item.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <Badge
                      size="md"
                      color={item.isActive === true ? "success" : "error"}>
                      {item.isActive ? (
                        <span>Hoạt động</span>
                      ) : (
                        <span>Khoá</span>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-start text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-5">
                      <span
                        className="text-lg hover:cursor-pointer hover:scale-120 transition-all duration-200 ease-in-out"
                        onClick={() => modalUpdate(item.id, "changeRole")}>
                        <EditUserIcon />
                      </span>
                      <span
                        className="text-lg hover:cursor-pointer hover:scale-120 transition-all duration-200 ease-in-out"
                        onClick={() => modalUpdate(item.id, "changeStatus")}>
                        <DeleteUserIcon />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <tr className="">
              <td colSpan={5} className="px-4 py-3 text-center">
                Không có dữ liệu
              </td>
            </tr>
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

export default UserManagementTable;
