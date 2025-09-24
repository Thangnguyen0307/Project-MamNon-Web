import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router";

interface Level {
  id: string;
  name: string;
}

interface ClassData {
  id: string;
  name: string;
  level: Level;
  schoolYear: string;
}

export const GV_ClassList = () => {
  const [classesData, setClassesData] = useState<ClassData[]>([]);
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };
  console.log(classesData);

  return (
    <div>
      <div className="text-center mb-16">
        <div className="inline-block animate-bounce mb-4">
          <span className="text-5xl">👥</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#6c2bd9] mb-4 animate-fade-in-up">
          DANH SÁCH LỚP HỌC
        </h2>
        <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] animate-pulse mb-6"></div>
        <p
          className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "200ms" }}>
          Dưới đây là danh sách các lớp học mà giáo viên đang phụ trách. Vui
          lòng chọn lớp để thêm cũng như theo dõi bài viết.
        </p>
      </div>
      <div className="">
        <div className="max-w-5xl mx-auto px-4 py-10">
          {classesData?.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classesData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03, rotate: 0.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group">
                  <Link
                    to={`/giaovien/baiviet/${item.id}`}
                    className="block bg-orange-100 border-4 border-orange-300 rounded-2xl shadow-lg p-6 overflow-hidden hover:bg-orange-200 transition duration-300">
                    {/* Lấp lánh */}
                    <div className="absolute top-0 left-[55%] w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-40 group-hover:animate-shimmer pointer-events-none"></div>

                    {/* Nội dung */}
                    <h2 className="text-xl font-bold text-orange-700">
                      🏫 {item.name.toUpperCase()}
                    </h2>
                    <p className="text-md text-rose-700">
                      🎓 Khối: {item.level.name}
                    </p>
                    <p className="text-md text-fuchsia-600">
                      📅 Niên khoá: {item.schoolYear}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
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
