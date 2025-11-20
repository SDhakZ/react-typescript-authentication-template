import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "@/features/profile/profileApi";
import { loginSuccess } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/hooks";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [ready, setReady] = useState(false);

  // Read token from URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get("accessToken");

  // STEP 1 — Only run this when token exists
  useEffect(() => {
    if (!token) return; // DON'T redirect, just wait

    // Save token
    sessionStorage.setItem("accessToken", token);

    // Mark auth state
    dispatch(loginSuccess(null));

    // Clean URL
    window.history.replaceState({}, "", "/oauth-success");

    // Now query can run
    setReady(true);
  }, [token, dispatch]);

  // STEP 2 — fetch profile ONLY after ready
  const { data, isSuccess, error } = useGetProfileQuery(undefined, {
    skip: !ready,
  });

  console.log({ data, isSuccess, error });

  // STEP 3 — redirect when profile succeeds
  useEffect(() => {
    if (isSuccess) {
      navigate("/client-list", { replace: true });
    }
  }, [isSuccess, navigate]);

  return <div>Signing you in with Google...</div>;
}
