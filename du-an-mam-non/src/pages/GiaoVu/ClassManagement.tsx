import React from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import ClassManagementTable from "./ClassManagementTable";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const ClassManagement: React.FC = () => {
  return (
    <>
      <PageMeta title="Quan Ly Mam Non" description="Quan Ly Mam Non" />
      <PageBreadcrumb pageTitle="Giáo Vụ Quản Lý Lớp Học" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh Sách Lớp Học"
          button={<Button>Thêm Lớp Học</Button>}>
          <ClassManagementTable />
        </ComponentCard>
      </div>
    </>
  );
};

export default ClassManagement;
