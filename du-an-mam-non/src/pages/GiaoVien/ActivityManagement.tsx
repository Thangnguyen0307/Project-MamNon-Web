import React from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import ActivityManagementTable from "./ActivityManagementTable";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ActivityManagementFilter from "./ActivityManagementFilter";

const ActivityManagement: React.FC = () => {
  return (
    <>
      <PageMeta title="Quan Ly Mam Non" description="Quan Ly Mam Non" />
      <PageBreadcrumb pageTitle="Giáo Viên Quản Lý Hoạt Động" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách hoạt động"
          button={<Button>Thêm hoạt động</Button>}
          filter={<ActivityManagementFilter />}>
          <ActivityManagementTable />
        </ComponentCard>
      </div>
    </>
  );
};

export default ActivityManagement;
