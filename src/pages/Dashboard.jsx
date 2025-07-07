import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Duxtir paneliga xush kelibsiz, {user?.email}</h2>

      <div className="mt-4">
        <Link to="/patients" className="text-blue-600 underline">
          Bemorlar sahifasiga o‘tish
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
