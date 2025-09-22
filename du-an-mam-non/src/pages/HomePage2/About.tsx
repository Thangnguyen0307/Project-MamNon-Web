const About = () => {
  return (
    <>
      <section id="about" className="w-full max-w-6xl mx-auto py-16 px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-16 font-[Quicksand,sans-serif]">
        {/* Ảnh minh họa */}
        <div className="flex-1 flex justify-center order-2 md:order-1 relative group">
          <img
            src="/images/homepage/anhHome.jpg"
            alt="Trường Mầm Non KidsMona - Môi trường giáo dục thân thiện"
            className="rounded-3xl shadow-3xl border-4 border-purple-200 object-cover w-full max-w-sm sm:max-w-md h-[300px] sm:h-[380px] lg:h-[450px] transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-4xl"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        {/* Nội dung giới thiệu */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left order-1 md:order-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-purple-800 mb-6 drop-shadow-lg leading-tight" style={{ fontFamily: "Quicksand, sans-serif" }}>
            Khám phá Trường Mầm Non <span className="text-pink-600">KidsMona</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "Quicksand, sans-serif" }}>
            Chào mừng đến với Trường Mầm Non KidsMona – nơi bé được yêu thương, vui chơi và phát triển toàn diện trong môi trường hiện đại, an toàn và đầy cảm hứng. KidsMona luôn đồng hành cùng phụ huynh để ươm mầm những tài năng nhí!
          </p>
          <ul className="list-disc pl-8 text-gray-700 space-y-3 text-base sm:text-lg">
            <li className="flex items-start">
              <span className="text-purple-600 text-2xl mr-2 -mt-1 animate-pulse">✨</span>
              <p><span className="font-semibold text-purple-700">Không gian học tập sáng tạo:</span> Lớp học sinh động, nhiều giáo cụ trực quan và đồ chơi phát triển tư duy.</p>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 text-2xl mr-2 -mt-1 animate-pulse">🌈</span>
              <p><span className="font-semibold text-purple-700">Chương trình ngoại khóa phong phú:</span> Bé rèn luyện kỹ năng sống, tự tin và yêu thiên nhiên.</p>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 text-2xl mr-2 -mt-1 animate-pulse">🍎</span>
              <p><span className="font-semibold text-purple-700">Dinh dưỡng khoa học:</span> Thực đơn cân bằng, phù hợp từng lứa tuổi, do chuyên gia xây dựng.</p>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 text-2xl mr-2 -mt-1 animate-pulse">🤝</span>
              <p><span className="font-semibold text-purple-700">Phối hợp cùng phụ huynh:</span> Luôn lắng nghe, cập nhật thông tin để tạo môi trường tốt nhất cho bé.</p>
            </li>
          </ul>
          <button className="mt-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out self-center md:self-start max-w-xs" style={{ fontFamily: "Quicksand, sans-serif" }}>
            Tìm hiểu thêm
          </button>
        </div>
      </section>
      {/* Đặt câu hỏi */}
      <section className="w-full bg-gradient-to-b from-[#E3F7FA] to-[#F7FBFC] py-16">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
          {/* Tiêu đề & hotline */}
          <div className="flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#EB397A] mb-2 text-center tracking-wide drop-shadow-lg">
              ĐẶT CÂU HỎI?
            </h3>
            <a
              href="tel:0769220162"
              className="text-2xl md:text-3xl font-bold text-[#0BA6DF] hover:text-[#EB397A] transition underline underline-offset-4"
            >
              076 922 0162
            </a>
            <span className="mt-2 text-base text-gray-500 font-medium">
              Kids MONA luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của phụ huynh!
            </span>
          </div>
          {/* Card list */}
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col items-center w-[260px] hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <img
                src="/images/homepage/card1.jpg"
                alt="Thỏa sức sáng tạo"
                className="w-full h-[180px] object-cover rounded-xl mb-4"
              />
              <h4 className="font-bold text-lg text-[#7F55B1] mb-1">Thỏa sức sáng tạo</h4>
              <p className="text-gray-600 text-center text-base">
                Cùng Kids MONA khám phá tiềm năng của con trẻ
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col items-center w-[260px] hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <img
                src="/images/homepage/card2.jpg"
                alt="Môi trường năng động"
                className="w-full h-[180px] object-cover rounded-xl mb-4"
              />
              <h4 className="font-bold text-lg text-[#7F55B1] mb-1">Môi trường năng động</h4>
              <p className="text-gray-600 text-center text-base">
                Cùng Kids MONA khám phá tiềm năng của con trẻ
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col items-center w-[260px] hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <img
                src="/images/homepage/card3.jpg"
                alt="Ưu đãi hấp dẫn"
                className="w-full h-[180px] object-cover rounded-xl mb-4"
              />
              <h4 className="font-bold text-lg text-[#7F55B1] mb-1">Ưu đãi hấp dẫn</h4>
              <p className="text-gray-600 text-center text-base">
                Cùng Kids MONA khám phá tiềm năng của con trẻ
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col items-center w-[260px] hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <img
                src="/images/homepage/card4.jpg"
                alt="Tài năng nhí của con"
                className="w-full h-[180px] object-cover rounded-xl mb-4"
              />
              <h4 className="font-bold text-lg text-[#7F55B1] mb-1">Tài năng nhí của con</h4>
              <p className="text-gray-600 text-center text-base">
                Cùng Kids MONA khám phá tiềm năng của con trẻ
              </p>
            </div>
          </div>
          {/* Social icons */}
          <div className="flex gap-4 mt-8">
            <a href="#" className="rounded-full bg-[#4267B2] p-3 text-white hover:scale-110 shadow-lg transition" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="rounded-full bg-[#1DA1F2] p-3 text-white hover:scale-110 shadow-lg transition" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="rounded-full bg-[#25D366] p-3 text-white hover:scale-110 shadow-lg transition" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="rounded-full bg-[#E60023] p-3 text-white hover:scale-110 shadow-lg transition" aria-label="Pinterest">
              <i className="fab fa-pinterest-p"></i>
            </a>
            <a href="#" className="rounded-full bg-[#DB4437] p-3 text-white hover:scale-110 shadow-lg transition" aria-label="Google Plus">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;