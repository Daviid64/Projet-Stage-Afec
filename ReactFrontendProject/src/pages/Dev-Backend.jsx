import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logoAfec from "../assets/logoAfec.png";
import "./metiers_numerique.css";

function BackendDescription() {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="header-blue">
        <img src={logoAfec} alt="Logo AFEC" className="header-logo" />
        <nav className="header-nav">
          <Link to="/Home" className="nav-link">Accueil</Link>
          <Link to="/exploration" className="nav-link">Exploration des Métiers</Link> 
        </nav>
      </header>

      {/* Main content */}
      <main className="backend-main">
        <h1>DÉVELOPPEUR BACK-END</h1>

        {/* Description courte */}
        <section>
          <h2>Description courte</h2>
          <p>
            Le Développeur back-end est responsable de la partie cachée, le back-office,
            qui regroupe tous les éléments techniques nécessaires au bon fonctionnement
            d’une application ou d’un site.
          </p>
        </section>

        {/* Description détaillée */}
        <section>
          <h2>Description détaillée</h2>

          <h3>Rôle et missions principales</h3>
          <p>
            Le Développeur back-end est en charge de l'infrastructure technique essentielle, 
            agissant dans les "coulisses" du produit numérique. Ses principales missions 
            consistent à configurer et maintenir le serveur ainsi que la base de données 
            du site ou de l’application. Il développe de nouvelles fonctionnalités dans 
            le but d'améliorer l'utilisation du produit. Il analyse les besoins de ses 
            clients ou de son entreprise afin d'apporter des solutions techniques adéquates, 
            en tenant compte des ressources disponibles.
          </p>

          <h3>Compétences techniques et soft skills requises</h3>
          <ul>
            <li>Langages serveur : JavaScript, Python, PHP, Ruby</li>
            <li>Gestion des bases de données : MySQL, MongoDB</li>
            <li>Qualités : persévérance, humilité, patience, rigueur</li>
          </ul>

          <h3>Formations possibles et niveaux d’études</h3>
          <p>
            Bootcamps ou formations universitaires orientées back-end. 
            Des connaissances préalables en HTML, CSS et JavaScript sont recommandées 
            pour comprendre les interactions avec la partie front-end.
          </p>

          <h3>Perspectives d’évolution</h3>
          <p>
            Spécialisation dans un domaine précis, évolution vers un poste de Lead Développeur, 
            Architecte informatique ou encore Architecte Cloud.
          </p>
        </section>

        {/* Liste de tâches */}
        <section>
          <h2>Liste de tâches ou responsabilités typiques</h2>
          <ul>
            <li>Mettre en place et maintenir le serveur et l'infrastructure technique</li>
            <li>Configurer et gérer la base de données</li>
            <li>Développer de nouvelles fonctionnalités</li>
            <li>Analyser les besoins métiers pour proposer des solutions techniques</li>
            <li>Corriger et maintenir le site ou l'application en cas de bugs</li>
          </ul>
        </section>

        {/* Outils */}
        <section>
          <h2>Outils, logiciels ou technologies les plus utilisés</h2>
          <ul>
            <li>Langages : JavaScript, Python, PHP, Ruby</li>
            <li>Frameworks : Node.js</li>
            <li>Bases de données : MySQL</li>
            <li>Outils de versioning : GitHub</li>
          </ul>
        </section>

        {/* Anecdotes */}
        <section>
          <h2>Anecdotes ou exemples concrets</h2>
          <p>
            Une développeuse full stack explique souvent le travail du back-end 
            en traduisant des données techniques pour les rendre compréhensibles 
            par les autres équipes, illustrant ainsi le rôle clé du back-end 
            dans la communication entre les différentes parties d’un projet.
          </p>
        </section>

        {/* Mots-clés SEO */}
        <section>
          <h2>Mots-clés SEO</h2>
          <p>
            Développement Back-end, Base de données, Infrastructure Web, 
            Programmation Côté Serveur, API Management
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 AFEC - Tous droits réservés |{" "}</p>
        <p>
          <Link to="/mentions-legales">Mentions légales</Link> |{" "}
          <Link to="/privacy-policy">Politique de confidentialité</Link> |{" "}
        </p>
      </footer>
    </div>
  );
}

export default BackendDescription;
