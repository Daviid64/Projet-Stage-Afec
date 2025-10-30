import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png"

function Acceuil() {
  return (
    <div className="page-container">
     

 <header className="header-blue">
  <img src={logoAfec} alt="Logo AFEC" className="header-logo" />

  <nav className="header-nav">
    <Link to="/exploration" className="nav-link">
      Exploration des Métiers
    </Link>
  </nav>
</header>

      <main className="main-content">
        <h2>Découvrez les métiers du numérique avec l’AFEC</h2>
        <p>
Le numérique est partout : dans nos entreprises, nos vies et nos métiers. Mais savez-vous vraiment quelles opportunités il offre ?
Avec l’AFEC, explorez un univers de carrières passionnantes et accessibles à tous : développement web, cybersécurité, data, et design web !
À travers nos programmes de découverte, nos témoignages de professionnels et nos formations certifiantes, nous vous aidons à mieux comprendre les métiers du digital et à trouver celui qui vous correspond.
Découvrez, apprenez et construisez votre parcours avec l’AFEC.
        </p>

        <div className="button-container">
          <Link to="/exploration" className="btn btn-blue">
            Exploration Métiers
          </Link>
        </div>
      </main>

      
      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default Acceuil;