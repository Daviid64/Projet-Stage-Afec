import React from "react";
import "./LegalPages.css";
import logoAfec from "../assets/logoAfec.png";
import { Link } from "react-router-dom";


const MentionsLegales = () => {
  return (
    <div className="page-container-rgpd">

    <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/Home" className="nav-link">Accueil</Link>
          <Link to="/exploration" className="nav-link"> Exploration des Métiers</Link>
        </nav>
      </header>

      <h1>Mentions légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          Nom du centre de formation : <strong>Ton Centre de Formation</strong><br />
          Adresse : <em>Adresse complète du centre</em><br />
          Email : <a href="mailto:contact@centre.fr">contact@centre.fr</a><br />
          Téléphone : <em>Numéro de contact</em>
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Hébergeur du site : <strong>Nom de l’hébergeur</strong><br />
          Adresse : <em>Adresse de l’hébergeur</em><br />
          Téléphone : <em>Numéro de l’hébergeur</em><br />
          Email : <a href="mailto:contact@hebergeur.fr">contact@hebergeur.fr</a>
        </p>
      </section>

      <section>
        <h2>Responsable de la publication</h2>
        <p>
          Nom : <em>Nom du responsable</em><br />
          Fonction : <em>Fonction dans le centre</em><br />
          Email : <a href="mailto:responsable@centre.fr">responsable@centre.fr</a>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Tous les contenus présents sur ce site (textes, images, logos, code) sont la propriété du centre de formation ou de leurs auteurs respectifs et ne peuvent être reproduits sans autorisation.
        </p>
      </section>

      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default MentionsLegales;
