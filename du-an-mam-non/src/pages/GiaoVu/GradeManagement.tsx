import React from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import GradeManagementTable from "./GradeManagementTable";
import GradeManagementFilter from "./GradeManagementFilter";

const GradeManagement: React.FC = () => {
  return (
    <>
      <PageMeta title="Quan Ly Mam Non" description="Quan Ly Mam Non" />
      <PageBreadcrumb pageTitle="Giáo Vụ Quản Lý Khối Lớp Học" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách khối lớp học"
          button={<Button>Thêm khối lớp học</Button>}>
          filter={<GradeManagementFilter />}
          <GradeManagementTable />
        </ComponentCard>
      </div>
    </>
  );
};

export default GradeManagement;
