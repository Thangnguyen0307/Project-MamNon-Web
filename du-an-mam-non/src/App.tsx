import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
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
import GradeManagement from "./pages/GiaoVu/GradeManagement";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import { Toaster } from "react-hot-toast";
import BlogManagement from "./pages/GiaoVien/BlogManagement";
// import HomePage from "./pages/HomePage/HomePage";
import { GVHomePage } from "./pages/GiaoVien/GVHomePage";
import { GV_ClassList } from "./pages/GiaoVien/GV_ClassList";
import GV_Blog_List from "./pages/GiaoVien/GV_Blog_List";
import GV_AddBlog from "./pages/GiaoVien/GV_AddBlog";
import GV_EditBlog from "./pages/GiaoVien/GV_EditBlog";
import Homepage2 from "./pages/HomePage2/Homepage2";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AppLayout />} path="/admin">
              <Route path="home" element={<Home />} />
              {/* Giáo Vụ */}
              <Route path="gvuquanlynguoidung" element={<UserManagement />} />
              <Route path="gvuquanlylophoc" element={<ClassManagement />} />
              <Route path="gvuquanlykhoilop" element={<GradeManagement />} />

              {/* Giáo Viên */}
              <Route path="gvquanlyhoatdong" element={<BlogManagement />} />

              <Route path="calendar" element={<Calendar />} />
              <Route path="blank" element={<Blank />} />

              {/* Others Page */}
              <Route path="profile" element={<UserProfiles />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="blank" element={<Blank />} />

              {/* Forms */}
              <Route path="form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="alerts" element={<Alerts />} />
              <Route path="avatars" element={<Avatars />} />
              <Route path="badge" element={<Badges />} />
              <Route path="buttons" element={<Buttons />} />
              <Route path="images" element={<Images />} />
              <Route path="videos" element={<Videos />} />

              {/* Charts */}
              <Route path="line-chart" element={<LineChart />} />
              <Route path="bar-chart" element={<BarChart />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
            <Route path="/giaovien" element={<GVHomePage />}>
              <Route index element={<GV_ClassList />} />
              <Route path="baiviet/:classId" element={<GV_Blog_List />} />
              <Route path="thembaiviet/:classId" element={<GV_AddBlog />} />
              <Route
                path="chinhsuabaiviet/:classId/:blogId"
                element={<GV_EditBlog />}
              />
            </Route>
          </Route>
          {/* HomePage   */}

          {/* Auth Layout */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Homepage2 />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          style: { fontSize: "14px" },
        }}
      />
    </>
  );
}
