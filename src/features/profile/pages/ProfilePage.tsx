import { useAppSelector } from "@/hooks/hooks";
import { useGetProfileQuery } from "../profileApi";

export default function ProfilePage() {
  const { isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const user = useAppSelector((state) => state.profile.user);
  return <div>ProfilePage: {user?.email}</div>;
}
