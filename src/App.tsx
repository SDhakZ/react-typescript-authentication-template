import AppRoutes from "./app/AppRoutes";
import { useGetProfileQuery } from "./features/profile/profileApi";

function App() {
  const token = sessionStorage.getItem("accessToken");
  const { isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (isLoading) return <p>Loading...</p>;

  return <AppRoutes />;
}

export default App;
