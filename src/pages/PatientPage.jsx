import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

function PatientPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [kasallik, setKasallik] = useState("");
  const [dori, setDori] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      const docRef = doc(db, "patients", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPatient({ id: docSnap.id, ...docSnap.data() });
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleAddDiagnosis = async () => {
    const yangiKasallik = {
      nomi: kasallik,
      dorilar: dori.split(",").map((d) => d.trim()),
      sana: new Date().toISOString().slice(0, 10)
    };

    const updated = {
      ...patient,
      kasalliklar: [...(patient.kasalliklar || []), yangiKasallik],
      oxirgiMurojat: yangiKasallik.sana
    };

    await updateDoc(doc(db, "patients", id), updated);
    setPatient(updated);
    setKasallik("");
    setDori("");
  };

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{patient.ism} {patient.familya}</h2>
      <p><b>Telefon:</b> {patient.tel}</p>
      <p><b>Manzil:</b> {patient.manzil}</p>
      <p><b>Oxirgi murojat:</b> {patient.oxirgiMurojat}</p>

      <h3>Kasalliklar tarixi</h3>
      <ul>
        {patient.kasalliklar?.map((k, i) => (
          <li key={i}>
            <b>{k.nomi}</b> — Dorilar: {k.dorilar.join(", ")} — Sana: {k.sana}
          </li>
        ))}
      </ul>

      <hr />
      <h4>Yangi tashxis qo‘shish</h4>
      <input
        type="text"
        placeholder="Kasallik nomi"
        value={kasallik}
        onChange={(e) => setKasallik(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dorilar (vergul bilan)"
        value={dori}
        onChange={(e) => setDori(e.target.value)}
      />
      <button onClick={handleAddDiagnosis}>Qo‘shish</button>
    </div>
  );
}

export default PatientPage;
