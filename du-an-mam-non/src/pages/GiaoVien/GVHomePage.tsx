import Footer from "../HomePage2/Footer2";
import Landing from "../HomePage2/Landing";
import GV_Header from "./GV_Header";
import { Outlet } from "react-router";

export const GVHomePage = () => {
  return (
    <>
      <GV_Header />
      <Landing heightLanding="450" />
      <section className="bg-white pb-8">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};
