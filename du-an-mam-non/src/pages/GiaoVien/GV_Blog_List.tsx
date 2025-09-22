import React, { useEffect, useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";
import Button from "../../components/ui/button/Button";
import VideoPlayer from "../../components/common/VideoPlayer";

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

const GV_Blog_List: React.FC = () => {
  const { classId } = useParams();
  const BASE_MEDIA_URL = "https://techleaf.pro/projects/mam-non-media";
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [blogsData, setBlogsData] = useState<BlogsData[]>([]);
  const [currentSlides, setCurrentSlides] = useState<CustomSlide[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  useEffect(() => {
    fetchAllBlogs();
  }, [pagination.page, classId]);

  const fetchAllBlogs = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.BLOG.GET_ALL_BLOGS}?page=${pagination.page}&limit=${pagination.limit}&class=${classId}`
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

  console.log(currentSlides);

  const buildAllMedia = (
    images: string[] | null,
    videos: VideoInfo[] | null
  ) => {
    return [
      ...(images || []).map((u) => ({ src: u, type: "image" as const })),
      ...(videos || []).map((v) => ({ src: v.m3u8, type: "video" as const })),
    ];
  };

  const renderMedia = (images: string[] | null, videos: VideoInfo[] | null) => {
    const allMedia = buildAllMedia(images, videos);

    if (allMedia.length === 0) return null;
    const totalExtra = allMedia.length - 1;
    return (
      <div
        className="relative cursor-pointer"
        onClick={() => {
          const slides = allMedia.map((m) => ({
            src: m.src,
            type: m.type,
          }));
          setCurrentSlides(slides as unknown as CustomSlide[]);
          setIndex(0);
          setOpen(true);
        }}>
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
            className="w-full aspect-video object-cover rounded-lg"
          />
        )}

        {totalExtra > 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <span className="text-white text-3xl font-bold">+{totalExtra}</span>
          </div>
        )}
      </div>
    );
  };

  const deleteBlogs = async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.BLOG.DELETE_BLOG(id)
      );
      if (response) {
        toast.success("Xoá bài viết thành công");
        fetchAllBlogs();
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-[#F6F1E4]">
      {/* Header */}
      {blogsData?.length > 0 ? (
        blogsData.map((blog: BlogsData) => (
          <div className="pt-10 px-2">
            <div className="w-full max-w-3xl mx-auto bg-white shadow rounded-xl p-3 sm:p-4 border border-gray-200 ">
              <div className="flex items-center justify-between space-x-3 mb-3">
                <div className="min-w-0">
                  <p className="font-semibold text-sm sm:text-base truncate">
                    {blog.author.fullName}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {blog.class.name} - {blog.class.level.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {dayjs(blog.createdAt).format("DD-MM-YYYY hh:mm")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/giaovien/chinhsuabaiviet/${classId}/${blog._id}`}>
                    <Button size="sm" variant="orange">
                      Chỉnh sửa
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteBlogs(blog._id)}>
                    Xoá
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="mb-3 text-sm sm:text-base">
                <p className="font-medium">{blog.title}</p>
                <p className="list-disc list-inside text-gray-700 mt-2">
                  {blog.content}
                </p>
              </div>

              {/* Media */}
              <div>{renderMedia(blog.images, blog.videos)}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-8 text-xl font-medium">
          Chưa có bài viết nào
        </p>
      )}
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
    </div>
  );
};

export default GV_Blog_List;
