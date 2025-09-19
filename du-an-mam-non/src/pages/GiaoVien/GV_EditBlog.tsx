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

interface BlogParams {
  images: File[];
  existingImages: string[];
}

interface BlogData {
  title: string;
  content: string;
  class: string;
  images: string[];
}

const GV_EditBlog = () => {
  const { classId, blogId } = useParams();
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    content: "",
    class: "",
    images: [],
  });
  const [blogParams, setBlogParams] = useState<BlogParams>({
    images: [],
    existingImages: [],
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

  const editBlogFormData = async () => {
    try {
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
      console.log(formData);

      const response = await axiosInstance.put(
        API_PATHS.BLOG.UPDATE_BLOG(blogId as string),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        toast.success("Cập nhật bài viết thành công  ");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Lỗi khi cập nhật bài viết");
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
          <ComponentCard title="Danh sách hình ảnh giữ lại">
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
        </div>
        <div className="flex items-center gap-3 mt-3">
          <Button variant="orange" size="sm" onClick={editBlogFormData}>
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
