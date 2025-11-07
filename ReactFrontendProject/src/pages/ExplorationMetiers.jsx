import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../index.css';
import logoAfec from '../assets/logoAfec.png';

function ExplorationMetier() {
  const metiers = [
    { name: "Développement Backend", link: "/Dev-Backend" },
    { name: "Développement Frontend", link: "/Dev-Frontend" },
    { name: "Développement Fullstack", link: "/Dev-Fullstack" },
    { name: "Intégrateur Web", link: "/Intégrateur-Web" },
    { name: "Scrum Master", link: "/Scrum-Master" },
    { name: "UX/UI DESIGNER", link: "/UX-UI" },
    { name: "Graphiste/Motion Designer", link: "/Graphiste" },
    { name: "Data Scientist", link: "/Data-Scientist" },
    { name: "Product Owner", link: "/Product-Owner" },
    { name: "Data Analyst", link: "/Data-Analyst" },
    { name: "Expert Cybersécurité", link: "/Expert-Cybersécurité" },
    { name: "Administrateur Réseau", link: "/Administrateur-Réseau" },
    { name: "Développeur IA", link: "/Développeur-IA" },
  ];

  return (
    <div className="exploration-container">
      {/* HEADER conservé */}
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/" className="nav-link">Accueil</Link>
        </nav>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="main-content">
        <h2 className="main-title">Découvrez les métiers du numérique</h2>
        <p className="subtitle">
          Explorez les différents métiers du digital et trouvez votre voie dans un secteur en pleine expansion.
        </p>

        <div className="metiers-grid">
          {metiers.map((metier, index) => (
            <Link key={index} to={metier.link} className="metier-card">
              <span className="metier-name">{metier.name}</span>
            </Link>
          ))}
        </div>
      </main>

      {/* FOOTER conservé */}
      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default ExplorationMetier;
