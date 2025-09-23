import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import UserManagement from "./pages/GiaoVu/UserManagement";
import ClassManagement from "./pages/GiaoVu/ClassManagement";
import GradeManagement from "./pages/GiaoVu/GradeManagement";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import { Toaster } from "react-hot-toast";

// import HomePage from "./pages/HomePage/HomePage";

import { GVHomePage } from "./pages/GiaoVien/GVHomePage";
import { GV_ClassList } from "./pages/GiaoVien/GV_ClassList";
import GV_Blog_List from "./pages/GiaoVien/GV_Blog_List";
import GV_AddBlog from "./pages/GiaoVien/GV_AddBlog";
import GV_EditBlog from "./pages/GiaoVien/GV_EditBlog";
import Homepage2 from "./pages/HomePage2/Homepage2";
import TeachersPage from "./pages/TeacherPage/TeachersPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import CreateNewPassword from "./pages/AuthPages/CreateNewPassword";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AppLayout />} path="/admin">
              {/* Giáo Vụ */}
              <Route path="home" element={<UserManagement />} />
              <Route path="gvuquanlynguoidung" element={<UserManagement />} />
              <Route path="gvuquanlylophoc" element={<ClassManagement />} />
              <Route path="gvuquanlykhoilop" element={<GradeManagement />} />
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
            <Route path="/doi-ngu-giao-vien" element={<TeachersPage />} />
            <Route path="/tin-tuc" element={<BlogPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/createnewpassword" element={<CreateNewPassword />} />
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 5000,
          style: { fontSize: "16px" },
        }}
      />
    </>
  );
}
