import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import MentionsLegales from "./components/MentionsLegales.jsx";
import PolitiqueConfidentialite from "./components/PolitiqueConfidentialite.jsx";
import Acceuil from "./pages/Home.jsx";
import ExplorationMetiers from "./pages/ExplorationMetiers.jsx";
import LoginPage from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ForgotPasswordPage from "./components/forgotPassword.jsx";
import ResetPasswordPage from "./components/ResetPassword.jsx";
import AdminPage from "./pages/Admin.jsx";
import FrontendDescription from "./pages/Dev-Frontend.jsx";
import BackendDescription from "./pages/Dev-Backend.jsx";
import FullstackDescription from "./pages/Dev-Fullstack.jsx";
import IntegrateurWebDescription from "./pages/Integrateur-Web.jsx";
import ScrumMasterDescription from "./pages/Scrum-Master.jsx";
import UXUIDesignerDescription from "./pages/Ux-Ui.jsx";
import GraphisteMotionDesigner from "./pages/Graphiste.jsx";
import ProductOwner from "./pages/Product-Owner.jsx";
import DataScientist from "./pages/Data-Scientist.jsx";
import DataAnalyst from "./pages/Data-Analyst.jsx";
import ExpertCybersecurite from "./pages/Expert-Cybersecurite.jsx";
import AdministrateurReseau from "./pages/Administrateur-Reseau.jsx";
import DeveloppeurIA from "./pages/Developpeur-IA.jsx";

// Protège toutes les pages nécessitant la connexion
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Protège uniquement les pages admin
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;

  if (!user.roles?.includes("super_admin") && !user.roles?.includes("coordinateur")) {
    return <Navigate to="/Home" replace />;
  }

  return children;
}

// Empêche les utilisateurs connectés d'accéder à Register ou Login
function RedirectIfLoggedIn({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token) {
    if (user.roles?.includes("super_admin") || user.roles?.includes("coordinateur")) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/Home" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Routes protégées (utilisateur connecté obligatoire) */}
        <Route path="/Home" element={<ProtectedRoute><Acceuil /></ProtectedRoute>} />
        <Route path="/exploration" element={<ProtectedRoute><ExplorationMetiers /></ProtectedRoute>} />
        <Route path="/Dev-Frontend" element={<ProtectedRoute><FrontendDescription /></ProtectedRoute>} />
        <Route path="/Dev-Backend" element={<ProtectedRoute><BackendDescription /></ProtectedRoute>} />
        <Route path="/Dev-Fullstack" element={<ProtectedRoute><FullstackDescription /></ProtectedRoute>} />
        <Route path="/Intégrateur-Web" element={<ProtectedRoute><IntegrateurWebDescription /></ProtectedRoute>} />
        <Route path="/Scrum-Master" element={<ProtectedRoute><ScrumMasterDescription /></ProtectedRoute>} />
        <Route path="/UX-UI" element={<ProtectedRoute><UXUIDesignerDescription /></ProtectedRoute>} />
        <Route path="/Graphiste" element={<ProtectedRoute><GraphisteMotionDesigner /></ProtectedRoute>} />
        <Route path="/Product-Owner" element={<ProtectedRoute><ProductOwner /></ProtectedRoute>} />
        <Route path="/Data-Scientist" element={<ProtectedRoute><DataScientist /></ProtectedRoute>} />
        <Route path="/Data-Analyst" element={<ProtectedRoute><DataAnalyst /></ProtectedRoute>} />
        <Route path="/Expert-Cybersécurité" element={<ProtectedRoute><ExpertCybersecurite /></ProtectedRoute>} />
        <Route path="/Administrateur-Réseau" element={<ProtectedRoute><AdministrateurReseau /></ProtectedRoute>} />
        <Route path="/Développeur-IA" element={<ProtectedRoute><DeveloppeurIA /></ProtectedRoute>} />

        {/* Routes de connexion/inscription */}
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <LoginPage />
            </RedirectIfLoggedIn>
          }
        />

        <Route
          path="/"
          element={
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          }
        />

        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Route protégée admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        {/* Routes publiques */}
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/privacy-policy" element={<PolitiqueConfidentialite />} />

      </Routes>
    </Router>
  );
}

export default App;
