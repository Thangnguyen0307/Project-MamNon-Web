import { useState } from "react";
import { Link } from "react-router";
import UserDropdown from "../../components/header/UserDropdown";

const GV_Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          MyLogo
        </div>

        {/* Buttons desktop */}
        <nav className="hidden md:flex gap-4 absolute left-1/2 -translate-x-1/2">
          <Link
            className="px-4 py-2 rounded-lg text-black hover:bg-gray-100/80 transition "
            to={""}>
            Danh Sách Lớp Học
          </Link>
          <Link
            className="px-4 py-2 rounded-lg text-black hover:bg-gray-100/80 transition"
            to={""}>
            Bài viết
          </Link>
          <Link
            className="px-4 py-2 rounded-lg text-black hover:bg-gray-100/80 transition"
            to={""}>
            Nút 3
          </Link>
        </nav>
        <UserDropdown />
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            ☰
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 dark:text-gray-300 text-xl">
            ✕
          </button>
        </div>
        <nav className="p-4 space-y-3">
          <Link
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            to={""}>
            Nút 1
          </Link>
          <Link
            className="w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            to={""}>
            Nút 2
          </Link>
          <Link
            className="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            to={""}>
            Nút 3
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default GV_Header;
