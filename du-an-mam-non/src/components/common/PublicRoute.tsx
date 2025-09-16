import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const PublicRoute = () => {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
