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

interface Teacher {
  userid: string;
  password: string;
  full_name: string;
  role: string;
}

const tableData: Teacher[] = [
  {
    userid: "gv001",
    password: "123456",
    full_name: "Nguyễn Văn An",
    role: "Giáo viên",
  },
  {
    userid: "gv002",
    password: "abcdef",
    full_name: "Trần Thị Bình",
    role: "Quản trị viên",
  },
  {
    userid: "gv003",
    password: "qwerty",
    full_name: "Phạm Văn Cường",
    role: "Giáo viên",
  },
  {
    userid: "gv004",
    password: "654321",
    full_name: "Lê Thị Dung",
    role: "Giáo viên",
  },
  {
    userid: "gv005",
    password: "password",
    full_name: "Hoàng Văn Em",
    role: "Quản trị viên",
  },
];

const UserManagementTable: React.FC = () => {
  const [data, setData] = React.useState(tableData);
  const handleDelete = (userid: string) => {
    setData(data.filter((teacher) => teacher.userid !== userid));
  };
  const handleRole = (teacher: Teacher) => {
    alert("Phân quyền cho " + teacher.full_name);
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                UserID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Mật khẩu
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Họ tên
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Phân quyền
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((teacher) => (
              <TableRow key={teacher.userid}>
                <TableCell className="px-4 py-3 text-center">
                  {teacher.userid}
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                  {teacher.password}
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                  {teacher.full_name}
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                  {teacher.role}
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                  <div className="flex items-center gap-5 justify-center">
                    <span
                      className="text-lg hover:cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
                      onClick={() => handleRole(teacher)}>
                      <EditUserIcon />
                    </span>
                    <span
                      className="text-lg hover:cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
                      onClick={() => handleDelete(teacher.userid)}>
                      <DeleteUserIcon />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <Pagination total={20} />
      </div>
    </div>
  );
};

export default UserManagementTable;
