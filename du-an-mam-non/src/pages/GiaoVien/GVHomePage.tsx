import GV_Header from "./GV_Header";
import { Outlet } from "react-router";

export const GVHomePage = () => {
  return (
    <>
      <GV_Header />
      {/* Title */}
      <div>
        <div className="w-full h-[465px] bg-[url('https://wordpress.vecurosoft.com/toddly/wp-content/uploads/2025/07/breadcrumb-bg-1.jpg')] bg-cover bg-center">
          <div className="max-w-6xl h-full mx-auto flex items-center justify-center ">
            <p className="text-3xl text-white">Danh Sách Lớp Học</p>
          </div>
        </div>
      </div>

      {/* List */}
      <section className="bg-[#F6F1E4]">
        <Outlet />
      </section>
    </>
  );
};
