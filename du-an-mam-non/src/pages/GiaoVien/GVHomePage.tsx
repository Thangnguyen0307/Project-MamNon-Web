import { useEffect, useState } from "react";
import Button from "../../components/ui/button/Button";
import { axiosInstance } from "../../utils/axiosInstance";
import GV_Header from "./GV_Header";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useUser } from "../../context/UserContext";
import { ClassesData } from "../GiaoVu/ClassManagementTable";

export const GVHomePage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [classesData, setClassesData] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchAllClasses();
  });

  const fetchAllClasses = async () => {
    if (loading && !user) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.CLASSES.GET_ALL_CLASSES}?page=${pagination.page}&limit=${pagination.limit}&teacher=${user?.id}`
      );

      if (response.data.data.classes?.length > 0) {
        setClassesData(response.data.data.classes);
        setPagination(response.data.data.pagination);
      } else setClassesData([]);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
      <div className="bg-[#F6F1E4]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {classesData.map((classItem: ClassesData, index) => (
              <div
                className="card bg-base-100 border-4 border-dashed border-[#D18109]/20 overflow-hidden rounded-3xl bg-amber-50"
                key={index}>
                <figure className="">
                  <img
                    src="https://wordpress.vecurosoft.com/toddly/wp-content/uploads/2025/08/vs-class-p-1-5.jpg"
                    alt="Shoes"
                    className=""
                  />
                </figure>
                <div className="card-body items-center text-center px-[30px]">
                  <h2 className="pt-3 pb-1 font-bold text-2xl">
                    {classItem.name.toUpperCase()}
                  </h2>
                  <p className="pb-1">Khối : {classItem.level.name}</p>
                  <p>Niên khoá : {classItem.schoolYear}</p>
                  <hr className="my-[20px]" />
                  <div className="mb-3">
                    <Button size="sm" className="">
                      Thêm bài viết
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
