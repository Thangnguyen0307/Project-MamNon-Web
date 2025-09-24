import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { axiosInstance } from "../../utils/axiosInstance";

type ApiBlog = {
  _id: string;
  title: string;
  content: string;
  images: string[];
  videos: Array<{
    _id: string;
    m3u8: string;
    thumbnail: string;
    status: string;
    createdAt: string;
  }>;
  author: {
    _id: string;
    email: string;
    fullName: string;
  } | null;
  class: {
    _id: string;
    name: string;
    level: {
      _id: string;
      name: string;
    };
  };
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    blogs: ApiBlog[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
};

type Props = {
  title?: string;
  limit?: number;
  className?: string;
  bg?: string;
};

const FALLBACK_IMAGE = "/images/cards/card-03.png";

export default function BlogsCarousel({
  title = "TIN TỨC & HOẠT ĐỘNG",
  limit = 6,
  className = "",
  bg = "bg-white",
}: Props) {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get<ApiResponse>("/api/Blogs", {
        params: { page, limit },
      });
      
      if (res.data?.success) {
        setBlogs(res.data.data.blogs);
        setTotalPages(res.data.data.pagination.pages);
      } else {
        setError("Không thể tải dữ liệu blog");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, limit]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}${imagePath}`;
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        ‹
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
            i === currentPage
              ? "text-white bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] border-transparent"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        ›
      </button>
    );

    return pages;
  };

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

      <div className="mx-auto w-full max-w-screen-xl px-4 relative z-10">
        {/* Title */}
        <div className="text-center">
          <div className="inline-block animate-bounce">
            <span className="text-4xl">📰</span>
          </div>
          <h2 className="text-[22px] md:text-[28px] font-bold tracking-wide text-[#6c2bd9] mt-4 animate-fade-in-up">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-[#88CE58] to-[#6c2bd9] animate-pulse" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Cập nhật những tin tức mới nhất và hoạt động thú vị của trường mầm non
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <span className="text-xl mr-2">⚠️</span>
              {error}
            </div>
            <button
              onClick={() => fetchBlogs(currentPage)}
              className="mt-4 px-6 py-2 bg-[#6c2bd9] text-white rounded-lg hover:bg-[#5a1fb5] transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && !error && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-3 w-full rounded bg-gray-200"></div>
                  <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog content */}
        {!loading && !error && (
          <>
            {blogs.length === 0 ? (
              <div className="mt-10 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Chưa có bài viết nào
                </h3>
                <p className="text-gray-500">
                  Hãy quay lại sau để xem những tin tức mới nhất!
                </p>
              </div>
            ) : (
              <div
                className="mt-8 animate-fade-in-up"
                style={{ animationDelay: "600ms" }}
              >
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 3,
                  }}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  spaceBetween={20}
                  loop={blogs.length > 3}
                  speed={800}
                  grabCursor={true}
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="blogs-swiper !pt-8 !pb-12"
                >
                  {blogs.map((blog, index) => (
                    <SwiperSlide key={blog._id}>
                      <article
                        className="group rounded-2xl border border-gray-100 bg-white shadow-[0_2px_14px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_6px_20px_rgba(108,43,217,0.15)] animate-fade-in-up relative overflow-hidden cursor-pointer"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        {/* Image container */}
                        <div className="aspect-[4/3] overflow-hidden rounded-t-2xl relative">
                          <img
                            src={blog.images.length > 0 ? getImageUrl(blog.images[0]) : FALLBACK_IMAGE}
                            alt={blog.title}
                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                          />
                          
                          {/* Category badge */}
                          <div className="absolute top-3 left-3">
                            <span className="bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                              {blog.class.level.name}
                            </span>
                          </div>

                          {/* Media indicators */}
                          <div className="absolute top-3 right-3 flex space-x-2">
                            {blog.images.length > 1 && (
                              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                📷 {blog.images.length}
                              </span>
                            )}
                            {blog.videos.length > 0 && (
                              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                🎥 {blog.videos.length}
                              </span>
                            )}
                          </div>

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              <span className="mr-1">📅</span>
                              {formatDate(blog.createdAt)}
                            </span>
                            <span className="text-[#6c2bd9] font-medium">
                              {blog.class.name}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#6c2bd9] transition-colors duration-300 mb-3 line-clamp-2">
                            {blog.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {truncateContent(blog.content)}
                          </p>

                          {/* Author info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {blog.author ? blog.author.fullName.charAt(0).toUpperCase() : "?"}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {blog.author ? blog.author.fullName : "Ẩn danh"}
                                </p>
                                <p className="text-xs text-gray-500">Tác giả</p>
                              </div>
                            </div>
                            
                            <button className="text-[#6c2bd9] hover:text-[#88CE58] transition-colors duration-300 text-sm font-medium">
                              Đọc thêm →
                            </button>
                          </div>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom navigation buttons */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                  <button className="swiper-button-prev !static !w-10 !h-10 !bg-white !rounded-full !shadow-lg !border border-gray-200 hover:!bg-gray-50 transition-colors duration-200 !text-[#6c2bd9] !text-lg !font-bold after:!text-sm after:!font-bold">
                  </button>
                  <button className="swiper-button-next !static !w-10 !h-10 !bg-white !rounded-full !shadow-lg !border border-gray-200 hover:!bg-gray-50 transition-colors duration-200 !text-[#6c2bd9] !text-lg !font-bold after:!text-sm after:!font-bold">
                  </button>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center">
                    <div className="flex items-center space-x-1">
                      {renderPagination()}
                    </div>
                    <div className="ml-6 text-sm text-gray-600">
                      Trang {currentPage} / {totalPages}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}