import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function FrontendDescription() {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/Home" className="nav-link">Accueil</Link>
          <Link to="/exploration" className="nav-link"> Exploration des Métiers </Link> 
        </nav>
      </header>

      {/* Main content */}
      <main className="frontend-main">
        <h1>DÉVELOPPEUR FRONT-END</h1>

        <section>
          <h2>Description courte</h2>
          <p>
            Le Développeur front-end est l'artisan de l'interface utilisateur, c'est-à-dire la partie visible et interactive d'un site web ou d'une application mobile. 
            Il conçoit l'ergonomie pour rendre la navigation la plus fluide et agréable possible pour l'utilisateur. 
            Son rôle est complémentaire à celui du développeur back-end.
          </p>
        </section>

        <section>
          <h2>Description détaillée</h2>
          <h3>Rôle et missions principales</h3>
          <p>
            Le Développeur front-end est l'expert qui prend les maquettes créées par les designers et les transforme en un produit fonctionnel accessible aux utilisateurs. 
            Son objectif principal est d'optimiser l'expérience utilisateur et de garantir une navigation fluide. 
            Il est chargé de concevoir l’interface visible de l'application ou du site web. 
            Son périmètre peut également englober l'intégration web, incluant le montage des pages avec l'ajout des images, des textes et des liens. 
            Il travaille en respectant les normes et les standards du web en vigueur.
          </p>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li>- HTML, CSS, JavaScript</li>
            <li>- Créativité, rigueur, persévérance</li>
            <li>- Veille technologique pour rester à jour</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Formations courtes (bootcamps) ou cursus universitaires pour apprendre HTML, CSS, JavaScript et frameworks. 
            Le poste est ouvert à la reconversion.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Spécialisation sur certaines technologies ou encadrement d'équipe en tant que Lead Développeur.
          </p>
        </section>

        <section>
          <h2>Liste de tâches ou responsabilités typiques</h2>
          <ul>
            <li>- Concevoir et mettre en œuvre l'interface utilisateur d'un site ou d'une application</li>
            <li>- Optimiser l'ergonomie et la fluidité pour offrir la meilleure navigation possible</li>
            <li>- Intégrer les contenus (images, textes) et respecter la mise en forme des designers</li>
            <li>- Veiller au respect des standards du web et des normes d'accessibilité</li>
            <li>- Effectuer une veille technologique régulière</li>
          </ul>
        </section>

        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>- HTML, CSS, JavaScript</li>
            <li>- Frameworks JavaScript (ex: React)</li>
            <li>- Outils de versioning comme GitHub</li>
          </ul>
        </section>

        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Le goût pour le design et la créativité peuvent s'exprimer dans le front-end, notamment dans le choix des couleurs et des éléments qui vont optimiser l'expérience utilisateur.
          </p>
        </section>

        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Développement Front-end, Interface Utilisateur, JavaScript, Ergonomie Web, Intégration HTML/CSS
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
          <p>© 2025 AFEC - Tous droits réservés</p>
            <p>
              <Link to="/mentions-legales">Mentions légales</Link> |{" "}
              <Link to="/privacy-policy">Politique de confidentialité</Link> |{" "}
              <Link to="/cookies">Gestion des cookies</Link>
            </p>
        </footer>
    </div>
  );
}

export default FrontendDescription;
