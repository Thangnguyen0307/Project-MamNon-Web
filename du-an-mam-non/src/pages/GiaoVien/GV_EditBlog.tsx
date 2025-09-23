import { Link, useParams } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import ComponentCard from "../../components/common/ComponentCard";
import FileInput from "../../components/form/input/FileInput";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import Button from "../../components/ui/button/Button";
import toast from "react-hot-toast";
import VideoPlayer from "../../components/common/VideoPlayer";

interface VideoUpload {
  name: string;
  file: File;
  url: string;
  chunks: Blob[];
  initId?: string;
}
interface VideosData {
  _id: string;
  m3u8: string;
  thumbnail: string;
}

interface BlogParams {
  images: File[];
  videos: VideoUpload[];
}

interface BlogData {
  title: string;
  content: string;
  class: string;
  images: string[];
  videos: VideosData[];
  videosRemove: VideosData[];
}

const GV_EditBlog = () => {
  const { classId, blogId } = useParams();
  const CHUNK_SIZE = 5 * 1024 * 1024;
  const [mount, setMount] = useState(false);
  const [uploadPercent, setUploadPercent] = useState<Record<string, number>>(
    {}
  );
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    content: "",
    class: "",
    images: [],
    videos: [],
    videosRemove: [],
  });
  const [blogParams, setBlogParams] = useState<BlogParams>({
    images: [],
    videos: [],
  });

  console.log(blogData);

  useEffect(() => {
    getDetailBlog();
  }, [classId]);

  const handleValueChange = (key: string, value: string) => {
    setBlogData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleFileChange = (files: FileList | null) => {
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

  const handleVideoChange = async (files: FileList | null) => {
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

  console.log(blogParams);

  const getDetailBlog = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.BLOG.DETAIL_BLOG(blogId as string)
      );
      if (response.data.data) {
        setBlogData({
          ...response.data.data,
          images: response.data.data.images ?? [],
        });
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Load data fail");
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

  const editBlogFormData = async () => {
    if (mount) {
      return;
    }
    setMount(true);
    try {
      const uploadedInitIds: string[] = [];
      for (const video of blogParams.videos) {
        try {
          console.log(`🚀 Upload video: ${video.name}`);

          const initId = await createInit();
          uploadedInitIds.push(initId);
          console.log(initId);

          for (let i = 0; i < video.chunks.length; i++) {
            await uploadChunk(initId, video.chunks[i], i, video.chunks.length);
            const percent = Math.floor(((i + 1) / video.chunks.length) * 100);
            setUploadPercent((prev) => ({
              ...prev,
              [initId]: percent,
            }));

            console.log(`✅ Uploaded chunk ${i + 1}/${video.chunks.length}`);
          }

          console.log(`🎉 Hoàn tất video: ${video.name}`);
        } catch (err) {
          console.error(`❌ Lỗi upload video: ${video.name}`, err);
        }
      }

      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("class", classId as string);

      if (blogData.images && blogData.images.length > 0) {
        blogData.images.forEach((url) => {
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

      if (blogData.videosRemove && blogData.videosRemove.length > 0) {
        blogData.videosRemove.forEach((video) => {
          formData.append("removeVideoIds", video._id);
        });
      }

      const response = await axiosInstance.put(
        API_PATHS.BLOG.UPDATE_BLOG(blogId as string),
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
                <p className="text-sm text-gray-600">Tạo bài viết thành công</p>
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
      setMount(false);
    }
  };

  return (
    <div className="py-10">
      <div className="w-full max-w-3xl mx-auto bg-white shadow rounded-xl p-3 sm:p-4 border border-gray-200">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Tiêu đề bài viết</Label>
            <Input
              value={blogData.title}
              type="text"
              id="title"
              name="title"
              placeholder="Vui lòng nhập tiêu đề"
              onChange={({ target }) => {
                handleValueChange(target.name, target.value);
              }}
            />
          </div>
          <div>
            <Label>Nội dung bài viết</Label>
            <TextArea
              value={blogData.content}
              name="content"
              rows={8}
              placeholder="Vui lòng nhập nội dung"
              onChange={({ target }) => {
                handleValueChange(target.name, target.value);
              }}
            />
          </div>
          <ComponentCard title="Danh sách hình ảnh hiện tại">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {blogData.images.map((file, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-square border rounded-lg overflow-hidden">
                  <img
                    src={`https://techleaf.pro/projects/mam-non-media${file}`}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setBlogData((prev) =>
                        prev
                          ? {
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
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
              <Label>Chọn file video (mp4)</Label>

              <div className="grid grid-cols-2 gap-4 mt-5">
                {blogData.videos.map((video, index) => (
                  <div key={index} className="relative">
                    <VideoPlayer
                      src={`https://techleaf.pro/projects/mam-non-media${video.m3u8}`}
                      controls
                      className="w-full h-40 object-cover rounded-lg shadow"
                    />
                    <button
                      onClick={() =>
                        setBlogData((prev) =>
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
                {blogData.videosRemove?.map((video, index) => (
                  <div key={index} className="relative">
                    <VideoPlayer
                      src={`https://techleaf.pro/projects/mam-non-media${video.m3u8}`}
                      controls
                      className="w-full h-40 object-cover rounded-lg shadow"
                    />
                    <button
                      onClick={() =>
                        setBlogData((prev) =>
                          prev
                            ? {
                                ...prev,
                                videosRemove: prev.videosRemove.filter(
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
                              images: prev.images.filter((_, i) => i !== index),
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
          <ComponentCard title="Video">
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
                      <div className="text-sm mb-1">Video: {index + 1}</div>
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
        </div>
        <div className="flex items-center gap-3 mt-3">
          <Button
            variant="orange"
            size="sm"
            onClick={editBlogFormData}
            disabled={mount}>
            Cập nhật bài viết
          </Button>
          <Link to={"/giaovien"}>
            <Button variant="orange" size="sm">
              Quay về
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GV_EditBlog;
