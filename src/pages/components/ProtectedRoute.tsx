import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
function ProtectedRoute() {
  const navigate = useNavigate();

  //   Checking token in session storage
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/"); // navigating to home page -> click on login button to get token
    }
  }, [navigate]);

  // Conditionaly Routing according to token
  return sessionStorage.getItem("token") ? (
    <Outlet></Outlet>
  ) : (
    Navigate({ to: "/" })
  );
}

export default ProtectedRoute;
