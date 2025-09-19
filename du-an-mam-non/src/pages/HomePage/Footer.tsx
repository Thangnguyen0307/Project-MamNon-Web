const Footer = () => {
  return (
    <footer className="bg-[#F3F0FB] pb-10">
      {/* Viền tím phía trên */}
      <div className="w-full h-[8px] bg-[#8B5ACB] mb-8" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-4 md:px-12 gap-8">
        {/* Logo & tên trường */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="font-bold text-4xl text-[#8B5ACB] tracking-wide mt-8">
            MẦM NON ABC
          </span>
        </div>
        {/* Thông tin liên hệ */}
        <div className="flex-1 flex flex-col gap-2 mt-8">
          <span className="font-bold text-2xl text-[#88CE58] mb-1">
            LIÊN HỆ
          </span>
          <div className="w-16 h-2 bg-[#FFD966] rounded-full mb-2" />
          <span className="font-bold text-base text-[#341D4E]">
            Địa chỉ: <span className="font-normal">abc/10, đường Nguyễn Ảnh Thủ, xã Bà Điểm, Huyện Bình Chánh</span>
          </span>
          <span className="font-bold text-base text-[#341D4E]">
            SĐT: <span className="font-normal">09xxxxxxx</span>
          </span>
          <span className="font-bold text-base text-[#341D4E]">
            Email: <span className="font-normal">mamnonabc@gmail.com</span>
          </span>
        </div>
        {/* Đăng ký tư vấn + nút gửi */}
        <div className="flex-1 flex flex-col gap-2 mt-8 items-start">
          <span className="font-bold text-2xl text-[#F97A00] mb-1">
            ĐĂNG KÝ TƯ VẤN
          </span>
          <div className="w-22 h-2 bg-[#FFD966] rounded-full mb-2" />
          <div className="flex flex-col md:flex-row items-center w-full gap-4">
            <input
              type="text"
              placeholder="Số điện thoại"
              className="w-full md:w-[320px] h-12 rounded-2xl px-5 text-base shadow-md border-none outline-none mb-4 md:mb-0"
              style={{
                boxShadow: "0 4px 8px 0 #D4CDE1",
              }}
            />
            <button
              className="w-full md:w-[160px] h-12 bg-[#F97A00] text-white font-bold text-xl rounded-2xl shadow-2xl hover:bg-white hover:text-[#F97A00]"
            >
              GỬI
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;