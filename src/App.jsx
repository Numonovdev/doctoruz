import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import PatientList from "./pages/PatientList";
import PatientForm from "./pages/PatientForm";
import PatientPage from "./pages/PatientPage";
import Profile from "./pages/Profile";

function AppWrapper() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && (location.pathname === "/" || location.pathname === "/login")) {
      if (user.role === "doctor") {
        navigate("/dashboard");
      }
    }
  }, [user, navigate, location.pathname]);

  return (
    <div className="flex">
      <Navbar />
      <div className="ml-60 w-full min-h-screen bg-gray-50 p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><PatientList /></PrivateRoute>} />
          <Route path="/add-patient" element={<PrivateRoute><PatientForm /></PrivateRoute>} />
          <Route path="/patients/:id" element={<PrivateRoute><PatientPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
