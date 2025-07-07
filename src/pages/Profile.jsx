import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) return <p>Yuklanmoqda...</p>;

  return (
    <div classname="absolute right-0 top-0 bg-red-800">
      <h2>Profil</h2>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default Profile;
