import About from "./About";
import Footer from "./Footer2";
import Header2 from "./Header2";
import Landing from "./Landing";
import TeachersCarousel from "./TeachersCarousel";

const Homepage2 = () => {
  return (
    <div>
      {/* Chỉ còn header và nội dung, không còn top bar */}
      <div className="pt-[80px]">
        <Header2 />
        <Landing heightLanding="250px" />
        <About />
        <TeachersCarousel limit={4} />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage2;
