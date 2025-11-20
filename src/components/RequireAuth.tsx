import { Navigate, Outlet } from "react-router-dom";
import { loginSuccess } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";

const RequireAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token && !isAuthenticated) {
      dispatch(loginSuccess(null));
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated && !sessionStorage.getItem("accessToken")) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
