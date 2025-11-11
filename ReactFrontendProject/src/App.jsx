import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import Acceuil from "./pages/Home.jsx";
import ExplorationMetiers from "./pages/ExplorationMetiers.jsx";
import LoginPage from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ForgotPasswordPage from "./components/forgotPassword.jsx";
import ResetPasswordPage from "./components/ResetPassword.jsx";
import AdminPage from "./pages/Admin.jsx";
import FrontendDescription from "./pages/Dev-Frontend.jsx"


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

  if (token && user.roles?.includes("super_admin")) {
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
        <Route path="/" element={<Acceuil />} />
        <Route path="/exploration" element={<ExplorationMetiers />} />
        <Route path="/Dev-Frontend" element={<FrontendDescription />} />

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
          path="/register"
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
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
