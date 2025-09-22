import React, { useRef, useState, useEffect } from "react";

const slides = [
  "/images/homepage/slide1.jpg",
  "/images/homepage/slide2.webp",
  "/images/homepage/slide3.jpg",
];

const HEADER_HEIGHT = 250; // px

const Landing = () => {
  const [current, setCurrent] = useState(0);
  const startX = useRef<number | null>(null);

  // Tự động chuyển slide mỗi 4 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current]);

  // Vuốt hoặc kéo chuột để chuyển slide
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    startX.current =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (startX.current === null) return;
    const endX =
      "changedTouches" in e
        ? e.changedTouches[0].clientX
        : (e as React.MouseEvent).clientX;
    const diff = endX - startX.current;
    if (diff > 50 && current > 0) setCurrent(current - 1);
    else if (diff < -50 && current < slides.length - 1) setCurrent(current + 1);
    startX.current = null;
  };

  return (
    <div
      className="w-full flex items-center justify-center bg-white overflow-hidden"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <div
        className="relative w-full h-full rounded-none overflow-hidden shadow-2xl"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}>
        {slides.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-in-out
              ${
                idx === current
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-105 z-0"
              }
            `}
            draggable={false}
          />
        ))}
        {/* 3 chấm phía dưới slide */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white
                ${
                  current === idx
                    ? "bg-[#7F55B1] shadow-lg opacity-80"
                    : "bg-gray-400 opacity-40"
                }
              `}
              onClick={() => setCurrent(idx)}
              aria-label={`Chuyển đến slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
