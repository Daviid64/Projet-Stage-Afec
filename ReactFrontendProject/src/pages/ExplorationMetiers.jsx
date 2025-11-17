import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

 const navigate = useNavigate();
   const [user, setUser] = useState(null);
 
   // Charger l'utilisateur depuis le localStorage
   useEffect(() => {
     const storedUser = localStorage.getItem("user");
     if (storedUser) {
       try {
         setUser(JSON.parse(storedUser));
       } catch {
         console.error("Erreur lors du parsing du user stocké.");
         localStorage.removeItem("user");
         localStorage.removeItem("token");
       }
     }
   }, []);
 
   const handleLogout = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     setUser(null);
     navigate("/login");
   };

  return (
    <div className="exploration-container">
      {/* HEADER conservé */}
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/Home" className="nav-link">Accueil</Link>
          <button onClick={handleLogout} className="btn-logout">
            Déconnexion
          </button>
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
          <p>
            <Link to="/mentions-legales">Mentions légales</Link> |{" "}
            <Link to="/privacy-policy">Politique de confidentialité</Link> |{" "}
          </p>
      </footer>
    </div>
  );
}

export default ExplorationMetier;
