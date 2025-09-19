import React, { useEffect, useState } from "react";
import { ClassesData } from "../GiaoVu/ClassManagementTable";
import Button from "../../components/ui/button/Button";
import { useUser } from "../../context/UserContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router";

export const GV_ClassList = () => {
  const [classesData, setClassesData] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchAllClasses();
  }, []);

  const fetchAllClasses = async () => {
    if (loading && !user) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.CLASSES.GET_CLASSES_BY_TEACHER
      );
      console.log(response);

      if (response.data.data.classes?.length > 0) {
        setClassesData(response.data.data.classes);
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
    <div>
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {classesData?.length > 0 ? (
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
                      <Link
                        to={`/giaovien/baiviet/${classItem.id}`}
                        className="mx-1">
                        <Button size="sm">Xem bài viết</Button>
                      </Link>
                      <Link
                        to={`/giaovien/thembaiviet/${classItem.id}`}
                        className="mx-1">
                        <Button size="sm">Thêm bài viết</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-medium text-xl">
              Bạn chưa được phân công lớp học nào
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
