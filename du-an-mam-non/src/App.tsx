import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ResetPasswordPage from "./pages/AuthPages/ResetPassword";
import ChangePassword from "./pages/AuthPages/ChangePassword";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import UserManagement from "./pages/GiaoVu/UserManagement";
import ClassManagement from "./pages/GiaoVu/ClassManagement";
import ActivityManagement from "./pages/GiaoVien/ActivityManagement";
import GradeManagement from "./pages/GiaoVu/GradeManagement";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* PROTECTED + LAYOUT */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* index of layout ("/") */}
            <Route index element={<Home />} />

            {/* Giáo Vụ */}
            <Route path="/gvuquanlynguoidung" element={<UserManagement />} />
            <Route path="/gvuquanlylophoc" element={<ClassManagement />} />
            <Route path="/gvuquanlykhoilop" element={<GradeManagement />} />

            {/* Giáo Viên */}
            <Route path="/gvquanlyhoatdong" element={<ActivityManagement />} />

            {/* Others */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms / Tables */}
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* UI Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />

            {/* Change password phải là protected */}
            <Route path="/update-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="bottom-right" toastOptions={{ style: { fontSize: "13px" } }} />
    </>
  );
}
