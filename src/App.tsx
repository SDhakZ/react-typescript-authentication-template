import AppRoutes from "./app/AppRoutes";
import { useGetProfileQuery } from "./features/profile/profileApi";

function App() {
  const token = sessionStorage.getItem("accessToken");
  useGetProfileQuery(undefined, {
    skip: !token,
  });

  return <AppRoutes />;
}

export default App;
