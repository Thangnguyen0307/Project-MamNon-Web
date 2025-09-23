import Footer from "../HomePage2/Footer2";
import Header2 from "../HomePage2/Header2";
import TeachersHero from "./TeachersHero";
import TeachersGrid from "./TeachersGrid";


const TeachersPage = () => {
  return (
    <div>
      {/* Header và layout tương tự Homepage2 */}
      <div className="pt-[80px]">
        <Header2 />
        <TeachersHero />
        <TeachersGrid />
        <Footer />
      </div>
    </div>
  );
};

export default TeachersPage;
