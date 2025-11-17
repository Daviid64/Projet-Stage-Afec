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
          Nom du centre de formation :<strong> AFEC Bayonne </strong><br />
          Adresse : <em>8 Impasse d'Atchinetche 64100 Bayonne</em><br />
          Email : <a href="mailto:bayonne@afec.fr">bayonne@afec.fr</a><br />
          Téléphone : <em> 05 59 59 08 44</em><br /><br />
          Nom du concepteur : <em> Oguihandy </em><br />
          Prénom du concepteur : <em> David </em>
          Fonction du concepteur : <em> Stagiaire pour la conception de ce site pour l'Afec </em>
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
          Nom : <em>Drutel</em><br />
          Prénom : <em>Isabelle</em><br />
          Fonction : <em>Directrice de l'AFEC</em><br />
          Email : <a href="mailto:bayonne@afec.fr">bayonne@afec.fr</a>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l’objet d’une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d’auteur.
          L’Utilisateur doit solliciter l’autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Il s’engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.
          Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation express de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par l’article L 335-2 et suivants du Code de la propriété intellectuelle.
          Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que l’Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.
        </p>
      </section>

      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default MentionsLegales;
