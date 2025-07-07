import { useState } from "react";
import { db } from "../firebase/firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PatientForm() {
  const [ism, setIsm] = useState("");
  const [familya, setFamilya] = useState("");
  const [tel, setTel] = useState("");
  const [manzil, setManzil] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "patients"), {
        doctorId: user.uid,
        ism,
        familya,
        tel,
        manzil,
        tugilgan: Timestamp.now().toDate().toISOString().slice(0, 10),
        kasalliklar: [],
        oxirgiMurojat: Timestamp.now().toDate().toISOString().slice(0, 10),
      });
      navigate("/patients");
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Yangi Bemor Qo‘shish</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ism" value={ism} onChange={(e) => setIsm(e.target.value)} required />
        <input type="text" placeholder="Familya" value={familya} onChange={(e) => setFamilya(e.target.value)} required />
        <input type="text" placeholder="Telefon" value={tel} onChange={(e) => setTel(e.target.value)} required />
        <input type="text" placeholder="Manzil" value={manzil} onChange={(e) => setManzil(e.target.value)} required />
        <button type="submit">Qo‘shish</button>
      </form>
    </div>
  );
}

export default PatientForm;
