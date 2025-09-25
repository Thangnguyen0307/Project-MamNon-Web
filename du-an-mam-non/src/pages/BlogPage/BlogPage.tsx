import BlogsCarousel from "./BlogsCarousel";
import Footer from "../HomePage2/Footer2";
import Header2 from "../HomePage2/Header2";
import { motion } from "framer-motion";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header section */}
      <div className="pt-[80px]">
        <Header2 />

        {/* Enhanced Hero section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-gradient-to-br from-[#6c2bd9] via-[#8B5CF6] to-[#88CE58] py-20 overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                rotate: [0, -180, -360],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            />
          </div>

          {/* Floating icons */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-20 text-6xl opacity-20"
          >
            📰
          </motion.div>
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-32 right-20 text-5xl opacity-20"
          >
            📚
          </motion.div>
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-1/4 text-4xl opacity-20"
          >
            ✨
          </motion.div>

          <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="inline-block animate-bounce mr-4">📰</span>
                Tin Tức & Hoạt Động
                <span className="block text-yellow-200 mt-2 text-4xl md:text-5xl lg:text-6xl">
                  Trường Mầm Non
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-yellow-300 via-white to-yellow-300 animate-pulse shadow-lg"
            />

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Khám phá những câu chuyện thú vị, hoạt động giáo dục sáng tạo và
              khoảnh khắc đáng nhớ của các bé tại trường mầm non KidsMona
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-bold text-white text-lg mb-2">
                  Hoạt động sáng tạo
                </h3>
                <p className="text-white/80 text-sm">
                  Các hoạt động nghệ thuật và sáng tạo phong phú
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-3">📖</div>
                <h3 className="font-bold text-white text-lg mb-2">
                  Học tập vui vẻ
                </h3>
                <p className="text-white/80 text-sm">
                  Phương pháp giáo dục hiện đại và thú vị
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold text-white text-lg mb-2">
                  Thành tích nổi bật
                </h3>
                <p className="text-white/80 text-sm">
                  Những khoảnh khắc đáng tự hào của các bé
                </p>
              </div>
            </motion.div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg
              className="relative block w-full h-[80px]"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-white"
              />
            </svg>
          </div>
        </motion.div>

        {/* Enhanced Blog content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <BlogsCarousel limit={5} />
        </motion.div>

        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
