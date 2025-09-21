const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#E3F7FA] to-[#F7FBFC] pb-10 font-[Quicksand,sans-serif]">
      {/* Viền tím phía trên */}
      <div className="w-full h-[8px] bg-[#7F55B1] mb-8" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-4 md:px-12 gap-8">
        {/* Logo & tên trường */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="font-bold text-4xl text-[#7F55B1] tracking-wide mt-8">
            KidsMona Preschool
          </span>
          <span className="mt-2 text-base text-gray-600">
            Nơi bé lớn lên mỗi ngày
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
            SĐT: <span className="font-normal">076 922 0162</span>
          </span>
          <span className="font-bold text-base text-[#341D4E]">
            Email: <span className="font-normal">kidsmona@gmail.com</span>
          </span>
          <span className="font-bold text-base text-[#341D4E]">
            Giờ mở cửa: <span className="font-normal">Thứ 2 - Thứ 7, 7:00 - 17:00</span>
          </span>
        </div>
        {/* Menu */}
        <div className="flex-1 flex flex-col gap-2 mt-8">
          <span className="font-bold text-2xl text-[#7F55B1] mb-1">
            MENU
          </span>
          <div className="w-16 h-2 bg-[#FFD966] rounded-full mb-2" />
          <nav>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/lop-hoc" className="font-bold text-base text-[#341D4E] hover:text-[#F97A00] transition">
                  Lớp học
                </a>
              </li>
              <li>
                <a href="/giao-vien" className="font-bold text-base text-[#341D4E] hover:text-[#F97A00] transition">
                  Giáo viên
                </a>
              </li>
              <li>
                <a href="/blog" className="font-bold text-base text-[#341D4E] hover:text-[#F97A00] transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/lien-he" className="font-bold text-base text-[#341D4E] hover:text-[#F97A00] transition">
                  Liên hệ
                </a>
              </li>
            </ul>
          </nav>
          {/* Social icons */}
          <div className="flex gap-3 mt-4">
            <a href="#" className="rounded-full bg-[#4267B2] p-2 text-white hover:scale-110 shadow transition" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="rounded-full bg-[#1DA1F2] p-2 text-white hover:scale-110 shadow transition" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="rounded-full bg-[#25D366] p-2 text-white hover:scale-110 shadow transition" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="rounded-full bg-[#E60023] p-2 text-white hover:scale-110 shadow transition" aria-label="Pinterest">
              <i className="fab fa-pinterest-p"></i>
            </a>
            <a href="#" className="rounded-full bg-[#DB4437] p-2 text-white hover:scale-110 shadow transition" aria-label="Google Plus">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Quyết định thành lập ở cuối footer */}
      <div className="w-full mt-10 text-center">
        <span className="text-sm">
          Quyết định thành lập: Số 123/QĐ-UBND do UBND Huyện Bình Chánh cấp ngày 01/01/2020
        </span>
      </div>
    </footer>
  );
};

export default Footer;