import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [parol, setParol] = useState("");
  const [xatolik, setXatolik] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setXatolik("");

    try {
      await signInWithEmailAndPassword(auth, email, parol);
      navigate("/dashboard");
    } catch (err) {
      setXatolik("Login yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 absolute top-0 left-0 w-full">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Kirish</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Parol"
            value={parol}
            onChange={(e) => setParol(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Kirish
          </button>
        </form>
        {xatolik && (
          <p className="mt-4 text-center text-red-600">{xatolik}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
