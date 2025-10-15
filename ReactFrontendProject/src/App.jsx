import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./index.css"
import Acceuil from "./pages/Acceuil.jsx"
import ExplorationMetiers from "./pages/ExplorationMetiers.jsx"
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Acceuil />} />

        <Route path="/exploration" element={<ExplorationMetiers />} />

        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
