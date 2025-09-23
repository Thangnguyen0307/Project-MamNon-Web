import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";

const navItems = [


  { label: "TRANG CHỦ", color: "text-[#6C4CD6]", href: "/" },
  { label: "LỚP HỌC", color: "text-[#EB397A]", href: "/lop-hoc" },
  {
    label: "ĐỘI NGŨ GIÁO VIÊN",
    color: "text-[#88CE58]",
    href: "/doi-ngu-giao-vien",
  },
  { label: "TIN TỨC", color: "text-[#0BA6DF]", href: "/tin-tuc" },
  { label: "LIÊN HỆ", color: "text-[#F97A00]", href: "/lien-he" },

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

    ? "max-w-[99%] mx-auto relative h-[80px] rounded-xl bg-gray-200/90 backdrop-blur-lg shadow-2xl border-b border-gray-300 transition-all duration-300"
    : "bg-white shadow-lg h-[80px] transition-all duration-300";

  return (
    <>
      {/* Top bar chỉ hiện khi chưa scroll */}
      {!isScrolled && (
        <div className="bg-[#6C4CD6] w-full h-[48px] flex items-center justify-end px-10 text-white text-sm font-semibold fixed top-0 left-0 z-50">
          <div className="flex items-center gap-4 mr-auto">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-white/10 p-2 hover:bg-[#FFD966]/30 transition flex items-center"
              aria-label="Facebook"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-white group-hover:text-[#4267B2] transition"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.406.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-white/10 p-2 hover:bg-[#FFD966]/30 transition flex items-center"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-white group-hover:text-[#E1306C] transition"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.784 2.226 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.393 3.678 1.374c-.98.98-1.243 2.092-1.302 3.373C2.013 5.668 2 6.077 2 9.333v5.334c0 3.256.013 3.665.072 4.946.059 1.281.322 2.393 1.302 3.373.981.981 2.093 1.243 3.374 1.302 1.281.059 1.69.072 4.946.072s3.665-.013 4.946-.072c1.281-.059 2.393-.321 3.374-1.302.98-.98 1.243-2.092 1.302-3.373.059-1.281.072-1.69.072-4.946V9.333c0-3.256-.013-3.665-.072-4.946-.059-1.281-.322-2.393-1.302-3.373-.981-.981-2.093-1.243-3.374-1.302C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            {/* Twitter X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full bg-white/10 p-2 hover:bg-[#FFD966]/30 transition flex items-center"
              aria-label="Twitter X"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-white group-hover:text-black transition"
                viewBox="0 0 24 24"
              >
                <path d="M17.53 3.5h3.97l-8.56 9.81 10.09 11.19h-7.98l-6.35-7.06-7.26 7.06H1.5l9.18-10.64L.66 3.5h8.13l5.59 6.22zm-1.13 17.13h2.21l-6.07-6.7-2.52 2.7 4.38 4zm-7.72-17.13h-2.13l5.74 6.34 2.38-2.62-5.99-3.72z" />
              </svg>
            </a>
          </div>
          <span className="mr-8">
            <span className="font-bold">EMAIL :</span> info@themona.global
          </span>
          <span>
            <span className="font-bold">HOTLINE :</span> (+84) 313-728-397
          </span>
        </div>
      )}
      {/* Main header */}
      <header
        className={`w-full fixed left-0 z-50 transition-all duration-300 ${
          isScrolled ? "top-4" : "top-12"
        }`}
      >
        <div className={navClass}>
          <div className="w-full flex items-center justify-between h-full px-10">
            {/* Logo */}
            <div className="flex items-center">
              <span
                className="font-bold text-[48px] select-none"
                style={{
                  color: "#F97A00",
                  fontFamily: "Comic Sans MS, cursive",
                }}
              >
                K
              </span>
              <span
                className="font-bold text-[48px] select-none"
                style={{
                  color: "#0BA6DF",
                  fontFamily: "Comic Sans MS, cursive",
                }}
              >
                i
              </span>
              <span
                className="font-bold text-[48px] select-none"
                style={{
                  color: "#88CE58",
                  fontFamily: "Comic Sans MS, cursive",
                }}
              >
                d
              </span>
              <span
                className="font-bold text-[48px] select-none"
                style={{
                  color: "#6C4CD6",
                  fontFamily: "Comic Sans MS, cursive",
                }}
              >
                s
              </span>
              <span
                className="font-bold text-[48px] select-none ml-2"
                style={{
                  color: "#6C4CD6",
                  fontFamily: "Comic Sans MS, cursive",
                }}
              >
                Mona
              </span>
            </div>
            {/* Nav */}
            <nav className="flex items-center gap-8 h-full">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-bold text-base uppercase ${item.color} hover:underline transition-colors duration-300`}

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

              <button className="ml-2 text-[#0BA6DF] hover:text-[#F97A00] transition">
                <Search size={22} />
              </button>
            </nav>
          </div>
        </div>
      </header>

    </>
  );
};

export default Header2;
