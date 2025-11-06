import { useAppSelector } from "@/hooks/hooks";
import { useGetProfileQuery } from "../profileApi";

export default function ProfilePage() {
  const { isLoading } = useGetProfileQuery();
  const user = useAppSelector((state) => state.profile.user);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>ProfilePage: {user?.email}</div>;
}
