import React, { useState, useRef, useEffect } from "react";

const slides = [
  "/images/homepage/slide1.jpg",
  "/images/homepage/slide2.webp",
  "/images/homepage/slide3.jpg",
];

const slideDescriptions = [
  "Hoạt động vui chơi sáng tạo giúp bé phát triển trí tuệ và kỹ năng xã hội.",
  "Không gian lớp học hiện đại, an toàn, đầy màu sắc và thân thiện.",
  "Giáo viên tận tâm, chương trình học phong phú, nhiều hoạt động ngoại khóa.",
];

const Content = () => {
  const [current, setCurrent] = useState(0);
  const startX = useRef<number | null>(null);

  // Tự động chuyển slide mỗi 3 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [current]);

  // Xử lý kéo chuột hoặc chạm tay
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    startX.current =
      "touches" in e
        ? e.touches[0].clientX
        : (e as React.MouseEvent).clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (startX.current === null) return;
    const endX =
      "changedTouches" in e
        ? e.changedTouches[0].clientX
        : (e as React.MouseEvent).clientX;
    const diff = endX - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        setCurrent((prev) => (prev + 1) % slides.length); // Kéo sang trái
      } else {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length); // Kéo sang phải
      }
    }
    startX.current = null;
  };

  return (
    <section className="max-w-[1600px] mx-auto py-12 px-4 flex flex-col gap-10">
      {/* Landing với slide ảnh đẹp */}
      <div className="w-full flex flex-col items-center mb-8">
        <div
          className="relative w-full max-w-5xl h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        >
          {slides.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Slide ${idx + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-in-out rounded-2xl
                ${idx === current ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"}
              `}
              style={{ boxShadow: idx === current ? "0 8px 32px 0 #BBA1DF" : "none" }}
              draggable={false}
            />
          ))}
          {/* 3 chấm phía dưới slide luôn hiển thị */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === idx
                    ? "bg-[#7F55B1] shadow-lg"
                    : "bg-gray-400 opacity-60"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Mô tả dưới slide */}
        <div className="mt-4 text-center text-lg text-[#7F55B1] font-semibold min-h-[32px]">
          {slideDescriptions[current]}
        </div>
      </div>
      {/* Hình ảnh minh họa và giới thiệu trường */}
      <div className="flex flex-col md:flex-row items-stretch gap-10">
        {/* Ảnh minh họa */}
        <div className="flex-1 flex justify-center items-stretch">
          <img
            src="/images/homepage/anhHome.jpg"
            alt="Đồ chơi trường mầm non"
            className="h-full rounded-2xl shadow-2xl object-cover border-4 border-[#F3E8FF]"
          />
        </div>
        {/* Giới thiệu trường */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#7F55B1] mb-4 drop-shadow">
            Giới thiệu về Mầm Non ABC
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
            Trường Mầm Non ABC là môi trường giáo dục thân thiện, hiện đại, nơi các bé được vui chơi, học tập và phát triển toàn diện.
            Với đội ngũ giáo viên giàu kinh nghiệm, chương trình học phong phú, cơ sở vật chất an toàn, trường luôn tạo điều kiện tốt nhất để các bé khám phá thế giới xung quanh.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-base md:text-lg">
            <li>Không gian lớp học sáng tạo, nhiều đồ chơi phát triển trí tuệ.</li>
            <li>Hoạt động ngoại khóa đa dạng, giúp bé tự tin và năng động.</li>
            <li>Chăm sóc sức khỏe, dinh dưỡng khoa học cho từng bé.</li>
            <li>Phối hợp chặt chẽ với phụ huynh trong quá trình giáo dục.</li>
          </ul>
        </div>
      </div>

      {/* Đăng ký tư vấn tách riêng dưới phần giới thiệu */}
      <div className="flex flex-col items-center p-8 mt-8 w-full max-w-2xl mx-auto">
        <span className="font-bold text-2xl md:text-3xl text-[#F97A00] mb-2 text-center tracking-wide">
          ĐĂNG KÝ TƯ VẤN
        </span>
        <div className="w-20 h-2 bg-[#FFD966] rounded-full mb-6" />
        <form className="flex flex-col items-center justify-center w-full gap-4">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full h-12 rounded-2xl px-5 text-base shadow-md border border-[#FFD966] outline-none transition focus:ring-2 focus:ring-[#F97A00] focus:bg-white"
            style={{
              boxShadow: "0 4px 12px 0 #D4CDE1",
            }}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full h-12 rounded-2xl px-5 text-base shadow-md border border-[#FFD966] outline-none transition focus:ring-2 focus:ring-[#F97A00] focus:bg-white"
            style={{
              boxShadow: "0 4px 12px 0 #D4CDE1",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-2xl px-5 text-base shadow-md border border-[#FFD966] outline-none transition focus:ring-2 focus:ring-[#F97A00] focus:bg-white"
            style={{
              boxShadow: "0 4px 12px 0 #D4CDE1",
            }}
          />
          <button
            className="w-full h-12 bg-[#F97A00] text-white font-bold text-xl rounded-2xl shadow-lg hover:bg-white hover:text-[#F97A00] border-2 border-[#F97A00] transition mt-2"
            type="submit"
          >
            GỬI
          </button>
        </form>
        <span className="text-sm text-gray-500 mt-4 text-center">
          Chúng tôi sẽ liên hệ lại với bạn sớm nhất!
        </span>
      </div>
    </section>
  );
};

export default Content;