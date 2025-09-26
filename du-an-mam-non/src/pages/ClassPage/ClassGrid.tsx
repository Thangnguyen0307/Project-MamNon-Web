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
                  {/* Header skeleton */}
                  <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white shadow-xl px-4 py-2 rounded-full w-20 h-8"></div>
                    </div>
                  </div>

                  <div className="px-6 pt-8 pb-6 text-center">
                    {/* Title skeleton */}
                    <div className="h-6 bg-gray-200 rounded mb-6 mx-auto w-3/4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                    </div>

                    {/* Info skeleton */}
                    <div className="flex justify-center items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="text-left">
                        <div className="w-16 h-3 bg-gray-200 rounded mb-1"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5 mx-auto mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
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
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in-up relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient Header */}
                <div
                  className={`h-20 bg-gradient-to-r ${getLevelColor(
                    classItem.level.name
                  )} relative overflow-hidden`}
                >
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-3 left-4 text-2xl animate-float">
                      {getLevelIcon(classItem.level.name)}
                    </div>
                    <div className="absolute top-3 right-6 text-xl animate-bounce">
                      ✨
                    </div>
                    <div className="absolute bottom-2 right-4 text-lg animate-pulse">
                      📚
                    </div>
                  </div>

                  {/* Level badge */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white shadow-xl px-4 py-2 rounded-full flex items-center gap-2 border-4 border-white">
                      <span className="text-lg">
                        {getLevelIcon(classItem.level.name)}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {classItem.level.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Class content */}
                <div className="px-6 pt-8 pb-6 text-center">
                  {/* Class name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6c2bd9] group-hover:to-[#88CE58] transition-all duration-300">
                    {classItem.name}
                  </h3>

                  {/* School year with icon */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div
                      className={`p-3 rounded-full bg-gradient-to-r ${getLevelColor(
                        classItem.level.name
                      )} bg-opacity-20`}
                    >
                      <span className="text-xl">📅</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500 font-medium">
                        Năm học
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        {classItem.schoolYear}
                      </p>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div
                    className={`mx-auto w-16 h-1 rounded-full bg-gradient-to-r ${getLevelColor(
                      classItem.level.name
                    )} mb-4`}
                  ></div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Lớp học chất lượng cao với môi trường thân thiện và chương
                    trình giáo dục toàn diện
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(
                    classItem.level.name
                  )} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl pointer-events-none`}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassGrid;
