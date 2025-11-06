import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { useLogoutMutation } from "@/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { logoutSuccess } from "@/features/auth/authSlice";

export default function UserPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const user = useAppSelector((state) => state.auth.user);
  const onLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      dispatch(logoutSuccess());
      navigate("/login");
    }
  };

  return (
    <div>
      <p>User Page: {user ? user.name : "Guest"}</p>
    </div>
  );
}
