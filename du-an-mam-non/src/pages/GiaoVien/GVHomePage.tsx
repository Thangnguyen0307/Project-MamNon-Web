import Footer from "../HomePage2/Footer2";
import GV_Header from "./GV_Header";
import { Outlet } from "react-router";

import TeachersHero from "./TeachersHero";

export const GVHomePage = () => {
  return (
    <div className="pt-[80px]">
      <GV_Header />
      <TeachersHero />
      <section className="bg-white pb-8">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};
