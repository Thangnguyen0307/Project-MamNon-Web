import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";

type ApiClass = {
  id: string;
  name: string;
  schoolYear: string;
  level: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    classes: ApiClass[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
};

interface ClassCarouselProps {
  limit?: number; // Giới hạn số lượng card hiển thị
}

const ClassCarousel = ({ limit }: ClassCarouselProps) => {
  const [classes, setClasses] = useState<ApiClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<ApiResponse>("/api/classes");

        if (res.data?.success && mounted) {
          // Áp dụng giới hạn nếu có
          const classesData = limit
            ? res.data.data.classes.slice(0, limit)
            : res.data.data.classes;
          setClasses(classesData);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        if (mounted) {
          setClasses([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!classes || classes.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === classes.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [classes]);

  const nextSlide = () => {
    if (!classes || classes.length === 0) return;
    setCurrentIndex(currentIndex === classes.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    if (!classes || classes.length === 0) return;
    setCurrentIndex(currentIndex === 0 ? classes.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getLevelColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case "mầm":
        return "from-[#FFB6C1] to-[#FF69B4]";
      case "chồi":
        return "from-[#98FB98] to-[#32CD32]";
      case "lá":
        return "from-[#87CEEB] to-[#4169E1]";
      case "rễ":
        return "from-[#8B4513] to-[#A0522D]";
      case "test1":
      case "test3":
        return "from-[#FFD700] to-[#FFA500]";
      default:
        return "from-[#DDA0DD] to-[#9370DB]";
    }
  };

  const getLevelIcon = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case "mầm":
        return "🌱";
      case "chồi":
        return "🌿";
      case "lá":
        return "🍃";
      case "rễ":
        return "🌰";
      case "test1":
      case "test3":
        return "🧪";
      default:
        return "📚";
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="aspect-[16/9] bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-8xl mb-6">🏫</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            Chưa có thông tin lớp học
          </h3>
          <p className="text-gray-500 text-lg">
            Thông tin các lớp học sẽ được cập nhật sớm!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-12">
          <div className="inline-block animate-bounce mb-4">
            <span className="text-5xl">🎓</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#6c2bd9] mb-4 animate-fade-in-up">
            CÁC LỚP HỌC NỔI BẬT
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] animate-pulse mb-6"></div>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Khám phá các lớp học với chương trình giáo dục toàn diện
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {classes &&
                classes.length > 0 &&
                classes.map((classItem) => (
                  <div key={classItem.id} className="min-w-full relative">
                    {/* Background gradient */}
                    <div
                      className={`w-full h-[400px] md:h-[500px] bg-gradient-to-r ${getLevelColor(
                        classItem.level.name
                      )} rounded-2xl`}
                    ></div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white px-4">
                        {/* Level badge */}
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/30">
                          <span className="text-2xl mr-2">
                            {getLevelIcon(classItem.level.name)}
                          </span>
                          <span className="text-lg font-semibold">
                            {classItem.level.name}
                          </span>
                        </div>

                        {/* Class name */}
                        <h3 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                          {classItem.name}
                        </h3>

                        {/* School year */}
                        <p
                          className="text-xl mb-6 text-white/90 animate-fade-in-up"
                          style={{ animationDelay: "200ms" }}
                        >
                          📅 Năm học: {classItem.schoolYear}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {classes &&
              classes.length > 0 &&
              classes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#6c2bd9] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
          </div>
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            to="/lop-hoc"
            className="bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-[#88CE58] hover:to-[#6c2bd9] inline-block"
          >
            Xem tất cả lớp học 🎓
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClassCarousel;
