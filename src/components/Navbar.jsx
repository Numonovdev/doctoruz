import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-blue-800 text-white p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Duxtir UZ</h2>

      {user && (
        <ul className="space-y-3">
          <li><Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link></li>
          <li><Link to="/patients" className="hover:text-blue-300">Bemorlar</Link></li>
          <li><Link to="/add-patient" className="hover:text-blue-300">Yangi Bemor</Link></li>
          <li><Link to="/profile" className="hover:text-blue-300">Profil</Link></li>
          <li>
            <button
              onClick={handleLogout}
              className="mt-4 text-red-300 hover:text-red-500"
            >
              Chiqish
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
