import { useEffect, useState } from "react";
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
  teachers: Array<{
    id: string;
    email: string;
    role: string;
    fullName: string;
    isActive: boolean;
    avatarUrl: string | null;
  }>;
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

const FALLBACK_IMAGE = "/images/carousel/carousel-01.png";

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
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-[#88CE58] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#6c2bd9] rounded-full animate-bounce"></div>
      </div>

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
            Khám phá những lớp học đặc biệt với đội ngũ giáo viên giàu kinh
            nghiệm
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
                      className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(
                        classItem.level.name
                      )} opacity-90`}
                    ></div>

                    {/* Background image */}
                    <img
                      src={FALLBACK_IMAGE}
                      alt={classItem.name}
                      className="w-full h-[400px] md:h-[500px] object-cover mix-blend-overlay"
                    />

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

                        {/* Teachers */}
                        <div
                          className="animate-fade-in-up"
                          style={{ animationDelay: "400ms" }}
                        >
                          <p className="text-lg mb-3 text-white/90">
                            👩‍🏫 Giáo viên:
                          </p>
                          <div className="flex flex-wrap justify-center gap-3">
                            {classItem.teachers.map((teacher) => (
                              <span
                                key={teacher.id}
                                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30"
                              >
                                {teacher.fullName}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div
                          className="flex justify-center gap-8 mt-8 animate-fade-in-up"
                          style={{ animationDelay: "600ms" }}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {Math.floor(Math.random() * 10) + 15}
                            </div>
                            <div className="text-sm text-white/80">
                              Học sinh
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">4.8</div>
                            <div className="text-sm text-white/80">
                              Đánh giá
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {classItem.teachers.length}
                            </div>
                            <div className="text-sm text-white/80">
                              Giáo viên
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-10 left-10 text-4xl animate-float opacity-30">
                        📚
                      </div>
                      <div className="absolute top-20 right-20 text-3xl animate-bounce opacity-30">
                        🎨
                      </div>
                      <div className="absolute bottom-20 left-20 text-3xl animate-pulse opacity-30">
                        ⭐
                      </div>
                      <div className="absolute bottom-10 right-10 text-4xl animate-spin-slow opacity-30">
                        🌟
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
          <button className="bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-[#88CE58] hover:to-[#6c2bd9]">
            Xem tất cả lớp học 🎓
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClassCarousel;
