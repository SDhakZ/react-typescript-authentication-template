import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import UserPage from "@/features/users/pages/UsersPage";
import RequireAuth from "@/components/RequireAuth";
import DashboardLayout from "@/layout/DashboardLayout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
