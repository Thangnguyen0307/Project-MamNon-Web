import BlogsCarousel from "./BlogsCarousel";
import Footer from "../HomePage2/Footer2";
import Header2 from "../HomePage2/Header2";
import Landing from "../HomePage2/Landing";

const BlogPage = () => {
  return (
    <div>
      {/* Header và Landing section */}
      <div className="pt-[80px]">
        <Header2 />
        <Landing />
        <BlogsCarousel limit={6} />
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
