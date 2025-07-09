import { useState } from "react";
import { db } from "../firebase/firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const viloyatlar = {
  "Toshkent": ["Olmazor", "Yunusobod", "Chilonzor", "Mirzo Ulug‘bek", "Yakkasaroy"],
  "Andijon": ["Asaka", "Baliqchi", "Bo‘z", "Jalaquduq", "Marhamat"],
  "Farg‘ona": ["Qo‘qon", "Marg‘ilon", "Farg‘ona shahri", "Rishton", "Oltiariq"],
  "Namangan": ["Namangan shahri", "Chortoq", "Chust", "Pop", "To‘raqo‘rg‘on"],
  "Samarqand": ["Samarqand shahri", "Urgut", "Pastdarg‘om", "Ishtixon", "Bulung‘ur"],
  "Buxoro": ["Buxoro shahri", "Vobkent", "Kogon", "G‘ijduvon", "Shofirkon"],
  "Navoiy": ["Navoiy shahri", "Zarafshon", "Konimex", "Navbahor", "Karmana"],
  "Qashqadaryo": ["Qarshi", "Shahrisabz", "Kitob", "Yakkabog‘", "Kasbi"],
  "Surxondaryo": ["Termiz", "Denov", "Sherobod", "Boysun", "Angor"],
  "Xorazm": ["Urganch", "Xiva", "Shovot", "Hazorasp", "Qo‘shko‘pir"],
  "Jizzax": ["Jizzax shahri", "Zomin", "G‘allaorol", "Paxtakor", "Forish"],
  "Sirdaryo": ["Guliston", "Yangiyer", "Shirin", "Sayxunobod", "Boyovut"],
  "Qoraqalpog‘iston": ["Nukus", "Beruniy", "Mo‘ynoq", "Chimboy", "Taxiatosh"]
};

function PatientForm() {
  const [ism, setIsm] = useState("");
  const [familya, setFamilya] = useState("");
  const [tel, setTel] = useState("");
  const [viloyat, setViloyat] = useState("");
  const [tuman, setTuman] = useState("");
  const [manzilQolgan, setManzilQolgan] = useState("");
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
        manzil: `${viloyat}, ${tuman}, ${manzilQolgan}`,
        tugilgan: Timestamp.now().toDate().toISOString().slice(0, 10),
        kasalliklar: [],
        oxirgiMurojat: Timestamp.now().toDate().toISOString().slice(0, 10),
        createdAt: Timestamp.now()
      });
      navigate("/patients");
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div className="p-6 flex items-center flex-col gap-5 w-full">
      <h2 className="text-2xl font-bold mb-4">Yangi Bemor Qo‘shish</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:w-1/2 items-center gap-4">

        <input
          className="px-2 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" placeholder="Ism" value={ism}
          onChange={(e) => setIsm(e.target.value)} required
        />

        <input
          className="px-2 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" placeholder="Familya" value={familya}
          onChange={(e) => setFamilya(e.target.value)} required
        />

        <input
          className="px-2 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" placeholder="Telefon" value={tel}
          onChange={(e) => setTel(e.target.value)} required
        />

        {/* Viloyat select */}
        <select
          value={viloyat}
          onChange={(e) => {
            setViloyat(e.target.value);
            setTuman(""); // tuman reset bo‘lsin
          }}
          className="px-2 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Viloyatni tanlang</option>
          {Object.keys(viloyatlar).map((vil) => (
            <option key={vil} value={vil}>{vil}</option>
          ))}
        </select>

        {/* Tuman select */}
        {viloyat && (
          <select
            value={tuman}
            onChange={(e) => setTuman(e.target.value)}
            className="px-2 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Tumanni tanlang</option>
            {viloyatlar[viloyat].map((tum) => (
              <option key={tum} value={tum}>{tum}</option>
            ))}
          </select>
        )}

        {/* Qolgan manzil */}
        <input
          className="px-2 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text" placeholder="Mahalla, ko‘cha, uy raqami..."
          value={manzilQolgan}
          onChange={(e) => setManzilQolgan(e.target.value)} required
        />

        <button
          className="py-2 px-6 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Qo‘shish
        </button>
      </form>
    </div>
  );
}

export default PatientForm;
