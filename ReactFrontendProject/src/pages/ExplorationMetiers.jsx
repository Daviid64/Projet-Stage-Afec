import React from 'react';
import '../App.css';
import "../index.css"
import { Link } from 'react-router-dom';
import logoAfec from "../assets/logoAfec.png"


function ExplorationMetier() {
  const metiers = [
    { name: "Développement Backend", link: "/Dev-Backend" },
    { name: "Développement Frontend", link: "/Dev-Frontend" },
    { name: "Développement Fullstack", link: "/Dev-Fullstack" },
    { name: "Développeur OpSec(Operationnal Security)", link: "/OpSec" },
    { name: "Développeur IA", link: "/Dev-IA" },
    { name: "Analyste-Cybersécurité", link: "/Analyste-Cyber" },
    { name: "UX/UI Designer", link: "/UX-UI" },
    { name: "Développeur Logiciel Agile", link: "/Agile" },
    { name: "Technicien Système et Réseau", link: "/Infra-Reseau" },
    { name: "Testeur Logiciel", link: "/Testeur" }
  ];

  return (
    <div className="exploration-container">
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />

        <nav className="header-nav">
          <Link to="/" className="nav-link">Accueil</Link>
        </nav>
      </header>
      

      <main className="main-content">
        <h2 className="main-title">Découvrez nos métiers du numérique</h2>
        <div className="metiers-grid">
          {metiers.map((metier, index) => (
            <Link key={index} to={metier.link} className="metier-button">
              {metier.name}
            </Link>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default ExplorationMetier;
