import  { useState } from "react";
import { Phone, Mail } from "lucide-react";

const navItems = [
  { key: "home", label: "TRANG CHỦ", color: "text-[#EB397A]" },
  { key: "class", label: "LỚP HỌC", color: "text-[#0BA6DF]" },
  { key: "teacher", label: "GIÁO VIÊN", color: "text-[#88CE58]" },
  { key: "contact", label: "LIÊN HỆ", color: "text-[#F97A00]" },
];

const Header = () => {
  const [active, setActive] = useState("home");

  return (
    <header className="w-full bg-purple-200 text-gray-800">
      {/* Top bar */}
      <div className="relative w-full rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/homepage/banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Lớp phủ màu tím và làm mờ ảnh */}
        <div className="absolute inset-0 bg-purple-300 opacity-60 backdrop-blur-sm pointer-events-none"></div>
        {/* Nội dung */}
        <div className="relative z-10 flex w-full items-center px-6 py-5 text-lg">
          <div className="ml-40 font-bold text-2xl text-white">MẦM NON ABC</div>
          <div className="ml-170 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={20} className="text-purple-700" />
              <span className=" text-xl font-semibold text-white">09xxxxxxxx</span>
            </div>
            <div className="ml-25 flex items-center gap-1">
              <Mail size={20} className="text-purple-700" />
              <span className="text-xl font-semibold text-white">mamnonabc@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-purple-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 ">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="border rounded-4xl px-5 py-1 text-sm bg-[#F3E8FF] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:shadow-lg focus:shadow-purple-300 hover:bg-[#BBA1DF] "
          />

          <ul className="flex gap-10 font-bold text-lg p-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href="#"
                  className={`px-5 py-3 rounded-lg font-bold transition-all duration-150 ${
                    active === item.key
                      ? "bg-yellow-400 text-[#341D4E] shadow-2xl"
                      : `${item.color} hover:bg-[#BBA1DF] hover:text-white`
                  }`}
                  onClick={() => setActive(item.key)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Viền 5 màu dưới navigation */}
        <div className="flex h-1 w-full">
          <div className="flex-1 bg-[#EB397A]" />
          <div className="flex-1 bg-[#F97A00]" />
          <div className="flex-1 bg-[#FFD966]" />
          <div className="flex-1 bg-[#0BA6DF]" />
          <div className="flex-1 bg-[#88CE58]" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
