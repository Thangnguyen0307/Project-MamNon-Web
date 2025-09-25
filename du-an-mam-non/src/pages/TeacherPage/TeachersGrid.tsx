import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { BASE_URL_MEDIA } from "../../utils/apiPaths";

type ApiTeacher = {
  id: string;
  fullName: string;
  role: string;
  isActive: boolean;
  avatarUrl?: string | null;
  email?: string;
  phone?: string;
  subjects?: string[];
  experience?: number;
  education?: string;
  bio?: string;
};

const FALLBACK_AVATAR = "/images/user/userDefault.jpg";

const TeachersGrid = () => {
  const [teachers, setTeachers] = useState<ApiTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    { id: "ALL", label: "Tất cả", count: teachers.length },
    {
      id: "TEACHER",
      label: "Giáo viên chính",
      count: teachers.filter((t) => t.role === "TEACHER").length,
    },
    {
      id: "ASSISTANT",
      label: "Trợ giảng",
      count: teachers.filter((t) => t.role === "ASSISTANT").length,
    },
    {
      id: "SPECIALIST",
      label: "Chuyên môn",
      count: teachers.filter((t) => t.role === "SPECIALIST").length,
    },
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axiosInstance.get("/api/user/teachers", {
          params: { page: 1, limit: 20 },
        });
        const users: ApiTeacher[] = res.data?.data?.users ?? [];
        if (mounted) {
          setTeachers(users);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          // Mock data for demo
          const mockTeachers: ApiTeacher[] = [
            {
              id: "1",
              fullName: "Cô Mai Anh",
              role: "TEACHER",
              isActive: true,
              avatarUrl: null,
              email: "maianh@kidsmona.edu.vn",
              phone: "0123456789",
              experience: 8,
              education: "Đại học Sư phạm TP.HCM",
              bio: "Chuyên môn giáo dục mầm non, yêu thích làm việc với trẻ em",
            },
            {
              id: "2",
              fullName: "Cô Thúy Linh",
              role: "TEACHER",
              isActive: true,
              avatarUrl: null,
              email: "thuylinh@kidsmona.edu.vn",
              phone: "0123456790",
              experience: 6,
              education: "Đại học Sư phạm Hà Nội",
              bio: "Giáo viên nhiệt huyết, có kinh nghiệm phát triển kỹ năng xã hội cho trẻ",
            },
            {
              id: "3",
              fullName: "Cô Minh Châu",
              role: "ASSISTANT",
              isActive: true,
              avatarUrl: null,
              email: "minhchau@kidsmona.edu.vn",
              phone: "0123456791",
              experience: 4,
              education: "Cao đẳng Sư phạm Mầm non",
              bio: "Trợ giảng tận tâm, hỗ trợ tốt cho giáo viên chính",
            },
            {
              id: "4",
              fullName: "Thầy Văn Đức",
              role: "SPECIALIST",
              isActive: true,
              avatarUrl: null,
              email: "vanduc@kidsmona.edu.vn",
              phone: "0123456792",
              experience: 10,
              education: "Thạc sĩ Tâm lý học Trẻ em",
              bio: "Chuyên gia tâm lý trẻ em, tư vấn phát triển nhân cách",
            },
            {
              id: "5",
              fullName: "Cô Hồng Ngọc",
              role: "TEACHER",
              isActive: true,
              avatarUrl: null,
              email: "hongngoc@kidsmona.edu.vn",
              phone: "0123456793",
              experience: 7,
              education: "Đại học Sư phạm TP.HCM",
              bio: "Giáo viên sáng tạo, chuyên về nghệ thuật và âm nhạc cho trẻ",
            },
            {
              id: "6",
              fullName: "Cô Bích Phượng",
              role: "TEACHER",
              isActive: false,
              avatarUrl: null,
              email: "bichphuong@kidsmona.edu.vn",
              phone: "0123456794",
              experience: 5,
              education: "Đại học Sư phạm Huế",
              bio: "Giáo viên kinh nghiệm trong việc dạy tiếng Anh cho trẻ em",
            },
          ];
          setTeachers(mockTeachers);
          setLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredTeachers =
    selectedCategory === "ALL"
      ? teachers
      : teachers.filter((teacher) => teacher.role === selectedCategory);

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "TEACHER":
        return "👩‍🏫 Giáo viên chính";
      case "ASSISTANT":
        return "🤝 Trợ giảng";
      case "SPECIALIST":
        return "🎯 Chuyên gia";
      default:
        return `👔 ${role}`;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "TEACHER":
        return "from-[#6c2bd9] to-[#8b5fbf]";
      case "ASSISTANT":
        return "from-[#88CE58] to-[#7bc142]";
      case "SPECIALIST":
        return "from-[#F97A00] to-[#e06900]";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getAvatarUrl = (avatarUrl?: string | null) => {
    if (!avatarUrl) return FALLBACK_AVATAR;

    // If avatarUrl starts with /, prepend the media base URL
    if (avatarUrl.startsWith("/")) {
      return `${BASE_URL_MEDIA}${avatarUrl}`;
    }

    // If it's a full URL, return as is
    if (avatarUrl.startsWith("http")) {
      return avatarUrl;
    }

    // Otherwise, treat as relative path and prepend media URL
    return `${BASE_URL_MEDIA}/${avatarUrl}`;
  };

  // Helper function to get grid classes based on number of items
  // This ensures proper centering and spacing for all scenarios
  const getGridClasses = () => {
    // Always use CSS grid for consistent spacing and proper centering
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center place-items-center";
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden min-h-screen">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 border-4 border-[#88CE58]/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-[#6c2bd9]/20 to-[#88CE58]/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-[#F97A00]/20 rounded-full animate-ping"></div>
        <div
          className="absolute top-40 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-20 h-20 border-3 border-purple-300/40 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-16 right-20 text-6xl animate-bounce opacity-10">
        📚
      </div>
      <div
        className="absolute bottom-20 left-16 text-5xl animate-float opacity-10"
        style={{ animationDelay: "1s" }}
      >
        🎨
      </div>
      <div
        className="absolute top-1/3 right-1/3 text-4xl animate-pulse opacity-10"
        style={{ animationDelay: "2s" }}
      >
        ✏️
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Enhanced Section title */}
        <div className="text-center mb-20">
          <div className="inline-block relative mb-6">
            {/* Decorative circle behind emoji */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#88CE58]/20 to-[#6c2bd9]/20 rounded-full scale-150 animate-pulse"></div>
            <span className="relative text-7xl animate-bounce z-10">👥</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#6c2bd9] via-[#88CE58] to-[#F97A00] bg-clip-text text-transparent mb-6 animate-fade-in-up">
            GẶP GỠ ĐỘI NGŨ
            <span className="block mt-2">GIÁO VIÊN</span>
          </h2>

          <div className="flex justify-center items-center mb-8">
            <div className="h-1 w-12 bg-[#88CE58] rounded-full animate-pulse"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] rounded-full mx-2"></div>
            <div className="h-1 w-12 bg-[#6c2bd9] rounded-full animate-pulse"></div>
          </div>

          <p
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Những người thầy, cô tận tâm với sứ mệnh giáo dục và phát triển toàn
            diện cho các bé
            <span className="block mt-3 text-lg text-[#6c2bd9] font-semibold">
              💝 Đem lại trải nghiệm học tập tuyệt vời nhất cho trẻ em
            </span>
          </p>
        </div>

        {/* Enhanced Category filters */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:rotate-1 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white shadow-2xl scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:border-[#6c2bd9] hover:text-[#6c2bd9] hover:bg-white shadow-lg"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background glow effect */}
              <div
                className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#6c2bd9]/30 to-[#88CE58]/30 opacity-100"
                    : "opacity-0 group-hover:opacity-50"
                } blur-xl -z-10`}
              ></div>

              <span className="flex items-center gap-3">
                {category.label}
                <span
                  className={`text-sm px-3 py-1.5 rounded-full font-bold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-white/30 text-white"
                      : "bg-gradient-to-r from-[#88CE58]/10 to-[#6c2bd9]/10 text-gray-700 group-hover:from-[#88CE58]/20 group-hover:to-[#6c2bd9]/20 group-hover:text-[#6c2bd9]"
                  }`}
                >
                  {category.count}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Teachers grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 relative">
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
          <div className="max-w-6xl mx-auto">
            <div className={getGridClasses()}>
              {filteredTeachers.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4 opacity-30">👥</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Không tìm thấy giáo viên
                  </h3>
                  <p className="text-gray-500">
                    Thử chọn danh mục khác hoặc quay lại sau
                  </p>
                </div>
              ) : (
                filteredTeachers.map((teacher, index) => (
                  <div
                    key={teacher.id}
                    className="group w-72 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in-up teacher-card-hover transform hover:scale-105 border border-gray-100 hover:border-[#88CE58]/30"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Enhanced Image container */}
                    <div className="aspect-[4/5] overflow-hidden relative bg-gradient-to-br from-[#88CE58]/10 via-[#6c2bd9]/5 to-[#F97A00]/10">
                      {/* Elegant background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-6 left-6 w-8 h-8 border-2 border-[#88CE58] rounded-full animate-pulse"></div>
                        <div
                          className="absolute bottom-6 right-6 w-6 h-6 bg-[#6c2bd9] rounded-full animate-bounce"
                          style={{ animationDelay: "1s" }}
                        ></div>
                        <div
                          className="absolute top-1/3 right-8 w-4 h-4 bg-[#F97A00] rounded-full animate-ping"
                          style={{ animationDelay: "2s" }}
                        ></div>
                        <div
                          className="absolute bottom-1/3 left-8 w-5 h-5 border border-[#88CE58] rounded-full animate-pulse"
                          style={{ animationDelay: "1.5s" }}
                        ></div>
                      </div>

                      <img
                        src={getAvatarUrl(teacher.avatarUrl)}
                        alt={teacher.fullName}
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_AVATAR;
                        }}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Floating sparkles on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div
                          className="absolute top-4 left-4 text-yellow-300 text-lg animate-bounce"
                          style={{ animationDelay: "0.5s" }}
                        >
                          ✨
                        </div>
                        <div
                          className="absolute top-6 right-6 text-pink-300 text-sm animate-bounce"
                          style={{ animationDelay: "1s" }}
                        >
                          ⭐
                        </div>
                        <div
                          className="absolute bottom-6 left-6 text-blue-300 text-base animate-bounce"
                          style={{ animationDelay: "1.5s" }}
                        >
                          💫
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content Section */}
                    <div className="p-4 relative bg-gradient-to-b from-white to-gray-50/50">
                      {/* Decorative top accent */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] rounded-full"></div>

                      {/* Profile badge with icon */}
                      <div className="absolute -top-6 right-3 bg-white rounded-full p-1.5 shadow-lg border-2 border-[#88CE58]/20">
                        <span className="text-lg">👨‍🏫</span>
                      </div>

                      {/* Name with elegant typography */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 text-center group-hover:text-[#6c2bd9] transition-colors duration-300">
                        {teacher.fullName}
                      </h3>

                      {/* Role badge with enhanced styling */}
                      <div className="flex justify-center mb-3">
                        <div
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getRoleColor(
                            teacher.role
                          )} shadow-lg transform transition-all duration-300 group-hover:scale-105`}
                        >
                          <span className="mr-1">
                            {getRoleDisplay(teacher.role).split(" ")[0]}
                          </span>
                          <span>
                            {getRoleDisplay(teacher.role)
                              .split(" ")
                              .slice(1)
                              .join(" ")}
                          </span>
                        </div>
                      </div>

                      {/* Professional details */}
                      <div className="space-y-2">
                        {/* Experience */}
                        {teacher.experience && (
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg py-1.5 px-2">
                            <span className="text-[#F97A00] text-sm">🎓</span>
                            <span className="font-medium">
                              {teacher.experience} năm kinh nghiệm
                            </span>
                          </div>
                        )}

                        {/* Education */}
                        {teacher.education && (
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg py-1.5 px-2">
                            <span className="text-[#0BA6DF] text-sm">🏫</span>
                            <span className="font-medium">
                              {teacher.education}
                            </span>
                          </div>
                        )}

                        {/* Bio */}
                        {teacher.bio && (
                          <p className="text-xs text-gray-700 leading-relaxed text-center line-clamp-2 bg-gradient-to-r from-[#88CE58]/5 to-[#6c2bd9]/5 rounded-lg py-1.5 px-2">
                            {teacher.bio}
                          </p>
                        )}

                        {/* Contact info */}
                        <div className="space-y-1 pt-2 border-t border-gray-100">
                          {teacher.email && (
                            <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                              <span className="text-[#88CE58]">📧</span>
                              <span className="truncate font-medium">
                                {teacher.email}
                              </span>
                            </div>
                          )}
                          {teacher.phone && (
                            <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                              <span className="text-[#6c2bd9]">📞</span>
                              <span className="font-medium">
                                {teacher.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced border hover effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#88CE58] group-hover:to-[#6c2bd9] transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-50"></div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeachersGrid;
