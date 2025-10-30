import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css";
import Acceuil from "./pages/Acceuil.jsx";
import ExplorationMetiers from "./pages/ExplorationMetiers.jsx";
import LoginPage from "./pages/Login.jsx";
import Register from "./pages/inscription.jsx";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Acceuil />} />

        <Route path="/exploration" element={<ExplorationMetiers />} />

      </Routes>
    </Router>
  );
}

export default App;
