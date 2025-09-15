import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import dayjs from "dayjs";
import { DeleteUserIcon, EditUserIcon } from "../../icons";
import Pagination from "../../components/common/Pagination";

export interface LevelsData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface TableProps {
  data: LevelsData[];
  modalUpdate: (id: string) => void;
  deleteData: (id: string) => void;
}

// Define the table data using the interface

export const GradeManagementTable: React.FC<TableProps> = ({
  data,
  modalUpdate,
  deleteData,
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
                Tên khối lớp học
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Ngày Tạo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Ngày cập nhật
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
              {data.map((item: LevelsData) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {item.name.toUpperCase()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-black text-start text-theme-sm dark:text-gray-400">
                    {dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm")}
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
        <Pagination total={20} limit={5} />
      </div>
    </div>
  );
};
