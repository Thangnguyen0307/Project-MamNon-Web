import { useEffect, useState } from "react";
import { Link } from "react-router";
import UserDropdown from "../../components/header/UserDropdown";

const GV_Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed left-0 z-50 transition-all duration-30 ${
        isScrolled
          ? "top-4 shadow-2xl backdrop-blur-lg rounded-2xl"
          : "top-0 bg-white shadow-lg"
      }`}>
      <div
        className={`max-w-6xl mx-auto px-4 py-1 flex items-center justify-between `}>
        {/* Logo */}
        <Link
          to={"/giaovien"}
          className="text-xl font-bold text-gray-800 dark:text-white">
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
        </Link>

        <UserDropdown />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}></div>
      )}
    </header>
  );
};

export default GV_Header;
