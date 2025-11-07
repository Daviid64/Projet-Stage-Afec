import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import Acceuil from "./pages/Home.jsx";
import ExplorationMetiers from "./pages/ExplorationMetiers.jsx";
import LoginPage from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import API from "./api.js"
import ForgotPasswordPage from "./components/forgotPassword.jsx"
import ResetPasswordPage from "./components/ResetPassword.jsx";
import AdminPage from "./pages/Admin.jsx"

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />

        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/" element={<Acceuil />} />

        <Route path="/exploration" element={<ExplorationMetiers />} />

      </Routes>
    </Router>
  );
}

export default App;
