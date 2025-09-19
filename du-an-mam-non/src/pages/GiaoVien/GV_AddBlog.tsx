import { useParams } from "react-router";
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
}

const GV_AddBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [blogData, setBlogData] = useState<Blog>({
    title: "",
    content: "",
    class: id as string,
    images: [],
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
    if (blogData.images.length >= 10) {
      toast.error("Vui lòng chọn tối đa 10 ảnh!!");
    } else {
      setBlogData((prev) => ({
        ...prev,
        images: [...prev.images, ...selected],
      }));
    }
  };
  console.log(blogData);

  const createBlogFormData = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("class", id as string);

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

      if (response.data?.length > 0) {
        toast.success("Tạo bài viết thành công  ");
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
          <div className="flex items-center">
            <Button className="" onClick={createBlogFormData}>
              Tạo bài viết
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GV_AddBlog;
