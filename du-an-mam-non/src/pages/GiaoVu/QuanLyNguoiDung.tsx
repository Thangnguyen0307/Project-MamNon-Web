import React from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import QuanLyNguoiDungTable from "./QuanLyNguoiDungTable";
import Button from "../../components/ui/button/Button";

const QuanLyNguoiDung = () => {
  return (
    <>
      <PageMeta title="Quan Ly Mam Non" description="Quan Ly Mam Non" />
      <PageBreadcrumb pageTitle="Giáo Vụ Quản Lý Người Dùng" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh Sách Người Dùng"
          button={<Button>Thêm Người Dùng</Button>}>
          <QuanLyNguoiDungTable />
        </ComponentCard>
      </div>
    </>
  );
};

export default QuanLyNguoiDung;
