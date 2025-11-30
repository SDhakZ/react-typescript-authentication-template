import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import UserPage from "@/features/users/pages/UsersPage";
import RequireAuth from "@/components/RequireAuth";
import DashboardLayout from "@/layout/DashboardLayout";
import SettingsPage from "@/features/profile/pages/ProfilePage";
import ProfilePage from "@/features/profile/pages/ProfilePage";
import OAuthSuccess from "@/features/auth/pages/OAuthSuccess";
import SignUpPage from "@/features/auth/pages/SignUpPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/client-list" />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/client-list" element={<UserPage />} />
          <Route path="/profile" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
