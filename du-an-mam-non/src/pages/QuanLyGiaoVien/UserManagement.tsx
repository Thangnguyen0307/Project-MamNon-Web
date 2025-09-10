import React from "react";
import ComponentCard from "../../components/common/ComponentCard";
import UserManagementTable from "./UserManagementTable";
import Button from "../../components/ui/button/Button";

const UserManagement: React.FC = () => {
  return (
    <div className="space-y-6">
        <ComponentCard 
          title={<span className="text-2xl font-bold text-gray-800">Danh Sách Giáo Viên</span>}
          button={<Button>Thêm Giáo Viên</Button>}>
          <UserManagementTable />
        </ComponentCard>
    </div>
  );
};

export default UserManagement;
