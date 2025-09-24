/**
 * ClassPage - Trang quản lý các lớp học
 *
 * Features:
 * - Hero section with gradient background
 * - Class grid with level filtering (Mầm, Chồi, Lá)
 * - Teacher assignments display
 * - API integration with fallback mock data
 * - Responsive design
 *
 * Route: /lop-hoc
 * Layout: Similar to TeachersPage structure
 */

import Footer from "../HomePage2/Footer2";
import Header2 from "../HomePage2/Header2";
import ClassHero from "./ClassHero";
import ClassGrid from "./ClassGrid";

const ClassPage = () => {
  return (
    <div>
      {/* Header và layout tương tự Homepage2 */}
      <div className="pt-[80px]">
        <Header2 />
        <ClassHero />
        <ClassGrid />
        <Footer />
      </div>
    </div>
  );
};

export default ClassPage;
