import React, { useEffect, useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS, BASE_URL_MEDIA } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useParams } from "react-router";
import VideoPlayer from "../../components/common/VideoPlayer";
import { motion } from "framer-motion";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/ui/button/Button";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import ComponentCard from "../../components/common/ComponentCard";
import FileInput from "../../components/form/input/FileInput";

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
  name: string;
  file: File;
  url: string;
  chunks: Blob[];
  initId?: string;
}

interface BlogParams {
  images: File[];
  videos: VideoInfo[];
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
  videosRemove: VideoInfo[];
}

const GV_Blog_List: React.FC = () => {
  const { classId } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const CHUNK_SIZE = 5 * 1024 * 1024;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const defaultBlogPrams: BlogParams = { images: [], videos: [] };
  const defaultBlogDataDetail: BlogsData = {
    _id: "",
    title: "",
    content: "",
    class: {
      id: "",
      name: "",
      level: {
        _id: "",
        name: "",
      },
    },
    images: [],
    author: {
      id: "",
      email: "",
      fullName: "",
    },
    videos: [],
    videosRemove: [],
    createdAt: "",
    updatedAt: "",
  };
  const [blogParams, setBlogParams] = useState<BlogParams>(defaultBlogPrams);
  const [blogDataDetail, setBlogDataDetail] = useState<BlogsData>(
    defaultBlogDataDetail
  );
  const [uploadPercent, setUploadPercent] = useState<Record<string, number>>(
    {}
  );
  const [blogsData, setBlogsData] = useState<BlogsData[]>([]);
  const [currentSlides, setCurrentSlides] = useState<CustomSlide[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
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

  const getDetailBlog = async (id: string) => {
    try {
      const response = await axiosInstance.get(API_PATHS.BLOG.DETAIL_BLOG(id));
      if (response.data.data) {
        setBlogDataDetail({
          ...response.data.data,
          images: response.data.data.images ?? [],
        });
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Load data fail");
    }
  };

  const setPage = (key: string, value: number) => {
    setPagination((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const mapBlogsWithFullImages = (blogs: BlogsData[]): BlogsData[] => {
    return blogs.map((blog) => ({
      ...blog,
      images: blog.images?.map((img) => `${BASE_URL_MEDIA}${img}`) || [],
      videos:
        blog.videos?.map((video) => ({
          ...video,
          m3u8: `${BASE_URL_MEDIA}${video.m3u8}`,
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

  const createInit = async () => {
    const response = await axiosInstance.post(API_PATHS.VIDEO.INIT_VIDEO, {});
    return response.data.data._id;
  };

  const uploadChunk = async (
    initId: string,
    chunk: Blob,
    chunkIndex: number,
    totalChunks: number
  ) => {
    const formData = new FormData();
    formData.append("chunkIndex", chunkIndex.toString());
    formData.append("totalChunks", totalChunks.toString());
    formData.append("file", chunk);

    await axiosInstance.post(
      `${API_PATHS.VIDEO.UPLOAD_CHUNK(initId)}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const handleValueChange = (key: string, value: string) => {
    setBlogDataDetail((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileChange = (files: File[] | null) => {
    if (!files) return;
    const selected = Array.from(files);
    console.log(selected);

    if (blogParams.images?.length >= 10) {
      toast.error("Vui lòng chọn tối đa 10 ảnh!!");
    } else {
      setBlogParams((prev) => ({
        ...prev,
        images: [...prev.images, ...selected],
      }));
    }
  };

  const handleVideoChange = async (files: File[] | null) => {
    if (!files) return;

    const selectedVideos = Array.from(files)
      .filter((file) => file.type === "video/mp4")
      .map((file) => {
        const chunks: Blob[] = [];
        for (let start = 0; start < file.size; start += CHUNK_SIZE) {
          const end = Math.min(start + CHUNK_SIZE, file.size);
          chunks.push(file.slice(start, end));
        }

        return {
          _id: "",
          m3u8: "",
          thumbnail: "",
          name: file.name,
          file: file,
          url: URL.createObjectURL(file),
          chunks: chunks,
          initId: "",
        };
      });
    setBlogParams((prev) => ({
      ...prev,
      videos: [...prev.videos, ...selectedVideos],
    }));
  };

  const handleRemoveVideo = (index: number) => {
    setBlogParams((prev) => {
      URL.revokeObjectURL(prev.videos[index].url);

      return {
        ...prev,
        videos: prev.videos.filter((_, i) => i !== index),
      };
    });
  };

  const handleCreate = () => {
    setBlogDataDetail(defaultBlogDataDetail);
    setOpenMenuId(null);
    openModal();
  };
  const handleUpdate = (id: string) => {
    getDetailBlog(id);
    setOpenMenuId(id);
    openModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!openMenuId) {
      if (loading) return;
      setLoading(true);
      try {
        const uploadedInitIds: string[] = [];
        for (const video of blogParams.videos) {
          try {
            const initId = await createInit();
            uploadedInitIds.push(initId);
            for (let i = 0; i < video.chunks.length; i++) {
              await uploadChunk(
                initId,
                video.chunks[i],
                i,
                video.chunks.length
              );
              const percent = Math.floor(((i + 1) / video.chunks.length) * 100);
              setUploadPercent((prev) => ({
                ...prev,
                [initId]: percent,
              }));
            }
          } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            if (error.response && error.response.data.message) {
              toast.error(`❌ Lỗi upload video: ${video.name}`);
            }
          }
        }

        const formData = new FormData();
        formData.append("title", blogDataDetail.title);
        formData.append("content", blogDataDetail.content);
        formData.append("class", classId as string);
        uploadedInitIds.forEach((id) => {
          formData.append("videoIds", id);
        });

        if (blogParams.images && blogParams.images.length > 0) {
          blogParams.images.forEach((file) => {
            formData.append("images", file);
          });
        }

        const response = await axiosInstance.post(
          API_PATHS.BLOG.CREATE_BLOG,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          toast.custom(
            (t) => (
              <div className="relative flex items-start w-80 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                <div className="flex-shrink-0 text-2xl mr-3">✅</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    Tạo bài viết thành công
                  </p>
                </div>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  ✖
                </button>
              </div>
            ),
            { duration: Infinity }
          );
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Lỗi khi tạo bài viết");
      } finally {
        setLoading(false);
        closeModal();
        fetchAllBlogs();
      }
    } else {
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        const uploadedInitIds: string[] = [];
        for (const video of blogParams.videos) {
          try {
            const initId = await createInit();
            uploadedInitIds.push(initId);
            console.log(initId);

            for (let i = 0; i < video.chunks.length; i++) {
              await uploadChunk(
                initId,
                video.chunks[i],
                i,
                video.chunks.length
              );
              const percent = Math.floor(((i + 1) / video.chunks.length) * 100);
              setUploadPercent((prev) => ({
                ...prev,
                [initId]: percent,
              }));
            }

            console.log(`🎉 Hoàn tất video: ${video.name}`);
          } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(
              err.response?.data?.message || "Lỗi khi cập nhật bài viết"
            );
          }
        }

        const formData = new FormData();
        formData.append("title", blogDataDetail.title);
        formData.append("content", blogDataDetail.content);
        formData.append("class", classId as string);

        if (blogDataDetail.images && blogDataDetail.images.length > 0) {
          blogDataDetail.images.forEach((url) => {
            formData.append("existingImages", url);
          });
        }

        if (blogParams.images && blogParams.images.length > 0) {
          blogParams.images.forEach((url) => {
            formData.append("images", url);
          });
        }

        uploadedInitIds.forEach((id) => {
          formData.append("addVideoIds", id);
        });

        if (
          blogDataDetail.videosRemove &&
          blogDataDetail.videosRemove.length > 0
        ) {
          blogDataDetail.videosRemove.forEach((video) => {
            formData.append("removeVideoIds", video._id);
          });
        }

        const response = await axiosInstance.put(
          API_PATHS.BLOG.UPDATE_BLOG(openMenuId),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          toast.custom(
            (t) => (
              <div className="relative flex  w-80 max-w-sm bg-white border border-gray-200 rounded-lg items-center shadow-lg p-4">
                <div className="flex-shrink-0 text-2xl mr-3">✅</div>
                <div className="">
                  <p className="text-sm text-gray-600">
                    Cập nhật bài viết thành công
                  </p>
                </div>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  ✖
                </button>
              </div>
            ),
            { duration: Infinity }
          );
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Lỗi khi cập nhật bài viết");
      } finally {
        setLoading(false);
        closeModal();
        fetchAllBlogs();
      }
    }
  };

  return (
    <div className="">
      {/* Header */}
      {blogsData?.length > 0 ? (
        blogsData.map((blog: BlogsData) => (
          <div className="pt-4 px-2">
            <div className="w-full max-w-3xl mx-auto bg-white shadow rounded-xl p-3 sm:p-4 border border-gray-200 ">
              <div className="flex items-center justify-between space-x-3 mb-3">
                <div className="min-w-0">
                  <p className="font-semibold text-sm sm:text-base truncate">
                    {blog.author?.fullName}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {blog.class.name} - {blog.class.level.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {dayjs(blog.createdAt).format("DD-MM-YYYY hh:mm")}
                  </p>
                </div>
                <div className="relative inline-block text-left">
                  <button
                    onClick={() =>
                      setOpenMenuId((prev) =>
                        prev === blog._id ? null : blog._id
                      )
                    }
                    className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" />
                    </svg>
                  </button>

                  {openMenuId === blog._id && (
                    <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md  bg-white shadow-lg ring-1 ring-[#F6F1E4] ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() => handleUpdate(blog._id)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600">
                          ✏️ Chỉnh sửa
                        </button>
                        <button
                          onClick={() => deleteBlogs(blog._id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
                          🗑️ Xoá
                        </button>
                      </div>
                    </div>
                  )}
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
              <div>{renderMedia(blog.images, blog.videos as VideoInfo[])}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center py-8 text-xl font-medium">
          Chưa có bài viết nào
        </p>
      )}

      <div className="max-w-3xl mt-2 mx-auto">
        <Pagination
          total={pagination.total}
          limit={pagination.limit}
          current={pagination.page}
          setPage={setPage}
          removeBorder={true}
        />
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 transition duration-300
          text-sm md:text-base md:px-5 md:py-3">
          <span className="text-lg md:text-xl">➕</span>
          <span className="font-semibold hidden sm:inline">Thêm bài viết</span>
        </button>
      </motion.div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[1000px] m-4">
        <div className="scrollbar relative max-h-[700px] w-full max-w-[1000px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 text-center">
              {!openMenuId ? "Tạo mới bài viết" : "Chỉnh sủa bài viết"}
            </h4>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 mb-3">
                <Label htmlFor="title">Tiêu đề bài viết</Label>
                <Input
                  value={blogDataDetail.title}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Vui lòng nhập tiêu đề"
                  onChange={({ target }) => {
                    handleValueChange(target.name, target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-6 gap-y-2">
                <ComponentCard title="Thêm hình ảnh">
                  <div>
                    <Label>Chọn file hình ảnh</Label>
                    <FileInput
                      onFilesSelected={handleFileChange}
                      className="custom-class"
                      multiple
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {blogParams.images?.map((file, index) => (
                      <div
                        key={index}
                        className="relative w-full aspect-square border rounded-lg overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Nút xóa */}
                        <button
                          type="button"
                          onClick={() =>
                            setBlogParams((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    images: prev.images.filter(
                                      (_, i) => i !== index
                                    ),
                                  }
                                : prev
                            )
                          }
                          className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </ComponentCard>
                <ComponentCard title="Thêm video">
                  <div>
                    <Label>Chọn file video (mp4)</Label>
                    <FileInput
                      onFilesSelected={handleVideoChange}
                      accept="video/mp4"
                      className="custom-class"
                      multiple
                    />
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      {blogParams.videos.map((video, index) => (
                        <div key={index} className="relative">
                          <video
                            src={video.url}
                            controls
                            className="w-full h-40 object-cover rounded-lg shadow"
                          />
                          <button
                            onClick={() => handleRemoveVideo(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            Xóa
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {Object.keys(uploadPercent).length > 0 && (
                    <div>
                      {Object.entries(uploadPercent).map(
                        ([videoId, percent], index) => (
                          <div key={videoId} className="mb-2">
                            <div className="text-sm mb-1">
                              Video: {index + 1}
                            </div>
                            <div className="w-full bg-gray-200 rounded">
                              <div
                                className="bg-green-500 text-xs leading-none py-1 text-center text-white rounded"
                                style={{ width: `${percent}%` }}>
                                {percent}%
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </ComponentCard>
                {openMenuId && (
                  <>
                    <ComponentCard title="Danh sách hình ảnh hiện tại">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {blogDataDetail.images.map((file, index) => (
                          <div
                            key={index}
                            className="relative w-full aspect-square border rounded-lg overflow-hidden">
                            <img
                              src={`${BASE_URL_MEDIA}${file}`}
                              alt={`preview-${index}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setBlogDataDetail((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        images: prev.images.filter(
                                          (_, i) => i !== index
                                        ),
                                      }
                                    : prev
                                )
                              }
                              className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </ComponentCard>
                    <ComponentCard title="Danh sách video hiện tại">
                      <div>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                          {blogDataDetail.videos.map((video, index) => (
                            <div key={index} className="relative">
                              <VideoPlayer
                                src={`${BASE_URL_MEDIA}${video.m3u8}`}
                                controls
                                className="w-full h-40 object-cover rounded-lg shadow"
                              />
                              <button
                                onClick={() =>
                                  setBlogDataDetail((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          videos: prev.videos.filter(
                                            (_, i) => i !== index
                                          ),
                                          videosRemove: [
                                            ...(prev.videosRemove ?? []),
                                            prev.videos[index],
                                          ],
                                        }
                                      : prev
                                  )
                                }
                                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                Xóa
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ComponentCard>
                    <ComponentCard title="Danh sách video muốn gỡ bỏ">
                      <div>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                          {blogDataDetail.videosRemove?.map((video, index) => (
                            <div key={index} className="relative">
                              <VideoPlayer
                                src={`${BASE_URL_MEDIA}${video.m3u8}`}
                                controls
                                className="w-full h-40 object-cover rounded-lg shadow"
                              />
                              <button
                                onClick={() =>
                                  setBlogDataDetail((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          videosRemove:
                                            prev.videosRemove.filter(
                                              (_, i) => i !== index
                                            ),
                                          videos: [
                                            ...prev.videos,
                                            prev.videosRemove[index],
                                          ],
                                        }
                                      : prev
                                  )
                                }
                                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                Hoàn tác
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ComponentCard>
                  </>
                )}

                <div>
                  <Label>Nội dung bài viết</Label>
                  <TextArea
                    value={blogDataDetail.content}
                    name="content"
                    rows={8}
                    placeholder="Vui lòng nhập nội dung"
                    onChange={({ target }) => {
                      handleValueChange(target.name, target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Button
                size="sm"
                variant="outline"
                type="button"
                disabled={loading}
                onClick={closeModal}>
                Hủy
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={loading}
                className="bg-brand-500 text-white">
                {!openMenuId ? "Tạo mới" : "Cập nhật"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
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
