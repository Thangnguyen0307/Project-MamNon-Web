const ClassHero = () => {
  return (
    <section className="relative min-h-[70vh] bg-gradient-to-br from-[#FFF0F5] via-[#F0F8FF] to-[#F5FFFA] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#EB397A]/20 to-transparent rounded-full blur-2xl animate-float"></div>
      <div
        className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-[#88CE58]/20 to-transparent rounded-full blur-2xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-[#6C4CD6]/15 to-[#EB397A]/15 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Floating shapes */}
      <div className="absolute top-20 right-20 text-6xl animate-bounce opacity-20">
        🏫
      </div>
      <div
        className="absolute bottom-32 left-10 text-5xl animate-bounce opacity-20"
        style={{ animationDelay: "1s" }}
      >
        📚
      </div>
      <div
        className="absolute top-40 left-1/3 text-4xl animate-bounce opacity-20"
        style={{ animationDelay: "2s" }}
      >
        🎨
      </div>
      <div
        className="absolute top-60 right-1/4 text-3xl animate-bounce opacity-20"
        style={{ animationDelay: "3s" }}
      >
        🌟
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          {/* Breadcrumb */}
          <div className="mb-8 animate-fade-in-up">
            <nav className="text-sm font-medium"></nav>
          </div>

          {/* Main title with animation */}
          <div
            className="mb-6 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#EB397A] leading-tight">
              <span className="inline-block animate-bounce mr-4">🏫</span>
              CÁC LỚP HỌC
              <span className="block text-[#88CE58] mt-2">CỦA CHÚNG TÔI</span>
            </h1>
          </div>

          {/* Decorative line */}
          <div
            className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-[#EB397A] to-[#88CE58] animate-pulse"
            style={{ animationDelay: "400ms" }}
          ></div>

          {/* Description */}
          <div
            className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <p className="mb-4">
              Tại <span className="font-semibold text-[#EB397A]">KidsMona</span>
              , chúng tôi tổ chức các lớp học theo từng độ tuổi với môi trường
              học tập an toàn, thân thiện và đầy sáng tạo.
            </p>
            <p>
              Mỗi lớp học được thiết kế riêng biệt phù hợp với sự phát triển của
              trẻ, từ lớp Mầm, Chồi cho đến lớp Lá, giúp các bé học hỏi và vui
              chơi một cách tự nhiên nhất.
            </p>
          </div>

          {/* Feature highlights */}
          <div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-semibold text-[#88CE58] mb-2">Lớp Mầm</h3>
              <p className="text-sm text-gray-600">
                Dành cho bé 18-30 tháng tuổi
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3">🌿</div>
              <h3 className="font-semibold text-[#6C4CD6] mb-2">Lớp Chồi</h3>
              <p className="text-sm text-gray-600">Dành cho bé 3-4 tuổi</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3">🍃</div>
              <h3 className="font-semibold text-[#0BA6DF] mb-2">Lớp Lá</h3>
              <p className="text-sm text-gray-600">Dành cho bé 4-5 tuổi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[60px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default ClassHero;
