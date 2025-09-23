import { Link, useParams } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import ComponentCard from "../../components/common/ComponentCard";
import FileInput from "../../components/form/input/FileInput";
import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AxiosError } from "axios";
import Button from "../../components/ui/button/Button";
import toast from "react-hot-toast";

interface Blog {
  title: string;
  content: string;
  class: string;
  images: File[];
  videos: VideoUpload[];
}

interface VideoUpload {
  name: string;
  file: File;
  url: string;
  chunks: Blob[];
  initId?: string;
}

const GV_AddBlog = () => {
  const { classId } = useParams();
  const CHUNK_SIZE = 5 * 1024 * 1024;
  const [uploadPercent, setUploadPercent] = useState<Record<string, number>>(
    {}
  );
  const [blogData, setBlogData] = useState<Blog>({
    title: "",
    content: "",
    class: classId as string,
    images: [],
    videos: [],
  });

  const handleValueChange = (key: string, value: string) => {
    setBlogData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files);
    if (blogData.images?.length >= 10) {
      toast.error("Vui lòng chọn tối đa 10 ảnh!!");
    } else {
      setBlogData((prev) => ({
        ...prev,
        images: [...prev.images, ...selected],
      }));
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

    setBlogData((prev) => ({
      ...prev,
      videos: [...prev.videos, ...selectedVideos],
    }));
  };

  const handleRemoveVideo = (index: number) => {
    setBlogData((prev) => {
      URL.revokeObjectURL(prev.videos[index].url);

      return {
        ...prev,
        videos: prev.videos.filter((_, i) => i !== index),
      };
    });
  };

  const createBlogFormData = async () => {
    try {
      const uploadedInitIds: string[] = [];
      for (const video of blogData.videos) {
        try {
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
          }
        } catch (err) {
          console.error(`❌ Lỗi upload video: ${video.name}`, err);
          const error = err as AxiosError<{ message: string }>;
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
          }
        }
      }

      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("class", classId as string);
      uploadedInitIds.forEach((id) => {
        formData.append("videoIds", id);
      });

      if (blogData.images && blogData.images.length > 0) {
        blogData.images.forEach((file) => {
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
        toast.success("Tạo bài viết thành công", { duration: Infinity });
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Lỗi khi tạo bài viết");
    }
  };

  return (
    <div className="py-10">
      <div className="w-full max-w-3xl mx-auto bg-white shadow rounded-xl p-3 sm:p-4 border border-gray-200">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Tiêu đề bài viết</Label>
            <Input
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
              name="content"
              rows={8}
              placeholder="Vui lòng nhập nội dung"
              onChange={({ target }) => {
                handleValueChange(target.name, target.value);
              }}
            />
          </div>
          <div>
            <ComponentCard title="Hình ảnh">
              <div>
                <Label>Chọn file hình ảnh</Label>
                <FileInput
                  onFilesSelected={handleFileChange}
                  className="custom-class"
                  multiple
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {blogData.images.map((file, index) => (
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
                        setBlogData((prev) =>
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
          </div>
          <div>
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
                  {blogData.videos.map((video, index) => (
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
          <div className="flex items-center gap-3">
            <Button size="sm" variant="orange" onClick={createBlogFormData}>
              Tạo bài viết
            </Button>
            <Link to={"/giaovien"}>
              <Button size="sm" variant="yellow" className="">
                Quay về
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GV_AddBlog;
