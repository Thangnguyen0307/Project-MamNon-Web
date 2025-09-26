import About from "./About";
import Footer from "./Footer2";
import GoogleMap from "./GGMap";
import Header2 from "./Header2";
import Landing from "./Landing";
import TeachersCarousel from "./TeachersCarousel";
import ClassCarousel from "../ClassPage/ClassCarousel";

const Homepage2 = () => {
  return (
    <div>
      {/* Chỉ còn header và nội dung, không còn top bar */}
      <div className="">
        <Header2 />
        <Landing />
        <About />
        <TeachersCarousel limit={4} />
        <ClassCarousel limit={4} />
        <GoogleMap />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage2;
