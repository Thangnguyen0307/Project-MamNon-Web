import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

type ApiTeacher = {
  id: string;
  fullName: string;
  role: string;
  isActive: boolean;
  email?: string;
  phone?: string;
  subjects?: string[];
  experience?: number;
  education?: string;
  bio?: string;
};

const FALLBACK_AVATAR = "/images/carousel/carousel-04.png";

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

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            <span className="text-5xl">👥</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#6c2bd9] mb-4 animate-fade-in-up">
            GẶP GỠ ĐỘI NGŨ GIÁO VIÊN
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] animate-pulse mb-6"></div>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Những người thầy, cô tận tâm với sứ mệnh giáo dục và phát triển toàn
            diện cho các bé
          </p>
        </div>

        {/* Category filters */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[#6c2bd9] hover:text-[#6c2bd9]"
              }`}
            >
              <span className="flex items-center gap-2">
                {category.label}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
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

        {/* Teachers grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher, index) => (
              <div
                key={teacher.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-fade-in-up teacher-card-hover"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Status badge */}
                <div className="absolute top-4 right-4 z-10 animate-bounce-gentle">
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold shadow-lg backdrop-blur-sm ${
                      teacher.isActive
                        ? "bg-green-100/90 text-green-700 border border-green-200"
                        : "bg-gray-100/90 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {teacher.isActive ? "✨ Đang dạy" : "⏸️ Tạm nghỉ"}
                  </div>
                </div>

                {/* Image container */}
                <div className="aspect-[4/5] overflow-hidden teacher-bg-gradient relative">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="float-decoration absolute top-4 left-4 w-6 h-6 border-2 border-[#88CE58] rounded-full"></div>
                    <div className="float-decoration absolute bottom-4 right-4 w-4 h-4 bg-[#6c2bd9] rounded-full"></div>
                    <div className="float-decoration absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-[#88CE58] rounded-full animate-ping"></div>
                  </div>

                  <img
                    src={FALLBACK_AVATAR}
                    alt={teacher.fullName}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 animate-float"
                    loading="lazy"
                  />

                  {/* Magic sparkle overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 left-2 text-yellow-300 animate-star-twinkle">
                      ✨
                    </div>
                    <div
                      className="absolute top-4 right-4 text-pink-300 animate-star-twinkle"
                      style={{ animationDelay: "0.5s" }}
                    >
                      ⭐
                    </div>
                    <div
                      className="absolute bottom-4 left-4 text-blue-300 animate-star-twinkle"
                      style={{ animationDelay: "1s" }}
                    >
                      💫
                    </div>
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6c2bd9]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  {/* Decorative line */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] rounded-full animate-glow"></div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#6c2bd9] transition-colors duration-300 mb-2">
                    {teacher.fullName}
                  </h3>

                  {/* Role */}
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getRoleColor(
                      teacher.role
                    )} mb-3`}
                  >
                    {getRoleDisplay(teacher.role)}
                  </div>

                  {/* Experience */}
                  {teacher.experience && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="text-[#F97A00]">🎓</span>
                      <span>{teacher.experience} năm kinh nghiệm</span>
                    </div>
                  )}

                  {/* Education */}
                  {teacher.education && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span className="text-[#0BA6DF]">🏫</span>
                      <span>{teacher.education}</span>
                    </div>
                  )}

                  {/* Bio */}
                  {teacher.bio && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {teacher.bio}
                    </p>
                  )}

                  {/* Contact info */}
                  <div className="space-y-2">
                    {teacher.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-[#88CE58]">📧</span>
                        <span className="truncate">{teacher.email}</span>
                      </div>
                    )}
                    {teacher.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-[#6c2bd9]">📞</span>
                        <span>{teacher.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center justify-center gap-1 mt-4 pt-4 border-t border-gray-100">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="text-yellow-400 text-sm animate-star-twinkle hover:scale-125 transition-transform cursor-pointer"
                        style={{ animationDelay: `${i * 200}ms` }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
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

export default TeachersGrid;
