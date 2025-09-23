import Footer from "../HomePage2/Footer2";
import GV_Header from "./GV_Header";
import { Outlet } from "react-router";
import Landing from "./Landing";

export const GVHomePage = () => {
  return (
    <>
      <GV_Header />
      <Landing />
      <section className="bg-white pb-8">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};
