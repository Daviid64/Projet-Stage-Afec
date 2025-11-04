import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import Acceuil from "./pages/Acceuil.jsx";
import ExplorationMetiers from "./pages/ExplorationMetiers.jsx";
import LoginPage from "./pages/Login.jsx";
import Register from "./pages/inscription.jsx";
import API from "./api.js"
import ForgotPasswordPage from "./pages/forgotPassword.jsx"
import ResetPasswordPage from "./pages/ResetPassword.jsx";

function App() {

useEffect(() => {
  API.get("/api/test")
    .then((res)=> console.log("Réponse du backend :", res.data))
    .catch((err) => console.error("Erreur :", err));
}, [])

  return (
    <Router>
      <Routes>

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />

        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/" element={<Acceuil />} />

        <Route path="/exploration" element={<ExplorationMetiers />} />

      </Routes>
    </Router>
  );
}

export default App;
