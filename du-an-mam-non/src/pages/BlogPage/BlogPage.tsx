import BlogsCarousel from "./BlogsCarousel";
import Footer from "../HomePage2/Footer2";
import Header2 from "../HomePage2/Header2";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header section */}
      <div className="pt-[80px]">
        <Header2 />

        {/* Hero section */}
        <div className="relative bg-gradient-to-r from-[#6c2bd9] to-[#88CE58] py-16 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
              📰 Tin Tức & Hoạt Động
            </h1>
            <p
              className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              Cập nhật những tin tức mới nhất và các hoạt động thú vị của trường
              mầm non
            </p>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-white/30 animate-pulse"></div>
          </div>
        </div>

        {/* Blog content */}
        <BlogsCarousel limit={9} />

        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
