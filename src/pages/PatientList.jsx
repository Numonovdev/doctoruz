import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function PatientList() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const q = query(collection(db, "patients"), where("doctorId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPatients(data);
    };

    if (user) fetchPatients();
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Mening Bemorlarim</h2>
      <ul>
        {patients.map((b) => (
          <li key={b.id}>
            <Link to={`/patients/${b.id}`}>
            {b.ism} {b.familya} — {b.tel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
