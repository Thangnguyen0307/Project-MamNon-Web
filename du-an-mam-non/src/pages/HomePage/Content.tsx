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
    <section className="max-w-5xl mx-auto py-12 px-4 flex flex-col gap-10">
      {/* Landing với slide ảnh đẹp */}
      <div className="w-full flex flex-col items-center mb-8">
        <div
          className="relative w-full max-w-7xl h-[520px] rounded-2xl overflow-hidden shadow-2xl"
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
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex justify-center">
          <img
            src="/images/homepage/anhHome.jpg"
            alt="Đồ chơi trường mầm non"
            className="w-[550px] h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#7F55B1] mb-4">Giới thiệu về Mầm Non ABC</h2>
          <p className="text-lg text-gray-700 mb-4">
            Trường Mầm Non ABC là môi trường giáo dục thân thiện, hiện đại, nơi các bé được vui chơi, học tập và phát triển toàn diện. 
            Với đội ngũ giáo viên giàu kinh nghiệm, chương trình học phong phú, cơ sở vật chất an toàn, trường luôn tạo điều kiện tốt nhất để các bé khám phá thế giới xung quanh.
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Không gian lớp học sáng tạo, nhiều đồ chơi phát triển trí tuệ.</li>
            <li>Hoạt động ngoại khóa đa dạng, giúp bé tự tin và năng động.</li>
            <li>Chăm sóc sức khỏe, dinh dưỡng khoa học cho từng bé.</li>
            <li>Phối hợp chặt chẽ với phụ huynh trong quá trình giáo dục.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Content;