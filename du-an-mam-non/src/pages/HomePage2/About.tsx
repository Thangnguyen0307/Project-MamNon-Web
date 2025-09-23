import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiPlay, FiArrowRight } from "react-icons/fi";

const About = () => {
  return (
    <section className="w-full  mx-auto py-20 px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center font-sans">
      {/* Left: Tiêu đề + Video/Image + Play */}
      <div className="lg:col-span-1 flex flex-col items-center lg:items-start gap-6">
        <div className="w-full text-center lg:text-left">
          <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
            <FaCheckCircle className="text-purple-600 text-xl" />
            <span className="uppercase font-semibold text-purple-600 tracking-wide">Giới thiệu</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#7F55B1] leading-snug">
            Trường Mầm Non <span className="text-pink-600">KidsMona</span> – Nơi Bé Lớn Lên Mỗi Ngày
          </h2>
        </div>
        <div className="relative w-full max-w-sm mx-auto">
          <img
            src="/images/homepage/slide1.jpg"
            alt="Hospital"
            className="rounded-2xl shadow-lg w-full h-[280px] md:h-[340px] object-cover"
          />
          <button className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white bg-opacity-80 rounded-full p-5 shadow-lg hover:scale-110 transition duration-300">
              <FiPlay className="text-blue-600 text-4xl" />
            </span>
          </button>
        </div>
      </div>

      {/* Center: Content */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          KidsMona là môi trường giáo dục hiện đại, an toàn và đầy cảm hứng dành cho các bé từ 2-6 tuổi. Chúng tôi chú trọng phát triển toàn diện về trí tuệ, thể chất, cảm xúc và kỹ năng sống, đồng hành cùng phụ huynh để ươm mầm những tài năng nhí.
        </p>
        <ul className="space-y-3">
          {[
            "Không gian học tập sáng tạo, lớp học sinh động, nhiều giáo cụ trực quan.",
            "Chương trình ngoại khóa phong phú, rèn luyện kỹ năng sống và sự tự tin.",
            "Dinh dưỡng khoa học, thực đơn cân bằng do chuyên gia xây dựng.",
            "Đội ngũ giáo viên tận tâm, giàu kinh nghiệm, yêu trẻ.",
            "Phối hợp chặt chẽ với phụ huynh, cập nhật thông tin liên tục.",
          ].map((text, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-purple-900 text-base md:text-lg"
            >
              <FaCheckCircle className="text-purple-500 mt-1" />
              {text}
            </li>
          ))}
        </ul>
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-full shadow-lg flex items-center gap-2 w-fit transition duration-300">
          Tìm hiểu thêm <FiArrowRight className="text-lg" />
        </button>
      </div>

      {/* Right: 2 Images */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <img
          src="https://images.pexels.com/photos/3661457/pexels-photo-3661457.jpeg?auto=compress&fit=crop&w=800&q=80"
          alt="Trẻ em chơi trong lớp học"
          className="rounded-2xl shadow-lg w-full h-[260px] md:h-[340px] object-cover"
        />
        <img
          src="https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&fit=crop&w=800&q=80"
          alt="Trẻ em ăn uống vui vẻ ở trường mầm non"
          className="rounded-2xl shadow-lg w-full h-[260px] md:h-[340px] object-cover"
        />
      </div>
    </section>
  );
};

export default About;
