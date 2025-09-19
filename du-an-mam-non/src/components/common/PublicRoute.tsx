import { Navigate, Outlet } from "react-router";
import { useUser } from "../../context/UserContext";

const PublicRoute = () => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (user) {
    if (user.role === "ADMIN") return <Navigate to="/admin/home" replace />;
    if (user.role === "TEACHER") return <Navigate to="/giaovien" replace />;
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
