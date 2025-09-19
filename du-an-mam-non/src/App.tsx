import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
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
import HomePage from "./pages/HomePage/HomePage";
import { GVHomePage } from "./pages/GiaoVien/GVHomePage";
import { GV_ClassList } from "./pages/GiaoVien/GV_ClassList";
import GV_Blog_List from "./pages/GiaoVien/GV_Blog_List";
import GV_AddBlog from "./pages/GiaoVien/GV_AddBlog";
import GV_EditBlog from "./pages/GiaoVien/GV_EditBlog";

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
            <Route path="/" element={<HomePage />} />
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
