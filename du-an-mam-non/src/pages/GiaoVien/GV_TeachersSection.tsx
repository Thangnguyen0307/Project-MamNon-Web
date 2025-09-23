import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";

type ApiTeacher = {
  id: string;
  email: string;
  fullName: string;
  role: string; // TEACHER
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    users: ApiTeacher[];
    pagination: { page: number; limit: number; total: number; pages: number };
  };
};

const FALLBACK_AVATAR = "/images/carousel/carousel-04.png";

export default function GV_TeachersSection() {
  const [list, setList] = useState<ApiTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await axiosInstance.get<ApiResponse>("/api/user/teachers");
        const users = res.data?.data?.users ?? [];
        if (mounted) {
          setList(users);
          setLoading(false);
        }
      } catch (e: any) {
        if (mounted) {
          setError(e?.message ?? "Không thể tải danh sách giáo viên");
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-white py-12 md:py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-wide text-purple-700">
          ĐỘI NGŨ GIÁO VIÊN
        </h2>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] w-full rounded-xl bg-gray-200" />
                <div className="mt-3 h-4 w-2/3 mx-auto rounded bg-gray-200" />
                <div className="mt-2 h-3 w-1/2 mx-auto rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}

        {/* Empty */}
        {!loading && !error && list.length === 0 && (
          <p className="mt-8 text-center text-gray-600">Chưa có giáo viên.</p>
        )}

        {/* Grid */}
        {!loading && !error && list.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {list.map((t) => (
              <article key={t.id} className="group select-none">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#E7EEF7] shadow-sm">
                  <img
                    src={FALLBACK_AVATAR}
                    alt={t.fullName}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                <div className="mt-3 text-center">
                  <p className="font-medium text-gray-900">{t.fullName}</p>
                  <p className="mt-1 text-sm text-gray-600">
                    {t.role === "TEACHER" ? "Giáo viên" : t.role}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                      t.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {t.isActive ? "Đang giảng dạy" : "Tạm ngưng"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
