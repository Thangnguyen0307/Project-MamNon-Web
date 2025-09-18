import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const navItems = [
  { key: "home", label: "TRANG CHỦ", color: "text-[#EB397A]" },
  { key: "class", label: "LỚP HỌC", color: "text-[#0BA6DF]" },
  { key: "teacher", label: "GIÁO VIÊN", color: "text-[#88CE58]" },
  { key: "blog", label: "BLOG", color: "text-[#7F55B1]" },
  { key: "contact", label: "LIÊN HỆ", color: "text-[#F97A00]" },
];

const Header = () => {
  const [active, setActive] = useState("home");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="w-full">
      {/* Mobile + Tablet Header */}
      <div className="relative w-full h-[80px] flex items-center justify-between px-4 lg:hidden bg-purple-100 shadow-md">
        {/* Logo */}
        <div className="relative z-20 font-bold text-xl text-purple-900">
          MẦM NON ABC
        </div>

        {/* Icon menu */}
        <button
          className="relative z-20"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Overlay menu */}
        {showMenu && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white shadow-lg z-10 flex flex-col pt-20 px-6">
            <ul className="flex flex-col gap-6 font-bold text-lg">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href="#"
                    className={`block px-4 py-2 rounded-md transition-all duration-200 ${
                      active === item.key
                        ? "bg-yellow-400 text-[#341D4E] shadow-md"
                        : `${item.color} hover:bg-purple-200`
                    }`}
                    onClick={() => {
                      setActive(item.key);
                      setShowMenu(false);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        {/* Top bar */}
        <div
          className="relative w-full h-[120px] flex items-center justify-between px-10 text-white"
          style={{
            backgroundImage: "url('/images/homepage/banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-purple-300 opacity-60 backdrop-blur-sm"></div>

          {/* Logo */}
          <div className="relative z-10 font-bold text-2xl">MẦM NON ABC</div>

          {/* Contact */}
          <div className="relative z-10 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={20} className="text-purple-800" />
              <span className="font-semibold">09xxxxxxxx</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-purple-800" />
              <span className="font-semibold">mamnonabc@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-purple-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="border rounded-full px-4 py-1 text-sm bg-[#F3E8FF] shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:shadow-2xl focus:shadow-purple-300 hover:shadow-2xl hover:shadow-purple-300"
            />

            {/* Menu items */}
            <ul className="flex gap-6 font-bold text-lg">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href="#"
                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                      active === item.key
                        ? "bg-yellow-400 text-[#341D4E] shadow-lg"
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

          {/* 5 màu dưới navigation */}
          <div className="flex h-1 w-full">
            <div className="flex-1 bg-[#EB397A]" />
            <div className="flex-1 bg-[#F97A00]" />
            <div className="flex-1 bg-[#FFD966]" />
            <div className="flex-1 bg-[#0BA6DF]" />
            <div className="flex-1 bg-[#88CE58]" />
          </div>
        </nav>
      </div>

      {/* Breadcrumb */}
      <div className="hidden lg:block bg-[#7F55B1] py-2 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center p-3">
          <div className="flex items-center gap-2">
            <span className="tracking-wide text-white font-bold">
              {navItems[0].label}
            </span>
            <span className="mx-2 text-white font-bold">&gt;</span>
            <span className={`tracking-wide font-bold text-[#FFD966]`}>
              {active !== "home"
                ? navItems.find((item) => item.key === active)?.label
                : ""}
            </span>
          </div>

          {/* Dropdowns căn giữa bên phải */}
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-12">
              <div className="relative">
                <button className="flex items-center gap-2 text-white font-semibold px-3 py-2 rounded hover:bg-[#BBA1DF] transition">
                  NIÊN KHÓA <ChevronDown size={16} />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center gap-2 text-white font-semibold px-3 py-2 rounded hover:bg-[#BBA1DF] transition">
                  KHỐI LỚP <ChevronDown size={16} />
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center gap-2 text-white font-semibold px-3 py-2 rounded hover:bg-[#BBA1DF] transition">
                  LỚP <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
