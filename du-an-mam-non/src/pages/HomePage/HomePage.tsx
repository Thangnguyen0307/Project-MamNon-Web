import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowUpCircle } from "lucide-react";
import Content from "./Content";

const HomePage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [headerBlur, setHeaderBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
      setHeaderBlur(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Header luôn hiển thị và mờ khi cuộn */}
      <div
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          headerBlur ? "backdrop-blur-md bg-white/60" : ""
        }`}
      >
        <Header />
      </div>
      {/* Để tránh che nội dung, thêm padding-top bằng chiều cao header */}
      <div className="pt-[250px]">
        <Content />
        <Footer />
      </div>
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 focus:outline-none"
          aria-label="Lên đầu trang"
        >
          <ArrowUpCircle
            size={64}
            className="text-[#88CE58] bg-white rounded-full border-4 border-white shadow-lg"
          />
        </button>
      )}
    </div>
  );
};

export default HomePage;