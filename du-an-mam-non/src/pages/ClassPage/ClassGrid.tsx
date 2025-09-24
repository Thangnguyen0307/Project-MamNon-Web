import { useEffect, useState, useMemo } from "react";
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

const FALLBACK_IMAGE = "/images/carousel/carousel-02.png";

const ClassGrid = () => {
  const [classes, setClasses] = useState<ApiClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("ALL");

  // Extract unique levels from classes using useMemo
  const levels = useMemo(() => {
    if (!Array.isArray(classes) || classes.length === 0) {
      return [{ id: "ALL", name: "Tất cả" }];
    }

    return classes.reduce<{ id: string; name: string }[]>(
      (acc, cls) => {
        if (cls && cls.level && cls.level.name) {
          const levelName = cls.level.name;
          if (!acc.find((l) => l.name === levelName)) {
            acc.push({ id: levelName, name: levelName });
          }
        }
        return acc;
      },
      [{ id: "ALL", name: "Tất cả" }]
    );
  }, [classes]);

  const levelCategories = useMemo(() => {
    return levels.map((level) => ({
      id: level.id,
      label: level.name,
      count:
        level.id === "ALL"
          ? classes.length
          : classes.filter((c) => c && c.level && c.level.name === level.id)
              .length,
    }));
  }, [levels, classes]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get<ApiResponse>("/api/classes");

        if (res.data?.success && mounted) {
          setClasses(res.data.data.classes);
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

  const filteredClasses = useMemo(() => {
    if (!Array.isArray(classes) || classes.length === 0) {
      return [];
    }

    return selectedLevel === "ALL"
      ? classes
      : classes.filter(
          (cls) => cls && cls.level && cls.level.name === selectedLevel
        );
  }, [classes, selectedLevel]);

  const getLevelColor = (levelName: string) => {
    switch (levelName.toLowerCase()) {
      case "mầm":
        return "from-[#FFB6C1] to-[#FFB6C1]"; // Light pink
      case "chồi":
        return "from-[#98FB98] to-[#90EE90]"; // Light green
      case "lá":
        return "from-[#87CEEB] to-[#87CEFA]"; // Sky blue
      case "rễ":
        return "from-[#D2B48C] to-[#DEB887]"; // Tan/beige
      case "test1":
      case "test3":
        return "from-[#FFD700] to-[#FFED4E]"; // Yellow/gold
      default:
        return "from-[#DDA0DD] to-[#DA70D6]"; // Plum
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

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-[#88CE58] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#6c2bd9] rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-[#F97A00] rounded-full animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <div className="inline-block animate-bounce mb-4">
            <span className="text-5xl">🏫</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#6c2bd9] mb-4 animate-fade-in-up">
            CÁC LỚP HỌC CỦA CHÚNG TÔI
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] animate-pulse mb-6"></div>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Môi trường học tập được thiết kế phù hợp với từng độ tuổi, giúp trẻ
            phát triển toàn diện cả về thể chất và trí tuệ
          </p>
        </div>

        {/* Level filters */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          {levelCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedLevel(category.id)}
              className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedLevel === category.id
                  ? "bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#6c2bd9] hover:text-[#6c2bd9]"
              }`}
            >
              <span className="flex items-center gap-2">
                {category.id !== "ALL" && getLevelIcon(category.id)}{" "}
                {category.label}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedLevel === category.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600 group-hover:bg-[#6c2bd9]/10 group-hover:text-[#6c2bd9]"
                  }`}
                >
                  {category.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Classes grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                  </div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-2/3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses.map((classItem, index) => (
              <div
                key={classItem.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Class image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${getLevelColor(
                      classItem.level.name
                    )} opacity-90`}
                  ></div>

                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 left-4 text-4xl animate-float">
                      {getLevelIcon(classItem.level.name)}
                    </div>
                    <div className="absolute top-4 right-4 text-2xl animate-bounce">
                      🎨
                    </div>
                    <div className="absolute bottom-4 left-4 text-2xl animate-pulse">
                      📖
                    </div>
                    <div className="absolute bottom-4 right-4 text-2xl animate-spin-slow">
                      🌟
                    </div>
                  </div>

                  <img
                    src={FALLBACK_IMAGE}
                    alt={classItem.name}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 mix-blend-overlay"
                    loading="lazy"
                  />

                  {/* Class level badge */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-white">
                      {getLevelIcon(classItem.level.name)}{" "}
                      {classItem.level.name}
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Class content */}
                <div className="p-6">
                  {/* Class name */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#6c2bd9] transition-colors duration-300 mb-3">
                    {classItem.name}
                  </h3>

                  {/* School year */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span className="text-[#F97A00]">📅</span>
                    <span>Năm học: {classItem.schoolYear}</span>
                  </div>

                  {/* Teachers */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="text-[#6c2bd9]">👩‍🏫</span>
                      <span>Giáo viên:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {classItem.teachers.map((teacher) => (
                        <span
                          key={teacher.id}
                          className="bg-gradient-to-r from-[#6c2bd9]/10 to-[#88CE58]/10 text-[#6c2bd9] text-xs px-3 py-1 rounded-full border border-[#6c2bd9]/20 hover:bg-[#6c2bd9]/20 transition-colors"
                        >
                          {teacher.fullName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Students count (mock data) */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#88CE58]">👶</span>
                      <span>
                        {Math.floor(Math.random() * 10) + 15} học sinh
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#F97A00]">⭐</span>
                      <span>4.8/5</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <button className="w-full bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-[#88CE58] hover:to-[#6c2bd9]">
                    Xem chi tiết lớp học 📚
                  </button>
                </div>

                {/* Enhanced border hover effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#88CE58] group-hover:to-[#6c2bd9] transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-50"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassGrid;
