import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function PatientList() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      const q = query(collection(db, "patients"), where("doctorId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(data);
    };

    if (user) fetchPatients();
  }, [user]);

  const filteredPatients = patients.filter((p) =>
    p.ism?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.familya?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tel?.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mening Bemorlarim</h2>

      {/* Qidiruv */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Ism, familya yoki tel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/3"
        />
      </div>

      <ul className="space-y-2">
        {filteredPatients.length === 0 && <p>Hech qanday bemor topilmadi.</p>}
        {filteredPatients.map((b) => (
          <li
            key={b.id}
            className="p-4 bg-white shadow rounded hover:bg-gray-50 transition"
          >
            <Link to={`/patients/${b.id}`}>
              <strong>{b.ism} {b.familya}</strong> — {b.tel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
