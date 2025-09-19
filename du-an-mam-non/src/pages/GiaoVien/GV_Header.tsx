import { useState } from "react";
import { Link } from "react-router";
import UserDropdown from "../../components/header/UserDropdown";

const GV_Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={"/giaovien"}
          className="text-xl font-bold text-gray-800 dark:text-white">
          MyLogo
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
