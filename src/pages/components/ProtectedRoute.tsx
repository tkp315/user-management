import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
function ProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return sessionStorage.getItem("token") ? (
    <Outlet></Outlet>
  ) : (
    Navigate({ to: "/" })
  );
}

export default ProtectedRoute;
