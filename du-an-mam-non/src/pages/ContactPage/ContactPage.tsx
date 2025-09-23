
import Header2 from "../HomePage2/Header2";
import { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    content: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-[400px] bg-[#F7FBFC] z-0">
        <div className="absolute top-0 left-0 w-[340px] h-[340px] bg-[#FFD966] rounded-full -translate-x-1/3 -translate-y-1/4 opacity-60"></div>
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#C7B6F7] rounded-full translate-x-1/4 -translate-y-1/4 opacity-40"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C7B6F7] rounded-full translate-x-1/3 translate-y-1/4 opacity-30"></div>
      <Header2 />
      <div className="pt-[180px] max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-[#7F55B1] mb-2">KidsMona Preschool</h2>
            <div className="text-base text-gray-600 mb-4">Nơi bé lớn lên mỗi ngày</div>
            <div className="space-y-2 text-lg">
              <div className="font-bold text-[#341D4E]">Địa chỉ: <span className="font-normal">abc/10, đường Nguyễn Ảnh Thủ, xã Bà Điểm, Huyện Bình Chánh</span></div>
              <div className="font-bold text-[#341D4E]">SĐT: <span className="font-normal">076 922 0162</span></div>
              <div className="font-bold text-[#341D4E]">Email: <span className="font-normal">kidsmona@gmail.com</span></div>
              <div className="font-bold text-[#341D4E]">Giờ mở cửa: <span className="font-normal">Thứ 2 - Thứ 7, 7:00 - 17:00</span></div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#88CE58] mb-2">ĐĂNG KÝ TƯ VẤN</h2>
            <div className="w-16 h-2 bg-[#FFD966] rounded-full mb-6" />
            <form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên của phụ huynh"
                value={form.name}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:border-[#88CE58]"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:border-[#88CE58]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:border-[#88CE58]"
                required
              />
              <textarea
                name="content"
                placeholder="Nội dung"
                value={form.content}
                onChange={handleChange}
                className="rounded-xl border border-gray-300 px-4 py-3 text-base focus:outline-none focus:border-[#88CE58] min-h-[80px]"
                required
              />
              <button
                type="submit"
                className="bg-[#F97A00] text-white font-bold py-3 rounded-xl shadow hover:bg-[#EB397A] transition-all text-lg mt-2"
              >
                GỬI
              </button>
              {submitted && (
                <div className="text-green-600 font-semibold mt-2">Đăng ký tư vấn thành công!</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
