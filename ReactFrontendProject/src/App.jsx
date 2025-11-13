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

// 🔒 Composant de route protégée
function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.some(role => user.roles?.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// 🔁 Redirige si déjà connecté
function RedirectIfLoggedIn({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token && user.roles?.some(role => ["super_admin", "coordinateur"].includes(role))) {
    return <Navigate to="/admin" replace />;
  }

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/Home" element={<Acceuil />} />
        <Route path="/exploration" element={<ExplorationMetiers />} />
        <Route path="/Dev-Frontend" element={<FrontendDescription />} />
        <Route path="/Dev-Backend" element={<BackendDescription />} />
        <Route path="/Dev-Fullstack" element={<FullstackDescription />} />
        <Route path="/Intégrateur-Web" element={<IntegrateurWebDescription />} />
        <Route path="/Scrum-Master" element={<ScrumMasterDescription />} />
        <Route path="/UX-UI" element={<UXUIDesignerDescription />} />
        <Route path="/Graphiste" element={<GraphisteMotionDesigner />} />
        <Route path="/Product-Owner" element={<ProductOwner />} />
        <Route path="/Data-Scientist" element={<DataScientist />} />
        <Route path="/Data-Analyst" element={<DataAnalyst />} />
        <Route path="/Expert-Cybersécurité" element={<ExpertCybersecurite />} />
        <Route path="/Administrateur-Réseau" element={<AdministrateurReseau />} />
        <Route path="/Développeur-IA" element={<DeveloppeurIA />} />

        {/* Routes d’authentification */}
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
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPage />}
        />
        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        {/* Route protégée pour admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["super_admin","coordinateur"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/privacy-policy" element={<PolitiqueConfidentialite />} />
          {/* <Route path="/cookies" element={<CookiesPage />} /> */}
      
      </Routes>
    </Router>
  );
}

export default App;
