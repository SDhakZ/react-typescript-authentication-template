import AppRoutes from "./app/AppRoutes";
import { useEffect } from "react";
import { useGetProfileQuery } from "./features/profile/profileApi";

function App() {
  const token = sessionStorage.getItem("accessToken");
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (profile) {
      console.log("User profile:", profile.data.user);
    } else if (isError) {
      console.warn("Failed to load profile");
    }
  }, [profile, isError]);

  if (isLoading) return <p>Loading...</p>;

  return <AppRoutes />;
}

export default App;
