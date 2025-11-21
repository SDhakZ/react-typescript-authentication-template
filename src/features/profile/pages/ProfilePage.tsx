import EditProfileForm from "../components/EditProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import AddPasswordForm from "../components/AddPasswordForm";
import { useGetProfileQuery } from "../profileApi";

export default function ProfilePage() {
  const { data } = useGetProfileQuery();
  const user = data?.data?.user;

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <EditProfileForm user={user} />

      {user.hasPassword ? <ChangePasswordForm /> : <AddPasswordForm />}
    </div>
  );
}
