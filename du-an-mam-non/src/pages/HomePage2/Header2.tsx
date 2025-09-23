import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";

const navItems = [
  { label: "TRANG CHỦ", color: "text-[#6C4CD6]" },
  { label: "LỚP HỌC", color: "text-[#EB397A]" },
  { label: "ĐỘI NGŨ GIÁO VIÊN", color: "text-[#88CE58]" },
  { label: "TIN TỨC", color: "text-[#0BA6DF]" },
  { label: "LIÊN HỆ", color: "text-[#F97A00]" },
];

const Header2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = isScrolled
    ? "max-w-[99%] mx-auto relative h-[80px] rounded-xl bg-gray-200/60 backdrop-blur-2xl shadow-2xl transition-all duration-300"
    : "bg-white shadow-lg h-[80px] transition-all duration-300";

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Bạn vừa tìm: " + searchQuery);
    setSearchQuery("");
  };

  return (
    <>
      <header
        className={`w-full fixed left-0 z-50 transition-all duration-300 ${
          isScrolled
              ? "top-4 shadow-2xl backdrop-blur-lg"
            : "top-0 bg-white shadow-lg"
        }`}
      >
        <div className={navClass}>
          <div className="w-full flex items-center justify-between h-full px-5 xl:px-10">
            {/* Logo */}
            <div className="flex items-center">
              <span className="font-bold text-[36px] xl:text-[48px] text-[#F97A00] font-[Comic_Sans_MS]">
                K
              </span>
              <span className="font-bold text-[36px] xl:text-[48px] text-[#0BA6DF] font-[Comic_Sans_MS]">
                i
              </span>
              <span className="font-bold text-[36px] xl:text-[48px] text-[#88CE58] font-[Comic_Sans_MS]">
                d
              </span>
              <span className="font-bold text-[36px] xl:text-[48px] text-[#6C4CD6] font-[Comic_Sans_MS]">
                s
              </span>
              <span className="font-bold text-[36px] xl:text-[48px] ml-2 text-[#6C4CD6] font-[Comic_Sans_MS]">
                Mona
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 h-full">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`font-bold text-base uppercase ${item.color} hover:underline`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Search desktop (>=1280px) */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center gap-2 ml-4"
            >
              <div className="relative w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập từ khóa..."
                  className="w-full h-11 pl-10 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BA6DF]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center h-11 px-4 text-sm font-medium text-white bg-[#0BA6DF] rounded-lg hover:bg-[#F97A00] transition"
              >
                <Search className="w-4 h-4 mr-2" /> Tìm
              </button>
            </form>

            {/* Mobile & tablet menu button */}
            <button
              className="xl:hidden text-[#0BA6DF] hover:text-[#F97A00] transition"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="absolute right-0 top-0 h-full w-2/3 sm:w-1/3 bg-white shadow-xl flex flex-col p-6 z-[60]">
            <button
              className="mb-6 self-end text-gray-600 hover:text-red-500"
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col gap-6 font-bold text-lg">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className={`${item.color} uppercase hover:underline`}
                >
                  {item.label}
                </a>
              ))}

              {/* Search mobile */}
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 mt-6"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full h-11 pl-10 pr-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BA6DF]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center h-11 px-4 text-sm font-medium text-white bg-[#0BA6DF] rounded-lg hover:bg-[#F97A00] transition"
                >
                  <Search className="w-4 h-4 mr-2" /> Tìm
                </button>
              </form>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header2;
