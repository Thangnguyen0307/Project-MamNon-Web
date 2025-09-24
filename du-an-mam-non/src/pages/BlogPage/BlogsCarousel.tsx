import { useEffect, useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import VideoPlayer from "../../components/common/VideoPlayer";
import { motion } from "framer-motion";

interface VideoSlide {
  type: "video";
  src: string;
}
type CustomSlide = SlideImage | VideoSlide;

export interface Author {
  id: string;
  email: string;
  fullName: string;
}

export interface Level {
  _id: string;
  name: string;
}

interface ClassInfo {
  id: string;
  name: string;
  level: Level;
}

interface VideoInfo {
  _id: string;
  m3u8: string;
  thumbnail: string;
}

export interface BlogsData {
  _id: string;
  title: string;
  content: string;
  images: string[];
  videos: VideoInfo[];
  author: Author;
  class: ClassInfo;
  createdAt: string;
  updatedAt: string;
}

type Props = {
  limit?: number;
  className?: string;
  bg?: string;
};

export default function BlogsCarousel({
  limit = 5, // Reduced for vertical layout
  className = "",
  bg = "bg-gray-50",
}: Props) {
  const BASE_MEDIA_URL = "https://techleaf.pro/projects/mam-non-media";
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [blogsData, setBlogsData] = useState<BlogsData[]>([]);
  const [currentSlides, setCurrentSlides] = useState<CustomSlide[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: limit,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchAllBlogs();
  }, [pagination.page, limit]);

  const fetchAllBlogs = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.BLOG.GET_ALL_BLOGS}?page=${pagination.page}&limit=${pagination.limit}`
      );
      if (response.data.data.blogs?.length > 0) {
        const mapped = mapBlogsWithFullImages(response.data.data.blogs);
        setBlogsData(mapped);
        setPagination(response.data.data.pagination);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const mapBlogsWithFullImages = (blogs: BlogsData[]): BlogsData[] => {
    return blogs.map((blog) => ({
      ...blog,
      images: blog.images?.map((img) => `${BASE_MEDIA_URL}${img}`) || [],
      videos:
        blog.videos?.map((video) => ({
          ...video,
          m3u8: `${BASE_MEDIA_URL}${video.m3u8}`,
        })) || [],
    }));
  };

  const buildAllMedia = (
    images: string[] | null,
    videos: VideoInfo[] | null
  ) => {
    return [
      ...(images || []).map((u) => ({ src: u, type: "image" as const })),
      ...(videos || []).map((v) => ({
        src: v.m3u8,
        type: "video" as const,
      })),
    ];
  };

  const renderMedia = (images: string[] | null, videos: VideoInfo[] | null) => {
    const allMedia = buildAllMedia(images, videos);

    if (allMedia.length === 0) return null;
    const totalExtra = allMedia.length - 1;

    return (
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={() => {
            const slides = allMedia.map((m) => ({
              src: m.src,
              type: m.type,
            }));
            setCurrentSlides(slides as unknown as CustomSlide[]);
            setIndex(0);
            setOpen(true);
          }}
        >
          {allMedia[0].type === "video" ? (
            <VideoPlayer
              src={allMedia[0].src}
              className="w-full aspect-video object-cover rounded-lg"
              controls
            />
          ) : (
            <img
              src={allMedia[0].src}
              alt="media preview"
              className="w-full aspect-video object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {totalExtra > 0 && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            +{totalExtra} thêm
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <section className={`mx-auto w-full ${bg} py-12 md:py-16 ${className}`}>
        <div className="mx-auto w-full max-w-4xl px-4">
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="animate-pulse bg-white rounded-xl shadow-lg border border-gray-200"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-28 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`mx-auto w-full ${bg} py-12 md:py-16 ${className}`}>
      <div className="mx-auto w-full max-w-4xl px-4">
        {blogsData?.length > 0 ? (
          <div className="space-y-8">
            {blogsData.map((blog: BlogsData, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Author header */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6c2bd9] to-[#88CE58] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {blog.author?.fullName?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-xl mb-1">
                        {blog.author?.fullName || "Ẩn danh"}
                      </p>
                      <div className="flex flex-col text-sm text-gray-600">
                        <p className="font-medium">
                          {blog.class?.name} - {blog.class?.level?.name}
                        </p>
                        <p className="text-gray-500">
                          {dayjs(blog.createdAt).format("DD/MM/YYYY • HH:mm")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-5">
                  <h3 className="font-bold text-2xl text-gray-900 mb-4 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed mb-6">
                    {blog.content}
                  </p>
                </div>

                {/* Media */}
                <div className="px-6 pb-6">
                  {renderMedia(blog.images, blog.videos)}
                </div>

                {/* Footer with stats only */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    {blog.images?.length > 0 && (
                      <span className="flex items-center gap-2 font-medium">
                        <span className="text-blue-500">📷</span>
                        {blog.images.length} ảnh
                      </span>
                    )}
                    {blog.videos?.length > 0 && (
                      <span className="flex items-center gap-2 font-medium">
                        <span className="text-red-500">🎥</span>
                        {blog.videos.length} video
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="text-8xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Chưa có bài viết nào
              </h3>
              <p className="text-gray-600 text-lg">
                Hãy quay lại sau để xem những tin tức mới nhất từ trường mầm
                non!
              </p>
            </div>
          </motion.div>
        )}

        {/* Pagination Controls */}
        {blogsData?.length > 0 && pagination.pages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center space-x-4 mt-12"
          >
            {/* Previous Button */}
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: Math.max(1, prev.page - 1),
                }))
              }
              disabled={pagination.page === 1 || loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <svg
                className="w-4 h-4"
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
              Trước
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const startPage = Math.max(1, pagination.page - 2);
                const pageNumber = startPage + i;
                if (pageNumber > pagination.pages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, page: pageNumber }))
                    }
                    disabled={loading}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                      pagination.page === pageNumber
                        ? "bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: Math.min(prev.pages, prev.page + 1),
                }))
              }
              disabled={pagination.page === pagination.pages || loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Tiếp
              <svg
                className="w-4 h-4"
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
          </motion.div>
        )}

        {/* Page Info */}
        {blogsData?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-sm text-gray-600"
          >
            Trang {pagination.page} / {pagination.pages} • Tổng{" "}
            {pagination.total} bài viết
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={currentSlides as unknown as SlideImage[]}
        render={{
          slide: ({ slide }) => {
            const s = slide as CustomSlide;
            if (s.type === "video") {
              return (
                <VideoPlayer
                  src={slide.src}
                  className="max-h-full max-w-full"
                  controls
                  autoPlay
                />
              );
            }
            return (
              <img
                src={slide.src}
                alt="media"
                className="max-h-full max-w-full object-contain"
              />
            );
          },
        }}
      />
    </section>
  );
}
