import { useAppSelector } from "@/hooks/hooks";

export default function UserPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <p>User Page: {user ? user.name : "Guest"}</p>
    </div>
  );
}
