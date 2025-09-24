import { useEffect, useState } from "react";
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

type Props = {
  limit?: number;
  className?: string;
  bg?: string;
};

const FALLBACK_IMAGE = "/images/cards/card-03.png";

export default function BlogsCarousel({
  limit = 12,
  className = "",
  bg = "bg-gray-50",
}: Props) {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/Blogs", {
          params: { limit },
        });
        if (res.data?.success) {
          setBlogs(res.data.data.blogs);
        } else {
          setError("Không thể tải dữ liệu blog");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [limit]);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return FALLBACK_IMAGE;
    if (imagePath.startsWith("http")) return imagePath;
    return `${
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
    }${imagePath}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className={`mx-auto w-full ${bg} py-12 md:py-16 ${className}`}>
        <div className="mx-auto w-full max-w-2xl px-4">
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-xl shadow-sm border border-gray-200"
              >
                {/* Header skeleton */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Content skeleton */}
                <div className="px-4 py-3">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Image skeleton */}
                <div className="w-full h-64 bg-gray-200"></div>

                {/* Footer skeleton */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`mx-auto w-full ${bg} py-12 md:py-16 ${className}`}>
        <div className="mx-auto w-full max-w-2xl px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-red-700 mb-2">{error}</h3>
            <p className="text-gray-600 mb-4">
              Có vẻ như có sự cố khi tải dữ liệu blog
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Thử lại
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`mx-auto w-full ${bg} py-12 md:py-16 ${className}`}>
      <div className="mx-auto w-full max-w-2xl px-4">
        {blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              Chưa có bài viết nào
            </h3>
            <p className="text-gray-500 text-lg">
              Hãy quay lại sau để xem những tin tức mới nhất!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog, index) => (
              <article
                key={blog._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Author header - Facebook style */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {blog.author
                          ? blog.author.fullName.charAt(0).toUpperCase()
                          : "?"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {blog.author ? blog.author.fullName : "Ẩn danh"}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 space-x-1">
                          <span>{formatDate(blog.createdAt)}</span>
                          <span>lúc</span>
                          <span>{formatTime(blog.createdAt)}</span>
                          {blog.class && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600 font-medium">
                                {blog.class.level.name} - {blog.class.name}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Post content */}
                <div className="px-4 py-3">
                  {/* Title */}
                  {blog.title && (
                    <h3 className="text-gray-900 font-medium text-lg mb-3 leading-relaxed">
                      {blog.title}
                    </h3>
                  )}

                  {/* Content */}
                  <div className="text-gray-700 text-sm leading-relaxed mb-4">
                    <p className="whitespace-pre-line">
                      {blog.content.length > 300 ? (
                        <>
                          {blog.content.substring(0, 300)}...
                          <button className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                            Xem thêm
                          </button>
                        </>
                      ) : (
                        blog.content
                      )}
                    </p>
                  </div>
                </div>

                {/* Images/Media */}
                {blog.images && blog.images.length > 0 && (
                  <div className="relative">
                    <img
                      src={getImageUrl(blog.images[0])}
                      alt={blog.title}
                      className="w-full h-auto max-h-96 object-cover cursor-pointer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />

                    {/* Media count overlay */}
                    {(blog.images.length > 1 ||
                      (blog.videos && blog.videos.length > 0)) && (
                      <div className="absolute top-4 left-4 flex space-x-2">
                        {blog.images.length > 1 && (
                          <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                            📷 {blog.images.length} ảnh
                          </span>
                        )}
                        {blog.videos && blog.videos.length > 0 && (
                          <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
                            🎥 {blog.videos.length} video
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Post actions - simplified */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center space-x-1 text-xs">
                      <span className="text-gray-500">
                        Đăng bởi {blog.author?.fullName || "Ẩn danh"}
                      </span>
                    </div>

                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                      Xem chi tiết →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
