import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { axiosInstance } from "../../utils/axiosInstance";

type ApiTeacher = {
  id: string;
  fullName: string;
  role: string;
  isActive: boolean;
};

type Props = {
  title?: string;
  limit?: number;
  className?: string;
  bg?: string; // cho phép truyền màu nền section
};

const FALLBACK_AVATAR = "/images/carousel/carousel-04.png";

export default function TeachersCarousel({
  title = "ĐỘI NGŨ GIÁO VIÊN",
  limit = 8,
  className = "",
  bg = "bg-white",
}: Props) {
  const [list, setList] = useState<ApiTeacher[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNavigateToTeachersPage = () => {
    window.location.href = "/doi-ngu-giao-vien";
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axiosInstance.get("/api/user/teachers", {
          params: { page: 1, limit },
        });
        const users: ApiTeacher[] = res.data?.data?.users ?? [];
        if (mounted) {
          setList(users.slice(0, limit));
          setLoading(false);
        }
      } catch {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [limit]);

  return (
    <section
      className={`mx-auto w-full ${bg} py-12 md:py-16 ${className} relative overflow-hidden`}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#88CE58]/15 to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-float"></div>
      <div
        className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#6c2bd9]/15 to-transparent rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-200/10 to-blue-200/10 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="mx-auto w-full max-w-screen-xl px-4 relative z-10">
        {/* Title with enhanced animations */}
        <div className="text-center">
          <div className="inline-block animate-bounce">
            <span className="text-4xl">👩‍🏫</span>
          </div>
          <h2
            className="text-[22px] md:text-[28px] font-bold tracking-wide text-[#6c2bd9] mt-4 animate-fade-in-up cursor-pointer hover:text-[#88CE58] transition-colors duration-300"
            onClick={handleNavigateToTeachersPage}
          >
            {title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] animate-pulse" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Đội ngũ giáo viên tận tâm, giàu kinh nghiệm, luôn đồng hành cùng sự
            phát triển của trẻ
            <span className="block mt-2 text-sm text-[#6c2bd9] font-medium">
              ✨ Click để khám phá thêm về đội ngũ của chúng tôi
            </span>
          </p>
        </div>

        {/* Loading skeleton with enhanced animations */}
        {loading ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] w-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                </div>
                <div className="mt-3 h-4 w-2/3 mx-auto rounded bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer delay-100"></div>
                </div>
                <div className="mt-2 h-3 w-1/2 mx-auto rounded bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer delay-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="mt-8 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={20}
              centeredSlides={true}
              centeredSlidesBounds={true}
              loop={true}
              speed={800}
              grabCursor={true}
              effect="slide"
              breakpoints={{
                0: { slidesPerView: 1.2, centeredSlides: true },
                640: { slidesPerView: 2.2, centeredSlides: true },
                1024: { slidesPerView: 3.2, centeredSlides: true },
                1280: { slidesPerView: 4.2, centeredSlides: true },
              }}
              className="teachers-swiper !pt-8 !pb-12"
            >
              {list.map((t, index) => (
                <SwiperSlide key={t.id}>
                  <article
                    className="teacher-card-hover group rounded-2xl border border-gray-100 bg-white shadow-[0_2px_14px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_6px_20px_rgba(108,43,217,0.15)] animate-fade-in-up relative overflow-hidden cursor-pointer"
                    style={{ animationDelay: `${index * 150}ms` }}
                    aria-label={`${t.fullName} - ${t.role}`}
                    onClick={handleNavigateToTeachersPage}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleNavigateToTeachersPage();
                      }
                    }}
                  >
                    {/* Floating badge */}
                    <div className="absolute top-3 right-3 z-10 animate-bounce-gentle">
                      <div
                        className={`rounded-full px-2 py-1 text-[10px] font-medium shadow-lg backdrop-blur-sm ${
                          t.isActive
                            ? "bg-green-100/90 text-green-700 border border-green-200"
                            : "bg-gray-100/90 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {t.isActive ? "✨ Active" : "⏸️ Paused"}
                      </div>
                    </div>

                    {/* Image container with enhanced effects */}
                    <div className="aspect-[3/4] overflow-hidden rounded-t-2xl teacher-bg-gradient relative">
                      {/* Decorative floating elements */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="float-decoration absolute top-4 left-4 w-6 h-6 border-2 border-[#88CE58] rounded-full"></div>
                        <div className="float-decoration absolute bottom-4 right-4 w-4 h-4 bg-[#6c2bd9] rounded-full"></div>
                        <div className="float-decoration absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-[#88CE58] rounded-full animate-ping"></div>
                      </div>

                      <img
                        src={FALLBACK_AVATAR}
                        alt={t.fullName}
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

                    {/* Content with enhanced styling */}
                    <div className="px-4 pb-5 pt-4 text-center relative">
                      {/* Decorative animated line */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] rounded-full animate-glow"></div>

                      <p
                        className="text-[16px] font-bold text-gray-900 group-hover:text-[#6c2bd9] transition-colors duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 150 + 200}ms` }}
                      >
                        {t.fullName}
                      </p>
                      <p
                        className="mt-1 text-sm text-gray-600 font-medium animate-fade-in-up"
                        style={{ animationDelay: `${index * 150 + 300}ms` }}
                      >
                        {t.role === "TEACHER" ? "👩‍🏫 Giáo viên" : `👔 ${t.role}`}
                      </p>

                      {/* Animated star rating */}
                      <div
                        className="mt-3 flex items-center justify-center space-x-1 animate-fade-in-up"
                        style={{ animationDelay: `${index * 150 + 400}ms` }}
                      >
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

                      {/* Status badge with enhanced animation */}
                      <span
                        className={`mt-3 inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold shadow-sm transition-all duration-300 animate-fade-in-up ${
                          t.isActive
                            ? "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200 animate-glow"
                            : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 border border-gray-200"
                        }`}
                        style={{ animationDelay: `${index * 150 + 500}ms` }}
                      >
                        <span
                          className={`mr-1.5 w-2 h-2 rounded-full transition-all duration-300 ${
                            t.isActive
                              ? "bg-green-500 animate-pulse shadow-lg shadow-green-400/50"
                              : "bg-gray-400"
                          }`}
                        ></span>
                        {t.isActive ? "Đang giảng dạy" : "Tạm ngưng"}
                      </span>
                    </div>

                    {/* Enhanced border hover effect với click indicator */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#88CE58] group-hover:to-[#6c2bd9] transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-50"></div>

                    {/* Click indicator */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      👆 Click để xem thêm
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* View All Button */}
            <div
              className="text-center mt-8 animate-fade-in-up"
              style={{ animationDelay: "800ms" }}
            >
              <button
                onClick={handleNavigateToTeachersPage}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-2xl">👥</span>
                <span>Xem tất cả giáo viên</span>
                <span className="group-hover:translate-x-1 transition-transform text-xl">
                  →
                </span>
              </button>
              <p
                className="mt-3 text-sm text-gray-500 animate-fade-in-up"
                style={{ animationDelay: "900ms" }}
              >
                💡 Click vào bất kỳ giáo viên nào để xem thêm thông tin chi tiết
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
